package net.linb;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * @author linb
 *
 */

public class DemoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest req, HttpServletResponse resp)  
	             throws ServletException, IOException {  
		Map<String, Object> hRequestData = null;
		Map<String, Object> hResponseData = new HashMap<String, Object>();
		boolean ok=true;

		try {
			hRequestData = LINBUtils.getRequestData(req);
			
			if(Math.random()>0.5){
				ok=true;
	            // business logic code
	            // $outputData can be any variable
				hResponseData.put("strRresult","str");
				hResponseData.put("intResult", System.currentTimeMillis());
	            
				hResponseData.put("inputData", hRequestData);
			}
			else{
				ok=false;
				hResponseData.put("code","1");
				hResponseData.put("message", "error message");
			}
		} catch (Exception e) {
	        // fail
			ok=false;
	        
	        // error info
			hResponseData.put("code","2");
			StringBuffer sb = new StringBuffer();
			sb.append(e.toString() + " => ");
			StackTraceElement[] ses = e.getStackTrace();
			for (int i = 0; i < ses.length; i++) {
				sb.append(ses[i].toString());
				sb.append("<br />");
			}
			hResponseData.put("message", sb.toString());
		}
		
		LINBUtils.echoResponse(req, resp, hRequestData, hResponseData, ok);
	}
}