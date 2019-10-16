package com.skt.hrs.mssr.dao;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.pub.core.entity.DataEntity;


@Repository("mssrblacklistDAO")
public class MssrblacklistDAO {

	private static final Logger logger = LoggerFactory.getLogger(MssrblacklistDAO.class);


	@Resource(name="sqlSession")
	private SqlSession sqlSession;
	
	
	/**
	 * 
	 * @설명 : 헬스키퍼 리스트 조회 
	 * @Date : 2019. 9. 20. 
	 * @작성자 : YANG.H.R
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public List selectMssrblacklistList(DataEntity param) {
		return sqlSession.selectList("mssrblacklistMapper.selectMssrblacklistList", param);
	}

	
}
