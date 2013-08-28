//页面加载时初始化函数
$(function() {
	//权限验证
	if(validateRole('activity_pane','2')== false){
		$(".content").empty();
		return;
	}
	//主页面表格
	// 配置jqGrid组件  
    $("#problemList").jqGrid({  
    		url:'/DRTS/problem/problem_problemList.action',
    		mtype : "post",
    		datatype : "json",
			width:'100%',
	 	    height:'auto',
	 	    autowidth:true,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [ {name : "title",index : "title",label : "问题标题",width : 200,align:'center'},
			            {name : "course",index : "course",label : "所属课程",width : 50,align:'center'},
			            {name : "createPerson",index : "createPerson",label : "提问人",width : 30,hidden:true},
						{name : "createPersonName",index : "createPersonName",label : "提问人",width : 30,align:'center'},
						{name : "createTime",index : "createTime",label : "提问时间",width : 50,align:'center'},
						{name : "status",index : "status",label : "状态",width : 20,align:'center'},
						{name : "setup",index : "id",label : "操作",width : 20,align:'center;'}
						 ],
			pager : "#problemListPager",
			rowNum:20,
	 	    rowList:[10,20,50],
			sortname:'createTime',
			sortorder : 'desc',
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
					var title =  $(this).getCell( id,'title');
					var link="<a href='javascript:checkProblem(\""+id+"\")' class='nojump' title='查看问题详细信息'>"+ title+"</a>";
		    		var status = $(this).getCell( id,'status');
		    		var createPerson = $(this).getCell( id,'createPerson');
		    		var setupstr = "";
		    		if(status =="待回答"&& global_userId == createPerson){
		    			setupstr = "<img id='" + id + "' src='/DRTS/images/user_modify.gif' title='修改' style='cursor:pointer;' onclick='modifyProblemIn(this.id);'/>&nbsp;&nbsp;";
			    		setupstr += "<img id='" + id + "' src='/DRTS/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delProblemCF(this.id);'/>";
			    		$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
		    		}
		    		$(this).jqGrid("setRowData",id,{'title':link});
				}
				var bodyObj=document.getElementById('main-content');
				if(bodyObj.scrollHeight>bodyObj.clientHeight||bodyObj.offsetHeight>bodyObj.clientHeight){
					$("#main-content .toolBar").css('width',$(this).width()-10);
				}
			}
	});
    $.post("/DRTS/problem/problem_addProblemIn.action",function(data){
    	//为表单加载数据
    	formLoadData("query_form",data);
    });
   	//新增在线提问弹窗
 	$( "#problemDialog" ).dialog({
 		autoOpen: false,
 		width: '800',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		close:function(){
 			$( this ).empty();
 		}
 	});
});

var selectId = "";
//保存当前选择的节点
var currentNode;
//保存树Id
var selectTreeId;
//新增在线提问入口函数
function addProblemIn(){
	$('#activity_pane').showLoading();
	$("#problemDialog").dialog('option', 'title', '提问');
	$("#problemDialog").dialog('option','buttons',{
		"确定" : addProblemOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	$("#problemDialog").dialog('option', 'width', '800');
	selectId = $("#problemList").jqGrid("getGridParam", "selrow");
	//加载页面
	$( "#problemDialog" ).load('/DRTS/problem/problem_add_dialog.jsp', function(){
		$("#add_content").ckeditor({toolbar : 'ProblemToolbar'});
		$.post("/DRTS/problem/problem_addProblemIn.action",addProblemInCB);
	});
}

//新增在线提问入口回调
function addProblemInCB(data){
	//为表单加载数据
	formLoadData("addProblemForm",data);
	//注册新增表单验证
	$("#addProblemForm").validate({
		rules:{
			title:{required:true,maxlength:100,byteRangeLength:[0,100],
				remote: {   
    				url: "/DRTS/problem/problem_validateName.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json"           //接受数据格式      
				}
			},
			course:{required:true}//,
			//key_word:{maxlength:200,byteRangeLength:[0,200]},
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
           	element.parent().children().filter("span").append("<br/>");
			error.appendTo(element.parent().children().filter("span"));
       	},
       	messages:{
       		title:{
       			remote:"此问题标题已存在"
       		}
       	},
    	submitHandler:function(){ //验证通过后调用此函数
    		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$('#addProblemForm').ajaxSubmit({
				url:"/DRTS/problem/problem_addProblemOut.action",
				data:{createPerson:global_userId},
				success:addProblemOutCB //成功增加的回调函数
			});
    	}
	});
	//注册增加用户ajax表单
	$("#addProblemForm").ajaxForm();
	$('#activity_pane').hideLoading();
	$("#problemDialog").dialog( "open" );
}

//新增在线提问出口
function addProblemOut(){
	$("#addProblemForm").submit();
}

//新增在线提问出口回调函数
function addProblemOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var problem = data.problem;
	if(data.result == "success") {
		$("#problemDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		var link="<a href='javascript:checkProblem(\""+problem.id+"\")' class='nojump' title='查看问题详细信息'>"+ problem.title+"</a>";
		problem.title = link;
		if(selectId){
			$("#problemList").jqGrid("addRowData", problem.id, problem, "before", selectId);
		}else {
			$("#problemList").jqGrid("addRowData", problem.id, problem, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//修改问题
function modifyProblemIn(id){
	$('#activity_pane').showLoading();
	$("#problemDialog").dialog('option', 'title', '修改问题');
	$("#problemDialog").dialog('option','buttons',{
		"确定" : modifyProblemOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	$("#problemDialog").dialog('option', 'width', '800');
	selectId = id;

	//加载基本信息页面
	$( "#problemDialog" ).load('/DRTS/problem/problem_modify_dialog.jsp', function(){
		$.post("/DRTS/problem/problem_modifyProblemIn.action",{id:id},modifyProblemInCB);
	});
}

//修改问题入口回调
function modifyProblemInCB(data){
	//为表单加载数据
	formLoadData("modifyProblemForm",data);
	//初始化编辑器
	$("#modify_content").ckeditor({toolbar : 'ProblemToolbar'});
	//注册新增表单验证
	$("#modifyProblemForm").validate({
		rules:{
			title:{required:true,maxlength:100,byteRangeLength:[0,100],
				remote: {   
    				url: "/DRTS/problem/problem_validateName.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json",           //接受数据格式
    				data:{id:selectId}
				}
			},
			course:{required:true}
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
			element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
       	},
       	messages:{
       		title:{
       			remote:"此问题标题已存在"
       		}
       	},
    	submitHandler:function(){ //验证通过后调用此函数
   	 		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$("#modifyProblemForm").ajaxSubmit({
				url:"/DRTS/problem/problem_modifyProblemOut.action",
				success:modifyProblemOutCB //成功增加的回调函数
			});
    	}
	});
	//注册增加ajax表单
	$("#modifyProblemForm").ajaxForm();
	$('#activity_pane').hideLoading();
	$("#problemDialog").dialog( "open" );
}

//修改问题出口
function modifyProblemOut(){
	$("#modifyProblemForm").submit();
}

//修改问题出口回调函数
function modifyProblemOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var problem = data.problem;
	if(data.result == "success") {
		$("#problemDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		var link="<a href='javascript:checkProblem(\""+problem.id+"\")' class='nojump' title='查看问题详细信息'>"+ problem.title+"</a>";
		problem.title = link;
		if(selectId){
			$("#problemList").jqGrid("setRowData", problem.id, problem, "before", selectId);
		}else {
			$("#problemList").jqGrid("setRowData", problem.id, problem, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//查看问题
function checkProblem(id){
	$('#activity_pane').showLoading();
	$("#problemDialog").dialog('option', 'title', '查看问题');
	$("#problemDialog").dialog('option','buttons',{
		"返回" : function() {
			$(this).dialog("close");
		}
	});
	$("#problemDialog").dialog('option', 'width', '700');
	selectId = id;

	//加载问题查看页面
	$( "#problemDialog" ).load('/DRTS/problem/problem_check_dialog.jsp', function(){
		var clientHeight = document.documentElement.clientHeight-100;
		$("#problemDialog .section").css('max-height', clientHeight);
		$.post("/DRTS/problem/problem_checkProblem.action",{id:id},function(data){
			//为表单加载数据
			formLoadData("checkProblemForm",data);
			$("#contentDiv").append(data.mainData.content);
			$("#answerDiv").append(data.mainData.answer);
			$('#activity_pane').hideLoading();
			$("#problemDialog").dialog( "open" );
		});
	});
}

//确认删除
function delProblemCF(id) {
	confirmJQ("删除后无法恢复，确认删除？",delProblem,id);
}

//删除问题
function delProblem(id) {
	$('#activity_pane').showLoading();
	$.post("/DRTS/problem/problem_deleteProblem.action",{id:id},function(data){
		$('#activity_pane').hideLoading();
		
	 	if(data.result == "success") {
	 		alertJQ("操作成功，请等待页面刷新",1000);
			$("#problemList").jqGrid("delRowData", id);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
}

//查询问题
function query(){
	var title = $("#query_title").val();
	var course = $("#query_course").val();
	var status = $("#query_status").val();
	//搜索实现方式：将搜索数据设置到postData中，由它传回后台
	var postData = {
		title:title,
		course:course,
		status:status
	};
	//合并数据,extend属性顺序不要搞反了
	postData = $.extend($("#problemList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#problemList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#problemList").trigger("reloadGrid", [{page:1}]);
}