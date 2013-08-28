
//页面加载时初始化函数
$(function() {
	//权限验证
	if(validateRole('activity_pane','2')== false){
		$(".content").empty();
	}
	//主页面表格
	// 配置jqGrid组件  
    $("#examInfoList").jqGrid({  
    		url:'/DRTS/exam/examInfo_examInfoList.action',
    		mtype : "post",
    		datatype : "json",
    		postData:{available:'是',userId:global_userId},
			width:'100%',
	 	    height:'auto',
	 	    autowidth:true,
			//multiselect:true, //是否在首列加入复选框
			//multiselectWidth:30, //复选框的宽度
			colModel : [  
						 {name : "name",index : "name",label : "考试名称",width : 200,align:'center'},
						 {name : "type",index : "type",label : "考试类型",width : 30,align:'center'}, 
						 {name : "startTime",index : "startTime",label : "考试开始时间",width : 50,align:'center'}, 
						 {name : "timeLimit",index : "timeLimit",label : "考试时长",width : 50,align:'center'}, 
						 {name : "status",index : "status",label : "考试状态",width : 30,align:'center'}, 
						 ],
			pager : "#examInfoListPager",
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
			},
			gridComplete:function(){  //在此事件中循环为每一行添加修改和删除链接	     	
				var ids=$(this).jqGrid('getDataIDs');
				for(var i=0; i<ids.length; i++){
					var id=ids[i];
					var name = $(this).getCell(id,'name');
		    		var link="<a href='javascript:validateUser(\""+id+"\")' class='nojump'>"+ name+"</a>";
		    		$(this).jqGrid("setRowData",id,{'name':link});
				}
			}
	});
    
    //日期控件初始化
	initCustomerDatepicker(new Array("query_startTime","query_endTime"),"yy-mm-dd","hh:mm");
	
	//倒计时弹窗初始化
	$("#clockDialog").dialog({
		autoOpen: false,
		dialogClass: 'my-dialog',
		width: '300',
		height:'100',
		modal: true,
		resizable:false,
		draggable:false,
		hide: 'fade'
	});
});

var answerPaper;
var qtdArray = new Array();
var epdArray = new Array();
var qtd;
var epd;
var nowIndex;
//考试计时器
var timer;

//验证用户
function validateUser(id){
	var status = $("#examInfoList").getCell( id,'status');
	$('#activity_pane').showLoading();
	$.post("/DRTS/exam/examOnline_initExam.action",{examInfoId:id,userId:global_userId,status:status},function(data){
		$('#activity_pane').hideLoading();
		if(data.result == "success"){
			answerPaper = data.answerPaper;
			ininExam(data.examInfo,data.examPaper);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
}

//初始化考试
function ininExam(examInfo,examPaper){
	//考试类型
	var type = examInfo.type;
	//答题位置
	var qIndex = 0;
	//倒计时
	var hours = Number(examInfo.timeLimit.substring(0,2));
	var minutes = Number(examInfo.timeLimit.substring(4,6));
	var timeLimit = hours*3600 + minutes*60;
	var startTime = new Date(Date.parse(examInfo.startTime.replace(/-/g,"/"))).getTime()/1000;
	//获取服务器端时间
	var xhr = new XMLHttpRequest();
	xhr.open("HEAD","/DRTS/index.jsp",true);
	xhr.onreadystatechange=function(){
	    if( xhr.readyState == 4 && xhr.status == 200 ){
			var nowTime = new Date(xhr.getResponseHeader("Date")).getTime()/1000+1;
			if(nowTime>startTime){
				startExam(timeLimit+startTime-nowTime,qIndex);
			}else{
				var clock = setInterval(function(){
					if(nowTime<startTime){
						var minutes = Math.floor((startTime-nowTime)/60);
						var seconds = Math.floor((startTime-nowTime)%60);
						if(minutes>0)
							$("#clock").html("距离开考有： "+minutes+" 分 "+seconds+" 秒");
						else
							$("#clock").html("距离开考有："+ seconds+" 秒");
						nowTime++;
					}else{
						$("#clockDialog").dialog("close");
						clearInterval(clock);
						startExam(timeLimit+startTime-nowTime,qIndex);
					}
				},1000);
				$("#clockDialog").dialog("open");
			}
	    }
	};
	xhr.send(null);
	
	//初始化其他信息
	qtdArray = examPaper.qtdList;
	epdArray = examPaper.epdList;
	$("#examDiv_head").append(examInfo.name+"&nbsp;&nbsp;(共:"+epdArray.length+"题，满分:"+ examPaper.totalScore+"分)");
	$("#examInfoGrid").css('display','none');
	$("#query_form").css('display','none');
	$("#examDiv").css('display','');
	$("#iframe1").attr('src','exam/exam_online_sideBar.jsp');
	$("#iframe1").css('z-index','1');
}

//初始化侧边栏
function initSideBar(){
	for(var i=0;i<qtdArray.length;i++){
		var html = "<div class='sideBarContentsInner' id='sideBar_qtd_"+qtdArray[i].orderNum+"'>";
			html += "<p class='slide'><a>"+num2Chinese(qtdArray[i].orderNum) +"、"+qtdArray[i].questionTypeName+"</a></p>";
			html += "<div id='panel_"+qtdArray[i].orderNum+"' style='background: #f0f0f0;height: 100px; display: none;'></div></div>";
		jQuery("#iframe1").contents().find("#sideBarContents").append(html);
	}
	for(var i = 0;i<epdArray.length;i++){
		var tOrder = Number(epdArray[i].orderNum.substring(0,2));
		var qOrder = Number(epdArray[i].orderNum.substring(3));
		var answerContent = $.cookie(answerPaper + "_answerPaperDetail_"+i);
		var html = "<input type='button' id='qButton_"+i+"' style='float:left;";
		if(answerContent == undefined)
			html+="background:#ffcc00;";
		else
			html+="background:#0bb633;";	
		html +="border:0px;margin:5px;' value = '"+qOrder+"' onclick='window.parent.loadQuestion("+i+");'/>";
		jQuery("#iframe1").contents().find("#panel_"+tOrder).append(html);
	}
	jQuery("#iframe1").contents().find("p.slide").click(function(){
		jQuery(this).parent().siblings().find("div").slideUp("normal");
		jQuery(this).next().slideToggle("normal");
		jQuery(this).toggleClass("active"); return false;
	});
	
	jQuery("#iframe1").contents().find("#sideBarTab").toggle(function(){
		jQuery('#iframe1').css('width','215px');
	},function(){
		setTimeout("jQuery('#iframe1').css('width','35px');", 1000);
	});
	
}

//开始考试
function startExam(countTime,qIndex){
	//初始化答题区
	initAnswerZone(qIndex);
	timer = setInterval(function(){
		if(countTime>0){
			countTime--;
				if(countTime == 5*60) alertJQ("注意，还有5分钟!");
				var hours = Math.floor(countTime/60/60);
				var minutes = Math.floor((countTime/60)%60);
				var seconds = Math.floor(countTime%60);
				$("#timer").html("距考试结束: "+hours+" 小时 "+ minutes+" 分 "+seconds+" 秒");
		}else{
			saveAnswer();
			finishExam();
		}
	},1000);
}

//初始化答题区
function initAnswerZone(qIndex){
	if(epdArray.length==0)
		return;
	epd = epdArray[qIndex];
	var tOder = Number(epd.orderNum.substring(0,2));
	for(var i=0;i<qtdArray.length;i++){
		if(qtdArray[i].orderNum == tOder){
			qtd = qtdArray[i];
			break;
		}
	}
	var answerContent = $.cookie(answerPaper + "_answerPaperDetail_"+qIndex);
	$("#answerDiv").empty();
	var html1 =  num2Chinese(qtd.orderNum) +"、"+qtd.questionTypeName+"：(共:"+ qtd.score +"分)";
	$("#qtdDiv").html(html1);
	$("#questionDiv").children().eq(0).html("&nbsp;&nbsp;&nbsp;&nbsp;"+Number(epd.orderNum.substring(3))+".&nbsp;&nbsp;");
	$("#questionDiv").children().eq(1).html(epd.description);
	$("#questionDiv").children().eq(1).find("p:last").append("&nbsp;&nbsp;("+epd.score+"分)");
	if(qtd.category == "客观题"){
		var divWidth = $("#answerDiv").width()/epd.optionCols-30;
		var contentWidth = divWidth-45;
		var optionArray = JSON.parse(epd.standAnswer);
		var optionButton = "";
		if(qtd.optionType == "单选")
			optionButton = "radio";
		else if(qtd.optionType == "多选")
			optionButton = "checkbox";
		for(var i=0;i<optionArray.length;i++){
			var dataObj = optionArray[i];
			var html2="<div style='margin:10px;display:inline-block; *display:inline; *zoom:1;vertical-align:top;width:"+divWidth+"px;'>";
			html2 += "<label style='float:left;'><input type='"+optionButton+"' name='answerOption' value='"+ dataObj.name+"'/>&nbsp;"+ dataObj.name+".&nbsp;</label>";
			html2 += "<div style='float:right;width:"+contentWidth+"px;'>"+dataObj.content+"</div></div>";
			$("#answerDiv").append(html2);
		}
		
		if(answerContent!= null){
			$("#answerDiv [name='answerOption']").each(function(){
				if(answerContent.indexOf(this.value)>=0)
					$(this).attr('checked','checked');
			});
		}
	}else if(qtd.category == "主观题"){
		var html3 = "<textarea id='answer_content' style='border:1px solid #bbb; width:90%; height:150px;overflow-y:auto;' name='answer' rows='3' cols=''></textarea>";
		$("#answerDiv").append(html3);
		if(answerContent!= null){
			$("#answer_content").val(answerContent);
		}
		//$("#answer_content").ckeditor({height : '200',toolbar : 'AnswerToolbar'});
	}
	if(qIndex>0){
		$("#priorButton").css('display','');
	}else
		$("#priorButton").css('display','none');
	if(qIndex==epdArray.length-1){
		$("#nextButton").val("完成");
	}else
		$("#nextButton").val("下一题");
	nowIndex = qIndex;
}

//保存作答
function saveAnswer(){
	var answerContent = "";
	if(qtd.category == "客观题"){
		var answerArray = [];
		$("#answerDiv [name='answerOption']:checked").each(function(){
			answerArray.push(this.value);
		});
		answerContent = answerArray.join(",");
	}else if(qtd.category == "主观题"){
		answerContent = $("#answer_content").val();
	}
	var cookieName = answerPaper + "_answerPaperDetail_"+nowIndex;
	if(answerContent !=""){
		if($.cookie(cookieName) == undefined || $.cookie(cookieName) == null){
			//客户端保存作答
			$.cookie(cookieName, answerContent, {expires: 1});//新建一个cookie 有效期为一天
			jQuery("#iframe1").contents().find("#qButton_"+nowIndex).css('background','#0bb633');
		}else if(answerContent != $.cookie(cookieName)){
			$.cookie(cookieName, answerContent);//更新此cookie
		}
	}else if($.cookie(cookieName) != undefined){
		$.removeCookie(cookieName); // 删除
		jQuery("#iframe1").contents().find("#qButton_"+nowIndex).css('background','#fff799');
	}
	//提交至服务器端
	//var answerPaperDetail = JSON.stringify(apd);
	//submitAnswer(answerPaperDetail,0,nowIndex);
}

//提交答案
function submitAnswer(answerPaperDetail,sCount,sIndex){
	sCount ++;
	$.post("/DRTS/exam/examOnline_submitAnswer.action",{answerPaperDetail:answerPaperDetail},function(data){
		if(data.result == "success") {
			var cookieName = answerPaper + "_answerPaperDetail_"+sIndex;
			//$.cookie(cookieName, answerContent);//更新此cookie
			//apdArray[sIndex] = data.answerPaperDetail;
		}else if(data.result == "failure") {
			if(sCount>9){//超过10次失败,从上次答题点重新考试
				alertJQ("请检查网络,并重新点击考试!");
			}else{
				submitAnswer(answerPaperDetail,sCount,sIndex);
			}
		}
	});
}

//加载上一题
function loadPriorQuestion(){
	saveAnswer();//加载之前先保存当前作答
	qIndex = nowIndex-1;//指向上一道题
	initAnswerZone(qIndex);
}

//加载下一题
function loadNextQuestion(){
	saveAnswer();//加载之前先保存当前作答
	qIndex = nowIndex+1;//指向下一道题
	if(qIndex<=epdArray.length-1){
		//初始化答题区
		initAnswerZone(qIndex);
	}else
		finishExam();
}

//加载试题
function loadQuestion(qIndex){
	saveAnswer();//加载之前先保存当前作答
	if(qIndex<=epdArray.length-1){
		//初始化答题区
		initAnswerZone(qIndex);
	}else
		finishExam();
}

//结束考试
function finishExam(){
	clearInterval(timer);
	$("#timer").html("");
	$('#activity_pane').showLoading();
	var apdArray = new Array();
	for(var i=0;i<epdArray.length;i++){
		//从cookie中取得数据
		var cookieName =  answerPaper + "_answerPaperDetail_"+i;
		if($.cookie(cookieName) != undefined ){
			epd = epdArray[i];
			var tOder = Number(epd.orderNum.substring(0,2));
			qtd = qtdArray[tOder-1];
			var apd = new Object();
			apd.answerPaper = answerPaper;
			apd.orderNum = epd.orderNum;
			apd.question = epd.question;
			apd.questionScore = epd.score;
			apd.category = qtd.category;
			apd.answer = $.cookie(cookieName);
			apdArray.push(apd);
			$.removeCookie(cookieName); // 删除
		}
			
	}
	var apdList = JSON.stringify(apdArray);
	$.post("/DRTS/exam/examOnline_finishExam.action",{answerPaper:answerPaper,apdList:apdList},function(data){
		$('#activity_pane').hideLoading();
		if(data.result == "success"){
			alertJQ("考试结束，您的客观题成绩为："+data.answerPaper.objectiveScore+"分");
			//重新加载表格内容
			$("#examInfoList").trigger("reloadGrid");
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
	$("#examDiv").css('display','none');
	$("#query_form").css('display','');
	$("#examInfoGrid").css('display','');
	$("#iframe1").attr('src','');
	$("#iframe1").css('z-index','-1');
}

//查询考试信息
function query(){
	var name = $("#query_name").val();
	var type = $("#query_type").val();
	var status = $("#query_status").val();
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
		status:status,
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