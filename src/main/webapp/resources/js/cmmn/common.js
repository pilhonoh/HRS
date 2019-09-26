$(function(){				

	// 달력UI
	$.datepicker.setDefaults({
		showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
		buttonImage: IMG + "/common/ico_date.png", // 버튼 이미지.
		dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
		changeMonth: true ,
		changeYear: true,
		nextText: '다음 달', // next 아이콘의 툴팁.
		prevText: '이전 달', // prev 아이콘의 툴팁.
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		showButtonPanel: true,
		currentText: '오늘' , // 오늘 날짜로 이동하는 버튼 패널
		closeText: '닫기',  // 닫기 버튼 패널
		showMonthAfterYear: true,
		beforeShowDay: function(date){
			// 주말 선택불가
			var day = date.getDay();
			return [(day != 0 && day != 6)];
		}	
	});	

	initDatepicker();
	
	$.ajaxSetup({
		cache: false,
		dataFilter: function(data,type){
						
			try{
				var json = JSON.parse(data);
				if(json.status == 200){		
					return data;
				}else{
					
					function afterLogic(){
						try{
							resveStatus.table.refresh();
							resveList.list.renderResveList();
							scheduleList.list.renderScheduleList();
						}catch(err){}
					}
					
					if(json.messageCode == 'system.error'){
						alertPopup(getMessage('system.error'), afterLogic);
					}else{						
						alertPopup(json.message, afterLogic);
					}
					if(json.status == 403){
						location.href = '/error/403';
					}
				}
			}catch(err){
				return data;
			}
			
		}
	})

	moment.locale('ko', {
	    weekdays: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
	    weekdaysShort: ["일","월","화","수","목","금","토"],
	});
	moment.locale('en');
});

function initDatepicker(){
	$(".startDate").each(function(i,picker){
		$(picker).datepicker({        
	        onSelect: function(selected) {
	          $(picker).parents('td:eq(0)').find(".endDate").datepicker("option","minDate", selected);
	        }
	    })
	});
	
	 $(".endDate").each(function(i,picker){
		 $(picker).datepicker({        
			 onSelect: function(selected, element) {
	        	$(picker).parents('td:eq(0)').find(".startDate").datepicker("option","maxDate", selected);
	        }
	    });
	 })
}

/**
 * 공통코드 select options 로드
 * @returns
 */
function loadCodeSelect(cb, selector){
	
	var $container = selector ? $(selector) : $(document);
	$container.find('select[data-code-tyl]').each(function(idx, select){
		var tyl = $(select).data('code-tyl');	//코드타입(대)
		var tys = $(select).data('code-tys');	//코드타입(소)
		var empStr = $(select).data('empty-str');
		
		if(tyl==='BLD'){
			$(select).on('change', function(){
				$('[data-code-tyl=BED]').data('code-tys', $(this).val()).empty();
			})
		}

		$.ajax({
			url: ROOT + '/cmmn/codeList',
			data: {codeTyl: tyl, codeTys: tys || ''},
			success : function(res){
				console.log('codeList',res);				
				if(res.status === 200){
					var options = res.list.map( function(data){
						return $('<option>').val(data.CODE).text(data.CODE_NM);
					})
					if(empStr){
						$(select).append($('<option>').val("").text(empStr));
					}
					$(select).append(options);
					
					
					
					if(cb) cb();	//콜백이 있다면 실행
				}
				
			},
			error : function(err) {
				console.error(err)
			}
		})
	})
}

function openLayerPopup(id){
	$('.pop-layer').css('display', 'none'); 
	var temp = $('#' + id);
	var bg = temp.parents('bg');
	if (bg) {
		$('.layer').fadeIn();
	} else {
		temp.fadeIn();
	}
	temp.css('display', 'block');
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	//$("html").attr("style", "overflow-y:hidden");
	$("html").addClass("scroll");

	temp.find('.layerClose').click(function (e) {
		if (bg) {
			$('.layer').fadeOut();
		} else {
			temp.fadeOut();
		}
		e.preventDefault();
		$("html").attr("style", "overflow-y:auto");
		$("html").removeClass("scroll");
	});

	$('.layer .bg').click(function (e) {
		$('.layer').fadeOut();
		e.preventDefault();
		$("html").attr("style", "overflow-y:scroll");
		$("html").removeClass("scroll");
	});
}

function closeLayerPopup(){
	var temp = $('.pop-layer'); //$('#' + id);
	var bg = temp.parents('bg');
	
	if (bg) {
		$('.layer').fadeOut();
	} else {
		temp.fadeOut();
	}	
	$("html").attr("style", "overflow-y:auto");
	$("html").removeClass("scroll");
	temp.empty();
}

function getRealTime(number){
	return {
		1 : { start : '10:00', end : '10:30'},
		2 : { start : '11:00', end : '11:30'},
		3 : { start : '12:00', end : '12:30'},
		4 : { start : '13:00', end : '13:30'},
		5 : { start : '14:00', end : '14:30'},
		6 : { start : '15:00', end : '15:30'},
		7 : { start : '16:00', end : '16:30'},
		8 : { start : '17:00', end : '17:30'},
	}[number]
}

function alertPopup(title, contents, fn){
	$('#layer_pop_alert').load(ROOT + '/resources/html/alert.html', function(res){		
		$('.alert-message h3').html(title.replace(/\n/g, '<br/>'));
		if(contents){
			if($.isFunction(contents)){
				fn = contents;
			}else{
				$('.alert-message p').text(contents);
			}
		}
		$('#layer_pop_alert #btnOk').one('click', fn);
		openLayerPopup('layer_pop_alert');
	});
}

/**
 * options = {
 *	title: 'alert 주요 메시지'
 *	contents: '하부 보조 메시지',
 *	callback: 확인버튼 클릭시, 수행할 콜백함수
 *	isHideIcon : true면 아이콘 숨김
 * }
 */
$.alert = function(options) {
	$('#layer_pop_alert').load(ROOT + '/resources/html/alert.html', function(res){		
		$('.alert-message h3').html(options.title.replace(/\n/g, '<br/>'));
		if(options.contents){
			$('.alert-message p').text(options.contents);
		}
		
		if(options.isHideIcon)
			$('.alert-message h3').removeClass('alert');
			
		$('#layer_pop_alert #btnOk').one('click', options.callback);
		openLayerPopup('layer_pop_alert');
	});
}


function confirmPopup(title, contents, fn){	
	$('#layer_pop_confirm').load(ROOT + '/resources/html/confirm.html', function(res){		
		$('.alert-message h3').html(title.replace(/\n/g, '<br/>'));
		if(contents){
			if($.isFunction(contents)){
				fn = contents;
			}else{
				$('.alert-message p').text(contents);
			}
		}
		$('#layer_pop_confirm #btnOk').one('click', fn);
		openLayerPopup('layer_pop_confirm');
	});
}