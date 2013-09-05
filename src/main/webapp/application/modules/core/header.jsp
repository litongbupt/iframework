<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/init.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<jsp:include page="../common/meta.jsp" flush="true" />
<jsp:include page="../common/style.jsp" flush="true" />
<title>J2EE基础框架</title>
</head>
<body class="mainBody">
	<div class="header">
		<div class="logo">
			<div class="user">${sessionScope.user.name}，欢迎您！</div>
			<div class="pull-right">
				<!--  
            <div class="tool">
                <a href="#" class="help" title="帮助"></a>
                <a  href="javascript:void(0)"  onclick="Menu('system/system_change_password.jsp');" class="set" title="修改密码"></a>
                <a href="/DRTS/system/login_logout.action" target="_parent" class="exit" title="注销"></a>
            </div>
            <div class="time">${sessionScope.nowDate}</div>
            -->
			</div>
		</div>
	</div>
	<jsp:include page="../common/script.jsp" flush="true" />
</body>
</html>
