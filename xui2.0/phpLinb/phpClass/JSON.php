<?php
/*
* json 28-Jun-2006 at http://pear.php.net/pepr/pepr-proposal-show.php?id=198
*/
define('SERVICES_JSON_SLICE', 1);
define('SERVICES_JSON_IN_STR', 2);
define('SERVICES_JSON_IN_ARR', 3);
define('SERVICES_JSON_IN_OBJ', 4);
define('SERVICES_JSON_IN_CMT', 5);
define('SERVICES_JSON_LOOSE_TYPE', 16);
define('SERVICES_JSON_SUPPRESS_ERRORS', 32);
class JSON{
    function JSON($use = 0){
        $this->use = $use;
    }
    function utf162utf8($utf16){
        if(function_exists('mb_convert_encoding')) {
            return mb_convert_encoding($utf16, 'UTF-8', 'UTF-16');
        }
        $bytes = (ord($utf16{0}) << 8) | ord($utf16{1});
        switch(true) {
            case ((0x7F & $bytes) == $bytes):
                return chr(0x7F & $bytes);
            case (0x07FF & $bytes) == $bytes:
                return chr(0xC0 | (($bytes >> 6) & 0x1F)). chr(0x80 | ($bytes & 0x3F));
            case (0xFFFF & $bytes) == $bytes:
                return chr(0xE0 | (($bytes >> 12) & 0x0F)). chr(0x80 | (($bytes >> 6) & 0x3F)). chr(0x80 | ($bytes & 0x3F));
        }
        return '';
    }
    function utf82utf16($utf8){
        if(function_exists('mb_convert_encoding')) {
            return mb_convert_encoding($utf8, 'UTF-16', 'UTF-8');
        }
        switch(strlen($utf8)) {
            case 1:
                return $utf8;
            case 2:
                return chr(0x07 & (ord($utf8{0}) >> 2)). chr((0xC0 & (ord($utf8{0}) << 6)) | (0x3F & ord($utf8{1})));
            case 3:
                return chr((0xF0 & (ord($utf8{0}) << 4)) | (0x0F & (ord($utf8{1}) >> 2))). chr((0xC0 & (ord($utf8{1}) << 6)) | (0x7F & ord($utf8{2})));
        }
        return '';
    }
    function name_value($name, $value){
        $encoded_value = $this->encode($value);
        if(JSON::isError($encoded_value)) {
            return $encoded_value;
        }
        return $this->encode(strval($name)) . ':' . $encoded_value;
    }
    function reduce_string($str){
        $str = preg_replace(array(
                '#^\s*//(.+)$#m',
                '#^\s*/\*(.+)\*/#Us',
                '#/\*(.+)\*/\s*$#Us'
            ), '', $str);
        return trim($str);
    }
    function encode($var){
        switch (gettype($var)) {
            case 'boolean':
                return $var ? 'true' : 'false';
            case 'NULL':
                return 'null';
            case 'integer':
                return (int) $var;
            case 'double':
            case 'float':
                return (float) $var;
            case 'string':
                $ascii = '';
                $strlen_var = strlen($var);
                for ($c = 0; $c < $strlen_var; ++$c) {
                    $ord_var_c = ord($var{$c});
                    switch (true) {
                        case $ord_var_c == 0x08:
                            $ascii .= '\b';
                            break;
                        case $ord_var_c == 0x09:
                            $ascii .= '\t';
                            break;
                        case $ord_var_c == 0x0A:
                            $ascii .= '\n';
                            break;
                        case $ord_var_c == 0x0C:
                            $ascii .= '\f';
                            break;
                        case $ord_var_c == 0x0D:
                            $ascii .= '\r';
                            break;
                        case $ord_var_c == 0x22:
                        case $ord_var_c == 0x2F:
                        case $ord_var_c == 0x5C:
                            $ascii .= '\\'.$var{$c};
                            break;
                        case (($ord_var_c >= 0x20) && ($ord_var_c <= 0x7F)):
                            $ascii .= $var{$c};
                            break;
                        case (($ord_var_c & 0xE0) == 0xC0):
                            $char = pack('C*', $ord_var_c, ord($var{$c + 1}));
                            $c += 1;
                            $utf16 = $this->utf82utf16($char);
                            $ascii .= sprintf('\u%04s', bin2hex($utf16));
                            break;
                        case (($ord_var_c & 0xF0) == 0xE0):
                            $char = pack('C*', $ord_var_c,
                                         ord($var{$c + 1}),
                                         ord($var{$c + 2}));
                            $c += 2;
                            $utf16 = $this->utf82utf16($char);
                            $ascii .= sprintf('\u%04s', bin2hex($utf16));
                            break;
                        case (($ord_var_c & 0xF8) == 0xF0):
                            $char = pack('C*', $ord_var_c,
                                         ord($var{$c + 1}),
                                         ord($var{$c + 2}),
                                         ord($var{$c + 3}));
                            $c += 3;
                            $utf16 = $this->utf82utf16($char);
                            $ascii .= sprintf('\u%04s', bin2hex($utf16));
                            break;
                        case (($ord_var_c & 0xFC) == 0xF8):
                            $char = pack('C*', $ord_var_c,
                                         ord($var{$c + 1}),
                                         ord($var{$c + 2}),
                                         ord($var{$c + 3}),
                                         ord($var{$c + 4}));
                            $c += 4;
                            $utf16 = $this->utf82utf16($char);
                            $ascii .= sprintf('\u%04s', bin2hex($utf16));
                            break;
                        case (($ord_var_c & 0xFE) == 0xFC):
                            $char = pack('C*', $ord_var_c,
                                         ord($var{$c + 1}),
                                         ord($var{$c + 2}),
                                         ord($var{$c + 3}),
                                         ord($var{$c + 4}),
                                         ord($var{$c + 5}));
                            $c += 5;
                            $utf16 = $this->utf82utf16($char);
                            $ascii .= sprintf('\u%04s', bin2hex($utf16));
                            break;
                    }
                }
                return '"'.$ascii.'"';
            case 'array':
                if (is_array($var) && count($var) && (array_keys($var) !== range(0, sizeof($var) - 1))) {
                    $properties = array_map(array($this, 'name_value'),
                                            array_keys($var),
                                            array_values($var));
                    foreach($properties as $property) {
                        if(JSON::isError($property)) {
                            return $property;
                        }
                    }
                    return '{' . join(',', $properties) . '}';
                }
                $elements = array_map(array($this, 'encode'), $var);
                foreach($elements as $element) {
                    if(JSON::isError($element)) {
                        return $element;
                    }
                }
                return '[' . join(',', $elements) . ']';
            case 'object':
                $vars = get_object_vars($var);
                $properties = array_map(array($this, 'name_value'), array_keys($vars),array_values($vars));
                foreach($properties as $property) {
                    if(JSON::isError($property)) {
                        return $property;
                    }
                }
                return '{' . join(',', $properties) . '}';
            default:
                return ($this->use & SERVICES_JSON_SUPPRESS_ERRORS)
                    ? 'null'
                    : new Services_JSON_Error(gettype($var)." can not be encoded as JSON string");
        }
    }
    function decode($str){
        $str = $this->reduce_string($str);
        switch (strtolower($str)) {
            case 'true':
                return true;
            case 'false':
                return false;
            case 'null':
                return null;
            default:
                $m = array();
                if (is_numeric($str)) {
                    return ((float)$str == (integer)$str) ? (integer)$str : (float)$str;
                } elseif (preg_match('/^("|\').*(\1)$/s', $str, $m) && $m[1] == $m[2]) {
                    $delim = substr($str, 0, 1);
                    $chrs = substr($str, 1, -1);
                    $utf8 = '';
                    $strlen_chrs = strlen($chrs);
                    for ($c = 0; $c < $strlen_chrs; ++$c) {
                        $substr_chrs_c_2 = substr($chrs, $c, 2);
                        $ord_chrs_c = ord($chrs{$c});
                        switch (true) {
                            case $substr_chrs_c_2 == '\b':
                                $utf8 .= chr(0x08);
                                ++$c;
                                break;
                            case $substr_chrs_c_2 == '\t':
                                $utf8 .= chr(0x09);
                                ++$c;
                                break;
                            case $substr_chrs_c_2 == '\n':
                                $utf8 .= chr(0x0A);
                                ++$c;
                                break;
                            case $substr_chrs_c_2 == '\f':
                                $utf8 .= chr(0x0C);
                                ++$c;
                                break;
                            case $substr_chrs_c_2 == '\r':
                                $utf8 .= chr(0x0D);
                                ++$c;
                                break;
                            case $substr_chrs_c_2 == '\\"':
                            case $substr_chrs_c_2 == '\\\'':
                            case $substr_chrs_c_2 == '\\\\':
                            case $substr_chrs_c_2 == '\\/':
                                if (($delim == '"' && $substr_chrs_c_2 != '\\\'') ||
                                   ($delim == "'" && $substr_chrs_c_2 != '\\"')) {
                                    $utf8 .= $chrs{++$c};
                                   }
                                break;
                            case preg_match('/\\\u[0-9A-F]{4}/i', substr($chrs, $c, 6)):
                                $utf16 = chr(hexdec(substr($chrs, ($c + 2), 2)))
                                       . chr(hexdec(substr($chrs, ($c + 4), 2)));
                                $utf8 .= $this->utf162utf8($utf16);
                                $c += 5;
                                break;
                            case ($ord_chrs_c >= 0x20) && ($ord_chrs_c <= 0x7F):
                                $utf8 .= $chrs{$c};
                                break;
                            case ($ord_chrs_c & 0xE0) == 0xC0:
                                $utf8 .= substr($chrs, $c, 2);
                                ++$c;
                                break;
                            case ($ord_chrs_c & 0xF0) == 0xE0:
                                $utf8 .= substr($chrs, $c, 3);
                                $c += 2;
                                break;
                            case ($ord_chrs_c & 0xF8) == 0xF0:
                                $utf8 .= substr($chrs, $c, 4);
                                $c += 3;
                                break;
                            case ($ord_chrs_c & 0xFC) == 0xF8:
                                $utf8 .= substr($chrs, $c, 5);
                                $c += 4;
                                break;
                            case ($ord_chrs_c & 0xFE) == 0xFC:
                                $utf8 .= substr($chrs, $c, 6);
                                $c += 5;
                                break;
                        }
                    }
                    return $utf8;
                } elseif (preg_match('/^\[.*\]$/s', $str) || preg_match('/^\{.*\}$/s', $str)) {
                    if ($str{0} == '[') {
                        $stk = array(SERVICES_JSON_IN_ARR);
                        $arr = array();
                    } else {
                        if ($this->use & SERVICES_JSON_LOOSE_TYPE) {
                            $stk = array(SERVICES_JSON_IN_OBJ);
                            $obj = array();
                        } else {
                            $stk = array(SERVICES_JSON_IN_OBJ);
                            $obj = new stdClass();
                        }
                    }
                    array_push($stk, array('what'  => SERVICES_JSON_SLICE,
                                           'where' => 0,
                                           'delim' => false));
                    $chrs = substr($str, 1, -1);
                    $chrs = $this->reduce_string($chrs);
                    if ($chrs == '') {
                        if (reset($stk) == SERVICES_JSON_IN_ARR) {
                            return $arr;
                        } else {
                            return $obj;
                        }
                    }
                    $strlen_chrs = strlen($chrs);
                    for ($c = 0; $c <= $strlen_chrs; ++$c) {
                        $top = end($stk);
                        $substr_chrs_c_2 = substr($chrs, $c, 2);
                        if (($c == $strlen_chrs) || (($chrs{$c} == ',') && ($top['what'] == SERVICES_JSON_SLICE))) {
                            $slice = substr($chrs, $top['where'], ($c - $top['where']));
                            array_push($stk, array('what' => SERVICES_JSON_SLICE, 'where' => ($c + 1), 'delim' => false));
                            if (reset($stk) == SERVICES_JSON_IN_ARR) {
                                array_push($arr, $this->decode($slice));
                            } elseif (reset($stk) == SERVICES_JSON_IN_OBJ) {
                                $parts = array();
                                if (preg_match('/^\s*(["\'].*[^\\\]["\'])\s*:\s*(\S.*),?$/Uis', $slice, $parts)) {
                                    $key = $this->decode($parts[1]);
                                    $val = $this->decode($parts[2]);
                                    if ($this->use & SERVICES_JSON_LOOSE_TYPE) {
                                        $obj[$key] = $val;
                                    } else {
                                        $obj->$key = $val;
                                    }
                                } elseif (preg_match('/^\s*(\w+)\s*:\s*(\S.*),?$/Uis', $slice, $parts)) {
                                    $key = $parts[1];
                                    $val = $this->decode($parts[2]);
                                    if ($this->use & SERVICES_JSON_LOOSE_TYPE) {
                                        $obj[$key] = $val;
                                    } else {
                                        $obj->$key = $val;
                                    }
                                }
                            }
                        } elseif ((($chrs{$c} == '"') || ($chrs{$c} == "'")) && ($top['what'] != SERVICES_JSON_IN_STR)) {
                            array_push($stk, array('what' => SERVICES_JSON_IN_STR, 'where' => $c, 'delim' => $chrs{$c}));
                        } elseif (($chrs{$c} == $top['delim']) &&
                                 ($top['what'] == SERVICES_JSON_IN_STR) &&
                                 ((strlen(substr($chrs, 0, $c)) - strlen(rtrim(substr($chrs, 0, $c), '\\'))) % 2 != 1)) {
                            array_pop($stk);
                                 } elseif (($chrs{$c} == '[') &&
                                 in_array($top['what'], array(SERVICES_JSON_SLICE, SERVICES_JSON_IN_ARR, SERVICES_JSON_IN_OBJ))) {
                            array_push($stk, array('what' => SERVICES_JSON_IN_ARR, 'where' => $c, 'delim' => false));
                                 } elseif (($chrs{$c} == ']') && ($top['what'] == SERVICES_JSON_IN_ARR)) {
                            array_pop($stk);
                                 } elseif (($chrs{$c} == '{') &&
                                 in_array($top['what'], array(SERVICES_JSON_SLICE, SERVICES_JSON_IN_ARR, SERVICES_JSON_IN_OBJ))) {
                            array_push($stk, array('what' => SERVICES_JSON_IN_OBJ, 'where' => $c, 'delim' => false));
                                 } elseif (($chrs{$c} == '}') && ($top['what'] == SERVICES_JSON_IN_OBJ)) {
                            array_pop($stk);
                                 } elseif (($substr_chrs_c_2 == '/*') &&
                                 in_array($top['what'], array(SERVICES_JSON_SLICE, SERVICES_JSON_IN_ARR, SERVICES_JSON_IN_OBJ))) {
                            array_push($stk, array('what' => SERVICES_JSON_IN_CMT, 'where' => $c, 'delim' => false));
                            $c++;
                                 } elseif (($substr_chrs_c_2 == '*/') && ($top['what'] == SERVICES_JSON_IN_CMT)) {
                            array_pop($stk);
                            $c++;
                            for ($i = $top['where']; $i <= $c; ++$i)
                                $chrs = substr_replace($chrs, ' ', $i, 1);
                                 }
                    }
                    if (reset($stk) == SERVICES_JSON_IN_ARR) {
                        return $arr;
                    } elseif (reset($stk) == SERVICES_JSON_IN_OBJ) {
                        return $obj;
                    }
                }
        }
    }
    function isError($data, $code = null){
        if (class_exists('pear', false)) {
            return PEAR::isError($data, $code);
        } elseif (is_object($data) && (get_class($data) == 'services_json_error' ||
                                 is_subclass_of($data, 'services_json_error'))) {
            return true;
                                 }
        return false;
    }
}
if (class_exists('PEAR_Error', false)) {
    class Services_JSON_Error extends PEAR_Error{
        function Services_JSON_Error($message = 'unknown error', $code = null,
                                     $mode = null, $options = null, $userinfo = null){
            parent::PEAR_Error($message, $code, $mode, $options, $userinfo);
                                     }
    }
}else{
    class Services_JSON_Error{
        function Services_JSON_Error($message = 'unknown error', $code = null, $mode = null, $options = null, $userinfo = null){
        }
    }
}
?>