<?php
    // input and output keys
    define('XUI_KEYWORD_CALLBACK', "callback");
    define('XUI_KEYWORD_DATA', "data");
    define('XUI_KEYWORD_ERROR', "error");

    // for json
    if(!function_exists('json_encode')){
        include_once("JSON.php");
        function json_encode($var){
            return (new JSON).encode($var);
        }
        function json_decode($str){
            return (new JSON).decode($str);
        }
    }

    // handle request data
    function xui_getRequestData(){
        $callback = XUI_KEYWORD_CALLBACK;
        $inputData=new stdClass;

        // 1. for "post" request
        // 1.1. form post( a=b$c=d )
        if(count($_POST)>0){
            foreach ($_POST as $k=>$v)
               $inputData->$k = get_magic_quotes_gpc()?stripslashes($v):$v;
        // 1.2. form post( {a:'b',c:'d'} ) or xmlhttp post
        }else{
            $request = file_get_contents('php://input');
            if($request){
                $request = json_decode($request);
                foreach ($request as $k=>$v)
                    $inputData->$k = is_string($v)?get_magic_quotes_gpc()?stripslashes($v):$v:$v;
            }
        }

         // 2. for "get" request
         $request = $_SERVER['QUERY_STRING'];
         // 2.1. get ?a=b$c=d
         if($request){
             if(strstr($request,'=')!==false){
                foreach ($_GET as $k=>$v)
                    $inputData->$k = get_magic_quotes_gpc()?stripslashes($v):$v;
             // 2.2. get ?{a:'b',c:'d'}
             }else{
                $request = json_decode(rawurldecode($request));
                foreach ($request as $k=>$v)
                    $inputData->$k = is_string($v)?get_magic_quotes_gpc()?stripslashes($v):$v:$v;
             }
         }
         return $inputData;
    }
    
    // echo response data, or error info
    function xui_echoResponse($inputData, $outputData, $ok=true){
        $callback = XUI_KEYWORD_CALLBACK;
        $data = XUI_KEYWORD_DATA;
        $err = XUI_KEYWORD_ERROR;

        if(isset($inputData)){
            if(isset($inputData->$callback))
                $callbackV=$inputData->$callback;
            unset($inputData);
        }
                
        $outputDataWrapped=new stdClass;        

        if($ok)
            $outputDataWrapped->$data = $outputData;
        else
            $outputDataWrapped->$err = $outputData;

        $outputDataWrapped=json_encode($outputDataWrapped);

        // wrap result data for xui.IAjax and xui.SAjax
 	    if(_.isset($callbackV)){
 	        // for xui.IAjax
 	        if($callbackV=="window.name"){
 	            $outputDataWrapped="<script type='text' id='json'>".$outputDataWrapped."</script><script type='text/javascript'>window.name=document.getElementById('json').innerHTML;</script>";
 	        }
 	        // for xui.SAjax
 	        else{
 	            $outputDataWrapped = $callbackV.'('.$outputDataWrapped.')';
 	        }
 	    }
 	    // for xui.Ajax
        echo $outputDataWrapped;
    }
    
    /* example
    public function action(){
        $inputData = xui_getRequestData();
        $outputData = null;
        $ok=true;

        // $outputData=...
        // $ok=true;

        xui_echoResponse($inputData, $outputData, $ok);
    }
    */
?>