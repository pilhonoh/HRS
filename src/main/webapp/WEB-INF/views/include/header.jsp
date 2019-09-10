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
	<ul class="gnb-menu">
		<li class="selected"><a href="${ROOT}/resve/status"><i class="xi-calendar-check"></i>예약하기</a></li>
		<li><a href="${ROOT}/resve/list"><i class="xi-document"></i>예약신청</a></li>
		<li><a href="${ROOT}/mssr/schedule"><i class="xi-cog"></i>관리자</a></li>
	</ul>
	<p class="user-desc">
		<strong>${sessionScope.LoginVo.hname}<em>님</em></strong>
		<span>예약 <em>0</em> 건 / 대기 <em>0</em>건</span>
	</p>
</div>