<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>    
    <title>访问拒绝</title>
  </head> 
  <body>
    您的访问被拒绝，无权访问该资源！ <br>
    ${requestScope['SPRING_SECURITY_403_EXCEPTION'].message}
  </body>
</html>
