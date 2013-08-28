var apdArray = new Array();
var qtdArray = new Array();
var qIndex = 0;
var selectExamInfo = "";
var selectUser = "";
//保存当前选择的行Id
var selectId = "";
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
						{name : "available",index : "available",label : "是否有效",width : 50,align:'center'}
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
					var name = $(this).getCell(id,'name');
		    		var link="<a href='javascript:showAnswerPaperList(\""+id+"\")' class='nojump'>"+ name+"</a>";
		    		$(this).jqGrid("setRowData",id,{'name':link});
				}
			}
	});
	
	//日期控件初始化
	initCustomerDatepicker(new Array("query_startTime","query_endTime"),"yy-mm-dd","hh:mm");
	
	//考试信息对话框
 	$( "#examAnalysisDialog" ).dialog({
 		autoOpen: false,
 		width: '750',
 		height:'auto',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		close:function(){
 			$( this ).empty();
 		}
 	});
 	//成绩图表对话框
 	$( "#examGraphDialog" ).dialog({
 		autoOpen: false,
 		width: '680',
 		height:'430',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade',
 		buttons:{
			"返回" :  function() {
				$(this).dialog("close");
			}
 		},
 		close:function(){
 			$(this).empty();
 		}
 	});
});

//返回
function backUp(){
	$("#answerPaper_content").hide();
	$("#examInfo_content").show();
}

//查看考试信息函数
function showAnswerPaperList(examInfoId){
	$("#examInfo_content").hide();
	$("#answerPaper_content").show();
	selectExamInfo = examInfoId;
	$("#answerPaperList").jqGrid({  
		url:"/DRTS/exam/examAnalysis_showAnswerPaperList.action",
		mtype : "post",
   		datatype : "json",
		postData:{'examInfo':examInfoId},
		width:'100%',
 	    height:'auto',
 	    autowidth:true,
		//multiselect:true, //是否在首列加入复选框
		//multiselectWidth:30, //复选框的宽度
		colModel : [
					{name : "userId",index : "userId",label : "用户Id",width : 150,align:'center',hidden:true},
		 			{name : "userNum",index : "userNum",label : "学生编号",width : 150,align:'center'},
		            {name : "userName",index : "userName",label : "学生姓名",width : 100,align:'center'},
		            {name : "objectiveScore",index : "objectiveScore",label : "客观题得分",width : 100,align:'center'},
		            {name : "subjectiveScore",index : "subjectiveScore",label : "主观题得分",width : 100,align:'center'},
					{name : "score",index : "score",label : "成绩",width : 70,align:'center'}, 
					{name : "orderNum",index : "orderNum",label : "排名",width : 50,align:'center'},
					{name : "status",index : "status",label : "状态",width : 50,align:'center'},
					{name:"setup",label : "配置",width:80,sortable:false,align:'center'}
					 ],
		pager : "#answerPaperListPager",
		rowNum:10,
		rowList:[10,20,30],
		sortname:"score",
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
 	       	id:"id",
 	        repeatitems : false
		},
		gridComplete:function(){  //在此事件中循环为每一行添加单选按钮	     	
			var ids=$(this).jqGrid('getDataIDs');
			for(var i=0; i<ids.length; i++){
				var id=ids[i];
				var userId =$(this).getCell( id,'userId');
				var setupstr = "<img id='" + userId + "' src='/DRTS/images/user_check.gif' title='查看历史成绩' style='cursor:pointer;' onclick='checkHistoryList(this.id);'/>&nbsp;&nbsp;";
				setupstr += "<img id='" + id + "' src='/DRTS/images/modify.png' title='评卷' style='cursor:pointer;' onclick='markAnswerPaper(this.id);'/>";
				$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
			}
			var bodyObj=document.getElementById('answerPaper_content');
			if(bodyObj.scrollHeight>bodyObj.clientHeight||bodyObj.offsetHeight>bodyObj.clientHeight){
				$("#answerPaper_content .toolBar").css('width',$(this).width()-10);
			}
		}
	});
}

//历史成绩列表
function checkHistoryList(userId){
	$('#activity_pane').showLoading();
	$("#examAnalysisDialog").dialog('option', 'title', '历次考试成绩');
	$("#examAnalysisDialog").dialog('option','buttons',{
		"返回" :  function() {
			$(this).dialog("close");
		}
	});
	selectUser = userId;
	$( "#examAnalysisDialog" ).load('/DRTS/exam/exam_analysis_detail_dialog.jsp', function(){
		 $("#historyList").jqGrid({  
    		url:'/DRTS/exam/examAnalysis_showAnswerPaperList.action',
    		mtype : "post",
    		datatype : "json",
    		postData:{'userId':userId},
			width:'670',
	 	    height:'auto',
	 	    autowidth:false,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [  
						{name : "examInfo",index : "examInfo",label : "考试名称",width : 200,align:'center'},
						{name : "examPaper",index : "examPaper",label : "考试类型",width : 50,align:'center'}, 
						{name : "setupTime",index : "setupTime",label : "参加考试时间",width : 100,align:'center'}, 
						{name : "score",index : "score",label : "成绩",width : 50,align:'center'},
						{name : "orderNum",index : "orderNum",label : "排名",width : 50,align:'center'}
						],
			pager : "#historyListPager",
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
	 	       	id:"id",
	 	        repeatitems : false
			}
		});
		
		//日期控件初始化
		initCustomerDatepicker(new Array("history_query_startTime","history_query_endTime"),"yy-mm-dd","hh:mm:ss");
		
		$('#activity_pane').hideLoading();
		$( "#examAnalysisDialog" ).dialog( "open" );
	});
}

//查看成绩分布图表
function checkScoreGraph(){
	$('#activity_pane').showLoading();
	$("#examGraphDialog").dialog('option', 'title', '本次考试成绩分布');
	$( "#examGraphDialog" ).load('/DRTS/exam/exam_analysis_graph_dialog.jsp', function(){
		$.post("/DRTS/exam/examAnalysis_answerPaperList.action",{examInfo:selectExamInfo},function(data){
			apArray = data.answerPaperList;
			var grdadeArray =  [];
			for (var i=0;i<data.totalGrade;i++){
				grdadeArray.push([i*10, 0]);
			}
			for (var i=0;i<apArray.length;i++){
				var grade = Math.floor(apArray[i].score/10);
				grdadeArray[grade][1]++;
			}
			$.plot($("#placeholder"), [{ label: "人数",data:grdadeArray,color:'#4da74d'}],
				{
				    series:{bars:{show:true,barWidth:7,lineWidth: 0,align:'left',fillColor:'#4da74d'}},
				    xaxis:{tickDecimals:0,tickSize:10,min:0,max:data.totalGrade*10},
				    yaxis:{tickDecimals:0},
				    grid: {borderColor: "#898989"}//表格样式
				}
			);
		});
		$('#activity_pane').hideLoading();
		$( "#examGraphDialog" ).dialog( "open" );
	});
}
//历史成绩图表
function checkHistoryGraph(){
	$('#activity_pane').showLoading();
	$("#examGraphDialog").dialog('option', 'title', '历次考试成绩分布');
	$( "#examGraphDialog" ).load('/DRTS/exam/exam_analysis_graph_dialog.jsp', function(){
		$.post("/DRTS/exam/examAnalysis_answerPaperList.action",{user:selectUser},function(data){
			//为表单加载数据
			apArray = data.answerPaperList;
			var scoreArray =  [];
			for (var i=0;i<apArray.length;i++){
				scoreArray.push([i+1, Math.floor(apArray[i].score)]);
			}
			$.plot($("#placeholder"), [{ label: "成绩",data:scoreArray,color:'#9440ed'}],
				{
				    series: { points: { show: true,color:'#9440ed'},lines: { show: true,fillColor:'#9440ed'} },
				    xaxis:{show:false,min:0,max:apArray.length+1},
				    yaxis:{tickDecimals:0},
				    grid: {hoverable: true,borderColor: "#898989"}//表格样式
				}
			);
			var previousPoint = null;
		    $("#placeholder").bind("plothover", function (event, pos, item) {
	            if (item) {
	                if (previousPoint != item.dataIndex) {
	                    previousPoint = item.dataIndex;
	                    $("#tooltip").remove();
	                    var x = item.datapoint[0].toFixed(2),
	                        y = item.datapoint[1].toFixed(2);
	                    var eiName = apArray[x-1].examInfo;
	                    var content = eiName+"："+ y+"分";
	                    showTooltip(item.pageX, item.pageY,content);
	                }
	            }
	            else {
	                $("#tooltip").remove();
	                previousPoint = null;            
	            }
		    });
		});
		$('#activity_pane').hideLoading();
		$( "#examGraphDialog" ).dialog( "open" );
	});
}

function showTooltip(x, y, contents) {
	x = x- $('#examGraphDialog').offset().left-80;
	y = y - $('#examGraphDialog').offset().top-25;;
	var html = "<div id='tooltip' style='position:absolute;top:"+y+"px;left:"+x+"px;z-index:10;";
	html+="display:block;padding:2px;font-size:12px;'>" + contents + "</div>";
	$("#examGraphDialog").prepend(html);
}

//评分
function markAnswerPaper(id){
	selectId = id;
	$('#activity_pane').showLoading();
	$("#examAnalysisDialog").dialog('option', 'title', '评分');
	$("#examAnalysisDialog").dialog('option','buttons',{
		"确定" :  function() {
				markPaperOut();
			},
		"取消" : function() {
				$(this).dialog("close");
			}
	});
	$( "#examAnalysisDialog" ).load('/DRTS/exam/exam_mark_paper_dialog.jsp', function(){
		$.post("/DRTS/exam/examAnalysis_markPaperIn.action",{answerPaper:id},function(data){
			if(data.result =="success"){
				apdArray = data.apdList;
				qtdArray = data.qtdList;
				
				if(apdArray.length==0){
					$("#answerCountDiv").html("此学生主观题未作答，请点击确定计算得分。");
					$("#markDiv").css('display','none');
				}else{
					$("#answerCountDiv").html("此学生主观题作答数为："+apdArray.length+"道题");
					qIndex = 0;
					initMarkZone();
				}
			}else if(data.result == "failure"){
				alertJQ(data.resultInfo);
			}
		});
		$('#activity_pane').hideLoading();
		$("#examAnalysisDialog").dialog( "open" );
	});
}

//初始化评分区
function initMarkZone(){
	if(apdArray.length==0)
		return;
	apd = apdArray[qIndex];
	var tOder = Number(apd.orderNum.substring(0,2));
	qtd = qtdArray[tOder-1];
	var html1 =  num2Chinese(qtd.orderNum) +"、"+qtd.questionTypeName+"：(共:"+ qtd.score +"分)";
	$("#questTypeDiv").html(html1);
	$("#questionDiv").children().eq(0).html(Number(apd.orderNum.substring(3))+".");
	$("#questionDiv").children().eq(1).html(apd.question);
	$("#questionDiv").children().eq(1).find("p:last").append("&nbsp;&nbsp;("+apd.questionScore+"分)");
	$("#standAnswerDiv").children().eq(1).html(apd.standAnswer);
	$("#answerDiv").children().eq(1).html(apd.answer);
	$("#mark_score").val(apd.score);
	//$("#answer_content").ckeditor({height : '200',toolbar : 'AnswerToolbar'});
	if(qIndex>0){
		$("#priorButton").css('display','');
	}else
		$("#priorButton").css('display','none');
	if(qIndex==apdArray.length-1){
		$("#nextButton").css('display','none');
	}else
		$("#nextButton").css('display','');
}

//加载上一题
function loadPriorQuestion(){
	if(!validateScore($("#mark_score").val()))//验证当前评分
		return;
	qIndex --;//指向上一道题
	initMarkZone(qIndex);
}

//加载下一题
function loadNextQuestion(){
	if(!validateScore($("#mark_score").val()))//验证当前评分
		return;
	qIndex ++;//指向下一道题
	//初始化评分区
	initMarkZone(qIndex);
}

//验证得分
function validateScore(value){
	if(/^(\d+)(\.\d+)?$/.test(value) == false){
		$("#mark_score_span").html("得分必需为大于等于0的数字");
		return false;
	}
	if(Number(value)>apd.questionScore){
		$("#mark_score_span").html("得分超过本题分值");
		return false;
	}
	$("#mark_score_span").html("&nbsp;");
	apd.score = value;//保存当前评分
	return true;
}
//评分
function markPaperOut(){
	if(apdArray.length>0&&!validateScore($("#mark_score").val()))//验证当前评分
		return;
	
	//禁用按钮
    disableButton();
	$('#activity_pane').showLoading();
	var apdList = JSON.stringify(apdArray);
	$.post("/DRTS/exam/examAnalysis_markPaperOut.action",{answerPaper:selectId,apdList:apdList},function(data){
		//启用按钮
		enableButton();
		$('#activity_pane').hideLoading();
		if(data.result =="success"){
			alertJQ("评分成功！",1000);
			$("#examAnalysisDialog").dialog( "close" );
			$("#answerPaperList").trigger("reloadGrid");
		}else if(data.result == "failure"){
			alertJQ(data.resultInfo);
		}
	});
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

//查询答卷信息
function queryAnswerPaper(){
	var userName = $("#query_userName").val();
	var userNum = $("#query_userNum").val();
	var status = $("#query_status").val();
	var startScore = $("#query_startScore").val();
	var endScore = $("#query_endScore").val();
	if(startScore!=""&&/^(\d+)(\.\d+)?$/.test(startScore) == false){
		alertJQ("起始分数必需为大于等于0的数字");
		return;
	}
	if(endScore!=""&&/^(\d+)(\.\d+)?$/.test(endScore) == false){
		alertJQ("终止分数必需为大于等于0的数字");
		return;
	}
	if(startScore!=""&&endScore!=""){
		var score1 = parseFloat(startScore);
        var score2 = parseF(endScore);
        if(score1 > score2){
        	alertJQ("起始分数必须小于终止分数！");
        	return;
        }
	}
	var postData = {
		userName:userName,
		userNum:userNum,
		status:status,
		startScore:startScore,
		endScore:endScore
	};
	//合并数据,extend属性顺序不要搞反了
	postData = $.extend($("#answerPaperList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#answerPaperList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#answerPaperList").trigger("reloadGrid", [{page:1}]);
}

//查询历史成绩
function queryHistory(){
	var startTime = $("#history_query_startTime").val();
	var endTime = $("#history_query_endTime").val();
	var type = $("#history_query_type").val();
	var startOrderNum = $("#history_query_startOrderNum").val();
	var endOrderNum = $("#history_query_endOrderNum").val();
	if(startTime!=""&&endTime!=""){
		var date1 = new Date(Date.parse(startTime.replace("-", "/")));
        var date2 = new Date(Date.parse(endTime.replace("-", "/")));
        if(date1 > date2){
        	alertJQ("起始时间必须小于终止时间！");
        	return;
        }
	}
	if(startOrderNum!=""&&/^\d$/.test(startOrderNum) == false){
		alertJQ("起始排名必需为大于等于0的数字");
		return;
	}
	if(endOrderNum!=""&&/^\d$/.test(endOrderNum) == false){
		alertJQ("终止排名必需为大于等于0的数字");
		return;
	}
	if(startOrderNum!=""&&endOrderNum!=""){
		var orderNum1 = Number(startOrderNum);
        var orderNum2 = Number(endOrderNum);
        if(orderNum1 > orderNum2){
        	alertJQ("起始排名必须小于终止排名！");
        	return;
        }
	}
	var postData = {
		startTime:startTime,
		endTime:endTime,
		type:type,
		startOrderNum:startOrderNum,
		endOrderNum:endOrderNum
	};
	//合并数据,extend属性顺序不要搞反了
	postData = $.extend($("#historyList").getGridParam("postData"),postData);
	//将合并后的数据设置到表格属性中，记得加search:true
	$("#historyList").setGridParam({search:true,postData:postData});
	//重新加载表格内容，必须加上加上page=1!!!
	$("#historyList").trigger("reloadGrid", [{page:1}]);
}