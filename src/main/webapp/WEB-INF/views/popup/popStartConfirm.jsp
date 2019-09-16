<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="pop-head">
	<h2>헬스케어 시작 확인</h2>
	<a href="#none" class="close layerClose">닫기</a> 
</div>
<div class="pop-container">	
	<!-- 팝업 컨텐츠 S -->

	<p class="pop-desc icon04">※ 헬스케어 이용을 시작 하시겠습니까?</p>

	<ul class="reservation-list">
		<li><span class="icon01" id="resveConfirm_resveDe"></span></li>
		<li><span class="icon02" id="resveConfirm_resveTm"></span></li>
		<li><span class="icon03" id="resveConfirm_mssr"></span></li>
		<li><span class="icon04" id="resveConfirm_bed"></span></li>
	</ul>
	
	<div class="pop-btn-area">
		<button id="btnOk" class="pop-btn">확인</button>
		<button id="btnCancel" class="pop-btn gray layerClose">취소</button>
	</div>

	<!-- 팝업 컨텐츠 E -->						
</div><!-- //pop-container -->

<script>

$(document).ready(function(){		
	var item = '${item}';
	var data = JSON.parse(item);
	if(data){
		$('#resveConfirm_resveDe').text(moment(data.RESVE_DE).format('YYYY-MM-DD'));
		$('#resveConfirm_mssr').text(data.MSSR_NCNM + '(' + (data.MSSR_SEXDSTN =='M' ? '남':'여') +')');
		$('#resveConfirm_bed').text(data.BED_NM);
		
		var realTime = getRealTime(data.RESVE_TM);
		$('#resveConfirm_resveTm').text(realTime.start + '~' + realTime.end);
		
		$('#btnOk').on('click', function(){
			resveConfirm.start(data.RESVE_NO);
		});
	}else{		
		$('.reservation-list').remove();
		$('#btnCancel').remove();
		$('#btnOk').addClass('layerClose');
		$('.pop-desc').text('<spring:message code="error.resveNotFound" />');	//예약이 존재하지 않습니다.
	}
	
})

</script>