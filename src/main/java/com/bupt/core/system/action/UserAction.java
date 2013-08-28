package com.bupt.core.system.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bupt.core.base.action.JqGridBaseAction;
import com.bupt.core.system.dto.UserAddForm;
import com.bupt.core.system.dto.UserCheckForm;
import com.bupt.core.system.dto.UserDTO;
import com.bupt.core.system.dto.UserModifyForm;
import com.bupt.core.system.model.User;
import com.bupt.core.system.service.UserService;

@Controller
@RequestMapping("/system/user")
public class UserAction extends JqGridBaseAction<UserDTO>{
	
	private final Log log = LogFactory.getLog(getClass());
	private boolean debug = log.isDebugEnabled();
	
	//将spring 配置文件中的bean 通过setter注入进来
	@Resource(name="userService")
	private UserService uesrService=null;

	@Override
	public List<UserDTO> listResults(int start, int limit, String sortName,
			String sortOrder, HttpServletRequest request, Boolean search) {
		return this.uesrService.listResults(start, limit, sortName, sortOrder, request,search);
	}

	@Override
	public Integer getTotalRecords(HttpServletRequest request, Boolean search) {
		return uesrService.getTotalRecords(request,search);
	}	
	
	@RequestMapping("/info.do")
	@ResponseBody
	public Map<String, List> getUserSelectInfo(){
		Map<String, List> map = new HashMap();
		map.put("role", this.uesrService.getAllRoles());
		map.put("organ", this.uesrService.getAllDepartments());
		return map;
	}

	@RequestMapping("/validateLoginName.do")
	@ResponseBody
	public boolean validateLoginName(@RequestParam(value="loginName") String loginName){
		boolean validate = true;
		User u = this.uesrService.validateExist(loginName);
		if(u!=null) validate=false;
		return validate;
	}
	
	@RequestMapping("/addUserOut.do")
	@ResponseBody
	public boolean addUserOut(@ModelAttribute("addUserForm") UserAddForm userAddForm){
		boolean validate = true;
		if(!this.uesrService.insertUserAndRoles(userAddForm)) validate=false;
		return validate;
	}
	
	@RequestMapping("/modifyUserIn.do")
	@ResponseBody
	public UserModifyForm modifyUserIn(@RequestParam(value="userId") String userId){
		UserModifyForm userModifyForm;
		userModifyForm = this.uesrService.getUserRolesAndInfo(userId) ;
		return userModifyForm;
	}
	
	@RequestMapping("/modifyUserOut.do")
	@ResponseBody
	public boolean modifyUserOut(@ModelAttribute("modifyUserForm") UserModifyForm userModifyForm){
		boolean validate = true;
		if(!this.uesrService.updateUserAndRoles(userModifyForm)) validate=false;
		return validate;
	}
	
	@RequestMapping("/checkUser.do")
	@ResponseBody
	public UserCheckForm checkUserIn(@RequestParam(value="userId") String userId){
		UserCheckForm userCheckForm;
		userCheckForm = this.uesrService.getInfoForCheck(userId) ;
		return userCheckForm;
	}
	
	@RequestMapping("/deleteUser.do")
	@ResponseBody
	public boolean deleteUser(@RequestParam(value="userId") String userId){
		boolean validate = true;
		if(!this.uesrService.deleteUser(userId)) validate=false;
		return validate;
	}
	
	@RequestMapping("/recoverUserPass.do")
	@ResponseBody
	public boolean recoverUserPass(@RequestParam(value="userId") String userId){
		boolean validate = true;
		if(!this.uesrService.recoverUserPass(userId)) validate=false;
		return validate;
	}
	
	public void validateExcel(
			@RequestParam(value="searchString") String searchString,
            HttpServletRequest request){
//		String result = "";
//		String resultInfo = "";
//		
//		// 临时文件目录
//	    File tempPathFile = new File("/tmp/buffer");
//	    if (!tempPathFile.exists()) {
//	       tempPathFile.mkdirs();
//	    }
//	    if(debug){
//	    	log.debug("")
//	    }
//	    try {
//	       // Create a factory for disk-based file items
//	       DiskFileItemFactory factory = new DiskFileItemFactory();
//	 
//	       factory.setSizeThreshold(1024 * 1024); // 设置缓冲区大小，这里是1Mb
//	       factory.setRepository(tempPathFile);//设置缓冲区目录
//	 
//	       ServletFileUpload upload = new ServletFileUpload(factory);
//	       
//	       List<FileItem> items = upload.parseRequest(request);//得到所有的文件
//	       for (FileItem fi : items) {
//	    	   if(!fi.isFormField()){
//	        	   String fileName = fi.getName();
//	        	   fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
//	        	   //String suffix = fileName.substring(fileName.lastIndexOf(".")+1);
//	        	   if (!Utils.isEmptyOrNull(fileName)) {
//	    			   if(fi.getFieldName().equals("userExcel")){
//	    				   result = this.userImportService.validateExcel(fi.getInputStream(), request.getSession().getId());
//	    				   if(!result.equals(ServiceReturnResult.SERVICE_OP_SUCC)){
//	    					   // if browser is IE
//	    					   if (request.getHeader("User-Agent").toLowerCase().indexOf("msie") >0)
//	    				        	resultInfo = result.replaceAll("<br />", "&lt;br /&gt;");
//	    				       else
//	    				    	   resultInfo = result;
//	    					   result = ServiceReturnResult.SERVICE_OP_FAIL;
//	    				   }
//	    			   }
//	        	   }
//	    	   }
//	       }
//	    }catch(Exception e){
//	    	e.printStackTrace();
//	    }
//	    dataMap.put("result", result);
//		dataMap.put("resultInfo", resultInfo);
//		return "json_validateExcel";
	}
	
	
	public UserService getUesrService() {
		return uesrService;
	}

	public void setUesrService(UserService uesrService) {
		this.uesrService = uesrService;
	}


}
