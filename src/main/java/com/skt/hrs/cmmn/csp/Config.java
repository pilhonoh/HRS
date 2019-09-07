package com.skt.hrs.cmmn.csp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Config {
	
	// Domain
	public static String domain = "";

	// BP API Key
	public static String apiKey = "";

	// BP 복호화 키
	public static String decryptKey = "";

	// Encode
	public static String encode = "";
	
	@Value("#{config['CSP.HOST']}")
	public void setDomain(String domain) {
		Config.domain = domain;
	}

	@Value("#{config['CSP.API_KEY']}")
	public void setApiKey(String apiKey) {
		Config.apiKey = apiKey;
	}
	
	@Value("#{config['CSP.DEC_KEY']}")
	public void setDecryptKey(String decryptKey) {
		Config.decryptKey = decryptKey;
	}
	
	@Value("#{config['CSP.ENCODE']}")
	public void setEncode(String encode) {
		Config.encode = encode;
	}
}
