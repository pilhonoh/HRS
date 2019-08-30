<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<jsp:include page="${JSP}/include/resource.jsp" />
		<script src="${LIB}/moment/moment.min.js"></script>		
		<script src="${JS}/resve/resveStatus.js"></script>
	</head>
	<body>

		<div class="wrap">

			<header class="header">
				<jsp:include page="${JSP}/include/header.jsp" />
			</header>

			<div class="content">

				<div class="month-area">
					<div class="calendar-area">
						<table class="month-calendar">
							<tbody>
								<tr>		
									<!-- 2주 캘린더 렌더링영역 -->
								</tr>
							</tbody>
						</table>
					</div>
				</div>				

				<div class="sub-tit">
					<h3>2019년 8월 26일(월) 예약 : T타워</h3>
					<div class="f-right select-design">
						<span>사옥선택 :</span>
						<select data-code-tyl="BLD"></select>
					</div>
				</div>

				<!-- 예약현황테이블 -->
				<table class="reservation-table">
					<colgroup>
						<col>
						<col style="width:10.5%">
						<col style="width:10.5%">
						<col style="width:10.5%">
						<col style="width:10.5%">
						<col style="width:10.5%">
						<col style="width:10.5%">
						<col style="width:10.5%">
						<col style="width:10.5%">
						<col style="width:10.5%">
					</colgroup>
					<thead>
						<tr>
							<th>배드</th>
							<th>09:30~10:00</th>
							<th>10:30~11:00</th>
							<th>11:30~12:00</th>
							<th>12:30~13:00</th>
							<th>13:30~14:00</th>
							<th>14:30~15:00</th>
							<th>15:30~16:00</th>
							<th>16:30~17:00</th>
							<th>17:30~18:00</th>
						</tr>
					</thead>
					<tbody>
						<!-- <tr>
							<th>A</th>
							<td colspan="4">
								<div class="rv-box colspan4 man">
									<p class="name"><strong>James</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1" onclick="e_layer_pop01('layer_pop01');">예약가능</button></li>
										<li><button class="rv-btn st2" onclick="e_layer_pop02('layer_pop02');">대기가능</button></li>
										<li><button class="rv-btn" disabled>예약불가</button></li>
									</ul>
								</div>
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>	
						<tr>
							<th>B</th>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td colspan="5">
								<div class="rv-box colspan5 man">
									<p class="name"><strong>Steve</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st4" onclick="e_layer_pop03('layer_pop03');">대기중</button></li>
										<li><button class="rv-btn st2" onclick="e_layer_pop02('layer_pop02');">대기가능</button></li>
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn" disabled>예약불가</button></li>
									</ul>
								</div>
							</td>
						</tr>	 -->
					</tbody>
				</table>

				<div class="rv-desc-list">
					<ul>
						<li> 당일로 부터 <strong>2주까지만 예약</strong>이 가능 합니다.</li>
						<li>신청 내역은 급여에서 <strong>한건당 1,000원이 차감</strong>됩니다.</li>
						<li>예약 <strong>취소는 시작 10분전 까지만</strong> 가능합니다.</li>
						<li>예약자가 1명인 경 우는 대기 신청이 가능하고 선 예약자가 취소 시 <strong>“예약 가능 SMS가 자동 발송</strong>됩니다.</li>
					</ul>
				</div>				
				
			</div><!-- //content -->

			<footer class="footer">
				<jsp:include page="../include/footer.jsp" />
			</footer>

		</div><!-- //wrap -->

		<!-- 레이어팝업 : S -->
		<div class="layer">
			<div class="bg"></div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop01">
				<!--#include file="../popup/pop_예약신청.html" -->
				<jsp:include page="../popup/pop_reservApply.jsp" />
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop02">
				<!--#include file="../popup/pop_대기신청.html" -->
				<jsp:include page="../popup/pop_waitingApply.jsp" />
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop03">
				<!--#include file="../popup/pop_예약대기취소.html" -->
				<jsp:include page="../popup/pop_reservWaitingCancel.jsp" />
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop04">
				<!--#include file="../popup/pop_시작확인.html" -->
				<jsp:include page="../popup/pop_startConfirm.jsp" />
			</div>
		</div><!-- //layer -->
		<!-- 레이어팝업 : E -->

	</body>
</html>