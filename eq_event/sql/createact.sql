/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : orgapp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-03-03 09:55:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `createact`
-- ----------------------------
DROP TABLE IF EXISTS `createact`;
CREATE TABLE `createact` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `applyer` int(10) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `area` varchar(1024) DEFAULT NULL,
  `level` tinyint(4) DEFAULT NULL,
  `max` smallint(10) DEFAULT NULL,
  `summary` varchar(1024) DEFAULT NULL,
  `type` smallint(8) DEFAULT NULL,
  `ownertype` smallint(8) DEFAULT NULL,
  `starttime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `endtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `state` smallint(4) DEFAULT NULL COMMENT '当前申请的状态，0未审批 1批准 2不批准',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of createact
-- ----------------------------
INSERT INTO `createact` VALUES ('1', '20160001', '测试社团1', '我大周师', '1', '20', '我们是很厉害的活动，欢迎大家加入', '1', '1', '2016-03-02 20:56:07', '2016-03-02 20:56:07', '2');
