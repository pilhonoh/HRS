package com.skt.hrs.user.service;


import java.util.HashMap;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.skt.hrs.user.dao.AdminDAO;





@Service("adminService")
public class AdminService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="adminDAO")
	private AdminDAO adminDAO;

	
	
	
	
	
	
}