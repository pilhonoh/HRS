$(function(){				

	//include header
	$('.header').load("../include/header.html", function(){
	});

	// 달력UI
	$(".datepicker").datepicker({
		showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
		buttonImage: "../../resource/images/common/ico_date.png", // 버튼 이미지.
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

	//include header
	$('.footer').load("../include/footer.html", function(){
	});

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
