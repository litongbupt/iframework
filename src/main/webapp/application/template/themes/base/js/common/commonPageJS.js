//为表单加载数据
//表单的Id作为参数
function formLoadData(formId,data){
	var dataForm = data;
 	//首先判断data类型，若为字符串则将其转换为json对象，若为json对象则不用重复转换
 	if(typeof(data) == "string") dataForm = $.parseJSON(data);
	else if(typeof(data) == "object") dataForm = data;
 	for(var obj in dataForm){
 	if(obj=="mainData"){
		for(var title in dataForm[obj]){
			var elemetObj;			
			if($("#"+formId+" [name="+title+"]")&&$("#"+formId+" [name="+title+"]").length>0){
				elemetObj = $("#"+formId+" [name="+title+"]");
				//填充input域
				if(elemetObj.get(0).tagName=="INPUT")
					{
					if(elemetObj.attr("type")=="radio"){//单选按钮
						for(var i=0;i<elemetObj.length;i++){
							if(elemetObj.eq(i).val()==dataForm[obj][title]){
								elemetObj.eq(i).attr("checked","checked");
							}
						}
					}
					else{
						//填充文本框
						if(elemetObj.attr("type")!="file")//忽略上传控件
							elemetObj.val(dataForm[obj][title]);
					}
				}
				//填充文本区域
				else if(elemetObj.get(0).tagName=="TEXTAREA")
				    {
					elemetObj.val(dataForm[obj][title]);
				    }
				}
			}
 		}else if($("#"+formId+" [name="+obj+"]") && $("#"+formId+" [name="+obj+"]").length>0){
			var selectObj = $("#"+formId+" [name="+obj+"]");
			//填充下拉框
			if(selectObj.get(0).tagName=="SELECT")
			    for(var i=0;i<dataForm[obj].length; i++){
			    	if(dataForm[obj][i]["value"]!=null&&dataForm[obj][i]["value"]!=""){
			    		if(dataForm[obj][i]["selected"]==true)
							selectObj.get(0).add(new Option(dataForm[obj][i]["value"], dataForm[obj][i]["value"], false, true));
						else 
							selectObj.get(0).add(new Option(dataForm[obj][i]["name"], dataForm[obj][i]["value"]));
			    	}else if(dataForm[obj][i]["id"]!=null&&dataForm[obj][i]["id"]!=""){
			    		if(dataForm[obj][i]["selected"]==true)
							selectObj.get(0).add(new Option(dataForm[obj][i]["name"], dataForm[obj][i]["id"], false, true));
						else 
							selectObj.get(0).add(new Option(dataForm[obj][i]["name"], dataForm[obj][i]["id"]));
			    	}else{
			    		if(dataForm[obj][i]["selected"]==true)
							selectObj.get(0).add(new Option(dataForm[obj][i]["name"],"", false, true));
						else 
							selectObj.get(0).add(new Option(dataForm[obj][i]["name"],""));
			    	}
			    }
			else if(selectObj.get(0).tagName=="INPUT")
				//填充文本框
				if(selectObj.attr("type")!="file")//忽略上传控件
					selectObj.val(dataForm[obj]);
		}
 	}
}

//重置表单
//表单的Id作为参数，不清空，使表单回到初始状态
function resetForm(formId){
	//清空input text域
	 $(formId +" :text").each(function() {
		 $(this).attr("value", "");
	 });
	 //清空textarea域
	 $(formId +" textarea").each(function() {
		 $(this).attr("value", "");
	 });
	 //重置 select域
	 $(formId +" select").each(function() {
		 $(this).get(0).options[0].selected = true;
	 });
	//清空span
	 $(formId + " span.portlert-form-msg-alert").each(function(){
		 $(this).html("&nbsp;");
	 });
}
 
 //禁用按钮
 function disableButton() {
	 $(".ui-dialog-buttonpane button").attr("disabled","disabled"); 
 }
 //启用按钮
 function enableButton() {
	 $(".ui-dialog-buttonpane button").removeAttr("disabled");
 }
//操作成功对话框初始化方式  20110524 by luox
 function initSuccessDialog(id) {
	 //固定弹窗的名字，废弃参数id
	 $( "#successDialog" ).dialog({
			autoOpen: false,
			width: '350',
			height:'120',
			resizable:false,
			dialogClass: "littleDialog",
			draggable:false,
			hide: 'fade',
			close:function(){
		 		window.location.reload();
			}
		});
 }
 //不自动刷新的成功返回弹窗
 function initSuccessDialogWithNoRefresh(id) {
	 $( "#successDialogWithNoRefresh" ).dialog({
			autoOpen: false,
			width: '350',
			height:'120',
			resizable:false,
			dialogClass: "littleDialog",
			draggable:false,
			hide: 'fade',
			close:function(){
		 		//window.location.reload();
			}
		});
 }
 
 //操作失败对话框初始化方式  20110524 by luox
 function initFailureDialog(id) {
	 $( "#"+id ).dialog({
			autoOpen: false,
			width: '350',
			height:'120',
			resizable:false,
			dialogClass: "littleDialog",
			draggable:false,
			hide: 'fade',
			close:function(){}
		});
 }
 
 function initConfirmDialog(id) {
	 $( "#" + id ).dialog({
			autoOpen: false,
			width: '350',
			height:'120',
			modal: true,
			resizable:false,
			draggable:false,
			show: 'fade',
			hide: 'fade',
			buttons: {
				"确定": function (){
					$( this ).dialog("close");
				},
				"取消": function(){
					$( this ).dialog("close");
				}
			}
		});
 }
 
 var degree = 0;
 function initProgressbar(id) {
	 degree = 0;
	 $( "#"+id).progressbar({ value: degree });
		setTimeout(callback, 500);
 }
 
 //刷新
 function callback() {
	 degree += 5;
	 if(degree >100)
			degree=0;
	 $( "#divProgressbar").progressbar({ value: degree });
	 setTimeout(callback, 500);	
 }
 
 function initAlertDialog(id){
	 $("#"+id).dialog({
		 	autoOpen: false,
		 	width: '300',
		 	height:'120',
		 	resizable:false,
		 	draggable:false,
		 	hide: 'fade',
		 	buttons:''
		 });
 }

	function alertJQ(message, timeOut, width, height) {	
		
		$("#alert-msg").html(message);
		
		if(timeOut != undefined && timeOut !=""){
			$("#alertDialog").dialog('option','buttons',"");
			setTimeout("$( '#alertDialog' ).dialog( 'close' );", timeOut);
		}else{
			$("#alertDialog").dialog('option','buttons',{
				"确定" : function() {
					$(this).dialog("close");
				}
			});
		}

		if(width != undefined && width !=""){
			$("#alertDialog").dialog('option','width',width);
		}
		if(height != undefined && height !=""){
			$("#alertDialog").dialog('option','height',height);
		}
		
		$("#alertDialog").dialog("open");
		
	}
	

function initConfirmDialog(id) {
	$("#"+id).dialog({
		autoOpen : false,
		width : '300',
		height : '120',
		modal : true,
		resizable : false,
		draggable : false,
		show : 'fade',
		hide : 'fade'
	});
}
 
function confirmJQ(message, callback, data, width, height) {
	
	$("#confirm-msg").html(message);
	$("#confirmDialog").dialog('option','buttons',{
		"确定" : function() {
			if (data == undefined || data ==""){
			  callback();
			}else{
			  callback(data);
			}
			$(this).dialog("close");
		},
		"取消" : function() {
			$(this).dialog("close");
		}
	});
	
	if(width != undefined && width !=""){
		$("#confirmDialog").dialog('option','width',width);
	}
	if(height != undefined && height !=""){
		$("#confirmDialog").dialog('option','height',height);
	}
	
	$("#confirmDialog").dialog("open");
}

 //调用成功或者返回对话框，data为ajax返回值，dialogName为当前操作的窗口名称
 function sucOrFailReturnDialog(data, dialogName){
	 if(data == "success") {
			$( "#" + dialogName ).dialog( "close" );
			$( "#successDialog" ).dialog( "open" );
			//因为在dialog定义中的close方法中加了reload操作，所以只要调用close方法就可以了
			setTimeout("$( '#successDialog' ).dialog( 'close' );", 1000);
			//下面的语句执行不到？
			/*alert(3213123);
			window.location.reload();*/
		}else if(data == "failure") {
			$( "#failureDialog" ).dialog( "open" );
			setTimeout("$( '#failureDialog' ).dialog( 'close' );", 1000);
		}
 }
  function sucOrFailRefReturnDialog(data, dialogName){
	 if(data == "success") {
			$( "#" + dialogName ).dialog( "close" );
			$( "#successDialogWithNoRefresh" ).dialog( "open" );
			//因为在dialog定义中的close方法中加了reload操作，所以只要调用close方法就可以了
			setTimeout("$( '#successDialogWithNoRefresh' ).dialog( 'close' );", 1000);
	
		}else if(data == "failure") {
			$( "#failureDialog" ).dialog( "open" );
			setTimeout("$( '#failureDialog' ).dialog( 'close' );", 1000);
		}
 }

//将数字转换为中文小写
 function num2Chinese(num){
	 var number = Number(num);
	 switch(number){
	 	case 0:
			return '○';
		case 1:
			return '一';
		case 2:
			return '二';
		case 3:
			return '三';
		case 4:
			return '四';
		case 5:
			return '五';
		case 6:
			return '六';
		case 7:
			return '七';
		case 8:
			return '八';
		case 9:
			return '九';
	 }
 }
//初始化默认日历控件，默认日历控件日期格式为：yy-mm-dd，elements为需要添加日历控件的表单元素的数组
function initDefaultDatepicker(elements){
	if(elements.length == 0 ){
		alert("请提供需要添加日历控件的表单元素！");
		return;
	}
	for(var i=0; i<elements.length; i++){
		$('#' + elements[i]).datetimepicker({
				//inline: true,
				dateFormat: 'yy-mm-dd',
				//timeFormat: 'hh:mm:ss',
				dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
				dayNamesMin:['日', '一', '二', '三', '四', '五', '六'],
				firstDay: 1,
				monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				showButtonPanel: true,
				currentText: '当前',
				closeText: '关闭',
				changeMonth: true,
				changeYear: true
				//showAnim: 'fade',
				//showSecond:true
			});
	}
}
	
//初始化客户化日历控件，elements为需要添加日历控件的表单元素的数组，dateFormat为日历控件的日期格式字符串，标准见jquery文档
function initCustomerDatepicker(elements, dateFormat){
	if(elements.length == 0 ){
		alert("请提供需要添加日历控件的表单元素！");
		return;
	}
	for(var i=0; i<elements.length; i++){
		$('#' + elements[i]).datetimepicker({
				//inline: true,
				dateFormat: dateFormat,
				dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
				dayNamesMin:['日', '一', '二', '三', '四', '五', '六'],
				firstDay: 1,
				monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				showButtonPanel: true,
				currentText: '今天',
				closeText: '关闭',
				//changeMonth: true,
				//changeYear: true,
				showAnim: 'fade'
				
			});
	}
}

//初始化客户化日历控件，elements为需要添加日历控件的表单元素的数组，dateFormat为日历控件的日期格式字符串，标准见jquery文档
function initCustomerDatepicker(elements, dateFormat, timeFormat){
	if(elements.length == 0 ){
		alert("请提供需要添加日历控件的表单元素！");
		return;
	}
	for(var i=0; i<elements.length; i++){
		$('#' + elements[i]).datetimepicker({
				//inline: true,
				dateFormat: dateFormat,
				timeFormat: timeFormat,
				dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
				dayNamesMin:['日', '一', '二', '三', '四', '五', '六'],
				firstDay: 1,
				monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				showButtonPanel: true,
				currentText: '今天',
				closeText: '关闭',
				//changeMonth: true,
				//changeYear: true,
				showAnim: 'fade',
				showSecond:false,
				showMinute:false,
			});
	}
}

//初始化客户化日历控件，elements为需要添加日历控件的表单元素的数组，timeFormat为日历控件的日期格式字符串，标准见jquery文档
function initCustomerDatepicker(elements, dateFormat, timeFormat,changeMonth,changeYear,showSecond,showMinute){
	if(elements.length == 0 ){
		alert("请提供需要添加日历控件的表单元素！");
		return;
	}
	for(var i=0; i<elements.length; i++){
		$('#' + elements[i]).datetimepicker({
				//inline: true,
				dateFormat: dateFormat,
				timeFormat: timeFormat,
				dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
				dayNamesMin:['日', '一', '二', '三', '四', '五', '六'],
				firstDay: 1,
				monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				showButtonPanel: true,
				currentText: '今天',
				closeText: '关闭',
				changeMonth: changeMonth,
				changeYear: changeYear,
				showAnim: 'fade',
				showSecond:showSecond,
				showMinute:showMinute
			});
	}
}

//初始化自动补全控件
function initAutoComplete(element,data){
	$('#' + element).autocomplete(data,{
		width: 180,
		minChars: 0,
		//max: 15,
		matchContains: true,
		scroll: true,
		scrollHeight: 180
	});
}
//将表单数据序列化到json对象
(function($){  
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        var array=this.serializeArray();  
        var str=this.serialize();  
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
    };  
})(jQuery); 

function validateRole(msgId,roleStr){
	
	var height = document.documentElement.clientHeight/2;
	var width =  document.documentElement.clientWidth/2-100;
	//登录验证
	if(global_userId==""||global_userId==undefined){
		var html= "<div style='position:absolute;top:"+height+"px;left:"+width+"px;color:red;'>您尚未登录，请点击<a href='/DRTS/system/system_login.jsp' target = '_parent'>登录</a>！</div>";
		$("#"+msgId).append(html);
		return false;
	}
	//权限验证
	if(global_role==""||global_role==undefined||roleStr.indexOf(global_role)<0){
		var html= "<div style='position:absolute;top:"+height+"px;left:"+width+"px;color:red;'>您无权访问此页面！</div>";
		$("#"+msgId).append(html);
		return false;
	}
	return true;
}

