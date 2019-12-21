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
import shelve
from db.mysqlapp import MySQLApp
USERID = 0


class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie(USERID)


class LoginHandler(BaseHandler):
    # def get(self):
    #     self.render('page/login.html')

    def get(self, *args, **kwargs):
        username = self.get_argument('user', '')
        password = self.get_argument('pwd', '')
        code = self.get_argument('code', '')
        http_reponse = {'data': list(), 'message': 'ok', 'status': 200}

        sh = shelve.open('cookie_token.save')
        if code != self.get_cookie("verifycode"):
            http_reponse['message'] = 'verifycode is error'
            http_reponse['status'] = 1001
            response = json.dumps(http_reponse)
            self.write(response)
            return None

        # query user
        db = MySQLApp().getInstance()
        sql = "select  * from  gly where DLM ='%s'  and  MM =  '%s' " % (username, password)
        db.query(sql)
        result = db.fetchAllRows()[0]
        if not result:
            http_reponse['message'] = 'user is not exist'
            response = json.dumps(http_reponse)
            self.write(response)
            return None
        USERID = str(result.get('id'))
        sh['user_id'] = USERID
        sh.close()

        # load data
        db = MySQLApp().getInstance()
        db.query(sql)
        # default each page count 10
        result = db.fetchAllRows()[(1-1)*10:1*10-1]
        http_reponse.update({'data': result})

        response = http_reponse
        response = self.get_argument('jsoncallback')+"("+json.dumps(response)+")"

        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)


class LogOut(tornado.web.RequestHandler):
    def get(self):
        sh = shelve.open('cookie_token.save')
        sh.pop("user_id")
        response = {'status': 200, 'message': 'ok'}
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
        return None
