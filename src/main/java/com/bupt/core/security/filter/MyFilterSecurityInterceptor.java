package com.bupt.core.security.filter;
import java.io.IOException;  

import javax.servlet.Filter;  
import javax.servlet.FilterChain;  
import javax.servlet.FilterConfig;  
import javax.servlet.ServletException;  
import javax.servlet.ServletRequest;  
import javax.servlet.ServletResponse;  
  
import org.springframework.security.access.SecurityMetadataSource;  
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;  
import org.springframework.security.access.intercept.InterceptorStatusToken;  
import org.springframework.security.web.FilterInvocation;  
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;  
  
public class MyFilterSecurityInterceptor extends AbstractSecurityInterceptor implements Filter {  
	// 与applicationContext-security.xml里的myFilter的属性securityMetadataSource对应，  
    // 其他的两个组件，已经在AbstractSecurityInterceptor定义  
    private FilterInvocationSecurityMetadataSource securityMetadataSource;  
  
    /** 
      * Method that is actually called by the filter chain. Simply delegates to 
      * the {@link #invoke(FilterInvocation)} method. 
      *  
      * @param request the servlet request 
      * @param response the servlet response 
      * @param chain the filter chain 
      *  
      * @throws IOException if the filter chain fails 
      * @throws ServletException  if the filter chain fails 
     */  
    public void doFilter(ServletRequest request, ServletResponse response,  
             FilterChain chain) throws IOException, ServletException {  
         FilterInvocation fi = new FilterInvocation(request, response, chain);  
         invoke(fi);  
     }  
  
  
    public Class<? extends Object> getSecureObjectClass() {  
    	//MyAccessDecisionManager的supports方面必须放回true,否则会提醒类型错误
        return FilterInvocation.class;  
     }  
  
    public void invoke(FilterInvocation fi) throws IOException,  
             ServletException {  
    	//在执行doFilter之前，进行权限的检查，而具体的实现已经交给accessDecisionManager了
    	// object为FilterInvocation对象  
        // super.beforeInvocation(fi);//源码  
        // 1.获取请求资源的权限  
         //执行 Collection<ConfigAttribute> attributes =   
                        //securityMetadataSource.getAttributes(fi);  
        // 2.是否拥有权限  
        // this.accessDecisionManager.decide(authenticated, fi, attributes);
         InterceptorStatusToken token = super.beforeInvocation(fi);  
        try {  
             fi.getChain().doFilter(fi.getRequest(), fi.getResponse());  
         } finally {  
            super.afterInvocation(token, null);  
         }  
     }  
  
    public SecurityMetadataSource obtainSecurityMetadataSource() {  
        return this.securityMetadataSource;  
     }  
  
    public FilterInvocationSecurityMetadataSource getSecurityMetadataSource() {  
        return this.securityMetadataSource;  
     }  
    
    public void setSecurityMetadataSource(FilterInvocationSecurityMetadataSource newSource) {  
        this.securityMetadataSource = newSource;  
     }  
  
     @Override  
    public void destroy() {  
     }  
  
     @Override  
    public void init(FilterConfig arg0) throws ServletException {  
     }  
  
}  