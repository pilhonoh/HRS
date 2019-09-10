<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<div class="pop-head">
	<h2>헬스케어 <span>예약</span> 신청</h2>
	<a href="#none" class="close layerClose">닫기</a> 
</div>
<div class="pop-container st2">	
	<!-- 팝업 컨텐츠 S -->
	
	<p class="pop-desc icon01"><strong>예약</strong> 하시겠습니까?</p>
	
	<!-- 
	<table class="tbl-style">
		<colgroup>
			<col style="width:30%;">
			<col>
		</colgroup>
		<tbody>
			<tr>
				<th>예약일</th>
				<td id="resveRegist_resveDe"></td>
			</tr>
			<tr>
				<th>관리사</th>
				<td id="resveRegist_mssr"></td>
			</tr>
			<tr>
				<th>베드</th>
				<td id="resveRegist_bed"></td>
			</tr>
			<tr>
				<th>예약시각</th>
				<td id="resveRegist_resveTm"></td>
			</tr>
		</tbody>
	</table>
	-->
	
	<ul class="reservation-list">
		<li><span class="icon01" id="resveRegist_resveDe"></span></li>
		<li><span class="icon02" id="resveRegist_resveTm"></span></li>
		<li><span class="icon03" id="resveRegist_mssr"></span></li>
		<li><span class="icon04" id="resveRegist_bed"></span></li>
	</ul>
	

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
	
	$('#resveRegist_resveDe').text(moment(data.RESVE_DE).format('YYYY-MM-DD'));
	$('#resveRegist_mssr').text(data.MSSR_NCNM + '(' + (data.MSSR_SEXDSTN =='M' ? '남':'여') +')');
	$('#resveRegist_bed').text(data.BED_NM);
	
	var realTime = getRealTime(data.RESVE_TM);
	$('#resveRegist_resveTm').text(realTime.start + '~' + realTime.end);
})

</script>

