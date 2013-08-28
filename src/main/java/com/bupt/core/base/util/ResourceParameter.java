package com.bupt.core.base.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.bupt.core.base.dto.ParameterDTO;
import com.bupt.core.base.dto.ResouInfoDTO;
/**
 * 读取导出数据时的配置文件
 * @author litong
 *
 */
public class ResourceParameter{
	
	private ResourceParameter(){
		throw new AssertionError();
	}
	
	public static Map<String, ResouInfoDTO> resouInfos = new HashMap<String, ResouInfoDTO>();
	
	static{
		//读取resou_info.xml
		SAXReader localReader = new SAXReader();
		Document localDocument;
		try {
			localDocument = localReader.read(ResourceParameter.class.getClassLoader().getResourceAsStream("com/bupt/config/export_info.xml"));
		Element resouInfos = localDocument.getRootElement();
		
		//遍历resou-info标签
		for(Iterator it = resouInfos.elementIterator("resou-info"); it.hasNext();){
			Element resouInfo = (Element)it.next();
			ResouInfoDTO ridto = new ResouInfoDTO();
			String name = resouInfo.attributeValue("name");
			String model = resouInfo.attributeValue("model");
			String table = resouInfo.attributeValue("table");
			
			if(name != null) ridto.setName(name);
			if(model != null) ridto.setModel(model);
			if(table != null) ridto.setTable(table);
			
			for(Iterator pit = resouInfo.elementIterator("parameter"); pit.hasNext();){
				Element parameter = (Element)pit.next();
				ParameterDTO pdto = new ParameterDTO();
				String pname = parameter.attributeValue("name");
				String dbName = parameter.attributeValue("db-name");
				String showName = parameter.attributeValue("show-name");
				String type = parameter.attributeValue("type");
				String formatType = parameter.attributeValue("format-type");
				String formatter = parameter.attributeValue("formatter");
				String resouType = parameter.attributeValue("resou-type");
				String width = parameter.attributeValue("width");
				String show = parameter.attributeValue("show");
				String selected = parameter.attributeValue("selected");
				String modify = parameter.attributeValue("modify");
				
				if(pname != null) pdto.setName(pname);
				if(dbName != null) pdto.setDbName(dbName);
				if(showName != null) pdto.setShowName(showName);
				if(type != null) pdto.setType(type);
				if(formatType != null) pdto.setFormatType(formatType);
				if(formatter != null) pdto.setFormatter(formatter);
				if(resouType != null) pdto.setResouType(resouType);
				if(width != null && !"".equals(width)) pdto.setWidth(Integer.valueOf(width));
				if(show != null && !"".equals(show)) pdto.setShow(Boolean.valueOf(show));
				if(selected != null && !"".equals(selected)) pdto.setSelected(Boolean.valueOf(selected));
				if(modify != null && !"".equals(modify)) pdto.setModify(Boolean.valueOf(modify));
				
				ridto.getParams().put(pname, pdto);
			}
			ResourceParameter.resouInfos.put(name, ridto);
		}		} catch (DocumentException e) {
			e.printStackTrace();
		}	
	}
}

