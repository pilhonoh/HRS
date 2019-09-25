<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>SKT헬스케어예약시스템</title>

<c:set var="now" value="<%=new java.util.Date()%>" />

<!-- CSS -->
<link href="${LIB}/jquery-ui/jquery-ui.min.css" rel="stylesheet">
<link href="${LIB}/XEIcon/xeicon.css" rel="stylesheet">
<link href="${CSS}/animate.css?v=<fmt:formatDate value="${now}" pattern="yyyyMMddhhmmss" />" rel="stylesheet">
<link href="${CSS}/reset.css?v=<fmt:formatDate value="${now}" pattern="yyyyMMddhhmmss" />" rel="stylesheet">
<link href="${CSS}/common.css?v=<fmt:formatDate value="${now}" pattern="yyyyMMddhhmmss" />" rel="stylesheet">
<!-- SCRIPT -->
<script>
var ROOT = '${ROOT}';
var IMG = '${IMG}';
</script>
<script src="${LIB}/jquery/jquery-1.12.3.js"></script>
<script src="${LIB}/jquery-ui/jquery-ui.min.js"></script>
<script src="${LIB}/moment/moment.min.js"></script>
<script src="${JS}/cmmn/common.js"></script>