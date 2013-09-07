package com.bupt.app.security.dao;

import static org.junit.Assert.fail;
import junit.framework.Assert;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.bupt.core.system.dao.RoleMapper;
import com.bupt.core.system.model.Role;

public class RoleMapperTest {
	
	ApplicationContext context = null;
	RoleMapper roleMapper = null;
	
	public RoleMapperTest(){
		context = new FileSystemXmlApplicationContext("src/main/resources/com/bupt/config/applicationContext.xml");
		roleMapper = context.getBean(RoleMapper.class); 
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testCountByExample() {
		fail("Not yet implemented");
	}

	@Test
	public void testDeleteByExample() {
		fail("Not yet implemented");
	}

	@Test
	public void testDeleteByPrimaryKey() {
		fail("Not yet implemented");
	}

	@Test
	public void testInsert() {
		fail("Not yet implemented");
	}

	@Test
	public void testInsertSelective() {
		Role role = new Role();
		role.setName("超级管理员");
		role.setDescription("有所有权限");
		Assert.assertEquals(roleMapper.insertSelective(role), 1);//插入成功几条
		System.out.println(role.getRoleId());//返回id
	}

	@Test
	public void testSelectByExample() {
		fail("Not yet implemented");
	}

	@Test
	public void testSelectByPrimaryKey() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateByExampleSelective() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateByExample() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateByPrimaryKeySelective() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateByPrimaryKey() {
		fail("Not yet implemented");
	}

}
