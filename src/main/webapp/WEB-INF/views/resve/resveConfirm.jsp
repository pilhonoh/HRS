<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<jsp:include page="${JSP}/include/resource.jsp" />
		<script src="${LIB}/moment/moment.min.js"></script>	
		<script src="${JS}/resve/resveConfirm.js"></script>	
		<script>
			var ROOT = '${ROOT}';
		</script>
	</head>
	<body>

		<div class="wrap">
			<input id="bldCode" type="hidden" value="${sessionScope.LoginVo.place}" />
			<div class="content staff">

				<article class="content-in">
					
					<div class="tit-head">
						<h1 class="logo">SKT헬스케어</h1>
						<p class="tit-date">						
							<i class="xi-time-o"></i><span>2019년 8월 <em>19일(월) 예약</em>입니다.</span>
						</p>
					</div>

					<div class="month-area st2">
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

					<div class="number-search">
						<label>사번입력</label>
						<input type="text" placeholder="사번을 입력해서 반드시 최종 확인해 주시기 바랍니다.">
						<button onclick="e_layer_pop04('layer_pop04');"><i class="xi-search xi-x"></i>확인</button>
					</div>

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
								<!-- 예약현황 테이블 렌더영역 -->
							</tbody>
						</table>
					</div>	
				
				</article><!-- //content-in -->
				
			</div><!-- //content -->

			<footer class="footer">
				<!--#include file="../include/footer.html"-->
			</footer><!-- //footer -->

		</div><!-- //wrap -->

		<!-- 레이어팝업 : S -->
		<div class="layer">
			<div class="bg"></div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop01">
				<!--#include file="../popup/pop_예약신청.html" -->	
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop02">
				<!--#include file="../popup/pop_대기신청.html" -->	
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop03">
				<!--#include file="../popup/pop_예약대기취소.html" -->	
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop04">
				<!--#include file="../popup/pop_시작확인.html" -->	
			</div>
		</div><!-- //layer -->
		<!-- 레이어팝업 : E -->

	</body>
</html>