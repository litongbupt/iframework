package com.bupt.core.system.dto;

public class UserDTO {

	/**
	 * 用户ID
	 */
	private Integer userId;

	/**
	 * 登录名
	 */
	private String loginName;


	/**
	 * 状态
	 */
	private String status;

	/**
	 * 部门名
	 */
	private String departmentName;
	/**
	 * 角色名，可以是多个，以“，”分隔
	 */
	private String RoleNames;
	
	/**
	 * 用户姓名
	 */
	private String userName;

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status == null ? null : status.trim();
	}


	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName == null ? null : userName.trim();
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public String getRoleNames() {
		return RoleNames;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public void setRoleNames(String roleNames) {
		RoleNames = roleNames;
	}
	
}
