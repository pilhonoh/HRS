<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<jsp:include page="${JSP}/include/resource.jsp" />
		<script src="${LIB}/moment/moment.min.js"></script>	
		<script src="${JS}/mssr/schedule.js"></script>
	</head>
	<body>

		<div class="wrap">

			<header class="header">
				<!--#include file="../include/header.html"-->
				<jsp:include page="${JSP}/include/header.jsp" />
			</header><!-- //header -->

			<div class="content">
				
				<div class="sub-tit">
					<h2>관리사 스케쥴 조회/등록/변경</h2>
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
										<input type="text" class="datepicker" id="from_date">
										<em class="fromto"> ~ </em>
										<input type="text" class="datepicker" id="to_date">
									</td>
									<th><strong class="stit">검색조건</strong></th>
									<td>
										<select style="width:120px;">
											<option>사옥</option>
										</select>
										<select style="width:120px;">
											<option>관리사</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</div><!-- //searchTableArea -->
					<div class="search_btn_area">
						<button class="search_btn"><i class="xi-search xi-x"></i>검색</button>
					</div><!-- //search_btn_area -->
				</div><!-- // search_field_wrap -->

				<div class="sub-tit">
					<div class="f-right">
						<button class="btn">삭제</button>
						<button class="btn" onclick="e_layer_pop06('layer_pop06');">등록</button>						
					</div>
				</div>

				<table class="tbl-style t_center">
					<colgroup>
						<col style="width:50px;">						
						<col style="width:15%;">
						<col>
						<col style="width:15%;">
						<col style="width:15%;">
						<col style="width:15%;">
						<col style="width:15%;">
					</colgroup>
					<thead>
						<tr>
							<th><input type="checkbox"></th>
							<th>근무날짜</th>
							<th>사옥</th>
							<th>관리사</th>
							<th>성별</th>
							<th>근무시간</th>
							<th>수정</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><input type="checkbox"></td>
							<td>2019-08-21</td>
							<td>티타워</td>
							<td>James</td>
							<td>남</td>
							<td>09:30 ~ 11:00</td>
							<td><button class="t-btn cr01" onclick="e_layer_pop07('layer_pop07');">수정</button></td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td>2019-08-21</td>
							<td>티타워</td>
							<td>James</td>
							<td>남</td>
							<td>09:30 ~ 11:00<br>14:30 ~ 15:00</td>
							<td><button class="t-btn cr01" onclick="e_layer_pop07('layer_pop07');">수정</button></td>
						</tr>		
						<tr>
							<td><input type="checkbox"></td>
							<td>2019-08-21</td>
							<td>티타워</td>
							<td>James</td>
							<td>남</td>
							<td>09:30 ~ 11:00</td>
							<td><button class="t-btn cr01" onclick="e_layer_pop07('layer_pop07');">수정</button></td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td>2019-08-21</td>
							<td>티타워</td>
							<td>James</td>
							<td>남</td>
							<td>09:30 ~ 11:00</td>
							<td><button class="t-btn cr01" onclick="e_layer_pop07('layer_pop07');">수정</button></td>
						</tr>
						<tr>
							<td><input type="checkbox"></td>
							<td>2019-08-21</td>
							<td>티타워</td>
							<td>James</td>
							<td>남</td>
							<td>09:30 ~ 11:00</td>
							<td><button class="t-btn cr01" onclick="e_layer_pop07('layer_pop07');">수정</button></td>
						</tr>
					</tbody>
				</table>

				<div class="paging_area">
					<a href="#none" class="first"><img src="${IMG}/common/btn_first.gif"></a>
					<a href="#none" class="prev"><img src="${IMG}/common/btn_prev.gif"></a>
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
					<a href="#none" class="next"><img src="${IMG}/common/btn_next.gif"></a>
					<a href="#none" class="last"><img src="${IMG}/common/btn_last.gif"></a>
				</div>

				
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

			<div class="pop-layer size1 bounceInDown animated" id="layer_pop05">
				<!--#include file="../popup/pop_관리사등록수정.html" -->	
			</div>
			<div class="pop-layer size2 bounceInDown animated" id="layer_pop06">
				<!--#include file="../popup/pop_관리사근무등록.html" -->	
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop07">
				<!--#include file="../popup/pop_관리사근무수정.html" -->	
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop08">
				<!--#include file="../popup/pop_예약정보수정.html" -->	
			</div>
			<div class="pop-layer size1 bounceInDown animated" id="layer_pop09">
				<!--#include file="../popup/pop_대기정보수정.html" -->	
			</div>
		</div><!-- //layer -->
		<!-- 레이어팝업 : E -->

	</body>
</html>