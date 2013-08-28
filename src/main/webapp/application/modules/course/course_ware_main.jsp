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

<script type="text/javascript" src="<%=basePath%>ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=basePath%>ckeditor/adapters/jquery.js"></script> 
<script type="text/javascript" src="<%=basePath%>ckfinder/ckfinder.js"></script>
<script type="text/javascript" src="<%=templatePath%>js/main/course_ware_main.js"></script>

<style type="text/css">

.ztree li span.button.add {margin-left:2px; margin-right: -1px; background-position:-144px 0; vertical-align:top; *vertical-align:middle}
.ztree li span.button.modify {margin-left:2px; margin-right: -1px; background-position:-112px -48px; vertical-align:top; *vertical-align:middle}
.ztree li span.button.delete {margin-left:0px; margin-right: -1px; background-position:-110px -64px; vertical-align:top; *vertical-align:middle}
</style>

</head>

<body id="activity_pane">
<div class="rightSide">
	<div class="top">
    	<div class="left"></div>
        <div class="current">
        	当前位置：&gt; 课件管理
        	<a id="viewLink" href="javascript:fullScreen();" style="color:#333;position:absolute;top:15px;right:40px;display:none;">全屏浏览课件</a>
        </div>
    </div>
    <!----- 内容区 ----->
    <div class="content" id="main-content">
      <!----- 目录树区 ----->
		<div class="tree">
        	<!-----搜索+增加 ----->
            <div class="searchWrap">
            	<div class="search_l"></div>
            	<input type="text" class="search_input" id="query_name" name="name" size="8" />
            	<div class="search_r"></div>
            	<input type="button" value="" class="search_btn" onclick="query()"/>
            	<a class="arr_l" onclick="queryPre()"></a>
            	<a class="arr_r" onclick="queryNext()"></a>
            	<a class="add" onclick="addCourseIn();"></a>
           	</div>
            <!-----end 搜索+增加 ----->
        	<!-----树 ----->
            <div class="tree_t">
       			<ul id="course_tree" class="ztree"></ul>
            </div>
            <!-----end 树 ----->
        </div>
        <!----- 编辑区 ----->
        <div class="edit" id="content_body">
        	<div class="welcome"></div>
        </div>
    </div>
    <!----- end 内容区 ----->
    <div class="bottom">
    	<div class="left"></div>
        <div class="right"><div class="center"></div></div>
    </div>
</div>

<!-- 弹窗定义 -->
<div id="addSelectDialog" title="选择新增类型">
</div>
<%@ include file="../common/alert_dialog.jsp" %>
<%@ include file="../common/confirm_dialog.jsp" %>
</body>

</html>