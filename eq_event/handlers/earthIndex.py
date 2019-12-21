#coding:utf-8

import json
import tornado.web
import time
import os
from model.user import User
from model.createact import CreateAct
from model.createorg import CreateOrg
from model.officer import Officer
from model.org import Org
from model.orgapply import OrgApply
from model.act import Act

from dal.dal_act import Dal_Act
from dal.dal_user import Dal_User
from dal.dal_createact import Dal_CreateAct
from dal.dal_createorg import Dal_CreateOrg
from dal.dal_officer import Dal_Officer
from dal.dal_org import Dal_Org
from dal.dal_orgapply import Dal_OrgApply

from configs.config_error import configs_error
from tools.utils import Utils
from configs.config_error import http_reponse
from dal.dal_earthquake import Dal_Earthquake
from dal.dal_gly import Dal_Gly
from db.mysqlapp import MySQLApp
USERID = 0


# class BaseHandler(tornado.web.RequestHandler):
#     def get_current_user(self):
#         return self.get_secure_cookie(USERID)


class GetMapInfo(tornado.web.RequestHandler):
    def get(self):
        response = {'status': 200, 'message': 'ok'}
        sql = "select  * from  earthquake "
        db = MySQLApp().getInstance()
        db.query(sql)
        # default each page count 10
        result = db.fetchAllRows()
        earthquake_str = list()
        for earthquake in result:
            if earthquake.get('date'):
                earthquake_str.append(earthquake.update({'date': earthquake['date'].strftime('%Y-%m-%d %H:%M:%S')}))
            else:
                earthquake_str.append(earthquake)
        response.update({"data": earthquake_str})
        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)


class GetEartquakeInfo(tornado.web.RequestHandler):
    def get(self):
        # low content is to modify,only is to yinfu
        current_page = int(self.get_argument('current_page', 1))

        # 下面代码有待优化
        eq_level_hight = str(self.get_argument('eq_level_hight'))if self.get_argument('eq_level_hight', '') else 10000
        eq_level_low = str(self.get_argument('eq_level_low')) if self.get_argument('eq_level_low','') else -10000
        #
        eq_depth_hight = str(self.get_argument('eq_depth_hight')) if self.get_argument('eq_depth_hight', '') else 10000
        eq_depth_low = str(self.get_argument('eq_depth_low')) if self.get_argument('eq_depth_low', '') else -10000

        response = {'status': 200, 'message': 'ok'}

        sql = "select  * from  earthquake where level >%s and level< %s and depth >%s and depth <  %s"%\
              (eq_level_low, eq_level_hight, eq_depth_low,  eq_depth_hight)

        print sql
        db = MySQLApp().getInstance()
        db.query(sql)
        # default each page count 10
        result = db.fetchAllRows()
        earthquake_str = list()
        for earthquake in result:
            if earthquake.get('date'):
                earthquake_str.append(earthquake.update({'date': earthquake['date'].strftime('%Y-%m-%d')}))
            else:
                earthquake_str.append(earthquake)
        count_page = len(earthquake_str)
        data_list = earthquake_str[(current_page-1)*10:current_page*10]
        response.update({"data": data_list, 'count_page': count_page, 'current_page': current_page})
        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)



