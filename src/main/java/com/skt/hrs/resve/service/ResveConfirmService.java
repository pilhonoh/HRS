package com.skt.hrs.resve.service;


import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.cmmn.contants.ResveStatusConst;
import com.skt.hrs.resve.dao.ResveConfirmDAO;
import com.skt.hrs.utils.DateUtil;
import com.skt.hrs.utils.StringUtil;

@Service("resveConfirmService")
@SuppressWarnings({ "unchecked", "rawtypes" })
public class ResveConfirmService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="resveConfirmDAO")
	private ResveConfirmDAO resveConfirmDAO;

	
	/**
	 * 
	 * @설명 : 근무현황 조회
	 * @작성일 : 2019.08.29
	 * @작성자 : LEE.J.H
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectWorkList(DataEntity param) {
		ResponseResult result = new ResponseResult();
		
		List<Map> list = resveConfirmDAO.selectWorkList(param);
		for(Map item : list) {
			item.put("LAST_STTUS",  getViewStatus(item));
			item.remove("LAST_STTUS_CODE");
		}
		result.setItemList(list);		
		return result;
	}

	/**
	 * 
	 * @설명 : 
	 * @작성일 : 2019.09.10
	 * @작성자 : P149365
	 * @param item
	 * @return
	 * @변경이력 :
	 */
	public String getViewStatus(Map item) {
		ResveStatusConst.VIEWSTATUS resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_IMPRTY;
		
		// 예약 시간
		Date resveDt = DateUtil.hrsDtToRealDt(item.get("RESVE_DE").toString(), item.get("RESVE_TM").toString());
		
		// 시간이 지난경우
		if(!DateUtil.isPastBefore20min(resveDt)) {
			if("Y".equals(item.get("COMPT_YN"))) {
				resultStatus = ResveStatusConst.VIEWSTATUS.COMPT;	//케어완료
			}else{
				if(item.get("RESVE_EMPNO")!=null && !StringUtil.isEmpty(item.get("RESVE_EMPNO").toString())) {
					resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_COMPT;	//예약완료
				}else {
					resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_IMPRTY;	//예약불가
				}
			}
		}else {
			if(!StringUtil.isEmpty(item.get("RESVE_EMPNO").toString())) {
				resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_COMPT;	//예약완료
			}else {
				resultStatus = ResveStatusConst.VIEWSTATUS.RESVE_POSBL;	//예약가능
			}
		}
		
		return resultStatus.toString();
	}
	
}