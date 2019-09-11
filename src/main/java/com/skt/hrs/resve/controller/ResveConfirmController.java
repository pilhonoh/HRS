package com.skt.hrs.resve.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.pub.core.util.HttpUtil;
import com.skt.hrs.resve.service.ResveConfirmService;

/**
 * 
 * @FileName  : ResveController.java
 * @프로그램 설명   : 헬스케어 예약확인 시스템 컨트롤러
 * @Date      : 2019. 9. 10. 
 * @작성자      : 
 * @변경이력    :
 */
@Controller
@RequestMapping(value = "/resve")
public class ResveConfirmController {
	
	@Autowired
	ResveConfirmService resveConfirmService;

	/**
	 * 
	 * @설명 : 예약확인 view 
	 * @작성일 : 2019.09.10
	 * @작성자 : P149365
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @변경이력 :
	 */
	@RequestMapping(value = "/confirm")
	public String resveConfirmView(HttpServletRequest req, HttpServletResponse res) throws Exception {		
		return "resve/resveConfirm";
	}
	
	
	@RequestMapping(value = "/getResve")
	public @ResponseBody ResponseResult selectResveConfirm(HttpServletRequest req, HttpSession sess) {
		DataEntity param = HttpUtil.getServletRequestParam(req);
		
		//공용사번 체크?
		//사옥 체크?
		
		return resveConfirmService.selectWorkList(param);
	}
}
