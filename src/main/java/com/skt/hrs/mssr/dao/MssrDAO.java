package com.skt.hrs.mssr.dao;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.pub.core.entity.DataEntity;


@Repository("mssrDAO")
public class MssrDAO {

	private static final Logger logger = LoggerFactory.getLogger(MssrDAO.class);


	@Resource(name="sqlSession")
	private SqlSession sqlSession;
	
	/**
	 * 
	 * @설명 : 관리사 목록 조회 
	 * @작성일 : 2019.09.04
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public List getMssrList(DataEntity param) {
		return sqlSession.selectList("mssrMapper.getMssrList", param);
	}
	
	
	
	/**
	 * 
	 * @설명 : 관리사 스케쥴 리스트 조회 
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public List selectScheduleList(DataEntity param) {
		return sqlSession.selectList("mssrMapper.selectScheduleList", param);
	}
	
	
	/**
	 * 
	 * @설명 : 관리사 스케쥴 리스트 TOTAL COUNT 조회 
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public int selectScheduleListTotalCount(DataEntity param) {
		return sqlSession.selectOne("mssrMapper.selectScheduleListTotalCount", param);
	}

	
}
