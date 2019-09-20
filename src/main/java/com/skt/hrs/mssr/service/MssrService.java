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
		String startDate ="";
		String endDate = "";
		int startTime = 0;
		int endTime = 0;
		long days = 0;
	    boolean  insertResult = false;
        ArrayList list = (ArrayList)JsonUtils.stringToJsonClass(param.getString("params"), ArrayList.class);
        HashMap<String,String > paramsMap = new HashMap<String,String >() ;
        param.remove("params");
    	 for (int k = 0; k < list.size(); k++) {
    		 paramsMap =(HashMap<String, String>) (list.get(k)) ;
    		 startDate =paramsMap.get("startDate");
     		 endDate = paramsMap.get("endDate") ;
     		 startTime = Integer.parseInt(paramsMap.get("startTimeCode")) ;
     		 endTime =  Integer.parseInt(paramsMap.get("endTimeCode"));
        	 days = DateUtil.getDateDiff(startDate, endDate );
             param.put("sttusCode",ResveStatusConst.DBSTATUS.WORK.toString());
             param.put("fromDate",startDate.replaceAll("-", "")); 
             param.put("toDate",endDate.replaceAll("-", ""));  
             int cnt = mssrDAO.selectScheduleListTotalCount(param);
            
             if(cnt > 1) { 
					String message = messageSource.getMessage("error.duplicatMssrSchedule", new String[] {

					}, Locale.forLanguageTag(param.getString("_ep_locale")));
					throw new HrsException(message, true);
			  }  
             
             for (int i = 0; i <= days; i++) {
				param.put("resveDate",DateUtil.getDateAdd(startDate,i));
				for (int j = startTime ; j <= endTime; j++) {
					param.put("resveTime",j);
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
	    String[] InsertTime = param.getString("insertTime").replaceAll("\"","").replaceAll("[\\[\\]]","").split(",");
		String[] DeleteTime = param.getString("deleteTime").replaceAll("\"","").replaceAll("[\\[\\]]","").split(",");
        //HashMap<String,String > paramsMap = new HashMap<String,String >() ;
        param.remove("insertTime");
        param.remove("deleteTime");
       
		if( !StringUtil.isEmpty(InsertTime[0]) && InsertTime.length >0) {
			 param.put("sttusCode",ResveStatusConst.DBSTATUS.WORK.toString());
			for (int i = 0 ; i < InsertTime.length; i++) {
				param.put("resveTime",InsertTime[i]);
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
	    //삭제
		if (!StringUtil.isEmpty(DeleteTime[0]) && DeleteTime.length>0) {
			param.put("sttusCode",ResveStatusConst.DBSTATUS.WORK_CANCL.toString());
			param.put("canclYn","Y");
			for (int i = 0 ; i < DeleteTime.length; i++) {
				 param.put("resveTime",DeleteTime[i]);
				 Map item = mssrDAO.selectResveItem(param);
				 param.put("RESVE_NO",item.get("RESVE_NO").toString());
				
				 insertResult = mssrDAO.deleteResve(param); 
				 
					if(!(insertResult)) { 
						throw new HrsException("error.processFailure", true);
					 }		
					insertResult = mssrDAO.insertResveHist(param); 
					if(!(insertResult)) { 
						throw new HrsException("error.processFailure", true);
					 }	 
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
		//String[] resveNo = param.getString("params").replaceAll("\"","").replaceAll("[\\[\\]]","").split(",");
		  ArrayList list = (ArrayList)JsonUtils.stringToJsonClass(param.getString("params"), ArrayList.class);
	      Map resveMap = null;
	      String strResveNo = "";
	      String [] resveNo=null;
		  HashMap<String,String > paramsMap = new HashMap<String,String >() ;
		  param.remove("params");
	      boolean updateResult = false;
		 for (int i = 0; i < list.size(); i++) {
			 paramsMap =(HashMap<String, String>) (list.get(i)) ;
		     param.put("sttusCode",ResveStatusConst.DBSTATUS.WORK_CANCL.toString());
			 param.put("resveDate",paramsMap.get("resveDate"));
			 param.put("mssrEmpno",paramsMap.get("mssrEmpno"));
			 param.put("bldCode",paramsMap.get("bldCode"));
			 resveMap = mssrDAO.selectResveItemMultString(param);
		     strResveNo = (String)resveMap.get("RESVE_NO").toString();
		     resveNo = strResveNo.split(","); 
			 if(resveNo.length == 0 && !StringUtil.isEmpty(strResveNo)) 
			 {
				throw new HrsException("error.processFailure", true);
			 }
		     for (int j = 0; j < resveNo.length; j++) {
				param.put("RESVE_NO",resveNo[j]);
				updateResult = mssrDAO.deleteResve(param); 
				if(!(updateResult)) { 
					throw new HrsException("error.processFailure", true);
				 }	
				
				updateResult = mssrDAO.insertResveHist(param); 
				if(!(updateResult)) { 
					throw new HrsException("error.processFailure", true);
				 }
			} 
		}
		result.setItemOne(updateResult);
		// data적용 성공여부
		return result;
	}
	
	
			
}