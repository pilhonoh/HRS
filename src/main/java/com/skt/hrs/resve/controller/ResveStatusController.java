package com.skt.hrs.resve.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.pub.core.util.HttpUtil;
import com.skt.hrs.cmmn.service.CodeService;
import com.skt.hrs.cmmn.vo.LoginVo;
import com.skt.hrs.resve.service.ResveStatusService;



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
	
	@Autowired
	ResveStatusService resveStatusService;
	
	@Autowired
	CodeService codeService;
	
	
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
	public String resveStatueView(HttpServletRequest req, HttpServletResponse res) throws Exception {		
		return "resve/resveStatus";
	}
	
	@RequestMapping(value = "/resveTable")
	public String resveTableView(HttpServletRequest req, HttpSession sess, Model model) throws Exception {	
		DataEntity param = HttpUtil.getServletRequestParam(req);
		LoginVo loginVo = (LoginVo) sess.getAttribute("LoginVo");
		ResponseResult statusResult = resveStatusService.selectResveStatus(param, loginVo);
		
		param.put("codeTyl", "BED");
		param.put("codeTys", param.get("bldCode").toString());
		ResponseResult bedResult = codeService.selectUserMenuList(param);
		
		model.addAttribute("bedList", bedResult.getList());
		model.addAttribute("statusList", statusResult.getList());
		
		return "resve/resveTable";
	}
	
	/**
	 * 
	 * @설명 : 사용자의 이번달 예약/대기 건수 조회 
	 * @작성일 : 2019.08.29
	 * @작성자 : P149365
	 * @param req
	 * @param sess
	 * @return
	 * @변경이력 :
	 */
	@RequestMapping(value = "/monthCnt")
	public @ResponseBody ResponseResult selectMonthCount(HttpServletRequest req, HttpSession sess) {
		DataEntity param = HttpUtil.getServletRequestParam(req);
		LoginVo loginVo = (LoginVo) sess.getAttribute("LoginVo");
		param.put("empno", loginVo.getEmpno());
		return resveStatusService.selectMonthCount(param);
	}
	
	@RequestMapping(value = "/getStatus")
	public @ResponseBody ResponseResult selectResveStatus(HttpServletRequest req, HttpSession sess) {
		DataEntity param = HttpUtil.getServletRequestParam(req);
		LoginVo loginVo = (LoginVo) sess.getAttribute("LoginVo");
		//param.put("empno", loginVo.getEmpno());
		return resveStatusService.selectResveStatus(param, loginVo);
	}

}
