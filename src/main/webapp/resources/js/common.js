/**
 * validatin 및 focus 이동 관련 javascript function을 모았습니다. <br>
 * <br>
 * <li>작성자 : 이재달</li>
 * <li>작성일 : 2009.01.22</li>
 * <br>
 * <li>수정내용</li>
 * 2009.01.22 -  이재달</li> : 이혜원 선임이 작성한 CommonScript.js 파일을 수정함<br>
 * 
 * @version	  최종버전(1.0.0)
 * @author 	  Copyright (C) 2009 by SAMSUNG SDS co.,Ltd. All right reserved.
 */

var MSG_CO_0001_KO = "검색이 완료되었습니다.";
var MSG_CO_0002_KO = "등록되었습니다.";
var MSG_CO_0003_KO = "수정되었습니다.";
var MSG_CO_0004_KO = "삭제되었습니다.";

//popup form 에서 사용할 hidden 객체 들어갈 div or span id
var addHiddenForPopupName = "spanForPopupHidden" ;

//날짜구분자
var dataSeq = '/';	

/**
 * 다음 index로 이동한다.
 *
 * @param obj : html 화면 내에 있는 모든 객체
 * @return    : next focus
 */
function gfnMsg(sMsgId) {
	alert(sMsgId) ;
}

/**
 * 다음 index로 이동한다.
 *
 * @param obj : html 화면 내에 있는 모든 객체
 * @return    : next focus
 */
function gfnEnterKey(obj, method)
{

        keynum = event.keyCode;

        if(keynum == 0x19) event.keyCode = 0;

        if(keynum == 0x0D)
        {
            if(obj.types == "DATE" && isValidDate(delDateDelimiter(obj.value)) == true)
            {
                for(var x=0; x<eval(obj.form.name).elements.length; x++)
                {
//                    alert(eval(obj.form.name).elements[x].name+":"+eval(obj.form.name).elements[x].tabIndex);
                    if(eval(obj.form.name).elements[x].tabIndex == obj.tabIndex)
                    {
                        eval(obj.form.name).elements[x+1].focus();
                        event.keyCode = 0x09;
                    }
                }
            }

            eval(method);

            if(obj.getAttribute("submit") != "")
            {
                window.event.keyCode = 0x09;
            }
        }

}
/**
 * 첫번째 Index에 Focus를 맞춰준다.
 *
 * @param : form
 * @return    : focus
 */
function gfnCmInit(form){

	for(vi=0; vi<form.elements.length;vi++){
		var formField = form.elements[vi];
	    var fieldType = formField.type;
	    
		if(fieldType != 'hidden'){
			form.elements[vi].focus();
			return;
		}
	}
}
/**
 * HTML 태그를 검색하고 특정 단어의 값을 얻어 Validation체크 함수를 수행한다.
 *
 * @param : Object
 * @return :
 */
function gfnFormValidation(form){
     for(vi=0; vi<form.elements.length;vi++){
        var formField = form.elements[vi];
        var fieldType = formField.type;

        if(fieldType != 'hidden'){
            var fieldName = formField.name;
            var fieldValue = gfnPortalTrim(formField.value);
            var num = formField.getAttribute("num");
            var fieldTitle = formField.getAttribute("fieldTitle");

            if(formField.getAttribute("required") != null && fieldType == "radio"){
                fieldValue = "";
                var wi = vi;
                while(form.elements[wi].type == "radio"){
                    if(form.elements[wi].checked == true){
                        fieldValue = form.elements[wi].value;
                    }
                    wi++;
                }
                form.elements[wi].value = fieldValue;
            }
            if(formField.getAttribute("required") != null && fieldValue == ""){
                alert(fieldTitle+" 은(는) 필수 입력항목입니다.");
                return gfnPortalReturnFalse(formField);
            }
            if(formField.getAttribute("filter") != null && gfnPortalSpecialCharCheck(fieldValue,formField.getAttribute("filter"))){
                alert(fieldTitle+ "에 아래와 같은 문자는 사용하실 수 없습니다. " + "\n\n" + formField.getAttribute("filter"));
                return gfnPortalReturnFalse(formField);
            }
            if(formField.getAttribute("maxLength") != null && formField.getAttribute("maxLength") >0 && !gfnPortalMaxLengthCheck(fieldValue,formField.getAttribute("maxLength"))){
                alert(fieldTitle+" 최대 입력값을 초과했습니다."+ "\n\n"  + "최대 입력 가능한 문자 수 : " + formField.getAttribute("maxLength"));
                return gfnPortalReturnFalse(formField);
            }
            if(formField.getAttribute("minLength") != null && !gfnPortalMinLengthCheck(fieldValue,formField.getAttribute("minLength"))){
                alert(fieldTitle+" 최소 입력값 보다 작습니다."+ "\n\n"  + "필수 입력 문자 수 :  " + formField.getAttribute("minLength"));
                return gfnPortalReturnFalse(formField);
            }
            if(num != null && fieldValue != ""){
                if(num == "" && !gfnPortalNumberCheck(fieldValue,".-")){
                    alert(fieldTitle + "은(는) 반드시 실수형 숫자만 입력해야 합니다.");
                    return gfnPortalReturnFalse(formField);
                }else if(num == "i" && !gfnPortalNumberCheck(fieldValue,"-")){
                    alert(fieldTitle + "은(는) 반드시 정수형 숫자만 입력해야 합니다.");
                    return gfnPortalReturnFalse(formField);
                }else if(num == "n" && !gfnPortalNumberCheck(fieldValue,"")){
                    alert(fieldTitle + "은(는) 반드시 숫자만 입력해야 합니다.");
                    return gfnPortalReturnFalse(formField);
                }else if(num != "" && num != "i"){
                    if(!gfnPortalNumberCheck(fieldValue,".-")){
                        alert(fieldTitle + "은(는) 반드시 실수형 숫자만 입력해야 합니다.");
                        return gfnPortalReturnFalse(formField);
                    }
                    var oneTwo = num.split(".");
                    if(!gfnNumLengthCheck(fieldValue,oneTwo[0],oneTwo[1])){
                        alert(fieldTitle+"잘못된 입력값입니다.\n\n 소수점 자리 위 자리 수  : "+oneTwo[0]+" 소수점 아래 자리 수 : "+oneTwo[1]);
                        return gfnPortalReturnFalse(formField);
                    }
                }
            }

            if(formField.getAttribute("fromNum") != null && gfnPortalNumberCheck(fieldValue,"-.")){
                if(eval(formField.getAttribute("fromNum")) > eval(fieldValue)){
                    alert(fieldTitle + "은(는) " + formField.getAttribute("fromNum") + "이상 입력하세요.");
                     return gfnPortalReturnFalse(formField);
                }
            }
            if(formField.getAttribute("toNum") != null && gfnPortalNumberCheck(fieldValue,"-.")){
                if(eval(formField.getAttribute("toNum")) < eval(fieldValue)){
                    alert(fieldTitle + "은(는) " + formField.getAttribute("toNum") + "이하로 입력하세요.");
                    return gfnPortalReturnFalse(formField);
                }
            }

            if(formField.getAttribute("format") != null && fieldValue !=""){
                if(!gfnPortalFormatMask(fieldValue, formField.getAttribute("format"))){
                    alert(fieldTitle+" 잘못된 입력값입니다.\n\n Format : "+formField.getAttribute("format"));
                    return gfnPortalReturnFalse(formField);
                }
            }

            if(formField.getAttribute("char") != null && !gfnPortalCharValidation(formField.getAttribute("char"),fieldValue,fieldTitle)){
                    return gfnPortalReturnFalse(formField);
            }

            if(formField.getAttribute("valCheck") != null && !gfnPortalEtcValidation(formField, vi)){
                return gfnPortalReturnFalse(formField);
            }

        } // hidden if
    } // end for
    return true;
}

function gfnPortalCharValidation(p_char,fieldValue,fieldTitle){
    if(p_char.indexOf("s") >= 0 && gfnPortalSpecialCharCheck(fieldValue, /[$\\@\\\#%\^\&\*\"\']/)){
        alert(fieldTitle + "에는 특수문자를 입력하실 수 없습니다.");
        return false;
    }
    if(p_char.indexOf("k") >= 0 && gfnPortalCharCheck(fieldValue, "k")){
        alert(fieldTitle + "에는 한글을 입력하실 수 없습니다.");
        return false;
    }
    if(p_char.indexOf("e") >= 0 && gfnPortalCharCheck(fieldValue, "e")){
        alert(fieldTitle + "에는 영문을 입력하실 수 없습니다.");
        return false;
    }
    if(p_char.indexOf("n") >= 0 && gfnPortalCharCheck(fieldValue, "n")){
        alert(fieldTitle + "에는 숫자를 입력하실  수 없습니다.");
        return false;
    }
    return true;
}

function gfnPortalEtcValidation(formField, index){
    var fieldName = formField.name;
    var fieldValue = gfnPortalTrim(formField.value);
    var fieldTitle = formField.getAttribute("fieldTitle");

	if(formField.getAttribute("valCheck") != null && formField.getAttribute("valCheck").toUpperCase().indexOf("MAIL") > -1 && fieldValue !="" && !gfnPortalEmailCheck(fieldValue) ){
        alert("이메일 주소를 확인하여 주십시오.\n\n"+" ex) nts@nts.co.kr");
        return false;
    }
	if(formField.getAttribute("valCheck") != null && formField.getAttribute("valCheck").toUpperCase().indexOf("URL") > -1 && fieldValue !="" && !gfnPortalURLCheck(fieldValue) ){
        alert(fieldTitle+" 을(를) URL 형식으로 입력해 주세요.\n\n");
        return false;
    }
	if(formField.getAttribute("valCheck") != null && formField.getAttribute("valCheck").toUpperCase().indexOf("PHONE") > -1 && fieldValue !="" && !gfnPortalPhoneCheck(fieldValue) ){
        alert(fieldTitle+" 을(를) 전화번호 형식으로 입력해 주세요."+" ex) 02-202-0020");
        return false;
    }
	if(formField.getAttribute("valCheck") != null && formField.getAttribute("valCheck").toUpperCase().indexOf("DATE") > -1 && fieldValue !="" && !gfnPortalDateCheck(fieldValue) ){
        alert(fieldTitle+" 을(를) 날짜 입력 형식으로 입력해 주세요.\n\n"+" ex) 20051031");
        return false;
    }
	if(formField.getAttribute("valCheck") != null && formField.getAttribute("valCheck").toUpperCase().indexOf("JUMIN") > -1 && fieldValue !="" && !gfnPortalJuminCheck(fieldValue) ){
        alert(fieldTitle+" 을(를) 주민등록 번호 입력 형식으로 입력해 주세요.\n\n"+" ");
        return false;
    }

    return true;
}

function gfnPortalTrim(str) {
    if(str == null)
        return '';
    var count = str.length;
    var len = count;
    var st = 0;

    while ((st < len) && (str.charAt(st) <= ' ')) {
        st++;
    }
    while ((st < len) && (str.charAt(len - 1) <= ' ')) {
        len--;
    }
    return ((st > 0) || (len < count)) ? str.substring(st, len) : str ;
}

function gfnPortalMaxLengthCheck(formValue, maxlength){
    var temp;
    var bytes = 0;
    var len = formValue.length;

    for(ii=0; ii<len; ii++){
        temp = formValue.charAt(ii) ;

	if(escape(temp).length > 4){
	    bytes += 3;
	}else{
	    bytes++;
	}
    }
    if(maxlength >= bytes){
	return true;
    } else {
	return false;
    }
}

function gfnPortalMinLengthCheck(formValue, minlength){
    var temp;
    var bytes = 0;
    var len = formValue.length;

    for(ii=0; ii<len; ii++){
        temp = formValue.charAt(ii) ;

	if(escape(temp).length > 4){
	    bytes += 3;
	}else{
	    bytes++;
	}
    }
    if(minlength <= bytes){
	return true;
    } else {
	return false;
    }

}

function gfnPortalSpecialCharCheck(fieldValue, str) {
    var re=new RegExp(str);
    if(re.test(fieldValue))
        return true;

    return false;
}

function gfnPortalSpecialCharCheck2(fieldValue, str) {
    var retCode = 0;
    for (sc = 0; sc < str.length; sc++) {
        var code = str.charCodeAt(sc);
        var ch = str.substr(sc,1).toUpperCase();

        code = parseInt(code);
        if(fieldValue.indexOf(ch) >= 0){
            return true;
        }
    }
    return false;
}

function gfnPortalCharCheck(str, type){
    var retCode = 0;
    for (i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        var ch = str.substr(i,1).toUpperCase();

        code = parseInt(code);
        if (type=="k" && (ch < "0" || ch > "9") && ( ch < "A" || ch > "Z") && ((code > 255) || (code < 0))) {
            return true;
        }
        if (type=="e" && (ch >= "A") && (ch <= "Z")) {
            return true;
        }
        if (type=="n" && (ch >= "0" && ch <= "9")) {
            return true;
        }
    }
    return false;
}

function gfnPortalNumberCheck(x,z){
    var cmp = "1234567890";
    var ifor;

    var return_value = true;

    len = x.length;

    if (z !=''){
        cmp = "1234567890"+z;
    }

    if (x == "" || x == null || len < 1){
        return_value = false;
    }else{
	for(ifor=0;ifor<len;ifor++){
            if(cmp.indexOf(x.substring(ifor,ifor+1))<0){
		return_value=false;
	    }
	}
    }
    return return_value;
}

function gfnPortalFormatMask(fieldValue, format){

    var sStr = fieldValue;
    var ik;
    var jk=0;
    var tLen = sStr.length +1 ;
    if(fieldValue.length != format.length){
        return false;
    }

    for(ik=0; ik< sStr.length; ik++){
        if(format.charAt(jk)!="9" && format.charAt(jk)!="s"){
            if(sStr.charAt(ik) != format.charAt(jk)){
                return false;
            }
        }else{
            if(format.charAt(jk) =="9" && !gfnIsTemPositiveInteger(sStr.charAt(ik))){
                return false;
            }
            if(format.charAt(jk) =="s" && gfnIsTemPositiveInteger(sStr.charAt(ik))){
                return false;
            }

        }
        jk++;
    }
    return true;
}

function gfnPortalReturnFalse(formField){
	try {
 		formField.focus();
	} catch (err) {
		// nothing
	}

    return false;
}


function gfnPortalEmailCheck(fieldValue){
    if(fieldValue != "" && (fieldValue.indexOf('@') < 1 || fieldValue.indexOf('.') == -1)){
	return false;
    }
    return true;
}

function gfnPortalURLCheck(fieldValue){
    if(fieldValue != "" &&fieldValue.indexOf('.') == -1){
	return false;
    }
    return true;
}

function gfnPortalPhoneCheck(fieldValue){
    if(fieldValue != "" && fieldValue.indexOf('-')==-1){
    	return false;
    }else{
    	notN = false;
    	phones = fieldValue.split('-');
    	for(pc=0; pc < phones.length ; pc++){
    		if(isNaN(phones[pc])) {
    			notN = true;
    		}
    	}
    	if (notN == true || fieldValue.indexOf(".") >=0) {
    		return false;
    	}
    	return true;
    }
}

function gfnPortalDateCheck(fieldValue){
	var pattern = /^((((19|20)(([02468][048])|([13579][26]))0229))|((20[0-9][0-9])|(19[0-9][0-9]))((((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))31)|(((0[1,3-9])|(1[0-2]))(29|30)))))$/;
	return (pattern.test(fieldValue)) ? true : false;
}

/** 
* @메소드명           	 	: gfnPortalDate10Check
* @메소드 설명         	: 10자리 날짜 체크
* @param fieldValue	: 필드값
*/
function gfnPortalDate10Check(fieldValue){
	var pattern = /^((((19|20)(([02468][048])|([13579][26]))\/02\/29))|((20[0-9][0-9])|(19[0-9][0-9]))\/((((0[1-9])|(1[0-2]))\/((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))\/31)|(((0[1,3-9])|(1[0-2]))\/(29|30)))))$/;
	return (pattern.test(fieldValue)) ? true : false;
}

/** 
* @메소드명           	 	: gfnPortalTime24Check
* @메소드 설명         	: 4자리 시간 체크
* @param fieldValue	: 필드값
*/
function gfnPortalTime24Check(fieldValue){
	var pattern = /^([01][0-9]|2[0-3]):?[0-5][0-9]$/;
	return (pattern.test(fieldValue)) ? true : false;
}

function gfnPortalJuminCheck(fieldValue){
    var pattern = /^([0-9]{6})-?([0-9]{7})$/; 
	var num = fieldValue;
    if (!pattern.test(num)) return false; 
    num = RegExp.$1 + RegExp.$2;

	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";
	for (var i=0; i<12; i++) {
		if (isNaN(num.substring(i,i+1))) return false;
		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}
	var mod = sum % 11;
	return ((11 - mod) % 10 == last) ? true : false;
}

function gfnPortalEnterCheck(){
    if(event.keyCode==13) {
        return true;
    }
    return false;
}

function gfnPortalTextLengthCheck(formField, maxlength){
    var formValue = formField.value;
    if(!gfnPortalMaxLengthCheck(formValue, maxlength)){
	var count=0;
	for(var bytes=0; bytes < maxlength; bytes++,count++){
            var temp = formValue.charAt(count) ;
	    if(escape(temp).length > 4){
                if(bytes == eval(maxlength-1)){
                    count--;
                }else{
		    bytes++;
		}
	    }
	}
        var fieldTitle = formField.getAttribute("fieldTitle");
        alert ( fieldTitle+"최대 입력값을 초과했습니다."+ "\n\n"  + "최대 입력값(영문자기준) : " + maxLength);
	formField.value = formValue.substring(0, count);
	return PortalReturnFalse(formField);
    }
}

function gfnNumLengthCheck(value, first, last){

    var value = gfnPortalTrim(value);
    var temp = value.split(".");
    if(temp.length > 2) return false;

    if(value.length > 0){
        if(gfnCheckLength(temp[0])){
            if(temp[0].length <= first){
                if(temp[1] != null && temp[1].length > 0){
                    if(gfnCheckLength(temp[1])){
                        if(temp[1].length <= last){
                            return true;
                        }else {
                            return false;
                        }
                    }else {
                        return false;
                    }
                }else return true;
            }else {
                return false;
            }
        }else {
            return false;
        }
    }else return true;
}

function gfnCheckLength(value){
    if(gfnIsTemSignedIntegers(value)){
        if(gfnIsTemPositiveInteger(value)){
            return true;
        }else return false;
    }else return false;
}

function gfnIsTemPositiveInteger(s){
    return (gfnIsTemSignedIntegers(s) && (parseInt (s) >= 0 ));
}

function gfnIsTemSignedIntegers(s){
    if(gfnIsTemEmpty(s))
        return false;

    var startPos = 0;

    if((s.charAt(0) == "-") || (s.charAt(0) == "+"))
        startPos = 1;
    return (gfnIsTemInteger(s.substring(startPos, s.length)))
}

function gfnIsTemEmpty(s){
    return ((s == null) || (s.length == 0));
}

function gfnIsTemInteger(s){
    var i;

    if(gfnIsTemEmpty(s))
        return false;

    for(i=0 ; i< s.length ; i++){
        var c = s.charAt(i);
        if(!gfnIsTemDigit(c)) return false;
    }

    return true;
}

function gfnIsTemDigit(c){
    return ((c >= "0") && (c <="9"))
}

function gfnIsNull(sValue) {
	if(sValue == null || sValue == "") 
		return true;
	else 
		return false;
}


function gf_CheckKey(){
	if(window.event.keyCode == 13){
   		return true;
  	}else{
   		return false;
  	}
}

/**
 * 해당월의 마지막 날짜 구하기
 * 개    요 :  해당월의 마지막 날짜 구하기
 * @param : sYmd (년/월/일)
 * @return 년/월/일
 * @author SamSung SDS
 */
function gfnGetLastDayOfTheMonth(sYmd) {
	if(sYmd.length != 10) return "" ;
	var sYear=sYmd.substr(0,4) ;
	var sMonth=sYmd.substr(5,2) ;
	var sDay=sYmd.substr(9,2) ;
	
	var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	if(((sYear % 4 == 0) && (sYear % 100 != 0)) || (sYear % 400 == 0))
		monthDays[1]=29;

	return sYear + "/" + sMonth + "/" + monthDays[eval(sMonth)-1];
}


/**
 * 문자열에서 특정 문자를 제거하는 함수
 * @param : srcVal, ch
 * @return srcVal에서 ch가 제거된 문자열 
 * @author SamSung SDS
 */
function gfnRemoveChar(srcVal, ch) {
	var str =  srcVal;
    if (str.length < 1) {
        return "";
    } else {
        var st = "";
        var sp = ch;
        for (var i = 0; i < str.length; i++) {
            if (sp.indexOf(str.substring(i, i + 1)) == -1) {
                st += str.substring(i, i + 1);
            }
        }
        return st;
    }
}

//-------------------------------------------------------------------
// PopUp Window Open 함수 - Window 명까지 파라미터로 받음
//-------------------------------------------------------------------
function gfnPopupWindow(surl, popupwidth, popupheight, winName, sAttr)
{
	if( popupwidth  > window.screen.width )
		popupwidth = window.screen.width;
	if( popupheight > window.screen.height )
		popupheight = window.screen.height;
		 
	if( isNaN(parseInt(popupwidth)) ){
		Top  = (window.screen.availHeight - 600) / 2;
		Left = (window.screen.availWidth  - 800) / 2;
	} else {
		Top  = (window.screen.availHeight - popupheight)  / 2;
		Left = (window.screen.availWidth  - popupwidth) / 2;
	}

	if (Top < 0) Top = 0;
	if (Left < 0) Left = 0;
	
	popupwidth = parseInt(popupwidth) + 10 ;
	popupheight = parseInt(popupheight) + 29 ;
	
	Future = sAttr || "fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no" ;
	Future = Future + ",left=" + Left + ",top=" + Top + ",width=" + popupwidth + ",height=" + popupheight;

	popup_window = window.open(surl, winName , Future) ;
	//popup_window.resizeTo(parseInt(popupwidth)+10, parseInt(popupheight)+29);
	popup_window.focus();
}

/**
 * addHiddenTag From Hashtable
 * 개    요 :  해쉬테이블로부터 hidden tag 생성
 * @param : objHashTable (Hashtable)
 * @param : objIncludeHidden (div 또는 span 오브젝트)
 * @return 
 * @author SamSung SDS
 */
function gfnAddQueryToHidden(objHashTable, objIncludeHidden) {
    if(objHashTable != null && objHashTable.size() > 0) {
        var objArr = objHashTable.keys() ;
        var sHiddenTags = "";
    
        if(objArr != null && objArr.length > 0) {
            for(var i=0; i < objArr.length; i++) {
                sHiddenTags += "<input type=\"hidden\" name=\""+objArr[i]+"\" value=\""+objHashTable.get(objArr[i])+"\">";
            }
            objIncludeHidden.innerHTML = sHiddenTags;                
        }
    }   
}

/**
 * 검색 팝업 띄우기
 * 개    요 :   검색 팝업 띄우기
 * @param : objHashTable (Hashtable)
 * @param : sDoSearch (Y:자동검색/N:자동검색안함-default)
 * @param : sUrl (팝업 url)
 * @param : sWidth (팝업 가로사이즈)
 * @param : sHeight (팝업 세로사이즈)
 * @return 
 * @author SamSung SDS
 */
function gfnOpenPopupSearch(objHashtable, sDoSearch, sUrl, sWidth, sHeight) {
	//기초정보 setting
	if(sDoSearch == null) sDoSearch = 'N' ;
	document.skkuPopupForm.doSearch.value = sDoSearch ;
	document.skkuPopupForm.pageIndex.value = "1" ;
	
	//Hashtable에 숨겨진 값을 form에 추가
	gfnAddQueryToHidden(objHashtable, document.getElementById(addHiddenForPopupName)) ;
	
	//팝업 open
	var sWinName=document.skkuPopupForm.popupName.value;
	gfnPopupWindow("", sWidth, sHeight, sWinName);
	
	document.skkuPopupForm.action = sUrl ;
	document.skkuPopupForm.target = sWinName ;
	document.skkuPopupForm.submit() ;
}

//-------------------------------------------------------------------
// 문자열 좌측의 공백 제거 처리 함수
//-------------------------------------------------------------------
function gfnLTrim(para) {
    while(para.substring(0,1) == ' ')
        para = para.substring(1, para.length);
    return para;
}

//--------------------------------------------------------------------------------------------------
// 금액을 나타내는 숫자열에 3자리 단위로 ','를 삽입하는 함수
//--------------------------------------------------------------------------------------------------
function gfnConvertToCommaNumber(obj) {
	var str =  String(obj.value);
    var x = 0;
    if (str.length < 1) {
        return "";
    } else {
        var tm = "";
        var ck = "";
        if (str.substring(0, 1) == "-") {
            tm = str.substring(1, str.length);
            ck = "Y";
        } else {
            tm = str;
            ck = "N";
        }
        var st = "";
        var cm = ",";
        for (var i = tm.length, j = 0; i > 0; i--, j++) {
            if ((j % 3) == 2) {
                if (tm.length == j + 1) st = tm.substring(i - 1, i) + st;
                else st = cm + tm.substring(i - 1, i) + st;
            } else {
                st = tm.substring(i - 1, i) + st;
            }
        }
        if (ck == "Y") st = "-" + st;
        return st;
    }
}


//--------------------------------------------------------------------------------------------------
// private for applyComma
//--------------------------------------------------------------------------------------------------
function gfnAddComma(input, downDecimal, maxLength) {

    var inputString = new String;
    var outputString = new String;
    var counter = 0;
    var decimalPoint = -1;
    var end = 0;
    var modval = 0;
    
    inputString = input.toString();
    outputString = '';
    decimalPoint = inputString.indexOf('.', 1);
    
    if(decimalPoint == -1) {
        end = inputString.length - (inputString.charAt(0)=='0' ? 1:0);

        for (counter=1;counter<=inputString.length;counter++)
        {
            var modval =counter - Math.floor(counter/3)*3;
            outputString = (modval==0 && counter <end ? ',' : '') + inputString.charAt(inputString.length - counter) + outputString;
        }
    } else {
        end = decimalPoint;

        for (counter=1;counter<=end;counter++)
        {
            var modval =counter - Math.floor(counter/3)*3;
            outputString = (modval==0 && counter < end ? ',' : '') + inputString.charAt(end - counter) + outputString;
        }

        for (counter=decimalPoint; counter < decimalPoint+1+downDecimal; counter++)
        {
            outputString += inputString.charAt(counter);
        }
    }
    
    if(outputString.length > maxLength) {
        outputString = outputString.substr(0, maxLength);
        outputString = gfnRemoveComma(outputString, downDecimal);
        outputString = gfnAddComma(outputString, downDecimal, maxLength);
    }

    return (outputString);
}

//--------------------------------------------------------------------------------------------------
// private for applyComma
//--------------------------------------------------------------------------------------------------
function gfnRemoveComma(input, downDecimal) {
    
    var inputString = new String;
    var outputString = new String;
    var outputNumber = new Number;
    var counter = 0;
    var decimalPoint = -1;
    var countComma = 0;

    if (input == '.') {
        if(downDecimal > 0) return '0.';
    } else if (input == '') {
        return '';
    }
    
    inputString=input;
    outputString='';
    decimalPoint = inputString.indexOf('.', 1);

    for (counter=0;counter <inputString.length; counter++) {
        if(inputString.charAt(counter) != ',')
            outputString += inputString.charAt(counter);
        else {
            countComma++;
        }
    }

    outputNumber = parseFloat(outputString);
    
    if(downDecimal > 0 && decimalPoint > -1 && decimalPoint == outputString.length-1+countComma) {
        return outputNumber + ".";
    } else {
        return (isNaN(outputNumber) ? '' : outputNumber);
    }
}

//--------------------------------------------------------------------------------------------------
// 금액입력 항목에 숫자키와 Backspace, Tab, Numlock, '.' 키만을 허용한다.
// 사용예 : <input type="text" onKeyPress="gfnApplyCurrency(this)">
//--------------------------------------------------------------------------------------------------
var tmpObjName = null;

function gfnApplyCurrency(obj)
{
    if ((event.keyCode >= 48 && event.keyCode <= 57)
        || (event.keyCode >= 96 && event.keyCode <= 105)
        || (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 144 || event.keyCode == 110 || event.keyCode == 190)
        || (event.keyCode == 45 || event.keyCode == 46)) { // - 와 . key
        event.returnValue = true;
    } else {
        event.returnValue = false;
    }

    if(event.srcElement.name != tmpObjName) {
        tmpObjName = obj.name;

        obj.blur();
        obj.focus();
        obj.select();
    }

    if(event.keyCode == 9) {
        tmpObjName = null;
    }
}

//--------------------------------------------------------------------------------------------------
// 금액입력 항목에 콤마를 추가한다.
// @param obj = object
// @param downDecimal = 소수점 이하 자리수 (생략가능)
// 사용예 : <input type="text" onKeyUp="gfnApplyComma(this,2)">
//--------------------------------------------------------------------------------------------------
function gfnApplyComma(obj, downDecimal)
{
    if(!downDecimal) downDecimal = 0;
    if(downDecimal < 0) downDecimal = 0;

    var input = obj.value;
	var first = "";
	if(input.substring(0,1) == "-") {input = input.substring(1,input.length); first = "-";}

    input = removeComma(input, downDecimal);
    input = addComma(input, downDecimal, obj.maxLength);
    
    obj.value = first + input;
    
    if(obj.onchange != null)
    	obj.onchange() ;
}

//--------------------------------------------------------------------------------------------------
// 금액 항목을 검증한다.
// 사용예 : <input type="text" onBlur="gfnApplyNumber(this)">
//--------------------------------------------------------------------------------------------------
function gfnApplyNumber(obj) {
    if(obj.value.length-1 == obj.value.indexOf('.')) {
        obj.value = obj.value.replace(/\./g, '');
        if(obj.onchange != null)
	    	obj.onchange() ;
    }
}



//--------------------------------------------------------------------------------------------------
// 날자 입력창에 데이터를 입력할때 자동으로 '.' 가 붙어 입력되게 하기 위해 사용한다.
// 하지만 이 함수는 항상 커서가 맨 뒤로 가기 때문에 숫자의 맨 앞이나 중간 값을 삭제할 때 문제를 발생 시킨다.
// 백스페이스 키를 사용할 수 있게 하기위해 해당 키가 들어오는지를 확인하는 부분이 있다.
// 이 함수를 사용하기 위해서는 다음과 같이 정의하여야 한다.
// <INPUT type="text" name="reqYmd" value="" size="10" maxlength="8"
//    onBlur='javascript:gfnApplyDateSep(this)'
//	  onfocus = 'javascript:gfnRemoveDateSep(this)'>
// 상기 예처럼 Key가 폼을 벋어날때 날짜 구분자를 붙일 수 있도록 onBlur를 사용하며
// Key가 다시 돌아 왔을때 날짜 구분자를 제거하고 수정할 수있도록 gfnRemoveDateSep()를 사용한다.
// * 주의  : maxlength 는 반드시 8로 쓴다.
//--------------------------------------------------------------------------------------------------
function gfnApplyDateSep(obj) {

	var i = 0;
	var sep = dataSeq;
	var str = '';

	var t_date = new String(gfnRemoveDateSep(obj));

	if((t_date.length < 1) || (t_date == ''))
		return '';

	for(i=0;i<t_date.length;i++) {
		if(!gfnIsTemInteger(t_date.charAt(i))){    // '.', '-'를 체크하지 못해 is_numeric()를 새로 추가함 0425
			alert("날자 입력이 잘못되었습니다.\n\nYYYYMMDD 형식으로 입력해 주십시오!!");
			obj.focus();
			return "";
		}
	}
	if (t_date.length != 8) {
		alert("날자 입력이 잘못되었습니다.\n\nYYYYMMDD 형식으로 입력해 주십시오!!");
		obj.focus();
		return "";
    }
	else {
		str = t_date.substring(0, 4) + sep + t_date.substring(4, 6) + sep + t_date.substring(6, 8);
    }
	obj.value = str;
}

//--------------------------------------------------------------------------------------------------
// 날자 타입의 날짜구분자를 제거하는 함수
//--------------------------------------------------------------------------------------------------
function gfnRemoveDateSep(obj) {
	var str =  String(obj.value);

    if (str.length < 1) {
        return "";
    } else {
        var st = "";
        var sp = dataSeq;
        for (var i = 0; i < str.length; i++) {
            if (sp.indexOf(str.substring(i, i + 1)) == -1) {
                st += str.substring(i, i + 1);
            }
        }
        return st;
    }
}

/*
 * mask형식으로 문자열을 변환한다.
 * 예) 우편번호일경우 <input type="text" ..... onblur="gfnFormatMask(this, '999-999')">
 * 예) 날짜일경우 <input type="text" ..... onblur="gfnFormatMask(this, '9999-99-99')">
 * 예) 사업자번호일 경우 <input type="text" ..... onblur="gfnFormatMask(this, '999-99-99999')">
 * 
 * @param obj input object
 * @param mask 설정할 형식
 * @return 
 * @browser IE6, NS7
 * @author 삼성 SDS
 */
function gfnFormatMask(obj, mask){
    var str = obj.value;
    if(str == "" || str.length == 0) return;
    var sStr = str.replace( /(\$|\^|\*|\(|\)|\+|\.|\,|\?|\\|\{|\}|\||\[|\]|-|:)/g,"");
    var tStr="";
    var i;
    var j=0;
    var tLen = sStr.length +1 ;
    for(i=0; i< sStr.length; i++){
        tStr += sStr.charAt(i);
        j++;
        if (j < mask.length && mask.charAt(j)!="9") tStr += mask.charAt(j++);
    }
    obj.value = tStr;
}

/**
 * HashTable() 자료구조
 * 개    요 :  HashTable 구현
 *             var result = new HashTable()
 *             result.put(key, value)       <-- 값입력
 *             result.get(key)              <-- 값사용
 *             result.size()                <-- HashTable size()
 *             result.isEmpty()             <-- HashTable 사용여부
 *             result.isKey(key)            <-- key존재여부
 *             result.keys()                <-- key를 배열로 return
 *             result.values()              <-- 값을 배열로 return
 *             result.remove(key)           <-- key와 해당값 삭제
 *             result.removeAll()           <-- key와 값 전체 삭제
 *             result.putAll(HashTable)     <-- 해당 HashTable import
 * @param sFirstKey 첫번째 요소의 Key (옵션임)
 * @param sFirstValue 첫번째 요소의 Value (옵션임)
 * @return 
 * @author SamSung SDS
 */
function HashTable(sFirstKey, sFirstValue, sSecondKey, sSecondValue, sThirdKey, sThirdValue) {
    var _AXObj     = null;
    var _arrKey    = null;
    var _arrValue  = null;
    var strMsg     = "";
        
    // 변수 초기화
    this._AXObj    = new Object();
    this._arrKey   = new Array();
    this._arrValue = new Array();

    if(sFirstKey != null && sFirstKey != "")
    {
        if (sFirstValue == null) sFirstValue = "" ;
        this._arrKey.push(sFirstKey);
        this._arrValue.push(sFirstValue);
        this._AXObj[sFirstKey] = sFirstValue;
    }
    
    if(sSecondKey != null && sSecondKey != "")
    {
        if (sSecondValue == null) sSecondValue = "" ;
        this._arrKey.push(sSecondKey);
        this._arrValue.push(sSecondValue);
        this._AXObj[sSecondKey] = sSecondValue;
    }
    
    if(sThirdKey != null && sThirdKey != "")
    {
        if (sThirdValue == null) sThirdValue = "" ;
        this._arrKey.push(sThirdKey);
        this._arrValue.push(sThirdValue);
        this._AXObj[sThirdKey] = sThirdValue;
    }

    // 값입력
    this.put = function(key, value) {
        if (key == null || key == "") {
            throw new Error(0, "[HashTable-Error] put(key, value) 형식으로 입력해야 합니다." + strMsg);
        } else {
            if (this.isKey(key)) {
                throw new Error(0, "[HashTable-Error] ('" + key + "') 같은 key값이 존재 합니다." + strMsg);
            } else {
                if (value == undefined || value == null) value = "";
                this._arrKey.push(key);
                this._arrValue.push(value);
                this._AXObj[key] = value;
            }
        }
    }

    // key에 맞는 값 가져오기
    this.get = function(key) {
        if (key == null || key == "") {
            throw new Error(0, "[HashTable-Error] get(key) 형식으로 입력해야 합니다." + strMsg);
        } else {
            if (this.isKey(key)) {
                return this._AXObj[key];
            } else {
                //throw new Error(0, "[HashTable-Error] ('" + key + "') key값이 존재하지 않습니다." + strMsg);
                return "";
            }
        }
    }

    // 배열크기
    this.size = function() {
        return this._arrKey.length;
    }

    // 배열 존재여부 확인
    this.isEmpty = function () {
        return this.size() > 0 ? true : false;
    }

    // key 존재여부 확인
    this.isKey = function (key) {
        if (key == null || key == "") {
            throw new Error(0, "[HashTable-Error] isKey(key) 형식으로 입력해야 합니다." + strMsg);
        } else {
            if (this._AXObj[key] == undefined || this._AXObj[key] == null) {
                return false;
            } else {
                return true;
            }
        }
    }

    // 값을 배열로 return
    this.values = function () {
        if (this.size() > 0) {
            return this._arrValue;
        } else {
            throw new Error(0, "[HashTable-Error] HashTable에 값이 존재하지 않습니다." + strMsg);
        }
    }

    // key를 배열로 return
    this.keys = function () {
        if (this.size() > 0) {
            return this._arrKey;
        } else {
            throw new Error(0, "[HashTable-Error] HashTable에 값이 존재하지 않습니다." + strMsg);
        }
    }

    // key에 해당하는 아이템 삭제
    this.remove = function (key) {
        if (key == null || key == "") {
            throw new Error(0, "[HashTable-Error] remove(key) 형식으로 입력해야 합니다." + strMsg);
        } else {
            if (this.isKey(key)) {
                this._AXObj[key] = null;
                var len = this._arrKey.length;
                for (var i=0; i<len; i++) {
                    if (this._arrKey[i] == key) {
                        this._arrKey = this._arrKey.slice(0,i).concat(this._arrKey.slice(i+1,len));
                        this._arrValue = this._arrValue.slice(0,i).concat(this._arrValue.slice(i+1,len));
                        break;
                    }
                }
            } else {
                throw new Error(0, "[HashTable-Error] key값이 존재하지 않습니다." + strMsg);
            }
        }
    }

    // 전체 아이템 삭제
    this.removeAll = function () {
        this._AXObj    = new Object();
        this._arrKey   = new Array();
        this._arrValue = new Array();
    }

    // 다른 HashTable import
    this.putAll = function(hashTable) {
        if (!(hashTable instanceof HashTable)) {
            throw new Error(0, "[HashTable-Error] HashTable.putAll(hashTable) method는 jHashTable type의 parameter만 가능합니다." + strMsg);
        }
        var keys = hashTable.keys();
        for (var i in keys) {
            this.put(keys[i], hashTable.get(keys[i]));
        }
        return this;
    }
}


/*
 * report 출력팝업 호출
 * 
 * @param obj input object
 * @param mask 설정할 형식
 * @return 
 * @author 삼성 SDS
 */
function gfnPopReport(sFileName, sOption, iWidth, iHeight, sAttr){
	var sWinName = "REPORT_POP";
	
	if(gfnIsNull(iWidth)) {
		iWidth = 1024;
	}
	
	if(gfnIsNull(iHeight)) {
		iHeight = 860;
	}
	
	var objHashtable = new HashTable() ;
	objHashtable.put("file", sFileName);
	objHashtable.put("param", sOption);
	gfnAddQueryToHidden(objHashtable, document.getElementById(addHiddenForPopupName)) ;
	
	gfnPopupWindow("", iWidth, iHeight, sWinName, sAttr);
	var sBase = sFileName.substr(0,2).toLowerCase();
	document.skkuPopupForm.action = "/" + sBase + "/jsp/common/report.jsp" ;
	document.skkuPopupForm.target = sWinName ;
	document.skkuPopupForm.submit() ;
}

/*
 * UserID 검증
 * 
 * @param sId 검증할 ID
 * @return boolean
 * @author 삼성 SDS
 */  
function gfnValidUsrId(sId){  
	var pattern1 = /^[a-z\d\.]{4,12}$/;  
	var pattern2 = /[a-z]/;
	var pattern3 = /[\d]/;  
	var pattern4 = /[\.]/;
	return (pattern1.test(sId));  
}

/*
 * Password 검증
 * 
 * @param sPasswd 검증할 PW
 * @return boolean
 * @author 삼성 SDS
 */
function gfnValidPasswd(sPasswd){
	var pattern1 = /^[a-z\d\W]{8,20}$/;
	var pattern2 = /[a-z]/;
	var pattern3 = /[\d]/;
	var pattern4 = /[\W]/;
	return (pattern1.test(sPasswd) && 
			(pattern2.test(sPasswd) && pattern3.test(sPasswd)) ||
			(pattern2.test(sPasswd) && pattern4.test(sPasswd)) ||
			(pattern3.test(sPasswd) && pattern4.test(sPasswd)));
}

/* 보안관련 스크립트 추가 */
function gfnMouseClick() {
	if ((event.button==2) || (event.button==3)) {
		alert("Not allowed mouse right button.");
	}
}

document.oncontextmenu="return false" ;
document.onmousedown=gfnMouseClick;
//document.ondragstart="return false" ;
//document.onselectstart="return false" ;