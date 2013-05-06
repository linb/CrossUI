using System;
using System.Web;
using System.Collections;
using System.Collections.Specialized;
using Jayrock;
using Jayrock.Json;
using Jayrock.Json.Conversion;


namespace SharpLinb
{
    public class LINBException : Exception
    {
        public LINBException()
        {
        }
        public LINBException(string message)
            : base(message)
        {
        }
        public LINBException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }

    public class LINB
    {
        public const string ERR = "error";
        public const string DATA = "data";
        public const string CALLBACK = "callback";


        public static Hashtable getRequestData(HttpContext context)
        {
            Hashtable hRequest = new Hashtable();

            //get request data from POST
            if (context.Request.Form.HasKeys())
            {
                LINB.merge(context.Request.Form, hRequest);
            }
            else
            {
                String sRawPostData = context.Request.Form[null];
                if (sRawPostData != null && sRawPostData.Trim().Length > 0)
                {
                    JsonObject obj = (JsonObject)JsonConvert.Import(sRawPostData);
                    LINB.merge(obj, hRequest);
                }

            }

            //get request data from GET
            if (context.Request.QueryString.HasKeys())
            {
                LINB.merge(context.Request.QueryString, hRequest);
            }
            else
            {
                String sQueryString = context.Request.QueryString[null];
                if (sQueryString != null && sQueryString.Trim().Length > 0)
                {
                    sQueryString = context.Server.UrlDecode(sQueryString);
                    JsonObject obj = (JsonObject)JsonConvert.Import(sQueryString);
                    LINB.merge(obj, hRequest);
                }
            }

            return hRequest;
        }


        public static void echoResponse(HttpContext context, Hashtable inputData, Object outputData, Boolean ok)
        {
            context.Response.ClearContent();
            string strOut = "";

            Hashtable hResponse = new Hashtable();

            if (ok)
            {
                hResponse.Add(DATA, outputData);
            }
            else
            {
                hResponse.Add(ERR, outputData);
            }
            Object oCallback = inputData[CALLBACK];
            //adjust out string
            if (oCallback != null)
            {
                string sCallback = "" + oCallback;
                if ("window.name".Equals(sCallback))
                {
                    context.Response.ContentType = "text/html";
                    strOut = "<script type='text' id='json'>"
                        + JsonConvert.ExportToString(hResponse)
                        + "</script><script type='text/javascript'>window.name=document.getElementById('json').innerHTML;</script>";
                }
                else
                {
                    context.Response.ContentType = "text/plain";
                    strOut = sCallback + "(" + JsonConvert.ExportToString(hResponse) + ")";
                }
            }
            else
            {
                context.Response.ContentType = "text/plain";
                strOut = JsonConvert.ExportToString(hResponse);
            }


            if (inputData != null)
                inputData.Clear();
            context.Response.Write(strOut);
            context.Response.End();
        }

        private static void merge(NameValueCollection col, Hashtable hash)
        {
            foreach (string key in col)
            {
                hash[key] = col[key];
            }
        }
        private static Hashtable JsonObjectToHash(JsonObject jo)
        {
            Hashtable hOut = new Hashtable();
            IDictionaryEnumerator i = jo.GetEnumerator();
            i.MoveNext();
            do
            {
                hOut[i.Key.ToString()] = i.Value.ToString();
            } while (i.MoveNext());
            return hOut;
        }
        private static void merge(JsonObject col, Hashtable hash)
        {
            IDictionaryEnumerator i = col.GetEnumerator();
            i.MoveNext();
            do
            {
                if (i.Value is JsonObject)
                {
                    hash[i.Key] = JsonObjectToHash((JsonObject)i.Value);
                }
                else
                    hash[i.Key] = i.Value;
            } while (i.MoveNext());
        }
    }
}
