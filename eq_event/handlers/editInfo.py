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
from dal.dal_fj import Dal_Fj
from db.mysqlapp import MySQLApp
USERID = 0


# class BaseHandler(tornado.web.RequestHandler):
#     def get_current_user(self):
#         return self.get_secure_cookie(USERID)


class EditEarthquakeInfo(tornado.web.RequestHandler):
    """编辑地震信息"""
    def get(self):
        # query earthquake info
        earthquake_id = self.get_argument('earthquake_id', 0)
        response = {'status': 200, 'message': 'ok'}
        if not earthquake_id:
            response = {'status': 1005, 'message': 'earthquake_id not null'}
            # not exist is add info
            # return None
        else:
            earthquake_info = Dal_Earthquake().getEarthquake(int(earthquake_id))
            response.update({"data": dict(earthquake_info)})
            response['data']['date'] = response['data']['date'].strftime('%Y-%m-%d %H:%M:%S') \
                if response['data']['date'] else response['data']['date']
            # 添加附件数据
            response['data']["attachment"] = get_FJ_by_eqID(earthquake_id)

        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)


class EditUserInfo(tornado.web.RequestHandler):
    """编辑用户信息"""
    def get(self):
        # query earthquake info
        user_id = self.get_argument('user_id', 0)
        response = {'status': 200, 'message': 'ok'}
        if not user_id:
            response = {'status': 1004, 'message': 'user id not null'}
            # not exist is add info
            # return None
        else:
            gly = Dal_Gly().getGly(int(user_id))
            response.update({"data": dict(gly)})

        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)


def get_FJ_by_eqID(id):
    """
    根据地震的id，获取该地震的附件
    @param id:
    @return:
    """
    result = list()
    fj_list = Dal_Fj().query("fj", eqid=id)
    if not fj_list:
        return json.dumps(result)

    for fj in fj_list:
        fj_ob = dict()
        fj_ob.update({
            "fjname": fj.get("fjname", "").decode("utf-8"),
            "fjpath": fj.get("fjpath", "").decode("utf-8").replace(":", "/")
        })
        result.append(fj_ob)
    return json.dumps(result)


