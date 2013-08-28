// 字符验证       
jQuery.validator.addMethod("stringCheck", function(value, element) {       
     return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);       
}, "只能包括中文字、英文字母、数字和下划线"); 

//英文字符验证       
jQuery.validator.addMethod("stringEN", function(value, element) {       
     return this.optional(element) || /^\w+$/ .test(value);       
}, "只能包括英文字母、数字和下划线");

//数字和点验证       
jQuery.validator.addMethod("isNumOrDot", function(value, element) {       
     return this.optional(element) || /^[.0-9]+$/ .test(value);       
}, "只能包括数字和点");

// 中文字两个字节       
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {       
    var length = value.length;       
    for(var i = 0; i < value.length; i++){       
       if(value.charCodeAt(i) > 127){       
        length++;       
        }       
    }
    return this.optional(element) || ( length >= param[0] && length <= param[1] );       
}, "请输入字节长度介于 {0} 和 {1} 之间的字符串。(一个中文字符占两个字节)");


//日期时间格式验证       
jQuery.validator.addMethod("dateTime", function(value, element) {       
	var dateTime = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s(([01]\d{1})|(2[0123])):([0-5]\d)(:([0-5]\d))?)?$/;
    return this.optional(element) || (dateTime.test(value));       
}, "日期时间格式错误");  
//时间格式验证
jQuery.validator.addMethod("isTime", function(value, element) {       
	var timeValue = /^(([01]\d{1})|(2[0123]))\u5C0F\u65F6([0-5]\d)\u5206(:([0-5]\d))?$/;
    return this.optional(element) || (timeValue.test(value));       
}, "时间格式错误");
//车牌号验证
jQuery.validator.addMethod("vehicleNo", function(value, element) { 
	var num = /^[\u4e00-\u9fa5][A-Z](?:\-|\.)?[A-Z0-9]{5}$|^WJ[0-9]{2}(?:\-|\.)?(?:[\u4e00-\u9fa5]|[A-Z0-9])[A-Z0-9]{4}$/; 
	return this.optional(element) || (num.test(value)); 
}, "车牌号格式错误");

//IP地址验证
jQuery.validator.addMethod("isIP", function(value, element) { 
	var ip = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; 
	return this.optional(element) || (ip.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256)); 
	}, "IP地址格式错误");
//子网掩码验证
jQuery.validator.addMethod("isMark", function(value, element) { 
	var mark = /^((254|252|248|240|224|192|128|0)\.0\.0\.0)|(255\.(254|252|248|240|224|192|128|0)\.0\.0)|(255\.255\.(254|252|248|240|224|192|128|0)\.0)|(255\.255\.255\.(254|252|248|240|224|192|128|0))$/;
	return this.optional(element) || (mark.test(value)); 
	}, "子网掩码格式错误");
//IP地址/子网掩码验证
jQuery.validator.addMethod("isIPMark", function(value, element) {
	var ipMark = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/?(?:((?:254|252|248|240|224|192|128|0)\.0\.0\.0)|(255\.(?:254|252|248|240|224|192|128|0)\.0\.0)|(255\.255\.(?:254|252|248|240|224|192|128|0)\.0)|(255\.255\.255\.(?:254|252|248|240|224|192|128|0)))?$/; 
	return this.optional(element) || (ipMark.test(value)); 
	}, "IP地址/子网掩码格式错误");
// 身份证号码验证       
jQuery.validator.addMethod("isIdCardNo", function(value, element) {       
    return this.optional(element) || isIdCardNo(value);       
}, "请正确输入您的身份证号码");
     
// 手机号码验证       
jQuery.validator.addMethod("isMobile", function(value, element) {       
    var length = value.length;   
    var mobile = /^(1[3,5,8]\d{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));       
}, "请正确填写您的手机号码");       
     
// 电话号码验证       
jQuery.validator.addMethod("isTel", function(value, element) {       
    var tel = /^\d{3,4}-?\d{7,9}$/;    //电话号码格式010-12345678   
    return this.optional(element) || (tel.test(value));       
}, "请正确填写您的电话号码");   
  
// 联系电话(手机/电话皆可)验证   
jQuery.validator.addMethod("isPhone", function(value,element) {
    var mobile = /^(1[3,5,8]\d{9})$/;
    var tel = /^\d{3,4}-?\d{7,9}$/;   
    return this.optional(element) || (tel.test(value) || mobile.test(value));   
  
}, "请正确填写您的联系电话");   
     
// 邮政编码验证       
jQuery.validator.addMethod("isZipCode", function(value, element) {       
    var tel = /^[0-9]{6}$/;       
    return this.optional(element) || (tel.test(value));       
}, "请正确填写您的邮政编码");  

//自定义列表中重复值的校验方法,第一个参数是列表ID，第二个参数是列字段序号
$.validator.addMethod("gridValueExisted", function(value, element, param) {       

	var col= $("#"+param[0]).jqGrid('getCol',param[1],false);//获取列名为name的列的值
	var result = true;
	for(var i=0;i<col.length;i++){
		if(value == col[i]){
			result = false;
			return false;
		}
	}
	return result;
}, "在列表中已存在");

//自定义树节点编号重复校验方法,第一个参数树ID，第二个参数是树节点id
$.validator.addMethod("treeNodeNumExisted", function(value, element, param) {       
		var treeObj = $.fn.zTree.getZTreeObj(param[0]);
		var nodes = treeObj.transformToArray(treeObj.getNodes());
		
		var result = true;
		$.each(nodes,function(i, n){
			//不能重复
			if(value == n.num && param[1] != n.id) {
				result = false;
				return false;
			}
		});
		return result;
}, "此节点编号已存在");

//自定义树节点名称重复校验方法,第一个参数树ID，第二个参数是当前节点类型,第三个参数是资源树节点编号，第四个参数是父节点编号
$.validator.addMethod("treeNodeNameExisted", function(value, element, param) {
		var treeObj = $.fn.zTree.getZTreeObj(param[0]);
		//获得当前节点的父节点
		var pNode = treeObj.getNodesByFilter(function(node){
			return node.id == param[1];
		},true);
		//在父节点下查找是否有重名的节点
		var cNode = treeObj.getNodesByFilter(function(node){
			return node.name == value && node.num != param[2];
		},true,pNode);
		if(cNode == null){
			return true;
		}else{
			return false;
		}
}, "此节点名称已存在");  

//自定义站点下资源实例名称重复校验方法,第一个参数树ID，第二个参数是当前节点类型,第三个参数是资源树节点编号,第四个参数是当前资源的站点编号
$.validator.addMethod("instanceNameExistedInSite", function(value, element, param) {
		var treeObj = $.fn.zTree.getZTreeObj(param[0]);
		//获得当前站点节点
		var snode = treeObj.getNodesByFilter(function(node){
			return node.type == "ZD" && node.resourceNum == $("#"+param[3]).val();
		},true);
		
		//在当前站点节点下查找是否有重名的资源实例节点
		var inode = treeObj.getNodesByFilter(function(node){
			return node.name == value && node.type == param[1] && node.num != param[2];
		},true,snode);
		
		if(inode == null){
			return true;
		}else{
			return false;
		}
}, "此节点在本站点下已存在");  

//图片格式校验
$.validator.addMethod("photoValidate", function(value, element) {
	if(value==""){     
		return true;     
    }else{
    	var point = value.lastIndexOf(".");     
        var type = value.substr(point);     
        if(type==".jpg"||type==".gif"||type==".JPG"||type==".GIF"||type==".PNG"||type==".png"){     
        	return true;
        }else{     
            return false;     
        }     
    }     
}, "图片格式必须为jpg、gif、png");  

//excel格式校验
$.validator.addMethod("excelValidate", function(value, element, param) {
	if(value==""){     
		return true;     
    }else{
    	var point = value.lastIndexOf(".");     
        var type = value.substr(point);     
        if(type==".xls"||type==".XLS"||type==".xlsx"||type==".XLSX"){     
            return true;
        }else{     
            return false;     
        }     
    }     
}, "非Excel文件"); 
