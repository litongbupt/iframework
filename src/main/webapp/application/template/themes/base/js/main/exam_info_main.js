//页面加载时初始化函数
$(function() {
	//权限验证
	if(validateRole('activity_pane','0,1')== false){
		$(".content").empty();
	}
	//主页面表格
	// 配置jqGrid组件  
    $("#examInfoList").jqGrid({  
    		url:'/DRTS/exam/examInfo_examInfoList.action',
    		mtype : "post",
    		datatype : "json",
			width:'100%',
	 	    height:'auto',
	 	    autowidth:true,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [  
						 {name : "name",index : "name",label : "考试名称",width : 200,align:'center'},
						 {name : "type",index : "type",label : "考试类型",width : 50,align:'center'}, 
						 {name : "startTime",index : "startTime",label : "考试开始时间",width : 100,align:'center'}, 
						 {name : "timeLimit",index : "timeLimit",label : "考试时长",width : 80,align:'center'}, 
						 {name : "available",index : "available",label : "是否有效",width : 50,align:'center'},
						 {name:"setup",label : "配置",width:80,sortable:false,align:'center'}
						 ],
			pager : "#examInfoListPager",
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
					var setupstr = "<img id='" + id + "' src='/DRTS/images/user_modify.gif' title='修改' style='cursor:pointer;' onclick='modifyExamInfoIn(this.id);'/>&nbsp;&nbsp;";
		    		    setupstr += "<img id='" + id + "' src='/DRTS/images/user_check.gif' title='详细信息' style='cursor:pointer;' onclick='checkExamInfo(this.id);'/>&nbsp;&nbsp;";
		    		    setupstr += "<img id='" + id + "' src='/DRTS/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='deleteExamInfoCF(this.id);'/>";
		    		    $(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
				}
				var bodyObj=document.getElementById('main-content');
				if(bodyObj.scrollHeight>bodyObj.clientHeight||bodyObj.offsetHeight>bodyObj.clientHeight){
					$("#main-content .toolBar").css('width',$(this).width()-10);
				}
			}
	});
    
    //日期控件初始化
	initCustomerDatepicker(new Array("query_startTime","query_endTime"),"yy-mm-dd","hh:mm");
	
   	//考试信息对话框
 	$( "#examInfoDialog" ).dialog({
 		autoOpen: false,
 		width: '660',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		close:function(){
 			$( this ).empty();
 		}
 	});
 	//试卷对话框
 	$( "#examPaperDialog" ).dialog({
 		autoOpen: false,
 		width: '800',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		buttons:{
		"确定" : selectExamPaperCB,
		"取消" : function() {
				$(this).dialog("close");
			}
		},
 		close:function(){
 			$( this ).empty();
 		}
 	});
 	//考试信息对话框
 	$( "#paperTacticDialog" ).dialog({
 		autoOpen: false,
 		width: '800',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		buttons:{
		"确定" : selectPaperTacticCB,
		"取消" : function() {
				$(this).dialog("close");
			}
		},
 		close:function(){
 			$( this ).empty();
 		}
 	});
});

//保存当前选择的行Id
var selectId = "";
//保存当前选择的节点
var currentNode;
//保存多选框控件Id
var multiSelectId;
//保存树Id
var selectTreeId;

//新增考试信息入口函数
function addExamInfoIn(){
	$('#activity_pane').showLoading();
	$("#examInfoDialog").dialog('option', 'title', '新增考试信息');
	$("#examInfoDialog").dialog('option','buttons',{
		"确定" : editExamInfoOut,
		"取消" : function() {
				$(this).dialog("close");
			}
	});
	selectId = $("#examInfoList").jqGrid("getGridParam", "selrow");
	//加载页面
	$( "#examInfoDialog" ).load('/DRTS/exam/exam_info_edit_dialog.jsp', function(){
		//为表单加载数据
		$.post("/DRTS/exam/examInfo_addExamInfoIn.action",function(data){
			formLoadData("editExamInfoForm",data);
		});
		//id禁止
		$("#edit_id").attr( 'disabled', 'disabled' );
		//时间控件初始化
		$("#edit_timeLimit").timepicker({
	        timeFormat: 'HH小时mm分',//时间模式     
	        stepHour: 1,//拖动时间时的间隔     
	        stepMinute: 5,//拖动分钟时的间隔
		    hourGrid: 4,
		    minuteGrid: 10,
		    showButtonPanel: false
		});
		//日期控件初始化
		initCustomerDatepicker(new Array("edit_startTime"),"yy-mm-dd","HH:mm");
	
		//多选框初始化
		initMultiSelect();
		//注册新增表单验证
		$("#editExamInfoForm").validate({
			ignore: "", // 开启hidden验证
			rules:{
				name:{required:true,maxlength:50,byteRangeLength:[0,50],
					remote: {   
	    				url: "/DRTS/exam/examInfo_validateName.action",     //后台处理程序   
	    				type: "post",               //数据发送方式
	    				dataType: "json"           //接受数据格式      
					}
				},
				available:{required:true},
				startTime:{dateTime:true},
				timeLimit:{required:true,isTime:true},
				type:{required:true},
				examUserScope:{required:true},
				description:{maxlength:255,byteRangeLength:[0,255]}
			},
			onkeyup:false,
			errorPlacement: function(error, element) { //指定错误信息位置
	           	element.parent().children().filter("span").append("<br/>");
      			error.appendTo(element.parent().children().filter("span"));
	       	},
	       	messages:{
	       		name:{
	       			remote:"此考试名称已存在"
	       		}
	       	},
	    	submitHandler:function(){ //验证通过后调用此函数
	    		$("#edit_examPaperName").attr('disabled','disabled');
	    		$("#edit_paperTacticName").attr('disabled','disabled');
	    		//禁用按钮
	    	 	disableButton();
	    	 	$('#activity_pane').showLoading();
	    		//采用ajax提交表单
	    		$('#editExamInfoForm').ajaxSubmit({
					url:"/DRTS/exam/examInfo_addExamInfoOut.action",
					success:addExamInfoOutCB //成功增加的回调函数
				});
				
	    	}
		});
		//注册增加用户ajax表单
		$("#editExamInfoForm").ajaxForm();
		$('#activity_pane').hideLoading();
		$( "#examInfoDialog" ).dialog( "open" );
	});
}

//编辑考试信息出口
function editExamInfoOut(){
 	var selStr = "";
	$("#organSelectR").find("option").each(function(){
		selStr += this.value + ",";
	});
	$("#edit_examUserScope").val(selStr);
	if($("#edit_type").val() == "统考"){
		if($("#edit_examPaper").val() == ""){
			$("#edit_examPaper").next().html("<br/>请选择试卷");
		return;
		}else
			$("#edit_examPaper").next().html("&nbsp;");
	}
	else if($("#edit_type").val() == "非统考"){
		if($("#edit_paperTactic").val() == ""){
			$("#edit_paperTactic").next().html("<br/>请选择试卷生成策略");
			return;
		}else
			$("#edit_paperTactic").next().html("&nbsp;");
	}
	$("#editExamInfoForm").submit();
}

//新增考试信息出口回调函数
function addExamInfoOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var examInfo = data.examInfo;
	if(data.result == "success") {
		$("#examInfoDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		if(selectId){
			$("#examInfoList").jqGrid("addRowData", examInfo.id, examInfo, "before", selectId);
		}else {
			$("#examInfoList").jqGrid("addRowData", examInfo.id, examInfo, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}
 
 //修改考试信息入口函数
function modifyExamInfoIn(id){
	$('#activity_pane').showLoading();
	$("#examInfoDialog").dialog('option', 'title', '修改考试信息');
	$("#examInfoDialog").dialog('option','buttons',{
		"确定" : editExamInfoOut,
		"取消" : function() {
				$(this).dialog("close");
			}
	});
	selectId = id;
	//加载基本信息页面
	$( "#examInfoDialog" ).load('/DRTS/exam/exam_info_edit_dialog.jsp', function(){
		$.post("/DRTS/exam/examInfo_modifyExamInfoIn.action",{id:id},function(data){
			if(data.result == "success") {
				modifyExamInfoInCB(data);
			}else if(data.result == "failure") {
				$('#activity_pane').hideLoading();
				alertJQ(data.resultInfo);
			}
		});
	});
}

//修改考试信息入口回调
function modifyExamInfoInCB(data){
	//为表单加载数据
	formLoadData("editExamInfoForm",data);
	//日期控件初始化
	initCustomerDatepicker(new Array("edit_startTime"),"yy-mm-dd","HH:mm");
	//时间控件初始化
	$("#edit_timeLimit").timepicker({
        timeFormat: 'HH小时mm分',//时间模式     
        stepHour: 1,//拖动时间时的间隔     
        stepMinute: 5,//拖动分钟时的间隔
	    hourGrid: 4,
	    minuteGrid: 10,
	    showButtonPanel: false
	});
	//多选框初始化
	initMultiSelect();
	examTypeSelect(data.mainData.type);
	//注册新增表单验证
	$("#editExamInfoForm").validate({
		ignore: "", // 开启hidden验证
		rules:{
			name:{required:true,maxlength:50,byteRangeLength:[0,50],
				remote: {   
    				url: "/DRTS/exam/examInfo_validateName.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json",           //接受数据格式
    				data:{id:selectId}
				}
			},
			available:{required:true},
			startTime:{dateTime:true},
			timeLimit:{required:true,isTime:true},
			type:{required:true},
			examUserScope:{required:true},
			description:{maxlength:255,byteRangeLength:[0,255]}
		},
			onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
	       	element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
       	},
       	messages:{
       		name:{
       			remote:"此名称已存在"
       		}
       	},
    	submitHandler:function(){ //验证通过后调用此函数
    		$("#edit_examPaperName").attr('disabled','disabled');
    		$("#edit_paperTacticName").attr('disabled','disabled');
   	 		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$("#editExamInfoForm").ajaxSubmit({
				url:"/DRTS/exam/examInfo_modifyExamInfoOut.action",
				success:modifyExamInfoOutCB //成功增加的回调函数
			});
    	}
	});
	//注册增加用户ajax表单
	$("#editExamInfoForm").ajaxForm();
	$('#activity_pane').hideLoading();
	$( "#examInfoDialog" ).dialog( "open" );
}

//修改考试信息出口回调函数
function modifyExamInfoOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var examInfo = data.examInfo;
	if(data.result == "success") {
		$("#examInfoDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		if(selectId){
			$("#examInfoList").jqGrid("setRowData",  examInfo.id, examInfo, "before", selectId);
		}else {
			$("#examInfoList").jqGrid("setRowData",  examInfo.id, examInfo, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//查看考试信息函数
function checkExamInfo(id){
	$('#activity_pane').showLoading();
	$("#examInfoDialog").dialog('option', 'title', '查看考试信息');
	$("#examInfoDialog").dialog('option','buttons',{
		"返回" : function() {
			$(this).dialog("close");
		}
	});
	//加载基本信息页面
	$( "#examInfoDialog" ).load('/DRTS/exam/exam_info_check_dialog.jsp', function(){
		$.post("/DRTS/exam/examInfo_checkExamInfo.action",{id:id},function(data){
			formLoadData("checkExamInfoForm",data);
			examTypeSelect(data.mainData.type);
			$('#activity_pane').hideLoading();
			$("#examInfoDialog").dialog("open");
		});
	});
}

//确认删除
function deleteExamInfoCF(id) {
	confirmJQ("删除后无法恢复，确认删除？",deleteExamInfo,id);
}

 //删除考试
 function deleteExamInfo(id) {
	$('#activity_pane').showLoading();
	
	$.post("/DRTS/exam/examInfo_deleteExamInfo.action",{id:id},function(data){
		$('#activity_pane').hideLoading();
		
	 	if(data.result == "success") {
	 		alertJQ("操作成功，请等待页面刷新",1000);
			$("#examInfoList").jqGrid("delRowData", id);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
 }
 
//初始化多选框
function initMultiSelect(){

	var leftSel = $("#organSelectL");
	var rightSel = $("#organSelectR");
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
 }
 
//考试类型选择
function examTypeSelect(data){
	switch(data){
		case '统考':
			$("#typeLabel").html("试卷：");
			$("#tacticDiv").css('display','none');
			$("#paperDiv").css('display','');
			$("#edit_paperTactic").val("");
			$("#startTimeLabel").css('display','');
			$("#startTimeCollection").css('display','');
			break;
		case '非统考':
			$("#typeLabel").html("试卷生成策略：");
			$("#paperDiv").css('display','none');
			$("#tacticDiv").css('display','');
			$("#edit_examPaper").val("");
			$("#startTimeLabel").css('display','none');
			$("#startTimeCollection").css('display','none');
			break;
		default:
			$("#typeLabel").html("");
			$("#paperDiv").css('display','none');
			$("#tacticDiv").css('display','none');
	}
}

//选择试卷
function selectExamPaper(){
	$('#activity_pane').showLoading();
	//加载页面
	$( "#examPaperDialog" ).load('/DRTS/exam/exam_paper_list_dialog.jsp', function(){
		$("#examPaperList").jqGrid({  
			url:"/DRTS/exam/examPaper_examPaperList.action",
			mtype : "post",
			datatype : "json",
			width:'700',
	 	    height:'auto',
	 	   	autowidth:false,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [ 	 {name:"setup",label : "选择",width:50,sortable:false,align:'center'},
			             	 {name : "num",index : "num",label : "试卷编号",width : 100,align:'center',hidden:true}, 
							 {name : "name",index : "name",label : "试卷名称",width : 400,align:'center'},
							 {name : "level",index : "level",label : "试卷难度",width : 80,align:'center'}, 
							 {name : "setupTime",index : "setupTime",label : "添加时间",width : 150,align:'center'}
						 ],
			pager : "#examPaperListPager",
			rowNum:10,
			rowList:[10,20,30],
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
			gridComplete:function(){  //在此事件中循环为每一行添加单选按钮	     	
				var ids=jQuery("#examPaperList").jqGrid('getDataIDs');
					for(var i=0; i<ids.length; i++){
					var id=ids[i];
					var setupstr = "<input type='radio' id='examPaperRadio_"+id+"' name='examPaperRadio' value='"+id+"' onclick='$(\"#examPaperList\").setSelection(this.value, false);'/>";
		    		$(this).jqGrid("setRowData",id,{'setup':setupstr});
				}
			},
			onSelectRow: function(id){ 
				$("#examPaperList #examPaperRadio_"+id).attr("checked","checked");
		   }
		});
		//日期控件初始化
		initCustomerDatepicker(new Array("examPaper_startTime","examPaper_endTime"),"yy-mm-dd","hh:mm:ss");
		//sider初始化
		$('#slider').slider({  
	        disabled:false,   //是否可用，true不可用  false即可用的  
	        animate:true,   //代表是采用动画效果  
	        max:5,          //滑块的最大值是5
	        min:1,             //滑块的最小值  
	        value:1,             //滑块的默认值  
	        orientation:'horizontal',   //滑块的方向是垂直的还是水平的  
	        values:[1,5],          //初始化滑块的位置 一个是1 一个是5
	        range:true
        }); 

		$('#activity_pane').hideLoading();
		$( "#examPaperDialog" ).dialog( "open" );
	});
}
 
//选择试卷之后
function selectExamPaperCB(){
	var num = $("#examPaperList [name=examPaperRadio]:checked").first().val();
	$("#edit_examPaper").val(num);
	var examPaperName = $("#examPaperList").getCell( num,'name');
	$("#edit_examPaperName").val(examPaperName);
	$( "#examPaperDialog" ).dialog( "close" );
}

//选择试卷生成策略
function selectPaperTactic(){
	$('#activity_pane').showLoading();
	//加载页面
	$( "#paperTacticDialog" ).load('/DRTS/exam/exam_paper_tactic_list_dialog.jsp', function(){
		$("#paperTacticList").jqGrid({  
		url:"/DRTS/exam/paperTactic_paperTacticList.action",
		mtype : "post",
		datatype : "json",
		width:'700',
 	    height:'auto',
 	   	autowidth:false,
		//multiselect:true, //是否在首列加入复选框
		//multiselectWidth:30, //复选框的宽度
		colModel : [ 	 {name:"setup",label : "选择",width:50,sortable:false,align:'center'},
		             	 {name : "num",index : "num",label : "策略编号",width : 100,align:'center',hidden:true}, 
						 {name : "name",index : "name",label : "策略名称",width : 400,align:'center'},
						 {name : "level",index : "level",label : "试卷难度",width : 80,align:'center'}, 
						 {name : "setupTime",index : "setupTime",label : "添加时间",width : 150,align:'center'}
					 ],
		pager : "#paperTacticListPager",
		rowNum:10,
		rowList:[10,20,30],
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
		gridComplete:function(){  //在此事件中循环为每一行添加单选按钮	     	
				var ids=jQuery("#paperTacticList").jqGrid('getDataIDs');
					for(var i=0; i<ids.length; i++){
					var id=ids[i];
					var setupstr = "<input type='radio' id='paperTacticRadio_"+id+"' name='paperTaticRadio' value='"+id+"'/>";
		    		$(this).jqGrid("setRowData",id,{'setup':setupstr});
				}
			},
			onSelectRow: function(id){ 
				$("#paperTacticList #paperTacticRadio_"+id).attr("checked","checked");
		   }
		});
		//日期控件初始化
		initCustomerDatepicker(new Array("paperTactic_startTime","paperTactic_endTime"),"yy-mm-dd","hh:mm:ss");
		//sider初始化
		$('#slider').slider({  
	        disabled:false,   //是否可用，true不可用  false即可用的  
	        animate:true,   //代表是采用动画效果  
	        max:5,          //滑块的最大值是5
	        min:1,             //滑块的最小值  
	        value:1,             //滑块的默认值  
	        orientation:'horizontal',   //滑块的方向是垂直的还是水平的  
	        values:[1,5],          //初始化滑块的位置 一个是1 一个是5
	        range:true
        }); 
        
		$('#activity_pane').hideLoading();
		$( "#paperTacticDialog" ).dialog( "open" );
	});
}
 
//选择试卷生成策略之后
function selectPaperTacticCB(){
	var num = $("#paperTacticList [name=paperTaticRadio]:checked").first().val();
	$("#edit_paperTactic").val(num);
	var examPaperName = $("#paperTacticList").getCell( num,'name');
	$("#edit_paperTacticName").val(examPaperName);
	$( "#paperTacticDialog" ).dialog( "close" );
}

//查询考试信息
function query(){
	var name = $("#query_name").val();
	var type = $("#query_type").val();
	var available = $("#query_available").val();
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
		name:name,
		type:type,
		available:available,
		startTime:startTime,
		endTime:endTime
	};
	//合并数据,extend属性顺序不要搞反了
	postData = $.extend($("#examInfoList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#examInfoList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#examInfoList").trigger("reloadGrid", [{page:1}]);
}

//查询试卷
function queryExamPaper(){
	var num = $("#examPaper_num").val();
	var name = $("#examPaper_name").val();
	var startLevel = $("#slider").slider('values', 0);
	var endLevel = $("#slider").slider('values', 1);
	var startTime = $("#examPaper_startTime").val();
	var endTime = $("#examPaper_endTime").val();
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

//查询试卷生成策略
function queryPaperTactic(){
	var num = $("#paperTactic_num").val();
	var name = $("#paperTactic_name").val();
	var startLevel = $("#slider").slider('values', 0);
	var endLevel = $("#slider").slider('values', 1);
	var startTime = $("#paperTactic_startTime").val();
	var endTime = $("#paperTactic_endTime").val();
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