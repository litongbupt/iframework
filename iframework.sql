/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50610
 Source Host           : localhost
 Source Database       : iframework

 Target Server Type    : MySQL
 Target Server Version : 50610
 File Encoding         : utf-8

 Date: 07/21/2013 17:19:08 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `course_tree`
-- ----------------------------
DROP TABLE IF EXISTS `course_tree`;
CREATE TABLE `course_tree` (
  `id` varchar(255) NOT NULL,
  `num` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `p_id` varchar(50) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `course_tree`
-- ----------------------------
BEGIN;
INSERT INTO `course_tree` VALUES ('402880ca3da97ad5013da980b3a30000', '1001.2', '1.2硬盘的逻辑结构', 'ff8080813da5158e013da51a72f60002', 'SECTION'), ('402880ca3da99c05013da9a983770000', '1001.1.1.1', '1.1.1 硬盘的发展历史', 'ff8080813da5158e013da5620d0b0020', 'WARE'), ('402880ca3da99c05013da9c09f680001', '1001.1.1.2', '1.1.2 硬盘的外部结构', 'ff8080813da5158e013da5620d0b0020', 'WARE'), ('402880ca3da99c05013da9c450610002', '1001.1.1.3', '1.1.3 硬盘的内部结构', 'ff8080813da5158e013da5620d0b0020', 'WARE'), ('402880ca3da99c05013da9c5a8cb0003', '1001.1.1.4', '1.1.4 硬盘的基本参数', 'ff8080813da5158e013da5620d0b0020', 'WARE'), ('402880ca3da99c05013da9c721ac0004', '1001.1.1.5', '1.1.5 硬盘的物理寻址方式(CHS)', 'ff8080813da5158e013da5620d0b0020', 'WARE'), ('402880ca3da99c05013da9ca41790005', '1001.2.1', '1.2.1 硬盘的逻辑磁道', '402880ca3da97ad5013da980b3a30000', 'WARE'), ('402880ca3da99c05013da9cb57b90006', '1001.2.2', '1.2.2 硬盘的逻辑扇区', '402880ca3da97ad5013da980b3a30000', 'WARE'), ('402880ca3da99c05013da9cc6eaa0007', '1001.2.3', '1.2.3 硬盘的逻辑柱面', '402880ca3da97ad5013da980b3a30000', 'WARE'), ('402880ca3da99c05013da9cde5860008', '1001.2.4', '1.2.4 硬盘的逻辑磁头', '402880ca3da97ad5013da980b3a30000', 'WARE'), ('402880ca3da99c05013da9cedf060009', '1001.2.5', '1.2.5 硬盘的逻辑寻址方式(LBA)', '402880ca3da97ad5013da980b3a30000', 'WARE'), ('402880ca3da99c05013da9d007c0000a', '1001.3', '1.3 硬盘分区表', 'ff8080813da5158e013da51a72f60002', 'SECTION'), ('402880ca3da99c05013da9d3144e000b', '1001.3.1', '1.3.1 MBR和MBR的作用', '402880ca3da99c05013da9d007c0000a', 'WARE'), ('402880ca3da99c05013da9d3adcd000c', '1001.3.2', '1.3.2 MBR的修复方法', '402880ca3da99c05013da9d007c0000a', 'WARE'), ('402880ca3da99c05013da9d5df90000d', '1001.3.3', '1.3.3 主磁盘分区的结构解析', '402880ca3da99c05013da9d007c0000a', 'WARE'), ('402880ca3da99c05013da9dd38ec000e', '1001.3.4', '1.3.4 扩展分区结构解析', '402880ca3da99c05013da9d007c0000a', 'WARE'), ('402880ca3da99c05013da9e13ff0000f', '1002.1', '2.1 FAT32文件系统结构总揽', 'ff8080813da5158e013da51b0fd00003', 'SECTION'), ('402880ca3da99c05013da9e3528a0010', '1002.2', '2.2 FAT32文件系统DBR', 'ff8080813da5158e013da51b0fd00003', 'SECTION'), ('402880ca3da99c05013da9e5cf300011', '1002.2.1', '2.2.1 DBR的概念和组成', '402880ca3da99c05013da9e3528a0010', 'WARE'), ('402880ca3da99c05013da9e799d80012', '1002.2.2', '2.2.2 DBR和MBR的异同比较', '402880ca3da99c05013da9e3528a0010', 'WARE'), ('402880ca3da99c05013da9ea36fd0013', '1002.3', '2.3 FAT的概念与结构', 'ff8080813da5158e013da51b0fd00003', 'SECTION'), ('402880ca3da99c05013da9eb855e0014', '1002.4', '2.4 FDT的概念与结构', 'ff8080813da5158e013da51b0fd00003', 'SECTION'), ('402880ca3da99c05013da9ee2d3a0015', '1002.4.1', '2.4.1 短文件名目录项', '402880ca3da99c05013da9eb855e0014', 'WARE'), ('402880ca3da99c05013da9f5807f0016', '1002.4.2', '2.4.2 长文件名目录项', '402880ca3da99c05013da9eb855e0014', 'WARE'), ('402880ca3da99c05013da9f7208d0017', '1002.4.3', '2.4.3 根目录文件管理', '402880ca3da99c05013da9eb855e0014', 'WARE'), ('402880ca3da99c05013da9f82c120018', '1002.4.4', '2.4.4 子目录文件管理', '402880ca3da99c05013da9eb855e0014', 'WARE'), ('402880ca3da99c05013daa020a000019', '1002.5', '2.5 FDT与FAT的作用和意义', 'ff8080813da5158e013da51b0fd00003', 'SECTION'), ('402880ca3da99c05013daa0393d4001a', '1002.6', '2.6 FAT32文件系统的数据区分析 ', 'ff8080813da5158e013da51b0fd00003', 'SECTION'), ('402880ca3da99c05013daa060229001b', '1002.7', '2.7 FAT32文件系统删除文件的分析', 'ff8080813da5158e013da51b0fd00003', 'SECTION'), ('402880ca3da99c05013daa0b94a6001c', '1002.8', '2.8 FAT32文件系统误格式化的分析 ', 'ff8080813da5158e013da51b0fd00003', 'SECTION'), ('402880ca3da99c05013daa175c4e001d', '1005.1', '5.1 FAT32文件系统下文件误删除恢复', 'ff8080813da5158e013da51cff9a0006', 'SECTION'), ('402880ca3da99c05013daa189346001e', '1005.2', '5.2 FAT32文件系统下误格式化恢复', 'ff8080813da5158e013da51cff9a0006', 'SECTION'), ('402880ca3da99c05013daa1b9a9e001f', '1005.3', '5.3 NTFS文件系统下文件误删除恢复', 'ff8080813da5158e013da51cff9a0006', 'SECTION'), ('402880ca3da99c05013daa1d06880020', '1005.4', '5.4 NTFS文件系统下误格式化恢复', 'ff8080813da5158e013da51cff9a0006', 'SECTION'), ('402880ca3da99c05013daa3f053d0021', '1005.5', '5.5 FAT32文件系统DBR破坏的恢复实例', 'ff8080813da5158e013da51cff9a0006', 'SECTION'), ('402880ca3da99c05013daa4764d30022', '1005.6', '5.6 NTFS文件系统 DBR修复方法', 'ff8080813da5158e013da51cff9a0006', 'SECTION'), ('402880ca3da99c05013daa499e060023', '1005.7', '5.7 分区误删除的恢复实例', 'ff8080813da5158e013da51cff9a0006', 'SECTION'), ('402880ca3da99c05013daa4ca4e20024', '1005.8', '5.8 RAID5磁盘阵列恢复的实例', 'ff8080813da5158e013da51cff9a0006', 'SECTION'), ('402880ca3da99c05013daa4dd5860025', '1006.1', '6.1 R-Studio数据恢复软件使用方法', 'ff8080813da5158e013da51db5a70007', 'SECTION'), ('402880ca3daa507b013daa88915f0003', '1006.2', '6.2 Winhex使用方法 ', 'ff8080813da5158e013da51db5a70007', 'SECTION'), ('402880ca3daa507b013daa890fb50004', '1006.3', '6.3 Victoria硬盘检测软件使用方法', 'ff8080813da5158e013da51db5a70007', 'SECTION'), ('402880ca3daa507b013daa899ea70005', '1006.4', '6.4 RAID Reconstructor磁盘阵列重组介绍', 'ff8080813da5158e013da51db5a70007', 'SECTION'), ('402880ca3daa507b013daa8a09660006', '1006.5', '6.5 HDClone硬盘克隆软件说明', 'ff8080813da5158e013da51db5a70007', 'SECTION'), ('ff8080813da5158e013da517bf250000', '1000', '数据恢复理论与技术', '-1', 'COURSE'), ('ff8080813da5158e013da51a72f60002', '1001', '第一章 硬盘物理和逻辑结构', 'ff8080813da5158e013da517bf250000', 'CHAPTER'), ('ff8080813da5158e013da51b0fd00003', '1002', '第二章 FAT32文件系统', 'ff8080813da5158e013da517bf250000', 'CHAPTER'), ('ff8080813da5158e013da51bd7680004', '1003', '第三章 NTFS文件系统', 'ff8080813da5158e013da517bf250000', 'CHAPTER'), ('ff8080813da5158e013da51c83f90005', '1004', '第四章 服务器磁盘阵列知识', 'ff8080813da5158e013da517bf250000', 'CHAPTER'), ('ff8080813da5158e013da51cff9a0006', '1005', '第五章 数据恢复典型案例分析', 'ff8080813da5158e013da517bf250000', 'CHAPTER'), ('ff8080813da5158e013da51db5a70007', '1006', '第六章 常见软件使用方法', 'ff8080813da5158e013da517bf250000', 'CHAPTER'), ('ff8080813da5158e013da51e273e0008', '1007', '第七章 PC3000使用介绍', 'ff8080813da5158e013da517bf250000', 'CHAPTER'), ('ff8080813da5158e013da51f2f570009', '2000', '数据恢复教学课件', '-1', 'COURSE'), ('ff8080813da5158e013da51f8914000a', '2001', '第一讲 数据恢复范畴与前景', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da51ffb34000b', '2002', '第二讲 硬盘物理结构和逻辑结构 ', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da520cd71000c', '2003', '第三-四讲  MBR和分区表', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da523317a000f', '2006', '第五讲  第六讲 FAT32系统下误删和误格原理', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da523e0920010', '2007', '第七讲 winhex做镜像', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da524bcca0011', '2008', '第八讲 分区打不开的手工恢复方法', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da525b5580012', '2009', '第九讲 文件误格式化', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da5266cf30013', '2010', '第十讲 文件误删除', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da53990920017', '2014', '第十四讲 开盘恢复知识介绍', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da53ad9790019', '2016', '第十六讲 硬盘数据安全擦除', 'ff8080813da5158e013da51f2f570009', 'CHAPTER'), ('ff8080813da5158e013da5620d0b0020', '1001.1', '1.1硬盘的物理结构', 'ff8080813da5158e013da51a72f60002', 'SECTION'), ('ff8080813e279dc5013e27a0a70d0000', '3', '数据恢复实践', '-1', 'COURSE'), ('ff8080813e279dc5013e27a11b0e0001', '3.1', '第一章  简介', 'ff8080813e279dc5013e27a0a70d0000', 'CHAPTER');
COMMIT;

-- ----------------------------
--  Table structure for `t_security_businessdata`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_businessdata`;
CREATE TABLE `t_security_businessdata` (
  `businessdata_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `install_date` date DEFAULT NULL,
  `regulation` varchar(40) DEFAULT NULL COMMENT '规则匹配',
  `parent_id` int(11) DEFAULT NULL,
  `is_leaf` bit(1) DEFAULT b'1',
  PRIMARY KEY (`businessdata_id`),
  UNIQUE KEY `ind_name` (`name`) USING BTREE,
  KEY `ind_parent_id` (`parent_id`) USING BTREE,
  CONSTRAINT `fk_businessdata` FOREIGN KEY (`parent_id`) REFERENCES `t_security_businessdata` (`businessdata_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_decision_entitlement`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_decision_entitlement`;
CREATE TABLE `t_security_decision_entitlement` (
  `decision_entitlement_id` int(11) NOT NULL,
  `privilege_id` int(11) NOT NULL,
  `usercategory_id` int(11) NOT NULL,
  `businessdata_id` int(11) NOT NULL,
  `effect` varchar(100) NOT NULL COMMENT '决策',
  `deny_reason` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`decision_entitlement_id`),
  KEY `ind_privilege_id` (`privilege_id`) USING BTREE,
  KEY `ind_usercategory_id` (`usercategory_id`) USING BTREE,
  KEY `ind_businessdata_id` (`businessdata_id`) USING BTREE,
  CONSTRAINT `fk_decision_entitlement_businessdata` FOREIGN KEY (`businessdata_id`) REFERENCES `t_security_businessdata` (`businessdata_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_decision_entitlement_usercategory` FOREIGN KEY (`usercategory_id`) REFERENCES `t_security_usercategory` (`usercategory_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_department`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_department`;
CREATE TABLE `t_security_department` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `level` varchar(30) NOT NULL,
  `is_leaf` bit(1) NOT NULL DEFAULT b'1',
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `ind_name` (`name`) USING BTREE,
  KEY `ind_parent_id` (`parent_id`) USING BTREE,
  CONSTRAINT `fk_department_department` FOREIGN KEY (`parent_id`) REFERENCES `t_security_department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `t_security_department`
-- ----------------------------
BEGIN;
INSERT INTO `t_security_department` VALUES ('1', '总公司', '一级', b'0', null), ('2', '北京分公司', '二级', b'0', '1'), ('3', '科技部', '三级', b'1', '2'), ('4', '人事部', '三级', b'1', '2'), ('5', '文化部', '三级', b'1', '2');
COMMIT;

-- ----------------------------
--  Table structure for `t_security_privilege`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_privilege`;
CREATE TABLE `t_security_privilege` (
  `privilege_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT 'NULL',
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `level` tinyint(2) DEFAULT '0',
  `is_leaf` bit(1) DEFAULT b'1',
  `url` varchar(100) NOT NULL,
  `target` varchar(20) DEFAULT 'rightFrame',
  `order_num` int(11) DEFAULT '0',
  `display` bit(1) DEFAULT b'0',
  `type` varchar(30) DEFAULT 'NULL',
  PRIMARY KEY (`privilege_id`),
  UNIQUE KEY `ind_name` (`name`) USING BTREE,
  KEY `ind_parent_id` (`parent_id`) USING BTREE,
  CONSTRAINT `fk_privilege_privilege` FOREIGN KEY (`parent_id`) REFERENCES `t_security_privilege` (`privilege_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_privilege_decisionentitlement`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_privilege_decisionentitlement`;
CREATE TABLE `t_security_privilege_decisionentitlement` (
  `privilege_decisionentitlement_id` int(11) NOT NULL AUTO_INCREMENT,
  `privilege_id` int(11) NOT NULL,
  `decision_entitlement_id` int(11) NOT NULL,
  PRIMARY KEY (`privilege_decisionentitlement_id`),
  KEY `ind_decision_entitlement_id` (`decision_entitlement_id`) USING BTREE,
  KEY `ind_privilege_id` (`privilege_id`) USING BTREE,
  CONSTRAINT `fk_privilege_decisionentitlement_decisionentitlement` FOREIGN KEY (`decision_entitlement_id`) REFERENCES `t_security_decision_entitlement` (`decision_entitlement_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_privilege_dicisionentitlement_privilege` FOREIGN KEY (`privilege_id`) REFERENCES `t_security_privilege` (`privilege_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_privilege_queryentitlement`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_privilege_queryentitlement`;
CREATE TABLE `t_security_privilege_queryentitlement` (
  `privilege_queryentitlement_id` int(11) NOT NULL AUTO_INCREMENT,
  `privilege_id` int(11) NOT NULL,
  `query_entitlement_id` int(11) NOT NULL,
  PRIMARY KEY (`privilege_queryentitlement_id`),
  KEY `ind_query_entitlement_id` (`query_entitlement_id`) USING BTREE,
  KEY `ind_privilege_id` (`privilege_id`) USING BTREE,
  CONSTRAINT `fk_privilege_queryentitlement_queryentitlement` FOREIGN KEY (`query_entitlement_id`) REFERENCES `t_security_query_entitlement` (`query_entitlement_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_privilege_queryentitlement_privilege` FOREIGN KEY (`privilege_id`) REFERENCES `t_security_privilege` (`privilege_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_query`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_query`;
CREATE TABLE `t_security_query` (
  `query_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `install_date` date DEFAULT NULL,
  `regulation` varchar(40) DEFAULT NULL COMMENT '规则匹配',
  `parent_id` int(11) DEFAULT NULL,
  `is_leaf` bit(1) DEFAULT b'1',
  PRIMARY KEY (`query_id`),
  UNIQUE KEY `ind_name` (`name`) USING BTREE,
  KEY `ind_parent_id` (`parent_id`) USING BTREE,
  CONSTRAINT `fk_query_query` FOREIGN KEY (`parent_id`) REFERENCES `t_security_query` (`query_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_query_entitlement`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_query_entitlement`;
CREATE TABLE `t_security_query_entitlement` (
  `query_entitlement_id` int(11) NOT NULL,
  `usercategory_id` int(11) DEFAULT NULL,
  `query_id` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`query_entitlement_id`),
  KEY `ind_usercategory_id` (`usercategory_id`) USING BTREE,
  KEY `ind_query_id` (`query_id`) USING BTREE,
  CONSTRAINT `fk_query_entitlement_query` FOREIGN KEY (`query_id`) REFERENCES `t_security_query` (`query_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_query_entitlement_usercategory` FOREIGN KEY (`usercategory_id`) REFERENCES `t_security_usercategory` (`usercategory_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_role`;
CREATE TABLE `t_security_role` (
  `role_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `ind_name` (`name`) USING BTREE,
  KEY `ind_parent_id` (`parent_id`) USING BTREE,
  CONSTRAINT `pk_role_role` FOREIGN KEY (`parent_id`) REFERENCES `t_security_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_role_privilege`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_role_privilege`;
CREATE TABLE `t_security_role_privilege` (
  `role_id` int(11) NOT NULL,
  `privilege_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`privilege_id`),
  KEY `ind_privilege_id` (`privilege_id`) USING BTREE,
  KEY `ind_role_id` (`role_id`) USING BTREE,
  CONSTRAINT `fk_role_privilege_privilege` FOREIGN KEY (`privilege_id`) REFERENCES `t_security_privilege` (`privilege_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role_privilege_role` FOREIGN KEY (`role_id`) REFERENCES `t_security_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_user`;
CREATE TABLE `t_security_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'normal' COMMENT '状态为“deleted”，“locked”，“expired”，"normal"等',
  `department_id` int(11) DEFAULT NULL,
  `uesr_name` varchar(30) DEFAULT '请修改显示名',
  PRIMARY KEY (`user_id`),
  KEY `ind_department_id` (`department_id`) USING BTREE,
  CONSTRAINT `fk_user_department` FOREIGN KEY (`department_id`) REFERENCES `t_security_department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- ----------------------------
--  Records of `t_security_user`
-- ----------------------------
BEGIN;
INSERT INTO `t_security_user` VALUES ('1', '张三', '18', 'normal', null, '请修改显示名'), ('3', 'litong', 'yang1290', 'normal', '3', '李彤');
COMMIT;

-- ----------------------------
--  Table structure for `t_security_user_info`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_user_info`;
CREATE TABLE `t_security_user_info` (
  `user_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL DEFAULT 'NULL',
  `telephone` varchar(11) NOT NULL DEFAULT 'NULL',
  `station` varchar(10) NOT NULL DEFAULT 'NULL',
  `birthday` date DEFAULT NULL,
  `hireday` date DEFAULT NULL,
  PRIMARY KEY (`user_info_id`),
  KEY `ind_user_id` (`user_id`) USING BTREE,
  CONSTRAINT `fk_user_info_user` FOREIGN KEY (`user_id`) REFERENCES `t_security_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表，用于记录额外信息';

-- ----------------------------
--  Table structure for `t_security_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_user_role`;
CREATE TABLE `t_security_user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `ind_role_id` (`role_id`) USING BTREE,
  KEY `ind_user_id` (`user_id`) USING BTREE,
  CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `t_security_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `t_security_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `t_security_usercategory`
-- ----------------------------
DROP TABLE IF EXISTS `t_security_usercategory`;
CREATE TABLE `t_security_usercategory` (
  `usercategory_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `install_date` date DEFAULT NULL,
  `regulation` varchar(40) DEFAULT NULL COMMENT '规则匹配',
  `parent_id` int(11) DEFAULT NULL,
  `is_leaf` bit(1) DEFAULT b'1',
  PRIMARY KEY (`usercategory_id`),
  UNIQUE KEY `ind_name` (`name`) USING BTREE,
  KEY `ind_parent_id` (`parent_id`) USING BTREE,
  CONSTRAINT `fk_usercategory_usercategory` FOREIGN KEY (`parent_id`) REFERENCES `t_security_usercategory` (`usercategory_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tb_auth_user_info`
-- ----------------------------
DROP TABLE IF EXISTS `tb_auth_user_info`;
CREATE TABLE `tb_auth_user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loginName` varchar(30) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `isManager` int(11) DEFAULT NULL,
  `hireDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `tb_auth_user_info`
-- ----------------------------
BEGIN;
INSERT INTO `tb_auth_user_info` VALUES ('1', 'Kenzie Jaiden', 'Kenzie Jaiden', 'password', '1', '2', '1', '2008-01-02 00:00:00'), ('2', 'Alexis Stark', 'Alexis Stark', 'password', '1', '4', '1', '2008-01-05 00:00:00'), ('3', 'Kerri Hatcher', 'Kerri Hatcher', 'password', '1', '3', '1', '2008-01-22 00:00:00'), ('4', 'Janie Marie', 'Janie Marie', 'password', '1', '3', '0', '2008-02-02 00:00:00'), ('5', 'Kathleen Woodiwiss', 'Kathleen Woodiwiss', 'password', '1', '3', '0', '2008-02-12 00:00:00'), ('6', 'John Smith', 'John Smith', 'password', '2', '4', '0', '2008-02-20 00:00:00'), ('7', 'Gabrielle Phillips', 'Gabrielle Phillips', 'password', '2', '3', '0', '2008-02-02 00:00:00'), ('8', 'Haylee Ellington', 'Haylee Ellington', 'password', '2', '3', '1', '2008-03-02 00:00:00'), ('9', 'Lydia Nelson', 'Lydia Nelson', 'password', '2', '1', '0', '2008-03-12 00:00:00'), ('10', 'Jaiden Matthew', 'Jaiden Matthew', 'password', '3', '4', '0', '2008-03-22 00:00:00'), ('11', 'Jeremy Steven', 'Jeremy Steven', 'password', '3', '3', '0', '2008-04-02 00:00:00'), ('12', 'Savannah Paula', 'Savannah Paula', 'password', '3', '3', '1', '2008-04-12 00:00:00'), ('13', 'Ava Rose', 'Ava Rose', 'password', '3', '1', '0', '2008-04-22 00:00:00'), ('14', 'Steven Douglas', 'Steven Douglas', 'password', '4', '3', '0', '2008-05-02 00:00:00'), ('15', 'Kaylee Marae', 'Kaylee Marae', 'password', '4', '4', '0', '2008-05-12 00:00:00'), ('16', 'Hayden Panettiere', 'Hayden Panettiere', 'password', '5', '3', '0', '2008-05-22 00:00:00'), ('17', 'Camylle Boyd', 'Camylle Boyd', 'password', '5', '4', '0', '2008-06-12 00:00:00'), ('18', 'Tracey Miklesavage', 'Tracey Miklesavage', 'password', '6', '3', '0', '2008-06-22 00:00:00'), ('19', 'Chaleena Watson', 'Chaleena Watson', 'password', '6', '4', '0', '2008-06-15 00:00:00'), ('20', 'Kaylee Avery', 'Kaylee Avery', 'password', '7', '3', '0', '2008-07-15 00:00:00'), ('21', 'Brooke Paiton', 'Brooke Paiton', 'password', '7', '4', '0', '2008-07-25 00:00:00'), ('22', 'Avah Analise', 'Avah Analise', 'password', '8', '3', '0', '2008-07-03 00:00:00'), ('23', 'Chase Elizabeth', 'Chase Elizabeth', 'password', '8', '4', '0', '2008-08-03 00:00:00'), ('24', 'April Alexander', 'April Alexander', 'password', '9', '3', '0', '2008-08-13 00:00:00'), ('25', 'Brandon Cole', 'Brandon Cole', 'password', '9', '4', '0', '2008-08-23 00:00:00'), ('26', 'Kelly Freeman', 'Kelly Freeman', 'password', '10', '3', '0', '2008-08-03 00:00:00'), ('27', 'Lauren Nicole', 'Lauren Nicole', 'password', '10', '4', '0', '2008-09-03 00:00:00'), ('29', 'Caitlyn Derderian', 'Caitlyn Derderian', 'password', '1', '2', '0', '2008-09-13 00:00:00'), ('30', 'Angeles Corona', 'Angeles Corona', 'password', '2', '2', '1', '2008-09-23 00:00:00'), ('31', 'Ambrozia Shelley', 'Ambrozia Shelley', 'password', '2', '2', '0', '2008-09-07 00:00:00'), ('32', 'Cindy Lawson', 'Cindy Lawson', 'password', '3', '2', '1', '2008-10-03 00:00:00'), ('33', 'Michelle Steinke', 'Michelle Steinke', 'password', '3', '2', '0', '2008-10-13 00:00:00'), ('34', 'Stacie Ferguson', 'Stacie Ferguson', 'password', '4', '2', '1', '2008-10-14 00:00:00'), ('35', 'Clare Matthews', 'Clare Matthews', 'password', '4', '2', '0', '2008-10-15 00:00:00'), ('36', 'Lauren McIntosh', 'Lauren McIntosh', 'password', '5', '2', '1', '2008-10-16 00:00:00'), ('37', 'Amber Stanley', 'Amber Stanley', 'password', '5', '2', '0', '2008-11-17 00:00:00'), ('38', 'Jenna Lyn', 'Jenna Lyn', 'password', '6', '2', '1', '2008-11-10 00:00:00'), ('39', 'Steven Michael', 'Steven Michael', 'password', '6', '2', '0', '2008-11-21 00:00:00'), ('40', 'James Paul', 'James Paul', 'password', '7', '2', '1', '2008-11-07 00:00:00'), ('41', 'Hayden Nicole', 'Hayden Nicole', 'password', '7', '2', '0', '2008-12-07 00:00:00'), ('42', 'Jimmy Greg', 'Jimmy Greg', 'password', '8', '2', '1', '2008-12-09 00:00:00'), ('43', 'Billy Joe', 'Billy Joe', 'password', '8', '2', '0', '2008-12-16 00:00:00'), ('44', 'Andrea Lee', 'Andrea Lee', 'password', '9', '2', '1', '2008-12-26 00:00:00'), ('45', 'John Ridgley', 'John Ridgley', 'password', '9', '2', '0', '2009-01-11 00:00:00'), ('46', 'Sierra Shaffer', 'Sierra Shaffer', 'password', '10', '2', '1', '2009-01-22 00:00:00'), ('47', 'Kimberly Perry', 'Kimberly Perry', 'password', '10', '2', '0', '2009-01-23 00:00:00'), ('48', 'Ella Kate', 'Ella Kate', 'password', '1', '4', '0', '2009-01-13 00:00:00'), ('49', 'Sophie Britton', 'Sophie Britton', 'password', '2', '4', '1', '2009-02-23 00:00:00'), ('50', 'Kassy Smith', 'Kassy Smith', 'password', '3', '4', '1', '2009-02-02 00:00:00'), ('51', 'Amanda Christine', 'Amanda Christine', 'password', '4', '4', '1', '2009-02-12 00:00:00'), ('52', 'Dalton Grace', 'Dalton Grace', 'password', '5', '4', '1', '2009-02-17 00:00:00'), ('53', 'Jenna Carter', 'Jenna Carter', 'password', '6', '4', '1', '2009-03-12 00:00:00'), ('54', 'Allison Welch', 'Allison Welch', 'password', '7', '4', '1', '2009-04-12 00:00:00'), ('55', 'Roxy Garcia', 'Roxy Garcia', 'password', '8', '4', '1', '2009-05-12 00:00:00'), ('56', 'Elizabeth Stamper', 'Elizabeth Stamper', 'password', '9', '4', '1', '2009-03-22 00:00:00'), ('57', 'Lizzy Pendrey', 'Lizzy Pendrey', 'password', '10', '4', '1', '2009-04-07 00:00:00'), ('67', '张三', null, '18', null, null, null, null), ('68', '张三', null, '18', null, null, null, null);
COMMIT;

-- ----------------------------
--  View structure for `v_uesr_info`
-- ----------------------------
DROP VIEW IF EXISTS `v_uesr_info`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_uesr_info` AS select `t1`.`user_id` AS `user_id`,`t1`.`login_name` AS `login_name`,`t1`.`uesr_name` AS `uesr_name`,`t1`.`password` AS `password`,`t1`.`status` AS `status`,`t1`.`department_id` AS `department_id`,`t2`.`user_info_id` AS `user_info_id`,`t2`.`birthday` AS `birthday`,`t2`.`email` AS `email`,`t2`.`hireday` AS `hireday`,`t2`.`station` AS `station`,`t2`.`telephone` AS `telephone` from (`t_security_user` `t1` left join `t_security_user_info` `t2` on((`t1`.`user_id` = `t2`.`user_id`)));

SET FOREIGN_KEY_CHECKS = 1;
