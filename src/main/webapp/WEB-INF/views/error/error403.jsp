<%@ page contentType="text/html; charset=utf-8" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<jsp:include page="${JSP}/include/resource.jsp" />
	</head>	

	<body>

		<div class="error-wrap">
			<div class="error-cont">
				<h1 class="fs2">해당 시스템에 대한<span>접속 가능한 사용자가 아닙니다.</span></h1>
				<p class="fs3">
					본 작업을 수행할 권한이 없습니다. <br>
					<strong>다시 한번 시도해 주시고, 추가 사항은 ISAC(1599-2365)으로 문의하시기 바랍니다.</strong>					
				</p>
			</div>
			<div class="pop-btn-area">
<!-- 				<button class="pop-btn" onclick="history.back();">이전</button> -->
				<button class="pop-btn" onclick="window.open('','_self').close();;">닫기</button>
			</div>
		</div>

	</body>
</html>