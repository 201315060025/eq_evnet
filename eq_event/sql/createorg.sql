/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : orgapp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-03-03 09:55:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `createorg`
-- ----------------------------
DROP TABLE IF EXISTS `createorg`;
CREATE TABLE `createorg` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `applyer` int(10) NOT NULL COMMENT '申请创建社团人员id',
  `name` varchar(64) DEFAULT NULL,
  `max` smallint(8) DEFAULT NULL,
  `starttime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `level` tinyint(4) DEFAULT NULL,
  `summary` varchar(1024) DEFAULT NULL,
  `type` smallint(16) DEFAULT NULL,
  `ownertype` smallint(16) DEFAULT NULL,
  `state` smallint(4) DEFAULT NULL COMMENT '当前申请的状态，0未审批 1批准 2不批准',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of createorg
-- ----------------------------
INSERT INTO `createorg` VALUES ('1', '20160001', '测试社团1', '20', '2016-03-02 20:29:23', '1', '我们是很厉害的社团，欢迎大家加入', '1', '1', '2');
INSERT INTO `createorg` VALUES ('2', '20160001', '测试社团1', '20', '2016-03-02 20:32:25', '1', '我们是很厉害的社团，欢迎大家加入', '1', '1', '3');
