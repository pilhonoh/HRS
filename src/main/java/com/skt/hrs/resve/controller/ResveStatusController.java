package com.skt.hrs.resve.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;



/**
 * 
 * @FileName  : ResveController.java
 * @프로그램 설명   : 헬스케어 예약 시스템 컨트롤러
 * @Date      : 2019. 8. 27. 
 * @작성자      : 
 * @변경이력    :
 */
@Controller
@RequestMapping(value = "/resve")
public class ResveStatusController {
	
	private static final Logger logger = LoggerFactory.getLogger(ResveStatusController.class);
	
	//@Autowired
	//UserService userService;
	
	
	/**
	 * 
	 * @설명 : 예약현황 view 
	 * @작성일 : 2019.08.28
	 * @작성자 : P149365
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @변경이력 :
	 */
	@RequestMapping(value = "/status")
	public String resveStatueView(HttpServletRequest request, HttpServletResponse response) throws Exception {		
		return "resve/resveStatus";
	}
	

}
