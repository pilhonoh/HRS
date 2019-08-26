package com.skt.hrs.user.dao;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;




@Repository("adminDAO")
public class AdminDAO {

	private static final Logger logger = LoggerFactory.getLogger(AdminDAO.class);


	@Resource(name="sqlSession")
	private SqlSession sqlSession;
	

	
}
