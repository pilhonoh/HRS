/**
 * 예약 List
 */
var resveList = {
	// 초기화
	init: function() {
		loadCodeSelect(); //콤보박스 공통코드 세팅
		resveList.datepicker.setDefaultValue(); //datepicker 기본값 세팅
		resveList.list.renderResveList(); //기본 목록 조회 후 렌더
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
		
		
		
		
	}
	

}



$(document).ready(function() {	
	resveList.init();
});


$(window).load(function() {
	resveList.combobox.deleteStsOption();
});


