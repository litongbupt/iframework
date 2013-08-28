package com.bupt.core.base.action;

import javax.servlet.http.HttpServletRequest;

/**
 * 保存JqGrid的公共请求头和导出数据时数据的基础信息，该类主要在数据导出时使用
 * @author litong 2013-8-23 下午5:26:14
 * 
 */
public class DataRequest implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	// 当前页码 默认page
	private int pageNo;
	// 页面可显示行数
	private int rows;
	// 用于排序的列名 默认sidx
	private String sortName;
	// 排序的方式desc/asc 默认sord
	private String sortOrder;
	// 是否是搜索请求 默认_search
	private boolean search;
	// 已经发送的请求的次数
	private String nd;
	// 导出文件名
	private String fileName;
	// 选择的导出列
	private String selectCols;
	// 导出时候的导出条数
	private int maxRecords;
	// reqeust
	private HttpServletRequest request;

	public DataRequest() {

	}

	public DataRequest(int pageNo, int rows, String sortName, String sortOrder,
			boolean search, String nd, String fileName, String selectCols,
			int maxRecords, HttpServletRequest request) {
		super();
		this.pageNo = pageNo;
		this.rows = rows;
		this.sortName = sortName;
		this.sortOrder = sortOrder;
		this.search = search;
		this.nd = nd;
		this.fileName = fileName;
		this.selectCols = selectCols;
		this.maxRecords = maxRecords;
		this.request = request;
	}

	public int getPageNo() {
		return pageNo;
	}

	public int getRows() {
		return rows;
	}

	public String getSortName() {
		return sortName;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public boolean isSearch() {
		return search;
	}

	public String getNd() {
		return nd;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public void setSortName(String sortName) {
		this.sortName = sortName;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public void setSearch(boolean search) {
		this.search = search;
	}

	public void setNd(String nd) {
		this.nd = nd;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getFileName() {
		return fileName;
	}

	public String getSelectCols() {
		return selectCols;
	}

	public int getMaxRecords() {
		return maxRecords;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setSelectCols(String selectCols) {
		this.selectCols = selectCols;
	}

	public void setMaxRecords(int maxRecords) {
		this.maxRecords = maxRecords;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

}