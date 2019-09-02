/**
 * 예약현황
 */
var resveStatus = {
	data : {
		beds : []
	},
	// 초기화
	init: function(){
		loadCodeSelect(function(){
			resveStatus.fillBeds();		// bed목록 조회
		});			// 공통코드 로드
		resveStatus.setHeader();	// 헤더에 카운트표시
		$('[data-code-tyl=BLD]').on('change', resveStatus.bldOnChange);	// 사옥변경이벤트 바인딩
		
		resveStatus.calendar.render();	// 달력 렌더링
		
		//resveStatus.table.init();	// 예약현황테이블 초기화
		//resveStatus.table.getStatus();		
		
		//FIXME : await 적용(ie지원안됨) or promise 적용 or 콜백 형식으로 순차적으로 실행할 필요 있음.
		setTimeout(function(){
			$('.month-calendar .today span').trigger('click')
		},200);
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
				}
				
			},
			error : function(err) {
				console.error(err)
			}
		})
		
	},
	bldOnChange : function(e){
		console.log(e.target.value)
		resveStatus.fillBeds(e.target.value);
	},
	// 해당사옥의 bed목록 조회
	fillBeds : function(bldCode){
		bldCode = bldCode || $('[data-code-tyl="BLD"').val();
		
		return $.ajax({
			url: ROOT + '/cmmn/codeList',
			data: {codeTyl: "BED", codeTys: bldCode},
			success : function(res){
				console.log('fillBeds',res);
				resveStatus.data.beds = res.list;											
			},
			error : function(err) {
				console.error(err)
			}
		});
	},	
	// 상단 2주달력
	calendar: {		
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
		click: function(e){
			console.log('click',$(e.target).data('data'));
			var data = $(e.target).data('data');			
			var str = moment(data.date).locale('ko').format('YYYY년 M월 DD일(ddd)') + ' 예약 : ' + $('[data-code-tyl="BLD"] option:selected').text();
			$('.sub-tit h3').text(str);
			resveStatus.table.init();
			resveStatus.table.getStatus($(e.target).data('data').yyyymmdd)
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
		getStatus: function(yyyymmdd){
			if(!yyyymmdd){
				yyyymmdd = moment().format('YYYYMMDD');
			}
			$.ajax({				
				url: ROOT + '/resve/getStatus',
				data: {resveDe: yyyymmdd, bldCode: $('[data-code-tyl="BLD"').val()},
				success : function(res){
					console.log('getStatus',res);				
					var list = res.list;
					
					var last = undefined;
					var $div;
					
					function getButton(status){
						return {
							//예약가능
							'RESVE_POSBL' : '<button class="rv-btn st1" onclick="e_layer_pop01("layer_pop01");">예약가능</button>',	
							//예약완료
							'RESVE_COMPT' : '<button class="rv-btn st3" onclick="e_layer_pop03("layer_pop03");">예약완료</button>',	
							//예약불가
							'RESVE_IMPRTY' : '<button class="rv-btn" disabled>예약불가</button>',
							//대기가능
							'WAIT_POSBL' : '<button class="rv-btn st2" onclick="e_layer_pop02("layer_pop02");">대기가능</button>',
							//대기중
							'WAIT' : '<button class="rv-btn st4" onclick="e_layer_pop03("layer_pop03");">대기중</button>',
							//예약취소
							'RESVE_CANCL' : '',
							//대기취소
							'WAIT_CANCL' : '',
							//완료
							'COMPT' : '<button class="rv-btn st5">케어완료</button>'				
						}[status]
					}
					
					list.forEach(function(stts){
						
						if(!last || 									// last가 없거나
							last.RESVE_TM != (stts.RESVE_TM-1) || 		// last가 현재시간-1이 아니거나(연속되지않거나) (같은날 떨어진근무)
							last.BED_CODE != stts.BED_CODE){			// 베드가 다른경우							
							//근무를 새로 그림
							$div = $('<div class="rv-box">').addClass(stts.MSSR_SEXDSTN == 'F' ? 'woman' : 'man');
							var $p = $('<p class="name">').append($('<strong>').text(stts.MSSR_NCNM));
							var $ul = $('<ul class="rv-btn-area">');
							var $li = $('<li>').append(getButton(stts.LAST_STTUS));
							
							var $td = $('.' + stts.BED_CODE + '-' + stts.RESVE_TM);
							
							$td.empty().append($div.append($p).append($ul.append($li)));
							
						}else{
							//이전근무에 연속해서 그림
							var $ul = $div.find('ul');
							var $li = $('<li>').append(getButton(stts.LAST_STTUS));
							$ul.append($li);
							$div.parent('td').attr('colspan', $ul.find('li').length);	// td colspan
							$('.' + stts.BED_CODE + '-' + stts.RESVE_TM).remove();		// colspan을 했으니 td삭제
							$div.removeClass('colspan' + ($ul.find('li').length-1))		// div colspan
								.addClass('colspan' + $ul.find('li').length);
						}
						
						last = stts;
					})
					
				},
				error : function(err) {
					console.error(err)
				}
			});			
		}
	},
	
}

$(document).ready(function(){	
	resveStatus.init();
})