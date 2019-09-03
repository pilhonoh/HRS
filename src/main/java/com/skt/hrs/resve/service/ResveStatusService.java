package com.skt.hrs.resve.service;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.cmmn.contants.ResveViewStatus;
import com.skt.hrs.cmmn.exception.HrsException;
import com.skt.hrs.cmmn.vo.LoginVo;
import com.skt.hrs.resve.dao.ResveStatusDAO;
import com.skt.hrs.utils.StringUtil;





@Service("resveStatusService")
public class ResveStatusService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="resveStatusDAO")
	private ResveStatusDAO resveStatusDAO;

	
	/**
	 * 
	 * @설명 : 사용자의 이번달 예약/대기 건수 조회 
	 * @작성일 : 2019.08.29
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectMonthCount(DataEntity param) {
		ResponseResult result = new ResponseResult();		
		result.setItemOne(resveStatusDAO.selectMonthCount(param));
		
		return result;
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
	public ResponseResult selectResveStatus(DataEntity param, LoginVo loginVo) {
		ResponseResult result = new ResponseResult();
		
		List<Map> list = resveStatusDAO.selectResveStatus(param);
		for(Map item : list) {
			item.put("LAST_STTUS",  getViewStatus(item, loginVo));
			item.remove("LAST_STTUS_CODE");
		}
		result.setItemList(list);
		return result;
	}
	
	/**
	 * 
	 * @설명 : 예약 등록
	 * @작성일 : 2019.09.03
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult registResveStatus(DataEntity param) {
		ResponseResult result = new ResponseResult();
		
		Map resveItem = resveStatusDAO.selectResveItem(param);
		
		// 예약가능한지 체크		
		if(resveItem != null) {
			
			// 상태체크
			if(!StringUtil.isEmpty((String) resveItem.get("RESVE_EMPNO"))) {
				throw new HrsException("invalid request");
			}		
			// 시간체크
			
			// 성별체크
			if(resveItem.get("MSSR_SEXDSTN").equals("F")	// 관리사가 여성이고 
					&& param.get("resveSexdstn").equals("M")) {		// 구성원이 남성이면 불가
				throw new HrsException("invalid request");
			}
			
			// 현황 update
			boolean updateResult = resveStatusDAO.updateResveStatus(param);
			
			// 이력 insert
			param.put("sttusCode", "STS01");
			param.put("targetEmpno", (String)param.get("resveEmpno"));
			boolean insertResult = resveStatusDAO.insertResveHist(param);
			
			result.setItemOne(updateResult && insertResult);
			
		}else {
			throw new HrsException("invalid request");
		}
		
		return result;
	}
	
	/**
	 * 
	 * @설명 : 예약/대기 취소 
	 * @작성일 : 2019.09.03
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult cancelResveStatus(DataEntity param) {
		ResponseResult result = new ResponseResult();
		
		Map resveItem = resveStatusDAO.selectResveItem(param);
		
		// 취소 가능한지 체크
		if(resveItem != null) {
			
			if(param.getString("cancelGbn").equals(ResveViewStatus.RESVE_COMPT.toString())) {	// 예약취소						
				//TODO: 시간체크
				
				// 현황 update
				param.put("resveEmpno", "");
				boolean updateResult = resveStatusDAO.updateResveStatus(param);
				
				// 이력 insert
				param.put("sttusCode", "STS02");	// STS02 : 예약취소
				param.put("targetEmpno", (String)resveItem.get("RESVE_EMPNO"));
				boolean insertResult = resveStatusDAO.insertResveHist(param);
				
				result.setItemOne(updateResult && insertResult);
				
				//TODO: 대기중인 구성원을 예약상태로 변경
				
				//TODO: SMS 등록
				
			}else if(param.getString("cancelGbn").equals(ResveViewStatus.WAIT.toString())) {	// 대기취소
				//TODO: 시간체크
			}else {
				throw new HrsException("invalid request");	// 예약or대기 상태가 아닌경우
			}									
						
		}else {
			throw new HrsException("invalid request");
		}
		
		return result;
	}
	
	/**
	 * 
	 * @설명 : 화면에 보이는 상태를 계산하여 반환한다.
	 * 	 	예약가능 : 예약자, 대기자가 없는 경우 
	 * 		예약완료 : 본인이 예약자인 경우
	 * 		예약불가 : 예약자, 대기자가 이미 등록 되어 있거나 기간(날짜,시간)이 지난 경우, 남성 구성원이 여성 관리사 근무 스케쥴 조회 시
	 * 		대기가능 : 예약자만 있는 경우
	 * 		대기중 : 본인이 대기자인 경우
	 * 		예약취소 : 본인이 예약을 취소한 경우
	 * 		대기취소 : 본인이 대기를 취소한 경우
	 * 		완료 : 헬스 케어를 완료한 경우
	 * @작성일 : 2019.08.29
	 * @작성자 : P149365
	 * @param map
	 * @return
	 * @변경이력 :
	 */
	private String getViewStatus(Map item, LoginVo loginVo) {
		String resveEmpno = (String) item.get("RESVE_EMPNO");
		String waitEmpno = (String) item.get("WAIT_EMPNO");
		String mssrSexdstn = (String) item.get("MSSR_SEXDSTN");
		String lastStatusCode = (String) item.get("LAST_STTUS_CODE");
		String myEmpno = loginVo.getEmpno();
		String mySexdstn = loginVo.gettSex();
		
		ResveViewStatus resultStatus = null;
		
		if(mySexdstn.equals("M") && mssrSexdstn.equals("F")) {
			//예약불가
			resultStatus = ResveViewStatus.RESVE_IMPRTY;
		}else if(StringUtil.isEmpty(resveEmpno) && StringUtil.isEmpty(waitEmpno)) {
			//예약가능
			resultStatus = ResveViewStatus.RESVE_POSBL;
		}else if(!StringUtil.isEmpty(resveEmpno)) {
			if(resveEmpno.equals(myEmpno)) {
				if(lastStatusCode.equals("STS05")) {
					// 완료
					resultStatus = ResveViewStatus.COMPT;
				}else {				
					//예약완료
					resultStatus = ResveViewStatus.RESVE_COMPT;
				}
			}else {				
				//대기가능
				resultStatus = ResveViewStatus.WAIT_POSBL;
			}
		}else if(!StringUtil.isEmpty(waitEmpno) && waitEmpno.equals(myEmpno)) {
			if(lastStatusCode.equals("STS05")) {
				// 완료
				resultStatus = ResveViewStatus.COMPT;
			}else {				
				//대기중
				resultStatus = ResveViewStatus.WAIT;
			}
		}else if(!StringUtil.isEmpty(resveEmpno) && !resveEmpno.equals(myEmpno) &&
			!StringUtil.isEmpty(waitEmpno) && !waitEmpno.equals(myEmpno)) {
			//예약불가
			resultStatus = ResveViewStatus.RESVE_IMPRTY;
		}
		
		return resultStatus.toString();
	}
}