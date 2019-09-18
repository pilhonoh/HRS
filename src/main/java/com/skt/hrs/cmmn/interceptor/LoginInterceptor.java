package com.skt.hrs.cmmn.interceptor;

import java.io.IOException;
import java.io.Writer;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.pub.core.constans.ResultConst;
import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.pub.core.util.JsonUtils;
import com.skt.hrs.cmmn.vo.LoginVo;
import com.skt.hrs.user.service.UserService;

public class LoginInterceptor extends HandlerInterceptorAdapter {

	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	UserService userService;
	
	
	@Override	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		logger.info("LoginInterceptor URI :" + request.getRequestURI());
		
		HttpSession session = request.getSession();
		if(session == null || session.getAttribute("LoginVo") == null) {			
			
			String paramUserid = getUserId(request);
			
			//19사번 P사번 접근불가
//			if(paramUserid.startsWith("P") || paramUserid.startsWith("19")) {
//				response.sendRedirect("/error/403");
//				return false;
//			}
			
			DataEntity param = new DataEntity();
			param.put("empno", paramUserid);

			ResponseResult result = userService.selectUserInfo(param);
			Map user = result.getItem();				
			
			if(user != null) {
				LoginVo loginVo = new LoginVo();
				loginVo.setEmpno(user.get("EMPNO").toString());
				loginVo.setHname(user.get("HNAME").toString());
				loginVo.setPlace(user.get("PLACE").toString());
				loginVo.settSex(user.get("T_SEX").toString());
				loginVo.setAuth( user.get("AUTH_CODE") == null ? "" : user.get("AUTH_CODE").toString());
				
				HttpSession sess = request.getSession();
				sess.setAttribute("LoginVo", loginVo);
								
			}else {
				String headerInfo = request.getHeader("X-Requested-With");
				if ("XMLHttpRequest".equals(headerInfo)) {
					response.setContentType("application/json;charset=UTF-8");
					response.setStatus(HttpStatus.OK.value());
					result = new ResponseResult();
					result.setResultCode(ResultConst.CODE.FORBIDDEN.toInt());
					result.setStatus(ResultConst.CODE.FORBIDDEN.toInt());
					result.setMessage("Login first.");
					Writer writer = null;
					try {
						writer = response.getWriter();
						writer.write(JsonUtils.objectToString(result));
					} catch (IOException e) {
						e.printStackTrace();
					} finally {
						if (writer != null) {
							try {writer.close();} catch (IOException e) {}
						};
					}
				} else {

					response.sendRedirect("/error/403");
				}
			}
			
		}
		return true;
	}
	
	/**
	 * 
	 * @설명 : sso를 통하여 userId 얻기 
	 * @작성일 : 2019.09.16
	 * @작성자 : P149365
	 * @param request
	 * @return
	 * @변경이력 :
	 */
	private String getUserId(HttpServletRequest request) {

		String paramUserid = "";
		HttpSession session = request.getSession();
		String adminsetUser = (String) session.getAttribute("adminsetuser");

		if (adminsetUser != null && adminsetUser != "") {
			// 로컬이든 운영이든 모든 가장을 통해서 들어오면 그것이 우선
			paramUserid = adminsetUser;
		} else {

			try {
				paramUserid = request.getHeader("SM_USER");
			} catch (Exception e) {

			}

		}
		if (paramUserid == null || "".equals(paramUserid)) {

			// local에서 admin_login을 통해서 들어오지 않았다는 뜻
			// window 로긴 계정을 얻는다
			// paramUserid = "P021090";
			paramUserid = System.getProperty("user.name");

			if (paramUserid.indexOf("\\") != -1) {

				String[] arrParamUserid = paramUserid.split("\\");
				if (arrParamUserid.length > 0) {
					paramUserid = arrParamUserid[1];
				}
			}

		}
		/*
		 * Enumeration<String> headerNameEnum = request.getHeaderNames();
		 * 
		 * String headerName; while(headerNameEnum.hasMoreElements()) { headerName =
		 * headerNameEnum.nextElement(); logger.debug("header key [{}]  : val [{}]" ,
		 * headerName , request.getHeader(headerName)); }
		 */

		logger.debug("header val getUserId \t paramUserid :  " + paramUserid);
		paramUserid = (paramUserid == null ? "" : paramUserid).toUpperCase();
		paramUserid = paramUserid.replace("SKT\\", "");

		paramUserid = paramUserid != null && !"".equals(paramUserid) && !"wpadmin".equals(paramUserid)
				&& !"wpadmin01".equals(paramUserid) && !"wpadmin02".equals(paramUserid) ? paramUserid : "";

		logger.debug("getUserId \t paramUserid :  " + paramUserid);
		return paramUserid;
	}
}
