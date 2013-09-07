package com.bupt.core.system.dao;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

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
	public void test() {
		 Role role = roleMapper.selectByPrimaryKey(1);
		System.out.println(role);
	}

}
