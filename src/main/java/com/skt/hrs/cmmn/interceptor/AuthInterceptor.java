package com.skt.hrs.cmmn.interceptor;

import java.io.IOException;
import java.io.Writer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.pub.core.constans.ResultConst;
import com.pub.core.entity.ResponseResult;
import com.pub.core.util.JsonUtils;

public class AuthInterceptor extends HandlerInterceptorAdapter {

	@Override	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		System.out.println("AuthInterceptor URI :" + request.getRequestURI());
		HttpSession session = request.getSession();
		if(session == null || session.getAttribute("LoginVo") == null) {			
			
			//TODO: 인증없음 noti필요
			//TODO:  직접 URL입력해도 ssoLogin타도록.
			
			
			String headerInfo = request.getHeader("X-Requested-With");
			if("XMLHttpRequest".equals(headerInfo)){
				response.setContentType("application/json;charset=UTF-8");
				response.setStatus(HttpStatus.OK.value());
				ResponseResult result = new ResponseResult();
				result.setResultCode(ResultConst.CODE.FORBIDDEN.toInt());
				result.setStatus(ResultConst.CODE.FORBIDDEN.toInt());
				result.setMessage("Login first.");
				Writer writer=null;
				try {
					writer = response.getWriter();
					writer.write(JsonUtils.objectToString(result));				
				} catch (IOException e) {
					e.printStackTrace();
				}finally{
					if(writer!=null){ try {writer.close();} catch (IOException e) {}};
				}
			}else {
				
				response.sendRedirect("".equals(request.getContextPath()) ? "/" : request.getContextPath());
			}
			
		}
		return true;
	}
}
