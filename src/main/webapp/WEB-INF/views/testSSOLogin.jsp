<%@ page contentType="text/html; charset=utf-8" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>SKT헬스케어예약시스템</title>					
	</head>
	<body>

		<div class="wrap">
			<form action="" method="post">
				<input id="id149365" name="id" type="radio" value="P149365" checked /><label for="id149365">유준희 (P149365, 남, SKT-타워)</label><br/>
				<input id="id149080" name="id" type="radio" value="P149080" /><label for="id149080">이중현 (P149080, 남, SKT-타워)</label><p/>	
				<input id="id021090" name="id" type="radio" value="P021090" /><label for="id021090">김대종 (P021090, 남, SKT-타워)</label><p/>	
				<input id="id1901080" name="id" type="radio" value="1901080" /><label for="id1901080">김대종 (1901080, 남, SKT-타워)</label><p/>			
				<input id="id1" name="id" type="radio" value="P150001" /><label for="id1">구성원1 (P150001, 남, SKT-타워)</label><br/>
				<input id="id2" name="id" type="radio" value="P150002" /><label for="id2">구성원2 (P150002, 여, SKT-타워)</label><br/>
				<input id="id3" name="id" type="radio" value="P150003" /><label for="id3">구성원3 (P150003, 남, 분당사옥)</label><br/>
				<input id="id4" name="id" type="radio" value="P150004" /><label for="id4">구성원4 (P150004, 여, 분당사옥)</label><br/>
				<input id="id5" name="id" type="radio" value="P100000" /><label for="id5">담당자</label><p/>
				<input id="id" name="id" type="radio" /><label for="id">직접입력</label> &nbsp;<input id="myid" type="text" placeholder="사번"></input>
				<p/>
				<a href="javascript:login()">테스트 로그인</a>
				<p/>				
			</form>
		</div>		

	</body>
	<script>
		function login(){
			var id = document.querySelector('input[name="id"]:checked').value;
			
			if(id=='on'){
				id = document.getElementById('myid').value;
			}
			
			if(!id){
				alertPopup('사용자를 선택하거나, 사번을 입력하세요.');
				return false;
			}
			
			 
			var request = new XMLHttpRequest();
			request.onreadystatechange= function () {
			    if (request.readyState==4) {			        
			    	if(request.responseURL){
			    		location.href=request.responseURL;
			    	}else{
			    		//ie
				    	location.href = '${ROOT}/resve/status';
			    	}
			    }
			}
			request.open("POST", "${ROOT}/ssoLogin", true);
			request.setRequestHeader("SM_USER", id);			
			request.send();
		}
	</script>
</html>