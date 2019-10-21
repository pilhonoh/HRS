package com.skt.hrs.mssr.service;


import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.mssr.dao.MssrblacklistDAO;





@Service("mssrblacklistService")
public class MssrblacklistService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="mssrblacklistDAO")
	private MssrblacklistDAO mssrblacklistDAO;

	
	/**
	 * 
	 * @설명 : 헬스키퍼 리스트 조회
	 * @Date      : 2019. 9. 20. 
	 * @작성자    : YANG.H.R
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectMssrblacklistList(DataEntity param) {
		ResponseResult result = new ResponseResult();
		result.setItemList(mssrblacklistDAO.selectMssrblacklistList(param));
		return result;
	}

	/**
	 * 
	 * @설명 : No-show(블랙리스트) 케어완료 상태로 변경
	 * @Date      : 2019. 10. 21.
	 * @작성자    : YANG.H.R
	 * @변경이력 :
	 */
	@Transactional
	public ResponseResult mssrblacklistcareDelete(DataEntity param) {
		ResponseResult result = new ResponseResult();	
		
		String rowdata ="";
		
		rowdata = param.getString("rowData");
		String [] resveNo = rowdata.split("\\|");
		
		for(int i=0; i<resveNo.length; i++) {
			
			param.put("resveNo", resveNo[i]);
			
			result.setItemOne(mssrblacklistDAO.mssrblacklistnoshowDelete(param));
			result.setItemOne(mssrblacklistDAO.mssrblacklistcomptUpdate(param));
			result.setItemOne(mssrblacklistDAO.mssrblacklisthistInsert(param));
		}
		
		return result;
	}

	/**
	 * 
	 * @설명 : No-show(블랙리스트) No-Show 상태로 2주 패널티만 제외
	 * @Date      : 2019. 10. 21.
	 * @작성자    : YANG.H.R
	 * @변경이력 :
	 */
	@Transactional
	public ResponseResult mssrblacklistnoshowDelete(DataEntity param) {
		ResponseResult result = new ResponseResult();
		result.setItemOne(mssrblacklistDAO.mssrblacklistnoshowDelete(param));
		return result;
	}
	

}