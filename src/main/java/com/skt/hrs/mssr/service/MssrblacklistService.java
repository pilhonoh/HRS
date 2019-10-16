package com.skt.hrs.mssr.service;


import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
	

}