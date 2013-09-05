<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/init.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>J2EE基础框架</title>
<jsp:include page="../common/meta.jsp" flush="true" />
<jsp:include page="../common/style.jsp" flush="true" />
</head>
<body>
	<div class="leftSide">
		<div class="nav">
			<div class="top">管理平台</div>
			<dl id="menu3">
				<dt>
					<div class="icon1"
						onClick="Menu('<%=modulesPath%>system/system_organ_main.jsp');">机构管理</div>
				</dt>
				<dt>
					<div class="icon2"
						onClick="Menu('<%=modulesPath%>system/system_user_main.jsp');">用户管理</div>
				</dt>
				<dt>
					<div class="icon3"
						onClick="Menu('<%=modulesPath%>course/course_ware_main.jsp');">课件管理</div>
				</dt>
				<dt>
					<div class="icon4">题库管理</div>
				</dt>
				<dd>
					<a href="javascript:void(0)"
						onClick="Menu('question/question_type_main.jsp');">试题类型管理</a> <a
						href="javascript:void(0)"
						onClick="Menu('question/question_main.jsp');">试题管理</a>
				</dd>
				<dt>
					<div class="icon5">考试管理</div>
				</dt>
				<dd>
					<a href="javascript:void(0)"
						onClick="Menu('exam/exam_info_main.jsp');">考试信息管理</a> <a
						href="javascript:void(0)"
						onClick="Menu('exam/exam_paper_tactic_main.jsp');">试卷生成策略管理</a> <a
						href="javascript:void(0)"
						onClick="Menu('exam/exam_paper_main.jsp');">试卷管理</a>
				</dd>
				<dt>
					<div class="icon6" onClick="Menu('exam/exam_analysis_main.jsp');">成绩分析</div>
				</dt>
				<dt>
					<div class="icon7"
						onClick="Menu('problem/problem_answer_main.jsp');">在线答疑</div>
				</dt>
				<dt>
					<div class="icon8" onClick="Menu('course/course_learn_main.jsp');">在线学习</div>
				</dt>
				<dt>
					<div class="icon9"
						onClick="Menu('question/question_test_main.jsp');">在线练习</div>
				</dt>
				<dt>
					<div class="icon10" onClick="Menu('exam/exam_online_main.jsp');">在线考试</div>
				</dt>
				<dt>
					<div class="icon11"
						onClick="Menu('problem/problem_raise_main.jsp');">在线提问</div>
				</dt>
			</dl>
		</div>
	</div>
	<jsp:include page="../common/script.jsp" flush="true" />
	<script type="text/javascript">
		function Menu(url) {//重写父窗口中右侧子窗口iframe的src，实现左侧子窗口控制父窗口并显示内容在右侧子窗口
			$('#rightFrame', window.parent.document).attr('src', url);
		}
	</script>
</body>

</html>
