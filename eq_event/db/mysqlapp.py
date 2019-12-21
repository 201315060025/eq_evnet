#!/usr/bin/env python
# -*- coding: utf-8 -*-

from tools.mysqlwapper import MySQL
from configs.config_deafult import configs_app
from tools.singleton import Singleton

class MySQLApp():
  u'''派生自己的app数据库类'''
  __metaclass__ = Singleton

  #数据库连接参数
  @classmethod
  def getInstance(self):
      return MySQL(configs_app['db'])## 属于配置文件 在文件夹configs中 相当于 连接通道，连接数据库，并且有所有的数据表


if __name__ == '__main__':
  '''使用样例'''

  #连接数据库，创建这个类的实例
  #db = MySQLApp()

  #操作数据库
  sql = "SELECT * FROM `officer`"
  sqlinstance = MySQLApp().getInstance()
  sqlinstance.query(sql)

  #获取结果列表
  result = sqlinstance.fetchAllRows()
  #相当于php里面的var_dump
  print result

  #对行进行循环
  for row in result:
    #使用下标进行取值
    #print row[0]

    #对列进行循环
    for colum in row:
      print colum[0,2]

  #关闭数据库
  MySQLApp().getInstance().close()