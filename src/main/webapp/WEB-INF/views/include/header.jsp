<%@ page contentType="text/html; charset=utf-8" %>

<div class="inner">
	<h1 class="logo">SKT헬스케어</h1>
	<ul class="gnb-menu">
		<li><a href="${ROOT}/resve/status">예약하기</a></li>
		<li><a href="${ROOT}/resve/list">예약현황</a></li>
		<li><a href="#none">관리자</a></li>
	</ul>
	<p class="user-desc">
		<strong>홍길동님,</strong>
		예약 <span id="resveCnt">0</span> 건 ,
		대기 <span id="waitCnt">0</span> 건이 있습니다.
	</p>
</div>