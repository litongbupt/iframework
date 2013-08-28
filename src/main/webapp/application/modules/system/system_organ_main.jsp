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
<script type="text/javascript" src="<%=templatePath%>js/system/system_organ_main.js"></script>
</head>

<body id="activity_pane">
<div class="rightSide">
	<div class="top">
    	<div class="left"></div>
        <div class="current">
        	当前位置：&gt; 机构管理
        </div>
    </div>
    <div class="content" id="main-content">
        <div class="toolBar">&nbsp;
            <input type="button" value="新增" class="new" onclick="addOrgIn();"/>
        </div>
        <!-- 表格定义 -->
		<table id="organList"></table>
		<div id="organListPager"></div>
	</div>
    <div class="bottom">
    	<div class="left"></div>
        <div class="right"><div class="center"></div></div>
    </div>
</div>	
	
<!-- 弹窗定义 -->
	<div id="organDialog">
	</div>

	<!--引入提示告警和确认  -->
<%@ include file="../common/alert_dialog.jsp" %>
<%@ include file="../common/confirm_dialog.jsp" %>
	
</body>
</html>
