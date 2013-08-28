package com.bupt.app.security.dao;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.bupt.core.system.dao.UserMapper;
import com.bupt.core.system.model.User;
import com.bupt.core.system.model.UserExample;
import com.bupt.core.system.model.UserExample.Criteria;



public class UserMapperTest
{
	ApplicationContext aContext = new FileSystemXmlApplicationContext("src/main/resources/com/bupt/config/applicationContext.xml");
	UserMapper userMapper = aContext.getBean(UserMapper.class);
   
	
    public void testUserMapper()
    {

		User user = new User();
		user.setLoginName("litong");
		user.setPassword("yang1290");
		user.setDepartmentId(3);
		user.setUesrName("李彤");
		userMapper.insertSelective(user);
		
		UserExample ue = new UserExample();
		Criteria criteri = ue.createCriteria();
		criteri.andLoginNameEqualTo("张三");
		List<User> resultUserExcample = userMapper.selectByExample(ue);
		System.out.println(resultUserExcample.get(0));
    }
    
    @Test
    public void testListResult(){
    	List<User> result = userMapper.listResults(0, 10, "login_name", "asc", null);
    	System.out.println(result);
    }
    
    @Test
    public void testSelectByExample(){
		UserExample ue = new UserExample();
		ue.setOrderByClause("login_name asc");
		ue.setStart(0);
		ue.setLimit(10);
		List<User> userList = userMapper.selectByExample(ue);
		for (User user : userList) {
			System.out.println(user);
		}
		
    }
}
