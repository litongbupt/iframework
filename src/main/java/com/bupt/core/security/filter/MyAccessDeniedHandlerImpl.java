package com.bupt.core.security.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

//如果是ajax请求
public class MyAccessDeniedHandlerImpl implements AccessDeniedHandler  {
	
	private String accessDeniedUrl;
	public MyAccessDeniedHandlerImpl()
	{
		
	}
	
	  public MyAccessDeniedHandlerImpl(String accessDeniedUrl)
	  {
		  this.accessDeniedUrl=accessDeniedUrl;
	  }
	public String getAccessDeniedUrl() {
		return accessDeniedUrl;
	}
 

	public void setAccessDeniedUrl(String accessDeniedUrl) {
		this.accessDeniedUrl = accessDeniedUrl;
	}


	

	
	@Override
	public void handle(HttpServletRequest req,
			HttpServletResponse resp, AccessDeniedException reason) throws ServletException,
			IOException {
		boolean isAjax = "XMLHttpRequest".equals(req.getHeader("X-Requested-With"));
		
		if (isAjax) {//如果是ajax请求
			//String jsonObject = "{\"message\":\"You are not privileged to request this resource.\","+"\"access-denied\":true,\"cause\":\"AUTHORIZATION_FAILURE\"}";
			String contentType = "application/json";
			resp.setContentType(contentType);
			String jsonObject="noright";
			PrintWriter out = resp.getWriter();
			out.print(jsonObject);
			out.flush();
			out.close();
			return;
		}
		else
		{
		
		 String path = req.getContextPath();
		 String basePath = req.getScheme()+"://"+req.getServerName()+":"+req.getServerPort()+path+"/";
		 resp.sendRedirect(basePath+accessDeniedUrl);
		}
		
		
	}
}

