//页面加载时初始化函数
$(function() {
	//权限验证
	if(validateRole('activity_pane','0,1')== false){
		$( "#paperTacticDialog" ).empty();
		$(".content").empty();
		return;
	}
	//主页面表格
	// 配置jqGrid组件  
    $("#paperTacticList").jqGrid({  
    		url:"/DRTS/exam/paperTactic_paperTacticList.action",
    		mtype : "post",
    		datatype : "json",
			width:'100%',
	 	    height:'auto',
	 	    autowidth:true,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [ {name : "num",index : "num",label : "策略编号",width : 50,align:'center'}, 
						 {name : "name",index : "name",label : "策略名称",width : 50,align:'center'},
						 {name : "level",index : "level",label : "试卷难度",width : 50,align:'center'}, 
						 {name : "totalScore",index : "totalScore",label : "试卷总分数",width : 50,align:'center'}, 
						 {name : "setupTime",index : "setupTime",label : "添加时间",width : 50,align:'center'}, 
						 {name:"setup",label : "配置",width:30,sortable:false,align:'center'}
						 ],
			pager : "#paperTacticListPager",
			rowNum:20,
	 	    rowList:[10,20,50],
			sortname:"setupTime",
			sortorder : "desc",
	 	    viewrecords: true,
	 	    gridview: true,
			prmNames : {
				page : "pageNo", // 表示请求页码的参数名称  
				rows : "rows", // 表示请求行数的参数名称  
				totalrows : "totalrows", // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal  
				search: "search",// 表示是否是搜索请求的参数名称
				sort : "sortName",// 表示用于排序的列名的参数名称  
				order : "sortOrder"// 表示采用的排序方式的参数名称
			}, 
			jsonReader : {
				root:"contents", 
	 	        page: "pageNo",
	 	        total: "totalPages",
	 	        records: "totalRecords",
	 	       	id:"num",
	 	        repeatitems : false
			},
			gridComplete:function(){  //在此事件中循环为每一行添加修改和删除链接	     	
				var ids=$(this).jqGrid('getDataIDs');
				for(var i=0; i<ids.length; i++){
					var id=ids[i];
		    		var setupstr = "<img id='" + id + "' src='/DRTS/images/user_modify.gif' title='修改' style='cursor:pointer;' onclick='modifyPaperTacticIn(this.id);'/>&nbsp;&nbsp;";
		    		setupstr += "<img id='" + id + "' src='/DRTS/images/user_check.gif' title='详细信息' style='cursor:pointer;' onclick='checkPaperTactic(this.id);'/>&nbsp;&nbsp;";
		    		setupstr += "<img id='" + id + "' src='/DRTS/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delPaperTacticCF(this.id);'/>";
		    		$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
				}
				var bodyObj=document.getElementById('main-content');
				if(bodyObj.scrollHeight>bodyObj.clientHeight||bodyObj.offsetHeight>bodyObj.clientHeight){
					$("#main-content .toolBar").css('width',$(this).width()-10);
				}
			}
	});
	
    //日期控件初始化
	initCustomerDatepicker(new Array("query_startTime","query_endTime"),"yy-mm-dd","hh:mm:ss");
	//sider初始化
	$('#query_slider').slider({  
       disabled:false,   //是否可用，true不可用  false即可用的  
       animate:true,   //代表是采用动画效果  
       max:5,          //滑块的最大值是5  
       min:1,             //滑块的最小值是1  
       value:1,             //滑块的默认值  
       orientation:'horizontal',   //滑块的方向是垂直的还是水平的  
       values:[1,5],          //初始化滑块的位置 一个是1 一个是5 
       range:true
    });
        
   	//试卷生成策略弹窗
 	$( "#paperTacticDialog" ).dialog({
 		autoOpen: false,
 		width: '800',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		close:function(){
 			$( "#paperTacticTab" ).empty();
 			$( "#questionTypeDetailTab" ).empty();
 		}
 	});
	//弹窗里面的tab定义
	$( "#paperTacticTabs" ).tabs();
});

//保存当前选择的行Id
var selectId = "";
//保存当前选择的节点
var currentNode;
//保存多选框控件Id
var multiSelectId;
//保存树Id
var selectTreeId;

//新增试卷生成策略入口函数
function addPaperTacticIn(){
	$('#activity_pane').showLoading();
	$("#paperTacticDialog").dialog('option', 'title', '新增试卷生成策略');
	$("#paperTacticDialog").dialog('option','buttons',{
		"确定" : addPaperTacticOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	$("#paperTacticDialog").dialog('option', 'width', '800');
	selectId = $("#paperTacticList").jqGrid("getGridParam", "selrow");
	//加载基本信息页面
	$( "#paperTacticTab" ).load('/DRTS/exam/exam_paper_tactic_add_dialog.jsp', addPaperTacticInCB);
	//加载试题类型详细信息页面
	$( "#questionTypeDetailTab" ).load('/DRTS/exam/exam_question_type_detail_edit_dialog.jsp', editQuestionTypeDetail);
}

//新增试卷生成策略入口回调
function addPaperTacticInCB(){
	//获取课程树
	getCourseTree();
	//sider初始化
	$('#add_slider').slider({  
       disabled:false,   //是否可用，true不可用  false即可用的  
       animate:true,   //代表是采用动画效果  
       max:5,          //滑块的最大值是5  
       min:1,             //滑块的最小值是1  
       value:3,             //滑块的默认值  
       orientation:'horizontal'   //滑块的方向是垂直的还是水平的  
    });
	//注册新增表单验证
	$("#addPaperTacticForm").validate({
		rules:{
			num:{required:true,maxlength:20,byteRangeLength:[0,20],stringEN:true,
				remote: {   
    				url: "/DRTS/exam/paperTactic_validateNum.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json"           //接受数据格式      
				}
			},
			name:{required:true,maxlength:50,byteRangeLength:[0,50],
				remote: {   
    				url: "/DRTS/exam/paperTactic_validateName.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json"           //接受数据格式      
				}
			},
			level:{required:true,digits:true,min:1,max:5},
			totalScore:{required:true,number:true,min:0}
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
			element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
       	},
       	messages:{
       		num:{remote:"此策略编号已存在"},
       		name:{remote:"此策略名称已存在"}
       	},
    	submitHandler:function(){ //验证通过后调用此函数
    	 	var selVal = [];
    	 	$("#examScope_select").find("option").each(function(){
    	 		selVal.push(this.value);
    		});
   	 		$("#add_examScope").val(selVal.join(","));
   	 		
   	 		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$("#addPaperTacticForm").ajaxSubmit({
				url:"/DRTS/exam/paperTactic_addPaperTacticOut.action",
				success:addPaperTacticOutCB //成功增加的回调函数
			});
    	}
	});
	//注册增加ajax表单
	$("#addPaperTacticForm").ajaxForm();
}

//新增试卷生成策略出口
function addPaperTacticOut(){
 	var gridVal = $("#questionTypeDetailList").jqGrid("getRowData");
	
 	if(gridVal.length == 0){
		alertJQ("请录入试题类型信息！","");
		return;
	}
	else{
		var sum = 0;
		for(var i=0; i<gridVal.length; i++){
			var rowObj = gridVal[i];
			sum += Number(rowObj.score);
			delete rowObj.questionTypeName;
			delete rowObj.setup;
		}if(sum>Number($("#add_totalScore").val())){
			alertJQ("题型分值之和超出总分！");
			return;
		}else{
			$("#paperTacticTabs").tabs( 'select' , 0);
			$("#add_level").val($("#add_slider").slider('value'));
			$("#add_questionTypes").val(JSON.stringify(gridVal));
			$("#addPaperTacticForm").submit();
		}
	}
}

//新增试卷生成策略出口回调函数
function addPaperTacticOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var paperTactic = data.paperTactic;
	if(data.result == "success") {
		$("#paperTacticDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		if(selectId){
			$("#paperTacticList").jqGrid("addRowData", paperTactic.num, paperTactic, "before", selectId);
		}else {
			$("#paperTacticList").jqGrid("addRowData", paperTactic.num, paperTactic, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//修改试卷生成策略入口函数
function modifyPaperTacticIn(num){
	$('#activity_pane').showLoading();
	$("#paperTacticDialog").dialog('option', 'title', '修改试卷生成策略');
	$("#paperTacticDialog").dialog('option','buttons',{
		"确定" : modifyPaperTacticOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	$("#paperTacticDialog").dialog('option', 'width', '800');
	selectId = num;
	$.post("/DRTS/exam/paperTactic_modifyPaperTacticIn.action",{num:num},function(data){
		if(data.result == "success") {
			//加载基本信息页面
			$( "#paperTacticTab" ).load('/DRTS/exam/exam_paper_tactic_modify_dialog.jsp', function(){
				modifyPaperTacticInCB(data);
			});
			//加载试题类型详细信息页面
			$( "#questionTypeDetailTab" ).load('/DRTS/exam/exam_question_type_detail_edit_dialog.jsp', function(){
				editQuestionTypeDetail(num);
			});
		}else if(data.result == "failure") {
			$('#activity_pane').hideLoading();
			alertJQ(data.resultInfo,"",400);
		}
	});
	
}

//修改试卷生成策略入口回调
function modifyPaperTacticInCB(data){
	//为表单加载数据
	formLoadData("modifyPaperTacticForm",data);
	//获取课程树
	getCourseTree();
	//sider初始化
	$('#modify_slider').slider({  
       disabled:false,   //是否可用，true不可用  false即可用的  
       animate:true,   //代表是采用动画效果  
       max:5,          //滑块的最大值是5  
       min:1,             //滑块的最小值是1  
       value:$("#modify_level").val(),             //滑块的默认值  
       orientation:'horizontal'   //滑块的方向是垂直的还是水平的  
    });
	//注册新增表单验证
	$("#modifyPaperTacticForm").validate({
		rules:{
			name:{required:true,maxlength:50,byteRangeLength:[0,50],
				remote: {   
    				url: "/DRTS/exam/paperTactic_validateName.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json",           //接受数据格式
    				data:{num:selectId}
				}
			},
			level:{required:true,digits:true,min:1,max:5},
			totalScore:{required:true,number:true,min:0}
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
			element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
       	},
       	messages:{
       		name:{remote:"此策略名称已存在"}
       	},
    	submitHandler:function(){ //验证通过后调用此函数
    	 	var selVal = [];
    	 	$("#examScope_select").find("option").each(function(){
    	 		selVal.push(this.value);
    		});
   	 		$("#modify_examScope").val(selVal.join(","));
   	 		
   	 		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$("#modifyPaperTacticForm").ajaxSubmit({
				url:"/DRTS/exam/paperTactic_modifyPaperTacticOut.action",
				success:modifyPaperTacticOutCB //成功增加的回调函数
			});
    	}
	});
	//注册修改ajax表单
	$("#modifyPaperTacticForm").ajaxForm();
}

//修改试卷生成策略出口
function modifyPaperTacticOut(){
 	var gridVal = $("#questionTypeDetailList").jqGrid("getRowData");
	
 	if(gridVal.length == 0){
		alertJQ("请录入试题类型信息！","");
		return;
	}
	else{
		var sum = 0;
		for(var i=0; i<gridVal.length; i++){
			var rowObj = gridVal[i];
			sum += Number(rowObj.score);
			delete rowObj.questionTypeName;
			delete rowObj.setup;
			if(rowObj.id == rowObj.orderNum)
				rowObj.id = "";
		}
		if(sum>Number($("#modify_totalScore").val())){
			alertJQ("题型分值之和超出总分！");
			return;
		}else{
			$("#paperTacticTabs").tabs( 'select' , 0);
			$("#modify_level").val($("#modify_slider").slider('value'));
			$("#modify_questionTypes").val(JSON.stringify(gridVal));
			$("#modifyPaperTacticForm").submit();
		}
	}
}

//修改试卷生成策略出口回调函数
function modifyPaperTacticOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var paperTactic = data.paperTactic;
	if(data.result == "success") {
		$("#paperTacticDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		if(selectId){
			$("#paperTacticList").jqGrid("setRowData", paperTactic.num, paperTactic, "before", selectId);
		}else {
			$("#paperTacticList").jqGrid("setRowData", paperTactic.num, paperTactic, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//查看试卷生成策略  
function checkPaperTactic(num){
	$('#activity_pane').showLoading();
	$("#paperTacticDialog").dialog('option', 'title', '查看试卷生成策略');
	$("#paperTacticDialog").dialog('option','buttons',{
		"返回" : function() {
			$(this).dialog("close");
		}
	});
	$("#paperTacticDialog").dialog('option', 'width', '740');
	selectId = num;

	//加载基本信息页面
	$( "#paperTacticTab" ).load('/DRTS/exam/exam_paper_tactic_check_dialog.jsp', function(){
		$.post("/DRTS/exam/paperTactic_checkPaperTactic.action",{num:num},function(data){
			//为表单加载数据
			formLoadData("checkPaperTacticForm",data);
		});
	});
	//加载试题类型详细信息页面
	$( "#questionTypeDetailTab" ).load('/DRTS/exam/exam_question_type_detail_check_dialog.jsp', function(){
		checkQuestionTypeDetail(num);
	});
}

//课程树初始化
function getCourseTree(){
	//树控件配置属性
	var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: -1
			}
		},
		view:{
			showLine: false,
			dblClickExpand:false
		},
		callback: {
			onClick:treeClick,
			onDblClick:treeDBclick
		}
	};
	//加载课程树
	$.post("/DRTS/course/courseWare_courseTreeList.action",{types:"COURSE,CHAPTER"},function(data){
		$.each(data, function(i,n){
			switch(n.type){
				case 'COURSE':
					n.open = true;
					n.isParent = true;
					n.drag = false;
					n.drop = false;
					n.icon = "images/courseGray.gif";
					break;
				case 'CHAPTER':
					n.open = false;
					n.isParent = false;
					n.drag = false;
					n.drop = false;
					n.icon = "images/chapterGray.gif";
					break;
			}
		});
		$.fn.zTree.init($("#course_tree"), setting, data);
		//隐藏已经选择的树节点
		var treeObj = $.fn.zTree.getZTreeObj("course_tree");
	 	$("#examScope_select").find("option").each(function(){
	 		var node = treeObj.getNodeByParam("num", $(this).val(), null);
	 		treeObj.hideNode(node);
		});
	});
	//设置多选框控件Id
	multiSelectId = "examScope_select";
	//设置树Id
	selectTreeId = "course_tree";
	//多选列表双击事件函数
	$("#"+multiSelectId).dblclick(function(){
		selectDBclick();
	});
	$("#toright").bind("click",treeDBclick);
	$("#toleft").bind("click",function(){
		selectDBclick();
	});
}

//树节点单击事件函数
function treeClick(event, treeId ,treeNode){
	currentNode=treeNode;
}

//树节点双击事件函数
function treeDBclick(event, treeId, treeNode){
	var treeObj = $.fn.zTree.getZTreeObj(selectTreeId);
	switch(currentNode.type){
		case 'COURSE':
			var nodes = currentNode.children;
			$.each(nodes, function(i,n){
				if(!n.isHidden){
					var option = "<option value="+n.num+">"+n.name+"</option>";
					$("#"+multiSelectId).append(option);
				}
			  });
			treeObj.hideNodes(nodes);
			break;
		case 'CHAPTER':
			var option = "<option value="+currentNode.num+">"+currentNode.name+"</option>";
			$("#"+multiSelectId).append(option);
			treeObj.hideNode(currentNode);
			break;
	}
}

//多选列表双击事件函数
function selectDBclick(){
	var treeObj = $.fn.zTree.getZTreeObj(selectTreeId);
	$("#"+multiSelectId).find("option:selected").each(function(){
		$(this).remove();
		var node = treeObj.getNodeByParam("num", $(this).val(), null);
		if(node.isHidden)
			treeObj.showNode(node);
	});
}

//编辑试题类型信息回调
function editQuestionTypeDetail(data){
	$("#questionTypeDetailList").jqGrid({  
		url:"/DRTS/exam/questionTypeDetail_detailList.action",
		mtype : "post",
		datatype : "json",
		postData: { paperTactic: data },
		loadonce: true, 
		width:'660',
 	    height:'auto',
 	   	autowidth:false,
		//multiselect:true, //是否在首列加入复选框
		//multiselectWidth:30, //复选框的宽度
		colModel : [ {name : "id",index : "id",label : "ID",width : 50,key:true,hidden:true}, 
		             {name : "questionType",index : "questionType",label : "试题类型",width : 50,align:'center',hidden:true}, 
		             {name : "questionTypeName",index : "questionType",label : "试题类型",width : 50,align:'center'},
					 {name : "orderNum",index : "orderNum",label : "序&nbsp;号",width : 50,align:'center'},
					 {name : "score",index : "score",label : "分&nbsp;数",width : 50,align:'center'}, 
					 {name : "questionCount",index : "questionCount",label : "所含试题数",width : 50,align:'center'}, 
					 {name:"setup",label : "删&nbsp;除",width:30,sortable:false,align:'center'}
					 ],
		pager : "#questionTypeDetailListPager",
		rowNum:20,
		sortname:"orderNum",
		sortorder : "asc",
 	    viewrecords: true,
 	    gridview: true,
	    pgbuttons:false,
	    pginput:false,
		prmNames : {
			page : "pageNo", // 表示请求页码的参数名称  
			rows : "rows", // 表示请求行数的参数名称  
			totalrows : "totalrows", // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal  
			search: "search",// 表示是否是搜索请求的参数名称
			sort : "sortName",// 表示用于排序的列名的参数名称  
			order : "sortOrder"// 表示采用的排序方式的参数名称
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
	    		var setupstr = "<img id='" + id + "' src='/DRTS/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delQuestionTypeDetail(this.id);'/>&nbsp;&nbsp;";
	    		$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
			}
		}
	});
	
	//加载试题类型下拉框值
	$.post("/DRTS/exam/questionTypeDetail_addDetailIn.action",function(data){
		formLoadData("editQuestionTypeDetailForm",data);
	});
	//注册新增表单验证
	$("#editQuestionTypeDetailForm").validate({
		rules:{
			questionType:{required:true,gridValueExisted:["questionTypeDetailList","questionType"]},
			score:{required:true,number:true,min:0},
			orderNum:{required:true,digits:true,min:1,gridValueExisted:["questionTypeDetailList","orderNum"]},
			questionCount:{required:true,digits:true,min:1}
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
			element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
       	},
    	submitHandler:function(){ //验证通过后调用此函数
    		//在表格中新增
    		var questionTypeDetail = $("#editQuestionTypeDetailForm").serializeJson();
    		questionTypeDetail.id = questionTypeDetail.orderNum;
    		questionTypeDetail.questionTypeName =  $("#edit_questionType").find("option:selected").text();
    		$("#questionTypeDetailList").jqGrid("addRowData", questionTypeDetail.id, questionTypeDetail, "last");
    		$("#questionTypeDetailList").jqGrid("sortGrid","orderNum",false);
    	}
	});
	$('#activity_pane').hideLoading();
	$( "#paperTacticDialog" ).dialog( "open" );
}

//查看试题类型信息
function checkQuestionTypeDetail(data){
	
	$("#questionTypeDetailList").jqGrid({  
		url:"/DRTS/exam/questionTypeDetail_detailList.action",
		mtype : "post",
		datatype : "json",
		postData: { paperTactic: data },
		loadonce: true, 
		width:'600',
 	    height:'auto',
 	   	autowidth:false,
		//multiselect:true, //是否在首列加入复选框
		//multiselectWidth:30, //复选框的宽度
		colModel : [ {name : "id",index : "id",label : "ID",width : 50,key:true,hidden:true}, 
		             {name : "questionType",index : "questionType",label : "试题类型",width : 50,align:'center',hidden:true}, 
		             {name : "questionTypeName",index : "questionType",label : "试题类型",width : 50,align:'center'},
					 {name : "orderNum",index : "orderNum",label : "序&nbsp;号",width : 50,align:'center'},
					 {name : "score",index : "score",label : "分&nbsp;数",width : 50,align:'center'}, 
					 {name : "questionCount",index : "questionCount",label : "所含试题数",width : 50,align:'center'} 
					 ],
		pager : "#questionTypeDetailListPager",
		rowNum:20,
		sortname:'orderNum',
		sortorder : 'asc',
 	    viewrecords: true,
 	    gridview: true,
	    pgbuttons:false,
	    pginput:false,
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
		}
	});
	$('#activity_pane').hideLoading();
	$( "#paperTacticDialog" ).dialog( "open" );
}

//删除试题类型详细信息
function delQuestionTypeDetail(id) {
	$("#questionTypeDetailList").jqGrid("delRowData", id);
}

//确认删除
function delPaperTacticCF(id) {
	confirmJQ("删除后无法恢复，确认删除？",delPaperTactic,id);
}

//删除试卷生成策略
function delPaperTactic(id) {
	$('#activity_pane').showLoading();
	
	$.post("/DRTS/exam/paperTactic_deletePaperTactic.action",{id:id},function(data){
		$('#activity_pane').hideLoading();
		
	 	if(data.result == "success") {
	 		alertJQ("操作成功，请等待页面刷新",1000);
			$("#paperTacticList").jqGrid("delRowData", id);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
}

//查询试卷生成策略
function query(){
	var num = $("#query_num").val();
	var name = $("#query_name").val();
	var startLevel = $("#query_slider").slider('values', 0);
	var endLevel = $("#query_slider").slider('values', 1);
	var startTime = $("#query_startTime").val();
	var endTime = $("#query_endTime").val();
	if(startTime!=""&&endTime!=""){
		var date1 = new Date(Date.parse(startTime.replace("-", "/")));
        var date2 = new Date(Date.parse(endTime.replace("-", "/")));
        if(date1 > date2){
        	alertJQ("起始时间必须小于终止时间！");
        	return;
        }
	}
	//搜索实现方式：将搜索数据设置到postData中，由它传回后台
	var postData = {
		num:num,
		name:name,
		startLevel:startLevel,
		endLevel:endLevel,
		startTime:startTime,
		endTime:endTime
	};
	//合并数据,extend属性顺序不要搞反了
	postData = $.extend($("#paperTacticList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#paperTacticList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#paperTacticList").trigger("reloadGrid", [{page:1}]);
}

//测试
function test(){
//<input type="button" class="portlert-form-button-disEdit" value="测试" onclick="javascirpt:test()"/>

}