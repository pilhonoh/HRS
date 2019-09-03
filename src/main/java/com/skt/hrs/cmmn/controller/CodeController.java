package com.skt.hrs.cmmn.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.pub.core.util.HttpUtil;
import com.skt.hrs.cmmn.service.CodeService;



/**
 * 
 * @FileName  : CodeController.java
 * @프로그램 설명   : 공통코드 컨트롤러
 * @Date      : 2019. 8. 27. 
 * @작성자      : 
 * @변경이력    :
 */
@Controller
@RequestMapping(value = "/cmmn")
public class CodeController {
	
	private static final Logger logger = LoggerFactory.getLogger(CodeController.class);
	
	@Autowired
	CodeService codeService;
	
	
	/**
	 * 
	 * @설명 : 공통코드 목록 조회
	 * @작성일 : 2019.08.28
	 * @작성자 : P149365
	 * @param req
	 * @return
	 * @변경이력 :
	 */
	@RequestMapping(value = "/codeList")
	public @ResponseBody ResponseResult codeList(HttpServletRequest req) {
		DataEntity param = HttpUtil.getServletRequestParam(req);		
		return codeService.selectUserMenuList(param);
	}
	
	
	/**
	 * 
	 * @설명 : 공통코드 전체 목록 조회
	 * @작성일 : 2019.08.30
	 * @작성자 : LEE.J.H
	 * @param req
	 * @return
	 * @변경이력 :
	 */
	@RequestMapping(value = "/allCodeList")
	public @ResponseBody ResponseResult selectAllCodeList(HttpServletRequest req) {
		DataEntity param = HttpUtil.getServletRequestParam(req);		
		return codeService.selectAllCodeList(param);
	}
	

}
