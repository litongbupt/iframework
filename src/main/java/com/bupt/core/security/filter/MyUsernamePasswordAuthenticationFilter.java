package com.bupt.core.security.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bupt.core.security.service.AuthService;



/*
 * 
 * UsernamePasswordAuthenticationFilter源码
	attemptAuthentication
		this.getAuthenticationManager()
			ProviderManager.java
				authenticate(UsernamePasswordAuthenticationToken authRequest)
					AbstractUserDetailsAuthenticationProvider.java
						authenticate(Authentication authentication)
							P155 user = retrieveUser(username, (UsernamePasswordAuthenticationToken) authentication);
								DaoAuthenticationProvider.java
									P86 loadUserByUsername
 */
public class MyUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	public static final String VALIDATE_CODE = "validateCode";
	public static final String USERNAME = "username";
	public static final String PASSWORD = "password";
	private final Log log = LogFactory.getLog(getClass());
	private boolean debug = log.isDebugEnabled();
	private AuthService authService;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//		if (!request.getMethod().equals("POST")) {
//			throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
//		}
		//检测验证码
		//checkValidateCode(request);
		
		String username = obtainUsername(request);
		String password = obtainPassword(request);
		username = username.trim();
		password = password.trim();
		if(debug){
			log.debug("username:"+username);
			log.debug("password:"+password);
		}
		
		if(StringUtils.isEmpty(username)){
			throw new AuthenticationServiceException("用户名为空！"); 
		}
		if(StringUtils.isEmpty(password)){
			throw new AuthenticationServiceException("密码为空！"); 
		}
		
		//验证用户账号与密码是否对应
		if(!authService.validate(username, password)){
	        if(debug){
	        	log.debug("用户:"+username+"登陆失败");  //object is a URL.
	        }
	/*
	          在我们配置的simpleUrlAuthenticationFailureHandler处理登录失败的处理类在这么一段
	    这样我们可以在登录失败后，向用户提供相应的信息。
		if (forwardToDestination) {
            request.setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, exception);
        } else {
            HttpSession session = request.getSession(false);

            if (session != null || allowSessionCreation) {
                request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, exception);
            }
        }
	 */
			throw new AuthenticationServiceException("用户名或者密码错误！"); 
		}
		
		//UsernamePasswordAuthenticationToken实现 Authentication
		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
		// Place the last username attempted into HttpSession for views
		
		// 允许子类设置详细属性
        setDetails(request, authRequest);
		
        // 运行UserDetailsService的loadUserByUsername 再次封装Authentication
		return this.getAuthenticationManager().authenticate(authRequest);
	}
	
//	protected void checkValidateCode(HttpServletRequest request) { 
//		HttpSession session = request.getSession();
//		
//	    String sessionValidateCode = obtainSessionValidateCode(session); 
//	    //让上一次的验证码失效
//	    session.setAttribute(VALIDATE_CODE, null);
//	    String validateCodeParameter = obtainValidateCodeParameter(request);  
//	    if (StringUtils.isEmpty(validateCodeParameter) || !sessionValidateCode.equalsIgnoreCase(validateCodeParameter)) {  
//	        throw new AuthenticationServiceException("验证码错误！");  
//	    }  
//	}
//	
//	private String obtainValidateCodeParameter(HttpServletRequest request) {
//		Object obj = request.getParameter(VALIDATE_CODE);
//		return null == obj ? "" : obj.toString();
//	}
//
//	protected String obtainSessionValidateCode(HttpSession session) {
//		Object obj = session.getAttribute(VALIDATE_CODE);
//		return null == obj ? "" : obj.toString();
//	}

	@Override
	protected String obtainUsername(HttpServletRequest request) {
		Object obj = request.getParameter(USERNAME);
		return null == obj ? "" : obj.toString();
	}

	@Override
	protected String obtainPassword(HttpServletRequest request) {
		Object obj = request.getParameter(PASSWORD);
		return null == obj ? "" : obj.toString();
	}
	
	public AuthService getAuthService() {
		return authService;
	}

	public void setAuthService(AuthService authService) {
		this.authService = authService;
	}

}
