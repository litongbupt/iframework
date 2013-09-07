package com.bupt.core.system.dao;

import java.util.List;

import com.bupt.core.system.model.Role;
import com.bupt.core.system.model.UserRole;


public interface UserRoleMapper {
	List<Role> getRolesForUserById(int id);
	void insert(UserRole userRole);
	String[] getRoleIdsForUser(int id);
	void delete(int userId);
}