package com.skt.hrs.mssr.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.pub.core.util.HttpUtil;
import com.skt.hrs.cmmn.vo.LoginVo;
import com.skt.hrs.mssr.service.MssrService;



/**
 * 
 * @FileName  : MssrController.java
 * @프로그램 설명   : 헬스케어 예약 시스템 - 관리사 MSSR(Messeur) 컨트롤러
 * @Date      : 2019. 9. 03. 
 * @작성자    : LEE.J.H
 * @변경이력  :
 */
@Controller
@RequestMapping(value = "/mssr")
public class MssrController {
	
	private static final Logger logger = LoggerFactory.getLogger(MssrController.class);
	
	@Autowired
	MssrService mssrService;
	
	
	
	/**
	 * 
	 * @설명 : 관리사 스케쥴 목록 view 호출
	 * @작성일 : 2019.09.03
	 * @작성자 : LEE.J.H
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @변경이력 :
	 */
	@RequestMapping(value = "/schedule")
	public ModelAndView resveStatueView(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		
		mav.setViewName("mssr/schedule");
		return mav;
	}
	
	
	/**
	 * 
	 * @설명 : 관리사 목록 조회
	 * @작성일 : 2019.09.04
	 * @작성자 : LEE.J.H
	 * @param req
	 * @return
	 * @변경이력 :
	 */
	@RequestMapping(value = "/getMssrList")
	public @ResponseBody ResponseResult getMssrList(HttpServletRequest req) {
		DataEntity param = HttpUtil.getServletRequestParam(req);
		return mssrService.getMssrList(param);
	}
	
	

}
