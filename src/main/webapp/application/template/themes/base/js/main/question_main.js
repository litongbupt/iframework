//页面加载时初始化函数
$(function() {
	//权限验证
	if(validateRole('activity_pane','0,1')== false){
		$(".content").empty();
		return;
	}
	//主页面表格
	// 配置jqGrid组件  
    $("#questionList").jqGrid({  
    		url:'/DRTS/question/question_questionList.action',
    		mtype : "post",
    		datatype : "json",
			width:'100%',
	 	    height:'auto',
	 	    autowidth:true,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [ /*{name : "id",index : "id",label : "试题类型ID",width : 50,align:'center'},*/ 
			             {name : "abstracts",index : "abstracts",label : "试题摘要",width : 250,align:'center'},
			             {name : "questionType",index : "questionType",label : "试题类型",width : 50,align:'center'},
						 {name : "applyScope",index : "applyScope",label : "应用范围",width : 50,align:'center'},
						 {name : "level",index : "level",label : "试题难度",width : 50,align:'center'},
						 {name : "setupTime",index : "setupTime",label : "添加时间",width : 100,align:'center'},
						 {name : "available",index : "available",label : "是否启用",width : 50,align:'center'},
						 {name:"setup",label : "配置",width:60,sortable:false,align:'center'}
						 ],
			pager : "#questionListPager",
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
					var setupstr = "<img id='" + id + "' src='/DRTS/images/user_modify.gif' title='修改' style='cursor:pointer;' onclick='modifyQuestionIn(this.id);'/>&nbsp;&nbsp;";
		    		setupstr += "<img id='" + id + "' src='/DRTS/images/user_check.gif' title='详细信息' style='cursor:pointer;' onclick='checkQuestion(this.id);'/>&nbsp;&nbsp;";
		    		setupstr += "<img id='" + id + "' src='/DRTS/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delQuestionCF(this.id);'/>&nbsp;&nbsp;";
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
    max:5,          //滑块的最大值是100  
    min:0,             //滑块的最小值  
    value:0,             //滑块的默认值  
    orientation:'horizontal',   //滑块的方向是垂直的还是水平的  
    values:[0,5],          //初始化滑块的位置 一个是30 一个是80  
    range:true
    });
	
	//加载试题类型下拉框值
	$.post("/DRTS/question/question_addQuestionIn.action",function(data){
		formLoadData("query_form",data);
	});
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
			onClick: onClick
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
		$.fn.zTree.init($("#chapter_tree"), setting, data);
		
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
});

function onClick(e, treeId, treeNode) {
	if(treeNode.type == 'CHAPTER'){
		$("#query_chapterName").val(treeNode.name);
		$("#query_chapter").val(treeNode.num);
	}
}

function showChapterTree() {
	var cityObj = $("#query_chapterName");
	var cityOffset = $("#query_chapterName").offset();
	$("#chapterTreeDiv").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}

function hideChapterTree() {
	$("#chapterTreeDiv").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
	if (!(event.target.id == "query_chapterName" || event.target.id == "chapterTreeDiv" || $(event.target).parents("#chapterTreeDiv").length>0)) {
		hideChapterTree();
	}
}

var selectId = "";
//保存当前选择的节点
var currentNode;
//保存多选框控件Id
var multiSelectId;
//保存树Id
var selectTreeId;
//保存题型类别
var category;
//保存选项类型
var optionType;
//计数器
var count = 0;

//新增试题入口函数
function addQuestionIn(){
    $('#activity_pane').showLoading();
	$("#questionDialog").dialog('option', 'title', '新增试题');
	$("#questionDialog").dialog('option','buttons',{
		"确定" : addQuestionOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	selectId = $("#questionList").jqGrid("getGridParam", "selrow");
	//加载页面
	$( "#questionDialog" ).load('/DRTS/question/question_add_dialog.jsp', function(){
	 	//弹窗里面的tab定义
		$( "#questionTabs" ).tabs();
		$( "#questionTabs" ).css('height','auto');
		//获取课程树
	    getCourseTree();
		//加载试题类型下拉框值
		$.post("/DRTS/question/question_addQuestionIn.action",function(data){
			formLoadData("addQuestionForm",data);
		});
		$("#add_description").ckeditor();
		$("#add_standAnswer").ckeditor({height : '200',toolbar : 'AnswerToolbar'});
		count = 0;
		//注册新增表单验证
		$("#addQuestionForm").validate({
			ignore: "", // 开启hidden验证
			rules:{
				num:{required:true,maxlength:50,byteRangeLength:[0,50],stringEN:true,
					remote: {   
	    				url: "/DRTS/question/question_validateNum.action",     //后台处理程序   
	    				type: "post",               //数据发送方式
	    				dataType: "json"           //接受数据格式      
					}
				},
				questionType:{required:true},
				designer:{required:true,maxlength:30,byteRangeLength:[0,30]},
				level:{required:true,number:true,min:0,max:5},
				applyScope:{required:true},
				available:{required:true},
				chapter:{required:true},
				abstracts:{required:true},
				optionCols:{digits:true,min:1,max:10}
			},
			onkeyup:false,
			errorPlacement: function(error, element) { //指定错误信息位置
	            error.appendTo(element.parent().children().filter("span"));
	       	},
	       	messages:{
	       		num:{remote:"此试题编号已存在"}
	       	},
	    	submitHandler:function(){ //验证通过后调用此函数
	    		$("input:[name=applyScope_checkbox]:checkbox").each(function(){
	    			$(this).attr( 'disabled', 'disabled' );
	    		});
	    		$("#answer_table :input").each(function(){
	    			$(this).attr( 'disabled', 'disabled' );
	    		});
	    		//禁用按钮
	    	 	disableButton();
	    	 	$('#activity_pane').showLoading();
	    		//采用ajax提交表单
	    		$('#addQuestionForm').ajaxSubmit({
					url:"/DRTS/question/question_addQuestionOut.action",
					success:addQuestionOutCB //成功增加的回调函数
				});
	    	}
		});
		//注册增加用户ajax表单
		$("#addQuestionForm").ajaxForm();
		$('#activity_pane').hideLoading();
		$( "#questionDialog" ).dialog( "open" );
	});
}	
	
//新增试题出口
function addQuestionOut(){
	var selStr = "";
 	$("#examScope_select").find("option").each(function(){
 		selStr += this.value + ",";
	});
	$("#add_chapter").val(selStr);
	var checkVal = [];
	$("input:[name=applyScope_checkbox]:checkbox:checked").each(function(){
		checkVal.push(this.value);
	});
	$("#add_applyScope").val(checkVal.join(","));
	if($("#add_description").val() == ""){
		alertJQ("请输入试题描述！");
		return;
	}
	else
		$("#add_abstracts").val(CKEDITOR.instances.add_description.document.getBody().getText());
	if(category == "客观题"){
		var answerArray=new Array();//数组
		for (var i=1; i < $("#answer_table tr").length; i++) {//遍历每行
			var answerObj = new Object();
			answerObj.name = $("#answer_name_"+i).val();
			if(answerObj.name == ""){
				$("#answer_name_"+i).parent().children().filter("span").html("必填字段");
				return;
			}
			else
				$("#answer_name_"+i).parent().children().filter("span").html("&nbsp;");

			answerObj.content = $("#answer_content_"+i).val();
			answerArray.push(answerObj);
		}			
		if($("#answer_table tr").length>1){
			var answerOption = [];
			$("input:[name=answer_option]:checkbox:checked").each(function(){
				answerOption.push($("#answer_name_"+this.value).val());
			});
			if(answerOption.length == 0){
				alertJQ("请选择标准答案");
				return;
			}else{
				if(answerOption.length>1 && optionType == "单选"){
					alertJQ("本题型只能选择一个标准答案");
					return;
				}
				$("#add_answerOption").val(answerOption.join(","));	
			}
				
			$("#add_standAnswer").val(JSON.stringify(answerArray));
		}
	}else if(category == "主观题")
		$("#add_answerOption").val("");
	$("#questionTabs").tabs( 'select' , 0);
	$("#addQuestionForm").submit();
}

//新增试题出口回调函数
function addQuestionOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var question = data.question;
	if(data.result == "success") {
		$("#questionDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		
		if(selectId){
			$("#questionList").jqGrid("addRowData", question.num, question, "before", selectId);
		}else {
			$("#questionList").jqGrid("addRowData", question.num, question, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//修改试题入口函数
function modifyQuestionIn(num){
 	$('#activity_pane').showLoading();
	$("#questionDialog").dialog('option', 'title', '修改试题');
	$("#questionDialog").dialog('option','buttons',{
		"确定" : modifyQuestionOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	selectId = num;

	//加载基本信息页面
	$( "#questionDialog" ).load('/DRTS/question/question_modify_dialog.jsp', function(){
		$.post("/DRTS/question/question_modifyQuestionIn.action",{num:num},function(data){
			if(data.result == "success") {
				modifyQuestionInCB(data);
			}else if(data.result == "failure") {
				$('#activity_pane').hideLoading();
				alertJQ(data.resultInfo);
			}
		});
	});
}

//修改试卷生成策略入口回调
function modifyQuestionInCB(data){
	//初始化答案区
	loadAnswerZone(data.mainData.questionType,false,data.mainData.standAnswer,data.mainData.answerOption);
	delete data.mainData.standAnswer;
	delete data.mainData.answerOption;
	//为表单加载数据
	formLoadData("modifyQuestionForm",data);
	var applyScopeArray = $("#modify_applyScope").val().split(',');
	for(var i=0;i<applyScopeArray.length;i++){
		if(applyScopeArray[i] == "练习")
			 $("#modify_applyScope1").attr('checked','checked');
		else if(applyScopeArray[i] == "考试")
			 $("#modify_applyScope2").attr('checked','checked');
	}
	//获取课程树
	getCourseTree();
	//初始化编辑器
	$("#modify_description").ckeditor();
	$("#modify_standAnswer").ckeditor({height : '200',toolbar : 'AnswerToolbar'});
	//弹窗里面的tab定义
	$( "#questionTabs" ).tabs();
	$( "#questionTabs" ).css('height','auto');
	//注册新增表单验证
	$("#modifyQuestionForm").validate({
		ignore: "", // 开启hidden验证
		rules:{
			questionType:{required:true},
			designer:{required:true,maxlength:30,byteRangeLength:[0,30]},
			level:{required:true,number:true,min:0,max:5},
			applyScope:{required:true},
			available:{required:true},
			chapter:{required:true},
			abstracts:{required:true},
			optionCols:{digits:true,min:1,max:10}
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
            error.appendTo(element.parent().children().filter("span"));
       	},
       
    	submitHandler:function(){ //验证通过后调用此函数
    		$("input:[name=applyScope_checkbox]:checkbox").each(function(){
    			$(this).attr( 'disabled', 'disabled' );
    		});
    		$("#answer_table :input").each(function(){
    			$(this).attr( 'disabled', 'disabled' );
    		});
    		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$('#modifyQuestionForm').ajaxSubmit({
				url:"/DRTS/question/question_modifyQuestionOut.action",
				success:modifyQuestionOutCB //成功增加的回调函数
			});
    	}
	});
	//注册增加用户ajax表单
	$("#modifyQuestionForm").ajaxForm();
	$('#activity_pane').hideLoading();
	$( "#questionDialog" ).dialog( "open" );
}

//修改试题出口
function modifyQuestionOut(){
 	var selStr = "";
 	$("#examScope_select").find("option").each(function(){
 		selStr += this.value + ",";
	});
	$("#modify_chapter").val(selStr);
	var checkVal = [];
	$("input:[name=applyScope_checkbox]:checkbox:checked").each(function(){
		checkVal.push(this.value);
	});
	$("#modify_applyScope").val(checkVal.join(","));
	if($("#modify_description").val() == ""){
		alertJQ("请输入试题描述！");
		return;
	}
	else
		$("#modify_abstracts").val(CKEDITOR.instances.modify_description.document.getBody().getText());
	if(category == "客观题"){
		var answerArray=new Array();//数组
		for (var i=1; i < $("#answer_table tr").length; i++) {//遍历每行
			var answerObj = new Object();
			answerObj.name = $("#answer_name_"+i).val();
			if(answerObj.name == ""){
				$("#answer_name_"+i).parent().children().filter("span").html("必填字段");
				return;
			}
			else
				$("#answer_name_"+i).parent().children().filter("span").html("&nbsp;");
			answerObj.content = $("#answer_content_"+i).val();
			answerArray.push(answerObj);
		}
		if($("#answer_table tr").length>1){
			var answerOption = [];
			$("input:[name=answer_option]:checkbox:checked").each(function(){
				answerOption.push($("#answer_name_"+this.value).val());
			});
			if(answerOption.length == 0){
				alertJQ("请选择标准答案");
				return;
			}else{
				if(answerOption.length>1 && optionType == "单选"){
					alertJQ("本题型只能选择一个标准答案");
					return;
				}
				$("#modify_answerOption").val(answerOption.join(","));
			}
			$("#modify_standAnswer").val(JSON.stringify(answerArray));
		}
	}else if(category == "主观题")
		$("#modify_answerOption").val("");
	$("#questionTabs").tabs( 'select' , 0);
	$("#modifyQuestionForm").submit();
}


//修改试卷生成策略出口回调函数
function modifyQuestionOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var question = data.question;
	if(data.result == "success") {
		$("#questionDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		
		if(selectId){
			$("#questionList").jqGrid("setRowData", question.num, question, "before", selectId);
		}else {
			$("#questionList").jqGrid("setData", question.num, question, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//查看试题函数
function checkQuestion(num){
 	$('#activity_pane').showLoading();
	$("#questionDialog").dialog('option', 'title', '查看试题详情');
	$("#questionDialog").dialog('option','buttons',{
		"返回" : function() {
			$(this).dialog("close");
		}
	});
	selectId = num;
	//加载基本信息页面
	$( "#questionDialog" ).load('/DRTS/question/question_check_dialog.jsp', function(){
	
		$.post("/DRTS/question/question_checkQuestion.action",{num:num},function(data){
			//为表单加载数据
			formLoadData("checkQuestionForm",data);
			checkQuestionCB(data);
		});
		//弹窗里面的tab定义
		$( "#questionTabs" ).tabs();
		$( "#questionTabs" ).css('height','auto');
		$('#activity_pane').hideLoading();
		$( "#questionDialog" ).dialog( "open" );
		
	});
}

function checkQuestionCB(data){
 	var description = $("#check_description").val();
 	$("#check_questionDiv").append(description);
 	var optionCols = $("#check_optionCols").val();
 	
	var standAnswer = $("#check_standAnswer").val();
	var questionType= $("#check_questionType").val();
	$.post("/DRTS/question/questionType_modifyQuestionTypeIn.action",{id:questionType},function(data){
		$("#check_questionType").val(data.mainData.name);
	
		switch (data.mainData.category){
			 case '客观题':
				var divWidth = $("#check_answerDiv").width()/optionCols-20;
				var contentWidth = divWidth-20;
				var answerArray = JSON.parse(standAnswer);
				for(var i=0;i<answerArray.length;i++){
					var dataObj = answerArray[i];
					var html="<div style='margin:10px;display:inline-block; *display:inline; *zoom:1;vertical-align:top;width:"+divWidth+"px;'>";
					html += "<div style='float:left;'>"+ dataObj.name+".&nbsp;</div><div style='float:right;width:"+contentWidth+"px;'>"+dataObj.content+"</div></div>";
					$("#check_answerDiv").append(html);
				}
				$("#subjectiveDiv").css('display','');
				$("#standAnswer_label").html('选项：');
				break;
			case '主观题':
				$("#check_answerDiv").append(standAnswer);
				break;
		}
	});
}
//确认删除
function delQuestionCF(id) {
	confirmJQ("删除后无法恢复，确认删除？",delQuestion,id);
}

//删除试题
function delQuestion(id) {
	$('#activity_pane').showLoading();
	
	$.post("/DRTS/question/question_deleteQuestion.action",{id:id},function(data){
		$('#activity_pane').hideLoading();
		
	 	if(data.result == "success") {
	 		alertJQ("操作成功，请等待页面刷新",1000);
			$("#questionList").jqGrid("delRowData", id);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
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

//根据题型加载答案录入区
function loadAnswerZone(id,flag,standAnswer,answerOption){
	if(id==""){
		category = "";
		optionType = "";
		$("#subjective").css('display', 'none');
		$("#objective").css('display', 'none');	
	}else{
		$.post("/DRTS/question/questionType_modifyQuestionTypeIn.action",{id:id},function(data){
			category = data.mainData.category;
			optionType = data.mainData.optionType;
			switch(category){
				case '客观题':
					$("#subjective").css('display', 'none');
					if(flag)
						for (var i=$("#answer_table tr").length-1; i >0; i--) {//遍历每行
							$("#answer_table tr").eq(i).remove();
						}
					else{
						var answerArray = JSON.parse(standAnswer);
						var optionArray = answerOption.split(',');
						count = 0;
						for(var i=0;i<answerArray.length;i++){
							var dataObj = answerArray[i];
							addAnswer();
							$("#answer_table #answer_name_"+count).val(dataObj.name);
							$("#answer_table #answer_content_"+count).val(dataObj.content);
							
							for(var j=0;j<optionArray.length;j++){
								if(dataObj.name == optionArray[j]){
									$("#answer_table #answer_option_"+count).attr('checked','checked');
									break;
								}
							}
						}
					}
					$("#objective").css('display', '');
					var clientHeight = document.documentElement.clientHeight-200;
					$("#answerTab .section-content").css('max-height', clientHeight);
					break;
				case '主观题':
					$("#objective").css('display', 'none');
					if(flag)
						$("#subjective [name='standAnswer']").val("");
					else
						$("#subjective [name='standAnswer']").val(standAnswer);
					$("#subjective").css('display', '');
					break;
			}
		});
	}
}

//增加备选答案选项
function addAnswer(){
	count ++;
	$("#answer_table").append("<tr id='answer_table_tr_" + count + "'></tr>");
	var html = "<td><input type='text' id='answer_name_"+count+"' name='answer_name' style='width:50px;text-align:center;'/>";
	html += "<br/><span style='color:red;'>&nbsp;</span></td>";
	html += "<td><textarea id='answer_content_"+count+"' name='answer_content'></textarea></td>";
	html += "<td><input type='checkbox' id='answer_option_"+count+"' name='answer_option' value='"+count+"'/></td>";
	html += "<td><img src='/DRTS/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delAnswer("+count+");'/></td>";
	$("#answer_table_tr_" + count).append(html);
	
	$("#answer_content_"+count).ckeditor({height : '100',toolbar : 'AnswerToolbar'});
}

//删除备选答案选项
function delAnswer(data){
	$("#answer_table_tr_"+data).remove();
}

//批量导入入口
function importQuestion(){
	//加载页面
 	$( "#importDialog" ).load('/DRTS/question/question_import_dialog.jsp', function(data){
		//表单验证注册
		$("#importQuestionForm").validate({
			rules:{
				questionExcel:{required:true,excelValidate:true}
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
	    		$('#importQuestionForm').ajaxSubmit({
					url:"/DRTS/question/question_validateExcel.action",
					dataType: 'json',//返回值类型 一般设置为json
					success:validateExcelCB //成功增加的回调函数
				});
	    	}
		});
		
		$("#importQuestionForm").ajaxForm();
 	});
	
	$("#importDialog").dialog("open");
}

//校验
function validateExcel(){
	$("#import_valiinfo").html("&nbsp;");
	$("#importQuestionForm").submit();
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
		$.post("/DRTS/question/question_importExcel.action", function(data){
			//启用按钮
			enableButton();
			$('#activity_pane').hideLoading();
			if(data.result == "success") {
				$("#importDialog").dialog("close");
				$("#questionList").trigger("reloadGrid");
				alertJQ(data.resultInfo,2500);
			}else if(data.result == "failure") {
				alertJQ(data.resultInfo);
			}
		});
	}
}

//查询试题
function query(){
	var num = $("#query_num").val();
	var abstracts = $("#query_abstracts").val();
	if($("#query_chapterName").val() == "")
		$("#query_chapter").val("");
	var chapter = $("#query_chapter").val();
	var questionType = $("#query_questionType").val();
	var available = $("#query_available").val();
	var startLevel = $("#query_slider").slider('values', 0);
	var endLevel = $("#query_slider").slider('values', 1);
	var checkVal = [];
	$("input:[name=query_applyScope]:checkbox:checked").each(function(){
		checkVal.push(this.value);
	});
	var applyScope = checkVal.join(",");
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
		abstracts:abstracts,
		chapter:chapter,
		questionType:questionType,
		available:available,
		startLevel:startLevel,
		endLevel:endLevel,
		applyScope:applyScope,
		startTime:startTime,
		endTime:endTime
		
	};
	//合并数据,extend属性顺序不要搞反了
	postData = $.extend($("#questionList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#questionList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#questionList").trigger("reloadGrid", [{page:1}]);
}