package com.skt.hrs.user.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.pub.core.entity.DataEntity;




@Repository("userDAO")
public class UserDAO {

	private static final Logger logger = LoggerFactory.getLogger(UserDAO.class);


	@Resource(name="sqlSession")
	private SqlSession sqlSession;
	

	/**
	 * 
	 * @설명 : 사용자정보조회 
	 * @작성일 : 2019.09.03
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public Map selectUserInfo(DataEntity param) {
		return sqlSession.selectOne("hrsuserMapper.selectUserInfo", param);
	}
}
