package com.skt.hrs.mssr.service;


import java.text.SimpleDateFormat;
import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.cmmn.contants.ResveStatusConst;
import com.skt.hrs.cmmn.exception.HrsException;
import com.skt.hrs.mssr.dao.MssrDAO;
import com.skt.hrs.utils.DateUtil;




@Service("mssrService")
public class MssrService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="mssrDAO")
	private MssrDAO mssrDAO;
	
	
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
		String startDate = param.getString("startDate");
		String endDate = param.getString("endDate");
		int startTime = param.getInt("startTimeCode");
		int endTime = param.getInt("endTimeCode");
		long days = DateUtil.getDateDiff(startDate, endDate);
	    boolean  insertResult = false;
        param.put("sttusCode",ResveStatusConst.DBSTATUS.WORK.toString());
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
		result.setItemOne(insertResult);
		// data적용 성공여부
		
		return result;
	}

	@Transactional
	public  ResponseResult deleteResve(DataEntity param) {
		ResponseResult result = new ResponseResult();
		
		param.put("sttusCode",ResveStatusConst.DBSTATUS.WORK_CANCL.toString());
		param.put("canclYn","Y");
		
		boolean updateResult = mssrDAO.deleteResve(param); 
		if(!(updateResult)) { 
			throw new HrsException("error.processFailure", true);
		 } 
		result.setItemOne(updateResult);
		// data적용 성공여부
		
		return result;
	}
			
}