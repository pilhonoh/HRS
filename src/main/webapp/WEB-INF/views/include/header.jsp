<%@ page contentType="text/html; charset=utf-8" %>
<script>
var SESSION = {
	EMPNO : '${sessionScope.LoginVo.empno}',
	HNAME : '${sessionScope.LoginVo.hname}',
	SEX : '${sessionScope.LoginVo.tSex}',
	PLACE: '${sessionScope.LoginVo.place}'
}
var header = {
	getMonthCount : function(){
		$.ajax({
			url: ROOT + '/resve/monthCnt',
			data: {},
			success : function(res){
				console.log('monthCht',res);
				$('.header .user-desc #resveCnt').text(res.item.RESVE_CNT);
				$('.header .user-desc #waitCnt').text(res.item.WAIT_CNT);
				$('.header .user-desc').show();
				
			},
			error : function(err) {
				console.error(err)
			}
		})
	}
}
$(document).ready(function(){		
	$('.gnb-menu li').each(function(i,e){		
		if($(this).find('a').attr('href') == (ROOT + location.pathname)){
			$(this).addClass('selected');	//gbn 메뉴 선택표시
		}		
	})
	
	header.getMonthCount();
})

</script>

<div class="inner">
	<a href="${ROOT}/resve/status"><h1 class="logo">SKT헬스케어</h1></a>
	<ul class="gnb-menu">
		<li><a href="${ROOT}/resve/status"><i class="xi-calendar-check"></i>예약하기</a></li>
		<li><a href="${ROOT}/resve/list"><i class="xi-document"></i>예약현황</a></li>
<<<<<<< HEAD
		<c:if test="${!empty sessionScope.LoginVo.auth}">
		<li><a href="${ROOT}/mssr/schedule"><i class="xi-cog"></i>관리자</a></li>
		</c:if>		
=======
		<li><a href="${ROOT}/mssr/schedule"><i class="xi-cog"></i>관리자</a></li>		
>>>>>>> branch 'master' of http://p149365@devops.sktelecom.com/mygit/scm/hrs/hrs.git
	</ul>
	<p class="user-desc">
		<strong>${sessionScope.LoginVo.hname}<em>님</em></strong>
		<span>예약 <em id="resveCnt">0</em> 건 / 대기 <em id="waitCnt">0</em>건</span>
	</p>
</div>
