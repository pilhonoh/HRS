package com.skt.hrs.cmmn.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.skt.hrs.cmmn.exception.HrsException;
import com.skt.hrs.cmmn.vo.LoginVo;

public class AuthInterceptor extends HandlerInterceptorAdapter {

	@Override	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		System.out.println("AuthInterceptor URI :" + request.getRequestURI());
		HttpSession session = request.getSession();
		if(session == null || session.getAttribute("LoginVo") == null) {			
			
			//TODO: 인증없음 noti필요
			response.sendRedirect(request.getContextPath());
		}
		return true;
	}
}
