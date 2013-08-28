package com.bupt.core.base.dto;

import java.util.LinkedHashMap;
import java.util.Map;

public class ResouInfoDTO {
	//资源名称
	private String name;
	//model类名
	private String model;
	//数据库表名
	private String table;
	//所有属性序列
	private Map<String, ParameterDTO> params;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getTable() {
		return table;
	}
	public void setTable(String table) {
		this.table = table;
	}
	public Map<String, ParameterDTO> getParams() {
		if(this.params == null){
			this.params = new LinkedHashMap<String, ParameterDTO>();
		}
		return params;
	}
	public void setParams(Map<String, ParameterDTO> params) {
		this.params = params;
	}
	@Override
	public String toString() {
		return "ResouInfoDto [name=" + name + ", model=" + model + ", table="
				+ table + ", params=" + params + "]";
	}
	
	
}
