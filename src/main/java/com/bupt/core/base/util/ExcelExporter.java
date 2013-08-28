package com.bupt.core.base.util;

import java.io.OutputStream;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bupt.core.base.action.DataRequest;
import com.bupt.core.base.dto.ParameterDTO;
import com.bupt.core.base.service.BaseService;

/**
 * Excel导出服务
 * 
 * @author litong
 * 
 * @param <T>
 * @param <K>
 */
public class ExcelExporter<T, K> {

	private BaseService<T, K> service;
	private DataRequest param;
	private ExcelWriter writer;
	private Map<String, ParameterDTO> paramMap;

	/**
	 * 导出，直接写入response
	 * 
	 * @param response
	 * @author 李彤 2013-8-27 下午9:49:09
	 */
	public void export(HttpServletResponse response) {
		try {
			String fileName = Utils.toUtf8String(param.getFileName());
			// 取得输出流
			OutputStream os = response.getOutputStream();
			response.reset();// 清空输出流
			// 设定输出文件头,该方法有两个参数，分别表示应答头的名字和值。
			response.setHeader("Content-disposition", "attachment;filename="
					+ fileName + ".xls");
			// 定义输出类型
			response.setContentType("application/msexcel");
			// 初始化输出类
			writer = new ExcelWriter(os);
			// 导出查询数据
			exportToXls();
			writer.end();
			os.flush();
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 导出服务
	 * 
	 * @return
	 * @throws Exception
	 * @author 李彤 2013-8-27 下午9:50:09
	 */
	private boolean exportToXls() throws Exception {
		HttpServletRequest request = param.getRequest();
		boolean search = param.isSearch();
		int total = service.getTotalRecords(request, search);// 查询总数
		int maxRecords = param.getMaxRecords();
		int max = total < maxRecords ? total : maxRecords;
		if (max > 65535)// 一次最多可写入65535行
			return false;

		String sortName = param.getSortName();
		String sortOrder = param.getSortOrder();
		String[] colArray = param.getSelectCols().split(",");

		initSheet(colArray);// 初始化sheet

		int cell = 3000;// 每次最大导出的数量，主要为了防止List太长，heap溢出
		int start = 0; // 记录起始位置
		int count = max < cell ? max : cell;
		int batch = max / cell + 1;
		for (int i = 0; i < batch; i++) {
			List<K> dtos = service.listResults(start, count, sortName,
					sortOrder, request, search);
			addContent(dtos, colArray, start);
			start += cell;
			count = (max - start) < cell ? (max - start) : cell;

		}
		return true;
	}

	/**
	 * 准备excel的一个sheet
	 * 
	 * @param colArray
	 * @throws Exception
	 * @author 李彤 2013-8-27 下午9:50:31
	 */
	private void initSheet(String[] colArray) throws Exception {
		String title = param.getFileName();
		// 初始化sheet
		writer.initSheet(title);
		// sheet标题头
		writer.join(1, 1, 1, colArray.length);
		writer.writeTitleData(1, 1, title, 3766);
		// 每列列名
		for (int i = 0; i < colArray.length; i++) {
			ParameterDTO pdto = this.paramMap.get(colArray[i]);
			if (pdto.getWidth() != 0)
				writer.writeColTitleData(2, i + 1, pdto.getShowName(),
						pdto.getWidth()); // 表头
			else
				writer.writeColTitleData(2, i + 1, pdto.getShowName(), 4000);
		}
	}

	/**
	 * 增加excel正文
	 * 
	 * @param dtos
	 * @param colArray
	 * @param start
	 * @throws Exception
	 * @author 李彤 2013-8-27 下午9:50:54
	 */
	private void addContent(List<K> dtos, String[] colArray, int start)
			throws Exception {
		K dto;
		String value;
		for (int i = 0; i < dtos.size(); i++) {
			int row = start + 3 + i;// 第一行为标题、第二行为列头 、数据从第三行开始写
			for (int j = 0; j < colArray.length; j++) {// 列值
				dto = dtos.get(i);
				if (dto == null)
					continue;
				value = getDtoValueByPropertyName(dto, colArray[j]);
				writer.writeData(row, j + 1, value + "");
			}
		}
	}

	/**
	 * 从dto中根据属性的名称获得属性的值
	 * 
	 * @param dto
	 * @param name
	 * @return
	 * @throws Exception
	 * @author 李彤 2013-8-27 下午9:51:09
	 */
	private String getDtoValueByPropertyName(K dto, String name)
			throws Exception {
		String defaultNull = "";
		Object ret;
		Method[] methods = dto.getClass().getMethods();
		for (int i = 0; i < methods.length; i++) {
			if (methods[i].getName().toLowerCase()
					.equals("get" + name.toLowerCase())) {
				return ((ret = methods[i].invoke(dto, null)) == null) ? defaultNull
						: ret.toString();
			}
		}
		return defaultNull;
	}

	//getter and setter
	public Map<String, ParameterDTO> getParamMap() {
		return paramMap;
	}

	public void setParamMap(Map<String, ParameterDTO> paramMap) {
		this.paramMap = paramMap;
	}

	public BaseService<T, K> getService() {
		return service;
	}

	public void setService(BaseService<T, K> service) {
		this.service = service;
	}

	public DataRequest getParam() {
		return param;
	}

	public void setParam(DataRequest param) {
		this.param = param;
	}
}
