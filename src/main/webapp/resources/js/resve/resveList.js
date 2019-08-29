/**
 * 예약 List
 */
var resveList = {
	// 초기화
	init: function() {
		loadCodeSelect(); //공통코드 로드
		resveList.datepicker.setDefaultValue(); //datepicker 기본값 세팅
		resveList.list.renderResveList(); //기본 목록 조회 후 렌더
	},
	
	
	datepicker: {
		setDefaultValue: function() {
			var toDate = moment().format('YYYY-MM-DD'); //오늘 날짜
			var fromDate = moment().subtract(30, 'd').format('YYYY-MM-DD'); //30일 전 날짜
			
			$('input#from_date').val(fromDate);
			$('input#to_date').val(toDate);
			
			resveList.list.params.fromDate = fromDate;
			resveList.list.params.toDate = toDate;
		}
	},
	
	
	combobox: {
		deleteStsOption: function() {
			$('select#stsCombo option[value="STS00"]').remove(); //'미예약' 삭제
		}
	},
	
	
	
	list: {
		
		params: {
			pageNo: 1,
			fromDate: '',
			toDate: '',
			statusCode: '' 
		},
		
		//예약 목록 조회
		selectResveList: function(pageNo) {
			
			var deferred = $.Deferred();
			
			$.ajax({
				url: ROOT + '/resve/selectResveList',
				data: resveList.list.params,
				success: function(res) {
					console.log('resveList',res);
					if (res.status === 200) {
						deferred.resolve(retData);
					} else {
						deferred.reject("");
					}
				},
				error: function(err) {
					console.error(err);
					deferred.reject("");
				}
			})
			
			return deferred.promise();
		},
		
		
		//조회된 예약 목록 데이터를 가지고 화면에 목록 생성
		renderResveList: function() {
			$.when(resveList.list.selectResveList()).done(function(result) {

				for (var i in result) {

				}
				$('').html();
			});
		}
		
		
		
		
	}
	

}



$(document).ready(function() {	
	resveList.init();
});


$(window).load(function() {
	resveList.combobox.deleteStsOption();
});


