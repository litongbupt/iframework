$(function(){
	//权限验证
//	if(validateRole('activity_pane','0')== false){
//		$(".content").empty();
//		return;
//	}
	//主页面表格
	$("#organList").jqGrid({
	    url:golbal_context+"system/organ_organList.action",
	    datatype: 'json',
	    mtype: 'POST',
	    width:'100%',
	    height:'auto',
	    autowidth:true,
	    //multiselect:false, //是否在首列加入复选框
	    //multiselectWidth:30, //复选框的宽度
	    colNames:[	'机构编号',
	    			'机构名',
	    			'说明',
					'配&nbsp;置'
	    			],
	    colModel:[   	    	
	   	    {name:'num',index:'num',width:30,sortable:true,align:'center'},
	        {name:'name',index:'name',width:30,sortable:true,align:'center'},
	        {name:'description',index:'description',width:50,sortable:true,align:'center'},
	        {name:'setup',width:20,sortable:false,align:'center' }
	        
	    ],
	    pager: "#organListPager",	    
	    sortname: 'num',
	    sortorder: 'asc',
	    rowNum:20,
	    rowList:[10,20,50],
	    viewrecords: true,
	    gridview: true,
	    prmNames : {  
		    page:"pageNo",    // 表示请求页码的参数名称  
		    rows:"rows",    // 表示请求行数的参数名称  
		    totalrows:"totalrows", // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal  
		   	search: "search",// 表示是否是搜索请求的参数名称
		    sort:"sortName",
		    order:"sortOrder"
		},
		jsonReader: {  
	        root:"contents", 
	        page: "pageNo",
	        total: "totalPages",
	        records: "totalRecords",
	        id:"num",
	        repeatitems : false 
	    },
	     gridComplete:function(){  //在此事件中循环为每一行添加详细信息	     	
             var ids=$(this).jqGrid('getDataIDs'); 
             for(var i=0; i<ids.length; i++){
                var id=ids[i];             
             	 var setupstr = "<img id='" + id + "' src='/iframework/application/modules/images/user_modify.gif' title='修改' style='cursor:pointer;' onclick='modifyOrganIn(this.id);'/>&nbsp;&nbsp;";
		    		setupstr += "<img id='" + id + "' src='/iframework/application/modules/images/user_del.gif' title='删除' style='cursor:pointer;' onclick='delOrganCF(this.id);'/>";
		    		$(this).jqGrid("setCell",id,"setup",setupstr,{'padding':'2px 0 0 0'});
             }
			var bodyObj=document.getElementById('main-content');
			if(bodyObj.scrollHeight>bodyObj.clientHeight||bodyObj.offsetHeight>bodyObj.clientHeight){
				$("#main-content .toolBar").css('width',$(this).width()-10);
			}
        }          
        
  	}); 	
	
	 //功能配置信息对话框
  	$( "#organDialog" ).dialog({
  		title:'增加机构',
		autoOpen: false,
		width: '600',
		height:'auto',
		modal: true,
		resizable:true,
		show: 'fade',
		hide: 'fade',
 		close:function(){
 			$( this ).empty();
 		}
	});	
	
});	

//保存当前选择的行Id
var selectId = "";

//增加机构入口函数
function addOrgIn(){
	$('#activity_pane').showLoading();
	$("#organDialog").dialog('option', 'title', '新增机构');
	$("#organDialog").dialog('option','buttons',{
		"确定" : addOrganOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	//$("#organDialog").dialog('option', 'width', '800');
	selectId = $("#organList").jqGrid("getGridParam", "selrow");
	//加载基本信息页面
	$( "#organDialog" ).load('/iframework/application/modules/system/system_organ_add_dialog.jsp', addOrganInCB);
	
}

//新增机构入口回调
function addOrganInCB(){

	//增加表单验证
	$("#addOrganForm").validate({
		rules:{
			 num:{
				required:true,maxlength:20,byteRangeLength:[0,20],stringEN:true,
				remote: {   
	  				url: "/iframework/application/modules/system/organ_validateNum.action",     //后台处理程序   
	  				type: "post",               //数据发送方式
	  				dataType: "json"           //接受数据格式   
  				}
			},
			name:{
				required:true,maxlength:30,byteRangeLength:[0,30],
				remote: {   
	  				url: "/iframework/application/modules/system/organ_validateName.action",     //后台处理程序   
	  				type: "post",               //数据发送方式
	  				dataType: "json"           //接受数据格式   
  				}
			},
			description:{maxlength:255,byteRangeLength:[0,255]}
		},
		onkeyup:false,
		onclick:false,
		errorPlacement: function(error, element) { //指定错误信息位置
          error.appendTo(element.parent().children().filter("span"));
     	},
     	messages:{
	       	num:{remote:"此机构编号已存在"},
	       	name:{remote:"此机构名称已存在"}
     	},
	  	submitHandler:function(){ //验证通过后调用此函数
	  		//禁用按钮
	  	 	disableButton();
	  	 	$('#activity_pane').showLoading();
	    	$("#addOrganForm").ajaxSubmit({
				url:"/iframework/application/modules/system/organ_addOrgan.action",
				success:addOrganOutCB
			});
	  	}
	});

	//注册增加ajax表单
	$("#addOrganForm").ajaxForm();
	$('#activity_pane').hideLoading();
	$( "#organDialog" ).dialog("open");
}

//新增机构出口
function addOrganOut(){
	$("#addOrganForm").submit();
}

//新增机构出口回调
function addOrganOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	var organ = data.organ;
	if(data.result == "success") {
		$("#organDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
		if(selectId){
			$("#organList").jqGrid("addRowData", organ.num, organ, "before", selectId);
		}else {
			$("#organList").jqGrid("addRowData", organ.num, organ, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}

//修改机构入口函数
function modifyOrganIn(num){
	$('#activity_pane').showLoading();
	$("#organDialog").dialog('option', 'title', '修改机构');
	$("#organDialog").dialog('option','buttons',{
		"确定" : modifyOrganOut,
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	//$("#organDialog").dialog('option', 'width', '800');
	selectId = num;

	//加载基本信息页面
	$( "#organDialog" ).load('/iframework/application/modules/system/system_organ_modify_dialog.jsp',function(){
		$.post("/iframework/application/modules/system/organ_modifyOrganIn.action",{num:num},modifyOrganInCB);
	});
}

//修改机构入口回调
function modifyOrganInCB(data){
	//为表单加载数据
	formLoadData("modifyOrganForm",data);
	
	//修改表单验证
	$("#modifyOrganForm").validate({
		rules:{
			name:{required:true,maxlength:30,byteRangeLength:[0,30] ,
				remote: {   
    				url: "/iframework/application/modules/system/organ_validateName.action",     //后台处理程序   
    				type: "post",               //数据发送方式
    				dataType: "json",           //接受数据格式   
    				data:{num:selectId}
				}
			},
			description:{maxlength:255,byteRangeLength:[0,255]}
			
		},
		onkeyup:false,
		errorPlacement: function(error, element) { //指定错误信息位置
			element.parent().children().filter("span").append("<br/>");
      		error.appendTo(element.parent().children().filter("span"));
       	},
       	messages:{
       		name:{remote:"此机构名称已存在"}
       	},
       	submitHandler:function(){ //验证通过后调用此函数
    		//禁用按钮
    	 	disableButton();
    	 	$('#activity_pane').showLoading();
    	
	    	$("#modifyOrganForm").ajaxSubmit({
    			url:"/iframework/application/modules/system/organ_modifyOrganOut.action",
    			success:modifyOrganOutCB
   			});
    	}	
	});
	//注册增加用户ajax表单
	$("#modifyOrganForm").ajaxForm();
	$('#activity_pane').hideLoading();
 	$( "#organDialog" ).dialog("open");
}
//修改机构出口
function modifyOrganOut(){
 
		$("#modifyOrganForm").submit();
	
}
//修改机构出口回调函数
function modifyOrganOutCB(data){
	//启用按钮
	enableButton();
	$('#activity_pane').hideLoading();
	
	var organ = data.organ;
	if(data.result == "success") {
		$("#organDialog").dialog( "close" );
		alertJQ("操作成功，请等待页面刷新！",1000);
	
		if(selectId){		
			$("#organList").jqGrid("setRowData", organ.num, organ, "before", selectId);
		}else {
			$("#organList").jqGrid("setRowData", organ.num, organ, "first");
		}
	}else if(data.result == "failure") {
		alertJQ(data.resultInfo);
	}
}
 
 //确认删除
function delOrganCF(id) {
	$('#activity_pane').showLoading();
	
	$.post("/iframework/application/modules/system/organ_isOrganExistUser.action",{organ:id},function(data){
		$('#activity_pane').hideLoading();
		if(data == true)
			confirmJQ("此机构下有用户存在，确认删除？",delOrgan,id);
		else
			confirmJQ("确认删除此机构吗？",delOrgan,id);
	});
}

//删除试卷生成策略
function delOrgan(id) {
	$('#activity_pane').showLoading();
	
	$.post("/iframework/application/modules/system/organ_deleteOrgan.action",{id:id},function(data){
		$('#activity_pane').hideLoading();
		
	 	if(data.result == "success") {
	 		alertJQ("操作成功，请等待页面刷新",1000);
			$("#organList").jqGrid("delRowData", id);
		}else if(data.result == "failure") {
			alertJQ(data.resultInfo);
		}
	});
}