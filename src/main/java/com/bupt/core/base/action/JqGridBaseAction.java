package com.bupt.core.base.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * JqGrid的基础Controller
 * @author litong 2013-8-23 下午5:26:14
 * @param <T>
 */
public abstract class JqGridBaseAction<T> {
	/**
	 * 列出JqGrid表格中的详细信息
	 * @param start 从第几行开始查
	 * @param limit 查多少行
	 * @param sortName 以哪个字段排序
	 * @param sortOrder asc,desc
	 * @param request HttpServletRequest
	 * @return JqGrid表格中的详细信息
	 * @author 李彤 2013-8-20 下午3:38:33
	 * @param search 
	 */
	public abstract List<T> listResults(int start, int limit, String sortName,
			String sortOrder,HttpServletRequest request, Boolean search);
	
	/**
	 * 获得总记录数
	 * @return 总记录数
	 * @author 李彤 2013-8-23 下午5:26:14
	 * @param request 
	 */
	public abstract Integer getTotalRecords(HttpServletRequest request, Boolean search);

	/**
	 * JqGrid的入口函数
	 * @param pageNo 当前显示页码
	 * @param rows 每页显示数量
	 * @param sortName 以哪个字段排序
	 * @param sortOrder asc,desc
	 * @param request HttpServletRequest
	 * @param search 是否有查询头信息
	 * @return JgGrid需要的数据形式
	 * @author 李彤 2013-8-27 下午9:28:46
	 */
	@RequestMapping(value="/list.do")  
    @ResponseBody  
	public DataResponse<T> refreshGridModel(
            @RequestParam(value="pageNo") Integer pageNo,
            @RequestParam(value="rows") Integer rows,
            @RequestParam(value="sortName") String sortName,
            @RequestParam(value="sortOrder") String sortOrder,
            @RequestParam(value="search") Boolean search,
            HttpServletRequest request) {
		DataResponse<T> dateResponse = new DataResponse<T>();
		//DataRequest dataRequest = null;
		try {
			//dataRequest = obtainDataRequest(request);
			//当前显示页码
			//int page = dataRequest.getPageNo() <= 0 ? 1 : dataRequest.getPageNo();
			int page = pageNo<= 0 ? 1:pageNo;
			//每页显示数量
			//int limit = dataRequest.getRows()< 0 ? 20 : dataRequest.getRows();
			int limit = rows< 0 ? 20 : rows;
			//从哪条记录开始查
			int start = limit * (page - 1);
			start = start < 0 ? 0 : start;
			//总记录数
			int totalRecords = this.getTotalRecords(request,search);
			//总页数
			int totalPages = totalRecords / limit;
			if (totalRecords % limit != 0) {
				totalPages++;
			}
			
			List<T> contents = this.listResults(start, limit, sortName, sortOrder,request,search);
			//totalPages = (int) Math.ceil((double) record / (double) limit);
			//当前显示页码
			int currPage = Math.min(totalPages, page);
			dateResponse.setTotalRecords(totalRecords);
			dateResponse.setTotalPages(totalPages);
			dateResponse.setPageNo(currPage);
			dateResponse.setContents(contents);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dateResponse;
	}

	/**
	 * 根据request的内容抽象查询条件
	 * @param request HttpServletRequest
	 * @return 查询条件
	 * @author 李彤 2013-8-27 下午9:33:31
	 */
	@Deprecated
	private DataRequest obtainDataRequest(HttpServletRequest request) {
		int pageNo = StringUtils.isEmpty(request.getParameter("pageNo")) ? 1 : Integer.valueOf(request.getParameter("pageNo"));
		int rows = StringUtils.isEmpty(request.getParameter("rows")) ? 20 : Integer.valueOf(request.getParameter("rows"));
		String sortName = request.getParameter("sortName");
		String sortOrder = request.getParameter("sortOrder");
		Boolean search = Boolean.parseBoolean(request.getParameter("search"));
		String nd = request.getParameter("nd");
	    String fileName = request.getParameter("fileName");
	    String selectCols = request.getParameter("selectCols");
	    int maxRecords = Integer.parseInt(request.getParameter("maxRecords"));
		//return new DataRequest(pageNo, rows, sortName, sortOrder, search,fileName,selectCols,maxRecords,request);
	    return new DataRequest(pageNo, rows, sortName, sortOrder, search, nd, fileName, selectCols, maxRecords, request);
	}
}
