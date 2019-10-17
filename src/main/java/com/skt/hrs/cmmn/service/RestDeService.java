package com.skt.hrs.cmmn.service;


import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.pub.core.util.JsonUtils;
import com.skt.hrs.cmmn.contants.ResveStatusConst;
import com.skt.hrs.cmmn.dao.RestDeDAO;
import com.skt.hrs.cmmn.exception.HrsException;
import com.skt.hrs.utils.DateUtil;





@Service("restDeService")
public class RestDeService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="restDeDAO")
	private RestDeDAO restDeDAO;

	/**
	 * 
	 * @설명 : 휴일  조회
	 * @작성일 : 2019.10.07
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectRestDeList(DataEntity param) {
		ResponseResult result = new ResponseResult();
		result.setItemList(restDeDAO.selectRestDeList(param));
		return result;
	}
	
	/**
	 * 
	 * @설명 : 휴일 상세 조회
	 * @작성일 : 2019.10.07
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectRestDeItem(DataEntity param) {
		ResponseResult result = new ResponseResult();
		 result.setItemOne(restDeDAO.selectRestDeItem(param));
		return result;
	}
	

	/**
	 * 
	 * @설명 : 휴일 동록
	 * @작성일 : 2019.10.07
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	@Transactional
	public ResponseResult saveRestDe(DataEntity param) {
		ResponseResult result = new ResponseResult();
		boolean  saveResult = false;
		String saveStat = param.getString("saveStat");		
		int days = 0 ; 
		String startDate =param.getString("startDate"), endDate =  param.getString("endDate");
		String workDate = "";
		if (saveStat.equals("C")) {
        	days = DateUtil.getDateDiff(startDate , endDate);
        	param.remove("startDate");
        	param.remove("endDate");

        	for (int i = 0; i<= days; i++) {
        		workDate = DateUtil.getDateAdd(startDate,i);
        		param.put("restDeDate",workDate.replaceAll("-", ""));
        		
        		saveResult = restDeDAO.insertRestDe(param); 
			 	if(!(saveResult)) { 
					throw new HrsException("error.processFailure", true);
				 } 		 	
          }
			
		}else if (saveStat.equals("U")) {
			saveResult = restDeDAO.updateRestDe(param);
		}
		if(!(saveResult)) { 
			throw new HrsException("error.processFailure", true);
		 } 	
   	
		return result;
	}
	

	@Transactional
	public  ResponseResult deleteRestDe(DataEntity param) {
		  ResponseResult result = new ResponseResult(); 
		  String[] deleteEmpNo = param.split("deleteRestNo",",");
	      boolean updateResult = false;	 
		    for (int i = 0; i < deleteEmpNo.length; i++) {
		    	param.put("restDeNo",deleteEmpNo[i]);
		    	param.put("usedYn","N");
		    	updateResult = restDeDAO.deleteRestDe(param); 
                 
				if(!(updateResult)) { 
					throw new HrsException("error.processFailure", true);
				 }		
           } 
		result.setItemOne(updateResult);
		// data적용 성공여부
		return result;
	}
	
	/**
	 * 
	 * @설명 : 휴일 중복 체크 
	 * @작성일 : 2019.10.07
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectRestDeCheck(DataEntity param) {	
		ResponseResult result = new ResponseResult();
		boolean  checkResult =false;
		param.put("startDate",param.getString("startDate").replaceAll("-", ""));
    	param.put("endDate", param.getString("endDate").replaceAll("-", ""));
		int restDeCheckCnt = restDeDAO.selectRestCheck(param);
	
		if(restDeCheckCnt>=1) {
			checkResult = true;
		}
		result.setItemOne(checkResult);
		return result;
	}
}