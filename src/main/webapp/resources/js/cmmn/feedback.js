/**
 * 문의/오류 신고하기
 */
var feedback = {
	// 팝업 호출
	popup : function(){
		$('#layer_pop14').load(
			ROOT + '/pop/feedback', {}, 
			function(res){
				$('#layer_pop14 #btnOk').on('click', function(){
					feedback.send();
				});	
				openLayerPopup('layer_pop14');
			}
		);	
	},
	// 신고하기
	send : function(){
		console.log('피드백 보내기');
		var contents = $('#feedbackContents').val();
		
		if(!contents){
			alert('내용을 입력하세요.');
			false;
		}
		
		$.ajax({
			url: ROOT + '/feedback',
			type: 'POST',
			data: {contents: contents},
			success : function(res){
				console.log('feedback',res);				
				//resveStatus.table.refresh();
				closeLayerPopup();
			},
			error : function(err) {
				console.error(err)
			}
		});
	}
}