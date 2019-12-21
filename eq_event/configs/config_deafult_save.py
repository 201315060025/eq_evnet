#coding:utf-8 'user':'root', 'passwd':'123456', 'db':'orgapp',   ---------'db':'wang_data1',

configs_app_save = {
       'db' : {'host':'localhost',
        'port': 3306,
        'user':'root',
        'passwd':'blx123456',
        'db':'orgappserver',
        ##'db':'wang_armyapp',
        'charset':'utf8',
        'cursorclass':'MYSQLdb.cursors.DictCursor',
        'tables' :{
          't1': "CREATE TABLE if not exists  `act` (\
                  `id` int(10) NOT NULL AUTO_INCREMENT,\
                  `name` varchar(32) DEFAULT NULL,\
                  `begintime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,\
                  `endtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,\
                  `type` int(10) DEFAULT NULL COMMENT '活动类型',\
                  `ownertype` int(10) DEFAULT NULL COMMENT '活动所属院系id',\
                  `applylist` varchar(1024) DEFAULT NULL COMMENT '申请加入活动者列表',\
                  `area` varchar(1024) DEFAULT NULL COMMENT '活动地点',\
                  `level` smallint(8) DEFAULT NULL COMMENT '活动级别id',\
                  `summary` varchar(4096) DEFAULT NULL COMMENT '活动简介',\
                  `memlist` varchar(1024) DEFAULT NULL COMMENT '活动参加者列表',\
                  `max` smallint(8) DEFAULT NULL,\
                  PRIMARY KEY (`id`)\
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
          't2': "CREATE TABLE if not exists `createact` (\
                  `id` int(10) DEFAULT NULL,\
                  `applyer` int(10) NOT NULL\
                  `name` varchar(64) DEFAULT NULL,\
                  `area` varchar(1024) DEFAULT NULL,\
                  `level` tinyint(4) DEFAULT NULL,\
                  `max` smallint(10) DEFAULT NULL,\
                  `summary` varchar(1024) DEFAULT NULL\
                  `type` smallint(8) DEFAULT NULL,\
                  `ownertype` smallint(8) DEFAULT NULL\
                  `starttime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,\
                  `endtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP\
                  `state` smallint(4) DEFAULT NULL COMMENT '当前申请的状态，0未审批 1批准 2不批准',\
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
          't3':"CREATE TABLE if not exists `createorg` (\
                  `id` int(10) NOT NULL,\
                  `applyer` int(10) NOT NULL COMMENT '申请创建社团人员id',\
                  `name` varchar(64) DEFAULT NULL,\
                  `max` smallint(8) DEFAULT NULL,\
                  `starttime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,\
                  `level` tinyint(4) DEFAULT NULL,\
                  `summary` varchar(1024) DEFAULT NULL,\
                  `type` smallint(16) DEFAULT NULL,\
                  `ownertype` smallint(16) DEFAULT NULL,\
                  `state` smallint(4) DEFAULT NULL COMMENT '当前申请的状态，0未审批 1批准 2不批准',\
                  PRIMARY KEY (`id`)\
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
           't4':"CREATE TABLE if not exists `officer` (\
                  `id` int(10) NOT NULL COMMENT '管理层人员id,工号',\
                  `name` varchar(64) DEFAULT NULL,\
                  `title` tinyint(4) DEFAULT NULL,\
                  PRIMARY KEY (`id`)\
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
           't5':"CREATE TABLE `org` (\
                  `id` int(10) NOT NULL AUTO_INCREMENT,\
                  `name` varchar(32) DEFAULT NULL COMMENT '社团名字',\
                  `type` int(10) DEFAULT NULL COMMENT '社团所属类型id',\
                  `owntype` int(10) DEFAULT NULL COMMENT '社团所属院系id',\
                  `summary` varchar(1024) DEFAULT NULL COMMENT '社团简介',\
                  `memlist` varchar(1024) DEFAULT NULL COMMENT '社团成员id列表,id,title;id,title',\
                  `applylist` varchar(1024) DEFAULT NULL COMMENT '加入社团申请id',\
                  `starttime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,\
                  `level` tinyint(4) DEFAULT NULL,\
                  `max` smallint(8) DEFAULT NULL,\
                  PRIMARY KEY (`id`)\
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
           't6':"CREATE TABLE if not exists `orgapply` (\
                  `id` int(10) NOT NULL,\
                  `applyer` int(10) NOT NULL COMMENT '申请者id',\
                  `reason` varchar(1024) DEFAULT NULL COMMENT '申请理由',\
                  `title` tinyint(4) DEFAULT NULL COMMENT '申请职位id',\
                  `optype` tinyint(2) DEFAULT NULL COMMENT '加入或退出',\
                  `state` smallint(4) DEFAULT NULL COMMENT '当前申请的状态，0未审批 1批准 2不批准',\
                  PRIMARY KEY (`id`)\
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
           't7':"CREATE TABLE if not exists `user` (\
                  `id` int(11) NOT NULL COMMENT '用户id,学号',\
                  `sname` varchar(64) DEFAULT NULL COMMENT '学生名字',\
                  `fun_list` varchar(1024) DEFAULT NULL COMMENT '粉丝列表',\
                  `create_org_list` varchar(1024) DEFAULT NULL COMMENT '创建的社团列表',\
                  `join_org_list` varchar(1024) DEFAULT NULL COMMENT '加入的社团列表',\
                  `create_act_list` varchar(1024) DEFAULT NULL COMMENT '创建的活动列表',\
                  `join_act_list` varchar(1024) DEFAULT NULL COMMENT '加入的活动列表',\
                  `befun_list` varchar(1024) DEFAULT NULL COMMENT '关注的人列表',\
                  `sex` tinyint(2) DEFAULT NULL,\
                  `grade` varchar(16) DEFAULT NULL,\
                  `college` varchar(64) DEFAULT NULL,\
                  `apply_org_list` varchar(1024) DEFAULT NULL COMMENT '申请加入的社团列表',\
                  `apply_act_list` varchar(1024) DEFAULT NULL COMMENT '申请加入的活动列表',\
                  `apply_create_org_list` varchar(1024) DEFAULT NULL,\
                  `apply_create_act_list` varchar(1024) DEFAULT NULL,\
                  PRIMARY KEY (`id`)\
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
           't8':"CREATE TABLE `actapply` (\
                  `id` int(10) NOT NULL,\
                  `applyer` int(10) NOT NULL COMMENT '申请者id',\
                  `reason` varchar(1024) DEFAULT NULL COMMENT '申请理由',\
                  `optype` tinyint(2) DEFAULT NULL COMMENT '加入或退出',\
                  `state` smallint(4) DEFAULT NULL COMMENT '当前申请的状态，0未审批 1批准 2不批准',\
                  PRIMARY KEY (`id`)\
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
          }
       },
       'maxtryjob' : 20,
}