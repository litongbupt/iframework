<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="section">
  	 <form id="checkUserForm" method="post">
	<div class="portlert-form-list">
		<div class="portlert-form-row">
			<label class="portlert-form-label">登陆名称：</label>
			<div class="portlert-form-collection">
				<input id="loginName" name="loginName" type="text" class="portlert-form-input-field" readonly="readonly"/>
			</div>
		</div>	
		<div class="portlert-form-row">
	        <label class="portlert-form-label">用户角色：</label>
			<div class="portlert-form-collection">
				<select id="roleSelectL" multiple="multiple" name="role" size="8" style="float:left;width:185px" disabled="disabled">
				</select>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
	    </div>
		<div class="portlert-form-row">	
			<label class="portlert-form-label">所属机构：</label>
			<div class="portlert-form-collection">
				<input id="check_organ" name="organ" type="text" class="portlert-form-input-field" readonly="readonly"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>
		<div class="portlert-form-row">
			<label class="portlert-form-label">用户姓名：</label>
			<div class="portlert-form-collection">
				<input id="userName" name="userName" type="text" class="portlert-form-input-field" readonly="readonly"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">联系电话：</label>
			<div class="portlert-form-collection">
				<input id="check_phone" name="telephone" type="text" class="portlert-form-input-field" readonly="readonly"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">E_mail：</label>
			<div class="portlert-form-collection">
				<input id="check_e_mail" name="email" type="text" class="portlert-form-input-field" readonly="readonly"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">场站：</label>
			<div class="portlert-form-collection">
				<input id="check_station" name="station" type="text" class="portlert-form-input-field" readonly="readonly"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">用户状态：</label>
			<div class="portlert-form-collection">
				<input id="check_status" name="status" type="text" class="portlert-form-input-field" readonly="readonly"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">生日：</label>
			<div class="portlert-form-collection">
				<input id="check_birthday" name="birthday" type="text" class="portlert-form-input-field" readonly="readonly"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">录用日期：</label>
			<div class="portlert-form-collection">
				<input id="check_hireday" name="hireday" type="text" class="portlert-form-input-field " readonly="readonly"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
	</div>
	</form>
</div>	