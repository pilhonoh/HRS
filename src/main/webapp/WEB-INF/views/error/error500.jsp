<%@ page contentType="text/html; charset=utf-8" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<jsp:include page="${JSP}/include/resource.jsp" />
	</head>	

	<body>

		<div class="error-wrap">
			<div class="error-cont">
				<strong class="fs1">죄송합니다.</strong>
				<h1 class="fs2">요청하신 <span>작업을 수행중 오류가 발생하였습니다.</span></h1>
				<p class="fs3">					
					<strong>작업을 재 수행해보시기 바랍니다.</strong> <br>
					문제가 반복될 경우에는, 관리자에게 문의하시기 바랍니다.		
				</p>
			</div>
			<div class="pop-btn-area">
				<button class="pop-btn" onclick="history.back();">이전</button>
				<!-- <button class="pop-btn gray" onclick="window.open('','_self').close();;">닫기</button> -->				
			</div>
		</div>

	</body>
</html>