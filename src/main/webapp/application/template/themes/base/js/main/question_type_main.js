//页面加载时初始化函数
$(function() {
	//权限验证
	if(validateRole('activity_pane','0,1')== false){
		$(".content").empty();
		return;
	}
	//主页面表格
	// 配置jqGrid组件  
    $("#questionTypeList").jqGrid({  
    		url:'/DRTS/question/questionType_questionTypeList.action',
    		mtype : "post",
    		datatype : "json",
			width:'100%',
	 	    height:'auto',
	 	    autowidth:true,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [ /*{name : "id",index : "id",label : "试题类型ID",width : 50,align:'center'},*/ 
						 {name : "name",index : "name",label : "试题类型名称",width : 50,align:'center'},
						 {name : "category",index : "category",label : "题型类别",width : 30,align:'center'},
						 {name : "optionType",index : "optionType",label : "选项类型",width : 30,align:'center'},
						 {name : "description",index : "description",label : "说明",width : 200,align:'center'}, 
						 {name:"setup",label : "配置",width:30,sortable:false,align:'center'}
						 ],
			pager : "#questionTypeListPager",
			rowNum:20,
	 	    rowList:[10,20,50],
			sortname:'name',
			sortorder : 'asc',
	 	    viewrecords: true,
	 	    gridview: true,
			prmNames : {
				page : "pageNo", // 表示请求页码的参数名称  
				rows : "rows", // 表示请求行数的参数名称  
				totalrows : "totalrows", // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal  
				search: "search",// 表示是否是搜索请求的参数名称
				sort : 'sortName',// 表示用于排序的列名的参数名称  
				order : 'sortOrder'// 表示采用的排序方式的参数名称
			}, 
			jsonReader : {
				root:"contents", 
	 	        page: "pageNo",
	 	        total: "totalPages",
	 	        records: "totalRecords",
	 	       	id:"id",
	 	        repeatitems : false
			},
			gridComplete:function(){  //在此事件中循环为每一行添加修改和删除链接	     	
				var ids=$(this).jqGrid('getDataIDs');
				for(var i=0; i<ids.length; i++){
					var id=ids[i];
					var setupstr = "<img id='" + id + "' src='/DRTS/images/user_modify.gif' title='修改' style='cursor:pointer;' onclick='modifyQuestionTypeIn(this.id);'/>&nbsp;&nbsp;";
			    	setupstr += "<img id='" + id + "' src='/DRTS/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delQuestionTypeCF(this.id);'/>";
			    	$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
				}
				var bodyObj=document.getElementById('main-content');
				if(bodyObj.scrollHeight>bodyObj.clientHeight||bodyObj.offsetHeight>bodyObj.clientHeight){
					$("#main-content .toolBar").css('width',$(this).width()-10);
				}
			}
	});
	
   	//新增试题类型
 	$( "#addQuestionTypeDialog" ).dialog({
 		autoOpen: false,
 		width: '600',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		buttons: {
 			"确定": addQuestionTypeOut,			
 			"取消": function() {
 				$( this ).dialog( "close" );
 			}
 		},
 		close:function(){
 			$( "#addQuestionTypeDialog" ).empty();
 		}
 	});
 	//修改试题类型
 	$( "#modifyQuestionTypeDialog" ).dialog({
 		autoOpen: false,
 		width: '600',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		buttons: {
 			"确定": modifyQuestionTypeOut,			
 			"取消": function() {
 				$( this ).dialog( "close" );
 			}
 		},
 		close:function(){
 			$( "#modifyQuestionTypeDialog" ).empty();
 		}
 	});
});


var selectId = "";

//新增试题类型入口函数
function addQuestionTypeIn(){
	$('#activity_pane').showLoading();
    selectId = $("#questionTypeList").jqGrid("getGridParam", "selrow");
	//加载页面
	$( "#addQuestionTypeDialog" ).load('/DRTS/question/question_type_add_dialog.jsp', function(){
		
		//注册新增表单验证
		$("#addQuestionTypeForm").validate({
			rules:{
				name:{required:true,maxlength:30,byteRangeLength:[0,30],
					remote: {   
	    				url: "/DRTS/question/questionType_validateName.action",     //后台处理程序   
	    				type: "post",               //数据发送方式
	    				dataType: "json"           //接受数据格式      
					}
				},
				category:{required:true},
				description:{maxlength:200,byteRangeLength:[0,200]}
			},
			onkeyup:false,
			errorPlacement: function(error, element) { //指定错误信息位置
	            error.appendTo(element.parent().children().filter("span"));
	       	},
	       	messages:{
	       		name:{remote:"此名称已存在"}
	       	},
	    	submitHandler:function(){ //验证通过后调用此函数
	    		//禁用按钮
	    	 	disableButton();
	    	 	$('#activity_pane').showLoading();
	    		//采用ajax提交表单
	    		$('#addQuestionTypeForm').ajaxSubmit({
					url:"/DRTS/question/questionType_addQuestionTypeOut.action",
					success:addQuestionTypeOutCB //成功增加的回调函数
				});
	    	}
		});
		//注册增加用户ajax表单
		$("#addQuestionTypeForm").ajaxForm();
		$('#activity_pane').hideLoading();
		$( "#addQuestionTypeDialog" ).dialog( "open" );
	});
}

//新增试题类型出口
function addQuestionTypeOut(){
	var category = $("input:[name=category]:radio:checked").val();
	if(category == "客观题"){
		 if ($("input:[name=optionType]:radio:checked").length == 0){
			 $("#add_optionType1").parent().children().filter("span").html("必填字段");
	            return ;
	        }else
	        	$("#add_optionType1").parent().children().filter("span").html("&nbsp;");
	}
	$("#addQuestionTypeForm").submit();
}

//新增试题类型出口回调函数
function addQuestionTypeOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var questionType = data.questionType;
	if(data.result == "success") {
		$("#addQuestionTypeDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		
		if(selectId){
			$("#questionTypeList").jqGrid("addRowData", questionType.id, questionType, "before", selectId);
		}else {
			$("#questionTypeList").jqGrid("addRowData", questionType.id, questionType, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//修改试题类型入口函数
function modifyQuestionTypeIn(id){
	$('#activity_pane').showLoading();
	selectId = $("#questionTypeList").jqGrid("getGridParam", "selrow");
	//加载试题类型信息
	$( "#modifyQuestionTypeDialog" ).load('/DRTS/question/question_type_modify_dialog.jsp', function(){
		$.post("/DRTS/question/questionType_modifyQuestionTypeIn.action",{id:id},modifyQuestionTypeInCB);
	});
}
	
//修改试题类型入口回调
function modifyQuestionTypeInCB(data){
	//为表单加载数据
	formLoadData("modifyQuestionTypeForm",data);
	if ($("input:[name=optionType]:radio:checked").length > 0){
		$("#optionTypeDiv").css('display', '');
    }
    
	//注册新增表单验证
	$("#modifyQuestionTypeForm").validate({
		rules:{
			name:{required:true,maxlength:30,byteRangeLength:[0,30],
				remote: {   
    				url: "/DRTS/question/questionType_validateId.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json",           //接受数据格式     
    				data:{num:selectId} 
				}
			},
			category:{required:true},
			description:{maxlength:200,byteRangeLength:[0,200]}
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
			error.appendTo(element.parent().children().filter("span"));
       	},
      
       	messages:{
       		name:{
       			remote:"此名称已存在"
       		}
       	},
    	submitHandler:function(){ //验证通过后调用此函数
    		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$('#modifyQuestionTypeForm').ajaxSubmit({
				url:"/DRTS/question/questionType_modifyQuestionTypeOut.action",
				success:modifyQuestionTypeOutCB //成功增加的回调函数
			});
    	}
	});
	//注册增加用户ajax表单
	$("#modifyPaperTacticForm").ajaxForm();
	$('#activity_pane').hideLoading();
	$("#modifyQuestionTypeDialog").dialog("open");
}

//修改试题类型出口
function modifyQuestionTypeOut(){
	var category = $("input:[name=category]:radio:checked").val();
	if(category == "客观题"){
		 if ($("input:[name=optionType]:radio:checked").length == 0){
			 $("#modfiy_optionType1").parent().children().filter("span").html("必填字段");
	            return ;
	        }else
	        	 $("#modfiy_optionType1").parent().children().filter("span").html("&nbsp;");
	}
	$("#modifyQuestionTypeForm").submit();
}

//修改试题类型出口回调函数
function modifyQuestionTypeOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	if(data.result == "success") {
		$("#modifyQuestionTypeDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		var questionType = data.questionType;
		if(selectId){
			$("#questionTypeList").jqGrid("setRowData", questionType.id, questionType, "before", selectId);
		}else {
			$("#questionTypeList").jqGrid("setRowData", questionType.id, questionType, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//确认删除
function delQuestionTypeCF(id) {
	confirmJQ("删除后无法恢复，确认删除？",delQuestionType,id);
}

//删除试题类型
function delQuestionType(id) {
	$('#activity_pane').showLoading();
	
	$.post("/DRTS/question/questionType_deleteQuestionType.action",{id:id},function(data){
		$('#activity_pane').hideLoading();
		
	 	if(data.result == "success") {
	 		alertJQ("操作成功，请等待页面刷新",1000);
			$("#questionTypeList").jqGrid("delRowData", id);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
}

//客观题选项激活
function categorySelect(data){
	if(data == "客观题"){
		$("#optionTypeDiv").css('display', '');
	}else if(data == "主观题"){
		$("#optionTypeDiv").css('display', 'none');
		$("input:[name=optionType]:checked").removeAttr( 'checked');
	}
}

//查询试题类型
function query(){
	var name = $("#query_name").val();
	var category = $("#query_category").val();
	var optionType = $("#query_optionType").val();
	//搜索实现方式：将搜索数据设置到postData中，由它传回后台
	var postData = {
		name:name,
		category:category,
		optionType:optionType
	};
	//合并数据,extend属性顺序不要搞反了
	postData = $.extend($("#questionTypeList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#questionTypeList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#questionTypeList").trigger("reloadGrid", [{page:1}]);
}