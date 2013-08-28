<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="section">
	<form id="modifyOrganForm"  method="post">
	<div class="portlert-form-list">
		<div class="portlert-form-row">
			<label class="portlert-form-label"><em>*</em>机构编号：</label>
			<div class="portlert-form-collection">
				<input id="modify_num" name="num" type="text" class="portlert-form-input-field" readOnly="readOnly" onfocus="this.blur()"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label"><em>*</em>机构名称：</label>
			<div class="portlert-form-collection">
				<input id="modify_name" name="name" type="text" class="portlert-form-input-field" />
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
		<label class="portlert-form-label">机构描述：</label>
			<div class="portlert-form-collection">
				<textarea  id="modify_description" name="description" class="portlert-form-textarea" rows="3" cols=""></textarea>	
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>
	</div>
	</form>
</div>	


