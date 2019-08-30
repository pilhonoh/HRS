/**
 * 예약 List
 */
var resveList = {
	// 초기화
	init: function() {
		loadCodeSelect(); //콤보박스 공통코드 세팅
		resveList.datepicker.setDefaultValue(); //datepicker 기본값 세팅
		resveList.list.renderResveList(); //목록 조회 후 렌더
		resveList.button.listBtnClickEvent(); //조회 버튼 클릭 이벤트
	},
	
	
	cmmnCode: {
		allCodeList: [],
		getAllCodeList: function() {
			$.ajax({
				url: ROOT + '/cmmn/allCodeList',
				success: function(res) {
					console.log('allCodeList', res);
					if (res.status === 200) {
						resveList.cmmnCode.allCodeList = res.list;
					}
				},
				error: function(err) {
					console.error(err);
				}
			})
		},
		codeToName: function(code) {
			var allCodeList = resveList.cmmnCode.allCodeList;
			
			if (allCodeList.length == 0) {
				resveList.cmmnCode.getAllCodeList();
			}
			
			var codeName = '';
			for (var i in allCodeList) {
				if (allCodeList[i].CODE == code) {
					codeName = allCodeList[i].CODE_NM;
					break;
				}
			}
			
			return codeName;
		}
	},
	
	
	
	datepicker: {
		setDefaultValue: function() {
			var fromDate = moment().subtract(30, 'd').format('YYYY-MM-DD'); //30일 전 날짜
			var toDate = moment().format('YYYY-MM-DD'); //오늘 날짜
			
			$('input#from_date').val(fromDate);
			$('input#to_date').val(toDate);
			
			resveList.list.params.fromDate = moment().subtract(30, 'd').format('YYYYMMDD');
			resveList.list.params.toDate = moment().format('YYYYMMDD');
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
		selectResveList: function() {
			
			var deferred = $.Deferred();
			
			$.ajax({
				url: ROOT + '/resve/selectResveList',
				data: resveList.list.params,
				success: function(res) {
					console.log('resveList', res);
					if (res.status === 200) {
						deferred.resolve(res);
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

				$('tbody#resveList').empty();
				
				var resveList = result.list;
				var resveListHtml = [];
				var btnText = '';
				var resveDt = '';
				
				for (var i in resveList) {
					var stsCode = resveList[i].LAST_STTUS_CODE;
					if (stsCode == 'STS01') {
						btnText = '예약취소';
					} else if (stsCode == 'STS03') {
						btnText = '대기취소';
					}
					
					var resve_de = resveList[i].RESVE_DE;
					resveDt = resve_de.substr(0,4) + '-' + resve_de.substr(4,2) + '-' + resve_de.substr(6,2);
					
					resveListHtml.push('<tr>');
					resveListHtml.push('	<td>' + resveDt + '</td>');
					resveListHtml.push('	<td>' + resveList[i].RESVE_TM_TXT + '</td>');
					resveListHtml.push('	<td>' + resveList[i].BLD_NM + '</td>');
					resveListHtml.push('	<td>' + resveList[i].NCNM + '</td>');
					resveListHtml.push('	<td>' + resveList[i].BED_NM + '</td>');
					resveListHtml.push('	<td>' + resveList[i].REG_DT_TXT + '</td>');
					resveListHtml.push('	<td>' + resveList[i].STTUS_NM + '</td>');
					resveListHtml.push('	<td>');
					if (stsCode == 'STS01' || stsCode == 'STS03') {
						resveListHtml.push('		<button class="t-btn">' + btnText + '</button>');
					}
					resveListHtml.push('	</td>');
					resveListHtml.push('</tr>');
				}
				
				$('tbody#resveList').html(resveListHtml.join(''));
				
			});
		}

	},
	
	button: {
		listBtnClickEvent: function() {
			$('button#listBtn').on('click', function(e) {
				//날짜 validation 실행
				resveList.validation.dateCheck();
				
				//조회 페이지는 1로 초기화 param 세팅
				resveList.list.params.pageNo = 1;
				
				//상태 param 세팅
				resveList.list.params.statusCode = $('#stsCombo').val();
								
				//목록 조회 및 렌더 실행
				resveList.list.renderResveList();
			});
		},
		
		resveCancelBtnEvent: function() {
			$('button .resveCancelBtn').off();
			$('button .resveCancelBtn').on('click', function(e) {
				
			});
		},
		
		waitCancelBtnEvent: function() {
			$('button .waitCancelBtn').off();
			$('button .waitCancelBtn').on('click', function(e) {
				
			});
		}
	},
	
	
	
	validation: {
		dateCheck: function() {
			var fromDate = $('input#from_date').val().trim().split('-');
			var toDate = $('input#to_date').val().trim().split('-');
			
			var fromdt = fromDate[0] + fromDate[1] + fromDate[2];
			var todt = toDate[0] + toDate[1] + toDate[2];
			
			if (fromdt.length !== 8) {
				alert('시작날짜 형식이 잘못되었습니다.');
				return false;
			}
			
			if (todt.length !== 8) {
				alert('종료날짜 형식이 잘못되었습니다.');
				return false;
			}
			
			if (fromdt > todt) {
				alert('시작날짜가 종료날짜가 클 수 없습니다.');
				return false;
			}
			
			resveList.list.params.fromDate = fromdt;
			resveList.list.params.toDate = todt;
			
			return true;
		}
	}
	

}



$(document).ready(function() {	
	resveList.init();
});


$(window).load(function() {
	resveList.combobox.deleteStsOption();
});


