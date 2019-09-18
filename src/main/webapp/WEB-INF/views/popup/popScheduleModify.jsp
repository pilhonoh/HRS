<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%-- <jsp:include page="${JSP}/include/resource.jsp" /> --%>
<div class="pop-head">
	<h2>관리사 근무 수정</h2>
	<a href="#none" class="close layerClose">닫기</a> 
</div>
<div class="pop-container">	
	<!-- 팝업 컨텐츠 S -->

	<table id="scheduleCreate_enter" class="tbl-style">
		<colgroup>
			<col style="width:20%;">
			<col>
		</colgroup>
		<tbody>
			<tr>
				<th>근무날짜</th>
				<td id='tdResveDate'>2019-08-21</td>
			</tr>
			<tr>
				<th>관리사</th>
				<td id="tdMssName">James</td>
			</tr>
			<tr id ="tr0" class='trschedule' data-rowid = "">
				<th>근무 시간</th>
				<td>
					<select style="width:40px" data-code-tyl="RVT" data-empty-str="시작시간" id="scheduleCreate_startTime"></select>
					<em class="fromto"> ~ </em>
					<select style="width:40px" data-code-tyl="RVT" data-empty-str="종료시간" id="scheduleCreate_endTime"></select>
					<button class="t-btn cr01" id="scheduleCreate_rowAddBtn">추가</button>
				</td>
			</tr>		
		</tbody>
	</table>	
	<div class="pop-btn-area">
		<button id ="scheduleCreate_saveBtn" class="pop-btn">저장</button>
		<button class="pop-btn gray" onclick="closeLayerPopup();">취소</button>
	</div>
<script>
var item = '${item}';
var data = "";
var popinit = {
		init: function() {
	
			data = JSON.parse(item); 		
			$('select[data-code-tyl]').empty(); 
			loadCodeSelect(); //콤보박스 공통코드 세팅	
			popinit.selectScheduleList();
			popinit.button.popSaveClickEvent();
			popinit.button.rowAddClickEvent();
			
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
		 params: {	bldCode: "", //사옥코드
		}, 
		selectScheduleList: function() {
			alert(data.RESVE_NO)
			
			var deferred = $.Deferred();
			
			$.ajax({
				url: ROOT + '/mssr/selectScheduleDetail',
				data:{RESVE_NO:data.RESVE_NO},
				success: function(res) {
					console.log('selectScheduleDetail', res);
					if (res.status === 200) {
						deferred.resolve(res);
						scheduleList.list.dataList = res.list;
						
					} else {
						deferred.reject("");
					}
				},
				error: function(err) {
					console.error(err);
					deferred.reject("");
				}
			})
			
			return deferred.promise();
		},
		
		
		//조회된 예약 목록 데이터를 가지고 화면에 목록 생성
		renderScheduleList: function() {
			$.when(scheduleList.list.selectScheduleList()).done(function(result) {
			
			
				$("#tdResveDate").text(data.RESVE_DE);
				$("#tdMssName").text(data.MSSR_NCNM);
				var resultList = result.list;
				var scheduleListHtml = [];
		
				for (var i in resultList) {
					/* var resve_de = resultList[i].RESVE_DE;
					resveDt = resve_de.substr(0,4) + '-' + resve_de.substr(4,2) + '-' + resve_de.substr(6,2);
					
					var sexdstn = (resultList[i].MSSR_SEXDSTN == 'M') ? '남' : '여';
					var convertedTime = scheduleList.list.convertTime(resultList[i].RESVE_TM_LIST); */
				
					scheduleListHtml.push('<tr><th>근무 시간</th>');
					scheduleListHtml.push('<td>');
					scheduleListHtml.push('<select style="width:40px" data-code-tyl="RVT" data-empty-str="시작시간" id="scheduleCreate_startTime"></select>'); 
					scheduleListHtml.push('<select style="width:40px" data-code-tyl="RVT" data-empty-str="종료시간" id="scheduleCreate_startTime"></select>')
					scheduleListHtml.push('</td></tr>');
				}
				
				$('tbody#scheduleList').html(scheduleListHtml.join(''));
				
				loadCodeSelect(); 
				
			});
		},
		button:{
			popSaveClickEvent:function(){
				$("#scheduleCreate_saveBtn").on("click",function(){			
					console.log('data', JSON.stringify(getParams()));
		            			
					$.ajax({
						url: ROOT + '/mssr/scheduleCreate',
						type: 'POST',
						data: {bldCode :  $("#scheduleCreate_bldCombo" ).val(),
						       mssrCode : $("#scheduleCreate_mssrCombo").val(),
						       bedCode:   $("#scheduleCreate_bedCombo").val(),
							   params: JSON.stringify(getParams())},
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
			},
		   rowAddClickEvent:function(){			   
				$("#scheduleCreate_rowAddBtn").on("click",function(){

					var trCnt =$(".trschedule").length
				    $clone = $("#tr0").clone();
				    $clone.attr({"id":'tr'+trCnt ,"data-rowid":trCnt});
				    $clone.find(".t-btn").text("삭제").attr({"id":this.id+trCnt ,"name":"delBtn" ,"data-rowid":"tr"+trCnt});	
				    $clone.find("select").each(function(){
				    	$(this).attr('id',this.id+trCnt)
					});				    
				    
				    $("#scheduleCreate_enter tbody").append( $clone.wrapAll("<div/>").parent().html());
				    $("button[name='delBtn']").on("click",function(){ 
				    	var rowid = $(this).data("rowid");
				    	$("#"+rowid).remove();
				    });		
			   });				
				
			}
	}
}
function getParams(){
	var params = [] 
	$(".trschedule").each(function(){
		var rowid = $(this).data("rowid");
		params.push({
				startTimeCode:$("#scheduleCreate_startTime"+rowid ).val(), //시작 시간 코드
				endTimeCode: $("#scheduleCreate_endTime"+rowid ).val(),	  // 종료 시간 코드 	 */
			});
		
	});	
	return params;
}

$(document).ready(function(){		
	
	popinit.init();
	console.log("modfiypop",data);
})
  
</script>
