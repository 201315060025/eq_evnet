/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : orgapp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-03-03 09:55:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `actapply`
-- ----------------------------
DROP TABLE IF EXISTS `actapply`;
CREATE TABLE `actapply` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `applyer` int(10) NOT NULL COMMENT '申请者id',
  `reason` varchar(1024) DEFAULT NULL COMMENT '申请理由',
  `optype` tinyint(2) DEFAULT NULL COMMENT '加入或退出',
  `state` smallint(4) DEFAULT NULL COMMENT '当前申请的状态，0未审批 1批准 2不批准',
  `actid` int(10) NOT NULL COMMENT '申请加入的活动id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of actapply
-- ----------------------------
