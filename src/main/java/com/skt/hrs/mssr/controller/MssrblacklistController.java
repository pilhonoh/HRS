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
import com.skt.hrs.mssr.service.MssrblacklistService;



/**
 * 
 * @FileName  :  MssrblacklistController.java
 * @프로그램 설명   : No-show(블랙리스트) 관리
 * @Date      : 2019. 10. 11. 
 * @작성자    : YANG.H.R
 * @변경이력  :
 */
@Controller
@RequestMapping(value = "/mssr")
@SuppressWarnings("unchecked")
public class MssrblacklistController {
	
	private static final Logger logger = LoggerFactory.getLogger(MssrblacklistController.class);
	
	@Autowired
	MssrblacklistService  mssrblacklistService;
	
	
	
	/**
	 * 
	 * @설명 : No-show(블랙리스트) 목록 view 호출
	 * @Date      : 2019. 10. 11.
	 * @작성자    : YANG.H.R
	 * @변경이력 :
	 */
	@RequestMapping(value = "/mssrblacklist")
	public ModelAndView mssrMssrblacklistView(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		
		mav.setViewName("mssr/mssrblacklist");
		return mav;
	}	
	
	/**
	 * 
	 * @설명 : No-show(블랙리스트) 리스트 조회
	 * @Date      : 2019. 10. 11.
	 * @작성자    : YANG.H.R
	 * @변경이력 :
	 */
	@RequestMapping(value = "/selectMssrblacklistList")
	public @ResponseBody ResponseResult selectMssrblacklistList(HttpServletRequest request, HttpSession sess) throws Exception {
		DataEntity param = HttpUtil.getServletRequestParam(request);

		int rowPerPage = param.getInt("rowPerPage");
		int startRow = param.getInt("startRow");
		String bldCode = param.getString("bldCode");
		String userName = param.getString("userName");
		
		param.put("rowPerPage", rowPerPage);
		param.put("startRow", startRow);
		param.put("bldCode", bldCode);
		param.put("userName", userName);
		
		ResponseResult result = new ResponseResult();
		result = mssrblacklistService.selectMssrblacklistList(param);

		return result;
	}

}
