<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>登录</title>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
</head>
<body>
<div class="error ${param.error == true ? '' : 'hide'}">
  ${sessionScope['SPRING_SECURITY_LAST_EXCEPTION'].message}
</div>
<form action="j_spring_security_check" method="POST">
<table>
	<tr>
		<td>用户:</td>
		<td><input type='text' name='username' value="${sessionScope['SPRING_SECURITY_LAST_USERNAME']}"></td>
	</tr>
	<tr>
		<td>密码:</td>
		<td><input type='password' name='password'></td>
	</tr>
	<tr>
		<td></td>
	</tr>
	<tr>
		<td><input name="reset" type="reset"></td>
		<td><input name="submit" type="submit"></td>
	</tr>
</table>
</form>
</body>
</html>
