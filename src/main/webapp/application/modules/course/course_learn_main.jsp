<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/init.jsp"%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<jsp:include page="../common/meta.jsp" flush="true"/>
	<jsp:include page="../common/style.jsp" flush="true"/>
	<jsp:include page="../common/script.jsp" flush="true"/>
<title>众诚天合数据恢复实训系统</title>
<script type="text/javascript" src="<%=templatePath%>js/main/course_learn_main.js"></script>
</head>

<body id="activity_pane">
<div class="rightSide">
	<div class="top">
    	<div class="left"></div>
        <div class="current">
        	当前位置：&gt; 在线学习
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
           	</div>
            <!-----end 搜索+增加 ----->
        	<!-----树 ----->
            <div class="tree_t">
       			<ul id="course_tree" class="ztree"></ul>
            </div>
            <!-----end 树 ----->
        </div>
        <!----- 编辑区 ----->
        <div  class="edit" id="content_div">
			<input type="hidden" id="courseContent"/>
	        <iframe id="iframe2" src="<%=modulesPath %>course/course_view.jsp" style="width:100%;height:100%;border:0;" frameborder="0"></iframe>
		</div>
    </div>
    <!----- end 内容区 ----->
    <div class="bottom">
    	<div class="left"></div>
        <div class="right"><div class="center"></div></div>
    </div>
</div>

</body>

</html>