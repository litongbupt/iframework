package com.bupt.core.security.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bupt.core.security.dao.CourseMapper;
import com.bupt.core.security.model.Course;
import com.bupt.core.security.service.AuthService;
@Controller
@RequestMapping("/auth")
public class AuthAction {
	//将spring 配置文件中的bean 通过setter注入进来
	@Resource(name="authService")
	private AuthService authService=null;
	@Resource(name="courseMapper")
	private CourseMapper courseMapper;
	private final Log log = LogFactory.getLog(getClass());
	private boolean debug = log.isDebugEnabled();
	
	@RequestMapping("/login.do")
	public String login(HttpServletRequest request, ModelMap modelMap)
			throws Exception {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		System.out.println(username+password);
		boolean flag= authService.validate(username, password);
		if(debug){
			log.debug("$$$$$$$$$$$$$$$$$$$$$you want to check the result.jsp+++++++++++++");
			log.debug("$$$$$$$$$$$$$$$$$$$$$ ready to insert   +++++++++++++");
			log.debug("$$$$$$$$$$$$$$$$$$$$$ insert completed +++++++++++++");
			log.debug(flag);
		}
		return "result";
	}
	
	//获取当前用户的信息
	//UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
	//返回json对象示例
	@RequestMapping("/courseWare_courseTreeList.do")
	@ResponseBody
	public List<Course> getCourseTreeList()
			throws Exception {
		List<Course> list_show = courseMapper.getCourseList();
		return list_show;
	}

	public AuthService getAuthService() {
		return authService;
	}

	public void setAuthService(AuthService authService) {
		this.authService = authService;
	}




}
