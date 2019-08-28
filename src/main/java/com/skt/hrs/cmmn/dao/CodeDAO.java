package com.skt.hrs.cmmn.dao;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.pub.core.entity.DataEntity;


@Repository("codeDAO")
public class CodeDAO {

	private static final Logger logger = LoggerFactory.getLogger(CodeDAO.class);


	@Resource(name="sqlSession")
	private SqlSession sqlSession;
	

	/**
	 * 
	 * @설명 : 공통코드 조회 
	 * @작성일 : 2019.08.27
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public List selectCodeList(DataEntity param) {
		return sqlSession.selectList("cmmnCodeMapper.selectCodeList", param);
	}
	
}
