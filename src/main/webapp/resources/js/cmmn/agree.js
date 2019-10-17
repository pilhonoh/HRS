var agree = {
	popup : function(){
		$.confirm({
			text: '헬스케어 서비스는 급여공제에 동의하셔야\n서비스 이용이 가능합니다.\n동의하시겠습니까?',
			callback: agree.do
		})
	},
	'do' : function(){
		$.ajax({
			url: ROOT + '/user/agree',
			type: 'POST',					
			success : function(res){
				if(res.item){					
					$.alert({
						text: '처리되었습니다.',
						icon: false,
						callback: function(){
							location.reload();
						}
					});
				}else{
					$.alert({text: getMessage('system.error')});
				}
			},
			error : function(err) {
				console.error(err)
			}
		});
	}

}