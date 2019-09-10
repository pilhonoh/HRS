<%@ page contentType="text/html; charset=utf-8" %>
<script>
var ROOT = '${ROOT}';
var IMG = '${IMG}';
var SESSION = {
	EMPNO : '${sessionScope.LoginVo.empno}',
	HNAME : '${sessionScope.LoginVo.hname}',
	SEX : '${sessionScope.LoginVo.tSex}',
	PLACE: '${sessionScope.LoginVo.place}'
}
</script>
<div class="inner">
	<h1 class="logo">SKT헬스케어</h1>
	<ul class="gnb-menu admin">
		<li><a href="#none">관리사 등록</a></li>
		<li class="selected"><a href="${ROOT}/mssr/schedule">관리사 스케쥴 관리</a></li>
		<li><a href="#none">예약 정보 변경</a></li>
		<li><a href="#none">예약 현황 조회</a></li>
		<li><a href="#none">담당자 등록</a></li>
		<li><a href="#none">공통코드 관리</a></li>
	</ul>
	<p class="user-desc">
		<strong>${sessionScope.LoginVo.hname}<em>님</em></strong>
		<span>예약 <em>3</em> 건 / 대기 <em>3</em>건</span>
	</p>
</div>