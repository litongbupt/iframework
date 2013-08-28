package com.bupt.core.base.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

public class Utils {
	private Utils(){
		throw new AssertionError();
	}
	/**
	* 判断是否为空
	* 
	* @param para 传入的参数 
	* @return ture为空，false不为空 
	* 
	* @author 李彤 2012-7-4 下午5:57:53
	 */
	public static boolean isEmptyOrNull(String para) {
		return para == null || para.equalsIgnoreCase("")||para.equalsIgnoreCase("null");
	}

	/**
	* 把14未字符串转化为时间格式的字符串
	* 20130808000000 =》 2013-08-08 00:00:00
	* 
	* @param time 时间
	* @return 时间格式的字符串
	* 
	* @author 李彤 2012-7-4 下午5:59:19
	* 修改2012-8-24 下午3:40:23
	 */
	public static String string2Time(String time) {
		return time.substring(0, 4) + "-" + time.substring(4, 6) + "-"
				+ time.substring(6, 8) + " " + time.substring(8, 10) + ":"
				+ time.substring(10, 12) + ":" + time.substring(12, 14);
	}

	/**
	* 把从页面时间控件传过来的时间转化成14位字符串的格式
	* 2013-08-08 00:00:00 =》 20130808000000
	* 
	* @param formTime  从页面时间控件传过来的时间
	* @return 14位字符串的格式
	* 
	* @author 李彤 2013-8-27 下午6:01:50
	 */
	public static String time2String(String formTime) {
		String time;
		if (isEmptyOrNull(formTime)) {
			time = null;
		} else {
			time = formTime.replace("-", "").replace(" ", "").replace(":", "");
		}
		return time;
	}

	/**
	 * 比秒数转化成可读的形式
	 * 10000 => 2小时46分钟40秒
	 * @param second
	 * @return
	 * @author 李彤 2013-8-27 下午9:59:57
	 */
	public static String second2Time(String second) {
		StringBuffer sb = new StringBuffer();
		try{
			long l = Long.valueOf(second);
			long day = l / (24 * 60 * 60);
			if(day!=0L){
				sb.append(day + "天");
			}
			long hour = (l / (60 * 60) - day * 24);
			if(hour!=0L){
				sb.append(hour + "小时");
			}
			long min = ((l / 60) - day * 24 * 60 - hour * 60);
			if(min!=0L){
				sb.append(min + "分钟");
			}
			long s = (l  - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
			if(s!=0L){
				sb.append(s + "秒");
			}		
		}
		catch (NumberFormatException e) {
			e.printStackTrace();
		}
		return  sb.toString();
	}
	
	/**
	 * 时间转换成日期
	 * 20130808000000 =》Thu Aug 08 00:00:00 CST 2013
	 * @param time
	 * @return
	 * @author 李彤 2013-8-27 下午10:01:43
	 */
	public static Date string2Date(String time) {
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMddhhssmm");
		Date date = new Date();
		try {
			date = dateFormat.parse(time);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * 从时间戳中获取小时
	 * 2013-08-08 11:00:00 => 11
	 * 2013-08-08 00:00:00 => 0
	 * @param timestamp
	 * @return
	 * @author 李彤 2013-8-27 下午10:02:38
	 */
	public static Integer getHour(String timestamp){
		String time = Utils.time2String(timestamp);
		return Integer.valueOf(time.substring(8,10));
	}
	
	/**
	 * 从时间戳中获取日期
	 * 2013-08-08 11:00:00 => 20130808
	 * @param timestamp
	 * @return
	 * @author 李彤 2013-8-27 下午10:05:20
	 */
	public static String getDate(String timestamp){
		String time = Utils.time2String(timestamp);
		return time.substring(0,8);
	}
	
	/**
	 * 昨天
	 * new Date() => 20130808
	 * @param date
	 * @return
	 * @author 李彤 2013-8-27 下午10:06:09
	 */
	public static String lastDate(Date date){
		 Calendar calendar = new GregorianCalendar();
		 calendar.setTime(date);
		 calendar.add(calendar.DATE,-1);//把日期往后增加一天.整数往后推,负数往前移动
		 date=calendar.getTime(); //这个时间就是日期往后推一天的结果 
		 SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		 String dateString = formatter.format(date);
		 return dateString;
	}
	
	public static boolean copyProperties(Object dest, Object orig) {
		try {
			BeanUtils.copyProperties(dest, orig);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * 
	 * 把form转换成Model并把空字符串变为null
	 * 
	 * @param dest  转换后
	 * @param orig  转换前
	 * @return 是否转换成功
	 * 
	 * @author 李彤 2012-6-12 下午10:10:52
	 */
	public static boolean copyPropertiesAndsetEmpty2Null(Object dest,
			Object orig) {
		try {
			BeanUtils.copyProperties(dest, orig);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		try {
			Class dClass = dest.getClass();
			Class oClass = orig.getClass();
			Field[] dFields = dClass.getDeclaredFields();
			Field[] oFields = oClass.getDeclaredFields();
			for (Field mField : dFields) {
				boolean flag = false;
				for (Field oField : oFields) {
					if (oField.getName().equals(mField.getName()))
						flag = true;
				}
				if (flag) {
					String fieldName = mField.getName();
					String setMethodName = "";
					setMethodName = "set"
							+ fieldName.substring(0, 1).toUpperCase()
							+ fieldName.substring(1);
					String getMethodName = "";
					getMethodName = "get"
							+ fieldName.substring(0, 1).toUpperCase()
							+ fieldName.substring(1);

					if (mField.getType().getName().equals("java.lang.String")) {
						try {
							// 方法参数类型数组
							Class[] parameterType = new Class[1];
							parameterType[0] = Class
									.forName("java.lang.String");

							Method setMethod = dClass.getDeclaredMethod(
									setMethodName, parameterType);
							Method getMethod = oClass.getDeclaredMethod(
									getMethodName, null);
							if (setMethod == null) {
								System.out.println("--------------找不到方法:"
										+ setMethodName);
								return false;
							}
							if (getMethod == null) {
								System.out.println("--------------找不到方法:"
										+ getMethodName);
								return false;
							}

							String getMethodResult = (String) getMethod.invoke(
									orig, null);

							// 需要注意字符串字段没有赋值（null）和赋空值（“”）的区别
							if (getMethodResult != null) {
								// System.out.println(getMethodName + "------" +
								// getMethodResult);
								Object[] parameters = new Object[1];
								if (getMethodResult.equals("")) {
									parameters[0] = null;
								} else {
									parameters[0] = getMethodResult;
								}
								setMethod.invoke(dest, parameters);
							} else {
								// System.out.println(getMethodName + "------" +
								// getMethodResult);
							}

						} catch (Exception e) {
							e.printStackTrace();
							return false;
						}
					}

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/**
	 * 是否是数字
	 * @param s
	 * @return
	 * @author 李彤 2013-8-27 下午10:06:58
	 */
	public static boolean isNumber(String s){
		try{
			Integer i = Integer.parseInt(s);
			return true;
		}catch(NumberFormatException e){
			return false;
		}
	}
	
	/**
	 * 是否在数组中
	 * @param paramName
	 * @param arrays
	 * @return
	 * @author 李彤 2013-8-27 下午10:07:05
	 */
	public static boolean isInStringArray(String paramName, String[] arrays){
		boolean result = false;
		for(String a : arrays){
			if(a.equals(paramName)){
				result = true;
				break;
			}
		}
		return result;
	}
	
	/**
	 * 把字符串转成utf8编码，保证中文文件名不会乱码  
	 * @param s
	 * @return
	 * @author 李彤 2013-8-27 下午10:07:27
	 */
	public static String toUtf8String(String s){   
	    StringBuffer sb = new StringBuffer();   
	    for (int i=0;i<s.length();i++){   
	        char c = s.charAt(i);   
	        if (c >= 0 && c <= 255){sb.append(c);}   
	        else{   
	            byte[] b;   
	            try { b = Character.toString(c).getBytes("utf-8");}   
	            catch (Exception ex) {   
	                System.out.println(ex);   
	                b = new byte[0];   
	            }   
	            for (int j = 0; j < b.length; j++) {   
	                int k = b[j];   
	                if (k < 0) k += 256;   
	                sb.append("%" + Integer.toHexString(k).toUpperCase());   
	            }   
	        }   
	    }   
	    return sb.toString();   
	}
	
	/**
	 * 获取该关键字在数组中的索引位置
	 * @param array
	 * @param key
	 * @return
	 * @author 李彤 2013-8-27 下午10:07:38
	 */
	public static int getIndex(List<String> array, String key){
		int i = -1;
		for(int j=0; j<array.size(); j++){
			String str = array.get(j);
			if(str.equals(key)){
				i = j;
				break;
			}
		}
		return i;
	}
	
	/**
	 * 截取2位小数的操作
	 * 11.0111f => 11.01
	 * 11.0011 => 11.0
	 * @param num
	 * @return
	 * @author 李彤 2013-8-27 下午10:08:11
	 */
	public static float changeNum(float num){
		int scale = 2;// 设置位数
		int roundingMode = 4;// 表示四舍五入，可以选择其他舍值方式，例如去尾，等等.
		BigDecimal bd = new BigDecimal((double) num);
		bd = bd.setScale(scale, roundingMode);
		return bd.floatValue();
	}
	

}
