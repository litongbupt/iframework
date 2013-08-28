//树控件
var zTreeObj;
//树控件配置属性
var setting = {
		edit: {
			enable: true,
			showRemoveBtn: false,
			showRenameBtn: false//,
			//removeTitle:"删除",
			//renameTitle:"修改"
		},
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "p_id",
				rootPId: -1
			}
		},
		view:{
			showLine: false,
			dblClickExpand:false,
			addHoverDom:addHoverDom,
			removeHoverDom: removeHoverDom
		},
		callback: {
			onClick:treeClick,
			onDblClick:treeDbClick,
			beforeDrag: beforeDrag,
			beforeDrop: beforeDrop
		}
};

//初始页面加载
$(function() {
	//权限验证
	$('#activity_pane').showLoading();
	//加载课程树
	$.post("/iframework/auth/courseWare_courseTreeList.do",function(data){
		$.each(data, function(i,n){
			switch(n.type){
				case 'COURSE':
					n.open = true;
					n.isParent = true;
					n.drag = false;	
					n.drop = true;
					n.icon = "images/course.gif";
					break;
				case 'CHAPTER':
					n.open = true;
					n.isParent = true;
					n.drag = true;
					n.drop = true;
					n.icon = "images/chapter.gif";
					break;
				case 'SECTION':
					n.open = false;
					n.isParent = true;
					n.drag = true;
					n.drop = true;
					n.icon = "images/section.gif";
					break;
				case 'WARE':
					n.open = false;
					n.isParent = false;
					n.drag = true;
					n.drop = false;
					break;
			}
		});			
		zTreeObj = $.fn.zTree.init($("#course_tree"), setting, data);
		
		$('#activity_pane').hideLoading();

	});
	
	//新增选择弹窗
 	$( "#addSelectDialog" ).dialog({
 		autoOpen: false,
 		width: '400',
 		height:'100',
 		modal: true,
 		resizable:true,
 		show: 'fade',
 		hide: 'fade'
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
	currentNode=treeNode;
	$("#viewLink").css('display','none');
}

//树节点双击事件函数
function treeDbClick(event, treeId ,treeNode){
	$("#content_body").empty();
	$.post("/DRTS/course/courseWare_checkCourseWare.action",{num:treeNode.num},function(data){
		if(data.mainData.content!= null && data.mainData.content != ""){
			$("#viewLink").css('display','');
			$("#content_body").append('<input type="hidden" id="courseContent"/>');
			$("#courseContent").val(data.mainData.content);
			$("#content_body").append('<iframe id="iframe2" src="/DRTS/course/course_view.jsp" style="width:100%;height:100%;border:0;" frameborder="0"></iframe>');
		}else{
			$("#viewLink").css('display','none');
			$("#courseContent").val("");
			$("#content_body").append('<div class="welcome"></div>');
		}
	});
}

//全屏效果
function fullScreen(){
	var content = $("#courseContent").val();
	window.parent.viewCourse(content);
}

//拖拽前事件函数
function beforeDrag(treeId, treeNodes) {
	var p_id = "";
	for (var i=0; i<treeNodes.length; i++) {
		//得到父节点
		var pnode = zTreeObj.getNodeByParam("id", treeNodes[i].p_id, null);
		if(i == 0) p_id = pnode.id;
		if (treeNodes[i].drag === false) {
			alertJQ(treeNodes[i].name + " 节点不能拖拽",2000);
			return false;
		}
		if(p_id != pnode.id){
			alertJQ("不属于同一个父节点下的多个节点不能拖拽",2000);
			return false;
		}
	}
	
	return true;
}

//拖拽放下前事件函数
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
	if(targetNode.drop == false){
		alertJQ("不能拖拽到" + targetNode.name + "节点",2000);
		return false;
	}
	switch(targetNode.type){
		case 'COURSE':
			for(var i = 0;i<treeNodes.length;i++){
				if(treeNodes[i].type != 'CHAPTER'){
					alertJQ("只能拖拽章节到课程下",2000);
					return false;
				}
			}
			break;
		case 'CHAPTER':
			for(var i = 0;i<treeNodes.length;i++){
				if(treeNodes[i].type != 'SECTION' && treeNodes[i].type != 'WARE'){
					alertJQ("只能拖拽小节或课件到章节下",2000);
					return false;
				}
			}
			break;
		case 'SECTION':
			for(var i = 0;i<treeNodes.length;i++){
				if(treeNodes[i].type != 'WARE'){
					alertJQ("只能拖拽课件到小节下",2000);
					return false;
				}
			}
			break;
	}
	$('#activity_pane').showLoading();
	var treeIds = "";
	for(var i=0; i<treeNodes.length; i++){
		treeIds = treeIds + treeNodes[i].id + ",";
	}
	$.post("/DRTS/course/courseWare_dragCourseTreeNode.action",{treeIds:treeIds,targetId:targetNode.id},function(data){
		$('#activity_pane').hideLoading();
		if(data.result == "success") {
			alertJQ("拖拽至新节点成功！",1000);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
	
	return true;
}

//鼠标移至树节点上的事件函数
function addHoverDom(treeId, treeNode) {
	//添加新增按钮
	if(treeNode.type != "WARE"){
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#addBtn_"+treeNode.id).length>0) return;
		var addStr = "<span class='button add' id='addBtn_" + treeNode.id
			+ "' title='新增' onfocus='this.blur();'></span>";
		sObj.append(addStr);
		var btn = $("#addBtn_"+treeNode.id);
		//增加按钮单击事件函数
		if (btn) btn.bind("click", function(){
			//保存当前节点对象
			currentNode = treeNode;
			$("#content_body").empty();
			switch(treeNode.type){
				case 'COURSE':
					//新增章节
					$("#content_body").load("/DRTS/course/course_ware_add_dialog.jsp",function(data){
						$("#main_head").html("课件管理>>新增章节");
						$(".courseType").html("章节");
						addCourseWareInCB(currentNode.id,"CHAPTER");
					});
					break;
				case 'CHAPTER':
					//新增选择
					$("#addSelectDialog").load("/DRTS/course/course_ware_add_select.jsp",function(data){
						$("#addSelectDialog").dialog("open");
					});
					break;
				case 'SECTION':
					//新增课件
					$("#content_body").load("/DRTS/course/course_ware_add_dialog.jsp",function(data){
						$("#main_head").html("课件管理>>新增课件");
						$(".courseType").html("课件");
						addCourseWareInCB(currentNode.id,"WARE");
					});
					break;
			}
		});
	}

	//为所有节点添加修改按钮
	var sObj = $("#" + treeNode.tId + "_span");
	if (treeNode.editNameFlag||$("#modifyBtn_"+treeNode.id).length>0) return;
	var modifyStr = "<span class='button modify' id='modifyBtn_" + treeNode.id
	+ "' title='修改' onfocus='this.blur();'></span>";
	sObj.append(modifyStr);
	var btn = $("#modifyBtn_"+treeNode.id);
	if (btn) btn.bind("click", function(){
		currentNode = treeNode;
		modifyCourseWareIn(treeNode);
	});

	//为所有节点添加删除按钮
	var sObj = $("#" + treeNode.tId + "_span");
	if (treeNode.editNameFlag||$("#deleteBtn_"+treeNode.id).length>0) return;
	var deleteStr = "<span class='button delete' id='deleteBtn_" + treeNode.id
	+ "' title='删除' onfocus='this.blur();'></span>";
	sObj.append(deleteStr);
	var btn = $("#deleteBtn_"+treeNode.id);
	if (btn) btn.bind("click", function(){
		//确认是否删除
		delNodeCF("course_tree", treeNode);
	});
}
//鼠标移开树节点上的事件函数
function removeHoverDom(treeId, treeNode) {
	$("#addBtn_"+treeNode.id).unbind().remove();
	$("#modifyBtn_"+treeNode.id).unbind().remove();
	$("#deleteBtn_"+treeNode.id).unbind().remove();
};

//预览
function preview(contentId){
	var content = CKEDITOR.instances[contentId].getData(); //内容
	if(content != ""&&content != null)
		window.parent.viewCourse(content);
}

//取消
function cancel(){
	$.post("/DRTS/course/courseWare_checkCourseWare.action",{num:currentNode.num},function(data){
		$("#content_body").empty();
		$("#main_head").html("课件管理");
		if(data.mainData!= null)
			$("#content_body").html(data.mainData.content);
	});
}

//新增选择
function addCourseSelect(option){
	switch(option){
		case 'SECTION':
			//新增小节
			$("#content_body").load("/DRTS/course/course_ware_add_dialog.jsp",function(data){
				$("#main_head").html("课件管理>>新增小节");
				$(".courseType").html("小节");
				addCourseWareInCB(currentNode.id,"SECTION");
			});
			break;
		case 'WARE':
			//新增课件
			$("#content_body").load("/DRTS/course/course_ware_add_dialog.jsp",function(data){
				$("#main_head").html("课件管理>>新增课件");
				$(".courseType").html("课件");
				addCourseWareInCB(currentNode.id,"WARE");
			});
			break;
	}
	$("#addSelectDialog").dialog("close");
}

//新增课程入口
function addCourseIn(){
	$('#activity_pane').showLoading();
	$("#content_body").empty();
	$("#content_body").load("/DRTS/course/course_ware_add_dialog.jsp",function(data){
		$("#main_head").html("课件管理>>新增课程");
		$(".courseType").html("课程");
		addCourseWareInCB("-1","COURSE");
	});
}

//新增入口回调
function addCourseWareInCB(p_id,nodeType){
	var clientHeight = document.documentElement.clientHeight-270;
	$("#add_content").ckeditor({height : clientHeight});
	$('#activity_pane').hideLoading();
	//注册新增表单验证
	$("#addCourseWareForm").validate({
		rules:{
			num:{required:true,maxlength:20,byteRangeLength:[0,20],isNumOrDot:true,treeNodeNumExisted:["course_tree",""]},
			name:{required:true,maxlength:50,byteRangeLength:[0,50],treeNodeNameExisted:["course_tree",p_id,function(){return $("#add_num").val();}]}
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
			element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
       	},
    	submitHandler:function(){ //验证通过后调用此函数
   	 		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$("#addCourseWareForm").ajaxSubmit({
				url:"/DRTS/course/courseWare_addCourseWareOut.action",
				data:{p_id:p_id,type:nodeType},
				success:addCourseWareOutCB //成功增加的回调函数
			});
    	}
	});
	//注册增加用户ajax表单
	$("#addCourseWareForm").ajaxForm();
}

//新增出口回调函数
function addCourseWareOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var courseTree = data.courseTree;
	if(data.result == "success") {
		var p_id = courseTree.p_id;
		var type = courseTree.type;
		//增加树节点
		var newNode;
		switch(type){
		case 'COURSE':
			newNode = {"id":courseTree.id,"p_id":p_id,"num":courseTree.num,"name":courseTree.name,"type":type, 
					open: true, isParent:true, drag: false, drop: true, icon:"images/course.gif"};
			break;
		case 'CHAPTER':
			newNode = {"id":courseTree.id,"p_id":p_id,"num":courseTree.num,"name":courseTree.name,"type":type, 
				open: true, isParent:true, drag: true, drop: true, icon:"images/chapter.gif"};
			break;
		case 'SECTION':
			newNode = {"id":courseTree.id,"p_id":p_id,"num":courseTree.num,"name":courseTree.name,"type":type, 
				open: false, isParent:true, drag: true, drop: true, icon:"images/section.gif"};
			break;
		case 'WARE':
			newNode = {"id":courseTree.id,"p_id":p_id,"num":courseTree.num,"name":courseTree.name,"type":type, 
				open: false, isParent:false, drag: true, drop: false, icon:"images/ware.gif"};
			break;
		}
		if(p_id=="-1")
			currentNode = zTreeObj.addNodes(null, newNode, false)[0];
		else{
			var parentNode = zTreeObj.getNodeByParam("id",p_id,null);
			currentNode = zTreeObj.addNodes(parentNode, newNode, false)[0];
		}
		alertJQ("操作成功，请等待页面刷新！",1000);
		zTreeObj.selectNode(currentNode);
		modifyCourseWareIn(currentNode);
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//修改入口
function modifyCourseWareIn(treeNode) {
	$('#activity_pane').showLoading();
	$("#content_body").empty();
	$("#content_body").load("/DRTS/course/course_ware_modify_dialog.jsp",function(data){
		$.post("/DRTS/course/courseWare_modifyCourseWareIn.action",{num:treeNode.num},function(data){
			//为表单加载数据
			formLoadData("modifyCourseWareForm",data);
			var clientHeight = document.documentElement.clientHeight-270;
			$("#modify_content").ckeditor({height : clientHeight});
			//CKEDITOR.instances["modify_content"].setData(data.mainData.content);
		});
		//注册修改表单
		switch(treeNode.type) {
		case 'COURSE':
			//编辑课程
			$("#main_head").html("课件管理>>编辑课程");
			$(".courseType").html("课程");
			break;
		case 'CHAPTER':
			//编辑章节
			$("#main_head").html("课件管理>>编辑章节");
			$(".courseType").html("章节");
			break;
		case 'SECTION':
			//编辑小节
			$("#main_head").html("课件管理>>编辑小节");
			$(".courseType").html("小节");
			break;
		case 'WARE':
			//编辑课件
			$("#main_head").html("课件管理>>编辑课件");
			$(".courseType").html("课件");
			break;
		}
		modifyCourseWareInCB(treeNode);
	});
	
}
//修改入口
function modifyCourseWareInCB(treeNode) {
	$('#activity_pane').hideLoading();
	//注册编辑表单验证
	$("#modifyCourseWareForm").validate({
		rules:{
			num:{required:true,maxlength:20,byteRangeLength:[0,20],isNumOrDot:true},
			name:{required:true,maxlength:50,byteRangeLength:[0,50],treeNodeNameExisted:["course_tree",treeNode.p_id,treeNode.num]}
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
			element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
       	},
    	submitHandler:function(){ //验证通过后调用此函数
   	 		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    		//采用ajax提交表单
    		$("#modifyCourseWareForm").ajaxSubmit({
				url:"/DRTS/course/courseWare_modifyCourseWareOut.action",
				data:{num:treeNode.num,type:treeNode.type},
				success:modifyCourseWareOutCB //成功编辑的回调函数
			});
    	}
	});
	//注册增加用户ajax表单
	$("#modifyCourseWareForm").ajaxForm();
}

//编辑出口回调函数
function modifyCourseWareOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var courseTree = data.courseTree;
	if(data.result == "success") {
		currentNode.name = courseTree.name;
		zTreeObj.updateNode(currentNode);
		alertJQ("操作成功，请等待页面刷新！",1000);
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}




//确认删除
function delNodeCF(treeId, treeNode) {
	
	if(treeNode.children != undefined && treeNode.children != ""){
		var msg = "";
		switch(treeNode.type){
		case 'COURSE':
			msg = "本课程下存在章节，不可以删除!";
			break;
		case 'CHAPTER':
			msg = "本章节下存在小节或课件，不可以删除!";
			break;
		case 'SECTION':
			msg = "本小节下存在课件，不可以删除!";
			break;
		}
		alertJQ(msg,'',350);
		return;
	}else
		confirmJQ("删除后无法恢复，确认删除？",delNode,treeNode);
}

//删除节点
function delNode(treeNode) {
	$('#activity_pane').showLoading();
	$.post("/DRTS/course/courseWare_deleteCourseWare.action", {id:treeNode.id},function(data){
		$('#activity_pane').hideLoading();
		if(data.result == "success") {
			//删除树节点
			zTreeObj.removeNode(treeNode);
			$("#content_body").empty();
			alertJQ("操作成功，请等待页面刷新！",1000);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
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