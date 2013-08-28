package com.bupt.core.base.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

/**
 * 基础业务逻辑类，提供基于JqGrid查询的基本业务逻辑接口
 * @author litong
 *
 * @param <T>
 * @param <K>
 */
public interface BaseService<T, K> {

	/**
	 * 根据主键删除记录
	 * @param id
	 * @return 删除记录的条数
	 * @author 李彤 2013-8-27 下午9:42:19
	 */
	int deleteByPrimaryKey(Integer id);

	/**
	 * 插入记录
	 * @param record
	 * @return 影响的记录条数
	 * @author 李彤 2013-8-27 下午9:43:13
	 */
	int insert(T record);

	/**
	 * 插入不为null的数据
	 * @param record
	 * @return 影响的记录条数
	 * @author 李彤 2013-8-27 下午9:43:24
	 */
	int insertSelective(T record);

	/**
	 * 根据主键查找记录
	 * @param id
	 * @return 影响的记录条数
	 * @author 李彤 2013-8-27 下午9:44:34
	 */
	T selectByPrimaryKey(Integer id);

	/**
	 * 根据主键更新不为null的字段
	 * @param record
	 * @return 影响的记录条数
	 * @author 李彤 2013-8-27 下午9:45:35
	 */
	int updateByPrimaryKeySelective(T record);

	/**
	 * 根据主键更新字段
	 * @param record
	 * @return 影响的记录条数
	 * @author 李彤 2013-8-27 下午9:46:05
	 */
	int updateByPrimaryKey(T record);
	
	/**
	 * 获取总记录数
	 * @param request
	 * @param search
	 * @return
	 * @author 李彤 2013-8-27 下午9:46:23
	 */
	int getTotalRecords(HttpServletRequest request, Boolean search);
	
	/**
	 * 列出JqGrid表格中的详细信息
	 * @param start 从第几行开始查
	 * @param limit 查多少行
	 * @param sortName 以哪个字段排序
	 * @param sortOrder asc,desc
	 * @param request HttpServletRequest
	 * @return JqGrid表格中的详细信息
	 * @author 李彤 2013-8-27 下午9:47:02
	 */
	public List<K> listResults(int start, int limit, String sortName,
			String sortOrder, HttpServletRequest request, Boolean search) ;
	
}
