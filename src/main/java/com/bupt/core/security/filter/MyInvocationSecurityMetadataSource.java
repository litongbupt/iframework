package com.bupt.core.security.filter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import com.bupt.core.security.tool.AntUrlPathMatcher;
import com.bupt.core.security.tool.UrlMatcher;
/**
 * 该过滤器的主要作用就是通过spring著名的IoC生成securityMetadataSource。  
 * securityMetadataSource相当于本包中自定义的MyInvocationSecurityMetadataSourceService。  
 * 该MyInvocationSecurityMetadataSourceService的作用提从数据库提取权限和资源，装配到HashMap中，  
 * 供Spring Security使用，用于权限校验。
 * @author litong
 *
 */
public class MyInvocationSecurityMetadataSource  
        implements FilterInvocationSecurityMetadataSource {  
    private UrlMatcher urlMatcher = new AntUrlPathMatcher();;  
    private static Map<String, Collection<ConfigAttribute>> resourceMap = null;  
	private final Log log = LogFactory.getLog(getClass());
	private boolean debug = log.isDebugEnabled();
	
    public MyInvocationSecurityMetadataSource() {  
         loadResourceDefine();  
     }  
  
    private void loadResourceDefine() {  
         resourceMap = new HashMap<String, Collection<ConfigAttribute>>();  
         Collection<ConfigAttribute> atts = new ArrayList<ConfigAttribute>();  
         ConfigAttribute ca = new SecurityConfig("ROLE_ADMIN");  
         atts.add(ca);
         Collection<ConfigAttribute> atts2 = new ArrayList<ConfigAttribute>();  
         ConfigAttribute ca2 = new SecurityConfig("ROLE_ANONYMOUS");  
         atts2.add(ca2);  
         resourceMap.put("/index.jsp", atts);  
         resourceMap.put("/other.jsp", atts2);  
         resourceMap.put("/admin.jsp", atts);  
         resourceMap.put("/application/modules/core/main.jsp", atts);  
     }  
  
    // According to a URL, Find out permission configuration of this URL.  
    public Collection<ConfigAttribute> getAttributes(Object object)  
            throws IllegalArgumentException {
    	Collection<ConfigAttribute> result = null;
        // guess object is a URL.  
         String url = ((FilterInvocation)object).getRequestUrl();  
         Iterator<String> ite = resourceMap.keySet().iterator();  
        while (ite.hasNext()) {  
             String resURL = ite.next();  
            if (urlMatcher.pathMatchesUrl(url, resURL)) {  
            	result = resourceMap.get(resURL);  
            	break;
             }  
         }  
        if(debug){
        	if(result!=null){
        	for (ConfigAttribute configAttribute : result) {
        		log.debug(configAttribute.getAttribute());
			}}
        }
        return result;  
     }  
  
    public boolean supports(Class<?> clazz) {  
        return true;  
     }  
      
    public Collection<ConfigAttribute> getAllConfigAttributes() {  
        return null;  
     }  
  
}  