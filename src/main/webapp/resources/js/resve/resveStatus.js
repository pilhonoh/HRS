/**
 * 예약현황
 */
var resveStatus = {
	// 초기화
	init: function(){
		resveStatus.setHeader();	// 헤더에 카운트표시
		loadCodeSelect();			// 공통코드 로드
		resveStatus.calendar.render();	// 달력 렌더링
		resveStatus.table.init();	// 예약현황테이블 초기화
	},
	// 헤더세팅
	setHeader : function(){
		$.ajax({
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
			resveStatus.table.getStatus($(e.target).data('data').yyyymmdd)
		}
	},
	// 예약현황 테이블
	table : {
		init: function(){
			$.ajax({
				url: ROOT + '/cmmn/codeList',
				data: {codeTyl: "BED", codeTys: $('[data-code-tyl="BLD"').val()},
				success : function(res){
					console.log('bedList',res);
					var bedList = res.list;
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
					
					resveStatus.table.getStatus()
				},
				error : function(err) {
					console.error(err)
				}
			})
			//var data = await $.async(ROOT + '/cmmn/codeList', {codeTyl: "BED", codeTys: $('[data-code-tyl="BLD"').val()});
			//console.log(data)
		},
		getStatus: function(yyyymmdd){
			if(!yyyymmdd){
				yyyymmdd = moment().format('YYYYMMDD');
			}
			$.ajax({
//				<div class="rv-box colspan4 man">
//					<p class="name"><strong>James</strong></p>
//					<ul class="rv-btn-area">
//						<li><button class="rv-btn" disabled>예약불가</button></li>
//						<li><button class="rv-btn st1" onclick="e_layer_pop01('layer_pop01');">예약가능</button></li>
//						<li><button class="rv-btn st2" onclick="e_layer_pop02('layer_pop02');">대기가능</button></li>
//						<li><button class="rv-btn" disabled>예약불가</button></li>
//					</ul>
//				</div>
				
				url: ROOT + '/resve/getStatus',
				data: {resveDe: yyyymmdd, bldCode: $('[data-code-tyl="BLD"').val()},
				success : function(res){
					console.log('getStatus',res);				
					var list = res.list;
					
					var last = undefined;
					var $ul;
					
					list.forEach(function(stts){
						console.log(stts);
																		
						if(!last){							
							$ul = $('<ul class="rv-btn-area">');							
						}else{
							$ul = $('.' + last.BED_CODE + '-' + last.RESVE_TM).find('ul');
						}
						
						last = stts;
						
						var $li = $('<li>').append($('<button class="rv-btn" disabled>예약불가</button>'));
						
						
						var $div = $('<div class="rv-box">')
										.addClass('colspan' + $ul.find('li').length)
										.addClass(stts.MSSR_SEXDSTN == 'F' ? 'woman' : 'man');
						var $p = $('<p class="name">').append($('<strong>').text(stts.MSSR_NCNM));
						
						$('.' + stts.BED_CODE + '-' + stts.RESVE_TM).append($div.append($p).append($ul.append($li)));
					})
					
				},
				error : function(err) {
					console.error(err)
				}
			})
			/*$('#resveTable').load(ROOT + '/resve/resveTable',
				{resveDe: yyyymmdd, bldCode: $('[data-code-tyl="BLD"').val()},
				function(res){
					console.log(res)
				}
			)*/
		}
	},
	
}

$(document).ready(function(){	
	resveStatus.init();
})