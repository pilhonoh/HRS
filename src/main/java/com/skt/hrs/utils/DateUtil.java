package com.skt.hrs.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.skt.hrs.cmmn.exception.HrsException;

public class DateUtil {

	/**
	 * 
	 * @설명 : 오늘날짜를 YYYYMMDD형식으로 리턴
	 * @작성일 : 2019.09.05
	 * @작성자 : P149365
	 * @return
	 * @변경이력 :
	 */
	public static String getYYYYYMMDD() {
		return new SimpleDateFormat("yyyyMMdd").format(new Date());
	}
	
	/**
	 * 
	 * @설명 : 
	 * @작성일 : 2019.09.09
	 * @작성자 : P149365
	 * @param yyyymmdd
	 * @return
	 * @변경이력 :
	 */
	public static String yyyymmdd2HumanReadable(String yyyymmdd) {
		try{
			Date date = new SimpleDateFormat("yyyyMMdd").parse(yyyymmdd);
			return new SimpleDateFormat("yyyy-MM-dd").format(date);
		}catch(Exception e) {
			throw new HrsException("invalid date");
		}
		
	}
	
	/**
	 * 
	 * @설명 : HRS 시스템의 시간(1~9)를 실제 시간으로 변경 
	 * @작성일 : 2019.09.04
	 * @작성자 : P149365
	 * @param yyyymmdd
	 * @param hrsTm
	 * @변경이력 :
	 */
	public static Date hrsDtToRealDt(String yyyymmdd, String hrsTm) {
		try {
			Date startDate = new SimpleDateFormat("yyyyMMddHHmm").parse(yyyymmdd + "0830");
			Calendar cal = Calendar.getInstance();
			cal.setTime(startDate);
			cal.add(Calendar.HOUR, Integer.parseInt(hrsTm));
			return cal.getTime();
		}catch(Exception e) {
			throw new HrsException("invalid date");
		}
	}
	
	/**
	 * 
	 * @설명 : 현재시점에서의 과거 여부
	 * @작성일 : 2019.09.04
	 * @작성자 : P149365
	 * @param compareDate
	 * @return
	 * @변경이력 :
	 */
	public static boolean isPast(Date compareDate) {
		Date nowDt = new Date();
		return compareDate.getTime() <= nowDt.getTime();
	}
	
	/**
	 * 
	 * @설명 : 예약시간-20분 보다 과거인지 판단 
	 * @작성일 : 2019.09.05
	 * @작성자 : P149365
	 * @param compareDate
	 * @return
	 * @변경이력 :
	 */
	public static boolean isPastBefore20min(Date compareDate) {
		Calendar cal = Calendar.getInstance(); 
		cal.setTime(compareDate);
		cal.add(Calendar.MINUTE, -20);
		cal.add(Calendar.SECOND, 59);	//09:30 건에 대하여 09:10:59초까지 가능하게 함 
		Date before20Min = cal.getTime();
		return new Date().getTime() <= before20Min.getTime(); 
	}
	
	/**
	 * 
	 * @설명 :  일자 계산  
	 * @작성일 : 2019.09.15
	 * @작성자 : P150113
	 * @param strart
	 * @param end
	 * @return
	 * @변경이력 :
	 */
	public static int getDateDiff(String strart,  String end) {
		SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");  
	    long diff = 0;
		try {
			Date startDate = dateFormater.parse(strart);
			Date endDate = dateFormater.parse(end);
            diff = endDate.getTime() - startDate.getTime();
            return (int)diff/(24 * 60 * 60 * 1000);
	    }catch(Exception e) {
			throw new HrsException("invalid date");
		
	    }
	}
	
	/**
	 * 
	 * @설명 :  일자 계산  
	 * @작성일 : 2019.09.15
	 * @작성자 : P150113
	 * @param strart
	 * @param end
	 * @return
	 * @변경이력 :
	 */
	public static String getDateAdd(String yyyymmdd,  int day) {
		SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");  
		Calendar cal = Calendar.getInstance(); 
		try {
			Date startDate = dateFormater.parse(yyyymmdd);
			cal.setTime(startDate);
			cal.add(Calendar.DATE, day);
			return new SimpleDateFormat("yyyyMMdd").format(cal.getTime()) ;       
	    }catch(Exception e) {
			throw new HrsException("invalid date");
		
	    }
	}
}
