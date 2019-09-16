<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="pop-head">
	<h2>관리사 근무 등록</h2>
	<a href="#none" class="close layerClose">닫기</a> 
</div>
<div class="pop-container">	
	<!-- 팝업 컨텐츠 S -->
   <script src="/resources/vendor/moment/moment.min.js"></script>	
   <script src="/resources/js/cmmn/common.js"></script>
  
	<table class="tbl-style">
		<colgroup>
			<col style="width:20%;">
			<col>
		</colgroup>
		<tbody>
			<tr>
				<th>사옥</th>
				<td>
					<select style="width:120px;" data-code-tyl="BLD" data-empty-str="사옥" id="scheduleCreate_bldCombo"></select>
				</td>
			</tr>
			<tr>
				<th>베드</th>
				<td>
					<select id="scheduleCreate_bedCombo">
						<option value="A">A</option>
					</select>
				</td>
			</tr>
			<tr>
				<th>관리사</th>
				<td>
					<select style="width:120px;" id="scheduleCreate_mssrCombo">
											<option value="">관리사</option>
				  </select>
				</td>
			</tr>
			<tr>
				<th>근무 일정</th>
				<td>
					<input type="text"  id = "scheduleCreate_start_date" class="datepicker">
					<em class="fromto"> ~ </em>
					<input type="text" id = "scheduleCreate_end_date" class="datepicker">
					<select id="scheduleCreate_startTime">
						<option value='1'  >09:30</option>
					</select>
					<em class="fromto"> ~ </em>
					<select id="scheduleCreate_endTime">
						<option value='4'>12:30</option>
					</select>
					<button class="t-btn cr01">추가</button>
				</td>
			</tr>		
			<!-- <tr>
				<th>날짜2</th>
				<td>
					<input type="text" class="datepicker">
					<em class="fromto"> ~ </em>
					<input type="text" class="datepicker">
					<select>
						<option>09:30</option>
					</select>
					<em class="fromto"> ~ </em>
					<select>
						<option>13</option>
					</select>
					<button class="t-btn">삭제</button>
				</td>
			</tr>		 -->
		</tbody>
	</table>	

	<div class="pop-btn-area">
		<button id ="scheduleCreate_saveBtn" class="pop-btn">저장</button>
		<button class="pop-btn gray">취소</button>
	</div>

	<!-- 팝업 컨텐츠 E -->						
</div><!-- //pop-container -->
<script>
var popinit = {
		init: function() {
			$('select[data-code-tyl]').empty(); 
			loadCodeSelect(); //콤보박스 공통코드 세팅
			popinit.combobox.bldComboEventBinding(); //사옥 콤보박스 변경 이벤트
			popinit.datepicker.setDefaultValue(); //datepicker 기본값 세팅	
			popinit.button.popSaveClickEvent();
		},	
		cmmnCode: {
			allCodeList: [],
			getAllCodeList: function() {
				$.ajax({
					url: ROOT + '/cmmn/allCodeList',
					success: function(res) {
						console.log('allCodeList', res);
						if (res.status === 200) {
							popinit.cmmnCode.allCodeList = res.list;
						}
					},
					error: function(err) {
						console.error(err);
					}
				})
			},
			codeToName: function(code) {
				var allCodeList = popinit.cmmnCode.allCodeList;
				
				if (allCodeList.length == 0) {
					popinit.cmmnCode.getAllCodeList();
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
				$('input#scheduleCreate_from_date').val(fromDate);
				$('input#scheduleCreate_to_date').val(toDate);
			}
		},
	
		combobox: {
			bldComboEventBinding: function() {
				$('#scheduleCreate_bldCombo').on('change', function() {
					var bldCode = $(this).val();
					popinit.combobox.setMssrCombo(bldCode);
				})
			},		
			getMssrList: function(bldCode) {
				var deferred = $.Deferred();
				
				$.ajax({
					url: ROOT + '/mssr/getMssrList',
					type: 'POST',
					data: {
						bldCode: bldCode
					},
					success: function(res) {
						deferred.resolve(res.list);
					},
					error: function(err) {
						console.error(err);
						deferred.reject('');
					}
				});
				
				return deferred.promise();
			},
			
			setMssrCombo: function(bldCode) {
		
				$.when(popinit.combobox.getMssrList(bldCode)).done(function(result) {
					
					$('#scheduleCreate_mssrCombo').empty();
					var mssrComboHtml = ['<option value="">관리사</option>'];
									
					if (result.length > 0 && bldCode) {
						for (var i in result) {
							mssrComboHtml.push('<option value="' + result[i].EMPNO + '">' + result[i].NCNM + '</option>');
						}
					}
						
					$('#scheduleCreate_mssrCombo').html(mssrComboHtml.join(''));
					
				});	
			}
			
		},
		params: {
			bldCode: '', //사옥코드
			mssrCode: '', //관리사 코드 
			startDate: '', //근무 시작일
			endDate: '', //근무 종료일  */
			startTimeCode:'', //시작 시간 코드
			endTimeCode:'',	  // 종료 시간 코드 	 */
			bedCode: '', //배드
			//sttusCode: 'STS00', //근무상태코드 
		},
		button:{
			popSaveClickEvent:function(){
				$("#scheduleCreate_saveBtn").on("click",function(){
					
					popinit.params.bldCode = $("#scheduleCreate_bldCombo" ).val();
					popinit.params.mssrCode = $("#scheduleCreate_mssrCombo").val();
					popinit.params.startDate = $("#scheduleCreate_start_date").val();
				 	popinit.params.endDate = $("#scheduleCreate_end_date"  ).val();
					popinit.params.bedCode = $("#scheduleCreate_bedCombo" ).val();
					popinit.params.startTimeCode = $("#scheduleCreate_startTime" ).val();
				    popinit.params.endTimeCode = $("#scheduleCreate_endTime" ).val();
					
					$.ajax({
						url: ROOT + '/mssr/scheduleCreate',
						type: 'POST',
						data: popinit.params,
						success : function(res){
							console.log('regist',res);				
							scheduleList.button.listBtnClickEvent();
							closeLayerPopup();
						},
						error : function(err) {
							console.error(err)
						}
					});
					
				});
			}
		}
		
}

/* 
var resveNo = '${resveNo}';
var data = $('#resve-'+resveNo).data('data');
 */
$(document).ready(function(){		
	
	popinit.init();
	
	/* $('#resveRegist_resveDe').text(moment(data.RESVE_DE).format('YYYY-MM-DD'));
	$('#resveRegist_mssr').text(data.MSSR_NCNM + '(' + (data.MSSR_SEXDSTN =='M' ? '남':'여') +')');
	$('#resveRegist_bed').text(data.BED_NM);
	
	var realTime = getRealTime(data.RESVE_TM);
	$('#resveRegist_resveTm').text(realTime.start + '~' + realTime.end); */
})
  
</script>
