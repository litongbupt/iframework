<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/init.jsp"%>

<html>
<head>
	<title>J2EE基础框架</title>
	<jsp:include page="../common/meta.jsp" flush="true"/>
	<jsp:include page="../common/style.jsp" flush="true"/>
</head>
<body class="login_bodyBg">
<div class="login_bg">
	<form id="loginForm" method="post" action="">
    <table class="login">
      <tr>
        <td class="t_r">用&nbsp;户&nbsp;名</td>
        <td class="t_c"><input type="text" class="input" size="8"  id="username" name="username"/></td>
        <td class="t_l"><span class="tip"></span></td>
      </tr>
      <tr>
        <td class="t_r">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</td>
        <td class="t_c"><input type="password" class="input" size="8" id="password" name="password"/></td>
        <td class="t_l"><span class="tip"></span></td>
      </tr>
      <tr>
        <td class="t_r">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份</td>
        <td class="t_c"><select id="identity_role" name="identity_role" class="portlert-form-label">
							<option value="">--请选择--</option>
							<option value="2">学生</option>
							<option value="1">教师</option>
							<option value="0">管理员</option>
						</select></td>
        <td class="t_l"><span class="tip"></span></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><input type="submit" id="chargeSearch" value="登 录" class="login_btn_1"/>
        	<input type="reset" id="reset" value="重 置" class="login_btn_2"/>
       	</td>
        <td>&nbsp;</td>
      </tr>
    </table>
    </form>
    <div id="login-main-inform">
		<br />
		<p>
			<img src="<%=templatePath %>images/inform.png" />
			请输入您的用户名和密码进行登录，如果您还没有账号，请联系系统管理员！
		</p>
	</div>
    <div class="company">北京众诚天合系统集成科技有限公司</div>
</div>
	<jsp:include page="../common/script.jsp" flush="true"/>
<script type="text/javascript">
$(function() {
	//注册表单验证
	$("#loginForm").validate({
		rules : {
			username : {required:true,maxlength:30,byteRangeLength:[0,50]},
			password : {required:true,maxlength:50},
			identity_role : {required:true}
		},
		errorPlacement : function(error, element) { //指定错误信息位置
			error.appendTo(element.parent().next().children().filter("span"));
		}
	});
	var options = {
   		 success: function(data){
			if(data.result == "success") {
				window.location.href = 'main.jsp';
			}else{
				$("#loginForm").find("span").each(function(){
					$(this).html("&nbsp;");
				});
				$("#"+data.result).parent().next().children().filter("span").html(data.resultInfo);
			}
   		 }
   	};
   	// 将options传给ajaxForm
	$('#loginForm').ajaxForm(options);
});
</script>
</body>
</html>