/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : orgapp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-03-15 21:07:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `org`
-- ----------------------------
DROP TABLE IF EXISTS `org`;
CREATE TABLE `org` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '社团名字',
  `type` int(10) DEFAULT NULL COMMENT '社团所属类型id',
  `owntype` int(10) DEFAULT NULL COMMENT '社团所属院系id',
  `summary` varchar(1024) DEFAULT NULL COMMENT '社团简介',
  `memlist` varchar(1024) DEFAULT NULL COMMENT '社团成员id列表,id,title;id,title',
  `applylist` varchar(1024) DEFAULT NULL COMMENT '加入社团申请id',
  `starttime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `level` tinyint(4) DEFAULT NULL,
  `max` smallint(8) DEFAULT NULL,
  `photo` varchar(4096) DEFAULT NULL COMMENT '相片数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of org
-- ----------------------------
INSERT INTO `org` VALUES ('1', '测试社团1', '1', '1', '我们是很厉害的社团，欢迎大家加入', '20160001:1;20160002:2', '1', '2016-03-03 21:15:42', '1', '20', null);
