package com.skt.hrs.cmmn.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.skt.hrs.cmmn.vo.LoginVo;

public class AuthInterceptor extends HandlerInterceptorAdapter {

	@Override	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		System.out.println("AuthInterceptor URI :" + request.getRequestURI());
		HttpSession session = request.getSession();
		if(session == null || session.getAttribute("LoginVo") == null) {			
			// FIXME: 로그인 개발 후, 수정필요.
			LoginVo loginVo = new LoginVo();
			loginVo.setEmpno("P149365");
			loginVo.setHname("구성원1");
			loginVo.setAuth("AUT04");	//구성원
			loginVo.settSex("M");
			session.setAttribute("LoginVo", loginVo);
		}
		return true;
	}
}