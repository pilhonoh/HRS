/**
 * 예약현황
 */
var resveStatus = {
	data : {
		beds : [],
		selectedDate : undefined
	},
	// 초기화
	init: function(){
		
		resveStatus.setHeader();		// 헤더에 카운트표시		
		resveStatus.calendar.render();	// 달력 렌더링
		loadCodeSelect(function(){		// 공통코드 로드
			if(SESSION.PLACE){				
				$('[data-code-tyl=BLD] option[value='+SESSION.PLACE+']').attr('selected', true);	// default사옥선택
			}
			resveStatus.fillBeds()		// bed목록 조회
				.then(function(){
					$('.month-calendar .today span').trigger('click');
				})	
		});			
				
		$('[data-code-tyl=BLD]').on('change', resveStatus.bldOnChange);	// 사옥변경이벤트 바인딩		
					
	},
	// 헤더세팅
	setHeader : function(){
		$('.gnb-menu li:eq(0)').addClass('selected');	//gbn 메뉴 선택표시
		
		return $.ajax({
			url: ROOT + '/resve/monthCnt',
			data: {},
			success : function(res){
				console.log('monthCht',res);
				if(res.status === 200){										
					$('.header .user-desc #resveCnt').text(res.item.RESVE_CNT);
					$('.header .user-desc #waitCnt').text(res.item.WAIT_CNT);
					$('.header .user-desc').show();
				}else{
					alert(res.message)
				}
				
			},
			error : function(err) {
				console.error(err)
			}
		})
		
	},
	// 사옥변경 이벤트 리스너
	bldOnChange : function(e){
		console.log(e.target.value)
		resveStatus.fillBeds(e.target.value)
			.then(function(){
				$('.month-calendar .today span').trigger('click');
			})
	},
	// 해당사옥의 bed목록 조회
	fillBeds : function(bldCode){
		bldCode = bldCode || $('[data-code-tyl="BLD"').val();
		
		return $.ajax({
			url: ROOT + '/cmmn/codeList',
			data: {codeTyl: "BED", codeTys: bldCode},
			success : function(res){
				console.log('fillBeds',res);
				if(res.status === 200){					
					resveStatus.data.beds = res.list;											
				}else{
					alert(res.message)
				}
			},
			error : function(err) {
				console.error(err)
			}
		});
	},	
	// 상단 2주달력
	calendar: {
		// 렌더링
		render : function(){
								
			var dates = getAfter2Weeks();
			var elements = [];
								
			dates.forEach(function(d, i){
				
				var $td = $('<td>');
				var $div = $('<div>').addClass('cal-day');
				var $em = $('<em>').text(d.weekdayName);
				var $span = $('<span>').text(d.day);
				
				if(i==0 || d.day==1) {
					// 년월 입력
					var $tdCopy = $td.clone();
					var $divCopy = $div.clone().addClass('month');
					var $emCopy = $em.clone().text(d.year);
					var $spanCopy = $span.clone().text(d.month);
					
					elements.push(
							$tdCopy.append($divCopy.append($emCopy).append($spanCopy))					
					);
					if(i==0){
						// 오늘
						$div.removeClass('month').addClass('today');
						$em = $('<em>').text(d.weekdayName);
						$span = $('<span>').text(d.day);
					}
				}
				
				if(d.weekday == 6) $div.addClass('sat');
				if(d.weekday == 7) $div.addClass('sun');
				
				// 데이터 및 클릭 이벤트 바인딩
				$span.data('data', d);
				$span.on('click', resveStatus.calendar.click);
				
				elements.push(
					$td.append($div.append($em).append($span))					
				);
			});
			
			$('.month-calendar tbody tr').append(elements);			
		},
		// 클릭이벤트 리스너
		click: function(e){
			console.log('click',$(e.target).data('data'));
			var data = $(e.target).data('data');			
			var str = moment(data.date).locale('ko').format('YYYY년 M월 DD일(ddd)') + ' 예약 : ' + $('[data-code-tyl="BLD"] option:selected').text();
			$('.sub-tit h3').text(str);
			resveStatus.table.init();
			resveStatus.table.getStatus($(e.target).data('data').yyyymmdd)
			resveStatus.data.selectedDate = $(e.target).data('data');
		}
	},
	// 예약현황 테이블
	table : {
		// 초기화
		init: function(){
			var bedList = resveStatus.data.beds;
			var trList = [];
			bedList.forEach(function(bed){
				var $tr = $('<tr>').data(bed);
				var $th = $('<th>').text(bed.CODE_NM);
				$tr.append($th);
				
				for(var i=1; i<=9; i++){
					var $td = $('<td>').addClass(bed.CODE + '-' + i);
					$tr.append($td);
				}
				trList.push($tr);
			})
			$('.reservation-table tbody').empty().append(trList);	
		},
		// 새로고침
		refresh : function(){
			resveStatus.table.init();
			resveStatus.table.getStatus(resveStatus.data.selectedDate.yyyymmdd)
		},
		// 예약현황조회
		getStatus: function(yyyymmdd){
			if(!yyyymmdd){
				yyyymmdd = moment().format('YYYYMMDD');
			}
			$.ajax({				
				url: ROOT + '/resve/getStatus',
				data: {resveDe: yyyymmdd, bldCode: $('[data-code-tyl="BLD"').val()},
				success : function(res){
					console.log('getStatus',res);
					
					if(res.status === 200){
						
						var list = res.list;
						
						var last = undefined;
						var $div;
						
						function getButton(status){
							return {
								//예약가능
								'RESVE_POSBL' : $('<button>').text('예약가능').addClass('rv-btn st1').on('click', resveStatus.pop.regist),	
								//예약완료
								'RESVE_COMPT' : $('<button>').text('예약완료').addClass('rv-btn st3').on('click', resveStatus.pop.cancel),	
								//예약불가
								'RESVE_IMPRTY' : $('<button>').text('예약불가').addClass('rv-btn').attr('disabled', true),
								//대기가능
								'WAIT_POSBL' : $('<button>').text('대기가능').addClass('rv-btn st2').on('click', resveStatus.pop.wait),
								//대기중
								'WAIT' : $('<button>').text('대기중').addClass('rv-btn st4').on('click', resveStatus.pop.cancel),
								//예약취소
								'RESVE_CANCL' : '',
								//대기취소
								'WAIT_CANCL' : '',
								//완료
								'COMPT' : $('<button>').text('케어완료').addClass('rv-btn st5'),
								//노쇼 완료가능
								'NOSHOW_COMPT' : $('<button>').text('예약완료').addClass('rv-btn st3').on('click', resveStatus.pop.noshowConfirm),
								//노쇼
								'NOSHOW' : $('<button>').text('예약완료').addClass('rv-btn'),
							}[status]
						}
						
						list.forEach(function(stts){
							
							if(!last || 									// last가 없거나
								last.RESVE_TM != (stts.RESVE_TM-1) || 		// last가 현재시간-1이 아니거나(연속되지않거나) (같은날 떨어진근무)
								last.MSSR_EMPNO != stts.MSSR_EMPNO ||		// 관리사가 다른경우							
								last.BED_CODE != stts.BED_CODE){			// 베드가 다른경우							
								//근무를 새로 그림
								$div = $('<div class="rv-box">').addClass(stts.MSSR_SEXDSTN == 'F' ? 'woman' : 'man');
								var $p = $('<p class="name">').append($('<strong>').text(stts.MSSR_NCNM));
								var $ul = $('<ul class="rv-btn-area">');
								var $li = $('<li>')
											.attr('id', 'resve-'+stts.RESVE_NO)
											.data('data', stts)
											.append(getButton(stts.LAST_STTUS));
								
								var $td = $('.' + stts.BED_CODE + '-' + stts.RESVE_TM);
								
								$td.empty().append($div.append($p).append($ul.append($li)));
								
							}else{
								//이전근무에 연속해서 그림
								var $ul = $div.find('ul');
								var $li = $('<li>')
											.attr('id', 'resve-'+stts.RESVE_NO)
											.data('data', stts)
											.append(getButton(stts.LAST_STTUS));
								$ul.append($li);
								$div.parent('td').attr('colspan', $ul.find('li').length);	// td colspan
								$('.' + stts.BED_CODE + '-' + stts.RESVE_TM).remove();		// colspan을 했으니 td삭제
								$div.removeClass('colspan' + ($ul.find('li').length-1))		// div colspan
									.addClass('colspan' + $ul.find('li').length);
							}
							
							last = stts;
						})										
					}else{
						alert(res.message)
					}
					
					
					
				},
				error : function(err) {
					console.error(err.responseJSON)					
				}
			});			
		}
	},
	
	// 예약 등록
	regist : function(resveNo){
		$.ajax({
			url: ROOT + '/resve/regist',
			type: 'POST',
			data: {resveNo: resveNo},
			success : function(res){
				console.log('regist',res);
				
				if(res.status === 200){																					
					resveStatus.table.refresh();
					closeLayerPopup();
				}else{
					alert(res.message)
				}
			},
			error : function(err) {
				console.error(err)
			}
		});
	},
	// 대기등록
	wait : function(resveNo) {
		$.ajax({
			url: ROOT + '/resve/wait',
			type: 'POST',
			data: {resveNo: resveNo},
			success : function(res){
				console.log('wait',res);
				if(res.status === 200){					
					resveStatus.table.refresh();
					closeLayerPopup();
				}else{
					alert(res.message)
				}
			},
			error : function(err) {
				console.error(err)
			}
		});
	},
	// 예약/대기 취소
	cancel : function(resveNo, cancelGbn) {
		$.ajax({
			url: ROOT + '/resve/cancel',
			type: 'POST',
			data: {resveNo: resveNo, cancelGbn: cancelGbn},
			success : function(res){
				console.log('cancel',res);
				if(res.status === 200){					
					resveStatus.table.refresh();
					closeLayerPopup();			
				}else{
					alert(res.message)
				}
			},
			error : function(err) {
				console.error(err)
			}
		});
	},
	// 완료처리
	complete: function(resveNo) {
		$.ajax({
			url: ROOT + '/resve/complete',
			type: 'POST',
			data: {resveNo: resveNo},
			success : function(res){
				console.log('complete',res);
				if(res.status === 200){					
					resveStatus.table.refresh();
					closeLayerPopup();			
				}else{
					alert(res.message)
				}
			},
			error : function(err) {
				console.error(err)
			}
		});
	},
	
	// 팝업 호출 
	pop : {
		// 예약신청 팝업 호출
		regist : function(e){
			var $li = $(e.target).parent('li');			
			$('#layer_pop01').load(ROOT + '/resve/pop/regist', {resveNo : $li.data('data').RESVE_NO}, function(res){
				$('#layer_pop01 #btnOk').on('click', function(){
					resveStatus.regist(data.RESVE_NO);
				});	
				openLayerPopup('layer_pop01');
			});
		},
		// 대기신청 팝업 호출
		wait : function(e){
			var $li = $(e.target).parent('li');			
			$('#layer_pop02').load(ROOT + '/resve/pop/wait', {resveNo : $li.data('data').RESVE_NO}, function(res){
				$('#layer_pop02 #btnOk').on('click', function(){
					resveStatus.wait(data.RESVE_NO);
				});	
				openLayerPopup('layer_pop02');
			});
		},
		// 예약/대기 취소 팝업 호출
		cancel : function(e){			
			var data = $(e.target).parent('li').data('data');			
			$('#layer_pop03').load(ROOT + '/resve/pop/cancel', {resveNo : data.RESVE_NO, cancelGbn: data.LAST_STTUS}, function(res){
				$('#layer_pop03 #btnOk').on('click', function(){
					resveStatus.cancel(data.RESVE_NO, data.LAST_STTUS);
				});				
				openLayerPopup('layer_pop03');
			});
		},
		// 예약 사후완료 처리
		noshowConfirm : function(e){
			var data = $(e.target).parent('li').data('data');			
			$('#layer_pop05').load(ROOT + '/resve/pop/noshowConfirm', {resveNo : data.RESVE_NO}, function(res){
				$('#layer_pop05 #btnOk').on('click', function(){
					resveStatus.complete(data.RESVE_NO);
				});				
				openLayerPopup('layer_pop05');
			});
		}
	},
	
	
}

$(document).ready(function(){	
	resveStatus.init();
})