package com.skt.hrs.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.skt.hrs.cmmn.exception.HrsException;

public class DateUtil {

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
		
}
