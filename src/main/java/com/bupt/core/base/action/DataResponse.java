package com.bupt.core.base.action;

import java.util.List;
import java.util.Map;

/**
 * 保存返回给JqGrid表格的信息
 * 
 * @author litong 2013-8-23 下午5:26:14
 * 
 */
public class DataResponse<T> {

	// 需要显示的数据集
	private List<T> contents;
	// 每页显示数量
	private int pageNo;
	// 数据总数 默认records
	private int totalRecords;
	// 可显示的页数 默认total
	private int totalPages;
	// 自定义数据
	private Map<String, Object> userdata;

	public int getPageNo() {
		return pageNo;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public Map<String, Object> getUserdata() {
		return userdata;
	}

	public List<T> getContents() {
		return contents;
	}

	public void setContents(List<T> contents) {
		this.contents = contents;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public void setUserdata(Map<String, Object> userdata) {
		this.userdata = userdata;
	}

}