package com.bupt.core.system.service;

import java.util.List;

import com.bupt.core.base.service.BaseService;
import com.bupt.core.security.model.Role;
import com.bupt.core.system.dto.UserAddForm;
import com.bupt.core.system.dto.UserCheckForm;
import com.bupt.core.system.dto.UserDTO;
import com.bupt.core.system.dto.UserModifyForm;
import com.bupt.core.system.model.Department;
import com.bupt.core.system.model.User;

public interface UserService extends BaseService<User,UserDTO>{

	boolean validate(String username, String password);
	
	boolean insertUserAndRoles(UserAddForm userAddForm);
	
	boolean updateUserAndRoles(UserModifyForm userModifyForm);

	boolean deleteUser(String userId);
	
	boolean recoverUserPass(String userId);
	
	List<Role> getAllRoles();

	List<Department> getAllDepartments();

	/**
	 * 检查用户名是否存在
	 * @param loginName
	 * @return
	 * @author 李彤 2013-8-20 下午3:05:50
	 */
	User validateExist(String loginName);
	
	UserModifyForm getUserRolesAndInfo(String userId);

	UserCheckForm getInfoForCheck(String userId);
}
