package com.skt.hrs.cmmn.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.pub.core.util.HttpUtil;
import com.skt.hrs.cmmn.vo.LoginVo;
import com.skt.hrs.user.service.UserService;
import com.skt.hrs.utils.StringUtil;

/**
 * 
 * @FileName  : CodeController.java
 * @프로그램 설명   : 공통코드 컨트롤러
 * @Date      : 2019. 8. 27. 
 * @작성자      : 
 * @변경이력    :
 */
@Controller
@RequestMapping(value = "/")
public class LoginController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	UserService userService;
	
	/**
	 * 
	 * @설명 : 개발중 테스트로그인 페이지 view 
	 * @작성일 : 2019.09.03
	 * @작성자 : P149365
	 * @param req
	 * @param res
	 * @return
	 * @throws Exception
	 * @변경이력 :
	 */
	@RequestMapping(value = "/testLogin")
	public String resveStatusView(HttpServletRequest req, HttpServletResponse res) throws Exception {		
		return "testSSOLogin";
	}
	
	/**
	 * 
	 * @설명 : SSO 로그인 처리 
	 * @작성일 : 2019.09.03
	 * @작성자 : P149365
	 * @param req
	 * @return
	 * @변경이력 :
	 */	
	@RequestMapping(value = "/ssoLogin")
	public String ssoLogin(HttpServletRequest req, HttpSession sess) {
			
		String paramUserid = req.getHeader("SM_USER");
		
		DataEntity param = new DataEntity();
		param.put("empno", paramUserid);
		//TODO: user정보 검색
		ResponseResult result = userService.selectUserInfo(param);
		Map user = result.getItem();
		//TODO: 세션에 세팅
		LoginVo loginVo = new LoginVo();
		loginVo.setEmpno(user.get("EMPNO").toString());
		loginVo.setHname(user.get("HNAME").toString());
		loginVo.setPlace(user.get("PLACE").toString());
		loginVo.settSex(user.get("T_SEX").toString());
		loginVo.setAuth( user.get("AUTH") == null ? 
				"" : user.get("AUTH").toString());	//구성원
		sess.setAttribute("LoginVo", loginVo);
		
		return "redirect:/resve/status";
				
	}
}
