<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<jsp:include page="${JSP}/include/resource.jsp" />
		<jsp:include page="${JSP}/include/messages.jsp" />
		<script src="${JS}/resve/resveStatus.js"></script>
	</head>
	<body>

		<div class="wrap">

			<header class="header">
				<jsp:include page="${JSP}/include/header.jsp" />
			</header>

			<div class="content">				

				<article class="content-in">

					<div class="month-area">
						<div class="building-select">
							<select data-code-tyl="BLD"></select>
							<span class="bar"></span>
						</div>
						<div class="calendar-area">
							<table class="month-calendar">
								<tbody>
									<tr>		
										<!-- 2주 캘린더 렌더링영역 -->
									</tr>
								</tbody>
							</table>
						</div>
					</div><!-- //month-area -->

					<!-- 예약현황테이블 -->
					<div class="reservation-table-wrap">
						<table class="reservation-table">
							<colgroup>
								<col>
								<col style="width:10.6%">
								<col style="width:10.6%">
								<col style="width:10.6%">
								<col style="width:10.6%">
								<col style="width:10.6%">
								<col style="width:10.6%">
								<col style="width:10.6%">
								<col style="width:10.6%">
								<col style="width:10.6%">
							</colgroup>
							<thead>
								<tr>
									<th>배드</th>
									<!-- <th>09:30~10:00</th>
									<th>10:30~11:00</th>
									<th>11:30~12:00</th>
									<th>12:30~13:00</th>
									<th>13:30~14:00</th>
									<th>14:30~15:00</th>
									<th>15:30~16:00</th>
									<th>16:30~17:00</th>
									<th>17:30~18:00</th> -->
									<th>09:00~09:30</th>
									<th>10:00~10:30</th>
									<th>11:00~11:30</th>
									<th>12:00~12:30</th>
									<th>13:00~13:30</th>
									<th>14:00~14:30</th>
									<th>15:00~15:30</th>
									<th>16:00~16:30</th>
									<th>17:00~17:30</th>
								</tr>
							</thead>
							<tbody>
								<!-- 예약현황 테이블 렌더영역 -->
							</tbody>
						</table>
					</div>

					<div class="rv-desc-list">
						<ul>
							<li class="icon01">당일로 부터 <strong>2주까지만 예약</strong>이 가능 합니다.</li>
							<li class="icon02">예약 <strong>취소는 시작 20분전 까지만</strong> 가능합니다.</li>
							<li class="icon03">사용시 <strong>한 건당 5,000원이 급여에서 차감</strong>됩니다.</li>
							<li class="icon04">예약자가 1명인 경 우는 대기 신청이 가능하고 선 예약자가 취소 시 자동 승계되며, <strong>“예약완료" SMS가 자동 발송</strong>됩니다.</li>
						</ul>
					</div>		
				
				</article><!-- //content-in -->
				
			</div><!-- //content -->

			<footer class="footer">
				<!--#include file="../include/footer.html"-->
			</footer><!-- //footer -->

		</div><!-- //wrap -->

		<!-- 레이어팝업 : S -->
		<div class="layer">
			<jsp:include page="${JSP}/include/layer.jsp" />
		</div><!-- //layer -->
		<!-- 레이어팝업 : E -->

	</body>
</html>