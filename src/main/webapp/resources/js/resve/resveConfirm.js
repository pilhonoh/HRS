var resveConfirm = {
	data : {
		beds : [],
		bldCode: undefined,
		selectedDate: undefined
	},
	init: function(){
		resveConfirm.calendar.render();
		resveConfirm.fillBeds(resveConfirm.data.bldCode)
			.then(function(){
				$('.month-calendar .today span').trigger('click');
			});
		$('#btnConfirm').on('click', resveConfirm.pop.confirm);
		$('#txtResveEmpno').on('keypress', function(e){
			if(e.keyCode == 13) resveConfirm.pop.confirm();
		});
		
	},
	setHeader: function(yyyymmdd){
		var m = moment(yyyymmdd) || moment();
		
		$('.tit-date span').empty().append(m.format('YYYY년 MM월 '))
		.append($('<em>').text(m.format('DD일('+ m.locale('ko').format('ddd')+') 예약')))
		.append('입니다.');
	},
	// 해당사옥의 bed목록 조회
	fillBeds : function(bldCode){				
		return $.ajax({
			url: ROOT + '/cmmn/codeList',
			data: {codeTyl: "BED", codeTys: bldCode},
			success : function(res){
				console.log('fillBeds',res);
				resveConfirm.data.beds = res.list;
			},
			error : function(err) {
				console.error(err)
			}
		});
	},	
	// 케어 시작 (완료처리)
	start: function(resveNo){
		$.ajax({
			url: ROOT + '/confirm/start',
			type: 'POST',
			data: {resveNo: resveNo},
			success: function(res){				
				resveConfirm.table.refresh();
				closeLayerPopup();
			},
			error: function(err){
				console.error(err)
			}
		})
	},
	// 팝업
	pop : {
		confirm : function(e){
			if($('#txtResveEmpno').val().trim() == ""){
				alert('사번을 입력하세요');
			}else{
				$('#layer_pop01').load(ROOT + '/confirm/pop/start',{
					resveEmpno : $('#txtResveEmpno').val().trim().toUpperCase(), 
					resveDe: resveConfirm.data.selectedDate.yyyymmdd
				}, function(res, state, xhr){						
					openLayerPopup('layer_pop01');
				});
			}
			
		}
	}
	
};

// 달력
resveConfirm.calendar = {
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
			
			if(d.weekday != 6 && d.weekday !=7) 
				$span.on('click', resveConfirm.calendar.click);
			
			elements.push(
				$td.append($div.append($em).append($span))					
			);
		});
		
		$('.month-calendar tbody tr').append(elements);			
	},
	click: function(e){
		var data = $(e.target).data('data');
		
		$('.cal-day.selected').removeClass('selected');
		$(e.target).parents('div:eq(0)').addClass('selected');
		resveConfirm.data.selectedDate = $(e.target).data('data');
		resveConfirm.setHeader($(e.target).data('data').yyyymmdd);
		resveConfirm.table.init();
		resveConfirm.table.getResve($(e.target).data('data').yyyymmdd);
	}
}

// 현황테이블
resveConfirm.table = {
	init: function(){
		var bedList = resveConfirm.data.beds;
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
	refresh: function(){
		resveConfirm.table.init();
		resveConfirm.table.getResve();
	},
	getResve: function(yyyymmdd){
		if(!yyyymmdd){
			yyyymmdd = moment().format('YYYYMMDD');
		}
		$.ajax({
			url: ROOT + '/confirm/getResve',
			data: {resveDe: yyyymmdd, bldCode: resveConfirm.data.bldCode},
			success: function(res){
				console.log('getResve', res);
				var list = res.list;
				
				var last = undefined;
				
				function getButton(status){
					return {
						//예약가능
						'RESVE_POSBL' : $('<button>').append('<i class="xi-check-circle-o"></i>').text('예약가능').addClass('rbtn cr1'),	
						//예약완료
						'RESVE_COMPT' : $('<button>').append('<i class="xi-calendar-check"></i>').text('예약완료').addClass('rbtn cr3'),	
						//예약불가
						'RESVE_IMPRTY' : $('<span>').text('예약불가').addClass('reservation-not'), 											
						//완료
						'COMPT' :  $('<span>').text('케어완료').addClass('reservation-not')						
					}[status]
				}
				
				list.forEach(function(work){
					
					var $td = $('.' + work.BED_CODE + '-' + work.RESVE_TM).data('data', work)
								.attr('id', 'resve-'+work.RESVE_NO);
					
					var $p = $('<p class="top">');
					var $span_name = $('<span>').addClass(work.MSSR_SEXDSTN == 'F' ? 'women' : 'men').text(work.MSSR_NCNM);
					var $status = getButton(work.LAST_STTUS);
					
					if(!last || 									// last가 없거나
						last.RESVE_TM != (work.RESVE_TM-1) || 		// last가 현재시간-1이 아니거나(연속되지않거나) (같은날 떨어진근무)
						last.MSSR_EMPNO != work.MSSR_EMPNO ||		// 관리사가 다른경우							
						last.BED_CODE != work.BED_CODE){			// 베드가 다른경우							
						
						$td.addClass('start');
						$p.append($span_name);
						
					}else{
						$td.addClass('on');						
					}
					
					$td.empty().append($p).append($status);

					last = work;
				});
			},
			error : function(err) {
				console.error(err.responseJSON)
			}
		})
	}	
}

$(document).ready(function(){
	resveConfirm.data.bldCode = $('#bldCode').val()||'SK01';
	resveConfirm.init();
})