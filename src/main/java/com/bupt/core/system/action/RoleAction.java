package com.bupt.core.system.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bupt.core.base.action.JqGridBaseAction;
import com.bupt.core.system.dto.RoleDTO;
import com.bupt.core.system.service.RoleService;
import com.bupt.core.system.service.RoleService;

@Controller
@RequestMapping("/system/role")
public class RoleAction extends JqGridBaseAction<RoleDTO>{
	
	private final Log log = LogFactory.getLog(getClass());
	private boolean debug = log.isDebugEnabled();
	
	//将spring 配置文件中的bean 通过setter注入进来
	@Resource(name="roleService")
	private RoleService roleService=null;

	@Override
	public List<RoleDTO> listResults(int start, int limit, String sortName,
			String sortOrder, HttpServletRequest request, Boolean search) {
		return this.roleService.listResults(start, limit, sortName, sortOrder, request,search);
	}

	@Override
	public Integer getTotalRecords(HttpServletRequest request, Boolean search) {
		return roleService.getTotalRecords(request,search);
	}	
	
	@RequestMapping("/info.do")
	@ResponseBody
	public Map<String, List> getRoleSelectInfo(){
		Map<String, List> map = new HashMap();
		//map.put("role", this.roleService.getAllRoles());
		//map.put("organ", this.roleService.getAllDepartments());
		return map;
	}

	public RoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}




}
