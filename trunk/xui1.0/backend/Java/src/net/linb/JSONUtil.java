package net.linb;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;


/**
 * 
 * @author linb
 *
 */

public class JSONUtil {
	// date
	// private static String dateFormat = "yyyy-MM-dd";
	private static String timeFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
	// date pattern
	private static String datePattern = "^((-\\d+|\\d{4,})(-(\\d{2})(-(\\d{2}))?)?)?T((\\d{2})(:(\\d{2})(:(\\d{2})(\\.(\\d{1,3})(\\d)?\\d*)?)?)?)?(([+-])(\\d{2})((\\d{2}))?)?$";
	private static SimpleDateFormat sdf = new SimpleDateFormat(timeFormat);
	private static Pattern pattern = Pattern.compile(datePattern);

	/**
	 * for date
	 */

	public static String getDatePattern() {
		return JSONUtil.datePattern;
	}

	public static void setDatePattern(String datePattern) {
		JSONUtil.pattern = Pattern.compile(JSONUtil.datePattern = datePattern);
	}

	public static String getDateFormat() {
		return timeFormat;
	}

	public static void setDateFormat(String dateFormat) {
		JSONUtil.sdf = new SimpleDateFormat(JSONUtil.timeFormat = dateFormat);
	}

	private static ArrayList<Object> JSON2JavaObj(JSONArray jsonArr) {
		ArrayList<Object> arrL = new ArrayList<Object>();
		for (int i = 0, l = jsonArr.size(); i < l; i++) {
			Object objTemp = jsonArr.get(i);
			if (objTemp instanceof JSONNull) {
				arrL.add(null);
			}else if (objTemp instanceof JSONObject) {
				arrL.add(JSON2JavaObj((JSONObject) objTemp));
			} else if (objTemp instanceof JSONArray) {
				arrL.add(JSON2JavaObj((JSONArray) objTemp));
			} else {
				// date
				if (objTemp != null && objTemp instanceof String) {
					String str = objTemp.toString();
					Matcher m = pattern.matcher(str);
					if (m.matches()) {
						try {
							objTemp = sdf.parse(str);
						} catch (Exception e) {
						}
					}
				}
				arrL.add(objTemp);
			}
		}
		return arrL;
	}

	/**
	 * JSONObject to Java Object
	 * @param jsonObject
	 * @return HashMap
	 */
	@SuppressWarnings(value = { "unchecked" })
	private static Map<String, Object> JSON2JavaObj(JSONObject jsonObject) {
		Map<String, Object> tempObjectMap = new HashMap<String, Object>();
		Iterator ite = jsonObject.entrySet().iterator();
		while (ite.hasNext()) {
			Map.Entry paraMap = (Map.Entry) ite.next();
			String strKey = (String) paraMap.getKey();
			Object objTemp = paraMap.getValue();
			if (objTemp instanceof JSONNull) {
				tempObjectMap.put(strKey, null);
			} else if (objTemp instanceof JSONObject) {
				tempObjectMap.put(strKey, JSON2JavaObj((JSONObject) objTemp));
			} else if (objTemp instanceof JSONArray) {
				tempObjectMap.put(strKey, JSON2JavaObj((JSONArray) objTemp));
			} else {
				// date
				if (objTemp != null && objTemp instanceof String) {
					String str = objTemp.toString();
					Matcher m = pattern.matcher(str);
					if (m.matches()) {
						try {
							objTemp = sdf.parse(str);
						} catch (Exception e) {
						}
					}
				}
				tempObjectMap.put(strKey, objTemp);
			}
		}
		return tempObjectMap;
	}

	/**
	 * JSON String to Java ArrayList
	 * 
	 * @param json
	 * @return
	 */
	public static ArrayList<Object> fromArrayJSON(String json) {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		DateJsonValueProcessor p = new DateJsonValueProcessor(timeFormat);
		jsonConfig.registerJsonValueProcessor(java.util.Date.class,p);
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,p);
		jsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class,p);
		JSONArray jsonObj;
		try {
			jsonObj = JSONArray.fromObject(json, jsonConfig);
		} catch (Exception e) {
			return null;
		}
		return JSON2JavaObj(jsonObj);
	}
	/**
	 * JSON String to Java Map
	 * @param json
	 * @return
	 */
	public static Map<String, Object> fromJSON(String json) {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		DateJsonValueProcessor p = new DateJsonValueProcessor(timeFormat);
		jsonConfig.registerJsonValueProcessor(java.util.Date.class,p);
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,p);
		jsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class,p);

		JSONObject jsonObj;
		try {
			jsonObj = JSONObject.fromObject(json, jsonConfig);
		} catch (Exception e) {
			return null;
		}
		return JSON2JavaObj(jsonObj);
	}

	/**
	 * Java Object to JSON String
	 * 
	 * @param obj
	 * @return
	 */
	public static String toJSON(Object obj) {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		DateJsonValueProcessor p = new DateJsonValueProcessor(timeFormat);
		jsonConfig.registerJsonValueProcessor(java.util.Date.class,p);
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,p);
		jsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class,p);
		JSONObject jsonObj;
		try {
			jsonObj = JSONObject.fromObject(obj, jsonConfig);
		} catch (Exception e) {
			return e.getMessage();
		}
		return jsonObj.toString();
	}
	
	public static void main(String[] args){
		//String json = "{\"result\":{\"data\":[\"2009-10-27T00:00:00.000+0800\"]},\"id\":\"2009-10-27T00:00:00.000+0800\"}";
		String json = "{\"timespanstart\":\"2009-10-27T00:00:00.000+0800\", \"timespanend\":\"2009-12-08T00:00:00.000+0800\"}";
		Object obj=JSONUtil.fromJSON(json);
		System.out.print(JSONUtil.toJSON(obj));
	}
}
