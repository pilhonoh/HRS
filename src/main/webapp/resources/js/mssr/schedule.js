/**
 * 관리사 스케쥴 List
 */
var scheduleList = {
	// 초기화
	init: function() {
		loadCodeSelect(); //콤보박스 공통코드 세팅
		scheduleList.datepicker.setDefaultValue(); //datepicker 기본값 세팅
		scheduleList.list.renderResveList(); //목록 조회 후 렌더
		scheduleList.button.listBtnClickEvent(); //조회 버튼 클릭 이벤트
	},
	
	
	cmmnCode: {
		allCodeList: [],
		getAllCodeList: function() {
			$.ajax({
				url: ROOT + '/cmmn/allCodeList',
				success: function(res) {
					console.log('allCodeList', res);
					if (res.status === 200) {
						scheduleList.cmmnCode.allCodeList = res.list;
					}
				},
				error: function(err) {
					console.error(err);
				}
			})
		},
		codeToName: function(code) {
			var allCodeList = scheduleList.cmmnCode.allCodeList;
			
			if (allCodeList.length == 0) {
				scheduleList.cmmnCode.getAllCodeList();
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
		setDefaultValue: function() { //기본 날짜 세팅
			var fromDate = moment().subtract(30, 'd').format('YYYY-MM-DD'); //30일 전 날짜
			var toDate = moment().format('YYYY-MM-DD'); //오늘 날짜
			
			$('input#from_date').val(fromDate);
			$('input#to_date').val(toDate);
			
			scheduleList.list.params.fromDate = moment().subtract(30, 'd').format('YYYYMMDD');
			scheduleList.list.params.toDate = moment().format('YYYYMMDD');
		}
	},
	
	
	combobox: {
		deleteStsOption: function() {
			$('select#stsCombo option[value="STS00"]').remove(); //'미예약' 삭제
			$('select#stsCombo option[value="STS99"]').remove(); //'근무취소' 삭제
		}
	},
	
	
	
	list: {
		
		//목록 조회 시 사용하는 파라미터
		params: {
			pageNo: 1, //조회할 페이지 번호
			rowPerPage: 6, //한 페이지 당 조회할 ROW 수
			fromDate: '', //조회 시작 날짜
			toDate: '', //조회 끝 날짜
			statusCode: '', //상태
			startRow: 0 //조회 시작할 ROW
		},
		
		//현재 조회된 데이터 저장
		dataList: [],
		
		//예약 목록 조회
		selectResveList: function() {
			
			scheduleList.list.params.startRow = parseInt((scheduleList.list.params.pageNo - 1 ) * scheduleList.list.params.rowPerPage);
			
			console.log(scheduleList.list.params.startRow);
			console.log(scheduleList.list.params.rowPerPage);
			
			var deferred = $.Deferred();
			
			$.ajax({
				url: ROOT + '/resve/selectResveList',
				data: scheduleList.list.params,
				success: function(res) {
					console.log('scheduleList', res);
					if (res.status === 200) {
						deferred.resolve(res);
						scheduleList.list.dataList = res.list;
						
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
			$.when(scheduleList.list.selectResveList()).done(function(result) {

				$('tbody#resveList').empty();
				
				var resultList = result.list;
				var resveListHtml = [];
				var btnText = '';
				var btnClass = '';
				var resveDt = '';
				
				scheduleList.paging.params.totalCount = result.customs.totalCount;
				
				for (var i in resultList) {
					var stsCode = resultList[i].LAST_STTUS_CODE;
					if (stsCode == 'STS01') {
						btnText = '예약취소';
						btnClass = 'resveCancelBtn';
					} else if (stsCode == 'STS03') {
						btnText = '대기취소';
						btnClass = 'waitCancelBtn';
					}
					
					var resve_de = resultList[i].RESVE_DE;
					resveDt = resve_de.substr(0,4) + '-' + resve_de.substr(4,2) + '-' + resve_de.substr(6,2);
					
					resveListHtml.push('<tr>');
					resveListHtml.push('	<td>' + resveDt + '</td>');
					resveListHtml.push('	<td>' + resultList[i].RESVE_TM_TXT + '</td>');
					resveListHtml.push('	<td>' + resultList[i].BLD_NM + '</td>');
					resveListHtml.push('	<td>' + resultList[i].MSSR_NCNM + '</td>');
					resveListHtml.push('	<td>' + resultList[i].BED_NM + '</td>');
					resveListHtml.push('	<td>' + resultList[i].REG_DT_TXT + '</td>');
					resveListHtml.push('	<td>' + resultList[i].STTUS_NM + '</td>');
					resveListHtml.push('	<td>');
					if (stsCode == 'STS01' || stsCode == 'STS03') {
						resveListHtml.push('		<button class="t-btn ' + btnClass + '" data-resveno="' + resultList[i].RESVE_NO + '">' + btnText + '</button>');
					}
					resveListHtml.push('	</td>');
					resveListHtml.push('</tr>');
				}
				
				$('tbody#resveList').html(resveListHtml.join(''));
				scheduleList.paging.renderPaging();
				
				scheduleList.button.resveCancelBtnEvent();
				scheduleList.button.waitCancelBtnEvent();
				
			});
		},
		
		//현재 리스트에서 예약번호로 해당 ROW 의 데이터를 가져옴
		getRowData: function(resveNo) {
			var rowDataList = scheduleList.list.dataList;
			var rowData;
			
			for (var i in rowDataList) {
				if (rowDataList[i].RESVE_NO == resveNo) {
					rowData = rowDataList[i];
					break;
				}
			}
			
			return rowData;
		}

	},
	
	
	paging: {
		//페이징 처리를 위한 파라미터
		params: {
			totalCount: null, //list 의 전체 row count
			first: null, //첫페이지
			last: null, //마지막페이지
			prev: null, //이전페이지
			next: null //다음페이지
		},
		
		//페이지 이동 영역 생성
		renderPaging: function() {
			
			var currentIndex = scheduleList.list.params.pageNo; //현재 페이지 위치
			var rowPerPage = scheduleList.list.params.rowPerPage; //페이지 당 레코드 수
			var totalCount = scheduleList.paging.params.totalCount; //list 의 전체 row count
			var totalIndexCount = Math.ceil(totalCount / rowPerPage); //전체 인덱스 수
			
			$("div#pagingArea").empty();
			var preStr = '';
			var postStr = '';
			var pageNumStr = '';
			
			var first = (parseInt((currentIndex-1) / 10) * 10) + 1;
			var last = (parseInt(totalIndexCount/10) == parseInt(currentIndex/10)) ? totalIndexCount%10 : 10;
			var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1; 
			var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount;
			
			scheduleList.paging.params.first = first;
			scheduleList.paging.params.last = last;
			scheduleList.paging.params.prev = prev;
			scheduleList.paging.params.next = next;
			
			/*
			if (totalIndexCount > 10) { //전체 인덱스가 10이 넘을 경우, first + prev 버튼
				preStr += '<a href="#none" class="first" id="firstBtn"><img src="' + IMG + '/common/btn_first.gif"></a>'
					   +  '<a href="#none" class="prev" id="prevBtn"><img src="' + IMG + '/common/btn_prev.gif"></a>';
			} else if (totalIndexCount <=10 && totalIndexCount > 1) { //전체 인덱스가 10보다 작을 경우, first 버튼
				preStr += '<a href="#none" class="first" id="firstBtn"><img src="' + IMG + '/common/btn_first.gif"></a>';
			}
			*/
			preStr += '<a href="#none" class="first" id="firstBtn"><img src="' + IMG + '/common/btn_first.gif"></a>'
			   	   +  '<a href="#none" class="prev" id="prevBtn"><img src="' + IMG + '/common/btn_prev.gif"></a>';
			
			
			/*
			if (totalIndexCount > 10) { //전체 인덱스가 10이 넘을 경우, next + last 버튼
				postStr += '<a href="#none" class="next" id="nextBtn"><img src="' + IMG + '/common/btn_next.gif"></a>'
						+  '<a href="#none" class="last" id="lastBtn"><img src="' + IMG + '/common/btn_last.gif"></a>';
			} else if (totalIndexCount <=10 && totalIndexCount > 1) { //전체 인덱스가 10보다 작을 경우, last 버튼
				postStr += '<a href="#none" class="last" id="lastBtn"><img src="' + IMG + '/common/btn_last.gif"></a>';
			}
			*/
			postStr += '<a href="#none" class="next" id="nextBtn"><img src="' + IMG + '/common/btn_next.gif"></a>'
			        +  '<a href="#none" class="last" id="lastBtn"><img src="' + IMG + '/common/btn_last.gif"></a>';

			for (var i=first; i<(first+last); i++) {
				if (i != currentIndex) {
					pageNumStr += '<a href="#none" class="num">' + i + '</a>';
				} else {
					pageNumStr += '<a href="#none" class="num selected">' + i + '</a>';
				}
			}
			
			$("div#pagingArea").append(preStr + pageNumStr + postStr);
			
			scheduleList.paging.button.allPagingBtnEventBinding();
		},
		
		button: {
			allPagingBtnEventBinding: function() {
				scheduleList.paging.button.pageNumEvent();
				scheduleList.paging.button.prevBtnEvent();
				scheduleList.paging.button.nextBtnEvent();
				scheduleList.paging.button.firstBtnEvent();
				scheduleList.paging.button.lastBtnEvent();
			},
			
			pageNumEvent: function() {
				$('a.num').off();
				$('a.num').on('click', function() {
					if (scheduleList.list.params.pageNo == parseInt(this.innerHTML)) {
						return false;
					}
					scheduleList.list.params.pageNo = parseInt(this.innerHTML);
					scheduleList.list.renderResveList();
				});
			},
			
			prevBtnEvent: function() {
				$('a#prevBtn').off();
				$('a#prevBtn').on('click', function() {
					if (scheduleList.list.params.pageNo == scheduleList.paging.params.prev) {
						return false;
					}
					scheduleList.list.params.pageNo = scheduleList.paging.params.prev;
					scheduleList.list.renderResveList();
				});
			},
			
			nextBtnEvent: function() {
				$('a#nextBtn').off();
				$('a#nextBtn').on('click', function() {
					if (scheduleList.list.params.pageNo == scheduleList.paging.params.next) {
						return false;
					}
					scheduleList.list.params.pageNo = scheduleList.paging.params.next;
					scheduleList.list.renderResveList();
				});
			},
			
			firstBtnEvent: function() {
				$('a#firstBtn').off();
				$('a#firstBtn').on('click', function() {
					if (scheduleList.list.params.pageNo == scheduleList.paging.params.first) {
						return false;
					}
					scheduleList.list.params.pageNo = scheduleList.paging.params.first;
					scheduleList.list.renderResveList();
				});
			},
			
			lastBtnEvent: function() {
				$('a#lastBtn').off();
				$('a#lastBtn').on('click', function() {
					if (scheduleList.list.params.pageNo == scheduleList.paging.params.last) {
						return false;
					}
					scheduleList.list.params.pageNo = scheduleList.paging.params.last;
					scheduleList.list.renderResveList();
				});
			}
		}
		
	},
	
	
	
	button: {
		
		cancelBtnStatus: {
			type: '', //예약취소(resve) or 대기취소(wait)
			rowData: {} //취소버튼의 rowData
		},
		
		//조회 버튼 클릭 이벤트
		listBtnClickEvent: function() {
			$('button#listBtn').on('click', function(e) {
				//날짜 validation 실행
				scheduleList.validation.dateCheck();
				
				//조회 페이지는 1로 초기화 param 세팅
				scheduleList.list.params.pageNo = 1;
				
				//상태 param 세팅
				scheduleList.list.params.statusCode = $('#stsCombo').val();
								
				//목록 조회 및 렌더 실행
				scheduleList.list.renderResveList();
			});
		},
		
		//예약취소 버튼 클릭 이벤트
		resveCancelBtnEvent: function() {
			$('button.resveCancelBtn').off();
			$('button.resveCancelBtn').on('click', function(e) {
				var btn = $(this);
				
				console.log(scheduleList.list.getRowData(btn.data('resveno')));
				
				scheduleList.button.cancelBtnStatus.type = 'resve';
				scheduleList.button.cancelBtnStatus.rowData =  scheduleList.list.getRowData(btn.data('resveno'));
				
				scheduleList.popup.showCancelPopup();
			});
		},
		
		//대기취소 버튼 클릭 이벤트
		waitCancelBtnEvent: function() {
			$('button.waitCancelBtn').off();
			$('button.waitCancelBtn').on('click', function(e) {
				var btn = $(this);
				
				console.log(scheduleList.list.getRowData(btn.data('resveno')));
				
				scheduleList.button.cancelBtnStatus.type = 'wait';
				scheduleList.button.cancelBtnStatus.rowData =  scheduleList.list.getRowData(btn.data('resveno'));
				
				scheduleList.popup.showCancelPopup();
			});
		}
	},
	
	
	
	validation: {
		//날짜 필드 값 체크
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
			
			scheduleList.list.params.fromDate = fromdt;
			scheduleList.list.params.toDate = todt;
			
			return true;
		}
	},
	
	
	popup: {
		showCancelPopup: function() {
			var rowData = scheduleList.button.cancelBtnStatus.rowData;
			
			$('#layer_pop03').load(ROOT + '/resve/pop/cancel', {resveNo : rowData.RESVE_NO, cancelGbn: rowData.LAST_STTS_CODE}, function(res){	
				openLayerPopup('layer_pop03');
			});
		},
		
		confirmBtn: function() {
			
		},
		
		cancelBtn: function() {
			
		}
	}

}



$(document).ready(function() {	
	scheduleList.init();
});



$(window).load(function() {
	scheduleList.combobox.deleteStsOption();
});


