<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String themesPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/application/template/themes/base/";
%>
	<!-- jQuery -->
<script type="text/javascript" src="<%=themesPath %>js/jquery/jquery-1.7.2.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/jquery/jquery-ui-1.8.20.custom.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath%>js/zTree/jquery.ztree.all-3.5.min.js"></script>
<script type="text/javascript" src="<%=themesPath%>js/zTree/jquery.ztree.exhide-3.5.min.js"></script>
<script type="text/javascript" src="<%=themesPath %>js/jquery/jquery.effects.fade.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/jqgrid/i18n/grid.locale-cn.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/jqgrid/jquery.jqGrid.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/jquery/simpla.jquery.configuration.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/jquery/jquery.form.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/jquery/jquery.validate.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/jquery/jquery-ui-timepicker-addon.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/loading/lazyload-min.js"></script>

<script type="text/javascript" src="<%=themesPath %>js/common/json2.js"></script>
<script type="text/javascript" src="<%=themesPath %>js/common/layout.js"></script>
<script type="text/javascript" src="<%=themesPath %>js/common/commonPageJS.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/common/form_cn.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/common/form_customer_validate.js" charset="UTF-8"></script>
<script type="text/javascript" src="<%=themesPath %>js/loading/jquery.showLoading.js"></script>
<script type="text/javascript" src="<%=themesPath%>js/jquery/jquery.autocomplete.min.js" charset="UTF-8"></script>
<!-- 
<input type="hidden" id="global_userId" value="${sessionScope.user.userId}"/>
<input type="hidden" id="global_role" value="${sessionScope.user.role}"/>
 -->
<input type="hidden" id="global_context" value="${pageContext.request.contextPath}"/>

<script type="text/javascript">
//var global_userId = $("#global_userId").val();
//var global_role = $("#global_role").val();
var golbal_context =  $("#global_context").val();
var golbal_jsp_position = golbal_context+"/application/modules";
</script>