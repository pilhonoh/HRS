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

	<table id="scheduleModify_enter" class="tbl-style">
		<colgroup>
			<col style="width:20%;">
			<col>
		</colgroup>
		 <thead>
			<tr>
				<th>근무날짜</th>
				<td id='tdResveDate'>2019-08-21</td>
			</tr>
			<tr>
				<th>관리사</th>
				<td id="tdMssName">James</td>
			</tr>
		</thead>	
		<tbody id=scheduleBody>		
		</tbody>
	</table>	
	<div class="pop-btn-area">
		<button id ="scheduleModify_saveBtn" class="pop-btn">저장</button>
		<button class="pop-btn gray" onclick="closeLayerPopup();">취소</button>
	</div>
	
<script>
/* Array.prototype.diff = function(a){
	 return this.filter(function(i){return a.indexOf(i)<0;});
}; */
var popSchModify= {
		init: function() {
	
			$('select[data-code-tyl]').empty(); 
			loadCodeSelect(); //콤보박스 공통코드 세팅	
			popSchModify.button.popSaveClickEvent();
		    popSchModify.button.rowAddClickEvent();			
		},	
		cmmnCode: {
			allCodeList: [],
			getAllCodeList: function() {
				$.ajax({
					url: ROOT + '/cmmn/allCodeList',
					success: function(res) {
						console.log('allCodeList', res);
						if (res.status === 200) {
							popSchModify.cmmnCode.allCodeList = res.list;
						}
					},
					error: function(err) {
						console.error(err);
					}
				})
			},
			codeToName: function(code) {
				var allCodeList = popSchModify.cmmnpopSchModify.CodeList;
				
				if (allCodeList.length == 0) {
					popSchModify.cmmnCode.getAllCodeList();
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
		dataList: [],
		params: {}, 
		selectScheduleList: function() {
	
			var deferred = $.Deferred();
			$.ajax({
				url: ROOT + '/mssr/selectScheduleDetail',
				data:popSchModify.params,
				success: function(res) {
					console.log('selectScheduleDetail', res);
					if (res.status === 200) {
						deferred.resolve(res);
						popSchModify.dataList = res.list;
						
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
			$.when(popSchModify.selectScheduleList()).done(function(result) {
				var resultList = result.list;
				var scheduleListHtml = [];
				var optionstring = popSchModify.convertTime(popSchModify.params.timeList)
				
				for (var i = 0; i < optionstring.length; i++) {
					if(i == 0){
						scheduleListHtml.push('<tr id="tr'+i+'" data-rowid = "" class="trscheduleModfiy"><th>근무 시간</th>');
						scheduleListHtml.push('<td>');
						scheduleListHtml.push('<select name ="startTime" data-code-tyl="RVT" data-code-tys="RVTSTART" id="scheduleModify_startTime"></select>'); 
						scheduleListHtml.push('<em class="fromto"> ~ </em>');
						scheduleListHtml.push('<select name ="endTime"  data-code-tyl="RVT" data-code-tys="RVTEND"  id="scheduleModify_endTime"></select>')
				        scheduleListHtml.push('<button class="t-btn cr01" id="scheduleModify_rowAddBtn">추가</button></td></tr>');
					}
					else{
					 	scheduleListHtml.push('<tr id="tr'+i+'" data-rowid = "'+i+'" class="trscheduleModfiy"><th>근무 시간</th>');
						scheduleListHtml.push('<td>');
						scheduleListHtml.push('<select name ="startTime" data-code-tyl="RVT" data-code-tys="RVTSTART" id="scheduleModify_startTime'+i+'"></select>'); 
						scheduleListHtml.push('<em class="fromto"> ~ </em>');
						scheduleListHtml.push('<select name ="endTime"  data-code-tyl="RVT" data-code-tys="RVTEND"  id="scheduleModify_endTime'+i+'"></select>')
						scheduleListHtml.push("<button name='delBtn' class='t-btn cr01' onclick='fnRowDelete(\"tr"+i+"\")' id='scheduleModify_rowAddBtn"+i+"'>삭제</button></td></tr>"); 
					}
				}			
				$('#scheduleBody').append(scheduleListHtml.join(''));
				popSchModify.button.rowAddClickEvent();	
				loadCodeSelect(function(){
			    		var timeName = "";
			    		$("select[name='startTime']").each(function(index){
						    if( index < optionstring.length){
			    				$(this).val(optionstring[index].startTime);
						    }
						});
						$("select[name='endTime']").each(function(index){
						    if( index < optionstring.length){
								$(this).val(optionstring[index].endTime);
						    }
						});	
                    
			    	}); 

			});
		},		//리스트 조회 시 가져온 시간 데이터[ex)1,2,4,5 ...] 를
		//실제 시간 범위[09:30~11:00  12:30~14:00 ...]로 변경하여 표시하는 함수
		convertTime: function(timeListStr) {
			
			var tList = timeListStr.split(',');
			var tListLength = tList.length;

			var returnTime = '';
			var firstNum = tList[0];
			var lastNum = tList[tListLength-1];
			var countNum = tList[0];
			var timeSheet ={"time":[]};
			 if(tListLength >1){
				 for (var i in tList) {
					if( firstNum == tList[i]){
						timeSheet.time.push({startTime:firstNum,endTime:firstNum});
					}else{ 				
				      var timecnt = timeSheet.time.length	
					  var pervStartTime = timeSheet.time[timecnt-1].startTime;
					  var pervEndTime =   timeSheet.time[timecnt-1].endTime;
					  var diff  =  Math.abs(pervEndTime - tList[i] ) ;
					  if( diff == 1){
						   timeSheet.time[timecnt-1].endTime = tList[i];
						   continue ;
					   }else{
						  timeSheet.time.push({startTime:tList[i],endTime: tList[i]});	   
					   }  
					}
				}
			}else{
				timeSheet.time.push({startTime:firstNum,endTime:lastNum});
			}
			return timeSheet.time;
		},
		button:{
			popSaveClickEvent:function(){
				$("#scheduleModify_saveBtn").on("click",function(){			
					console.log({bldCode :  popSchModify.params.bldCode,
					       bedCode:   popSchModify.params.bedCode, //배드     
						   mssrCode : popSchModify.params.mssrCode,
						   resveDate : popSchModify.params.resveDate,
						   insertTime: JSON.stringify(getParamsdiff().insertTime),
						   deleteTime: JSON.stringify(getParamsdiff().deleteTime)	   
					});
					
					$.ajax({
						url: ROOT + '/mssr/scheduleModify',
						type: 'POST',
						data: {bldCode :  popSchModify.params.bldCode,
						       bedCode:   popSchModify.params.bedCode, //배드     
							   mssrCode : popSchModify.params.mssrCode,
							   resveDate : popSchModify.params.resveDate,
							   insertTime: JSON.stringify(getParamsdiff().insertTime),
							   deleteTime: JSON.stringify(getParamsdiff().deleteTime)	   
						},
						success : function(res){
							console.log('regist',res);				
							scheduleList.list.renderScheduleList();
							closeLayerPopup();
						},
						error : function(err) {
							console.error(err)
						}
					}); 
					
 				});
			},
		   rowAddClickEvent:function(){			   
				$("#scheduleModify_rowAddBtn").on("click",function(){

					var trCnt = $(".trscheduleModfiy").length;
				    $clone = $(".trscheduleModfiy").eq(0).clone();
				    console.log($clone.html());
				    $clone.attr({"id":'tr'+trCnt ,"data-rowid":trCnt});
				    $clone.find(".t-btn").text("삭제").attr({"id":this.id+trCnt,  "onclick": fnRowDelete("tr"+trCnt)});	
				    $clone.find("select").each(function(){
				    	$(this).attr('id',this.id+trCnt)
					});				    
				    
				    $("#scheduleModify_enter tbody").append( $clone.wrapAll("<div/>").parent().html());
			   });				
				
			}
	}
		
}

function fnRowDelete(id){
	
	$("#"+id ).remove();
};

function getParams(){
	var params = [] 
	$(".trscheduleModfiy").each(function(){
		var rowid = $(this).data("rowid");
		params.push({
				startTime: $("#scheduleModify_startTime"+rowid).val(), //근무 시작일
				endTime: $("#scheduleModify_endTime"+rowid).val(), //근무 종료일  */
			});
		
	});	
	return params;
}


 function getParamsdiff(){
	var defData = popSchModify.params.timeList.split(',');
	var nowData =  getParams();
	var setTimesheet = []
    //var delTimesheet = []
    var start = 0; 
	var end   = 0;
    for (var i = 0; i < nowData.length; i++) {
    	start = Number(nowData[i].startTime) ;
    	end =  Number(nowData[i].endTime);
	    for (var j = start ; j<=end; j++) {
		   setTimesheet.push(j.toString());	
		}  
	}
    console.log(setTimesheet);
    console.log(defData);
  
    
    var diff2 = defData.filter(x => setTimesheet.includes(x));
      
     return{
		      insertTime:setTimesheet.filter(x => ! defData.includes(x)),
		      deleteTime:DeleTime = defData.filter(x => ! diff2.includes(x))         	    
     }
     

} 

$(document).ready(function(){		
	var item = '${item}';
	var data = JSON.parse(item);
	console.log("modify",data);
	popSchModify.init();
	popSchModify.params.bldCode = data.BLD_CODE;
	popSchModify.params.RESVE_NO = data.RESVE_NO;
	popSchModify.params.resveDate = data.RESVE_DE;
	popSchModify.params.mssrCode = data.MSSR_EMPNO;
	popSchModify.params.resveTime = data.RESVE_TM;
	popSchModify.params.bedCode = data.BED_CODE;
	popSchModify.params.timeList = data.RESVE_TM_LIST;
	/* popSchModify.convertTime(popSchModify.params.timeList); */
	$("#tdResveDate").text(data.RESVE_DE);
	$("#tdMssName").text(data.MSSR_NCNM);
	/* popSchModify.selectScheduleList(); */
	popSchModify.renderScheduleList();
	
	
})
  
</script>
