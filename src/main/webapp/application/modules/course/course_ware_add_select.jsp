<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="portlert-form-list" id="addcourse_nodeType">
	<div class="portlert-form-row">
		<label class="portlert-form-label">选择类型：</label>
		<div class="portlert-form-collection" >
			<label class="portlert-form-label-rc"><input type="radio" id="nodeType_SECTION" name="nodeType" value="SECTION" onclick="javascript:addCourseSelect(this.value)" />小节</label>
			<label class="portlert-form-label-rc"><input type="radio" id="nodeType_WARE" name="nodeType" value="WARE" onclick="javascript:addCourseSelect(this.value)"/>课件</label>
		</div>
	</div>
</div>