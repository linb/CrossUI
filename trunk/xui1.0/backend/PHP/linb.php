<?php
    // input keys
    define('LINB_KEYWORD_CALLBACK', "callback");

    // output keys
    define('LINB_KEYWORD_DATA', "data");
    define('LINB_KEYWORD_ERROR', "error");


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
    function linb_getRequestData(){
        $callback = LINB_KEYWORD_CALLBACK;

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
    function linb_echoResponse($inputData, $outputData, $ok=true){
        $callback = LINB_KEYWORD_CALLBACK;

        $data = LINB_KEYWORD_DATA;
        $err = LINB_KEYWORD_ERROR;

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

        // wrap result data
 	    // script tag ajax    	    
 	    if(_.isset($callbackV)){
 	        if($callbackV=="window.name"){
 	            $outputDataWrapped="<script type='text' id='json'>".$outputDataWrapped."</script><script type='text/javascript'>window.name=document.getElementById('json').innerHTML;</script>";
 	        }else{
 	            $outputDataWrapped = $callbackV.'('.$outputDataWrapped.')';
 	        }
 	    }
        echo $outputDataWrapped;
    }
    
    /* example
    public function action(){
        $inputData = linb_getRequestData();
        $outputData = null;
        $ok=true;

        // $outputData=...
        // $ok=true;

        linb_echoResponse($inputData, $outputData, $ok);
    }
    */
?>