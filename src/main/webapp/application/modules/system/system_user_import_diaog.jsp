<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	response.setCharacterEncoding("UTF-8");
	String path3 = request.getContextPath();
	String basePath3 = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path3 + "/";
%>
<div class="section">
	<form id="importUserForm" method="post" enctype="multipart/form-data">
	<div class="portlert-form-list">
		<div class="portlert-form-row">
			<label class="portlert-form-label">选择导入文件：</label>
			<div class="portlert-form-collection">
				<div class="portlert-form-file-box">
					<input type='text' name='textfield' id='import_textfield' class='portlert-form-input-field' />
					<input type='button' class='portlert-form-button-disEdit' value='浏览' />
					<input type="file" name="userExcel" class="portlert-form-file-change" id="import_userExcel" size="28"
						onchange="document.getElementById('import_textfield').value=this.value" />					
					<a href="<%=basePath3%>download.action?inputPath=/file/import_pattern/user_import.xls">下载模板</a>
					<input type="hidden" id="import_validateResult" name="validateResult" value="init"/><br>
					<span class="portlert-form-msg-alert"><br></span>
				</div>
			</div>
		</div>
		<div class="portlert-form-row">
			<div class="portlert-form-collection">
				<span class="portlert-form-warning">使用说明：</span><br>
				<span class="portlert-form-warning">1.请不要随意更改模板结构，否则系统将不能正确识别模板内容</span><br>
				<span class="portlert-form-warning">2.模板中若重复输入同一条信息，只取第一条，后面的将被忽略</span><br>
				<span class="portlert-form-warning">3.模板中若输入系统中已录入的信息，等同于修改信息</span><br> 
			</div>
		</div>
		<div class="divide"></div>
		<div class="portlert-form-row mt10">
			<span id="import_valiinfo" class="portlert-form-msg-alert"></span>
		</div>
	</div>
	</form>
</div>