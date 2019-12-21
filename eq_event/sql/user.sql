/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : orgapp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-03-17 17:35:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(18) NOT NULL COMMENT '用户id,学号',
  `sname` varchar(64) DEFAULT NULL COMMENT '学生名字',
  `fun_list` varchar(1024) DEFAULT NULL COMMENT '粉丝列表',
  `create_org_list` varchar(1024) DEFAULT NULL COMMENT '创建的社团列表',
  `join_org_list` varchar(1024) DEFAULT NULL COMMENT '加入的社团列表',
  `create_act_list` varchar(1024) DEFAULT NULL COMMENT '创建的活动列表',
  `join_act_list` varchar(1024) DEFAULT NULL COMMENT '加入的活动列表',
  `befun_list` varchar(1024) DEFAULT NULL COMMENT '关注的人列表',
  `sex` tinyint(2) DEFAULT NULL,
  `grade` varchar(16) DEFAULT NULL,
  `college` varchar(64) DEFAULT NULL,
  `apply_org_list` varchar(1024) DEFAULT NULL COMMENT '申请加入的社团列表',
  `apply_act_list` varchar(1024) DEFAULT NULL COMMENT '申请加入的活动列表',
  `apply_create_org_list` varchar(1024) DEFAULT NULL,
  `apply_create_act_list` varchar(1024) DEFAULT NULL,
  `photo` varchar(4096) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('20120001', 'sixiaomeng', null, null, null, null, null, null, '0', '4', '1', null, null, null, null, null);
INSERT INTO `user` VALUES ('20160001', '学生1', null, '1', null, '1', null, null, '0', '1', '1', null, null, '1', '1', null);
INSERT INTO `user` VALUES ('20160002', '学生2', null, null, '1', null, '1', null, '0', '1', '1', '1', '1', null, null, null);
