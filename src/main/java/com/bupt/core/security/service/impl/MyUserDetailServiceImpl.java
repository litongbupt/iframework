package com.bupt.core.security.service.impl;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.bupt.core.system.dao.UserMapper;
import com.bupt.core.system.model.UserExample;
import com.bupt.core.system.model.UserExample.Criteria;
  
public class MyUserDetailServiceImpl implements UserDetailsService {  
  
	private UserMapper userMapper;
	private final Log log = LogFactory.getLog(getClass());
	private boolean debug = log.isDebugEnabled();
	
     @Override  
     //登陆默认会调到这里
    public UserDetails loadUserByUsername(String username)  
            throws UsernameNotFoundException, DataAccessException {
        if(debug){
         	log.debug("user detail: "+username);
        }
        User user = null;
 		UserExample ue = new UserExample();
 		Criteria criteri = ue.createCriteria();
 		criteri.andLoginNameEqualTo(username);
 		try{
 		List<com.bupt.core.system.model.User> userList = userMapper.selectByExample(ue);
        if(debug){
         	log.debug("user detail 2: "+userList.get(0));
        }
 		if(userList!=null&&userList.size()>0){
 	         Collection<GrantedAuthority> auths=new ArrayList<GrantedAuthority>();  
 	         GrantedAuthority auth=new GrantedAuthorityImpl("ROLE_ADMIN");  
 	         auths.add(auth);  
 	         user = new User(username,userList.get(0).getPassword(), true, true, true, true, auths);  
 		}}catch (Exception e) {
 			e.printStackTrace();
 		}
//在这个类中，你就可以从数据库中读入用户的密码，角色信息，是否锁定，账号是否过期等，我想这么简单的代码就不再多解释了。
//         User(String username, String password, boolean enabled, boolean accountNonExpired,  
//                     boolean credentialsNonExpired, boolean accountNonLocked, Collection<GrantedAuthority> authorities) {  
        return user;  
     }

	public UserMapper getUserMapper() {
		return userMapper;
	}

	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}        
     
} 