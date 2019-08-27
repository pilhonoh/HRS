<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>SKT헬스케어예약시스템</title>
		<!-- CSS -->
		<link href="/resources/vendor/jquery-ui/jquery-ui.min.css" rel="stylesheet">
		<link href="/resources/vendor/XEIcon/xeicon.css" rel="stylesheet">
		<link href="/resources/css/animate.css" rel="stylesheet">
		<link href="/resources/css/reset.css" rel="stylesheet">
		<link href="/resources/css/common.css" rel="stylesheet">
		<!-- SCRIPT -->
		<script src="/resources/vendor/jquery/jquery-1.12.3.js"></script>
		<script src="/resources/vendor/jquery-ui/jquery-ui.min.js"></script>
		<script src="/resources/js/common.js"></script>
	</head>
	<body>

		<div class="wrap">

			<header class="header">
				<!--#include file="../include/header.html"-->
				<jsp:include page="../include/header.jsp" />
			</header><!-- //header -->

			<div class="content">
				
				<div class="sub-tit">
					<h2>예약 리스트</h2>
				</div>
				
				<div class="search_field_wrap">
					<div class="search_field_area">
						<table class="search_field">
							<colgroup>
								<col width="90px">
								<col width="*">
								<col width="90px">
								<col width="*">
							</colgroup>
							<tbody>
								<tr>
									<th><strong class="stit">기간</strong></th>
									<td>
										<input type="text" class="datepicker">
										<em class="fromto"> ~ </em>
										<input type="text" class="datepicker">
									</td>
									<th><strong class="stit">상태</strong></th>
									<td>
										<select>
											<option>예약완료</option>
											<option>예약대기</option>
											<option>예약취소</option>
											<option>대기취소</option>
											<option>케어 완료</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</div><!-- //searchTableArea -->
					<div class="search_btn_area">
						<button class="search_btn"><i class="xi-search xi-x"></i>조회</button>
					</div><!-- //search_btn_area -->
				</div><!-- // search_field_wrap -->

				<table class="tbl-style t_center">
					<colgroup>
						<col style="width:12%;">
						<col style="width:12%;">
						<col style="width:12%;">
						<col style="width:12%;">
						<col style="width:12%;">
						<col style="width:12%;">
						<col style="width:12%;">
						<col>
					</colgroup>
					<thead>
						<tr>
							<th>예약일</th>
							<th>예약시간</th>
							<th>사옥</th>
							<th>관리사</th>
							<th>베드</th>
							<th>신청일</th>
							<th>상태</th>
							<th>비고</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2019-08-19</td>
							<td>10:00 ~ 11:00</td>
							<td>티타워</td>
							<td>James(남)</td>
							<td>A</td>
							<td>2019-08-19</td>
							<td>예약 완료</td>
							<td>
								<button class="t-btn">예약취소</button>
							</td>
						</tr>
						<tr>
							<td>2019-08-19</td>
							<td>10:00 ~ 11:00</td>
							<td>티타워</td>
							<td>James(남)</td>
							<td>A</td>
							<td>2019-08-19</td>
							<td>예약 완료</td>
							<td>
								<button class="t-btn cr01">대기취소</button>
							</td>
						</tr>
						<tr>
							<td>2019-08-19</td>
							<td>10:00 ~ 11:00</td>
							<td>티타워</td>
							<td>James(남)</td>
							<td>A</td>
							<td>2019-08-19</td>
							<td>예약 완료</td>
							<td></td>
						</tr>
					</tbody>
				</table>

				<div class="paging_area">
					<a href="#none" class="first"><img src="/resources/images/common/btn_first.gif"></a>
					<a href="#none" class="prev"><img src="/resources/images/common/btn_prev.gif"></a>
					<a href="#none" class="num selected">1</a>
					<a href="#none" class="num">2</a>
					<a href="#none" class="num">3</a>
					<a href="#none" class="num">4</a>
					<a href="#none" class="num">5</a>
					<a href="#none" class="num">6</a>
					<a href="#none" class="num">7</a>
					<a href="#none" class="num">8</a>
					<a href="#none" class="num">9</a>
					<a href="#none" class="num">10</a>
					<a href="#none" class="next"><img src="/resources/images/common/btn_next.gif"></a>
					<a href="#none" class="last"><img src="/resources/images/common/btn_last.gif"></a>
				</div>

				<!-- <br><br><br><br><br><br>
				<button class="t-btn" onclick="e_layer_pop01('layer_pop01');"><em class="icon01">pop_예약신청</em></button>
				<button class="t-btn" onclick="e_layer_pop02('layer_pop02');"><em class="icon01">pop_대기신청</em></button>
				<button class="t-btn" onclick="e_layer_pop03('layer_pop03');"><em class="icon01">pop_예약대기취소</em></button>
				<button class="t-btn" onclick="e_layer_pop04('layer_pop04');"><em class="icon01">pop_시작확인</em></button> -->
				
			</div><!-- //content -->

			<footer class="footer">
				<!--#include file="../include/footer.html"-->
				<jsp:include page="../include/footer.jsp" />
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