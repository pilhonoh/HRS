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
			</header><!-- //header -->

			<div class="content">
				
				<div class="tit-area">
					<h2>헬스케어 예약 현황</h2>
				</div>

				<div class="month-area">
					<div class="month-btn pre">
						<button class="pre"><i class="xi-angle-left-min"></i></button>
					</div>
					<div class="calendar-area">
						<table class="month-calendar">
							<tbody>
								<tr>						
									
									<td><div class="cal-day"><em>MON</em><span>19</span></div></td>
									<td><div class="cal-day"><em>THE</em><span>20</span></div></td>
									<td><div class="cal-day"><em>WED</em><span>21</span></div></td>
									<td><div class="cal-day"><em>THU</em><span>22</span></div></td>
									<td><div class="cal-day today"><em>FRI</em><span>23</span></div></td>
									<td><div class="cal-day sat"><em>SAT</em><span>24</span></div></td>
									<td><div class="cal-day sun"><em>SUN</em><span>25</span></div></td>
						
									<td><div class="cal-day"><em>MON</em><span>26</span></div></td>
									<td><div class="cal-day"><em>THE</em><span>27</span></div></td>
									<td><div class="cal-day"><em>WED</em><span>28</span></div></td>
									<td><div class="cal-day"><em>THU</em><span>29</span></div></td>
									<td><div class="cal-day"><em>FRI</em><span>30</span></div></td>
									<td><div class="cal-day sat"><em>SAT</em><span>31</span></div></td>

									<td><div class="cal-day month"><em>2019</em><span>09</span></div></td>
									<td><div class="cal-day sat"><em>SUN</em><span>01</span></div></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="month-btn next">
						<button class="next"><i class="xi-angle-right-min"></i></button>
					</div>
				</div>

				<!-- <div class="month-select">
					<button class="pre"><i class="xi-angle-left-min"></i></button>
					<span><i class="xi-calendar-check"></i><strong>2019.08</strong></span>
					<button class="next"><i class="xi-angle-right-min"></i></button>
				</div>
				
				<table class="month-calendar">
					<tbody>
						<tr>
							<td><div class="cal-day off"><em>THU</em><span>01</span></div></td>
							<td><div class="cal-day off"><em>FRI</em><span>02</span></div></td>
							<td><div class="cal-day sat off"><em>SAT</em><span>03</span></div></td>
							<td><div class="cal-day sun off"><em>SUN</em><span>04</span></div></td>
				
							<td><div class="cal-day off"><em>MON</em><span>05</span></div></td>
							<td><div class="cal-day off"><em>THE</em><span>06</span></div></td>
							<td><div class="cal-day off"><em>WED</em><span>07</span></div></td>
							<td><div class="cal-day off"><em>THU</em><span>08</span></div></td>
							<td><div class="cal-day off"><em>FRI</em><span>09</span></div></td>
							<td><div class="cal-day sat off"><em>SAT</em><span>10</span></div></td>
							<td><div class="cal-day sun off"><em>SUN</em><span>11</span></div></td>
				
							<td><div class="cal-day off"><em>MON</em><span>12</span></div></td>
							<td><div class="cal-day off"><em>THE</em><span>13</span></div></td>
							<td><div class="cal-day off"><em>WED</em><span>14</span></div></td>
							<td><div class="cal-day off"><em>THU</em><span>15</span></div></td>
							<td><div class="cal-day off"><em>FRI</em><span>16</span></div></td>
							<td><div class="cal-day sat off"><em>SAT</em><span>17</span></div></td>
							<td><div class="cal-day sun off"><em>SUN</em><span>18</span></div></td>
				
							<td><div class="cal-day off"><em>MON</em><span>19</span></div></td>
							<td><div class="cal-day off"><em>THE</em><span>20</span></div></td>
							<td><div class="cal-day off"><em>WED</em><span>21</span></div></td>
							<td><div class="cal-day today"><em>THU</em><span>22</span></div></td>
							<td><div class="cal-day"><em>FRI</em><span>23</span></div></td>
							<td><div class="cal-day sat"><em>SAT</em><span>24</span></div></td>
							<td><div class="cal-day sun"><em>SUN</em><span>25</span></div></td>
				
							<td><div class="cal-day"><em>MON</em><span>26</span></div></td>
							<td><div class="cal-day"><em>THE</em><span>27</span></div></td>
							<td><div class="cal-day"><em>WED</em><span>28</span></div></td>
							<td><div class="cal-day"><em>THU</em><span>29</span></div></td>
							<td><div class="cal-day"><em>FRI</em><span>30</span></div></td>
							<td><div class="cal-day sat"><em>SAT</em><span>31</span></div></td>
						</tr>
					</tbody>
				</table> -->

				<div class="sub-tit">
					<h3>2019년 8월 26일(월) 예약 : T타워</h3>
					<div class="f-right select-design">
						<span>사옥선택 :</span>
						<select>
							<option>T타워</option>
							<option>T타워</option>
							<option>T타워</option>
						</select>
					</div>
				</div>

				<table class="reservation-table">
					<colgroup>
						<col>
						<col style="width:10%">
						<col style="width:10%">
						<col style="width:10%">
						<col style="width:10%">
						<col style="width:10%">
						<col style="width:10%">
						<col style="width:10%">
						<col style="width:10%">
						<col style="width:10%">
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
						<tr>
							<th>A</th>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>	
						<tr>
							<th>A</th>
							<td>
								<div class="rv-box colspan1 man">
									<p class="name"><strong>man</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
									</ul>
								</div>
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>	
						<tr>
							<th>A</th>
							<td colspan="2">
								<div class="rv-box colspan2 woman">
									<p class="name"><strong>woman</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1">예약가능</button></li>
									</ul>
								</div>
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>	
						<tr>
							<th>A</th>
							<td colspan="3">
								<div class="rv-box colspan3 man">
									<p class="name"><strong>James</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1">예약가능</button></li>
										<li><button class="rv-btn st2">대기가능</button></li>
									</ul>
								</div>
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>	
						<tr>
							<th>A</th>
							<td colspan="4">
								<div class="rv-box colspan4 woman">
									<p class="name"><strong>James</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1">예약가능</button></li>
										<li><button class="rv-btn st2">대기가능</button></li>
										<li><button class="rv-btn st3">예약완료</button></li>
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
							<th>A</th>
							<td colspan="5">
								<div class="rv-box colspan5 man">
									<p class="name"><strong>James</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1">예약가능</button></li>
										<li><button class="rv-btn st2">대기가능</button></li>
										<li><button class="rv-btn st3">예약완료</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
									</ul>
								</div>
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>	
						<tr>
							<th>A</th>
							<td colspan="6">
								<div class="rv-box colspan6 woman">
									<p class="name"><strong>James</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1">예약가능</button></li>
										<li><button class="rv-btn st2">대기가능</button></li>
										<li><button class="rv-btn st3">예약완료</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
									</ul>
								</div>
							</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>	
						<tr>
							<th>A</th>
							<td colspan="7">
								<div class="rv-box colspan7 man">
									<p class="name"><strong>James</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1">예약가능</button></li>
										<li><button class="rv-btn st2">대기가능</button></li>
										<li><button class="rv-btn st3">예약완료</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
									</ul>
								</div>
							</td>
							<td></td>
							<td></td>
						</tr>	
						<tr>
							<th>A</th>
							<td colspan="8">
								<div class="rv-box colspan8 woman">
									<p class="name"><strong>James</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1">예약가능</button></li>
										<li><button class="rv-btn st2">대기가능</button></li>
										<li><button class="rv-btn st3">예약완료</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
									</ul>
								</div>
							</td>
							<td></td>
						</tr>	
						<tr>
							<th>A</th>
							<td colspan="9">
								<div class="rv-box colspan9 man">
									<p class="name"><strong>James</strong></p>
									<ul class="rv-btn-area">
										<li><button class="rv-btn" disabled>예약불가</button></li>
										<li><button class="rv-btn st1">예약가능</button></li>
										<li><button class="rv-btn st2">대기가능</button></li>
										<li><button class="rv-btn st3">예약완료</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
										<li><button class="rv-btn st4">대기중</button></li>
									</ul>
								</div>
							</td>
						</tr>	
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

				<!-- 팝업 확인을 위한 버튼 -->
				<br><br><br><br><br><br>
				<p>※ 팝업 확인을 위한 버튼</p><br>
				<button class="t-btn" onclick="e_layer_pop01('layer_pop01');"><em class="icon01">pop_예약신청</em></button>
				<button class="t-btn" onclick="e_layer_pop02('layer_pop02');"><em class="icon01">pop_대기신청</em></button>
				<button class="t-btn" onclick="e_layer_pop03('layer_pop03');"><em class="icon01">pop_예약대기취소</em></button>
				<button class="t-btn" onclick="e_layer_pop04('layer_pop04');"><em class="icon01">pop_시작확인</em></button> 
				<br><br><br>
				<!-- 팝업 확인을 위한 버튼 -->
				
				
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