<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%-- <jsp:include page="${JSP}/include/resource.jsp" /> --%>
<div class="pop-head">
	<h2>헬스키퍼 근무 수정</h2>
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
				<th>헬스키퍼</th>
				<td id="tdMssName">James</td>
			</tr>
			<tr>
				<th>베드</th>
				<td id="tdBedName">A</td>
			</tr>
		</thead>	
		<tbody id="scheduleModify_Body">		
		</tbody>
	</table>
	 <div class='rv-desc' style="text-align: center; display:none ;"><strong id="requiredMsg">취소는 시작 20분전 까지만</strong></div>	
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
	
			$('#scheduleModify_enter select[data-code-tyl]').empty(); 
			/* loadCodeSelect(undefined, '#scheduleModify_enter'); //콤보박스 공통코드 세팅	 */
			popSchModify.button.popSaveClickEvent();
		
		},	
		cmmnCode: {
			allCodeList: [],
			startTimeCombo: [],
			endTimeCombo: [],
			getAllCodeList: function() {
				var deferred = $.Deferred();
				$.ajax({
					url: ROOT + '/cmmn/allCodeList',
					success: function(res) {
						console.log('allCodeList', res);
						if (res.status === 200) {
						
							var data = res.list.filter(function (item) { return item.CODE_TYL.indexOf("RVT")>=0});
							for (var i in data) {
								popSchModify.cmmnCode.startTimeCombo.push('<option value="' + data[i].CODE + '">' + getRealTime(data[i].CODE).start  + '</option>');
								popSchModify.cmmnCode.endTimeCombo.push('<option value="' + data[i].CODE + '">' + getRealTime(data[i].CODE).end + '</option>');
							}
						 deferred.resolve(data);
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
		dataList:{RESVE_COMPT:null ,CARE_COMPT:null},
		margData:[],
		params: {}, 
		resveData:[],
		selectScheduleList: function() {
			
			var deferred = $.Deferred();
			$.ajax({
				url: ROOT + '/mssr/selectScheduleDetail',
				data:popSchModify.params,
				success: function(res) {
				console.log('selectScheduleDetail', res);
					if (res.status === 200) {
						popSchModify.margData = popSchModify.convertTime(res.list[0].RESVE_TM_LIST);
						popSchModify.dataList.RESVE_COMPT = res.list[0].RESVE_COMPT.split(',');
						popSchModify.dataList.CARE_COMPT = res.list[0].CARE_COMPT.split(',');
						console.log(popSchModify.dataList);
						
						deferred.resolve(popSchModify.margData);
						//popSchModify.dataList.push (res.list);
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
			$.when(	popSchModify.cmmnCode.getAllCodeList(),popSchModify.selectScheduleList()).done(function(result){
							 popSchModify.rowAddEvent();
			});
			
		},		
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
	   rowAddEvent:function(){		
				$.when(addRow()).then(function(cnt,lastTime){
			
					    var arrayCnt = popSchModify.margData.length  
					    var startTime = 0;
					    var endTime = 0;
					  
					    if ( cnt <=arrayCnt ) {
					        startTime = Number(popSchModify.margData[cnt-1].startTime);
					        endTime  =  Number(popSchModify.margData[cnt-1].endTime);
					     
					    } else {	
					 
					    	startTime = lastTime  
					    	endTime  =  $("#scheduleModify_startTime1 option:last").val();
					    }
					     console.log(endTime);
					    $("#scheduleModify_startTime"+cnt).val(startTime);
						$("#scheduleModify_endTime"+cnt).val(endTime); 
				    
					   if(  cnt < arrayCnt ){
				    	     popSchModify.rowAddEvent();
				        }  
					   if (cnt==5){$("#scheduleModify_rowAddBtn").removeClass('cr01').prop('disabled',true)}	
						
				});
	
	    },
		button:{
			popSaveClickEvent:function(){
				
				$("#scheduleModify_saveBtn").on("click",function(){			
					if(!popSchModify.validation.timeCheck()){
						return false;
					}
				    var timeSheet = getParamsdiff();
				    
				    if(!popSchModify.validation.careCheck(timeSheet.deleteTime)){
				    	return false;
					}			    
				   
				    
				    confirmPopup(popSchModify.validation.resveCheck(timeSheet.deleteTime)||'헬스키퍼 스케쥴을 등록 하시겠습니까?', function(){		
						$.ajax({
							url: ROOT + '/mssr/scheduleModify',
							type: 'POST',
							data: {bldCode :  popSchModify.params.bldCode,
							       bedCode:   popSchModify.params.bedCode, //배드     
								   mssrEmpno : popSchModify.params.mssrEmpno,
								   resveDate : popSchModify.params.resveDate,
								   insertTime: timeSheet.insertTime.toString(),
								   deleteTime: timeSheet.deleteTime.toString()	   
							},
							success : function(res){
										
								scheduleList.list.renderScheduleList();
								alertPopup('수정 되었습니다.');
							},
							error : function(err) {
								console.error(err)
							}
						}); 
 					});
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
			 },
			 timeCheck: function(){
				 var chk = true;
				 $('select[id^=scheduleModify_startTime]').each(function(i,e){
					 var startTm = $('#'+e.id);
					 var endTm = $('#scheduleModify_endTime' + e.id.replace('scheduleModify_startTime',''));
					 
					 if(startTm.val()>endTm.val()){
						 //alertPopup('시작시간이 종료시간보다 클 수 없습니다.');
						 $("#requiredMsg").text(getMessage('error.timeCompareStartEnd'));
						 $(".rv-desc").show();
						 chk = false;
					 }						
				 })
				 return chk;
			 },
			 resveCheck:function(deleteTime){
			    var cnt =  deleteTime.filter(function(x){return popSchModify.dataList.RESVE_COMPT.indexOf(x) >= 0; });
			    if(cnt.length>0){	 
					 return '스케쥴 수정 시 기존 예약 '+cnt.length +'건이\n 자동 취소 됩니다. 수정하시겠습니까';
				}else{
					return'';
				}
			 },
			 careCheck:function(deleteTime){
				 var cnt = deleteTime.filter(function(x){return popSchModify.dataList.CARE_COMPT.indexOf(x) >= 0; });
				 if(cnt.length>0){	 
					alertPopup('수정되는 시간에 이미 \n케어완료 된 건이 있습니다.\n근무시간 확인 후 재 요청 바랍니다.');
					 return false;
				 }else{
					 return true;
				 }
				
			 }
			
      }
		
}

function fnRowDelete(){
    var id = event.target.parentNode.parentNode.id;
    $('#'+id).remove();
    popSchModify.margData =[];
    if ($("#scheduleModify_rowAddBtn").prop("disabled")){$("#scheduleModify_rowAddBtn").addClass('cr01').prop('disabled',false)}	
    $("#scheduleModify_Body tr").each(function(index){
		     rowidrest = this;
		     index += 1
		     $(rowidrest).children("th").text("근무시간 "+(index))
		     $(rowidrest).attr({"id":"tr"+index ,"data-rowid":index});
		     $(rowidrest).children('td').children('input,select').attr("id",function(){ return "scheduleModify_"+ this.name + index })
		});
	
}
function getParams(){
	var params = [] 
	$(".scheduleModify").each(function(){
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
    var diff1 = defData.filter( function(x){ return setTimesheet.indexOf(x) >= 0 });
    var diffInsert = setTimesheet.filter(function(x){ return defData.indexOf(x) < 0});
    var diffDelete = defData.filter(function(x){ return diff1.indexOf(x) < 0});
    return{insertTime:diffInsert,deleteTime:diffDelete}
 }

 function  addRow (){ 
	  var deferred = $.Deferred();
	  var trCnt = $(".scheduleModify").length +1;	
	  var lastTiem = (trCnt==1)? trCnt + 1 : $("select[name='endTime']:last").val();
	   
	   
	   if(trCnt <=5 ){
		
		 var scheduleListHtml = [];
	           scheduleListHtml.push('<tr id="scheduleModify_tr'+trCnt+'" data-rowid = "'+trCnt+'" class="scheduleModify"><th>근무시간'+trCnt+'</th> ');
				scheduleListHtml.push('<td>');
				//scheduleListHtml.push('<select name ="startTime" data-code-tyl="RVT" data-code-tys="RVTSTART" id="scheduleModify_startTime'+trCnt+'"></select>'); 
				scheduleListHtml.push(' <select name ="startTime" data-code-tyl="RVT" data-code-tys="RVTSTART" id="scheduleModify_startTime'+trCnt+'"> ')
			    scheduleListHtml.push(popSchModify.cmmnCode.startTimeCombo.join(''));
			    scheduleListHtml.push('</select>');
				scheduleListHtml.push(' <em class="fromto"> ~ </em> ');
				scheduleListHtml.push('<select name ="endTime" data-code-tyl="RVT" data-code-tys="RVTEND" id="scheduleModify_endTime'+trCnt+'">')
				scheduleListHtml.push(popSchModify.cmmnCode.endTimeCombo.join(''));
				scheduleListHtml.push('</select> ');
				//scheduleListHtml.push('<select name ="endTime"  data-code-tyl="RVT" data-code-tys="RVTEND"  data-default-str ="9" id="scheduleModify_endTime'+trCnt+'"></select>')
		    if(trCnt == 1){
				scheduleListHtml.push('<button class="t-btn cr01" id="scheduleModify_rowAddBtn" onclick="popSchModify.rowAddEvent()">추가</button></td></tr>');
			
		    }else{
				scheduleListHtml.push("<button name='delBtn' class='t-btn cr01' onclick='fnRowDelete(event)'>삭제</button></td></tr>"); 
			}
            $('#scheduleModify_Body').append(scheduleListHtml.join(''));
    
	}else{
		deferred.reject("");
	}
  deferred.resolve(trCnt,lastTiem);
  return deferred.promise();

 } 
$(document).ready(function(){		
	var item = '${item}';
	var data = JSON.parse(item);
	console.log("modify",data);
	var resveDt =data.RESVE_DE.substr(0,4) + '-' + data.RESVE_DE.substr(4,2) + '-' + data.RESVE_DE.substr(6,2);
	popSchModify.init();
	popSchModify.params.bldCode = data.BLD_CODE;
	popSchModify.params.RESVE_NO = data.RESVE_NO;
	popSchModify.params.resveDate = data.RESVE_DE;
	popSchModify.params.mssrEmpno = data.MSSR_EMPNO;
	popSchModify.params.resveTime = data.RESVE_TM;
	popSchModify.params.bedCode = data.BED_CODE;
	popSchModify.params.timeList = data.RESVE_TM_LIST;
	popSchModify.renderScheduleList()
   	var resve_de =  moment(resveDt,"YYYYMMDD",'ko'); 
	var resveDt = resve_de.format('YYYY-MM-DD (ddd)');
	$("#tdResveDate").text(resveDt);
	$("#tdMssName").text(data.MSSR_NCNM);
	$('#tdBedName').text(data.BED_NM)

	
})
  
</script>
