Class("xui.Coder", null,{
    Initialize:function(){
        xui.CSS.addStyleSheet(
            '.sh {font-family: "Courier New" , Courier, mono;font-size: 12px;border: 1px solid #92D1E4;background:#fff;}'+
            '.sh .sh-con{padding-bottom:3px;background-color: #fff;}'+
            '.sh .sh-cmd{padding: 3px 8px 3px 8px;font: 9px Verdana, Geneva, Arial, Helvetica, sans-serif;color: silver;border-bottom: 1px solid #EBEADB;}'+
            '.sh .sh-cmd a{font-size: 12px;color: blue;text-decoration: none;margin-right: 10px;}'+
            '.sh .sh-cmd a:hover{color: red;}'+
            '.sh .cmd-ruler{width:25px;}'+
            '.sh .sh-toggle{width:16px;cursor:pointer;font-size:14px;color:blue;vertical-align:baseline;}'+
            '.sh ol{color: #FF97A9; margin: 0px 0px 0px 45px; padding: 0; border-bottom: 1px solid #EBEADB; }'+
            '.sh ol li{color: #000157;border-left: 3px solid #6CE26C;padding-left: 10px;line-height: 14px;list-style: decimal none;margin:0;/*border-bottom: 1px dashed #E2E2E2;*/}'+
            '.sh-con span{vertical-align:inherit;'+(xui.browser.ie?'zoom:0;':'')+'}'+
            '.sh .js .comment, .sh .php .comment{ color: green; }'+
            '.sh .js .string, .sh .php .string{ color: #ff1493; }'+
            '.sh .js .reg, .sh .php .reg{ color: #ff1493; }'+
            '.sh .js .number,.sh .php .number { color: darkred; }'+
            '.sh .js .keyword, .sh .php .keyword{ color: blue; }'+
            '.sh .js .keyword2, .sh .php .keyword2 { font-weight: bold; color: red; }'+
            '.sh .js .special, .sh .php .special{ font-weight: bold; color: navy; }'+
            '.sh .php .vars{color:#079BFA}'+
            '.sh .css .comment { color: green; }'+
            '.sh .css .string { color: red; }'+
            '.sh .css .colors { color: darkred; }'+
            '.sh .css .vars { color: #d00; }'+
            '.sh .css .number { color: blue; }'+
            '.sh .css .keyword {color:teal;}'+
            '.sh .css .selector {font-weight: bold; color: navy;}'+
            '.sh .html .comment { color: green; }'+
            '.sh .html .string{ color: #ff1493; }'+
            '.sh .html .script{ color: #ff1493; }'+
            '.sh .html .attr { color: blue; }'+
            '.sh .html .speical{color:#079BFA}'+
            '.sh .html .tag { font-weight: bold; color: navy; }'
        ,this.KEY);

        this._profiles={
            'js':{
                multicomment: this.$COM_REG.BLOCK_COMMENT,
                comment: this.$COM_REG.LINE_COMMENT,
                reg: this.$COM_REG.REG,
                string1: this.$COM_REG.DQ_STRING,
                string2: this.$COM_REG.SQ_STRING,
                number: this.$COM_REG.NUMBER,
                keyword: "try|throw|catch|finally|arguments|break|case|continue|default|delete|do|else|false|" +
                         "for|function|if|in|instanceof|new|null|return|switch|this|true|typeof|var|void|while|with|" +
                         "toString|valueOf|window|prototype|document|" +
                         "escape|unescape|parseInt|parseFloat|setTimeout|clearTimeout|setInterval|clearInterval|" +
                         "NaN|isNaN|Infinity|Error",
                keyword2: 'exists|isNull|isObj|isEmpty|isArr|isBool|isDate|isFun|isHash|isNumb|isStr|_.arr|_.bool|_.cls|_.date|_.fun|_.hash|_.numb|_.str|_.id|_|'+
                         'alias|host|append|toArr|breakO|tryF|each|copy|clone|filter|asyRun|resetRun|merge|each|swap|removeFrom|filter|indexOf|clean|insertAny|serialize|unserialize|'+
                         'Class|Instance|Initialize|Before|After|Static|Constructor|'+
                         'reBoxing|copy|clone|left|top|right|bottom|startWith|endWith|initial|trim|ltrim|rtrim|blen|toDom|create',
                special: /xui[\w\.]*|(\bon|before|after|set|get)[A-Z]\w*/
            },
            'css':{
                multicomment:this.$COM_REG.BLOCK_COMMENT,
                string: [this.$COM_REG.DQ_STRING, this.$COM_REG.SQ_STRING],
                IGNORE: /\([^'")]*\)/,
                keyword: [/@\w[\w.\s]*/, /attr|rect|rgb|url/],
                selector: /[\w-:\[.#][^{};]*\{/,
                colors: /\#[a-zA-Z0-9]{3,6}/,
                number: [/(\d*\.?\d+|\d+\.?\d*)(cm|em|ex|pt|px|%|\:)?/],
                vars :[/(-[\w-]+)\s*[ ]*:/, /([\w-]+)\s*[ ]*:/]
            },
            'php':{
                multicomment:this.$COM_REG.BLOCK_COMMENT,
                comment: this.$COM_REG.LINE_COMMENT,
                reg: this.$COM_REG.REG,
                string: [this.$COM_REG.DQ_STRING, this.$COM_REG.SQ_STRING],
                number: this.$COM_REG.NUMBER,
                keyword: 'abs|acos|acosh|addcslashes|addslashes|' +
                        'array_change_key_case|array_chunk|array_combine|array_count_values|array_diff|'+
                        'array_diff_assoc|array_diff_key|array_diff_uassoc|array_diff_ukey|array_fill|'+
                        'array_filter|array_flip|array_intersect|array_intersect_assoc|array_intersect_key|'+
                        'array_intersect_uassoc|array_intersect_ukey|array_key_exists|array_keys|array_map|'+
                        'array_merge|array_merge_recursive|array_multisort|array_pad|array_pop|array_product|'+
                        'array_push|array_rand|array_reduce|array_reverse|array_search|array_shift|'+
                        'array_slice|array_splice|array_sum|array_udiff|array_udiff_assoc|'+
                        'array_udiff_uassoc|array_uintersect|array_uintersect_assoc|'+
                        'array_uintersect_uassoc|array_unique|array_unshift|array_values|array_walk|'+
                        'array_walk_recursive|atan|atan2|atanh|base64_decode|base64_encode|base_convert|'+
                        'basename|bcadd|bccomp|bcdiv|bcmod|bcmul|bindec|bindtextdomain|bzclose|bzcompress|'+
                        'bzdecompress|bzerrno|bzerror|bzerrstr|bzflush|bzopen|bzread|bzwrite|ceil|chdir|'+
                        'checkdate|checkdnsrr|chgrp|chmod|chop|chown|chr|chroot|chunk_split|class_exists|'+
                        'closedir|closelog|copy|cos|cosh|count|count_chars|date|decbin|dechex|decoct|'+
                        'deg2rad|delete|ebcdic2ascii|echo|empty|end|ereg|ereg_replace|eregi|eregi_replace|error_log|'+
                        'error_reporting|escapeshellarg|escapeshellcmd|eval|exec|exit|exp|explode|extension_loaded|'+
                        'feof|fflush|fgetc|fgetcsv|fgets|fgetss|file_exists|file_get_contents|file_put_contents|'+
                        'fileatime|filectime|filegroup|fileinode|filemtime|fileowner|fileperms|filesize|filetype|'+
                        'floatval|flock|floor|flush|fmod|fnmatch|fopen|fpassthru|fprintf|fputcsv|fputs|fread|fscanf|'+
                        'fseek|fsockopen|fstat|ftell|ftok|getallheaders|getcwd|getdate|getenv|gethostbyaddr|gethostbyname|'+
                        'gethostbynamel|getimagesize|getlastmod|getmxrr|getmygid|getmyinode|getmypid|getmyuid|getopt|'+
                        'getprotobyname|getprotobynumber|getrandmax|getrusage|getservbyname|getservbyport|gettext|'+
                        'gettimeofday|gettype|glob|gmdate|gmmktime|ini_alter|ini_get|ini_get_all|ini_restore|ini_set|'+
                        'interface_exists|intval|ip2long|is_a|is_array|is_bool|is_callable|is_dir|is_double|'+
                        'is_executable|is_file|is_finite|is_float|is_infinite|is_int|is_integer|is_link|is_long|'+
                        'is_nan|is_null|is_numeric|is_object|is_readable|is_real|is_resource|is_scalar|is_soap_fault|'+
                        'is_string|is_subclass_of|is_uploaded_file|is_writable|is_writeable|mkdir|mktime|nl2br|'+
                        'parse_ini_file|parse_str|parse_url|passthru|pathinfo|readlink|realpath|rewind|rewinddir|rmdir|'+
                        'round|str_ireplace|str_pad|str_repeat|str_replace|str_rot13|str_shuffle|str_split|'+
                        'str_word_count|strcasecmp|strchr|strcmp|strcoll|strcspn|strftime|strip_tags|stripcslashes|'+
                        'stripos|stripslashes|stristr|strlen|strnatcasecmp|strnatcmp|strncasecmp|strncmp|strpbrk|'+
                        'strpos|strptime|strrchr|strrev|strripos|strrpos|strspn|strstr|strtok|strtolower|strtotime|'+
                        'strtoupper|strtr|strval|substr|substr_compare',
                keyword2 :'and|or|xor|__FILE__|__LINE__|array|as|break|case|' +
                        'cfunction|class|const|continue|declare|default|die|do|else|' +
                        'elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|' +
                        'extends|for|foreach|function|include|include_once|global|if|' +
                        'new|old_function|return|static|switch|use|require|require_once|' +
                        'var|while|__FUNCTION__|__CLASS__|' +
                        '__METHOD__|abstract|interface|public|implements|extends|private|protected|throw',
                vars  : /\$\w+/
            },
            'html':{
                multicomment: this.$COM_REG.HTML_COMMENT,
                tag:/\x02\/?\w+/,
                attr:/\w+=/,
                script: /(>([^<][^\/]*<+)*\/)(script|style)>/,
                special:/<!DOCTYPE[^>]+>/,
                string: [this.$COM_REG.DQ_STRING, this.$COM_REG.SQ_STRING]
            }
        };
    },
    Static:{
        $COM_REG : {
            HTML_COMMENT: /<!\s*(--([^-]|[\r\n]|-[^-])*--\s*)>/,
            BLOCK_COMMENT : /\/\*[^*]*\*+([^\/][^*]*\*+)*\//,
            LINE_COMMENT : /\/\/[^\n]*/,
            REG : /\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/,
            DQ_STRING : /"(\\.|[^"\\])*"/,
            SQ_STRING : /'(\\.|[^'\\])*'/,
            NUMBER : /-?(\d*\.?\d+|\d+\.?\d*)([eE][+-]?\d+|%)?\b/
        },
        isSafeJSON:function(s){
            return ""===this.replace(s, [
                [this.$COM_REG.BLOCK_COMMENT,''],
                [/\\["\\\/bfnrtu]/,''],
                [this.$COM_REG.LINE_COMMENT,''],
                [this.$COM_REG.DQ_STRING,''],
                [this.$COM_REG.SQ_STRING,''],
                [this.$COM_REG.REG,''],
                [this.$COM_REG.NUMBER,''],
                [/true|false|null|undefined/,''],
                [/[\s\u2028\u2029]/,''],
                [/[^{,]+:/,''],
                [/[\[\]\{\}\,]/,'']
            ]);
        },
      /*
       A wrapper for lots regExp string.replace to only once iterator replace
       You can use it, when
       1.replace >10
       2.need protect some regexp
       3.every long string to replac

       str: will be replace
       reg, array: [string, string] or [regex, string] or [[],[]]
       replace: to replace
       ignore_case: bool, for regexp symble 'i'
       return : replaced string

       For example:
       _.replace("aAa","a","*",true)
                will return "*A*"
       _.replace("aAa","a","*",false)
                will return "***"
       _.replace("aAa","a","*")
       _.replace("aAa",/a/,"*")         : "/a/" is OK, but not "/a/g"
       _.replace("aAa",["a","*"])
       _.replace("aAa",[["a","*"]])
                will return "***"
       _.replace("aAa",[["a","*"],[/A/,"-"]])
                will return "*-*"
      Notice: there is a '$0' symbol here, for protect
        _.replace("aba",[["ab","$0"],["a","*"]])
                will return "ab*"
      here, "ab" will be first matched and be protected to replace by express "a"
      */
        replace:function(str, reg, replace, ignore_case){
            if(!str)return "";

            var i, len,_t, m,n, flag, a1 = [], a2 = [],
                me=arguments.callee,
                reg1=me.reg1 || (me.reg1=/\\./g),
                reg2=me.reg2 || (me.reg2=/\(/g),
                reg3=me.reg3 || (me.reg3=/\$\d/),
                reg4=me.reg4 || (me.reg4=/^\$\d+$/),
                reg5=me.reg5 || (me.reg5=/'/),
                reg6=me.reg6 || (me.reg6=/\\./g),
                reg11=me.reg11 || (me.reg11=/(['"])\1\+(.*)\+\1\1$/)
            ;

            if(!_.isArr(reg)){reg=[reg,replace]}else{ignore_case=replace}
            if(!_.isArr(reg[0])){reg=[reg]};
            _.arr.each(reg,function(o){
                m= typeof o[0]=='string'?o[0]:o[0].source;
                n= o[1]||"";
                len = ((m).replace(reg1, "").match(reg2) || "").length;
                if(typeof n !='function'){
                    if (reg3.test(n)) {
                        //if only one paras and valid
                        if (reg4.test(n)) {
                            _t = parseInt(n.slice(1),10);
                            if(_t<=len)n=_t;
                        }else{
                            flag = reg5.test(n.replace(reg6, "")) ? '"' : "'";
                            i = len;
                            while(i + 1)
                                n = n.split("$" + i).join(flag + "+a[o+"+ i-- +"]+" + flag);

                            n = new Function("a,o", "return" + flag + n.replace(reg11, "$1") + flag);
                        }
                    }
                }
                a1.push(m || "^$");
                a2.push([n, len, typeof n]);
            });


            return str.replace(new RegExp("("+a1.join(")|(")+")", ignore_case ? "gim" : "gm"), function(){
                var i=1,j=0,args=arguments,p,t;
                if (!args[0]) return "";
                while (p = a2[j++]) {
                    if (t = args[i]) {
                        switch(p[2]) {
                            case 'function':
                                //arguments:
                                //1: array, all arguments; 
                                //2: the data position index,  args[i] is $0;
                                //3: the regexp index
                                return p[0](args, i, j-1);
                            case 'number':
                                return args[p[0] + i];
                            default:
                                return p[0];
                        }
                    }else{i += p[1]+1;}
                }
            });
        },
        /*decode code
        str: source code
        key: js/php/css
        */
        formatText:function(code, type, reverse){
            var reg, pre_arr, add_arr, arr=[];
            var deep=0,i,l=20,
                sf=function(i){var r=''; while(i--){r+=' ';} return r;},
                space=[''];

            for(i=1;i<l;i++)
                space.push(sf(i*4));
            code=code.replace(/(\r\n|\r)/g, "\n");
            if(type == 'html'){
                //for clear space before/after tag
                arr.push([/[\s]*(<[\w]+[^>]+>)[\s]*/, '$1']);
                arr.push([/[\s]*(<\/[\w]+>)[\s]*/, '$1']);
                code = this.replace(code, arr);

                arr.length=0;

                arr.push([this.$COM_REG.HTML_COMMENT,'$0\\n']);

                //ignore input and img
                arr.push([/<!\[CDATA\[(([^\]])|(\][^\]])|(\]\][^>]))*\]\]>/, function(a,i){return space[deep]+a[i]+'\n'}]);
                arr.push([/<br\s*>/, function(a,i){return space[deep]+a[i]+'\n'}]);
                arr.push([/<hr\s*>/, function(a,i){return space[deep]+a[i]+'\n'}]);
                arr.push([/<input[^>]+>/, function(a,i){return space[deep]+a[i]+'\n'}]);
                arr.push([/<img[^>]+>/, function(a,i){return space[deep]+a[i]+'\n'}]);
                arr.push([/<[\w]+[^>]*\/>/, function(a,i){return space[deep]+a[i]+'\n'}]);
                //for *
                arr.push([/[^<]+/, function(a,i){return space[deep]+a[i]+'\n'}]);

                //for <a>
                arr.push([/<[\w]+[^>]*>/, function(a,i){return space[deep++]+a[i]+'\n';}]);
                //for </a>
                arr.push([/<\/[\w]+>/, function(a,i){return space[--deep] + a[i] + '\n'}]);

                code = this.replace(code, arr, true);
            }else{
                var arr=[],
                    index1=1,index2=1,index3=1,index4=1,index5=1,index6=1,index7=1,
                    cache={a:{},b:{},c:{},d:{},e:{},f:{},g:{}};
                
                reg = this.$COM_REG;
                code=code.replace(/\\\r?\n/g,"");
                //special chars
                code=code.replace(/([\x01\x02\x03\x04])/g,"$1-");
                //1.protect those
                code=xui.Coder.replace(code,[
                    // /**/
                    [reg.BLOCK_COMMENT.source,reverse?'':function(s,i){var ret="\x01d" + index4++ +"\x02"; cache.d[ret]=s[i]; return ret;}],
                    // //
                    [reg.LINE_COMMENT.source,reverse?'':function(s,i){var ret="\x01e" + index5++ +"\x02"; cache.e[ret]=s[i]; return ret;}],
                    // /*@
                    [/\/\*@|@\*\/|\/\/@[^\n]*\n/.source,function(s,i){var ret="\x01c" + index3++ +"\x02"; cache.c[ret]=s[i]; return ret;}],
                    // ''
                    [reg.SQ_STRING.source,function(s,i){var ret="\x03a" + index1++ +"\x04"; cache.a[ret]=s[i]; return ret;}],
                    // ""
                    [reg.DQ_STRING.source,function(s,i){var ret="\x03b" + index2++ +"\x04"; cache.b[ret]=s[i]; return ret;}],
                    // regexp
                    [reg.REG.source,function(s,i){var ret="\x03f" + index6++ +"\x04"; cache.f[ret]=s[i]; return ret;}],
                    // function(a,b,c)
                    [/function\s*\([^)]*\)/.source,function(s,i){var ret="\x03g" + index7++ +"\x04"; cache.g[ret]=s[i]; return ret;}]
                ]);
                arr=[
                    // a++ +b;
                    ["([+-])\\s+([+-])", "$1 $2"],
                    // var a;
                    ["\\b[\\s]+\\b", " "],
                    // [ a
                    ["[\\s]+", ""]
                ];
                if(type=='css'){
                    _.arr.insertAny(arr,[/\s+(\.)/.source, " $1"],2,true);
                    _.arr.insertAny(arr,[/(\d*\.?\d+|\d+\.?\d*)(cm|em|ex|pt|px|%|\:)?/, " $0 "],-1,true);
                }
                // prepare space
                code=xui.Coder.replace(code,arr);
                if(!reverse){
                    arr=[
                        [/[\{]/.source, function(a,i){return a[i]+'\n'+space[++deep]}],
                        [/[\x02\;]/.source, function(a,i){return a[i]+'\n'+space[deep]}],
                        [/(\,)([\x03\x04\w_\-]+\:)/.source, function(a,i){return a[i+1]+'\n'+space[deep]+a[i+2]}],
                        [/\x01/.source, function(a,i){return '\n'+space[deep]+a[i]}],
                        [/[\}]\s*[\,]*/.source, function(a,i){return '\n'+space[--deep]+a[i]+'\n'+space[deep] }],
                        [/[\}]\s*[\;]*/.source, function(a,i){return '\n'+space[--deep]+a[i]+'\n'+space[deep] }]
                    ];
                    if(type!='css'){
                        arr.push([/for\s*\([\w ]+\sin\s/.source, "$0"],
                             [/for\s*\(([^;]*);([^;]*);([^)]*)\)/.source, "for($1; $2; $3)"],
                             // '=>' is for php
                             [/(,)(("[^"\n\r]*"|'[^'\n\r]*'|\w+)?(:|=>))/.source, function(a,i){return a[i+1]+"\n"+space[deep]+a[i+2]}],
                             [/\b(case|default)\b[^:]+:/.source, function(a,i){return a[i]+"\n"+space[deep]}]
                        );
                    }
                    // add \n
                    code=xui.Coder.replace(code,arr);

                    // add detail
                    code=xui.Coder.replace(code,[
                        [/ *[\n\r]/.source,'\n'],
                        [/\{\s+\}/.source,'{}'],
                        [/\}\n *(else|catch|finnally)/.source, '}$1'],
                        //protect number
                        [reg.NUMBER, '$0'],
                        //protect "//" and "/*" comments , that does not start with new line.
                        [/(\/\/)|(\/\*)|(\*\/)/.source,'$0'],
                        // + - * / and so on
                        //[/->|=>/.source,' $0 '],
                        [/\s*((\+\+|\-\-|\&\&|\|\||!!)|([=!]==)|((<<|>>>|>>)=?)|([\+\-\*\/\%\&|^<>!=~]=?)|([?:]))\s*/.source,' $1 ']
                    ]);
                }

                //restore those protection
                code=xui.Coder.replace(code,[
                    [/[\n\r]+/.source,'\n'],

                    [/( *)(\x01[d]\d+\x02)/.source, function(s,i){s[i+1]=s[i+1]||'';return s[i+1] + cache.d[s[i+2]].replace(/(\n)(\s*)/g,'$1'+s[i+1])}],
                    [/\x03[g]\d+\x04/.source, function(s,i){return cache.g[s[i]].replace(/\s*,\s*/g,','+(reverse?'':' '))}],
                    [/[\x01\x03]([\w])\d+[\x02\x04]/.source, function(s,i){return cache[s[i+1]][s[i]]}],
                    [/\}\s*([\)\]])/.source,'}$1']
                ]);
 
                //return special chars
                code=code.replace(/([\x01\x02\x03\x04])-/g,"$1");
            }
            return code;
        },
        $xid:1,
        /*parse code
        str:source code
        key:js/css/php
        arrActions:command actions,['plain',]
        height:control height
        id:specify id
        */
        formatHTML:function(code, type, arrActions, fold, id, height){
            if(!id)id=''+this.$xid++;
            var _key = this.$key,
                _str = code,
                _this=this,
                _encode=function(str){
                    return str.replace(/\x02|\x03/g, function(a){return a=="\x02"?"&lt;":"&amp;"});
                },
                _decode=function(str){
                    return str.replace(/<|\&/g, function(a){return a=='<'?"\x02":"\x03"});
                };
            //clear begin and end
            code = code.replace(/^\s*(.*)\s*$/g,'$1');
            code = _decode(code);

            var a,_t;
            //get pro to a
            if(!this._profiles[type])
                type='js';

            a=_.copy(this._profiles[type]);
            //for clear begin/end, for platform
            code = this.replace(code, [[/(\r\n|\r)/g, "\n"],[/( +)(\n)/g, "$2"],[/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"],[/ /g,'&nbsp;']]);

            var arr=[]; //[[/<[^>]+>[^<]*<\/[^>]+>/,'$0']];
            var f = function(o,s,r){
                if(o){
                    if(!_.isArr(o))o=[o];
                    _.arr.each(o,function(o){
                        if(typeof o =='string')o="\\b(" + o + ")\\b";
                        arr.push([o, r?r:"<span class='"+s+"'>$0<\/span>"]);
                    });
                }
            };
            //ignore
            if(_t=a['multicomment']){
                f(_t, 'multicomment', function(a,i){
                    return "<span class='comment'>"+a[i].split('\n').join("</span>\n<span class='comment'>")+"</span>";
                });
                delete a['multicomment'];
            }
            if(_t=a['comment']){
                f(_t, 'comment', function(a,i){
                    return "<span class='comment'>"+a[i].replace('\n','')+"</span>";
                });
                delete a['comment'];
            }
            if(_t=a['IGNORE']){
                f(_t, 'IGNORE', "$0");
                delete a['IGNORE'];
            }

            //sort items
            if(a['reg']){
                (function(o,s){
                    if(o){
                        if(!_.isArr(o))o=[o];
                        _.arr.each(o,function(o){
                            if(typeof o =='string')o="\\b(" + o + ")\\b";
                            arr.push([o, "<span class='"+s+"'>$0<\/span>"]);
                        });
                    }
                })(a['reg'],'reg');
                delete a['reg'];
            }

            _.arr.each(["string1", "string2", "number"],function(s){
                if(a[s]){
                    f(a[s],s);
                    delete a[s];
                }
            });

            //others
            _.each(a,function(o,i){
                f(o,i);
            });

            code = this.replace(code,arr);

            code = _encode(code);
            var strR='';
            var alist = code.split('\n');
            if(alist[0]==""){alist.shift();}
            if(alist[alist.length-1]==""){alist.pop();}

            var aa=[];
            aa.push("<div id='"+_key+":"+id+":' class='sh' "+"style='"+(height?("overflow:hidden;height:"+height+(_.isFinite(height)?"px":"")):"") +"'>");
            if(arrActions && arrActions[0]){
                aa.push("<div id='"+_key+"-"+'sh-cmd'+":"+id+":' class='sh-cmd'>");

                aa.push("<span class='sh-toggle' href='javascript:;' onclick='xui.Coder._toggle(this);'>"
                    +(fold ? " + " : " - ")
                    +"</span> <span class='cmd-ruler'></span>");

                _.arr.each(arrActions,function(s){
                     aa.push("<a id='"+_key+"-"+s+":"+id+":' href='javascript:;' onclick='xui.Coder._action(this,\""+s+"\",arguments[0]);'>"+s+"</a>");
                });

                aa.push("<span>"+type+" source code viewer, powered by <a href='http://www.crossui.com' target='_blank' style='font-size:9px;color:#000157;'>CrossUI</a></span>");
                aa.push("</div>");
            }
            aa.push("<pre style='display:none'>");
            aa.push(_str.replace(/<([\w\/])/g,"&lt;$1"));
            aa.push("</pre>");
            aa.push("<div id='"+_key+"-"+'sh-con'+":"+id+":'class='sh-con' "+"style='"+(height?("overflow:auto;height:"+height+(_.isFinite(height)?"px":"")+";"):"") +(fold?"display:none;":"")+"'><ol id='"+_key+"-"+'ol'+":"+id+":' start='1' class='"+type+"'><li>");
            aa.push(alist.join('&nbsp;</li><li>'));
            aa.push("</li></ol></div>");
            aa.push("</div>");
            _encode=_decode=null;

            _.asyRun(function(){xui.Coder._remedy(id)});

            return aa.join('');
        },
        formatAll:function(code, type, arrActions, fold, id, height){
            var arr = _.toArr(arguments);
            arr[0] = this.formatText.call(this, code, type);
            return this.formatHTML.apply(this, arr);
        },
        applyById:function(id, formatAll){
            var i = 0, self = this, fun = function(){
                if(xui.Dom.byId(id)){
                    var _t, o, cls;
                    i ++ ;
                    _t = xui(id);
                    cls = (_t.get(0).className || "").split(/\s+/g);
                    o = _.str.toDom(xui.Coder[formatAll ? "formatAll" : "formatHTML"](_t.text(), cls[0], cls[1]&& cls[1].split("-"), cls[2], id + ":" + i));
                    o.setSelectable(true);
                    _t.replace(o);
                }else{
                    return false;
                }
            };
            xui.Thread.repeat(fun);
        },
        _remedy:function(id){
            var _t=this.$key+":"+id+":";
            if(!(_t=xui(_t)).isEmpty()){
                var p=_t.parent(), w=p.scrollWidth(), w2 = p.width();
                p.css('positoin','relative');
                if(w>w2)_t.width(w);
            }
        },
        $action:{
            run:function(o,e){
                var code=xui(o).parent().next().text(),
                    fun=new Function([], code);
                fun.call(xui(o).parent(2),e);
            },
            plain:function(o){
                var code = xui(o).parent().next().text();
                var code = code.replace(/</g, '&lt;');
                var wnd = window.open('', '_blank', 'width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=1');
                wnd.document.write('<pre style="width:100%;height:100%;border:none;">' + code + '</pre>');
                wnd.document.close();
                wnd=null;
            }
        },
        _action:function(o,key,e){
            if(this.$action[key]){
                this.$action[key](o,e||window.event);
            }
        },
        _toggle:function(node){
            var s=node.parentNode.nextSibling.nextSibling.style;
            if(s.display=='none'){
                s.display='';
                node.innerHTML='-';
            }else{
                s.display='none';
                node.innerHTML='+';
            }
            s=node=null;
        }
    }
});