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

class CreateActHandler(tornado.web.RequestHandler):
    def post(self):

        post_data = {}
        print post_data
        for key in self.request.arguments:

           print post_data
           if key == 'starttime' or key == 'endtime':


                  timeArray = time.localtime(float(self.get_arguments(key)[0]))
                  otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
                  post_data[key] = otherStyleTime
                  continue
           post_data[key] = self.get_arguments(key)[0]

        respon = None
        user = Dal_User().getUser(post_data['userid'])
        if user == None:
              respon = {'errorcode':configs_error['userinvaild']}
        else:
              ##申请创建活动
              newAct  = CreateAct(applyer = user.id, name=post_data['name'] ,max = (int)(post_data['max']),
                                  area = post_data['area'],
                                 level = (int)(post_data['level']), summary = post_data['summary'],
                                 type = (int)(post_data['type']), ownertype = (int)(post_data['ownertype']),
                                 starttime = post_data['starttime'],endtime = post_data['endtime'] ,
                                  state = (int)(configs_org['applystate']['none']))
              newID = Dal_CreateAct().addCreateAct(newAct)

              ##申请人属性改变 ##从 查看申请活动的这个人以前是否创建过活动 是否为空
              if  Utils().isNull(user.apply_create_act_list):

                  user.apply_create_act_list = str(newID)
              else:
                  user.apply_create_act_list =  user.apply_create_act_list + ';' + str(newID)

              updateArgs = { 'apply_create_act_list' : user.apply_create_act_list}
              Dal_User().updateUser(user.id,**updateArgs)
              respon = {'errorcode':configs_error['success'],'id':newID}

        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)

