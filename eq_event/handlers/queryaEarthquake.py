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
from db.mysqlapp import MySQLApp
from configs.logger import LOG
USERID = 0
import time

# class BaseHandler(tornado.web.RequestHandler):
#     def get_current_user(self):
#         return self.get_secure_cookie(USERID)

import shelve

class QuearEarthquakeHandler(tornado.web.RequestHandler):
    def get(self):
        sh = shelve.open('cookie_token.save')
        # if not sh.get('user_id'):
        #     self.redirect('/login')
        eq_name = self.get_argument('eq_name', '')
        current_page = int(self.get_argument('current_page', 1))

        sql = "select  * from  earthquake "
        if eq_name:
            sql = "select  * from  earthquake where eqname like %s%s%s" % ("\'%", eq_name, "%\'")
            print sql
        db = MySQLApp().getInstance()
        db.query(sql)

        # default each page count 10
        result = db.fetchAllRows()
        count_page = len(result)
        data_list = result[(current_page-1)*10:current_page*10]
        LOG.info("----------->current_select data:")
        LOG.info(data_list)
        earthquake_str = list()
        for earthquake in data_list:
            if earthquake.get('date'):
                earthquake.update({'date': earthquake['date'].strftime('%Y-%m-%d')})
                earthquake_str.append(earthquake)
            else:
                earthquake_str.append(earthquake)

        response = {"earthquake_list": earthquake_str, 'count_data': count_page, 'current_page': current_page,
                    'status': 200, 'message': 'ok'}
        respon = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+respon+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.finish(response)


class QuearUserHandler(tornado.web.RequestHandler):
    def get(self):
        # sh = shelve.open('cookie_token.save')
        # if not sh.get('user_id'):
        #     self.redirect('/login')
        user_name = self.get_argument('user_name', '')
        current_page = int(self.get_argument('current_page', 1))

        sql = "select  * from  gly "
        if user_name:
            sql = "select  * from gly  where XM like %s%s%s" % ("\'%", user_name, "%\'")
        db = MySQLApp().getInstance()
        db.query(sql)
        # default each page count 10
        result = db.fetchAllRows()
        count_page = len(result)
        data_list = result[(current_page-1)*10:current_page*10]

        earthquake_str = list()
        for earthquake in data_list:
            if earthquake.get('date'):
                earthquake_str.append(earthquake.update({'date': earthquake['date'].strftime('%Y-%m-%d %H:%M:%S')}))
            else:
                earthquake_str.append(earthquake)

        response = {"data": earthquake_str, 'count_data': count_page, 'current_page': current_page,
                    'status': 200, 'message': 'ok', "last_time": time.time()*1000}
        respon = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+respon+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)





