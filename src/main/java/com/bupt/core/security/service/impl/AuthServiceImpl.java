package com.bupt.core.security.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.bupt.core.security.service.AuthService;
import com.bupt.core.system.dao.UserMapper;
import com.bupt.core.system.model.User;
import com.bupt.core.system.model.UserExample;
import com.bupt.core.system.model.UserExample.Criteria;

@Service("authService")
public class AuthServiceImpl implements AuthService{

	@Resource(name="userMapper")
	private UserMapper userMapper;
	private final Log log = LogFactory.getLog(getClass());
	private boolean debug = log.isDebugEnabled();
	
	@Override
	public boolean validate(String username, String password) {
		UserExample ue = new UserExample();
		Criteria criteri = ue.createCriteria();
		criteri.andLoginNameEqualTo(username);
		List<User> resultUserExcample = userMapper.selectByExample(ue);

		if(debug){
			log.debug("resultUserExcample: "+resultUserExcample);
		}
		
		boolean flag = false;
		if(resultUserExcample!=null&&resultUserExcample.size()>0&&resultUserExcample.get(0).getPassword().equals(password)){
			flag =  true;
		}
		if(debug){
			log.debug("service validate flag: "+flag);
		}
		return flag;
	}

	public UserMapper getUserMapper() {
		return userMapper;
	}

	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}
	
	
}
