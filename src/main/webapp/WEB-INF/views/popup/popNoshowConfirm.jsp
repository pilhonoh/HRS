<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="pop-head">
	<h2>헬스케어 사후 완료</h2>
	<a href="#none" class="close layerClose">닫기</a> 
</div>
<div class="pop-container">	
	<!-- 팝업 컨텐츠 S -->

	<table class="tbl-style">
		<colgroup>
			<col style="width:30%;">
			<col>
		</colgroup>
		<tbody>
			<tr>
				<th>예약일</th>
				<td id="noshowConfirm_resveDe"></td>
			</tr>
			<tr>
				<th>관리사</th>
				<td id="noshowConfirm_mssr"></td>
			</tr>
			<tr>
				<th>베드</th>
				<td id="noshowConfirm_bed"></td>
			</tr>
			<tr>
				<th>예약시각</th>
				<td id="noshowConfirm_resveTm"></td>
			</tr>
		</tbody>
	</table>

	<p class="pop-desc">※ 헬스케어 예약을 완료처리 하시겠습니까?</p>

	<div class="pop-btn-area">
		<button id="btnOk" class="pop-btn">확인</button>
		<button class="pop-btn gray layerClose">취소</button>
	</div>

	<!-- 팝업 컨텐츠 E -->						
</div><!-- //pop-container -->
<script>

var resveNo = '${resveNo}';
var data = $('#resve-'+resveNo).data('data');



$(document).ready(function(){		
	
	$('#noshowConfirm_resveDe').text(moment(data.RESVE_DE).format('YYYY-MM-DD'));
	$('#noshowConfirm_mssr').text(data.MSSR_NCNM + '(' + (data.MSSR_SEXDSTN =='M' ? '남':'여') +')');
	$('#noshowConfirm_bed').text(data.BED_NM);
	
	var realTime = getRealTime(data.RESVE_TM);
	$('#noshowConfirm_resveTm').text(realTime.start + '~' + realTime.end);
})

</script>
