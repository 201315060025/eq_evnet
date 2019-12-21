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

class ApplyJoinActHandler(tornado.web.RequestHandler):
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
              if Utils().isValueInIDFormat(post_data['actid'],user.apply_act_list):
                 respon = {'errorcode':configs_error['cannotapplymuti']}
              else:
                  act = Dal_Act().getAct(post_data['actid'])
                  if act == None:
                      respon = {'errorcode':configs_error['actinvaild']}
                  else:
                        newApplyAct = ActApply(applyer = user.id,reason = post_data['reason'],
                                               optype = (int)(post_data['optype']),
                                               state = (int)(configs_org['applystate']['none']),
                                               actid = act.id)
                        newid = Dal_ActApply().addActApply(newApplyAct)

                         ##活动属性改变
                        if  Utils().isNull(act.applylist):
                              act.applylist = str(newid)  ## 这一部分错误 不是申请活动的id 而是用户的id
                        else:
                              act.applylist =  act.applylist + ';' + str(newid)

                        updateArgs = { 'applylist' : act.applylist }
                        Dal_Act().updateAct(act.id,**updateArgs)

                        if  Utils().isNull(user.apply_act_list):
                              user.apply_act_list = str(newid)
                        else:
                              user.apply_act_list =  user.apply_act_list + ';' + str(newid)

                        updateArgs = { 'apply_act_list' : user.apply_act_list }
                        Dal_User().updateUser(user.id,**updateArgs)
                        respon = {'errorcode':configs_error['success']}

        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)
