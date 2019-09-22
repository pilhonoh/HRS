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
	<table id="scheduleCreate_enter" class="tbl-style">
		<colgroup>
			<col style="width:15%;">
			<col>
		</colgroup>
		
			<tr>
				<th class = "required">사옥</th >
				<td>
					<select style="width:120px;" data-code-tyl="BLD" data-empty-str="사옥" id="scheduleCreate_bldCombo"></select>
				</td>
			</tr>
			<tr>
				<th class = "required" >베드</th>
				<td>
					<select style="width:120px;" data-code-tyl="BED" data-code-tys="SK01"  data-empty-str="베드" id="scheduleCreate_bedCombo"></select>
				</td>
			</tr>
			<tr>
				<th  class = "required" >관리사</th>
				<td>
					<select style="width:120px;"  data-empty-str="관리사" id="scheduleCreate_mssrCombo">					
				  </select>
				</td>
			</tr>
		  <tbody id='scheduleBody'>	
			<tr id ="tr0" class='trschedule' data-rowid = "">
				<th class = "required">근무 일정</th >
				<td>
					<input type="text"  id = "scheduleCreate_start_date" class="datepicker startDate">
					<em class="fromto"> ~ </em>
					<input type="text" id = "scheduleCreate_end_date" class="datepicker endDate">
					<select  data-code-tyl="RVT" data-code-tys="RVTSTART"  id="scheduleCreate_startTime"></select>
					<em class="fromto"> ~ </em>
					<select data-code-tyl="RVT" data-code-tys="RVTEND"  id="scheduleCreate_endTime"></select>
					<button class="t-btn cr01" id="scheduleCreate_rowAddBtn">추가</button>
				</td>
			</tr>		
		</tbody>
	</table>	

     <div class='rv-desc' style="text-align: center; display:none ;"><strong id="requiredMsg">취소는 시작 20분전 까지만</strong></div>
	<div class="pop-btn-area">
		<button id ="scheduleCreate_saveBtn" class="pop-btn">저장</button>
		<button class="pop-btn gray layerClose">취소</button>
	</div>

	<!-- 팝업 컨텐츠 E -->						
</div><!-- //pop-container -->
<script>
var popSchCreate = {
		init: function() {
			//$(".datepicker").datepicker();
			initDatepicker();
			$('#scheduleCreate_enter select[data-code-tyl]').empty(); 
			loadCodeSelect(undefined, '#scheduleCreate_enter'); //콤보박스 공통코드 세팅
			popSchCreate.combobox.bldComboEventBinding(); //사옥 콤보박스 변경 이벤트
			popSchCreate.datepicker.setDefaultValue(); //datepicker 기본값 세팅	
			popSchCreate.button.popSaveClickEvent();
			popSchCreate.button.rowAddClickEvent();
		},	
		cmmnCode: {
			allCodeList: [],
			getAllCodeList: function() {
				$.ajax({
					url: ROOT + '/cmmn/allCodeList',
					success: function(res) {
						console.log('allCodeList', res);
						if (res.status === 200) {
							popSchCreate.cmmnCode.allCodeList = res.list;
						}
					},
					error: function(err) {
						console.error(err);
					}
				})
			},
			codeToName: function(code) {
				var allCodeList = popSchCreate.cmmnCode.allCodeList;
				
				if (allCodeList.length == 0) {
					popSchCreate.cmmnCode.getAllCodeList();
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
				/* $('input#scheduleCreate_from_date').val(fromDate);
				$('input#scheduleCreate_to_date').val(toDate); */
			}
		},
	
		combobox: {
			bldComboEventBinding: function() {
				$('#scheduleCreate_bldCombo').on('change', function() {
					var bldCode = $(this).val();
					popSchCreate.combobox.setMssrCombo(bldCode);
					loadCodeSelect(undefined, $('#scheduleCreate_bedCombo').parent()); 
					
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
		
				$.when(popSchCreate.combobox.getMssrList(bldCode)).done(function(result) {
					
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
		 params: {	bldCode: "", //사옥코드
				    mssrEmpno:"", //관리사 코드 
				    bedCode: "" , //배드  
			        rowData:null,
			        rowCnt:""
		}, 
		button:{
			popSaveClickEvent:function(){
				$("#scheduleCreate_saveBtn").on("click",function(){			
					console.log('data', JSON.stringify(getParams()));
				    
					if(!popSchCreate.validation.required()){
						return false;
					}
					confirmPopup('관리자스케즐울 등록 하시겠습니까', function(){		 			
						$.ajax({
							url: ROOT + '/mssr/scheduleCreate',
							type: 'POST',
							data:{params:JSON.stringify(getParams())} ,
							success : function(res){
								console.log('regist',res);				
								scheduleList.list.renderScheduleList();
								closeLayerPopup();
							},
							error : function(err) {
								var json = JSON.parse(err.responseText);
								alertPopup(json.message);
							}
						}); 
				    }); 
				});
			},
		   rowAddClickEvent:function(){			   
				$("#scheduleCreate_rowAddBtn").on("click",function(){

					var trCnt =$(".trschedule").length
		
				    if(trCnt >4){return false}
					$clone = $("#tr0").clone(true,true);
					$clone.find("th").text("근무시간 "+trCnt);
					$clone.find('.ui-datepicker-trigger').remove();					
					$clone.find('.hasDatepicker').removeClass("hasDatepicker");
				    $clone.attr({"id":'tr'+trCnt ,"data-rowid":trCnt});
				    $clone.find(".t-btn").text("삭제").attr({"onclick": "fnRowDelete(event);"});	
				    $clone.find("input").each(function(){
						$(this).attr('id',this.id+trCnt);						
					 });
				    $clone.find("select").each(function(){
				    	$(this).attr('id',this.id+trCnt)
					});				    
				    
				    $("#scheduleBody").append( $clone.wrapAll("<div/>").parent().html());
	
				    
				    //datepicker 초기화
				    $("#scheduleCreate_enter tbody").find('.datepicker').datepicker("destroy");//.datepicker();
				    initDatepicker();
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
				},
				 required:function(){
					 var chk = true;
					 var returnMsg="등록된값이 없습니다"
						$(".required").nextAll("td").children("input,select").each(function(){
							console.log($(this).parent().prev().text());	
						  if ($(this).val()==null||$(this).val()==""){
							  returnMsg = $(this).parent().prev().text() +returnMsg;
							  $(".rv-desc").show();
							  $("#requiredMsg").text(returnMsg);
							  chk = false
							  return false;
						  };
						});  
					 return chk;
						 
				 }
	}
}

function fnRowDelete(){
	javascript:event.target.parentNode.parentNode.remove()
		  $("#scheduleBody  tr").each(function(index){
			     rowidrest = this;
			     if(index>=1){
			     $(rowidrest).children("th").text("근무시간 "+index)
			     $(rowidrest).attr({"id":"tr"+index ,"data-rowid":index});
			     $(rowidrest).children('td').children('input,select').attr("id",function(){ return "cheduleCreate_"+ this.name+ index })  
			     }
			});
		
	}
function getParams(){
	var params = [] 
	
	$(".trschedule").each(function(){
		var rowid = $(this).data("rowid");
		var startTimeCode = Number($("#scheduleCreate_startTime"+rowid ).val());
		var endTimeCode  =  Number($("#scheduleCreate_endTime"+rowid ).val())
		for (var i = startTimeCode; i <= endTimeCode; i++) {
			params.push({
			    bldCode      : $("#scheduleCreate_bldCombo" ).val(),
		        mssrEmpno    : $("#scheduleCreate_mssrCombo").val(),
		        bedCode      : $("#scheduleCreate_bedCombo").val(),
				startDate    : $("#scheduleCreate_start_date"+rowid).val(), //근무 시작일
				endDate      : $("#scheduleCreate_end_date"+rowid).val(), //근무 종료일  */
				resveTime    : i, //시간코드  */
				//startTimeCode: $("#scheduleCreate_startTime"+rowid ).val(), //시작 시간 코드
				//endTimeCode  : $("#scheduleCreate_endTime"+rowid ).val(),	  // 종료 시간 코드 	 */
			});	
		
		}
				
	});	
	return params;
}

$(document).ready(function(){		
	
	popSchCreate.init();
	
	
})
  
</script>
