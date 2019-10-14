package com.skt.hrs.charger.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.pub.core.entity.DataEntity;


@Repository("chargerDAO")
public class ChargerDAO {

	private static final Logger logger = LoggerFactory.getLogger(ChargerDAO.class);


	@Resource(name="sqlSession")
	private SqlSession sqlSession;
	
	
	
	
	
	/**
	 * 
	 * @설명 : 관리사 스케쥴 리스트 조회 
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	
	  public List selectChargerList(DataEntity param) { 
		  return sqlSession.selectList("chargerMapper.selectChargerList", param);
	  }
	 
	
	
	/**
	 * 
	 * @설명 : 관리사 사번 중복 체크  조회 
	 * @작성일 : 2019.09.05
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	
	  public int selectEmpNoCheck(DataEntity param) { 
		  return sqlSession.selectOne("chargerMapper.selectEmpNoCheck", param); 
	  }
	 
	/**
	 * 
	 * @설명 :  등록 
	 * @작성일 : 2019.09.10
	 * @작성자 : LEE.Y.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	
	  public boolean insertCharger(DataEntity param) { 
		  int result = sqlSession.insert("chargerMapper.insertCharger", param); 
		  if(result == 1) { 
			  return true; 
		  } 
		  return false; 
	}
	  public boolean updateCharger(DataEntity param) { 
		  int result = sqlSession.update("chargerMapper.updateCharger", param); 
		  if(result == 1) { 
			  return true; 
		  } 
		  return false; 
	}
	  
	  /**
		 * 
		 * @설명 : 관리사  정보 
		 * @작성일 : 2019.09.05
		 * @작성자 : LEE.J.H
		 * @param param
		 * @return
		 * @변경이력 :
		 */
		public Map selectChargerItem(DataEntity param) {
			return sqlSession.selectOne("chargerMapper.selectChargerItem", param);
		}
	
}
