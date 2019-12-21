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
from model.actapply import ActApply
from model.act import Act

from dal.dal_act import Dal_Act
from dal.dal_user import Dal_User
from dal.dal_createact import Dal_CreateAct
from dal.dal_createorg import Dal_CreateOrg
from dal.dal_officer import Dal_Officer
from dal.dal_org import Dal_Org
from dal.dal_orgapply import Dal_OrgApply
from dal.dal_actapply import Dal_ActApply

from configs.config_error import configs_error
from configs.config_org import configs_org
from tools.utils import Utils


class PullAllOrgHandler(tornado.web.RequestHandler):
    def post(self):
        #self.set_header("Access-Control-Allow-Origin","*")
        post_data = {}
        uid = 0
        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        respon = None
        resultName = []
        stateList = []
        print post_data
        user = Dal_User().getUser(post_data['userid'])
        if user == None:
           user = Dal_Officer().getOfficer(post_data['userid'])  ##在管理员中在找找

        if user == None:
               respon = {'errorcode':configs_error['userinvaild']}
        else:
            if post_data['type'] == '0':
               result=Dal_Org().getAllID()
               print type(result)

               resultName=Dal_Org().getOrgNameById(result)


            elif post_data['type'] == '1':
               result = Dal_Act().getAllID()
               resultName=Dal_Act().getActNameById(result)



            elif post_data['type'] == '2':
               result = Dal_CreateOrg().getAllID()
               resultName=Dal_CreateOrg().getCreateorgNameById(result)
               stateList=Dal_CreateOrg().getStateById(result)

            elif post_data['type'] == '3':
               result = Dal_CreateAct().getAllID()
               resultName=Dal_CreateAct().getCreateactNameById(result)
               stateList=Dal_CreateAct().getStateById(result)
            elif post_data['type'] == '4':
               result = Dal_OrgApply().getAllID()
               stateList=Dal_OrgApply().getStateById(result)
            elif post_data['type'] == '5':
               result = Dal_ActApply().getAllID()
               stateList=Dal_OrgApply().getStateById(result)

            respon = {'errorcode':configs_error['success'], 'idlist':result, 'type':post_data['type'],'namelist':resultName,'statelist':stateList}

        respon_json = json.dumps(respon)

        print respon_json

        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)
