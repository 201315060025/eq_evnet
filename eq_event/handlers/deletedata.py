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


class DeleteEarthquakeInfo(tornado.web.RequestHandler):
    def get(self):
        response = {'status': 200, 'message': 'ok'}
        # query earthquake info
        earthquake_id = self.get_argument('earthquake_id', 0)
        if not earthquake_id:
            response = {'status': 200, 'message': 'id not exist'}
            # not exist is add info
            # return response
        else:
            Dal_Earthquake().deleteEarthquake(earthquake_id)
        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)


class DeleteUserInfo(tornado.web.RequestHandler):
    def get(self):
        # query earthquake info
        user_id = self.get_argument('user_id', 0)
        response = {'status': 200, 'message': 'ok'}
        if not user_id:
            response = {'status': 200, 'message': 'id not exist'}

        else:
            Dal_User().deleteUser(user_id)
        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)


if __name__ == "__main__":
    # 6356
    Dal_Earthquake().deleteEarthquake('6356')
