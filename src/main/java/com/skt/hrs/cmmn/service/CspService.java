package com.skt.hrs.cmmn.service;


import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.pub.core.entity.ResponseResult;
import com.skt.hrs.cmmn.dao.CspDAO;
import com.skt.hrs.cmmn.vo.CspVo;





@Service("cspService")
public class CspService {
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name="cspDAO")
	private CspDAO cspDAO;

	@Resource(name="messageSource")
	MessageSource messageSource;
	
	/**
	 * 
	 * @설명 : 예약완료 CSP입력 
	 * @작성일 : 2019.09.06
	 * @작성자 : P149365
	 * @param param
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult insertCspSMS(Map param, String messageCode, Locale locale) {
		ResponseResult result = new ResponseResult();
		
		String resveDay = param.get("RESVE_DE").toString();
		try {		
			SimpleDateFormat fromUser = new SimpleDateFormat("yyyyMMdd");
			SimpleDateFormat toFormat = new SimpleDateFormat("yyyy-MM-dd");
			resveDay = toFormat.format(fromUser.parse(param.get("RESVE_DE").toString()));
		}catch (Exception e) {}
		
		CspVo cspVo = new CspVo();
		
		String mssg = messageSource.getMessage(messageCode, new String[] {
			param.get("BLD_NM").toString(),
			param.get("BED_NM").toString(),
			resveDay,
			param.get("RESVE_TM_STR").toString()
		}, locale);
		
		cspVo.setRcvEmpno(param.get("targetEmpno").toString());
		cspVo.setCspType("S");	//SMS
		cspVo.setResveNo(Integer.parseInt(param.get("RESVE_NO").toString()));		
		cspVo.setMssgBody(mssg);
		
		result.setItemOne(cspDAO.insertCspSend(cspVo));
		
		return result;
	}
	
	/**
	  * 
	 * @설명 : CSP 발송 리스트
	 * @작성일 : 2019.09.07
	 * @작성자 : djkim
	 * @return
	 * @변경이력 :
	 */
	public ResponseResult selectCspSendList(){
		ResponseResult result = new ResponseResult();
		result.setItemList(cspDAO.selectCspSendList());
		return result;
	}
	
	public ResponseResult updateCspLog(String no, String sendRslt) {
		ResponseResult result = new ResponseResult();
		CspVo cspVo = new CspVo();
		cspVo.setNo(Integer.parseInt(no));
		cspVo.setSendRslt(sendRslt);
		
		result.setItemOne(cspDAO.updateCspSendLog(cspVo));
		
		return result;
	}
}