package com.bupt.core.base.util;


import java.io.IOException;
import java.io.OutputStream;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 * 写Excel的类
 * @author litong
 *
 */
public class ExcelWriter {
	
	    private HSSFWorkbook workbook=new HSSFWorkbook() ;
	    public HSSFSheet sheet;
	    private HSSFCellStyle titleStyle;//标题
	    private HSSFCellStyle headerStyle;
	    private HSSFCellStyle contentStyle;
	    private int sheetno = 0;
	    private OutputStream Out;

		public ExcelWriter(OutputStream os){
	    	Out = os; 
	    }
		
	    public void initSheet(String sheetname) {
	        sheet = workbook.createSheet(sheetname); 
	        workbook.setSheetName(sheetno, sheetname);
	        sheetno++;
	        titleStyle = getCellStyle(HSSFColor.TEAL.index2,18,HSSFColor.WHITE.index);
	        headerStyle = getCellStyle(HSSFColor.LIGHT_YELLOW.index,12,HSSFColor.BLACK.index);
	        contentStyle = getCellStyle();		
	               
	    }
	    public void freeze(int column,int row ){
	       sheet.createFreezePane(column,row);
	    }
		
	    /**
	     * 功能描述：设置表单数据字体的粗细与大小
	     * @param bold 字体是否为粗体，true为粗体，false不为粗体
	     * @param size 字体大小
	     * @return 表单设置的格式HSSFCellStyle
	     * @see HSSFCellStyle
	     */
	    public HSSFCellStyle getCellStyle(boolean bold, short size) {
	        HSSFCellStyle style = workbook.createCellStyle();
	        HSSFFont font = workbook.createFont();

	        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
	        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
	        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
	        style.setWrapText(true);
	        if (bold == true) {
	            font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
	        }
	        font.setFontHeightInPoints(size);
	        font.setCharSet(HSSFFont.ANSI_CHARSET);
	        
	         font.setFontName("仿宋_GB2312");
	        style.setFont(font);
	        return style;
			
	    }
		
	    /**
	     * 功能描述：获取表单数据格式
	     * @return 表单数据格式
	     */
	    public HSSFCellStyle getCellStyle() {
	    	HSSFCellStyle style = workbook.createCellStyle();
	    	
	        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
	        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
	        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
	        style.setWrapText(true);
	        return style;
			
	    }
	    public HSSFCellStyle getCellStyle(int bgColor,int fontSize, int fontColor){
	    	HSSFCellStyle style = workbook.createCellStyle();
			HSSFFont font = workbook.createFont();
			
			font.setFontHeightInPoints((short)fontSize);
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			font.setColor((short)fontColor);
			style.setFont(font);
	        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
	        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
	        style.setFillForegroundColor((short) bgColor);// 设置背景色
	        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
	        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
	        style.setWrapText(false);
	        return style;
		}
		public HSSFCellStyle getCellStyle(short color){
			HSSFCellStyle style = workbook.createCellStyle();
			HSSFFont font=workbook.createFont();
			font.setColor(color);
	        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
	        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
	        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
	        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
	        style.setFont(font);
	        style.setWrapText(true);
	        return style;
		}
	    /**
	     * 功能描述：修改表单的名称
	     * @param i 表单序号
	     * @param name 名称
	     */
	    public void setSheetName(int i, String name) {
	        workbook.setSheetName(i, name);
	    }
//	    /**
//		    * 功能描述:设置表单单元格自适应宽
//		    * @Title: setCellAutoWidth 
//		    * @param sheetName
//		    * @param column
//		     */
//		    public void setCellAutoWidth(String sheetName, int row, int col){
//		    	HSSFSheet sheet = workbook.getSheet(sheetName);
//		    	HSSFCellStyle cellStyle=workbook.createCellStyle();   
//		    	cellStyle.setWrapText(false);
//		    	sheet.setDefaultColumnStyle(col, cellStyle);
//		    	sheet.set.autoSizeColumn(col);
//		    	
//		    	HSSFRow row1=sheet.getRow(row-1);
//				if(row1==null){
//		           row1 = sheet.createRow(row - 1);
//				}
//		        HSSFCell cell = row1.getCell(col - 1);
//
//		       style = getCellStyle();
//		        cell.setCellType(HSSFCell.CELL_TYPE_STRING);
//		        cell.setCellStyle(style);
//		    }
//		
	    /**
	     * 功能描述：创建新的表单
	     * @return 表单HSSFSheet
	     * @see HSSFSheet
	     */
	    public HSSFSheet createSheet() {
	        HSSFSheet sheet = workbook.createSheet();

	        return sheet;
	    }

	    /**
	     * 功能描述：合并两个数据表
	     * @param row1 行数
	     * @param col1 列数
	     * @param row2 行数
	     * @param col2 列数
	     * @return 合并成功返回true
	     */
	    public boolean join(int row1, int row2,int col1, int col2) {
	        for (int i = row1 - 1; i < row2; i++) {
	        	
	           // HSSFRow row = sheet.createRow(i);
	            HSSFRow row=sheet.getRow(i);
	    		if(row==null){
	               row = sheet.createRow(i);
	    		}
	            for (int j = col1 - 1; j < col2; j++) {
	            	HSSFCell cell=row.getCell(j);
	            	if(cell==null){
	                    cell = row.createCell(j);
	            	}

	                cell.setCellStyle(contentStyle);
	            }
	        }
	        
	      sheet.addMergedRegion(new CellRangeAddress(row1-1,row2-1,col1-1,col2-1));
	        return true;
	    }
	    
	    /**
	     * 功能描述：往Excel表指定起标题列中写数据
	     * @param row 行数
	     * @param col 列数
	     * @param data 数据
	     * @return 写数据成功返回true,否则返回false
	     */
	    public boolean writeTitleData(int row, int col, String data, int width) {	
			HSSFRow row1=sheet.getRow(row-1);
			if(row1==null){
	           row1 = sheet.createRow(row - 1);
			}
			row1.setHeightInPoints(35.0f);
	        HSSFCell cell = row1.createCell(col - 1);

	        cell.setCellType(HSSFCell.CELL_TYPE_STRING);
	        cell.setCellValue(data);	
	        cell.setCellStyle(titleStyle);
	        sheet.setColumnWidth(col - 1, width);
	        return true;
	    }
	    
	    /**
	     * 功能描述：往Excel表指定起标题列中写数据
	     * @param row 行数
	     * @param col 列数
	     * @param data 数据
	     * @return 写数据成功返回true,否则返回false
	     */
	    public boolean writeColTitleData(int row, int col, String data, int width) {	
			HSSFRow row1=sheet.getRow(row-1);
			if(row1==null){
	           row1 = sheet.createRow(row - 1);
			}
			row1.setHeightInPoints(30.0f);
	        HSSFCell cell = row1.createCell(col - 1);

	        cell.setCellType(HSSFCell.CELL_TYPE_STRING);
	        cell.setCellValue(data);	
	        cell.setCellStyle(headerStyle);
	        sheet.setColumnWidth(col - 1, width);
	        return true;
	    }
   
	    /**
	     * 功能描述：往Excel表指定起始行和列中写数据
	     * @param row 行数
	     * @param col 列数
	     * @param data 数据
	     * @return 写数据成功返回true,否则返回false
	     */
	    public boolean writeData(int row, int col, String data) {	
			HSSFRow row1=sheet.getRow(row-1);
			if(row1==null){
	           row1 = sheet.createRow(row - 1);
			}
			row1.setHeightInPoints(30.0f);
	        HSSFCell cell = row1.createCell(col - 1);

	        cell.setCellType(HSSFCell.CELL_TYPE_STRING);
	        cell.setCellValue(data);	
	        cell.setCellStyle(contentStyle);
	        return true;
	    }
	    
	    /**
	     * 功能描述：往Excel表指定起始行和列中写数据
	     * @param row 行数
	     * @param col 列数
	     * @param data 数据
	     * @return 写数据成功返回true,否则返回false
	     */
	    public boolean writeData(int row, int col, double data) {	
			
	        HSSFRow row1 = sheet.createRow(row - 1);
	        HSSFCell cell = row1.createCell(col - 1);

	        cell.setCellType(HSSFCell.CELL_TYPE_STRING);
	        cell.setCellValue(data);	
	        cell.setCellStyle(contentStyle);
	        return true;
	    }
		
	  
	    /**
	     * 功能描述：往Excel表指定起始行和列中写数据
	     * @param row 行数
	     * @param col 列数
	     * @param data 数据
	     * @return 写数据成功返回true,否则返回false
	     */
	    public boolean writeData(int row, int col, int data) {	
			
	        HSSFRow row1 = sheet.createRow(row - 1);
	        HSSFCell cell = row1.createCell(col - 1);
	        cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
	        cell.setCellValue(data);
	        cell.setCellStyle(contentStyle);
	        return true;
	    }
	    
	    public void end() throws IOException {
	        workbook.write(Out);	       
	    }
	    
	    //getter and setter
		public int getSheetno() {
			return sheetno;
		}
		public void setSheetno(int sheetno) {
			this.sheetno = sheetno;
		}
}
