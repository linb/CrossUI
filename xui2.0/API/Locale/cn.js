xui.set(xui.Locale,["cn","app"], {
    en:'英文',
    cn:'中文',
    apititle:"CrossUI 2.0 - API 文档",

    search:'API查询',
    lQ1:'按API查询',
    lQ2:'按功能描述查询',


    staticMethods:"静态方法",
    staticProperties:"静态属性",
    gFun:'全局函数',
    constructor:"构造函数",
    noCons:'静态类',
    supCls:'父类',
    subCls:'子类',
    inhFrom:"继承自 ",
    insProperties:"实例属性",
    insMethods:"实例方法",
    events:'事件',
    retV:'返回值',
    param:'参数',
    codesnip:'示例',
    memo:'说明',
    seealso:'请参考',
    oCode:'函数源代码',
    oCodeDesc:'/*\n * 为了帮助您更好地理解这个函数,下面是 CrossUI 的函数源代码：\n*/'
});
(function(){
    var $eo={
        $rtn:"[self]",
        $paras:[
            "fun [可选参数]: Function, 函数的参数 是 [xui.DomProfile 对象, DOM 事件对象, 目前元素的xid字符串]",
            "label [可选参数]: String, 事件的标签",
            "flag  [可选参数]: Boolean, 仅删除事件的时候有效,表示是否删除所有相关的事件"
        ]
    };
    var $force="force [可选参数] : Boolean, 强制设置该属性值,即使属性已经设置为该值. 默认为 [false]";
    var $profile="profile : xui.UIProfile, 当前控件的配置对象";
    /*
    $desc string
    $paras array
    $rtn string
    $snippet array
    $links array
    $memo string
    */
     var $me=xui.Locale.cn.doc;

    xui.set(xui.Locale,["cn","doc","xui"], {
        $desc:"XUI的根部命名空间.<br />当做函数用是将一系列的DOM元素包装成xui.Dom对象的快捷函数",
        $rtn:"xui.Dom",
        $paras:[
            "nodes [可选参数]: Element/Element[]/String/String[]/Function, 代表一个或一组DOM元素的字符串、变量或函数,可以是一个[DOM元素], 一个[DOM元素]数组, 一个[DOM元素id], 一个[DOM元素id]数组, 一个[xid], 或一个[xid]数组,等等. 默认为 []",
            "flag [可选参数]: Boolean, 指示是否忽略数值检测和清理函数(以获取更好的性能). 默认为 false. 只有在输入一个[xid]数组的情况下这个参数才能为[true]"
        ],
        $snippet:[
            "//输入一个DOM节点的 id 字符串\n var n=xui('btnLang'); alert(n.get(0).id);",
            "//输入一个DOM节点 \n var n=xui(document.getElementById('btnLang')); alert(n.get(0).id);",
            "//输入一个DOM节点的 id 数组\n var n=xui(['btnLang']); alert(n.get(0).id);",
            "//输入一个DOM节点数组\n var n=xui([document.getElementById('btnLang')]); alert(n.get(0).id);",
            "//输入一个xui.Dom 变量 \n var n=xui(xui('btnLang')); alert(n.get(0).id);",
            "//输入一个xui.UI 变量\n var n=xui(xui.UI.Div.getAll()); alert(n.get(0).id);",
            "//输入一个能返回DOM节点数组的函数\n var n=xui(function(){return [document.getElementById('btnLang')]}); alert(n.get(0).id);",
            "//输入一个 xid 字符串\n var xid=xui.getId('btnLang'), n=xui(xid); alert(xid);alert(n.get(0).id);",
            "//输入一个 xid 字符串数组\n var xid=xui.getId('btnLang'), n=xui([xid],false); alert(xid);alert(n.get(0).id);"
        ],
        Class:{
            $desc:"类的操作方法集合.<br />当做函数用是申明一个类",
            $rtn:"Object",
            $paras:[
                "key [必需参数]: String, 名字空间+类名字",
                "pkey [必需参数]: String/Array, 名字空间+类名字.所要继承的类.数组表示该类为多继承,有多个父类",
                "obj [可选参数]: Object,  类对象. 默认为 {}"
            ],
            $snippet:["// 申明命名空间 'Test.NS' 然后申明一个类 'Test.NS.Cls'; \n  xui.Class('Test.NS.Cls'); xui.Class('Test.NS.Cls.Subcls1', 'Test.NS.Cls', {}); xui.Class('Test.NS.Cls.Subcls2', null, {});  alert(typeof Test.NS); alert(typeof Test.NS.Cls); alert(typeof Test.NS.Cls.Subcls1);alert(typeof Test.NS.Cls.Subcls2);"],
            $memo:"类的命名规则：[A-Z][0-9a-zA-Z]+",
            destroy:{
                $desc:"销毁一个类"
            }
        },
        Namespace:{
            $desc:"申明一个名字空间",
            $rtn:"Object",
            $paras:[
                "key [必需参数]: String, 名字空间字符串"
            ],
            $snippet:["xui.Namespace('Test.NS'); alert(typeof Test.NS)"],
            $memo:"名字空间的命名规则：[A-Z][0-9a-zA-Z]+"
        },
        //"工具方法的集合",
        stamp:{
            $desc:"得到本地的时间戳",
            $rtn:"Number"
        },
        rand:{
            $desc:"得到随机字符串",
            $rtn:"String"
        },
        arr:{
            $desc:"数组的功能函数集合",
            fastSortObject:{
                $desc:"对象数组的快速稳定排序函数",
                $rtn:'Array',
                $paras: [
                    "arr [必需参数]: Array, 目标数组",
                    "byKey [必需参数]: Function. 得到排序键值的函数"
                ]
            },
            stableSort:{
                $desc:"稳定排序函数",
                $rtn:'Array',
                $paras: [
                    "arr [必需参数]: Array, 目标数组",
                    "sortby [必需参数]: Function(x,y). 排序函数"
                ]
            },
            each:{
                $desc:"将函数应用于数组中的每一个元素",
                $rtn:'Array',
                $paras: [
                    "arr [必需参数]: Array, 目标数组",
                    "fun [必需参数]: Function, 参数: [array element, array index]. 要应用的函数",
                    "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数). 默认为 [window]",
                    "desc [可选参数]: Boolean, 按从头到尾还是从尾到头应用函数. 默认是从头到尾"
                ],
                $snippet:[
                    "xui.arr.each(['a','b'], function(o,i){alert(i+':'+o);} )",
                    "xui.arr.each(['a','b'], function(o,i){alert(i+':'+o);alert(this===window);},window,true)"
                ]
            },
            indexOf:{
                $desc:"查找给定值在数组中的位置, 返回-1表示没有找到",
                $rtn:'Number. 值在数组的index',
                $paras: [
                    "arr [必需参数]: Array, 目标数组",
                    "value [必需参数]: Object, 要查找的值"
                ],
                $snippet:[
                    "var a=[1,2,3,4];alert(xui.arr.indexOf(a, 3))"
                ]
            },
            insertAny:{
                $desc:"添加一个或多个元素到数组的指定位置",
                $rtn:'Number',
                $paras: [
                    "arr [必需参数]: Array, 目标数组",
                    "target [必需参数]: Object, 要添加的一个或多个元素",
                    "index [可选参数]: Number, 指定要插入的位置. 默认为 -1 表示插入到结尾",
                    "flag [可选参数]: Boolean, 强制[target]作为一个元素插入,即使它是一个数组.  默认为 false"
                ],
                $snippet:[
                    "var a=[1,2,3]; xui.arr.insertAny(a,5,1);alert(a)",
                    "var a=[1,2,3]; xui.arr.insertAny(a,[5,5],1);alert(xui.serialize(a))",
                    "var a=[1,2,3]; xui.arr.insertAny(a,[5,5],1,true);alert(xui.serialize(a))"
                ]
            },
            removeFrom:{
                $desc:"移除数组的一部分",
                $rtn:'Array',
                $paras: [
                    "arr [必需参数]: Array, 目标数组",
                    "index [必需参数]: Number, 数组开始的index",
                    "length [可选参数]: Number, 移除元素的个数. 默认为 1"
                ],
                $snippet:[
                    "var a=[1,2,3,4,5]; xui.arr.removeFrom(a, 2,2 ); alert(a);"
                ]
            },
            removeDuplicate:{
                $desc:"移除数组的重复元素",
                $rtn:'Array',
                $paras: [
                    "arr [必需参数] : Array, 目标数组",
                    "subKey [可选参数]: String, 判断数组中值是否重复的子键（针对数组中的值为对象的情况）"
                ],
                $snippet:[
                    "var a=[1,2,3,4,5,3,4,5]; xui.arr.removeDuplicate(a); alert(a);",
                    "var a=[{id:1,value:'1'},{id:1,value:'2'},{id:1,value:'3'}]; xui.arr.removeDuplicate(a, 'id'); alert(xui.serialize(a));"
                ]
            },
            removeValue:{
                $desc:"移除数组中值为”给定值“的元素",
                $rtn:'Array',
                $paras: [
                    "arr [必需参数] [必需参数]: Array, 目标数组",
                    "value: Object, 要移除元素的值"
                ],
                $snippet:[
                    "var a=[1,2,3,4,5]; xui.arr.removeValue(a, 4); alert(a);"
                ]
            },
            subIndexOf:{
                $desc:"查找给定的键和值在数组中的位置（对于数组是Object的情况）, 返回-1表示没有找到",
                $rtn:'Number',
                $paras: [
                    "arr [必需参数]: Array, 目标数组",
                    "key [必需参数]: String, 键名字",
                    "value [必需参数]: Object, 值"
                ],
                $snippet:[
                    "var a=[1,2,{k:'v'},4]; var i=xui.arr.subIndexOf(a,'k','v'); alert(i);"
                ]
            }
        },
        asyHTML:{
            $desc:"异步生成html的函数",
            $rtn:"Interger",
            $paras:[
                "content [必需参数]: String, 要生成html的字符串",
                "callback [必需参数]: Function, 回调函数",
                "defer [可选参数]: Number, 每组执行前的时间延迟. 默认为 0",
                "size [可选参数]: Number, 每组生成的DOM节点数. 默认为 10"
            ]
        },
        asyRun:{
            $desc:"异步执行一个函数",
            $rtn:"Interger",
            $paras:[
                "fun [必需参数]: Function, 要执行的函数",
                "defer [可选参数]: Number, 在多少毫秒后执行. 默认为 0",
                "args [可选参数]: Array, 函数的参数. 默认为 [](空数组)",
                "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数) . 默认为 [window]"
            ],
            $snippet:[
                "xui.asyRun(function(a,b){alert(this===window);alert(a+b)}, 300, ['a','b'], window)"
            ]
        },
        breakO:{
            $desc:"断开引用[以释放内存]",
            $paras:[
                "target [必需参数]: Object, 要断开的对象",
                "depth [可选参数]: Number, 深度值. 默认为 1"
            ],
            $snippet:[
                "var a={b:1}, o={a:a}; xui.breakO(o); alert(a && a.b);",
                "var a={b:1}, o={a:a}; xui.breakO(o,2); alert(a && a.b);"
            ]
        },
        toFixedNumber:{
            $desc:"按给定的精度来格式化数字,返回的是格式化后的数字",
            $paras:[
                "number [必需参数]: Number, 数字",
                "digits [可选参数]: Number, 小数点后精度. 默认为 2"
            ],
            $snippet:[
                "var a=0.3+0.3+0.3; alert(a); alert(xui.toFixedNumber(a, 10));",
                "var a=0.1*0.2; alert(a); alert(xui.toFixedNumber(a, 10));"
            ]
        },
        toNumeric:{
            $desc:"按给定的精度、千位分隔符和小数分隔符来从取得数字",
            $paras:[
                "value [必需参数]: String, 字符串",
                "precision [可选参数]: Number, 小数点后精度. 默认为 2",
                "groupingSeparator[可选参数]: String, 千位分隔符. 默认为 ','",
                "decimalSeparator[可选参数]: String, 小数分隔符. 默认为 \".\""
            ]
        },
        formatNumeric:{
            $desc:"按给定的精度、千位分隔符和小数分隔符来格式化数字,返回的是格式化后的字符串",
            $paras:[
                "value [必需参数]: Number, 数字",
                "precision [可选参数]: Number, 小数点后精度. 默认为 2",
                "groupingSeparator[可选参数]: String, 千位分隔符. 默认为 ','",
                "decimalSeparator[可选参数]: String, 小数分隔符. 默认为 \".\"",
                "forceFillZero[可选参数]: Boolean, 是否强制精度默认填充0. 默认为[true]"
            ]
        },
        clone:{
            $desc:"拷贝对象, 深度拷贝",
            $rtn:"Object",
            $paras:[
                "hash [必需参数]: Object, 要拷贝的对象",
                "filter [可选参数]: Function, 参数: [值, 键]. 判断是否拷贝该项. 也可以是 [true],表示会忽略以'_'开头的项",
                "deep [可选参数]: Number, 拷贝的深度,默认为 100"
            ],
            $snippet:[
                "var a=1, b='s'; alert(xui.clone(a)); alert(xui.clone(b));",
                "var o={a:1,b:{b:{c:2}}}; alert(xui.serialize(xui.clone(o))); alert(xui.serialize(xui.clone(o,function(o,i){return i!='c'}))); ",
                "var o={a:1,_b:2,$c:3}; alert(xui.serialize(xui.clone(o,true)));",
                "var o=['1','2','3']; alert(xui.serialize(xui.clone(o))); alert(xui.serialize(xui.clone(o,function(o){return o!='2'}))); "
            ]
        },
        copy:{
            $desc:"浅拷贝, 只拷贝对象的第一层",
            $rtn:"Object",
            $paras:[
                "hash [必需参数]: Object, 要拷贝的对象",
                "filter [可选参数]: Function, 参数: [值, 键]. 判断是否拷贝该项. 也可以是 [true],表示会忽略以'_'开头的项"
            ],
            $memo:"请参见 <a href='#xui.clone'>xui.clone</a>"
        },
        each:{
            $desc:"对hash的每一个函数元素,应用一个函数",
            $rtn:"Object",
            $paras:[
                "hash [必需参数]: Object, 键值对",
                "fun [必需参数]: Function, 函数: [值, 键]. 要应用的函数",
                "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数)"
            ],
            $snippet:[
                "var h={a:1,b:2}; xui.each(h,function(o,i){alert(i+':'+o)})"
            ]
        },
        'exec':{
            $desc:"执行一段脚本",
            $rtn:"Object",
            $paras:[
                "script [必需参数]: String, 脚本字符串"
            ],
            $snippet:[
                "xui.exec('alert(\"a\")')"
            ]
        },
        isDefined:{
            $desc:"判断目标对象是否存在.相当于[target===undefined]",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: Object, 要判断的目标对象"
            ],
            $snippet:[
                "alert(xui.isDefined(window.aaaa))"
            ]
        },
        filter:{
            $desc:"过滤数组/键值对的某些元素",
            $rtn:"Object",
            $paras:[
                "obj [必需参数]: Object, 数组/键值对",
                "filter [可选参数]: Function, 参数: [值, 键]. 判断是否保留该项. 也可以是 [true],表示值过滤以'_'开头的项",
                "force [可选参数]: Boolean, 强行将[obj]做为一个{}执行. 默认为 false"
            ],
            $snippet:[
                "var o={a:1,b:2}; xui.filter(o,function(o,i){return i!='b'}); alert(xui.serialize(o))",
                "var o={a:1,_b:2}; xui.filter(o,true); alert(xui.serialize(o))",
                "var o=[1,2,3]; xui.filter(o,function(o,i){return o!=2}); alert(xui.serialize(o))"
            ]
        },
        fun:{
            $desc:"函数的功能函数集合.<br />也可以作为函数用来获取一个空函数",
            args:{
                $desc:"获取指定函数的参数",
                $rtn:"Array",
                $paras:[
                    "fun [必需参数]: Function, 目标函数"
                ],
                $snippet:[
                    "alert(xui.fun.args(function(a,b,c){var body=1;}))"
                ]
            },
            body:{
                $desc:"获取函数的函数体",
                $rtn:"String",
                $paras:[
                    "fun [必需参数]: Function, 目标函数"
                ],
                $snippet:[
                    "alert(xui.fun.body(function(a,b,c){var body=1;}))"
                ]
            },
            clone:{
                $desc:"拷贝一个函数",
                $rtn:"Function",
                $paras:[
                    "fun [必需参数]: Function, 目标函数"
                ],
                $snippet:[
                    "var fun=function(a,b,c){var body=1;}, fun_cloned =  xui.fun.clone(fun); alert(xui.fun.args(fun_cloned));alert(xui.fun.body(fun_cloned));alert(fun_cloned.toString()); alert(fun==fun_cloned); "
                ]
            }
        },
        get:{
            $desc:"获取多层hash的给定路径的值",
            $rtn:"Object",
            $paras:[
                "hash [必需参数]: Object, 多层hash",
                "path [必需参数]: Array, 路径数组, 例如['a','b','c'] 表示{a:{b:{c:[variable]}}}中的variable"
            ],
            $snippet:[
                "alert(xui.get({a:{b:{c:1}}},'a'))",
                "alert(xui.get({a:{b:{c:1}}},['a','b']))",
                "alert(xui.get({a:{b:{c:1}}},['a','b','c']))",
                "alert(xui.get({a:{b:{c:1}}},['a','b','c','d']))"
            ]
        },
        "id":{
            $desc:"获取一个a-z组成的唯一id编号",
            $rtn:"String",
            $snippet:[
                "alert('system id: ' + xui.id());",
                "var test=new xui.id(); var out=[]; for(var i=0;i<100;i++){out.push(test.next())}; alert(out);"
            ]
        },
        isArr :{
            $desc:"判断目标是否是一个数组",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isArr('s')+':'+xui.isArr(new RegExp())+':'+xui.isArr(function(){})+':'+xui.isArr(1)+':'+xui.isArr(NaN)+':'+xui.isArr({})+':'+xui.isArr(new Date)+':'+xui.isArr(null)+':'+xui.isArr(undefined)+':'+xui.isArr(true)+':'+xui.isArr([]));"
            ]
        },
        isBool :{
            $desc:"判断目标是否是一个Bool",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isBool('s')+':'+xui.isBool(new RegExp())+':'+xui.isBool(function(){})+':'+xui.isBool(1)+':'+xui.isBool(NaN)+':'+xui.isBool({})+':'+xui.isBool(new Date)+':'+xui.isBool(null)+':'+xui.isBool(undefined)+':'+xui.isBool(true)+':'+xui.isBool([]));"
            ]
        },
        isDate :{
            $desc:"判断目标是否是一个日期(Date)",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isDate('s')+':'+xui.isDate(new RegExp())+':'+xui.isDate(function(){})+':'+xui.isDate(1)+':'+xui.isDate(NaN)+':'+xui.isDate({})+':'+xui.isDate(new Date)+':'+xui.isDate(null)+':'+xui.isDate(undefined)+':'+xui.isDate(true)+':'+xui.isDate([]));"
            ]
        },
        isEmpty :{
            $desc:"判断目标是否是为空",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isEmpty('s')+':'+xui.isEmpty(new RegExp())+':'+xui.isEmpty(function(){})+':'+xui.isEmpty(1)+':'+xui.isEmpty(NaN)+':'+xui.isEmpty({})+':'+xui.isEmpty(new Date)+':'+xui.isEmpty(null)+':'+xui.isEmpty(undefined)+':'+xui.isEmpty(true)+':'+xui.isEmpty([]));"
            ],
            $memo:"It's only for hash Object"
        },
        isFun :{
            $desc:"判断目标是否是一个函数",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isFun('s')+':'+xui.isFun(new RegExp())+':'+xui.isFun(function(){})+':'+xui.isFun(1)+':'+xui.isFun(NaN)+':'+xui.isFun({})+':'+xui.isFun(new Date)+':'+xui.isFun(null)+':'+xui.isFun(undefined)+':'+xui.isFun(true)+':'+xui.isFun([]));"
            ]
        },
        isArguments:{
            $desc:"判断目标是否是一个参数对象",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "(function(){alert(xui.isArguments(arguments));alert(xui.isArguments({}));alert(xui.isArguments([]));}())"
            ]
        },
        isHash:{
            $desc:"判断目标是否是一个hash",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isHash('s')+':'+xui.isHash(new RegExp())+':'+xui.isHash(function(){})+':'+xui.isHash()+':'+xui.isHash(1)+':'+xui.isHash(NaN)+':'+xui.isHash({})+':'+xui.isHash(new Date)+':'+xui.isHash(null)+':'+xui.isHash(undefined)+':'+xui.isHash(true)+':'+xui.isHash([]));"
            ]
        },
        isNull:{
            $desc:"判断目标是否是null",
            $rtn:"Boolean",
            $paras:[
                "targe [必需参数]t: any"
            ],
            $snippet:[
                "alert(xui.isNull('s')+':'+xui.isNull(new RegExp())+':'+xui.isNull(function(){})+':'+xui.isNull(1)+':'+xui.isNull(NaN)+':'+xui.isNull({})+':'+xui.isNull(new Date)+':'+xui.isNull(null)+':'+xui.isNull(undefined)+':'+xui.isNull(true)+':'+xui.isNull([]));"
            ]
        },
        isFinite:{
            $desc:"判断目标是否是一个有效的数字",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isFinite('s')+':'+xui.isFinite(new RegExp())+':'+xui.isFinite(function(){})+':'+xui.isFinite(1)+':'+xui.isFinite(NaN)+':'+xui.isFinite({})+':'+xui.isFinite(new Date)+':'+xui.isFinite(null)+':'+xui.isFinite(undefined)+':'+xui.isFinite(true)+':'+xui.isFinite([]));"
            ]
        },
        isNumb:{
            $desc:"判断目标是否是一个Number(数字)",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isNumb('s')+':'+xui.isNumb(new RegExp())+':'+xui.isNumb(function(){})+':'+xui.isNumb(1)+':'+xui.isNumb(NaN)+':'+xui.isNumb({})+':'+xui.isNumb(new Date)+':'+xui.isNumb(null)+':'+xui.isNumb(undefined)+':'+xui.isNumb(true)+':'+xui.isNumb([]));"
            ]
        },
        isObj :{
            $desc:"判断目标是否是一个对象",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isObj('s')+':'+xui.isObj(new RegExp())+':'+xui.isObj(function(){})+':'+xui.isObj(1)+':'+xui.isObj(NaN)+':'+xui.isObj({})+':'+xui.isObj(new Date)+':'+xui.isObj(null)+':'+xui.isObj(undefined)+':'+xui.isObj(true)+':'+xui.isObj([]));"
            ]
        },
        isReg :{
            $desc:"判断目标是否是一个正则表达式",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isReg('s')+':'+xui.isReg(new RegExp())+':'+xui.isReg(function(){})+':'+xui.isReg(1)+':'+xui.isReg(NaN)+':'+xui.isReg({})+':'+xui.isReg(new Date)+':'+xui.isReg(null)+':'+xui.isReg(undefined)+':'+xui.isReg(true)+':'+xui.isReg([]));"
            ]
        },
        isSet:{
            $desc:"判断目标是否已经定义",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isSet('s')+':'+xui.isSet(new RegExp())+':'+xui.isSet(function(){})+':'+xui.isSet(1)+':'+xui.isSet(NaN)+':'+xui.isSet({})+':'+xui.isSet(new Date)+':'+xui.isSet(null)+':'+xui.isSet(undefined)+':'+xui.isSet(true)+':'+xui.isSet([]));"
            ]
        },
        isElem:{
            $desc:"判断目标是否是一个DOM元素",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ]
        },
        "isNaN":{
            $desc:"判断目标是否是一个NaN值",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ]
        },
        isStr :{
            $desc:"判断目标是否是一个字符串",
            $rtn:"Boolean",
            $paras:[
                "target [必需参数]: any"
            ],
            $snippet:[
                "alert(xui.isStr('s')+':'+xui.isStr(new RegExp())+':'+xui.isStr(function(){})+':'+xui.isStr(1)+':'+xui.isStr(NaN)+':'+xui.isStr({})+':'+xui.isStr(new Date)+':'+xui.isStr(null)+':'+xui.isStr(undefined)+':'+xui.isStr(true)+':'+xui.isStr([]));"
            ]
        },
        merge:{
            $desc:"将两个键值对合并",
            $rtn:"Object",
            $paras:[
                "target [必需参数]: Object, 目标hash",
                "source [必需参数]: Object, 源hash",
                "type [可选参数]: String/Function,参数: [值, 键]. 可以是'all', 'with', 'without'[默认], 或函数"
            ],
            $snippet:[
                "var a={a:1},b={b:1}; alert(xui.serialize(xui.merge(a,b)))",
                "var a={a:1},b={a:2,b:1}; alert(xui.serialize(xui.merge(a,b,'with')))",
                "var a={a:1},b={a:2,b:1}; alert(xui.serialize(xui.merge(a,b,'all')))",
                "var a={a:1},b={a:2,b:1}; alert(xui.serialize(xui.merge(a,b,function(o,i){return o!=1})))"
            ]
        },
        resetRun:{
            $desc:"设置可覆盖式的异步执行函数.如key值相同,后设置的函数会覆盖先前的函数.结果是只有最后设置的函数才会被执行",
            $paras:[
                "key [必需参数]: String, 唯一标志符",
                "fun [必需参数]: Function, 要执行的函数",
                "defer [可选参数]: Number, 多少毫秒后自动执行. 默认为 0",
                "args [可选参数]: Array, 函数的实际参数",
                "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数)"
            ],
            $snippet:[
                "xui.resetRun('id',function(){alert(1)},200);xui.resetRun('id',function(){alert(2)},200);xui.resetRun('id',function(){alert(3)},200);"
            ],
            $memo:"可以用xui.resetRun.exists(id)来判断是否存在名字为id的异步执行函数"
        },
        observableRun:{
            $desc:"将函数包装成一个可在界面上看到反馈(例如,可以看到鼠标的形状变化)的线程并且执行这个线程",
            $paras:[
                "tasks [必需参数]: Funtion/Array, 一个任务函数,或是一组任务函数",
                "onEnd [可选参数]: Function, 在线程完后执行的回调函数",
                "threadid [可选参数]: Stirng, 线程id. 如果这个id所代表的线程已经存在,那么这个/这组任务函数会被插入到这个线程内执行"
            ],
            $snippet:[
                "xui.observableRun(xui.fun());",
                "//鼠标改变1秒钟后还原: \n"+
                "xui.observableRun(function(threadid){xui.Thread(threadid).suspend(); xui.asyRun(function(){xui.Thread(threadid).resume();},1000)});"
            ]
        },
        stringify:{
            $desc: "将对象序列化为一个JSON字符串(不强制转换成UTF8编码)",
            $rtn: "String",
            $paras:[
                "obj [必需参数]: Object, 目标对象",
                "filter [可选参数]: Function, 参数: [值, 键]. 判断是否序列化该项. 也可以是 [true],表示会忽略以'_'开头的项",
                "dateformat  [可选参数]: String, 'utc' or 'gmt'. 强行将[Date]类型转化为ISO UTC字符串, ISO GMT 字符串, 或默认格式( new Date(yyyy,mm,dd,hh,nn,ss,ms) )"
            ],
            $snippet:[
                "alert(xui.stringify('a'));"+
                "alert(xui.stringify({a:1}));"+
                "alert(xui.stringify([1,2,{a:1}]));"+
                "alert(xui.stringify([1,2,{_a:1}],true));"+
                "alert(xui.stringify({d:new Date}));"+
                "alert(xui.stringify({d:new Date},'utc'))",
                "alert(xui.stringify({d:new Date},'gmt'))",
                "alert(xui.stringify(xui('btnLang')))",
                "alert(xui.stringify(xui.Dom.byId('btnLang')))",
                "alert(xui.stringify(xui.UIProfile.getFromDom('btnLang')))",
                "alert(xui.stringify(xui.UIProfile.getFromDom('btnLang').boxing()))"
            ]
        },
        serialize:{
            $desc: "将对象序列化为一个JSON字符串(强制转换成UTF8编码)",
            $rtn: "String",
            $paras:[
                "obj [必需参数]: Object, 目标对象",
                "filter [可选参数]: Function, 参数: [值, 键]. 判断是否序列化该项. 也可以是 [true],表示会忽略以'_'开头的项",
                "dateformat  [可选参数]: String, 'utc' or 'gmt'. 强行将[Date]类型转化为ISO UTC字符串, ISO GMT 字符串, 或默认格式( new Date(yyyy,mm,dd,hh,nn,ss,ms) )"
            ],
            $snippet:[
                "alert(xui.serialize('a'));"+
                "alert(xui.serialize({a:1}));"+
                "alert(xui.serialize([1,2,{a:1}]));"+
                "alert(xui.serialize([1,2,{_a:1}],true));"+
                "alert(xui.serialize({d:new Date}));"+
                "alert(xui.serialize({d:new Date},null,'utc'))",
                "alert(xui.serialize({d:new Date},null,'gmt'))",
                "alert(xui.serialize(xui('btnLang')))",
                "alert(xui.serialize(xui.Dom.byId('btnLang')))",
                "alert(xui.serialize(xui.UIProfile.getFromDom('btnLang')))",
                "alert(xui.serialize(xui.UIProfile.getFromDom('btnLang').boxing()))"
            ]
        },
        set:{
            $desc:"设置或取消设置多层hash中的某个项",
            $rtn:"Object",
            $paras:[
                "hash [必需参数]: Object, 多重键值对",
                "path [必需参数]: Array, 目标路径, ['a','b','c'] => {a:{b:{c:[variable]}}}",
                "value [可选参数]: any, 项的新值. 如果是undefined则被清空"
            ],
            $snippet:[
                "var o={}; xui.set(o,['a','b','c'], 1); alert(xui.serialize(o)); xui.set(o,['a','b','c']); alert(xui.serialize(o));"
            ]
        },
        toUTF8:{
            $desc:"把一个字符串专程 UTF8 格式",
            $rtn:"String",
            $paras:[
                "str [必须参数] : String"
            ],
            $snippet:[
                "alert(xui.toUTF8('汉字'));",
                "alert(xui.fromUTF8(xui.toUTF8('汉字')));"
            ]
        },
        fromUTF8:{
            $desc:"把一个字符串从 UTF8 格式转回来",
            $rtn:"String",
            $paras:[
                "str [必须参数] : String"
            ],
            $snippet:[
                "alert(xui.toUTF8('汉字'));",
                "alert(xui.fromUTF8(xui.toUTF8('汉字')));"
            ]
        },
        urlEncode:{
            $desc:"将键值对转化为URL请求字符串",
            $rtn:"String",
            $paras:[
                "hash [必需参数] : 键值对"
            ],
            $snippet:[
                "alert(xui.urlEncode({a:1,b:2}));"+
                "alert(xui.urlEncode({a:1,b:{b1:1,b2:2}}));"+
                "alert(xui.serialize(xui.urlDecode(xui.urlEncode({a:1,b:{b1:1,b2:2}}))))"
            ]
        },
        urlDecode:{
            $desc:"将URL请求字符串转化为键值对,或获取某一个键的值",
            $rtn:"Object",
            $paras:[
                "str [必需参数] : String, URL请求字符串",
                "key [可选参数] : String, 键名字"
            ],
            $snippet:[
                "var qs='a=1&b=2&c=3'; alert(xui.serialize(xui.urlDecode(qs)));alert(xui.urlDecode(qs,'a'));"
            ]
        },
        str:{
            $desc:"字符串的功能函数集合",
            endWith :{
                $desc:"测试字符串是否以另一个串结尾",
                $rtn:'Boolean',
                $paras:[
                    "str [必需参数]: String, 目标字符串",
                    "eStr [必需参数]: String, 要测试的结尾串"
                ],
                $snippet:[
                    "alert(xui.str.endWith('abc','c'))"
                ]
            },
            initial:{
                $desc:"将指定的字符串首字母改为大写",
                $rtn:'String',
                $paras:[
                    "str [必需参数]: String, 目标字符串"
                ],
                $snippet:[
                    "alert(xui.str.initial('abc'))"
                ]
            },
            ltrim :{
                $desc:"拷贝一个字符串,并将左边的空白字符去掉",
                $rtn:'String',
                $paras:[
                    "str [必需参数]: String, 目标字符串"
                ],
                $snippet:[
                    "alert(xui.str.ltrim(' abc ').length)"
                ]
            },
            repeat:{
                $desc:"将目标字符串复制多少次, 并返回结果",
                $rtn:'String',
                $paras:[
                    "str [必需参数]: String, 目标字符串",
                    "times [必需参数]: 重复次数"
                ],
                $snippet:[
                    "alert(xui.str.repeat('abc',3))"
                ]
            },
            rtrim :{
                $desc:"拷贝一个字符串,并将右边的空白字符去掉",
                $rtn:'String',
                $paras:[
                    "str [必需参数]: String, 目标字符串"
                ],
                $snippet:[
                    "alert(xui.str.rtrim(' abc ').length)"
                ]
            },
            startWith :{
                    $desc:"测试字符串是否以另一个串开头",
                    $rtn:'Boolean',
                    $paras:[
                        "str [必需参数]: String, 目标字符串",
                        "sStr [必需参数]: String, 测试的开头字符串"
                    ],
                    $snippet:[
                        "alert(xui.str.startWith('abc','a'))"
                    ]
            },
            toDom:{
                $desc:"将html串的直接转化为DOM对象",
                $rtn:'xui.Dom',
                $paras:[
                    "str [必需参数]: String, 目标字符串"
                ],
                $snippet:[
                    "var node = xui.str.toDom('<div>a</div>'); alert(node.outerHTML())"
                ]
            },
            trim :{
                $desc:"拷贝一个字符串,并将左右两边的空白字符去掉",
                $rtn:'String',
                $paras:[
                    "str [必需参数]: String, 目标字符串"
                ],
                $snippet:[
                    "alert(xui.str.trim(' abc ').length)"
                ]
            }
        },
        toArr:{
            $desc:"将字符串或键值对分割成数组",
            $rtn:"Array",
            $paras:[
                "value [必需参数]: Object, 要分割的字符串或对象",
                "force [可选参数]: Boolean/String, 如果是一个字符串（通常是一个字符）表示将一个字符串转换成Array;如果是 Boolean 表示将一个键值对转换成Array"
            ],
            $snippet:[
                "var s='a,b,c', a=xui.toArr(s); alert(xui.serialize(a));",
                "var s='a:b:c', a=xui.toArr(s,':'); alert(xui.serialize(a));",
                "var f=function(a,b,c){ var a=xui.toArr(arguments);alert(xui.serialize(a));}; f(1,2,3); ",
                "var hash={a:1,b:2}, a=xui.toArr(hash,true); alert(xui.serialize(a));",
                "var hash={a:1,b:2}, a=xui.toArr(hash,false); alert(xui.serialize(a));"
            ]
        },
        tryF:{
            $desc:"试着执行一个函数",
            $rtn:"Object",
            $paras:[
                "fun [必需参数]: Function. 要执行的函数",
                "args [可选参数]: Array, 函数的参数",
                "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数)",
                "df [可选参数]: Object. 默认的返回值(如果[fun]不是一个真正的函数)"
            ],
            $snippet:[
                "alert(xui.tryF()); alert(xui.tryF('s')); alert(xui.tryF(4,null,null,true)); ",
                "var f=function(){return 'a';}; alert(xui.tryF(f));",
                "var f=function(v){alert(v);return this.a;}, o={a:true}; alert(xui.tryF(f,['parameter'],o));"
            ]
        },
        unserialize:{
            $desc:"将JSON字符串反序列化为一个Javascript对象",
            $rtn:"Object",
            $paras:[
                "str [必需参数]: String, JSON字符串",
                "dateformat [可选参数]: String, 时间格式"
            ],
            $snippet:[
                "var o={a:[1,{k:1}],s:'s',d:new Date},str; alert(str=xui.serialize(o)); var o2=xui.unserialize(str); alert(o2.d)",
                "var o={a:[1,,{k:1}],s:'s',d:new Date},str; alert(str=xui.serialize(o)); var o2=xui.unserialize(str, true); alert(o2.d)",
                "alert(typeof xui.unserialize(xui.serialize(xui('btnLang'))))",
                "alert(typeof xui.unserialize(xui.serialize(xui.Dom.byId('btnLang'))))",
                "alert(typeof xui.unserialize(xui.serialize(xui.UIProfile.getFromDom('btnLang'))))",
                "alert(typeof xui.unserialize(xui.serialize(xui.UIProfile.getFromDom('btnLang').boxing())))"
            ]
        },
        preLoadImage:{
            $desc:"预加载图片",
            $rtn:"Integer",
            $paras:[
                "src [必需参数]: String, 图片地址，可以是图片地址的Array",
                "onSuccess [可选参数]: Function, function(img), 图片加载成功时触发的回调函数",
                "onFail [可选参数]: Function, function(img), 图片加载失败时触发的回调函数"
            ]
        },
        SERIALIZEMAXLAYER:{
             $desc:"序列化限制的的最深层数"
        },
        SERIALIZEMAXSIZE:{
            $desc:"序列化限制的最大对象数"
        },
        basePath:{
            $desc:"xui库所在的目录"
        },
        use:{
            $desc:"用一个xid(每个xid都会对应一个dom元素)来实现对一个dom元素的快速引用.本操作不会有新的xui.Dom对象产生",
            $rtn:"xui.Dom",
            $paras:[
                "xid [必需参数]: String. 每个xid都会对应一个dom元素"
            ],
            $snippet:[
                    "var id='xui.temp.1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=xui.create('<button>click me</button>')); o.onClick(function(p,e,xid){ xui.use(xid).text('updated')  });"+
                    "}"
            ],
            $memo:"由于本操作用的是一个缓存的xui.Dom对象,所以每次应直接对xui.use的返回值进行操作,而不要返回值作为变量值来保存"
        },
        getId:{
            $desc:"从一个dom元素或dom id得到它对应的xid",
            $rtn:'String',
            $snippet:[
                "alert(xui.getId('btnLang'))"
            ]
        },
        getNode:{
            $desc:"从一个xid得到它对应的dom元素",
            $rtn:'Object'
        },
        setNodeData:{
            $desc:"为一个dom元素设置数据",
            $rtn:"Object",
            $paras:[
                "node [必需参数]: Element/String, 要设置数据的Dom元素或xid",
                "path [必需参数]: Array, 项路径, ['a','b','c'] => {a:{b:{c:[variable]}}}",
                "value [可选参数]: any, 项的新值"
            ],
            $snippet:[
                    "var id='xui.temp.2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=xui.create('<button>click me</button>')); xui.setNodeData(o.get(0), 'key1','value1'); xui.setNodeData(o.get(0),['key21','key22'],'value2'); o.onClick(function(p,e,xid){ alert(xui.getNodeData(xid, 'key1')); alert(xui.getNodeData(xid, ['key21','key22']));});"+
                    "}"
            ]
        },
        getNodeData:{
            $desc:"得到一个dom元素上的特定数据（这个数据是由setNodeData设置的）",
            $rtn:"Object",
            $paras:[
                "node [必需参数]: Element/String, 已经设置数据的Dom元素或xid",
                "path [必需参数]: Array, 项路径"
            ],
            $snippet:[
                    "var id='xui.temp.3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=xui.create('<button>click me</button>')); xui.setNodeData(o.get(0), 'key1','value1'); xui.setNodeData(o.get(0),['key21','key22'],'value2'); o.onClick(function(p,e,xid){ alert(xui.getNodeData(xid, 'key1')); alert(xui.getNodeData(xid, ['key21','key22']));});"+
                    "}"
            ]
        },
        isDomReady:{
            $desc:"判断DOM是否加载成功",
            $rtn:"Boolean",
            $snippet:[
                "alert(xui.isDomReady)"
            ]
        },
        Locale: {
            $desc:"xui.Locale是一个键值对, 用以存储本地化的信息",
            $rtn:"Object",
            $snippet:[
                "xui.each(xui.Locale.en,function(o,i){alert(i+':'+o)})"
            ],
            $memo:"程序员请使用xui.getRes([resource key])来获取本地化的值"
        },
        browser:{
            $desc:"xui.browser是一个键值对, 用以当前浏览器的信息",
            $rtn:"Object",
            $snippet:[
                "alert(xui.serialize(xui.browser))"
            ]
        },
        ini:{
            $desc:"xui.ini 是一个键值对, 用以存储XUI库,应用程序路径等相关路径的信息, . 如果程序员使用了自定义的路径[xui_ini](XUI库加载前申明.),这些自定义的路径也将被合并到[xui.ini]里面",
            $rtn:"Object",
            $snippet:[
                "alert(xui.serialize(xui.ini))"
            ]
        },
        win:{
            $desc:"xui([window])的快捷访问",
            $rtn:"xui.Dom"
        },
        doc:{
            $desc:"xui([document])的快捷访问",
            $rtn:"xui.Dom"
        },
        create:{
            $desc:"生成一个DOM element 或 xui.UI 对象",
            $rtn:"xui.Dom/xui.UI",
            $snippet:[
                "//输入一个DOM节点的名字来生成DOM元素\n var a=xui.create('div'); alert(a.get(0).nodeName)",
                "//输入一个html字符串来生成DOM元素\n var a=xui.create('<div>node</div>'); alert(a.get(0).nodeName)",
                "//输入UI类的名字来生成一个控件\n var a=xui.create('xui.UI.Button'); alert(a.get(0).key)",
                "//输入UI类的名字和其他参数来生成一个控件\n //parameters: // key,properties, events, host \n var a=xui.create('xui.UI.Button',{caption:'btn'}); alert(a.get(0).key)",
                "//输入一个UI类的profile变量来生成一个控件\n var profile = (new xui.UI.Button()).get(0); var a=xui.create(profile); alert(a.get(0).key)"
            ]
        },
        getObject:{
            $desc:"每一个控件对象都有一个全局唯一的id, 调用该函数可以获取该id对应的对象",
            $rtn:'xui.UIProfile',
            $paras:[
                "id [必需参数]: String, 控件的全局 id"
            ],
            $snippet:[
                "var id=xui.UI.getAll().get(0).getId(); alert(xui.getObject(id).key);"
            ]
        },
        getObjectByAlias:{
            $desc:"从控件的别名取得控件",
            $rtn:'xui.absBox',
            $paras:[
                "alias [必需参数]: String, 控件的全局 alias"
            ]
        },
        getPath:{
            $desc:"获取类（或其他文件）存放的绝对URL路径",
            $rtn:'String',
            $paras:[
                "key [必需参数]: String, 类名",
                "tag [可选参数]: String, 文件后缀",
                "folder [可选参数]: String, 文件夹名"
            ],
            $snippet:[
                "alert(xui.getPath('a.b.c')); alert(xui.getPath('a.b.c','.js')); alert(xui.getPath('a.b.c','.gif','img')); ",
                "alert(xui.getPath('xui.b.c')); alert(xui.getPath('xui.b.c','.js')); alert(xui.getPath('xui.b.c','.gif','img')); "
            ]
        },
        adjustVar:{
            $desc:"尝试将内部的XUI伪代码变量调整到JS变量",
            $rtn:"Object",
            $paras:[
                "obj [必需参数]: Object,  变量",
                "scope [可选参数]: Object, 作用域对象. 默认为 [window]"
            ]
        },
        adjustRes:{
            $desc:"调整字符串内部的资源字符串",
            $rtn:'String',
            $paras:[
                "str [必需参数]: String, 包含资源id的字符串",
                "wrap [可选参数]: Boolean, 如果含有资源id的话,是否用wrapRes来替换. 默认为 false,表示用getRes来替换"
            ],
            $snippet:[
                "alert(xui.adjustRes('$color.LIST.E1FFFF $color.LIST.E1FFFF $abd.kkk  $abc')); "
            ]
        },
        getRes:{
            $desc:"获取资源id对应的资源串",
            $rtn:'String',
            $paras:[
                "id [必需参数]: String, 资源id"
            ],
            $snippet:[
                "alert(xui.getRes('doc.xui.Class.$$desc')); alert(xui.Locale[xui.getLang()].doc.xui.Class.$$desc); ",
                "alert(xui.getRes('color.LIST.E1FFFF')); alert(xui.Locale[xui.getLang()].color.LIST.E1FFFF); ",
                "//如果不存在,返回最后一个关键字 \n alert(xui.getRes('doesnt.exist'))"

            ],
            $memo:"所有的资源字符串都位于 [xui.Locale] <br \> [<a href='#xui.setLang'>xui.setLang</a>], [<a href='#xui.getRes'>xui.getRes</a>/<a href='#xui.wrapRes'>xui.wrapRes</a>] 通常一起使用"
        },
        fetchClass:{
            $desc:"得到本地或远程文件中的类",
            $paras:[
                "uri [必需参数]: String, .js 文件路径",
                "onSuccess [可选参数]: Function(class, uir), 成功时触发的回调函数",
                "onFail [可选参数]: Function, 失败时触发的回调函数",
                "onAlert [可选参数]: Function, 警告时触发的回调函数",
                "force [可选参数]: Boolean, 是否强制重新读取文件"
            ]
        },
        include:{
            $desc:"将某个类的.js 包含到当前文档中",
            $paras:[
                "id [必需参数]: String, 特征字符串（包括名字空间的类名字）. 如果该类已经存在,则直接返回不会在做包含文件的工作. 如果强制包含文件,该参数可以设置为 '' ",
                "path [必需参数]: String, .js 文件路径",
                "onSuccess [可选参数]: Function, 包含文件成功时触发的回调函数",
                "onFail [可选参数]: Function, 包含文件失败时触发的回调函数",
                "sync [可选参数]: Boolean, 是否同步. 如果是同步,要确保path在同域名下",
                "options [可选参数]: Object, 一组配置数据"
            ],
            $snippet:[
                "//改类已经存在,会直接调用onSuccess. \n"+
                "xui.include('xui.Thread', '../js/clsname.js',function(){alert('success');},function(){alert('fail')});",
                "//包含一个存在的 .js 文件\n"+
                "App.Test1=undefined; xui.include('App.Test1', 'App/js/Test1.js',function(){alert('success');},function(){alert('fail')});",
                "//包含一个不存在的.js文件 \n " +
                "xui.include('App.doesntexist', 'App/js/doesntexist.js', function(){alert('success');},function(){alert('fail')});"
            ]
        },
        mailTo:{
            $desc:"弹出系统邮件发送窗口",
            $paras:[
                "email [必需参数]: String, 邮件地址",
                "subject [可选参数]: String, 标题",
                "body [可选参数]: String, 内容",
                "cc [可选参数]: String, 抄送地址",
                "bcc  [可选参数]: String, 暗送地址"
            ]
        },
        require:{
            $desc:"确保某个类加载到内存",
            $paras:[
                "cls [必需参数]: String, 符合XUI规范的类名",
                "onEnd [可选参数]: Function, 结束回调函数",
                "onSuccess [可选参数]: Function(class, uir), 成功时触发的回调函数",
                "onFail [可选参数]: Function, 失败时触发的回调函数",
                "onAlert [可选参数]: Function, 警告时触发的回调函数",
                "force [可选参数]: Boolean, 是否强制重新读取文件"
            ],
            $snippet:[
                "// 同步获取一个存在的 .js 文件\n"+
                "App.Test1=undefined; xui.require('App.Test1',function(cls){alert(cls.KEY);},null,false); ",
                "// 一个不存在的.js文件 \n " +
                "xui.require('App.doesntexist',function(rsp){alert(rsp)});"
            ]
        },
        request:{
            $desc:"向特定的服务地址发送数据请求. xui.request会按照情况选用xui.Ajax, xui.SAjax 或 xui.IAjax： "+
                  "<br /><b>默认=>xui.Ajax; 目标地址跨域=>xui.SAjax; 如果用'post'方法=>xui.IAjax;</b>",
            $paras:[
                "uri [必需参数]: String, 目标地址",
                "query [可选参数]:  Object/String, 请求的输入数据",
                "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数",
                "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数",
                "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                "options [可选参数]: Object, 一组配置数据"
            ],
            $memo:"请参考 <a href='#xui.Ajax'>xui.Ajax</a>, <a href='#xui.SAjax'>xui.SAjax</a>, <a href='#xui.IAjax'>xui.IAjax</a>!"
        },
        restGet:{
            $desc:"调用 RESTful GET 服务",
            $paras:[
                "uri [必需参数]: String, 目标地址",
                "query [可选参数]:  Object/String, 请求的输入数据",
                "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数",
                "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数",
                "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                "options [可选参数]: Object, 一组配置数据"
            ]
        },
        restPost:{
            $desc:"调用 RESTful POST 服务 ",
            $paras:[
                "uri [必需参数]: String, 目标地址",
                "query [可选参数]:  Object/String, 请求的输入数据",
                "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数",
                "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数",
                "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                "options [可选参数]: Object, 一组配置数据"
            ]
        },
        restPut:{
            $desc:"调用 RESTful PUT 服务 ",
            $paras:[
                "uri [必需参数]: String, 目标地址",
                "query [可选参数]:  Object/String, 请求的输入数据",
                "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数",
                "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数",
                "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                "options [可选参数]: Object, 一组配置数据"
            ]
        },
        restDelete:{
            $desc:"调用 RESTful DELETE 服务 ",
            $paras:[
                "uri [必需参数]: String, 目标地址",
                "query [可选参数]:  Object/String, 请求的输入数据",
                "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数",
                "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数",
                "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                "options [可选参数]: Object, 一组配置数据"
            ]
        },
        log:{
            $desc:"记录信息到Debugger窗口,默认使用当前环境中有window.console.loge功能,否则会调用xui.echo",
            $snippet:[
                "xui.log(1,'a',[],{});"
            ],
            $memo:"同时可以输入多个参数;必需使用xui.Debugger.js 来开启Debugger功能"
        },
        echo:{
            $desc:"记录信息到xui的Debugger窗口",
            $snippet:[
                "xui.echo(1,'a',[],{});"
            ],
            $memo:"同时可以输入多个参数;必需使用xui.Debugger.js 来开启Debugger功能"
        },
        main:{
            $desc:"指定主函数,该函数在DOM加载完成后执行. 程序员可以指定多个主函数. 这些函数将以出现的顺序执行",
            $paras:[
                'fun [必需参数]: Function, Dom ready后要执行的主函数'
            ],
            $snippet:[
                "//xui.main(function(){alert('first')}); \n//xui.main(function(){alert('second')}); \n ////The above code will bind two functions to DOM ready event"
            ]
        },
       launch:{
            $desc:"加载一个 xui.Module 类, 并显示",
            $paras:[
                "cls [必需参数] : String, 类名字",
                "onEnd [可选参数]: Function(err:Error/String, module: xui.Module). 类加载完之后调用",
                "lang [可选参数] : String, 语言名称.(例如, 'en')",
                "theme [可选参数] : String, 主题名称.(例如, 'vis')",
                "showUI [可选参数] : Boolean, 是否显示界面. 默认为 true;"
            ],
            $memo:"与xui.Module.load相同"
        },
        getModule :{
            $desc:"加载一个Module类",
            $rtn:"xui.Module",
            $paras:[
                "cls [必需参数] : String, 应用模块对象类名",
                "onEnd [可选参数] : Function(err:Error/String, module: xui.Module, threadid:String), 回调函数, 生成应用模块对象(Module Object)成功后被调用",
                "threadid [可选参数] : String, 内部线程id",
                "cached [可选参数] : Boolean, 默认为 true, 优先从缓存中获取，加载后缓存. 当 cached 为 false 的时候相当于 xui.newModule",
                "properties [可选参数] : Object, 键值对,module的属性",
                "events [可选参数] : Object, 键值对,module的事件"
            ],
            $memo:"与xui.ModuleFactory.getModule相同"
        },
        newModule:{
            $desc:"加载一个Module类",
            $paras:[
                "cls [必需参数] : String, 应用模块类的路径名字",
                "onEnd [可选参数] : Function(err:Error/String, module: xui.Module, threadid:String), 回调函数,加载应用模块类成功后被调用",
                "threadid [可选参数] : String, the inner threadid",
                "properties [可选参数] : Object, 键值对,module的属性",
                "events [可选参数] : Object, 键值对,module的事件"
            ],
            $memo:"与xui.ModuleFactory.newModule相同"
        },
        showModule:{
            $desc:"加载一个Module类，并显示",
            $paras:[
                "cls [必需参数] : String, 应用模块类的路径名字",
                "beforeShow[可选参数] : Function(module: xui.Module, threadid:String), 回调函数, 类生成后显示前调用,如返回false,默认的show功能被屏蔽",
                "onEnd [可选参数] : Function(err:Error/String, module: xui.Module, threadid:String), 回调函数, 加载应用模块类成功后被调用",
                "threadid [可选参数] : String, 线程id",
                "cached [可选参数] : Boolean, 默认为 true,优先从缓存中获取，加载后缓存",
                "properties [可选参数] : Object, 键值对, 设置该module的属性",
                "events [可选参数] : Object, 键值对, 设置该module的事件",
                "parent [可选参数] : xui.UIProfile/xui.UI/Element/xui.Dom. 显示到的父对象",
                "subId [可选参数] : String, 父对象容器的id",
                "left [可选参数] : Number, 显示的左边坐标",
                "top [可选参数] : Number, 显示的上边坐标"
            ]
        },
        message:{
            $desc:"显示一个文本消息",
            $paras:[
                "body [必需参数]: String, 消息内容",
                "head [可选参数]: String, 消息标题",
                "width [可选参数]: Number, 消息框宽度. 默认为 200px",
                "time [可选参数]: Number, 多少毫秒后消息框自动消失. 默认为 5000ms"
            ],
            $snippet:[
                "xui.message('A message')",
                "//宽设定为100px； 在1秒后消失. \n" +
                "xui.message('Body', 'Head', 100, 1000)"
            ],
            $memo:"要使用该函数,需要包含文件xui.Debugger.js"
        },
        alert:{
            $desc:"弹出一个警告框",
            $rtn:"xui.Dialog",
            $paras:[
                "title [可选参数] : String, 警告框标题",
                "content [可选参数] : String, 警告语句",
                "btnCap  [可选参数] : String, 按钮文字",
                "onClose [可选参数] : Function, alert窗口关闭的回调函数",
                "left [可选参数] : Number, 对话框左边坐标",
                "top [可选参数] : Number, 对话框上边坐标",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的alert窗口,默认为[false]"
            ],
            $snippet:[
                "xui.alert('title','content',function(){alert('ok')})",
                "xui.alert('title','content content content content content content content content content content content content ',function(){alert('ok')})"
            ]
        },
        confirm:{
            $desc:"弹出一个确认框",
            $rtn:"xui.Dialog",
            $paras:[
                "title [可选参数] : String, 确认框的标题",
                "content [可选参数] : String, 确认的提示语句",
                "onYes [可选参数] : Function, the Yes 回调函数",
                "onNo [可选参数] : Function, the No 回调函数",
                "btnCapYes [可选参数] : String, Yes按钮的文字",
                "btnCapNo [可选参数] : String, No按钮的文字",
                "left [可选参数] : Number, 对话框左边坐标",
                "top [可选参数] : Number, 对话框上边坐标",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的confirm窗口,默认为[false]"
            ],
            $snippet:[
                "xui.confirm('title','content',function(){alert('yes')},function(){alert('no')})",
                "xui.confirm('title','content content content content content content content content content content content content ',function(){alert('yes')},function(){alert('no')})"
            ]
        },
        pop:{
            $desc:"弹出一个简易对话框.（非模态）",
            $rtn:"xui.Dialog",
            $paras:[
                "title [可选参数] : String, 简易对话框标题文字",
                "content [可选参数] : String, 窗体内容输入文字",
                "btnCap [可选参数] : String, OK按钮文字",
                "left [可选参数] : Number, 对话框左边坐标",
                "top [可选参数] : Number, 对话框上边坐标",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id"
            ],
            $snippet:[
                "xui.pop('title','content')",
                "xui.pop('title','content content content content content content content content content content content content ','I knew it!')"
            ]
        },
        prompt:{
            $desc:"弹出一个输入框",
            $rtn:"xui.Dialog",
            $paras:[
                "title [可选参数] : String, 输入框标题文字",
                "caption [可选参数] : String, 提示文字",
                "content [可选参数] : String, 默认输入文字",
                "onYes [可选参数] : Function, 用户单击Yes 回调函数",
                "onNo [可选参数] : Function, 用户单击 No 回调函数",
                "btnCapYes [可选参数] : String, Yes按钮的文字",
                "btnCapNo [可选参数] : String, No按钮的文字",
                "left [可选参数] : Number, 对话框左边坐标",
                "top [可选参数] : Number, 对话框上边坐标",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的prompt窗口,默认为[false]"
            ],
            $snippet:[
                "xui.prompt('title','caption', 'content content ',function(str){alert(str)})"
            ]
        },
        subscribe:{
            $desc:"订阅系统消息",
            $rtn:"Integer",
            $paras:[
                "topic [必需参数]: String, 订阅的主题",
                "subscriber [必需参数]: String, 订阅者的唯一标识id",
                "receiver [必需参数]: Function, 订阅者的消息接收器. 同步的回调函数如返回false，会阻止消息发布到以后订阅者",
                "asy [可选参数]: Boolean, 是否异步订阅, 默认为[false]"
            ],
            $snippet:[
                "xui.subscribe('topic1','id1', function(msg){alert('subscriber 1th got a message: '+msg)},true);"+
                "xui.subscribe('topic1','id2', function(msg){alert('subscriber 2th got a message: '+msg);return false});"+
                "xui.subscribe('topic1','id3', function(msg){alert('subscriber 3th got a message: '+msg)});"+
                "xui.publish('topic1',['The topic1 was published!']);"+
                "xui.unsubscribe('topic1');"+
                "xui.publish('topic1');"+
                "xui.unsubscribe();"
            ]
        },
        unsubscribe:{
            $desc:"退订系统消息",
            $rtn:"undefined",
            $paras:[
                "topic [可选参数]: String, 订阅的主题. 如不指定该参数会退订所有系统中的订阅",
                "subscriber [可选参数]: String, 订阅者的唯一标识id. 如不指定该参数会退订所有topic下的订阅"
            ]
        },
        publish:{
            $desc:"发布系统消息",
            $rtn:"undefined",
            $paras:[
                "topic [可选参数]: String, 发布消息的主题. 如不指定该参数会对所有发布消息",
                "args [可选参数]: Array, 发布消息的参数",
                "subscribers [可选参数]: String/Array, 订阅者的唯一标识id. 表示只发给该订阅者(们)",
                "scope [可选参数]: Object, 发布消息所调用函数的scope"
            ]
        },
        getSubscribers:{
            $desc:"得到系统的消息订阅情况",
            $rtn:"Object",
            $paras:[
                "topic [可选参数]: String, 订阅的主题. 如不指定该参数会返回所有系统中的订阅",
                "subscriber [可选参数]: String, 订阅者的唯一标识id. 如不指定该参数会返回所有topic下的订阅"
            ]
        },

        getDateFormat:{
            $desc:"得到当前应用程序的日期序列化方式",
            $rtn:"String",
            $snippet:[
                "xui.setDateFormat('default'); alert(xui.getDateFormat()); alert(xui.serialize(new Date));",
                "xui.setDateFormat('gmt'); alert(xui.getDateFormat()); alert(xui.serialize(new Date));",
                "xui.setDateFormat('utc'); alert(xui.getDateFormat()); alert(xui.serialize(new Date));"
            ]
        },
        setDateFormat:{
            $desc:"设置当前应用程序的日期序列化方式'gmt', 'utc' 或 'default'",
            $snippet:[
                "xui.setDateFormat('default'); alert(xui.getDateFormat()); alert(xui.serialize(new Date));",
                "xui.setDateFormat('gmt'); alert(xui.getDateFormat()); alert(xui.serialize(new Date));",
                "xui.setDateFormat('utc'); alert(xui.getDateFormat()); alert(xui.serialize(new Date));"
            ]
        },
        getAppLangKey:{
            $desc:"得到当前应用程序的语言包关键字",
            $rtn:"String",
            $snippet:["xui.setAppLangKey('app'); alert(xui.getAppLangKey());"]
        },
        setAppLangKey:{
            $desc:"设置当前应用程序的语言包关键字. 如果此关键字被设置,当用 xui.setLang 设置界面语言的时候,系统会试图从 Locale/[xui.getLang()].js 文件加载当前应用程序的语言包",
            $snippet:["xui.setAppLangKey('app'); alert(xui.getAppLangKey());"]
        },
        getTheme:{
            $desc:"获取当前皮肤的关键字",
            $rtn:"String",
            $snippet:[
                "alert(xui.getTheme());"
            ]
        },
        setTheme:{
            $desc:"通过设置皮肤关键字来更改当前皮肤",
            $rtn:"[self]",
            $paras:[
                "key [可选参数] : String, 皮肤键字符串",
                "refresh [可选参数] : Boolean, 是否要刷新所有界面控件. 默认是 [true]",
                "onSuccess [可选参数]: Function, 成功时触发的回调函数",
                "onFail [可选参数]: Function, 失败时触发的回调函数"
            ],
            $snippet:[
                "//xui.setTheme('xp')"
            ]
        },
        getLang:{
            $desc:"得到界面的语言关键字",
            $rtn:"String",
            $snippet:["alert(xui.getLang());"]
        },
        setLang:{
            $desc:"重新设置整个页面的语言. 系统会重新查找(in [xui.ini.path]/Locale/)和(in [xui.ini.appPath]/Locale/)并装载语言包",
            $paras:[
                "key [必需参数]: String, 语言的关键字",
                "callback [可选参数]: Function, 回调函数"
            ],
            $memo:"所有的资源字符串都位于 [xui.Locale]. <br \> [<a href='#xui.setLang'>xui.setLang</a>], [<a href='#xui.getRes'>xui.getRes</a>/<a href='#xui.wrapRes'>xui.wrapRes</a>] 通常一起使用"
        },
        //request ( uri, query, onSuccess, onFail, threadid, args ),
        wrapRes:{
            $desc:"获取资源标志符对应的资源字符串, 并将其包装成特定的形式",
            $rtn:'String',
            $paras:[
                "id [必需参数]: String, 资源 id"
            ],
            $snippet:[
                "alert(xui.wrapRes('doc.Class.$desc')); alert(xui.Locale[xui.getLang()].doc.Class.$desc); ",
                "alert(xui.wrapRes('color.LIST.E1FFFF')); alert(xui.Locale[xui.getLang()].color.LIST.E1FFFF); ",
                "//如果不存在,返回最后一个关键字\n alert(xui.wrapRes('doesnt.exist'))"

            ],
            $memo:"所有的资源字符串都位于 [xui.Locale]. <br \> [<a href='#xui.setLang'>xui.setLang</a>], [<a href='#xui.getRes'>xui.getRes</a>/<a href='#xui.wrapRes'>xui.wrapRes</a>] 通常一起使用"
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Thread"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Thread类. 运行模式: <strong>[onStart function]--delay 1-->[task function 1][回调函数 1]--delay 2-->[task function 2][回调函数 2]--delay 3-->[task function ...n][回调函数 ...n][onEnd function]</strong>",
        $rtn:"xui.Thread",
        $paras:[
            "id [必需参数]: String, 线程的识别号. 如果已经存在这个识别号,该函数将返回对应的线程对象; 如果不存在,或函数没有指定, 系统将产生一个新的xui.Thread对象, 并给它分配一个唯一的id. 如果程序员不想指定它,可以用null",
            "tasks [必需参数]: Array, 线程要执行的函数/或函数包. 包格式:<br> { <br>"+
                    "task [必需参数],      //Function, 函数的参数: args or [threadid]. 任务函数.<br>"+
                    "args [可选参数],      //Array, 任务函数的参数.<br>"+
                    "scope [可选参数],    //Object, 任务函数的this指针.<br>"+
                    "delay [可选参数],     //Number,任务的延迟时间(毫秒).如不指定,将用默认的延迟时间.<br>"+
                    "callback [可选参数]   //Function, 函数的参数: [threadid]. 任务函数执行成功后的回调函数. 回调函数如果返回false, 线程将提前终止. <br>"+
                "}",
            "delay [可选参数]: Number, 每个任务的默认延迟时间(毫秒). 默认为 0",
            "callback [可选参数]: Function, 函数的参数: [threadid]. 默认的回调函数",
            "onStart [可选参数]: Function, 函数的参数: [threadid]. 该函数在所有任务函数开始前被调用",
            "onEnd [可选参数]: Function, 函数的参数: [threadid]. 该函数在线程结束后被调用",
            "cycle [可选参数]: 指示线程是否循环执行. 默认为 [false]"
        ],
        $snippet:[
            "xui.Thread(null, [function(){xui.message(1)},function(){xui.message(2)}]).start()",
            "xui.Thread(null, [function(){xui.message(1)},function(){xui.message(2)}],2000).start()",
            "xui.Thread('_id', [function(){xui.message(1);xui.Thread('_id').abort();},function(){xui.message(2)}]).start();",
            "xui.Thread(null, [function(){xui.message(1)},{task:function(){},callback:function(){return false}},function(){xui.message(2)}]).start()",
            "var a=[];xui.Thread(null, [function(threadid){a.push(threadid+' task1')},function(threadid){a.push(threadid+' task2')}],null,function(threadid){a.push(threadid+' callback')},function(threadid){a.push(threadid+' start')},function(threadid){a.push(threadid+' end'); alert(a);}).start()",
            "var a=[];xui.Thread(null, [function(threadid){a.push(threadid+' task1')},{task:function(threadid){a.push(threadid+' task2')},callback:function(threadid){a.push(threadid+' not the default callback')}}],null,function(threadid){a.push(threadid+' callback')},function(threadid){a.push(threadid+' start')},function(threadid){a.push(threadid+' end'); alert(a);}).start()",
            "var a=[],i=3; xui.Thread(null, [function(){a.push(1)},function(){a.push(2)}],0,function(){i--;if(!i)return false;},null,function(){alert(a);},true).start()"
        ],
        group:{
            $desc:"将一系列的xui.Thread对象(或线程id)编组, 打包到一个可执行的线程. 程序员可并行的执行他们",
            $rtn:"xui.Thread",
            $paras:[
                "id [必需参数]: String, thread id. 线程id. 不需要指定时可传入[null].",
                "group [必需参数]: Array, 一系列的xui.Thread对象(或线程id)",
                "callback [可选参数]: Function(threadid:String). 回调函数",
                "onStart [可选参数]: Function(threadid:String).  线程开始时调用",
                "onEnd [可选参数]:  Function(threadid:String).  线程结束时调用"
            ],
            $snippet:[
                "var a=[]; var t1=xui.Thread('t1',[function(){a.push(1)},function(){a.push(2)}]), t2=xui.Thread('t2',[function(){a.push('a')},function(){a.push('b')}]);"+
                "xui.Thread.group(null,[t1,'t2'],function(){a.push('|')},function(){a.push('<')},function(){a.push('>');alert(a);}).start();"
            ],
            $memo:"You have to use start function to start [thread group]!"
        },
        abort:{
            $desc:"按照识别号终止一个线程",
            $paras:[
                "id [必需参数]: String, 线程id"
            ],
            $snippet:[
                "xui.Thread('_id', [function(){xui.message(1);xui.Thread.abort('_id')},function(){xui.message(2)}]).start();"
            ]
        },
        observableRun:{
            $desc:"将一组任务函数和一个onEnd函数包装到一个从界面上可观测的线程(线程开始时会调用'dom.busy' 显示沙漏图标,线程结束的时候调用'dom.free'还原为默认图标),并执行这个线程. <br /> 如果线程号[threadid]不存在, 就产生一个新的线程. <br /> 如果线程号[threadid]存在, 则会分别插入任务和onEnd函数到现有的线程中",
            $paras:[
                "tasks [必需参数]: Array, 一系列的任务函数(functions)",
                "onEnd [可选参数]: Function, 'onEnd' 回调函数",
                "threadid [可选参数]: Stirng, 线程id. 不需要指定时可传入[null]"
            ],
            $snippet:[
                "xui.Thread.observableRun(function(){xui.message('fun')},function(){alert('end')});",
                "xui.Thread.observableRun(2000,function(){alert('end')});",
                "xui.Thread.observableRun([function(){xui.message('fun')},2000],function(){alert('end')});",
                "var a=[];xui.Thread.observableRun([{task:function(){a.push(3);},delay:2000}],function(){a.push(4);alert(a);},'__id'); xui.Thread.observableRun([function(){a.push(1)}],function(){a.push(2)},'__id');"
            ]
        },
        repeat:{
            $desc:"重复执行一个任务函数,直到这个函数返回 [false]",
            $rtn:"xui.Thread",
            $paras:[
                "task [必需参数]: Function, 要重复执行的任务",
                "interval [可选参数]: Number, 重复执行的间隔毫秒数",
                "onStart [可选参数]: Function(threadid:String).  重复执行之前调用",
                "onEnd [可选参数]:  Function(threadid:String).  重复执行之后调用"
            ],
            $snippet:[
                "var l=1; xui.Thread.repeat(function(){alert('repeat time:' + (l++)); if(l>3)return false;}, 500)"
            ]
        },
        isAlive:{
            $desc:"按照识别号判断某个线程是否还活着",
            $rtn:"Boolean",
            $paras:[
                "id [必需参数]: String, 线程id"
            ],
            $snippet:[
                "alert(xui.Thread.isAlive('_id'))",
                "var a=[];xui.Thread('_id', [function(){a.push(1);a.push(xui.Thread.isAlive('_id'));},function(){a.push(2)}],0,null,null,function(){alert(a)}).start();"
            ]
        },
        group:{
            $desc:"将一系列的xui.Thread对象(或线程id)编组, 打包到一个可执行的线程. 程序员可并行的执行他们",
            $rtn:"xui.Thread",
            $paras:[
                "id [必需参数]: String, thread id. 线程id. 不需要指定时可传入[null].",
                "group [必需参数]: Array, 一系列的xui.Thread对象(或线程id)",
                "callback [可选参数]: Function(threadid:String). 回调函数",
                "onStart [可选参数]: Function(threadid:String).  线程开始时调用",
                "onEnd [可选参数]:  Function(threadid:String).  线程结束时调用"
            ],
            $snippet:[
                "var a=[]; var t1=xui.Thread('t1',[function(){a.push(1)},function(){a.push(2)}]), t2=xui.Thread('t2',[function(){a.push('a')},function(){a.push('b')}]);"+
                "xui.Thread.group(null,[t1,'t2'],function(){a.push('|')},function(){a.push('<')},function(){a.push('>');alert(a);}).start();"
            ],
            $memo:"You have to use start function to start [thread group]!"
        },
        suspend:{
            $desc:"挂起识别号为给定值的线程",
            $paras:[
                "id [必需参数]: String, 线程id"
            ],
            $snippet:[
                "xui.Thread('_bb',[function(){xui.message(1)},function(){xui.Thread.suspend('_bb');xui.asyRun(function(){xui.Thread.resume('_bb')},3000)},function(){xui.message(2)}]).start();"
            ]
        },
        getStatus:{
            $desc:"得到线程的状态"
        },
        resume:{
            $desc:"继续执行识别号为给定值的线程",
            $paras:[
                "id [必需参数]: String, 线程id"
            ],
            $snippet:[
                "xui.Thread('_bb',[function(){xui.message(1)},function(){xui.Thread.suspend('_bb');xui.asyRun(function(){xui.Thread.resume('_bb')},3000)},function(){xui.message(2)}]).start();"
            ]
        },
        start:{
            $desc:"开始执行识别号为给定值的线程",
            $paras:[
                "id [必需参数]: String, 线程id"
            ],
            $snippet:[
                "xui.Thread('_t1', [function(){xui.message(1)},function(){xui.message(2)}]); xui.Thread.start('_t1')"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            links:{
                $desc:"将另一个线程链接到本线程, 并在本线程的回调函数[onEnd]结束后开始执行另一个线程",
                $rtn:"[self]",
                $paras:[
                    "thread [必需参数] : xui.Thread Object, 要链接的线程对象"
                ],
                $snippet:[
                    "var out=[];var t1=xui.Thread(null,[function(){out.push(2)},function(){out.push(3)}],null,null,function(){out.push(1)},function(){out.push(4)});" +
                    "var t2=xui.Thread(null,[function(){out.push(6)},function(){out.push(7)}],null,null,function(){out.push(5)},function(){out.push(8);alert(out);});" +
                    "t1.links(t2); t1.start();"
                ]
            },
            isAlive:{
                $desc:"判断线程是否还活着",
                $rtn:"Boolean"
            },
            abort:{
                $desc:"终止该线程",
                $snippet:[
                    "xui.Thread('_id', [function(){xui.message(1);xui.Thread('_id').abort();},function(){xui.message(2)}]).start();"
                ]
            },
            suspend:{
                $desc:"挂起该线程",
                $rtn:"[self]",
                $paras:[
                    "time [可选参数]: Number: 等待多少毫秒后继续。不输入表示只挂起，不继续。"
                ],
                $snippet:[
                    "xui.Thread('_bb',[function(){xui.message(1)},function(){xui.Thread('_bb').suspend();xui.asyRun(function(){xui.Thread('_bb').resume();},3000)},function(){xui.message(2)}]).start();"
                ]
            },
            resume:{
                $desc:"继续执行一个被挂起的线程",
                $rtn:"[self]",
                $paras:[
                    "time [可选参数]: undefined/Number/Boolean.<br> "+
                        "Number: 等待多少毫秒后继续. <br> "+
                        "true: 等待默认毫秒后继续. <br> "+
                        "false: 马上继续. <br> "+
                        "undefined: 等待剩余时间后继续. <br> "
                ],
                $snippet:[
                    "xui.Thread('_bb',[function(){xui.message(1)},function(){xui.Thread('_bb').suspend();xui.asyRun(function(){xui.Thread('_bb').resume();},3000)},function(){xui.message(2)}]).start();"
                ]
            },
            start:{
                $desc:"开始执行该线程",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数]: String, 线程id"
                ],
                $snippet:[
                    "xui.Thread('_t1', [function(){xui.message(1)},function(){xui.message(2)}]); xui.Thread.start('_t1')"
                ]
            },
            getCache:{
                $desc:"获取线程的缓存数据",
                $rtn:"Object",
                $paras:[
                    "key [必需参数]: String, 缓存标志符"
                ],
                $snippet:[
                    "xui.Thread(null, [function(){this.setCache('k','v')},function(){xui.message(this.getCache('k'))}]).start();"
                ]
            },
            setCache:{
                $desc:"设置线程的缓存数据",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数]: String, 缓存标志符",
                    "value [必需参数]: String, 缓存的数据"
                ],
                $snippet:[
                    "xui.Thread(null, [function(){this.setCache('k','v')},function(){xui.message(this.getCache('k'))}]).start();"
                ]
            },
            insert:{
                $desc:"添加一些任务函数到当前线程中",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数]: Array, 添加的任务函数",
                    "index [可选参数]: Nubmer, 插入函数的位置. 默认为 当前位置(插入到下一个要被执行的任务函数前)"
                ],
                $snippet:[
                    "var out=[];xui.Thread(null,[function(){out.push(1)},function(){this.insert([function(){out.push(1.5)}])},function(){out.push(2)}],null,null,null,function(){alert(out)}).start();"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","absIO"], {
        /*buildQS:{
            $desc:"To build query string",
            $rtn:"String",
            $paras:[
                "hash [必需参数]: Object, target Object to build query string",
                "force [可选参数]: Boolean, true: to return 'a serialized String'. false: to return a 'A URL query string'"
            ],
            $snippet:[
                "alert(xui.absIO.buildQS({a:1,b:{aa:1,bb:2}},true)); alert(xui.absIO.buildQS({a:1,b:{aa:1,bb:2}}));"
            ]
        },*/
        groupCall:{
            $desc:"将一系列的xui.absIO对象编组, 并包装到一个线程中. 程序员可并行的执行他们",
            $rtn:"xui.Thread",
            $paras:[
                "hash [必需参数]: Object, 一系列的xui.absIO对象",
                "callback [可选参数]: Function,  当每个xui.absIO对象都终止后,该函数将被调用",
                "onStart [可选参数]: Function, 当对应的线程开始时调用thread",
                "onEnd [可选参数]: Function, 当对应的线程结束时调用",
                "threadid [可选参数]: String, a thread id to be bound to the current request. [suspend the thread -> execute the request -> resume the thread]"
            ],
            $snippet:[
                "var out=[];var a=xui.Ajax('uri1',0,0,0,0,{retry:0,timeout:500}), b=xui.SAjax('uri2',0,0,0,0,{retry:0,timeout:500}), c=xui.IAjax('uri3',0,0,0,0,{retry:0,timeout:500}); xui.absIO.groupCall({a:a,b:b,c:c},function(id){out.push(id+' end')},function(){out.push('start')},function(){out.push('end');alert(out)}).start();"
            ]
        },
        isCrossDomain:{
            $desc:"判断给定的URI是否跨域",
            $rtn:"Boolean",
            $paras:[
                "uri [必需参数]: String, URI路径字符串"
            ],
            $snippet:[
                "alert(xui.absIO.isCrossDomain(location.href));alert(xui.absIO.isCrossDomain('http://www.google.com'));"
            ]
        },
        customQS: {
            $desc:"自定义一个请求字符串. 子类可覆盖该函数,以增加多的参数等",
            $rtn:"Object",
            $paras:[
                "obj [必需参数]: Object or String, 原始的请求字符串"
            ]
        },
        "get":{
            $desc:"用GET方法进行远程调用",
            $rtn:"xui.absIO",
            $paras:[
                "uri [必需参数]: String, 请求服务的 URL 地址",
                "query [可选参数]:  Object/String, 要请求的数据",
                "onSuccess [可选参数]: Function(response:Object, responsetype:String, threadid:String).如请求成功返回,调用这个回调函数",
                "onFail [可选参数]: Function(response:Object, responsetype:String, threadid:String). 如请求失败,调用这个回调函数",
                "threadid [可选参数]: String,  绑定的线程ID",
                "options [可选参数]: Object, 用来配置这个request的一组键值对" 
            ]
        },
        "post":{
            $desc:"用POST方法进行远程调用",
            $rtn:"xui.absIO",
            $paras:[
                "uri [必需参数]: String, 请求服务的 URL 地址",
                "query [可选参数]:  Object/String, 要请求的数据",
                "onSuccess [可选参数]: Function(response:Object, responsetype:String, threadid:String).如请求成功返回,调用这个回调函数",
                "onFail [可选参数]: Function(response:Object, responsetype:String, threadid:String). 如请求失败,调用这个回调函数",
                "threadid [可选参数]: String,  绑定的线程ID",
                "options [可选参数]: Object, 用来配置这个request的一组键值对" 
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            start:{
                $desc:"开始执行xui.absIO对象",
                $rtn:"[self]",
                $snippet:[
                    "//xui.Ajax('uri').start();"
                ]
            },
            isAlive:{
                $desc:"判断 IO 是否还活着",
                $rtn:"Boolean"
            },
            abort:{
                $desc:'取消执行xui.absIO对象',
                $snippet:[
                    "//var a=xui.Ajax('uri').start(); \n //a.abort();"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","MessageService"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.MessageService 类",
        prototype:{
            subscribe:{
                $desc:"订阅消息",
                $rtn:"Integer",
                $paras:[
                    "topic [必需参数]: String, 订阅的主题",
                    "subscriber [必需参数]: String, 订阅者的唯一标识id",
                    "receiver [必需参数]: Function, 订阅者的消息接收器. 同步的回调函数如返回false，会阻止消息发布到以后订阅者",
                    "asy [可选参数]: Boolean, 是否异步订阅, 默认为[false]"
                ],
                $snippet:[
                    "var jsm=new xui.MessageService();"+
                    "jsm.subscribe('topic1','id1', function(msg){alert('subscriber 1th got a message: '+msg)},true);"+
                    "jsm.subscribe('topic1','id2', function(msg){alert('subscriber 2th got a message: '+msg);return false});"+
                    "jsm.subscribe('topic1','id3', function(msg){alert('subscriber 3th got a message: '+msg)});"+
                    "jsm.publish('topic1',['The topic1 was published!']);"+
                    "jsm.unsubscribe('topic1');"+
                    "jsm.publish('topic1');"+
                    "jsm.unsubscribe();"
                ]
            },
            unsubscribe:{
                $desc:"退订消息",
                $rtn:"undefined",
                $paras:[
                    "topic [可选参数]: String, 订阅的主题. 如不指定该参数会退订所有的订阅",
                    "subscriber [可选参数]: String, 订阅者的唯一标识id. 如不指定该参数会退订所有topic下的订阅"
                ]
            },
            publish:{
                $desc:"发布消息",
                $rtn:"undefined",
                $paras:[
                    "topic [可选参数]: String, 发布消息的主题. 如不指定该参数会对所有发布消息",
                    "args [可选参数]: Array, 发布消息的参数",
                    "scope [可选参数]: Object, 发布消息所调用函数的scope"
                ]
            },
            getSubscribers:{
                $desc:"得到消息订阅情况",
                $rtn:"Object",
                $paras:[
                    "topic [可选参数]: String, 订阅的主题. 如不指定该参数会返回所有的订阅",
                    "subscriber [可选参数]: String, 订阅者的唯一标识id. 如不指定该参数会返回所有topic下的订阅"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","XML"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.XML 类(静态类)",
        json2xml:{
            $desc:"实现 XML 向 JSON 的转换.输入json Object,输出转换后的 xml 文本",
            $rtn:"String",
            $paras:[
                "jsonObj [必需参数] : Object, JOSON 变量"
            ],
            $snippet:["alert(xui.XML.json2xml({root:{a:1,b:'b','@attr':'r','#text':'text','#cdata':'data'}}))"]
        },
        xml2json:{
            $desc:"实现 JSON 向 XML 的转换.输入 xml Object,输出转换后的 json Object",
            $rtn:"Object",
            $paras:[
                "xmlObj [必需参数] : Object, XML 变量",
                "kf [可选参数]: Function, 对键值对key字符串的filter函数",
                "vf [可选参数]: Function, 对键值对value字符串的filter函数"
            ],
            $snippet:["alert(xui.serialize(xui.XML.xml2json(xui.XML.parseXML('<a attr=\"1\"><b>v</b></a>'))))"]
        },
        parseXML:{
            $desc:"从文本解析到一个XML变量",
            $rtn:"Object",
            $paras:[
                "xmlText [必需参数] : String, XML 文本"
            ],
            $snippet:["alert(xui.serialize(xui.XML.xml2json(xui.XML.parseXML('<a attr=\"1\"><b>v</b></a>'))))"]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","XMLRPC"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.XMLRPC 类(静态类)",
        wrapRequest:{
            $desc:"为一次XML RPC调用包装XML字符串",
            $rtn:"String",
            $paras:[
                "methodName [必需参数] : String, 要调用的 XML RPC 方法名",
                "params [必需参数] : Object, XML RPC 的调用参数"
            ]
        },
        parseResponse:{
            $desc:"把从XML RPC返回的文档对象解析到JSON变量",
            $rtn:"Object",
            $paras:[
                "xmlObj [必需参数] : Object, XML 文档对象"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","SOAP"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.SOAP 类(静态类)",
        RESULT_NODE_NAME:{
            $desc:"SOAP返回的根节点名字（可自定义）",
            $snippet:["alert(xui.SOAP.RESULT_NODE_NAME)"]
        },
        wrapRequest:{
            $desc:"为一次SOAP调用包装XML字符串",
            $rtn:"String",
            $paras:[
                "methodName [必需参数] : String, 要调用的 SOAP 方法名",
                "params [必需参数] : Object, SOAP 的调用参数",
                "wsdl  [必需参数] : Object, SOAP 的wsdl文档"
            ]
        },
        parseResponse:{
            $desc:"把从XML RPC返回的文档对象解析到JSON变量",
            $rtn:"Object",
            $paras:[
                "xmlObj [必需参数] : Object, XML 文档对象",
                "methodName [必需参数] : String, 调用的 SOAP 方法名",
                "wsdl  [必需参数] : Object, SOAP 的wsdl文档"
            ]
        },
        getWsdl:{
            $desc:"得到SOAP调用的WSDL文档（同步方式）",
            $rtn:"Object",
            $paras:[
                "queryURL [必需参数] : String, SOAP服务地址",
                "onFail [必需参数] : Function, 失败时调用的回调函数"
            ]
        },
        getNameSpace:{
            $desc:"得到wsdl文档的命名空间",
            $rtn:"String",
            $paras:[
                "wsdl  [必需参数] : Object, SOAP 的wsdl文档"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Ajax"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Ajax类. 可处理同域 GET/POST 请求, 可以是同步请求",
        $rtn:"xui.Ajax",
        $paras:[
            "uri [必需参数]: String/Object, String -- 请求服务的 URL 地址; Object(这时候uri参数等同于 options ) -- 一组用来配置request的键值对. 如果这个参数是Object, 后续的其他参数会被忽略",
            "query [可选参数]:  Object/String, 要请求的数据",
            "onSuccess [可选参数]: Function(response:Object, responsetype:String, threadid:String).如请求成功返回,调用这个回调函数",
            "onFail [可选参数]: Function(response:Object, responsetype:String, threadid:String). 如请求失败,调用这个回调函数",
            "threadid [可选参数]: String, 绑定到这个请求的线程id号. 线程操作的顺序：[挂起这个thread -> 执行request -> 继续这个thread]",
            "options [可选参数]: Object, 用来配置这个request的一组键值对. 这些键值对可以包括：" +
                "<br>{"+
                "<br><em>//variables</em>"+
                "<br>&nbsp;&nbsp;uri: String, 请求服务的 URL 地址"+
                "<br>&nbsp;&nbsp;query: String/Object, 请求的数据"+
                "<br>&nbsp;&nbsp;threadid: String, 绑定到这个请求的线程id号"+
                "<br>&nbsp;&nbsp;asy: Boolean, 请求是否为同步请求. 默认为 [false]"+
                "<br>&nbsp;&nbsp;<strong>method: 'GET' 或 'POST', 请求的方法. 默认为 'GET'.</strong>"+
                "<br>&nbsp;&nbsp;retry: Number, 请求所允许的重试次数"+
                "<br>&nbsp;&nbsp;timeout: Number, 请求的超时毫秒数"+
                "<br>&nbsp;&nbsp;reqType: String, 'form'(Ajax), 'json'(Ajax), 或 'xml'(Ajax). 请求返回的数据类型,默认是'form'"+
                "<br>&nbsp;&nbsp;rspType: String, 'json'(Ajax), 'text'(SAjax), 'script'(Sjax) 或 'xml'(Ajax). 请求返回的数据类型.,默认是'json'"+
                "<br><em>//functions</em>"+
                "<br>&nbsp;&nbsp;cusomQS: Function, 函数参数: [obj, type]. 用来自定义query string对象的函数"+
                "<br><em>//normal events</em>"+
                "<br>&nbsp;&nbsp;onSuccess: Function, 函数参数:[response Object, 如请求成功返回,调用这个回调函数"+
                "<br>&nbsp;&nbsp;onFail: Function(response:Object, responsetype:String, threadid:String).  如请求失败,调用这个回调函数"+
                "<br><em>//trace events</em>"+
                "<br>&nbsp;&nbsp;onRetry: Function, 函数参数:[the current retry time], 请求失败重试时调用的函数"+
                "<br>&nbsp;&nbsp;onTimeout: Function, 请求超时的时候调用的函数"+
                "<br>&nbsp;&nbsp;onStart: Function, 请求开始时调用的函数"+
                "<br>&nbsp;&nbsp;onEnd: Function, 请求结束时调用的函数"+
                "<br><em>//before events</em>"+
                "<br>&nbsp;&nbsp;beforeStart: Function. 在请求数据发送前调用,如果这个函数返回 [false] ,请求会终止"+
                "<br>&nbsp;&nbsp;beforeFail: Function, 函数参数:[error Object, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onFail 函数将被忽略"+
                "<br>&nbsp;&nbsp;beforeSuccess: Function, 函数参数:[response, response type, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onSuccess 函数将被忽略"+
                "<br>}"
        ],
        $snippet:[
            "var out=[]; xui.Ajax('no.js','', function(){out.push('ok')}, function(){out.push('fail');alert(out);}, null, { onStart:function(){out.push('onStart')}, onEnd:function(){out.push('onEnd') }, onTimeout:function(){out.push('onTimeout')}, onRetry:function(){out.push('onRetry')} }).start();",
            "/*\n//The most common usage: \n"+
             "xui.Thread.observableRun(null,[function(threadid){\n"+
             "       xui.Ajax('request.php',hash, function(response){\n"+
             "               //setResponse(response);\n"+
             "           }, function(msg){\n"+
             "               //show error msg\n"+
             "           },\n"+
             "       threadid).start();\n"+
             "   }]);*/"
        ],
        $memo:"通常建议程序员使用 [xui.request] 来处理一般的请求, 该函数可以自动的判断是否跨域,method的类型,然后选择ajax/sajax/iajax之一",
        callback:{
            $desc:"String, 默认的回调函数名称. <strong>服务器需要在返回结构中匹配它.</strong>",
            $snippet:["alert(xui.Ajax.callback)"]
        },
        method:{
            $desc:"String, 默认的method名称('GET' or 'POST')",
            $snippet:["alert(xui.Ajax.method)"]
        },
        optimized:{
            $desc:"Boolean, 默认的是否优化选项. <strong>会设置一些优化的header.</strong>",
            $snippet:["alert(xui.Ajax.optimized)"]
        },
        retry:{
            $desc:"Number, 默认的重试次数",
            $snippet:["alert(xui.Ajax.retry)"]
        },
        reqType:{
            $desc:"String, 默认的请求发送类型",
            $snippet:["alert(xui.Ajax.reqType)"]
        },
        rspType:{
            $desc:"String, 默认的返回类型",
            $snippet:["alert(xui.Ajax.rspType)"]
        },
        uid:{
            $desc:"String,  唯一id "
        },
        timeout:{
            $desc:"Number, 默认的超时时间",
            $snippet:["alert(xui.Ajax.timeout)"]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            start:{
                $desc:"开始执行本次请求",
                $rtn:"[self]",
                $snippet:[
                    "//xui.Ajax('uri').start();"
                ]
            },
            abort:{
                $desc:'终止本次请求',
                $snippet:[
                    "//var a=xui.Ajax('uri').start(); \n //a.abort();"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","SAjax"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.SAjax类. 可处理跨域的 GET/POST 数据请求",
        $rtn:"xui.SAjax",
        $paras:[
            "uri [必需参数]: String/Object, String -- 请求服务的 URL 地址; Object(这时候uri参数等同于 options ) -- 一组用来配置request的键值对. 如果这个参数是Object, 后续的其他参数会被忽略",
            "query [可选参数]:  Object/String, 要请求的数据",
            "onSuccess [可选参数]: Function(response:Object, responsetype:String, threadid:String).如请求成功返回,调用这个回调函数",
            "onFail [可选参数]: Function(response:Object, responsetype:String, threadid:String). 如请求失败,调用这个回调函数",
            "threadid [可选参数]: String, 绑定到这个请求的线程id号. 线程操作的顺序：[挂起这个thread -> 执行request -> 继续这个thread]",
            "options [可选参数]: Object, 用来配置这个request的一组键值对. 这些键值对可以包括：" +
                "<br>{"+
                "<br><em>//variables</em>"+
                "<br>&nbsp;&nbsp;uri: String, 请求服务的 URL 地址"+
                "<br>&nbsp;&nbsp;query: String/Object, 请求的数据"+
                "<br>&nbsp;&nbsp;threadid: String, 绑定到这个请求的线程id号"+
                "<br>&nbsp;&nbsp;retry: Number, 请求所允许的重试次数"+
                "<br>&nbsp;&nbsp;timeout: Number, 请求的超时毫秒数"+
                "<br>&nbsp;&nbsp;reqType: String, 'form'或'json'. 请求返回的数据类型,默认是'form'"+
                "<br>&nbsp;&nbsp;rspType: String, 'text' 或 'script'. 请求返回的数据类型,默认是'text'"+
                "<br><em>//functions</em>"+
                "<br>&nbsp;&nbsp;cusomQS: Function(obj:Object, type:String). 用来自定义query string对象的函数"+
                "<br><em>//normal events</em>"+
                "<br>&nbsp;&nbsp;onSuccess: Function, 函数参数:[response Object, 如请求成功返回,调用这个回调函数"+
                "<br>&nbsp;&nbsp;onFail: Function(response:Object, responsetype:String, threadid:String).  如请求失败,调用这个回调函数"+
                "<br><em>//trace events</em>"+
                "<br>&nbsp;&nbsp;onRetry: Function, 函数参数:[the current retry time], 请求失败重试时调用的函数"+
                "<br>&nbsp;&nbsp;onTimeout: Function, 请求超时的时候调用的函数"+
                "<br>&nbsp;&nbsp;onStart: Function, 请求开始时调用的函数"+
                "<br>&nbsp;&nbsp;onEnd: Function, 请求结束时调用的函数"+
                "<br><em>//before events</em>"+
                "<br>&nbsp;&nbsp;beforeStart: Function. 在请求数据发送前调用,如果这个函数返回 [false] ,请求会终止"+
                "<br>&nbsp;&nbsp;beforeFail: Function, 函数参数:[error Object, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onFail 函数将被忽略"+
                "<br>&nbsp;&nbsp;beforeSuccess: Function, 函数参数:[response, response type, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onSuccess 函数将被忽略"+
                "<br>}"
        ],
        $snippet:[
            "/*\n//The most common usage: \n"+
             "xui.Thread.observableRun(null,[function(threadid){\n"+
             "       xui.SAjax('request.php',hash, function(response){\n"+
             "               //setResponse(response);\n"+
             "           }, function(msg){\n"+
             "               //show error msg\n"+
             "           },\n"+
             "       threadid).start();\n"+
             "   }]);*/"
        ],
        $memo:"<br />1.使用[xui.include]来包含一个.js文件.<br />2.使用[xui.request]处理一般的请求, 它可以根据url来来自动判断使用ajax或是sajax",
        callback:{
            $desc:"String, 默认的回调函数名关键字. <strong>服务器需要在返回的内容中用相同的关键字.</strong>",
            $snippet:["alert(xui.SAjax.callback)"]
        },
        method:{
            $desc:"String, 默认的method('GET' 或 'POST')",
            $snippet:["alert(xui.SAjax.method)"]
        },
        optimized:{
            $desc:"Boolean, 默认的是否优化选项. <strong>会设置一些优化的header.</strong>",
            $snippet:["alert(xui.Ajax.optimized)"]
        },
        retry:{
            $desc:"Number, 默认的重试次数",
            $snippet:["alert(xui.SAjax.retry)"]
        },
        reqType:{
            $desc:"String, 默认的请求发送类型",
            $snippet:["alert(xui.SAjax.reqType)"]
        },
        rspType:{
            $desc:"String, 默认的返回内容类型",
            $snippet:["alert(xui.SAjax.rspType)"]
        },
        uid:{
            $desc:"String,  唯一id "
        },
        timeout:{
            $desc:"Number, 默认的超时时间",
            $snippet:["alert(xui.SAjax.timeout)"]
        },
        customQS: {
            $desc:"自定义的请求字符串. 子类可覆盖该函数,以添加自定义的参数等等",
            $rtn:"Object",
            $paras:[
                "obj [必需参数]: Object, original Object"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            start:{
                $desc:"开始执行一个xui.SAjax对象",
                $rtn:"[self]",
                $snippet:[
                    "//xui.SAjax('uri').start();"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","IAjax"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.IAjax类. 可处理跨域的 GET/POST 请求, 可与远程服务器交流文件",
        $rtn:"xui.IAjax",
        $paras:[
            "uri [必需参数]: String/Object, String -- 请求服务的 URL 地址; Object(这时候uri参数等同于 options ) -- 一组用来配置request的键值对. 如果这个参数是Object, 后续的其他参数会被忽略",
            "query [可选参数]:  Object/String, 要请求的数据",
            "onSuccess [可选参数]: Function(response:Object, responsetype:String, threadid:String).如请求成功返回,调用这个回调函数",
            "onFail [可选参数]: Function(response:Object, responsetype:String, threadid:String). 如请求失败,调用这个回调函数",
            "threadid [可选参数]: String, 绑定到这个请求的线程id号. 线程操作的顺序：[挂起这个thread -> 执行request -> 继续这个thread]",
            "options [可选参数]: Object, 用来配置这个request的一组键值对. 这些键值对可以包括：" +
                "<br>{"+
                "<br><em>//variables</em>"+
                "<br>&nbsp;&nbsp;uri: String, 请求服务的 URL 地址"+
                "<br>&nbsp;&nbsp;query: String/Object, 请求的数据"+
                "<br>&nbsp;&nbsp;threadid: String, 绑定到这个请求的线程id号"+
                "<br>&nbsp;&nbsp;<strong>method: 'GET' 或 'POST', 请求的方法. 默认为 'GET'.</strong>"+
                "<br>&nbsp;&nbsp;retry: Number, 请求所允许的重试次数"+
                "<br>&nbsp;&nbsp;timeout: Number, 请求的超时毫秒数"+
                "<br>&nbsp;&nbsp;rspType: String, 'text' 或 'xml'. 请求返回的数据类型,默认是'text'"+
                "<br><em>//functions</em>"+
                "<br>&nbsp;&nbsp;cusomQS: Function(obj:Object, type:String). 用来自定义query string对象的函数"+
                "<br><em>//normal events</em>"+
                "<br>&nbsp;&nbsp;onSuccess: Function, 函数参数:[response Object, 如请求成功返回,调用这个回调函数"+
                "<br>&nbsp;&nbsp;onFail: Function(response:Object, responsetype:String, threadid:String).  如请求失败,调用这个回调函数"+
                "<br><em>//trace events</em>"+
                "<br>&nbsp;&nbsp;onRetry: Function, 函数参数:[the current retry time], 请求失败重试时调用的函数"+
                "<br>&nbsp;&nbsp;onTimeout: Function, 请求超时的时候调用的函数"+
                "<br>&nbsp;&nbsp;onStart: Function, 请求开始时调用的函数"+
                "<br>&nbsp;&nbsp;onEnd: Function, 请求结束时调用的函数"+
                "<br><em>//before events</em>"+
                "<br>&nbsp;&nbsp;beforeStart: Function. 在请求数据发送前调用,如果这个函数返回 [false] ,请求会终止"+
                "<br>&nbsp;&nbsp;beforeFail: Function, 函数参数:[error Object, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onFail 函数将被忽略"+
                "<br>&nbsp;&nbsp;beforeSuccess: Function, 函数参数:[response, response type, threadid]. 在请求返回失败前调用,如果这个函数返回 [false], onSuccess 函数将被忽略"+
                "<br>}"
        ],
        $snippet:[
            "/*\n//The most common usage: \n"+
             "xui.Thread.observableRun(null,[function(threadid){\n"+
             "       xui.IAjax('request.php',hash, function(response){\n"+
             "               //setResponse(response);\n"+
             "           }, function(msg){\n"+
             "               //show error msg\n"+
             "           },\n"+
             "       threadid).start();\n"+
             "   }]);*/",
            "/*\n//The most common usage: \n"+
             "xui.Thread.observableRun(null,[function(threadid){\n"+
             "       xui.SAjax('request.php',hash, function(response){\n"+
             "               //setResponse(response);\n"+
             "           }, function(msg){\n"+
             "               //show error msg\n"+
             "           },\n"+
             "       threadid).start();\n"+
             "   },{method:'GET'}]);*/"
        ],
        $memo:"程序员只能使用xui.IAjax向跨域的服务器post数据, 或上传upload文件等等",
        callback:{
            $desc:"String, 默认的回调函数名关键字. <strong>服务器需要在返回的内容中用相同的关键字.</strong>",
            $snippet:["alert(xui.IAjax.callback)"]
        },
        method:{
            $desc:"String, 默认的method('GET' 或 'POST').",
            $snippet:["alert(xui.IAjax.method)"]
        },
        optimized:{
            $desc:"Boolean, 默认的是否优化选项. <strong>会设置一些优化的header.</strong>",
            $snippet:["alert(xui.Ajax.optimized)"]
        },
        retry:{
            $desc:"Number, 默认的重试次数",
            $snippet:["alert(xui.IAjax.retry)"]
        },
        reqType:{
            $desc:"String, 默认的请求发送类型",
            $snippet:["alert(xui.IAjax.reqType)"]
        },
        rspType:{
            $desc:"String, 默认的返回内容类型",
            $snippet:["alert(xui.IAjax.rspType)"]
        },
        uid:{
            $desc:"String,  唯一id "
        },
        timeout:{
            $desc:"Number, 默认的超时时间",
            $snippet:["alert(xui.IAjax.timeout)"]
        },
        customQS: {
            $desc:"自定义的请求字符串. 子类可覆盖该函数,以添加自定义的参数等等",
            $rtn:"Object",
            $paras:[
                "obj: Object, 原始的请求参数对象"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            start:{
                $desc:"开始执行一个xui.IAjax请求",
                $rtn:"[self]",
                $snippet:[
                    "//xui.IAjax('uri').start();"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","SC"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.SC类（静态类）.<br />以作为函数来进行直接调用：用字符串路径名去直接掉用一个类或对象.如果特定路径名的类或对象存在,直接返回；如果不存在, xui.SC会从内存或远程代码文件中加载这个类或对象",
        $rtn:"Object/undefined, 类或对象[同步模式下]/ undefined[异步模式下]",
        $paras:[
            "path [必需参数]: String, 路径名(例如：'xui.UI.Button')",
            "callback [可选参数]: Function, 函数的参数:[path, code, threadid]. 回调函数,会在直接调用完成后调用.如果直接掉用成功,[path]参数会是代码文件的路径；[this]指针会是返回的类或对象本身.如果直接调用失败,[path]参数为 [null], [this]指针将会是内部的 xui.Ajax/iajax 对象",
            "isAsy [可选参数]: Boolean, 直接调用是否为异步. 如果目标类或对象已经在内存中存在,本参数无效.默认为 [false]",
            "options [可选参数]: Object, 一组键值对,用来配置内部的 xui.Ajax(在异步模式的情况) 或 xui.SAjax(在同步模式的情况)"
        ],
        $snippet:[
            "alert(xui.SC('xui.SC'));xui.SC('xui.absIO',function(){alert(this===xui.absIO)});",
            "xui.SC('xui.UI.LoadFromRemoteFile',function(path,code,threaid){alert('You can know the calling result in firefox only!'); if(!path)alert('Fail to load '+ this.uri)},true);"
        ],
        get:{
            $desc:"按照给定的字符串路径得到一个对象",
            $rtn:"Object",
            $paras:[
                "path [必需参数]: String, 字符串路径(例如, 'xui.SC.get', 'xui.isArr', 'xui.ini.path')",
                "obj [可选参数]: Object, 目标对象. 默认为 [window]"
            ],
            $snippet:[
                "alert(xui.SC.get('xui.ini.path')); alert(xui.get(window,'xui.ini.path'.split(\".\"))); "
            ],
            $memo:"等同于 [xui.get]"
        },
        groupCall:{
            $desc:"将一组字符串路径编组,并并行地调用它们.一般用来从多个远程代码文件中同步地加载多个类或对象.(通过把相关的过程包装在一个外壳线程中执行)",
            $paras:[
                "pathArr [必需参数]: Array, 一组字符串路径",
                "onEnd [可选参数]: Function, 函数的参数:[threadid]. 所有的直接调用都完成后执行",
                "callback [可选参数]: Function, 函数的参数:[path, code, threadid]. 回调函数,会在直接调用完成后调用.如果直接掉用成功,[path]参数会是代码文件的路径；[this]指针会是返回的类或对象本身.如果直接调用失败,[path]参数为 [null], [this]指针将会是内部的 xui.Ajax/iajax 对象",
                "threadid [可选参数]: String, 制定外壳线程的id号"
            ],
            $snippet:[
                "/*\n//最常用的用法是: \n"+
                "xui.SC.groupCall(['xui.UI.Button','xui.UI.Input','xui.UI.List'],function(){alert('ends')},function(path){alert(path+' loaded')});"+
                "\n*/"
            ],
            $memo:'相当于loadSnips和execSnips的综合'
        },
        runInBG:{
            $desc:"在后台同步地从多个远程代码文件中加载多个类或对象.(通过把相关的过程包装在一个外壳线程中执行)",
            $paras:[
                "pathArr [必需参数]: Array, 一组字符串路径",
                "callback [可选参数]: Function, 函数的参数:[path, code, threadid]. 回调函数,会在直接调用完成后调用.如果直接掉用成功,[path]参数会是代码文件的路径；[this]指针会是返回的类或对象本身.如果直接调用失败,[path]参数为 [null], [this]指针将会是内部的 xui.Ajax/iajax 对象",
                "onStart [可选参数]: Function, 函数的参数:[threadid]. 外壳线程的onStart回调函数",
                "onEnd [可选参数]: Function, 函数的参数:[threadid]. 外壳线程的onEnd回调函数"
            ],
            $snippet:[
                "/*\n//The most common usage: \n"+
                "xui.SC.background(['xui.UI.Button','xui.UI.Input','xui.UI.List'],null,null,function(){alert('ends')});"+
                "\n*/"
            ]
        },
        loadSnips:{
            $desc:"通过将一组字符串路径编组,并行、异步地加载一组代码片段(把相关的过程包装在一个外壳线程中执行.返回的结果会缓存起来",
            $paras:[
                "pathArr [必需参数]: Array, 一组字符串路径",
                "callback [可选参数]: Function, 函数的参数:[path, code, threadid]. 回调函数,会在直接调用完成后调用.如果直接掉用成功,[path]参数会是代码文件的路径；[this]指针会是返回的类或对象本身.如果直接调用失败,[path]参数为 [null], [this]指针将会是内部的 xui.Ajax/iajax 对象",
                "onEnd [可选参数]: Function, 函数的参数:[threadid]. 所有的直接调用都完成后执行",
                "threadid [可选参数]: String, 制定外壳线程的id号"
            ],
            $snippet:[
                "/*\n//最常用的用法是: \n"+
                "var flag=false; xui.SC.loadSnips(['xui.UI.Button','xui.UI.Input','xui.UI.List'],null,null,function(){flag=true;}); \n //.... \n if(flag)xui.SC.execSnips();"+
                "\n*/"
            ]
        },
        execSnips:{
            $desc:"把通过loadSnips缓存起来的代码片段都执行了",
            $paras:[
                "cache [可选参数]: Object[键值对], 目标代码对象. 默认是 [xui.$cache.text]"
            ],
            $snippet:[
                "/*\n//最常用的用法: \n"+
                "var flag=false; xui.SC.loadSnips(['xui.UI.Button','xui.UI.Input','xui.UI.List'],null,null,function(){flag=true;}); \n //.... \n if(flag)xui.SC.execSnips();"+
                "\n*/"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Event"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Event 类（静态类）",
        isSupported:{
            $desc:"检测是否支持某事件",
            $rtn:"Boolean",
            $paras:[
                "name [必需参数]: String, 事件名"
            ]
        },
        getWheelDelta:{
            $desc:"获取鼠标滚轮的移动值",
            $rtn:"Integer",
            $paras:[
                "event [必需参数] : DOM事件对象"
            ]
        },
        getBtn :{
            $desc:"获取鼠标的哪个键被按下了",
            $rtn:"String",
            $paras:[
                "event [必需参数] : DOM事件对象"
            ],
            $snippet:[
                "var id='xui.temp.e1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).onClick(function(p,e){xui('btnLang').onClick(null); alert(xui.Event.getBtn(e));});"+
                "}"
            ]
        },
        getEventPara:{
            $desc:"获取事件参数对象",
            $rtn:"Object",
            $paras:[
                "event [必需参数] : DOM事件对象"
            ],
            $snippet:[
                "var id='xui.temp.e2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).onClick(function(p,e){xui('btnLang').onClick(null); alert(xui.serialize(xui.Event.getEventPara(e)));});"+
                "}"
            ]
        },
        getId:{
            $desc:"获取DOM 元素的id字符串(包括window 和 document 对象)",
            $rtn:"String",
            $paras:[
                "node [必需参数] : DOM element, window or document Object"
            ],
            $snippet:[
                "alert(xui.Event.getId(document.getElementById('btnLang')));alert(xui.Event.getId(document));alert(xui.Event.getId(window));"
            ]
        },
        getKey:{
            $desc:"从事件对象中获取和键盘相关的值",
            $rtn:"Object, {key:按键字符, type:事件种类, ctrlKey: ctrl键状态, shiftKey: shift 键状态, altKey:alt 键状态}",
            $paras:[
                "event [必需参数] : DOM 事件对象"
            ],
            $snippet:[
                "//'Run' the code, and press any keyboars please!\n"+
                "xui('body').onKeypress(function(p,e){xui('body').onKeypress(null); var kb=xui.Event.getKey(e);xui.log(kb.key,kb.type,kb.ctrlKey,kb.shiftKey,kb.altKey,kb)});"
            ]
        },
        getPos:{
            $desc:"从事件对象中获取鼠标的位置",
            $rtn:"Object, 键值对. {left:xx,top:xx}",
            $paras:[
                "event [必需参数] : DOM事件对象"
            ],
            $snippet:[
                "var id='xui.temp.e4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).onClick(function(p,e){xui('btnLang').onClick(null); alert(xui.serialize(xui.Event.getPos(e)));});"+
                "}"
            ]
        },
        getSrc:{
            $desc:"从事件对象中中获取发生事件的DOM元素",
            $rtn:"Element",
            $paras:[
                "event [必需参数] : DOM 事件对象"
            ],
            $snippet:[
                "var id='xui.temp.e5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">click here ' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).onClick(function(p,e){xui('btnLang').onClick(null); alert(xui.Event.getSrc(e).id);});"+
                "}"
            ]
        },
        keyboardHook :{
            $desc:" 添加/移除一个全局的键盘事件钩子到keyDown事件",
            $rtn:'[self]',
            $paras:[
                "key [必需参数] : String, 被监视的键",
                "ctrl [可选参数] : Boolean, 指示是否监视'CTRL'键. 默认为 [false]",
                "shift [可选参数] : Boolean, 指示是否监视'SHIFT'键. 默认为 [false]",
                "alt [可选参数] : Boolean, 指示是否监视'ALT'键. 默认为 [false]",
                "fun [可选参数] : Function, 用户按下热键后要执行的函数. 如果不指定该参数, 或传入非function变量, 这个键[key](keyboard name)上的钩子将被移除",
                "args [可选参数]: Array, 函数的参数. 默认为 []",
                "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数). 默认为 [window]"
            ],
            $snippet:[
                "//'Run' the code, and click keyboard 'a' please! \n"+
                "xui.Event.keyboardHook('a',0,0,0,function(){xui.message('you pressed a!');xui.Event.keyboardHook('a');})",
                "//'Run' the code, and You can't input 'a' in this input! \n"+
                "if(!xui.Dom.byId('xui.temp.1')){this.prepend(xui.create('<div><input /><button id=\"xui.temp.1\" onclick=\"xui.Event.keyboardHook(\\\'a\\\');xui(this).parent().remove()\">remove this example</button></div>'));}" +
                "xui.Event.keyboardHook('a',0,0,0,function(){return false;});"
            ]
        },
        keyboardHookUp :{
            $desc:" 添加/移除一个全局的键盘事件钩子到keyUp事件",
            $rtn:'[self]',
            $paras:[
                "key [必需参数] : String, 被监视的键",
                "ctrl [可选参数] : Boolean, 指示是否监视'CTRL'键. 默认为 [false]",
                "shift [可选参数] : Boolean, 指示是否监视'SHIFT'键. 默认为 [false]",
                "alt [可选参数] : Boolean, 指示是否监视'ALT'键. 默认为 [false]",
                "fun [可选参数] : Function, 用户按下热键后要执行的函数. 如果不指定该参数, 或传入非function变量, 这个键[key](keyboard name)上的钩子将被移除",
                "args [可选参数]: Array, 函数的参数. 默认为 []",
                "scope [可选参数]: Object, [fun]的this指针(哪个对象的函数). 默认为 [window]"
            ]
        },
        popTabOutTrigger:{
             $desc:"将最后一个 'TAB失去焦点trigger' 从堆栈中弹出.并激活前一个trigger（如果堆栈中还存在trigger的话）.请参考<a href='#xui.Event.pushTabOutTrigger'>xui.Event.pushTabOutTrigger</a>函数",
             $paras:[
                "flag [可选参数] : Boolean, 强制清空内部堆栈.默认为 [false]"
             ],
             $rtn:'[self]'
        },
        pushTabOutTrigger:{
            $desc:"将一个 'TAB失去焦点trigger' 压入堆栈,然后激活它（先前的trigger将会无效）. 这个 [trigger] 函数会在用户用 TAB 键让鼠标焦点落在指定 DOM 元素的边界外时执行",
            $rtn:'[self]',
            $paras:[
                "boundary [必需参数] : Element/String, 作为边界的 DOM 元素或xid",
                "trigger [必需参数] : Function, 函数参数：[边界DOM元素的xid]. 这个 [trigger] 函数会在用户用 TAB 键让鼠标焦点落在指定 DOM 的边界 [boundary] 外时执行"
            ],
            $snippet:[
                "if(!xui.Dom.byId('xui.temp.out')){this.prepend(xui.create('<div><div id=\"xui.temp.out\" style=\"border:solid 1px;padding:10px;\">xui.temp.out<input id=\"xui.temp.out.first\"><input /><input /><input /><div id=\"xui.temp.in\"  style=\"border:solid 1px;padding:10px;\">xui.temp.in<input id=\"xui.temp.in.first\" /><input /><input /><input /><input /></div></div><div><button onclick=\"xui.arr.each(xui.Event._tabHookStack,function(o){alert(o[0])})\">Click here to show inner stack content!</button><br /><br /><button onclick=\"xui.Event.popTabOutTrigger();\">popTabOutTrigger</button><br /><br /></div><div><button onclick=\"xui.Event.popTabOutTrigger(1);xui(this).parent(2).remove();\">remove this example</button></div></div>'));\n"+
                "xui.Event.pushTabOutTrigger(document.getElementById('xui.temp.out'),function(){document.getElementById('xui.temp.out.first').focus();});"+"xui.Event.pushTabOutTrigger(document.getElementById('xui.temp.in'),function(){document.getElementById('xui.temp.in.first').focus();});}"
            ]
        },
        stopBubble:{
            $desc:"停止默认的动作,并阻止事件冒泡",
            $paras:[
                "event [必需参数] : DOM event Object"
            ],
            $snippet:[
                "if(!xui.Dom.byId('xui.temp.3')){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\" onclick=\"alert(\\\'onclick event on the div\\\')\"><p>You can click here to fire onclick event on the div </p><a id=\"xui.temp.3\" href=\"http://www.crossui.com\" onclick=\"xui.message(\\\'Event bubble is stopped. You cant fire onclick event on the outter div !\\\');xui.Event.stopBubble(event);\" >Event bubble to outter div is stopped here. Click me to try it!</a><button onclick=\"xui(this).parent().remove()\">remove this example</button></div>'))}"
            ]
        },
        stopDefault:{
            $desc:"停止默认的动作",
            $paras:[
                "event [必需参数] : DOM event Object"
            ],
            $snippet:[
                "if(!xui.Dom.byId('xui.temp.4')){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\" ><a id=\"xui.temp.4\" href=\"http://www.crossui.com\" onclick=\"xui.message(\\\'Default action is stopped here. You cant go to \\\'+this.href);xui.Event.stopDefault(event);\" >My default action is stopped. Click me to try it!</a><button onclick=\"xui(this).parent().remove()\">remove this example</button></div>'))}"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","absBox"],{
        pack:{
            $desc: "打包装箱一组元素,并生成一个 [xui.absBox] 对象",
            $rtn: "xui.absBox",
            $paras:[
                "arr [必需参数] : Array, 一组值",
                "ensureValue [可选参数] : Boolean, 是否强制检测每个箱内元素值的有效性. 默认为 true"
            ],
            $snippet:[
                "var nodes = xui.Dom.pack(['btnLang',document.getElementById('btnLang')]); alert(nodes.get(0).id)"
            ]
        },
        plugIn:{
            $desc:"向当前类加一个 plug-in 函数",
            $rtn:"[self]",
            $paras:[
                "name [必需参数] : String, plug-in 函数名字",
                "fun [必需参数] : Function, plug-in 插件函数体"
            ],
            $snippet:[
                "var n=xui('btnLang'); alert(n.getBackgroundImg); xui.Dom.plugIn('getBackgroundImg',function(){return this.css('backgroundImage')}); alert(n.getBackgroundImg());"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            each:{
                $desc:"将函数应用于数组中的每一个箱内元素",
                $rtn:'[self]',
                $paras:[
                    "fun [必需参数]: Function, [this]指针是 xui.absBox Object, 函数参数: [element, array index]. 应用到每一个箱内元素的函数"
                ],
                $snippet:[
                    "xui(['xui.UI.Layout:a:','btnLang']).each(function(o,i){alert(i+' -> #'+o.id)})"
                ]
            },
            get:{
                $desc:"根据给定位置得到箱内元素,或者得到箱内所有元素",
                $rtn:"Object/Array",
                $paras:[
                    "index [可选参数] : Number"
                ],
                $snippet:[
                    "var n=xui(['xui.UI.Layout:a:','btnLang']); alert(n.get(1).id); alert(n.get()[0].id+' , '+n.get()[1].id);"
                ]
            },
            size:{
                $desc:"得到箱内元素的个数",
                $rtn:"Number"
            },
            isEmpty:{
                $desc:"是否目前的箱为空",
                $rtn:"Boolean",
                $snippet:[
                    "var n=xui(['xui.UI.Layout:a:','btnLang']); alert(n.isEmpty()); alert(xui().isEmpty())"
                ]
            },
            merge:{
                $desc:"合并一个箱的所有元素到当前箱",
                $rtn:"[self]",
                $paras:[
                    "obj [必需参数] : xui.absBox 对象"
                ],
                $snippet:[
                    "alert(xui('xui.UI.Layout:a:').merge(xui('btnLang')).get().length)"
                ]
            },
            reBoxing:{
                $desc:"将当前箱内的所有元素重新打包到另一个箱",
                $trn:"xui.absBox",
                $paras:[
                    "key [可选参数] : new xui.absBox 子类的名字",
                    "ensureValue [可选参数] : Boolean, 是否强制检测每个箱内元素值的有效性. 默认为 true"
                ],
                $snippet:[
                    "alert(xui('xui.UI.Layout:a:').KEY);alert(xui('xui.UI.Layout:a:').reBoxing('xui.UI.Layout').KEY);"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Dom"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Dom 类",
        constructor:{
            $desc:"用[xui(nodes, flag)]得到一个新xui.Dom实例对象"
        },
        Events:{
            $desc:  "<strong>Description</strong>: 添加、删除或者触发特定事件.每个事件可以有三组事件函数：[before开头], [on开头] 和 [after开头].每组是一个函数数组"+
                    "<ul>"+
                        "<li><strong>xui(/**/).onClick([function], 'label')</strong> => 为 [onclick] 事件函数组添加一个标签为'label'的事件函数.</li>"+
                        "<li><strong>xui(/**/).onClick([function]) </strong> => 先清空 [onclick] 事件函数组,再重新加入一个[function]函数.</li>"+

                        "<li><strong>xui(/**/).onClick(null, 'label') </strong> => 从 [onclick] 事件函数组中删除标签为'label'的事件函数.</li>"+
                        "<li><strong>xui(/**/).onClick(null) </strong> => 清空 [onclick] 事件函数组.</li>"+
                        "<li><strong>xui(/**/).onClick(null,null,true) </strong> => 清空 [beforeclick]、[onclick]和[afterclick] 事件函数组.</li>"+

                        "<li><strong>xui(/**/).onClick() </strong> => 触发事件,会按照顺序执行所有[onclick]事件函数组里面的事件函数.<strong>如果其间任何一个事件函数返回[false],余下的事件函数将不被执行.</strong></li>"+
                        "<li><strong>xui(/**/).onClick(true) </strong> => 触发事件,会按照顺序执行所有[beforeclick]、[onclick]和[afterclick]事件函数组里面的事件函数.<strong>如果其间任何一个事件函数返回[false],余下的事件函数将不被执行.</strong></li>"+
                    "</ul>"+

                    "<p><strong>Returns</strong>: 添加事件:[self]; 删除事件: return [self]; 触发事件: void.</p>"+
                    "<p><strong>Parameters</strong>: </p>"+
                    "<ul>"+
                        "<li><strong>fun [可选参数] </strong>: 函数的[this]指针是Dom元素, arguments 是 [xui.DomProfile Object, DOM event Object, the current element].</li>"+
                        "<li><strong>label [可选参数]</strong> : String, 事件的标签.</li>"+
                        "<li><strong>flag [可选参数]</strong> : Boolean,仅删除事件的时候有效,表示是否删除所有相关的事件.</li>"+
                    "</ul>"+
                    "<p style='padding:5px;'><a href='#xui.Dom.prototype.afterClick' onclick='var n =xui(this).parent(5).query(\"a\",\"name\",\"xui.Dom.prototype.afterClick\").next().first(); if(n.next().css(\"display\")==\"none\")n.onClick()'><strong>Go to [onClick] for getting the code snippets!</strong></a></p>"
        },
        HIDE_VALUE:{
            $desc:"String, 隐藏DOM元素的常量(系统隐藏DOM的方法一般是[element.style.left=xui.Dom.HIDE_VALUE]或[element.style.top=xui.Dom.HIDE_VALUE])",
            $snippet:[
                "alert(xui.Dom.HIDE_VALUE)"
            ]
        },
        TOP_ZINDEX:{
            $desc:"Number, 系统最大z-index量",
            $snippet:[
                "alert(xui.Dom.TOP_ZINDEX)"
            ]
        },
        busy:{
            $desc:"显示系统忙. 在DOM的正上方增加一层DIV,使用用户不能点击,并将鼠标指针变为漏斗形状",
            $paras:[
                "label [可选参数] : String, 本 busy 的 id. 使用[xui.Dom.free(label)]释放忙状态",
                "busyMsg [可选参数] : String, 指示忙的文字,如“正在处理中”",
                "busyIcon [可选参数] : Boolean,  是否显示忙状态图标",
                "cursor [可选参数] : String, busy层的鼠标样式"
            ],
            $snippet:[
                "xui.Thread(null,[xui.fun()],1000,null,function(){xui.Dom.busy();},function(){xui.Dom.free();}).start()",
                "xui.Thread(null,[function(){xui.Dom.busy('b');xui.message('Changes [label] to \\\'b\\\' ')}, function(){xui.Dom.free();xui.message('Still busy')},function(){xui.Dom.free('a');xui.message('Still busy')},xui.fun()],1000,null,function(){xui.Dom.busy('a')},function(){xui.Dom.free('b');xui.message('free now')}).start()"
            ]
        },
        free:{
            $desc:"释放忙状态",
            $paras:[
                "label [可选参数] : String, the busy label"
            ],
            $memo:"见<a href='#xui.Dom.busy'>xui.Dom.busy</a>"
        },
        byId:{
            $desc:"等同于[document.getElementById]",
            $rtn:"Element",
            $paras:[
                "id [必需参数] : String, DOM id"
            ],
            $snippet:[
                "alert( xui.Dom.byId('btnLang') === document.getElementById ('btnLang') )"
            ]
        },
        animate:{
            $desc:"包装特殊效果的动画到一个xui.Thread对象中(shell线程)",
            $rtn:"xui.Thread",
            $paras:[
                "css [必需参数] : Object[CSS 键值对]. 不变的CSS样式",
                "params [必需参数] : Object[Key/value([from value, to value]) pairs] . 渐变的CSS样式",
                "onStart [可选参数]: Function(threadid:String). 线程第一个任务开始前的回调函数",
                "onEnd [可选参数]: Function(threadid:String). 整个shell线程结束后的回调函数",
                "duration [可选参数]: Number(ms), 动画的持续时间. 默认为300",
                "step [可选参数]: Number, 动画步长. 默认为0. [Deprecated]建议不要使用",
                "type [可选参数]: String, 动画的特效形式'linear','expoIn','expoOut','expoInOut','sineIn','sineOut','sineInOut','backIn','backOut','backInOut' 或 'bounceOut'.  默认为'linear'",
                "threadid [可选参数]: String, shell线程的全局识别id"
            ],
            $snippet:[
                "xui.Dom.animate({backgroundColor:'#ff0000'},{left:[0,200],top:[0,300],width:[30,300],height:[30,300],opacity:[1,0]}, null, null, 500, 0, 'sineOut').start()"
            ]
        },
        getEmptyDiv:{
            $desc:"生成一个DOM id以'xui.matrix::'开始的DOM对象",
            $rtn:"xui.Dom",
            $paras:[
                "pid [可选参数] : String/Dom, 父容器",
                "sequence [可选参数] : Number, DOM序列号. 默认为1"
            ],
            $snippet:[
                "var m1=xui.Dom.getEmptyDiv(); alert(m1.id())",
                "var m1=xui.Dom.getEmptyDiv(), m2=xui.Dom.getEmptyDiv(2); alert(m1.id());alert(m2.id()) "
            ],
            $memo:"当你不再需要一个matrix div, 请清空它,以便 [xui.Dom.getEmptyDiv]可再次利用"
        },
        getScrollBarSize:{
            $desc:"获取当前浏览器滚动条的宽度",
            $rtn:"Number"
        },
        getStyle:{
            $desc:"获取DOM元素的CSS样式中某一个项的值",
            $rtn:"String",
            $paras:[
                "node [必需参数] : Element, DOM元素",
                "name [必需参数] : String, CSS样式项名称,如height,width等等"
            ],
            $snippet:[
                "var n=xui.Dom.byId('btnLang'); alert(xui.Dom.getStyle(n,'width')); alert(xui.Dom.getStyle(n,'overflow'))"
            ]
        },
        setStyle:{
            $desc:"设置DOM元素的CSS样式中某一个项的值",
            $paras:[
                "node [必需参数] : Element, DOM元素",
                "name [必需参数] : String, CSS样式项名称,如height,width等等",
                "value [必需参数] : String, CSS样式项值,如25px"
            ],
            $snippet:[
                "var n=xui.Dom.byId('btnLang'); xui.Dom.setStyle(n,'top', '100px'); xui.asyRun(function(){xui.Dom.setStyle(n,'top', '0px')}, 2000)"
            ]
        },
        setCover:{
            $desc:"显示或隐藏一个覆盖整个页面的DIV",
            $paras:[
                "visible [必需参数] : Boolean or String, true=>表示显示DIV; false=>h表示隐藏DIV; 'string'=>表示显示DIV和文字",
                "label [可选参数] : String, 忙标签id",
                "busyIcon [可选参数] : Boolean,  是否显示忙状态图标",
                "cursor [可选参数] : String, busy层的鼠标样式"
            ],
            $snippet:[
                "xui.Dom.setCover(true); xui.asyRun(function(){xui.Dom.setCover(false)},2000);",
                "xui.Dom.setCover('a'); xui.asyRun(function(){xui.Dom.setCover('b')},1000); xui.asyRun(function(){xui.Dom.setCover('c')},2000); xui.asyRun(function(){xui.Dom.setCover(false)},3000);",
                "xui.Dom.setCover('<div style=\\\'font-weight:bold;padding:5px;border:solid 1px;background:#CCC;\\\'> Loading... </div>'); xui.asyRun(function(){xui.Dom.setCover(false)},2000);",
                "xui.Dom.setCover(true,'key'); xui.asyRun(function(){xui.message('The cover is still visible');xui.Dom.setCover(false)},1000); xui.asyRun(function(){xui.message('The cover is hidded');xui.Dom.setCover(false,'key')},5000);"
            ]
        },
        css3Support:{
            $desc:"获取浏览器是否支持CSS特性",
            $rtn:"Boolean",
            $paras:[
                "name [必需参数] : CSS3属性名'opacity,textShadow,animationName,columnCount,flexWrap,boxDirection,backgroundSize,perspective,boxShadow,borderImage,borderRadius,boxReflect,transform,transition,generatedContent,fontFace,rgba,hsla,multiplebgs,gradient,transform3d' 之一"
            ],
            $snippet:[
                "var arr='opacity,textShadow,animationName,columnCount,flexWrap,boxDirection,backgroundSize,perspective,boxShadow,borderImage,borderRadius,boxReflect,transform,transition,generatedContent,fontFace,rgba,hsla,multiplebgs,gradient,transform3d'.split(',');"+
                "var hash={};\n"+
                "xui.arr.each(arr,function(o){hash[o]=xui.Dom.css3Support(o);});\n"+
                "alert(xui.stringify(hash));"
            ]
        },
        submit:{
            $desc:"提交一个HTML form(表单)",
            $paras:[
                "action [必需参数] : String(URL), 提交到哪个URL",
                "data [必需参数] : Object[键值对], 提交数据的键值对",
                "method [可选参数] : String, . HTTP method . 可以是[get|post], 默认为'get'",
                "target [可选参数] : String, 返回显示的窗口位置. [_blank|_parent|_self|_top], 默认为'_blank'",
                "enctype [可选参数] : String, 表单enctype属性(设置MIME以用来编码表单内容), 默认值为 'application/x-www-form-urlencoded'. 当表单内容包含文件时为 'multipart/form-data'"
            ],
            $snippet:[
                "xui.Dom.submit('http://www.google.com/search',{q:'ajax ria'},'get')",
                "xui.Dom.submit('http://www.google.com/search',{q:{a:1,b:2}},'get')"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            each:{
                $desc:"将函数应用于数组中的每一个箱内元素",
                $rtn:'[self]',
                $paras:[
                    "fun [必需参数]: Function, [this]指针是 xui.absBox Object, 函数参数: [element, array index]. 应用到每一个箱内元素的函数"
                ],
                $snippet:[
                    "xui(['xui.UI.Layout:a:','btnLang']).each(function(o,i){alert(i+' -> #'+o.id)})"
                ]
            },
            get:{
                $desc:"根据给定位置得到箱内元素,或者得到箱内所有元素",
                $rtn:"Object/Array",
                $paras:[
                    "index [可选参数] : Number"
                ],
                $snippet:[
                    "var n=xui(['xui.UI.Layout:a:','btnLang']); alert(n.get(1).id); alert(n.get()[0].id+' , '+n.get()[1].id);"
                ]
            },
            addBorder:{
                $desc:"为第一个元素添加边框",
                $rtn:"xui.UI.Border",
                $paras:[
                    "properties [可选参数] : 键值对, 边框的属性. 一般的用法是: {borderActive: [Boolean]}"
                ],
                $snippet:[
                    "var div=xui.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');xui('body').append(div);xui.asyRun(function(){div.addBorder();},1000);xui.asyRun(function(){div.removeBorder();},2000);xui.asyRun(function(){div.remove();},3000);",
                    "var div=xui.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');xui('body').append(div);div.addBorder({borderActive:true});xui.asyRun(function(){div.remove();},5000);"
                ],
                $memo:"依赖: xui.UI.Border"
            },
            removeBorder:{
                $desc:"移除第一个元素的边框",
                $rtn:"[self]",
                $snippet:[
                    "var div=xui.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');xui('body').append(div);xui.asyRun(function(){div.addBorder();},1000);xui.asyRun(function(){div.removeBorder();},2000);xui.asyRun(function(){div.remove();},3000);"
                ],
                $memo:"依赖: xui.UI.Border"
            },
            addResizer:{
                $desc:"为第一个元素添加大小调节器",
                $rtn:"xui.UI.Resizer",
                $paras:[
                    "properties [可选参数] : 键值对, 边框的属性",
                    "onUpdate [可选参数] : Function, 大小修改后的回调函数",
                    "onChange [可选参数] : Function, 大小试图改变的回调函数",
                ],
                $snippet:[
                    "//You can resize the following div: \n" +
                    "var div=xui.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;\\\'>Use mouse to resize me!</div>');xui('body').append(div);div.topZindex(true).addResizer();xui.asyRun(function(){div.remove();},10000);",
                    "var div=xui.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;\\\'>Use mouse to resize me!</div>');xui('body').append(div);div.topZindex(true).addResizer({forceVisible:true,forceMovable:true,singleDir:true,vertical:false,minWidth:50,maxWidth:200,handlerSize:10});xui.asyRun(function(){div.remove();},10000);"
                ],
                $memo:"依赖: xui.UI.Resizer"
            },
            removeResizer:{
                $desc:"移除第一个元素的大小调节器",
                $rtn:"[self]",
                $snippet:[
                    "var div=xui.create('<div style=\\\'background:#fff;position:absolute;border:solid 1px;width:100px;height:100px;left:100px;top:100px;z-index:20000;\\\'></div>');xui('body').append(div);xui.asyRun(function(){div.addResizer({forceVisible:true})},1000);xui.asyRun(function(){div.removeResizer();},2000);xui.asyRun(function(){div.remove();},3000);"
                ],
                $memo:"Dependencies: xui.UI.Resizer"
            },
            addClass:{
                $desc:"为每一个元素添加CSS类",
                $rtn:"[self]",
                $paras:[
                    "name [必需参数] : String, CSS类名"
                ],
                $snippet:[
                    "var n=xui('btnLang');alert(n.attr('className'));n.addClass('cls');alert(n.attr('className'));n.removeClass('cls');alert(n.attr('className'));"
                ]
            },
            removeClass:{
                $desc:"为每一个元素移除CSS类",
                $rtn:"[self]",
                $paras:[
                    "name [必需参数] : String, CSS类名"
                ],
                $snippet:[
                    "var n=xui('btnLang');alert(n.attr('className'));n.addClass('cls');alert(n.attr('className'));n.removeClass('cls');alert(n.attr('className'));"
                ]
            },
            hasClass:{
                $desc:"判断第一个元素的CSS样式中是否含有指定的类名",
                $rtn:"Boolean",
                $paras:[
                    "name [必需参数] : String, CSS类名"
                ],
                $snippet:[
                    "var n=xui('btnLang');alert(n.attr('className'));alert(n.hasClass('xui-div'));alert(n.hasClass('cls'));"
                ]
            },
            replaceClass:{
                $desc:"将每一个元素中的某个CSS类名替换为另一个类名",
                $rtn:"[self]",
                $paras:[
                    "regexp [必需参数] : 查找的正则表达式",
                    "replace [必需参数] : String"
                ],
                $snippet:[
                    "var n=xui('btnLang');alert(n.attr('className'));n.replaceClass(/ui/,'cls');alert(n.attr('className'));n.replaceClass(/cls/,'ui');"
                ]
            },
            tagClass:{
                $desc:"对于箱中的每个元素的className,拷贝这些className并在每个className后添加一个给定的标签.或者将有特定标签的className移除",
                $rtn:"[self]",
                $paras:[
                    "tag [必需参数] : String, 标签字符串",
                    "isAdd [可选参数] : Boolean, 添加标签或移除标签. 默认为 [true]"
                ],
                $snippet:[
                    "var n=xui('btnLang');n.tagClass('-checked').tagClass('-hover');alert(n.attr('className')); n.tagClass('-checked',false).tagClass('-hover',false);alert(n.attr('className'));"
                ]
            },
            append:{
                $desc:"将一个xui.Dom对象(包含有一系列的DOM elements 或xui.UIProile 对象) 附着在自己内部的第一个元素后面",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.Dom对象(包含有一系列的DOM elements 或xui.UIProile 对象)",
                    "reversed [可选参数] : Boolean, 如果是 [true], 表示本操作是'append to' 默认 [false]",
                    "force [可选参数] : Boolean, 如果是 [true], 表示即使target已在本DOM中，也要调用appendChild将target加到最后, 默认 [false]"
                ],
                $snippet:[
                "var id='xui.temp.1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).append(xui.create('input'));"+
                "xui(id).append(new xui.UI.Button({position:'relative'}));"+
                "xui(id).append(xui.create('<button>btn</button>'));"+
                "}"
                ]
            },
            prepend:{
                $desc:"将一个xui.Dom对象(包含有一系列的DOM elements 或xui.UIProile 对象) 附着在自己内部的第一个元素前面",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.Dom对象(包含有一系列的DOM elements 或xui.UIProile 对象)",
                    "reversed [可选参数] : Boolean, 如果是 [true], 表示本操作是'prepend to' 默认 [false]"
                ],
                $snippet:[
                "var id='xui.temp.2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).prepend(xui.create('input'));"+
                "xui(id).prepend(new xui.UI.Button({position:'relative'}));"+
                "xui(id).prepend(xui.create('<button>btn</button>'));"+
                "}"
                ]
            },
            addPrev:{
                $desc:"将一个xui.Dom对象(包含有一系列的DOM elements 或xui.UIProile 对象) 附着在自己的前面",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.Dom对象(包含有一系列的DOM elements 或xui.UIProile 对象)",
                    "reversed [可选参数] : Boolean, 如果是 [true], 表示本操作是'addPrev to' 默认 [false]"
                ],
                $snippet:[
                "var id='xui.temp.3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var node = xui(id).last();"+
                "node.addPrev(xui.create('input'));"+
                "node.addPrev(new xui.UI.Button({position:'relative'}));"+
                "node.addPrev(xui.create('<button>btn</button>'));"+
                "}"
                ]
            },
            addNext:{
                $desc:"将一个xui.Dom对象(包含有一系列的DOM elements 或xui.UIProile 对象) 附着在自己的后面",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.Dom对象(包含有一系列的DOM elements 或xui.UIProile 对象)",
                    "reversed [可选参数] : Boolean, 如果是 [true], 表示本操作是'addNext to' 默认 [false]"
                ],
                $snippet:[
                "var id='xui.temp.4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var node = xui(id).last();"+
                "node.addNext(xui.create('input'));"+
                "node.addNext(new xui.UI.Button({position:'relative'}));"+
                "node.addNext(xui.create('<button>btn</button>'));"+
                "}"
                ]
            },
            offset:{
                $desc:"获取(第一个元素)或设置(所有元素)相对边界的偏移量",
                $rtn:"Object/[self]",
                $paras:[
                    "pos [可选参数] : {left:value,top:value}, 目标的绝对位置",
                    "boundary [可选参数] : 相对的边界(DOM 元素或document.body). 默认为document.body"
                ],
                $snippet:[
                    "alert(xui.serialize(xui(this).offset()));alert(xui.serialize(xui(this).offset()));",
                    "var n=xui(this),pos=n.offset(); pos.top+=20; n.css('position','relative').offset(pos); xui.asyRun(function(){n.css({top:'',position:''})},1000)"
                ]
            },
            cssPos:{
                $desc:"获取(第一个元素)或设置(所有元素) CSS偏移量",
                $rtn:"Object/[self]",
                $paras:[
                    "pos [可选参数] : {left:value,top:value}, 目标的绝对位置",
                    "flag [可选参数] : Boolean, 指示是否触发元素的onMove事件. 默认为false"
                ],
                $snippet:[
                    "var n=xui(this),pos=n.cssPos(); pos.top+=20;pos.left+=20; n.css('position','relative').cssPos(pos); n.onMove(function(){xui.message('Fired onmove event')});pos.top+=20;pos.left+=20; n.cssPos(pos,true); xui.asyRun(function(){n.css({top:'',position:''}).onMove(null)},1000)"
                ]
            },
            animate:{
                $desc:"包装特殊效果的动画到一个xui.Thread对象中(shell线程)",
                $rtn:"xui.Thread",
                $paras:[
                    "params [必需参数] : Object[Key/value([from value, to value]) pairs] . 渐变的CSS样式",
                    "onStart [可选参数]: Function(threadid:String). 线程第一个任务开始前的回调函数",
                    "onEnd [可选参数]: Function(threadid:String). 整个shell线程结束后的回调函数",
                    "duration [可选参数]: Number(ms), 动画的持续时间. 默认为300",
                    "step [可选参数]: Number, 动画步长. 默认为0. [Deprecated] 建议不要使用",
                    "type [可选参数]: String, 动画的特效形式'linear','expoIn','expoOut','expoInOut','sineIn','sineOut','sineInOut','backIn','backOut','backInOut' 或 'bounceOut'. 默认为'linear'",
                    "threadid [可选参数]: String, shell线程的全局识别id"
                ],
                $snippet:[
                    "var node=xui.create('div').css({opacity:0,zIndex:xui.Dom.TOP_ZINDEX, backgroundColor:'#0000ff', position:'absolute',left:'100px', top:'100px',width:'100px',height:'100px'});"+
                    "xui('body').append(node);"+
                    "var fx1 = node.animate({opacity:[0,1]},null,null,1000,0,'sineIn');"+
                    "var fx2 = node.animate({left:[100,300],top:[100,300]},null,null,500,0,'sineOut');"+
                    "var fx3 = node.animate({left:[300,100],top:[300,100]});"+
                    "var fx4 = node.animate({opacity:[1,0]},null,function(){node.remove();});"+
                    "fx1.links(fx2.links(fx3.links(fx4))).start();"
                ]
            },
            attr:{
                $desc:"获取第一个元素的某个属性值, 或设置所有元素的一个属性值(键值对), 或移除所有元素的某个属性值",
                $rtn:"String/[self]",
                $paras:[
                    "name [必需参数] : 属性名,或表示属性值的键值对",
                    "value [可选参数] : 属性值, [null]表示移除,不传入任何参数表示获取"
                ],
                $snippet:[
                    "var n=xui('btnLang'); alert(n.attr('style')); alert(n.attr('tagName')); alert(n.attr('className'));",
                    "var n=xui('btnLang'); n.attr('abc','abc'); alert(n.attr('abc')); n.attr('abc',null);  n.attr('tagName',null); alert(n.attr('abc'));",
                    "var n=xui('btnLang'); n.attr('onclick',function(){alert('hi')}); xui.asyRun(function(){n.attr('onclick',null)},5000); ",
                    "var n=xui('btnLang'); n.attr({a:'a',b:'b'}); alert(n.attr('a')); n.attr({a:null,b:null}); alert(n.attr('a'));"
                ]
            },
            caret:{
                $desc:"获取或设置第一个元素的光标(必须是Input或Textarea)",
                $rtn:"Array/[self]",
                $paras:[
                    "begin [可选参数] : Number, 光标开始位置",
                    "end [可选参数] : Number, 光标结束位置"
                ],
                $snippet:[
                    "var id='xui.temp.caret'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<input id='+id+'1 value=0123456789/><'+'textarea id='+id+'2></'+'textarea><br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id+'2').attr('value','1111\\n2222\\n3333\\n4444');xui.asyRun(function(){xui(id+'1').caret(2,6);alert(xui(id+'1').caret());xui(id+'2').caret(2,16);alert(xui(id+'2').caret());},1000)"+
                    "}"
                ]
            },
            children:{
                $desc:"获取一个xui.Dom,该对象包含所有元素的直接子元素",
                $rtn:"xui.Dom",
                $snippet:[
                    "var id='xui.temp.children'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<input/><input/><div style=\"padding:5px;\"><input/><input/></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).children().css('border','solid 4px')"+
                    "}"
                ]
            },
            width:{
                $desc:"获取(第一个元素) 或设置(所有元素)css的宽度值",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.w1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.width(20).height(20); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },
            serialize:{
                $desc:"将一个DOM概要对象(profile)序列化为一个JSON字符串或一个JSON对象",
                $rtn:"String",
                $snippet:[
                    "alert(xui('btnLang').serialize());"
                ]
            },
            scrollWidth:{
                $desc:"获取(第一个元素) 滚动条宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.w2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.width(20).height(20); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },
            innerWidth:{
                $desc:"获取(第一个元素)或设置(所有元素)内部宽度(包含内补丁padding)",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.w3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.innerWidth(40).innerHeight(40); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },
            offsetWidth:{
                $desc:"获取(第一个元素)或设置(所有元素)的偏移宽度(包括padding and border)",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.w4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.offsetWidth(60).offsetHeight(60); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },
            outerWidth:{
                $desc:"获取(第一个元素)或设置(所有元素)外部宽度(includes the padding, border and margin)",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.w5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.outerWidth(80).outerHeight(80); alert(n.width()+':'+n.innerWidth()+':'+n.offsetWidth()+':'+n.outerWidth()+':'+n.scrollWidth());"+
                    "}"
                ]
            },

            height:{
                $desc:"获取(第一个元素)或设置(所有元素)CSS高度值",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.w6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.width(20).height(20); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            scrollHeight:{
                $desc:"Gets(第一个元素)scroll高度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.w7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.width(20).height(20); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            innerHeight:{
                $desc:"获取(第一个元素)或设置(所有元素)内部宽度(包括内补丁padding)",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.w8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.innerWidth(40).innerHeight(40); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            offsetHeight:{
                $desc:"获取(第一个元素)或设置(所有元素) 偏移高度(包括内补丁padding 和 border)",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.w9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.offsetWidth(60).offsetHeight(60); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            outerHeight:{
                $desc:"获取(第一个元素)或设置(所有元素)外部高度(包括内补丁padding, border 和外补丁 margin)",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.w11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div style=\"background:#888;position:relative;width:80px;height:80px;\"><div id='+id+' style=\"overflow:auto;position:absolute;margin:10px;border:solid 10px #ccc;padding:10px;\"> 1111111111111111111 2222222222222222 333333333333</div></div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.outerWidth(80).outerHeight(80); alert(n.height()+':'+n.innerHeight()+':'+n.offsetHeight()+':'+n.outerHeight()+':'+n.scrollHeight());"+
                    "}"
                ]
            },
            clone:{
                $desc:"拷贝一系列DOM元素",
                $rtn:"xui.Dom",
                $paras:[
                    "deep [可选参数] : Boolean, 指示是否递归克隆子DOM元素. 默认为[false]"
                ],
                $snippet:[
                    "var id='xui.temp.w11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">' + '<div id='+id+' style=\"background:#ccc;border:solid 1px;padding:10px;\"><div style=\"background:#fff;border:solid 1px;padding:10px;\">inner<input /></div>outer</div> <br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.parent().append(n.clone()).append(n.clone(true))"+
                    "}"
                ]
            },
            nativeEvent : {
                $desc:"触发DOM内部事件",
                $rtn:"xui.Dom",
                $paras:[
                    "name [必需参数] : String, 事件名称"
                ]
            },
            scrollIntoView:{
                $desc:"使控件可视",
                $rtn:"[self]"
            },
            isScrollBarShowed:{
                $desc:"是否有滚动栏",
                $rtn:"Boolean",
                $paras:[
                    "type [必需参数] : x表示横向滚动栏，y表示纵向滚动栏"
                ]
            },
            css:{
                $desc:"获取第一个元素的某个CSS属性值, 或设置所有元素的某个属性值",
                $rtn:"String/[self]",
                $paras:[
                    "name [必需参数] : CSS属性名或键值对",
                    "value [可选参数] : CSS属性值"
                ],
                $snippet:[
                    "var n=xui('btnLang'); alert(n.css('background')); alert(n.css('overflow')); alert(n.css('top'));",
                    "var n=xui('btnLang'); n.css('right','30px'); xui.asyRun(function(){n.css('right','0')},1000)",
                    "var n=xui('btnLang'); n.css({top:'30px',right:'30px'}); xui.asyRun(function(){n.css({top:0,right:0})},1000)"
                ]
            },
            cssPos:{
                $desc:"获取或设置第一个元素的left 和 top值",
                $rtn:"Object/[self]",
                $paras:[
                    "pos [可选参数] : {left:Number or String,top:Number or String}",
                    "triggerEvent [可选参数] : Boolean, 指示是否触发事件"

                ],
                $snippet:[
                    "var n=xui('btnLang'); n.cssPos({left:100,top:100}); alert(xui.serialize(n.cssPos())); n.cssPos({left:'auto',top:'auto'})"
                ]
            },
            cssSize:{
                $desc:"获取或设置第一个元素的width 和 height值",
                $rtn:"Object/[self]",
                $paras:[
                    "value [可选参数] : {width:Number or String,height:Number or String}",
                    "triggerEvent [可选参数] : Boolean, 指示是否触发事件"
                ],
                $snippet:[
                    "var n=xui('btnLang'), bak=n.cssSize(); n.cssSize({width:50,height:50}); alert(xui.serialize(n.cssSize())); n.cssSize(bak)"
                ]
            },
            cssRegion:{
                $desc:"获取或设置第一个元素的region值",
                $rtn:"Object/[self]",
                $paras:[
                    "value [可选参数] : {left:Number or String,top:Number or String,right:Number or String,bottom:Number or String,width:Number or String,height:Number or String}",
                    "triggerEvent [可选参数] : Boolean, 指示是否触发事件"
                ],
                $snippet:[
                    "var n=xui('btnLang'),bak=n.cssRegion(); n.cssRegion({left:100,top:100,width:50,height:50}); alert(xui.serialize(n.cssRegion())); bak.left=bak.top='auto'; n.cssRegion(bak);"
                ]
            },
            query:{
                $desc:"查找所有元素,寻找满足特定参数的元素",
                $rtn:"xui.Dom",
                $paras:[
                    "tagName [可选参数] : DOM元素的tagName",
                    "property [可选参数] : DOM 元素的属性名或函数",
                    "expr [可选参数] : DOM元素的属性值或值的正则表达式"
                ],
                $snippet:[
                    "var id='xui.temp.query'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<div id=id1 style=\"border:solid 1px;padding:5px;\"><div style=\"border:solid 1px;padding:5px;\"> <input /><input /></div></div>  <button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); alert(n.outerHTML());alert(n.query().get().length); alert(n.query('div').get().length); alert(n.query('div','id').get().length); alert(n.query('div','id',id).get().length); alert(n.query('*','id',/^id/).get().length); alert(n.query('*',function(o){return o.tagName=='INPUT'}).get().length);"+
                    "}"
                ]
            },
            startDrag:{
                $desc:"开始拖动第一个元素",
                $rtn:"[self]",
                $paras:[
                    "e [必需参数] : DOM 事件对象",
                    "profile [可选参数] : Object, 拖动参数,参见<strong>xui.DragDrop.startDrag</strong>中profile的具体内容",
                    "dragKey [可选参数] : String, 拖动数据的标识符",
                    "dragData [可选参数] : Object, 拖动数据"
                ],
                $snippet:[
                    "var id='xui.temp.dd0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).onMousedown(function(p,e,s){xui(s).startDrag(e)})"+
                    "}"
                ],
                $memo:"Dependencies: xui.DragDrop"
            },
            draggable:{
                $desc:"启用或禁止元素是否可拖动",
                $rtn:"[self]",
                $paras:[
                    "flag [必需参数] : Boolean, [true]: 表示可拖动; [false]: 表示不可拖动. 默认为[true]",
                    "profile [可选参数] : Object, 拖动参数,参见<strong>xui.DragDrop.startDrag</strong>中profile的具体内容",
                    "key [可选参数] : String, 拖动数据的标识符",
                    "data [可选参数] : Object, 拖动数据",
                    "target [可选参数] : xui.Dom, 拖动目标"
                ],
                $snippet:[
                    "var id='xui.temp.dd_a'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:80px;\">' + '<div id='+id+'a style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:10px;top:30px;\">1</div>' + '<div id='+id+'b style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:50px;top:30px;\">2</div>'+ '<div id='+id+'c style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:100px;top:30px;\">3</div>'+ '<div id='+id+'d style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:150px;top:30px;\">4</div>'+ '<div id='+id+'e style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:200px;top:30px;\">5</div>'+ '<div id='+id+'f style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:250px;top:30px;\">6</div>'+ '<div id='+id+'g style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:300px;top:30px;\">7</div>'+ '<div id='+id+'h style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:350px;top:30px;\">8</div>'+ '<div id='+id+'i style=\"background:#ccc;position:absolute;border:solid 1px;padding:15px;left:400px;top:30px;\">9</div>'+ ' <button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));" +
                    "var a=[0,200,400,600,800,1000,1200,1400];"+
                    "xui(id+'a').draggable(true,{dragType:'move'});" +
                    "xui(id+'b').draggable(true,{dragType:'copy',targetReposition:false});"+
                    "xui(id+'c').draggable(true,{dragType:'icon',shadowFrom:id+'c'});"+
                    "xui(id+'d').draggable(true,{dragType:'shape',targetReposition:false});"+
                    "xui(id+'e').draggable(true,{dragDefer:20,targetReposition:false});"+
                    "xui(id+'f').draggable(true,{xMagneticLines:a,yMagneticLines:a,magneticDistance:50,targetReposition:false});"+
                    "xui(id+'g').draggable(true,{widthIncrement:50,heightIncrement:50,targetReposition:false});"+
                    "xui(id+'h').draggable(true,{verticalOnly:true,targetReposition:false});"+
                    "xui(id+'i').draggable(true,{maxLeftOffset:50,maxTopOffset:50,maxRightOffset:50,maxBottomOffset:50,targetReposition:false});"+
                    "}"
                ],
                $memo:"Dependencies: xui.DragDrop"
            },
            droppable:{
                $desc:"启用或禁止元素是否可丢放",
                $rtn:"[self]",
                $paras:[
                    "flag [必需参数] : Boolean, [true]: 表示可丢放; [false]: 表示不可丢放. 默认为[true]",
                    "key [必需参数] : String, 丢放数据标志符. 默认为'default'"
                ],
                $snippet:[
                    "var id='xui.temp.dd2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">draggable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">droppable</div>' + ' <button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var n=xui(id); n.first().draggable(true,{dragType:'icon'},'key1','data1').next().droppable(true,'key1').onDrop(function(){alert(xui.DragDrop.getProfile().dragData);})"+
                    "}"
                ],
                $memo:"Dependencies: xui.DragDrop"
            },
            empty:{
                $desc:"清空包含的所有DOM元素",
                $rtn:"[self]",
                $paras:[
                    "triggerGC [可选参数] : Boolean, 指示是否触发GC(垃圾回收)"
                ],
                $snippet:[
                    "var id='xui.temp.empty'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div id='+id+' style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">content in div<br /><button onclick=\"xui(\\\''+id+'\\\').empty()\">Empty me</button></div>'+ '<button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "}"
                ]
            },
            remove:{
                $desc:"移除包含的所有DOM元素",
                $rtn:"[self]",
                $paras:[
                    "triggerGC [可选参数] : Boolean, 指示是否触发GC(垃圾回收)"
                ],
                $snippet:[
                    "var id='xui.temp.empty'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\">content in div'+ '<button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "}"
                ]
            },
            replace:{
                $desc:"用一系列的DOM元素替换第一个元素",
                $rtn:"xui.Dom",
                $paras:[
                    "target [必需参数] : xui.Dom, 该对象包含一系列的DOM元素,用于替换当前第一个元素",
                    "triggerGC [可选参数] : Boolean, 指示是否触发GC(垃圾回收)"
                ],
                $snippet:[
                    "var id='xui.temp.replace'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"><div id='+id+' style=\"border:solid 1px;padding:5px;\"></div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){ xui(id).replace(xui.create('a<input value=b />c<input value=d />e')) },1000)"+
                    "}"
                ]
            },
            swap:{
                $desc:"交换第一个元素和参数指定的元素",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.Dom 对象. 该对象包含有要交换的DOM元素"
                ],
                $snippet:[
                    "var id='xui.temp.replace'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'1  style=\"border:solid 1px;padding:5px;\">1</div><div id='+id+'2 style=\"border:solid 1px;padding:5px;\">2</div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){ xui(id+'1').swap( xui(id+'2') ) },1000);xui.asyRun(function(){ xui(id+'1').swap( xui(id+'2') ) },2000);"+
                    "}"
                ]
            },
            setInlineBlock:{
                $desc:"将所有的元素CSS的display属性设置为'inline'",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.sib'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'  style=\"border:solid 1px;padding:5px;\">1</div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){ xui(id).setInlineBlock()  },1000);xui.asyRun(function(){ xui(id).css('display','') },2000);"+
                    "}"
                ]
            },
            setSelectable:{
                $desc:"启用或禁止包含的元素可用鼠标选择",
                $rtn:"[self]",
                $paras:[
                    "value [可选参数] : Boolean, 默认为禁止[false]"
                ],
                $snippet:[
                    "var id='xui.temp.ssable'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div  style=\"border:solid 1px;padding:10px;\"><div id='+id+'1  style=\"border:solid 1px;padding:5px;\">selectable</div><div id='+id+'2 style=\"border:solid 1px;padding:5px;\">not selectable</div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id+'1').setSelectable(true);xui(id+'2').setSelectable(false);"+
                    "}"
                ]
            },
            first:{
                $desc:"获取包含所有的DOM元素的第一个子元素",
                $rtn:"xui.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引"
                ],
                $snippet:[
                    "var id='xui.temp.first'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1<div style=\"border:solid 1px;padding:5px;\">2<div style=\"border:solid 1px;padding:5px;\">3<div style=\"border:solid 1px;padding:5px;\">4</div></div></div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).first().css('background','#eee');xui(id).first(2).css('background','#ccc');xui(id).first(3).css('background','#888');xui(id).first(4).css('background','#444');"+
                    "}"
                ]
            },
            parent:{
                $desc:"获取包含所有的DOM元素的父元素",
                $rtn:"xui.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引"
                ],
                $snippet:[
                    "var id='xui.temp.parent'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1<div style=\"border:solid 1px;padding:5px;\">2<div style=\"border:solid 1px;padding:5px;\">3<div style=\"border:solid 1px;padding:5px;\" id='+id+' >4</div></div></div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).parent(4).css('background','#eee');xui(id).parent(3).css('background','#ccc');xui(id).parent(2).css('background','#888');xui(id).parent().css('background','#444');"+
                    "}"
                ]
            },
            last:{
                $desc:"获取包含所有的DOM元素的最后一个子元素",
                $rtn:"xui.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引"
                ],
                $snippet:[
                    "var id='xui.temp.last'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><button onclick=\"xui(this).parent().remove()\">remove this example</button><div style=\"border:solid 1px;padding:5px;\">1<input /><div style=\"border:solid 1px;padding:5px;\">2<input /><div style=\"border:solid 1px;padding:5px;\">3<input /><div style=\"border:solid 1px;padding:5px;\">4</div></div></div></div></div>'));"+
                    "xui(id).last().css('background','#eee');xui(id).last(2).css('background','#ccc');xui(id).last(3).css('background','#888');xui(id).last(4).css('background','#444');"+
                    "}"
                ]
            },
            prev:{
                $desc:"获取包含所有的DOM元素的前一个兄弟元素",
                $rtn:"xui.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引"
                ],
                $snippet:[
                    "var id='xui.temp.prev'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div style=\"border:solid 1px;padding:5px;\">1</div><div style=\"border:solid 1px;padding:5px;\">2</div><div style=\"border:solid 1px;padding:5px;\">3</div><div style=\"border:solid 1px;padding:5px;\">4</div><button onclick=\"xui(this).parent().remove()\">remove this example</button></div>'));"+
                    "xui(id).last().prev().css('background','#eee');xui(id).last().prev(2).css('background','#ccc');xui(id).last().prev(3).css('background','#888');xui(id).last().prev(4).css('background','#444');"+
                    "}"
                ]
            },
            next:{
                $desc:"获取包含所有的DOM元素的后一个兄弟元素",
                $rtn:"xui.Dom",
                $paras:[
                    "index [可选参数] : Number, 迭代器索引"
                ],
                $snippet:[
                    "var id='xui.temp.next'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><button onclick=\"xui(this).parent().remove()\">remove this example</button><div style=\"border:solid 1px;padding:5px;\">1</div><div style=\"border:solid 1px;padding:5px;\">2</div><div style=\"border:solid 1px;padding:5px;\">3</div><div style=\"border:solid 1px;padding:5px;\">4</div></div>'));"+
                    "xui(id).first().next().css('background','#eee');xui(id).first().next(2).css('background','#ccc');xui(id).first().next(3).css('background','#888');xui(id).first().next(4).css('background','#444');"+
                    "}"
                ]
            },
            focus:{
                $desc:"让第一个元素获取焦点, 如果不能获取焦点则忽略",
                $rtn:"[self]",
                $paras:[
                    "force [可选参数] : Boolean, 强迫设置焦点"
                ],
                $snippet:[
                    "var id='xui.temp.1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).last().focus()"+
                    "}"
                ]
            },
            leftBy:{
                $desc:"增加或减少元素的left值",
                $rtn:"[self]",
                $paras:[
                    "offset [必需参数] : Number, 增加或减少（负数）的值",
                    "triggerEvent [可选参数] : Boolean, 标志是否触发事件"
                ],
                $snippet:[
                    "var id='xui.temp.leftBy'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){xui(id).leftBy(10)},500);xui.asyRun(function(){xui(id).leftBy(10)},1000); xui.asyRun(function(){xui(id).leftBy(10)},1500);xui.asyRun(function(){xui(id).leftBy(10)},2000);"+
                    "}"
                ]
            },
            topBy:{
                $desc:"增加或减少元素的top值",
                $rtn:"[self]",
                $paras:[
                    "offset [必需参数] : Number, 增加或减少（负数）的值",
                    "triggerEvent [可选参数] : Boolean, 标志是否触发事件"
                ],
                $snippet:[
                    "var id='xui.temp.topBy'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){xui(id).topBy(10)},500);xui.asyRun(function(){xui(id).topBy(10)},1000); xui.asyRun(function(){xui(id).topBy(10)},1500);xui.asyRun(function(){xui(id).topBy(10)},2000);"+
                    "}"
                ]
            },
            widthBy:{
                $desc:"增加或减少元素的width值",
                $rtn:"[self]",
                $paras:[
                    "offset [必需参数] : Number, 增加或减少（负数）的值",
                    "triggerEvent [可选参数] : Boolean, 标志是否触发事件"
                ],
                $snippet:[
                    "var id='xui.temp.widthBy'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){xui(id).widthBy(10)},500);xui.asyRun(function(){xui(id).widthBy(10)},1000); xui.asyRun(function(){xui(id).widthBy(10)},1500);xui.asyRun(function(){xui(id).widthBy(10)},2000);"+
                    "}"
                ]
            },
            heightBy:{
                $desc:"增加或减少元素的height值",
                $rtn:"[self]",
                $paras:[
                    "offset [必需参数] : Number, 增加或减少（负数）的值",
                    "triggerEvent [可选参数] : Boolean, 标志是否触发事件"
                ],
                $snippet:[
                    "var id='xui.temp.heightBy'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){xui(id).heightBy(10)},500);xui.asyRun(function(){xui(id).heightBy(10)},1000); xui.asyRun(function(){xui(id).heightBy(10)},1500);xui.asyRun(function(){xui(id).heightBy(10)},2000);"+
                    "}"
                ]
            },
            hide:{
                $desc:"隐藏所有的元素",
                $rtn:"[self]",
                $snippet:[
                    "xui('btnLang').hide(); xui.asyRun(function(){xui('btnLang').show();},1000);"
                ]
            },
            show:{
                $desc:"显示所有的元素",
                $rtn:"[self]",
                $paras:[
                    "left [可选参数] : Number, left值",
                    "top [可选参数] : Number, top值"
                ],
                $snippet:[
                    "xui('btnLang').hide(); xui.asyRun(function(){xui('btnLang').show();},1000);"
                ]
            },
            text:{
                $desc:"获取第一个元素的文本内容,或设置所有元素的文本内容",
                $rtn:"String/[self]",
                $paras:[
                    "content [可选参数] : String, 文本内容"
                ],
                $snippet:[
                    "var id='xui.temp.text'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).text('<input />'); alert(xui(id).text());"+
                    "}"
                ]
            },
            html:{
                $desc:"获取或设置第一个元素的innerHTML",
                $rtn:"String/[self]",
                $paras:[
                    "content [可选参数] : String, innerHTML的值",
                    "triggerGC [可选参数] : Boolean, 是否触发GC(垃圾回收). 默认是true",
                    "loadScripts [可选参数] : Boolean, 是否执行内部的script. 默认是 false"

                ],
                $snippet:[
                    "var id='xui.temp.html1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).html('<input />'); alert(xui(id).html());"+
                    "}"
                ]
            },
            loadHtml:{
                $desc:"加载一个同域的html文件到当前节点内",
                $rtn:"[self]",
                $paras:[
                    "options [必需参数] : String或Object, 包括url的加载参数",
                    "onStart [可选参数] : Function, 开始加载的回调函数",
                    "onEnd [可选参数] : Function, 结束加载的回调函数"
                ]
            },
            loadIframe:{
                $desc:"通过iframe加载一个的html文件到当前节点内",
                $rtn:"[self]",
                $paras:[
                    "options [必需参数] : String或Object, 包括url的加载参数",
                    "domId [可选参数] : String, IFrame的DOM ID"
                ]
            },
            outerHTML:{
                $desc:"获取或设置第一个元素的outerHTML",
                $rtn:"String/[self]",
                $paras:[
                    "content [可选参数] : String, outerHTML的值",
                    "triggerGC [可选参数] : Boolean,  指示是否触发GC(垃圾回收)"
                ],
                $snippet:[
                    "var id='xui.temp.html1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"><div style=\"padding:5px;border:solid 1px;\" id='+id+' ></div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).outerHTML('<div style=\"padding:5px;border:dashed 2px;\" id='+id+' ><input /></div>'); alert(xui(id).outerHTML());"+
                    "}"
                ]
            },
            "id":{
                $desc:"获取(第一个元素)或设置(所有元素)的DOM id",
                $rtn:"String/[self]",
                $paras:[
                    "value [可选参数] : String, DOM id value",
                    "ignoreCache [可选参数] : Boolean, indicates if ignore to reset cache. 默认为[false]"
                ],
                $snippet:[
                    "var n=xui('btnLang'); n.id('logo2'); alert(n.id()); n.id('btnLang');"
                ]
            },
            fixPng:{
                $desc: "修复IE6的png文件显示问题",
                $rtn:"[self]",
                $memo:"只用于IE6"
            },
            ieRemedy:{
                $desc: "在IE中,触发DOM 元素的内部重画函数"+
                    "在某些IE的旧版本中, DOM的尺寸改变(例如. 改变 overflow='visible'的元素css高度)不会触发布局的变化 ",
                $rtn:"[self]",
                $memo:"只用于IE"
            },
            scrollLeft:{
                $desc:"获取(第一个元素)或设置(所有元素)CSS样式中的scrollLeft值",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.scrollLeft'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><div style=\"overflow:auto; width:50px;height:50px;\" id='+id+' />aaaaaaaaaaaaa bbbbbbbbbbb cccccccccc dddddddd</div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).scrollLeft(xui(id).scrollWidth()); alert(xui(id).scrollLeft())"+
                    "}"
                ]
            },
            rotate:{
                $desc:"获取第一个元素的CSS变形属性中的旋转角度, 或设置到所有元素",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ]
            },
            scaleX:{
                $desc:"获取第一个元素的CSS变形属性中的X方向伸缩度, 或设置到所有元素",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ]
            },
            scaleY:{
                $desc:"获取第一个元素的CSS变形属性中的Y方向伸缩度, 或设置到所有元素",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ]
            },
            translateX:{
                $desc:"获取第一个元素的CSS变形属性中的X方向平移, 或设置到所有元素",
                $rtn:"String/[self]",
                $paras:[
                    "value [可选参数] : String"
                ]
            },
            translateY:{
                $desc:"获取第一个元素的CSS变形属性中的Y方向平移, 或设置到所有元素",
                $rtn:"String/[self]",
                $paras:[
                    "value [可选参数] : String"
                ]
            },
            skewX:{
                $desc:"获取第一个元素的CSS变形属性中的X方向倾斜度, 或设置到所有元素",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ]
            },
            skewY:{
                $desc:"获取第一个元素的CSS变形属性中的Y方向倾斜度, 或设置到所有元素",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ]
            },
            scrollTop:{
                $desc:"获取(第一个元素)或设置(所有元素)CSS样式中的scrollTop值",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.scrollTop'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><div style=\"overflow:auto; width:50px;height:50px;\" id='+id+' />aaaaaaaaaaaaa bbbbbbbbbbb cccccccccc dddddddd</div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).scrollTop(xui(id).scrollHeight()); alert(xui(id).scrollTop())"+
                    "}"
                ]
            },

            left:{
                $desc:"获取(第一个元素)或设置(所有元素)CSS样式中的left值",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.left'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){xui(id).left(10)},1000);xui.asyRun(function(){xui(id).left(20)},2000); xui.asyRun(function(){xui(id).left(30)},3000);"+
                    "}"
                ]
            },
            top:{
                $desc:"获取(第一个元素) 或设置(所有元素)CSS样式中的top值",
                $rtn:"Number/[self]",
                $paras:[
                    "value [可选参数] : Number"
                ],
                $snippet:[
                    "var id='xui.temp.top'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input style=\"position:absolute;left:0;top:0;\" id='+id+' />' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){xui(id).top(10)},1000);xui.asyRun(function(){xui(id).top(20)},2000); xui.asyRun(function(){xui(id).top(30)},3000);"+
                    "}"
                ]
            },
            nextFocus:{
                $desc:"获取下一个将要获取焦点的元素",
                $rtn:"xui.Dom",
                $paras:[
                    "downwards [可选参数] : Boolean, 指示向下([true])还是向上([false])移动焦点. 默认为[true]",
                    "includeChild [可选参数] : Boolean, 指示是否包括子元素. 默认为[true]",
                    "setFocus [可选参数] : Boolean, 指示是否要让下一个元素真正获取焦点. 默认为[true]"
                ],
                $snippet:[
                    "var id='xui.temp.nextFocus'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative;height:50px;border:solid 1px;padding:10px;\"><input value=upwards /><input id='+id+' /><button>downwards</button>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){xui(id).nextFocus();},1000);xui.asyRun(function(){xui(id).nextFocus(false)},2000);"+
                    "}"
                ]
            },
            offsetLeft:{
                $desc:"获取第一个元素的左边偏移量",
                $rtn:"Number",
                $snippet:[
                    "alert(this.offsetLeft())"
                ]
            },
            offsetTop:{
                $desc:"获取第一个元素的上边偏移量",
                $rtn:"Number",
                $snippet:[
                "alert(this.offsetTop())"
                ]
            },
            hoverPop:{
                $desc:"设置鼠标悬停弹出窗口",
                 $rtn:"[self]",
                $paras:[
                    "node [必需参数]  : Object/xui.Dom/Element. 弹出窗口",
                    "type [可选参数] : String, 参考popToTop, 如果为null，取消设置",
                    "beforePop[可选参数] : Function(prf, node, e, src), 窗口弹出之前调用",
                    "beforeHide[可选参数] : Function(prf, node, e, src, trigger), 窗口隐藏之前调用",
                    "parent [可选参数] : xui.Dom, 父窗口. 默认为[document.body]",
                    "groupid[Optional] : String.  组标识 id",
                    "showEffects[Optional] : Object, 出现动画的配置",
                    "hideEffects[Optional] : Object, 隐去动画的配置"
                ]
            },
            pop:{
                $desc:"将第一个元素显示到最顶层，并设置一个隐藏触发函数, 该函数将在鼠标单击元素之外的区域时被调用",
                $rtn:"String, 区域外点击隐藏的唯一标识",
                $paras:[
                    "pos [必需参数] : Object/xui.Dom/Element",
                    "type [可选参数] : String, 以下之一：'outer','inner','outerleft-outertop','left-outertop','center-outertop','right-outertop','outerright-outertop','outerleft-top','left-top','center-top','right-top','outerright-top','outerleft-middle','left-middle','center-middle','right-middle','outerright-middle','outerleft-bottom','left-bottom','center-bottom','right-bottom','outerright-bottom','outerleft-outerbottom','left-outerbottom','center-outerbottom','right-outerbottom','outerright-outerbottom', 向前兼容也可以是1~4,12,21. 默认为outer",
                    "parent [可选参数] : xui.Dom, the parent element to hold the pop element. 默认为[document.body]",
                    "trigger [必需参数] : Function or [null] :  隐藏触发函数",
                    "group [可选参数] : xui.Dom, 触发函数的组对象"
                ]
            },
            popToTop:{
                $desc:"将第一个元素显示成父元素的顶层",
                $rtn:"[self]",
                $paras:[
                    "pos [必需参数] : Object/xui.Dom/Element",
                    "type [可选参数] : String, 以下之一：'outer','inner','outerleft-outertop','left-outertop','center-outertop','right-outertop','outerright-outertop','outerleft-top','left-top','center-top','right-top','outerright-top','outerleft-middle','left-middle','center-middle','right-middle','outerright-middle','outerleft-bottom','left-bottom','center-bottom','right-bottom','outerright-bottom','outerleft-outerbottom','left-outerbottom','center-outerbottom','right-outerbottom','outerright-outerbottom', 向前兼容也可以是1~4,12,21. 默认为outer",
                    "parent [可选参数] : xui.Dom, the parent element to hold the pop element. 默认为[document.body]"
                ],
                $snippet:[
                    "var id='xui.temp.p2p'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"position:relative; border:solid 1px;padding:10px;\"><button id='+id+' style=\"height:100px;width:100px;\">downwards</button>' + '<br /><br /><br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.asyRun(function(){if(xui.Dom.byId(id))xui(xui.create('<div style=\"border:solid 1px;background:#ccc;width:50px;height:50px;\">type 1</div>')).popToTop(xui(id),1,xui(id).parent());},500);"+
                    "xui.asyRun(function(){if(xui.Dom.byId(id))xui(xui.create('<div style=\"border:solid 1px;background:#aaa;width:50px;height:50px;\">type 2</div>')).popToTop(xui(id),2,xui(id).parent());},1000);"+
                    "xui.asyRun(function(){if(xui.Dom.byId(id))xui(xui.create('<div style=\"border:solid 1px;background:#888;width:50px;height:50px;\">type 3</div>')).popToTop(xui(id),3,xui(id).parent());},1500);"+
                    "xui.asyRun(function(){if(xui.Dom.byId(id))xui(xui.create('<div style=\"border:solid 1px;background:#666;width:50px;height:50px;\">type 4</div>')).popToTop(xui(id),4,xui(id).parent());},2000);"+
                    "}"
                ]
            },
            setBlurTrigger:{
                $desc:"设置或取消设置一个区域外点击触发函数, 该函数将在用户单击第一个元素之外的区域时被调用",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 触发函数的标志符",
                    "trigger [必需参数] : Function or [null] :  隐藏触发函数",
                    "group [可选参数] : xui.Dom, 触发函数的组对象"
                ],
                $snippet:[
                "var id='xui.temp.sbt'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"> <div id='+id+' style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).setBlurTrigger('ttt',function(){alert('out of my region');})"+
                "}",
                "var id='xui.temp.sbt'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"> <div id='+id+'1 style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div><div id='+id+'2 style=\"border:solid 1px;padding:5px;width:50px;height:50px;\"> </div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id+'1').setBlurTrigger('ttt',function(){alert('out of my region')},xui([id+'1',id+'2']))"+
                "}"
                ]
            },
            topZindex:{
                $desc:"获取最小的zIndex值,该值可以让第一个元素显示在其父元素的最顶层; 或直接第一个元素成为其父元素的最顶层",
                $rtn:"Get: Number, Set:[self]",
                $paras:[
                    "flag [可选参数] : Boolean, 指示是否设置第一个元素为最顶层. 默认为[false]"
                ],
                $snippet:[
                    "var id='xui.temp.tzi'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:130px;\">' + '<div id='+id+'1 style=\"z-index:1;background:#ccc;position:absolute;border:solid 1px;padding:50px;left:10px;top:30px;\">1</div>' + '<div id='+id+'2 style=\"z-index:2;background:#aaa;position:absolute;border:solid 1px;padding:50px;left:50px;top:30px;\">2</div>'+ '<div id='+id+'3 style=\"z-index:3;background:#888;position:absolute;border:solid 1px;padding:50px;left:100px;top:30px;\">3</div>'+ '<div id='+id+'4 style=\"z-index:4;background:#444;position:absolute;border:solid 1px;padding:50px;left:150px;top:30px;\">4</div>'+ ' <button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));" +
                    "var n=xui(id+'1');alert(n.css('zIndex')+':'+n.topZindex()); n.topZindex(true); alert(n.css('zIndex')+':'+n.topZindex());"+
                    "}"
                ]
            },

            afterBlur:$eo,
            afterChange:$eo,
            afterClick:{
                $rtn:"[self]",
                $paras:[
                    "fun [可选参数]: Function, 函数参数是 [xui.DomProfile Object, DOM event Object, the current element's xid]",
                    "label [可选参数]: String, 事件标签",
                    "flag  [可选参数]: Boolean, 移除事件标志"
                ],
                $snippet:[
                "var id='xui.temp.event'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"></p><button style=\"height:50px;\" id='+id+'>BUTTON element for testing.</button></p>' + '<br /><br /><button onclick=\"xui(\\\''+id+'\\\').onClick();\">fire event:[onclick] group functions</button> - <button onclick=\"xui(\\\''+id+'\\\').onClick(true);\">fire event: all functions</button> - <button onclick=\"xui(\\\''+id+'\\\').onClick(null,\\\'1#\\\');\">remove [onclick] 1#</button> - <button onclick=\"xui(\\\''+id+'\\\').beforeClick(null);\">remove all [beforeclick] functions</button> - <button onclick=\"xui(\\\''+id+'\\\').onClick(null,null,true);\">remove all functions</button><br /><br /><br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).beforeClick(function(){alert('beforeclick 1#')},'1#').beforeClick(function(){alert('beforeclick 2#')},'2#').onClick(function(){alert('onclick 1#')},'1#').onClick(function(){alert('onclick 2#')},'2#').afterClick(function(){alert('afterclick 1#, this function return [false], the remaining functions will be ignored!'); return false;},'1#').afterClick(function(){alert('afterclick 2#')},'2#');"+
                "}"
                ]
            },
            afterContextmenu:$eo,
            afterDblclick:$eo,
            afterDrag:$eo,
            afterDragbegin:$eo,
            afterDragenter:$eo,
            afterDragleave:$eo,
            afterDragover:$eo,
            afterDragstop:$eo,
            afterDrop:$eo,
            afterError:$eo,
            afterFocus:$eo,
            afterKeydown:$eo,
            afterKeypress:$eo,
            afterKeyup:$eo,
            afterLoad:$eo,
            afterMove:$eo,
            afterMousedown:$eo,
            afterMousemove:$eo,
            afterMouseout:$eo,
            afterMouseover:$eo,
            afterMouseup:$eo,
            afterMousewheel:$eo,
            afterScroll:$eo,
            afterSelect:$eo,
            afterSize:$eo,
            afterSubmit:$eo,
            afterUnload:$eo,
            beforeBlur:$eo,
            beforeChange:$eo,
            beforeClick:$eo,
            beforeContextmenu:$eo,
            beforeDblclick:$eo,
            beforeDrag:$eo,
            beforeDragbegin:$eo,
            beforeDragenter:$eo,
            beforeDragleave:$eo,
            beforeDragover:$eo,
            beforeDragstop:$eo,
            beforeDrop:$eo,
            beforeError:$eo,
            beforeFocus:$eo,
            beforeKeydown:$eo,
            beforeKeypress:$eo,
            beforeKeyup:$eo,
            beforeLoad:$eo,
            beforeMove:$eo,
            beforeMousedown:$eo,
            beforeMousemove:$eo,
            beforeMouseout:$eo,
            beforeMouseover:$eo,
            beforeMouseup:$eo,
            beforeMousewheel:$eo,
            beforeScroll:$eo,
            beforeSelect:$eo,
            beforeSize:$eo,
            beforeSubmit:$eo,
            beforeUnload:$eo,
            onBlur:$eo,
            onChange:$eo,
            onClick:$eo,
            onContextmenu:$eo,
            onDblclick:$eo,
            onDrag:$eo,
            onDragbegin:$eo,
            onDragenter:$eo,
            onDragleave:$eo,
            onDragover:$eo,
            onDragstop:$eo,
            onDrop:$eo,
            onError:$eo,
            onFocus:$eo,
            onKeydown:$eo,
            onKeypress:$eo,
            onKeyup:$eo,
            onLoad:$eo,
            onMove:$eo,
            onMousedown:$eo,
            onMousemove:$eo,
            onMouseout:$eo,
            onMouseover:$eo,
            onMouseup:$eo,
            onMousewheel:$eo,
            onScroll:$eo,
            onSelect:$eo,
            onSize:$eo,
            onSubmit:$eo,
            onUnload:$eo
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","DragDrop"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.DragDrop 类(静态类)",
        abort:{
            $desc:"取消当前的D&D(Drag & Drop)操作",
            $snippet:[
                "var id='xui.temp.ddo1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">draggable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">droppable</div>' + ' <button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=xui(id); n.first().draggable(true,{dragType:'icon'},'key1','data1').next().droppable(true,'key1').onDragenter(function(){xui.DragDrop.abort();xui.message('the current dd is aborted!')})"+
                "}"
            ]
        },
        getProfile:{
            $desc:"获取所有的(Profile)拖动信息",
            $rtn:"xui.DragDrop",
            $rtn:"key/value Object",
            $snippet:[
                "var id='xui.temp.ddo2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">draggable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">droppable</div>' + ' <button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=xui(id); n.first().draggable(true,{dragType:'icon'},'key1','data1').next().droppable(true,'key1').onDrop(function(){alert(xui.Coder.formatText(xui.serialize(xui.DragDrop.getProfile())))})"+
                "}"
            ]
        },
        setDragIcon:{
            $desc:"设置拖动时鼠标显示的图标",
            $rtn:"xui.DragDrop",
            $paras:[
                "key [可选参数] : String, 拖动时的图标编号. 默认为 'move'"
            ],
            $snippet:[
                "var id='xui.temp.ddo3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var numb; xui(id).onMousedown(function(p,e,s){numb=0;xui(s).startDrag(e,{dragType:'icon'})}).onDrag(function(){numb++; if(numb<=200){if(numb==50)xui.DragDrop.setDragIcon('move');else if(numb==100)xui.DragDrop.setDragIcon('link');else if(numb==150)xui.DragDrop.setDragIcon('copy');else if(numb==200)xui.DragDrop.setDragIcon('none');}});"+
                "}"
            ],
            $memo:"请在[dragType]仅为'move'时使用该函数"
        },
        setDropElement:{
            $desc:"设置丢放的DOM元素",
            $rtn:"xui.DragDrop",
            $snippet:[
                "src [必需参数] : DOM元素, 放下的DOM元素"
            ],
            $snippet:[
                "var id='xui.temp.ddo41'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' + '<div style=\"position:absolute;border:solid 1px;padding:20px;left:10px;top:30px;\">draggable</div>' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">droppable</div>' + ' <button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=xui(id); n.first().draggable(true,{dragType:'icon'},'key1','data1');"+
                "n=n.first().next();"+
                "n.onDrop(function(p,e,xid){xui.use(xid).css('background','#fff');alert(xui.Coder.formatText(xui.serialize(xui.DragDrop.getProfile())))});"+
                "\n//Must use 'before' here \n n.beforeMouseover(function(p,e,xid){xui.DragDrop.setDropElement(xid);xui.use(xid).css('background','#ccc');}).beforeMouseout(function(p,e,xid){xui.DragDrop.setDropElement(null);xui.use(xid).css('background','#fff');});"+
                "}"
            ]
        },
        setDropFace:{
            $desc:"设置丢放对象丢放时的外形",
            $rtn:"xui.DragDrop",
            $paras:[
                "target [必需参数] : DOM 元素或 xui.Dom 对象",
                "dragIcon [可选参数] : String, 拖动时的图标编号. 默认为 'move'"
            ],
            $snippet:[
                "var id='xui.temp.ddo42'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:150px;\">' +'<div style=\"position:absolute;border:solid 1px;left:160px;top:30px;width:100px;height:100px;\">setDropFace</div>' + ' <button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var n=xui(id).first().onMouseover(function(p,e,xid){xui.DragDrop.setDropFace(xid,'copy')}).onMouseout(function(){xui.DragDrop.setDropFace();})"+
                "}"
            ]
        },
        startDrag:{
            $desc:"<p>开始拖动",
            $paras:[
                "e [必需参数] : DOM 事件对象",
                "targetNode [必需参数] : 能包装成 xui.Dom 对象的输入",
                "profile [可选参数] : 键值对, 拖拽的概要对象.包括:" +
                "<div>{<ul>" +
                "<li><strong>dragType</strong>: 'move','copy','deep_copy','shape','icon', 'blank' 或 'none', 设置拖拽类型,默认为 'shape';</li>"+
                "<li><strong>shadowFrom</strong>: Element/xui.Dom, 设置拖拽的时候要显示哪个dom的影子.当 dragType 为 'icon' 的时候有效.</li>"+
                "<li><strong>targetReposition</strong>: Boolean, 设置是否最后要重置拖拽目标的位置, 默认为 [true];</li>"+

                "<li><strong>dragIcon</strong>: String, 设置拖拽的时候显示图标的图片路径, 默认为 [xui.ini.path+'ondrag.gif'].</li>"+
                "<li><strong>magneticDistance</strong>: Number, 设置磁性距离, 默认为 0;</li>"+
                "<li><strong>xMagneticLines</strong>: Array of Number, 设置水平方向的磁性线数组, 默认为 [];</li>"+
                "<li><strong>yMagneticLines</strong>: Array of Number, 设置垂直方向的磁性线数组, 默认为 [];</li>"+
                "<li><strong>widthIncrement</strong>: Number, 设置水平方向的最小增量值, 默认为 0;</li>"+
                "<li><strong>heightIncrement</strong>: Number, 设置垂直方向的最小增量值, 默认为 0;</li>"+
                "<li><strong>dragDefer</strong>: Number, 设置拖拽的延迟值.表示在[document.onmousemove]几次后拖拽才真正开始, 默认为 0;</li>"+

                "<li><strong>horizontalOnly</strong>:Boolean, 设置是否要只在水平方向拖拽, 默认为 [false];</li>"+
                "<li><strong>verticalOnly</strong>: Boolean, 设置是否要只在垂直方向拖拽, 默认为 [false];</li>"+
                "<li><strong>maxBottomOffset</strong>:Number, 设置下方向的最大拖拽距离, 默认为 [null];</li>"+
                "<li><strong>maxLeftOffset</strong>:Number, 设置左方向的最大拖拽距离, 默认为 [null];</li>"+
                "<li><strong>maxRightOffset</strong>:Number, 设置右方向的最大拖拽距离, 默认为 [null];</li>"+
                "<li><strong>maxTopOffset</strong>: Number, 设置上方向的最大拖拽距离, 默认为 [null];</li>"+

                "<li><strong>targetNode</strong>: Element/xui.Dom, 设置拖拽的目标;</li>"+
                "<li><strong>targetCSS</strong>: Number, 设置拖拽目标的CSS键值对, 默认为 [null];</li>"+
                "<li><strong>dragKey</strong>: String, 设置拖拽的数据键, 默认为 [null];</li>"+
                "<li><strong>dragData</strong>: Object, 设置拖拽的具体数据, 默认为 [null];</li>"+
                "<li><strong>targetLeft</strong>: Number, 设置拖拽目标的横向坐标, 默认为 [null];</li>"+
                "<li><strong>targetTop</strong>: Number, 设置拖拽目标的纵向坐标, 默认为 [null];</li>"+
                "<li><strong>targetWidth</strong>: Number, 设置拖拽目标的宽, 默认为 [null];</li>"+
                "<li><strong>targetHeight</strong>: Number, 设置拖拽目标的高, 默认为 [null];</li>"+
                "<li><strong>targetOffsetParent</strong>: xui.Dom, 设置拖拽目标的定位父元素(offsetParent), 默认为 [null];</li>"+

                "<li><strong>dragCursor</strong>:  'none', 'move', 'link', 或 'add', 得到鼠标当前的形状; <strong>只读</strong></li>"+
                "<li><strong>x</strong>: Number, 得到鼠标当前的 X 值; <strong>只读</strong></li>"+
                "<li><strong>y</strong>: Number, 得到鼠标当前的 Y 值; <strong>只读</strong></li>"+
                "<li><strong>ox</strong>: Number, 得到鼠标最初的 X 值; <strong>只读</strong></li>"+
                "<li><strong>oy</strong>: Number, 得到鼠标最初的 Y 值; <strong>只读</strong></li>"+
                "<li><strong>curPos</strong>: Object, {left:Number,top:Number}, 得到拖拽对象目前的css位置值 <strong>只读</strong></li>"+
                "<li><strong>offset</strong>: {x:Number,y:Number}, 得到拖拽对象目前css位置相对于最初位置的偏离值 <strong>只读</strong></li>"+
                "<li><strong>isWorking</strong>: Boolean, 得到拖拽是否在工作状态? <strong>只读</strong></li>"+
                "<li><strong>restrictedLeft</strong>: Number, 得到拖拽在左侧的边界位置; <strong>只读</strong></li>"+
                "<li><strong>restrictedRight</strong>: Number, 得到拖拽在右侧的边界位置; <strong>只读</strong></li>"+
                "<li><strong>restrictedTop</strong>: Number, 得到拖拽在上侧的边界位置; <strong>只读</strong></li>"+
                "<li><strong>restrictedBottom</strong>: Number, 得到拖拽在下侧的边界位置; <strong>只读</strong></li>"+
                "<li><strong>proxyNode</strong>: xui.Dom, 得到当前拖拽代理的DOM元素; <strong>只读</strong></li>"+
                "<li><strong>dropElement</strong>: String, 得到可以放下(drop)当前拖拽的DOM元素的xid. <strong>只读</strong></li>"+
                "</ul>}</div>",
                "dragKey [可选参数] : String, 得到拖拽的数据键",
                "dragData [可选参数] : Object, 得到拖拽的具体数据"
            ],
            $snippet:[
                "var id='xui.temp.ddo9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div style=\"border:solid 1px;padding:10px;\"><button id='+id+'>drag me</button>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "xui(id).onMousedown(function(p,e,s){xui.DragDrop.startDrag(e,s,{dragType:'copy'})})"+
                "}"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","CSS"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.CSS 类(静态类)",
        resetCSS:{
            $desc:"给当前文档添加reset CSS"
        },
        addStyleSheet:{
            $desc:"添加一个&lt;style>元素到&lt;head>区域中",
            $rtn:"Element",
            $paras:[
                "txt [必需参数] : String, CSS声明字符串",
                "id [可选参数] : String, 元素id. 如果在&lt;head>已经存在该id, 该函数将被忽略",
                "backOf [可选参数] : Boolean, 指示是否添加CSS到 &lt;head> 的最后. 默认为 false"
            ],
            $snippet:[
                "var id='xui.temp.add'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"xui.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(xui.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"xui.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        remove:{
            $desc:"从 &lt;head> 中移除 &lt;style> 或&lt;link> ",
            $paras:[
                "property [必需参数] : String, style元素的属性名",
                "value [必需参数] : String, style元素的属性值"
            ],
            $snippet:[
                "var id='xui.temp.rm'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"xui.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(xui.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"xui.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        get:{
            $desc:"获取&lt;head>中 &lt;style> 或 &lt;link>元素 ",
            $rtn:"Element",
            $paras:[
                "property [必需参数] : String, style元素的属性名",
                "value [必需参数] : String, style元素的属性值"
            ],
            $snippet:[
                "var id='xui.temp.get'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"xui.CSS.addStyleSheet(\\\'.testadded{background:#ccc;}\\\',\\\'testadded\\\')\">addStyleSheet</button> - '+ '<button onclick=\"alert(xui.CSS.get(\\\'id\\\',\\\'testadded\\\'))\">get</button> - '+  '<button onclick=\"xui.CSS.remove(\\\'id\\\',\\\'testadded\\\')\">remove</button>'+ '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        setStyleRules:{
            $desc:"设置样式的规则",
            $rtn:"xui.CSS",
            $paras:[
                "selector [必需参数] : String, CSS样式选择子(不包含逗号',')",
                "value [可选参数] : 键值对. 如果不指定,[selector]指定的选择子将被移除",
                "force [可选参数] : 设置该参数为真可强制增加选择子和CSS样式值到样式表, 即使该样式表已经存在该选择子"
            ],
            $snippet:[
                "var id='xui.temp.ar'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' class=testadded style=\"border:solid 1px;padding:10px;\">' + '<button onclick=\"xui.CSS.setStyleRules(\\\'.testadded\\\',{background:\\\'#888\\\'})\">add rules</button> - '+'<button onclick=\"xui.CSS.setStyleRules(\\\'.testadded\\\',{background:\\\'#ccc\\\'})\">update rules</button> - '+'<button onclick=\"xui.CSS.setStyleRules(\\\'.testadded\\\')\">remove rules</button>'+ '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "}"
            ]
        },
        replaceLink:{
            $desc:" 将样式表(&lt;style> 或 &lt;link>中的样式元素)中的为旧值的某个属性,替换为新值",
            $paras:[
                "href [必需参数] : String, 样式表的文件路径",
                "property [必需参数] : String, 指定的属性名",
                "oValue [必需参数] : String, 旧属性值",
                "nValue [必需参数] : String, 新属性值"
            ],
            $snippet:[
                "//xui.CSS.replaceLink('http://xxx.com/a.css', 'id', 'oldid', 'newid');"
            ]
        },
        includeLink:{
            $desc:"包含一个特定的[href](作为&lt;link>元素)到DOM的&lt;head>里面",
            $rtn:"Element",
            $paras:[
                "href [必需参数] : String, CSS文件的url路径",
                "id [可选参数] : String, 元素的id",
                "front [可选参数] : Boolean, 指示是否添加&lt;link>元素到&lt;head>的前面. 默认为 false",
                "attr [可选参数] : key/value Object, 元素&lt;link> 的属性"
            ],
            $snippet:[
                "//xui.CSS.includeLink('http://xxx.com/a.css', 'id', flase, {title:'title'});"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","History"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.History 类(静态类)",
        setCallback:{
            $desc:"设置回调函数. 该函数会在片段标志符(Fragement Identifier)改变时被调用",
            $rtn:"xui.History",
            $paras:[
                "callback [必需参数] : Function, 回调函数"
            ],
            $snippet:[
                "//xui.History.setCallback(function(str){alert('Fragement Identifier is: '+str)})"
            ]
        },
        getFI:{
            $desc:"获取当前的片段标志符(Fragement Identifier)",
            $rtn:"String",
            $snippet:[
                "//xui.History.setCallback(function(str){alert('Fragement Identifier is: '+str)})\n"+
                "//alert(xui.History.getFI());\n"+
                "//xui.History.setCallback(null)"
            ]
        },
        setFI:{
            $desc:"设置当前的片段标志符(Fragement Identifier)",
            $paras:[
                "fi [必需参数] : String, 片段标志符",
                "triggerCallback [可选参数] : Boolean, 指示是否调用回调函数. 默认为 [true]"
            ],
            $snippet:[
                "//xui.History.setCallback(function(str){alert('Fragement Identifier is: '+str)});\n"+
                "//xui.History.setFI('#test');\n"+
                "//xui.History.setCallback(null)"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Cookies"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Cookies 类(静态类)",
        get:{
            $desc:"获取全部或指定名字的cookie值",
            $rtn:"String",
            $paras:[
                "name [必需参数] : String, cookie名字"
            ],
            $snippet:[
                "var o=xui.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
            ]
        },
        set:{
            $desc:"保存一个cookie名,cookie值 和其他参数等",
            $rtn:"xui.Cookies",
            $paras:[
                "name [必需参数] : String, Cookie名",
                "value [必需参数] : String, cookie值",
                "days [可选参数] : Number, 过期天数. 默认为 0",
                "path [可选参数] : String, cookie有效的目录. 默认为当前 URL",
                "domain [可选参数] : String, 网站域名. 默认为当前URL的域名",
                "isSecure [可选参数] : Boolean, 指示cookie是否只能被安全的主机获取. 默认为 [false]"
            ],
            $snippet:[
                "var o=xui.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
            ]
        },
        remove:{
            $desc:"移除指定名字的cookie",
            $rtn:"xui.Cookies",
            $paras:[
                "name [必需参数] : String, cookie名字"
            ],
            $snippet:[
                "var o=xui.Cookies; o.set('a','b',1); alert(o.get('a')); o.remove('a'); alert(o.get('a')); "
            ]
        },
        clear:{
            $desc:"移除当前域名下的所有cookie"
        }
    });
    xui.set(xui.Locale,["cn","doc","xui","Debugger"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Debugger 类(静态)",
        'log':{
            $desc:"在Debugger窗口中打印日志信息",
            $snippet:[
                "//可以输入多个参数:\n"+
                "xui.Debugger.log(9,'a',[1,2],{a:1,b:2})"
            ]
        },
        trace:{
            $desc:"在Debugger窗口中打印对象的成员属性值和函数的调用关系信息",
            $paras:[
                "obj [可选参数] : Object"
            ],
            $snippet:[
                "xui.Debugger.trace({a:1,b:2})"
            ]
        },
        err:{
            $desc:"在Debugger窗口中打印javascript错误信息. 一般用法为 : 'window.onerror=xui.Debugger.err;'",
            $snippet:[
                "var old=window.onerror; \n window.onerror=xui.Debugger.err; \n throw new Error('a error!'); window.onerror=old;"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Date"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Date 类(静态类)",
        add:{
            $desc:"在基准时间戳加上一个时间段",
            $rtn:"Object, the result Date Object",
            $paras:[
                "date [必需参数] : Date Object, 基准时间戳",
                "datepart [必需参数] : String, 时间段单位'ms','s','n','h','d','ww','m','q','y','de' or 'c'",
                "count [必需参数] : Number, 时间段的值"
            ],
            $snippet:[
                "var date=xui.Date,d=date.parse('1/1/2000'),arr=[];"+
                "arr.push(xui.serialize(date.add(d, 'ms', 600)));"+
                "arr.push(xui.serialize(date.add(d, 's', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'n', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'h', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'd', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'ww', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'm', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'q', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'y', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'de', 1)));"+
                "arr.push(xui.serialize(date.add(d, 'c', 1)));"+
                "alert(arr.join('\\n'))"
            ]
        },
        diff:{
            $desc:"获取两个时间戳之间的时间段",
            $rtn:"Number",
            $paras:[
                "startdate [必需参数] : Date, 开始时间",
                "enddate [必需参数] : Date, 结束时间",
                "datepart [必需参数] : String, 时间段单位.  'ms','s','n','h','d','ww','m','q','y','de' or 'c'",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0"
            ],
            $snippet:[
                "var date=xui.Date,sd=date.parse('1/1/2000'),ed=new Date,arr=[];"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'ms')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 's')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'n')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'h')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'd')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'ww')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'm')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'q')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'y')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'de')));"+
                "arr.push(xui.serialize(date.diff(sd, ed, 'c')));"+
                "alert(arr.join('\\n'))"
            ]
        },
        get:{
            $desc:"获取时间戳在某个单位上的整数值",
            $rtn:"Number",
            $paras:[
                "date [必需参数] : Date Object, 时间戳",
                "datepart [必需参数] : String, 时间单位'ms','s','n','h','d','ww','m','q','y','de' or 'c'",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0"
            ],
            $snippet:[
                "var date=xui.Date,d=new Date();"+
                "alert('The millisecond of \"'+d+'\" is: '+date.get(d, 'ms'));"+
                "alert('The second of \"'+d+'\" is: '+date.get(d, 's'));"+
                "alert('The minute of \"'+d+'\" is: '+date.get(d, 'n'));"+
                "alert('The hour of \"'+d+'\" is: '+date.get(d, 'h'));"+
                "alert('The day of \"'+d+'\" is: '+date.get(d, 'd'));"+
                "alert('The week of \"'+d+'\" is: '+date.get(d, 'ww'));"+
                "alert('The week (first day of week is 1)  of \"'+d+'\" is: '+date.get(d, 'ww',1));"+
                "alert('The month of \"'+d+'\" is: '+date.get(d, 'm'));"+
                "alert('The quarter of \"'+d+'\" is: '+date.get(d, 'q'));"+
                "alert('The year of \"'+d+'\" is: '+date.get(d, 'y'));"+
                "alert('The decade of \"'+d+'\" is: '+date.get(d, 'de'));"+
                "alert('The century of \"'+d+'\" is: '+date.get(d, 'c'));"
            ]
        },
        getTimSpanStart:{
            $desc:"Gets the 'from' time of the given time span(e.g. 3 hours, 2 day, 1 week...)",
            $rtn:"Object, Date Object",
            $paras:[
                "date [必需参数] : Date Object, a date to caculate the time span",
                "datepart [必需参数] : String, the time span's datepart: 'ms','s','n','h','d','ww','m','q','y','de' or 'c'",
                "count [可选参数] : Number, how many [datepart]s in the time span. 默认为 1",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0"
            ],
            $snippet:[
                "var date=xui.Date,d=new Date,arr=[];"+
                "arr.push(xui.serialize(d));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'ms')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 's')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'n')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'h')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'd')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'ww')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'm')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'q')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'y')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'de')));"+
                "arr.push(xui.serialize(date.getTimSpanStart(d, 'c')));"+
                "alert(arr.join('\\n'))"
            ]
        },
        getTimSpanEnd:{
            $desc:"Gets the 'to' time of the given time span(e.g. 3 hours, 2 day, 1 week...)",
            $rtn:"Object, Date Object",
            $paras:[
                "date [必需参数] : Date Object, a date to caculate the time span",
                "datepart [必需参数] : String, time span's datepart: 'ms','s','n','h','d','ww','m','q','y','de' or 'c'",
                "count [可选参数] : Number, how many [datepart]s in the time span. 默认为 1",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0"
            ],
            $snippet:[
                "var date=xui.Date,d=new Date,arr=[];"+
                "arr.push(xui.serialize(d));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'ms')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 's')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'n')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'h')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'd')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'ww')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'm')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'q')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'y')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'de')));"+
                "arr.push(xui.serialize(date.getTimSpanEnd(d, 'c')));"+
                "alert(arr.join('\\n'))"
            ]
        },
        format:{
            $desc:"按照给定的格式格式化日期",
            $rtn:"String",
            $paras:[
                "date [必需参数] : Date Object, 时间戳",
                "format [必需参数] : String, 时间格式. 可用的时间元素有： (utciso|iso|yyyy|mm|ww|dd|hh|nn|ss|ms|de|c|y|q|m|w|d|h|n|s)",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0"
            ],
            $snippet:[
                "var arr=[],date=xui.Date,d=new Date;"+
                "arr.push(date.format(d,'utciso'));"+
                "arr.push(date.format(d,'iso'));"+
                "arr.push(date.format(d,'ms'));"+
                "arr.push(date.format(d,'s'));"+
                "arr.push(date.format(d,'ss'));"+
                "arr.push(date.format(d,'n'));"+
                "arr.push(date.format(d,'nn'));"+
                "arr.push(date.format(d,'h'));"+
                "arr.push(date.format(d,'hh'));"+
                "arr.push(date.format(d,'d'));"+
                "arr.push(date.format(d,'dd'));"+
                "arr.push(date.format(d,'w' ));"+
                "arr.push(date.format(d,'ww'));"+
                "arr.push(date.format(d,'m'));"+
                "arr.push(date.format(d,'mm'));"+
                "arr.push(date.format(d,'q' ));"+
                "arr.push(date.format(d,'qa' ));"+
                "arr.push(date.format(d,'y'));"+
                "arr.push(date.format(d,'yyyy'));"+
                "arr.push(date.format(d,'de'));"+
                "arr.push(date.format(d,'c'));"+
                "arr.push(date.format(d,'yyyy-mm-dd hh:nn:ss ms'));"+
                "alert(arr.join('\\n'))"
            ]
        },
        getText:{
            $desc:"将时间戳转化为一个可以显示的字符串",
            $rtn:"String",
            $paras:[
                "date [必需参数] : Date Object, 时间戳",
                "datepart [必需参数] : String, 显示的时间格式",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0"
            ],
            $snippet:[
                "var arr=[],date=xui.Date,d=new Date;"+
                "arr.push(date.getText(d,'utciso'));"+
                "arr.push(date.getText(d,'iso'));"+
                "arr.push(date.getText(d,'ms'));"+
                "arr.push(date.getText(d,'s'));"+
                "arr.push(date.getText(d,'n'));"+
                "arr.push(date.getText(d,'h'));"+
                "arr.push(date.getText(d,'d'));"+
                "arr.push(date.getText(d,'w' ));"+
                "arr.push(date.getText(d,'ww'));"+
                "arr.push(date.getText(d,'m'));"+
                "arr.push(date.getText(d,'q' ));"+
                "arr.push(date.getText(d,'y'));"+
                "arr.push(date.getText(d,'de'));"+
                "arr.push(date.getText(d,'c'));"+
                "arr.push(date.getText(d,'hn'));"+
                "arr.push(date.getText(d,'dhn'));"+
                "arr.push(date.getText(d,'mdhn'));"+
                "arr.push(date.getText(d,'hns'));"+
                "arr.push(date.getText(d,'hnsms'));"+
                "arr.push(date.getText(d,'yq'));"+
                "arr.push(date.getText(d,'ym'));"+
                "arr.push(date.getText(d,'md'));"+
                "arr.push(date.getText(d,'ymd'));"+
                "arr.push(date.getText(d,'ymdh'));"+
                "arr.push(date.getText(d,'ymdhn'));"+
                "arr.push(date.getText(d,'ymdhns'));"+
                "arr.push(date.getText(d,'all'));"+
                "alert(arr.join('\\n'))"
            ]
        },
        getWeek:{
            $desc:"获取时间戳是一年的第几周",
            $rtn:"Number",
            $paras:[
                "date [必需参数] : Date Object, 时间戳",
                "firstDayOfWeek [可选参数] : 每周的第一天的编号. 默认为 0"
            ],
            $snippet:[
                "alert(xui.Date.getWeek(new Date))"
            ]
        },
        parse:{
            $desc:"解析一个字符串,并转化为相应的[Date]对象",
            $rtn:"Object, Date Object",
            $paras:[
                "str [必需参数] : String, 表示时间的字符串",
                "foramt [可选参数] : String, 可选的日期时间格式(例如,yyyy-mm-dd 或 dd/mm/yyyy hh:nn:ss ms)"
            ],
            $snippet:[
                "alert(xui.Date.parse('1/1/1998'))",
                "alert(xui.Date.parse('Fri Sep 05 2008 11:46:11 GMT+0800'))",
                "alert(xui.Date.parse('2008-09-05T03:46:34.343Z'))",
                "alert(xui.Date.parse('2008-09-05T03:46:34.343+80:00'))"
            ]
        },
        offsetTimeZone:{
            $desc:"计算时间戳在在指定的time zone上的时间",
            $rtn:"Object, Date Object",
            $paras:[
                "date [必需参数] : Date Object, 时间戳",
                "timeZone [必需参数] : integer Number, time zone的编号",
                "back [可选参数] : Boolean, 指示是否使用相反的偏移量. 默认为 [false]"
            ],
            $snippet:[
                "var localDate = new Date, timezone9Date=xui.Date.offsetTimeZone(localDate, 9);"+
                "alert(localDate.toString() == xui.Date.offsetTimeZone(timezone9Date, 9, true))"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","absObj"], {
        getAll:{
            $desc:"获取该类的所有对象实例",
            $rtn:"xui.absObj, 当前类对象",
            $snippet:[
                "alert(xui.UI.getAll().get().length)"
            ]
        },
        pickAlias:{
            $desc:"为类选择一个可用的对象的别名",
            $rtn:'String',
            $snippet:[
                "alert(xui.UI.Button.pickAlias())"
            ]
        },
        setDataModel:{
            $desc:"设置类的一系列数据模型",
            $rtn:"xui.absObject",
            $paras:[
                "hash [必需参数] : 键值对"
            ],
            $snippet:[
                "var o=(new xui.UI.Button).render(); \n//no 'test' data[getTest function, setTest functon] yet\n alert(o.getTest); \n//Add 'test' data model to the Class\n xui.UI.Button.setDataModel({test:'default value'}); \n//Creates a new instance\n o=(new xui.UI.Button).render(); \n//call getTest here\n alert(o.getTest()); \n//Removes that 'test' data model from the Class\n xui.UI.Button.setDataModel({test:null})"
            ]
        },
        setEventHandlers:{
            $desc:"设置类的一系列事件",
            $rtn:"xui.absObject",
            $paras:[
                "hash [必需参数] : 键值对"
            ],
            $snippet:[
                "var o=new xui.UI.Button; \n//No 'onA' event handler yet\n alert(o.onA); \n//Sets 'onA' event handler to Class \n xui.UI.Button.setEventHandlers({onA:function(){}}); \n//Adds an 'onA' event function to the instance\n o.onA(function(){alert('a')}); \n//Fires the 'onA' event function\n o.onA(); \n//Removes the 'onA' event handler from Class\n xui.UI.Button.setEventHandlers({onA:null});"
            ]
        },
        unserialize:{
            $desc:"将JSON字符串或数组反序列化为xui.absObj对象",
            $rtn:"xui.UI",
            $paras:[
                "target [必需参数] : String/Array",
                "keepSerialId [可选参数] : Boolean, 指示是否保留序列号. 默认为 [false]"
            ],
            $snippet:[
                "var s=xui.UIProfile.getFromDom('btnLang').boxing().serialize(false); alert(xui.serialize(s)); alert(xui.UI.unserialize(s))"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            host:{
                $desc:"@Deprecated.(请用 setHost/getHost)"
            },
            alias:{
                $desc:"@Deprecated.(请用 setAlias/getAlias)"
            },
            getHost:{
                $desc:"获取宿主对象",
                $rtn:'Object',
                $snippet:[
                    "var o=xui.UIProfile.getFromDom('btnLang'); alert(o.host===SPA);",
                    "var host={},o=new xui.UI.Button; o.setHost(host, 'aBtn'); alert(host.aBtn.KEY);"
                ]
            },
            setHost:{
                $desc:"设置借宿对象和别名",
                $rtn:'[self]',
                $paras:[
                    "host [可选参数 : Object, 宿主",
                    "alias [可选参数 : String, 别名字符串"
                ],
                $snippet:[
                    "var o=xui.UIProfile.getFromDom('btnLang'); alert(o.host===SPA);",
                    "var host={},o=new xui.UI.Button; o.setHost(host, 'aBtn'); alert(host.aBtn.KEY);"
                ]
            },
            getProperties:{
                $desc:"取得当前对象所有的属性或某个指定的属性",
                $rtn:"Object",
                $paras:[
                    "key [可选参数] : String或Boolean, 属性名称.如果为true,将返回包括隐藏属性的所有属性"
                ]
            },
            setProperties:{
                $desc:"设置一系列的属性或某个指定的属性到所有对象",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object/String, 属性键/值对或属性关键字",
                    "value [可选参数] : Object, 属性值"
                ]
            },
            getEvents:{
                $desc:"获取当前对象的所有事件或某个指定的事件",
                $rtn:"Object"
            },
            setEvents:{
                $desc:"设置一系列的事件或某个指定的事件到所有对象",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object, 事件键/值对或事件关键字",
                    "value [可选参数] : Object, 事件函数"
                ]
            },
            getAlias:{
                $desc:"获取别名",
                $rtn:'String',
                $snippet:[
                    "var o=xui.UIProfile.getFromDom('btnLang'); alert(o.alias); alert(o.host[o.alias].get(0)===o)",
                    "var host={},o=new xui.UI.Button; o.setHost(host, 'aBtn'); alert(host.aBtn.KEY); o.setAlias('bBtn'); alert(host.aBtn);  alert(host.bBtn.KEY); "
                ]
            },
            setAlias:{
                $desc:"设置别名",
                $rtn:'[self]',
                $paras:[
                    "str [可选参数] : String, 别名字符串"
                ],
                $snippet:[
                    "var o=xui.UIProfile.getFromDom('btnLang'); alert(o.alias); alert(o.host[o.alias].get(0)===o)",
                    "var host={},o=new xui.UI.Button; o.setHost(host, 'aBtn'); alert(host.aBtn.KEY); o.setAlias('bBtn'); alert(host.aBtn);  alert(host.bBtn.KEY); "
                ]
            },
            getDesc:{
                $desc:"获取控件的描述值",
                $rtn:"String"
            },
            setDesc:{
                $desc:"设置控件的描述值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getName:{
                $desc:"获取输入性控件的名字",
                $rtn:"String"
            },
            setName:{
                $desc:"设置输入性控件的名字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getTag:{
                $desc:"获取控件的附加值",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ui40'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTag('tag'); alert(btn.getTag())},1000)"+
                    "}"
                ]
            },
            setTag:{
                $desc:"设置控件的附加值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui41'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTag('tag'); alert(btn.getTag())},1000)"+
                    "}"
                ]
            },
            getPropBinder:{
                $desc:"获取控件的附属性绑定配置",
                $rtn:"Object"
            },
            setPropBinder:{
                $desc:"设置控件的附属性绑定配置",
                 $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            reBindProp:{
                $desc:"重新绑定属性",
                 $rtn:"[self]",
                $paras:[
                    "dataMap [必需参数] : Object. 重新绑定的对象"
                ]
            },
            getTagVar:{
                $desc:"获取控件的附加对象",
                $rtn:"Object",
                $snippet:[
                    "var id='xui.temp.ui42'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTagVar([1,2]); alert(btn.getTagVar())},1000)"+
                    "}"
                ]
            },
            setTagVar:{
                $desc:"设置控件的附加对象",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui43'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTagVar([1,2]); alert(btn.getTagVar())},1000)"+
                    "}"
                ]
            },
            getDataBinder:{
                $desc:"获取绑定的数据绑定器名称",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.absv1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input);"+
                    "xui.asyRun(function(){o.setDataBinder('db1'); alert(o.getDataBinder())},1000)"+
                    "}"
                ]
            },
            setDataBinder:{
                $desc:"设置数据绑定器名称",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.absv2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input);"+
                    "xui.asyRun(function(){o.setDataBinder('db1'); alert(o.getDataBinder())},1000)"+
                    "}"
                ]
            },
            getDataField:{
                $desc:"获取数据字段名称",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.absv3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input);"+
                    "xui.asyRun(function(){o.setDataField('field1'); alert(o.getDataField())},1000)"+
                    "}"
                ]
            },
            setDataField:{
                $desc:"设置数据字段名称",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.absv4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input);"+
                    "xui.asyRun(function(){o.setDataField('field1'); alert(o.getDataField())},1000)"+
                    "}"
                ]
            },
            serialize:{
                $desc:"将当前对象序列化为JSON字符串",
                $rtn:"String",
                $paras:[
                    "rtnString [可选参数] : Boolean, to indicate whether or not it returns String or Object. 默认为 true",
                    "keepHost [可选参数] : Boolean, to keep host Object link or not. 默认为 false"
                ],
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').boxing().serialize());" +
                    "alert(xui.UIProfile.getFromDom('btnLang').boxing().serialize(false))"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","absProfile"], {
        prototype:{
            getId:{
                $desc:"获取唯一的标志符",
                $rtn:"String",
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').getId())"
                ]
            },
            link:{
                $desc:"将 [target] 参数链接到一个对象或数组,并指定链接的识别字符串[id]. 可以调用'unLink'去除链接",
                $rtn:"[self]",
                $paras:[
                    "obj [必需参数] : Object or Array",
                    "id [必需参数] : String, link id",
                    "target [可选参数] : Object, 默认为 [self]"
                ],
                $snippet:[
                    "var profile=new xui.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
                ],
                $memo:"一般情况下,程序员无需直接调用该函数"

            },
            unLink:{
                $desc:"移除指定的识别字符串[id]的到对象或数组的链接",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 在link函数中指定的链接的识别字符串[id]"
                ],
                $snippet:[
                    "var profile=new xui.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
                ],
                $memo:"一般情况下,程序员无需直接调用该函数"
            },
            unLinkAll:{
                $desc:"移除所有链接",
                $rtn:"[self]",
                $snippet:[
                    "var profile=new xui.Profile(), a1=[],a2=[],a3=[]; profile.link(a1,'a').link(a2,'b').link(a3,'c'); alert(a1+':'+a2+':'+a3); profile.unLink('a'); alert(a1+':'+a2+':'+a3); profile.unLinkAll(); alert(a1+':'+a2+':'+a3); "
                ],
                $memo:"一般情况下,程序员无需直接调用该函数"
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Profile"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Profile 类",
        constructor:{
            $desc:"生成一个概要对象",
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            serialize:{
                $desc:"将一个控件概要对象(profile)序列化为一个JSON字符串或一个JSON对象",
                $rtn:"String",
                $paras:[
                    "rtnString [可选参数] : Boolean, 指示返回一个JSON字符串还是一个JSON对象. 默认为字符串",
                    "keepHost [可选参数] : Boolean, 指示是否保持和宿主的联系. 默认为 false"
                ],
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').serialize());" +
                    "alert(xui.UIProfile.getFromDom('btnLang').serialize(false))"
                ]
            },
            getProperties:{
                $desc:"取得所有的属性或某个指定的属性",
                $rtn:"Object",
                $paras:[
                    "key [可选参数] : String, 属性名称"
                ]
            },
            setProperties:{
                $desc:"设置一系列的属性或某个指定的属性",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object/String, 属性键/值对或属性关键字",
                    "value [可选参数] : Object, 属性值"
                ]
            },
            getEvents:{
                $desc:"获取该对象的所有事件或某个指定的事件",
                $rtn:"Object"
            },
            setEvents:{
                $desc:"设置一系列的事件或某个指定的事件",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object, 事件键/值对或事件关键字",
                    "value [可选参数] : Object, 事件函数"
                ]
            },
            boxing:{
                $desc:"将当前的控件概要对象(profile)打包为一个xui.absBox对象,并返回打包后的对象",
                $rtn:'xui.absBox',
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').boxing().KEY)"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UIProfile"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UIProfile 类",
        constructor:{
            $desc:"生成一个控件概要对象(profile)",
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        getFromDom:{
            $desc:"从一个指定的DOM元素的id上获取一个控件概要对象(profile)",
            $rtn:"xui.UIProfile",
            $paras:[
                "id [必需参数] : String, DOM元素或id"
            ],
            $snippet:[
                "alert(xui.UIProfile.getFromDom('btnLang').serialize());",
                "alert(xui.UIProfile.getFromDom('xui.UI.TreeBar-CMD:a:l').serialize());"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            renderId:{
                $desc:"String, 指示一个控件概要对象(profile)是否被渲染(生成了对应的Dom节点)"
            },
            getContainer:{
                $desc:"获得容器(xui.Dom)对象,如果没有容器返回根节点",
                $rtn:"xui.Dom",
                $paras:[
                    "subId [可选参数] : 容器的sub id"
                ]
            },
            getRoot:{
                $desc:"获取控件概要对象(profile)的根节点",
                $rtn:"xui.Dom",
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').getRoot());"
                ]
            },
            getRootNode:{
                $desc:"获取控件概要对象(profile)的根节点Element",
                $rtn:"Element",
                $snippet:[
                "alert(xui.UIProfile.getFromDom('btnLang').getRootNode());"
                ]
            },
            serialize:{
                $desc:"将一个控件概要对象(profile)序列化为一个JSON字符串或一个JSON对象",
                $rtn:"String",
                $paras:[
                    "rtnString [可选参数] : Boolean, 指示返回一个JSON字符串还是一个JSON对象. 默认为字符串",
                    "keepHost [可选参数] : Boolean, 指示是否保持和宿主的联系. 默认为 false"
                ],
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').serialize());" +
                    "alert(xui.UIProfile.getFromDom('btnLang').serialize(false))"
                ]
            },
            toHtml:{
                $desc:"将当前的控件概要对象(profile)构造为一个html字符串, 并返回",
                $rtn:"String",
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').toHtml())"
                ]
            },
            getClass:{
                $desc:"获取控件概要对象(profile)特定节点的CSS类名",
                $rtn:"String",
                $paras:[
                    "key [必需参数] : String, 控件节点的键值",
                    "tag [可选参数] : String, 附加字符串"
                ],
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').getClass('CAPTION','-hover'))"
                ]
            },
            getDomId:{
                $desc:"获取控件概要对象(profile)根节点的DOM id",
                $rtn:"String",
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').getDomId())"
                ]
            },
            setDomId:{
                $desc:"设置控件概要对象(profile)根节点的dom id",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, id 字符串"
                ],
                $snippet:[
                    "var profile=xui.UIProfile.getFromDom('btnLang'); alert(profile.getDomId()); profile.setDomId('logo1'); alert(profile.getDomId());profile.setDomId('btnLang'); alert(profile.getDomId());"
                ]
            },
            queryItems:{
                 $desc:"从一个对象数组中查询对应的子项对象",
                 $rtn:"Array",
                 $paras:[
                    "items [必需参数] : 对象数组",
                    "fun [必需参数] : Function, 查询过滤函数",
                    "deep [可选参数] : Boolean, 指示是否查询子项. 默认为 [false]",
                    "single [可选参数] : Boolean, 指示是否返回一个值. 默认为 [false]",
                    "flag [可选参数] : Boolean, 指示是否返回包括链接信息的复杂值. 默认为 [false]"
                ],
                $snippet:[
                    "var profile=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:'), items=[{id:'a'},{id:'.b',sub:[{id:'aa'},{id:'.bb'}]}], filter=function(o,i){return o.id.indexOf(\".\")!=-1},results= profile.queryItems(items,filter);alert(results.length);results= profile.queryItems(items,filter,true);alert(results.length);results= profile.queryItems(items,filter,true,true);alert(results.length);results= profile.queryItems(items,filter,false,true);alert(results.length);",
                    "var profile=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:'), items=profile.properties.items, filter=function(o,i){return o.id.indexOf(\".\")!=-1},results= profile.queryItems(items,filter);alert(results.length);results= profile.queryItems(items,filter,true);alert(results.length);results= profile.queryItems(items,filter,true,true);alert(results.length);results= profile.queryItems(items,filter,false,true);alert(results.length);"

                ]
            },
            getItemByDom:{
                $desc:"从指定的DOM节点(或DOM id)中获取子项对象",
                $rtn:"Object, 键值对",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:');alert(xui.serialize( pro.getItemByDom('xui.UI.TreeBar-ITEM:a:a') ))"
                ],
                $memo:"该函数只对[xui.absList]及其派生类有效. 一般情况下, 我们在事件回调函数使用该函数"
            },
            getItemIdByDom:{
                $desc:"从指定的DOM节点(或DOM的id)中获取一个项的id",
                $rtn:"String",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:');alert(xui.serialize( pro.getItemIdByDom('xui.UI.TreeBar-ITEM:a:a') ))"
                ],
                $memo:"该函数只对[xui.absList]及其派生类有效. 一般情况下, 我们在事件回调函数使用该函数"
            },
            getItemByItemId:{
                $desc:"根据一个subId来获取对应的子项对象",
                $rtn:"Object, 键值对",
                $paras:[
                    "itemId [必需参数] :String, item id"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:');alert(xui.serialize( pro.getItemByItemId('Class') ))"
                ],
                $memo:"该函数只对[xui.absList]及其派生类有效"
            },
            getSubIdByItemId:{
                $desc:"根据一个项id来获取对应的subId",
                $rtn:"String",
                $paras:[
                    "itemId [必需参数] :String, 项id"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:');alert(pro.getSubIdByItemId('Class') )"
                ],
                $memo:"该函数只对[xui.absList]及其派生类有效"
            },
            getSubNode:{
                $desc:"按照给定的[key]和subId来获取控件中特定的DOM节点",
                $rtn:"xui.Dom",
                $paras:[
                    "key [必需参数] : String, 键字符串",
                    "subId [可选参数] : String/Boolean. 如果是 [true] 代表得到给定键的所有DOM节点；如果是字符串代表只得到 subId 为给定的值的DOM节点"
                ],
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').getSubNode('KEY').id());"+
                    "alert(xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').getSubNode('ITEM','a').id());"+
                    "alert(xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').getSubNode('ITEM',true).get().length);"
                ],
                $memo:"参数[subId]只对[xui.absList]及其派生类有效"
            },
            getSubNodes:{
                $desc:"按照给定的一组[key]和subId来获取控件中特定一组DOM节点",
                $rtn:"xui.Dom",
                $paras:[
                    "arr [必需参数] : String/Array, 一组key",
                    "subId [可选参数] : String/Array/Boolean. 如果是 [true] 代表得到给定键的所有节点；如果是字符串或字符串数组代表只得到 subId 为给定的值的DOM节点. 默认为[true]"
                ],
                $snippet:[
                    "var profile=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:'); alert(profile.getSubNodes(['KEY','BORDER']).get().length);"+
                    "alert(profile.getSubNodes(['ITEM','BAR'],'a').get().length);"+
                    "alert(profile.getSubNodes(['ITEM','BAR'],true).get().length);"
                ],
                $memo:"参数[subId]只对[xui.absList]及其派生类有效"
            },
            getSubNodeByItemId:{
                $desc:"按照给定的[key]和[itemId]来获取控件中特定DOM节点",
                $rtn:"xui.Dom",
                $paras:[
                    "key [必需参数] : String, key 字符串",
                    "itemId [可选参数] : String, item id 字符串"
                ],
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').getSubNodeByItemId('ITEM','Class').id())"
                ],
                $memo:"从 [xui.absList] 派生出来的类才有这个函数"
            },
            getKey:{
                $desc:"从一个给定的DOM id中得到节点的键值",
                $rtn:"String",
                $paras:[
                    "id [必需参数] :String, DOM id"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:');alert(pro.getKey('xui.UI.TreeBar:a:') )"
                ]
            },
            getSubId:{
                $desc:"从一个给定的DOM id中得到subId值",
                $rtn:"String",
                $paras:[
                    "id [必需参数] :String, item id"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:');alert(pro.getSubId('xui.UI.TreeBar:a:ab') )"
                ]
            },
            clearCache:{
                $desc:"清除这个控件概要对象(profile)中的缓存数据",
                $rtn:"[self]",
                $memo:"一般情况下,程序员无需直接调用该函数"
            },
            pickSubId:{
                $desc:"根据给定的节点键值得到一个sub id",
                $rtn:"String",
                $paras:[
                    "key [必需参数] : String, key 字符串"
                ],
                $snippet:[
                    "var profile=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:'), id1=profile.pickSubId('items'), id2=profile.pickSubId('items');profile.reclaimSubId(id1,'items');var id3=profile.pickSubId('items');alert(id1+':'+id2+':'+id3);"
                ],
                $memo:"一般情况下,程序员不需要手动调用该函数"
            },
            reclaimSubId:{
                $desc:"回收一个节点键值的sub id",
                $paras:[
                    "id [必需参数] : String, id 字符串",
                    "key [必需参数] : String, key 字符串"
                ],
                $snippet:[
                    "var profile=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:'), id1=profile.pickSubId('items'), id2=profile.pickSubId('items');profile.reclaimSubId(id1,'items');var id3=profile.pickSubId('items');alert(id1+':'+id2+':'+id3);"
                ],
                $memo:"一般情况下,程序员不需要手动调用该函数"
            },
            linkParent:{
                $desc:"链接一个控件概要对象(profile)到父控件概要对象(profile)",
                $rtn:"[self]",
                $paras:[
                    "parentProfile [必需参数] : UIProfile, 父UIProfile",
                    "linkId [可选参数] : String, 链接id"
                ],
                $memo:"一般情况下,程序员不需要手动调用该函数"
            },
            unlinkParent:{
                $desc:"从父控件概要对象(profile)上断开链接",
                $rtn:"[self]",
                $memo:"一般情况下,程序员不需要手动调用该函数"
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Template"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Template 类",
        getFromDom:{
            $desc:"从一个DOM元素中获取一个模板(template)对象",
            $rtn:"xui.Template",
            $paras:[
                "id [必需参数] : String, DOM元素或id"
            ],
            $snippet:[
                "var id='xui.temp.2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('abc'); xui(id).append(t); alert(xui.Template.getFromDom('abc').serialize());"+
                "}"
            ]
        },
        constructor:{
            $desc:"HTML模板",
            $paras:[
                "template [可选参数] : String, HTML模板",
                "properties [可选参数] : 键值对, 模板的填充参数",
                "events [可选参数] : 键值对, 一系列的事件",
                "domId [可选参数] : String, 模板根节点的DOM id"
            ],
            $snippet:[
                "var id='xui.temp.t1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "\n//新建一个模板,并直接加到DOM中.\n"+
            "var t=new xui.Template({'':'<div [event]>{pre} {items} {next}</div>',items:'<p [event]>{id} : {caption}</p>'},{pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]},{onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}, 't_t');"+
                "xui(id).append(t);"+
                "}"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            renderId:{
                $desc:"String, 指示模板是否被渲染(生成了DOM)"
            },
            show:{
                $desc:"显示模板对象",
                $rtn:"[self]",
                $paras:[
                    "parent [可选参数]: String/Element/xui.Dom 父DOM节点"
                ]
            },
            refresh:{
                $desc:"刷新模板",
                $rtn:"[self]",
                $snippet:[
                "var id='xui.temp.0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_2'); xui(id).append(t); "+
                    "xui.asyRun(function(){t.setProperties({id:'2',caption:'cap2'});t.refresh();},1000);"+
                "}"
                ]
            },
            getRoot:{
                $desc:"获取模板生成实例的DOM的根节点(只对已生成的模板有效)",
                $rtn:"Element",
                $snippet:[
                "var id='xui.temp.01'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_2'); xui(id).append(t); alert(t.getRoot());"+
                "}"
                ]
            },
            getRootNode:{
                $desc:"获取模板生成实例的的根节点DOM Element(只对已生成的模板有效)",
                $rtn:"Element",
                $snippet:[
                "var id='xui.temp.2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_2'); xui(id).append(t); alert(t.getRootNode());"+
                "}"
                ]
            },
            getItem:{
                $desc:"从一个DOM元素上获取项的数据",
                $rtn:"Object",
                $paras:[
                    "src [必需参数] : Dom 元素"
                ],
                $snippet:[
                "var id='xui.temp.0.1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var t=new xui.Template({'':'<div>{items}</div>','items':'<span [event]>{con}</span>'},{items:[{id:'a',con:'a'},{id:'b',con:'b'}]},{items:{onClick:function(p,e,src){alert(xui.serialize(p.getItem(src)))}}}); t.setDomId('t_3'); xui(id).append(t);"+
                "}"
                ]
            },
            toHtml:{
                $desc:"将参数填入模板,返回并构造后的HTML串",
                $rtn:"String",
                $paras:[
                    "properties [可选参数] : 构造参数"
                ],
                $snippet:[
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); alert(t.toHtml())"
                ]
            },
            serialize:{
                $desc:"将当前的模板序列化为字符串",
                $rtn:"String",
                $snippet:[
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); alert(t.serialize())"
                ]
            },
            destroy:{
                $desc:"销毁当前模板"
            },
            getDomId:{
                $desc:"从当前模板中获取DOM id",
                $rtn:"String",
                $snippet:[
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_1'); alert(t.getDomId())"
                ]
            },
            render:{
                $desc:"将模板渲染成一个DOM元素",
                $rtn:"[self]",
                $snippet:[
                "var id='xui.temp.3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_3'); xui(id).append(t.render());"+
                "}"
                ]
            },
            renderOnto:{
                $desc:"将模板渲染成一个DOM元素, 并提换一个现有的DOM元素",
                $paras:[
                    "node [必需参数] : DOM element, 要被替换的DOM元素"
                ],
                $snippet:[
                "var id='xui.temp.4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><div id=\"renderOnto\"></div><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_4'); t.renderOnto('renderOnto');"+
                "}"
                ]
            },
            setDomId:{
                $desc:"设置当前模板的DOM id",
                $rtn:'[self]',
                $paras:[
                    "id [必需参数] : String, DOM id"
                ],
                $snippet:[
                "var id='xui.temp.5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var t=new xui.Template({'':'<div>{caption}</div>'},{id:'1',caption:'cap'}); t.setDomId('t_5'); xui(id).append(t);"+
                "}"
                ]
            },
            setEvents:{
                $desc:"设置当前模板的事件",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : 模板空位名",
                    "value [可选参数] : Function, 事件函数"
                ],
                $snippet:[
                "var id='xui.temp.tt1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "\n// \n"+
        "var t=new xui.Template(); t.setTemplate({'':'<div [event]>{pre} {items} {next}</div>',items:'<p [event]>{id} : {caption}</p>'}).setProperties({pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]}).setEvents('onClick',function(p){alert(p.domId)}).setEvents('items',{onClick:function(p,e,s){alert(p.domId);}}); xui(id).append(t);"+
                "}"
                ]
            },
            setProperties:{
                $desc:"设置当前模板的参数",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : 模板空位名",
                    "value [可选参数] : Object. 模板空位的值"
                ],
                $snippet:[
                "var id='xui.temp.tt2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "\n// \n"+
        "var t=new xui.Template(); t.setTemplate({'':'<div [event]>{pre} {items} {next}</div>',items:'<p [event]>{id} : {caption}</p>'}).setProperties({pre:'{{{',next:'}}}'}).setProperties('items',[{id:1,caption:'a1'},{id:2,caption:'a2'}]).setEvents({onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}); xui(id).append(t);"+
                "}"
                ]
            },
            setTemplate:{
                $desc:"设置模板的HTML串",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : 模板键",
                    "value [可选参数] : String, 模板键值"
                ],
                $snippet:[
                "var id='xui.temp.tt3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
            "\n// \n"+
        "var t=new xui.Template(); t.setTemplate('<div [event]>{pre} {items} {next}</div>').setTemplate('items','<p [event]>{id} : {caption}</p>').setProperties({pre:'{{{',next:'}}}',items:[{id:1,caption:'a1'},{id:2,caption:'a2'}]}).setEvents({onClick:function(p){alert(p.domId)},items:{onClick:function(p,e,s){alert(p.domId);}}}); xui(id).append(t);"+
                "}"
                ]
            }
        }
    });


    xui.set(xui.Locale,["cn","doc","xui","Module"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Module 类",
        constructor:{
            $desc:"xui.Module的构造函数",
            $paras:[
                "properties [可选参数] : Object, key/value(any) pairs. the Module properties Object. 默认为 {}",
                "events [可选参数] : Object, key/value(Function) pairs. the Module event Object. 默认为 {}",
                "host [可选参数] : Object, the Module's host Object. 默认为 itself"
            ],
            $snippet:[
                "var order=[], module = new xui.Module({"+
                "    $1:1"+
                "  },"+
                "  {"+
                "    beforeCreated:function(){order.push('beforeCreated'); xui.log('beforeCreated');},"+
                "    onCreated:function(){order.push('onCreated'); xui.log('onCreated');},"+
                "    onLoadBaseClass:function(c,t,key){order.push('onLoadBaseClass: '+key); xui.log('onLoadBaseClass: '+key); },"+
                "    onIniResource:function(){order.push('onIniResource'); xui.log('onIniResource');},"+
                "    beforeIniComponents:function(){order.push('beforeIniComponents'); xui.log('beforeIniComponents');},"+
                "    afterIniComponents:function(){order.push('afterIniComponents'); xui.log('afterIniComponents');},"+
                "    onLoadRequiredClass:function(c,t,key){order.push('onLoadRequiredClass: '+key); xui.log('onLoadRequiredClass: '+key);},"+
                "    onReady:function(){order.push('onReady'); xui.log('onReady');},"+
                "    onRender:function(module){order.push('onRender'); xui.log('onRender'); module.dialog1.setHtml(order.join('<br />'));}"+
                "  });"+
                "module.Dependencies=['xui.UI','xui.Date'];"+
                "module.Required=['xui.UI.Dialog','xui.UI.Button'];"+
                "module.iniComponents=function(){order.push('iniComponents'); return (new xui.UI.Dialog()).setHost(this, 'dialog2').setWidth(150).setHeight(150).get() };"+
                "module.iniResource=function(){order.push('iniResource'); };"+
                "module.iniExModules=function(){order.push('iniExModules'); };"+

                "var abox=module.getComponents();"+
                "abox.merge((new xui.UI.Dialog()).setHost(module, 'dialog1'));"+
                "module.setComponents(abox);"+

                "module.show(function(module){"+
                "   order.push('onEnd'); "+
                "});",

                "xui.Class('App1','xui.Module',{" +
                "    Instance:{" +
                "        Dependencies : ['xui.UI', 'xui.Date']," +
                "        Required : ['xui.UI.Dialog', 'xui.UI.Button']," +
                "        events:{" +
                "            beforeCreated : function(module){" +
                "                module._info=[];" +
                "                module._info.push('beforeCreated');" +
                "                xui.log('beforeCreated');" +
                "            }," +
                "            onCreated : function(module){" +
                "                module._info.push('onCreated');" +
                "                xui.log('onCreated');" +
                "            }," +
                "            onLoadBaseClass : function(module, t, key){" +
                "                module._info.push('onLoadBaseClass: ' + key);" +
                "                xui.log('onLoadBaseClass: ' + key);" +
                "            }," +
                "            onIniResource : function(module){" +
                "                module._info.push('onIniResource');" +
                "                xui.log('onIniResource');" +
                "            }," +
                "            beforeIniComponents : function(module){" +
                "                module._info.push('beforeIniComponents');" +
                "                xui.log('beforeIniComponents');" +
                "            }," +
                "            afterIniComponents : function(module){" +
                "                module._info.push('afterIniComponents');" +
                "                xui.log('afterIniComponents');" +
                "            }," +
                "            onLoadRequiredClass : function(module, t, key){" +
                "                module._info.push('onLoadRequiredClass: ' + key);" +
                "                xui.log('onLoadRequiredClass: ' + key);" +
                "            }," +
                "            onReady : function(module){" +
                "                module._info.push('onReady');" +
                "                xui.log('onReady');" +
                "            }," +
                "            onRender : function(module){" +
                "                module._info.push('onRender');" +
                "                xui.log('onRender');" +
                "                module.dialog1.setHtml(module._info.join('<br />'));" +
                "            }" +
                "        }," +
                "        customAppend:function(parent){" +
                "            this.dialog1.show(parent);" +
                "        }," +
                "        iniComponents : function(){" +
                "            this._info.push('iniComponents');\n" +
                "            // [[Code created by CrossUI RAD Tools\n" +
                "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                "            append((new xui.UI.Dialog)" +
                "                .setHost(host,'dialog1')" +
                "                .setWidth(450)" +
                "                .setHeight(450)" +
                "            );" +
                "            return children;\n" +
                "            // ]]Code created by CrossUI RAD Tools\n" +
                "        }," +
                "        iniResource : function(){" +
                "            this._info.push('iniResource');" +
                "        }," +
                "        iniExModules : function(){" +
                "            this._info.push('iniExModules');" +
                "        }" +
                "    }" +
                "});" +
                "var module = new App1;" +
                "module.show();",

                "xui.Class('App2','xui.Module',{" +
                "    Instance:{" +
                "        Dependencies : ['xui.UI']," +
                "        Required : ['xui.UI.Dialog']," +
                "        events:{" +
                "            beforeCreated : '_trace'," +
                "            onCreated : '_trace'," +
                "            onLoadBaseClass : '_trace'," +
                "            onIniResource : '_trace'," +
                "            beforeIniComponents : '_trace'," +
                "            afterIniComponents : '_trace'," +
                "            onLoadRequiredClass : '_trace'," +
                "            onReady : '_trace'," +
                "            onRender : '_trace'," +
                "        }," +
                "        customAppend:function(parent){" +
                "            this.dialog1.show(parent);" +
                "        }," +
                "        iniComponents : function(){" +
                "            this._info.push('iniComponents');\n" +
                "            // [[Code created by CrossUI RAD Tools\n" +
                "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                "            append((new xui.UI.Dialog)" +
                "                .setHost(host,'dialog1')" +
                "                .setWidth(350)" +
                "                .setHeight(450)" +
                "            );" +
                "            return children;\n" +
                "            // ]]Code created by CrossUI RAD Tools\n" +
                "        }," +
                "        iniResource : function(){" +
                "            this._info.push('iniResource');" +
                "        }," +
                "        iniExModules : function(){" +
                "            this._info.push('iniExModules');" +
                "        }, " +
                "        _trace : function(module, threadid){" +
                "            module._info.push(module.$lastEvent);" +
                "        }" +
                "    }" +
                "});" +
                "var module = new App2;" +
                "module._info=[];"+
                "module.show(function(module){module.dialog1.setHtml(module._info.join('<br />'));});"
            ]
        },
        'load':{
            $desc:"从远程文件加载一个 xui.Module 的代码,然后新建它的 xui.Module 的实例,最后返回这个实例",
            $paras:[
                "cls [必需参数] : String, 类名字",
                "onEnd [可选参数]: Function(err:Error/String, module: xui.Module). 类加载完之后调用",
                "lang [可选参数] : String, 语言名称.(例如, 'en')",
                "theme [可选参数] : String, 主题名称.(例如, 'vista')",
                "showUI [可选参数] : Boolean, 是否显示界面. 默认为 true;"
            ],
            $snippet:[
                "////Uses the beblow line to load a specified application, and append its UI to 'document.body' if its UI exits. \n"+
                "//xui.Module.load('RootClassName',function(){alert('ok')},'en')\n",
                "xui.Module.load('App.Test1',function(){alert('ok')});",
                "xui.Module.load('App.Test1',function(module){module.show(function(){alert('ok')},SPA.mainLayout,'main')},null,false)"
            ]
        },
        getFromDom:{
            $desc:"从一个指定的DOM元素获取 xui.Module 实例",
            $paras:[
                "id [必需参数] : String, DOM元素或xid"
            ]
        },
        getClsFromDom:{
            $desc:"从一个指定的DOM元素获取 xui.Module 类名",
            $paras:[
                "id [必需参数] : String, DOM元素或xid"
            ]
        },
        getAllInstance:{
            $desc:"得到所有实例"
        },
        destroyAll:{
            $desc:"销毁所有实例"
        },
        postMessage:{
            $desc:"向模块发送消息",
            $paras:[
                "cls [必需参数] : String, 模块的类名",
                "message [必需参数] : Object, 消息",
                "sender [可选参数] : Object, 发送消息方"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            postMessage:{
                $desc:"向模块发送消息",
                $paras:[
                    "message [必需参数] : Object, 消息",
                    "sender [可选参数] : Object, 发送消息方"
                ]
            },
            autoDestroy:{
                $desc:"本Module是否随着第一个内UI控件的销毁而销毁"
            },
            isDestroyed:{
                $desc:"判断当前对象是否已被销毁"
            },
            fireEvent:{
                $desc:"触发自定义的事件",
                $rtn:"Object",
                $paras:[
                    "event [必需参数] : String, 自定义事件的名字",
                    "args [可选参数]: Array, 事件的参数",
                    "host [可选参数]: Object, 事件函数的作用域对象"
                ],
                $snippet:[
                 "xui.Class('Temp.Demo', 'xui.Module',{Instance:{trigger:function(){this.fireEvent('onCall',['a','b','c'])}}});"+
                 "xui.ModuleFactory.getModule('Temp.Demo',function(){this.setEvents('onCall',function(){alert(xui.toArr(arguments))});this.trigger();});"
                ]
            },
            render:{
                $desc:'渲染内部的 UI 组件',
                $rtn:"[self]",
                $demo:"You have to call this function after the module was created. And xui.Module.show will trigger this function automatically"
            },
            getAlias:{
                $desc:"得到别名",
                $rtn:'String'
            },
            setAlias:{
                $desc:"设置别名",
                $rtn:'[self]',
                $paras:[
                    "str [可选参数] : String, the alias value"
                ]
            },
            AddComponents:{
                $desc:"向当前 Module 中添加控件",
                $rtn:"[self]",
                $paras:[
                    "obj [必需参数] : xui.absObj Object"
                ]
            },
            setComponents:{
                $desc:"设置目前Module的内部组件",
                $rtn:"[self]",
                $paras:[
                    "obj [必需参数]  : xui.absObj Object"
                ],
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){module.setComponents((new xui.UI.Button()).setHost(window,'btn') ); alert(module.getComponents().get(0).alias); });},false);"
                ]
            },
            getComponents:{
                $desc:"得到所有的内部组件",
                $rtn:"xui.absObj",
                $snippet:[
                    "xui.Class('App1','xui.Module',{" +
                    "   Instance:{"+
                    "        iniComponents : function(){" +
                    "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                    "            append((new xui.DataBinder)" +
                    "                .setHost(host,'db1')" +
                    "                .setName('db1')" +
                    "            );" +
                    "            append((new xui.UI.Dialog)" +
                    "                .setHost(host,'dialog1')" +
                    "                .setWidth(350)" +
                    "                .setHeight(450)" +
                    "            );" +
                    "            return children;\n" +
                    "        }" +
                    "   }" +
                    "});"+
                    "var module=new App1;"+
                    "module.create(function(module){alert(module.getComponents().get(0).alias);});"
                ]
            },
            getDataBinders:{
                $desc:"获取指定xui.Module对象包含的所有DataBinder组件",
                $rtn:"Array"
            },
            getUIComponents:{
                $desc:"获取指定xui.Module对象包含的所有UI组件",
                $rtn:"xui.UI",
                $snippet:[
                    "xui.Class('App1','xui.Module',{" +
                    "   Instance:{"+
                    "        iniComponents : function(){" +
                    "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                    "            append((new xui.DataBinder)" +
                    "                .setHost(host,'db1')" +
                    "                .setName('db1')" +
                    "            );" +
                    "            append((new xui.UI.Dialog)" +
                    "                .setHost(host,'dialog1')" +
                    "                .setWidth(350)" +
                    "                .setHeight(450)" +
                    "            );" +
                    "            return children;\n" +
                    "        }" +
                    "   }" +
                    "});"+
                    "var module=new App1;"+
                    "module.create(function(module){alert(module.getUIComponents().get(0).alias);});"
                ]
            },
            getAllComponents:{
                $desc:"得到所有的内部组件",
                $rtn:"xui.absObj"
            },
            getProfile:{
                $desc:"获取所有内部控件的侧写",
                $rtn:"Object, 键值对"
            },
            setProfile:{
                $desc:"设置内部控件的侧写",
                $rtn:"[self]",
                 $paras:[
                    "profiles [必需参数] : Object, 键值对"
                ]
            },
            getData:{
                $desc:"获取所有内部控件的数据",
                $rtn:"Object, 键值对"
            },
            setData:{
                $desc:"设置数据到内部控件",
                $rtn:"[self]",
                 $paras:[
                    "data [必需参数] : Object, 键值对"
                ]
            },
            getValue:{
                $desc:"获取所有内部值控件的真实值",
                $rtn:"Object, 键值对"
            },
           setValue:{
                $desc:"设置值到内部的值控件",
                $rtn:"[self]",
                 $paras:[
                    "values [必需参数] : Object, 键值对"
                ]
            },
            getUIValue:{
                $desc:"获取Module对象上的所有界面值控件的界面值",
                $rtn:"Object, 键值对"
            },
            setUIValue:{
                $desc:"设置Module对象上的所有界面值控件的界面值",
                $rtn:"[self]",
                 $paras:[
                    "values [必需参数] : Object, 键值对"
                ]
            },
            reBindProp:{
                $desc:"给每个控件重新绑定属性",
                 $rtn:"[self]",
                $paras:[
                    "dataMap [必需参数] : Object. 重新绑定的对象"
                ]
            },
            getEvents:{
                $desc:"获取Module对象上的所有事件处理函数",
                $rtn:"Object, String or Function",
                $paras:[
                    "key [可选参数] : String"
                ],
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){alert(xui.serialize(module.getEvents()))});},false);",
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){alert(xui.serialize(module.getEvents('onReady')))});},false);"
                ]
            },
            setEvents:{
                $desc:"将一系列的事件处理函数(或一个带有key的事件处理函数)附加到Module对象",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Objecyt/String, 一系列的事件处理函数或key值",
                    "value [可选参数] : Function, event function"
                ],
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){module.setEvents('onA',function(){}); alert(module.getEvents('onA'))});},false);"
                ]
            },
            create:{
                $desc:"使用异步方式生成Module对象",
                $paras:[
                    "onEnd [Optiona] : Function. 回调函数,在Module对象成功生成后执行",
                    "threadid [可选参数] : String, 内部线程id.  如本参数为 false, 表示生成Module的过程不会异步调用函数（不用xui.Thread）"
                ],
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){alert('created!')});},false);"
                ]
            },
            customAppend:{
                $desc:"把UI控件加到DOM.如果函数内没有做任何appen的工作,并返回false,show函数会把所有的UI控件都将加入到DOM",
                $paras:[
                    "parent [必需参数] : xui.UI, xui.UI 或 xui.Dom对象",
                    "subId [可选参数] : String, the sub id that Determines the set of UIProfiles will be added to",
                    "left [可选参数] : Number, 显示的左边坐标",
                    "top [可选参数] : Number, 显示的上边坐标",
                    "threadid [可选参数] : String, 线程Id"
                ]
            },
            iniExModules:{
                $desc:"加载其他Module可以用本函数",
                $paras:[
                    "module [必需参数] : xui.Module, 当前Module对象",
                    "threadid [可选参数] : String, 线程Id"
                ]
            },
            iniResource:{
                $desc:"加载外部的资源（通过Ajax取得数据）可以用本函数",
                $paras:[
                    "module [必需参数] : xui.Module, 当前Module对象",
                    "threadid [可选参数] : String, 线程Id"
                ]
            },
            show:{
                $desc:"显示Module对象",
                $paras:[
                    "onEnd [Optiona] : Function. 回调函数,在Module对象成功显示后执行",
                    "parent [可选参数] : String/Element/xui.Dom, 父DOM节点或xui.UI对象",
                    "subId [可选参数] : String, 该参数在parent为xui.UI对象时有效.该子id. The sub id that Determines the [target] will be added to which sub DOM node. 该参数也可以设置成[false], that means the [target] will be appended to DOM only, no link created between the [target] UIProfiles and the parent UIProfile",
                    "threadid [可选参数] : String, 内部线程id. 如本参数为 false, 表示显示Module的过程不会异步调用函数（不用xui.Thread）"
                ],
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; Module.show(function(){});},false);"
                ]
            },
            destroy:{
                $desc:"销毁对象",
                $memo:"通常情况下, 程序员不必直接调用该函数"
            },
            iniComponents:{
                $desc:"生成内部的组件并返回内部组件数组(xui.absObj Object)",
                $rtn:"Array, xui.absObj对象数组",
                $snippet:[
                    "xui.Class('App1','xui.Module',{" +
                    "   Instance:{"+
                    "        iniComponents : function(){" +
                    "            var host=this, children=[], append=function(child){children.push(child.get(0))};" +
                    "            append((new xui.DataBinder)" +
                    "                .setHost(host,'db1')" +
                    "                .setName('db1')" +
                    "            );" +
                    "            append((new xui.UI.Dialog)" +
                    "                .setHost(host,'dialog1')" +
                    "                .setWidth(350)" +
                    "                .setHeight(450)" +
                    "            );" +
                    "            return children;\n" +
                    "        }" +
                    "   }" +
                    "});"+
                    "var module=new App1;"+
                    "module.create(function(module){alert(module.getUIComponents().get(0).alias);});"
                ]
            },
            getProperties:{
                $desc:"取得Module对象所有的属性或某个指定的属性",
                $rtn:"Object",
                $paras:[
                    "key [可选参数] : String, 属性名称"
                ],
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){alert(xui.serialize(module.getProperties()))});},false);",
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){alert(module.getProperties('p1'))});},false);"
                ]
            },
            setProperties:{
                $desc:"设置Module对象的一系列的属性或某个指定的属性",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object/String, 属性或key数组",
                    "value [可选参数] : Object, a property value"
                ],
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){module.setProperties('p3','p3 value'); alert(module.getProperties('p3'))});},false);"
                ]
            },
            setHost:{
                $desc:"设置host对象",
                $rtn:"[self]",
                $paras:[
                    "host [必需参数] : Object, host对象",
                    "alias [可选参数] : String, 别名"
                ],
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){module.setHost(window,'module_alias'); alert(module.getHost()===window); alert(window.module_alias)});},false);"
                ]
            },
            getHost:{
                $desc:"获取host对象",
                $rtn:"Object",
                $snippet:[
                    "xui.SC('App.Test1',function(){var module=new this; module.create(function(module){module.setHost(window,'module_alias'); alert(module.getHost()===window); alert(window.module_alias)});},false);"
                ]
            },

            beforeCreated:{
                $desc:'在Module生成之前触发.如果返回false,当前Module对象将不会生成',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id'
                ],
                $memo:'See constructor'
            },
            onCreated:{
                $desc:'在Module生成的时候触发',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id'
                ],
                $memo:'See constructor'
            },
            beforeShow:{
                $desc:'在Module显示前触发',
                $paras:[
                    'module : xui.Module 对象'
                ]
            },
            afterShow:{
                $desc:'在Module显示后触发',
                $paras:[
                    'module : xui.Module 对象'
                ]
            },
            onLoadBaseClass:{
                $desc:'当Module加载基类的时候触发本事件',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id',
                    'uri: String 类的uri',
                    'key: String, 基类的类名'
                ],
                $memo:'See constructor'
            },
            onFragmentChanged:{
                $desc:'当URL变量片段改变的时候触发本事件',
                $paras:[
                    'module : xui.Module 对象',
                    'fragment : String, URL片段',
                    'init : Boolen, 初始化',
                    'newAdd: Function, 新设置的callback'
                ]
            },
            onMessage:{
                $desc:'当模块收到消息时触发本事件',
                $paras:[
                    'module : xui.Module 对象',
                    'message : Object, 消息',
                    'source: Object, 消息源'
                ]
            },
            onLoadBaseClassErr:{
                $desc:'当Module加载基类出错的时候触发本事件',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id',
                    'key: String, 基类的类名'
                ]
            },
            onIniResource:{
                $desc:'当Module加载资源的时候触发本事件',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id'
                ],
                $memo:'See constructor'
            },
            beforeIniComponents:{
                $desc:'当Module初始化组件前触发本事件.如果返回false,iniComponents函数将不被执行',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id'
                ],
                $memo:'See constructor'
            },
            afterIniComponents:{
                $desc:'当 Module 运行iniComponents函数之后触发',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id'
                ],
                $memo:'See constructor'
            },
            onLoadRequiredClass:{
                $desc:'当 Module 加载所需要的类时触发',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id',
                    'uri: String 类的uri',
                    'key: String, 加载的类名'
                ],
                $memo:'See constructor'
            },
            onLoadRequiredClassErr:{
                $desc:'当 Module 加载所需要的类出错时触发',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id',
                    'key: String, 加载的类名'
                ]
            },
            onReady:{
                $desc:'当 Module 构建完成后触发',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id'
                ],
                $memo:'See constructor'
            },
            onModulePropChange:{
                $desc:'当 Module 属性改变后触发',
                $paras:[
                    'module : xui.Module 对象'
                ]
            },
            onRender:{
                $desc:'当 Module 的UI部分被加到DOM时触发',
                $paras:[
                    'module : xui.Module 对象',
                    'threadid : String, 线程 id'
                ],
                $memo:'See constructor'
            }
        }
    });


    xui.set(xui.Locale,["cn","doc","xui","ModuleFactory"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.ModuleFactory 类(静态类)",
        setProfile:{
            $desc:"设置应用模块工厂(ModuleFatory)的profile",
            $rtn:'xui.ModuleFactory',
            $paras:[
                "key [必需参数] : String或键值对",
                "value [可选参数] : String 或 键值对"
            ],
            $snippet:[
                "xui.ModuleFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});"+
                "xui.ModuleFactory.setProfile('test1','App.Test1');"+
                "xui.ModuleFactory.setProfile({test1:{cls:'App.Test1'},test2:{cls:'App.Test2'}});"+
                "xui.ModuleFactory.setProfile('test1',{cls:'App.Test1',props:{dlgCaption:'dialog caption'}});"+
                "alert(xui.serialize(xui.ModuleFactory.getProfile()));"+
                "alert(xui.ModuleFactory.getProfile('test1'));"
            ]
        },
        getProfile:{
            $desc:"获取应用模块工厂(ModuleFatory)的profile",
            $rtn:'String/Object',
            $paras:[
                "key [可选参数] : String"
            ],
            $snippet:[
                "xui.ModuleFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});"+
                "alert(xui.ModuleFactory.getProfile());"+
                "alert(xui.ModuleFactory.getProfile('test1'));"
            ]
        },
        broadcast:{
            $desc:"广播一个消息(function)到所有的应用模块(xui.Module)中",
            $paras:[
                "fun [必需参数] : Function, 要广播的函数"
            ],
            $snippet:[
                "xui.SC('App.Test1',function(){xui.ModuleFactory.setModule('test1', (new this));},false);"+
                "xui.SC('App.Test2',function(){xui.ModuleFactory.setModule('test2',(new this));},false);"+
                "xui.ModuleFactory.broadcast(function(i){alert(i + ' / ' + this.KEY)});"
            ]
        },
        destroyAll:{
            $desc:"销毁应用模块工厂(ModuleFatory)加载的所有模块",
            $snippet:[
                "xui.SC('App.Test1',function(){xui.ModuleFactory.setModule('test1',(new this));},false);"+
                "xui.SC('App.Test2',function(){xui.ModuleFactory.setModule('test2',(new this));},false);"+
                "xui.ModuleFactory.destroyAll();"+
                "alert(xui.ModuleFactory.getModuleFromCache('test'));"
            ]
        },
        getModuleFromCache:{
            $desc:"获取一个缓存中已经存在的应用模块对象(Module Object)",
            $rtn:"xui.Module",
            $paras:[
                "id [必需参数] : String, 应用模块对象id"
            ],
            $snippet:[
                "xui.SC('App.Test1',function(){xui.ModuleFactory.setModule('test1',(new this));},false);"+
                "xui.SC('App.Test2',function(){xui.ModuleFactory.setModule('test2',(new this));},false);"+
                "alert(xui.ModuleFactory.getModuleFromCache('test1').KEY);"
            ]
        },
        getModule :{
            $desc:"获取一个缓存中已经存在的应用模块对象(Module Object), 如果不存在,则加载应用模块对应的js文件,再生成应用模块对象(Module Object)",
            $rtn:"xui.Module",
            $paras:[
                "cls [必需参数] : String, 应用模块对象类名",
                "onEnd [可选参数] : Function(err:Error/String, module: xui.Module, threadid:String), 回调函数, 生成应用模块对象(Module Object)成功后被调用",
                "threadid [可选参数] : String, 内部线程id",
                "cached [可选参数] : Boolean, 默认为 true,优先从缓存中获取，加载后缓存. 当 cached 为 false 的时候相当于 newModule",
                "properties [可选参数] : Object, 键值对,module的属性",
                "events [可选参数] : Object, 键值对,module的事件"
            ],
            $snippet:[
                "xui.ModuleFactory.getModule('App.Test1',function(){alert('The Module loaded successfully')});",

                "xui.ModuleFactory.destroyAll();"+
                "xui.ModuleFactory.setProfile({test1:{cls:'App.Test1',properties:{key1:1},events:{ev1:function(){alert(2)}}},test2:'App.Test2'});"+
                "xui.ModuleFactory.getModule('test1',function(){alert('The Module loaded successfully');alert(this.properties.key1); this.events.ev1();});"
            ]
        },
        setModule:{
            $desc:"设置一个应用模块对象(Module Object),并和一个Module id关联",
            $rtn:"xui.ModuleFactory",
            $paras:[
                "id [必需参数] : String, Module id关联",
                "obj [必需参数] : Object, 应用模块对象(Module Object)"
            ],
            $snippet:[
                "xui.SC('App.Test1',function(){xui.ModuleFactory.setModule('test1',(new this));},false);"+
                "xui.SC('App.Test2',function(){xui.ModuleFactory.setModule('test2',(new this));},false);"+
                "alert(xui.ModuleFactory.getModuleFromCache('test1').KEY);"
            ]
        },
        newModule :{
            $desc:"生成一个新的应用模块类, 或加载一个应用模块类, 生成并返回它",
            $paras:[
                "cls [必需参数] : String, 应用模块类的路径名字",
                "onEnd [可选参数] : Function(err:Error/String, module: xui.Module, threadid:String), 回调函数,加载应用模块类成功后被调用",
                "threadid [可选参数] : String, the inner threadid",
                "properties [可选参数] : Object, 键值对,module的属性",
                "events [可选参数] : Object, 键值对,module的事件"
            ],
            $snippet:[
                "xui.ModuleFactory.destroyAll();"+
                "xui.ModuleFactory.newModule('App.Test1',function(){alert('The module loaded successfully')});"
            ]
        },
        prepareModules:{
            $desc:"在后台加载并生成一些列的应用模块, 这些模块需要在profile中事先被定义",
            $rtn:"xui.ModuleFactory",
            $snippet:[
                "//xui.ModuleFactory.setProfile({test1:'App.Test1',test2:'App.Test2'});\n"+
                "//xui.ModuleFactory.prepareWidgets(['test1','test2']);"
            ]
        },
        storeModule:{
            $desc:"存储一个应用模块. (切断和父DOM节点的关联, 并存放到一个隐藏的div.)",
            $paras:[
                "id [Require] : 应用模块id"
            ],
            $snippet:[
                "xui.ModuleFactory.destroyAll();"+
                "xui.ModuleFactory.setProfile('test1',{cls:'App.Test1',props:{dlgCaption:'dialog caption'}});"+
                "xui.ModuleFactory.getModule('test1',function(){ this.showDlg(); xui.asyRun(function(){xui.ModuleFactory.storeModule('test1')},1000); });"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","DomProfile"], {
        KEY:{$desc:"本类名"}
    });
    
    xui.set(xui.Locale,["cn","doc","xui","Timer"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Timer 类",
        constructor:{
            $desc:"生成一个Timer对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            destroy:{
                $desc:"销毁该对象",
                $memo:"一般情况下,程序员无需直接调用该函数"
            },
            getInteval:{
                $desc:"获取定时器间隔",
                $rtn:"Number"
            },
            setInteval:{
                $desc:"设置定时器间隔",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            onTime:{
                $desc:"定时器到期触发. 如返回[false]将终止定时器",
                $paras:[
                    "profile : xui.Profile",
                    "threadId : String"
                ]
            },
            onStart:{
                $desc:"当定时器开始运行",
                $paras:[
                    "profile : xui.Profile",
                    "threadId : String"
                ]
            },
            onSuspend:{
                $desc:"当定时器挂起",
                $paras:[
                    "profile : xui.Profile",
                    "threadId : String"
                ]
            },
            onEnd:{
                $desc:"当定时器结束",
                $paras:[
                    "profile : xui.Profile",
                    "threadId : String"
                ]
            }
        }
    });
    
    xui.set(xui.Locale,["cn","doc","xui","APICaller"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.APICaller 类",
        WDSLCache:{
            $desc:"SOAP的WDSL缓存"
        },
        constructor:{
            $desc:"生成一个 APICaller 对象"
        },
        destroyAll:{
            $desc:"销毁所有xui.APICaller",
            $snippet:[
                "//xui.DataBinder.destroyAll()"
            ]
        },
        getFromName:{
            $desc:"获取名字为指定值的xui.DataBinder对象",
            $rtn:'xui.DataBinder Object',
            $paras:[
                "name [必需参数] : String, DataBinder名字"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            setHost:{
                $desc:"设置借宿对象和别名",
                $rtn:'[self]',
                $paras:[
                    "host [可选参数 : Object, 宿主",
                    "alias [可选参数 : String, 别名字符串"
                ]
            },
            destroy:{
                $desc:"销毁该对象",
                $memo:"一般情况下,程序员无需直接调用该函数"
            },
            setName:{
                $desc:"设置名称",
                $rtn:'[self]',
                $paras:[
                    "value [必需参数] : String, 名字字符串"
                ],
                $memo:"参看'getValue'代码片段"
            },
            getName:{
                $desc:"返回名字",
                $rtn:'String',
                $memo:"参看'getValue'代码片段"
            },
            getAvoidCache:{
                $desc:"得到是否要为了避免浏览器缓存，而添加一个随机参数",
                $rtn:'[self]'
            },
            setAvoidCache:{
                $desc:"决定是否要为了避免浏览器缓存，而添加一个随机参数",
                $rtn:'[self]',
                $paras:[
                    "value [必需参数] : Boolean"
                ]
            },
            getQueryURL:{
                $desc:"获取远程数据源的URL请求地址",
                $rtn:"String"
            },
            setQueryURL:{
                $desc:"设置远程数据源的URL请求地址",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getQueryUserName:{
                $desc:"获取远程数据源的URL请求用户名",
                $rtn:"String"
            },
            setQueryUserName:{
                $desc:"设置远程数据源的URL请求用户名",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getQueryPassword:{
                $desc:"获取远程数据源的URL请求密码",
                $rtn:"String"
            },
            setQueryPassword:{
                $desc:"设置远程数据源的URL请求密码",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getQueryMethod:{
                $desc:"获取远程数据源的URL请求方式",
                $rtn:"String"
            },
            setQueryMethod:{
                $desc:"设置远程数据源的URL请求方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String'auto','GET'或'POST', 默认为auto",
                    $force
                ]
            },
            getQueryAsync:{
                $desc:"获取远程数据源的数据请求是否为异步方式",
                $rtn:"Boolean"
            },
            setQueryAsync:{
                $desc:"设置远程数据源的数据请求是否为异步方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getFakeCookies:{
                $desc:"获取Cookies伪装",
                $rtn:"Object"
            },
            setFakeCookies:{
                $desc:"设置Cookies伪装",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            getQueryHeader:{
                $desc:"得到需要附加的请求头",
                $rtn:"Object"
            },
            setQueryHeader:{
                $desc:"设置需要附加的请求头",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            getRequestDataSource:{
                $desc:"得到请求的数据源",
                $rtn:"Array"
            },
            setRequestDataSource:{
                $desc:"设置请求的数据源",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array. [{type:'databinder', name:'xxx',path:'xx'},{type:'form', name:'xxx',path:'xx'}]",
                    $force
                ]
            },
            getResponseDataTarget:{
                $desc:"得到响应数据的呈现方式",
                $rtn:"Array"
            },
            setResponseDataTarget:{
                $desc:"设置响应数据的呈现方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array. [{type:'alert',name:'xx'},{type:'log',path:'xx'},{type:'databinder', name:'xxx',path:'xx'},{type:'form', name:'xxx',path:'xx'}]",
                    $force
                ]
            },
            getResponseCallback:{
                $desc:"得到数据响应的回调函数配置",
                $rtn:"Array"
            },
            setResponseCallback:{
                $desc:"设置数据响应的回调函数配置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array. [{type:'global',name:'xx'},{type:'host',name:'yy'}]",
                    $force
                ]
            },
            getQueryArgs:{
                $desc:"获取远程数据源的数据请求参数",
                $rtn:"Object"
            },
            setQueryArgs:{
                $desc:"设置远程数据源的数据请求参数",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            getOAuth2Token:{
                $desc:"获取数据请求的 OAuth2Token",
                $rtn:"String"
            },
            setOAuth2Token:{
                $desc:"设置数据请求的 OAuth2Token",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getQueryOptions:{
                $desc:"获取远程数据源数据请求时的自定义选项[同 Ajax/SAjax/IAjax 的 options]",
                $rtn:"Object"
            },
            setQueryOptions:{
                $desc:"设置远程数据源数据请求时的自定义选项[同 Ajax/SAjax/IAjax 的 options]",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            getProxyType:{
                $desc:"获取远程数据源的数据请求代理种类",
                $rtn:"String"
            },
            setProxyType:{
                $desc:"设置远程数据源的数据请求代理种类",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. auto/Ajax/SAjax/IAjax之一,默认为auto",
                    $force
                ]
            },
            getRequestId:{
                $desc:"获取远程数请求的标识ID",
                $rtn:"String"
            },
            setRequestId:{
                $desc:"设置远程数请求的标识ID",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 自定义的请求标识",
                    $force
                ]
            },
            getRequestType:{
                $desc:"获取向远程数据源发送数据请求的数类型",
                $rtn:"String"
            },
            setRequestType:{
                $desc:"设置向远程数据源发送数据请求的数类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. HTTP,JSON,XML,SOAP 之一",
                    $force
                ]
            },
            getResponseType:{
                $desc:"获取从远程数据源得到的数据类型",
                $rtn:"String"
            },
            setResponseType:{
                $desc:"设置从远程数据源得到的数据类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. JSON,XML,SOAP 之一",
                    $force
                ]
            },
            invoke:{
                $desc:"远程数据调用",
                $rtn:"[xui.absIO]",
                $paras:[
                    "onSuccess [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request成功时回调该函数",
                    "onFail [可选参数]: Function, 参数:[response Object, response type, threadid]. 当request失败时回调该函数",
                    "onStart [可选参数] : Function, ajax开始时的载的回调函数",
                    "onEnd [可选参数] : Function, ajax结束时的回调函数",
                    "mode [可选参数] : String, 调用方式,normal(ajax调用)/busy(ajax调用并显示busy界面)/return(不调用,返回ajax对象)之一,默认为normal",
                    "threadid [可选参数]: String, 目前request所在的线程的 id. 过程一般为：[挂起thread -> 执行request -> 继续thread]",
                    "options [可选参数]: Object, 一组配置数据"
                ]
            },

            beforeInvoke:{
                $desc:"在invoke之前调用.  返回false可以阻止远程调用",
                $rtn:"Object",
                $paras:[
                    "profile : xui.Profile",
                    "requestId : String"
                ]
            },
            beforeData:{
                $desc:"在得到数据之前调用.  返回false可以阻止进一步动作",
                $paras:[
                    "profile : xui.Profile",
                    "rspData : Object, 从远程调用返回的数据",
                    "requestId : String"
                ]
            },
            onData:{
                $desc:"在得到数据之后调用",
                $paras:[
                    "profile : xui.Profile",
                    "rspData : Object, 从远程调用返回的数据",
                    "requestId : String"
                ]
            },
            onError:{
                $desc:"在出现错误后调用",
                $paras:[
                    "profile : xui.Profile",
                    "rspData : Object, 从远程调用返回的数据",
                    "requestId : String"
                ]
            },
            afterInvoke:{
                $desc:"在invoke之后调用",
                $paras:[
                    "profile : xui.Profile",
                    "rspData : Object, 从远程调用返回的数据",
                    "requestId : String"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","DataBinder"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.DataBinder 类",
        constructor:{
            $desc:"生成一个databinder对象"
        },
        destroyAll:{
            $desc:"销毁所有xui.DataBinder对象",
            $snippet:[
                "//xui.DataBinder.destroyAll()"
            ]
        },
        getFromName:{
            $desc:"获取名字为指定值的xui.DataBinder对象",
            $rtn:'xui.DataBinder Object',
            $paras:[
                "name [必需参数] : String, DataBinder名字"
            ],
            $snippet:[
                "var db=new xui.DataBinder();db.setName('abc');"+
                "alert(db=xui.DataBinder.getFromName('abc'));"+
                "db.destroy();"+
                "alert(xui.DataBinder.getFromName('abc'));"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            setHost:{
                $desc:"设置借宿对象和别名",
                $rtn:'[self]',
                $paras:[
                    "host [可选参数 : Object, 宿主",
                    "alias [可选参数 : String, 别名字符串"
                ]
            },
            getUIValue:{
                $desc:"得到绑定控件的界面值",
                $rtn:"Object, 键值对",
                $paras:[
                    "withCaption [可选参数] : Boolean, 是否连控件的caption一起获取(如果控件有caption属性的话), 默认为false",
                    "dirtied [可选参数] : Boolean, 是否只获得脏控件的界面值"
                ]
            },
            isDirtied:{
                $desc:"判断绑定控件是否已经被修改",
                $rtn:"Boolean"
            },
            getDirtied:{
                $desc:"得到脏绑定控件的界面值",
                $rtn:"Object, 键值对",
                $paras:[
                    "withCaption [可选参数] : Boolean, 是否连控件的caption一起获取(如果控件有caption属性的话), 默认为false"
                ]
            },
            updateValue:{
                $desc:"将绑定控件的内部值更新为界面值,并去掉脏标识",
                $rtn:"[self]"
            },
            checkValid:{
                $desc:"检查所有绑定值是否有效. 例如: 用户输入了字符到数字框里面,而数字框又绑定了databinder, 这个函数就会返回[false]",
                $rtn:"xui.absValue"
            },
            destroy:{
                $desc:"销毁该对象",
                $memo:"一般情况下,程序员无需直接调用该函数"
            },
            setName:{
                $desc:"设置数据绑定器的名称",
                $rtn:'[self]',
                $paras:[
                    "value [必需参数] : String, 名字字符串"
                ],
                $memo:"参看'getValue'代码片段"
            },
            getUI:{
                $desc:"获取绑定在本对象上的UI",
                $rtn:'xui.UI',
                $memo:"To see the 'getValue' snippets",
                $snippet:[
                    "var id='xui.temp.ui'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).append(new xui.UI.Input({position:'relative',dataBinder:'abc'}));"+
                    "alert(xui.DataBinder.getFromName('abc').getUI().serialize());"+
                    "}"
                ]
            },
            getName:{
                $desc:"返回数据绑定器名字",
                $rtn:'String',
                $memo:"参看'getValue'代码片段"
            },
            getData:{
                $desc:"获取内部数据",
                $rtn:"Object, 键值对",
                $paras:[
                    "key [可选参数] : String, 如指定key表示只获取特定键的内部数据"
                ]
            },
            setData:{
                $desc:"设置内部数据",
                $rtn:"[self]",
                $paras:[
                    "key [必需参数] : Object/String, 键/值对或键关键字",
                    "value [可选参数] : Object, 值关键字,只有在key为String的时候有效"
                ]
            },
            updateDataToUI:{
                $desc:"从内部数据data设置数据到所绑定的UI",
                $rtn:"[self]",
                $paras:[
                    "adjustData [可选参数] : Function, 对内部数据做调整的函数(在设置到UI之前)",
                    "dataKeys [可选参数] : String/Array, 设置的数据项"
                ]
            },
            updateDataFromUI:{
                $desc:"从绑定的UI上获取值,并设置到内部数据data",
                $rtn:"[Boolean]",
                $paras:[
                    "updateUIValue [可选参数] : Boolean, 立即重新设置界面数据和清理脏数据标识, 默认为true",
                    "withCaption [可选参数] : Boolean, 是否连控件的caption一起获取(如果控件有caption属性的话), 默认为false",
                    "returnArr [可选参数] : Boolean, 是否得到数组格式(只针对可多选择absList控件), 默认为false",
                    "adjustData [可选参数] : Function, 对从UI获取到的数据做调整的函数(在设置到内部data之前)",
                    "dataKeys [可选参数] : String/Array, 获取的数据项",
                    "ignoreAlert[可选参数] : Boolean, 不显示警告信息",
                ]
            },
            beforeUpdateDataToUI:{
                $desc:"在updateDataToUI函数设置数据到UI前被调用,用来调整数据对象. 本事件可以返回调整后的数据对象",
                $rtn:"Object",
                $paras:[
                    "profile : xui.Profile",
                    "dataToUI : Object, 即将设置到UI的数据对象"
                ]
            },
            afterUpdateDataFromUI:{
                $desc:"在updateDataFromUI函数从得到UI数据后被调用,用来调整数据对象. 本事件可以返回调整后的数据对象",
                $rtn:"Object",
                $paras:[
                    "profile : xui.Profile",
                    "dataFromUI : Object, 从UI得到的数据对象"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Tips"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Tips 类(静态类)",
        AUTOHIDETIME:{
            $desc:"Number, 指示多少毫秒后tip自动隐藏. 该参数在MOABLE设置为[false]时才有效",
            $snippet:["alert(xui.Tips.AUTOHIDETIME)"]
        },
        DELAYTIME:{
            $desc:"Number, 指示在function 'xui.Tips.show'调用后多少毫秒后显示tip",
            $snippet:["alert(xui.Tips.DELAYTIME)"]
        },
        MAXWIDTH:{
            $desc:"Number, 提示的最大宽度",
            $snippet:["alert(xui.Tips.MAXWIDTH)"]
        },
        MOVABLE:{
            $desc:"Boolean, 指示是否跟随鼠标移动",
            $snippet:["alert(xui.Tips.MOVABLE)"]
        },
        TIPSKEY:{
            $desc:"String, 提示的文字键. 默认为'tips'",
            $snippet:["alert(xui.Tips.TIPSKEY)"]
        },
        getTips:{
            $desc:"获取提示字符串",
            $rtn:"String",
            $snippet:[
                "xui.Tips.show({left:100,top:100}, 'a string');"+
                "alert(xui.Tips.getTips());"+
                "xui.Tips.hide();"+
                "alert(xui.Tips.getTips());"
            ]
        },
        setTips:{
            $desc:"设置提示字符串",
            $paras:[
                "s [必需参数] : String"
            ]
        },
        setPos:{
            $desc:"设置提示显示的位置",
            $paras:[
                "left [可选参数] : Number, 以px表示的横坐标。",
                "top [可选参数] : Number, 以px表示的纵坐标。"
            ]
        },
        hide:{
            $desc:"隐藏提示信息",
            $snippet:[
                "xui.Tips.show({left:100,top:100}, 'a string'); xui.asyRun(function(){xui.Tips.hide();},1000); xui.asyRun(function(){xui.Tips.show({left:100,top:100}, {tips:'an Object with a \\\'tips\\\' key'})},2000); xui.asyRun(function(){xui.Tips.hide();},3000); xui.asyRun(function(){xui.Tips.show({left:100,top:100}, {any:'an Object with a customizable key'},'any')},4000);xui.asyRun(function(){xui.Tips.hide();},5000);"
            ]
        },
        show:{
            $desc:"显示提示信息",
            $paras:[
                "pos [必需参数] : Object, {left:Number,top:Number}, 提示信息的位置",
                "item [必需参数] : String/Object, 提示信息的内容",
                "key [可选参数] : String, 得到提示信息的键值. 默认为 'tips'"
            ],
            $snippet:[
                "xui.Tips.show({left:100,top:100}, 'a string'); xui.asyRun(function(){xui.Tips.hide();},1000); xui.asyRun(function(){xui.Tips.show({left:100,top:100}, {tips:'an Object with a \\\'tips\\\' key'})},2000); xui.asyRun(function(){xui.Tips.hide();},3000); xui.asyRun(function(){xui.Tips.show({left:100,top:100}, {any:'an Object with a customizable key'},'any')},4000);xui.asyRun(function(){xui.Tips.hide();},5000);"
            ]
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","Coder"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.Coder 类(静态类)",
        isSafeJSON:{
            $desc:"检测一个字符串是否是一个安全的 JSON 文本",
            $rtn:"Boolean",
            $paras:[
                "s [必需参数] : String"
            ]
        },
        formatText:{
            $desc:"将js/css/php/html代码片段格式化为更加可读的格式",
            $rtn:"String",
            $paras:[
                "code [必需参数] : String, 代码片段",
                "type [可选参数] : String, 代码片段类型. 默认是 'js'"
            ],
            $snippet:[
                "alert(xui.Coder.formatText('var a=function(){var a=1;var b=2;var c={a:1,b:2};};'))",
                "alert(xui.Coder.formatText('.cls{left:0;top:0}','css'))",
                "alert(xui.Coder.formatText('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'))",
                "alert(xui.Coder.formatText(' foreach ($d as $k => $v){print $k.$v;}','php'))"
            ]
        },
        formatHTML:{
            $desc:"将js/css/php/html代码片段转化为更可读的HTML",
            $rtn:"String",
            $paras:[
                "code [必需参数] : String, code snippet",
                "type [可选参数] : String, code type. Defalut is 'js'",
                "paras [可选参数] : String[], Commands, e.g. ['plain','run']",
                "fold [可选参数] : String, fold the code",
                "id [可选参数] : String, the output HTML DOM id",
                "height [可选参数] : Number, the output HTML height"
            ],
            $snippet:[
                "var str=xui.Coder.formatHTML('var a=function(){var a=1;var b=2;var c={a:1,b:2};};alert(1);','js',['plain','run'],'i-d'); xui.UI.Dialog.alert('xui.Coder', str)",
                "var str=xui.Coder.formatHTML('.cls{left:0;top:0}','css'); xui.UI.Dialog.alert('xui.Coder', str)",
                "var str=xui.Coder.formatHTML('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'); xui.UI.Dialog.alert('xui.Coder', str)",
                "var str=xui.Coder.formatHTML(' foreach ($d as $k => $v){print $k.$v;}','php',['plain']); xui.UI.Dialog.alert('xui.Coder', str)"
            ]
        },
        formatAll:{
            $desc:"将js/css/php/html代码片段转化为HTML. 相当于formatText + formatHTML",
            $rtn:"String",
            $paras:[
                "code [必需参数] : String, 代码片段",
                "type [可选参数] : String, 代码类型. 默认的 'js'",
                "paras [可选参数] : String[], 指令, 例如 ['plain','run']",
                "fold [可选参数] : String, fold the code",
                "id [可选参数] : String, the output HTML DOM id",
                "height [可选参数] : Number, 输出的HTML高度"
            ],
            $snippet:[
                "var str=xui.Coder.formatAll('var a=function(){var a=1;var b=2;var c={a:1,b:2};};alert(1);','js',['plain','run'],'i-d'); xui.UI.Dialog.alert('xui.Coder', str)",
                "var str=xui.Coder.formatAll('.cls{left:0;top:0}','css'); xui.UI.Dialog.alert('xui.Coder', str)",
                "var str=xui.Coder.formatAll('<div><p>1</p><p>2</p><p><span>3</span>4</p></div>','html'); xui.UI.Dialog.alert('xui.Coder', str)",
                "var str=xui.Coder.formatAll(' foreach ($d as $k => $v){print $k.$v;}','php',['plain']); xui.UIshowMo.alert('xui.Coder', str)"
            ]
        },
        replace:{
            $desc:"高级字符串替换",
            $rtn:"String",
            $paras:[
                "str [必需参数] : string, 目标串",
                "reg [必需参数] : Array: [string, string] 或 [RegExp, string]",
                "replace [可选参数] : String, 替换串",
                "ignore_case [可选参数] : Boolean, 指示是否忽略大小写."
            ],
            $snippet:[
                'alert(xui.Coder.replace("aAa","a","*",true));'+
                'alert(xui.Coder.replace("aAa","a","*",false));'+
                'alert(xui.Coder.replace("aAa","a","*"));'+
                'alert(xui.Coder.replace("aAa",/a/,"*"));'+
                'alert(xui.Coder.replace("aAa",["a","*"]));'+
                'alert(xui.Coder.replace("aAa",[["a","*"]]));',
                'alert(xui.Coder.replace("aAa",[["a","*"],[/A/,"-"]]))',
                '//Use "$0" to protect "ab" in the string: \n alert(xui.Coder.replace("aba",[["ab","$0"],["a","*"]]))',
                'alert(xui.Coder.replace("aba ab a",[["ab","$0"],["a",function(s,i){return s[i].toUpperCase();}]]))'
            ]
        },
        applyById:{
            $desc:"将xui.Coder应用于给定id的所有元素",
            $paras:[
                "id [必需参数] : String, DOM id",
                "formatAll [可选参数] : Boolean, 指示使用'formatAll'还是'formatHTML', 默认为'formatHTML'"
            ],
            $memo:"该函数仅用于突出显示"
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","absList"], {
        prototype:{
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.abs10-l2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "xui.asyRun(function(){o.activate();});"+
                    "}"
                ]
            },
            fireItemClickEvent:{
                $desc:"模拟鼠标点击,以选中list中的某一项",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 项的id"
                ],
                $snippet:[
                    "var id='xui.temp.absl0-0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "xui.asyRun(function(){o.fireItemClickEvent('b')},1000);"+
                    "}"
                ]
            },
            hideItems:{
                $desc:"隐藏一个或多个项",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String/Array, 项的标识号,可以是多个"
                ]
            },
            hideItems:{
                $desc:"显示一个或多个项",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String/Array, 项的标识号,可以是多个"
                ]
            },
            updateItem:{
                $desc:"更新一个项,并刷新对应的DOM界面",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 项的标识号",
                    "options [必需参数] : Object/String, 要更新的选项"
                ],
                $snippet:[
                    "var id='xui.temp.absl0-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.updateItem('b',{caption:'bbb', image:'img/img.gif', imagePos:'left -16px'})},1000);" +
                    "}"
                ]
            },

            getItems:{
                $desc:"获取所有项",
                $rtn:"Array",
                $snippet:[
                    "var id='xui.temp.absl1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}))"+
                    "xui.asyRun(function(){alert(xui.serialize(o.getItems()))});"+
                    "}"
                ]
            },
            setItems:{
                $desc:"设置项",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 项数组",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.absl2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}))"+
                    "xui.asyRun(function(){o.setItems([{id:'aaa',caption:'bbb'}])});"+
                    "}"
                ]
            },
            insertItems:{
                $desc:"添加一些项",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 项数组",
                    "base [可选参数] : String, 基准项id",
                    "before [可选参数] : Boolean, 指示在基准项前还是项后插入. 默认为项后;"
                ],
                $snippet:[
                    "var id='xui.temp.absl3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "xui.asyRun(function(){o.insertItems([{id:'a1',caption:'a1'}],'b',true)},1000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'c1',caption:'c1'}],'c',false)},2000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'a0',caption:'a0'}],null,true)},3000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'c2',caption:'c2'}],null,false)},4000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'h',caption:'h'},{id:'i',caption:'i'}])},5000);"+
                    "}"
                ]
            },
            removeItems:{
                $desc:"移除一系列项",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 要移除的项id数组"
                ],
                $snippet:[
                    "var id='xui.temp.absl4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "xui.asyRun(function(){o.removeItems(['a','b'])},1000);"+
                    "}"
                ]
            },
            clearItems:{
                $desc:"移除所有的项",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String, 包含所有项的临时键. 默认为 'ITEMS'"
                ],
                $snippet:[
                    "var id='xui.temp.absl5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "xui.asyRun(function(){o.clearItems();},1000);"+
                    "}"
                ]
            },
            getValueSeparator:{
                $desc:"获取字符串值的分隔符(只对selMode为multi或multibycheckbox的情况有效).默认为“;”",
                $rtn:"String"
            },
            setValueSeparator:{
                $desc:"设置字符串值的分隔符(只对selMode为multi或multibycheckbox的情况有效)",
                $rtn:"[self]"
            },
            getListKey:{
                $desc:"获取列表键",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.abs6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "xui.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                    "var o;xui(id).prepend(o=new xui.UI.List({position:'relative',listKey:'test'}));"+
                    "xui.asyRun(function(){alert(o.getListKey())});"+
                    "}"
                ]
            },
            setListKey:{
                $desc:"设置列表键",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 列表键",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.abs7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "xui.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                    "var o;xui(id).prepend(o=new xui.UI.List({position:'relative',listKey:'test'}));"+
                    "xui.asyRun(function(){o.setListKey('test2')},1000);"+
                    "}"
                ]
            },
            getItemByItemId:{
                $desc:"获取id为指定值的子项对象",
                $rtn:"Object",
                $paras:[
                    "itemId [必需参数] :String, 子项唯一标识"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').boxing();alert(xui.serialize( pro.getItemByItemId('Class') ))"
                ]
            },
            getItemByDom:{
                $desc:"获取DOM节点或DOM id对应的子项对象",
                $rtn:"Object",
                $paras:[
                    "src [必需参数] : DOM节点或DOM id"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').boxing();alert(xui.serialize( pro.getItemByDom('xui.UI.TreeBar-ITEM:a:a') ))"
                ]
            },
            getSubIdByItemId:{
                $desc:"获取项的子项id",
                $rtn:"String",
                $paras:[
                    "itemId [必需参数] :String, 子项唯一标识"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').boxing();alert(pro.getSubIdByItemId('Class') )"
                ]
            },
            getSubNodeByItemId:{
                $desc:"获取子项对应的DOM元素",
                $rtn:"xui.Dom",
                $paras:[
                    "key [必需参数] : String, key 字符串",
                    "itemId [必需参数] :String, 子项唯一标识"
                ],
                $snippet:[
                    "var pro=xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').boxing();alert(pro.getSubNodeByItemId('ITEM','Class') )"
                ]
            },
            beforeIniEditor:{
                $desc:"在子项编辑之前调用. 如果返回false,默认的功能会被禁止",
                $paras:[
                    $profile,
                    "item : Object, 子项对象",
                    "captionNode : xui.Dom, 子项标题的Dom对象"
                ]
            },
            onBeginEdit:{
                $desc:"在编辑器显示前调用",
                $paras:[
                    $profile,
                    "item : Object, 子项对象",
                    "editor: Object, 编辑器对象"
                ]
            },
            beforeEditApply:{
                $desc:"在编辑内容生效前调用,返回false可以阻止该动作",
                $paras:[
                    $profile,
                    "item : Object, 子项对象",
                    "caption: String. 要更新的内容",
                    "editor: Object, 编辑器对象",
                    "tag: String, 动作来源"
                ]
            },
            onEndEdit:{
                $desc:"在编辑器消失前调用",
                $paras:[
                    $profile,
                    "item : Object, 子项对象",
                    "editor: Object, 编辑器对象"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","absValue"], {
        prototype:{
            getReadonly:{
                $desc:"判断控件是否为只读",
                $rtn:"Boolean"
            },
            setReadonly:{
                $desc:"设置控件是否为只读",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getShowDirtyMark:{
                $desc:"获得控件是否显示脏标识的属性",
                $rtn:"Boolean",
                $memo:"如果 dirtyMark和showDirtyMark 都为 [true], 控件值改变的时候可能会在界面出现脏标识"
            },
            setShowDirtyMark:{
                $desc:"设置控件是否显示脏标识的属性",
                $rtn:"[self]",
                $memo:"如果 dirtyMark和showDirtyMark 都为 [true], 控件值改变的时候可能会在界面出现脏标识"
            },
            getDirtyMark:{
                $desc:"获得控件是否有标识脏的功能",
                $rtn:"Boolean",
                $memo:"如果 dirtyMark和showDirtyMark 都为 [true], 控件值改变的时候可能会在界面出现脏标识"
            },
            setDirtyMark:{
                $desc:"设置控件是否有标识脏的功能",
                $rtn:"[self]",
                $memo:"如果 dirtyMark和showDirtyMark 都为 [true], 控件值改变的时候可能会在界面出现脏标识"
            },
            getRequired:{
                $desc:"获取输入性控件是否要必须输入",
                $rtn:"Boolean"
            },
            setRequired:{
                $desc:"设置输入性控件是否要必须输入",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getUIValue:{
                $desc:"获取用户界面值",
                $rtn:"Object",
                $paras:[
                    "returnArr [可选参数] : Boolean. 是否返回Array(只对selMode为multi或multibycheckbox的情况有效)"
                ],
                $snippet:[
                    "var id='xui.temp.absv7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "xui.asyRun(function(){alert(o.getUIValue())},1000)"+
                    "}"
                ]
            },
            setUIValue:{
                $desc:"设置用户界面值和控件值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    "force [可选参数] : Boolean, 强行赋值,即使赋值和现有值已经相同. 默认为 [false]"
                ],
                $snippet:[
                    "var id='xui.temp.absv81'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "xui.asyRun(function(){o.setUIValue('ini2'); alert(o.getUIValue());},1000)"+
                    "}"
                ],
                $memo:"调用该函数时,以下两个事件将被触发beforeUIValueSet and afterUIValueSet"
            },

            updateValue:{
                $desc:"将界面值更新为内部值",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.absv82'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "xui.asyRun(function(){o.setUIValue('ini2').updateValue(); alert(o.getValue());},1000)"+
                    "}"
                ]
            },
            getValue:{
                $desc:"获取内部值",
                $rtn:"Object",
                $paras:[
                    "returnArr [可选参数] : Boolean. 是否返回Array(只对selMode为multi或multibycheckbox的情况有效)"
                ],
                $snippet:[
                    "var id='xui.temp.absv9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "xui.asyRun(function(){alert(o.getValue())},1000)"+
                    "}"
                ]
            },
            setValue:{
                $desc:"设置内部值,界面值,和控件值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    "force [可选参数] : Boolean, force to set the value even if the same value already exists. 默认为 [false]"
                ],
                $snippet:[
                    "var id='xui.temp.absv10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "xui.asyRun(function(){o.setValue('ini2'); alert(o.getValue());},1000)"+
                    "}"
                ],
                $memo:"调用该函数时,以下两个事件将被触发: beforeValueSet and afterValueSet"
            },
            checkValid:{
                $desc:"检查界面值是否有效",
                $rtn:"Boolean",
                $paras:[
                    "value [可选参数] : Object, 检测目标值,如果没有输入,则检测的是控件的界面值"
                ],
                $snippet:[
                    "var id='xui.temp.absv11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini',valueFormat:'^-?\\\\d\\\\d*$'}));"+
                    "xui.asyRun(function(){alert(o.checkValid());},1000)"+
                    "}"
                ]
            },
            isDirtied:{
                $desc:"判断界面值已经被修改",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.absv13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "xui.asyRun(function(){o.setUIValue('ini2');alert(o.isDirtied());},1000)"+
                    "}"
                ]
            },
            resetValue:{
                $desc:"重新设置内部值, 界面值和控件值. 该函数不会触发任何事件",
                $rtn:'[self]',
                $paras:[
                    "value [可选参数] : Object, 重设的新值. 默认为 ''"
                ],
                $snippet:[
                    "var id='xui.temp.absv14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "o.setUIValue('ini2');xui.asyRun(function(){o.resetValue('ini2');},1000)"+
                    "}"
                ]
            },

            beforeUIValueSet:{
                $desc:"在setUIValue调用之前被调用. 返回false会阻止setUIValue被调用",
                $paras:[
                    $profile,
                    "oldValue : String, 旧的界面值",
                    "newValue : String, 新的界面值",
                    "force : Boolean, 是否为强制调用",
                    "tag : String, 调用时的附加值"
                ],
                $snippet:[
                    "var id='xui.temp.absv15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "var arr=[];"+
                    "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                    "xui.asyRun(function(){o.setUIValue('ini2');},100);"+
                    "xui.asyRun(function(){o.setValue('ini3');},200);"+
                    "xui.asyRun(function(){alert(arr.join('\\n'));},220);"+
                    "}"
                ]
            },
            afterUIValueSet:{
                $desc:"在setUIValue调用之后被调用",
                $paras:[
                    $profile,
                    "oldValue : String, 旧的界面值",
                    "newValue : String, 新的界面值",
                    "force : Boolean, 是否为强制调用",
                    "tag : String, 调用时的附加值"
                ],
                $snippet:[
                    "var id='xui.temp.absv16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "var arr=[];"+
                    "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                    "xui.asyRun(function(){o.setUIValue('ini2');},100);"+
                    "xui.asyRun(function(){o.setValue('ini3');},200);"+
                   "xui.asyRun(function(){alert(arr.join('\\n'));},220);"+
                    "}"
                ]
            },
            onChange:{
                $desc:"当有值的控件在界面值改变时被调用",
                $paras:[
                    $profile,
                    "oldValue : String, 旧的界面值",
                    "newValue : String, 新的界面值",
                    "force : Boolean, 是否为强制调用",
                    "tag : String, 调用时的附加值"
                ]
            },
            onValueChange:{
                $desc:"当有值的控件在内部值改变时被调用",
                $paras:[
                    $profile,
                    "oldValue : String, 旧值",
                    "newValue : String, 新值",
                    "force : Boolean, 是否为强制调用",
                    "tag : String, 调用时的附加值"
                ]
            },
            beforeValueSet:{
                $desc:"在setValue调用之前被调用. 返回false会阻止setValue被调用",
                $paras:[
                    $profile,
                    "oldValue :String, 旧的内部值",
                    "newValue : String, 新的内部值",
                    "force : Boolean, 是否为强制调用",
                    "tag : String, 调用时的附加值"
                ],
                $snippet:[
                    "var id='xui.temp.absv17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "var arr=[];"+
                    "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                    "xui.asyRun(function(){o.setUIValue('ini2');},100);"+
                    "xui.asyRun(function(){o.setValue('ini3');},200);"+
                   "xui.asyRun(function(){alert(arr.join('\\n'));},220);"+
                    "}"
                ]
            },
            afterValueSet:{
                $desc:"在setValue调用之后被调用",
                $paras:[
                    $profile,
                    "oldValue : String, 旧的内部值",
                    "newValue : String, 新的内部值",
                    "force : Boolean, 是否为强制调用",
                    "tag : String, 调用时的附加值"
                ],
                $snippet:[
                    "var id='xui.temp.absv18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "var arr=[];"+
                    "o.beforeUIValueSet(function(p,o,v){arr.push('beforeUIValueSet: '+o+'->'+v)}).afterUIValueSet(function(p,o,v){arr.push('afterUIValueSet: '+o+'->'+v)}).beforeValueSet(function(p,o,v){arr.push('beforeValueSet: '+o+'->'+v)}).afterValueSet(function(p,o,v){arr.push('afterValueSet: '+o+'->'+v)});"+
                    "xui.asyRun(function(){o.setUIValue('ini2');},100);"+
                    "xui.asyRun(function(){o.setValue('ini3');},200);"+
                   "xui.asyRun(function(){alert(arr.join('\\n'));},220);"+
                    "}"
                ]
            },


            beforeDirtyMark:{
                $desc:"在_setDirtyMark调用之前被调用. 返回false将阻止设置脏标志",
                $paras:[
                    $profile,
                    "dirty : Boolean, 脏标志"
                ],
                $snippet:[
                    "var id='xui.temp.absv19'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.Input({value:'111',position:'relative'})).prepend(o2=new xui.UI.Input({value:'111',position:'relative'}));"+
                    "o1.beforeDirtyMark(function(p,dirty){p.getSubNode('INPUT').css('background',dirty?'#00ff00':'');return false;});"+
                    "xui.asyRun(function(){o1.setUIValue('ini');o2.setUIValue('ini');},1000);"+
                    "xui.asyRun(function(){o1.setUIValue('111');o2.setUIValue('111');},2000);"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","absContainer"], {
        prototype:{
            getDragKey:{
                $desc:"获取拖动时的标志键",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.d1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setDragKey('a'); alert(btn.getDragKey())},1000)"+
                    "}"
                ]
            },
            setDragKey:{
                $desc:"设置拖动时的标志键",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.d2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setDragKey('a'); alert(btn.getDragKey())},1000)"+
                    "}"
                ]
            },
            getDropKeys:{
                $desc:"获取鼠标丢下时的标志键",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.d3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Block({position:'relative',border:true}));"+
                    "xui.asyRun(function(){btn.setDropKeys('a:b'); alert(btn.getDropKeys())},1000)"+
                    "}"
                ]
            },
            setDropKeys:{
                $desc:"设置鼠标丢下时的标志键",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.d4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Block({position:'relative',border:true}));"+
                    "xui.asyRun(function(){btn.setDropKeys('a:b'); alert(btn.getDropKeys())},1000)"+
                    "}"
                ]
            },
            addPanel:{
                $desc:"添加一个面板",
                $paras:[
                    "paras [必需参数] : 键值对",
                    "children [必需参数] : Array, 面板的子控件",
                    "item [可选参数] : Object, 面板子项对象"
                ],
                $snippet:[
                    "var id='xui.temp.d5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "xui(id).prepend(panel=new xui.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new xui.UI.Button);"+
                    "xui(id).prepend(tabs=new xui.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "xui.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            dumpContainer:{
                $desc:"移除容器内部所有内容",
                $rtn:"[self]",
                $paras:[
                    "subId [可选参数] : String, 决定哪个subid下面的子控件会被移除, [true]表示移除所有. 默认为[true]"
                ]
            },
            removePanel:{
                $desc:"移除面板",
                $snippet:[
                    "var id='xui.temp.d6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "xui(id).prepend(panel=new xui.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new xui.UI.Button);"+
                    "xui(id).prepend(tabs=new xui.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "xui.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            getPanelPara:{
                $desc:"获取面板参数",
                $rtn:"Object",
                $snippet:[
                    "var id='xui.temp.d8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "xui(id).prepend(panel=new xui.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new xui.UI.Button);"+
                    "xui(id).prepend(tabs=new xui.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "xui.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            getPanelChildren:{
                $desc:"获取面板的子控件",
                $rtn:"Array",
                $snippet:[
                    "var id='xui.temp.d9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "xui(id).prepend(panel=new xui.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new xui.UI.Button);"+
                    "xui(id).prepend(tabs=new xui.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "xui.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            getOverflow:{
                $desc:"获取当前对象容器的CSS overflow属性",
                $rtn:"String"
            },
            setOverflow:{
                $desc:"设置当前对象容器的CSS overflow属性,并反映到界面",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'auto','hidden','visible','' ",
                    $force
                ]
            },
            getPanelBgCrl:{
                $desc:"获得容器的背景色属性",
                $rtn:"String"
            },
            setPanelBgCrl:{
                $desc:"设置容器的背景色属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getPanelBgImg:{
                $desc:"获得容器的背景图像属性",
                $rtn:"String"
            },
            setPanelBgImg:{
                $desc:"容器的背景图像属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getPanelBgImgPos:{
                $desc:"获得容器的背景图像偏移属性",
                $rtn:"String"
            },
            setPanelBgImgPos:{
                $desc:"设置容器的背景图像偏移属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getPanelBgImgRepeat:{
                $desc:"获得容器的背景图像重复属性",
                $rtn:"String"
            },
            setPanelBgImgRepeat:{
                $desc:"设置容器的背景图像重复属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getPanelBgImgAttachment:{
                $desc:"得到的背景图像附着属性",
                $rtn:"String"
            },
            setPanelBgImgAttachment:{
                $desc:"设置容器的背景图像附着属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getConDockPadding:{
                $desc:"得到容器中子控件停靠的内留白",
                $rtn:"Object"
            },
            setConDockPadding:{
                $desc:"设置容器中子控件停靠的内留白",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object. {left:,top:,bottom:right}",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui751'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block;xui(id).prepend(block=new xui.UI.Block({width:200,height:200,conDockPadding:{left:10,top:20,right:10,bottom:20},conDockSpacing:{width:10,height:20}}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',capton:'top'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',capton:'top'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'fill',capton:'fill'}));"+
                    "}"
                ]
            },
            getConDockSpacing:{
                $desc:"得到容器中子控件停靠的间距",
                $rtn:"Object"
            },
            setConDockSpacing:{
                $desc:"设置容器中子控件停靠的间距",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object. {width:,height:}",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui751'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block;xui(id).prepend(block=new xui.UI.Block({width:200,height:200,conDockPadding:{left:10,top:20,right:10,bottom:20},conDockSpacing:{width:10,height:20}}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',capton:'top'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',capton:'top'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'fill',capton:'fill'}));"+
                    "}"
                ]
            },
            getConDockFlexFill:{
                $desc:"得到容器中子控件停靠是否应用柔性填充（次轴方向）",
                $rtn:"Object"
            },
            setConDockFlexFill:{
                $desc:"设置容器中子控件停靠是否应用柔性填充（次轴方向）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui750'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block;xui(id).prepend(block=new xui.UI.Block({width:200,conDockFlexFill:'both'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'dockIgnoreFlexFill:true',dockIgnoreFlexFill:true}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'dockIgnoreFlexFill:false'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'dockIgnoreFlexFill:false'}));"+
                    "}"
                ]
            },
            getConDockStretch:{
                $desc:"得到容器中子控件停靠的延展（主轴方向）参数",
                $rtn:"String"
            },
            setConDockStretch:{
                $desc:"设置容器中子控件停靠的延展（主轴方向）参数. 子容器的dockStretch参数可以覆盖本选项功能",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui750'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block;xui(id).prepend(block=new xui.UI.Block({width:200,conDockStretch:'0.25'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'25%'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'25%'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'50%',dockStretch:0.5}));"+
                    "}"
                ]
            }, 
            onHotKeydown:{
                $desc:"当热键按下时被调用",
                $paras:[
                    $profile,
                    "keyboard : Object, keyboard 对象",
                    "e : Event, DOM 事件",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.c1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var w, arr;xui(id).prepend(w=new xui.UI.Widget({position:'relative'}));"+
                    "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(xui.create('<input />'));"+
                    "w.onHotKeydown(function( profile, key, e, src ){arr=[];arr.push(['onHotKeydown',key.key,key.ctrlKey,key.shiftKey,key.altKey])});"+
                    "w.onHotKeypress(function( profile, key, e, src ){arr.push(['onHotKeypress',,key.key,key.ctrlKey,key.shiftKey,key.altKey]); });"+
                    "w.onHotKeyup(function( profile, key, e, src ){arr.push(['onHotKeyup',,key.key,key.ctrlKey,key.shiftKey,key.altKey]);alert(arr);});"+
                    "}"
                ]
            },
            onHotKeyup:{
                $desc:"当热键弹起时被调用.",
                $paras:[
                    $profile,
                    "keyboard : Object, keyboard 对象",
                    "e : Event, DOM 事件",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.c2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var w, arr;xui(id).prepend(w=new xui.UI.Widget({position:'relative'}));"+
                    "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(xui.create('<input />'));"+
                    "w.onHotKeydown(function( profile, key, src ){arr=[];arr.push(['onHotKeydown',,key.key,key.ctrlKey,key.shiftKey,key.altKey])});"+
                    "w.onHotKeypress(function( profile, key, src ){arr.push(['onHotKeypress',,key.key,key.ctrlKey,key.shiftKey,key.altKey]); });"+
                    "w.onHotKeyup(function( profile, key, src ){arr.push(['onHotKeyup',,key.key,key.ctrlKey,key.shiftKey,key.altKey]);alert(arr);});"+
                    "}"
                ]
            },
            onHotKeypress:{
                $desc:"当热键被按后调用",
                $paras:[
                    $profile,
                    "keyboard : Object, keyboard 对象",
                    "e : Event, DOM 事件",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.c3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var w, arr;xui(id).prepend(w=new xui.UI.Widget({position:'relative'}));"+
                    "w.setCustomStyle('KEY','border:solid 1px').getSubNode('BORDER').append(xui.create('<input />'));"+
                    "w.onHotKeydown(function( profile, key, src ){arr=[];arr.push(['onHotKeydown',,key.key,key.ctrlKey,key.shiftKey,key.altKey])});"+
                    "w.onHotKeypress(function( profile, key, src ){arr.push(['onHotKeypress',,key.key,key.ctrlKey,key.shiftKey,key.altKey]); });"+
                    "w.onHotKeyup(function( profile, key, src ){arr.push(['onHotKeyup',,key.key,key.ctrlKey,key.shiftKey,key.altKey]);alert(arr);});"+
                    "}"
                ]
            },
            onDragEnter:{
                $desc:"当用户拖动某个对象到该对象上空时",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "dragKey : String, 被拖动物体的拖动标志串",
                    "dragData : Object, 拖动物体代表的数据",
                    "item : Object, 进入的子项对象.可能为空"
                ],
                $snippet:[
                    "var id='xui.temp.ab1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new xui.UI.Button({position:'relative'})).prepend(btn2=new xui.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            onDragLeave:{
                $desc:"当用户拖动某个对象离开该对象上空时",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "dragKey : String, 被拖动物体的拖动标志串",
                    "dragData : Object, 拖动物体代表的数据",
                    "item : Object, leave的子项对象.可能为空"
                ],
                $snippet:[
                    "var id='xui.temp.ab2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new xui.UI.Button({position:'relative'})).prepend(btn2=new xui.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]

            },
            onDrop:{
                $desc:"当用户拖动某个对象在该对象上空放下时",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "dragKey : String, 被拖动物体的拖动标志串",
                    "dragData : Object, 拖动物体代表的数据",
                    "item : Object, drop到的子项对象.可能为空"
                ],
                $snippet:[
                    "var id='xui.temp.ab3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new xui.UI.Button({position:'relative'})).prepend(btn2=new xui.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            beforeDrop:{
                $desc:"在用户拖动某个对象在该对象上空放下前调用,如返回 false,onDrop和afterDrop不会调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "dragKey : String, 被拖动物体的拖动标志串",
                    "dragData : Object, 拖动物体代表的数据",
                    "item : Object, drop到的子项对象.可能为空"
                ]
            },
            afterDrop:{
                $desc:"在用户拖动某个对象在该对象上空放下后调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "dragKey : String, 被拖动物体的拖动标志串",
                    "dragData : Object, 拖动物体代表的数据",
                    "item : Object, drop到的子项对象.可能为空"
                ]
            },
            onDropMarkClear:{
                $desc:"当丢放标志被清除时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "dragKey : String, 被拖动物体的拖动标志串",
                    "dragData : Object, 拖动物体代表的数据",
                    "item : Object, 进入的子项对象.可能为空"
                ],
                $snippet:[
                    "var id='xui.temp.ab4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new xui.UI.Button({position:'relative'})).prepend(btn2=new xui.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            onDropMarkShow:{
                $desc:"当丢放标志被显示时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "dragKey : String, 被拖动物体的拖动标志串",
                    "dragData : Object, 拖动物体代表的数据",
                    "item : Object, 进入的子项对象.可能为空"
                ],
                $snippet:[
                    "var id='xui.temp.ab5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new xui.UI.Button({position:'relative'})).prepend(btn2=new xui.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            onDropTest:{
                $desc:"当判断该对象是否接受拖动时被调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "dragKey : String, 被拖动物体的拖动标志串",
                    "dragData : Object, 拖动物体代表的数据",
                    "item : Object, 进入的子项对象.可能为空"
                ],
                $snippet:[
                    "var id='xui.temp.ab61'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({position:'relative',width:'200',border:true,dropKeys:['test']})).prepend(btn1=new xui.UI.Button({position:'relative'})).prepend(btn2=new xui.UI.Button({position:'relative'}));"+
                    "btn2.get(0).$noDrop=true;"+
                    "btn1.draggable('test',btn1.getDomId());"+
                    "btn2.draggable('test','abc');"+
                    "block.onDragEnter(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragEnter')});"+
                    "block.onDragLeave(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDragLeave')});"+
                    "block.onDrop(function(p,e,n,k,d,i){block.setHtml(k+':'+d+' onDrop')});"+
                    "block.onDropMarkClear(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#fff')});"+
                    "block.onDropMarkShow(function(p,e,n,k,d,i){block.getSubNode('PANEL').css('background','#ccc')});"+
                    "block.onDropTest(function(p,e,n,k,d,i){return d!='abc';});"+
                    "}"
                ]
            },
            onStartDrag:{
                $desc:"当用户开始拖动该对象时被触发",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.ab661'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var list1,list2;xui(id).prepend(list1=new xui.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']})).prepend(list2=new xui.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']}));"+
                    "list2.onStartDrag(function(p,e,n){return false;});"+
                    "list1.onStartDrag(function(p,e,n){xui.message('onStartDrag');});"+
                    "list1.onDragStop(function(p,e,n){xui.message('onDragStop');});"+
                    "}"
                ]
            },
            onGetDragData:{
                $desc:"当用户开始拖动该对象时(这时候会取得拖拽的数据)调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.ab661-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var list1,list2;xui(id).append(list1=new xui.UI.List({position:'relative',width:'200',height:50,border:true,dragKey:'test',items:['drag me and drop to the below list']})).append(list2=new xui.UI.List({position:'relative',width:'200',height:50,border:true,dropKeys:'test',items:['drop here']}));"+
                    "list1.onGetDragData(function(p,e,n){return {key:'value'};});"+
                    "list2.onDrop(function(p, e, node, key, data){xui.log(data.data);});"+
                    "}"
                ]
            },
            onDragstop:{
                $desc:"当用户结束拖动该对象时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.ab662'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var list1,list2;xui(id).prepend(list1=new xui.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']})).prepend(list2=new xui.UI.List({position:'relative',width:'200',border:true,dragKey:'test',items:['aa','bb','cc']}));"+
                    "list2.onStartDrag(function(p,e,n){return false;});"+
                    "list1.onStartDrag(function(p,e,n){xui.message('onStartDrag');});"+
                    "list1.onDragStop(function(p,e,n){xui.message('onDragStop');});"+
                    "}"
                ]
            },
            beforeClickEffect:{
                $desc:"在用户单击控件的某一部分,控件响应该事件,要改变外观（例如反白等）前被调用. 返回false时, 默认的效果（如反白）将不会被显示",
                $paras:[
                    $profile,
                    "item : Object, 子项对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "type : String, 'mousedown'或'mouseup'"
                ],
                $snippet:[
                    "var id='xui.temp.ab7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).append(btn=new xui.UI.Button({position:'relative'}));"+
                    "btn.beforeClickEffect(function(p,i,e,s,t){xui([s]).css('border',t=='mousedown'?'solid 1px;':'');return false;});"+
                    "}"
                ]
            },
            beforeHoverEffect:{
                $desc:"在鼠标悬停在控件的某一部分上,控件响应该事件,要改变外观（例如反白等）前被调用. 返回false时, 默认的效果（如反白）将不会被显示",
                $paras:[
                    $profile,
                    "item : Object, 子项对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "type : String, 'mouseover'或'mouseout'"
                ],
                $snippet:[
                    "var id='xui.temp.ab8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).append(btn=new xui.UI.Button({position:'relative'}));"+
                    "btn.beforeHoverEffect(function(p,i,e,s,t){xui([s]).css('border',t=='mouseover'?'solid 1px;':'');return false;});"+
                    "}"
                ]
            },
            beforeNextFocus:{
                $desc:"在下一个控件获取焦点时调用. 返回false可以阻止下一个控件获取焦点",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "k : Object, {key:按键字符, type:事件种类, ctrlKey: ctrl键状态, shiftKey: shift 键状态, altKey:alt 键状态}",
                    "shift: Boolean, 指示用户是否按下了Shift键",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.ab9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).append(new xui.UI.Button({position:'relative'})).append(new xui.UI.Button({position:'relative'})).append(btn=new xui.UI.Button({position:'relative'})).append(new xui.UI.Button({position:'relative'}));"+
                    "btn.beforeNextFocus(function(){return false;});"+
                    "}"
                ]
            },
            beforeInputAlert:{
                $desc:"在容器表单中的一个控件出现警示框前调用. 返回false可以阻止警示框弹出",
                $paras:[
                    $profile,
                    "ctrlPrf : xui.UIProfile, 引起警示的输入控件",
                    "type : String, 警示类型. invalid or required"
                ]
            },
            beforeFormReset:{
                $desc:"在容器表单重置前调用. 返回false可以阻止表单重置",
                $paras:[
                    $profile,
                    "elems : xui.absValue, 所有输入控件",
                    "subId: String, 子容器id"
                ]
            },
            afterFormReset:{
                $desc:"在容器表单重置后调用",
                $paras:[
                    $profile,
                    "elems : xui.absValue, 所有输入控件",
                    "subId: String, 子容器id"
                ]
            },
            beforeFormSubmit:{
                $desc:"在容器表单提交前调用. 返回false可以阻止表单重置",
                $paras:[
                    $profile,
                    "data : Ojbect, 要提交的数据",
                    "subId: String, 子容器id"
                ]
            },
            afterFormSubmit:{
                $desc:"在容器表单提交后调用",
                $paras:[
                    $profile,
                    "data : Ojbect, 要提交的数据",
                    "subId: String, 子容器id"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI 类",
        getFromDom:{
            $desc:"从一个指定的DOM元素的id上获取一个UI Object",
            $rtn:"xui.UI",
            $paras:[
                "id [必需参数] : String, DOM元素或id"
            ],
            $snippet:[
                "alert(xui.UI.getFromDom('xui.UI.TreeBar-CMD:a:1').getAlias());"
            ]
        },
        setDftProp:{
            $desc:"指定所有控件类的默认属性",
            $rtn:"xui.UI",
            $paras:[
                "prop [必需参数] : 键值对"
            ]
        },
        buildCSSText:{
            $desc:"由指定的键值对生成CSS样式",
            $rtn:"String",
            $paras:[
                "hash [必需参数] : 键值对"
            ],
            $snippet:[
                "alert(xui.UI.Button.buildCSSText({KEY:{left:xui.browser.ie?0:null,overflow:xui.browser.gek?'auto':null,'font-size':'12px'},BORDER:{'_line-height':10,'-moz-display':'none'}}));"+
                "alert(xui.UI.Button.buildCSSText({KEY:{left:xui.browser.ie?0:null,overflow:xui.browser.gek?'auto':null,'font-size':'12px'},BORDER:{'_line-height':10,'-moz-display':'none'}},'mac'));"
            ]
        },
        adjustData:{
            $desc:"调整输入的键值对,输出合适的数据格式以便UI控件生成",
            $rtn:"Object",
            $paras:[
                "profile [必需参数] : 目标profile",
                "hashIn [必需参数] : 键值对, 输入参数",
                "hashOut [可选参数] : 键值对, 输出参数"
            ],
            $snippet:[
                "alert(xui.serialize(xui.UI.adjustData(null, {a:1,b:2,c:'$date.MS',d:'@xui.ini.path',renderer:function(){return 'cap';}})))"
            ]
        },
        addTemplateKeys:{
            $desc:"添加一系列模板键到当前的UI控件",
            $rtn:'[self]',
            $paras:[
                "arr [必需参数] : Array, 模板键数组"
            ],
            $snippet:[
                "alert(xui.serialize(xui.UI.Div.$Keys)); alert(xui.serialize(xui.UI.Div.addTemplateKeys(['A','B']).$Keys))"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        getAppearance:{
            $desc:"获取控件外表对象",
            $rtn:'Object',
            $snippet:[
                "alert(xui.serialize(xui.UI.Div.getAppearance()))"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        getTemplate:{
            $desc:"从一个缓存id中设置获取模板对象",
            $rtn:'Object',
            $paras:[
                "cacheId [可选参数] : String"
            ],
            $snippet:[
                "alert(xui.serialize(xui.UI.Div.getTemplate()))"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        getBehavior:{
            $desc:"获取控件行为对象",
            $rtn:'Object',
            $snippet:[
                "alert(xui.serialize(xui.UI.Link.getBehavior()))"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        setAppearance:{
            $desc:"设置控件外表对象",
            $rtn:'[self]',
            $paras:[
                "hash [必需参数] : 键值对"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        setTemplate:{
            $desc:"设置一个模板对象到指定的缓存id中",
            $rtn:'[self]',
            $paras:[
                "hash [必需参数] : 键值对",
                "cacheId [可选参数] : String"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        setBehavior:{
            $desc:"设置行为对象",
            $rtn:'[self]',
            $memo:"一般情况下,程序员无需直接调用该函数"
        },
        cacheData:{
            $desc:"缓存数据或移除缓存数据.并为该缓存数据指定一个唯一标志",
            $rtn:'[self]',
            $paras:[
                "key [必需参数] : String, 缓存数据的唯一标志",
                "data [可选参数] : Object. 如果设置为undefined, 则移除标志为key的缓存数据"
            ],
            $snippet:[
                "xui.UI.cacheData('a',1); alert(xui.UI.getCachedData('a')); xui.UI.cacheData('a')"
            ]
        },
        getCachedData:{
            $desc:"获取指定标志的缓存数据",
            $rtn:"Object",
            $paras:[
                "key [必需参数] : String, cache key"
            ],
            $snippet:[
                "xui.UI.cacheData('a',1); alert(xui.UI.getCachedData('a')); xui.UI.cacheData('a')"
            ]
        },
        getDragData:{
            $desc:"获取拖动数据",
            $rtn:"Object",
            $paras:[
                "profile [必需参数] : xui.Profile, 目标概要对象",
                "event: DOM 事件对象",
                "node [必需参数] : 相关的DOM元素"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数. 该函数会被部分子类覆盖"
        },
        getDragKey:{
            $desc:"获取拖动时的键名字",
            $rtn:"String",
            $paras:[
                "profile [必需参数] : 目标概要对象",
                "node [必需参数] : 相关的DOM元素"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数. 该函数会被部分子类覆盖"
        },
        getDropKeys:{
            $desc:"设置拖动时的键名字",
            $rtn:"Array",
            $paras:[
                "profile [必需参数] : xui.UIProfile, 目标概要对象",
                "node [必需参数] : String, 事件所属DOM元素的xid"
            ],
            $memo:"一般情况下,程序员无需直接调用该函数. 该函数会被部分子类覆盖"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getAutoTips:{
              $desc:"得到当前控件是否会自动显示文字提示",
              $rtn:"Boolean"
            },
            setAutoTips:{
              $desc:"设置当前控件是否会自动显示文字提示",
              $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getClassName:{
              $desc:"得到css类",
              $rtn:"String"
            },
            setClassName:{
                $desc:"设置css类",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            hoverPop:{
                $desc:"设置鼠标悬停弹出窗口",
                 $rtn:"[self]",
                $paras:[
                    "node [必需参数]  : Object/xui.Dom/Element. 弹出窗口",
                    "type [可选参数] : String, 参考houverPosType属性, 如果为null, 取消设置",
                    "beforePop[可选参数] : Function(prf, node, e, src, item), 窗口弹出之前调用",
                    "beforeHide[可选参数] : Function(prf, node, e, src, trigger, item), 窗口隐藏之前调用",
                     "parent [可选参数] : xui.Dom, 父窗口. 默认为[document.body]",
                    "groupid[Optional] : String.  组标识 id"
                ]
            },
            getTheme:{
                $desc:"获取当前控件的皮肤关键字",
                $rtn:"String"
            },
            setTheme:{
                $desc:"通过设置当前控件的皮肤关键字来更改控件的皮肤",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String, 皮肤键字符串"
                ]
            },
            busy:{
                $desc:"将鼠标显示为沙漏(并将一个div覆盖在当前控件上)",
                $rtn:"[self]",
                $paras:[
                    "coverAll [可选参数] : Boolean, 是否遮罩全部UI界面",
                    "html [可选参数] : String, 说明html字符串",
                    "key [可选参数] : String, 遮罩的父key. 默认为 'BORDER'",
                    "subId [可选参数] : String, 遮罩子id"
                ]
            },
            free:{
                $desc:"将鼠标显示为正常(并将覆盖div移除)",
                $rtn:"[self]"
            },
            reLayout:{
                $desc:"重新布局本控件",
                $rtn:"[self]",
                $paras:[
                    "force [可选参数] : Boolean, 是否强制"
                ]
            },
            getParent:{
                $desc:"得到目前控件的所有父控件",
                $rtn:"xui.UI"
            },
            getChildrenId:{
                $desc:"得到目前控件在父控件的容器子项",
                $rtn:"String"
            },
            getChildren:{
                $desc:"得到目前控件的所有子控件",
                $rtn:"xui.UI",
                $paras:[
                    "subId [可选参数] : String, 子容器的id，不指定或[true]表示全部子容器",
                    "all [可选参数] : Boolean, 是否返回所有层对象"
                ],
                $snippet:[
                    "var id='xui.temp.ui-1e'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var tabs;xui(id).prepend(tabs=xui.create({key:'xui.UI.Tabs',properties:{dock:'none',width:200,height:100,position:'relative',items:['a','b','c'],value:'a'},children:[[{key:'xui.UI.Button'},'a'],[{key:'xui.UI.Button'},'b'],[{key:'xui.UI.Button'},'c']]}));"+
                    "xui.asyRun(function(){alert(tabs.getChildren().get().length);alert(tabs.getChildren('a').get().length);},1000);"+
                    "}"
                ]
            },
            toHtml:{
                $desc:"得到控件的html字符串",
                $rtn:"String",
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').boxing().toHtml())"
                ]
            },
            getRenderer:{
                $desc:"获取渲染函数",
                $rtn:"Function",
                $snippet:[
                    "var id='xui.temp.ui-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var link=new xui.UI.Link({position:'relative'});"+
                    "link.setRenderer(function(item){return '['+item.caption+']'});"+
                    "xui(id).prepend(link);"+
                    "xui.asyRun(function(){alert(link.getRenderer());},1000);"+
                    "}"
                ]
            },
            setRenderer:{
                $desc:"设置渲染函数",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Function",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var link=new xui.UI.Link({position:'relative'});"+
                    "link.setRenderer(function(item){return '<span style=\"width:15px;height:15px;background:url(img/img.gif)\"></span> ['+item.caption+']'});"+
                    "xui(id).prepend(link);"+
                    "xui.asyRun(function(){alert(link.getRenderer());},1000);"+
                    "}"
                ]
            },
            getContainer:{
                $desc:"获得控件的容器(xui.Dom)对象,如果没有容器返回根节点",
                $rtn:"xui.Dom",
                $paras:[
                    "subId [可选参数] : 容器的sub id"
                ]
            },
            getRoot:{
                $desc:"获取控件的根节点(xui.Dom)对象",
                $rtn:"xui.Dom",
                $snippet:[
                "alert(xui.UIProfile.getFromDom('btnLang').boxing().getRoot());"
                ]
            },
            getRootNode:{
                $desc:"获取控件的根节点DOM元素",
                $rtn:"Element",
                $snippet:[
                "alert(xui.UIProfile.getFromDom('btnLang').boxing().getRootNode());"
                ]
            },
            append:{
                $desc:"添加一系列的控件添加到到当前控件对象上",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.UIProfile[],  子控件的 xui.UI 对象(里面可以包括多个控件概要对象)",
                    "subId [可选参数] : String, subid会指示子控件加到那个DOM节点上.这个参数可以为 [false] ,表示控件不会做为子控件添加到当前控件对象上,只进行在DOM界面上添加UI的工作"
                ],
                $snippet:[
                    "var id='xui.temp.ui2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({border:true}));"+
                    "block.append(btn1=new xui.UI.Button({position:'relative'})).append(btn2=new xui.UI.Button({position:'relative'}), false);"+
                    "alert(btn1.get(0).parent===block.get(0));alert(btn2.get(0).parent);"+
                    "}"
                ]
            },
            removeChildren:{
                $desc:"移除内部所有的子控件",
                $rtn:"[self]",
                $paras:[
                    "subId [可选参数] : String, 决定哪个subid下面的子控件会被移除, [true]表示移除所有. 默认为[true]",
                    "bDestroy [可选参数] : Boolean, 是否移除的子控件会被销毁. 默认为[false]"
                ],
                $snippet:[
                    "var id='xui.temp.ui2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({border:true}));"+
                    "block.append(btn1=new xui.UI.Button({position:'relative'})).append(btn2=new xui.UI.Button({position:'relative'}), false);"+
                    "xui.asyRun(function(){block.removeChildren(true,true)},1000)"+
                    "}"
                ]
            },
            clone:{
                $desc:"克隆这个控件对象（里面可以包括多个控件概要对象）",
                $rtn:"xui.UI",
                $snippet:[
                    "var id='xui.temp.ui3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn1,btn2;xui(id).prepend(block=new xui.UI.Block({position:'relative',border:true}));"+
                    "block.append(btn1=new xui.UI.Button({position:'relative'})).append(btn2=new xui.UI.Button({position:'relative'}), false);"+
                    "\n // Notice: here, only btn1 will be cloned :\n"+
                    "xui(id).append(block.clone())"+
                    "}"
                ]
            },
            destroy:{
                $desc:"销毁当前的对象",
                $snippet:[
                    "var id='xui.temp.ui4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block;xui(id).prepend(block=new xui.UI.Block({position:'relative',border:true}));"+
                    "xui.asyRun(function(){block.destroy();},1000);"+
                    "}"
                ]
            },
            isDestroyed:{
                $desc:"判断当前对象是否已被销毁"
            },
            draggable:{
                $desc:"允许或禁止用户拖动当前对象",
                $rtn:"[self]",
                $paras:[
                    "dragKey [可选参数] : String, 拖动时的标志键",
                    "dragData [可选参数] : Object, 拖动时的数据",
                    "key [可选参数] : String, 模板键,指示哪一个DOM节点回作为可拖拽的目标节点. 默认为 'KEY'",
                    "option [可选参数] : Object, 拖动参数,参见<strong>xui.DragDrop.startDrag</strong>中profile的具体内容",
                    "target [可选参数] : xui.Dom, 拖动目标"
                ],
                $snippet:[
                    "var id='xui.temp.ui5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block,btn;xui(id).prepend(block=new xui.UI.Block({position:'relative',border:true,dropKeys:['test']})).prepend(btn=new xui.UI.Button({position:'relative'}));"+
                    "block.onDrop(function(profile, e, node, key, data){var btn=xui.UIProfile.getFromDom(data).boxing();profile.boxing().append(btn); btn.draggable(false)});"+
                    "btn.draggable('test',btn.getDomId());"+
                    "}"
                ]
            },
            getLeft:{
                $desc:"获取控件的左边坐标.（相对于父控件的距离,单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setLeft(20); alert(btn.getLeft())},1000)"+
                    "}"
                ]
            },
            setLeft:{
                $desc:"设置控件的左边坐标.（相对于父控件的距离,单位px）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setLeft(20); alert(btn.getLeft())},1000)"+
                    "}"
                ]
            },
            getRight:{
                $desc:"获取控件的右边坐标.（相对于父控件的距离,单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setRight(20); alert(btn.getRight())},1000)"+
                    "}"
                ]
            },
            setRight:{
                $desc:"设置控件的右边坐标.（相对于父控件的距离,单位px）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setRight(20); alert(btn.getRight())},1000)"+
                    "}"
                ]
            },
            getTop:{
                $desc:"获取控件的上边沿坐标.（相对于父控件的距离,单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTop(20); alert(btn.getTop())},1000)"+
                    "}"
                ]
            },
            setTop:{
                $desc:"设置控件的上边沿坐标.（相对于父控件的距离,单位px）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTop(20); alert(btn.getTop())},1000)"+
                    "}"
                ]
            },
            getBottom:{
                $desc:"获取控件的下边沿坐标.（相对于父控件的距离,单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTop('auto').setBottom(20); alert(btn.getBottom())},1000)"+
                    "}"
                ]
            },
            setBottom:{
                $desc:"设置控件的下边沿坐标.（相对于父控件的距离,单位px）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTop('auto').setBottom(20); alert(btn.getBottom())},1000)"+
                    "}"
                ]
            },
            getWidth:{
                $desc:"获取控件的宽度.（单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setWidth(100); alert(btn.getWidth())},1000)"+
                    "}"
                ]
            },
            setWidth:{
                $desc:"设置控件的宽度.（单位px）",
                $rtn:"[self]",
                 $paras:[
                    "value [必需参数] : nonnegative Number",
                    $force
                ],
               $snippet:[
                    "var id='xui.temp.ui19'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setWidth(100); alert(btn.getWidth())},1000)"+
                    "}"
                ]
            },
            getHeight:{
                $desc:"获取控件的高度.（单位px）",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui20'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setHeight(100); alert(btn.getHeight())},1000)"+
                    "}"
                ]
            },
            setHeight:{
                $desc:"设置控件的高度.（单位px）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 非负 Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui21'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setHeight(100); alert(btn.getHeight())},1000)"+
                    "}"
                ]
            },
            getDisplay:{
                $desc:"获取控件的显示(display)属性",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ui22'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setDisplay('none'); alert(btn.getDisplay())},1000)"+
                    "}"
                ]
            },
            setDisplay:{
                $desc:"设置控件的显示(display)属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 显示(display)属性的CSS值",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui23'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setDisplay('none'); alert(btn.getDisplay())},1000)"+
                    "}"
                ]
            },
            getVisibility:{
                $desc:"获取控件的可见性",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ui24'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setVisibility('hidden'); alert(btn.getVisibility())},1000)"+
                    "}"
                ]
            },
            setVisibility:{
                $desc:"设置控件的可见性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : corresponding CSS value",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui25'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setVisibility('hidden'); alert(btn.getVisibility())},1000)"+
                    "}"
                ]
            },
            getZIndex:{
                $desc:"获取控件的z-index,该属性决定了控件之间的覆盖关系",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui26'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button).prepend(new xui.UI.Button({zIndex:10}));"+
                    "xui.asyRun(function(){btn.setZIndex(20); alert(btn.getZIndex())},1000)"+
                    "}"
                ]
            },
            setZIndex:{
                $desc:"设置控件的z-index,该属性决定了控件之间的覆盖关系",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : corresponding CSS value",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui27'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button).prepend(new xui.UI.Button({zIndex:10}));"+
                    "xui.asyRun(function(){btn.setZIndex(20); alert(btn.getZIndex())},1000)"+
                    "}"
                ]
            },
            getSelectable:{
                $desc:"获取控件的selectable属性,该属性决定了控件的html内容是否可以选定",
                $rtn:"Boolean"
            },
            setSelectable:{
                $desc:"设置控件的selectable属性,该属性决定了控件的html内容是否可以选定",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getPosition:{
                $desc:"获取控件的位置属性,和CSS中的position对应",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ui25'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setPosition('static'); alert(btn.getPosition())},1000)"+
                    "}"
                ]
            },
            setPosition:{
                $desc:"设置控件的位置属性,和CSS中的position对应",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : corresponding CSS value",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui28'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setPosition('static'); alert(btn.getPosition())},1000)"+
                    "}"
                ]
            },
            getTabindex:{
                $desc:"获取tab键值",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui29'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTabindex('10'); alert(btn.getTabindex())},1000)"+
                    "}"
                ]
            },
            setTabindex:{
                $desc:"设置tab键值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui30'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTabindex('10'); alert(btn.getTabindex())},1000)"+
                    "}"
                ]
            },
            getTips:{
                $desc:"获取控件的提示文字(当鼠标停留时会显示该文字)",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ui44'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTips('a b c d'); alert(btn.getTips())},1000)"+
                    "}"
                ]
            },
            setTips:{
                $desc:"设置控件的提示文字(当鼠标停留时会显示该文字)",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui45'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setTips('a b c d'); alert(btn.getTips())},1000)"+
                    "}"
                ]
            },
            getDisableTips:{
                $desc:"判断控件是否已经去掉tips效果",
                $rtn:"Boolean"
            },
            setDisableTips:{
                $desc:"设置控件是否去掉tips效果",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getDisableClickEffect:{
                $desc:"判断控件是否已经去掉鼠标点击效果",
                $rtn:"Boolean"
            },
            setDisableClickEffect:{
                $desc:"设置控件是否去掉鼠标点击效果",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getDisableHoverEffect:{
                $desc:"判断控件是否已经去掉鼠标Hover效果",
                $rtn:"Boolean"
            },
            setDisableHoverEffect:{
                $desc:"设置控件是否去掉鼠标Hover效果",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getSpaceUnit:{
                $desc:"得到控件的空间（位置、大小等）单元",
                $rtn:"String"
            },
            setSpaceUnit:{
                $desc:"设置控件的空间（位置、大小等）单元",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. '', 'px' 或 'em', 默认为空",
                    $force
                ]
            },
            getDisabled:{
                $desc:"判断控件是否变灰(不可用)",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.ui46'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setDisabled(true); alert(btn.getDisabled())},1000)"+
                    "}"
                ]
            },
            setDisabled:{
                $desc:"设置控件是否变灰(不可用)",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui47'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setDisabled(true); alert(btn.getDisabled())},1000)"+
                    "}"
                ]
            },
            getLocked:{
                $desc:"控件是否为锁定状态",
                $rtn:"Boolean"
            },
            setLocked:{
                $desc:"设置控件是否为锁定状态",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean, 默认为[false]",
                    $force
                ]
            },
            getDefaultFocus:{
                $desc:"控件是否为自动获得焦点",
                $rtn:"Boolean"
            },
            setDefaultFocus:{
                $desc:"设置控件是否为自动获得焦点",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean, 默认为[false]",
                    $force
                ]
            },
            getHoverPop:{
                $desc:"获取控件的悬停弹出目标",
                $rtn:"String"
            },
            setHoverPop:{
                $desc:"设置控件的悬停弹出目标",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 弹出目标的别名，弹出目标必须要在当前控件的 host 中",
                    $force
                ]
            },
            getHoverPopType:{
                $desc:"获取控件的悬停弹出类型",
                $rtn:"String"
            },
            setHoverPopType:{
                $desc:"设置控件的悬停弹出类型",
                $rtn:"[self]",
                $paras:[
                    "value [可选参数] : String, 以下之一：'outer','inner','outerleft-outertop','left-outertop','center-outertop','right-outertop','outerright-outertop','outerleft-top','left-top','center-top','right-top','outerright-top','outerleft-middle','left-middle','center-middle','right-middle','outerright-middle','outerleft-bottom','left-bottom','center-bottom','right-bottom','outerright-bottom','outerleft-outerbottom','left-outerbottom','center-outerbottom','right-outerbottom','outerright-outerbottom', 向前兼容也可以是1~4,12,21. 默认为outer",
                    $force
                ]
            },
            getDock:{
                $desc:"获取控件的停靠属性（相对于父控件的停靠位置）",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ui50'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "alert(btn.getDock())"+
                    "}"
                ]
            },
            setDock:{
                $desc:"设置控件的停靠属性（相对于父控件的停靠位置）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui51'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button());"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "xui.Thread(null,[function(id){if(!arr.length)return xui.Thread.abort(id); var type=arr.shift();btn.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getDockFloat:{
                $desc:"判断否是停靠漂浮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.ui52'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "alert(btn.getDockFloat())"+
                    "}"
                ]
            },
            setDockFloat:{
                $desc:"设置否是停靠漂浮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui53'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var div1,btn2;xui(id).prepend(div1=new xui.UI.Div({dock:'top',height:20})).prepend(btn2=new xui.UI.Button({zIndex:10}));"+
                    "div1.setDockFloat(true).setCustomStyle({KEY:'background:#00ff00'});"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "xui.Thread(null,[function(id){if(!arr.length)return xui.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}",
                    "var id='xui.temp.ui54'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var div1,btn2;xui(id).prepend(div1=new xui.UI.Div({dock:'top',height:20})).prepend(btn2=new xui.UI.Button({zIndex:10}));"+
                    "div1.setDockFloat(false).setCustomStyle({KEY:'background:#00ff00'});"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "xui.Thread(null,[function(id){if(!arr.length)return xui.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getDockMargin:{
                $desc:"获取停靠的外补丁",
                $rtn:"Object",
                $snippet:[
                    "var id='xui.temp.ui60'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "alert(xui.serialize(btn.getDockMargin()))"+
                    "}"
                ]
            },
            setDockMargin:{
                $desc:"设置停靠的外补丁",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : {left:Number,right:Number,top:Number,bottom:Number}",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui61'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button());"+
                    "btn.setDockMargin({left:20,top:20,right:10,bottom:10});"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "xui.Thread(null,[function(id){if(!arr.length)return xui.Thread.abort(id); var type=arr.shift();btn.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}",
                    "var id='xui.temp.ui61-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var div1,btn2;xui(id).prepend(div1=new xui.UI.Div({dock:'top',height:20})).prepend(btn2=new xui.UI.Button({zIndex:10}));"+
                    "div1.setDockMargin({left:20,top:20,right:10,bottom:10}).setCustomStyle({KEY:'background:#00ff00'});"+
                    "var arr=['none','top','bottom','left','right','center','middle','origin','width','height','fill','cover'];"+
                    "xui.Thread(null,[function(id){if(!arr.length)return xui.Thread.abort(id); var type=arr.shift();btn2.setDock(type).setCaption(type);}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getDockOrder:{
                $desc:"获取停靠的优先顺序",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui70'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "alert(btn.getDockOrder())"+
                    "}"
                ]
            },
            setDockOrder:{
                $desc:"设置停靠的优先顺序",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui72'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var div1,btn2;xui(id).prepend(div1=new xui.UI.Div({dock:'top',height:20})).prepend(btn2=new xui.UI.Button({zIndex:10}));"+
                    "div1.setDockOrder(1).setDock('top').setCustomStyle({KEY:'background:#00ff00'});"+
                    "btn2.setDockOrder(2).setDock('top');"+
                    "xui.asyRun(function(){div1.setDockOrder(3)},1000)"+
                    "}"
                ]
            },
            getDockIgnore:{
                $desc:"判断是否停靠忽略（在系统进行停靠计算时会忽略本控件）",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.ui75'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({dock:'fill'}));"+
                    "alert(btn.getDockIgnore())"+
                    "}"
                ]
            },
            setDockIgnore:{
                $desc:"设置是否停靠忽略",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui76'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({dock:'fill'}));"+
                    "xui.asyRun(function(){xui(id).width(200);},1000);"+
                    "xui.asyRun(function(){btn.setDockIgnore(true);xui(id).width(300);},2000);"+
                    "xui.asyRun(function(){btn.setDockIgnore(false);xui(id).width(400);},3000);"+
                    "}"
                ]
            }, 
            getDockStretch:{
                $desc:"得到停靠延展（主轴方向）参数",
                $rtn:"String"
            },
            setDockStretch:{
                $desc:"设置停靠延展（主轴方向）参数，会覆盖父容器的conDockStretch设置）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui750'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block;xui(id).prepend(block=new xui.UI.Block({width:200,conDockStretch:'0.25'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'25%'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'25%'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'50%',dockStretch:0.5}));"+
                    "}"
                ]
            }, 
            getDockIgnoreFlexFill:{
                $desc:"得到停靠次轴方向的柔性忽略",
                $rtn:"String"
            },
            setDockIgnoreFlexFill:{
                $desc:"设置停靠次轴方向的柔性忽略（会忽略父容器的conDockFlexFill设置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui750'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var block;xui(id).prepend(block=new xui.UI.Block({width:200,conDockFlexFill:'both'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'dockIgnoreFlexFill:true',dockIgnoreFlexFill:true}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'dockIgnoreFlexFill:false'}));"+
                    "var btn;block.append(btn=new xui.UI.Button({dock:'top',caption:'dockIgnoreFlexFill:false'}));"+
                    "}"
                ]
            }, 
            getDockMinH:{
                $desc:"获取停靠的最小高度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui77'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({dock:'fill'}));"+
                    "alert(btn.getDockMinH())"+
                    "}"
                ]
            },
            setDockMinH:{
                $desc:"设置停靠的最小高度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui81'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"overflow:visible;border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({dock:'height'}));"+
                    "xui.asyRun(function(){btn.setDockMinH(100);xui(id).height(80);},1000);"+
                    "xui.asyRun(function(){btn.setDockMinH(50);xui(id).height(50);},2000);"+
                    "}"
                ]
            },
            getDockMaxH:{
                $desc:"获取停靠的最大高度",
                $rtn:"Number"
            },
            setDockMaxH:{
                $desc:"设置停靠的最大高度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getDockMinW:{
                $desc:"获取停靠的最小宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ui79'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({dock:'fill'}));"+
                    "alert(btn.getDockMinW())"+
                    "}"
                ]
            },
            setDockMinW:{
                $desc:"设置停靠的最小宽度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ui82'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({dock:'width'}));"+
                    "xui.asyRun(function(){btn.setDockMinW(300);xui(id).width(200);},1000);"+
                    "xui.asyRun(function(){btn.setDockMinW(50);xui(id).width(100);},2000);"+
                    "}"
                ]
            },
            getDockMaxW:{
                $desc:"获取停靠的最大宽度",
                $rtn:"Number"
            },
            setDockMaxW:{
                $desc:"设置停靠的最大宽度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getShowEffects:{
                $desc:"获取控件的出现动画特效",
                $rtn:"Object/String"
            },
            setShowEffects:{
                $desc:"设置控件的出现动画特效",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String or Object",
                    $force
                ]
            },
            getHideEffects:{
                $desc:"获取控件的隐去或销毁动画特效",
                $rtn:"Object/String"
            },
            setHideEffects:{
                $desc:"设置控件的隐去或销毁动画特效",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String or Object",
                    $force
                ]
            },
            getRotate:{
                $desc:"获取控件旋转角度",
                $rtn:"Number"
            },
            setRotate:{
                $desc:"设置控件旋转角度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number. 0~360",
                    $force
                ]
            },
            getDomId:{
                $desc:"获取dom元素的id",
                $rtn:"String",
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').boxing().getDomId())"
                ]
            },
            getSubNode:{
                $desc:"获取带有指定[key]和[subId]的dom元素内部的子节点",
                $rtn:"xui.dom",
                $paras:[
                    "key [必需参数] : String, key string",
                    "subId [可选参数] : String or [true]. [true] for getting all the sub nodes with the specified [key]"
                ],
                $snippet:[
                    "alert(xui.UIProfile.getFromDom('btnLang').boxing().getSubNode('KEY').id());"+
                    "alert(xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').boxing().getSubNode('ITEM','a').id());"+
                    "alert(xui.UIProfile.getFromDom('xui.UI.TreeBar:a:').boxing().getSubNode('ITEM',true).get().length);"
                ],
                $memo:"The [subId] parameter is for those [xui.absList] profiles only"
            },
            setDomId:{
                $desc:"设置DOM元素id",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, id 字符串"
                ],
                $snippet:[
                    "var logo=xui.UIProfile.getFromDom('btnLang').boxing(); alert(logo.getDomId()); logo.setDomId('logo1'); alert(logo.getDomId());logo.setDomId('btnLang'); alert(logo.getDomId());"
                ]
            },
            hide:{
                $desc:"隐藏该控件对象",
                $rtn:"[self]",
                $snippet:[
                    "var logo=xui.UIProfile.getFromDom('btnLang').boxing(); logo.hide(); xui.asyRun(function(){logo.show();},1000);"
                ]
            },
            show:{
                $desc:"显示该控件对象",
                $rtn:"[self]",
                $paras:[
                    "parent [必需参数] : xui.UIProfile/xui.UI/Element/xui.Dom",
                    "subId [可选参数] : String, the sub id that Determines the set of UIProfiles will be added to",
                    "left [可选参数] : Number, 显示的左边坐标",
                    "top [可选参数] : Number, 显示的上边坐标"
                ],
                $snippet:[
                    "var logo=xui.UIProfile.getFromDom('btnLang').boxing(); logo.hide(); xui.asyRun(function(){logo.show();},1000);"
                ]
            },
            refresh:{
                $desc:"刷新组件",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.ui91'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({dock:'width'}));"+
                    "btn.get(0).properties.caption='new caption';"+
                    "xui.asyRun(function(){btn.refresh();},1000);"+
                    "}"
                ]
            },
            render:{
                $desc:"将控件渲染成DOM",
                $rtn:"[self]",
                $paras:[
                    "triggerLayOut [可选参数] : Boolean, 指示是否触发布局. 默认为 [false]"
                ],
                $snippet:[
                    "var btn=new xui.UI.Button; alert(btn.get(0).renderId); btn.render(); alert(btn.get(0).renderId); btn.destroy()"
                ]
            },
            renderOnto:{
                $desc:"将控件渲染, 并替换已经存在的一个DOM元素",
                $rtn:"[self]",
                $paras:[
                    "domId [必需参数] : String, DOM元素id",
                    "host [可选参数] : Object, 宿主对象. 默认为 [window]"
                ],
                $snippet:[
                    "var id='xui.temp.a1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).append(xui.create('<button id=\"id_abc\">a b c d e f t</button>'));"+
                    "(new xui.UI.Button()).renderOnto('id_abc');"+
                    "alert(id_abc);"+
                    "}"
                ]
            },
            setCustomAttr:{
                $desc:"设置自定义的DOM节点属性",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对",
                    "value [可选参数] : Object, DOM节点属性对象"
                ]
            },
            setCustomStyle:{
                $desc:"设置自定义的CSS对象",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对",
                    "value [可选参数] : String, CSS字符串"
                ],
                $snippet:[
                    "var id='xui.temp.a2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setCustomStyle('BORDER','background:#666')},1000);"+
                    "xui.asyRun(function(){btn.setCustomStyle({BORDER:null,KEY:'border:solid 2px',CAPTION:'font-size:14px'})},2000);"+
                    "xui.asyRun(function(){btn.setCustomStyle('KEY',null)},3000);"+
                    "xui.asyRun(function(){btn.setCustomStyle(null)},4000);"+
                    "}"
                ]
            },
            setCustomClass:{
                $desc:"设置自定义的CSS class",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对",
                    "value [可选参数] : String, CSS class 字符串"
                ],
                $snippet:[
                    "var id='xui.temp.a4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.CSS.setStyleRules('.a-1',{background:'#666'}).setStyleRules('.a-2',{border:'solid 2px'}).setStyleRules('.a-3',{'font-size':'14px'});"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setCustomClass('BORDER','a-1')},1000);"+
                    "xui.asyRun(function(){btn.setCustomClass({BORDER:null,KEY:'a-2',CAPTION:'a-3'})},2000);"+
                    "xui.asyRun(function(){btn.setCustomClass('KEY',null)},3000);"+
                    "xui.asyRun(function(){btn.setCustomClass(null);},4000);"+
                    "xui.asyRun(function(){xui.CSS.setStyleRules('.a-1').setStyleRules('.a-2').setStyleRules('.a-3');},5000);"+
                    "}"
                ]
            },
            adjustDock:{
                $desc:"调整停靠",
                $rtn:"[self]"
            },
            setCustomBehavior:{
                $desc:"设置自定义行为函数",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对",
                    "value [可选参数] : Object, 键值对"
                ],
                $snippet:[
                    "var id='xui.temp.a3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "btn.onClick(function(){alert(1); btn.setCustomBehavior('KEY',{onClick:function(){alert(2); btn.setCustomBehavior({KEY:{onClick:function(){alert(3); btn.setCustomBehavior(null)}}})}})});"+
                    "}"
                ]
            },
            setCustomFunction:{
                $desc:"设置自定义函数. 这些函数可以被序列化",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String/Object, 模板字符串键, 或键值对",
                    "value [可选参数] : Function, 自定义函数"
                ],
                $snippet:[
                    "var id='xui.temp.a5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "btn.setCustomFunction('showTips', function(profile, node, pos){xui.Tips.show(pos, 'hi tips');return false;});"+
                    "btn.setCustomFunction('a', function(){var a;});"+
                    "alert(btn.serialize(btn))"+
                    "}"
                ]
            },
            beforeDestroy:{
                $desc:"在控件被销毁前触发,如果返回false,控件销毁的动作将被取消",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.b1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "btn.beforeDestroy(function(profile){alert('cancelled');return false});"+
                    "xui.asyRun(function(){btn.destroy();},1000)"+
                    "}"
                ]
            },
            afterDestroy:{
                $desc:"在控件被销毁后触发",
                $paras:[
                    $profile
                ]
            },
            onDestroy:{
                $desc:"当控件被销毁时调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.b1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "btn.onDestroy(function(profile){alert('onDestroy');});"+
                    "xui.asyRun(function(){btn.destroy();},1000)"+
                    "}"
                ]
            },
            onContextmenu:{
                $desc:"当根dom元素的 contextmenu 激活时会激活本事件. 如果返回 false, 系统默认的 contextmenu 会被屏蔽(opera下无效)",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "item: Object, 鼠标点击节点所对应的item对象"
                ],
                $snippet:[
                    "var id='xui.temp.b2-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Input;xui(id).prepend(btn);"+
                    "btn.onContextmenu(function(profile){return false});" +
                    "}"
                ]
            },
            onCreated:{
                $desc:'在控件生成的时候触发',
                $paras:[
                   $profile
                ]
            },
            beforeRender:{
                $desc:"当控件被渲染前(生成DOM节点)调用. 如返回 false, 渲染事件取消",
                $paras:[
                   $profile
                ]
            },
            onRender:{
                $desc:"当控件被渲染时(生成DOM节点)调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.b2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button;"+
                    "btn.onRender(function(profile){alert('onRender')});"+
                    "xui.asyRun(function(){xui(id).prepend(btn)},1000)"+
                    "}"
                ]
            },
            onLayout:{
                $desc:"当控件被重新布局的时候调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.b3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\"><div id='+id+'1 style=\"height:20px;border:solid 1px;\"></div><div id='+id+'2 style=\"height:20px;border:solid 1px;\"></div>' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button;"+
                    "btn.onLayout(function(profile){alert('onLayout')});"+
                    "xui(id).prepend(btn);"+
                    "xui.asyRun(function(){xui(id+'1').prepend(btn)},1000);"+
                    "xui.asyRun(function(){xui(id+'2').prepend(btn)},2000);"+
                    "}"
                ]
            },
            onResize:{
                $desc:"控件被改变大小的时候调用",
                $paras:[
                    $profile,
                    "width : Number, 目标宽",
                    "height : Number, 目标高"
                ],
                $snippet:[
                    "var id='xui.temp.b3-a'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button;"+
                    "btn.onResize(function(profile,width,height){xui.message('onResize:'+width+':'+height)});"+
                    "xui(id).prepend(btn);"+
                    "xui.asyRun(function(){btn.setWidth(50).setHeight(50)},1000);"+
                    "}"
                ]
            },
            onMove:{
                $desc:"控件被改变位置的时候调用",
                $paras:[
                    $profile,
                    "left : Number, 目标左边值",
                    "top : Number, 目标上边值",
                    "right : Number, 目标右边值",
                    "bottom : Number, 目标下边值"
                ],
                $snippet:[
                    "var id='xui.temp.b3-b'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button;"+
                    "btn.onMove(function(profile,left,top){xui.message('onMove:'+left+':'+top)});"+
                    "xui(id).prepend(btn);"+
                    "xui.asyRun(function(){btn.setLeft(50).setTop(50)},1000);"+
                    "}"
                ]
            },
            onDock:{
                $desc:"控件被dock机制改变大小或位置的时候调用",
                $paras:[
                    $profile,
                    "region : Object"
                ],
                $snippet:[
                    "var id='xui.temp.b3-c'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button({dock:'fill'}); var pane= new xui.UI.Pane({position:'relative'});"+
                    "btn.onDock(function(profile,region){xui.message('onDock:'+xui.serialize(region))});"+
                    "xui(id).prepend(pane.append(btn));"+
                    "xui.asyRun(function(){pane.setWidth(50).setHeight(50)},1000);"+
                    "}"
                ]
            },
            beforePropertyChanged:{
                $desc:"当控件的某个属性被改变前出发,返回false可以阻止这个属性被改变",
                $paras:[
                    $profile,
                    "name : String, 属性名",
                    "value : Object, 新属性值",
                    "ovalue : Objecgt, 原来的属性值"
                ],
                $snippet:[
                    "var id='xui.temp.b3-d'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button;"+
                    "btn.beforePropertyChanged(function(profile,name,value){if(profile.renderId)return false;});"+
                    "xui(id).prepend(btn);"+
                    "xui.asyRun(function(){btn.setCaption('updated')},1000);"+
                    "}"
                ]
            },
            afterPropertyChanged:{
                $desc:"当控件的某个属性被改变前出发,返回false可以阻止这个属性被改变",
                $paras:[
                    $profile,
                    "name : String, 属性名",
                    "value : Object, 新属性值",
                    "ovalue : Object, 原来的属性值"
                ],
                $snippet:[
                    "var id='xui.temp.b3-e'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button;"+
                    "btn.afterPropertyChanged(function(profile,name,v,ov){xui.message(name+':'+ov+'->'+v)});"+
                    "xui(id).prepend(btn);"+
                    "xui.asyRun(function(){btn.setCaption('updated')},1000);"+
                    "}"
                ]
            },
            beforeAppend:{
                $desc:"当向控件添加子控件前触发,返回false可以阻止该动作",
                $paras:[
                    $profile,
                    "child : xui.UI, 添加的子控件"
                ],
                $snippet:[
                    "var id='xui.temp.b3-f'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button(); var pane= new xui.UI.Pane({position:'relative'});"+
                    "pane.beforeAppend(function(){return false;});"+
                    "xui(id).prepend(pane);"+
                    "xui.asyRun(function(){pane.append(btn)},1000);"+
                    "}"
                ]
            },
            afterAppend:{
                $desc:"当向控件添加子控件后触发",
                $paras:[
                    $profile,
                    "child : xui.UI, 添加的子控件"
                ],
                $snippet:[
                    "var id='xui.temp.b3-g'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button(); var pane=new xui.UI.Pane({position:'relative'});"+
                    "pane.afterAppend(function(p,c){xui.message(c.getAlias() + ' was added')});"+
                    "xui(id).prepend(pane);"+
                    "xui.asyRun(function(){pane.append(btn)},1000);"+
                    "}"
                ]
            },
            beforeRemove:{
                $desc:"当从控件中移除子控件前触发,返回false可以阻止该动作",
                $paras:[
                    $profile,
                    "child : xui.UIProfile, 移除的子控件",
                    "subId : String, 子控件在父控件的容器标识",
                    "bdestroy : Boolean, 是否在移除后被销毁"
                ],
                $snippet:[
                    "var id='xui.temp.b3-h'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button(); var pane=new xui.UI.Pane({position:'relative'});"+
                    "pane.beforeRemove(function(){return false;});"+
                    "xui(id).prepend(pane.append(btn));"+
                    "xui.asyRun(function(){pane.removeChildren(btn,true)},1000);"+
                    "}"
                ]
            },
            afterRemove:{
                $desc:"当从控件中移除子控件后触发",
                $paras:[
                    $profile,
                    "child : xui.UIProfile, 移除的子控件",
                    "subId : String, 子控件在父控件的容器标识",
                    "bdestroy : Boolean, 是否在移除后被销毁"
                ],
                $snippet:[
                    "var id='xui.temp.b3-j'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn=new xui.UI.Button(); var pane=new xui.UI.Pane({position:'relative'});"+
                    "pane.afterRemove(function(p,c){xui.message(c.alias+' was removed!');});"+
                    "xui(id).prepend(pane.append(btn));"+
                    "xui.asyRun(function(){pane.removeChildren(btn,true)},1000);"+
                    "}"
                ]
            },
            onShowTips:{
                $desc:"当控件显示tips时调用. 如返回false将会阻止系统默认的工具信息显示",
                $paras:[
                    $profile,
                    "src: String, 事件所属DOM元素的xid",
                    "pos : Object, {left:Number, top:Number}"
                ],
                $snippet:[
                    "var id='xui.temp.b5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "btn.onShowTips(function(profile, node, pos){xui.Tips.show(pos, 'hi tips');return false;});"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","CSSBox"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.CSSBox 类",
        constructor:{
            $desc:"生成一个xui.UI.CSSBox对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getClassName:{
              $desc:"得到目标css类名",
              $rtn:"String"
            },
            setClassName:{
                $desc:"设置目标css类名",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getNormalStatus:{
                $desc:"得到正常状态的CSS设置",
                $rtn:"Object, 键值对"
            },
            setNormalStatus:{
                $desc:"设置正常状态的CSS",
                $rtn:"[self],",
                $paras:[
                    "value [必需参数] : Object, 键值对 ",
                    $force
                ]
            },
            getHoverStatus:{
                $desc:"得到悬停状态的CSS设置",
                $rtn:"Object, 键值对"
            },
            setHoverStatus:{
                $desc:"设置悬停状态的CSS",
                $rtn:"[self],",
                $paras:[
                    "value [必需参数] : Object, 键值对 ",
                    $force
                ]
            },
            getActiveStatus:{
                $desc:"得到激活状态的CSS设置",
                $rtn:"Object, 键值对"
            },
            setActiveStatus:{
                $desc:"设置激活状态的CSS",
                $rtn:"[self],",
                $paras:[
                    "value [必需参数] : Object, 键值对 ",
                    $force
                ]
            },
            getFocusStatus:{
                $desc:"得到焦点状态的CSS设置",
                $rtn:"Object, 键值对"
            },
            setFocusStatus:{
                $desc:"设置焦点状态的CSS",
                $rtn:"[self],",
                $paras:[
                    "value [必需参数] : Object, 键值对 ",
                    $force
                ]
            },
            getSandbox:{
                $desc:"得到适用沙箱",
                $rtn:"String, 容器控件的别名或DOM id"
            },
            setFocusStatus:{
                $desc:"设置适用沙箱",
                $rtn:"[self],",
                $paras:[
                    "value [必需参数] : String, 容器控件的别名或DOM id",
                    $force
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Widget"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Widget 类",
        constructor:{
            $desc:"生成一个xui.UI.Widget对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getBorder:{
                $desc:"判断控件是否显示边缘线",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.w1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Widget()));"+
                    "xui.asyRun(function(){alert(o.getBorder())});"+
                    "}"
                ]
            },
            setBorder:{
                $desc:"设置控件是否显示边缘线",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.w2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Widget()));"+
                    "xui.asyRun(function(){alert(o.getBorder())});"+
                    "}"
                ]
            },
            getShadow:{
                $desc:"判断控件是否显示阴影",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.w3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Widget()).setShadow(true));"+
                    "xui.asyRun(function(){alert(o.getShadow())});"+
                    "}"
                ]
            },
            setShadow:{
                $desc:"设置控件是否显示阴影",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.w4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Widget()).setShadow(true));"+
                    "xui.asyRun(function(){alert(o.getShadow())});"+
                    "}"
                ]
            },
            getResizer:{
                $desc:"判断控件是否可以调整大小",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.w5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Widget()).setCustomStyle('KEY','background:#ccc').setResizer(true));"+
                    "xui.asyRun(function(){alert(o.getResizer())});"+
                    "}"
                ]
            },
            setResizer:{
                $desc:"设置控件是否可以调整大小",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.w6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Widget()).setCustomStyle('KEY','background:#ccc').setResizer(true));"+
                    "xui.asyRun(function(){alert(o.getResizer())});"+
                    "}"
                ]
            },
            getResizerProp:{
                $desc:"得到Resizer的属性",
                $rtn:"Object"
            },
            setResizerProp:{
                $desc:"设置Resizer的属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object. {forceVisible:/*Boolean*/,forceMovable:/*Boolean*/,singleDir:/*Boolean*/,vertical:/*Boolean*/,horizontal:/*Boolean*/,minHeight:/*Number*/,minWidth:/*Number*/,maxHeight:/*Number*/,maxWidth:/*Number*/,handlerSize:/*Number*/,handlerOffset:/*Number*/}",
                    $force
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Div"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Div 类",
        constructor:{
            $desc:"生成一个xui.UI.Div对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getIframeAutoLoad:{
                $desc:"获取用iframe自动加载html（可以是异域）的地址属性",
                $rtn:"String"
            },
            setIframeAutoLoad:{
                $desc:"设置用iframe自动加载html（可以是异域）的地址.需要提前设置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getAjaxAutoLoad:{
                $desc:"获取用Ajax自动加载html文件（同域下）的路径属性",
                $rtn:"String"
            },
            setAjaxAutoLoad:{
                $desc:"设置用Ajax自动加载html文件（同域下）的路径属性.需要提前设置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 也可以是一个object,object的内容对应xui.Ajax",
                    $force
                ]
            },
            getHtml:{
                $desc:"获取当前层对象(xui.UI.Div)的内部html代码",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.div1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Div({height:'auto',html:'<span>a</span>'}));"+
                    "xui.asyRun(function(){alert(o.getHtml())});"+
                    "}"
                ]
            },
            setHtml:{
                $desc:"设置当前层对象(xui.UI.Div)的内部html代码",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, Html代码",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.div2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Div).setHeight('auto').setHtml('<span>a</span>'));"+
                    "xui.asyRun(function(){o.setHtml('<span>b</span>')},1000);"+
                    "}"
                ]
            },
            onClick:{
                $desc:"当鼠标单击时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Pane"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Pane 类",
        constructor:{
            $desc:"生成一个xui.UI.Pane对象"
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Link"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Link 类",
        constructor:{
            $desc:"生成一个xui.UI.Link对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCaption:{
                $desc:"获取超链接的文本内容",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.link1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Link()).setCaption('cap'));"+
                    "xui.asyRun(function(){alert(o.getCaption())});"+
                    "}"
                ]
            },
            setCaption:{
                $desc:"设置超链接的文本内容",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 文本内容",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.link2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Link()).setCaption('cap'));"+
                    "xui.asyRun(function(){alert(o.getCaption())});"+
                    "}"
                ]
            },
            getTarget:{
                $desc:"获取超链接打开的目标窗口",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.link3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Link()).setTarget('_top'));"+
                    "xui.asyRun(function(){alert(o.getTarget())});"+
                    "}"
                ]
            },
            setTarget:{
                $desc:"设置超链接打开的目标窗口",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 值",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.link4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Link()).setTarget('_top'));"+
                    "xui.asyRun(function(){alert(o.getTarget())});"+
                    "}"
                ]
            },
            getHref:{
                $desc:"获取超链接的href属性",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.link5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Link()).setHref('#'));"+
                    "xui.asyRun(function(){alert(o.getHref())});"+
                    "}"
                ]
            },
            setHref :{
                $desc:"设置超链接的href属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, the href",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.link6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Link()).setHref('#'));"+
                    "xui.asyRun(function(){alert(o.getHref())});"+
                    "}"
                ]
            },


            onClick:{
                $desc:"当用户单击超链接时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素"            ],
                $snippet:[
                    "var id='xui.temp.link7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).prepend((new xui.UI.Link()).setCaption('cap').onClick(function(profile){alert(profile.properties.caption)}));"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Border"], {$desc:"xui.UI.Border 类",KEY:{$desc:"类关键字"}});

    xui.set(xui.Locale,["cn","doc","xui","UI","Shadow"], {$desc:"xui.UI.Shadow 类",KEY:{$desc:"类关键字"}});

    xui.set(xui.Locale,["cn","doc","xui","UI","Resizer"], {$desc:"xui.UI.Resizer 类",KEY:{$desc:"类关键字"}});

    xui.set(xui.Locale,["cn","doc","xui","UI","Block"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Block 类",
        constructor:{
            $desc:"生成一个xui.UI.Block 对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getIframeAutoLoad:{
                $desc:"获取用iframe自动加载html（可以是异域）的地址属性",
                $rtn:"String"
            },
            setIframeAutoLoad:{
                $desc:"设置用iframe自动加载html（可以是异域）的地址.需要提前设置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getAjaxAutoLoad:{
                $desc:"获取用Ajax自动加载html文件（同域下）的路径属性",
                $rtn:"String"
            },
            setAjaxAutoLoad:{
                $desc:"设置用Ajax自动加载html文件（同域下）的路径属性.需要提前设置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 也可以是一个object,object的内容对应xui.Ajax",
                    $force
                ]
            },
            getHtml:{
                $desc:"获取块控件的内部html",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.blk1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Block({border:true,html:'<span>a</span>'}));"+
                    "xui.asyRun(function(){alert(o.getHtml())});"+
                    "}"
                ]
            },
            setHtml:{
                $desc:"设置块控件的内部html",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, the html string",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.blk2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Block).setHtml('<span>a</span>'));"+
                    "xui.asyRun(function(){o.setHtml('<span>b</span>')},1000);"+
                    "}"
                ]
            },
            getBackground:{
                $desc:"获取块控件的背景",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.blk3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Block).setBackground('red'));"+
                    "xui.asyRun(function(){alert(o.getBackground())},1000);"+
                    "}"
                ]
            },
            setBackground:{
                $desc:"设置获取块控件的背景",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 背景的CSS字符串",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.blk4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Block).setBackground('red'));"+
                    "xui.asyRun(function(){alert(o.getBackground())},1000);"+
                    "}"
                ]
            },
            getBorderType:{
                $desc:"获取块控件的边框种类",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.blk5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Block).setBorderType('inset'));"+
                    "xui.asyRun(function(){alert(o.getBorderType())},1000);"+
                    "}"
                ]
            },
            setBorderType:{
                $desc:"设置块控件的边框种类",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none','inset','outset','groove' 或 'ridge'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.blk6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Block).setBorderType('groove'));"+
                    "xui.asyRun(function(){alert(o.getBorderType())},1000);"+
                    "}"
                ]
            },
            getSideBarType:{
                $desc:"得到侧栏类型",
                $rtn:"String"
            },
            setSideBarType:{
                $desc:"设置侧栏类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, none, left, right, top ,bottom",
                    $force
                ]
            },
            getSideBarSize:{
                $desc:"得到侧栏大小",
                $rtn:"String"
            },
            setSideBarSize:{
                $desc:"设置侧栏大小",
                $rtn:"[Number/String]",
                $paras:[
                    "value [必需参数] : String, em 或 px 数字",
                    $force
                ]
            },
            getSideBarStatus:{
                $desc:"得到侧栏状态",
                $rtn:"String"
            },
            setSideBarStatus:{
                $desc:"设置侧栏状态",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, fold 或 expand",
                    $force
                ]
            },
            getSideBarCaption:{
                $desc:"得到侧栏标签",
                $rtn:"String"
            },
            setSideBarCaption:{
                $desc:"设置侧栏标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            onClickPanel:{
                $desc:"当鼠标单击容器时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","ProgressBar"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.ProgressBar 类",
        constructor:{
            $desc:"生成一个xui.UI.ProgressBar对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getType:{
                $desc:"获取显示类型. 可以是'vertical'(垂直) 或 'horizontal'(水平) ",
                $rtn:"String"
            },
            setType:{
                $desc:"设置显示类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 可以是'vertical'(垂直) 或 'horizontal'(水平)",
                    $force
                ]
            },
            getCaptionTpl :{
                $desc:"得到标题模板字符串",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.pb1-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ProgressBar({value:'20'}));"+
                    "xui.asyRun(function(){o.setCaptionTpl('ongoing {value}%')},1000);"+
                    "xui.asyRun(function(){alert(o.getCaptionTpl())},2000);"+
                    "}"
                ]
            },
            setCaptionTpl :{
                $desc:"设置标题模板字符串",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.pb1-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ProgressBar({value:'20'}));"+
                    "xui.asyRun(function(){o.setCaptionTpl('ongoing {value}%')},1000);"+
                    "xui.asyRun(function(){alert(o.getCaptionTpl())},2000);"+
                    "}"
                ]
            },
            getFillBG:{
                $desc:"获取进度条背景填充颜色",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.pb2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ProgressBar({value:'20'}));"+
                    "xui.asyRun(function(){o.setFillBG('#00ff00')},1000);"+
                    "xui.asyRun(function(){alert(o.getFillBG())},1000);"+
                    "}"
                ]
            },
            setFillBG:{
                $desc:"设置进度条背景填充颜色",
                $rtn:"[self]",
                 $paras:[
                    "value [必需参数] : nonnegative Number",
                    $force
                ],
               $snippet:[
                    "var id='xui.temp.pb3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ProgressBar({value:'20'}));"+
                    "xui.asyRun(function(){o.setFillBG('#00ff00')},1000);"+
                    "xui.asyRun(function(){alert(o.getFillBG())},1000);"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Label"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Label 类",
        constructor:{
            $desc:"生成一个xui.UI.Label"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCaption :{
                $desc:"获取文字",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.Label1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.Label2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },            
            getHAlign :{
                $desc:"获取水平对齐方式",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.Label7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label({border:true,width:'100'}));"+
                    "xui.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.Label8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label({border:true,width:'100'}));"+
                    "xui.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            getFontColor :{
                $desc:"获取标签字体颜色",
                $rtn:"String"
            },
            setFontColor :{
                $desc:"设置标签字体颜色",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 字体颜色",
                    $force
                ]
            },            
            getFontSize :{
                $desc:"获取标签字体大小",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.lbl3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label);"+
                    "xui.asyRun(function(){btn.setFontSize ('14px'); alert(btn.getFontSize ())},1000)"+
                    "}"
                ]
            },
            setFontSize :{
                $desc:"设置标签字体大小",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 字体大小",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.lbl4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label);"+
                    "xui.asyRun(function(){btn.setFontSize ('14px'); alert(btn.getFontSize ())},1000)"+
                    "}"
                ]
            },
            getFontWeight :{
                $desc:"获取标签字体粗细",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.lbl5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label);"+
                    "xui.asyRun(function(){btn.setFontWeight('bold'); alert(btn.getFontWeight())},1000)"+
                    "}"
                ]
            },
            setFontWeight :{
                $desc:"设置标签字体粗细",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, corresponding CSS value",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.lbl6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label);"+
                    "xui.asyRun(function(){btn.setFontWeight('bold'); alert(btn.getFontWeight())},1000)"+
                    "}"
                ]
            },
            getImage :{
                $desc:"获取图标url路径",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.lbl13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            setImage :{
                $desc:"设置图标url路径",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String, 图标url路径",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.lbl14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            getImagePos :{
                $desc:"获取图标的图像偏移属性",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.lbl15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            setImagePos :{
                $desc:"设置图标的图像偏移属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 图标的显示位置",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.lbl16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Label({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            getImageBgSize :{
                $desc:"得到背景图尺寸属性",
                $rtn:"String"
            },
            setImageBgSize :{
                $desc:"设置背景图尺寸属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 背景图尺寸",
                    $force
                ]
            },           
            onClick:{
                $desc:"当鼠标单击时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });


    xui.set(xui.Locale,["cn","doc","xui","UI","RichEditor"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.RichEditor 类",
        constructor:{
            $desc:"生成一个 xui.UI.RichEditor 对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getFrameTemplate:{
                $desc:"得到内部iFrame的html模板",
                $rtn:"String"
            },
            setFrameTemplate:{
                $desc:"设置内部iFrame的html模板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getFrameStyle:{
                $desc:"得到内部iFrame的附加css样式",
                $rtn:"String"
            },
            setFrameStyle:{
                $desc:"设置内部iFrame的附加css样式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getCmdFilter:{
                $desc:"得到过滤掉的控件中命令按钮",
                $rtn:"String"
            },
            setCmdFilter:{
                $desc:"设置过滤掉的控件中命令按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 设置'font1;font2'是隐藏font1和font2",
                    $force
                ]
            },
            getCmdList :{
                $desc:"得到控件中命令按钮的出现和排列方式",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.rich'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:300px;width:400px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var rich;xui(id).prepend(rich=new xui.UI.RichEditor);"+
                    "xui.asyRun(function(){rich.setCmdList('font1;font2;font3;font4'); alert(rich.getCmdList ())},1000)"+
                    "}"
                ]
            },
            setCmdList :{
                $desc:"设置控件中命令按钮的出现和排列方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.rich'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:300px;width:400px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var rich;xui(id).prepend(rich=new xui.UI.RichEditor);"+
                    "xui.asyRun(function(){rich.setCmdList('font1;font2;font3;font4'); alert(rich.getCmdList ())},1000)"+
                    "}"
                ]
            },
            getLabelSize:{
                $desc:"获取标签的大小",
                $rtn:"Number"
            },
            setLabelSize:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelPos:{
                $desc:"获取标签的位置",
                $rtn:"String"
            },
            setLabelPos:{
                $desc:"设置标签的位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, left, right, top, bottom 之一",
                    $force
                ]
            },
            getLabelGap:{
                $desc:"获取标签与输入框的距离",
                $rtn:"Number"
            },
            setLabelGap:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelCaption:{
                $desc:"获取标签的文字",
                $rtn:"String"
            },
            setLabelCaption:{
                $desc:"设置标签的文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getLabelHAlign:{
                $desc:"获取标签的水平对齐方式",
                $rtn:"String"
            },
            setLabelHAlign:{
                $desc:"设置按标签的水平对齐方式 ",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'",
                    $force
                ]
            },
            onLabelClick:{
                $desc:"在单击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelDblClick:{
                $desc:"在双击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelActive:{
                $desc:"当鼠标在标签上按下时调用",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onReady:{
                $desc:"当内部Frame准备好",
                $paras:[
                    $profile
                ]
            },
            onUpdateToolbar:{
                $desc:"当命令按钮更新状态",
                $paras:[
                    $profile,
                    "etype: String,  事件类型",
                    "doc: Object, 内部frame的document对象"
                ]
            },
            onInnerEvent:{
                $desc:"当命令按钮更新状态",
                $paras:[
                    $profile,
                    "type : String,  事件类型",
                    "node : Element, 相应的DOM元素",
                    "e : Event, DOM事件元素"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","CheckBox"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.CheckBox 类",
        constructor:{
            $desc:"生成一个xui.UI.Button对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.SCbtn0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.CheckBox);"+
                    "xui.asyRun(function(){btn.activate();},1000);"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取按题文字",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.scbtn1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.CheckBox);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置按题文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.scbtn2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.CheckBox);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getImage :{
                $desc:"获取图标url路径",
                $rtn:"String"
            },
            setImage :{
                $desc:"设置图标url路径",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String, 图标url路径",
                    $force
                ]
            },
            getImagePos :{
                $desc:"获取图标的图像偏移属性",
                $rtn:"String"
            },
            setImagePos :{
                $desc:"设置图标的图像偏移属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 图标的显示位置",
                    $force
                ]
            },
            getImageBgSize :{
                $desc:"得到背景图尺寸属性",
                $rtn:"String"
            },
            setImageBgSize :{
                $desc:"设置背景图尺寸属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 背景图尺寸",
                    $force
                ]
            },           
            onChecked:{
                $desc:"Fired when CheckBox is checked",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "value : String, 按下或弹起"
                ],
                $snippet:[
                    "var id='xui.temp.Scbtn18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).prepend((new xui.UI.CheckBox()).onChecked(function(profile,e,value){alert(value)}));"+
                    "}"
                ]
            }
        }
    });


    xui.set(xui.Locale,["cn","doc","xui","UI","Button"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Button 类",
        constructor:{
            $desc:"生成一个xui.UI.Button对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            resetValue:{
                $desc:"重新内部值, 显示值和控件值. 该函数不激活任何事件",
                $rtn:'[self]',
                $paras:[
                    "value [可选参数] : Boolean, 重新设置的新值,默认为 false"
                ]
            },
            setUIValue:{
                $desc:"设置用户界面值和控件值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    "force [可选参数] : Boolean, 强行赋值,即使赋值和现有值已经相同. 默认为 [false]"
                ],
                $memo:"调用该函数时,以下两个事件将被触发beforeUIValueSet and afterUIValueSet"
            },
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.btn0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.activate();},1000);"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取按钮标题文字",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.btn1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置按钮标题文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.btn2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getType:{
                $desc:"得到按钮的类型",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.btn5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setType('drop'); alert(btn.getType ())},1000)"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置按钮的类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'normal', 'drop' 或 'status'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.btn6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button);"+
                    "xui.asyRun(function(){btn.setType('drop'); alert(btn.getType ())},1000)"+
                    "}"
                ]
            },
            getHAlign :{
                $desc:"获取水平对齐方式",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.btn7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({border:true,height:'50',width:'100'}));"+
                    "xui.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.btn8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({border:true,height:'50',width:'100'}));"+
                    "xui.asyRun(function(){btn.setHAlign('center'); alert(btn.getHAlign())},1000)"+
                    "}"
                ]
            },
            getVAlign :{
                $desc:"获取垂直对齐方式",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.btn9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({border:true,height:'50',width:'100'}));"+
                    "xui.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                    "}"
                ]
            },
            setVAlign :{
                $desc:"设置垂直对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'top', 'middle' or 'bottom'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.btn20'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button({border:true,height:'50',width:'100'}));"+
                    "xui.asyRun(function(){btn.setVAlign('bottom'); alert(btn.getVAlign())},1000)"+
                    "}"
                ]
            },
            getImage :{
                $desc:"获取图标的url",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.btn13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button());"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            setImage :{
                $desc:"设置图标的url",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String,  image path",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.btn14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button());"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            getImagePos :{
                $desc:"获取图标的图像偏移属性",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.btn15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button());"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            setImagePos :{
                $desc:"设置图标的图像偏移属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, corresponding CSS value",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.btn16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Button());"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            getImageBgSize :{
                $desc:"得到背景图尺寸属性",
                $rtn:"String"
            },
            setImageBgSize :{
                $desc:"设置背景图尺寸属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 背景图尺寸",
                    $force
                ]
            },           
            onClick:{
                $desc:"当鼠标单击时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "value : Boolean, 值"
                ],
                $snippet:[
                    "var id='xui.temp.btn17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).prepend((new xui.UI.Button()).onClick(function(profile){alert(profile.properties.caption)}));"+
                    "}"
                ]
            },
            onChecked:{
                $desc:"在按钮按下时触发（当按钮的 type 为'status'时才有效）",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "value : Boolean, 按下或弹起"
                ],
                $snippet:[
                    "var id='xui.temp.btn18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).prepend((new xui.UI.Button({type:'status'})).onChecked(function(profile,e,value){alert(value)}));"+
                    "}"
                ]
            }
        }
    });


    xui.set(xui.Locale,["cn","doc","xui","UI","Input"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Input 类",
        constructor:{
            $desc:"生成一个xui.UI.Input对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.input0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input);"+
                    "xui.asyRun(function(){o.activate();},1000)"+
                    "}"
                ]
            },
            getDynCheck:{
                $desc:"判断当用户输入时,编辑框是否实时校验输入的有效性. 设置为false时,编辑框只在用户离开编辑框时检查有效性",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.input3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$'})).prepend(o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$'}));"+
                    "o.setDynCheck(true);alert(o.getDynCheck());"+
                    "}"
                ]
            },
            setDynCheck:{
                $desc:"设置当用户输入时,编辑框是否实时校验输入的有效性. 设置为false时,编辑框只在用户离开编辑框时检查有效性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$'})).prepend(o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$'}));"+
                    "o.setDynCheck(true);alert(o.getDynCheck());"+
                    "}"
                ]
            },
            getPlaceholder:{
                $desc:"获得HTML 5  空白提示字符串",
                $rtn:"String"
            },
            setPlaceholder:{
                $desc:"设置HTML 5  空白提示字符串",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force                ]
            },
            getHAlign :{
                $desc:"获取标签水平对齐方式",
                $rtn:"String"
            },
            setHAlign :{
                $desc:"设置标签水平对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'",
                    $force
                ]
            },
            getMultiLines:{
                $desc:"判断是否允许输入多行文本",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.input5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(new xui.UI.Input({position:'relative'})).prepend(o=new xui.UI.Input({position:'relative'}));"+
                    "o.setMultiLines(true).setHeight(50);alert(o.getMultiLines());"+
                    "}"
                ]
            },
            setMultiLines:{
                $desc:"设置是否允许输入多行文本",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(new xui.UI.Input({position:'relative'})).prepend(o=new xui.UI.Input({position:'relative'}));"+
                    "o.setMultiLines(true).setHeight(50);alert(o.getMultiLines());"+
                    "}"
                ]
            },
            getMask:{
                $desc:"获取有效的格式模式,用来避免错误的输入",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.input7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input());"+
                    "alert(o.setMask('(1111)11111111-111').getMask());"+
                    "}"
                ]
            },
            setMask:{
                $desc:"设置有效的格式模式,用来避免错误的输入. <ul>下面的字符可以用于格式模式:"+
                    "<li>'~' : [+-]</li>"+
            		"<li>'1' : [0-9]</li>"+
            		"<li>'a' : [A-Za-z]</li>"+
            		"<li>'u' : [A-Z]</li>"+
            		"<li>'l' : [a-z]</li>"+
            		"<li>'*' : [A-Za-z0-9]</li>"+
            		"<li>other : itself </li>"+
            		"</ul>",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 格式模式",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input());"+
                    "alert(o.setMask('(1111)11111111-111').getMask());"+
                    "}"
                ]
            },
            getReadonly:{
                $desc:"判断编辑框是否为只读",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.input9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "alert(o.setReadonly(true).getReadonly())"+
                    "}"
                ]
            },
            setReadonly:{
                $desc:"设置编辑框是否为只读",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({value:'ini'}));"+
                    "alert(o.setReadonly(true).getReadonly())"+
                    "}"
                ]
            },
            getTipsBinder:{
                $desc:"获取有效性提示的绑定器(提示的文本出现在什么控件上)",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.input11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; xui(id).prepend((new xui.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            setTipsBinder:{
                $desc:"设置有效性提示的绑定器. (提示的文本出现在什么控件上)",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; xui(id).prepend((new xui.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            getTipsErr:{
                $desc:"获取输入无效时的提示文本",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.input13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; xui(id).prepend((new xui.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            setTipsErr:{
                $desc:"设置输入无效时的提示文本",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; xui(id).prepend((new xui.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            getTipsOK:{
                $desc:"获取输入有效是的提示文本",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.input15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; xui(id).prepend((new xui.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            setTipsOK:{
                $desc:"设置输入有效是的提示文本",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o,host={}; xui(id).prepend((new xui.UI.Div({position:'relative'})).setHost(host,'div')).prepend((o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$',dynCheck:true})).setHost(host,'input'));"+
                    "o.setTipsBinder('div').setTipsErr('format err').setTipsOK('ok');"+
                    "alert(o.getTipsBinder()+' : '+ o.getTipsErr() +' : '+ o.getTipsOK())"+
                    "}"
                ]
            },
            getValueFormat:{
                $desc:"获取有效输入的模式（正则表达式）",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.input17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o; xui(id).prepend((o=new xui.UI.Input({position:'relative',dynCheck:true})));"+
                    "alert(o.setValueFormat('^\\\\d*$').getValueFormat());"+
                    "}"
                ]
            },
            setValueFormat:{
                $desc:"设置有效输入的模式（正则表达式）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o; xui(id).prepend((o=new xui.UI.Input({position:'relative',dynCheck:true})));"+
                    "alert(o.setValueFormat('^\\\\d*$').getValueFormat());"+
                    "}"
                ]
            },
            getSelectOnFocus:{
                $desc:"获取是否在获得焦点时自动选择文本",
                $rtn:"Boolean"
            },
            setSelectOnFocus:{
                $desc:"设置是否在获得焦点时自动选择文本",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getType:{
                $desc:"获取输入框的类型. 可以是'input'(普通输入框)或 'password'(密码输入框). 默认为 'input'",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.input19'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(new xui.UI.Input({position:'relative'})).prepend(o=new xui.UI.Input({position:'relative'}));"+
                    "o.setType('password');alert(o.getType());"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置输入框的类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'input' or 'password'. 默认为 'input'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.input20-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(new xui.UI.Input({position:'relative'})).prepend(o=new xui.UI.Input({position:'relative'}));"+
                    "o.setType('password');alert(o.getType());"+
                    "}"
                ]
            },
            getMaxlength:{
                $desc:"获取输入框的工最大长度. 只有multiline为false的时候有效(for html input type='text' or type='password')",
                $rtn:"Number"
            },
            setMaxlength:{
                $desc:"设置输入框的工最大长度. 只有multiline为false的时候有效(for html input type='text' or type='password')",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 最大长度",
                    $force
                ]
            },
            getLabelSize:{
                $desc:"获取标签的大小",
                $rtn:"Number"
            },
            setLabelSize:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelPos:{
                $desc:"获取标签的位置",
                $rtn:"String"
            },
            setLabelPos:{
                $desc:"设置标签的位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : left, right, top, bottom 之一",
                    $force
                ]
            },
            getLabelGap:{
                $desc:"获取标签与输入框的距离",
                $rtn:"Number"
            },
            setLabelGap:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelCaption:{
                $desc:"获取标签的文字",
                $rtn:"String"
            },
            setLabelCaption:{
                $desc:"设置标签的文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getLabelHAlign:{
                $desc:"获取标签的水平对齐方式",
                $rtn:"String"
            },
            setLabelHAlign:{
                $desc:"设置按标签的水平对齐方式 ",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'",
                    $force
                ]
            },
            onClick:{
                $desc:"在单击按钮的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid",
                    "btn: String, 点击的按钮",
                    "value: String, 界面值"
                ]
            },
            onLabelClick:{
                $desc:"在单击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelDblClick:{
                $desc:"在双击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelActive:{
                $desc:"当鼠标在标签上按下时调用",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onBlur:{
                $desc:"当输入框失去焦点时调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.input20-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({position:'relative'}));"+
                    "o.onBlur(function(){alert('onBlur')});"+
                    "}"
                ]
            },
            onFocus:{
                $desc:"当输入框得到焦点时调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.input20-3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({position:'relative'}));"+
                    "o.onFocus(function(){alert('onFocus')});"+
                    "}"
                ]
            },
            onCancel:{
                $desc:"按ESC键触发本事件,表示本次编辑无效",
                $paras:[
                    $profile
                ]
            },
            beforeFormatCheck:{
                $desc:"在输入框做有效性检查时调用. 返回false可以阻止有效性的检查",
                $paras:[
                    $profile,
                    "value: String, 需要做有效性检查的值"
                ],
                $snippet:[
                    "var id='xui.temp.input21'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Input({position:'relative',dynCheck:true}));"+
                    "o.beforeFormatCheck(function(p,v){if(v!=='a')return false;});"+
                    "}"
                ]
            },
            beforeFormatMark:{
                $desc:"在设置有效的格式模式前调用. 如果返回false, 将阻止格式模式设置",
                $paras:[
                    $profile,
                    "formatErr: Boolean, 是否格式有错误"
                ],
                $snippet:[
                    "var id='xui.temp.input21'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$', dynCheck:true})).prepend(o=new xui.UI.Input({position:'relative',valueFormat:'^\\\\d*$', dynCheck:true}));"+
                    "o.beforeFormatMark(function(p,v){p.getSubNode('INPUT').css('background',v?'#00ff00':''); return false;});"+
                    "}"
                ]
            }
        }
    });
    xui.set(xui.Locale,["cn","doc","xui","UI","Group"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Group 类",
        constructor:{
            $desc:"生成一个xui.UI.Group对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            resetPanelView:{
                $desc:"清空Group的容器,恢复到初始状态，然后折叠",
                $rtn:"[self]",
                $paras:[
                    "remvoeChildren [可选参数] : Boolean, 是否移除子控件",
                    "destroyChildren [可选参数] : Boolean, 是否销毁子控件"
                ]
            },
            iniPanelView:{
                $desc:"触发onIniPanelView事件",
                $rtn:"[self]"
            },
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.grp0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group);"+
                    "xui.asyRun(function(){btn.activate();},1000)"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取编组框的标题文字",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.grp1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置编组框的标题文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grp2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getHAlign :{
                $desc:"获取标签水平对齐方式",
                $rtn:"String"
            },
            setHAlign :{
                $desc:"设置标签水平对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'",
                    $force
                ]
            },
            getImage :{
                $desc:"获取编组框图标的url",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.grp3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            setImage :{
                $desc:"设置编组框图标的url",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String, image url",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grp4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            getImagePos :{
                $desc:"获取编组框图标的图像偏移属性",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.grp5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            setImagePos :{
                $desc:"设置编组框图标的图像偏移属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 图标的位置(CSS值)",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grp6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            getImageBgSize :{
                $desc:"得到背景图尺寸属性",
                $rtn:"String"
            },
            setImageBgSize :{
                $desc:"设置背景图尺寸属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 背景图尺寸",
                    $force
                ]
            },           
            getToggle:{
                $desc:"判断编组框是打开还是收缩的",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.fs3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group);"+
                    "xui.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                    "}"
                ]
            },
            setToggle :{
                $desc:"设置编组框是打开还是收缩的",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.fs4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group);"+
                    "xui.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                    "}"
                ]
            },
            getToggleBtn:{
                $desc:"判断编组框是否带有收缩/打开按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.fs3-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group);"+
                    "xui.asyRun(function(){btn.setToggleBtn(false); alert(btn.getToggleBtn())},1000)"+
                    "}"
                ]
            },
            setToggleBtn :{
                $desc:"设置编组框是否带有收缩/打开按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.fs4-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Group);"+
                    "xui.asyRun(function(){btn.setToggleBtn(false); alert(btn.getToggleBtn())},1000)"+
                    "}"
                ]
            },


            beforeExpand:{
                $desc:"在编组框打开前调用.如返回 false, 编组框不会打开",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.fs5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.Group;"+
                    "o.beforeExpand(function(){alert('beforeExpand')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            beforeFold:{
                $desc:"当编组框收缩前调用.如返回 false, 编组框不会收缩",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.fs6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.Group;"+
                    "o.beforeExpand(function(){alert('beforeExpand')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            afterExpand:{
                $desc:"在编组框打开后调用"
            },
            afterFold:{
                $desc:"在编组框收缩后调用"
            },
            onIniPanelView:{
                $desc:"当Panel初始化时调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.fs7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.Group;"+
                    "o.beforeExpand(function(){alert('beforeExpand')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            onClickPanel:{
                $desc:"当鼠标单击容器时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","ComboInput"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.ComboInput 类",
        constructor:{
            $desc:"生成一个xui.UI.ComboInput对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getInputReadonly:{
                $desc:"获取内部文本的只读属性",
                $rtn:"Boolean"
            },
            setInputReadonly:{
                $desc:"设置内部文本的只读属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean, 是否只读",
                    $force
                ]
            },
            getCaption:{
                $desc:"获取显示的文本内容",
                $rtn:"String"
            },
            setCaption:{
                $desc:"设置显示的文本内容",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 文本内容",
                    $force
                ],
                $memo:"在只读状态下,用作临时显示用"
            },
            getShowValue:{
                $desc:"获取控件的显示值",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ci001'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ComboInput({type:'listbox',items:[{id:'id1',caption:'show1'},{id:'id2',caption:'show2'}]}));"+
                    "o.setValue('id2'); xui.asyRun(function(){ alert(o.getValue() + '->' + o.getShowValue()) },1000)"+
                    "}"
                ]
            },
            resetValue:{
                $desc:"重新内部值, 显示值和控件值. 该函数不激活任何事件",
                $rtn:'[self]',
                $paras:[
                    "value [可选参数] : String, 重新设置的新值,默认为 ''"
                ],
                $snippet:[
                    "var id='xui.temp.ci1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ComboInput({value:'ini'}));"+
                    "o.setUIValue('ini2');xui.asyRun(function(){o.resetValue('ini2');},1000)"+
                    "}"
                ]
            },
            clearPopCache:{
                $desc:"清除弹出的下拉控件的缓存",
                $rtn:"[self]"
            },
            expand:{
                $desc:"打开弹出窗口"
            },
            collapse:{
                $desc:"关闭弹出窗口"
            },
            setUplaodObj:{
                $desc:"设置上传文件对象,仅对上传框有效",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : file input 对象"
                ]
            },
            getUploadObj:{
                $desc:"获取上传文件对象,仅对上传框有效",
                $rtn:"xui.Dom",
                $snippet:[
                    "var id='xui.temp.ci2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ComboInput({type:'file'}));"+
                    "o.afterUIValueSet(function(){alert(o.getUploadObj().value)});"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置下拉框类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'none'或'input'代表是普通的输入框,'password'代表密码输入框"+
                    "'combobox'代表下拉框,'listbox'代表列表框,'file'代表文件框,'getter'代表获取框,"+
                    "'helpinput'代表帮助框,'button'代表按钮,'cmdbox'代表命令框,'popbox'代表弹出框,"+
                    "'time'代表时间选择框,'date'代表日期选择框,'datetime'代表日期时间选择框,'color'代表颜色选择框,"+
                    "'currency'代表货币输入框,'number'代表数字输入框,'spin'代表是spin输入框,'counter'代表是counter输入框."+
                    "'dropbutton'代表联合按钮"+
                    " 默认为 'combobox'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ci4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var label,o;xui(id).prepend(o=new xui.UI.ComboInput({position:'relative'})).prepend(label=new xui.UI.Label({position:'relative',width:100}));"+
                    "var arr=['none','combobox','listbox','file','getter','helpinput','cmdbox','popbox','time','date','color'];"+
                    "xui.Thread(null,[function(id){if(!arr.length)return xui.Thread.abort(id); var type=arr.shift();o.setType(type);label.setCaption(type)}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getItems:{
                $desc:"获取下拉框的所有项目",
                $rtn:"Array",
                $snippet:[
                    "var id='xui.temp.ci5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ComboInput({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "xui.asyRun(function(){alert(xui.serialize(o.getItems()))});"+
                    "}"
                ]
            },
            setItems:{
                $desc:"设置下拉框的项目",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 项目数组",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ci6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ComboInput({position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]}));"+
                    "xui.asyRun(function(){o.setItems([{id:'aaa',caption:'bbb'}])});"+
                    "}"
                ]
            },
            getDropListHeight:{
                $desc:"获取弹出窗口高（只对listbox,combobox,helpinput有效）",
                $rtn:"Number"
            },
            setDropListHeight:{
                $desc:"设置弹出窗口高（只对listbox,combobox,helpinput有效）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number, 高",
                    $force
                ]
            },
            getDropListWidth:{
                $desc:"获取默认的弹出窗口宽（只对listbox,combobox,helpinput有效）",
                $rtn:"Number"
            },
            setDropListWidth:{
                $desc:"设置弹出窗口宽（只对listbox,combobox,helpinput有效）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number, 宽",
                    $force
                ]
            },
            getListKey:{
                $desc:"获取列表键",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ci7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "xui.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                    "var o;xui(id).prepend(o=new xui.UI.ComboInput({position:'relative',listKey:'test'}));"+
                    "xui.asyRun(function(){alert(o.getListKey())});"+
                    "}"
                ]
            },
            setListKey:{
                $desc:"设置列表键",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 列表键",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ci7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui.UI.cacheData('test',[{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "xui.UI.cacheData('test2',[{id:'aa',caption:'aa'},{id:'bb',caption:'bb'},{id:'cc',caption:'cc'}]);"+
                    "var o;xui(id).prepend(o=new xui.UI.ComboInput({position:'relative',listKey:'test'}));"+
                    "xui.asyRun(function(){o.setListKey('test2')},1000);"+
                    "}"
                ]
            },
            getCachePopWnd:{
                $desc:"获取是否缓存弹出窗口的设置",
                $rtn:"Boolean"
            },
            setCachePopWnd:{
                $desc:"设置是否缓存弹出窗口",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getDateEditorTpl:{
                $desc:"得到 date/datetime 编辑模式下的模板",
                $rtn:"String"
            },
            setDateEditorTpl:{
                $desc:"设置 date/datetime 编辑模式下的模板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getGroupingSeparator:{
                $desc:"得到千位分隔符",
                $rtn:"String"
            },
            setGroupingSeparator:{
                $desc:"设置千位分隔符",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getDecimalSeparator:{
                $desc:"得到小数分隔符",
                $rtn:"String"
            },
            setDecimalSeparator:{
                $desc:"设置小数分隔符",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getForceFillZero:{
                $desc:"得到是否强制用0填充精度选项",
                $rtn:"Boolean"
            },
            setForceFillZero:{
                $desc:"设置是否强制用0填充精度选项",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getPopCtrlProp:{
                $desc:"得到固定弹出窗口('combobox,listbox,helpinput,date,time,datetime,color')的属性",
                $rtn:"Object"
            },
            setPopCtrlProp:{
                $desc:"设置固定弹出窗口('combobox,listbox,helpinput,date,time,datetime,color')的属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ],
                $memo:"需要在控件产生前调用"
            },
            getPopWnd:{
                $desc:"得到弹出窗口",
                $rtn:"[xui.UI]"
            },
            getPopCtrlEvents:{
                $desc:"得到固定弹出窗口('combobox,listbox,helpinput,date,time,datetime,color')的事件",
                $rtn:"Object"
            },
            setPopCtrlEvents:{
                $desc:"设置固定弹出窗口('combobox,listbox,helpinput,date,time,datetime,color')的事件",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ],
                $memo:"需要在控件产生前调用"
            },
            getCurrencyTpl:{
                $desc:"得到货币的显示模板",
                $rtn:"String"
            },
            setCurrencyTpl:{
                $desc:"设置货币的显示模板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 必须是[^1-9.,]之外的，并且带有*号的字符串",
                    $force
                ]
            },
            getNumberTpl:{
                $desc:"得到数字的显示模板",
                $rtn:"String"
            },
            setNumberTpl:{
                $desc:"设置数字的显示模板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 必须是[^1-9.,-]之外的，并且带有*号的字符串",
                    $force
                ]
            },
            getCommandBtn:{
                $desc:"得到命令按钮显示关键字",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.ci8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative'})).prepend(o2=new xui.UI.ComboInput({position:'relative',type:'none'}));"+
                    "xui.asyRun(function(){o1.setCommandBtn('save');o2.setCommandBtn('add'); alert(o1.getCommandBtn())},1000)"+
                    "}"
                ]
            },
            setCommandBtn:{
                $desc:"设置命令按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ci9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative'})).prepend(o2=new xui.UI.ComboInput({position:'relative',type:'none'}));"+
                    "xui.asyRun(function(){o1.setCommandBtn('remove');o2.setCommandBtn('delete'); alert(o1.getCommandBtn())},1000)"+
                    "}"
                ]
            },
            getPrecision:{
                $desc:"获取precision值.只对 'spin' 类型有效",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ci11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "xui.asyRun(function(){o1.setPrecision(2);alert(o1.getPrecision())},1000)"+
                    "}"
                ]
            },
            setPrecision:{
                $desc:"设置precision值.只对 'spin' 类型有效",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ci12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "xui.asyRun(function(){o1.setPrecision(2);alert(o1.getPrecision())},1000)"+
                    "}"
                ]
            },
            getIncrement:{
                $desc:"获取增量值.只对 'spin' 类型有效",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ci13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "xui.asyRun(function(){o1.setIncrement(0.02);alert(o1.getIncrement())},1000)"+
                    "}"
                ]
            },
            setIncrement:{
                $desc:"设置增量值.只对 'spin' 类型有效",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ci14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "xui.asyRun(function(){o1.setIncrement(0.02);alert(o1.getIncrement())},1000)"+
                    "}"
                ]
            },
            getMin:{
                $desc:"获取最小值.只对 'spin' 类型有效",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.ci15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "xui.asyRun(function(){o1.setMin(-2);alert(o1.getMin())},1000)"+
                    "}"
                ]
            },
            setMin:{
                $desc:"设置最小值.只对 'spin' 类型有效",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ci16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "xui.asyRun(function(){o1.setMin(-2);alert(o1.getMin())},1000)"+
                    "}"
                ]
            },
            getMax:{
                $desc:"获取最大值.只对 'spin' 类型有效",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.ci17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "xui.asyRun(function(){o1.setMax(2);alert(o1.getMax())},1000)"+
                    "}"
                ]
            },
            setMax:{
                $desc:"设置最大值.只对 'spin' 类型有效",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ci18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'spin'}));"+
                    "xui.asyRun(function(){o1.setMax(2);alert(o1.getMax())},1000)"+
                    "}"
                ]
            },
            onFileDlgOpen:{
                $desc:"当上载文件选择对话框打开时调用",
                $paras:[
                    $profile,
                    "src : String, 事件源的 xid"
                ],
                $snippet:[
                    "var id='xui.temp.ci99'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ComboInput({type:'file'}));"+
                    "o.onFileDlgOpen(function(){alert('File upload dialog is open')});"+
                    "}"
                ]
            },
            beforeComboPop:{
                $desc:"当命令按钮按下时（弹出窗口弹出前）调用.如返false,系统默认的弹出窗口不会出现",
                $paras:[
                    $profile,
                    "pos : Object, 鼠标位置",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.ci10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',type:'cmdbox'}));"+
                    "o1.beforeComboPop(function(p){p.boxing().setUIValue( 'beforeComboPop' )});"+
                    "}"
                ]
            },
            beforePopShow:{
                $desc:"在弹出窗口显示前调用.如返false,弹出窗口不会显示",
                $paras:[
                    $profile,
                    "popCtl : xui.UIProfile, 弹出窗口对象"
                ]
            },
            afterPopShow:{
                $desc:"在弹出窗口显示后调用",
                $paras:[
                    "profile : xui.UIdestroyed",
                    "popCtl : xui.UI, 弹出窗口对象"
                ]
            },
            afterPopHide:{
                $desc:"在弹出窗口隐去后调用",
                $paras:[
                    "profile : xui.UIdestroyed",
                    "popCtl : xui.UI, 弹出窗口对象"
                ]
            },
            onClick:{
                $desc:"当鼠标单击控件pop按钮时调用(只对 'popbox' 或 'getter'类型的有效)",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "value: String, 控件的显示值"
                ]
            },
            onCommand:{
                $desc:"当command按钮按下时调用. 只对带有保存按钮的多选框有效",
                $paras:[
                    $profile,
                    "src : String, 按钮 DOM 元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.ci11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o1,o2;xui(id).prepend(o1=new xui.UI.ComboInput({position:'relative',commandBtn:'save'}));"+
                    "o1.onCommand(function(p){alert( p.boxing().getUIValue() )});"+
                    "}"
                ]
            }
        }
    });
 
    xui.set(xui.Locale,["cn","doc","xui","UI","Stacks"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Stacks 类",
        constructor:{
            $desc:"生成一个xui.UI.Stacks对象"
        },
        prototype:{
            getBorderType:{
                $desc:"获取块控件的边框种类",
                $rtn:"String"
            },
            setBorderType:{
                $desc:"设置块控件的边框种类",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none','inset','outset','groove' 或 'ridge'",
                    $force
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","ButtonViews"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.ButtonViews 类",
        constructor:{
            $desc:"生成一个xui.UI.ButtonViews对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            setBarLocation:{
                $desc:"设置按钮条的位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'top','bottom','left' or 'right'. 默认为 'top'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.bv1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "var arr=['top','bottom','left','right'];"+
                    "xui.Thread(null,[function(id){if(!arr.length)return xui.Thread.abort(id); var type=arr.shift();o.setBarLocation(type);alert(o.getBarLocation())}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            getBarLocation:{
                $desc:"获取按钮条的位置",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.bv2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "var arr=['top','bottom','left','right'];"+
                    "xui.Thread(null,[function(id){if(!arr.length)return xui.Thread.abort(id); var type=arr.shift();o.setBarLocation(type);alert(o.getBarLocation())}],1000,null,null,null,true).start();"+
                    "}"
                ]
            },
            setBarHAlign:{
                $desc:"设置按钮条的水平对齐方式 ",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.bv3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){o.setBarHAlign('right'); alert(o.getBarHAlign());},1000);"+
                    "}"
                ]
            },
            getBarHAlign:{
                $desc:"获取按钮条的水平对齐方式",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.bv4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){o.setBarHAlign('right'); alert(o.getBarHAlign());},1000);"+
                    "}"
                ]
            },
            setBarVAlign:{
                $desc:"设置按钮条的垂直对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'top' or 'bottom'. 默认为 'top'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.bv3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){o.setBarVAlign('bottom'); alert(o.getBarVAlign());},1000);"+
                    "}"
                ]
            },
            getBarVAlign:{
                $desc:"获取按钮条的垂直对齐方式",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.bv4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){o.setBarVAlign('bottom'); alert(o.getBarVAlign());},1000);"+
                    "}"
                ]
            },
            setBarSize:{
                $desc:"设置按钮条的大小",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.bv3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){o.setBarSize(30); alert(o.getBarSize());},1000);"+
                    "}"
                ]
            },
            getBarSize:{
                $desc:"按钮条的大小",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.bv4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ButtonViews({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){o.setBarSize(30); alert(o.getBarSize());},1000);"+
                    "}"
                ]
            },
            getSideBarSize:{
                $desc:"得到侧栏大小",
                $rtn:"String"
            },
            setSideBarSize:{
                $desc:"设置侧栏大小",
                $rtn:"[Number/String]",
                $paras:[
                    "value [必需参数] : String, em 或 px 数字",
                    $force
                ]
            },
            getSideBarStatus:{
                $desc:"得到侧栏状态",
                $rtn:"String"
            },
            setSideBarStatus:{
                $desc:"设置侧栏状态",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, fold 或 expand",
                    $force
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","RadioBox"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.RadioBox 类",
        constructor:{
            $desc:"生成xui.UI.RadioBox对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getCheckBox:{
                $desc:"得到是否是显示成checkbox样式",
                $rtn:"Boolean"
            },
            setCheckBox:{
                $desc:"设置是否显示成checkbox样式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getLabelSize:{
                $desc:"获取标签的大小",
                $rtn:"Number"
            },
            setLabelSize:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelPos:{
                $desc:"获取标签的位置",
                $rtn:"String"
            },
            setLabelPos:{
                $desc:"设置标签的位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : left, right, top, bottom 之一",
                    $force
                ]
            },
            getLabelGap:{
                $desc:"获取标签与输入框的距离",
                $rtn:"Number"
            },
            setLabelGap:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelCaption:{
                $desc:"获取标签的文字",
                $rtn:"String"
            },
            setLabelCaption:{
                $desc:"设置标签的文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getLabelHAlign:{
                $desc:"获取标签的水平对齐方式",
                $rtn:"String"
            },
            setLabelHAlign:{
                $desc:"设置按标签的水平对齐方式 ",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'",
                    $force
                ]
            },
            onLabelClick:{
                $desc:"在单击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelDblClick:{
                $desc:"在双击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelActive:{
                $desc:"当鼠标在标签上按下时调用",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });


    xui.set(xui.Locale,["cn","doc","xui","UI","ColorPicker"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.ColorPicker 类",
        constructor:{
            $desc:"生成一个xui.UI.ColorPicker对象"
        },
        getTextColor:{
            $desc:"获取在指定颜色背景上显示最醒目的前景颜色",
            $rtn:'String',
            $paras:[
                "value [必需参数] : String, 颜色值,例如 '#FFFFFF' "
            ],
            $snippet:[
                "alert(xui.UI.ColorPicker.getTextColor('#00ff00'));alert(xui.UI.ColorPicker.getTextColor('#333333'));"
            ]
        },
        hex2rgb:{
            $desc:"将16进制颜色编码(如 #FF00FF)转化为RGB颜色编码(如[-16, 15, 240])",
            $rtn:'Array',
            $paras:[
                "hex [必需参数] : String"
            ],
            $snippet:[
                "alert(xui.UI.ColorPicker.hex2rgb('#00ff00'))"
            ]
        },
        hsv2rgb:{
            $desc:"将一个HSV颜色编码(如[233, 1, 0.94])转化为RGB颜色编码(如[-16, 15, 240])",
            $rtn:'Array',
            $paras:[
                "h [必需参数] : Number. 0-360",
                "s [必需参数] : Number. 0-1",
                "v [必需参数] : Number. 0-1"
            ],
            $snippet:[
                "alert(xui.UI.ColorPicker.hsv2rgb(233, 1, 0.94))"
            ]
        },
        rgb2hsv:{
            $desc:"将一个RGB颜色编码(如[-16, 15, 240])转化为HSV颜色编码(如[233, 1, 0.94])",
            $rtn:'Array',
            $paras:[
                "r [必需参数] : Number. 0-255",
                "g [必需参数] : Number. 0-255",
                "b [必需参数] : Number. 0-255"
            ],
            $snippet:[
                "alert(xui.UI.ColorPicker.rgb2hsv(0, 28, 241))"
            ]
        },
        rgb2hex:{
            $desc:"将RGB颜色编码(如[-16, 15, 240])转化为16进制颜色编码(如 #FF00FF)",
            $rtn:'Array',
            $paras:[
                "r [必需参数] : Number. 0-255",
                "g [必需参数] : Number. 0-255",
                "b [必需参数] : Number. 0-255"
            ],
            $snippet:[
                "alert(xui.UI.ColorPicker.rgb2hex(0, 28, 241))"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]"
            },
            getColorName:{
                $desc:"获取颜色名字(如果有的话,如深红,咖啡色)",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.clr1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                    "o.afterUIValueSet(function(){alert(o.getColorName())});"+
                    "}"
                ]
            },
            getAdvance:{
                $desc:"判断是否显示颜色框又半部分以便选择更多颜色",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.clr2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                    "xui.asyRun(function(){o.setAdvance(true);alert(o.getAdvance())},1000);"+
                    "}"
                ]
            },
            setAdvance:{
                $desc:"设置是否显示颜色框又半部分以便选择更多颜色",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.clr2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ColorPicker({position:'relative',closeBtn:false}));"+
                    "xui.asyRun(function(){o.setAdvance(true);alert(o.getAdvance())},1000);"+
                    "}"
                ]
            },
            getCloseBtn:{
                $desc:"判断是否带有关闭按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.clr3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ColorPicker({position:'relative'}));"+
                    "xui.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            setCloseBtn:{
                $desc:"设置是否带有关闭按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.clr4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ColorPicker({position:'relative'}));"+
                    "xui.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            getBarDisplay:{
                $desc:"判断是否带有显示条",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.clr5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ColorPicker({position:'relative'}));"+
                    "xui.asyRun(function(){o.setBarDisplay(false);alert(o.getBarDisplay())},1000);"+
                    "}"
                ]
            },
            setBarDisplay:{
                $desc:"设置是否带有显示条",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.clr6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ColorPicker({position:'relative'}));"+
                    "xui.asyRun(function(){o.setBarDisplay(false);alert(o.getBarDisplay())},1000);"+
                    "}"
                ]
            },

            beforeClose:{
                $desc:"在颜色框关闭前调用. 返回false可以阻止颜色框关闭",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.clr9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.ColorPicker({position:'relative'}));"+
                    "o.beforeClose(function(){return false;});"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","DatePicker"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.DatePicker 类",
        constructor:{
            $desc:"生成一个xui.UI.DatePicker对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]"
            },
            getTimeInput:{
                $desc:"得到日期选择框是否带有时间输入功能",
                $rtn:"Boolean"
            },
            setTimeInput:{
                $desc:"设置日期选择框是否带有时间输入功能",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getFirstDayOfWeek:{
                $desc:"得到日期选择框的周开始日.0-6表示周日到周六",
                $rtn:"Number"
            },
            setFirstDayOfWeek:{
                $desc:"设置日期选择框的周开始日.0-6表示周日到周六",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number. 0-6表示周日到周六",
                    $force
                ]
            },
            getOffDays:{
                $desc:"得到日期选择框的休假信息.由0到6组成的字符串.0-6表示周日到周六",
                $rtn:"String"
            },
            setOffDays:{
                $desc:"设置日期选择框的休假信息.由0到6组成的字符串.0-6表示周日到周六",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 由0到6组成的字符串.0-6表示周日到周六",
                    $force
                ]
            },
            getHideWeekLabels:{
                $desc:"得到日期选择框是否带有周信息",
                $rtn:"Boolean"
            },
            setHideWeekLabels:{
                $desc:"设置日期选择框是否带有带有周信息",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getDateInputFormat:{
                $desc:"得到日期选择框的日期输入格式",
                $rtn:"String"
            },
            setDateInputFormat:{
                $desc:"设置日期选择框的日期输入格式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 只能是 yyyy-mm-dd/mm-dd-yyyy/dd-mm-yyyy 之一",
                    $force
                ]
            },
            getCloseBtn:{
                $desc:"判断日期选择框是否带有关闭按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.dp1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.DatePicker({position:'relative'}));"+
                    "xui.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            setCloseBtn:{
                $desc:"设置日期选择框是否带有关闭按钮",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.dp2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.DatePicker({position:'relative'}));"+
                    "xui.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            getDateFrom:{
                $desc:"获取日期选择器的开始日期",
                $rtn:"Object, Date Object",
                $snippet:[
                    "var id='xui.temp.dp2-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.DatePicker({position:'relative'}));"+
                    "xui.asyRun(function(){alert(o.getDateFrom())},1000);"+
                    "}"
                ]
            },

            beforeClose:{
                $desc:"当用户单击关闭或取消按钮时调用. 返回false可阻止日期选择器被关闭",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.dp3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.DatePicker({position:'relative'}));"+
                    "o.beforeClose(function(){alert('关闭窗口动作被阻止！');return false;});"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","TimePicker"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.TimePicker 类",
        constructor:{
            $desc:"生成一个xui.UI.TimePicker对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]"
            },
            getCloseBtn:{
                $desc:"判断时间选择器是否带有关闭按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tp1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.TimePicker({position:'relative'}));"+
                    "xui.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            setCloseBtn:{
                $desc:"设置时间选择器是否带有关闭按钮.",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tp2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.TimePicker({position:'relative'}));"+
                    "xui.asyRun(function(){o.setCloseBtn(false);alert(o.getCloseBtn())},1000);"+
                    "}"
                ]
            },
            beforeClose:{
                $desc:"在关闭选择器前调用. 返回false将阻止选择器关闭",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.tp3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.TimePicker({position:'relative'}));"+
                    "o.beforeClose(function(){return false;});"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Slider"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Slider 类",
        constructor:{
            $desc:"生成一个xui.UI.Slider对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getType:{
                $desc:"获取Slider的显示类型. 可以是'vertical'(垂直) 或 'horizontal'(水平) ",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.sl2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setType('horizontal'); alert(o.getType())},1000);"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置Slider的显示类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 可以是'vertical'(垂直) 或 'horizontal'(水平)",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.sl3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider({width:50,height:150})));"+
                    "xui.asyRun(function(){o.setType('vertical'); alert(o.getType())},1000);"+
                    "}"
                ]
            },
            getSteps:{
                $desc:"获取Slider的步长",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.sl4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setSteps(10).setUIValue('2:5'); alert(o.getSteps()); },1000);"+
                    "}"
                ]
            },
            setSteps:{
                $desc:"设置Slider的步长",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number, 步长整数值",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.sl5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setSteps(10).setUIValue('2:5'); alert(o.getSteps()); },1000);"+
                    "}"
                ]
            },
            getShowIncreaseHandle:{
                $desc:"获取是否显示增加按钮属性",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.sl6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setShowIncreaseHandle(false); alert(o.getShowIncreaseHandle()); },1000);"+
                    "}"
                ]
            },
            setShowIncreaseHandle:{
                $desc:"设置是否显示增加按钮属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.sl7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setShowIncreaseHandle(false); alert(o.getShowIncreaseHandle()); },1000);"+
                    "}"
                ]
            },
            getShowDecreaseHandle:{
                $desc:"获取是否显示减小按钮属性",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.sl8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setShowDecreaseHandle(false); alert(o.getShowDecreaseHandle()); },1000);"+
                    "}"
                ]
            },
            setShowDecreaseHandle:{
                $desc:"设置是否显示减小按钮属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.sl9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setShowDecreaseHandle(false); alert(o.getShowDecreaseHandle()); },1000);"+
                    "}"
                ]
            },
            getIsRange:{
                $desc:"获取是否为Range类型（显示两个拖拽点）的Slider",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.sl10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setIsRange(false); alert(o.getIsRange()); },1000);"+
                    "}"
                ]
            },
            setIsRange:{
                $desc:"设置是否为Range类型（显示两个拖拽点）的Slider",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.sl11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Slider()));"+
                    "xui.asyRun(function(){o.setIsRange(false); alert(o.getIsRange()); },1000);"+
                    "}"
                ]
            },
            getLabelSize:{
                $desc:"获取标签的大小",
                $rtn:"Number"
            },
            setLabelSize:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelPos:{
                $desc:"获取标签的位置",
                $rtn:"String"
            },
            setLabelPos:{
                $desc:"设置标签的位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : left, right, top, bottom 之一",
                    $force
                ]
            },
            getLabelGap:{
                $desc:"获取标签与输入框的距离",
                $rtn:"Number"
            },
            setLabelGap:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelCaption:{
                $desc:"获取标签的文字",
                $rtn:"String"
            },
            setLabelCaption:{
                $desc:"设置标签的文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getLabelHAlign:{
                $desc:"获取标签的水平对齐方式",
                $rtn:"String"
            },
            setLabelHAlign:{
                $desc:"设置按标签的水平对齐方式 ",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'",
                    $force
                ]
            },
            onLabelClick:{
                $desc:"在单击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelDblClick:{
                $desc:"在双击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelActive:{
                $desc:"当鼠标在标签上按下时调用",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });


    xui.set(xui.Locale,["cn","doc","xui","UI","List"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.List 类",
        constructor:{
            $desc:"生成一个xui.UI.List对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getShowValue:{
                $desc:"获取控件的显示值",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.list00'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "o.setValue('b'); xui.asyRun(function(){ alert(o.getValue() + '->' + o.getShowValue()) },1000)"+
                    "}"
                ]
            },
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.list0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){o.activate();},1000)"+
                    "}"
                ]
            },
            adjustSize:{
                $desc:"按照菜单的内容自动调整宽度",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.list3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){o.adjustSize();},1000)"+
                    "}"
                ]
            },
            getMaxHeight:{
                $desc:"获取最大高度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.list4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "alert(o.setMaxHeight(40).getMaxHeight());xui.asyRun(function(){o.adjustSize();},1000)"+
                    "}"
                ]
            },
            setMaxHeight:{
                $desc:"设置最大高度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.list5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "alert(o.setMaxHeight(40).getMaxHeight());xui.asyRun(function(){o.adjustSize();},1000)"+
                    "}"
                ]
            },
            getSelMode:{
                $desc:"获取选择模式'none'表示不能选择, 'single'表示可单选, 'multi'表示可多选, 'multibycheckbox'表示可多选,并且只能点击checkbox来选中",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.list6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setSelMode('multi').getSelMode());},1000)"+
                    "}"
                ]
            },
            setSelMode:{
                $desc:"设置选择模式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none' 为不选, 'multi'为多选, 'multibycheckbox'表示可多选并且只能点击checkbox来选中 or 'single'为单选",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.list7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setSelMode('multi').getSelMode());},1000)"+
                    "}"
                ]
            },
            getNoCtrlKey:{
                $desc:"获取是否在多选择模式下需要用Ctrl来辅助多选",
                $rtn:"Boolean"
            },
            setNoCtrlKey:{
                $desc:"设置是否在多选择模式下需要用Ctrl来辅助多选",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getBorderType:{
                $desc:"获取块控件的边框种类",
                $rtn:"String"
            },
            setBorderType:{
                $desc:"设置块控件的边框种类",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none','inset','outset','groove' 或 'ridge'",
                    $force
                ]
            },
            getItemRow:{
                $desc:"得到是否是显示成行样式",
                $rtn:"Boolean"
            },
            setItemRow:{
                $desc:"设置是否是显示成行样式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getTagCmds:{
                $desc:"得到命令按钮集",
                $rtn:"Array"
            },
            setTagCmds:{
                $desc:"设置命令按钮集",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 项数组",
                    $force
                ]
            },
            getOptBtn:{
                $desc:"返回选项按钮类",
                $rtn:"String"
            },
            setOptBtn:{
                $desc:"设置选项按钮类",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getLabelSize:{
                $desc:"获取标签的大小",
                $rtn:"Number"
            },
            setLabelSize:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelPos:{
                $desc:"获取标签的位置",
                $rtn:"String"
            },
            setLabelPos:{
                $desc:"设置标签的位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : left, right, top, bottom 之一",
                    $force
                ]
            },
            getLabelGap:{
                $desc:"获取标签与输入框的距离",
                $rtn:"Number"
            },
            setLabelGap:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelCaption:{
                $desc:"获取标签的文字",
                $rtn:"String"
            },
            setLabelCaption:{
                $desc:"设置标签的文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getLabelHAlign:{
                $desc:"获取标签的水平对齐方式",
                $rtn:"String"
            },
            setLabelHAlign:{
                $desc:"设置按标签的水平对齐方式 ",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'",
                    $force
                ]
            },
            onLabelClick:{
                $desc:"在单击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelDblClick:{
                $desc:"在双击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelActive:{
                $desc:"当鼠标在标签上按下时调用",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onItemSelected:{
                $desc:"当列表项被选择时调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid",
                    "type: Number, 0:没有影响;1:item被选中;-1:item被清除选中"
                ],
                $snippet:[
                    "var id='xui.temp.list8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({selMode:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "o.onItemSelected(function(p,item,s){alert(item.id);});"+
                    "}"
                ]
            },
            beforeClick:{
                $desc:"在单击条目前触发该事件.如返回 false, 单击事件取消",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onClick:{
                $desc:"在单击条目的时候触发该事件",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            afterClick:{
                $desc:"在单击条目后触发该事件",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onDblclick:{
                $desc:"在双击条目的时候触发该事件",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.list9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.List({selMode:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "o.onDblclick(function(p,item,s){alert(item.id);});"+
                    "}"
                ]
            },
            onShowOptions :{
                $desc:"当鼠标单击选项按钮的时候触发",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onCmd:{
                $desc:"当用户单击内部按钮的时候调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "cmdKey: String, 命令的键值",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","StatusButtons"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.StatusButtons 类",
        constructor:{
            $desc:"生成一个xui.UI.StatusButtons对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getItemMargin:{
                $desc:"获取超链接队列的外补丁",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.llist1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.StatusButtons({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            setItemMargin:{
                $desc:"设置超链接队列的外补丁",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.llist2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.StatusButtons({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemAlign:{
                $desc:"获取状态按钮的对齐方式",
                $rtn:"String"
            },
            setItemAlign:{
                $desc:"设置状态按钮的对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String'left', 'center' or 'right'",
                    $force
                ]
            },
            getItemWidth:{
                $desc:"获取状态按钮的宽度",
                $rtn:"Number"
            },
            setItemWidth:{
                $desc:"设置状态按钮的宽度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelSize:{
                $desc:"获取标签的大小",
                $rtn:"Number"
            },
            setLabelSize:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelPos:{
                $desc:"获取标签的位置",
                $rtn:"String"
            },
            setLabelPos:{
                $desc:"设置标签的位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : left, right, top, bottom 之一",
                    $force
                ]
            },
            getLabelGap:{
                $desc:"获取标签与输入框的距离",
                $rtn:"Number"
            },
            setLabelGap:{
                $desc:"设置标签的大小.当标签的大小为0时,不显示标签",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLabelCaption:{
                $desc:"获取标签的文字",
                $rtn:"String"
            },
            setLabelCaption:{
                $desc:"设置标签的文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getLabelHAlign:{
                $desc:"获取标签的水平对齐方式",
                $rtn:"String"
            },
            setLabelHAlign:{
                $desc:"设置按标签的水平对齐方式 ",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'. 默认为 'left'",
                    $force
                ]
            },
            onLabelClick:{
                $desc:"在单击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelDblClick:{
                $desc:"在双击标签的时候触发该事件",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onLabelActive:{
                $desc:"当鼠标在标签上按下时调用",
                $paras:[
                    $profile,
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onItemClick:{
                $desc:"当某个超链接队列项被单击时调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.llist8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.StatusButtons({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "o.onItemClick(function(p,item,s){alert(item.id);});"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Gallery"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Gallery 类",
        constructor:{
            $desc:"生成一个xui.UI.Gallery (画廊)对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getStatus:{
                $desc:"获取某个画廊项的状态",
                $paras:[
                    "subId [必需参数] : String, 画廊项id"
                ],
                $rtn:"String, 'ini'表示初始化, 'error'表示装载错误, 'loaded'表示装载成功",
                $snippet:[
                    "var id='xui.temp.ga001'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.getStatus('c'));});"+
                    "xui.asyRun(function(){alert(o.getStatus('c'));},3000);"+
                    "}"
                ]
            },
            getAutoItemSize:{
                $desc:"得到子项的尺寸是否随图片的大小自动变化",
                $rtn:"Boolean"
            },
            setAutoItemSize:{
                $desc:"设置子项的尺寸是否随图片的大小自动变化",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getImgHeight:{
                $desc:"获取画廊项的高度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ga1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemHeight(40).setImgHeight(30).getImgHeight());},1000)"+
                    "}"
                ]
            },
            setImgHeight:{
                $desc:"设置画廊项的高度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ga2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemHeight(40).setImgHeight(30).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getImgWidth:{
                $desc:"获取画廊项的图片宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ga3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemWidth(40).setImgWidth(40).getImgWidth());},1000)"+
                    "}"
                ]
            },
            setImgWidth:{
                $desc:"设置画廊项的图片宽度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.da4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemWidth(40).setImgWidth(40).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemWidth:{
                $desc:"获取画廊项的宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ga5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemWidth(40).getItemWidth());},1000)"+
                    "}"
                ]
            },
            setItemWidth:{
                $desc:"设置画廊项的宽度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ga6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemWidth(40).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemHeight:{
                $desc:"获取画廊项的宽度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ga7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemHeight(40).getItemHeight());},1000)"+
                    "}"
                ]
            },
            setItemHeight:{
                $desc:"设置画廊项的宽度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ga8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemHeight(40).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemMargin:{
                $desc:"获取画廊项的外补丁",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ga9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            setItemMargin:{
                $desc:"设置画廊项的外补丁",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ga10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemMargin(10).getItemMargin());},1000)"+
                    "}"
                ]
            },
            getItemPadding:{
                $desc:"获取画廊项的内补丁",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.ga11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                    "}"
                ]
            },
            setItemPadding:{
                $desc:"设置画廊项的内补丁",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.ga12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Gallery({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]}));"+
                    "xui.asyRun(function(){alert(o.setItemPadding(10).getItemPadding());},1000)"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Panel"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Panel 类",
        constructor:{
            $desc:"生辰一个xui.UI.Panel对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            resetPanelView:{
                $desc:"清空Panel容器，到初始状态,然后折叠",
                $rtn:"[self]",
                $paras:[
                    "remvoeChildren [可选参数] : Boolean, 是否移除子控件",
                    "destroyChildren [可选参数] : Boolean, 是否销毁子控件"
                ]
            },
            iniPanelView:{
                $desc:"触发onIniPanelView事件",
                $rtn:"[self]"
            },
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]",
                $paras:[
                    "flag [可选参数] : Boolean, false表示去掉激活"
                ],
                $snippet:[
                    "var id='xui.temp.panel01'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.activate();},500); xui.asyRun(function(){btn.activate(false);},1000);"+
                    "}"
                ]
            },
            getCloseBtn :{
                $desc:"判断面板是否带有关闭按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.panel35'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setCloseBtn(true); alert(btn.getCloseBtn ())},1000)"+
                    "}"
                ]
            },
            setCloseBtn :{
                $desc:"设置面板是否带有关闭按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.panel36'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setCloseBtn(true); alert(btn.getCloseBtn ())},1000)"+
                    "}"
                ]
            },
            getNoFrame:{
                $desc:"判断面板是否带有外框架",
                $rtn:"Boolean"
            },
            setNoFrame:{
                $desc:"设置面板是否带有外框架",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getPopBtn :{
                $desc:"获取面板是否带有弹出按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.panel37'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setPopBtn(true); alert(btn.getPopBtn ())},1000)"+
                    "}"
                ]
            },
            setPopBtn :{
                $desc:"设置面板是否带有弹出按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.panel38'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setPopBtn(true); alert(btn.getPopBtn ())},1000)"+
                    "}"
                ]
            },
            getOptBtn :{
                $desc:"获取面板是否带有选项按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.panel39'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setOptBtn('xui-uicmd-opt'); alert(btn.getOptBtn ())},1000)"+
                    "}"
                ]
            },
            setOptBtn :{
                $desc:"设置面板是否带有选项按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.panel40'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setOptBtn(true); alert(btn.getOptBtn ())},1000)"+
                    "}"
                ]
            },
            getInfoBtn :{
                $desc:"获取面板是否带有帮助按钮",
                $rtn:"Boolean"
            },
            setInfoBtn :{
                $desc:"设置面板是否带有帮助按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getRefreshBtn :{
                $desc:"获取面板是否带有刷新按钮",
                $rtn:"Boolean"
            },
            setRefreshBtn :{
                $desc:"设置面板是否带有刷新按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getToggleBtn :{
                $desc:"获取面板是否带有打开/收缩按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.panel41'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setToggleBtn(true); alert(btn.getToggleBtn ())},1000)"+
                    "}"
                ]
            },
            setToggleBtn :{
                $desc:"设置面板是否带有打开/收缩按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.panel42'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setToggleBtn(true); alert(btn.getToggleBtn ())},1000)"+
                    "}"
                ]
            },
            getCaption :{
                $desc:"获取标题文字",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.panel1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            setCaption :{
                $desc:"设置标题文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.panel2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel);"+
                    "xui.asyRun(function(){btn.setCaption ('tag'); alert(btn.getCaption ())},1000)"+
                    "}"
                ]
            },
            getImage :{
                $desc:"获取图标的url",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.panel3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            setImage :{
                $desc:"设置图标的url",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String, 图标的url",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.panel4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif'); alert(btn.getImage())},1000)"+
                    "}"
                ]
            },
            getImagePos :{
                $desc:"获取图标的图像偏移属性",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.panel5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            setImagePos :{
                $desc:"设置图标的图像偏移属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, corresponding CSS value",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.panel6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel({height:50}));"+
                    "xui.asyRun(function(){btn.setImage('img/img.gif').setImagePos('left -16px'); alert(btn.getImagePos())},1000)"+
                    "}"
                ]
            },
            getImageBgSize :{
                $desc:"得到背景图尺寸属性",
                $rtn:"String"
            },
            setImageBgSize :{
                $desc:"设置背景图尺寸属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 背景图尺寸",
                    $force
                ]
            },           
            getToggle:{
                $desc:"判断面板处于打开还是收缩状态",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.panel7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel({html:'content'}));"+
                    "xui.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                    "}"
                ]
            },
            setToggle :{
                $desc:"设置面板处于打开或收缩状态",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.panel8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var btn;xui(id).prepend(btn=new xui.UI.Panel({html:'content'}));"+
                    "xui.asyRun(function(){btn.setToggle(false); alert(btn.getToggle ())},1000)"+
                    "}"
                ]
            },
            getBorderType:{
                $desc:"获取块控件PANEL的边框种类",
                $rtn:"String"
            },
            setBorderType:{
                $desc:"设置块控件PANEL的边框种类",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none','inset','outset','groove' 或 'ridge'",
                    $force
                ]
            },
            beforeExpand:{
                $desc:"在面板打开前调用.如返回 false, 面板不会打开",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.panel9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.Panel({toggleBtn:true,html:'content'});"+
                    "o.beforeExpand(function(){alert('beforeExpand')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            beforeFold:{
                $desc:"当面板收缩时调用.如返回 false, 面板不会打开",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.panel10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.Panel({toggleBtn:true,html:'content'});"+
                    "o.beforeExpand(function(){alert('beforeExpand')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            afterExpand:{
                $desc:"在面板打开后调用"
            },
            afterFold:{
                $desc:"在面板收缩后调用"
            },
            onIniPanelView:{
                $desc:"当面板初始化时调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.panel11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.Panel({toggleBtn:true,html:'content'});"+
                    "o.beforeExpand(function(){alert('beforeExpand')}).beforeFold(function(){alert('beforeFold')}).onIniPanelView(function(){alert('onIniPanelView')});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            onClickBar:{
                $desc:"当单击标题栏时调用",
                $paras:[
                    $profile,
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.panel12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Panel({position:'relative',closeBtn:true,html:'content'}));"+
                    "o.onClickBar(function(){alert('onClickBar')});"+
                    "}"
                ]
            },
            beforePop:{
                $desc:"在面板被弹出前调用. 返回false可阻止面板被弹出",
                $paras:[
                    $profile,
                    "options : Object. 可以包括以下键值: parent, host, properties, events, host, theme, CS, CC, CB, CF",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            beforeClose:{
                $desc:"在面板被关闭前调用. 返回false可阻止面板被关闭",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.panel13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Panel({position:'relative',closeBtn:true,html:'content'}));"+
                    "o.beforeClose(function(){return false;});"+
                    "}"
                ]
            },
            onShowInfo:{
                $desc:"在用户单击帮助按钮时调用",
                $paras:[
                    $profile
                ]
            },
            onRefresh:{
                $desc:"在用户单击刷新按钮时调用",
                $paras:[
                    $profile
                ]
            },
            onShowOptions :{
                $desc:"当用户单击选项按钮时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.panel14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Panel({position:'relative',optBtn:true,html:'content'}));"+
                    "o.onShowOptions(function(){alert('onShowOptions');});"+
                    "}"
                ]
            },
            onClickPanel:{
                $desc:"当鼠标单击容器时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","PageBar"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.PageBar 类",
        constructor:{
            $desc:"生成一个xui.UI.PageBar对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            setPage:{
                $desc:"设置目前页",
                $rtn:"[self]",
                $paras:[
                    "value: Number. 页代码"
                ],
                $snippet:[
                    "var id='xui.temp.pb0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})));"+
                    "xui.asyRun(function(){o.setPage(100);},1000);"+
                    "}"
                ]
            },
            getCaption:{
                $desc:"得到 caption 字符串",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.pb1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setCaption('Page =>'));"+
                    "xui.asyRun(function(){alert(o.getCaption())});"+
                    "}"
                ]
            },
            setCaption:{
                $desc:"设置caption字符串",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, caption字符串",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.pb2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setCaption('Page =>'));"+
                    "xui.asyRun(function(){alert(o.getCaption())});"+
                    "}"
                ]
            },
            getNextMark:{
                $desc:"得到下一页的显示字符串",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.pb3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setNextMark('next'));"+
                    "xui.asyRun(function(){alert(o.getNextMark())});"+
                    "}"
                ]
            },
            setNextMark:{
                $desc:"设置下一页的显示字符串",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 下一页的显示字符串",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.pb4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setNextMark('next'));"+
                    "xui.asyRun(function(){alert(o.getNextMark())});"+
                    "}"
                ]
            },
            getPrevMark:{
                $desc:"得到前一页的显示字符串",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.pb5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setPrevMark('prev'));"+
                    "xui.asyRun(function(){alert(o.getPrevMark('{'))});"+
                    "}"
                ]
            },
            setPrevMark:{
                $desc:"设置前一页显示字符串",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 前一页显示字符串",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.pb6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setPrevMark('prev'));"+
                    "xui.asyRun(function(){alert(o.getPrevMark())});"+
                    "}"
                ]
            },
            getTextTpl:{
                $desc:"得到文字显示模板字符串",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.pb7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setTextTpl('[*]'));"+
                    "xui.asyRun(function(){alert(o.getTextTpl())});"+
                    "}"
                ]
            },
            setTextTpl:{
                $desc:"设置文字显示模板字符串",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 文字显示模板字符串",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.pb8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setTextTpl('[*]'));"+
                    "xui.asyRun(function(){alert(o.getTextTpl())});"+
                    "}"
                ]
            },
            getUriTpl:{
                $desc:"获取URL模板字符串",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.pb9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setUriTpl('#aaa=*'));"+
                    "xui.asyRun(function(){alert(o.getUriTpl())});"+
                    "}"
                ]
            },
            setUriTpl:{
                $desc:"设置URL模板字符串",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, URL模板字符串",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.pb10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.PageBar({value:'1:3:300'})).setUriTpl('#aaa=*'));"+
                    "xui.asyRun(function(){alert(o.getUriTpl())});"+
                    "}"
                ]
            },


            onClick:{
                $desc:"当鼠标单击一个按钮时触发",
                $paras:[
                    $profile,
                    "page : Number, 目标页码"
                ],
                $snippet:[
                    "var id='xui.temp.pb11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "xui(id).prepend((new xui.UI.PageBar({value:'1:3:300'})).onClick(function(profile,page){profile.boxing().setPage(page);}))"+
                    "}"
                ]
            },
            onPageSet:{
                $desc:"当调用 setPage 函数时触发",
                $paras:[
                    $profile,
                    "page : Number, 新页码",
                   "opage : Number, 旧页码"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Layout"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Layout 类",
        constructor:{
            $desc:"生成一个xui.UI.Layout对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            append:{
                $desc:"将一系列的xui.UIProfile添加到布局的内部",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.UIProfile/xui.UIProfile[], 一个xui.UIProfile概要对象(或一组xui.UIProfile概要对象)",
                    "subId [可选参数] : String, 布局的子项id. 该参数可以设置为[false], 表示[target]只是添加到DOM上, 并不产生和父布局项的链接关系"
                ],
                $snippet:[
                    "var id='xui.temp.lo0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "xui.asyRun(function(){o.append(new xui.UI.Button,'after');},1000);"+
                    "}"
                ]
            },
            getPanel:{
                $desc:"获取布局子项的面板",
                $rtn:"xui.Dom",
                $paras:[
                    "subId [可选参数] : String, 布局子项的id. 默认为'main'(主面板)"
                ],
                $snippet:[
                    "var id='xui.temp.lo1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "xui.asyRun(function(){o.getPanel('after').append(xui.create('<button>afgter</button>'));},1000);"+
                    "}"
                ]
            },
            getType:{
                $desc:"获取布局类型. 可以是'vertical'(垂直) 或 'horizontal'(水平) ",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.lo2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "xui.asyRun(function(){o.append(new xui.UI.Button).setType('horizontal'); alert(o.getType())},1000);"+
                    "}"
                ]
            },
            setType:{
                $desc:"设置布局类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 可以是'vertical'(垂直) 或 'horizontal'(水平)",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.lo3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "xui.asyRun(function(){o.append(new xui.UI.Button).setType('horizontal'); alert(o.getType())},1000);"+
                    "}"
                ]
            },
            insertItems:{
                $desc:"添加一些布局项",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 项数组",
                    "base [可选参数] : String, 基准项id",
                    "before [可选参数] : Boolean, 指示在基准项前还是项后插入. 默认为项后;"
                ],
                $snippet:[
                    "var id='xui.temp.lo3-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "xui.asyRun(function(){o.insertItems([{id:'a1',size:30}],'main',true)},1000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'c1',size:30,cmd:false}],'main',false)},2000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'a0',size:30, folded:true}],'after',true)},3000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'c2',size:30}],'after',false)},4000);"+
                    "}"
                ]
            },

            updateItem:{
                $desc:"更新一个布局项,并刷新对应的DOM界面",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 项的标识号",
                    "options [必需参数] : Object/String, 要更新的选项"
                ],
                $snippet:[
                    "var id='xui.temp.lo3-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Layout({items:[{id:'main'},{id:'after',size:50}]})));"+
                    "xui.asyRun(function(){o.updateItem('after',{size:30})},1000);"+
                    "xui.asyRun(function(){o.updateItem('after',{folded:true})},2000);"+
                    "xui.asyRun(function(){o.updateItem('after',{folded:false,cmd:false})},3000);"+
                    "xui.asyRun(function(){o.updateItem('after',{hidden:true})},4000);"+
                    "xui.asyRun(function(){o.updateItem('after',{folded:false,size:50,cmd:true,hidden:false})},5000);"+
                    "}"
                ]
            },
            setItems:{
                $desc:"设置布局项",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 布局项"
                ],
                $snippet:[
                    "var id='xui.temp.lo4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Layout({items:[{id:'main'},{id:'before',size:50},{id:'after',size:50}]})));"+
                    "o.append(new xui.UI.Button).append(new xui.UI.Link, 'before').append(new xui.UI.Input, 'after');"+
                    "xui.asyRun(function(){o.setType('horizontal').setItems([{id:'before', pos:'before', 'size':50, min:50, max:200}, {id:'main', min:10}, {id:'after', pos:'after', size:50}, {id:'c', pos:'after', cmd:true, size:50}])},1000);"+
                    "}"
                ]
            },
            fireCmdClickEvent:{
                $desc:"触发折叠/打开面板的click事件",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 面板的subId字符串"
                ],
                $snippet:[
                    "var id='xui.temp.lo6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Layout({items:[{id:'main'},{id:'after',cmd:true, size:50}]})));"+
                    "xui.asyRun(function(){o.fireCmdClickEvent('after'); },1000);"+
                    "}"
                ]
            },
            onClickPanel:{
                $desc:"当鼠标单击容器时调用",
                $paras:[
                    $profile,
                     "item: Object, 当前容器对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });
    xui.set(xui.Locale,["cn","doc","xui","UI","Tabs"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Tabs 类",
        constructor:{
            $desc:"生成一个xui.UI.Tabs对象"
        },
        getDropKeys:{
            $desc:"从指定的profile中获取拖动键值",
            $rtn:"String",
            $paras:[
                "profile [必需参数] : 目标的profile",
                "node [必需参数] : 相应DOM元素的xid"
            ],
            $memo:"一般情况下,程序员不需要调用该函数. 该函数可能被子类覆盖"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            append:{
                $desc:"将一系列xui.UIProfile概要对象添加到标签中",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.UIProfile/xui.UIProfile[], 一个xui.UI对象(或一系列xui.UIProfile概要对象)",
                    "subId [可选参数] : String, 标签项id. 如果该参数为false, [target]只被添加到DOM中, 而不在[target]和父元素中建立链接"
                ],
                $snippet:[
                    "var id='xui.temp.tabs0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}],value:'a'})));"+
                    "xui.asyRun(function(){o.append(new xui.UI.Button,'a');},1000);"+
                    "}"
                ]
            },
            fireItemClickEvent:{
                $desc:"触发给定标签的click事件",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 标签项的subId字符串"
                ],
                $snippet:[
                    "var id='xui.temp.tabs004'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "xui.asyRun(function(){o.fireItemClickEvent('a')},1000);"+
                    "}"
                ]
            },
            resetPanelView:{
                $desc:"清空Tab的容器,并恢复到最初状态",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 标签项的subId字符串, [true]表示全部子容器",
                    "remvoeChildren [可选参数] : Boolean, 是否移除子控件",
                    "destroyChildren [可选参数] : Boolean, 是否销毁子控件"
                ]
            },
            iniPanelView:{
                $desc:"触发onIniPanelView事件",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 标签项的subId字符串"
                ]
            },
            setItems:{
                $desc:"设置一系列的标签项",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 标签项数组"
                ],
                $snippet:[
                    "var id='xui.temp.tabs2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto'})));"+
                    "xui.asyRun(function(){o.setItems([{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}])},1000);"+
                    "}"
                ]
            },
            removeItems:{
                $desc:"从标签中移除一系列标签项",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 标签项id数组"
                ],
                $snippet:[
                    "var id='xui.temp.tabs4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "xui.asyRun(function(){o.removeItems(['a','b'])},1000);"+
                    "}"
                ]
            },
            clearItems:{
                $desc:"清除所有标签项",
                $rtn:"[self]",
                $paras:[
                    "key [可选参数] : String, 模板键值,该值对应的节点包括所有的标签项节点. 默认为'ITEMS'"
                ],
                $snippet:[
                    "var id='xui.temp.tabs5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "xui.asyRun(function(){o.clearItems();},1000);"+
                    "}"
                ]
            },
            getHAlign :{
                $desc:"获取水平对齐方式. 可以为'left', 'center' or 'right'",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.tabs7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "alert(o.getHAlign());xui.asyRun(function(){o.setHAlign('center')},1000);"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tabs8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "alert(o.getHAlign());xui.asyRun(function(){o.setHAlign('right')},1000);"+
                    "}"
                ]
            },
            getItemAlign:{
                $desc:"获取按钮的对齐方式",
                $rtn:"String"
            },
            setItemAlign:{
                $desc:"设置按钮的对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String'left', 'center' or 'right'",
                    $force
                ]
            },
            getItemWidth:{
                $desc:"获取按钮的宽度",
                $rtn:"Number"
            },
            setItemWidth:{
                $desc:"设置按钮的宽度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getLazyAppend :{
                $desc:"判断面板是否是延迟加载的",
                $rtn:"Boolean"
            },
            setLazyAppend :{
                $desc:"设置面板是否是延迟加载的",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getNoPanel :{
                $desc:"判断标签是否带有面板",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tabs9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "alert(o.getNoPanel());xui.asyRun(function(){o.setNoPanel(false)},1000);"+
                    "}"
                ]
            },
            setNoPanel :{
                $desc:"设置当前页面控件是否有面板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tabs10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "alert(o.getNoPanel());xui.asyRun(function(){o.setNoPanel(true)},1000);"+
                    "}"
                ]
            },
            getNoHandler :{
                $desc:"判断标签是否带有控制板",
                $rtn:"Boolean"
            },
            setNoHandler :{
                $desc:"设置当前页面控件是否有控制版",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getDropKeysPanel :{
                $desc:"得到面板的drop键值",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.tabs11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "xui.asyRun(function(){o.setDropKeysPanel('kk');alert(o.getDropKeysPanel());},1000);"+
                    "}"
                ]
            },
            setDropKeysPanel :{
                $desc:"设置面板的drop键值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tabs12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "xui.asyRun(function(){o.setDropKeysPanel('kk');alert(o.getDropKeysPanel());},1000);"+
                    "}"
                ]
            },
            getCurPanel:{
                $desc:"获取当前激活的标签项的面板",
                $rtn:"xui.Dom",
                $snippet:[
                    "var id='xui.temp.tabs13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}],value:'a'})));"+
                    "xui.asyRun(function(){alert(o.getCurPanel().id())},1000);"+
                    "}"
                ]
            },
            getPanel:{
                $desc:"获取id为指定id的标签项的面板",
                $rtn:"xui.Dom",
                $paras:[
                    "subId [可选参数] : String, 标签项的id"
                ],
                $snippet:[
                    "var id='xui.temp.tabs14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "xui.asyRun(function(){alert(o.getPanel('b').id())},1000);"+
                    "}"
                ]
            },
            markItemCaption:{
                $desc:"在标签项的标题上做一个标记,或去除标题上的标记",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 标签项id",
                    "mark [必需参数] : Boolean, 指示做标记还是去除标记",
                    "force [可选参数]: Boolean, 强行设置该属性. 默认为 false"
                ],
                $snippet:[
                    "var id='xui.temp.tabs15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',caption:'c c'}]})));"+
                    "xui.asyRun(function(){o.markItemCaption('b',true)},1000);"+
                    "}"
                ]
            },
            getSelMode :{
                $desc:"获取选择模式'single'表示可单选, 'multi'表示可多选. 只针对noPanel的控件有效",
                $rtn:"String"
            },
            setSelMode :{
                $desc:"设置选择模式. 只针对noPanel的控件有效",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'single'表示可单选, 'multi'表示可多选. 默认为'single'",
                    $force
                ]
            },
            addPanel:{
                $desc:"添加一个面板到标签中",
                $rtn:"[self]",
                $paras:[
                    "paras [必需参数] : Object, 键值对",
                    "children [必需参数] : Array, 子控件",
                    "item [可选参数] : Object, 面板子项对象"
                ],
                $snippet:[
                    "var id='xui.temp.tabs16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "xui(id).prepend(panel=new xui.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new xui.UI.Button);"+
                    "xui(id).prepend(tabs=new xui.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "xui.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            removePanel:{
                $desc:"移除一个标签项",
                $rtn:"[self]",
                $paras:[
                    "domId [可选参数] : String, 要移除的标签项id"
                ],
                $snippet:[
                    "var id='xui.temp.tabs17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var tabs;"+
                    "xui(id).prepend(tabs=new xui.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "xui.asyRun(function(){tabs.removePanel(tabs.getSubNode('ITEM','b').id())},1000);"+
                    "}"
                ]
            },
            getPanelPara:{
                $desc:"获取面板参数",
                $rtn:"Object",
                $snippet:[
                    "var id='xui.temp.tabs18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "xui(id).prepend(panel=new xui.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new xui.UI.Button);"+
                    "xui(id).prepend(tabs=new xui.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "xui.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            getPanelChildren:{
                $desc:"获取面板的子元素",
                $rtn:"Array",
                $snippet:[
                    "var id='xui.temp.tabs19'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:10px;\">' + '<br /><button onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var panel, tabs;"+
                    "xui(id).prepend(panel=new xui.UI.Panel({height:100,width:100,dock:'none',position:'relative'}));"+
                    "panel.append(new xui.UI.Button);"+
                    "xui(id).prepend(tabs=new xui.UI.Tabs({position:'relative',width:200, height:100, dock:'none',items:[{id:'a',caption:'a'},{id:'b',caption:'b'}]}));"+
                    "xui.asyRun(function(){tabs.addPanel(panel.getPanelPara(), panel.getPanelChildren()); panel.removePanel();},1000);"+
                    "}"
                ]
            },
            beforePagePop:{
                $desc:"当用户点击POP按钮前调用. 返回false可以阻止页面POP",
                $paras:[
                    $profile,
                    "item: Object, 当前标签项",
                    "options : Object. 可以包括以下键值: parent, host, properties, events, host, theme, CS, CC, CB, CF",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            beforePageClose:{
                $desc:"当用户关闭某个标签项之前调用. 返回false可以阻止标签项被关闭",
                $paras:[
                    $profile,
                    "item: Object, 当前标签项",
                    "src : String, 事件所在DOM的xid"
                ],
                $snippet:[
                    "var id='xui.temp.tabs21'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                    "o.beforePageClose(function(p,item){if(item.id=='a')return false;})"+
                    "}"
                ]
            },
            afterPageClose:{
                $desc:"当用户关闭某个标签项之后调用",
                $paras:[
                    $profile,
                    "item: Object, 当前标签项"
                ],
                $snippet:[
                    "var id='xui.temp.tabs22'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                    "o.afterPageClose(function(p,item){alert(item.id);})"+
                    "}"
                ]
            },
            onItemSelected:{
                $desc:"当某个标签项被选择时调用",
                $paras:[
                    $profile,
                    "item: Object, 被选择的标签项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.tabs23'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                    "o.onItemSelected(function(p,item){alert(item.id);})"+
                    "}"
                ]
            },
            onCaptionActive:{
                $desc:"当用户单击当前标签项的标签头时调用",
                $paras:[
                    $profile,
                    "item: Object, 当前标签项",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.tabs24'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',closeBtn:true},{id:'b',caption:'b b',closeBtn:true},{id:'c',caption:'c c'}]})));"+
                    "o.onCaptionActive(function(p,item){alert(item.id);})"+
                    "}"
                ]
            },
            onShowOptions :{
                $desc:"当用户单击option按钮时触发",
                $paras:[
                    $profile,
                    "item: Object, 当前标签项",
                    "e: Event, 事件对象",
                    "src: 事件发生的DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.tabs25'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.Tabs({height:'auto',dock:'none',items:[{id:'a',caption:'a a',optBtn:true,closeBtn:true},{id:'b',caption:'b b',optBtn:true,closeBtn:true},{id:'c',caption:'c c',optBtn:true}],value:'a'})));"+
                    "o.onShowOptions(function(p,item){alert(item.id);})"+
                    "}"
                ]
            },
            onIniPanelView:{
                $desc:"当每个页的容器面板初始化时调用",
                $paras:[
                    $profile,
                    "item: Object, 当前标签项"
                ],
                $snippet:[
                    "var id='xui.temp.tabs25'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.Tabs({height:'auto',items:['a','c','b'],value:'a'});"+
                    "o.onIniPanelView(function(p,item){xui.message(item.id);});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            onClickPanel:{
                $desc:"当鼠标单击容器时调用",
                $paras:[
                    $profile,
                     "item: Object, 当前容器对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","FoldingTabs"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.FoldingTabs 类",
        constructor:{
            $desc:"生成一个xui.UI.FoldingTabs对象"
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","ToolBar"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.ToolBar 类",
        constructor:{
            $desc:"生成一个xui.UI.ToolBar对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            updateItem:{
                $desc:"更新一个tool项,并刷新对应的DOM界面",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 项的标识号",
                    "options [必需参数] : Object/String, 要更新的选项"
                ],
                $snippet:[
                    "var id='xui.temp.tool01'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new xui.UI.ComboInput({type:'color'})}]}]})));"+
                    "alert(o.getHAlign());xui.asyRun(function(){o.updateItem('ga1',{caption:'updated'})},1000);"+
                    "}"
                ]
            },

            getHAlign :{
                $desc:"获取水平对齐方式",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.tool1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new xui.UI.ComboInput({type:'color'})}]}]})));"+
                    "alert(o.getHAlign());xui.asyRun(function(){o.setHAlign('right')},1000);"+
                    "}"
                ]
            },
            setHAlign :{
                $desc:"设置水平对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 'left'代表左对齐, 'center'代表居中对齐, 'right'代表右对齐",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tool2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.ToolBar({items:[{id:'a',caption:'a a'},{id:'b',caption:'b b'},{id:'c',Object:new xui.UI.ComboInput({type:'color'})}]})));"+
                    "alert(o.getHAlign());xui.asyRun(function(){o.setHAlign('right')},1000);"+
                    "}"
                ]
            },
            getHandler:{
                $desc:"判断工具栏是否带有手柄（用于鼠标拖动）",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tool3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new xui.UI.ComboInput({type:'time'})}]}]})));"+
                    "alert(o.getHandler());xui.asyRun(function(){o.setHandler(false)},1000);"+
                    "}"
                ]
            },
            setHandler :{
                $desc:"设置工具栏是否带有手柄",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tool4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new xui.UI.ComboInput({type:'time'})}]}]})));"+
                    "alert(o.getHandler());xui.asyRun(function(){o.setHandler(false)},1000);"+
                    "}"
                ]
            },
            showGroup:{
                $desc:"显示或隐藏某个分组",
                $rtn:"[self]",
                $paras:[
                    "grpId [必需参数] : String, 分组的id",
                    "value [必需参数] : Boolean, true表示显示,false表示隐藏.默认为true"
                ],
                $snippet:[
                    "var id='xui.temp.tool5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]},{id:'gb',sub:[{id:'gb1',caption:'gb1'},{id:'gb2',Object:new xui.UI.ComboInput({type:'time'})}]}]})));"+
                    "xui.asyRun(function(){o.showGroup('ga',false)},1000);"+
                    "}"
                ]
            },
            showItem:{
                $desc:"显示或隐藏指定工具栏按钮项",
                $rtn:"[self]",
                $paras:[
                    "itemId [必需参数] : String, 工具栏按钮id",
                    "value: [可选参数] : Boolean, true表示显示,false表示隐藏.默认为true"
                ],
                $snippet:[
                    "var id='xui.temp.tool7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]}]})));"+
                    "xui.asyRun(function(){o.showItem('ga2',false)},1000);"+
                    "}"
                ]

            },
            onClick:{
                $desc:"在工具栏按钮项被单击时调用",
                $paras:[
                    $profile,
                    "item : Object, 工具栏按钮子项对象",
                    "group : Object, 工具栏按钮项所在组对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.tool8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=(new xui.UI.ToolBar({items:[{id:'ga', sub:[{id:'ga1',caption:'ga1'},{id:'ga2',caption:'ga2'}]}]})));"+
                    "o.onClick(function(p,i,j){alert(j.id+'->'+i.id)})"+
                    "}"
                ]
            }

        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","PopMenu"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.PopMenu 类",
        constructor:{
            $desc:"生成一个xui.UI.PopMenu对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            adjustSize:{
                $desc:"按照列表的内容自动调整列表的宽度和高度",
                $rtn:"[self]"
            },
            pop:{
                $desc:"弹出菜单",
                $rtn:"[self]",
                $paras:[
                    "obj [必需参数] : 菜单弹出点.可以是一个坐标参数{left:Nubmer,top:Number}或是DOM元素",
                    "type [可选参数] : Number, 从1到4, 代表菜单相对弹出点的方位,东北,东南,西北,西南. 默认为1",
                    "parent [可选参数} : 菜单的父元素.DOM元素或xui.Dom对象"
                ],
                $snippet:[
                    "var id='xui.temp.pm0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },
            hide:{
                $desc:"隐藏菜单",
                $rtn:"[self]",
                $paras:[
                    "triggerEvent [可选参数] : Boolean, 是否触发onHide事件"
                ],
                $snippet:[
                    "var id='xui.temp.pm1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); xui.asyRun(function(){o.hide();},3000);})"+
                    "}"
                ]
            },
            getAutoHide:{
                $desc:"判断菜单显示一段时间后是否自动隐藏",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.pm2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true}]}));"+
                    "o.setAutoHide(true);"+
                    "alert(o.getAutoHide());"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },
            setAutoHide:{
                $desc:"设置菜单显示一段时间后是否自动隐藏 ",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.pm3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',tips:'item c'},{id:'d',Object:new xui.UI.CheckBox}]}));"+
                    "o.setAutoHide(true);"+
                    "alert(o.getAutoHide());"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },
            getHideAfterClick:{
                $desc:"判断菜单在被单击后是否自动隐藏",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.pm4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true}]}));"+
                    "o.setHideAfterClick(false);"+
                    "alert(o.getHideAfterClick());"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },
            setHideAfterClick:{
                $desc:"设置菜单在被单击后是否自动隐藏",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.pm5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',tips:'item c'},{id:'d',Object:new xui.UI.CheckBox}]}));"+
                    "o.setHideAfterClick(false);"+
                    "alert(o.getHideAfterClick());"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s); })"+
                    "}"
                ]
            },

            beforeHide:{
                $desc:"在菜单隐藏前被调用. 返回false可以阻止菜单隐藏",
                $paras:[
                    "profile : xui.UIProfile, 当前控件的配置"
                ],
                $snippet:[
                    "var id='xui.temp.pm31'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "o.beforeHide(function(){alert('before hide')});"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                    "}"
                ]
            },
            onHide:{
                $desc:"在菜单隐藏时调用",
                $paras:[
                    "profile : xui.UIProfile, 当前控件的配置"
                ],
                $snippet:[
                    "var id='xui.temp.pm11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "o.onHide(function(){alert('hidden')});"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                    "}"
                ]
            },
            onMenuSelected:{
                $desc:"在用户单击某个菜单项时调用",
                $paras:[
                    "profile : xui.UIProfile, 当前控件的配置",
                    "item : Object, 菜单子项对象",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.pm12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "o.onMenuSelected(function(p,item){if(item.type=='checkbox')alert(item.value); else alert(item.id); });"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                    "}"
                ]
            },
            onShowSubMenu:{
                $desc:"在子菜单显示时调用",
                $paras:[
                    "profile : xui.UIProfile, 当前控件的配置",
                    "item : Object, 父菜单子项对象",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.pm13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">点击这里弹出菜单' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.PopMenu({autoHide:true, items:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:true},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}));"+
                    "var cp=(new xui.UI.ColorPicker).render(true);"+
                    "cp.beforeClose(function(){cp.hide();return false;})"+
                    ".afterUIValueSet(function(p,old,n){o.onMenuSelected(o.get(0),{id:'b',value:n}); o.hide();});"+
                    "o.onShowSubMenu(function(p,item,src){"+
                    "if(item.id=='b'){cp.reBoxing().popToTop(src,2,xui(id));return cp;}"+
                    "})"+
                    ".onMenuSelected(function(p,i){alert(i.id+':'+i.value)});"+
                    "xui(id).onClick(function(p,e,s){var p1=xui.Event.getPos(e), p2=xui([s]).offset(), pos={left:p1.left-p2.left,top:p1.top-p2.top}o.pop(pos,null,s);})"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","MenuBar"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.MenuBar 类",
        constructor:{
            $desc:"生成一个xui.UI.MenuBar对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            clearPopCache:{
                $desc:"清除所有的缓存菜单项"
            },
            hide:{
                $desc:"隐藏菜单"
            },
            getParentID:{
                $desc:"获取父对象的DOM元素id",
                $rtn:"String"
            },
            setParentID:{
                $desc:"通过设置DOM元素的id来设置父对象",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number. 父对象id",
                    $force
                ]
            },
            getAutoShowTime:{
                $desc:"获取鼠标在悬浮多少秒后菜单项自动显示",
                $rtn:"Number. 多少秒",
                $snippet:[
                    "var id='xui.temp.menu2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "xui(id).prepend(o);"+
                    "alert(o.getAutoShowTime());"+
                    "xui.asyRun(function(){o.setAutoShowTime(0)});"+
                    "}"
                ]
            },
            setAutoShowTime:{
                $desc:"设置鼠标在悬浮多少秒后菜单项自动显示",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.menu3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "xui(id).prepend(o);"+
                    "alert(o.getAutoShowTime());"+
                    "xui.asyRun(function(){o.setAutoShowTime(1000)});"+
                    "}"
                ]
            },
            getHandler:{
                $desc:"判断菜单条前是否有一个手柄,以供鼠标拖动",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.menu4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "xui(id).prepend(o);"+
                    "alert(o.getHandler());"+
                    "xui.asyRun(function(){o.setHandler(false)});"+
                    "}"
                ]
            },
            updateItem:{
                $desc:"更新一个项,并刷新对应的DOM界面",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 项的标识号",
                    "options [必需参数] : Object/String, 要更新的选项"
                ],
                $snippet:[
                    "var id='xui.temp.menu4-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.updateItem('a',{caption:'item udpated'})});"+
                    "}"
                ]
            },
            setHandler:{
                $desc:"设置菜单条前是否有一个手柄,以供鼠标拖动",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.menu5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "xui(id).prepend(o);"+
                    "alert(o.getHandler());"+
                    "xui.asyRun(function(){o.setHandler(false)});"+
                    "}"
                ]
            },
            onGetPopMenu:{
                $desc:"在下拉菜单弹出前调用",
                $paras:[
                    "profile : 菜单条的xui.UIProfile",
                    "item : Object, ",
                    "callback: String, callback函数"
                ]
            },
            onMenuBtnClick:{
                $desc:"在菜单项被点击时调用.只有sub为空的item才会有这个事件",
                $paras:[
                    "profile : 菜单条的xui.UIProfile",
                    "item : Object, ",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            beforePopMenu:{
                $desc:"在菜单项被点击前调用,如果返回false,默认的下拉菜单将不会显示",
                $paras:[
                    "profile : 菜单条的xui.UIProfile",
                    "item : Object, ",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onMenuSelected:{
                $desc:"在菜单项被选择时调用",
                $paras:[
                    "profile : 菜单条的xui.UIProfile",
                    "popProfile: xui.UIProfile, 当前弹出菜单的profile",
                    "item : Object, ",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.pm12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.MenuBar({items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:[{id:'ba',caption:'item ba',tips:'item ba'},{id:'bb',caption:'item bb',tips:'item bb',sub:[{id:'bba',caption:'item bba',tips:'item bba'}]}]},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "o.onMenuSelected(function(pm,p,item){if(item.type=='checkbox')xui.message(item.value); else xui.message(item.id); });"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            onShowSubMenu:{
                $desc:"当显示子菜单时调用",
                $paras:[
                    "profile : 菜单条的xui.UIProfile",
                    "popProfile: xui.UIProfile, 当前弹出菜单的profile",
                    "item : Object",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.menu13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:200px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=(new xui.UI.MenuBar({parentID:id,autoShowTime:0,items:[{id:'id',caption:'menu',sub:[{id:'a',caption:'item a',tips:'item a'},{id:'b',image:'img/img.gif',caption:'itemb',tips:'item b',sub:true},{id:'c',caption:'item c',type:'checkbox',value:false},{id:'d',caption:'item d',type:'checkbox',value:true,add:'[Esc]'}]}]}));"+
                    "var cp=(new xui.UI.ColorPicker).render(true);"+
                    "cp.beforeClose(function(){cp.hide();return false;})"+
                    ".afterUIValueSet(function(p,old,n){o.onMenuSelected(o.get(0),null,{id:'b',value:n}); o.hide();});"+
                    "o.onShowSubMenu(function(pm, p,item,src){"+
                    "if(item.id=='b'){cp.reBoxing().popToTop(src,2,xui(id));return cp;}"+
                    "})"+
                    ".onMenuSelected(function(pm,p,i){xui.message(i.id+':'+i.value)});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            }
        }
    });


    xui.set(xui.Locale,["cn","doc","xui","UI","Dialog"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Dialog 类",
        constructor:{
            $desc:"生成一个xui.UI.Dialog对象"
        },
        alert:{
            $desc:"弹出一个警告框",
            $rtn:"xui.Dialog",
            $paras:[
                "title [可选参数] : String, 警告框标题",
                "content [可选参数] : String, 警告语句",
                "btnCap  [可选参数] : String, 按钮文字",
                "onClose [可选参数] : Function, alert窗口关闭的回调函数",
                "left [可选参数] : Number, 对话框左边坐标",
                "top [可选参数] : Number, 对话框上边坐标",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的alert窗口,默认为[false]"
            ],
            $snippet:[
                "xui.UI.Dialog.alert('title','content',function(){alert('ok')})",
                "xui.UI.Dialog.alert('title','content content content content content content content content content content content content ',function(){alert('ok')})"
            ]
        },
        confirm:{
            $desc:"弹出一个确认框",
            $rtn:"xui.Dialog",
            $paras:[
                "title [可选参数] : String, 确认框的标题",
                "content [可选参数] : String, 确认的提示语句",
                "onYes [可选参数] : Function, the Yes 回调函数",
                "onNo [可选参数] : Function, the No 回调函数",
                "btnCapYes [可选参数] : String, Yes按钮的文字",
                "btnCapNo [可选参数] : String, No按钮的文字",
                "left [可选参数] : Number, 对话框左边坐标",
                "top [可选参数] : Number, 对话框上边坐标",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的confirm窗口,默认为[false]"
            ],
            $snippet:[
                "xui.UI.Dialog.confirm('title','content',function(){alert('yes')},function(){alert('no')})",
                "xui.UI.Dialog.confirm('title','content content content content content content content content content content content content ',function(){alert('yes')},function(){alert('no')})"
            ]
        },
        pop:{
            $desc:"弹出一个简易对话框.（非模态）",
            $rtn:"xui.Dialog",
            $paras:[
                "title [可选参数] : String, 简易对话框标题文字",
                "content [可选参数] : String, 窗体内容输入文字",
                "btnCap [可选参数] : String, OK按钮文字",
                "left [可选参数] : Number, 对话框左边坐标",
                "top [可选参数] : Number, 对话框上边坐标",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id"
            ],
            $snippet:[
                "xui.UI.Dialog.pop('title','content')",
                "xui.UI.Dialog.pop('title','content content content content content content content content content content content content ','I knew it!')"
            ]
        },
        prompt:{
            $desc:"弹出一个输入框",
            $rtn:"xui.Dialog",
            $paras:[
                "title [可选参数] : String, 输入框标题文字",
                "caption [可选参数] : String, 提示文字",
                "content [可选参数] : String, 默认输入文字",
                "onYes [可选参数] : Function, 用户单击Yes 回调函数",
                "onNo [可选参数] : Function, 用户单击 No 回调函数",
                "left [可选参数] : Number, 对话框左边坐标",
                "top [可选参数] : Number, 对话框上边坐标",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id",
                "parent [可选参数] : xui.Dom, 或xui.UI对象",
                "subId [可选参数] : String, 容器的 sub id",
                "noCache [可选参数] : Boolean, 是否用缓存的prompt窗口,默认为[false]"
            ],
            $snippet:[
                "xui.UI.Dialog.prompt('title','caption', 'content content ',function(str){alert(str)})"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]",
                $paras:[
                    "flag [可选参数] : Boolean, false表示去掉激活"
                ],
                $snippet:[
                    "var dlg1=(new xui.UI.Dialog({html:'dlg1'})).show(), dlg2=(new xui.UI.Dialog({html:'dlg2',left:100,top:100})).show(); xui.asyRun(function(){dlg1.activate();},500); xui.asyRun(function(){dlg2.activate();},1000);xui.asyRun(function(){dlg2.activate(false)},1500);"
                ]
            },
            isPinned:{
                $desc:"是否被固定",
                $rtn:"Boolean"
            },
            close:{
                $desc:"关闭对话框",
                $rtn:"[self]",
                $paras:[
                    "triggerEvent [可选参数] : Boolean, 指示是否触发beforeClose事件. 默认为[true]"
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); xui.asyRun(function(){dlg.close();},1000);"
                ]
            },
            showModal:{
                $desc:"显示模式对话框",
                $rtn:"[self]",
                $paras:[
                    "parent [可选参数] : xui.Dom, 父对象. 默认为xui('body')",
                    "left [可选参数] Number, 对话框左边坐标",
                    "top [可选参数] Number, 对话框上边坐标",
                    "callback[可选参数] Fucntion, 回调函数"
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).showModal();",
                    "var dlg=(new xui.UI.Dialog).showModal(null,100,100);"
                ]
            },
            show:{
                $desc:"显示对话框",
                $rtn:"[self]",
                $paras:[
                    "parent [可选参数] : xui.Dom, 父对象. 默认为xui('body')",
                    "modal [可选参数] : Boolean, 模式对话框,或者是非模式对话框.默认为非模式（false）",
                    "left [可选参数] Number, 对话框左边坐标",
                    "top [可选参数] Number, 对话框上边坐标",
                    "callback[可选参数] Fucntion, 回调函数"
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100);",
                    "var dlg=(new xui.UI.Dialog).show(null,true, 100,100);",
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); (new xui.UI.Dialog).show(dlg.reBoxing(),true, 100,100);"
                ]
            },
            hide:{
                $desc:"隐藏对话框",
                $rtn:"[self]",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); xui.asyRun(function(){dlg.hide();},1000); xui.asyRun(function(){dlg.show();},2000);"
                ]
            },
            getIframeAutoLoad:{
                $desc:"获取用iframe自动加载html（可以是异域）的地址属性",
                $rtn:"String"
            },
            setIframeAutoLoad:{
                $desc:"设置用iframe自动加载html（可以是异域）的地址.需要提前设置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getAjaxAutoLoad:{
                $desc:"获取用Ajax自动加载html文件（同域下）的路径属性",
                $rtn:"String"
            },
            setAjaxAutoLoad:{
                $desc:"设置用Ajax自动加载html文件（同域下）的路径属性.需要提前设置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 也可以是一个object,object的内容对应xui.Ajax",
                    $force
                ]
            },
            getCaption:{
                $desc:"获取对话框标题文字",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getCaption());xui.asyRun(function(){dlg.setCaption('c cc c');},1000);"
                ]
            },
            setCaption:{
                $desc:"设置对话框标题文字",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getCaption());xui.asyRun(function(){dlg.setCaption('c cc c');},1000);"
                ]
            },
            getHAlign :{
                $desc:"获取标题水平对齐方式",
                $rtn:"String"
            },
            setHAlign :{
                $desc:"设置标题水平对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left', 'center' or 'right'",
                    $force
                ]
            },
            getInitPos:{
                $desc:"得到窗口的初始化位置"
            },
            setInitPos:{
                $desc:"设置窗口的初始化位置",
                $rtn:"[self]",
                $paras:[
                    "value [可选参数] : String'auto','center'之一。默认是'center'。"
                ]
            },
            getCloseBtn:{
                $desc:"判断对话框右上角是否带有关闭按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getCloseBtn());xui.asyRun(function(){dlg.setCloseBtn(false);},1000); xui.asyRun(function(){dlg.close();},2000);"
                ]
            },
            setCloseBtn:{
                $desc:"设置对话框右上角是否带有关闭按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getCloseBtn());xui.asyRun(function(){dlg.setCloseBtn(false);},1000);xui.asyRun(function(){dlg.close();},2000);"
                ]
            },

            getRestoreBtn:{
                $desc:"判断对话框右上角是否带有从最大最小状态返回正常按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getMinBtn());xui.asyRun(function(){dlg.setMinBtn(false);},1000);"
                ]
            },
            setRestoreBtn:{
                $desc:"设置对话框右上角是否带有从最大最小状态返回正常按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getMinBtn:{
                $desc:"判断对话框右上角是否带有最小化按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getMinBtn());xui.asyRun(function(){dlg.setMinBtn(false);},1000);"
                ]
            },
            setMinBtn:{
                $desc:"设置对话框右上角是否带有最小化按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getMinBtn());xui.asyRun(function(){dlg.setMinBtn(false);},1000);"
                ]
            },
            getMaxBtn:{
                $desc:"判断对话框右上角是否带有最大化按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getMaxBtn());xui.asyRun(function(){dlg.setMaxBtn(false);},1000);"
                ]
            },
            setMaxBtn:{
                $desc:"设置对话框右上角是否带有最大化按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getMaxBtn());xui.asyRun(function(){dlg.setMaxBtn(false);},1000);"
                ]
            },
            getPinBtn:{
                $desc:"判断对话框右上角是否带有钉针按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getPinBtn());xui.asyRun(function(){dlg.setPinBtn(false);},1000);"
                ]
            },
            setPinBtn:{
                $desc:"设置对话框右上角是否带有钉针按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getPinBtn());xui.asyRun(function(){dlg.setPinBtn(false);},1000);"
                ]
            },
            getModal:{
                 $desc:"判断是否是模式对话框",
                 $rtn:"Boolean"
            },
            setModal:{
                $desc:"设置是否为模式对话框",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getLandBtn:{
                $desc:"判断对话框右上角是否带有降落按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getLandBtn());xui.asyRun(function(){dlg.setLandBtn(true);},1000);"
                ]
            },
            setLandBtn:{
                $desc:"设置对话框右上角是否带有降落按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getLandBtn());xui.asyRun(function(){dlg.setLandBtn(true);},1000);"
                ]
            },
            getOptBtn:{
                $desc:"判断对话框右上角是否带有选项按钮",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getOptBtn());xui.asyRun(function(){dlg.setOptBtn(true);},1000);"
                ]
            },
            setOptBtn:{
                $desc:"设置对话框右上角是否带有选项按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getOptBtn());xui.asyRun(function(){dlg.setOptBtn(true);},1000);"
                ]
            },
            getInfoBtn :{
                $desc:"获取对话框是否带有帮助按钮",
                $rtn:"Boolean"
            },
            setInfoBtn :{
                $desc:"设置对话框是否带有帮助按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getRefreshBtn :{
                $desc:"获取对话框是否带有刷新按钮",
                $rtn:"Boolean"
            },
            setRefreshBtn :{
                $desc:"设置对话框是否带有刷新按钮",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getMovable:{
                $desc:"判断对话框是否可以拖动",
                $rtn:"Boolean",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getMovable());xui.asyRun(function(){dlg.setMovable(false);},1000);"
                ]
            },
            setMovable:{
                $desc:"设置对话框是否可以拖动",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getMovable());xui.asyRun(function(){dlg.setMovable(false);},1000);"
                ]
            },
            getImage :{
                $desc:"获取对话框左上角的图标url",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getImage());xui.asyRun(function(){dlg.setImage('img/img.gif');},1000);"
                ]
            },
            setImage :{
                $desc:"设置对话框左上角的图标url",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] :String,  image path",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getImage());xui.asyRun(function(){dlg.setImage('img/img.gif');},1000);"
                ]
            },
            getImagePos :{
                $desc:"获取对话框左上角图标的图像偏移属性",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getImagePos());xui.asyRun(function(){dlg.setImage('img/img.gif').setImagePos('left -16px');},1000);"
                ]
            },
            setImagePos :{
                $desc:"设置对话框左上角图标的图像偏移属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, corresponding CSS value",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); alert(dlg.getImagePos());xui.asyRun(function(){dlg.setImage('img/img.gif').setImagePos('left -16px');},1000);"
                ]
            },
            getImageBgSize :{
                $desc:"得到背景图尺寸属性",
                $rtn:"String"
            },
            setImageBgSize :{
                $desc:"设置背景图尺寸属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 背景图尺寸",
                    $force
                ]
            },           
            getHtml:{
                $desc:"获取对话框的内部内容HTML",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); xui.asyRun(function(){dlg.setHtml('<p>content</p>');alert(dlg.getHtml());},1000);"
                ]
            },
            setHtml:{
                $desc:"设置对话框的内部内容HTML",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); xui.asyRun(function(){dlg.setHtml('<p>content</p>');alert(dlg.getHtml());},1000);"
                ]
            },
            getStatus:{
                $desc:"获取对话框的大小状态. 可以是'normal'(通常), 'min'(最小话) or 'max'(最大化)",
                $rtn:"String",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); xui.asyRun(function(){dlg.setStatus('min');alert(dlg.getStatus());},1000);"
                ]
            },
            setStatus:{
                $desc:"设置对话框的大小状态",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 可以是'normal'(通常), 'min'(最小话) or 'max'(最大化)",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); xui.asyRun(function(){dlg.setStatus('max');alert(dlg.getStatus());},1000);"
                ]
            },
            getMinHeight:{
                $desc:"获取对话框的最小高度限制",
                $rtn:"Number",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); "+
                    "dlg.setMinHeight(200).setMinWidth(200);"+
                    "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
                ]
            },
            setMinHeight:{
                $desc:"设置对话框的最小高度限制",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); "+
                    "dlg.setMinHeight(200).setMinWidth(200);"+
                    "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
                ]
            },
            getMinWidth:{
                $desc:"获取对话框的最小宽度限制",
                $rtn:"Number",
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); "+
                    "dlg.setMinHeight(200).setMinWidth(200);"+
                    "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
                ]
            },
            setMinWidth:{
                $desc:"设置对话框的最小宽度限制",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var dlg=(new xui.UI.Dialog).show(null,false, 100,100); "+
                    "dlg.setMinHeight(200).setMinWidth(200);"+
                    "alert(dlg.getMinHeight()+':'+dlg.getMinWidth());"
                ]
            },
            getFromRegion:{
                $desc:"获取对话框的弹出源",
                $rtn:"Object",
                $snippet:[
                    "var dl=(new xui.UI.Dialog);"+
                    "dl.setFromRegion({left:0,top:0,width:10,height:10});"+
                    "alert(xui.serialize(dl.getFromRegion()));"+
                    "dl.show(null,false, 200,200);"
                ]
            },
            setFromRegion:{
                $desc:"设置对话框的弹出源",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object.{left:Number,top:Number,width:Number,height:Number}",
                    $force
                ],
                $snippet:[
                    "var dl=(new xui.UI.Dialog);"+
                    "dl.setFromRegion({left:0,top:0,width:10,height:10});"+
                    "alert(xui.serialize(dl.getFromRegion()));"+
                    "dl.show(null,false, 200,200);"
                ]
            },
            onShow:{
                $desc:"当对话框显示的时候调用",
                $paras:[
                    "profile : xui.UIProfile, 当前控件的配置"
                ],
                $snippet:[
                    "var dlg,btn; dlg=new xui.UI.Dialog; dlg.append(btn=new xui.UI.Button);"+
                    "dlg.onShow(function(){btn.activate();});"+
                    "dlg.show(null,false, 100,100);"
                ]
            },
            beforeClose:{
                $desc:"当对话框关闭时调用. 返回false可以阻止对话框关闭",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var dlg=new xui.UI.Dialog; "+
                    "dlg.beforeClose(function(){return false;});"+
                    "dlg.show(null,false, 100,100);"+
                    "xui.asyRun(function(){dlg.close();},3000);"
                ]
            },
            onShowInfo:{
                $desc:"在用户单击帮助按钮时调用",
                $paras:[
                    $profile
                ]
            },
            onRefresh:{
                $desc:"在用户单击刷新按钮时调用",
                $paras:[
                    $profile
                ]
            },
            onShowOptions :{
                $desc:"在用户单击选项按钮时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var dlg=new xui.UI.Dialog({optBtn:true}); "+
                    "dlg.onShowOptions(function(){alert('onShowOptions');});"+
                    "dlg.show(null,false, 100,100);"
                ]
            },
            onLand:{
                $desc:"在用户单击LAND按钮时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onActivated:{
                $desc:"在对话框被激活时(获得焦点)调用",
                $paras:[
                    $profile
                ]
            },
            beforeStatusChanged:{
                $desc:"当对话框状态在最大、最小或普通状态之间改变前调用. 返回false可以阻止状态该变",
                $paras:[
                    $profile,
                    "oldStatus: String, 改变之前的状态, min/max/normal",
                    "newStatus: String, 改变之后的状态, min/max/normal"
                ]
            },
            afterStatusChanged:{
                $desc:"当对话框状态在最大、最小或普通状态之间改变后调用",
                $paras:[
                    $profile,
                    "oldStatus: String, 改变之前的状态, min/max/normal",
                    "newStatus: String, 改变之后的状态, min/max/normal"
                ]
            },
            beforePin:{
                $desc:"在顶针按钮点击之前触发",
                $paras:[
                    $profile,
                    "value: Boolean, 顶针状态"
                ]
            },
            onClickPanel:{
                $desc:"当鼠标单击容器时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Element"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Element 类",
        constructor:{
            $desc:"生成一个xui.UI.Element对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getHtml:{
                $desc:"获取对象的内部html代码",
                $rtn:"String"
            },
            setHtml:{
                $desc:"设置对象的内部html代码",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getNodeName:{
                $desc:"得到控件的Dom node name",
                $rtn:"String"
            },
            setNodeName:{
                $desc:"设置控件的Dom node name",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getAttributes:{
                $desc:"得到控件的Attributes",
                $rtn:"Object"
            },
            setAttributes:{
                $desc:"设置控件的Attributes",
                $rtn:"[self]",
                $paras:[
                    "value [Required] : 键值对",
                    $force
                ]
            },
            onClick:{
                $desc:"当鼠标单击时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","HTMLButton"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.HTMLButton 类",
        constructor:{
            $desc:"生成一个xui.UI.HTMLButton"
        },
        prototype:{
            KEY:{$desc:"本类名"}
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Span"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Span 类",
        constructor:{
            $desc:"生成一个xui.UI.Span对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getHtml:{
                $desc:"获取对象的内部html代码",
                $rtn:"String"
            },
            setHtml:{
                $desc:"设置对象的内部html代码",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getOverflow:{
                $desc:"获取当前对象容器的CSS overflow属性",
                $rtn:"String"
            },
            setOverflow:{
                $desc:"设置当前对象容器的CSS overflow属性,并反映到界面",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'auto','hidden','visible','' ",
                    $force
                ]
            },
            onClick:{
                $desc:"当鼠标单击时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Image"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Image 类",
        constructor:{
            $desc:"生成一个xui.UI.Image对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getMaxHeight:{
                $desc:"获取图片的最大高度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.img1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({src:'img/logo.gif'}));"+
                    "alert(o.setMaxHeight(500).getMaxHeight());"+
                    "}"
                ]
            },
            setMaxHeight:{
                $desc:"设置图片的最大高度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number. 图片高度（像素）",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.img2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({src:'img/logo.gif'}));"+
                    "alert(o.setMaxHeight(500).getMaxHeight());"+
                    "}"
                ]
            },
            getMaxWidth:{
                $desc:"获取图像的最大宽度（像素）",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.img3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({src:'img/logo.gif'}));"+
                    "alert(o.setMaxWidth(500).getMaxWidth());"+
                    "}"
                ]
            },
            setMaxWidth:{
                $desc:"设置图像的最大宽度（像素）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.img4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;height:100px;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({src:'img/logo.gif'}));"+
                    "alert(o.setMaxWidth(500).getMaxWidth());"+
                    "}"
                ]
           },
            getItems:{
                $desc:"得到图像字典项目列表",
                $rtn:"Array"
            },
            setItems:{
                $desc:"设置图像字典项目列表",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array",
                    $force
                ]
            },
            getActiveItem:{
                $desc:"得到当前图像关键字（图像字典项目列表中）",
                $rtn:"String"
            },
            setActiveItem:{
                $desc:"设置当前图像关键字（图像字典项目列表中）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getAlt:{
                $desc:"获取图像的 Alt 值",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.img5-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                    "xui.asyRun(function(){alert(o.setAlt('picture').getAlt())},1000);" +
                    "}"
                ]
            },
            setAlt:{
                $desc:"设置图像的 Alt 值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.img6-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                    "xui.asyRun(function(){alert(o.setAlt('picture').getAlt())},1000);" +
                    "}"
                ]
            },
            getSrc:{
                $desc:"获取图像的src值",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.img5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                    "xui.asyRun(function(){alert(o.setSrc('img/xui.box.gif').getSrc())},1000);"+
                    "xui.asyRun(function(){o.setMaxHeight(200)},1500);"+
                    "}"
                ]
            },
            setSrc:{
                $desc:"设置图像的src值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.img6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({position:'relative',src:'img/logo.gif'}));"+
                    "xui.asyRun(function(){alert(o.setSrc('img/xui.box.gif').getSrc())},1000);"+
                    "xui.asyRun(function(){o.setMaxHeight(200)},1500);"+
                    "}"
                ]
            },
            getCursor:{
                $desc:"获取图像的鼠标状态",
                $rtn:"String"
            },
            setCursor:{
                $desc:"设置图像的鼠标状态",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getRate:{
                $desc:"获取图像的比率(实际大小 / 显示大小)",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.img7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({position:'relative',src:'img/xui.box.gif',maxHeight:200}));"+
                    "xui.asyRun(function(){alert(o.getRate())},1000);"+
                    "}"
                ]
            },

            onError:{
                $desc:"当图像文件无法获取（文件地址不存在等情况）调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.img15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({position:'relative',maxHeight:200}));"+
                    "o.onError(function(){alert('the image does not exist')});"+
                    "o.setSrc('img/lo-go.gif')"+
                    "}"
                ]
            },
            beforeLoad:{
                $desc:"在图像装载前调用",
                $paras:[
                    $profile
                ],
                $snippet:[
                    "var id='xui.temp.img16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({position:'relative',maxHeight:200}));"+
                    "o.beforeLoad(function(){alert('beforeLoad')}).afterLoad(function(p,src,w,h){xui.message('width:'+w+' height:'+h,src)});"+
                    "o.setSrc('img/logo.gif');"+
                    "}"
                ]
            },
            afterLoad:{
                $desc:"当图像装载后调用",
                $paras:[
                    $profile,
                    "path : String, 图片的文件路径",
                    "width : Number, 图片宽",
                    "height : Number, 图片高"
                ],
                $snippet:[
                    "var id='xui.temp.img17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o;xui(id).prepend(o=new xui.UI.Image({position:'relative', maxHeight:200}));"+
                    "o.beforeLoad(function(){alert('beforeLoad')}).afterLoad(function(p,src,w,h){xui.message('width:'+w+' height:'+h,src)});"+
                    "o.setSrc('img/logo.gif');"+
                    "}"
                ]
            },
            onClick:{
                $desc:"在click图片的时候触发该事件",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onDblclick:{
                $desc:"在双击图片的时候触发该事件",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","FoldingList"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.FoldingList 类",
        constructor:{
            $desc:"生成一个xui.UI.FoldingList对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getActiveLast :{
                $desc:"判断是否激活最后一个文件夹项",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.fl5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "o.setActiveLast(true); alert(o.getActiveLast());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setActiveLast :{
                $desc:"设置是否激活最后一个文件夹项",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.fl6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "o.setActiveLast(true); alert(o.getActiveLast());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            toggle:{
                $desc:"打开或关闭一个文件夹项",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] :String, 文件夹项目id"
                ],
                $snippet:[
                    "var id='xui.temp.fl7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.toggle('a')},1000)"+
                    "}"
                ]
            },
            fillContent:{
                $desc:"填充指定文件夹项的内容",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] :String, 文件夹项id",
                    "obj [必需参数]: xui.Dom对象或xui.UI对象. 如果设置为null将清空该项目的内容"
                ],
                $snippet:[
                    "var id='xui.temp.fl8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'a',caption:'a1',tips:'a1 tips',text:'text1'},{id:'b',caption:'a2',text:'text2',tips:'a2 tips'}]});"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.toggle('a')},1000);"+
                    "xui.asyRun(function(){o.fillContent('a', new xui.UI.Button({position:'relative'}))},1200);"+
                    "}"
                ]
            },

            onShowOptions :{
                $desc:"当用户单击选项按钮时调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.fl9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.FoldingList({width:'auto',height:'auto', position:'relative',items:[{id:'a',optBtn:true,title:'title 1',caption:'cap a'},{id:'b',title:'title b', caption:'cap b'},{id:'c',caption:'c'}]});"+
                    "xui(id).prepend(o);"+
                    "o.onShowOptions(function(){alert('onShowOptions');});"+
                    "}"
                ]
            },

            onGetContent:{
                $desc:"当某个文件夹项需要填充内容时调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "callback : Function, 填充完成后的回调函数"
                ],
                $snippet:[
                    "var id='xui.temp.fl11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.FoldingList({width:'auto',height:'auto',position:'relative',items:[{id:'Button',title:'a1',tips:'a1 tips'},{id:'CheckBox',title:'a2',tips:'a2 tips'}]});"+
                    "o.setTagCmds([{id:'a',caption:'a'},{id:'b',caption:'b'},{id:'c',caption:'c'}]);"+
                    "xui(id).prepend(o);"+
                    "o.onGetContent(function(p,item){return new xui.UI[item.id]({position:'relative'})});"+
                    "}"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","TreeBar"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.TreeBar 类",
        constructor:{
            $desc:"生成一个xui.UI.TreeBar对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            fireItemClickEvent:{
                $desc:"模拟鼠标点击,以选中TreeBar中的某一项",
                $rtn:"[self]",
                $paras:[
                    "subId [必需参数] : String, 项的id"
                ],
                $snippet:[
                    "var id='xui.temp.tb01'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "xui(id).prepend(o);"+
                    "o.fireItemClickEvent('a');"+
                    "}"
                ]
            },

            getAnimCollapse :{
                $desc:"判断在父节点打开时,是否显示动画",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tb1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setAnimCollapse :{
                $desc:"设置在父节点打开时,是否显示动画",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tb2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getOptBtn:{
                $desc:"得到选项按钮类",
                $rtn:"String"
            },
            setOptBtn:{
                $desc:"设置选项按钮类",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getTagCmds:{
                $desc:"得到命令按钮集",
                $rtn:"Array"
            },
            setTagCmds:{
                $desc:"设置命令按钮集",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 项数组",
                    $force
                ]
            },
            getGroup :{
                $desc:"判断树是否分组",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tb3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setGroup(true); alert(o.getGroup());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setGroup :{
                $desc:"设置树是否分组",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tb4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setGroup(true); alert(o.getGroup());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getDynDestory:{
                $desc:"判断是否在节点折叠时动态销毁DOM,以便收回内存",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tb5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.setDynDestory(true); alert(o.getDynDestory());"+
                    "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setDynDestory :{
                $desc:"设置是否在节点折叠时动态销毁DOM（以便收回内存）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tb6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.setDynDestory(true); alert(o.getDynDestory());"+
                    "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getTogglePlaceholder:{
                $desc:"判断没有子节点的条目是否有切换按钮占位",
                $rtn:"Boolean"
            },
            setTogglePlaceholder:{
                $desc:"设置没有子节点的条目是否有切换按钮占位",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getIniFold :{
                $desc:"判断树在初始化是打开或收缩子行",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tb7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setIniFold(true); alert(o.getIniFold());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setIniFold :{
                $desc:"设置树在初始化是打开或收缩子行",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tb8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setIniFold(false); alert(o.getIniFold());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getSelMode :{
                $desc:"获取选择模式'none'表示不能选择, 'single'表示可单选, 'multi'表示可多选, 'multibycheckbox'表示可多选,并且只能点击checkbox来选中",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.tb9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setSelMode('none'); alert(o.getSelMode());"+
                    "o.onItemSelected(function(profile,item){xui.message(item.id)});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setSelMode :{
                $desc:"设置选择模式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none'表示不能选择, 'single'表示可单选, 'multi'表示可多选. 默认为'single'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tb10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'ba',caption:'caption ba'},{id:'bb',caption:'caption bb'}]},{id:'c',caption:'c'}]});"+
                    "o.setSelMode('multi'); alert(o.getSelMode());"+
                    "o.afterUIValueSet(function(profile,o,n){xui.message(n)});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getNoCtrlKey:{
                $desc:"获取是否在多选择模式下需要用Ctrl来辅助多选",
                $rtn:"Boolean"
            },
            setNoCtrlKey:{
                $desc:"设置是否在多选择模式下需要用Ctrl来辅助多选",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getSingleOpen:{
                $desc:"判断是否每一次只能有一个父节点能够被打开. 设置为true时,当一个父节点被打开,其他的打开的父节点将自动合拢",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.tb11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.setSingleOpen(true); alert(o.getSingleOpen());"+
                    "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setSingleOpen :{
                $desc:"设置是否每一次只能有一个父节点能够被打开. 设置为true时,当一个父节点被打开,其他的打开的父节点将自动合拢",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.tb12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.setSingleOpen(true); alert(o.getSingleOpen());"+
                    "o.onGetContent(function(profile,item){var id=item.id;return [{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption'}]});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            insertItems:{
                $desc:"插入一系列节点项",
                $rtn:"[self]",
                $paras:[
                    "arr [必需参数] : Array, 节点项目数组",
                    "pid [可选参数] : String, 父节点id",
                    "base [可选参数] : String, 基准节点id",
                    "before [可选参数] : Boolean, true表示在基准节点前插入,false在基准节点后插入. 默认为false;"
                ],
                $snippet:[
                    "var id='xui.temp.tb13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',iniFold:false,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:[{id:'bz',caption:'bz'}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.insertItems([{id: 'ba',caption:'caption'},{id:'bb',caption:'caption'}],'b',null,true)},1000);"+
                    "xui.asyRun(function(){o.insertItems([{id: 'ca',caption:'caption'},{id:'cb',caption:'caption'}],'c',null,false)},2000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'aaa',caption:'a0'}],null,'b',false)},3000);"+
                    "xui.asyRun(function(){o.insertItems([{id:'bbb',caption:'b0'}],null,'b',true)},4000);"+
                    "}"
                ]
            },
            openToNode:{
                $desc:"打开到某个节点.调用该函数后,他的父节点,祖父节点直到根节点都会被展开",
                $rtn:"String",
                $paras:[
                    "id [必需参数] : String, 要展开的节点id"
                ],
                $snippet:[
                    "var id='xui.temp.tb14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b',sub:[{id:'bb',caption:'bb',sub:[{id: 'bba',caption:'bba'},{id:'bbb',caption:'bbb',sub:[{id:'bbba',caption:'bbba'}]}]}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.openToNode('bbba')},1000);"+
                    "}"
                ]
            },
            toggleNode:{
                $desc:"打开或折叠某个父节点",
                $rtn:"[self]",
                $paras:[
                    "id [必需参数] : String, 父节点id, 如果为空,表示根节点",
                    "expand [可选参数] : Boolean, true表示打开,false表示折叠",
                    "recursive [可选参数] : Boolean, 是否递归应用于父节点的所有子节点"
                ],
                $snippet:[
                    "var id='xui.temp.tb17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',iniFold:true,height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'a'},{id:'b',caption:'b',sub:[{id:'bb',caption:'bb',sub:[{id: 'bba',caption:'bba'},{id:'bbb',caption:'bbb',sub:[{id:'bbba',caption:'bbba'}]}]}]},{id:'c',caption:'c',sub:[{id:'cz',caption:'cz'}]}]});"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.toggleNode('b',true,true)},1000);"+
                    "xui.asyRun(function(){o.toggleNode('bb',false,true)},2000);"+
                    "xui.asyRun(function(){o.toggleNode('bb',true,false)},3000);"+
                    "}"
                ]
            },


            onGetContent:{
                $desc:"在父节点展开时,需要子节点数据时调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "callback : Function, 回调函数"
                ],
                $snippet:[
                    "var id='xui.temp.tb18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.onGetContent(function(profile,item,callback,threadid){var id=item.id, data=[{id: id+'a',caption:'caption'},{id:id+'b',caption:'caption '+id}]; if(id=='b')return data; else callback(data);});"+
                    "o.onItemSelected(function(profile,item,src){xui.message(item.id)});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            onItemSelected:{
                $desc:"在某个节点被单击时调用时调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid",
                    "type: Number, 0:没有影响;1:item被选中;-1:item被清除选中"
                ],
                $snippet:[
                    "var id='xui.temp.tb20'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeBar({width:'auto',height:'auto',dock:'none',position:'relative',items:[{id:'a',caption:'cap a'},{id:'b',caption:'cap b',sub:true},{id:'c',caption:'c',sub:true}]});"+
                    "o.onItemSelected(function(profile,item,src){xui.message(item.id)});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            beforeClick:{
                $desc:"在单击条目前触发该事件.如返回 false, 单击事件取消",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onDblclick:{
                $desc:"在双击条目的时候触发该事件",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onClick:{
                $desc:"在单击条目的时候触发该事件",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            afterClick:{
                $desc:"在单击条目后触发该事件",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e: Event, 事件对象",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            beforeExpand:{
                $desc:"在某个节点展开前调用. 如返回 false,节点将不会展开",
                $paras:[
                    $profile,
                    "item: Object, 子项对象"
                ]
            },
            beforeFold:{
                $desc:"在某个节点折叠前调用. 如返回 false,节点将不会展开",
                $paras:[
                    $profile,
                    "item: Object, 子项对象"
                ]
            },
            afterExpand:{
                $desc:"在某个节点展开后调用"
            },
            afterFold:{
                $desc:"在某个节点折叠后调用"
            },
            onShowOptions :{
                $desc:"当鼠标单击选项按钮的时候触发",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onCmd:{
                $desc:"当用户单击内部按钮的时候调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "cmdKey: String, 命令的键值",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });
    xui.set(xui.Locale,["cn","doc","xui","UI","TreeView"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.TreeView 类",
        constructor:{
            $desc:"生成xui.UI.TreeView"
        },
        prototype:{
            getNoIcon:{
                $desc:"判断是否带有图标",
                $rtn:"Boolean"
            },
            setNoIcon:{
                $desc:"设置是否带有图标",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","TreeGrid"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.TreeGrid 类",
        constructor:{
            $desc:"生成xui.UI.TreeGrid对象"
        },
        getCellOption:{
            $desc:"获取指定单元格的属性值,属性名称由参数指定",
            $rtn:"String",
            $paras:[
                "profile [必需参数] : TreeGrid的xui.UIProfile",
                "cell [必需参数] : 单元格对象",
                "key [必需参数] : String, 属性名称"
            ],
            $snippet:[
                "var id='xui.temp.grid0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                "o.setActiveMode('cell').afterCellActive(function(profile, cell){xui.message(profile.box.getCellOption(profile,cell,'type'))});"+
                "xui(id).prepend(o);"+
                "}"
            ]
        },
        isHotRow:{
            $desc:"是否是热行",
            $rtn:"Boolean",
            $paras:[
                "row [必需参数] : String/Object, 行对象或id"
            ]
        },
        prototype:{
            KEY:{$desc:"本类名"},
            activate:{
                $desc:"激活控件(获得焦点)",
                $rtn:"[self]"
            },
            getActiveMode :{
                $desc:"获取表格的选取模式",
                $rtn:"String, 'cell', 'row' 或 'none'",
                $snippet:[
                    "var id='xui.temp.grid1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('cell'); alert(o.getActiveMode());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setActiveMode :{
                $desc:"设置表格的选取模式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 可以是'cell', 'row' 或 'none'. 默认为'row'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,altRowsBg:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('row'); alert(o.getActiveMode());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            offEditor:{
                $desc:"解除单元格的编辑模式"
            },
            autoRowHeight:{
                $desc:"自动适应行高",
                $paras:[
                    "rowId [可选参数] : String, 行id. 没有行id表示自动适应所有的行高"
                ]
            },
            autoColWidth:{
                $desc:"自动适应列宽",
                $paras:[
                    "colId [可选参数] : String, 列id. 没有列id表示自动适应所有的列宽"
                ]
            },
            autoColHeight:{
                $desc:"自动适应表头高"
            },
            editCell:{
                $desc:"将单元格绑定到指定的编辑器上",
                $paras:[
                    "cell [必需参数] : String, cell's id值 或 cell 对象"
                ]
            },
            focusCell:{
                $desc:"单元格获得焦点",
                $paras:[
                    "cell [必需参数] : String, cell's id值 或 cell 对象"
                ]
            },
            focusCellbyRowCol:{
                $desc:"单元格获得焦点",
                $paras:[
                    "rowId [必需参数] : String, 单元格行id",
                    "colId [必需参数] : String, 单元格列id"
                ]
            },
            editCellbyRowCol:{
                $desc:"将单元格绑定到指定的编辑器上",
                $paras:[
                    "rowId [必需参数] : String, 单元格行id",
                    "colId [必需参数] : String, 单元格列id"
                ],
                $snippet:[
                    "var id='xui.temp.grid3'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.editCellbyRowCol('row2','col2')},1000);"+
                    "}"
                ]
            },
            getValueSeparator:{
                $desc:"获取字符串值的分隔符(只对selMode为multi或multibycheckbox的情况有效).默认为“;”",
                $rtn:"String"
            },
            setValueSeparator:{
                $desc:"设置字符串值的分隔符(只对selMode为multi或multibycheckbox的情况有效)",
                $rtn:"[self]"
            },
            getCurrencyTpl:{
                $desc:"得到货币的显示模板",
                $rtn:"String"
            },
            setCurrencyTpl:{
                $desc:"设置货币的显示模板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getNumberTpl:{
                $desc:"得到数字的显示模板",
                $rtn:"String"
            },
            setNumberTpl:{
                $desc:"设置数字的显示模板",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String. 必须是无数字的，并且带有*号的字符串",
                    $force
                ]
            },
            getAltRowsBg :{
                $desc:"判断是否使用不同的背景色区分相邻的两行",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid4'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setAltRowsBg(true); alert(o.getAltRowsBg());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setAltRowsBg :{
                $desc:"设置是否使用不同的背景色区分相邻的两行",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid5'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setAltRowsBg(true); alert(o.getAltRowsBg());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getDirectInput:{
                $desc:"判断在编辑状态下的 Editor 是否用直接输入的方式（不需要用回车键来确认）输入",
                $rtn:"Boolean"
            },
            setDirectInput:{
                $desc:"设置在编辑状态下的 Editor 是否用直接输入的方式（不需要用回车键来确认）输入",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getAnimCollapse :{
                $desc:"得到 Animate 属性",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid6'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setAnimCollapse :{
                $desc:"设置 Animate 属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid7'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setAnimCollapse(true); alert(o.getAnimCollapse());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getCell:{
                $desc:"由单元格id获取单元格对象",
                $rtn:"Ojbect",
                $paras:[
                    "cellId [必需参数] : String",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ]
            },
            isDirtied:{
                $desc:"判断界面值已经被修改",
                $rtn:"Boolean"
            },
            getCells:{
                $desc:"返回所有单元格的值",
                $rtn:"Objcet. {cellId:{rowId:, colId:, value:, oValue:}}",
                $paras:[
                    "rowId : [可选参数] : String, 只返回本行的",
                    "colId : [可选参数] : String, 只返回本列的",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ]
            },
            getDirtied:{
                $desc:"返回所有被更改过的值",
                $rtn:"Objcet. {cellId:{rowId:, colId:, value:, oValue:}}",
                $paras:[
                    "rowId : [可选参数] : String, 只返回本行的",
                    "colId : [可选参数] : String, 只返回本列的"
                ]
            },
            getCellbyRowCol:{
                $desc:"获取单元格对象. 行id和列id由参数指定",
                $rtn:"Ojbect",
                $paras:[
                    "rowId  [必需参数] : String, 行 id",
                    "colId [必需参数] : String, 列 id",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ],
                $snippet:[
                    "var id='xui.temp.grid7.1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "alert(o.getCellbyRowCol('row2','col2').value);"+
                    "}"
                ]
            },
            getColHidable:{
                $desc:"判断是否可手工隐藏列",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid8.2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColHidable(true); alert(o.getColHidable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setColHidable :{
                $desc:"设置是否可手工隐藏列",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid9.2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColHidable(true); alert(o.getColHidable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getColMovable :{
                $desc:"判断是否可手工移动列的相对位置",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid8'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(false); alert(o.getColMovable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setColMovable :{
                $desc:"设置是否可手工移动列的相对位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid9'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true); alert(o.getColMovable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getColResizer :{
                $desc:"判断是否可手工拖动列的宽度",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid10'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColResizer(false); alert(o.getColResizer());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setColResizer :{
                $desc:"设置端用户是否可手工拖动列的宽度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid11'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColResizer(true); alert(o.getColResizer());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getColSortable :{
                $desc:"判断是否可手工对列进行排序",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid12'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColSortable(false); alert(o.getColSortable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setColSortable :{
                $desc:"设置是否可手工对列进行排序",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid13'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColSortable(true); alert(o.getColSortable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getEditable :{
                $desc:"判断表格为只读或可写",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid14'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setEditable(false); alert(o.getEditable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setEditable :{
                $desc:"表格为只读或可写",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid15'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setEditable(true); alert(o.getEditable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getHeaderHeight :{
                $desc:"获取表头高度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.grid16'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setHeaderHeight(40); alert(o.getHeaderHeight());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setHeaderHeight :{
                $desc:"设置表头高度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid17'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setHeaderHeight(40); alert(o.getHeaderHeight());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getRowHandlerWidth :{
                $desc:"得到行手柄宽",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.grid16-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHandlerWidth(40); alert(o.getRowHandlerWidth());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setRowHandlerWidth :{
                $desc:"设置行手柄宽,并反映到界面",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid17-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHandlerWidth(40); alert(o.getRowHandlerWidth());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getGridHandlerCaption :{
                $desc:"得到 grid 左上角的标题",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.grid16-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setGridHandlerCaption('tg'); alert(o.getGridHandlerCaption());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setGridHandlerCaption :{
                $desc:"设置 grid 左上角的标题",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid17-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setGridHandlerCaption('tg'); alert(o.getGridHandlerCaption());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getRowHeight :{
                $desc:"获取行高度",
                $rtn:"Number",
                $snippet:[
                    "var id='xui.temp.grid18'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHeight(40); alert(o.getRowHeight());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setRowHeight :{
                $desc:"设置行高度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid19'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHeight(40); alert(o.getRowHeight());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getFreezedColumn:{
                $desc:"获取冻结列",
                $rtn:"Number"
            },
            setFreezedColumn :{
                $desc:"设置冻结列",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getFreezedRow:{
                $desc:"获取冻结行",
                $rtn:"Number"
            },
            setFreezedRow:{
                $desc:"设置冻结行",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number",
                    $force
                ]
            },
            getIniFold :{
                $desc:"判断表格在初始化是打开或收缩子行（用于带有子行的树形表格）",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid20'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setIniFold(false); alert(o.getIniFold());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setIniFold :{
                $desc:"设置表格在初始化是打开或收缩子行（用于带有子行的树形表格）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid21'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setIniFold(true); alert(o.getIniFold());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getRowResizer :{
                $desc:"判断是否可以拖动改变行高",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid22'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowResizer(false); alert(o.getRowResizer());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setRowResizer :{
                $desc:"设置是否可以拖动改变行高",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid23'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowResizer(true); alert(o.getRowResizer());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getRowHandler :{
                $desc:"判断行前是否带有用以拖动的行头",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid124'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHandler(false); alert(o.getRowHandler());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setRowHandler :{
                $desc:"设置行前是否带有用以拖动的行头",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid125'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowHandler(true); alert(o.getRowHandler());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getSelMode :{
                $desc:"获取表格的选择模式'none'表示不能选择, 'single'表示可单选, 'multi'表示可多选, 'multibycheckbox'表示可多选,并且只能点击checkbox来选中",
                $rtn:"String",
                $snippet:[
                    "var id='xui.temp.grid126'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setSelMode('none'); alert(o.getSelMode());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setSelMode :{
                $desc:"设置表格的选择模式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'none', 'single' or 'multi'. 默认为 'single'",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid127'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setSelMode('multi'); alert(o.getSelMode());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getNoCtrlKey:{
                $desc:"获取是否在多选择模式下需要用Ctrl来辅助多选",
                $rtn:"Boolean"
            },
            setNoCtrlKey:{
                $desc:"设置是否在多选择模式下需要用Ctrl来辅助多选",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            insertRows:{
                 $desc:"添加一组行",
                 $rtn:"[self]",
                 $paras:[
                    "arr [必需参数] : Array, 行项目数组",
                    "pid [可选参数] : String, 父行id",
                    "base [可选参数] : String, 基准行id",
                    "before [可选参数] : Boolean, 插入行在基准行之前或之后. 默认为 false;"
                 ],
                $snippet:[
                    "var id='xui.temp.grid128'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,iniFold:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.insertRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}],'row4',null,true)},1000);"+
                    "xui.asyRun(function(){o.insertRows([{id : 'row_2',cells:['cell_2',1,true,'label1']}],'row4',null,false)},2000);"+
                    "xui.asyRun(function(){o.insertRows([{id : 'row_3',cells:['cell_3',1,true,'label1']}],null,'row2',false)},3000);"+
                    "xui.asyRun(function(){o.insertRows([{id : 'row_4',cells:['cell_4',1,true,'label1']}],null,'row2',true)},4000);"+
                    "}"
                ]
            },
            toggleRow:{
                $desc:"打开或折叠指定的行. 该函数只对带有子行的行有效",
                $paras:[
                    "id [必需参数] : String, 节点id",
                    "expand [可选参数] : Boolean, true为打开,false为折叠. 如果不制定本参数,展开的会折叠,折叠的会展开"
                ],
                $snippet:[
                    "var id='xui.temp.grid129'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.toggleRow('row4',true)},1000);"+
                    "}"
                ]
            },
            updateRow:{
                $desc:"更新指定行",
                $rtn:"[self]",
                $paras:[
                    "rowId [必需参数] : String, 行id",
                    "options [必需参数] : key/value Object, 需要更新的键值对"
                ],
                $snippet:[
                    "var id='xui.temp.grid130-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.updateRow('row1',{caption:'new row1',height:100,sub:[]})},1000);"+
                    "}"
                ]
            },
            updateCell:{
                $desc:"更新指定单元格",
                $rtn:"[self]",
                $paras:[
                    "cellId [必需参数] : String, 单元格id",
                    "options [必需参数] : key/value Object, 需要更新的键值对",
                    "dirtyMark [可选参数] : Boolean, 是否启用脏标识.默认值是 [true]"
                ],
                $snippet:[
                    "var id='xui.temp.grid130'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.updateCell('c_a',{value:'a a a a'})},1000);"+
                    "}"
                ]
            },
            updateCellByRowCol2:{
                $desc:"按指定格式的行序号和列序号字符串来更新指定的单元格",
                $rtn:"[self]",
                $paras:[
                    "mixedId [必需参数] : String, 格式：[行序号:列序号]",
                    "hash [必需参数] : key/value Object, 需要更新的键值对",
                    "dirtyMark [可选参数] : Boolean, 是否启用脏标识. 默认值是 [true]",
                    "triggerEvent [可选参数] : Boolean, 是否触发事件. 默认值是 [false]"
                ]
            },
            updateCellByRowCol:{
                $desc:"更新行id和列id的单元格",
                $rtn:"[self]",
                $paras:[
                    "rowId [必需参数] : String, 单元格在的行id",
                    "colId [必需参数] : String, 单元格在的列id",
                    "hash [必需参数] : key/value Object, 需要更新的键值对",
                    "dirtyMark [可选参数] : Boolean, 是否启用脏标识.默认值是 [true]",
                    "triggerEvent [可选参数] : Boolean, 是否触发事件. 默认值是 [false]"
                ],
                $snippet:[
                    "var id='xui.temp.grid131'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.updateCellByRowCol('row1','col1',{value:'b b b b'})},1000);"+
                    "}"
                ]
            },
            getActiveRow:{
                $desc:"得到当前的活动行",
                $paras:[
                    "type [可选参数] : String, 'data': 得到行数据; 'map' 得到键值对; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ],
                $rtn:"Object",
                $snippet:[
                    "var id='xui.temp.grid1311'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.setActiveRow('row1')},1000);"+
                    "xui.asyRun(function(){alert(o.getActiveRow().id)},1500);"+
                    "}"
                ]
            },
            setActiveRow:{
                $desc:"设置当前的活动行",
                $rtn:"[self]",
                $paras:[
                    "rowId [必须参数] : String, 行id"
                ],
                $snippet:[
                    "var id='xui.temp.grid1312'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.setActiveRow('row1')},1000);"+
                    "xui.asyRun(function(){alert(o.getActiveRow().id)},1500);"+
                    "}"
                ]
            },
            getActiveCell:{
                $desc:"得到当前的活动单元格",
                $rtn:"Object",
                $snippet:[
                    "var id='xui.temp.grid1313'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative',activeMode:'cell'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.setActiveCell('row1','col1')},1000);"+
                    "xui.asyRun(function(){alert(o.getActiveCell().value)},1500);"+
                    "}"
                ]
            },
            setActiveCell:{
                $desc:"设置当前的活动单元格",
                $rtn:"[self]",
                $paras:[
                    "rowId [必须参数] : String, 行id",
                    "colId [必须参数] : String, 列id"
                ],
                $snippet:[
                    "var id='xui.temp.grid1314'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative',activeMode:'cell'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.setActiveCell('row1','col1')},1000);"+
                    "xui.asyRun(function(){alert(o.getActiveCell().value)},1500);"+
                    "}"
                ]
            },
            getRowDraggable :{
                $desc:"判断是否可以拖动行以改变行排序或父子关系",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid32'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowDraggable(false); alert(o.getRowDraggable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setRowDraggable :{
                $desc:"设置是否可以拖动行以改变行排序或父子关系",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid33'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowDraggable(true); alert(o.getRowDraggable());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getRows :{
                $desc:"获取表格的所有行",
                $paras:[
                    "type [可选参数] : String, 'data': 得到行数据; 'map' 得到键值对; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ],
                $rtn:"Array",
                $snippet:[
                    "var id='xui.temp.grid32'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui.asyRun(function(){o.setRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}]); alert(o.getRows().length); alert(xui.serialize(o.getRows('data'))); alert(xui.serialize(o.getRows('min')))});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setRows :{
                $desc:"设置表格的所有行",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid33'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui.asyRun(function(){o.setRows([{id : 'row_1',cells:['cell_1',1,true,'label1']},{id : 'row_11',cells:['cell_11',1,true,'label1']}]); alert(o.getRows().length)});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getRawData :{
                $desc:"获取表格的键值对数据",
                $rtn:"Array"
            },
            setRawData :{
                $desc:"设置表格的键值对数据",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array. [{col1:v1,col2:v1}]",
                    $force
                ]
            },
            getHeader :{
                $desc:"获取表头对象",
                $paras:[
                    "type [可选参数] : String, 'data': 得到列数据; 'min': 得到列的最简化数据; 其他值,得到内存中列的原数据"
                ],
                $rtn:"Array",
                $snippet:[
                    "var id='xui.temp.grid34'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui.asyRun(function(){alert(o.getHeader().length)});"+
                    "xui.asyRun(function(){alert(xui.serialize(o.getHeader('data')))});"+
                    "xui.asyRun(function(){alert(xui.serialize(o.getHeader('min')))});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setHeader :{
                $desc:"设置表头对象",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid35'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui.asyRun(function(){alert(o.getHeader().length)});"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getTagCmds:{
                $desc:"得到命令按钮集",
                $rtn:"Array"
            },
            setTagCmds:{
                $desc:"设置命令按钮集",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array, 项数组",
                    $force
                ]
            },
            setGrpCols :{
                $desc:"设置表头组数组对象",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Array",
                    $force
                ]
            },
            getGrpCols :{
                $desc:"得到表头组对象",
                $rtn:"[Array]"
            },
            getHeaderByColId:{
                $desc:"获取某个列的表头值",
                $rtn:"Ojbect",
                $paras:[
                    "colId [必需参数] : String, 列 id"
                ],
                $snippet:[
                    "var id='xui.temp.grid35-0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui.asyRun(function(){alert(o.getHeaderByColId('col1').id)},1000);"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            updateHeader:{
                $desc:"更新某个列的表头值",
                $rtn:"[self]",
                $paras:[
                    "colId [必需参数] : String, 列的id",
                    "options [必需参数] : key/value Object, 需要更新的键值对"
                ],
                $snippet:[
                    "var id='xui.temp.grid35-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui.asyRun(function(){o.updateHeader('col1',{caption:'updated',width:100})},1000);"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getRowByDom:{
                $desc:"从指定的DOM节点(或DOM id)中获取行对象",
                $rtn:"Object, 行对象",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)"
                ]
            },
            getHeaderByDom:{
                $desc:"从指定的DOM节点(或DOM id)中获取列头对象",
                $rtn:"Object, 列头对象",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)"
                ]
            },
            getCellByDom:{
                $desc:"从指定的DOM节点(或DOM id)中获取单元格对象",
                $rtn:"Object, 单元格对象",
                $paras:[
                    "src [必需参数] : DOM(或DOM的id)"
                ]
            },
            getRowbyRowId  :{
                $desc:"更新行id为指定值的行",
                $rtn:"Object",
                $paras:[
                    "rowId [必需参数] : String",
                    "type [可选参数] : String, 'data': 得到行数据; 'map' 得到键值对; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ],
                $snippet:[
                    "var id='xui.temp.grid36'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){alert(o.getRowbyRowId('row2'))});"+
                    "}"
                ]
            },
            getRowbyCell:{
                $desc:"根据一个单元格得到行对象",
                $rtn:"Object",
                $paras:[
                    "cell [必需参数] : Object",
                    "type [可选参数] : String, 'data': 得到行数据; 'map' 得到键值对; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ]
            },
            getHeaderByCell:{
                $desc:"根据一个单元格得到列对象",
                $rtn:"Object",
                $paras:[
                    "cell [必需参数] : Object",
                    "type [可选参数] : String, 'data': 得到行数据;  'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ]
            },
            getHeaderbyCell:{
                $desc:"根据一个单元格得到列头对象",
                $rtn:"Object",
                $paras:[
                    "cell [必需参数] : Object",
                    "type [可选参数] : String, 'data': 得到行数据; 'min': 得到行的最简化数据; 其他值,得到内存中行的原数据"
                ]
            },
            getSubNodeInGrid:{
                $desc:"获取grid的子节点",
                $rtn:"xui.Dom",
                $paras:[
                    "key [必需参数] : String, 项标志符",
                    "rowId [可选参数] : String 行id",
                    "colId [可选参数] : String 列id"
                ],
                $snippet:[
                    "var id='xui.temp.grid36-0'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){alert(o.getSubNodeInGrid('ROW').get().length)});"+
                    "xui.asyRun(function(){alert(o.getSubNodeInGrid('ROW','row1').get().length)});"+
                    "xui.asyRun(function(){alert(o.getSubNodeInGrid('CELL').get().length)});"+
                    "xui.asyRun(function(){alert(o.getSubNodeInGrid('CELL','row1','col1').get().length)});"+
                    "}"
                ]
            },
            adjustEditor:{
                $desc:"调节单元格编辑器",
                $rtn:"[self]",
                $paras:[
                    "adjustFun [可选参数] : Function(/Object:editor, Object:cell/), 调节函数，如果不输入调节函数，会自动调节编辑器的位置和大小"
                ]
            },
            getEditor:{
                $desc:"得到当前的单元格编辑器",
                $rtn:"Object"
            },
            getEditCell:{
                $desc:"得到当前正在编辑的单元格",
                $rtn:"Object"
            },
            getRowMap:{
                $desc:"得到当前活动行或指定行的键值对",
                $paras:[
                    "rowId [可选参数] : String, 输入null表示当前选中行"
                ],
                $rtn:"Object"
            },
            setRowMap :{
                $desc:"以键值对的格式设置当前活动或给定行",
                $rtn:"[self]",
                $paras:[
                    "rowId [可选参数] : String, 输入null表示当前选中行",
                    "hash [必需参数] : Object. 键值对"
                ]
            },
            getRowNumbered :{
                $desc:"判断是否在行前显示行号",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid37'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowNumbered(true); alert(o.getRowNumbered());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setRowNumbered :{
                $desc:"设置是否在行前显示行号",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid38'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setRowNumbered(true); alert(o.getRowNumbered());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getEditMode:{
                $desc:"获取编辑模式'focus', 'sharp', 'hover', 'hoversharp' 和 'inline'之一，默认为'focus'",
                $rtn:"String"
            },
            setEditMode:{
                $desc:"设置编辑模式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String'focus', 'sharp', 'hover' 和 'inline'之一，默认为'focus'",
                    $force
                ]
            },
            getShowHeader :{
                $desc:"判断是否显示表头",
                $rtn:"Boolean",
                $snippet:[
                    "var id='xui.temp.grid39'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false, position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setShowHeader(false); alert(o.getShowHeader());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            setShowHeader :{
                $desc:"设置是否显示表头",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ],
                $snippet:[
                    "var id='xui.temp.grid40'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setShowHeader(false); alert(o.getShowHeader());"+
                    "xui(id).prepend(o);"+
                    "}"
                ]
            },
            getRowOptions:{
                $desc:"得到行的自定义属性",
                $rtn:"Object"
            },
            setRowOptions :{
                $desc:"设置行的自定义属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            getColOptions:{
                $desc:"得到列的自定义属性",
                $rtn:"Object"
            },
            setColOptions:{
                $desc:"设置列的自定义属性",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            getTreeMode:{
                $desc:"得到Grid的树状模式",
                $rtn:"String"
            },
            setTreeMode:{
                $desc:"设置Grid的树状模式. 可以是'无树形'，'树形在行柄'，或'树形在首格'",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String'none','inhandler' or 'infirstcell'",
                    $force
                ]
            },
            getHotRowMode:{
                $desc:"得到Grid的[热行]模式",
                $rtn:"String'none'[没有热行模式], 'show'[热行始终显示] 或 'hide'[不符合规定(beforeHotRowAdded返回false)的热行自动隐藏] 或 'auto'[不符合规定(beforeHotRowAdded返回false)的热行自动隐藏，并且自动给空表加热行]"
            },
            setHotRowMode:{
                $desc:"设置Grid的[热行]模式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String'none'[没有热行模式], 'auto'[热行自动显示或隐藏] 或 'show'[热行始终显示] 之一",
                    $force
                ]
            },
            getHotRowNumber:{
                $desc:"得到Grid[热行]的自定义行号",
                $rtn:"String"
            },
            setHotRowNumber:{
                $desc:"设置Grid[热行]的自定义行号",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            resetGridValue:{
                $desc:"重新设置所有单元格的值, 并清除脏标志",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.grid41'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.updateCellByRowCol('row1','col1',{value:'a'}).updateCellByRowCol('row1','col2',{value:5}).updateCellByRowCol('row2','col2',{value:8});"+
                    "xui.asyRun(function(){o.resetGridValue();},1000);"+
                    "}"
                ]
            },
            resetColValue:{
                $desc:"重新设置某列的所有单元格的值, 并清除脏标志",
                $rtn:"[self]",
                $paras:[
                    "colId [必需参数] : String, 列id值"
                ]
            },

            resetRowValue:{
                $desc:"重新设置某行的所有单元格的值, 并清除脏标志",
                $rtn:"[self]",
                $paras:[
                    "rowId [必需参数] : String, 行id值"
                ],
                $snippet:[
                    "var id='xui.temp.grid41-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.updateCellByRowCol('row1','col1',{value:'a'}).updateCellByRowCol('row1','col2',{value:5}).updateCellByRowCol('row2','col2',{value:8});"+
                    "xui.asyRun(function(){o.resetRowValue('row1')},1000);"+
                    "}"
                ]
            },
            showColumn :{
                $desc:"显示或隐藏指定的列",
                $rtn:"[self]",
                $paras:[
                    "colId [必需参数] : String, 列id",
                    "flag [可选参数] : Boolean, True为显示,false为隐藏. 默认为 true"
                ],
                $snippet:[
                    "var id='xui.temp.grid42'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.showColumn('col1',false)},1000);"+
                    "xui.asyRun(function(){o.showColumn('col1')},2000);"+
                    "}"
                ]
            },
            sortColumn:{
                $desc:"列排序",
                $rtn:"[self]",
                $paras:[
                    "colId [必需参数] : String, 列id",
                    "desc [可选参数] : Boolean, True为递降排序,false为递增排序. 不指定或null为当前排序的逆序",
                    "sortby [可选参数] : Function, 排序函数. function(x,y,values,asc,colIndex,colCells){return 0|1|-1}"
                ]
            },
            removeAllRows:{
                $desc:"去除所有行",
                $rtn:"[self]",
                $snippet:[
                    "var id='xui.temp.grid43'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.removeAllRows();},1000);"+
                    "}"
                ]
            },
            removeCols:{
                $desc:"去除指定列",
                $rtn:"[self]",
                $paras:[
                    "ids [必需参数] : String 或 Array, 列id, 或多个列id的数组"
                ]
            },
            removeRows:{
                $desc:"去除指定行",
                $rtn:"[self]",
                $paras:[
                    "ids [必需参数] : String 或 Array, 行id, 或多个行id的数组"
                ],
                $snippet:[
                    "var id='xui.temp.grid44'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "xui.asyRun(function(){o.removeRows(['row1','row2'])},1000);" +
                    "}"
                ]
            },
            addHotRow:{
                $desc:"加[热行](如果没有的话)",
                $rtn:"[self]",
                $paras:[
                    "focusColId [可选参数] : String, [热行]获得焦点的列 "
                ]
            },
            removeHotRow:{
                $desc:"去除[热行]",
                $rtn:"[self]"
            },
            beforeCellActive:{
                $desc:"在单元格激活前被调用. 返回false将阻止单元格被激活",
                $paras:[
                    $profile,
                    "cell : 单元格对象"
                ],
                $snippet:[
                    "var id='xui.temp.grid50'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('cell');"+
                    "xui(id).prepend(o);"+
                    "o.beforeCellActive(function(p,c){return false;});" +
                    "}"
                ]
            },
            onBodyLayout:{
                $desc:"在表格主体界面布局完成后触发",
                $paras:[
                    $profile,
                    "trigger : String, 触发事件类型"
                ]
            },
            beforeRowActive:{
                $desc:"在行激活前被调用. 返回false将阻止行被激活",
                $paras:[
                    $profile,
                    "row : Object, 行对象"
                ],
                $snippet:[
                    "var id='xui.temp.grid51'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('row');"+
                    "xui(id).prepend(o);"+
                    "o.beforeRowActive(function(p,c){return false;});" +
                    "}"
                ]
            },
            afterCellActive:{
                $desc:"在单元格激活后被调用",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象"
                ],
                $snippet:[
                    "var id='xui.temp.grid52'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('cell');"+
                    "xui(id).prepend(o);"+
                    "o.afterCellActive(function(p,c){xui.message(c.value);});" +
                    "}"
                ]
            },
            beforeCellKeydown:{
                $desc:"在单元格键盘事件前被调用",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "keys : Object, 参见xui.Event.getKey函数"
                ]
            },
            afterCellFocused:{
                $desc:"在单元格获得焦点后被调用",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "row : Object, 单元格的行对象"
                ]
            },
            onBeginEdit:{
                $desc:"在编辑器显示前调用",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "editor: Object, 编辑器对象"
                ]
            },
            beforeEditApply:{
                $desc:"在编辑内容生效前调用,返回false可以阻止该动作",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "options: Object. 要更新的内容",
                    "editor: Object, 编辑器对象",
                    "tag: String, 动作来源"
                ]
            },
            onEndEdit:{
                $desc:"在编辑器消失前调用",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "editor: Object, 编辑器对象"
                ]
            },
            beforeIniEditor:{
                $desc:"在单元格编辑之前调用. 如果返回false,默认的功能会被禁止",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "cellNode : xui.Dom, 单元格的Dom对象"
                ]
            },
            beforeInitHotRow:{
                $desc:"在Hot Row初始化之前调用.[当hotRowMode不为'none'] 如果返回false,默认的功能会被禁止",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "row : Object, 单元格的行对象"
                ]
            },
            onInitHotRow:{
                $desc:"当[热行]需要数据初始化时调用, 需要返回初始化的行数据",
                $paras:[
                    $profile
                ]
            },
            beforeHotRowAdded:{
                $desc:"在[热行]被加到Grid前调用. 如果返回[true], [热行]被加入; 如果返回[false],[热行]被删除; 如果返回cell，[热行]保留，并且cell获得焦点; 如果返回[null],没有影响",
                $paras:[
                    $profile,
                    "row : Object. 行对象",
                    "leaveGrid : Booean. 是否触发事件的光标在Grid之外"
                ]
            },
            afterHotRowAdded:{
                $desc:"在[热行]被加到Grid后调用",
                $paras:[
                    $profile,
                    "row : Object. 行对象"
                ]
            },
            onRowDirtied:{
                $desc:"当行被改变后调用，[异步调用]",
                $paras:[
                    $profile,
                    "row : Object. 行对象"
                ]
            },
            afterRowActive:{
                $desc:"在行被激活后被调用",
                $paras:[
                    $profile,
                    "row : Object, 行对象"
                ],
                $snippet:[
                    "var id='xui.temp.grid53'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setActiveMode('row');"+
                    "xui(id).prepend(o);"+
                    "o.afterRowActive(function(p,c){xui.message(c.id);});" +
                    "}"
                ]
            },
            beforeColMoved:{
                $desc:"在改变列位置前被调用. 返回false将阻止列位置被改变",
                $paras:[
                    $profile,
                    "colId : String, 被移动的列id",
                    "toId : String, 基准列id,移动的列将放在该列之前"
                ],
                $snippet:[
                    "var id='xui.temp.grid54'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true);"+
                    "xui(id).prepend(o);"+
                    "o.beforeColMoved(function(p,colId){if(colId=='col1')return false;});" +
                    "o.afterColMoved(function(p,colId,toId){xui.message(colId +' is moved to the the front of '+ toId)});" +
                    "}"
                ]
            },
            afterColMoved:{
                $desc:"在改变列位置后被调用",
                $paras:[
                    $profile,
                    "colId : String, 被移动的列id",
                    "toId : String, 基准列id,移动的列将放在该列之前"
                ],
                $snippet:[
                    "var id='xui.temp.grid55'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true);"+
                    "xui(id).prepend(o);"+
                    "o.beforeColMoved(function(p,colId){if(colId=='col1')return false;});" +
                    "o.afterColMoved(function(p,colId,toId){xui.message(colId +' is moved to the the front of '+ toId)});" +
                    "}"
                ]
            },
            beforeColSorted:{
                $desc:"在对列排序前调用.返回false将阻止列排序",
                $paras:[
                    $profile,
                    "col : Object, 被排序的列"
                ]
            },
            afterColSorted:{
                $desc:"在对列排序后调用",
                $paras:[
                    $profile,
                    "col : Object, 被排序的列"
                ]
            },
            beforeColShowHide:{
                $desc:"在显示或隐藏列前调用.返回false将阻止列显示或隐藏",
                $paras:[
                    $profile,
                    "colId : String, 被影响的列",
                    "flag: Boolean, true->显示; false->隐藏"
                ]
            },
            afterColShowHide:{
                $desc:"在显示或隐藏列后调用",
                $paras:[
                    $profile,
                    "colId : String, 被影响的列",
                    "flag: Boolean, true->显示; false->隐藏"
                ]
            },
            beforeColResized:{
                $desc:"在从界面改变列宽度前调用，返回false表示阻止改变列宽",
                $paras:[
                    $profile,
                    "colId : String, 所影响的列id",
                    "width: Number, 列宽"
                ]
            },
            afterColResized:{
                $desc:"在从界面改变列宽度后调用",
                $paras:[
                    $profile,
                    "col : Object, 所影响的列id",
                    "width: Number, 列宽"
                ]
            },
            beforeRowResized:{
                $desc:"在从界面改变行的高度前调用，返回false表示阻止改变行高",
                $paras:[
                    $profile,
                    "rowId : String, 所影响的行id",
                    "height: Number, 高"
                ]
            },
            afterRowResized:{
                $desc:"在从界面改变行的高度后调用",
                $paras:[
                    $profile,
                    "rowId : String, 所影响的行id",
                    "height: Number, 高"
                ]
            },
            beforeColDrag:{
                $desc:"在拖动列之前被调用. 返回false将阻止列拖动",
                $paras:[
                    $profile,
                    "colId : String, 列id"
                ],
                $snippet:[
                    "var id='xui.temp.grid56'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true);"+
                    "xui(id).prepend(o);"+
                    "o.beforeColDrag(function(p,colId){if(colId=='col1')return false;});" +
                    "}",
                    "var id='xui.temp.grid57'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s; hash.header[0].colMovable=false; o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setColMovable(true);"+
                    "xui(id).prepend(o);"+
                    "}"
               ],
                $memo:"Equals to set 'colMovable' to false in the specified column in header array"
            },

            onGetContent:{
                $desc:"在父行被展开,需要子行数据是被调用",
                $paras:[
                    $profile,
                    "row : Object, 父行对象",
                    "callback : Function, 回调函数"
                ],
                $snippet:[
                    "var id='xui.temp.grid57'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;hash.rows[3].sub=hash.rows[4].sub=true;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.onGetContent(function(p,row){return row.id=='row4'?[['a',1,true,{type:'checkbox',value:true}]]:[['b',3,false,'#555555']];});" +
                    "}"
               ]
            },
            onRowSelected:{
                $desc:"在行被选择时被调用",
                $paras:[
                    $profile,
                    "row: Object, 行对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid",
                    "type: Number, 0:没有影响;1:行被选中;-1:行被清除选中"
                ],
                $snippet:[
                    "var id='xui.temp.grid58'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.onRowSelected(function(p,row){xui.message(row.id)});" +
                    "}"
               ]
            },
            onDblclickRow:{
                $desc:"在行被双击时调用",
                $paras:[
                    $profile,
                    "row: Object, 行对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.grid59'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.onDblclickRow(function(p,row){xui.message(row.id)});" +
                    "}"
               ]
            },
            beforeComboPop :{
                $desc:"当单元格的编辑控件Pop按钮被单击时调用,只对单元格为'date,time,datetime,listbox,combobox,helpinput,color,getter,popbox,cmdbox'时有效",
                $paras:[
                    $profile,
                    "cell: Object, cell 对象",
                    "proEditor: xui.UIProfile, 编辑器的控件概要对象",
                    "pos: Object, 鼠标位置",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.grid60'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;hash.header[0].type='button';hash.header[1].type='cmdbox';hash.header[2].type='popbox';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "o.setEditable(true);"+
                    "xui(id).prepend(o);"+
                    "o.beforeComboPop(function(p,cell){xui.message(cell.value)});" +
                    "}"
               ]
            },
            beforePopShow :{
                $desc:"在单元格的编辑控件的下拉框被显示前调用,只对单元格为'date,time,datetime,listbox,combobox,helpinput,color'时有效",
                $paras:[
                    $profile,
                    "cell: Object, cell 对象",
                    "proEditor: xui.UIProfile, 编辑器的控件概要对象",
                    "popCtl : xui.UIProfile, 弹出窗口对象"
                ]
            },
            afterPopShow :{
                $desc:"在单元格的编辑控件的下拉框被显示后调用,只对单元格为'date,time,datetime,listbox,combobox,helpinput,color'时有效",
                $paras:[
                    $profile,
                    "cell: Object, cell 对象",
                    "proEditor: xui.UIProfile, 编辑器的控件概要对象",
                    "popCtl : xui.UIProfile, 弹出窗口对象"
                ]
            },
            onCommand :{
                $desc:"在单元格的编辑控件的命令按钮被点击时调用,只对单元格为'date,time,datetime,listbox,combobox,helpinput,color,getter,popbox,cmdbox'时有效",
                $paras:[
                    $profile,
                    "cell: Object, cell 对象",
                    "proEditor: xui.UIProfile, 编辑器的控件概要对象",
                    "src : String, 按钮 DOM 元素的xid"
                ]
            },
            onEditorclick :{
                $desc:"在单元格的编辑控件被点击时调用",
                $paras:[
                    $profile,
                    "cell: Object, cell 对象",
                    "proEditor: xui.UIProfile, 编辑器的控件概要对象",
                    "type: String, 点击的位置类型",
                    "src : String, 按钮 DOM 元素的xid"
                ]
            },
            onClickGridHandler:{
                $desc:"当点击列头和行头的共同区域时触发",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onRowHover:{
                $desc:"当鼠标经过某行的时候触发",
                $paras:[
                    $profile,
                    "row: Object,  row 对象",
                    "hover : Boolean, 进入或离开",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onClickHeader:{
                $desc:"当点击某列标题的时候触发",
                $paras:[
                    $profile,
                    "col: Object,  列对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onCmd:{
                $desc:"当用户单击内部按钮的时候调用",
                $paras:[
                    $profile,
                    "item: Object, 子项对象",
                    "cmdKey: String, 命令的键值",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onClickRow:{
                $desc:"当点击某行的时候触发",
                $paras:[
                    $profile,
                    "row: Object,  row 对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onClickRowHandler:{
                $desc:"当点击某行手柄的时候触发",
                $paras:[
                    $profile,
                    "row: Object,  row 对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onClickCell:{
                $desc:"当点击一个cell(当cell不在编辑状态时)的时候触发",
                $paras:[
                    $profile,
                    "cell: Object,  cell 对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.grid60-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;hash.header[0].type='button';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.onClickCell(function(p,cell){xui.message(cell.value)});" +
                    "}"
               ]
            },
            onDblclickCell:{
                $desc:"当双击一个cell(当cell不在编辑状态时)的时候触发",
                $paras:[
                    $profile,
                    "cell: Object,  cell 对象",
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ],
                $snippet:[
                    "var id='xui.temp.grid60-2'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;hash.header[0].type='button';o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.onDblclickCell(function(p,cell){xui.message(cell.value)});" +
                    "}"
               ]
            },
           beforeIniEditorr: {
                $desc:"在单元格由展示状态变为编辑状态时调用(将编辑器附着在单元格上). 返回false或自定义编辑器会阻止默认的编辑器出现",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "cellNode: xui.Dom, 单元格节点",
                    "pNode: xui.Dom, 编辑器的容器节点"
                ],
                $snippet:[
                    "var id='xui.temp.grid61-1'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:true,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.beforeIniEditor(function(p,cell){if(cell._col.id!='col2')return false;});" +
                    "}"
               ]
            },
            beforeCellUpdated: {
                $desc:"在单元格的值被更新前调用. 返回false将阻止单元格值被更新",
                $paras:[
                    $profile,
                    "cell : Object,  cell 对象",
                    "hash : Object, 将要更新的键值对"
                ],
                $snippet:[
                    "var id='xui.temp.grid61'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.beforeCellUpdated(function(){xui.message('Cant update cell!');return false;});" +
                    "xui.asyRun(function(){o.updateCellByRowCol('row1','col1','abc')},1000);"+
                    "}"
               ]
            },
            afterCellUpdated: {
                $desc:"在单元格的值被更新后调用",
                $paras:[
                    $profile,
                    "cell : Object, 单元格对象",
                    "hash : Object, 更新的键值对"
                ],
                $snippet:[
                    "var id='xui.temp.grid62'; if(!xui.Dom.byId(id)){this.prepend(xui.create('<div id='+id+' style=\"border:solid 1px;padding:20px;position:relative;width:300px;height:200px;\">' + '<button style=\"position:absolute; bottom:0px; z-index:2;\" onclick=\"xui(this).parent().remove()\">remove this example</button>' + '</div>'));"+
                    "var o=new xui.UI.TreeGrid({editable:false,position:'relative'});"+
                    "xui.Ajax('App/js/grid.js','',function(s){var hash=s;o.setHeader(hash.header).setRows(hash.rows);},null,null,{asy:false}).start();"+
                    "xui(id).prepend(o);"+
                    "o.afterCellUpdated(function(p,cell,hash){xui.message('cell updated!');});" +
                    "xui.asyRun(function(){o.updateCellByRowCol('row1','col1','abc')},1000);"+
                    "xui.asyRun(function(){o.updateCellByRowCol('row1','col2',{type:'checkbox',value:false})},2000);"+
                    "}"
               ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","Flash"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.Flash 类",
        constructor:{
            $desc:"生成一个xui.UI.Flash对象"
        },
        getFlashVersion:{
            $desc:"得到当前浏览器的Flash插件版本",
            $rtn:"String"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            getParameters:{
                $desc:"得到 Flash 的参数",
                $rtn:'Object'
            },
            setParameters:{
                $desc:"设置  Flash 的参数",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            getFlashvars:{
                $desc:"得到 Flash 的变量",
                $rtn:'Object'
            },
            setFlashvars:{
                $desc:"设置  Flash 的变量",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ]
            },
            getFlash:{
                $desc:"获取Flash对象",
                $rtn:"Object"
            },
            getSrc:{
                $desc:"获取Flash的src值",
                $rtn:"String"
            },
            setSrc:{
                $desc:"设置Flash的src值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            getCover:{
                $desc:"得到 Flash 上面是否覆盖了一个div",
                $rtn:"Boolean"
            },
            setCover:{
                $desc:"设置 Flash 上面是否覆盖了一个div",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            refreshFlash:{
                $desc:"刷新Flash"
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","FusionChartsXT"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.FusionChartsXT 类",
        constructor:{
            $desc:"生成一个xui.UI.FusionChartsXT对象"
        },
        prototype:{
            KEY:{$desc:"本类名"},
            callFC:{
                $desc:"调用 FusionChartsXT 内部函数",
                $rtn:"Object",
                $paras:[
                    "funName [必需参数] : String, 函数名称",
                    "params [可选参数] : Array, 函数参数"
                ]
            },
            configure:{
                $desc:"配置 FusionChartsXT 的 print Manager",
                $paras:[
                    "options [必需参数] : Object"
                ],
                $memo:"请参见 FusionChartsXT 的configure函数"
            },
            getChartType:{
                $desc:"得到图类型",
                $rtn:'String'
            },
            setChartType:{
                $desc:"设置图类型",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ],
                $memo:"请参见 FusionChartsXT 所支持的图标类型"
            },
            getChartAttribute:{
                $desc:"得到 FusionChartsXT 的Attribute配置对象",
                $rtn:'Object',
                $memo:"请参见 FusionChartsXT 的 getChartAttribute 函数"
            },
            setChartAttribute:{
                $desc:"设置 FusionChartsXT 的Attribute配置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Object",
                    $force
                ],
                $memo:"请参见 FusionChartsXT 的 setChartAttribute 函数"
            },
            getConfigure:{
                $desc:"得到 FusionChartsXT 的configure配置对象",
                $rtn:'Object',
                $memo:"请参见 FusionChartsXT 的configure函数"
            },
            getJSONData:{
                $desc:"得到JSON数据",
                $rtn:"Object"
            },
            setJSONData:{
                $desc:"设置JSON数据",
                $rtn:"[self]",
                $paras:[
                    "JSON: Object, JSON 对象"
                ]
            },
            getPlotData:{
                $desc:"得到图块数据",
                $rtn:"Object"
            },
            setPlotData:{
                $desc:"设置图块数据",
                $rtn:"[self]",
                $paras:[
                    "data: Object, 数据对象"
                ]
            },
            getFeedData:{
                $desc:"得到实时数据",
                $rtn:"Object"
            },
            setFeedData:{
                $desc:"设置实时数据",
                $rtn:"[self]",
                $paras:[
                    "data: Object, 数据对象"
                ]
            },
            getJSONUrl:{
                $desc:"得到JSON数据地址",
                $rtn:"String"
            },
            setJSONUrl:{
                $desc:"设置JSON数据地址",
                $rtn:"[self]",
                $paras:[
                    "url: String, 地址字符串"
                ]
            },
            getXMLData:{
                $desc:"得到xml数据",
                $rtn:"String"
            },
            setXMLData:{
                $desc:"设置xml数据",
                $rtn:"[self]",
                $paras:[
                    "xml: String, xml 字符串"
                ]
            },
            getXMLUrl:{
                $desc:"得到xml数据地址",
                $rtn:"String"
            },
            setXMLUrl:{
                $desc:"设置xml数据地址",
                $rtn:"[self]",
                $paras:[
                    "url: String, 地址字符串"
                ]
            },
            getSVGString:{
                $desc:"得到FusionChartsXT的SVG数据",
                $rtn:"String"
            },
            setTransparent:{
                $desc:"设置FusionChartsXT背景透明",
                $rtn:"[self]",
                $paras:[
                    "isTransparent: Boolean, 是否透明"
                ]
            },
            fillData:{
                $desc:"为FusionChartsXT填充数据",
                $rtn:"[self]",
                $paras:[
                    "data: Object, 数据",
                    "index: Number, 序号",
                    "isLineset: Boolean, 是否为lineset"
                ]
            },
            updateData:{
                $desc:"为实时高斯图更新数据。如果是单高斯(LEDs, Bulb, Cylinder, Thermometer),第一个参数为刻度值; 如果是Angular gauge 或 Horizontal Linear gauge, 第一个参数是刻度索引, 第二个参数是刻度值",
                $rtn:"[self]",
                $paras:[
                    "index: Number, index or value",
                    "value: Number, value"
                ]
            },
            updateDataById:{
                $desc:"为实时高斯或线性图更新数据（只对设置了id的图才有效）。",
                $rtn:"[self]",
                $paras:[
                    "key: String, id",
                    "value: Number, value"
                ]
            },
            getFCObject:{
                $desc:"得到FusionChartsXT 对象",
                $rtn:"Object"
            },
            refreshChart:{
                $desc:"刷新 FusionChart"
            },
            onDataClick:{
                $desc:"在点击 FusionChart 数据图形的时候触发",
                $paras:[
                    $profile,
                    "argsMap: Object, 事件参数集合"
                ]
            },
            onLabelClick:{
                $desc:"在点击 FusionChart X轴标签的时候触发",
                $paras:[
                    $profile,
                    "argsMap: Object, 事件参数集合"
                ]
            },
            onAnnotationClick:{
                $desc:"在点击 FusionChart 注释的时候触发",
                $paras:[
                    $profile,
                    "argsMap: Object, 事件参数集合"
                ]
            },
            onFusionChartsEvent:{
                $desc:"所有 FusionChart 事件",
                $paras:[
                    $profile,
                    "eventObject: Object, FusionChartsXT事件的eventObject",
                    "argumentsObject : Object, FusionChartsXT事件的argumentsObject"
                ],
                $memo:"请参见 FusionChartsXT 的所有内置事件"
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","UI","SVGPaper"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.UI.SVGPaper 类",
        constructor:{
            $desc:"生成一个xui.UI.SVGPaper对象"
        },
        prototype:{
            append:{
                $desc:"添加对象",
                $rtn:"[self]",
                $paras:[
                    "target [必需参数] : xui.UIProfile/xui.UIProfile[], 一个xui.UI对象(或一系列xui.UIProfile概要对象)"
                ]
            },
            getPaper:{
                $desc:"得到SVG的Paper对象(Raphael Paper)",
                $rtn:'Object'
            },
            getScaleChildren:{
                $desc:"得到是否是按比例改变子控件",
                $rtn:"Boolean"
            },
            setScaleChildren:{
                $desc:"设置是否按比例改变子控件",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            }
        }
    });

    //svg
    xui.set(xui.Locale,["cn","doc","xui","svg"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg 类",
        constructor:{
            $desc:"生成一个xui.svg对象"
        },
        prototype:{
            getLeft:{
                $desc:"获取控件的左边坐标",
                $rtn:"Number"
            },
            setLeft:{
                $desc:"设置控件的左边坐标",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number"
                ]
            },
            getTop:{
                $desc:"获取控件的上边沿坐标",
                $rtn:"Number"
            },
            setTop:{
                $desc:"设置控件的上边沿坐标",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Number"
                ]
            },
            getWidth:{
                $desc:"获取控件的宽度",
                $rtn:"Number"
            },
            setWidth:{
                $desc:"设置控件的宽度",
                $rtn:"[self]",
                 $paras:[
                    "value [必需参数] : nonnegative Number"
                ]
            },
            getHeight:{
                $desc:"获取控件的高度",
                $rtn:"Number"
            },
            setHeight:{
                $desc:"设置控件的高度",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : 非负 Number"
                ]
            },
            toFront:{
                $desc:"把控件移到最上层",
                $rtn:"[self]"
            },
            toBack:{
                $desc:"把控件移到最下层",
                $rtn:"[self]"
            },
            getAttr:{
                $desc:"获得控件中某节点的属性",
                $rtn:"Object",
                $paras:[
                    "key [必须参数] : 节点的键值"
                ]
            },
            setAttr:{
                $desc:"设置控件中某节点的属性",
                $rtn:"[self]",
                $paras:[
                    "key [必须参数] : String, 节点的键值",
                    "atrr [必须参数] : Object, 属性键值对",
                    "reset [可选参数] : Boolean, 是否要同时设置其他属性(用默认值). 默认是[true]",
                    "notify [可选参数] : Boolean, 是否要通知控件的其他节点属性的变化. 默认是[true]"
                ]
            },
            getAllNodes:{
                $desc:"获得控件的全部节点",
                $rtn:"xui.Dom"
            },
            getElemSet:{
                $desc:"获得控件的全部元素集合(Raphael Set)",
                $rtn:"Object"
            },
            getPaper:{
                $desc:"获得控件的容器(Raphael Paper)",
                $rtn:"xui.Dom"
            },
            animate:{
                $desc:"控件所有元素的动画",
                $rtn:'Object',
                $paras:[
                    "params [必须参数] : Object, 元素在动画末的最终属性",
                    "ms [必须参数] : Number, 动画持续的毫秒数",
                    "easing [可选参数] : String, 动画类型'linear', '<' or 'easeIn' or 'ease-in', '>' or 'easeOut' or 'ease-out', '<>' or 'easeInOut' or 'ease-in-out', 'backIn' or 'back-in', 'backOut' or 'back-out', 'elastic', 'bounce'. 默认是 'linear'",
                    "callback [可选参数] : Function, 动画完毕调用的回调函数"
                ]
            },
            getShadow:{
                $desc:"判断控件是否显示阴影",
                $rtn:"Boolean"
            },
            setShadow:{
                $desc:"设置控件是否显示阴影",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getSvgTag:{
                $desc:"获取控件的svg tag值",
                $rtn:"String"
            },
            setSvgTag:{
                $desc:"设置控件的svg tag值",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String",
                    $force
                ]
            },
            onClick:{
                $desc:"当单击控件时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","circle"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.circle 类",
        constructor:{
            $desc:"生成一个xui.svg.circle对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","ellipse"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.ellipse 类",
        constructor:{
            $desc:"生成一个xui.svg.ellipse对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","rect"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.rect 类",
        constructor:{
            $desc:"生成一个xui.svg.rect对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","image"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.image 类",
        constructor:{
            $desc:"生成一个xui.svg.image对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","text"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.text 类",
        constructor:{
            $desc:"生成一个xui.svg.text对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","path"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.path 类",
        constructor:{
            $desc:"生成一个xui.svg.path对象"
        },
        prototype:{
            getPath:{
                $desc:"得到路径",
                $rtn:"String"
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","absComb"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.absComb 类",
        constructor:{
            $desc:"生成一个xui.svg.absComb对象"
        },
        prototype:{
            getAttr:{
                $desc:"获得控件中某节点的属性",
                $rtn:"Object",
                $paras:[
                    "key [必须参数] : 节点的键值"
                ]
            },
            setAttr:{
                $desc:"设置控件中某节点的属性",
                $rtn:"[self]",
                $paras:[
                    "key [必须参数] : String, 节点的键值",
                    "atrr [必须参数] : Object, 属性键值对",
                    "reset [可选参数] : Boolean, 是否要同时设置其他属性(用默认值). 默认是[true]",
                    "notify [可选参数] : Boolean, 是否要通知控件的其他节点属性的变化. 默认是[true]"
                ]
            },
            getHAlign :{
                $desc:"获取标签水平对齐方式",
                $rtn:"String"
            },
            setHAlign :{
                $desc:"设置标签水平对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left','25%','center','75%','right','outterleft','outterright'",
                    $force
                ]
            },
            getVAlign :{
                $desc:"获取标签垂直对齐方式",
                $rtn:"String"
            },
            setVAlign :{
                $desc:"设置标签垂直对齐方式",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'top','25%','middle','75%','bottom','outtertop','outterbottom'",
                    $force
                ]
            },
            onClick:{
                $desc:"当单击控件时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            },
            onTextClick:{
                $desc:"当单击控件文字时调用",
                $paras:[
                    $profile,
                    "e : Event, DOM事件元素",
                    "src: String, 事件所属DOM元素的xid"
                ]
            }
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","rectComb"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.rectComb 类",
        constructor:{
            $desc:"生成一个xui.svg.rectComb对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","circleComb"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.circleComb 类",
        constructor:{
            $desc:"生成一个xui.svg.circleComb对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","ellipseComb"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.ellipseComb 类",
        constructor:{
            $desc:"生成一个xui.svg.ellipseComb对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","pathComb"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.pathComb 类",
        constructor:{
            $desc:"生成一个xui.svg.pathComb对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","imageComb"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.imageComb 类",
        constructor:{
            $desc:"生成一个xui.svg.imageComb对象"
        },
        prototype:{
        }
    });

    xui.set(xui.Locale,["cn","doc","xui","svg","connector"], {
        KEY:{$desc:"本类名"},
        $desc:"xui.svg.connector 类",
        constructor:{
            $desc:"生成一个xui.svg.connector对象"
        },
        prototype:{
            getBgLine:{
                $desc:"得到是否隐藏背景线",
                $rtn:"Boolean"
            },
            setBgLine:{
                $desc:"设置是否隐藏背景线",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : Boolean",
                    $force
                ]
            },
            getType:{
                $desc:"得到链接器的类型",
                $rtn:"String"
            },
            setType:{
                $desc:"设置链接器的类型（只有在控件渲染前有效）",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'straight','bezier','flowchart', 默认为 'straight'",
                    $force
                ]
            },
            getFromObj:{
                $desc:"得到链接器的'链接自'对象名",
                $rtn:"String"
            },
            setFromObj:{
                $desc:"设置连接器的'链接自'对象名",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 与链接器在同一画布上的对象别名",
                    $force
                ]
            },
            getFromPoint:{
                $desc:"得到链接器的'链接自'位置",
                $rtn:"String"
            },
            setFromPoint:{
                $desc:"设置连接器的'链接自'位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left','top','right','bottom'之一",
                    $force
                ]
            },
            getToObj:{
                $desc:"得到链接器的'链接至'对象名",
                $rtn:"String"
            },
            setToObj:{
                $desc:"设置连接器的'链接至'对象名",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 与链接器在同一画布上的对象别名",
                    $force
                ]
            },
            getToPoint:{
                $desc:"得到链接器的'链接至'位置",
                $rtn:"String"
            },
            setToPoint:{
                $desc:"设置连接器的'链接至'位置",
                $rtn:"[self]",
                $paras:[
                    "value [必需参数] : String, 'left','top','right','bottom'之一",
                    $force
                ]
            },
            getAttr:{
                $desc:"获得控件中某节点的属性",
                $rtn:"Object",
                $paras:[
                    "key [必须参数] : 节点的键值"
                ]
            },
            setAttr:{
                $desc:"设置控件中某节点的属性",
                $rtn:"[self]",
                $paras:[
                    "key [必须参数] : String, 节点的键值",
                    "atrr [必须参数] : Object, 属性键值对",
                    "reset [可选参数] : Boolean, 是否要同时设置其他属性(用默认值). 默认是[true]",
                    "notify [可选参数] : Boolean, 是否要通知控件的其他节点属性的变化. 默认是[true]"
                ]
            }
        }
    });
})();

(function(){
xui.set(xui.Locale,["cn","doc","propname"], {
        'xui_absObj' : {
            'tag':'附加值',
            'tagVar':'附加对象',
            'dataBinder':'数据绑定器',
            'dataField':'数据绑定键',
            "propBinder":"属性绑定",
            'name':'字段名字',
            'desc':'组件描述'
        },
       'xui_absContainer' : {
            sandboxTheme:'沙箱主题',
            dragKey:'拖拽标识',
            dropKeys:'丢下标识',
            panelBgClr:'容器背景色',
            panelBgImg:'容器背景图像',
            panelBgImgPos:'背景图像偏移',
            panelBgImgRepeat:'背景图像重复',
            panelBgImgAttachment:'背景图像附着',
            conDockPadding:'容器停靠边距',
            conDockSpacing:'子控件停靠间隔',
            conDockFlexFill:'子控件停靠柔性',
            conDockStretch:'子控件停靠延展',
            conDockRelative:'子控件相对停靠',
            formMethod:'表单提交方法',
            formTarget:'表单提交目标',
            formAction:'表单提交动作',
            formEnctype:'表单提交加密类型'
        },
        'xui_absList' : {
            'listKey':'列表键',
            'items':'项目列表',
            'valueSeparator':'值分隔符'
        },
        'xui_absValue' : {
            'readonly':'控件只读',
            'required':'必须填写',
            'value':'控件值',
            'dirtyMark':'控件脏功能',
            'showDirtyMark':'显示脏标识'
        },
        xui_Timer:{
            interval:"定时间隔(ms)"
        },
        'xui_DataBinder' : {
            'name':'绑定器唯一名',
            'data':'绑定的数据'
        },
        'xui_APICaller' : {
            'queryURL':'远程服务地址',
            'queryUserName':'服务登陆账号',
            'queryPassword':'服务登陆密码',
            'queryModel':'服务模板名称',
            'queryMethod':'请求服务方式',
            'queryAsync':'异步请求方式',
            'requestType':'数据请求类型',
            'responseType':'数据响应类型',
            'queryArgs':'数据请求参数',
            'oAuth2Token':'身份验证令牌',
            'queryHeader':"头信息",
            'fakeCookies':"仿Cookies",
            'queryOptions':'自定义调用选项',
            'proxyType':'代理类型',
            'name':'绑定器唯一名',
            "proxyInvoker":"调用触发",
            "avoidCache":"避免缓存",
            'requestDataSource':"请求数据源",
            'responseDataTarget':"数据响应目标",
            'responseCallback':"数据回调函数",
            "requestId":"数据请求ID"
        },
        'xui_UI_CSSBox':{
             "sandbox":"适用沙箱",
             "normalStatus":"正常状态",
             "hoverStatus":"悬停状态",
             "activeStatus":"激活状态",
             "focusStatus":"焦点状态"
        },
        'xui_UI' : {
            'spaceUnit':'空间单位',
            'autoTips':'自动工具提示',
            'className':'CSS类名',
            'disableClickEffect':'禁用点击效果',
            'disableHoverEffect':'禁用悬停效果',
            'disableTips':'禁用工具提示',
            'disabled':'禁用控件',
            'defaultFocus':'自动获得焦点',
            locked:'控件锁定',
            hoverPop:"悬停弹出对象",
            hoverPopType:"悬停弹出类型",
            'dock':'停靠类型',
            'dockStretch':'停靠延展',
            'dockIgnoreFlexFill':'停靠柔性填充忽略',
            'dockIgnore':'停靠忽略',
            'dockOrder':'停靠顺序',
            'dockMargin':'停靠外补丁',
            'dockFloat':'停靠漂浮',
            'dockMinW':'停靠最小宽度',
            'dockMaxW':'停靠最大宽度',
            'dockMinH':'停靠最小高度',
            'dockMaxH':'停靠最大高度',
             rotate:"旋转角度",
             showEffects:"出现动画特效",
             hideEffects:"消失动画特效",
            'tips':'工具提示文本',
            'left':'左边沿坐标',
            'top':'上边沿坐标',
            'width':'控件宽度',
            'height':'控件高度',
            'right':'右边沿坐标',
            'bottom':'下边沿坐标',
            'renderer':'内部渲染函数',
            'zIndex':'层堆叠顺序',
            'tabindex':'TAB 键顺序值',
            'position':'控件定位类型',
            'visibility':'控件可见属性',
            'display':'渲染盒类型',
            'selectable':'文字可选择',
            "activeAnim":"当前动画"
        },
        'xui_UI_Widget' : {
            'border':'附加边框',
            'shadow':'附加阴影',
            'resizer':'大小调整器',
            'resizerProp':'大小调整器属性'
        },
        'xui_UI_Block' : {
            'iframeAutoLoad':'IFrame自动加载地址',
            'ajaxAutoLoad':'Ajax自动加载地址',
            'html':'内部HTML文本',
            'overflow':'容器溢出',
            'borderType':'边框类型',
            'background':'容器背景',
            sideBarType:'侧栏类型',
            sideBarSize:'侧栏大小',
            sideBarStatus:'侧栏状态',
            sideBarCaption:'侧栏标题'
        },
        'xui_UI_Label' : {
            'caption':'标题文字',
            'image':'图像路径',
            'imagePos':'图像背景偏移',
            'imageClass':'图像CSS类',
            'iconFontCode':'图像字体码',
            'hAlign':'水平对齐方式',
            'fontColor':'字体颜色',
            'fontSize':'字体大小',
            'fontWeight':'字体粗细'
        },
        'xui_UI_ProgressBar' : {
            'captionTpl':'标题模板',
            'fillBG':'进度条颜色',
            'type':'类型'
        },
        'xui_UI_Button' : {
            'caption':'标题文字',
            'image':'图像路径',
            'imageClass':'图像CSS类',
            'iconFontCode':'图像字体码',
            'imagePos':'图像背景偏移',
            'hAlign':'水平对齐方式',
            'vAlign':'垂直对齐方式',
            'type':'按钮类型'
        },
        'xui_UI_Input' : {
            'tipsErr':'无效提示文本',
            'tipsOK':'有效提示文本',
            'dynCheck':'动态校验',
            'selectOnFocus':'自动选择文本',
            'placeholder':'空白提示文字',
            'labelSize':'标签大小',
            'labelPos':'标签位置',
            'labelCaption':'标签文字',
            'labelGap':'标签距离',
            'labelHAlign':'标签水平对齐',
            'valueFormat':'值输入格式',
            'mask':'值输入伪码',
            'hAlign':'水平对齐',
            'type':'组合框类型',
            'maxlength':'最大长度',
            'multiLines':'多行输入',
            'tipsBinder':'工具提示绑定'
        },
        'xui_UI_ComboInput' : {
            'value':'控件值',
            'cachePopWnd':'缓存弹出窗口',
            'dateEditorTpl':'日期编辑模板',
            'precision':'数字精度',
            'groupingSeparator':'千位分隔符',
            'decimalSeparator':'小数分隔符',
            'forceFillZero':'用0填充精度',
            'popCtrlProp':'弹出窗口属性',
            'popCtrlEvents':'弹出窗口事件',
            'numberTpl':'数字显示模板',
            'currencyTpl':'货币显示模板',
            'listKey':'列表键',
            'dropListWidth':'弹出窗口宽',
            'dropListHeight':'弹出窗口高',
            'items':'下拉框项目',
            'image':'图像路径',
            'imagePos':'图像背景偏移',
            'imageClass':'图像CSS类',
            'iconFontCode':'图像字体码',
            'increment':'增量值',
            'min':'最小值',
            'max':'最大值',
            'commandBtn':'命令按钮',
            'inputReadonly':'输入框只读',
            'caption':'文本显示',
             'parentId':'弹出到容器',
             unit:'单位',
             unit:'单位选项',
             trimTailZero:'清除右侧零'
        },
        'xui_UI_PopMenu' : {
            'hideAfterClick':'点击后隐藏',
            'autoHide':'自动隐藏',
             'parentId':'弹出到容器',
              noIcon:'无图标'
        },
        'xui_UI_Dialog' : {
            'initPos':'窗口起始位置',
            'iframeAutoLoad':'IFrame自动加载',
            'ajaxAutoLoad':'Ajax自动加载',
            'html':'内部HTML文本',
            'overflow':'容器溢出',
            'caption':'对话框标题',
            'image':'图像路径',
            'imagePos':'图像背景偏移',
            'imageClass':'图像CSS类',
            'iconFontCode':'图像字体码',
            'movable':'对话框可拖动',
            'minBtn':'显示最小按钮',
            'restoreBtn':'显示恢复按钮',
            'maxBtn':'显示最大按钮',
            'infoBtn':'显示帮助按钮',
            'optBtn':'显示选项按钮',
            'closeBtn':'显示关闭按钮',
            'refreshBtn':'显示刷新按钮',
            'pinBtn':'显示钉针按钮',
            'landBtn':'显示降落按钮',
            'minWidth':'最小宽度限制',
            'minHeight':'最小高度限制',
            'fromRegion':'对话框弹出源',
            'modal':'模式对话框',
            'status':'对话框状态',
            'hAlign':'标题位置'
        },
        'xui_UI_Link' : {
            'caption':'超链接文本',
            'href':'超链接锚点',
            'target':'目标窗口'
        },
        'xui_UI_CheckBox' : {
            'iconPos':'图标位置',
            'image':'图像路径',
            'imagePos':'图像背景偏移',
            'imageClass':'图像CSS类',
            'iconFontCode':'图像字体码',
            'caption':'按钮标题文字'
        },
        'xui_UI_Element' : {
            'nodeName':'元素节点名',
            'html':'内部HTML文本',
            'attributes':'元素属性'
        },
        'xui_UI_Span' : {
            'html':'内部HTML文本',
            'overflow':'容器溢出'
        },
        'xui_UI_Div' : {
            'iframeAutoLoad':'IFrame自动加载',
            'ajaxAutoLoad':'Ajax自动加载',
            'html':'内部HTML文本',
            'overflow':'容器溢出'
        },
        'xui_UI_Tag' : {
            'tagKey':' TAG关键字'
        },
        'xui_UI_SVGPaper' : {
            'scaleChildren':'自动缩放子控件',
            'graphicZIndex':'图像层级'
        },
        'xui_UI_Group' : {
            'caption':'标题',
            'hAlign':'水平对齐方式',
            'toggleBtn':'展开收缩按钮',
            'toggle':'控件展开',
            'image':'图像路径',
            'imagePos':'图像背景偏移',
            'imageClass':'图像CSS类',
            'iconFontCode':'图像字体码'
        },
        'xui_UI_Panel' : {
            'caption':'标题文字',
            'image':'图像路径',
            'imagePos':'图像背景偏移',
            'imageClass':'图像CSS类',
            'iconFontCode':'图像字体码',
            'toggleBtn':'展开收缩按钮',
            'toggle':'控件展开',
            'infoBtn':'显示帮助按钮',
            'optBtn':'显示选项按钮',
            'closeBtn':'显示关闭按钮',
            'refreshBtn':'显示刷新按钮',
            'popBtn':'显示弹出按钮',
            'borderType':'边框类型',
            noFrame:"隐藏外框"
        },
        'xui_UI_Image' : {
            'maxWidth':'图像最大宽度',
            'maxHeight':'图像最大高度',
            'src':'图像文件路径',
            'alt':'图像替代文字',
            "items":"图像字典",
            "activeItem":"当前图像",
            'cursor':'鼠标样式'
        },
        'xui_UI_Flash' : {
            'cover':'覆盖层',
            'src':'Flash文件路径',
            'parameters':'Flash参数集',
            'flashvars':'Flash变量集'
        },
        'xui_UI_Audio' : {
            'src':'媒体路径',
            "controls":"显示控制",
            "preload":"预加载",
            "loop":"循环播放",
            "muted":"静音",
            "autoplay":"自动播放",
            "volume":"音量"
        },
        'xui_UI_Video' : {
            "poster":"底图"
        },
        'xui_UI_Slider' : {
            'steps':'步长',
            'type':'类型',
            'isRange':'双滑块',
            'showIncreaseHandle':'显示增加按钮',
            'showDecreaseHandle':'显示减小按钮',
            'labelSize':'标签大小',
            'labelPos':'标签位置',
            'labelCaption':'标签文字',
            'labelGap':'标签距离',
            'labelHAlign':'标签水平对齐'
        },
        'xui_UI_RichEditor' : {
            'frameTemplate':'编辑器HTML模板',
            'frameStyle':'编辑器CSS样式',
            'cmdList':'命令按钮列表',
            'cmdFilter':'命令按钮过滤',
            'labelSize':'标签大小',
            'labelPos':'标签位置',
            'labelCaption':'标签文字',
            'labelGap':'标签距离',
            'labelHAlign':'标签水平对齐'
        },
        'xui_UI_ColorPicker' : {
            'barDisplay':'标题栏',
            'closeBtn':'关闭按钮',
            'advance':'高级模式'
        },
        'xui_UI_DatePicker' : {
            'timeInput':'时间输入功能',
            'closeBtn':'关闭按钮',
            'firstDayOfWeek':'周开始日',
            'offDays':'休假信息',
            'hideWeekLabels':'隐藏周信息',
            'dateInputFormat':'日期输入格式'
        },
        'xui_UI_TimePicker' : {
            'closeBtn':'关闭按钮'
        },
        'xui_UI_List' : {
            'selMode':'点选模式',
            'borderType':'边框类型',
            'noCtrlKey':'Ctrl辅助多选',
            'maxHeight':'最大高度',
            'itemRow':'单项独占行',
            'tagCmds':"命令按钮集",
            'optBtn':'显示选项按钮',
            'labelSize':'标签大小',
            'labelPos':'标签位置',
            'labelCaption':'标签文字',
            'labelGap':'标签距离',
            'labelHAlign':'标签水平对齐'
        },
        'xui_UI_Gallery' : {
            'itemMargin':'画廊项外补丁',
            'itemPadding':'画廊项内补丁',
            'itemWidth':'画廊项宽度',
            'itemHeight':'画廊项高度',
            'imgWidth':'画廊图片宽度',
            'imgHeight':'画廊图片高度',
            'autoItemSize':'画廊项自动尺寸'
        },
        'xui_UI_RadioBox' : {
            'checkBox':'多选框样式',
            'labelSize':'标签大小',
            'labelPos':'标签位置',
            'labelCaption':'标签文字',
            'labelGap':'标签距离',
            'labelHAlign':'标签水平对齐'
        },
        'xui_UI_StatusButtons' : {
            'itemMargin':'按钮外补丁',
            'itemWidth':'按钮宽度',
            'itemAlign':'文字对齐方式',
            'itemLinker':'链接样式',
            'labelSize':'标签大小',
            'labelPos':'标签位置',
            'labelCaption':'标签文字',
            'labelGap':'标签距离',
            'labelHAlign':'标签水平对齐'
        },
        'xui_UI_Poll' : {
            'title':'标题内容',
            'cmds':'指令组',
            'noTitle':'无标题',
            'toggle':'展开状态',
            'removeText':'移除右侧文本',
            'editable':'可编辑',
            'newOption':'可新项加入',
            'editorType':'编辑器种类'
        },
        'xui_UI_FoldingList' : {
            'cmds':'指令组',
            'activeLast':'自动展开末项'
        },
        'xui_UI_PageBar' : {
            'caption':'标题文字',
            'uriTpl':'链接模板',
            'textTpl':'标签模板',
            'prevMark':'前一页标识',
            'nextMark':'后一页标识'
        },
        'xui_UI_Tabs' : {
            'lazyAppend':'延迟加载',
            'noPanel':'无容器面板',
            'overflow':'容器溢出',
            'itemWidth':'固定按钮宽度',
            'itemAlign':'文字对齐方式',
            'HAlign':'按钮排列方式',
            'dropKeysPanel':'容器丢下标识',
            'selMode':'点选模式',
            'onClickPanel':"点击容器",
            'noHandler':'无控制面版'
        },
        'xui_UI_Stacks' : {
            borderType:' 边框类型'
        },
        'xui_UI_ButtonViews' : {
            'barLocation':'按钮条位置',
            'barHAlign':'按钮水平对齐',
            'barVAlign':'按钮垂直对齐',
            'overflow':'容器溢出',
            'barSize':'按钮条大小',
            sideBarSize:'侧栏大小',
            sideBarStatus:'侧栏状态'
        },
        'xui_UI_FoldingTabs' : {
            overflow:'容器溢出'
        },
        'xui_UI_TreeBar' : {
            'iniFold':'默认收缩子行',
            'animCollapse':'收展动画',
            'group':'分组模式',
            'selMode':'点选模式',
            'noCtrlKey':'无Ctrl辅助多选',
            'singleOpen':'单节点打开',
            'dynDestory':'动态销毁子行',
            'tagCmds':"命令按钮集",
            'optBtn':'显示选项按钮',
            'togglePlaceholder':'切换按钮占位',
             'tagCmdsAlign':'附带命令对齐'
        },
        'xui_UI_TreeView' : {
            noIcon:"隐藏图像"
        },
        'xui_UI_MenuBar' : {
            'parentID':'弹出到容器',
            'autoShowTime':'自动弹出时间',
            'handler':'是否有手柄'
        },
        'xui_UI_ToolBar' : {
            'handler':'是否有手柄',
            'hAlign':'水平对齐方式'
        },
        'xui_UI_Layout' : {
            'type':'布局类型',
            'overflow':'容器溢出'
        },
        'xui_UI_TreeGrid' : {
            activeRow:"活动行",
            activeCell:"活动单元格",
            freezedColumn:"冻结列",
            freezedRow:"冻结行",
            'rowMap':"活动行键值对",
            'directInput':'直接编辑状态',
            'currencyTpl':'货币显示模板',
            'numberTpl':'数字显示模板',
            'valueSeparator':'值分隔符',
            'selMode':'表格点选模式',
            'altRowsBg':'背景色区分行',
            'rowNumbered':'显示行号',
            "editMode":"编辑模式",
            'editable':'可编辑',
            'firstCellEditable':'首列可编辑',
            'iniFold':'默认收缩子行',
            'animCollapse':'收展动画',
            'gridHandlerCaption':'表格手柄标题',
            'showHeader':'是否显示表头',
            'headerHeight':'表头高度',
            'rowHeight':'行高度',
            'rowHandler':'行头手柄',
            'rowHandlerWidth':'行头手柄宽',
            'rowResizer':'可拖动改变行高',
            'colHidable':'可隐藏列',
            'colResizer':'拖动改变列宽',
            'colSortable':'可排序列',
            'colMovable':'可移动列',
            'grpCols':'表头分组对象',
            'header':'表格头数据',
            'rows':'表格行数据',
            'rawData':'表格键值对数据',
            'tagCmds':"命令按钮集",
            'tagCmdsAlign':"按钮集对齐",
            'activeMode':'焦点活动模式',
            'rowOptions':'行自定义参数',
            'colOptions':'列自定义参数',
            'treeMode':'树状模式',
            'hotRowMode':'热行模式',
            'hotRowNumber':'热行行号',
            'noCtrlKey':'无Ctrl辅助多选'
        },
        'xui_UI_TagEditor' : {
            'borderType':'边框类型',
            'valueSeparator':'值分隔符',
            'padding':'内边框距离',
            'valueFormat':'有效输入模式',
            'required':'必须输入',
            'tagCount':'标签数量',
            'tagMaxlength':'最大字符数',
            'tagInputWidth':'输入框宽度',
            'tagInputHeight':'输入框高度',
            'tagSpacing':'输入框间距'
        },
        'xui_UI_Range' : {
            'min':'最小值',
            'max':'最大值',
            'unit':'单位',
            'steps':'步长',
            'captionTpl':'文本模板',
            'singleValue':'单滑块'
        },
        'xui_svg' : {
            'svgTag':'SVG附加值',
            'attr':'节点属性',
            'shadow':'控件阴影'
        },
        'xui_svg_absComb' : {
            'hAlign':'水平对齐方式',
            'vAlign':'垂直对齐方式'
        },
        'xui_svg_circle' : {

        },
        'xui_svg_ellipse' : {

        },
        'xui_svg_rect' : {

        },
        'xui_svg_image' : {

        },
        'xui_svg_text' : {

        },
        'xui_svg_path' : {

        },
        'xui_svg_rectComb' : {

        },
        'xui_svg_circleComb' : {

        },
        'xui_svg_ellipseComb' : {

        },
        'xui_svg_pathComb' : {

        },
        'xui_svg_imageComb' : {

        },
        'xui_svg_connector' : {
            'bgLine':'隐藏背景线',
            'type':'链接器类型',
            'fromObj':'连接自对象',
            'fromPoint':'连接自位置',
            'toObj':'连接到对象',
            'toPoint':'连接到位置'
        },
        'xui_UI_FusionChartsXT' : {
            'chartType':'图表类型',
            'JSONData':'JSON数据',
            'XMLUrl':'xml数据源',
            'XMLData':'xml数据',
            'JSONUrl':'JSON数据源',
            plotData:"图块数据",
            feedData:"实时数据"
        }
});
xui.set(xui.Locale,["cn","doc","eventname"],{
        'xui_Module':{
            beforeCreated:"部件生成前",
            onLoadBaseClass:"加载基础类",
            onLoadBaseClassErr:"加载基础类出错",
            onLoadRequiredClass:"加载必须类",
            onLoadRequiredClassErr:"加载必须类出错",
            onIniResource:"初始化资源",
            beforeIniComponents:"初始化控件前",
            afterIniComponents:"初始化控件后",
            onReady:"模块准备就绪",
            onModulePropChange:"模块属性改变",
            onRender:"部件渲染完成",
            onDestroy:"部件销毁",
            onFragmentChanged:"当地址片段改变",
            onMessage:"当收到消息"
        },
        'xui_absObj' : {
        },
       'xui_absContainer' : {
            onHotKeydown:"热键下按",
            onHotKeypress:"热键按下",
            onHotKeyup:"热键抬起",
            beforeNextFocus:"焦点离开前",
            beforeClickEffect:"显示点击效果",
            beforeHoverEffect:"显示悬停效果",
            onGetDragData:"得到拖拽数据",
            onStartDrag:"开始拖拽",
            onDragEnter:"拖拽鼠标进入",
            onDragLeave:"拖拽鼠标离开",
            onDropTest:"进行丢下测试",
            onDropMarkShow:"显示丢下标识",
            onDropMarkClear:"清除丢下标识",
            beforeDrop:"丢下之前",
            onDrop:"丢下",
            afterDrop:"丢下之后",
            onDragStop:"拖拽停止",
            beforeInputAlert:"输入验证提示前",
            beforeFormReset:"表单重置前",
            afterFormReset:"表单重置后",
            beforeFormSubmit:"表单提交前",
            afterFormSubmit:"表单提交后"
        },
        'xui_absList' : {
            beforeIniEditor:"初始化编辑器前",
            onBeginEdit:"开始编辑",
            beforeEditApply:"编辑生效前",
            onEndEdit:"结束编辑"
        },
        'xui_absValue' : {
            beforeDirtyMark:"显示脏标识",
            beforeUIValueSet:"界面值设置前",
            beforeValueSet:"控件值设置前",
            onChange:"界面值改变",
            afterUIValueSet:"界面值设置后",
            afterValueSet:"控件值设置后",
            onValueChange:"内部值改变"
        },
        xui_Timer:{
            onTime:"当定期触发",
            onStart:"当定时开始",
            onSuspend:"当定时挂起",
            onEnd:"当定时结束"
        },
        'xui_DataBinder' : {
            beforeUpdateDataToUI:"将数据更新到绑定控件",
            afterUpdateDataFromUI:"从绑定控件获得数据",
            beforeInputAlert:"在输入验证提示前"
         },
        'xui_APICaller' : {
            beforeData:"获得数据之前",
            onData:"数据获得成功",
            onError:"数据获得失败",
            beforeInvoke:"远程调用之前",
            afterInvoke:"远程调用之后"
         },
        'xui_UI' : {
            beforeAppend:"界面加载前",
            afterAppend:"界面加载后",
            beforeRender:"部件渲染前",
            onRender:"部件渲染完成",
            beforeRemove:"界面移除前",
            afterRemove:"界面移除后",
            beforeDestroy:"控件销毁前",
            onDestroy:"控件销毁",
            afterDestroy:"控件销毁后",
            beforePropertyChanged:"属性改变前",
            afterPropertyChanged:"属性改变后",
            onContextmenu:"上下文菜单触发",
            onDock:"控件停靠",
            onLayout:"界面布局",
            onMove:"位置移动",
            onResize:"尺寸改变",
            onShowTips:"显示工具提示"
        },
        'xui_UI_Button' : {
            onClick:"点击按钮",
            onChecked:"改变选中状态",
            onClickDrop:"点击下拉按钮"
        },
        'xui_UI_Input' : {
            beforeFormatCheck:"格式检查前",
            beforeFormatMark:"显示格式标识前",
            beforeKeypress:"键盘按下前",
            onBlur:"失去焦点",
            onCancel:"输入取消",
            onFocus:"得到焦点",
            onLabelActive:"激活标签",
            onLabelClick:"点击标签",
            onLabelDblClick:"双击标签"
        },
        'xui_UI_ComboInput' : {
            beforeComboPop:"构造弹出窗口前",
            beforePopShow:"显示弹出窗口前",
            afterPopShow:"显示弹出窗口后",
            afterPopHide:"隐去弹出窗口后",
            onClick:"点击输入框",
            onCommand:"点击命令按钮",
            onFileDlgOpen:"打开文件选择框"
        },
        'xui_UI_PopMenu' : {
            beforeHide:"隐藏菜单前",
            onHide:"隐藏菜单",
            onMenuSelected:"选择菜单项",
            onShowSubMenu:"显示子菜单"
        },
        'xui_UI_Dialog' : {
            beforeClose:"窗口关闭前",
            onActivated:"被激活",
            beforePin:"订针状态改变前",
            beforeStatusChanged:"窗口状态改变前",
            afterStatusChanged:"窗口状态改变后",
            onLand:"点击降落按钮",
            onRefresh:"点击刷新按钮",
            onShow:"窗口显示",
            onShowInfo:"点击信息按钮",
            'onClickPanel':"点击容器",
            onShowOptions:"点击选项按钮"
        },
        'xui_UI_Link' : {
            onClick:"鼠标点击"
        },
        'xui_UI_Label' : {
            onClick:"鼠标点击"
        },
        'xui_UI_SButton' : {
            onClick:"鼠标点击"
        },
        'xui_UI_CheckBox' : {
            onChecked:"改变选中状态"
        },
        'xui_UI_Element' : {
            onClick:"鼠标点击"
        },
        'xui_UI_HTMLButton' : {
            onClick:"鼠标点击"
        },
        'xui_UI_Span' : {
            onClick:"鼠标点击"
        },
        'xui_UI_Div' : {
            onClick:"鼠标点击"
        },
        'xui_UI_Tag' : {
        },
        'xui_UI_Pane' : {
            onClick:"鼠标点击"
        },
        'xui_UI_Block':{
            onClickPanel:"点击容器"
        },
        'xui_UI_SVGPaper' : {
        },
        'xui_UI_Group' : {
            beforeExpand:"展开之前",
            afterExpand:"展开之后",
            beforeFold:"折叠之前",
            afterFold:"折叠之后",
            'onClickPanel':"点击容器",
            onIniPanelView:"初始化容器"
        },
        'xui_UI_Panel' : {
            beforeExpand:"子项展开之前",
            afterExpand:"子项展开之后",
            beforeFold:"子项折叠之前",
            afterFold:"子项折叠之后",
            onIniPanelView:"初始化容器" ,
            beforePop:"窗口弹出前",
            beforeClose:"窗口关闭前",
            onClickBar:"点击标题栏",
            'onClickPanel':"点击容器",
            onRefresh:"点击刷新按钮",
            onShowInfo:"点击信息按钮",
            onShowOptions:"点击选项按钮"
        },
        'xui_UI_Image' : {
            beforeLoad:"图片加载前",
            afterLoad:"图片加载后",
            onClick:"鼠标点击",
            onDblclick:"鼠标双击",
            onError:"图片加载失败"
        },
        'xui_UI_Flash' : {
        },
        'xui_UI_Audio' : {
            onMediaEvent:"媒体事件"
        },
        'xui_UI_Slider' : {
              onLabelActive:"激活标签",
              onLabelClick:"点击标签",
              onLabelDblClick:"双击标签"
        },
        'xui_UI_RichEditor' : {
              onLabelActive:"激活标签",
              onLabelClick:"点击标签",
              onLabelDblClick:"双击标签",
              onReady:"当IFrame准备好",
              onUpdateToolbar:"当工具栏更新触发",
              onInnerEvent:"当内部事件触发"
        },
        'xui_UI_ColorPicker' : {
            beforeClose:"窗口关闭前"
        },
        'xui_UI_DatePicker' : {
            beforeClose:"窗口关闭前"
        },
        'xui_UI_TimePicker' : {
            beforeClose:"窗口关闭前"
        },
        'xui_UI_List' : {
              beforeClick:"鼠标点击前",
              afterClick:"鼠标点击后",
              onClick:"鼠标点击",
              onDblclick:"鼠标双击",
              onShowOptions:"点击选项按钮",
              onItemSelected :"选中条目",
              onCmd:"点击命令按钮",
              onLabelActive:"激活标签",
              onLabelClick:"点击标签",
              onLabelDblClick:"双击标签"
        },
        'xui_UI_Gallery' : {
        },
        'xui_UI_RadioBox' : {
              onLabelActive:"激活标签",
              onLabelClick:"点击标签",
              onLabelDblClick:"双击标签"
        },
        'xui_UI_StatusButtons' : {
              onLabelActive:"激活标签",
              onLabelClick:"点击标签",
              onLabelDblClick:"双击标签"
        },
        'xui_UI_Poll' : {
            beforeOptionAdded:"添加选项前",
            beforeOptionChanged:"更改选项前",
            beforeOptionRemoved:"移除选项前",
            beforeTitleChanged:"更改标签前",
            onCustomEdit:"自定义编辑",
            onGetContent:"尝试获取内容"
        },
        'xui_UI_FoldingList' : {
            onGetContent:"尝试获取子项",
            onShowOptions:"点击选项按钮"
        },
        'xui_UI_PageBar' : {
            onClick:"鼠标点击",
            onPageSet:"页码改变"
        },
        'xui_UI_Tabs' : {
            beforePagePop:"弹出页面前",
            beforePageClose:"关闭页面前",
            afterPageClose:"关闭页面后",
            onCaptionActive:"激活页面标签",
            onIniPanelView:"初始化页面容器" ,
            onItemSelected :"选中页面",
            onShowOptions:"点击选项按钮"
        },
        'xui_UI_Stacks' : {
        },
        'xui_UI_ButtonViews' : {
        },
        'xui_UI_FoldingTabs' : {
        },
        'xui_UI_TreeBar' : {
            beforeClick:"鼠标点击前",
            beforeExpand:"子项展开前",
            beforeFold:"子项折叠前",
            onClick:"鼠标点击",
            onDblclick:"鼠标双击",
            onCmd:"点击命令按钮",
            onGetContent:"尝试获取子项",
            onItemSelected:"选中条目",
            onShowOptions:"点击选项按钮",
            afterClick:"鼠标点击后",
            afterExpand:"子项展开后",
            afterFold:"子项折叠后"
        },
        'xui_UI_TreeView' : {
        },
        'xui_UI_MenuBar' : {
            beforePopMenu:"菜单弹出前",
            onGetPopMenu:"得到弹出菜单",
            onMenuBtnClick:"点击菜单项",
            onMenuSelected:"选中菜单项",
            onShowSubMenu:"显示子菜单"
        },
        'xui_UI_ToolBar' : {
            onClick:"鼠标点击按钮"
        },
        'xui_UI_Layout' : {
            'onClickPanel':"点击容器"
        },
        'xui_UI_TreeGrid' : {
            beforeCellActive:"单元格激活前",
            beforeCellKeydown:"单元格键盘按下前",
            beforeCellUpdated:"单元格改变前",
            afterCellActive:"单元格激活后",
            afterCellFocused:"单元格焦点后",
            afterCellUpdated:"单元格改变后",
            onClickCell:"鼠标点击单元格",
            onDblclickCell:"鼠标双击单元格",

            beforeColDrag:"拖拽列前",
            beforeColMoved:"列移动前",
            beforeColResized:"改变宽列后",
            beforeColShowHide:"列隐显前",
            beforeColSorted:"列排序前",
            afterColMoved:"列移动后",
            afterColResized:"改变宽列后",
            afterColShowHide:"列隐显后",
            afterColSorted:"列排序后",
            onClickHeader:"鼠标点击表头",

            beforeHotRowAdded:"热行加入前",
            beforeInitHotRow:"热行初始化前",
            onInitHotRow:"热行初始化",
            afterHotRowAdded:"热行加入前",
            beforeRowActive:"行激活前",
            afterRowActive:"行激活后",
            beforeRowResized:"行高改变前",
            afterRowResized:"行高改变后",
            onRowDirtied:"行内容改变",
            onRowHover:"行鼠标悬停",
            onRowSelected:"行选择",
            onClickRow:"鼠标点击行",
            onDblclickRow:"鼠标双击行",
            onClickRowHandler:"点击行手柄",
            onCmd:"点击命令按钮",

            onClickGridHandler:"点击表格手柄",
            onBodyLayout:"布局表格体",
            onGetContent:"尝试得到子行",

            beforeIniEditor:"初始化编辑器前",
            onBeginEdit:"开始编辑",
            beforeEditApply:'编辑生效前',
            onEndEdit:"结束编辑",
            onEditorClick:"当点击编辑框",
            onCommand:"点击命令按钮",
            beforeComboPop:"构造弹出窗口前",
            beforePopShow:"显示弹出窗口前",
            afterPopShow:"显示弹出窗口后"
        },
        'xui_UI_TagEditor' : {
        },
        'xui_UI_Range' : {
        },
        'xui_svg' : {
            onClick:"鼠标点击",
            onContextmenu:"上下文菜单触发",
            onDblClick:"鼠标双击"
        },
        'xui_svg_absComb' : {
            onClick:"鼠标点击形状",
            onTextClick:"鼠标点击文本"
        },
        'xui_svg_circle' : {
        },
        'xui_svg_ellipse' : {
        },
        'xui_svg_rect' : {
        },
        'xui_svg_image' : {
        },
        'xui_svg_text' : {
        },
        'xui_svg_path' : {
        },
        'xui_svg_rectComb' : {
        },
        'xui_svg_circleComb' : {
        },
        'xui_svg_ellipseComb' : {
        },
        'xui_svg_pathComb' : {
        },
        'xui_svg_imageComb' : {
        },
        'xui_svg_connector' : {
        },
        'xui_UI_FusionChartsXT' : {
            onDataClick:"点击数据图块",
            onLabelClick:"点击X轴标签",
            onAnnotationClick:'点击注释',
            onFusionChartsEvent:"FC事件触发"
        }
    });
})();
