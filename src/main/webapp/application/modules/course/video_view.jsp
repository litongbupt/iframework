<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/init.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<base href="<%=basePath%>" />
	<jsp:include page="../common/meta.jsp" flush="true"/>
	<jsp:include page="../common/style.jsp" flush="true"/>
	<jsp:include page="../common/script.jsp" flush="true"/>
<title>众诚天合数据恢复实训系统</title>
 	<script type="text/javascript" src="<%=basePath %>flowplayer/flowplayer-3.2.12.min.js"></script> 
</head>
<body>
<div id="video" style="position:absolute;left:50%;top:50%;">
	<!-- this A tag is where your Flowplayer will be placed. it can be anywhere -->
	<a href="/DRTS/download.action?inputPath=<%= request.getAttribute("inputPath")%>" id="player"></a>
</div>
</body>
<script type="text/javascript">
	flowplayer("player", "<%=basePath %>flowplayer/flowplayer-3.2.16.swf",{
		clip: {
			autoPlay: false,    //不自动播放
	        autoBuffering: true //自动缓冲
		}
	});
	$(function(){
		var height;
		var width;
		var clientWidth = document.documentElement.clientWidth;
		var clientHeight = document.documentElement.clientHeight;
		if(clientWidth*10<clientHeight*16){
			width = clientWidth;
			height = width/16*10;
		}else{
			height = clientHeight;
			width = height/10*16;
		}
		$("#video").css('width', width);
		$("#video").css('height', height);
		$("#video").css('margin-left', -width/2);
		$("#video").css('margin-top', -height/2);
	});
</script>
</html>
