<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>   
    <title>My JSP 'index.jsp' starting page</title>
  </head>
  <body>
    这是首页，欢迎<sec:authentication property="name"/>!<br>
    <a href="admin.jsp">进入admin页面</a>
    <a href="other.jsp">进入其它页面</a>
    <a href="logout.jsp">退出</a>
  </body>
</html>
