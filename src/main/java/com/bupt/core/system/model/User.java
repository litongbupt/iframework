package com.bupt.core.system.model;

import java.util.List;

public class User {
	
	/**
	 * 用户ID
	 */
	private Integer userId;

	/**
	 * 登录名
	 */
	private String loginName;

	/**
	 * 密码
	 */
	private String password;

	/**
	 * 状态
	 */
	private String status;

	/**
	 * 部门id
	 */
	private Integer departmentId;

	/**
	 * 用户姓名
	 */
	private String uesrName;
	/**
	 * 角色Roles
	 */
	private List<Role> roles;
	
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName == null ? null : loginName.trim();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password == null ? null : password.trim();
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status == null ? null : status.trim();
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getUesrName() {
		return uesrName;
	}

	public void setUesrName(String uesrName) {
		this.uesrName = uesrName == null ? null : uesrName.trim();
	}

	private List<Role> roleList;
	
    public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", loginName=" + loginName
				+ ", password=" + password + ", status=" + status
				+ ", departmentId=" + departmentId + ", uesrName=" + uesrName
				+ "]";
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
    
    
}