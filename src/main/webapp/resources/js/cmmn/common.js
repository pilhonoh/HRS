$(function(){				

	//include header
	//$('.header').load("../include/header.html", function(){
	//});

	//include header
	//$('.header.admin').load("../include/header_admin.html", function(){
	//});

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
	});	

	$(".datepicker").datepicker();

//	$('body').on('focus',".datepicker", function(){
//	    $(this).datepicker({
//			showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
//			buttonImage: IMG + "/common/ico_date.png", // 버튼 이미지.
//			dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
//			changeMonth: true ,
//			changeYear: true,
//			nextText: '다음 달', // next 아이콘의 툴팁.
//			prevText: '이전 달', // prev 아이콘의 툴팁.
//			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
//			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
//			dayNames: ['일','월','화','수','목','금','토'],
//			dayNamesShort: ['일','월','화','수','목','금','토'],
//			dayNamesMin: ['일','월','화','수','목','금','토'],
//			showButtonPanel: true,
//			currentText: '오늘' , // 오늘 날짜로 이동하는 버튼 패널
//			closeText: '닫기',  // 닫기 버튼 패널
//		})
//	});
	
	//include header
	//$('.footer').load("../include/footer.html", function(){
	//});
	
	$.ajaxSetup({
		dataFilter: function(data,type){
						
			try{
				var json = JSON.parse(data);
				if(json.status == 200){		
					return data;
				}else{
					alertPopup(json.message, function(){
						try{
							resveStatus.table.refresh();
							resveList.list.renderResveList();
							scheduleList.list.renderScheduleList();
						}catch(err){}
						
					});
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

//layer popup 
function e_layer_pop01(id) {
	$('#layer_pop01').load("../popup/pop_예약신청.html", function(){	//헬스케어 예약 신청
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop02(id) {
	$('#layer_pop02').load("../popup/pop_대기신청.html", function(){	//헬스케어 대기 신청
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop03(id) {
	$('#layer_pop03').load("../popup/pop_예약대기취소.html", function(){	//  헬스케어 예약/대기 취소
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop04(id) {
	$('#layer_pop04').load("../popup/pop_시작확인.html", function(){	//  헬스케어 시작 확인
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop05(id) {
	$('#layer_pop05').load("../popup/pop_관리사등록수정.html", function(){	//  관리사 등록 수정
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop06(id) {
	$('#layer_pop06').load("../popup/pop_관리사근무등록.html", function(){	//  관리사 근무 등록
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

		$("html").attr("style", "overflow-y:hidden");
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

		// 달력UI
		$(".datepicker").datepicker({
			showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
			buttonImage: "../resources/images/common/ico_date.png", // 버튼 이미지.
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
		});	
	});
};

function e_layer_pop07(id) {
	$('#layer_pop07').load("../popup/pop_관리사근무수정.html", function(){	//  관리사 근무 수정
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop08(id) {
	$('#layer_pop08').load("../popup/pop_예약정보수정.html", function(){	//  예약정보수정
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop09(id) {
	$('#layer_pop09').load("../popup/pop_대기정보수정.html", function(){	//  대기정보수정
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop10(id) {
	$('#layer_pop10').load("../popup/pop_담당자등록수정.html", function(){	//  담당자 등록/수정
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop11(id) {
	$('#layer_pop11').load("../popup/pop_코드등록.html", function(){	//  pop_코드등록
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

function e_layer_pop12(id) {
	$('#layer_pop12').load("../popup/pop_코드수정.html", function(){	//  pop_코드수정
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

		$("html").attr("style", "overflow-y:hidden");
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
	});
};

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

function getAfter2Weeks(fromDate) {
	
	var startDt = moment(fromDate) || moment();
	var endDt = startDt.clone().add(2, 'w');
	var dates = [];	
	while(!startDt.isSame(endDt)){
		var d = {
			date: startDt.toDate(),
			yyyymmdd: startDt.format('YYYYMMDD'),
			year: startDt.year(),
			month: startDt.month()+1,
			day: startDt.date(),
			weekday: startDt.isoWeekday(),
			weekdayName: startDt.format('ddd').toUpperCase()
		}
		
		dates.push(d);
		startDt = startDt.add(1, 'days');
	}	
	
	return dates;
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
		1 : { start : '09:30', end : '10:00'},
		2 : { start : '10:30', end : '11:00'},
		3 : { start : '11:30', end : '12:00'},
		4 : { start : '12:30', end : '13:00'},
		5 : { start : '13:30', end : '14:00'},
		6 : { start : '14:30', end : '15:00'},
		7 : { start : '15:30', end : '16:00'},
		8 : { start : '16:30', end : '17:00'},
		9 : { start : '17:30', end : '18:00'},
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