/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : orgapp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-03-15 21:07:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `act`
-- ----------------------------
DROP TABLE IF EXISTS `act`;
CREATE TABLE `act` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `begintime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `endtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `type` int(10) DEFAULT NULL COMMENT '活动类型',
  `ownertype` int(10) DEFAULT NULL COMMENT '活动所属院系id',
  `applylist` varchar(1024) DEFAULT NULL COMMENT '申请加入活动者列表',
  `area` varchar(1024) DEFAULT NULL COMMENT '活动地点',
  `level` smallint(8) DEFAULT NULL COMMENT '活动级别id',
  `summary` varchar(4096) DEFAULT NULL COMMENT '活动简介',
  `memlist` varchar(1024) DEFAULT NULL COMMENT '活动参加者列表',
  `max` smallint(8) DEFAULT NULL,
  `photo` varchar(4096) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of act
-- ----------------------------
INSERT INTO `act` VALUES ('1', '测试活动1', '2016-03-03 21:16:12', '2016-03-03 21:16:12', '1', null, '1', '我大周师', '1', '我们是很厉害的活动，欢迎大家加入', '20160001:1;20160002:2', '20', null);
