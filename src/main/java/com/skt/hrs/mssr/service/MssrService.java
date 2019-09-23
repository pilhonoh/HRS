package com.skt.hrs.mssr.service;


import java.text.SimpleDateFormat;
import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.cmmn.contants.ResveStatusConst;
import com.skt.hrs.cmmn.exception.HrsException;
import com.skt.hrs.cmmn.service.CspService;
import com.skt.hrs.mssr.dao.MssrDAO;
import com.skt.hrs.utils.DateUtil;
import com.skt.hrs.utils.StringUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.pub.core.util.JsonUtils;





@Service("mssrService")
public class MssrService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="mssrDAO")
	private MssrDAO mssrDAO;
	
	@Autowired
	private CspService cspService;
	
	@Autowired
	MessageSource messageSource;

	
	/**
	 * 
	 * @설명 : 관리사 목록 조회
	 * @작성일 : 2019.09.04
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult getMssrList(DataEntity param) {
		ResponseResult result = new ResponseResult();
		result.setItemList(mssrDAO.getMssrList(param));
		return result;
	}
	
	
	
	
	
	/**
	 * 
	 * @설명 : 관리사 스케쥴 리스트 조회
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectScheduleList(DataEntity param) {
		ResponseResult result = new ResponseResult();
		result.setItemList(mssrDAO.selectScheduleList(param));
		return result;
	}
	
	/**
	 * 
	 * @설명 :  관리사 근무시간 기본 사항
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectScheduleMaster(DataEntity param) {
		ResponseResult result = new ResponseResult();
		Map item = mssrDAO.selectScheduleMaster(param);
		result.setItemOne(item);
		return result;
	}
	
	/**
	 * 
	 * @설명 : 관리사 근무시간 상세사항
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectScheduleDetail(DataEntity param) {
		ResponseResult result = new ResponseResult();
		 param.put("resveTime",null);
		result.setItemList(mssrDAO.selectScheduleDetail(param));
		return result;
	}
  
	/**
	 * 
	 * @설명 : 관리사 스케쥴 리스트 조회
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	
	
	
	
	
	public ResponseResult selectSchedulItemDetail (DataEntity param) {
		ResponseResult result = new ResponseResult();
		result.setItemList(mssrDAO.selectScheduleDetail(param));
		return result;
	}
	
	/**
	 * 
	 * @설명 : 관리사 스케쥴 리스트 TOTAL COUNT 조회
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public int selectScheduleListTotalCount(DataEntity param) {
		int result = mssrDAO.selectScheduleListTotalCount(param);
		return result;
	}


	/**
	 * 
	 * @설명 : 관리사 스케쥴 동록
	 * @작성일 : 2019.09.16
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	@Transactional
	public ResponseResult insertSchedule(DataEntity param) {
		
		ResponseResult result = new ResponseResult();
		DataEntity paramsMap = new DataEntity();
		DataEntity chkDataMap = new DataEntity();
		ArrayList<HashMap<String, String>> getListItems = (ArrayList<HashMap<String, String>>)JsonUtils.stringToJsonClass(param.getString("params"), ArrayList.class);
		String startDate ="", endDate = "", workDate="";
		long days = 0;
		int chk =0 , timeDup = 0, bedUse = 0;
		paramsMap.putAll(getListItems.get(0));
		chkDataMap.put("RESVE_CHECK","");
		chkDataMap.put("START_DATE",paramsMap.getString("startDate"));
		boolean  insertResult = false;
        for (int i = 0; i < getListItems.size(); i++) {
        	paramsMap.putAll(getListItems.get(i));
        	startDate = paramsMap.getString("startDate");
        	endDate = paramsMap.getString("endDate");
        	paramsMap.put("regEmpNo",param.getString("regEmpNo"));
        	days = DateUtil.getDateDiff(startDate, endDate );
        	for (int j = 0; j <= days; j++) {
        		 workDate = DateUtil.getDateAdd(startDate,j);
        		 if(DateUtil.isWeekend(workDate,"yyyyMMdd")) {
            		 continue;
            	 };
        		paramsMap.put("sttusCode",ResveStatusConst.DBSTATUS.WORK.toString());
             	paramsMap.put("fromDate",startDate.replaceAll("-", "")); 
             	paramsMap.put("toDate",endDate.replaceAll("-", ""));	
             	paramsMap.put("resveDate",workDate.replaceAll("-", ""));
             	
             	dupChk(paramsMap , chkDataMap);
             	chk = chkDataMap.getInt("RESVE_CHECK");
	            if(chk == 10) { 
	            	timeDup= timeDup +1; 
				 }
	             else if(chk==20){
	            	 bedUse= bedUse +1;
				 } 
	             else if(chk==30){
					 bedUse= bedUse +1;
					 timeDup= timeDup +1; 
				 }
        	 
        	 
        	 insertResult = mssrDAO.insertSchedule(paramsMap); 
			
			if(!(insertResult)) { 
				throw new HrsException("error.processFailure", true);
			 } 		 
			insertResult = mssrDAO.insertResveHist(paramsMap); 
			if(!(insertResult)) { 
				throw new HrsException("error.processFailure", true);
			 } 
          }
        }
    	
    	 if(timeDup >0) {
    		 String message = messageSource.getMessage("error.mssr.duplicateDate", new String[] {
    				 chkDataMap.getString("START_DATE"),
    				 chkDataMap.getString("END_DATE"),
    				
 			}, Locale.forLanguageTag(param.getString("_ep_locale")));	
    		 throw new HrsException(message);
    	 }else if(bedUse > 0) {
    		 String message = messageSource.getMessage("error.mssr.duplicateBed", new String[] {
    				 chkDataMap.getString("END_DATE"),
    				 chkDataMap.getString("MSSR_NCNM"),
    				 chkDataMap.getString("BED_CODE"),
    				
 			}, Locale.forLanguageTag(param.getString("_ep_locale")));	
    		 throw new HrsException(message); 
    	 }
    	  
		result.setItemOne(insertResult);
		// data적용 성공여부
		return result;
	}
	
	
	/**
	 * 
	 * @설명 : 관리사 스케쥴 동록
	 * @작성일 : 2019.09.16
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	@Transactional
	public ResponseResult scheduleModify(DataEntity param) {
		ResponseResult result = new ResponseResult();
	    boolean  insertResult = false;
	    DataEntity chkDataMap = new DataEntity();
	    String[] InsertTime = param.getString("insertTime").replaceAll("\"","").replaceAll("[\\[\\]]","").split(",");
		String[] DeleteTime = param.getString("deleteTime").replaceAll("\"","").replaceAll("[\\[\\]]","").split(",");
		int chk =0 , timeDup = 0, bedUse = 0;
        //HashMap<String,String > paramsMap = new HashMap<String,String >() ;
        param.remove("insertTime");
        param.remove("deleteTime");
        chkDataMap.put("RESVE_CHECK","");
		chkDataMap.put("START_DATE",param.getString("resveDate"));
		chkDataMap.put("MSSR_EMPNO","");
		chkDataMap.put("BED_CODE","");
		if( !StringUtil.isEmpty(InsertTime[0]) && InsertTime.length >0) {
			 param.put("sttusCode",ResveStatusConst.DBSTATUS.WORK.toString());
			for (int i = 0 ; i < InsertTime.length; i++) {
		     param.put("resveTime",InsertTime[i]);
			
		        dupChk(param , chkDataMap);
             	chk = chkDataMap.getInt("RESVE_CHECK");
	             if(chk==20){
	            	 bedUse= bedUse +1;
				 } 
	             else if(chk==30){
					 bedUse= bedUse +1; 
				 }
	             
	            
				 insertResult = mssrDAO.insertSchedule(param); 
				if(!(insertResult)) { 
					throw new HrsException("error.processFailure", true);
				 } 
				 
				insertResult = mssrDAO.insertResveHist(param); 
				if(!(insertResult)) { 
					throw new HrsException("error.processFailure", true);
				 } 
			}
		}
		if(timeDup >0) {
   		 String message = messageSource.getMessage("error.mssr.duplicateDate", new String[] {
   				 chkDataMap.getString("START_DATE"),
   				 chkDataMap.getString("END_DATE"),
   				
			}, Locale.forLanguageTag(param.getString("_ep_locale")));	
   		 throw new HrsException(message);
   	 }else if(bedUse > 0) {
   		 String message = messageSource.getMessage("error.mssr.duplicateBed", new String[] {
   				 chkDataMap.getString("END_DATE"),
   				 chkDataMap.getString("MSSR_NCNM"),
   				 chkDataMap.getString("BED_CODE"),
   				
			}, Locale.forLanguageTag(param.getString("_ep_locale")));	
   		 throw new HrsException(message); 
   	 }
	    //삭제
		if (!StringUtil.isEmpty(DeleteTime[0]) && DeleteTime.length>0) {
			param.put("sttusCode",ResveStatusConst.DBSTATUS.WORK_CANCL.toString());
			param.put("canclYn","Y");
			for (int i = 0 ; i < DeleteTime.length; i++) {
				 param.put("resveTime",DeleteTime[i]);
				 Map item = mssrDAO.selectResveItem(param);
				 param.put("RESVE_NO",item.get("resveNo").toString());
				
				    insertResult = mssrDAO.deleteResve(param); 
				 
					if(!(insertResult)) { 
						throw new HrsException("error.processFailure", true);
					 }		
					insertResult = mssrDAO.insertResveHist(param); 
					if(!(insertResult)) { 
						throw new HrsException("error.processFailure", true);
					 }	 
				
				sendSms(param);	
				param.remove("RESVE_NO");
					
			}
		}
			// data적용 성공여부
			result.setItemOne(insertResult);
			return result;
	}

	@Transactional
	public  ResponseResult deleteResve(DataEntity param) {
		  ResponseResult result = new ResponseResult(); 
		  DataEntity paramsMap = new DataEntity();
		  ArrayList<HashMap<String, String>> getListItems = (ArrayList<HashMap<String, String>>)JsonUtils.stringToJsonClass(param.getString("params"), ArrayList.class);
	      boolean updateResult = false;	 
		    for (int j = 0; j < getListItems.size(); j++) {
		    	paramsMap.putAll(getListItems.get(j));
		    	paramsMap.put("regEmpNo", param.getString("regEmpNo"));
		    	paramsMap.put("canclYn", "Y");
		    	paramsMap.put("sttusCode",ResveStatusConst.DBSTATUS.WORK_CANCL.toString());

		    	
		    	updateResult = mssrDAO.deleteResve(paramsMap); 
                 
				if(!(updateResult)) { 
					throw new HrsException("error.processFailure", true);
				 }	
				
				updateResult = mssrDAO.insertResveHist(paramsMap); 
				if(!(updateResult)) { 
					throw new HrsException("error.processFailure", true);
				 }
				
				sendSms(paramsMap);
		
           } 
        
		  
		
		result.setItemOne(updateResult);
		// data적용 성공여부
		return result;
	}
	
  public void sendSms(DataEntity param) {
	 // ResponseResult result = new ResponseResult(); 
	   Map SmsItem = mssrDAO.selectSmsInfoGet(param);
		if(!StringUtil.isEmpty(SmsItem.get("RESVE_EMPNO").toString())) {
	    	SmsItem.put("targetEmpno", SmsItem.get("RESVE_EMPNO").toString());
	       cspService.insertCspSMS(SmsItem, "csp.sms.adminResveCancel", Locale.forLanguageTag(param.getString("_ep_locale")));
	       cspService.insertCspSMS(SmsItem, "csp.sms.resveCancel", Locale.forLanguageTag(param.getString("_ep_locale")));
		}				
		
		if(!StringUtil.isEmpty(SmsItem.get("WAIT_EMPNO").toString())) {
			SmsItem.put("targetEmpno", param.get("WAIT_EMPNO"));
			cspService.insertCspSMS(SmsItem, "csp.sms.adminWaitCancel", Locale.forLanguageTag(param.getString("_ep_locale")));
			
			cspService.insertCspSMS(SmsItem, "csp.sms.waitCancel", Locale.forLanguageTag(param.getString("_ep_locale")));
				
		}
	  
  }
	
  public void dupChk(DataEntity param , DataEntity refResult) {
	    Map result = mssrDAO.selectResveCheck(param);
	    refResult.put("RESVE_CHECK" ,result.get("RESVE_CHECK").toString());
	    if (result.get("RESVE_CHECK").toString()!= "0") {
	       refResult.put("END_DATE" ,result.get("END_DATE").toString());
	       refResult.put("MSSR_NCNM" ,  result.get("MSSR_NCNM").toString());
	       refResult.put("BED_CODE" ,result.get("BED_CODE").toString());
	    }
	    
  }
  
			
}