
//页面加载时初始化函数
$(function() {
	//导出弹窗
	$( "#exportDialog" ).dialog({
	autoOpen: false,
	width: $("#exportDialog").css('width'),
	height:'400',
	modal: true,
	resizable:true,
	show: 'fade',
	hide: 'fade',		
	buttons: {		
		"确定": function(){
				exportXls();
				$( this ).dialog("close");
			},
			"取消": function(){
  			$( this ).dialog("close");
		}
		},
	close:function(){
		$(this).empty();
	}
	});
	
	//请求失败弹窗
	initFailureDialog("failureDialog");
	initProgressbar("divProgressbar");
	
	//进度条弹窗
	$( "#progressDialog" ).dialog({
		autoOpen: false,
		width: '400',
		height:'150',
		modal: true,
		resizable:true,
		close:function(){
		}
	});
});

var defaultMaxExportRows;//默认导出条数限制
var modelName;//模块名称

//导出弹窗初始化
function exportListIn(data){
	modelName = data;
	$("#activity_pane").showLoading();
	$("#exportDialog" ).load(golbal_context+"/application/modules/common/export_dialog.jsp", function(){
		//默认的最大导出条数
		defaultMaxExportRows=1000;
		$("#maxExportRows").val(1000);
//		$.post("/INMS/system/exportConfig.do?p=getExportConfig", function(data){
//			var dobject = $.parseJSON(data);
//			$("#maxExportRows").val(dobject.result);
//			defaultMaxExportRows = dobject.result;
//		});
		$.post(golbal_context+"/"+modelName+"/getDefaultExportCols.do",function(data){
		 	//首先判断data类型，若为字符串则将其转换为json对象，若为json对象则不用重复转换
			var dobj = null;
		 	if(typeof(data) == "string") dobj = $.parseJSON(data);
			else if(typeof(data) == "object") dobj = data;
			
			var columns = dobj.columns;
			var i;
			for(i=0; i < columns.length; i++){
				var ischeck = "";
				if(columns[i].selected){
					ischeck = "checked";
				}
				var devide = parseInt(i/5);
				if(i % 5 == 0){
					$("#exportList").append("<div id='row_" + devide + "' class='portlert-form-row'></div>");
					if(i==0)
						$("#row_" + devide).append("<label class='portlert-form-label'><input type='checkbox' id='exportParams' onclick='javascript:paramCheck(this)' />&nbsp;&nbsp;全选：&nbsp;&nbsp;</label>");
					else
						$("#row_" + devide).append("<label class='portlert-form-label'>&nbsp;</label>");
					$("#row_" + devide).append("<div id='collection_" + devide + "' class='portlert-form-collection'></div>");
				}
				$("#collection_"  + devide).append("<label class='portlert-form-label-rc'><input type='checkbox' name='exportParams' value='" + columns[i].value + "' " + ischeck + "/>" + columns[i].name + "</label>");
			}
			//dialog高度调整
			$("#exportDialog").dialog("option","height",'auto');
			$("#activity_pane").hideLoading();
			$("#exportDialog").dialog("open");
		});
	});
}

//前面的复选框的单击事件
function paramCheck(element){
	var ischecked = element.checked;
	$("input[name='" + element.id + "']").each(function(i){
		this.checked = ischecked;
	});
}

//导出
function exportXls(){
	var inputs = $("input[name='exportParams']:checked");
	if(inputs.length<1){
		$("#failure_info").html("[导出项]请选择至少一个导出项");
		$( "#failureDialog" ).dialog( "open" );
		setTimeout("$( '#failureDialog' ).dialog( 'close' );", 3000);
		return;
	}else{
		var selectCols = "";
		inputs.each(function() {
			selectCols += $(this).val()+ ',';
		 });
		selectCols = selectCols.substr(0, selectCols.lastIndexOf(","));
		$("#export_selectCols").val(selectCols);
	}

	var maxRecords = $("#maxExportRows").val();
	if(maxRecords.search("^[1-9]+[0-9]*$")!=0){
		$("#failure_info").html("[最大导出条数]请输入一个正整数");
		$( "#failureDialog" ).dialog( "open" );
		setTimeout("$( '#failureDialog' ).dialog( 'close' );", 3000);
		return;
	}else{
		if(parseInt(maxRecords) > parseInt(defaultMaxExportRows)){
			$("#failure_info").html("此操作耗时较长，影响系统性能，请联系数据管理员导出数据");
			//dialog高度调整
			$("#failureDialog").dialog("option","height",'200');
			$( "#failureDialog" ).dialog( "open" );
			setTimeout("$( '#failureDialog' ).dialog( 'close' );", 3000);
			return;
		}else
			$("#export_maxRecords").val(maxRecords);
	}
	var sortname = $("#modelList").getGridParam("sortname");
	var sortorder = $("#modelList").getGridParam("sortorder");
	$("#export_sortname").val(sortname);
	$("#export_sortorder").val(sortorder);
	$("#export_search").val("true");
	$("#progressDialog").dialog("open");
	var totalRecords = $("#modelList").getGridParam("records");
	var maxTime = totalRecords<maxRecords ? totalRecords:maxRecords;
	var timeOut = 3000>maxTime ? 3000:maxTime;
	setTimeout("$( '#progressDialog' ).dialog( 'close' );", timeOut);
	$("#exportForm").attr("action",golbal_context+"/"+modelName+"/export.do");
	$("#exportForm").submit();
}