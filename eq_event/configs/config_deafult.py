#coding:utf-8 'user':'root', 'passwd':'123456', 'db':'orgapp',   ---------'db':'wang_data1',

configs_app = {
       'db': {
           'host': '127.0.0.1',
           'port': 3306,
           'user': 'root',
            # 'passwd':'123456',
            # 'passwd': 'blx123',
            'passwd':'wn123456',
            # 'db':'orgapp',
            'db': 'eqls',
            ##'db':'wang_armyapp',
            'charset': 'utf8',
            'cursorclass': 'MYSQLdb.cursors.DictCursor',
            'tables': {
                      't1': "CREATE TABLE if not exists  `earthquake`  (\
                                 `id` int(11) NOT NULL AUTO_INCREMENT,\
                                  `eqname` varchar(2000) DEFAULT NULL,\
                                  `longitude` float DEFAULT NULL,\
                                  `latitude` float DEFAULT NULL,\
                                  `level` float DEFAULT NULL,\
                                  `leveltype` varchar(45) DEFAULT NULL,\
                                  `date` datetime DEFAULT NULL,\
                                  `depth` float DEFAULT NULL,\
                                  `introduction` varchar(10000) DEFAULT NULL,\
                                  `Year` int(11) DEFAULT NULL,\
                                  `Month` int(11) DEFAULT NULL,\
                                  `Day` int(11) DEFAULT NULL,\
                                  `hour` int(11) DEFAULT NULL,\
                                  `minute` int(11) DEFAULT NULL,\
                                  `second` int(11) DEFAULT NULL,\
                                  PRIMARY KEY (`id`)\
                                ) ENGINE=InnoDB AUTO_INCREMENT=6350 DEFAULT CHARSET=utf8;",


                      't2': "CREATE TABLE if not exists `fj` (\
                                  `id` int(11) NOT NULL,\
                                  `fjpath` varchar(1000) DEFAULT NULL,\
                                  `eqid` int(11) DEFAULT NULL,\
                                  `fjname` varchar(1000) DEFAULT NULL,\
                                  PRIMARY KEY (`id`)\
                                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",


                      't3': "CREATE TABLE if not exists `gly` (\
                                  `id` int(11) NOT NULL AUTO_INCREMENT,\
                                  `DLM` varchar(50) NOT NULL,\
                                  `MM` varchar(45) DEFAULT NULL,\
                                  `XM` varchar(45) DEFAULT NULL,\
                                  `DH` varchar(45) DEFAULT NULL,\
                                  `YX` varchar(45) DEFAULT NULL,\
                                  PRIMARY KEY (`id`),\
                                  UNIQUE KEY `DLM_UNIQUE` (`DLM`)\
                                ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;",


                       't4': "CREATE TABLE if not exists `hp` (\
                                  `id` int(11) NOT NULL,\
                                  `coordinate` varchar(2000) DEFAULT NULL,\
                                  `earthquakeid` int(11) DEFAULT NULL,\
                                  PRIMARY KEY (`id`)\
                                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
                      }
            },
       'maxtryjob': 20,
}