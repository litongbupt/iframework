//页面加载时初始化函数
$(function() {
	//权限验证
	if(validateRole('activity_pane','0,1')== false){
		$( "#examPaperDialog" ).empty();
		$( "#examPaperViewDialog" ).empty();
		$(".content").empty();
		return;
	}
	//主页面表格
	// 配置jqGrid组件  
    $("#examPaperList").jqGrid({
    		url:"/DRTS/exam/examPaper_examPaperList.action",
    		mtype : "post",
    		datatype : "json",
			width:'100%',
	 	    height:'auto',
	 	    autowidth:true,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [ {name : "num",index : "num",label : "试卷编号",width : 50,align:'center'}, 
						 {name : "name",index : "name",label : "试卷名称",width : 50,align:'center'},
						 {name : "level",index : "level",label : "试卷难度",width : 50,align:'center'}, 
						 {name : "totalScore",index : "totalScore",label : "试卷总分数",width : 50,align:'center'}, 
						 {name : "setupTime",index : "setupTime",label : "添加时间",width : 50,align:'center'}, 
						 {name:"setup",label : "配置",width:30,sortable:false,align:'center'}
						 ],
			pager : "#examPaperListPager",
			rowNum:20,
	 	    rowList:[10,20,50],
			sortname:'setupTime',
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
	 	       	id:"num",
	 	        repeatitems : false
			},
			gridComplete:function(){  //在此事件中循环为每一行添加修改和删除链接	     	
				var ids=$(this).jqGrid('getDataIDs');
				for(var i=0; i<ids.length; i++){
					var id=ids[i];
		    		var setupstr = "<img id='" + id + "' src='/DRTS/images/user_modify.gif' title='修改' style='cursor:pointer;' onclick='modifyExamPaperIn(this.id);'/>&nbsp;&nbsp;";
		    		setupstr += "<img id='" + id + "' src='/DRTS/images/user_check.gif' title='详细信息' style='cursor:pointer;' onclick='checkExamPaper(this.id);'/>&nbsp;&nbsp;";
		    		setupstr += "<img id='" + id + "' src='/DRTS/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delExamPaperCF(this.id);'/>";
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
    
   	//试卷弹窗
 	$( "#examPaperDialog" ).dialog({
 		autoOpen: false,
 		width: '800',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade'/*,
 		close:function(){
 			$( "#examPaperTab" ).empty();
 			$( "#questionTypeDetailTab" ).empty();
 		}*/
 	});
   	
	//弹窗里面的tab定义
	$( "#examPaperTabs" ).tabs();
	
 	//试卷详细弹窗
 	$( "#examPaperDetailDialog" ).dialog({
 		autoOpen: false,
 		width: '750',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		buttons:{
 			"自动生成":generateExamPaper,
 			"预览":preView,
 			"上一步": backUp,
			"确定" : editExamPaperDetailOut,
			"取消" : function() {
			 	$( "#examPaperTab" ).empty();
 				$( "#questionTypeDetailTab" ).empty();
				$(this).dialog("close");
			}
 		},
 		close:function(){
 			$(this).empty();
 		}
 	});
 	
 	//试题弹窗
 	$( "#questionDialog" ).dialog({
 		autoOpen: false,
 		width: '900',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		buttons:{
			"确定" : selectQuestionCB,
			"取消" : function() {
				$(this).dialog("close");
			}
 		},
 		close:function(){
 			$(this).empty();
 		}
 	});
 	
 	//浏览试卷弹窗
 	$( "#examPaperViewDialog" ).dialog({
 		autoOpen: false,
 		width: '840',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		buttons:{
			"返回" : function() {
				$(this).dialog("close");
			}
 		},
 		close:function(){
 			$("#section_content").empty();
 		}
 	});
 	var clientHeight = document.documentElement.clientHeight-100;
	$("#examPaperViewDialog .section").css('max-height', clientHeight);
});

//保存当前选择的行Id
var selectId = "";
//保存当前选择的节点
var currentNode;
//保存多选框控件Id
var multiSelectId;
//保存树Id
var selectTreeId;
//操作标识
var operationFlag;
//试题详细信息数组
var epdArray = [];

//从已有的试卷创建
function createExamPaper(){
	selectId = $("#examPaperList").jqGrid("getGridParam", "selrow");
	if(selectId ==""||selectId==undefined){
		alertJQ("请选择试卷!");
	}else{
		$('#activity_pane').showLoading();
		$("#examPaperDialog").dialog('option', 'title', '从已有的试卷创建新试卷');
		operationFlag = "create";
		//加载基本信息页面
		$( "#examPaperTab" ).load('/DRTS/exam/exam_paper_add_dialog.jsp', function(){
			$.post("/DRTS/exam/examPaper_getExamPaper.action",{num:selectId},function(data){
				//获得试题详细信息数组
				epdArray = data.epdList;
				delete data.epdList;
				//为表单加载数据
				formLoadData("addExamPaperForm",data);
				addExamPaperInCB();
			});
		});
		//加载试题类型详细信息页面
		$( "#questionTypeDetailTab" ).load('/DRTS/exam/exam_question_type_detail_edit_dialog.jsp', function(){
			editQuestionTypeDetail(selectId);
		});
	}
}

//新增试卷入口函数
function addExamPaperIn(){
	$('#activity_pane').showLoading();
	$("#examPaperDialog").dialog('option', 'title', '新增试卷');
	selectId = $("#examPaperList").jqGrid("getGridParam", "selrow");
	operationFlag = "add";
	//加载基本信息页面
	$( "#examPaperTab" ).load('/DRTS/exam/exam_paper_add_dialog.jsp', addExamPaperInCB);
	//加载试题类型详细信息页面
	$( "#questionTypeDetailTab" ).load('/DRTS/exam/exam_question_type_detail_edit_dialog.jsp',editQuestionTypeDetail);
}

//新增试卷入口回调
function addExamPaperInCB(){
	$("#examPaperDialog").dialog('option','buttons',{
		"下一步" : addExamPaperOut,
		"取消" : function() {
			$(this).dialog("close");
			$( "#examPaperTab" ).empty();
			$( "#questionTypeDetailTab" ).empty();
		}
	});
	$("#examPaperDialog").dialog('option', 'width', '800');
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
	$("#addExamPaperForm").validate({
		rules:{
			num:{required:true,maxlength:20,byteRangeLength:[0,20],stringEN:true,
				remote: {   
    				url: "/DRTS/exam/examPaper_validateNum.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json"           //接受数据格式      
				}
			},
			name:{required:true,maxlength:50,byteRangeLength:[0,50],
				remote: {   
    				url: "/DRTS/exam/examPaper_validateName.action",     //后台处理程序   
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
       		num:{remote:"此试卷编号已存在"},
       		name:{remote:"此试卷名称已存在"}
       	},
    	submitHandler:function(){ //验证通过后调用此函数
    	 	var selVal = [];
    	 	$("#examScope_select").find("option").each(function(){
    	 		selVal.push(this.value);
    		});
   	 		$("#add_examScope").val(selVal.join(","));
    		$("#examPaperDialog").dialog("close");
    		editExamPaperDetail();
    	}
	});
	//注册增加用户ajax表单
	$("#addExamPaperForm").ajaxForm();
}

//新增试卷出口
function addExamPaperOut(){
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
		if(sum>Number($("#add_totalScore").val())){
			alertJQ("试题分值之和超出总分！");
			return;
		}else{
			$("#examPaperTabs").tabs( 'select' , 0);
			$("#add_level").val($("#add_slider").slider('value'));
			$("#add_questionTypes").val(JSON.stringify(gridVal));
			$("#addExamPaperForm").submit();
		}
	}
}

//新增试卷出口回调函数
function addExamPaperOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var examPaper = data.examPaper;
	if(data.result == "success") {
		$("#examPaperDetailDialog").dialog( "close" );
		$( "#examPaperTab" ).empty();
		$( "#questionTypeDetailTab" ).empty();
		alertJQ("操作成功，请等待页面刷新！",1000);
		if(selectId){
			$("#examPaperList").jqGrid("addRowData", examPaper.num, examPaper, "before", selectId);
		}else {
			$("#examPaperList").jqGrid("addRowData", examPaper.num, examPaper, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//修改试卷入口函数
function modifyExamPaperIn(num){
	$('#activity_pane').showLoading();
	$("#examPaperDialog").dialog('option', 'title', '修改试卷');
	$("#examPaperDialog").dialog('option','buttons',{
		"下一步" : modifyExamPaperOut,
		"取消" : function() {
			$(this).dialog("close");
			$( "#examPaperTab" ).empty();
			$( "#questionTypeDetailTab" ).empty();
		}
	});
	$("#examPaperDialog").dialog('option', 'width', '800');
	selectId = num;
	operationFlag = "modify";
	$.post("/DRTS/exam/examPaper_modifyExamPaperIn.action",{num:num},function(data){
		if(data.result == "success") {
			//加载基本信息页面
			$( "#examPaperTab" ).load('/DRTS/exam/exam_paper_modify_dialog.jsp', function(){
				modifyExamPaperInCB(data);
			});
			//加载试题类型详细信息页面
			$( "#questionTypeDetailTab" ).load('/DRTS/exam/exam_question_type_detail_edit_dialog.jsp', function(){
				editQuestionTypeDetail(num);
			});
		}else if(data.result == "failure") {
			$('#activity_pane').hideLoading();
			alertJQ(data.resultInfo);
		}
	});
}

//修改试卷入口回调
function modifyExamPaperInCB(data){
	//获得试题详细信息数组
	epdArray = data.epdList;
	delete data.epdList;
	//为表单加载数据
	formLoadData("modifyExamPaperForm",data);
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
	$("#modifyExamPaperForm").validate({
		rules:{
			name:{required:true,maxlength:50,byteRangeLength:[0,50],
				remote: {   
					url: "/DRTS/exam/examPaper_validateName.action",     //后台处理程序   
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
	   		name:{remote:"此试卷名称已存在"}
	   	},
		submitHandler:function(){ //验证通过后调用此函数
		 	var selVal = [];
		 	$("#examScope_select").find("option").each(function(){
		 		selVal.push(this.value);
			});
	 		$("#modify_examScope").val(selVal.join(","));
			$("#examPaperDialog").dialog("close");
	   		editExamPaperDetail();
		}
	});
	//注册增加用户ajax表单
	$("#modifyExamPaperForm").ajaxForm();
}

//修改试卷出口
function modifyExamPaperOut(){
	var gridVal = $("#questionTypeDetailList").jqGrid("getRowData");
	
	if(gridVal.length == 0){
		alertJQ("请录入试题类型信息！","");
		return;
	}else{
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
			alertJQ("试题分值之和超出总分！");
			return;
		}else{
			$("#examPaperTabs").tabs( 'select' , 0);
			$("#modify_level").val($("#modify_slider").slider('value'));
			$("#modify_questionTypes").val(JSON.stringify(gridVal));
			$("#modifyExamPaperForm").submit();
		}
	}
}

//修改试卷出口回调函数
function modifyExamPaperOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	if(data.result == "success") {
		var examPaper = data.examPaper;
		$("#examPaperDetailDialog").dialog( "close" );
		$( "#examPaperTab" ).empty();
		$( "#questionTypeDetailTab" ).empty();
		alertJQ("操作成功，请等待页面刷新！",1000);
		if(selectId){
			$("#examPaperList").jqGrid("setRowData", examPaper.num, examPaper, "before", selectId);
		}else {
			$("#examPaperList").jqGrid("setRowData", examPaper.num, examPaper, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//退回到上一步
function backUp(){
	$("#examPaperDialog").dialog("open");
	$( "#examPaperDetailDialog" ).dialog("close");
	$( "#examPaperDetailDialog" ).empty();
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
		postData: { examPaper: data},
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
    	}
	});
	$('#activity_pane').hideLoading();
	$( "#examPaperDialog" ).dialog( "open" );
}

//查看试卷
function checkExamPaper(num){
	$('#activity_pane').showLoading();
	$("#examPaperDialog").dialog('option', 'title', '查看试卷');
	$("#examPaperDialog").dialog('option','buttons',{
		"浏览" : function(){
			examPaperView(num);
		},
		"返回" : function() {
			$(this).dialog("close");
		}
	});
	$("#examPaperDialog").dialog('option', 'width', '740');
	selectId = num;

	//加载基本信息页面
	$( "#examPaperTab" ).load('/DRTS/exam/exam_paper_check_dialog.jsp', function(){
		$.post("/DRTS/exam/examPaper_checkExamPaper.action",{num:num},function(data){
			//为表单加载数据
			formLoadData("checkExamPaperForm",data);
		});
	});
	//加载试题类型详细信息页面
	$( "#questionTypeDetailTab" ).load('/DRTS/exam/exam_question_type_detail_check_dialog.jsp', function(){
		checkQuestionTypeDetail(num);
	});
}

//预览试卷
function preView(){
	var	epdArray =[];
	$("#examPaperDetailTabs [name=questionTable]").each(function(){
		var tOrder = $(this).attr('id').substring($(this).attr('id').lastIndexOf("_")+1);
		$(this).find("[name=question_num]").each(function(){
			if(this.value!=""){
				var qOrder = $(this).attr('id').substring($(this).attr('id').lastIndexOf("_")+1);
				var qScore = $(this).parent().next().find("[name=question_score]").val();
				var epd = new Object();
				epd.orderNum = tOrder+"_"+qOrder;
				epd.question = this.value;
				epd.score = qScore;
				epdArray.push(epd);
			}
		});
	});
	if(epdArray.length==0){
		alertJQ("此试卷没有录入试题！");
		return;
	}
	var gridVal = $("#questionTypeDetailList").jqGrid("getRowData");
	for(var i=0; i<gridVal.length; i++){
		var rowObj = gridVal[i];
		delete rowObj.questionTypeName;
		delete rowObj.setup;
	}
	$.post("/DRTS/exam/examPaper_preView.action",{qtdList:JSON.stringify(gridVal),epdList:JSON.stringify(epdArray)},function(data){
		var examPaper = data.mainData;
		examPaper.name = $("#examPaperTab [name=name]").val();
		examPaper.totalScore = $("#examPaperTab [name=totalScore]").val();
		examPaper.level = $("#examPaperTab [name=level]").val();
		initViewDialog(examPaper);
	});
}

//浏览试卷
function examPaperView(num){
	$('#activity_pane').showLoading();
	$.post("/DRTS/exam/examPaper_examPaperView.action",{num:num},function(data){
		$('#activity_pane').hideLoading();
		var examPaper = data.mainData;
		if(examPaper.qtdList.length==0){
			alertJQ("此试卷没有录入试题！");
			return;
		}
		initViewDialog(examPaper);
	});
}

//初始化试卷浏览弹窗
function initViewDialog(examPaper){
	var qtdArray = examPaper.qtdList;
	var qArray = examPaper.epdList;
	var tCount = 0;
	var qtd;
	$("#section_head").html(examPaper.name+"&nbsp;&nbsp;(共:"+qArray.length+"题，满分:"+examPaper.totalScore+"分，难度："+examPaper.level+")");
	for(var i=0; i<qArray.length; i++){
		var q = qArray[i];
		var tOrder = Number(q.orderNum.substring(0,2));
		if(qtd == undefined || qtd.orderNum < tOrder){
			qtd = qtdArray[tCount];
			var html1 = "<div id='qtdDiv_"+ qtd.orderNum +"' style='width:95%;'>";
			html1 += "<div style='line-height:40px;font-weight:bold;font-family:微软雅黑;font-size:14px;'>";
			html1 += num2Chinese(qtd.orderNum) +"、"+qtd.questionTypeName+"：(共:"+ qtd.score +"分)</div></div>";
			$("#section_content").append(html1);
			tCount ++;
		}
		var html2 = "<div style='width:700px;margin:0 auto;font-size:14px;' id='qDiv_"+i+"'><div>"+Number(q.orderNum.substring(3))+".&nbsp;&nbsp;";
		html2 += "试题设计人："+q.designer+"&nbsp;&nbsp;&nbsp;&nbsp;难度：("+q.level+")&nbsp;&nbsp;&nbsp;&nbsp;("+q.score+")分</div>";
		html2 += "<div style='margin:10px 10px 10px 25px;'>"+q.description+"</div></div>";
		$("#qtdDiv_"+ tOrder).append(html2);
		if(qtd.category == "客观题"){
			var divWidth = $("#qDiv_"+i).width()/q.optionCols-30;
			var contentWidth = divWidth-45;
			var optionArray = JSON.parse(q.standAnswer);
			var optionButton = "";
			if(qtd.optionType == "单选")
				optionButton = "radio";
			else if(qtd.optionType == "多选")
				optionButton = "checkbox";
			for(var j=0;j<optionArray.length;j++){
				var dataObj = optionArray[j];
				var html3="<div style='margin:10px;display:inline-block; *display:inline; *zoom:1;vertical-align:top;width:"+divWidth+"px;'>";
				html3 += "<label style='float:left;'><input type='"+optionButton+"' name='answerOption' value='"+ dataObj.name+"'/>&nbsp;"+ dataObj.name+".&nbsp;</label>";
				html3 += "<div style='float:right;width:"+contentWidth+"px;'>"+dataObj.content+"</div></div>";
				$("#qDiv_"+i).append(html3);
			}
		}
		$("#qtdDiv_"+ tOrder).append("<div class='divide'></div>");
	}
	$( "#examPaperViewDialog" ).dialog( "open" );
}

//查看试题类型信息
function checkQuestionTypeDetail(data){
	$("#questionTypeDetailList").jqGrid({  
		url:"/DRTS/exam/questionTypeDetail_detailList.action",
		mtype : "post",
		datatype : "json",
		postData: { examPaper: data },
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
					 {name : "questionCount",index : "questionCount",label : "所含试题数",width : 50,align:'center'}, 
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
	$( "#examPaperDialog" ).dialog( "open" );
}

//删除试题类型详细信息
function delQuestionTypeDetail(id) {
	$("#questionTypeDetailList").jqGrid("delRowData", id);
}

//确认删除
function delExamPaperCF(id) {
	confirmJQ("删除后无法恢复，确认删除？",delExamPaper,id);
}

//删除试卷生成策略
function delExamPaper(id) {
	$('#activity_pane').showLoading();
	
	$.post("/DRTS/exam/examPaper_deleteExamPaper.action",{id:id},function(data){
		$('#activity_pane').hideLoading();
		
	 	if(data.result == "success") {
	 		alertJQ("操作成功，请等待页面刷新",1000);
			$("#examPaperList").jqGrid("delRowData", id);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
}

//编辑试卷详细信息入口函数
function editExamPaperDetail(){
	$('#activity_pane').showLoading();
	$("#questionTypeDetailList").jqGrid("sortGrid","orderNum",false,'asc');
	//加载试卷详细信息页面
	$("#examPaperDetailDialog").load('/DRTS/exam/exam_paper_detail_edit_dialog.jsp', function(){
		var ids=jQuery("#questionTypeDetailList").jqGrid('getDataIDs');
		for(var i=0; i<ids.length; i++){
			var id=ids[i];
			var tOrder= padLeft($("#questionTypeDetailList").getCell( id,'orderNum'),2);
			var questionType = $("#questionTypeDetailList").getCell( id,'questionType');
			var questionTypeName = $("#questionTypeDetailList").getCell( id,'questionTypeName');
			var questionTypeScore =  $("#questionTypeDetailList").getCell( id,'score');
			$( "#examPaperDetailTabs ul").append("<li><a href='#qtTab_"+tOrder+"'>"+ questionTypeName +"</a></li>");
			var html = "<div id='qtTab_"+tOrder+"'><div class='clear'></div><div class='portlert-form-list'>";
			html += "<table class='question_table' id='questionTable_" + tOrder + "' name='questionTable'>";
			html += "<tr><th colspan='4'>"+ num2Chinese(tOrder) +"、"+questionTypeName+"：";
			html += "(共:<label id='questionTypeScore_"+tOrder+"'>"+ questionTypeScore +"</label>分)";
			html += "<input type='hidden' id='questionTypeDetail_"+tOrder+"' value='"+id+"'/></th></tr></table></div></div>";
			$( "#examPaperDetailTabs").append(html);
			
			var number = $("#questionTypeDetailList").getCell( id,5);
			for ( var j=1;j<=number;j++){
				var qOrder = padLeft(j,3);
				var dataObj = new Object();
				dataObj.questionType = questionType;
				dataObj.tOrder = tOrder;
				dataObj.qOrder = qOrder;
				var html2 = "<tr><td><input type='hidden' id='question_id_"+tOrder+"_"+qOrder+"' name='question_id'/>&nbsp;<label id='question_orderNum_"+tOrder+"_"+qOrder+"'>"+ j +"</label>.</td>";
				html2 += "<td><input class='portlert-form-input-field' id='question_abstracts_"+tOrder+"_"+qOrder+"' name='question_abstracts' style='width:400px;'/><input type='hidden' id='question_num_"+tOrder+"_"+qOrder+"' name='question_num'/></td>";
				html2 += "<td>分值:<input class='portlert-form-input-field' id='question_score_"+tOrder+"_"+qOrder+"' name='question_score' style='width:40px;text-align:center;' value='"+questionTypeScore/number+"' onblur='validateScore("+tOrder+","+qOrder+")'/>分</td>";
				html2 += "<td><img src='/DRTS/images/modify.png' title='选择试题' style='cursor:pointer;margin-top:5px;' onclick='selectQuestion("+JSON.stringify(dataObj)+");'/>&nbsp;&nbsp;<span id='span_"+tOrder+"_"+qOrder+"' class='portlert-form-msg-alert'>&nbsp;</span></td></tr>";
				$("#questionTable_"+tOrder).append(html2);
			}
		}
		//如果操作不是新增
		if(operationFlag != "add"&&epdArray !=undefined){
			for(var i=0;i<epdArray.length;i++){
				var orderNum = epdArray[i].orderNum;
				$("#question_id_"+orderNum).val(epdArray[i].id);
				$("#question_abstracts_"+orderNum).val(epdArray[i].abstracts);
				$("#question_num_"+orderNum).val(epdArray[i].question);
				$("#question_score_"+orderNum).val(epdArray[i].score);
			}
		}
		$( "#examPaperDetailTabs" ).tabs();
		$( "#examPaperDetailTabs" ).css('height','auto');
		$('#activity_pane').hideLoading();
		$("#examPaperDetailDialog").dialog( "open" );
	});
}

//编辑试卷详细信息出口
function editExamPaperDetailOut(){
	//试题分值校验
	var validateFlag = true;
	$("#examPaperDetailTabs [name=questionTable]").each(function(){
		var tOrder = $(this).attr('id').substring($(this).attr('id').lastIndexOf("_")+1);
		$(this).find("[name=question_score]").each(function(){
			var qOrder = $(this).attr('id').substring($(this).attr('id').lastIndexOf("_")+1);
			if(validateScore(tOrder,qOrder) == false){
				validateFlag = false;
				return false;
			}
		});
		if(validateFlag == false)
			return false;
	});
	if(validateFlag == false)
		return;
	var	questionArray =[];
	$("#examPaperDetailTabs [name=questionTable]").each(function(){
		var tOrder = $(this).attr('id').substring($(this).attr('id').lastIndexOf("_")+1);
		$(this).find("[name=question_num]").each(function(){
			if(this.value!=""){
				var qId = $(this).parent().prev().find("[name=question_id]").val();
				var qAbstracts = $(this).prev().val();
				var qOrder = $(this).attr('id').substring($(this).attr('id').lastIndexOf("_")+1);
				var qScore = $(this).parent().next().find("[name=question_score]").val();
				var question = new Object();
				question.id = qId;
				question.abstracts =  qAbstracts;
				question.orderNum = tOrder+"_"+qOrder;
				question.question = this.value;
				question.score = qScore;
				questionArray.push(question);
			}
		});
	});
	
	disableButton();
 	$('#activity_pane').showLoading();
	if(operationFlag == "add"){
		$("#add_questions").val(JSON.stringify(questionArray));
		//采用ajax提交表单
		$("#addExamPaperForm").ajaxSubmit({
			url:"/DRTS/exam/examPaper_addExamPaperOut.action",
			success:addExamPaperOutCB //成功增加的回调函数
		});
	}else if(operationFlag == "create"){
		$("#examPaperDetailTabs [name=question_id]").each(function(){
			$(this).val("");
		});
		$("#add_questions").val(JSON.stringify(questionArray));
		//采用ajax提交表单
		$("#addExamPaperForm").ajaxSubmit({
			url:"/DRTS/exam/examPaper_addExamPaperOut.action",
			success:addExamPaperOutCB //成功增加的回调函数
		});
	}else if(operationFlag == "modify"){
		$("#modify_questions").val(JSON.stringify(questionArray));
		//采用ajax提交表单
		$("#modifyExamPaperForm").ajaxSubmit({
			url:"/DRTS/exam/examPaper_modifyExamPaperOut.action",
			success:modifyExamPaperOutCB //成功增加的回调函数
		});
	}
}

//var questionType ;
var typeOrderNum ;
var questionOrderNum;
//编辑选择试题
function selectQuestion(dataObj){
	$('#activity_pane').showLoading();
	var questionType = dataObj.questionType;
	typeOrderNum = dataObj.tOrder;
	questionOrderNum = dataObj.qOrder;
	var examScope = $("#examPaperTab [name='examScope']").val();
	//加载试题列表页面
	$( "#questionDialog" ).load('/DRTS/exam/exam_question_list_dialog.jsp', function(){
		$("#questionList").jqGrid({  
    		url:'/DRTS/question/question_questionList.action',
    		mtype : "post",
    		datatype : "json",
    		postData: { chapters: examScope,questionType:questionType,applyScopt:'考试'},
			width:'800',
	 	    height:'auto',
	 	    autowidth:false,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [ {name:"setup",label : "选择",width:30,sortable:false,align:'center'},
						/*{name : "num",index : "num",label : "试题编号",width : 50,align:'center',hidden:true}, */
			             {name : "abstracts",index : "abstracts",label : "试题摘要",width : 400,align:'center'},
			             {name : "level",index : "level",label : "难度",width : 40,align:'center'},
						 {name : "designer",index : "designer",label : "设计人",width : 60,align:'center'},
						 {name : "setupTime",index : "setupTime",label : "添加时间",width : 150,align:'center'},
						 ],
			pager : "#questionListPager",
			rowNum:10,
	 	    rowList:[10,20,30],
			sortname:'num',
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
	 	       	id:"num",
	 	        repeatitems : false
			},
			gridComplete:function(){  //在此事件中循环为每一行添加修改和删除链接	     	
				var ids=$(this).jqGrid('getDataIDs');
				for(var i=0; i<ids.length; i++){
					var id=ids[i];
					var setupstr = "<input type='radio' id='questionRadio_"+id+"' name='questionRadio' value='"+id+"'/>";
					$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
				}
			},
			onSelectRow: function(id){ 
				$("#questionList #questionRadio_"+id).attr("checked","checked");
		   	}
		});
		//日期控件初始化
		initCustomerDatepicker(new Array("question_startTime","question_endTime"),"yy-mm-dd","hh:mm:ss");
		//sider初始化
		$('#question_slider').slider({  
        disabled:false,   //是否可用，true不可用  false即可用的  
        animate:true,   //代表是采用动画效果  
        max:5,          //滑块的最大值是100  
        min:0,             //滑块的最小值  
        value:0,             //滑块的默认值  
        orientation:'horizontal',   //滑块的方向是垂直的还是水平的  
        values:[0,5],          //初始化滑块的位置 一个是30 一个是80  
        range:true
        });
        
		$('#activity_pane').hideLoading();
		$( "#questionDialog" ).dialog( "open" );
	});
}
//确认是否选择
function selectQuestionCB(){
	var num = $("#questionList [name=questionRadio]:checked").first().val();

	var length = $("#questionTable_" + typeOrderNum +" [name=question_num]").length;
	for(var i=1;i<=length;i++){
		if($("#question_num_"+typeOrderNum+"_"+padLeft(i,3)).val() == num){
			alertJQ("此试题已选择!");
			return;
		}
	}
	$("#question_id_"+typeOrderNum+"_"+questionOrderNum).val("");
	$("#question_num_"+typeOrderNum+"_"+questionOrderNum).val(num);
	var abstracts = $("#questionList").getCell( num,'abstracts');
	$("#question_abstracts_"+typeOrderNum+"_"+questionOrderNum).val(abstracts);
	$( "#questionDialog" ).dialog( "close" );
}

function validateScore(tOrder,qOrder){
	var testValue = $("#question_score_" + tOrder +"_"+qOrder).val();
	if(!/^(-?\d*)(\.\d*)?$/.test(testValue)){
		$("#span_" + tOrder +"_"+qOrder).html("请输入数字");
		return false;
	}
	if(testValue<0){
		$("#span_" + tOrder +"_"+qOrder).html("不能为负数");
		return flase;
	}
	var totalScore = 0;
	$("#questionTable_" + tOrder +" [name=question_score]").each(function(){
		totalScore += Number(this.value);
	});
	if(totalScore>$("#questionTypeScore_"+tOrder).html()){
		alertJQ("超出本题型总分值");
		return false;
	}
	$("#span_" + tOrder +"_"+qOrder).html("&nbsp;");
	return true;
}
function padLeft(str,lenght){ 
	if(str.length >= lenght) 
		return str; 
	else 
		return padLeft("0" +str,lenght); 
} 

//自动生成试卷
function generateExamPaper(){
	disableButton();
 	$('#activity_pane').showLoading();
	if(operationFlag == "add"||operationFlag == "create"){
		//采用ajax提交表单
		$("#addExamPaperForm").ajaxSubmit({
			url:"/DRTS/exam/examPaper_generateExamPaper.action",
			success:generateExamPaperCB //成功增加的回调函数
		});
	}else if(operationFlag == "modify"){
		//采用ajax提交表单
		$("#modifyExamPaperForm").ajaxSubmit({
			url:"/DRTS/exam/examPaper_generateExamPaper.action",
			success:generateExamPaperCB //成功增加的回调函数
		});
	}
}

//自动生成试卷回调
function generateExamPaperCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	if(data.result == "success") {
		$("#examPaperDetailTabs [name=question_id]").each(function(){
			$(this).val("");
		});
		$("#examPaperDetailTabs [name=question_num]").each(function(){
			$(this).val("");
		});
		$("#examPaperDetailTabs [name=question_abstracts]").each(function(){
			$(this).val("");
		});
		epdArray = data.epdList;
		for(var i=0;i<epdArray.length;i++){
			var epd = epdArray[i];
			$("#question_num_"+epd.orderNum).val(epd.question);
			$("#question_abstracts_"+epd.orderNum).val(epd.abstracts);
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}
//查询试卷
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
	postData = $.extend($("#examPaperList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#examPaperList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#examPaperList").trigger("reloadGrid", [{page:1}]);
}

//查询试题
function queryQuestion(){
	var num = $("#question_num").val();
	var abstracts = $("#question_abstracts").val();
	var startLevel = $("#question_slider").slider('values', 0);
	var endLevel = $("#question_slider").slider('values', 1);
	var startTime = $("#question_startTime").val();
	var endTime = $("#question_endTime").val();
	var designer = $("#question_designer").val();
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
		abstracts:abstracts,
		startLevel:startLevel,
		endLevel:endLevel,
		startTime:startTime,
		endTime:endTime,
		designer:designer
	};
	//合并数据,extend属性顺序不要搞反了
	postData = $.extend($("#questionList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#questionList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#questionList").trigger("reloadGrid", [{page:1}]);
}
//测试
function test(){
//<input type="button" class="portlert-form-button-disEdit" value="测试" onclick="javascirpt:test()"/>

}
