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
from configs.config_org import configs_org
from tools.utils import Utils
##社长更新社团信息
class ApplyJoinOrgHandler(tornado.web.RequestHandler):
    def post(self):

        post_data = {}

        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        respon = None
        user = Dal_User().getUser(post_data['userid'])
        if user == None:
              respon = {'errorcode':configs_error['userinvaild']}
        else:
              ##检查申请者是否已经申请过
              if Utils().isValueInIDFormat(post_data['orgid'],user.apply_org_list):
                 respon = {'errorcode':configs_error['cannotapplymuti']}
              else:
                  org = Dal_Org().getOrg(post_data['orgid'])
                  if org == None:
                      respon = {'errorcode':configs_error['orginvaild']}
                  else:
                        newApplyOrg = OrgApply(applyer = user.id,reason = post_data['reason'],
                                               optype = (int)(post_data['optype']),
                                               state = (int)(configs_org['applystate']['none']),
                                               orgid = org.id)
                        newid = Dal_OrgApply().addOrgApply(newApplyOrg)

                         ##社团属性改变
                        if  Utils().isNull(org.applylist):
                              org.applylist = str(newid)
                        else:
                              org.applylist =  org.applylist + ';' + str(newid)

                        updateArgs = { 'applylist' : org.applylist }
                        Dal_Org().updateOrg(org.id,**updateArgs)

                        if  Utils().isNull(user.apply_org_list):
                              user.apply_org_list = str(newid)
                        else:
                              user.apply_org_list =  user.apply_org_list + ';' + str(newid)

                        updateArgs = { 'apply_org_list' : user.apply_org_list }
                        Dal_User().updateUser(user.id,**updateArgs)

                        respon = {'errorcode':configs_error['success']}

        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)

        self.write(respon_json)
