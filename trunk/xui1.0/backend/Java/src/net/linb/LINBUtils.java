package net.linb;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.zip.GZIPOutputStream;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * @author linb
 *
 */

public class LINBUtils {
    // input keys
	public static final String LINB_KEYWORD_CALLBACK = "callback";

    // output keys
	public static final String LINB_KEYWORD_DATA = "data";
	public static final String LINB_KEYWORD_ERROR = "error";

	@SuppressWarnings("unchecked")
	public static Map<String, Object> getRequestData(HttpServletRequest req)
			throws Exception {
		// UTF-8
		req.setCharacterEncoding("UTF-8");
		// request data
		Map<String, Object> hRequestData = new HashMap<String, Object>();

		Map<String, String[]> map = req.getParameterMap();
		for (String key : map.keySet()) {
			key = key.trim();
			if(simpleCheckIsJsonStr(key)){
				if(map.get(key).length==1 && "".equals(map.get(key)[0])){
					Map<String, Object> jsonObj = JSONUtil.fromJSON(key);
					if(jsonObj!=null){
						for(String key1 : jsonObj.keySet()){
							hRequestData.put(key1, jsonObj.get(key1));
						}
					}
				}
			}
			else{
				hRequestData.put(key, map.get(key)[0]);
			}
		}

		return hRequestData;
	}

	private static boolean simpleCheckIsJsonStr(String strPostData) {
		return strPostData.charAt(0) == '{' &&  strPostData.charAt(strPostData.length()-1)=='}';
	}

	public static void echoResponse(HttpServletRequest req, HttpServletResponse resp, Map<String, Object> hRequestData, Object responseData, boolean ok) throws IOException {
		String callbackValue=null;
		
	    if(hRequestData!=null){
	    	if(hRequestData.containsKey(LINB_KEYWORD_CALLBACK)){
	    		callbackValue = ""+hRequestData.get(LINB_KEYWORD_CALLBACK); 
	    	}
	    }

	    Map<String, Object> outputDataWrapped = new HashMap<String, Object>();
	    if(ok){
	    	outputDataWrapped.put(LINB_KEYWORD_DATA, responseData);
	    }else{
	    	outputDataWrapped.put(LINB_KEYWORD_ERROR, responseData);
	    }
	    String strResponse = JSONUtil.toJSON(outputDataWrapped);
		if(callbackValue!=null){
		    if(callbackValue.equals("window.name"){
		        strResponse = "<script type='text' id='json'>" + strResponse + "</script><script type='text/javascript'>window.name=document.getElementById('json').innerHTML;</script>";
		    }else{
		        strResponse = callbackValue + '(' + strResponse + ')';
		    }
		}

	    resp.setContentType("text/html;charset=UTF-8");
		OutputStream out = null;
		String encoding = req.getHeader("Accept-Encoding");
		if (encoding != null && encoding.indexOf("gzip") != -1) {
			resp.setHeader("Content-Encoding", "gzip");
			out = new GZIPOutputStream(resp.getOutputStream());
		} else if (encoding != null && encoding.indexOf("compress") != -1) {
			resp.setHeader("Content-Encoding", "compress");
			out = new ZipOutputStream(resp.getOutputStream());
		} else {
			out = resp.getOutputStream();
		}
		out.write(strResponse.getBytes("UTF-8"));
		out.flush();
		out.close();
	}
}
