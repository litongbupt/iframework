//页面加载时初始化函数
$(function() {
	//权限验证
	if(validateRole('activity_pane','1')== false){
		$(".content").empty();
		return;
	}
	var status = $("#query_status").val();
	//主页面表格
	// 配置jqGrid组件  
    $("#problemList").jqGrid({  
    		url:'/DRTS/problem/problem_problemList.action',
    		mtype : "post",
    		datatype : "json",
    		postData:{status:status},
			width:'100%',
	 	    height:'auto',
	 	    autowidth:true,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [ {name : "title",index : "title",label : "问题标题",width : 200,align:'center'},
						 {name : "course",index : "course",label : "所属课程",width : 50,align:'center'},
						 {name : "createPersonName",index : "createPersonName",label : "提问人",width : 30,align:'center'},
						 {name : "createTime",index : "createTime",label : "提问时间",width : 50,align:'center'},
						 {name : "status",index : "status",label : "状态",width : 20,align:'center'},
						 {name : "setup",index : "id",label : "答疑",width : 20,align:'center'}
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
		    		var setupstr = "<img id='" + id + "' src='/DRTS/images/modify.png' title='答疑' style='cursor:pointer;' onclick='answerProblemIn(this.id);'/>";
		    		$(this).jqGrid("setRowData",id,{'title':link});
		    		$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
				}
			}
	});
    
    $.post("/DRTS/problem/problem_addProblemIn.action",function(data){
    	//为表单加载数据
    	formLoadData("query_form",data);
    });
    
   	//新增在线答疑弹窗
 	$( "#answerDialog" ).dialog({
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
//在线答疑入口函数
function answerProblemIn(id){
	$('#activity_pane').showLoading();
	$("#answerDialog").dialog('option', 'title', '解答');
	$("#answerDialog").dialog('option','buttons',{
		"确定" : answerProblemOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	$("#answerDialog").dialog('option', 'width', '800');
	selectId = $("#problemList").jqGrid("getGridParam", "selrow");
	//加载页面
	$( "#answerDialog" ).load('/DRTS/problem/problem_answer_dialog.jsp', function(){
		var clientHeight = document.documentElement.clientHeight-100;
		$("#answerDialog .section").css('max-height', clientHeight);
		$.post("/DRTS/problem/problem_answerProblemIn.action",{id:id},function(data){
			//为表单加载数据
			formLoadData("answerProblemForm",data);
			$("#contentDiv").append(data.mainData.content);
			$("#answer_answer").ckeditor({toolbar : 'ProblemToolbar'});
			$('#activity_pane').hideLoading();
			$("#answerDialog").dialog( "open" );
		});
	});
}

//在线答疑出口
function answerProblemOut(){
	var answerContent = $("#answer_answer").val();
	if(answerContent.length==0)
		alertJQ("请填写解答内容！");
	else{
		 //禁用按钮
	 	disableButton();
	 	$('#activity_pane').showLoading();
		//采用ajax提交表单
		$('#answerProblemForm').ajaxSubmit({
			url:"/DRTS/problem/problem_answerProblemOut.action",
			data:{solvePerson:global_userId},
			success:answerProblemOutCB //成功增加的回调函数
		});
	}
}

//在线答疑出口回调函数
function answerProblemOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	if(data.result == "success") {
		$("#answerDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		query();
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//查看问题
function checkProblem(id){
	$('#activity_pane').showLoading();
	$("#answerDialog").dialog('option', 'title', '查看问题');
	$("#answerDialog").dialog('option','buttons',{
		"返回" : function() {
			$(this).dialog("close");
		}
	});
	$("#answerDialog").dialog('option', 'width', '700');
	selectId = id;

	//加载问题查看页面
	$( "#answerDialog" ).load('/DRTS/problem/problem_check_dialog.jsp', function(){
		var clientHeight = document.documentElement.clientHeight-100;
		$("#answerDialog .section").css('max-height', clientHeight);
		$.post("/DRTS/problem/problem_checkProblem.action",{id:id},function(data){
			//为表单加载数据
			formLoadData("checkProblemForm",data);
			$("#contentDiv").append(data.mainData.content);
			$("#answerDiv").append(data.mainData.answer);
			$('#activity_pane').hideLoading();
			$("#answerDialog").dialog( "open" );
		});
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