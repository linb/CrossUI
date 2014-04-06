<?php
# JSON/XML-RPC Server in PHP5 <http://code.google.com/p/json-xml-rpc/>
# Version: 0.8.1.1 (2008-01-06)
# Copyright: 2007, Weston Ruter <http://weston.ruter.net/>
# License: GNU General Public License, Free Software Foundation
#          <http://creativecommons.org/licenses/GPL/2.0/>
#
# The comments contained in this code are largely quotations from the following specs:
#   * XML-RPC: <http://www.xmlrpc.com/spec>
#   * JSON-RPC 1.0: <http://json-rpc.org/wiki/specification>
#   * JSON-RPC 1.1 (working draft): <http://json-rpc.org/wd/JSON-RPC-1-1-WD-20060807.html>
# Note that development on JSON-RPC continues at <http://groups.google.com/group/json-rpc>
#
# Usage:
# if(!class_exists('DateTime'))
#    require_once('DateTime.class.php');
# require_once('RPCServer.class.php');
# date_default_timezone_set("UTC");
# $server = RPCServer::getInstance(); //note that the RPCServer class is a singleton
# function getTemp($zipCode){
#    //...
#    return $row['temperature'];
# }
# $server->addMethod("getTemp");
# //$server->processRequest() is called automatically by the destructor

class RPCServer {
	const JSON_RPC_VERSION = "1.1";
	const XML_RPC_VERSION = "1.0";
	
	const XML = 1;
	const JSON = 2;
	const JAVASCRIPT = 3;
	//const HTTP_GET = 4;
	
	public $name;
	public $id;
	public $version;
	public $summary;
	public $help;
	public $address;
	
	protected $requestID;
	protected $requestType; #XML | JSON | HTTP_GET
	protected $responseType; #XML | JSON | JAVASCRIPT
	protected $isJSONOmitResponseWrapper;
	protected $isMethodNotFound;
	protected $callbackFunction;
	protected $publicMethodName;
	protected $isDebugMode = false;
	protected $isCallingMethod = false;
	protected $isFinished = false;
	
	protected $requestData;
	protected $responseData;
	
	protected $publicToPrivateMap = array();
	protected $defaultResponseType;
	protected $JSONDateFormat = 'ISO8601'; #or "classHinting" "@ticks@" or "ASP.NET"
	protected $dbResultIndexType = 'ASSOC'; #or "NUM"
	protected $isUsingIncludedFunctions = false; #if not Reflection API
	protected $defaultParametersPreserved = true;
	protected $iso8601StringsConverted = true;
	
	#public static function getInstance()
	#private function __construct()
	#private function __clone()
	
	#function preserveDefaultParameters($defaultParametersPreserved)
	#function convertISO8601Strings($iso8601StringsConverted)
	#function useIncludedFunctions($isUsingIncludedFunctions) #if not Reflection API
	#function setDefaultResponseType($type)
	#function setJSONDateFormat($formatName)
	#function setDBResultIndexType($indexType)
	#function setDebugMode($state)
	#function addMethod($privateProcName, $publicMethodName)
	#protected function printResponseStart()
	#protected function printResponseEnd()
	#public function handleError($errno, $errstr, $errfile, $errline, $errcontext)
	#public function handleException($e)
	#protected function respondWithFault($errno, $errstr, $errfile = null, $errline = null, $errcontext = null)
	#function processRequest()
	
	#protected function encodeJson($value)
	#protected function decodeJson($json)
	#protected function decodeJson_processTokens(&$tokens, &$i)
	#protected function encodeXmlRpc($value)
	#protected function decodeXmlRpc($valueEl)
	
	#protected function convertResource($resource)
	
	#protected static function getEscapeSequence_callback($regExMatches)
	#protected static function getEscapedChar_callback($regExMatches)
	#protected static function isVector(&$array)
	#protected static function stringToNumber($str)
	#protected static function stringToType($str)
	#protected static function ticksToDateTime($ticks)
	#protected static function unicodeToUtf8($src)

	/*BEGIN PHP5*/
	private static $instance = null;
	public static function getInstance(){
		if(!self::$instance){
			$c = __CLASS__;
			self::$instance =& new $c;
		}
		return self::$instance;
	}
	private function __construct(){
		$this->init();
	}
	public function __clone(){}
	public function __destruct(){
		$this->processRequest();
	}
	/*END PHP5*/
	
	/*BEGIN PHP4**
	function RPCServer(){
		$this->init();
	}
	function getInstance(){
		static $instance = null;
		if($instance == null){
			#$c = __CLASS__;
			#return new $c;
			$instance =& new RPCServer();
		}
		return $instance;
	}
	#In PHP5, the processRequests method is called automatically by the destructor. PHP4 does
	#   not support destructors, so I tried using register_shutdown_function instead for PHP4's sake.
	#   However, when there is a fatal error in the user code, the error is not then caught when
	#   using... register_shutdown_function(array(&$this, 'processRequest'));
	**END PHP4*/
	
	private function init(){
		ob_start();
		$this->isMethodNotFound = false; #if true, then catch block will return HTTP status 404; otherwise 500 (JSON-RPC only)
		$this->defaultResponseType = self::JSON;
		$this->requestType = null;
		$this->responseType = null;
		
		#"Don't assume a timezone. It should be specified by the server in its documentation what
		#   assumptions it makes about timezones." 
		/*BEGIN PHP5*/
		//date_default_timezone_set("UTC"); //This implementation was assuming universal time.
		/*END PHP5*/
		/*BEGIN PHP4**
		//putenv('TZ=UTC'); #IS THIS VALID? //This implementation was assuming universal time.
		**END PHP4*/
		
		#Set error handler
		set_error_handler(array(&$this, "handleError"));
		/*BEGIN PHP5*/
		set_exception_handler(array(&$this, "handleException"));
		/*END PHP5*/

		#############################################################################################
		# Get request data
		#############################################################################################
		$this->requestData = '';
		if($_SERVER['REQUEST_METHOD'] == 'POST')
			$this->requestData = trim(file_get_contents("php://input"));
		
		#Sniff the request types. While the XML-RPC spec says that the Content-Type [must be] text/xml,
		#   and while JSON-RPC says the Content-Type MUST be specified and SHOULD read application/json, this
		#   implementation prefers to determine the content type of the request.
		#This implementation does not address JSON-RPC section 6.1. HTTP Header Requirements
		if(preg_match("/^\s*<\?xml\b/", $this->requestData))  #preg_match("/\bxml\b/", $headers['Content-Type']) ||
			$this->requestType = self::XML;
		else if(preg_match("/^\s*{/", $this->requestData))
			$this->requestType = self::JSON;
		#else if(isset($_SERVER['PATH_INFO']))
		#	$this->requestType = self::HTTP_GET;
		
		#Determine the appropriate response type. This implementation may respond with an XML-RPC methodResponse
		#   document, a JSON-RPC response object, bare JSON date (if query string parameter 'JSON-omit-response-wrapper'
		#   is passed), or JavaScript code with user-specified callback function
		#   with the JSON response as its parameter. This last response type allow JSON-RPC calls to be made
		#   to the server by inserting SCRIPT elements into the client document.
		if(isset($_GET['JSON-response-callback'])){
			$this->responseType = self::JAVASCRIPT;
			if(!preg_match('/^(?:\w|\$|_)(?:\d|\w|\$|_)*(\.(?:\w|\$|_)(?:\d|\w|\$|_)*)*$/', $_GET['JSON-response-callback']))
				trigger_error("The provided JavaScript callback function \"" . $_GET['JSON-response-callback'] . "\" is not a valid JavaScript identifier.");
			$this->callbackFunction = $_GET['JSON-response-callback'];
			
			#Remove the 'JSON-response-callback' parameter from the query string; it is done this way instead
			#   of via unset($_GET['JSON-response-callback']) because it is necessary to manually parse the
			#   query string parameters manually below.
			$_SERVER['QUERY_STRING'] = preg_replace('/(^|&)JSON-response-callback=[^&]+/', '', $_SERVER['QUERY_STRING']);
			$_SERVER['QUERY_STRING'] = preg_replace('/^&/', '', $_SERVER['QUERY_STRING']);
		}
		
		#Determine if the user wants to receive JSON result only (omitting skipping the JSON-RPC response object)
		#$this->isJSONOmitResponseWrapper = false;
		if($this->isJSONOmitResponseWrapper = isset($_GET['JSON-omit-response-wrapper'])){  # && (bool)$_GET['JSON-omit-response-wrapper']
			#$this->isJSONOmitResponseWrapper = true;
			
			#Remove the 'JSON-omit-response-wrapper' parameter from the query string; it is done this way instead
			#   of via unset($_GET['JSON-omit-response-wrapper']) because it is necessary to manually parse the
			#   query string parameters manually below.
			$_SERVER['QUERY_STRING'] = preg_replace('/(^|&)JSON-omit-response-wrapper=[^&]+/', '', $_SERVER['QUERY_STRING']);
			$_SERVER['QUERY_STRING'] = preg_replace('/^&/', '', $_SERVER['QUERY_STRING']);
		}
	}
	
	function preserveDefaultParameters($defaultParametersPreserved){
		$this->defaultParametersPreserved = (bool) $defaultParametersPreserved;
	}
	function convertISO8601Strings($iso8601StringsConverted){
		$this->iso8601StringsConverted = (bool) $iso8601StringsConverted;
	}
	
	#disregarded if Reflection API available
	function useIncludedFunctions($isUsingIncludedFunctions){
		$this->isUsingIncludedFunctions = (bool) $isUsingIncludedFunctions;
	}
	
	function setDefaultResponseType($responseType){
		switch($responseType){
			case self::JSON:
			case self::XML:
			#case self::JAVASCRIPT:
				$this->defaultResponseType = $responseType;
				break;
			default:
				trigger_error('Invalid response type "' . $responseType . '"; it must be one of the constants defined for the RPCServer class: XML or JSON.');
		}
	}
	
	function setJSONDateFormat($formatName){
		switch($formatName){
			case 'ISO8601':
			case 'classHinting':
			case '@ticks@':
			case 'ASP.NET':
				$this->JSONDateFormat = $formatName;
				break;
			case '@timestamp@':
				$this->JSONDateFormat = '@ticks@';
				break;
			default:
				trigger_error('Invalid format name "' . $formatName . '" provided for specifying the JSON date format. Format must be either "ISO8601", "classHinting", "@ticks@", or "ASP.NET".');
		}
		setcookie('JSONDateFormat', $formatName, time()+60*60*24*30, dirname($_SERVER['SCRIPT_NAME']));
		$_COOKIE['JSONDateFormat'] = $formatName;
		return true;
	}
	
	function setDBResultIndexType($indexType){
		switch($indexType){
			case 'ASSOC':
			case 'NUM':
				$this->dbResultIndexType = $indexType;
				break;
			default:
				trigger_error('Invalid index type "' . $indexType . '" provided for specifying database result indices; it must be either "ASSOC" or "NUM".');
		}
		setcookie('dbResultIndexType', $indexType, time()+60*60*24*30, dirname($_SERVER['SCRIPT_NAME']));
		$_COOKIE['dbResultIndexType'] = $indexType;
		return true;
	}
	
	function setDebugMode($state){
		$this->isDebugMode = (bool) $state;
	}
	
	#If a public method name is not provided, then the PHP function name will be used as the public name
	function addMethod($privateProcName, $publicMethodName = null){
		if($this->isFinished)
			die("The server's request has already been processed. You may only invoke 'addMethod' before the 'processRequest' is executed.");
		if(!$publicMethodName)
			$publicMethodName = $privateProcName;
		
		if(!function_exists($privateProcName))
			trigger_error("\$RPCServerInstance->addMethod() failed because the function \"$privateProcName\" does not exist.");
		if(isset($this->publicToPrivateMap[$publicMethodName]))
			trigger_error("\$RPCServerInstance->addMethod() failed because the method name \"$publicMethodName\" has already been assigned to the function \"" . $this->publicToPrivateMap[$publicMethodName] . "\".");
		$this->publicToPrivateMap[$publicMethodName] = $privateProcName;
	}

	protected function printResponseStart(){
		if(!$this->responseType){
			if($this->isJSONOmitResponseWrapper || preg_match("/\bapplication\/json\b/i", $_SERVER['HTTP_ACCEPT']))
				$this->responseType = self::JSON;
			else if(!$this->isJSONOmitResponseWrapper && preg_match("/\bxml\b/i", $_SERVER['HTTP_ACCEPT']))
				$this->responseType = self::XML;
			else if($this->defaultResponseType)
				$this->responseType = $this->defaultResponseType;
			else #$this->requestType == self::XML || $this->requestType == self::JSON
				$this->responseType = $this->requestType;
		}

		##Start the output to the client in the appropriate format
		if($this->responseType == self::XML){
			#The Content-Type is text/xml. Content-Length must be present and correct.
			#   The body of the response is a single XML structure, a <methodResponse>, which
			#   can contain a single <params> which contains a single <param> which contains a single <value>.
			header('content-type: text/xml; charset=utf-8');
			print '<?xml version="1.0"?><methodResponse>';
		}
		else { #JSON or JavaScript
			if($this->responseType == self::JAVASCRIPT) {
				header('content-type: text/javascript; charset=utf-8');
				print $this->callbackFunction . "(";
			}
			else { #$this->responseType == self::JSON
				header('content-type: application/json; charset=utf-8');
			}
			
			#Begin response object
			if(!$this->isJSONOmitResponseWrapper){
				print "{";
			
				#version REQUIRED. A String specifying the version of the JSON-RPC protocol to which the
				#   client conforms. An implementation conforming to this specification MUST use the exact
				#   String value of "1.1" for this member. The absence of this member can effectively be
				#   taken to mean that the remote server implement version 1.0 of the JSON-RPC protocol.
				print '"version":"' . self::JSON_RPC_VERSION . '",';
				if($this->requestID)
					print '"id":' . $this->encodeJson($this->requestID) . ',';
			}
		}
	}
		
	protected function printResponseEnd(){
		if($this->responseType == self::XML)
			print "</methodResponse>";
		else if(!$this->isJSONOmitResponseWrapper)
			print "}";
		if($this->responseType == self::JAVASCRIPT)
			print ");";
	}

	
	public function handleError($errno, $errstr, $errfile, $errline, $errcontext){
		$this->respondWithFault($errno, $errstr, $errfile, $errline, $errcontext);
		return true;
	}
	/*BEGIN PHP5*/
	public function handleException($e){
		$this->respondWithFault($e->getCode(), $e->getMessage(), $e->getFile(), $e->getLine(), $e->getTrace());
		return true;
	}
	/*END PHP5*/

	protected function respondWithFault($errno, $errstr, $errfile = null, $errline = null, $errdetails = null){
		ob_clean();
		$this->printResponseStart();
		
		if($this->isCallingMethod)
			$errstr = "Error raised when calling method \"" . $this->publicMethodName . "\": " . $errstr;
		
		$faultDetails = array();
		if($this->isDebugMode){
			$faultDetails['file'] = $errfile;
			$faultDetails['line'] = $errline;
			if(is_array($errdetails) && isset($errdetails[0]))
				$faultDetails['trace'] = $errdetails;
			else
				$faultDetails['context'] = $errdetails;
		}

		if($this->responseType == self::XML){
			#XML-RPC: Unless there's a lower-level error, always return 200 OK.
			#The <methodResponse> could also contain a <fault> which contains a <value> which
			#   is a <struct> containing two elements, one named <faultCode>, an <int> and one
			#   named <faultString>, a <string>.
			
			print '<fault><value><struct>';
			print '<member>';
				print '<name>faultCode</name>';
				print '<value><int>' . htmlspecialchars($errno, ENT_NOQUOTES) . '</int></value>';
			print '</member>';
			print '<member>';
				print '<name>faultString</name>';
				print '<value>' . htmlspecialchars($errstr, ENT_NOQUOTES) . '</value>';
			print '</member>';
			if($this->isDebugMode){
				print '<member>';
					print '<name>faultDetails</name>';
					print $this->encodeXmlRpc($faultDetails);
					#print '<value>' . htmlspecialchars($errorMessageForXML, ENT_NOQUOTES) . '</value>';
				print '</member>';
			}
			print '</struct></value></fault>';
		}
		else { #JSON
			# Unless noted otherwise, a status code of  500 (Internal Server Error) MUST be
			#   used under the following conditions:
			#   * There was an error parsing the JSON text comprising the Procedure Call.
			#   * The target procedure does not exist on the server. For HTTP GET, a server
			#     SHOULD use 404 (Not Found) instead of 500.
			#   * The procedure could not be invoked due to an error resulting from call approximation.
			#   * The invocation took place but resulted in an error from inside the procedure.
			
			if($this->responseType == self::JAVASCRIPT) #Status code cannot be examined anyway
				header("HTTP/1.1 200 OK");
			else if($this->isMethodNotFound)
				header("HTTP/1.1 404 Not Found");
			else
				header("HTTP/1.1 500 Internal Server Error");
				
			
			#REQUIRED on error. An Object containing error information about the fault that
			#   occured before, during or after the call. This member MUST be entirely omitted
			#   if there was no error.
			#When a remote procedure call fails, the Procedure Return object MUST contain the
			#   error  member whose value is a JSON Object with the following properties members:
			#    * name REQUIRED. A String value that MUST read "JSONRPCError".
			#    * code REQUIRED. A Number value that indicates the actual error
			#      that occurred. This MUST be an integer between 100 and 999.
			#    * message REQUIRED. A String value that provides a short description
			#      of the error. The message SHOULD be limited to a single sentence.
			#    * error OPTIONAL. A JSON Null, Number, String or Object value that
			#      carries custom and application-specific error information. Error
			#      objects MAY be nested using this property.
			if($this->isJSONOmitResponseWrapper)
				print '{';
			print '"error":{';
			print '"name":"JSONRPCError",';
			print '"code":' . $this->encodeJson($errno) . ',';
			print '"message":' . $this->encodeJson($errstr);
			if($this->isDebugMode){
				print ',"error":';
				print $this->encodeJson($faultDetails);
			}
			
			#print ',"error":' . ();
			print '}';
			if($this->isJSONOmitResponseWrapper)
				print '}';
		}
		$this->printResponseEnd();
		$this->isFinished = true;
		exit;
	}
	
	function processRequest(){
		if($this->isFinished)
			return; //trigger_error("You may only call the 'processRequest' method once.");
		if(isset($_COOKIE['JSONDateFormat']))
			 $this->JSONDateFormat = $_COOKIE['JSONDateFormat'];
		if(isset($_COOKIE['dbResultIndexType']))
			 $this->dbResultIndexType = $_COOKIE['dbResultIndexType'];

		$this->publicMethodName = '';
		$requestParams = array();
		$this->requestID = null;
		
		#############################################################################################
		# Parse request
		#############################################################################################
		
		#A remote procedure call is made by sending a request to a remote service using either HTTP
		#   POST or HTTP GET. How and where the call is encoded within the HTTP message depends on
		#   the HTTP method that is employed. In the case of HTTP POST, the procedure call is carried
		#   in the body of the HTTP message whereas in the case of HTTP GET, it is expressed along
		#   the path and query components of the HTTP Request-URI.
		if($this->requestType == self::XML){
			/*BEGIN PHP5*/
			$doc = new DOMDocument();
			$doc->loadXML($this->requestData);
			/*END PHP5*/
			
			/*BEGIN PHP4**
			if(!($doc = domxml_open_mem($this->requestData, DOMXML_LOAD_PARSING, &$error)))
				trigger_error("Parse error: " . join(" ... ", $error));
			**END PHP4*/
			
			#The payload is in XML, a single <methodCall> structure.
			if(($root = $doc->documentElement) && $root->nodeName != 'methodCall')
				trigger_error("The root of the document must be a 'methodCall' element.");
			unset($root);
			
			#The <methodCall> must contain a <methodName> sub-item, a string, containing the name of
			#   the method to be called. The string may only contain identifier characters, upper and
			#   lower-case A-Z, the numeric characters, 0-9, underscore, dot, colon and slash. It's
			#   entirely up to the server to decide how to interpret the characters in a methodName.
			$methodNameElements = $doc->getElementsByTagName('methodName');
			if($methodNameElements->length &&
			   $methodNameElements->item(0)->firstChild &&
			   $methodNameElements->item(0)->firstChild->nodeValue)
			{
				$this->publicMethodName = $methodNameElements->item(0)->firstChild->nodeValue;
				if(preg_match("/[^A-Z0-9_\.:\/]/i", $this->publicMethodName))
					trigger_error("The supplied method name \"" . $this->publicMethodName . "\" contains illegal characters. It may may only contain identifier characters, upper and lower-case A-Z, the numeric characters, 0-9, underscore, dot, colon and slash.");
			}
			
			#If the procedure call has parameters, the <methodCall> must contain a <params> sub-item.
			#   The <params> sub-item can contain any number of <param>s, each of which has a <value>.
			#Iterate over all params
			$paramElements = $doc->getElementsByTagName('param');
			for($i = 0; $i < $paramElements->length; $i++){
				$paramEl = $paramElements->item($i);
				$valueEl = $paramEl->firstChild;
				while($valueEl && ($valueEl->nodeType != 1 || $valueEl->nodeName != 'value'))
					$valueEl = $valueEl->nextSibling;
				if(!$valueEl)
					trigger_error("XML-RPC Parse Error: Expected a 'value' element child of the 'param' element.");
				array_push($requestParams, $this->decodeXmlRpc($valueEl));
			}
		}
		else if($this->requestType == self::JSON){
			#When using HTTP POST, the call is expressed in the HTTP request body as a JSON Object
			#   that carries the following members:
			$request = $this->decodeJson($this->requestData);
			
			if(!$request)
				trigger_error("Parse error in JSON input.");
			if(!is_array($request))
				trigger_error("Invalid format for JSON-RPC request.");
			
			#id OPTIONAL. This MUST be the same value as that of the id member of Procedure Call
			#   object to which the response corresponds. This member is maintained for backward
			#   compatibility with version 1.0 of the specification where it was used to correlate
			#   a response with its request. If the id member was present on the request, then the
			#   server MUST repeat it verbatim on the response.
			
			if(!$this->isJSONOmitResponseWrapper && isset($request['id'])) # && ($this->responseType == self::JSON || $this->responseType == self::JAVASCRIPT)
				$this->requestID = $request['id'];
			
			#version REQUIRED. A String specifying the version of the JSON-RPC protocol to which
			#   the client conforms. An implementation conforming to this specification MUST use
			#   the exact String value of "1.1" for this member.
			if(!isset($request['version']))
				trigger_error("The JSON request object must provide the JSON-RPC version.");
			if((float) $request['version'] > 1.1)
				trigger_error("This JSON-RPC library supports version 1.1, but you are attempting to use version " . $request['version'] . ".");

			#method REQUIRED. A String containing the name of the procedure to be invoked. Procedure
			#   names that begin with the word system followed by a period character (U+002E or ASCII 46)
			#   are reserved. In other words, a procedure named system.foobar is considered to have
			#   reserved semantics.
			if(isset($request['method']) && $request['method'])
				$this->publicMethodName = $request['method'];
			
			#params OPTIONAL. An Array or Object that holds the actual parameter values for the
			#   invocation of the procedure.
			if(isset($request['params']))
				$requestParams = $request['params'];
		}
		#JSON Spec: 6.3. Call Encoding Using HTTP GET.
		else if(isset($_SERVER['PATH_INFO'])) {
			#First, an HTTP GET targeting a procedure on a JSON-RPC service is largely indistinguishable
			#   from a regular HTTP GET transaction. For this reason, there is no mention of of the
			#   JSON-RPC protocol version being used. Second, the entire call is encoded in the HTTP
			#   Request-URI. The procedure to invoke is appended to the location of the service, such
			#   that it appears as the last component of the URI path component. The call parameters
			#   appear as the query component and are named after the formal arguments of the target procedure.
			#When using HTTP GET, the target procedure and parameters for the call are entirely expressed
			#   within the Request-URI of the HTTP message. The target procedure MUST appear as the last
			#   component of the Request-URI path component. The procedure's name MUST therefore be preceded
			#   by a forward-slash (U+002F or ASCII 47) but MUST NOT end in one.
			$this->publicMethodName = substr($_SERVER['PATH_INFO'], 1);
			if(strrpos($this->publicMethodName, '/') == strlen($this->publicMethodName)-1)
				trigger_error("The procedure's name must not end in a forward-slash.");
			
			#The parameters are placed in the query component (as defined in  RFC 3986) of the Request-URI,
			#   which is then formatted using the same scheme as defined for HTML Forms with the get method.
			#   Each parameters consists of a name/position and value pair that is separated by the equal
			#   sign (U+003D or ASCII 61) and parameters themselves are separated by an ampersand (U+0026
			#   or ASCII 38):
			
			$queryPostRequest = $_SERVER["QUERY_STRING"] . '&' . $this->requestData;
			
			#if(preg_match("/=/", $queryPostRequest)){
				$queryStringParams = explode("&", $queryPostRequest);
				foreach($queryStringParams as $param){ #foreach(array_keys($_GET) as $name){
					if($param == '')
						continue;
					#After decoding, the server MUST treat all values as if they were sent as JSON String values.
					#   The server MAY then perform conversions at its discretion (on a best-attempt basis) if
					#   the formal arguments of the target procedure expects other non-String values. This
					#   specification does not define any conversion rules or methods.
					#[NOTE: For this to work, $parametersForPrivateProcs must be populated earlier than this point.
					#   then we could get $parametersForPrivateProcs[$this->publicToPrivateMap[$this->publicMethodName]]]
					#   and determine the type cast for each parameter.
					#Parameters named identically on the query string MUST be collapsed into an Array of String
					#   values using the same order in which they appear in the query string and identified by
					#   the repeating parameter name. For instance, the following query string specifies two
					#   parameters only, namely scale and city:
					#It is specifically not possible to send parameters of type Object using HTTP GET.
					$pair = explode("=", $param, 2);
					$key = urldecode($pair[0]);
					#$value = isset($pair[1]) ? self::stringToType(urldecode($pair[1])) : null;
					$value = isset($pair[1]) ? urldecode($pair[1]) : null;
					if(isset($requestParams[$key])){
						if(is_array($requestParams[$key]))
							array_push($requestParams[$key], $value);
						else $requestParams[$key] = array($requestParams[$key], $value);
					}
					else $requestParams[$key] = $value;

					#if(isset($requestParams[$name])){
					#	if(is_array($requestParams[$name]))
					#		array_push($requestParams[$name], $_GET[$name]);
					#	else $requestParams[$name] = array($requestParams[$name], $_GET[$name]);
					#}
					#else $requestParams[$name] = $_GET[$name];
				}
			#}
		}
		else trigger_error("Unable to discern the requested method name. You must pass the request as "  .
						   "XML-RPC document or JSON-RPC object in the POST data, or by passing the method " .
						   "name and parameters as path and query components of the HTTP Request-URI respectively.");

		if(!$this->publicMethodName)
			trigger_error("Method name not provided.");


		###################################################################################
		# Introspect the methods to determine their parameter lists
		###################################################################################
		$parametersForPrivateProcs = array();
		
		/*BEGIN PHP5*/
		/*END PHP5*/
		/*BEGIN PHP4**
		**END PHP4*/
		
		#Using the Reflection API in PHP 5.1.0
		if(class_exists('ReflectionFunction') && method_exists('ReflectionParameter', 'isArray')){
			foreach(array_keys($this->publicToPrivateMap) as $publicProc){
				$functionName = $this->publicToPrivateMap[$publicProc];
				$rf = new ReflectionFunction($functionName);
				$parametersForPrivateProcs[$functionName] = array();
				foreach($rf->getParameters() as $param){ #$i => 
					if($param->isPassedByReference())
						trigger_error("User functions cannot be defined with parameters passed by reference. The function \"$functionName\" wants the parameter \"" . $param->getName() . "\" to be passed by reference.");
					
					$paramDetails = array('name' => $param->getName(),
										  'type' => 'any');
					if($param->isDefaultValueAvailable())
						$paramDetails['default'] = $param->getDefaultValue();
					if($param->isArray())
						$paramDetails['type'] = 'arr';
					else if($rc = $param->getClass()){
						switch(strtolower($rc->getName())){
							case 'datetime':
								$paramDetails['type'] = 'obj';
								break;
							default:
								trigger_error("The only class type that may be hinted is DateTime; you provided \"" . $rc->getName() . "\" in the function \"$functionName\".");
						}
					}
					//$param->isOptional() and $param->allowsNull() are not needed since PHP will raise errors
					//  when call_user_func is invoked.
					array_push($parametersForPrivateProcs[$functionName], $paramDetails);
				}
			}
			unset($functionName);
			unset($rf);
			unset($rc);
			unset($param);
			unset($paramDetails);
		}
		#Using the PHP tokenizer before PHP 5.1.0
		else {
			$privateToPublicMap = array_flip($this->publicToPrivateMap);
			if($this->isUsingIncludedFunctions)
				$sourceFiles = get_included_files();
			else
				$sourceFiles = array();
			array_push($sourceFiles, $_SERVER['SCRIPT_FILENAME']);
			foreach($sourceFiles as $sourceFile){
				if($sourceFile == __FILE__)
					continue;
				$tokens = token_get_all(file_get_contents($sourceFile));
				
				#Remove all comments and whitespace tokens
				for($i = 0; $i < count($tokens); ){
					if(is_array($tokens[$i]) && ($tokens[$i][0] == T_WHITESPACE || $tokens[$i][0] == T_COMMENT))
						array_splice($tokens, $i, 1);
					else $i++;
				}
				
				$inClassDef = false;
				$braceDepth = 0;
				for($i = 0; $i < count($tokens); $i++){
					#Skip all class definitions #################################
					if(is_array($tokens[$i])){
						if($tokens[$i][0] == T_CLASS){
							$inClassDef = true;
							continue;
						}
					}
					else if($tokens[$i] == '{'){
						$braceDepth++;
					}
					#If token is closing brace and the brace depth is now zero, then class definition complete
					else if($tokens[$i] == '}' && (--$braceDepth == 0)){
						$inClassDef = false;
						++$i; #move to next token after class
					}
					if($inClassDef)
						continue;
	
					# Parse function declarations ################################################
					if(is_array($tokens[$i]) && $tokens[$i][0] == T_FUNCTION){
						#Get function name
						++$i; #now $tokens[$i] == the function name
						$functionName = $tokens[$i][1];
	
						if(!isset($privateToPublicMap[$functionName]))
							continue;
						$parametersForPrivateProcs[$functionName] = array();
						
						#Get parameter list
						++$i; #now $tokens[$i] == '('
						$parenDepth = 1;
						
						#Iterate over every parameter for the function
						for($i++; $i < count($tokens) && $parenDepth > 0; $i++){
							if(is_array($tokens[$i])){
								#Parameter name found: obtain all type information available
								if($parenDepth == 1 && $tokens[$i][0] == T_VARIABLE){
									$paramDetails = array('name' => substr($tokens[$i][1], 1),
														  'type' => 'any');
									
									#Get the argument type
									if(is_array($tokens[$i-1])){
										#Object parameter (specifically DateTime)
										if($tokens[$i-1][0] == T_STRING){
											switch(strtolower($tokens[$i-1][1])){
												case 'datetime':
													#$paramType = "datetime";
													#$paramType = "obj";
													$paramDetails['type'] = 'obj';
													break;
												default:
													trigger_error("The only class type that may be hinted is DateTime; you provided \"" . $tokens[$i-1][1] . "\" in the function \"$functionName\".");
											}
										}
										#Array parameter
										else if($tokens[$i-1][0] == T_ARRAY){
											#$paramType = 'arr';
											$paramDetails['type'] = 'arr';
										}
									}
									#Of course data may not be passed from the client by reference
									else if($tokens[$i-1] == '&')
										trigger_error("User functions cannot be defined with parameters passed by reference. The function \"$functionName\" wants the parameter \"" . $paramDetails['name'] . "\" to be passed by reference.");
									
									#Get the default value if it was was provided
									if($this->defaultParametersPreserved && $tokens[$i+1] == '='){
										#$paramDetails['default']
										if(is_array($tokens[$i+2])){
											switch($tokens[$i+2][0]){
												case T_ARRAY:
													#Iterate over the next tokens to compose a string of the entire
													#   literal array value used for the default; then eval this string
													$evalVal = 'array(';
													$arrayParenDepth = 1;
													for($i += 3; $arrayParenDepth > 0; $i++){
														if(is_array($tokens[$i+1])){
															$evalVal .= $tokens[$i+1][1];
														}
														else {
															$evalVal .= $tokens[$i+1];
															if($tokens[$i+1] == ')')
																$arrayParenDepth--;
															else if($tokens[$i+1] == '(')
																$arrayParenDepth++;
														}
													}
													$paramDetails['default'] = eval("return $evalVal;"); #array(); #NOTE: MORE NEEDED HERE: recursive parsing of values
													break;
												case T_CONSTANT_ENCAPSED_STRING:
													$i += 2;
													$paramDetails['default'] = eval('return ' . $tokens[$i][1] . ';');
													break;
												case T_DNUMBER:
													$i += 2;
													$paramDetails['default'] = (double) $tokens[$i][1];
													break;
												case T_LNUMBER:
													$i += 2;
													$paramDetails['default'] = (int) $tokens[$i][1];
													break;
												case T_STRING:
													$i += 2;
													if(defined($tokens[$i][1])) #Bare string is a constant
														$paramDetails['default'] = eval('return ' . $tokens[$i][1] . ';');
													else
														$paramDetails['default'] = $tokens[$i][1];
													break;
											}
										}
									}
									array_push($parametersForPrivateProcs[$functionName], $paramDetails);
								}
							}
							#Determine when the parameter list is entered and exited
							else {
								if($tokens[$i] == '(')
									$parenDepth++;
								else if($tokens[$i] == ')'){
									$parenDepth--;
									
									#This right paren marks the end of the parameter list
									if($parenDepth == 0)
										break;
								}
							}
						}
					}
				}
			}	
			unset($tokens);
			unset($sourceFiles);
			unset($sourceFile);
			unset($paramDetails);
			unset($parenDepth);
			unset($functionName);
			unset($braceDepth);
			unset($inClassDef);
			unset($privateToPublicMap);
	
			#Iterate over all public methods and see if their parameter lists have been found
			#   by parsing the tokens of the PHP functions.
			foreach($this->publicToPrivateMap as $publicProc => $privateProc){
				if(!isset($parametersForPrivateProcs[$privateProc]))
					trigger_error("Because this version of PHP does not support the Reflection API, unable to use the public method \"$publicProc\" because its associated private ".
										"procedure is located in an included file; to get around this, you must explicitly ".
										"allow externally defined functions by calling \$RPCServerInstance->useIncludedFunctions(true); this will decrease performance. ".
										"Note you may not use non-user-defined functions as public methods (native PHP functions may not be used) when the Reflection API is not available.");
			}
			unset($publicProc);
			unset($privateProc);
		}

		#############################################################################################
		# Execute request
		#############################################################################################

		#A JSON-RPC service MUST, at a mimum, support a procedure called system.describe. The result
		#   of calling this procedure without any parameters MUST be a  Service Description  object
		#   as described in the next section.
		if($this->publicMethodName == 'system.describe'){
			#A service description is a JSON Object with the following members or properties:
			$this->responseData = array();
			
			#sdversion REQUIRED. A String value that represents the version number of this object
			#   and MUST read "1.0" for conforming implementations.
			$this->responseData['sdversion'] = '1.0';
			
			#name REQUIRED. A String value that provides a simple name for the method.
			if(isset($this->name))
				$this->responseData['name'] = $this->name;
				
			#id REQUIRED. A String value that uniquely and globally identifies the service. The
			#   string MUST use the URI Generic Syntax (RFC 3986). 
			if(isset($this->id))
				$this->responseData['id'] = $this->id;
				
			#version OPTIONAL. A String value that indicates version number of the service and MAY
			#   be used by the applications for checking compatibility. The version number, when
			#   present, MUST include a major and minor component separated by a period (U+002E or
			#   ASCII 46). The major and minor components MUST use decimal digits (0 to 9) only. For
			#   example, use "2.5" to mean a major version of 2 and a minor version of 5. The use and
			#   interpretation of the version number is left at the discretion of the applications
			#   treating the Service Description.
			if(isset($this->version))
				$this->responseData['version'] = $this->version;
				
			#summary OPTIONAL. A String value that summarizes the purpose of the service. This SHOULD
			#   be kept to a maximum of 5 sentences and often limited a single phrase like, "The News
			#   Search service allows you to search the Internet for news stories."
			if(isset($this->summary))
				$this->responseData['summary'] = $this->summary;
				
			#help OPTIONAL. A String value that is a URL from where human-readable documentation about
			#   the service may be obtained.
			if(isset($this->help))
				$this->responseData['help'] = $this->help;
				
			#address OPTIONAL. A String value that is the URL of the service end-point to which the remote
			#   procedure calls can be targeted. The protocol scheme of this URL SHOULD be http or https.
			#   Although this value is optional, it is highly RECOMMENDED that a service always publish its
			#   address so that a service description obtained indirectly can be used nonetheless to locate
			#   the service.
			if(isset($this->address))
				$this->responseData['address'] = $this->address;
				
			#procs OPTIONAL. An Array value whose element contain Service Procedure Description objects,
			#   each of uniquely describes a single procedure. If the only description of each procedure
			#   that a service has is its name, then it MAY instead supply an Array of String elements for
			#   this member and where each element uniquely names a procedure.
			$this->responseData['procs'] = array();
			
			foreach($this->publicToPrivateMap as $publicName => $privateName){
				#A procedure description is a JSON Object with the following members and properties:
				$proc = array();
				
				#name REQUIRED. A String value that provides a simple name for the method.
				$proc['name'] = $publicName;
				
				#params OPTIONAL. An Array value whose elements are either Procedure Parameter Description
				#   objects or String values. If an element each of uniquely describes a single parameter of
				#   the procedure. If the only description that is available of each parameter is its name,
				#   then a service MAY instead supply an Array of String elements for this member and where
				#   each element uniquely names a parameter and the parameter is assumed to be typed as "any".
				#   In either case, the elements of the array MUST be ordered after the formal argument list of
				#   the procedure being described. If this member is missing or the Null value then the procedure
				#   does not expect any parameters.
				$proc['params'] = array();
				foreach($parametersForPrivateProcs[$privateName] as $param){
					array_push($proc['params'], array("name" => $param['name'], "type" => $param['type']));
				}
				
				#summary OPTIONAL. A String value that summarizes the purpose of the service. This SHOULD be
				#   kept to a maximum of 3 sentences and often limited to a single phrase like, "Lets you
				#   search for hyperlinks that have been tagged by particular tags."
				#help OPTIONAL. A String value that is a URL from where human-readable documentation about the
				#   procedure may be obtained.
				#idempotent OPTIONAL. A Boolean value that indicates whether the procedure is idempotent and
				#   therefore essentially safe to invoke over an HTTP GET transaction. This member MUST be
				#   present and true for the procedure to be considered idempotent.
				#return OPTIONAL. An Object value that is structured after the Procedure Parameter Description
				#   and which describes the output from the procedure. Otherwise, if it is a String value, then
				#   it defines the type of the return value. If this member is missing or is the Null value
				#   then the return type of the procedure is defined to be "any".
				
				array_push($this->responseData['procs'], $proc);
			}
			array_push($this->responseData['procs'],
				array('name' => "system.setJSONDateFormat", 'params' =>
						array(array('name' => 'formatName', 'type' => 'str')) #, 'default' => false
					)
			);
			array_push($this->responseData['procs'],
				array('name' => "system.setDBResultIndexType", 'params' =>
						array(array('name' => 'indexType', 'type' => 'str')) #, 'default' => false
					)
			);
		}
		#system.listMethods -- This method may be used to enumerate the methods implemented by the
		#   XML-RPC server. The system.listMethods method requires no parameters. It returns an
		#   array of strings, each of which is the name of a method implemented by the server.
		#   From <http://xmlrpc.usefulinc.com/doc/reserved.html>
		else if($this->publicMethodName == 'system.listMethods'){
			$this->responseData = array_keys($this->publicToPrivateMap);
			array_push($this->responseData, "system.setJSONDateFormat");
			array_push($this->responseData, "system.setDBResultIndexType");
		}
		#system.methodSignature -- It returns an array of possible signatures for this method.
		#   A signature is an array of types. The first of these types is the return type of
		#   the method, the rest are parameters.
		#   From <http://xmlrpc.usefulinc.com/doc/reserved.html>
		//else if($this->publicMethodName == 'system.methodSignature'){
		//	trigger_error('This implementation does not support "system.methodSignature" since PHP does not have type declarations.');
		//	
		//	#This method takes one parameter, the name of a method implemented by the XML-RPC server.
		//	if(count($requestParams) != 1)  #!function_exists($requestParams[0])
		//		trigger_error('The "system.methodSignature" method must be supplied a method name.');
		//	if(!isset($this->publicToPrivateMap[$requestParams[0]]))
		//		trigger_error('The supplied method name "' . $requestParams[0] . '" does not exist.');
		//}
		#system.methodHelp -- This method takes one parameter, the name of a method
		#   implemented by the XML-RPC server. It returns a documentation string describing
		#   the use of that method. If no such string is available, an empty string is returned.
		#   From <http://xmlrpc.usefulinc.com/doc/reserved.html>
		//else if($this->publicMethodName == 'system.methodHelp'){
		//	trigger_error('This implementation does not support "system.methodHelp" since PHP does not have type declarations.');
		//}
		#system.describeMethods -- This method accepts an optional array argument which is a list of
		#   strings representing method names. It returns a struct containing method and type
		#   descriptions. Each method description is a complex nested struct. If no argument is given,
		#   it will return descriptions for all methods which have a description registered. (Note that
		#   this may not be a comprehensive list of all available methods. system.listMethods should be
		#   used for that.) Each type description is a complex nested struct. All types referenced by
		#   the returned methods should be in the type list. Additional types may also be present.
		#   See <xmlrpc-epi-devel@lists.sourceforge.net>
		//else if($this->publicMethodName == 'system.describeMethods'){
		//	trigger_error('This implementation does not support "system.describeMethods" since PHP does not have type declarations.');
		//}
		else if($this->publicMethodName == 'system.setJSONDateFormat'){
			if(!count($requestParams))
				trigger_error('Parameter must be either "ISO8601", "classHinting", "@ticks@", or "ASP.NET".');
			$keys = array_keys($requestParams);
			$this->responseData = $this->setJSONDateFormat($requestParams[$keys[0]]);
		}
		else if($this->publicMethodName == 'system.setDBResultIndexType'){
			if(!count($requestParams))
				trigger_error('Parameter must be either "NUM" or "ASSOC"..');
			$keys = array_keys($requestParams);
			$this->responseData = $this->setDBResultIndexType($requestParams[$keys[0]]);
		}
		#Execute the user-defined requested method ###########################################
		else {
			#Verify that the supplied method is valid
			if(!isset($this->publicToPrivateMap[$this->publicMethodName]) || !function_exists($this->publicToPrivateMap[$this->publicMethodName])){
				$this->isMethodNotFound = true;
				trigger_error("The function referred to by the public method \"" . $this->publicMethodName . "\" does not exist.", E_USER_ERROR);
			}
			
			#If the value of the params member is any other type except JSON Object or Array,
			#   then the server MUST reject the call with an error.
			if(!is_array($requestParams))
				trigger_error("The parameter(s) supplied must be in the form of a positional array or an associative array (JSON Object).");
	
			#Parameters sent via XML-RPC area always represented positionally just as in JSON-RPC 1.0.
			#In JSON-RPC 1.1, parameters for a procedure call can be identified by their name, position,
			#   or both. The name and position of a parameter is defined by the formal argument list of
			#   the target procedure. The first position is zero and increments by one for each subsequent
			#   formal argument.
			#A client can specify parameters by-name, by-position or both using a JSON Object as the value
			#   for the params member. Each member of this object becomes a candidate parameter for the call.
			#   If the name of the object member consists entirely of decimal digits (0-9) then it identifies
			#   the parameter by its position in the formal argument list. In all other instances, the member
			#   name identifies the parameter by its name and MUST match exactly (including in case) the name
			#   defined by the formal argument.
			#A server MUST accept all forms of parameter expressions described in this section. The last case,
			#   where parameters are sent in an array, was the only one supported in JSON-RPC 1.0. Servers
			#   conforming to JSON-RPC 1.1 can therefore continue to support calls from existing JSON-RPC 1.0 clients.
			
			#6.6. Procedure Call Parity -- The parity of a procedure call is defined by how closely it matches
			#   the target procedure's formal definition and argument list. A call is on full parity with the
			#   target procedure when it meets all of the following conditions:
			#     1. All parameters were supplied and none had the Null value.
			#     2. No extra parameters were supplied.
			#     3. The values for each parameter matched exactly the expected type.
			#   Note that when parameters are named by-position or by-name, their sequence does not change or
			#   contribute to the parity of the call. A call can have full parity with its procedure even if
			#   the parameters were not sent in the sequence of the formal argument list.
			#6.6.1. Call Approximation -- A server SHOULD try to adapt a call such that it has the greatest chance
			#   of succeeding by making the following adjustments for the actual invocation:
			#     * If the call supplies fewer parameters than expected then the missing parameters SHOULD
			#       assume the Null value.
			#     * If the call supplies more parameters than expected then they MAY be dropped prior to
			#       invocation. A server MAY however, provide a means for a procedure to receive the excess
			#       parameters if necessary (for example by allowing a variable-length argument list).
			#     * Make reasonable conversions between the actual and expected type of a parameter. The
			#       eventual conversion methods and policies applied to approximate a call are left at the
			#       discretion of the server and service, but both SHOULD strive to avoid conversions that
			#       cause any loss or precision of data.
	
			#Rearrange the parameter order according to the formal argument list of the procedure.
			$privateProcName = $this->publicToPrivateMap[$this->publicMethodName];
			$paramsToPass = array();
			
			#Iterate over the function's defined parameter list
			for($i = 0; $i < count($parametersForPrivateProcs[$privateProcName]); $i++){
				$param = $parametersForPrivateProcs[$privateProcName][$i];
				
				#Named request parameter matches
				if(isset($requestParams[$param['name']])){
					array_push($paramsToPass, $requestParams[$param['name']]);
					unset($requestParams[$param['name']]);
				}
				#Numbered request parameter matches
				else if(isset($requestParams[$i])){
					array_push($paramsToPass, $requestParams[$i]);
					unset($requestParams[$i]);
				}
				#Provide default for missing parameter if provided and if default values are preserved
				# This ability is not specified by 1.1 WD as it requires that NULL be supplied as default
				else if($this->defaultParametersPreserved && isset($param['default'])){
					array_push($paramsToPass, $param['default']);
				}
				#Supply NULL for missing parameter
				else {
					array_push($paramsToPass, null);
				}
			}
			unset($parametersForPrivateProcs);
			unset($param);
			unset($i);
			
			//foreach($parametersForPrivateProcs[$privateProcName] as $param){
			//	array_push($paramsToPass, isset($requestParams[$param['name']]) ? $requestParams[$param['name']] : null);
			//	unset($requestParams[$param['name']]);
			//}
			
			#Tag on additional parameters that were not added above
			foreach(array_keys($requestParams) as $paramName)
				array_push($paramsToPass, $requestParams[$paramName]);
			unset($requestParams);
			unset($paramName);
			
			$this->isCallingMethod = true;
			$this->responseData = call_user_func_array($privateProcName, $paramsToPass);
		}
		
		
		#Procedure Return (Response) #################################
		#Unless there's a lower-level error, always return 200 OK.
		#When the call is made using HTTP POST, the HTTP status code for a successful result MUST be 200.
		#When the call is made using HTTP GET, the HTTP status code for a successful result SHOULD be 200.
		#   If the HTTP GET call requested cache validation as well, the response MAY be 304 (Not Modified).
		#   The use of status codes generally related to redirection (e.g., 302 "Found" or 301 "Moved
		#   Permanently") of HTTP GET transactions is not strictly prohibited, but service providers are
		#   RECOMMENDED instead to use public documentation and communication methods to advertise the
		#   relocation of a service.
		header("HTTP/1.1 200 OK");
		
		$this->printResponseStart();
		
		if($this->responseType == self::XML){
			#The body of the response is a single XML structure, a <methodResponse>, which can
			#   contain a single <params> which contains a single <param> which contains a single <value>.
			print '<params><param>';
			if(!isset($this->responseData))
				print $this->encodeXmlRpc(null);
			else
				print $this->encodeXmlRpc($this->responseData);
			print '</param></params>';
		}
		else { #JSON
			#REQUIRED on success. The value that was returned by the procedure upon a successful invocation.
			#   This member MUST be entirely omitted in case there was an error invoking the procedure.
			if(!$this->isJSONOmitResponseWrapper)
				print '"result":';
			
			if(!isset($this->responseData))
				print $this->encodeJson(null);
			else
				print $this->encodeJson($this->responseData); #, $this->JSONDateFormat
		}
		$this->printResponseEnd();
		
		#$this->destroy();
		$this->isFinished = true;
	}
	
	###########################################################################
	# Static methods 
	###########################################################################

	## Convert PHP data to JSON code ##########################
	protected function encodeJson($value){
		//switch(gettype($value)){
		
		if($value === null)
		//case 'NULL';
			return 'null';
		
		## Array ###############################
		//case 'array':
		else if(is_array($value)){
			if(!count($value))
				return "[]";
			#inspired by sean at awesomeplay dot com (26-May-2007 07:21) in the PHP user contributed notes for json_encode
			if(self::isVector($value)){
				$json = '[';
				for($i = 0; $i < count($value); $i++){
					if($i)
						$json .= ',';
					$json .= $this->encodeJson($value[$i]);
				}
				return $json . ']';
				#return '[' . join(",", array_map('self::encodeJson', $value)) . ']';
			}
			else {
				$json = '{';
				$count = 0;
				foreach ($value as $k=>$v) {
					if($count++)
						$json .= ',';
					$json .= $this->encodeJson((string)$k) . ':' . $this->encodeJson($v);
				}
				return $json . '}';
			}
		}
		## Object ###############################
		else if(is_object($value)){
		//case 'object':
			$className = get_class($value);
			switch($className){
				case 'DateTime':
					$ticks = $value->format("U") . substr($value->format("u"), 0, 3); //round($value->format("u")/1000);
					switch($this->JSONDateFormat){
						case 'classHinting':
							return '{"__jsonclass__":["Date", [' . $ticks . ']]}'; #json_encode(str_replace("+0000", "Z", $value->format(DATE_ISO8601)))
						case '@ticks@':
							return '"@' . $ticks . '@"'; #str_replace("+0000", "Z", $value->format(DATE_ISO8601)))
						case 'ASP.NET':
							return '"\\/Date(' . $ticks . ')\\/"'; #json_encode(str_replace("+0000", "Z", $value->format(DATE_ISO8601)))
						default: #case 'ISO8601':
							return '"' . $value->format('Y-m-d\TH:i:s.u') . '"';
					}
				default:
					$json = '{' . $this->encodeJson($className) . ':{';
					$members = get_object_vars($value);
					if(count($members)){
						$count = 0;
						foreach($members as $k=>$v){
							if($count++)
								$json .= ',';
							$json .= $this->encodeJson($k) . ':' . $this->encodeJson($v);
						}
						$json .= '}';
					}
					return $json . '}';
			}
		}
		//case 'resource':
		else if(is_resource($value))
			return $this->encodeJson($this->convertResource($value));
		else if(is_double($value))
		//case 'double': #json_encode is croaking on long ints encoded as doubles
			return preg_replace("/\.0+$/", '', sprintf("%f", $value));
		else if(is_bool($value))
		//case 'boolean':
			return $value ? 'true' : 'false';
		else if(is_int($value))
		//case 'integer':
			return $value;
		else if(is_string($value)){
		//case 'string':
			//Note: in PHP 5.1.2, using 'RPCServer' for &$this raises strict error: Non-static method cannot not be called statically, even though it is declared statically.
			$value = preg_replace_callback('/([\\\\\/"\x00-\x1F])/', array(&$this, 'getEscapeSequence_callback'), $value); 
			return '"' . /*utf8_encode*/($value) . '"';
		}
		trigger_error("Unable to convert type " . gettype($value) . " to JSON.");
	}
	
	## Convert JSON code to PHP ##########################
	protected function decodeJson($json){
		$jsonRegEx = '/(\s+|[{}\[\],:]|null|true|false|'; #whitespace, object and array delimiters, null, boolean types
		$jsonRegEx .= '-?\d+(?:\.\d+)?(?:[eE][\-\+]?\d+)?|'; #number
		$jsonRegEx .= '"(?:\\\\"|\\\\\\\\|(?:\\\\)?[^\\\\\x00-\x1F])*?"|'; #string
		$jsonRegEx .= '(?:\w|\$|_|\\\\u[a-zA-Z0-9]{4})(?:(?:\w|\$|_|\\\\u[a-zA-Z0-9]{4})|\d)*'; #identifier, except UnicodeCombiningMark and UnicodeConnectorPunctuation
		$jsonRegEx .= '|.+$)/s'; #Unrecognized characters
		
		if(!preg_match_all($jsonRegEx, $json, $tokens, PREG_PATTERN_ORDER))
			trigger_error("Unable to tokenize the JSON input; invalid data.");
		
		#strip whitespace nodes
		for($i = 0; $i < count($tokens[0]);){
			if(ctype_space(substr($tokens[0][$i], 0, 1)))
				array_splice($tokens[0], $i, 1);
			else $i++;
		}
		
		$i = 0;
		
		$result = $this->decodeJson_processTokens($tokens[0], $i);
		#print_r($result);
		return $result;
	}
	
	protected function decodeJson_processTokens(&$tokens, &$i){
		switch($tokens[$i]){
			## Object ###############################
			case '{':
				$obj = array();
				$i++;
				for(; $i < count($tokens); $i++){
					$c = substr($tokens[$i], 0, 1);
					if($c == '"' || preg_match("{^(?:\w|\$|_|\\\\u[a-zA-Z0-9]{4})}", $tokens[$i])){
						$name = (string) $this->decodeJson_processTokens($tokens, $i); #json_decode($tokens[$i]); #decodeJson_processTokens
						$i++; #goto ":"
						if(!isset($tokens[$i]) || $tokens[$i] != ':')
							break 2; #goto Exception
						$i++; #goto value
						$obj[$name] = $this->decodeJson_processTokens($tokens, $i);
						
						#Add support for JSON Class hinting from JSON-RPC 1.0:
						#There are only simple data types defined in JSON. To overcome this problem in a
						#   JSON compatible way a special property for objects is introduced. The object
						#   is then instantiated using the constructor, passing in the parameters. Once
						#   constructed the properties (prop1, ...) will be applied. 
						#   {"__jsonclass__":["constructor", [param1,...]], "prop1": ...}
						#print "#######sdasdsadas#####";
						#if(isset($obj[$name]['__jsonclass__'])){
						#	print_r($obj[$name]);
						#}
						
						if(is_array($obj[$name]) && isset($obj[$name]['__jsonclass__']) && is_array($obj[$name]['__jsonclass__'])){
							#$jsonclass = &$obj[$name]['__jsonclass__'];
							if(is_string($obj[$name]['__jsonclass__'][0])){
								switch($obj[$name]['__jsonclass__'][0]){
									#{"__jsonclass__":["Date", ["YYYY-MM-DDTHH:MM:SS"]]}
									case 'Date':
										if(is_array($obj[$name]['__jsonclass__'][1])){
											$param = $obj[$name]['__jsonclass__'][1][0];
											print $param . "##\n";
											if(is_numeric($param))
												$obj[$name] = self::ticksToDateTime((double) $param);
											else
												$obj[$name] = new DateTime($param);
										}
								}
							}
						}
						
						$i++; #goto comma or end-object
						if(!isset($tokens[$i]))
							break 2; #goto Exception
						if($tokens[$i] == '}'){
							if(isset($obj['__jsonclass__']) &&
							   is_array($obj['__jsonclass__']) &&
							   isset($obj['__jsonclass__'][0]) &&
							   is_string($obj['__jsonclass__'][0]))
							{
								$jsonObj = null;
								switch($obj['__jsonclass__'][0]){
									case 'Date':
										#{"__jsonclass__":["Date", [1321009871111]], "hello":1}
										$param = '';
										if(isset($obj['__jsonclass__'][1]) &&
										   is_array($obj['__jsonclass__'][1]) &&
										   isset($obj['__jsonclass__'][1][0]))
										{
											$param = $obj['__jsonclass__'][1][0];
										}
										
										if(get_class($param) == 'DateTime')
											$jsonObj = $param;
										else if(is_numeric($param))
											$jsonObj = self::ticksToDateTime((double) $param);
										else
											$jsonObj = new DateTime($param);
										break;
									default:
										return $obj;
								}
								
								#Set the supplied properties of the object
								unset($obj['__jsonclass__']);
								foreach($obj as $k => $v){
									$jsonObj->$k = $v;
								}
								return $jsonObj;
							}
							return $obj;
						}
						if($tokens[$i] != ',')
							break 2; #goto Exception
					}
					else if($c == '}'){
						return $obj;
					}
					else break 2; #goto Exception
				}
			## Array ###############################
			case '[':
				$arr = array();
				$i++;
				if(isset($tokens[$i]) && $tokens[$i] == ']')
					return $arr;
				for(; $i < count($tokens); $i++){
					array_push($arr, $this->decodeJson_processTokens($tokens, $i));
					$i++;  #goto comma or end-array
					if(!isset($tokens[$i]))
						break 2; #goto Exception
					if($tokens[$i] == ']')
						return $arr;
					if($tokens[$i] != ',')
						break 2; #goto Exception
				}
				break;
			case '}':
			case ']':
			case ':':
			case ',':
				break; #goto Exception
			## Null and Boolean ###############################
			case 'null': return null;
			case 'true': return true;
			case 'false': return false;
				
			## Strings (and Dates) and Numbers ############################
			default:
				$c = substr($tokens[$i], 0, 1);
				if($c == '"'){
					#Parse date string
					if(preg_match('{^"\\\\/Date\((\d+)\)\\\\/"$}', $tokens[$i], $matches) ||
					   preg_match('{^"@(\d+)@"$}', $tokens[$i], $matches))
					{
						return self::ticksToDateTime((double) $matches[1]);
					}

					#Parse ISO8601 string
					else if($this->iso8601StringsConverted && preg_match('/^"(\d\d\d\d-\d\d(-\d\d(T\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?)"$/', $tokens[$i]))
						return new DateTime(substr($tokens[$i], 1, -1));

					#Regular string
					else
						//Note: in PHP 5.1.2, using 'RPCServer' for &$this raises strict error: Non-static method cannot not be called statically, even though it is declared statically (also below)
						return /*utf8_decode*/(preg_replace_callback('{(\\\\(?:u[0-9a-zA-Z]{4}|"|/|\\\\|[btnfr]))}', array(&$this, 'getEscapedChar_callback'), substr($tokens[$i], 1, -1)));
				}
				#Number
				else if($c == '-' || ctype_digit($c)){ #is_numeric($tokens[$i])
					return self::stringToNumber($tokens[$i]);
				}
				#ECMAScript identifier
				else if(preg_match("{^(?:\w|\$|_|\\\\u[a-zA-Z0-9]{4})}", $tokens[$i])){
					return /*utf8_decode*/(preg_replace_callback('{(\\\\(?:u[0-9a-zA-Z]{4}|"|/|\\\\|[btnfr]))}', array(&$this, 'getEscapedChar_callback'), $tokens[$i]));
				}
		}
		trigger_error("Parse error in JSON input. Error detected at token " . ($i+1) . ": " . (isset($tokens[$i]) ? join('', array_slice($tokens, $i)) : 'EOF'));
	}
	
	## Convert PHP value to XML-RPC value element ##########################
	protected function encodeXmlRpc($value){
		$xml = '<value>';
		//switch(gettype($value)){
		if(is_bool($value))
		//case 'boolean':
			$xml .= '<boolean>' . ($value ? 1 : 0) . '</boolean>';
		else if(is_int($value))
		//case 'integer':
			$xml .= '<i4>' . $value . '</i4>';
		else if(is_double($value))
		//case 'double':
			$xml .= '<double>' . $value . '</double>';
		else if(is_string($value)){
		//case 'string':
			$value = (htmlspecialchars($value, ENT_NOQUOTES));
			$value = preg_replace_callback('/([\x00-\x1F])/', create_function('$matches', 'return sprintf("&#x%02x;", ord($matches[0]));'), $value);
			$xml .= '<string>' . /*utf8_encode*/($value) . '</string>';
		}
		else if($value === null)
		//case 'NULL':
			$xml .= '<nil/>';
		else if(is_array($value)){
		//case 'array':
			#XML-RPC <array>
			if(self::isVector($value)){
				$xml .= '<array><data>';
				#$xml .= join("", array_map('self::encodeXmlRpc', $value));
				for($i = 0; $i < count($value); $i++){
					$xml .= $this->encodeXmlRpc($value[$i]);
				}
				$xml .= '</data></array>';
			}
			#XML-RPC <struct>
			else {
				$xml .= '<struct>';
				foreach($value as $k => $v){
					$xml .= '<member>';
					$name = htmlspecialchars($k, ENT_NOQUOTES);
					$name = preg_replace_callback('/([\x00-\x1F])/', create_function('$matches', 'return sprintf("&#x%02x;", ord($matches[0]));'), $name);
					$xml .= '<name>' . /*utf8_encode*/($name) . '</name>';
					$xml .= $this->encodeXmlRpc($v);
					$xml .= '</member>';
				}
				$xml .= '</struct>';
			}
		}
		else if(is_object($value)){
		//case 'object':
			$className = get_class($value);
			switch($className){
				case 'DateTime':
					$xml .= "<dateTime.iso8601>";
					$xml .= $value->format('Y-m-d\TH:i:s.u');
					$xml .= "</dateTime.iso8601>";
					break;
				default:
					$xml .= '<struct><member><name>' . htmlspecialchars($className) . '</name><value>';
					$members = get_object_vars($value);
					if(count($members)){
						$xml .= '<struct>';
						$count = 0;
						foreach($members as $k=>$v){
							$xml .= '<member>';
							$xml .= '<name>' . /*utf8_encode*/(htmlspecialchars($k, ENT_NOQUOTES)) . '</name>';
							$xml .= '<value>' . htmlspecialchars($v, ENT_NOQUOTES) . '</value>';
							$xml .= '</member>';
						}
						$xml .= '</struct>';
					}
					$xml .= '</value></member></struct>';
			}
		}
		else if(is_resource($value))
		//case 'resource':
			return $this->encodeXmlRpc($this->convertResource($value));
		//default:
		else
			trigger_error("Unknown PHP data type: " . gettype($value));
		$xml .= '</value>';
		return $xml;
	}
	
	
	## Convert XML-RPC value element to PHP ##########################
	protected function decodeXmlRpc($valueEl){ #function parseValue($valueEl){
		if($valueEl->childNodes->length == 1 &&
		   $valueEl->childNodes->item(0)->nodeType == 3)
		{
			return $valueEl->childNodes->item(0)->nodeValue;
		}
		for($i = 0; $i < $valueEl->childNodes->length; $i++){
			if($valueEl->childNodes->item($i)->nodeType == 1){
				$typeEl = $valueEl->childNodes->item($i);
				switch($typeEl->nodeName){
					case 'i4':
					case 'int':
						#An integer is a 32-bit signed number. You can include a plus or minus at the
						#   beginning of a string of numeric characters. Leading zeros are collapsed.
						#   Whitespace is not permitted. Just numeric characters preceeded by a plus or minus.
						if(!preg_match("/^[-\+]?\d+$/", $typeEl->firstChild->nodeValue))
							trigger_error("XML-RPC Parse Error: The value provided as an integer '" . $typeEl->firstChild->nodeValue . "' is invalid.");
						
						$double = (double) $typeEl->firstChild->nodeValue;
						$int = (int) $typeEl->firstChild->nodeValue;
					
						#If the provided number is too big to fit in an INT, then it
						#   will overflow so it must be stored as a DOUBLE
						if(abs(floor($double) - $int) > 1)
							return $double;
						else return $int;
					case 'double':
						#There is no representation for infinity or negative infinity or "not a number".
						#   At this time, only decimal point notation is allowed, a plus or a minus,
						#   followed by any number of numeric characters, followed by a period and any
						#   number of numeric characters. Whitespace is not allowed. The range of
						#   allowable values is implementation-dependent, is not specified.
						if(!preg_match("/^[-\+]?\d+(\.\d+)?$/", $typeEl->firstChild->nodeValue))
							trigger_error("XML-RPC Parse Error: The value provided as a double '" . $typeEl->firstChild->nodeValue . "' is invalid.");
						return (double) $typeEl->firstChild->nodeValue;
					case 'boolean':
						if($typeEl->firstChild->nodeValue != '0' && $typeEl->firstChild->nodeValue != '1')
							trigger_error("XML-RPC Parse Error: The value provided as a boolean '" . $typeEl->firstChild->nodeValue . "' is invalid.");
						return (bool) $typeEl->firstChild->nodeValue;
					case 'string':
						if(!$typeEl->firstChild)
							return "";
						return (string) /*utf8_decode*/($typeEl->firstChild->nodeValue);
					case 'dateTime.iso8601':
						#try {
							$date = new DateTime($typeEl->firstChild->nodeValue);
						#}
						#catch(Exception $e){
						#	trigger_error("XML-RPC Parse Error: The value provided as a dateTime.iso8601 '" . $typeEl->firstChild->nodeValue . "' is invalid.");
						#}	
						return $date;
					case 'base64':
						return base64_decode($typeEl->firstChild->nodeValue);
					case 'nil':
						return null;
					case 'struct':
						#A <struct> contains <member>s and each <member> contains a <name> and a <value>.
						$struct = array();
						#$memberEl = $typeEl->firstChild;
						for($j = 0; $memberEl = $typeEl->childNodes->item($j); $j++){
							if($memberEl->nodeType == 1 && $memberEl->nodeName == 'member'){
								$name = '';
								$valueEl = null;
								for($k = 0; $child = $memberEl->childNodes->item($k); $k++){
									if($child->nodeType == 1){
										if($child->nodeName == 'name')
											$name = /*utf8_decode*/($child->firstChild->nodeValue);
										else if($child->nodeName == 'value')
											$valueEl = $child;
									}
								}
								#<struct>s can be recursive, any <value> may contain a <struct> or
								#   any other type, including an <array>, described below.
								if($name && $valueEl)
									$struct[$name] = $this->decodeXmlRpc($valueEl);
							}
						}
						return $struct;
					case 'array':
						#An <array> contains a single <data> element, which can contain any number of <value>s.
						$arr = array();
						$dataEl = $typeEl->firstChild;
						while($dataEl && ($dataEl->nodeType != 1 || $dataEl->nodeName != 'data'))
							$dataEl = $dataEl->nextSibling;
						
						if(!$dataEl)
							trigger_error("XML-RPC Parse Error: Expected 'data' element as sole child element of 'array'.");
						
						$valueEl = $dataEl->firstChild;
						while($valueEl){
							if($valueEl->nodeType == 1){
								#<arrays>s can be recursive, any value may contain an <array> or
								#   any other type, including a <struct>, described above.
								if($valueEl->nodeName == 'value')
									array_push($arr, $this->decodeXmlRpc($valueEl));
								else
									trigger_error("XML-RPC Parse Error: Illegal element child '" . $valueEl->nodeName . "' of an array's 'data' element.");
							}
							$valueEl = $valueEl->nextSibling;
						}
						return $arr;
					default:
						trigger_error("XML-RPC Parse Error: Illegal element '" . $typeEl->nodeName . "' child of the 'value' element.");
				}
			}
		}
		return '';
	}
	
	
	## Convert PHP resource type to a returnable data format ###############################
	protected function convertResource($resource){
		$resourceType = get_resource_type($resource);
		switch($resourceType){
			#case 'dbm':
			#case 'dba':
			#case 'dbase':
			#case 'domxml attribute':
			#case 'domxml document':
			#case 'domxml node':
			case 'fbsql result':
				$rows = array();
				$indexType = ($this->dbResultIndexType == 'ASSOC' ? FBSQL_ASSOC : FBSQL_NUM);
				while($row = fbsql_fetch_array($resource, $indexType))
					array_push($rows, $row);
				return $rows;
				
			#case 'gd': #return base64
			
			case 'msql query':
				$rows = array();
				$indexType = ($this->dbResultIndexType == 'ASSOC' ? MSQL_ASSOC : MSQL_NUM);
				while($row = msql_fetch_array($resource, $indexType))
					array_push($rows, $row);
				return $rows;
				
			case 'mssql result':
				$rows = array();
				$indexType = ($this->dbResultIndexType == 'ASSOC' ? MSSQL_ASSOC : MSSQL_NUM);
				while($row = mssql_fetch_array($resource, $indexType))
					array_push($rows, $row);
				return $rows;
			
			case 'mysql result':
				$rows = array();
				$indexType = ($this->dbResultIndexType == 'ASSOC' ? MYSQL_ASSOC : MYSQL_NUM);
				while($row = mysql_fetch_array($resource, $indexType))
					array_push($rows, $row);
				return $rows;
			
			case 'odbc result':
				$rows = array();
				if($this->dbResultIndexType == 'ASSOC'){
					while($row = odbc_fetch_array($resource))
						array_push($rows, $row);
				}
				else {
					while($row = odbc_fetch_row($resource))
						array_push($rows, $row);
				}
				return $rows;
			
			#case 'pdf document':
			
			case 'pgsql result':
				$rows = array();
				$indexType = ($this->dbResultIndexType == 'ASSOC' ? PGSQL_ASSOC : PGSQL_NUM);
				while($row = pg_fetch_array($resource, $indexType))
					array_push($rows, $row);
				return $rows;
				
			case 'stream':
				return stream_get_contents($resource);
			
			case 'sybase-db result':
			case 'sybase-ct result':
				$rows = array();
				if($this->dbResultIndexType == 'ASSOC'){
					while($row = sybase_fetch_assoc($resource))
						array_push($rows, $row);
				}
				else {
					while($row = sybase_fetch_row($resource))
						array_push($rows, $row);
				}
				return $rows;
			
			#case 'xml':

			default:
				trigger_error("Unable to return resource type '$resourceType'.");
		}
	}
	
	#Function for preg_replace_callback('([\\\\\/"\x00-\x1F])')
	protected static function getEscapeSequence_callback($regExMatches){
		if(isset(self::$charToJSON[$regExMatches[0]]))
			return self::$charToJSON[$regExMatches[0]];
		return sprintf('\\u00%02x', ord($regExMatches[0]));
	}
	private static $charToJSON = array(
		'\\'   => '\\\\',
		'"'    => '\\"',
		'/'    => '\\/',
		"\x08" => '\\b',
		"\x09" => '\\t',
		"\x0A" => '\\n',
		"\x0C" => '\\f',
		"\x0D" => '\\r'
	);

	#Function for preg_replace_callback('{(\\\\(?:u[0-9a-zA-Z]{4}|"|/|\\\\|[btnfr]))}')
	protected static function getEscapedChar_callback($regExMatches){
		$c = substr($regExMatches[0], 1, 1);
		switch($c){
			case 'b': return "\x08"; 
			case 't': return "\x09";
			case 'n': return "\x0A";
			#case 'v': return "\x0B"; #not specified in JSON spec?
			case 'f': return "\x0C";
			case 'r': return "\x0D";
			#case '"': return "\x22";
			#case "'": return "\x27";
			#case '\\': return "\x5C";
			case 'u':
				return self::unicodeToUtf8(hexdec(substr($regExMatches[0], 2)));
		}
		return $c;
	}

	#Determine if an array is a vector (JSON Array, XML-RPC array) as opposed an
	#   associative array (JSON Object, XML-RPC struct)
	protected static function isVector(&$array){
		$next = 0;
		foreach($array as $k=>$v){
			if($k !== $next)
				return false;
			$next++;
		}
		return true;
	}
	
	protected static function stringToNumber($str){
		$double = (double) $str;
		$int = (int) $str;
		
		#If the provided number is too big to fit in an INT, then it
		#   will overflow so it must be stored as a DOUBLE
		if(abs(floor($double) - $int) > 1){
			return $double;
		}
		#Detect if token is a float; the ceiling of the DOUBLE val
		#   should be the same as the INT val
		else if((int)ceil($double) - $int > 0.1){
			return $double;
		}
		else
			return $int;
	}
	
	protected static function stringToType($str){
		switch($str){
			case 'true':
				return true;
			case 'false':
				return false;
			case 'null':
				return null;
		}
		if(is_numeric($str))
			return self::stringToNumber($str);
		return $str;
	}
	
	# Convert a (double) ticks (the largest number format) to a DateTime
	protected static function ticksToDateTime($ticks){
		$longint = sprintf("%.0f", (double) $ticks);
		$ms = (int)substr($longint, -3);
		$secs = (int)substr($longint, 0, strlen($longint)-3);
		$date = new DateTime(gmdate('Y-m-d\TH:i:s.' . $ms . 'Z', $secs)); //NOTE: We should use date() and remove 'Z' so that the user can specify the timezone they want
		return $date;
	}
	
	/** Mozilla code from Henri Sivonen <hsivonen@iki.fi>:
	 * Takes an ... int representing the Unicode character and returns 
	 * a UTF-8 string. Astral planes are supported ie. the ints in the
	 * input can be > 0xFFFF. Occurrances of the BOM are ignored. Surrogates
	 * are not allowed.
	 *
	 * Returns false if the input array contains ints that represent 
	 * surrogates or are outside the Unicode range.
	 */
	protected static function unicodeToUtf8($src)
	{
	  $dest = '';
	  #foreach ($arr as $src) {
		if($src < 0) {
		  return false;
		} else if ( $src <= 0x007f) {
		  $dest .= chr($src);
		} else if ($src <= 0x07ff) {
		  $dest .= chr(0xc0 | ($src >> 6));
		  $dest .= chr(0x80 | ($src & 0x003f));
		} else if($src == 0xFEFF) {
		  // nop -- zap the BOM
		} else if ($src >= 0xD800 && $src <= 0xDFFF) {
		  // found a surrogate
		  return false;
		} else if ($src <= 0xffff) {
		  $dest .= chr(0xe0 | ($src >> 12));
		  $dest .= chr(0x80 | (($src >> 6) & 0x003f));
		  $dest .= chr(0x80 | ($src & 0x003f));
		} else if ($src <= 0x10ffff) {
		  $dest .= chr(0xf0 | ($src >> 18));
		  $dest .= chr(0x80 | (($src >> 12) & 0x3f));
		  $dest .= chr(0x80 | (($src >> 6) & 0x3f));
		  $dest .= chr(0x80 | ($src & 0x3f));
		} else { 
		  // out of range
		  return false;
		}
	  #}
	  return $dest;
	}
}



?>