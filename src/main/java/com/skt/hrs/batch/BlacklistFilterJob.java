package com.skt.hrs.batch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.skt.hrs.resve.service.ResveBlacklistService;

public class BlacklistFilterJob {
	
	@Autowired
	ResveBlacklistService blacklistService;
	
	@Value("#{prop['PANELTY.WEEKS']}")
	private int paneltyWeeks;

	Logger logger = LoggerFactory.getLogger("blacklistFilterJobLogger");
	
	protected void execute() {	
		try {
						
			int cnt = blacklistService.insertBlacklist(paneltyWeeks).getItem();
			
			logger.info("===> {} {} : {} " ,
					BlacklistFilterJob.class.getSimpleName(), 
					"필터링된 블랙리스트 카운트", 
					cnt);
			
		}catch(Exception e) {
			logger.error("{} BlacklistFilter Error Message : {} ", BlacklistFilterJob.class.getSimpleName(), e.getMessage());
		}
	}
}


