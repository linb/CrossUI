<?php
require_once('nusoap.php');
$server = new soap_server();
$server->soap_defencoding="UTF-8";
$server->configureWSDL('www.linb.net', 'urn:www.linb.net');


$server->wsdl->addComplexType(
	'UserInfoData',
	'complexType',
	'struct',
	'all',
	'',
	array(
		'bgin' => ARRAY('name'=>'bgin','type'=>'xsd:string'),
		'limit' => ARRAY('name'=>'limit','type'=>'xsd:string'),
		'user' => ARRAY('name'=>'user','type'=>'xsd:string'),
		'msg' => ARRAY('name'=>'msg','type'=>'xsd:string')
	));

$server->register('getUserInfo',
	array('bgin' => 'xsd:int','limit' => 'xsd:int'),
	array('return' =>'tns:UserInfoData'),	
	'urn:SoapServer',								
	'urn:SoapServer#GetMydbf1Data',					
	'rpc',											
	'encoded',										
	'SoapServer'									
);
function getUserInfo($bgin,$limit){
	$return['bgin']=$bgin;
	$return['limit']=$limit;
	$return['user']="Jack";
	$return['msg']="This is test!";

	return $return;
}


// Use the request to (try to) invoke the service
$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : '';
$server->service($HTTP_RAW_POST_DATA);
?>