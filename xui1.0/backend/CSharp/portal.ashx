<%@ WebHandler Language="C#" Class="Portal" %>

using System;
using System.IO;
using System.Web;
using System.Collections;
using System.Collections.Specialized;

using SharpLinb;

public class Portal : IHttpHandler
{
     public void ProcessRequest (HttpContext context)
     {
         Hashtable hRequestData = null;
             
         Boolean ok = true;
         Hashtable hResponseData = new Hashtable();
         try
         {
             hRequestData = LINB.getRequestData(context);

             if ((new Random()).NextDouble() > 0.5)
             {
                 ok = true;
                 hResponseData.Add("strRresult", "str");
                 hResponseData.Add("intRresult", (new Random()).NextDouble());

                 hResponseData.Add("inputData", hRequestData);
             }
             else
             {
                 ok = false;
                 hResponseData.Add("code", "1");
                 hResponseData.Add("message", "error message");
             }


         }
         catch (Exception e)
         {
             ok = false;  
             hResponseData.Add("code", e.GetType());
             hResponseData.Add("message", e.Message);
         }
         LINB.echoResponse(context, hRequestData, hResponseData, ok);
     }
     // Override the IsReusable property.
     public bool IsReusable
     {
         get { return true; }
     }

}
