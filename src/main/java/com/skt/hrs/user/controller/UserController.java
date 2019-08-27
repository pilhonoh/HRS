package com.skt.hrs.user.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.skt.hrs.user.service.UserService;



/**
 * 
 * @FileName  : UserController.java
 * @���α׷� ����   : �ｺ�ɾ� ���� �ý��� ����� ȭ��  ��Ʈ�ѷ�
 * @Date      : 2019. 8. 27. 
 * @�ۼ���      : 
 * @�����̷�    :
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;
	
	
	/**
	 * 
	 * @Method Name : reservStatusView
	 * @Method ����      : ����� ���� ��Ȳ view
	 * @�ۼ���        : 2019. 8. 27. 
	 * @�ۼ���        : 
	 * @�����̷�      :
	 * @param req
	 * @return ModelAndView
	 */
	@RequestMapping(value = "/reservStatus")
	public ModelAndView reservStatusView(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("user/reservStatus");
		
		return mav;
	}
	
	
	
	/**
	 * 
	 * @Method Name : reservListView
	 * @Method ����      : ����� ���� ����Ʈ view
	 * @�ۼ���        : 2019. 8. 27. 
	 * @�ۼ���        : 
	 * @�����̷�      :
	 * @param req
	 * @return ModelAndView
	 */
	@RequestMapping(value = "/reservList")
	public ModelAndView reservListView(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("user/reservList");
		
		return mav;
	}
	
	
	
	

}
