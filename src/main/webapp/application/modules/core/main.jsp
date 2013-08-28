<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/init.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<base href="<%=basePath%>" />
	<title>Free HTML5 Bootstrap Admin Template</title>
	<jsp:include page="../common/meta.jsp" flush="true"/>
	<jsp:include page="../common/style.jsp" flush="true"/>
	<jsp:include page="../common/script.jsp" flush="true"/>
</head>
<body  class="mainBody">
	<iframe src="<%=modulesPath %>core/header.jsp" frameborder="0" id="header"></iframe>
	<iframe src="<%=modulesPath %>core/leftmenu.jsp?role=${sessionScope.user.role}" frameborder="0" class="leftMenu"></iframe>
	<div class="frameToggle"></div>
	<div  class="rightContent" id="rightContent">
		<iframe src="<%=modulesPath %>core/indexContent.jsp" frameborder="0" style="height:100%; width:100%;" id="rightFrame"></iframe>
	</div>
	<div id="courseViewDialog" title="浏览课件">
		<iframe id="iframe1" src="<%=modulesPath %>course/course_view.jsp" style="width:100%; border:0;" frameborder="0"></iframe>
	</div>
</body>
<script type="text/javascript">
$(function(){
/* 	if(global_userId==""||global_userId==undefined)
		location.href = '/DRTS/system/system_login.jsp'; */
	$( "#courseViewDialog" ).dialog({
 		autoOpen: false,
 		width: '95%',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		close:function(){
 			var url=getIFrameDOM("iframe1").location.href;
			if(url.substring(url.lastIndexOf("/")) !='/course_view.jsp'){
				window.document.getElementById("iframe1").src = "/DRTS/course/course_view.jsp";
			}
			else{
				$("#iframe1").contents().find("#content_body").empty();
			}
 		}
 	});
});

//预览
function viewCourse(content){
	$("#iframe1").contents().find("#content_body").removeClass("welcome");
	$("#iframe1").contents().find("#content_body").append(content);
	var clientHeight = document.documentElement.clientHeight-100;
	$("#iframe1").css('height', clientHeight);
	$("#courseViewDialog").dialog( "open" );
}

function getIFrameDOM(id){
	return document.getElementById(id).contentDocument || frames[id].document;
}
</script>
</html>
