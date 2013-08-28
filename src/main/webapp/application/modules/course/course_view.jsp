<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ include file="../common/init.jsp"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<base href="<%=basePath%>" />
	<jsp:include page="../common/meta.jsp" flush="true"/>
	<jsp:include page="../common/style.jsp" flush="true"/>
	<jsp:include page="../common/script.jsp" flush="true"/> 
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css" media="screen">   
body {-moz-user-select: none;-webkit-user-select: none;}   
</style>
  </head>
  <body id="content_body" class="welcome">
  </body>
<script type="text/javascript">
//初始页面加载
$(function() {
	$("#content_body").empty();
	var content = parent.window.document.getElementById("courseContent");
	if(content != null && content != undefined){
		if(content.value != null && content.value != ""){
			$("#content_body").html(content.value);
			$("#content_body").removeClass("welcome");
		}
	}
	$(document).delegate('a', 'click', function() { $('#content_body').showLoading(); });
	//禁用右键、文本选择功能、复制按键 
	$(document).bind("contextmenu",function(){return false;});   
	$(document).bind("selectstart",function(){return false;});   
	$(document).keydown(function(){return key(arguments[0]);}); 
});
</script>
</html>
