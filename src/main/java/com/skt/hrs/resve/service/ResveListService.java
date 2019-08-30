package com.skt.hrs.resve.service;


import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.resve.dao.ResveListDAO;





@Service("resveListService")
public class ResveListService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="resveListDAO")
	private ResveListDAO resveListDAO;

	
	/**
	 * 
	 * @설명 : 예약현황리스트 조회
	 * @작성일 : 2019.08.29
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectResveList(DataEntity param) {
		ResponseResult result = new ResponseResult();
		result.setItemList(resveListDAO.selectResveList(param));
		return result;
	}
	
	
	
	/**
	 * 
	 * @설명 : 예약현황리스트 TOTAL COUNT 조회
	 * @작성일 : 2019.08.30
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public int selectResveListTotalCount(DataEntity param) {
		int result = resveListDAO.selectResveListTotalCount(param);
		return result;
	}
	
	
	
	
}