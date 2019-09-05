package com.skt.hrs.resve.service;


import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.cmmn.contants.ResveStatusConst;
//import com.skt.hrs.cmmn.contants.ResveViewStatus;
import com.skt.hrs.cmmn.exception.HrsException;
import com.skt.hrs.cmmn.vo.LoginVo;
import com.skt.hrs.resve.dao.ResveStatusDAO;
import com.skt.hrs.utils.DateUtil;
import com.skt.hrs.utils.StringUtil;





@Service("resveStatusService")
@SuppressWarnings({"unchecked","rawtypes"})
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
	@Transactional
	public ResponseResult registResveStatus(DataEntity param) {
		ResponseResult result = new ResponseResult();
		
		Map resveItem = resveStatusDAO.selectResveItem(param);
		
		// 예약가능한지 체크		
		if(resveItem != null) {
			
			param.put("resveDe", resveItem.get("RESVE_DE"));
			Map dayCount = resveStatusDAO.selectDayCount(param);
			
			// 금일 예약건이 존재하는경우
			if(!"0".equals(dayCount.get("RESVE_CNT").toString()) || !"0".equals(dayCount.get("RESVE_CNT").toString())) {
				throw new HrsException("error.duplicateDayResve", true);	//"금일 예약/대기가 존재합니다.\n예약/대기는 1일 1회만 가능합니다."
			}
			
			// 상태체크
			if(!StringUtil.isEmpty((String) resveItem.get("RESVE_EMPNO"))) {				
				throw new HrsException("error.notAvailable", true);
			}		
			// 시간체크 (현재시간<= 예약시간-20분)
			Date resveDt = DateUtil.hrsDtToRealDt(resveItem.get("RESVE_DE").toString(), resveItem.get("RESVE_TM").toString());
			if(!DateUtil.isPastBefore20min(resveDt)) {				
				throw new HrsException("error.over20min", true);
			}
			// 성별체크
			if(resveItem.get("MSSR_SEXDSTN").equals("F")	// 관리사가 여성이고 
					&& param.get("resveSexdstn").equals("M")) {		// 구성원이 남성이면 불가
				throw new HrsException("error.notAvailable", true);
			}
			
			// 현황 update	
			param.put("updtEmpno", param.get("empno"));
			boolean updateResult = resveStatusDAO.updateResveStatus(param);
			
			// 이력 insert
			param.put("sttusCode", ResveStatusConst.DBSTATUS.RESVE_COMPT.toString());
			param.put("targetEmpno", (String)param.get("resveEmpno"));
			param.put("regEmpno", param.get("empno"));
			boolean insertResult = resveStatusDAO.insertResveHist(param);
			
			result.setItemOne(updateResult && insertResult);
			
			// data적용 성공여부
			if(!(updateResult && insertResult)) {
				throw new HrsException("error.processFailure", true);
			}
			
			
		}else {
			throw new HrsException("error.invalidRequest", true);
		}
		
		return result;
		
	}
	
	/**
	 * 
	 * @설명 : 대기등록
	 * @작성일 : 2019.09.03
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	@Transactional
	public ResponseResult waitResveStatus(DataEntity param) {
		ResponseResult result = new ResponseResult();
				
		Map resveItem = resveStatusDAO.selectResveItem(param);
		
		// 대기가능한지 체크		
		if(resveItem != null) {
			
			param.put("resveDe", resveItem.get("RESVE_DE"));
			Map dayCount = resveStatusDAO.selectDayCount(param);
			
			// 금일 예약건이 존재하는경우
			if(!"0".equals(dayCount.get("RESVE_CNT").toString()) || !"0".equals(dayCount.get("RESVE_CNT").toString())) {		
				throw new HrsException("error.duplicateDayResve", true);	//"금일 예약/대기가 존재합니다.\n예약/대기는 1일 1회만 가능합니다."
			}
			
			// 상태체크
			if(!StringUtil.isEmpty((String) resveItem.get("WAIT_EMPNO"))) {
				throw new HrsException("error.notAvailable", true);
			}		
			// 시간체크 (현재시간<= 예약시간-20분)
			Date resveDt = DateUtil.hrsDtToRealDt(resveItem.get("RESVE_DE").toString(), resveItem.get("RESVE_TM").toString());
			if(!DateUtil.isPastBefore20min(resveDt)) {
				throw new HrsException("error.over20min", true);
			}
			
			// 성별체크
			if(resveItem.get("MSSR_SEXDSTN").equals("F")	// 관리사가 여성이고 
					&& param.get("waitSexdstn").equals("M")) {		// 구성원이 남성이면 불가
				throw new HrsException("error.notAvailable", true);
			}
			
			// 현황 update
			param.put("updtEmpno", param.get("empno"));
			boolean updateResult = resveStatusDAO.updateResveStatus(param);
			
			// 이력 insert
			param.put("sttusCode", ResveStatusConst.DBSTATUS.WAIT_COMPT.toString());
			param.put("targetEmpno", (String)param.get("waitEmpno"));
			param.put("regEmpno", param.get("empno"));
			boolean insertResult = resveStatusDAO.insertResveHist(param);
			
			result.setItemOne(updateResult && insertResult);
			
			if(!(updateResult && insertResult)) {
				throw new HrsException("error.processFailure", true);
			}
			
			// SMS 등록
			
		}else {
			throw new HrsException("error.invalidRequest", true);
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
	@Transactional
	public ResponseResult cancelResveStatus(DataEntity param) {
		ResponseResult resResult = new ResponseResult();
		boolean result = false;
		
		Map resveItem = resveStatusDAO.selectResveItem(param);
		
		// 취소 가능한지 체크
		if(resveItem != null) {
			
			if(param.getString("cancelGbn").equals(ResveStatusConst.VIEWSTATUS.RESVE_COMPT.toString())) {	// 예약취소						
				// 시간체크 (현재시간<= 예약시간-20분)
				Date resveDt = DateUtil.hrsDtToRealDt(resveItem.get("RESVE_DE").toString(), resveItem.get("RESVE_TM").toString());
				if(!DateUtil.isPastBefore20min(resveDt)) {
					throw new HrsException("error.over20min", true);
				}
				
				
				//대기자가 있다면 대기중인 구성원을 예약상태로 변경
				if(resveItem.get("WAIT_EMPNO") != null && !StringUtil.isEmpty(resveItem.get("WAIT_EMPNO").toString())) {
					// 현황 update
					param.put("resveEmpno", (String)resveItem.get("WAIT_EMPNO"));
					param.put("waitEmpno", "");
					param.put("updtEmpno", "SYSTEM");
					boolean updateResult = resveStatusDAO.updateResveStatus(param);
					
					// 이력 insert (예약취소)
					param.put("sttusCode", ResveStatusConst.DBSTATUS.RESVE_CANCL.toString());	// STS02 : 예약취소
					param.put("targetEmpno", (String)resveItem.get("RESVE_EMPNO"));
					param.put("regEmpno", param.get("empno"));
					boolean insertResult1 =  resveStatusDAO.insertResveHist(param);

					/**************************************************************
					 * 	대기 -> 예약 자동등록
					 * 	- 예약자가 취소하면 대기자는 자동으로 예약자로 변경된다.
					 *  - 자동등록으로 변경된 예약자는 예약취소를 할 수 없다.
					 *  - 대신, 노쇼에 따른 패널티도 없다.
					 **************************************************************/
					// 이력 insert (대기취소)
					param.put("sttusCode", ResveStatusConst.DBSTATUS.WAIT_CANCL.toString());	// STS04 : 대기취소
					param.put("targetEmpno", (String)resveItem.get("WAIT_EMPNO"));
					param.put("regEmpno", "SYSTEM");
					boolean insertResult2 =  resveStatusDAO.insertResveHist(param);
					
					// 이력 insert (예약등록)
					param.put("sttusCode", ResveStatusConst.DBSTATUS.RESVE_COMPT.toString());	// STS01 : 예약등록
					param.put("targetEmpno", (String)resveItem.get("WAIT_EMPNO"));
					boolean insertResult3 =  resveStatusDAO.insertResveHist(param);
										
					resResult.setItemOne(updateResult && insertResult1 && insertResult2 && insertResult3);										
					
				}else {
					// 현황 update
					param.put("resveEmpno", "");
					param.put("updtEmpno", param.get("empno"));
					boolean updateResult = resveStatusDAO.updateResveStatus(param);
					
					// 이력 insert
					param.put("sttusCode", ResveStatusConst.DBSTATUS.RESVE_CANCL.toString());	// STS02 : 예약취소
					param.put("targetEmpno", (String)resveItem.get("RESVE_EMPNO"));
					boolean insertResult = resveStatusDAO.insertResveHist(param);
										
					result = updateResult && insertResult;
				}
				
				//TODO: SMS 등록
				
				
				if(!result) {
					throw new HrsException("error.processFailure", true);
				}
				
				resResult.setItemOne(result);
				
			}else if(param.getString("cancelGbn").equals(ResveStatusConst.VIEWSTATUS.WAIT.toString())) {	// 대기취소
				// 시간체크
				Date resveDt = DateUtil.hrsDtToRealDt(resveItem.get("RESVE_DE").toString(), resveItem.get("RESVE_TM").toString());
				if(DateUtil.isPast(resveDt)) {
					throw new HrsException("error.notAvailable", true);
				}
				
				// 현황 update
				param.put("waitEmpno", "");
				param.put("updtEmpno", param.get("empno"));
				boolean updateResult = resveStatusDAO.updateResveStatus(param);
				
				// 이력 insert
				param.put("sttusCode", ResveStatusConst.DBSTATUS.WAIT_CANCL.toString());	// STS04 : 대기취소
				param.put("targetEmpno", (String)resveItem.get("WAIT_EMPNO"));
				param.put("regEmpno", param.get("empno"));
				boolean insertResult = resveStatusDAO.insertResveHist(param);
									
				result = updateResult && insertResult;
			}else {
				throw new HrsException("error.notAvailable", true);	// 예약or대기 상태가 아닌경우
			}									
						
		}else {
			throw new HrsException("error.processFailure", true);
		}
		
		return resResult;
	}
	
	/**
	 * 
	 * @설명 : 완료처리 
	 * @작성일 : 2019.09.05
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	@Transactional
	public ResponseResult completeResveStatus(DataEntity param) {
		ResponseResult result = new ResponseResult();
				
		Map resveItem = resveStatusDAO.selectResveItem(param);
		
		// 완료 가능한지 체크		
		if(resveItem != null) {
			
			// 시간체크 (사후처리 포함하여 당일까지만 완료처리 가능)
			if(!DateUtil.getYYYYYMMDD().equals(resveItem.get("RESVE_DE").toString())) {
				new HrsException("error.onlySameday", true);	//완료처리는 당일만 가능합니다.
			}			
			
			// 현황 update
			param.put("updtEmpno", param.get("empno"));
			param.put("comptYn", 'Y');
			boolean updateResult = resveStatusDAO.updateResveStatus(param);
			
			// 이력 insert
			param.put("sttusCode", ResveStatusConst.DBSTATUS.COMPT.toString());
			param.put("targetEmpno", (String)resveItem.get("RESVE_EMPNO"));
			param.put("regEmpno", param.get("empno"));
			boolean insertResult = resveStatusDAO.insertResveHist(param);
			
			result.setItemOne(updateResult && insertResult);
			
			if(!(updateResult && insertResult)) {
				throw new HrsException("error.processFailure", true);
			}			
			
		}else {
			throw new HrsException("error.invalidRequest", true);
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
		
				
		ResveStatusConst.VIEWSTATUS resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_IMPRTY;
		
		// 예약 시간
		Date resveDt = DateUtil.hrsDtToRealDt(item.get("RESVE_DE").toString(), item.get("RESVE_TM").toString());

		// 시간이 지난경우
		if(!DateUtil.isPastBefore20min(resveDt)) {		
			
			if(!StringUtil.isEmpty(resveEmpno)) {
				// 예약자가 자신이고 
				if(resveEmpno.equals(myEmpno)) {
					// 완료상태라면
					if(lastStatusCode.equals(ResveStatusConst.DBSTATUS.COMPT.toString())) {						
						resultStatus = ResveStatusConst.VIEWSTATUS.COMPT;	// 완료
					}else {
						// 예약일이 오늘이라면
						if(item.get("RESVE_DE").toString().equals(DateUtil.getYYYYYMMDD())) {						
							resultStatus = ResveStatusConst.VIEWSTATUS.NOSHOW_COMPT;	// 노쇼 당일처리가능
						}else {
							resultStatus = ResveStatusConst.VIEWSTATUS.NOSHOW;	// 노쇼
						}
					}
				}else {
					resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_IMPRTY;	// 예약불가
				}
			}else {				
				resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_IMPRTY;	// 예약불가
			}
		}
		// 남성구성원인경우 여성관리사 예약불가
		else if(mySexdstn.equals("M") && mssrSexdstn.equals("F")) {	
			resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_IMPRTY;	// 예약불가
		}
		// 예약,대기자가 없는경우
		else if(StringUtil.isEmpty(resveEmpno) && StringUtil.isEmpty(waitEmpno)) {
			resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_POSBL;		// 예약가능
		}
		// 예약자는 있고, 대기자가 없는경우
		else if(!StringUtil.isEmpty(resveEmpno) && StringUtil.isEmpty(waitEmpno)) {
			// 예약자가 자신이라면
			if(resveEmpno.equals(myEmpno)) {
				if(lastStatusCode.equals(ResveStatusConst.DBSTATUS.COMPT.toString())) {
					resultStatus = ResveStatusConst.VIEWSTATUS.COMPT;	// 완료
				}else {				
					resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_COMPT;	// 예약완료
				}
			}
			// 예약자가 자신이 아니라면
			else {								
				resultStatus = ResveStatusConst.VIEWSTATUS.WAIT_POSBL;	// 대기가능
			}
		}
		// 예약자가 있고, 대기자가 나라면
		else if(!StringUtil.isEmpty(waitEmpno) && waitEmpno.equals(myEmpno)) {
			if(lastStatusCode.equals(ResveStatusConst.DBSTATUS.COMPT.toString())) {				
				resultStatus = ResveStatusConst.VIEWSTATUS.COMPT;	// 완료
			}else {								
				resultStatus = ResveStatusConst.VIEWSTATUS.WAIT;	// 대기중
			}
		}
		// 예약자, 대기자가 있고 둘다 자신이 아니라면
		else if(!StringUtil.isEmpty(resveEmpno) && !resveEmpno.equals(myEmpno) &&
			!StringUtil.isEmpty(waitEmpno) && !waitEmpno.equals(myEmpno)) {			
			resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_IMPRTY;	// 예약불가
		}
		
		return resultStatus.toString();
	}
	
	
}