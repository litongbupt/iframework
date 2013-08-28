<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="section">
  	 <form id="modifyUserForm" method="post">
	<div class="portlert-form-list">
		<div class="portlert-form-row">
			<label class="portlert-form-label">登陆名称：</label>
			<div class="portlert-form-collection">
				<input id="loginName" name="loginName" type="text" class="portlert-form-input-field" readonly="readonly"/><label class="portlert-form-label"><em>*</em>登录名不可修改</label>
			</div>
		</div>	
		<div class="portlert-form-row">
	        <label class="portlert-form-label"><em>*</em>用户角色配置：</label>
			<div class="portlert-form-collection">
				<select id="roleSelectL" multiple="multiple" name="role" size="8" style="float:left;width:185px">
				</select>
				<div class="select_opt">
					<p id="toright" title="添加">&gt;</p>
					<br />
					<p id="toleft" title="移除">&lt;</p>
					<input type="hidden" id="edit_userRoles" name="userRoles">
					<span class="portlert-form-msg-alert">&nbsp;</span>
				</div>
				<select id="roleSelectR" multiple="multiple" name="roleSelectR" size="8" style="float:left;width:185px">
				</select>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
	    </div>
		<div class="portlert-form-row">	
			<label class="portlert-form-label"><em>*</em>所属机构：</label>
			<div class="portlert-form-collection">
				<select id="modify_organ" name="organ" class="portlert-form-select">	
					<option value="">--请选择--</option>
				</select>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>
		<div class="portlert-form-row">
			<label class="portlert-form-label">用户姓名：</label>
			<div class="portlert-form-collection">
				<input id="userName" name="userName" type="text" class="portlert-form-input-field" />
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">联系电话：</label>
			<div class="portlert-form-collection">
				<input id="modify_phone" name="telephone" type="text" class="portlert-form-input-field" />
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">E_mail：</label>
			<div class="portlert-form-collection">
				<input id="modify_e_mail" name="email" type="text" class="portlert-form-input-field" />
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">场站：</label>
			<div class="portlert-form-collection">
				<input id="modify_station" name="station" type="text" class="portlert-form-input-field" />
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">生日：</label>
			<div class="portlert-form-collection">
				<input id="modify_birthday" name="birthday" type="text" class="portlert-form-input-field time"  style="text-align: left"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
		<div class="portlert-form-row">
			<label class="portlert-form-label">录用日期：</label>
			<div class="portlert-form-collection">
				<input id="modify_hireday" name="hireday" type="text" class="portlert-form-input-field time"  style="text-align: left"/>
				<span class="portlert-form-msg-alert">&nbsp;</span>
			</div>
		</div>	
	</div>
	</form>
</div>	
<script>
	$(function(){	
			  	$( ".time" ).datepicker({
		  		showSecond: true,
		  		dateFormat: 'yy-mm-dd',
		  		timeFormat:	'HH:mm:ss',
				dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
				dayNamesMin:['日', '一', '二', '三', '四', '五', '六'],
				firstDay: 1,
				monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				showButtonPanel: true,
				timeText:'时间',
				hourText:'时',
				minuteText:'分',
				secondText:'秒',
				currentText: '当前时间',
				closeText: '关闭',
				changeMonth: true,
				changeYear: true,
				beforeShow: function (input, inst) {  
	       			    inst.dpDiv.css({fontSize:12+ 'px'});
	           } 
	           /* ,
				beforeShow: function (input, inst) {  
	       			    inst.dpDiv.css({marginTop: -input.offsetHeight*8 + 'px', marginLeft: -input.offsetWidth*2 + 'px'});
	           } */
			}
	  	);
	});
</script>

