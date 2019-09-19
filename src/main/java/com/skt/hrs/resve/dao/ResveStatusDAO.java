package com.skt.hrs.resve.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.pub.core.entity.DataEntity;
import com.skt.hrs.cmmn.exception.HrsException;


@Repository("resveStatusDAO")
@SuppressWarnings({"rawtypes", "unused"})
public class ResveStatusDAO {
	
	private static final Logger logger = LoggerFactory.getLogger(ResveStatusDAO.class);


	@Resource(name="sqlSession")
	private SqlSession sqlSession;
	

	/**
	 * 
	 * @설명 : 사용자의 이번달 예약/대기 건수 조회 
	 * @작성일 : 2019.08.29
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public Map selectMonthCount(DataEntity param) {
		return sqlSession.selectOne("resveStatusMapper.selectMonthCount", param);
	}
	
	/**
	 * 
	 * @설명 : 사용자의 특정일 예약/대기 건수 조회 
	 * @작성일 : 2019.09.05
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public Map selectDayCount(DataEntity param) {
		return sqlSession.selectOne("resveStatusMapper.selectDayCount", param);
	}
	
	/**
	 * 
	 * @설명 : 예약현황 조회 
	 * @작성일 : 2019.08.29
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */	
	public List selectResveStatus(DataEntity param) {
		return sqlSession.selectList("resveStatusMapper.selectResveStatus", param);
	}
	
	/**
	 * 
	 * @설명 : 예약 단건 조회
	 * @작성일 : 2019.09.02
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public Map selectResveItem(DataEntity param) {
		return sqlSession.selectOne("resveStatusMapper.selectResveItem", param);
	}
	
	/**
	 * 
	 * @설명 : 예약상태변경 
	 * @작성일 : 2019.09.03
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public boolean updateResveStatus(DataEntity param) {
		int result = sqlSession.update("resveStatusMapper.updateResveStatus", param);
		if(result == 1) {
			return true;
		}else {
			if(result > 1) {
				throw new HrsException("error.processFailure", true);
			}
		}
		return false;
	}
	
//	test
	/**
	 * 
	 * @설명 : 예약이력등록 
	 * @작성일 : 2019.09.03
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public boolean insertResveHist(DataEntity param) {
		int result = sqlSession.insert("resveStatusMapper.insertResveHist", param);
		if(result == 1) {
			return true;
		}
		return false;
	}
}
