<?php
    // include lib
    include_once("linb.php");

    /**
    * the following code may be in a controller function( for Yii, CodeIgniter etc..)
    **/
    $outputData=new stdClass;
    $ok=true;

    try{
        // get request data
        $inputData = linb_getRequestData();
        
    
        if(rand(0,1)>0.5){
            // successful
            $ok=true;
    
            // business logic code
            // $outputData can be any variable
            $outputData->strRresult="str";
            $outputData->intResult=microtime()*1000000;
            
            $outputData->inputData=$inputData;
            
        }else{
            // fail
            $ok=false;
            
            // error info
            $outputData->code="1";
            $outputData->message="error message";
        }
    }catch (Exception $e){
        // fail
        $ok=false;
        
        // error info
        $outputData->code=$e->getCode();
        $outputData->message=$e->getMessage();
    }

    // echo result
    linb_echoResponse($inputData, $outputData, $ok);
?>