package com.skt.hrs.cmmn.service;


import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.cmmn.dao.CodeDAO;





@Service("codeService")
public class CodeService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="codeDAO")
	private CodeDAO codeDAO;

	
	/**
	 * 
	 * @설명 : 공통코드 조회
	 * @작성일 : 2019.08.27
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectUserMenuList(DataEntity param) {
		ResponseResult result = new ResponseResult();
		//int totalCnt = portalGnbDao.selectUserMenuListTotalCnt(param);
		
		result.setItemList(codeDAO.selectCodeList(param));
		
		return result;
	}
	
	
	/**
	 * 
	 * @설명 : 공통코드 전체 조회
	 * @작성일 : 2019.08.30
	 * @작성자 : LEE.J.H.
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectAllCodeList(DataEntity param) {
		ResponseResult result = new ResponseResult();
		result.setItemList(codeDAO.selectAllCodeList(param));
		
		return result;
	}
	
	
	
	
}