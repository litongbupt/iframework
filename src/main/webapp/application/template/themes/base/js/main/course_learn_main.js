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
	}
	$('#activity_pane').showLoading();
	//加载课程树
	$.post("/DRTS/course/courseWare_courseTreeList.action",function(data){
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
					n.isParent = true;
					n.drag = false;
					n.drop = false;
					n.icon = "images/chapter.gif";
					break;
				case 'SECTION':
					n.open = false;
					n.isParent = true;
					n.drag = false;
					n.drop = false;
					n.icon = "images/section.gif";
					break;
				case 'WARE':
					n.open = false;
					n.isParent = false;
					n.drag = false;
					n.drop = false;
					break;
			}
		});			
		zTreeObj = $.fn.zTree.init($("#course_tree"), setting, data);
		$('#activity_pane').hideLoading();
	});
	
});
//定义全局变量，保存当前选择的节点
var currentNode;
var currentDataObj;
var currentCourseType; //当前课件类型
var validateFlag = 0;//校验标志
var formId;
var selectId;

//树节点单击事件函数
function treeClick(event, treeId ,treeNode){
	$.post("/DRTS/course/courseWare_checkCourseWare.action",{num:treeNode.num},function(data){
		if(data.mainData.content!= null && data.mainData.content != ""){
			$("#viewLink").css('display','');
			$("#courseContent").val(data.mainData.content);
		}else{
			$("#courseContent").val("");
			$("#viewLink").css('display','none');
		}
		var url=getIFrameDOM("iframe2").location.href;
		if(url.substring(url.lastIndexOf("/")) !='/course_view.jsp'){
			window.document.getElementById("iframe2").src = "/DRTS/course/course_view.jsp";
		}else{
			$("#iframe2").contents().find("#content_body").empty();
			if(data.mainData.content!= null && data.mainData.content != ""){
				$("#iframe2").contents().find("#content_body").removeClass("welcome");
				$("#iframe2").contents().find("#content_body").append(data.mainData.content);
			}else{
				$("#iframe2").contents().find("#content_body").addClass("welcome");
			}
		}
	});
}

function getIFrameDOM(id){
	return document.getElementById(id).contentDocument || frames[id].document;
}

//全屏效果
function fullScreen(){
	var content = $("#courseContent").val();
	window.parent.viewCourse(content);
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