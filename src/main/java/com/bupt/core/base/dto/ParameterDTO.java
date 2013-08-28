package com.bupt.core.base.dto;
/**
 * 数据导出时用以保存生成的EXCEL数据的基础信息
 * @author litong
 *
 */
public class ParameterDTO {
	//属性在model类中的名称，必填
	private String name;
	//属性在数据库中的字段名，必填
	private String dbName;
	//属性在界面上显示的名称，必填
	private String showName;
	//是否在页面上显示，默认为false
	private boolean show;
	//属性的类型：string,int,float等java基础类型，必填
	private String type;
	//格式化类型
	private String formatType;
	//格式化类型名称
	private String formatter;
	//有哪些类型资源拥有此属性，COMMON代表所有资源共有属性，有COMMON就不要再填其它类型了，必填
	private String resouType;
	//导出文档中的宽度，默认为4000
	private int width;
	//是否选中，默认为false
	private boolean selected;
	//是否能够批量修改，默认为false
	private boolean modify;
	
	public ParameterDTO(int width, String showName){
		this.width = width;
		this.showName = showName;
	}
	public ParameterDTO(){
		
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDbName() {
		return dbName;
	}
	public void setDbName(String dbName) {
		this.dbName = dbName;
	}
	public String getShowName() {
		return showName;
	}
	public void setShowName(String showName) {
		this.showName = showName;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getFormatType() {
		return formatType;
	}
	public void setFormatType(String formatType) {
		this.formatType = formatType;
	}
	public String getFormatter() {
		return formatter;
	}
	public void setFormatter(String formatter) {
		this.formatter = formatter;
	}
	public String getResouType() {
		return resouType;
	}
	public void setResouType(String resouType) {
		this.resouType = resouType;
	}
	public int getWidth() {
		return width;
	}
	public void setWidth(int width) {
		this.width = width;
	}
	public boolean isShow() {
		return show;
	}
	public void setShow(boolean show) {
		this.show = show;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	public boolean isModify() {
		return modify;
	}
	public void setModify(boolean modify) {
		this.modify = modify;
	}
	@Override
	public String toString() {
		return "ParameterDto [name=" + name + ", dbName=" + dbName
				+ ", showName=" + showName + ", show=" + show + ", type="
				+ type + ", formatType=" + formatType + ", formatter="
				+ formatter + ", resouType=" + resouType + ", width=" + width
				+ ", selected=" + selected + ", modify=" + modify + "]";
	}
	
}
