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
    
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript" src="<%=basePath%>flexpaper/flexpaper_flash.js"></script>
  </head>
  
  <body>
  	<input type="hidden" value="<%= request.getAttribute("fileName")%>" id="fileName"/>
  
   <div style="width:100%;margin:0 auto;">
   	<a id="viewerPlaceHolder" style="width:100%;display:block"></a>
   </div>
  </body>
<script type="text/javascript">
   	var fileName = $('#fileName').val();
	$(function() {
	  	var fp = new FlexPaperViewer(	
			'flexpaper/Diyflexpaper',
			'viewerPlaceHolder', { config : {
			SwfFile : escape('flexpaper/swfFiles/'+fileName),
			EncodeURI : true,
			Scale : 0.6, 
			ZoomTransition : 'easeOut',
			ZoomTime : 0.5,
			ZoomInterval : 0.2,
			FitPageOnLoad : true,
			FitWidthOnLoad : false,
			FullScreenAsMaxWindow : false,
			ProgressiveLoading : false,
			MinZoomSize : 0.2,
			MaxZoomSize : 5,
			SearchMatchAll : false,
			InitViewMode : 'Portrait',
			PrintPaperAsBitmap : false,
			ViewModeToolsVisible : true,
			ZoomToolsVisible : true,
			NavToolsVisible : true,
			CursorToolsVisible : true,
			SearchToolsVisible : true,
			localeChain: 'zh_CN'
		}});
	});
	var clientHeight = document.documentElement.clientHeight;
	$("#viewerPlaceHolder").css('height', clientHeight);
</script>
</html>
