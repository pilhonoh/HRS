/**
 * 예약현황
 */
var resveStatus = {
	// 초기화
	init: function(){
		loadCodeSelect();	//공통코드 로드
		resveStatus.calendar.render();	// 달력 렌더링
	},
	// 상단 2주달력
	calendar: {		
		render : function(){
			
			var dates = getAfter2Weeks();
			var elements = [];
								
			dates.forEach(function(d, i){
				// <td><div class="cal-day sat"><em>SAT</em><span>24</span></div></td>
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
				
				
				elements.push(
					$td.append($div.append($em).append($span))					
				);
			});
			
			$('.month-calendar tbody tr').append(elements);
		}
	}
	
}

$(document).ready(function(){	
	resveStatus.init();
})