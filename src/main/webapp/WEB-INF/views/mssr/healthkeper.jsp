<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<jsp:include page="${JSP}/include/resource.jsp" />	
		<jsp:include page="${JSP}/include/messages.jsp" />	
		<script src="${JS}/mssr/healthkeper.js"></script>
	</head>
	<body>

		<div class="wrap">

			<header class="header">				
				<jsp:include page="${JSP}/include/header.jsp" />
			</header><!-- //header -->

			<div class="content">
				<ul class="tab-design">
					<li rel="tab1"><a href="${ROOT}/mssr/schedule">헬스키퍼 스케쥴 관리</a></li>
					<li rel="tab2"><a href="${ROOT}/admin/resveMgmt">예약 정보 조회 및 변경</a></li>
					<li class="on" rel="tab3"><a href="${ROOT}/mssr/healthkeper">헬스키퍼 등록</a></li>					
					<li rel="tab4"><a href="#none">담당자 등록</a></li>
					<li rel="tab5"><a href="#none">공통코드 관리</a></li>
					<li rel="tab6"><a href="#none">No-Show 관리</a></li>
				</ul>
				<div class="sub-tit">
					<h2>헬스키퍼 현황</h2>
				</div>
				
				<div class="search_field_wrap">
					<div class="search_field_area">
						<table class="search_field">
							<tbody>
								<tr>
									<th><strong class="stit">검색조건</strong></th>
									<td>
										<select style="width:120px;" data-code-tyl="BLD" data-empty-str="사옥" id="bldCombo">
										</select>										
									</td>
									<td>
										<select style="width:120px;" id="hffcCombo">
											<option value="">재직여부</option>
											 <option value="Y">Y</option>
											<option value="N">N</option>
										</select>
									</td>									
								</tr>
							</tbody>
						</table>
					</div><!-- //searchTableArea -->
					<div class="search_btn_area">
						<button class="search_btn" id="listBtn"><i class="xi-search xi-x"></i>검색</button>
					</div><!-- //search_btn_area -->
				</div><!-- // search_field_wrap -->

				<div class="sub-tit">
					<div class="f-right">
						<button class="btn" id ="createBtn">등록</button>						
					</div>
				</div>

				<table class="tbl-style t_center tbl-hover ">
					<colgroup>
						<col style="width:10%;">						
						<col style="width:15%;">
						<col>
						<col style="width:15%;">
						<col style="width:10%;">
						<col style="width:10%;">
						<col style="width:15%;">
						<col style="width:10%;">
					</colgroup>
					<thead>
						<tr>
							<th>NO.</th>
							<th>사옥</th>
							<th>헬스키퍼 본명</th>
							<th>헬스키퍼 닉네임</th>
							<th>성별</th>
							<th>등록자</th>
							<th>등록일</th>
							<th>재직</th>
						</tr>
					</thead>
					<tbody id="healthkeperList">
					
					</tbody>
				</table>

				<div class="paging_area" id="pagingArea">
					<a href="#none" class="first"><img src="${IMG}/common/btn_first.gif"></a>
					<a href="#none" class="prev"><img src="${IMG}/common/btn_prev.gif"></a>
					<a href="#none" class="num selected">1</a>
					<a href="#none" class="num">2</a>
					<a href="#none" class="num">3</a>
					<a href="#none" class="num">4</a>
					<a href="#none" class="num">5</a>
					<a href="#none" class="num">6</a>
					<a href="#none" class="num">7</a>
					<a href="#none" class="num">8</a>
					<a href="#none" class="num">9</a>
					<a href="#none" class="num">10</a>
					<a href="#none" class="next"><img src="${IMG}/common/btn_next.gif"></a>
					<a href="#none" class="last"><img src="${IMG}/common/btn_last.gif"></a>
				</div>

				
			</div><!-- //content -->

			<footer class="footer">
				<jsp:include page="${JSP}/include/footer.jsp" />
			</footer><!-- //footer -->

		</div><!-- //wrap -->

		<!-- 레이어팝업 : S -->
		<div class="layer">
			<jsp:include page="${JSP}/include/layer.jsp" /> 
		</div><!-- //layer -->
		<!-- 레이어팝업 : E -->

	</body>
</html>