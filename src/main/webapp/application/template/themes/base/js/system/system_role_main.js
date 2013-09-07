$(function(){
	//权限验证
	//if(validateRole('activity_pane','0')== false){
	//	$(".content").empty();
	//	return;
	//}
	//主页面表格
	$("#userList").jqGrid({
	    url:golbal_context+"/system/role/list.do",
	    datatype: "json",
	    mtype: "GET",
	    width:"100%",
	    height:"auto",
	    autowidth:true,
	    //multiselect:false, //是否在首列加入复选框
	    //multiselectWidth:30, //复选框的宽度
	    colModel : [   
			{name:"roleId",index:"role_id",label : "角色ID",width:30,align:"center", key:true},
	      	{name:"name",index:"name",label : "角色名",width:30,sortable:true,align:"center"},	      	
//	        {name:"userName",index:"uesr_name",label : "姓&nbsp;名",width:30,sortable:true,align:"center"},
//	        {name:"roleNames",index:"roleNames",label : "角&nbsp;色",width:30,sortable:false,align:"center"},
//	        {name:"departmentName",index:"departmentName",label : "所属机构",width:30,sortable:false,align:"center" },
	        {name:"setup",label : "配&nbsp;置",width:30,sortable:false,align:"center" }
		 ],
	    pager: "#userListPager",	    
	    sortname: "role_id",
	    sortorder: "asc",
	    //rowNum:-1,
	    rowNum:20,
	    rowList:[10,20,50],
	    viewrecords: true,
	    gridview: true,
	    pgbuttons:true,
	    pginput:true,
	    prmNames : {  
		    page:"pageNo",     //表示请求页码的参数名称  
		    rows:"rows",     //表示请求行数的参数名称  
		    totalrows:"totalrows", // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal  
			search:"search",// 表示是否是搜索请求的参数名称
			sort:"sortName",// 表示用于排序的列名的参数名称  
		    order:"sortOrder"// 表示采用的排序方式的参数名称
		},
		jsonReader: {  
	        root:"contents", 
	        page: "pageNo",
	        total: "totalPages",
	        records: "totalRecords",
	        id:"pageNo",
	        repeatitems : false 
	    },
	    gridComplete:function(){  //在此事件中循环为每一行添加详细信息	     	
	    	var ids=$(this).jqGrid('getDataIDs'); 
			for(var i=0; i<ids.length; i++){
				var id=ids[i];     
				var setupstr = "<img id='" + id + "' src='"+golbal_context+"/application/template/themes/base/images/user_modify.gif' title='修改' style='cursor:pointer;' onclick='modifyUserIn(this.id);'/>&nbsp;&nbsp;";
				setupstr += "<img id='" + id + "' src='"+golbal_context+"/application/template/themes/base/images/user_check.gif' title='查看' style='cursor:pointer;' onclick='checkUser(this.id);'/>&nbsp;&nbsp;";
				setupstr += "<img id='" + id + "' src='"+golbal_context+"/application/template/themes/base/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delUserCF(this.id);'/>&nbsp;&nbsp;";
				setupstr += "<img id='" + id + "' src='"+golbal_context+"/application/template/themes/base/images/reset.gif' title='恢复密码' style='cursor:pointer;' onclick='recoverUserPassIn(this.id);'/>";
				$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
			}
			var bodyObj=document.getElementById('main-content');
			if(bodyObj.scrollHeight>bodyObj.clientHeight||bodyObj.offsetHeight>bodyObj.clientHeight){
				$("#main-content .toolBar").css('width',$(this).width()-10);
			}
        }              
  	});
  	//查询下拉列表初始化
  	$.post(golbal_context+"/system/role/info.do", function(data){
  		domsLoadData("query_form", data);
  	});
  	//功能配置信息对话框
  	$( "#userDialog" ).dialog({
  		title:'增加用户',
		autoOpen: false,
		width: 'auto',
		//height:550,
		modal: true,
		resizable:true,
		show: 'fade',
		hide: 'fade',
 		close:function(){
 			$( this ).empty();
 		}
	});		
  	
	//导入弹窗
	$( "#importDialog" ).dialog({
		autoOpen: false,
		width: '500',
		height:'400',
		modal: true,
		resizable:true,
		show: 'fade',
		hide: 'fade',
		buttons: {
			"校验": validateExcel,
			"确定": importExcel,
			"取消": function() {
				$( this ).dialog( "close" );
			}
		},
		close:function(){
			$( "#importDialog" ).empty();
		}
	});
	
	initConfirmDialog("confirmDialog");
	
});	

//保存当前选择的行Id
var selectId = "";

//增加用户入口函数
function addUserIn() {
	$('#activity_pane').showLoading();
	$("#userDialog").dialog('option', 'title', '新增用户');
	$("#userDialog").dialog('option', 'buttons', {
		"确定" : addUserOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	selectId = $("#userList").jqGrid("getGridParam", "selrow");
	//加载基本信息页面
	$("#userDialog").load(golbal_jsp_position+'/system/system_user_add_dialog.jsp',function(){
		$.post(golbal_context+"/system/user/info.do", addUserInCB);
		//多选框初始化
		initMultiSelect();
	});
}

//新增用户入口回调
function addUserInCB(data) {
	//为表单填充数据
	domsLoadData("addUserForm", data);
	//增加表单验证
	$("#addUserForm").validate({
		rules : {
			loginName:{required:true,maxlength:20,byteRangeLength:[0,20],stringEN:true,
				remote : {
					url : golbal_context+"/system/user/validateLoginName.do", //后台处理程序   
					type : "post", //数据发送方式
					dataType : "json" //接受数据格式   
				}
			},
			//name:{required:true,maxlength:30,byteRangeLength:[0,30],stringCheck:true},
			//password : {required : true,maxlength : 30,byteRangeLength : [ 6, 50 ],stringEN : true},
			roleSelectR:{required:true},
			organ:{required:true},
			telephone:{isPhone:true},
			email:{email:true,maxlength:200,byteRangeLength:[0,200]}
		},
		onkeyup : false,
		onclick : false,
		errorPlacement : function(error, element) { //指定错误信息位置
			error.appendTo(element.parent().children().filter("span"));
		},
		messages : {
			loginName:{remote:"此用户名称已存在"}
		},
		submitHandler : function() { //验证通过后调用此函数
			addUser();
		}
	});

	//注册增加ajax表单
	$("#addUserForm").ajaxForm();
	$('#activity_pane').hideLoading();
	$("#userDialog").dialog("open");
}

//新增用户出口
function addUserOut() {
	$("#roleSelectR").find("option").each(function(){
		$(this).attr("SELECTED","SELECTED");
	});
	$(":input").val().trim();
	$("#addUserForm").submit();
}
//新增用户
function addUser(){
	//禁用按钮
	disableButton();
	$('#activity_pane').showLoading();
	$("#addUserForm").ajaxSubmit({
		url : golbal_context+"/system/user/addUserOut.do",
		success : addUserOutCB
	});
}
//新增用户出口回调
function addUserOutCB(data) {
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	if (data== true) {
		$("#userDialog").dialog("close");
		alertJQ("操作成功，请等待页面刷新！", 1000);
		$("#userList").trigger("reloadGrid");
	} else if (data == false) {
		alertJQ("对不起，操作失败，服务器出现问题！");
	}
}

//ƒ用户入口函数
function modifyUserIn(userId) {
	$('#activity_pane').showLoading();
	$("#userDialog").dialog('option', 'title', '修改用户');
	$("#userDialog").dialog('option', 'buttons', {
		"保存" : modifyUserOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	//$("#organDialog").dialog('option', 'width', '800');
	//selectId = userId;
	//加载基本信息页面
	$("#userDialog").load(golbal_jsp_position+'/system/system_user_modify_dialog.jsp',function() {
		$.post(golbal_context+"/system/user/info.do", function(data){
			domsLoadData("modifyUserForm", data);
		});
		$.post(golbal_context+"/system/user/modifyUserIn.do", {userId : userId}, modifyUserInCB);
		//多选框初始化
		initMultiSelect();
	});
}

//修改用户入口回调
function modifyUserInCB(data) {
	//为表单加载数据
	selectedRoles("modifyUserForm", data);
	//修改表单验证
	$("#modifyUserForm").validate({
		rules : {
			roleSelectR:{required:true},
			organ:{required:true},
			telephone:{isPhone:true},
			email:{email:true,maxlength:200,byteRangeLength:[0,200]}
		},
		onkeyup : false,
		onclick : false,
		errorPlacement : function(error, element) { //指定错误信息位置
			error.appendTo(element.parent().children().filter("span"));
		},
		messages : {
			
		},
		submitHandler : function() { //验证通过后调用此函数
			//禁用按钮
			disableButton();
			$('#activity_pane').showLoading();

			$("#modifyUserForm").ajaxSubmit({
				url : golbal_context+"/system/user/modifyUserOut.do",
				success : modifyUserOutCB
			});
		}
	});
	//注册增加用户ajax表单
	$("#modifyUserForm").ajaxForm();
	$('#activity_pane').hideLoading();
	$("#userDialog").dialog("open");
}

//修改用户出口
function modifyUserOut() {
	$("#roleSelectR").find("option").each(function(){
		$(this).attr("SELECTED","SELECTED");
	});
	$(":input").val().trim();
	$("#modifyUserForm").submit();
}

//修改用户出口回调函数
function modifyUserOutCB(data) {
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	$("#userList").trigger("reloadGrid");
	if (data == true) {
		$("#userDialog").dialog("close");
		alertJQ("操作成功，请等待页面刷新！", 1000);

	} else if (data==false) {
		alertJQ("系统内部错误，请谅解！将尽快修复");
	}
}

//查看用户函数
function checkUser(userId) {
	$('#activity_pane').showLoading();
	$("#userDialog").dialog('option', 'title', '查看用户');
	$("#userDialog").dialog('option', 'buttons', {
		"返回" :  function() {
			$(this).dialog("close");
		}
	});
	selectId = userId;
	//加载基本信息页面
	$("#userDialog").load(golbal_jsp_position+'/system/system_user_check_dialog.jsp',function() {
//		$.post(golbal_context+"/system/user/info.do", function(data){
//			domsLoadData("checkUserForm", data);
//		});
		$.post(golbal_context+"/system/user/checkUser.do", {userId : userId}, function(data){
			//为表单加载数据
			selectedRoles("checkUserForm", data);
			$('#activity_pane').hideLoading();
			$("#userDialog").dialog("open");
		});
	});
}

//确认删除
function delUserCF(userId) {
	confirmJQ("确认删除此用户吗？", delUser, userId);
}

//删除试卷生成策略
function delUser(userId) {
	$('#activity_pane').showLoading();
	$.post(golbal_context+"/system/user/deleteUser.do", {userId : userId}, function(data) {
		$('#activity_pane').hideLoading();
		if (data == true) {
			alertJQ("操作成功，请等待页面刷新", 1000);
			$("#userList").jqGrid("delRowData", userId);
		} else if (data == false) {
			alertJQ("系统内部错误，请谅解！将尽快修复");
		}
	});
}

//重置用户密码入口
function recoverUserPassIn(userId) {
	confirmJQ("是否要恢复该用户的初始密码？", recoverUserPass, userId);
}

//重置用户密码策略
function recoverUserPass(userId) {
	$('#activity_pane').showLoading();

	$.post(golbal_context+"/system/user/recoverUserPass.do", {userId : userId}, function(data) {
		$('#activity_pane').hideLoading();
		if (data == true) {
			alertJQ("恢复成功，初始密码为“88888888”", 1000);
		} else if (data == false) {
			alertJQ("系统内部错误，请谅解！将尽快修复");
		}
	});
}	

//批量导入入口
function importUser(){
	//加载页面
 	$( "#importDialog" ).load(golbal_jsp_position+'/system/system_user_import_diaog.jsp', function(data){
		//表单验证注册
		$("#importUserForm").validate({
			rules:{
				userExcel:{required:true,excelValidate:true}
			},
			onkeyup:false,
			errorPlacement: function(error, element) { //指定错误信息位置
			element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
			},
	    	submitHandler:function(){ //验证通过后调用此函数
	    		disableButton();
	    		$('#activity_pane').showLoading();
	    		//采用ajax提交表单
	    		$('#importUserForm').ajaxSubmit({
	    			url : golbal_context+"/system/user/validateExcel.do",
					dataType: 'json',//返回值类型 一般设置为json
					success:validateExcelCB //成功增加的回调函数
				});
	    	}
		});
		
		$("#importUserForm").ajaxForm();
 	});
	
	$("#importDialog").dialog("open");
}

//校验
function validateExcel(){
	$("#import_valiinfo").html("&nbsp;");
	$("#importUserForm").submit();
}

//校验回调
function validateExcelCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	if(data.result == "success") {
		$("#import_validateResult").val("success");
		$("#import_valiinfo").html("校验成功，可以开始导入文件了");
	}else if(data.result == "failure") {
		$("#import_validateResult").val("failure");
		$("#import_valiinfo").html(data.resultInfo);
		
	}
}

//导入
function importExcel(){
	var validateResult = $("#import_validateResult").val();
	if(validateResult == "init" || validateResult == "failure"){
		alertJQ("请先校验文件，校验通过后才能导入!","","350");
	}else if(validateResult == "success"){
		//禁用按钮
		disableButton();
		$('#activity_pane').showLoading();
		$.post("/DRTS/system/user_importExcel.action", function(data){
			//启用按钮
			enableButton();
			$('#activity_pane').hideLoading();
			if(data.result == "success") {
				$("#importDialog").dialog("close");
				$("#userList").trigger("reloadGrid");
				alertJQ(data.resultInfo,2500);
			}else if(data.result == "failure") {
				alertJQ(data.resultInfo);
			}
		});
	}
}

//查询
function query() {

	var postData = {
		userId : $("#query_user_ID").val().trim(),
		num : $("#query_num").val().trim(),
		name : $("#query_name").val().trim(),
		role : $("#query_role").val().trim(),
		organ : $("#query_organ").val().trim()
	};
	//合并数据 	
	postData = $.extend($("#userList").getGridParam("postData"), postData);
	//将合并后的数据设置到表格属性中，记得加search:true 
	$("#userList").setGridParam({
		search : true,
		postData : postData
	});
	$("#userList").trigger("reloadGrid", [ {
		page : 1
	} ]);

}

function domsLoadData(formId , data){
  		var id;
  		var name = "name";
  		for(var obj in data){
  			if($("#"+formId+" [name="+obj+"]") && $("#"+formId+" [name="+obj+"]").length>0){
  				var selectObj = $("#"+formId+" [name="+obj+"]");
  				if(obj=="organ") id="departmentId";//具体问题要变化，按照返回的json对象进行判断
  				else if(obj=="role") id ="roleId";
  				//填充下拉框
  				if(selectObj.get(0).tagName=="SELECT")
  				    for(var i=0;i<data[obj].length; i++){
  				    	if(data[obj][i][id]!=null&&data[obj][i][id]!=""){
  				    		if(data[obj][i]["selected"]==true)
  								selectObj.get(0).add(new Option(data[obj][i][name], data[obj][i][id], false, true));
  							else 
  								selectObj.get(0).add(new Option(data[obj][i][name], data[obj][i][id]));
  				    	}else{
  				    		if(data[obj][i]["selected"]==true)
  								selectObj.get(0).add(new Option(data[obj][i][name],"", false, true));
  							else 
  								selectObj.get(0).add(new Option(data[obj][i][name],""));
  				    	}
  				    }
  				else if(selectObj.get(0).tagName=="INPUT")
  					//填充文本框
  					if(selectObj.attr("type")!="file")//忽略上传控件
  						selectObj.val(data[obj]);
  				}
  			}
}

//决定角色方位
function selectedRoles(formId , data){
	for(var obj in data){
		if(obj=="roleSelectR"&&data[obj]!=null){
			var strs = data[obj].split(",");
			$("#roleSelectL").val(strs).attr("selected",true).dblclick();
		}
		else if(data[obj]!=null) $("#"+formId+" [name="+obj+"]").val(data[obj]);	
	}
}
//初始化多选框
function initMultiSelect(){

	var leftSel = $("#roleSelectL");
	var rightSel = $("#roleSelectR");
	$("#toright").bind("click",function(){		
		leftSel.find("option:selected").each(function(){
			$(this).remove().appendTo(rightSel);
		});
	});
	$("#toleft").bind("click",function(){		
		rightSel.find("option:selected").each(function(){
			$(this).remove().appendTo(leftSel);
		});
	});
	leftSel.dblclick(function(){
		$(this).find("option:selected").each(function(){
			$(this).remove().appendTo(rightSel);
		});
	});
	rightSel.dblclick(function(){
		$(this).find("option:selected").each(function(){
			$(this).remove().appendTo(leftSel);
		});
	});
	
	$("#add_organ").bind("focus",function(){	
		rightSel.find("option").each(function(){
			$(this).attr("SELECTED","SELECTED");
		});
		rightSel.blur();
	});
	$("#modify_organ").bind("focus",function(){	
		rightSel.find("option").each(function(){
			$(this).attr("SELECTED","SELECTED");
		});
		rightSel.blur();
	});
 }
