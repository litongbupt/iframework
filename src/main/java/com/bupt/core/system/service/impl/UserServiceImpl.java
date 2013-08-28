package com.bupt.core.system.service.impl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.bupt.core.security.dao.RoleMapper;
import com.bupt.core.security.model.Role;
import com.bupt.core.security.model.RoleExample;
import com.bupt.core.system.dao.DepartmentMapper;
import com.bupt.core.system.dao.UserInfoMapper;
import com.bupt.core.system.dao.UserMapper;
import com.bupt.core.system.dao.UserRoleMapper;
import com.bupt.core.system.dto.UserAddForm;
import com.bupt.core.system.dto.UserCheckForm;
import com.bupt.core.system.dto.UserDTO;
import com.bupt.core.system.dto.UserModifyForm;
import com.bupt.core.system.model.Department;
import com.bupt.core.system.model.DepartmentExample;
import com.bupt.core.system.model.User;
import com.bupt.core.system.model.UserExample;
import com.bupt.core.system.model.UserExample.Criteria;
import com.bupt.core.system.model.UserInfo;
import com.bupt.core.system.model.UserInfoExample;
import com.bupt.core.system.model.UserRole;
import com.bupt.core.system.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Resource(name="userMapper")
	private UserMapper userMapper;
	@Resource(name="departmentMapper")
	private DepartmentMapper departmentMapper;
	@Resource(name="roleMapper")
	private RoleMapper roleMapper;
	@Resource(name="userRoleMapper")
	private UserRoleMapper userRoleMapper;
	@Resource(name="userInfoMapper")
	private UserInfoMapper userInfoMapper;
	
	private final Log log = LogFactory.getLog(getClass());
	private boolean debug = log.isDebugEnabled();
	
	@Override
	public boolean validate(String username, String password) {
		UserExample ue = new UserExample();
		Criteria criteria = ue.createCriteria();
		criteria.andLoginNameEqualTo(username);
		List<User> resultUserExample = userMapper.selectByExample(ue);

		if(debug){
			log.debug("resultUserExcample: "+resultUserExample);
		}
		
		boolean flag = false;
		if(resultUserExample!=null&&resultUserExample.size()>0&&resultUserExample.get(0).getPassword().equals(password)){
			flag =  true;
		}
		if(debug){
			log.debug("service validate flag: "+flag);
		}
		return flag;
	}


	@Override
	public int deleteByPrimaryKey(Integer id) {
		return userMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(User record) {
		return userMapper.insert(record);
	}

	@Override
	public int insertSelective(User record) {
		return userMapper.insertSelective(record);
	}

	@Override
	public User selectByPrimaryKey(Integer id) {
		return userMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(User record) {
		return updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(User record) {
		return updateByPrimaryKey(record);
	}

	@Override
	public int getTotalRecords(HttpServletRequest request,Boolean search) {
		UserExample ue = new UserExample();
		if(search){
			addCriteria(request, ue);
		}
		return userMapper.countByExample(ue);
	}

	@Override
	public List<UserDTO> listResults(int start, int limit, String sortName,
			String sortOrder, HttpServletRequest request,Boolean search) {
		//TODO 修复百万级查询缺陷
		//List<User> userList = userMapper.listResults(start, limit, sortName, sortOrder, null);
		UserExample ue = new UserExample();
		ue.setOrderByClause( sortName +" "+ sortOrder);
		ue.setStart(start);
		ue.setLimit(limit);
		
		if(search){
			addCriteria(request, ue);
		}

		/*End*/
		
		List<User> userList = userMapper.selectByExample(ue);
		
		List<UserDTO> userDTOList = new ArrayList<UserDTO>();
		UserDTO userDTO = null;
		for (User user : userList) {
			userDTO = new UserDTO();
			userDTO.setLoginName(user.getLoginName());
			userDTO.setUserName(user.getUesrName());
			if (user.getRoles().size()!=0) {
				String roleNames = "";
				int i  = 1;
				for (Role r : user.getRoles()) {
					roleNames += (i++)+"、"+r.getName()+" ";
				}
				userDTO.setRoleNames(roleNames);
			}
			userDTO.setUserId(user.getUserId());
			userDTO.setStatus(user.getStatus());
			if(user.getDepartmentId()!=null){
				userDTO.setDepartmentName(departmentMapper.selectByPrimaryKey(user.getDepartmentId()).getName());
			}
			userDTOList.add(userDTO);
		}
		return userDTOList;
	}


	/**
	 * 查询条件，通过Criteria设置到UserExample中
	 * @param request
	 * @param ue
	 * @author 李彤 2013-8-27 下午3:27:39
	 */
	private void addCriteria(HttpServletRequest request, UserExample ue) {
		String userId = request.getParameter("userId");
		String num = request.getParameter("num");
		String name = request.getParameter("name");
		String role = request.getParameter("role");
		String organ = request.getParameter("organ");
		Criteria criteri = ue.createCriteria();
		if(userId!=null&&!"".equals(userId)) criteri.andUserIdEqualTo(Integer.valueOf(userId));
		if(num!=null&&!"".equals(num)) criteri.andLoginNameEqualTo(num);
		if(name!=null&&!"".equals(name)) criteri.andUesrNameEqualTo(name);
		if(role!=null&&!"".equals(role)) criteri.andUesrRoleEqualTo(Integer.valueOf(role));
		if(organ!=null&&!"".equals(organ)) criteri.andDepartmentIdEqualTo(Integer.valueOf(organ));
	}
	
	public List<Role> getAllRoles(){
		RoleExample ex =  new RoleExample();
		com.bupt.core.security.model.RoleExample.Criteria criteri = ex.createCriteria();
		criteri.andNameIsNotNull();
		List<Role> roles= roleMapper.selectByExample(ex);
		return roles;
	}
	
	public List<Department> getAllDepartments(){
		DepartmentExample de =  new DepartmentExample();
		com.bupt.core.system.model.DepartmentExample.Criteria criteri = de.createCriteria();
		criteri.andNameIsNotNull();
		List<Department> depts= departmentMapper.selectByExample(de);
		return depts;
	}
	
	@Override
	public User validateExist(String loginName) {
		UserExample ue = new UserExample();
		ue.createCriteria().andLoginNameEqualTo(loginName);
		User user = this.userMapper.selectByExample(ue).size()==0?null:this.userMapper.selectByExample(ue).get(0);
		return user;
	}


	@Override
	public boolean insertUserAndRoles(UserAddForm userAddForm) {
		boolean result = true;
		try {
			/*
			 * 增加用户
			 */
			User user = new User();
			user.setUesrName(userAddForm.getUserName());
			user.setLoginName(userAddForm.getLoginName());
			user.setDepartmentId(Integer.valueOf(userAddForm.getOrgan()));
			user.setStatus("normal");
			user.setPassword("88888888");
			userMapper.insertSelective(user);
			int userId = user.getUserId();
			/*
			 * 增加用户信息
			 */
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd"); 
			UserInfo userInfo = new UserInfo();
			userInfo.setUserId(userId);
			try {
				if(userAddForm.getBirthday()!=null&&!"".equals(userAddForm.getBirthday())) 
					userInfo.setBirthday(format.parse(userAddForm.getBirthday()));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			userInfo.setEmail(userAddForm.getEmail());
			try {
				if(userAddForm.getHireday()!=null&&!"".equals(userAddForm.getHireday())) 
					userInfo.setHireday(format.parse(userAddForm.getHireday()));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			userInfo.setStation(userAddForm.getStation());
			userInfo.setTelephone(userAddForm.getTelephone());
			userInfoMapper.insertSelective(userInfo);
			/*
			 * 为该用户增加角色
			 */
			String[] roles = userAddForm.getRoleSelectR().split(",");
			for (int i = 0; i < roles.length; i++) {
				Integer roleId = Integer.valueOf(roles[i]);
				UserRole userRole = new UserRole();
				userRole.setRoleId(roleId);
				userRole.setUserId(userId);
				userRoleMapper.insert(userRole);
			}
		} catch (NumberFormatException e) {
			result = false;
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public boolean updateUserAndRoles(UserModifyForm userModifyForm) {
		boolean result = true;
		try {
			/*
			 * 修改用户，登录名唯一因此此处使用登录名判断，如果使用id需要前台hidden和修改userModifyForm property
			 */
			UserExample ue = new UserExample();
			ue.createCriteria().andLoginNameEqualTo(userModifyForm.getLoginName());
			User user = this.userMapper.selectByExample(ue).size()==0?null:this.userMapper.selectByExample(ue).get(0);
			user.setUesrName(userModifyForm.getUserName());
			user.setDepartmentId(Integer.valueOf(userModifyForm.getOrgan()));
			userMapper.updateByPrimaryKey(user);
			int userId = user.getUserId();
			/*
			 * 修改用户信息
			 */
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd"); 
			UserInfoExample uie = new UserInfoExample();
			uie.or().andUserIdEqualTo(userId);
			UserInfo userInfo = this.userInfoMapper.selectByExample(uie).size()==0?null:this.userInfoMapper.selectByExample(uie).get(0);
			try {
				if(userModifyForm.getBirthday()!=null&&!"".equals(userModifyForm.getBirthday())) 
					userInfo.setBirthday(format.parse(userModifyForm.getBirthday()));
				else if("".equals(userModifyForm.getBirthday())) userInfo.setBirthday(null);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				if(userModifyForm.getHireday()!=null&&!"".equals(userModifyForm.getHireday())) 
					userInfo.setHireday(format.parse(userModifyForm.getHireday()));
				else if("".equals(userModifyForm.getHireday())) userInfo.setHireday(null);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			userInfo.setEmail(userModifyForm.getEmail());
			userInfo.setStation(userModifyForm.getStation());
			userInfo.setTelephone(userModifyForm.getTelephone());
			userInfoMapper.updateByPrimaryKey(userInfo);
			/*
			 * 为该用户修改角色
			 */
			String[] roles = userModifyForm.getRoleSelectR().split(",");
			userRoleMapper.delete(userId);
			for (int i = 0; i < roles.length; i++) {
				Integer roleId = Integer.valueOf(roles[i]);
				UserRole userRole = new UserRole();
				userRole.setRoleId(roleId);
				userRole.setUserId(userId);
				userRoleMapper.insert(userRole);
			}
		} catch (NumberFormatException e) {
			result = false;
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public UserModifyForm getUserRolesAndInfo(String userId) {
		UserModifyForm userModifyForm = new UserModifyForm();
		Integer userid = Integer.valueOf(userId);
		User user = this.userMapper.selectByPrimaryKey(userid);
		UserInfoExample uie = new UserInfoExample();
		uie.or().andUserIdEqualTo(userid);
		UserInfo userInfo = this.userInfoMapper.selectByExample(uie).size()==0?null:this.userInfoMapper.selectByExample(uie).get(0);
		userModifyForm.setLoginName(user.getLoginName());
		userModifyForm.setUserName(user.getUesrName());
		userModifyForm.setOrgan(user.getDepartmentId().toString());
		if (userInfo!=null) {
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			userModifyForm.setBirthday(userInfo.getBirthday()==null?"":format.format(userInfo.getBirthday()));
			userModifyForm.setEmail(userInfo.getEmail());
			userModifyForm.setHireday(userInfo.getHireday()==null?"":format.format(userInfo.getHireday()));
			userModifyForm.setStation(userInfo.getStation());
			userModifyForm.setTelephone(userInfo.getTelephone());
		}
		/*填充Role ids*/
		String[] roleIds = this.userRoleMapper.getRoleIdsForUser(userid);
		if (roleIds.length!=0) {
			String combineIds = Arrays.toString(roleIds);
			String temp=combineIds.substring(1, combineIds.length()-1);
			temp = temp.replaceAll(" ", "");
			userModifyForm.setRoleSelectR(temp);
		}
		return userModifyForm;
	}

	@Override
	public UserCheckForm getInfoForCheck(String userId) {
		UserCheckForm userCheckForm = new UserCheckForm();
		Integer userid = Integer.valueOf(userId);
		User user = this.userMapper.selectByPrimaryKey(userid);
		UserInfoExample uie = new UserInfoExample();
		uie.or().andUserIdEqualTo(userid);
		UserInfo userInfo = this.userInfoMapper.selectByExample(uie).size()==0?null:this.userInfoMapper.selectByExample(uie).get(0);
		userCheckForm.setLoginName(user.getLoginName());
		userCheckForm.setUserName(user.getUesrName());
		log.debug("!!departmentMapper"+departmentMapper);
		String organName = this.departmentMapper.selectByPrimaryKey(user.getDepartmentId()).getName();
		userCheckForm.setOrgan(organName);
		userCheckForm.setStatus(user.getStatus());
		if (userInfo!=null) {
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			userCheckForm.setBirthday(userInfo.getBirthday()==null?"":format.format(userInfo.getBirthday()));
			userCheckForm.setEmail(userInfo.getEmail());
			userCheckForm.setHireday(userInfo.getHireday()==null?"":format.format(userInfo.getHireday()));
			userCheckForm.setStation(userInfo.getStation());
			userCheckForm.setTelephone(userInfo.getTelephone());
		}
		/*填充Role ids*/
		String[] roleIds = this.userRoleMapper.getRoleIdsForUser(userid);
		if (roleIds.length!=0) {
			String combineIds = Arrays.toString(roleIds);
			String temp=combineIds.substring(1, combineIds.length()-1);
			temp = temp.replaceAll(" ", "");
			userCheckForm.setRoleSelectR(temp);
		}
		return userCheckForm;
	}
	
	@Override
	public boolean deleteUser(String userId) {
		boolean result = true;
		try {
			this.userRoleMapper.delete(Integer.valueOf(userId));
			UserInfoExample uie = new UserInfoExample();
			uie.or().andUserIdEqualTo(Integer.valueOf(userId));
			this.userInfoMapper.deleteByExample(uie);
			this.userMapper.deleteByPrimaryKey(Integer.valueOf(userId));
		} catch (NumberFormatException e) {
			result = false;
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public boolean recoverUserPass(String userId) {
		boolean result = true;
		try {
			User user = this.userMapper.selectByPrimaryKey(Integer.valueOf(userId));
			user.setPassword("88888888");
			this.userMapper.updateByPrimaryKey(user);
		} catch (NumberFormatException e) {
			result = false;
			e.printStackTrace();
		}
		return result;
	}

	//getter and setter
	public UserMapper getUserMapper() {
		return userMapper;
	}

	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}
	

	public DepartmentMapper getDepartmentMapper() {
		return departmentMapper;
	}

	public void setDepartmentMapper(DepartmentMapper departmentMapper) {
		this.departmentMapper = departmentMapper;
	}


	public RoleMapper getRoleMapper() {
		return roleMapper;
	}


	public void setRoleMapper(RoleMapper roleMapper) {
		this.roleMapper = roleMapper;
	}

}
