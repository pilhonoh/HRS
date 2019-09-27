<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script>
var messages = {
	'system.error' : '<spring:message code="system.error" />',
	'error.invalidRequest' : '<spring:message code="error.invalidRequest" />',
	'error.notAvailable' : '<spring:message code="error.notAvailable" />',
	'error.processFailure' : '<spring:message code="error.processFailure" />',
	'error.duplicateDayResve' : '<spring:message code="error.duplicateDayResve" />',
	'error.over20min' : '<spring:message code="error.over20min" />',
	'error.onlySameday' : '<spring:message code="error.onlySameday" />',
	'error.canceledResve' : '<spring:message code="error.canceledResve" />',
	'error.completeResve' : '<spring:message code="error.completeResve" />',
	'error.canNotSuccessionCancel' : '<spring:message code="error.canNotSuccessionCancel" />',	
	'error.resveNotFound' : '<spring:message code="error.resveNotFound" />',
	'error.requireEmpno' : '<spring:message code="error.requireEmpno" />',
	'error.invalidStartDate' : '<spring:message code="error.invalidStartDate" />',
	'error.invalidEndDate' : '<spring:message code="error.invalidEndDate" />',
	'error.dateCompareStartEnd' : '<spring:message code="error.dateCompareStartEnd" />',
	'error.timeCompareStartEnd' : '<spring:message code="error.timeCompareStartEnd" />',
}

/**
 *  메시지 코드로 메시지 구하기
 *   - ex) getMessage('error.invalidRequest');
 *   - ex) getMessage('error.invalidRequest', arg1);
 *   - ex) getMessage('error.invalidRequest', [arg1, arg2, arg3 ...]);
 */
function getMessage(code, args){
	var result = messages[code] === undefined? code : messages[code];
	if(args){
		if(Array.isArray(args)){
			for(var i=0; i<args.length; i++){
				result = result.split('{'+i+'}').join(args[i]);
			}
		}else{
			result = result.split('{0}').join(param);
		}
	}		
	return result;
}
</script>