/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : orgapp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-03-17 17:35:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `officer`
-- ----------------------------
DROP TABLE IF EXISTS `officer`;
CREATE TABLE `officer` (
  `id` int(18) NOT NULL COMMENT '管理层人员id,工号',
  `name` varchar(64) DEFAULT NULL,
  `title` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of officer
-- ----------------------------
INSERT INTO `officer` VALUES ('20161001', '管理员1', '1');
