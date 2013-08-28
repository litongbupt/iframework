package com.bupt.app.security.dao;

import static org.junit.Assert.fail;

import java.util.List;

import junit.framework.Assert;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.bupt.core.system.dao.DepartmentMapper;
import com.bupt.core.system.model.Department;
import com.bupt.core.system.model.DepartmentExample;

public class DepartmentMapperTest {

	ApplicationContext context = null;
	DepartmentMapper departmentMapper = null;
	
	public DepartmentMapperTest(){
		context = new FileSystemXmlApplicationContext("src/main/resources/com/bupt/config/applicationContext.xml");
		departmentMapper = context.getBean(DepartmentMapper.class); 
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
		Department department = new Department();
		department.setName("文化部");
		department.setLevel("三级");
		department.setParentId(2);
		System.out.println(department.getDepartmentId());
		Assert.assertEquals(departmentMapper.insertSelective(department), 1);//插入成功几条
		System.out.println(department.getDepartmentId());//返回id
	}

	@Test
	public void testSelectByExample() {
		DepartmentExample de = new DepartmentExample();
		de.createCriteria().andDepartmentIdEqualTo(10);
		List<Department> result = departmentMapper.selectByExample(de);//每值的话返回一个空的list
		for (Department department : result) {
			System.out.println(department);
		}
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
