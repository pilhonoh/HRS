package com.skt.hrs.batch;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

import com.pub.core.entity.DataEntity;
import com.pub.core.entity.ResponseResult;
import com.skt.hrs.cmmn.service.CspService;
import com.skt.hrs.resve.service.ResveStatusService;
import com.skt.hrs.utils.DateUtil;

public class PastWaitCancelJob {

	@Autowired
	ResveStatusService resveStatusService;
		
	@Autowired
	MessageSource messageSource;
	
	Logger logger = LoggerFactory.getLogger("pastWaitCancelJobLogger");
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	protected void execute() {
		try {
			DataEntity param = new DataEntity();
			param.put("nextResveTm", DateUtil.getNextResveTm());
			List<Map> list = resveStatusService.selectWaitCancelTarget(param).getList();
			
			logger.info("과거 대기취소 Job 수행 시작 - " + list.size() + "건");
			
			for(Map m : list) {
				logger.info("일자:{}, 시간:{}, 사옥:{}, 베드:{}, 사번:{} ",
						m.get("RESVE_DE"),
						m.get("RESVE_TM"),
						m.get("BLD_CODE"),
						m.get("BED_CODE"),
						m.get("WAIT_EMPNO"));
				
				//m.put("targetEmpno", m.get("RESVE_EMPNO"));
				
				// 대기취소 수행							
			}
			
		}catch(Exception e) {
			logger.error("{} PastWaitCancelJob Error Message : {} ", PastWaitCancelJob.class.getSimpleName(), e.getMessage());
		}
	}
}
