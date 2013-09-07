package com.bupt.core.system.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.bupt.core.base.util.Utils;
import com.bupt.core.system.dao.RoleMapper;
import com.bupt.core.system.dto.RoleDTO;
import com.bupt.core.system.model.Role;
import com.bupt.core.system.model.RoleExample;
import com.bupt.core.system.model.UserExample;
import com.bupt.core.system.model.RoleExample.Criteria;
import com.bupt.core.system.service.RoleService;

@Service("roleService")
public class RoleServiceImpl implements RoleService {

	@Resource(name="roleMapper")
	private RoleMapper roleMapper;
	
	@Override
	public int deleteByPrimaryKey(Integer id) {
		return roleMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(Role record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(Role record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Role selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Role record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Role record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getTotalRecords(HttpServletRequest request, Boolean search) {
		RoleExample ue = new RoleExample();
		if(search){
			addCriteria(request, ue);
		}
		return roleMapper.countByExample(ue);
	}

	@Override
	public List<RoleDTO> listResults(int start, int limit, String sortName,
			String sortOrder, HttpServletRequest request, Boolean search) {
		RoleExample ue = new RoleExample();
		ue.setOrderByClause( sortName +" "+ sortOrder);
		ue.setStart(start);
		ue.setLimit(limit);
		
		if(search){
			addCriteria(request, ue);
		}

		/*End*/
		List<Role> roleList = roleMapper.selectByExample(ue);
		List<RoleDTO> roleDTOList = new ArrayList<RoleDTO>();
		RoleDTO tempRoleDTO = new RoleDTO();
		for (Role role : roleList) {
			Utils.copyProperties(tempRoleDTO, role);
			roleDTOList.add(tempRoleDTO);
		}
		
		return roleDTOList;
	}

	private void addCriteria(HttpServletRequest request, RoleExample ue) {
		Integer roleId = Integer.parseInt(request.getParameter("roleId"));
		String name = request.getParameter("name");
		Integer parentId = Integer.parseInt(request.getParameter("parentId"));
		Criteria criteria = ue.createCriteria();
		if(roleId!=null&&!"".equals(roleId)) criteria.andRoleIdEqualTo(roleId);
		if(name!=null&&!"".equals(name)) criteria.andNameEqualTo(name);
		if(parentId!=null&&!"".equals(parentId)) criteria.andParentIdEqualTo(parentId);
	}

	public RoleMapper getRoleMapper() {
		return roleMapper;
	}

	public void setRoleMapper(RoleMapper roleMapper) {
		this.roleMapper = roleMapper;
	}
	
	

}
