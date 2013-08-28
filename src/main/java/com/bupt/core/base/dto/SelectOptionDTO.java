package com.bupt.core.base.dto;
/**
 * 保存传给前端的下拉列表的信息
 * @author litong
 *
 */
public class SelectOptionDTO {
	private String id;
	// 名称
	private String name;
	// 编号
	private String value; 
	// 是否被选中
	private boolean selected; 

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

}