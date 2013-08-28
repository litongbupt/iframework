//树控件配置属性
var zTreeObj;

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
			dblClickExpand:true
		},
		callback: {
			onClick:treeClick
		}
};

//初始页面加载
$(function() {
	//权限验证
	if(validateRole('activity_pane','2')== false){
		$(".content").empty();
		return;
	}
	$('#activity_pane').showLoading();
	//加载课程树
	$.post("/DRTS/course/courseWare_courseTreeList.action",{types:'COURSE,CHAPTER'},function(data){
		$.each(data, function(i,n){
			switch(n.type){
				case 'COURSE':
					n.open = true;
					n.isParent = true;
					n.drag = false;
					n.drop = false;
					n.icon = "images/course.gif";
					break;
				case 'CHAPTER':
					n.open = true;
					n.isParent = false;
					n.drag = false;
					n.drop = false;
					n.icon = "images/chapter.gif";
					break;
				
			}
		});			
		zTreeObj = $.fn.zTree.init($("#course_tree"), setting, data);
		$('#activity_pane').hideLoading();
	});
	
});

var qArray=[];
var qIndex;
//树节点单击事件函数
function treeClick(event, treeId ,treeNode){
	$("#priorButton").css('display','none');
	$("#nextButton").val("下一题");
	if(treeNode.type =='CHAPTER'){
		$('#activity_pane').showLoading();
		$.post("/DRTS/question/question_getRandomQuestion.action",{chapter:treeNode.num},function(data){
			$('#activity_pane').hideLoading();
			if(data.result == "success"){
				qArray=data.qList;
				qIndex = 0;
				$("#defaultDiv").css('display','none');
				$("#testDiv").css('display','');
				$("#section_head").html(treeNode.name);
				initAnswerZone();
			}else if(data.result == "failure") {
				alertJQ(data.resultInfo,1000);
				$("#testDiv").css('display','none');
				$("#defaultDiv").css('display','');
			}
		});
	}
}

//显示答案
function showStandAnswer(){
	alertJQ(q.answerOption);
}
function selectOption(){
	if($("input:[name=answerOption]:checked").length>0)
		$("#showButton").css('display','');
	else
		$("#showButton").css('display','none');
}

//初始化答题区
function initAnswerZone(){
	$("#answerDiv").empty();
	$("#showButton").css('display','none');
	q=qArray[qIndex];
	var qOrder = qIndex +1;
	$("#questionDiv").children().eq(0).html("&nbsp;&nbsp;&nbsp;&nbsp;"+qOrder+".&nbsp;&nbsp;");
	$("#questionDiv").children().eq(1).html(q.description);
	var divWidth = $("#answerDiv").width()/q.optionCols-30;
	var contentWidth = divWidth-45;
	var optionArray = JSON.parse(q.standAnswer);
	var optionButton = "";
	if(q.questionType == "单选")
		optionButton = "radio";
	else if(q.questionType == "多选")
		optionButton = "checkbox";
	for(var i=0;i<optionArray.length;i++){
		var dataObj = optionArray[i];
		var html2="<div style='margin:10px;display:inline-block; *display:inline; *zoom:1;vertical-align:top;width:"+divWidth+"px;'>";
		html2 += "<label style='float:left;'><input type='"+optionButton+"' name='answerOption' value='"+ dataObj.name+"' onclick='selectOption();'/>&nbsp;"+ dataObj.name+".&nbsp;</label>";
		html2 += "<div style='float:right;width:"+contentWidth+"px;'>"+dataObj.content+"</div></div>";
		$("#answerDiv").append(html2);
	}
	if(qIndex==0)
		$("#priorButton").css('display','none');
	else
		$("#priorButton").css('display','');
	if(qIndex==qArray.length-1)
		$("#nextButton").val("结束");
	else
		$("#nextButton").val("下一题");
}

//加载上一题
function loadPriorQuestion(){
	qIndex --;//指向上一道题
	//初始化答题区
	initAnswerZone();
}

//加载下一题
function loadNextQuestion(){
	qIndex ++;//指向下一道题
	if(qIndex>=qArray.length){
		alertJQ("本次练习结束！",1000);
		$("#testDiv").css('display','none');
		$("#defaultDiv").css('display','');
		$("#showButton").css('display','none');
		$("#section_head").html("");
		return;
	}
	//初始化答题区
	initAnswerZone();
}

function queryBlur(){
	if($("#query_name").val() == ""){
		$("#query_name").val("输入名称查询");
	}
}

function queryClick(){
	if($("#query_name").val() == "输入名称查询"){
		$("#query_name").val("");
	}
}

function queryKeyUp(e){
	var e = e || window.event; 
	if(e.keyCode == '13'){
		query();
	}
}

//查询节点
function query(){
	var name = $("#query_name").val();
	if(name == "") return false;
	var nodes = zTreeObj.getNodesByParamFuzzy("name", name, null);
	zTreeObj.selectNode(nodes[0]);
	queryNodes = nodes;
	queryIndex = 0;
}

//查询前一个节点
function queryPre(){
	if(queryIndex == 0){
		return false;
	}
	queryIndex--;
	zTreeObj.selectNode(queryNodes[queryIndex]);
}

//查询后一个节点
function queryNext(){
	if(queryIndex == queryNodes.length-1){
		return false;
	}
	queryIndex++;
	zTreeObj.selectNode(queryNodes[queryIndex]);
}