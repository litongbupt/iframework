<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="clear"></div>
<div>
	<form id="modifyCourseWareForm" method="post">
	<div class="portlert-form-list">
		<div class="portlert-form-row">
			<label class="portlert-form-label"><em>*</em><span class="courseType"></span>编号：</label>
			<div class="portlert-form-collection">
				<input type="text" class="portlert-form-input-field" id="modify_num" name="num"  readOnly="readOnly" onfocus="this.blur()"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
			<label class="portlert-form-label"><em>*</em><span class="courseType"></span>名称：</label>
			<div class="portlert-form-collection">
				<input type="text" class="portlert-form-input-field" id="modify_name" name="name"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
				<input type="button" class=" portlert-form-button-disEdit" value="预览" onclick="javascirpt:preview('modify_content')"/>
			</div>
		</div>
		<div class="portlert-form-row">
			<label class="portlert-form-label"><span class="courseType"></span>内容：</label>
			<div class="portlert-form-collection">
				<textarea id="modify_content" name="content"></textarea>
			</div>
		</div>
		<div class="portlert-form-row mt10">
			<label class="portlert-form-label">&nbsp;</label>
			<div class="portlert-form-collection">
				<input type="submit" class="portlert-form-button-disEdit toLeft19" value="保存"/>
				<input type="button" class="portlert-form-button-disEdit toLeft19" value="取消" onclick="javascript:cancel()"/>
			</div>
		</div>
	</div>
	</form>
</div>
