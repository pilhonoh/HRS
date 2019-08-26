package com.skt.hrs.user.service;


import java.util.HashMap;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.skt.hrs.user.dao.UserDAO;





@Service("userService")
public class UserService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="userDAO")
	private UserDAO userDAO;

	
	
	
	
	
	
}