<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
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
		<c:forEach var="bed" items="${bedList}" varStatus="bedStatus">
			<tr>
				<th>${bed.CODE_NM}</th>				
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
		</c:forEach>
	
	
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