<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="pop-head">
	<h2>헬스케어 대기 신청</h2>
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
				<td>2019-08-19</td>
			</tr>
			<tr>
				<th>관리사</th>
				<td>James(남)</td>
			</tr>
			<tr>
				<th>베드</th>
				<td>A</td>
			</tr>
			<tr>
				<th>예약시각</th>
				<td>10시 ~  11시</td>
			</tr>
		</tbody>
	</table>

	<p class="pop-desc">※ 위 시각으로 대기 하시겠습니까?</p>

	<div class="pop-btn-area">
		<button class="pop-btn">확인</button>
		<button class="pop-btn gray">취소</button>
	</div>

	<!-- 팝업 컨텐츠 E -->						
</div><!-- //pop-container -->

