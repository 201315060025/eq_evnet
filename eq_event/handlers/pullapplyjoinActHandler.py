#-*-coding:utf-8-*-
'''
拉取申请加入活动的信息详情，传入值有：用户id　角色　　idlist
'''
import json
import tornado.web
import datetime
import time

from model.actapply import ActApply
from model.user import User
from model.officer import Officer

from dal.dal_actapply import Dal_ActApply
from dal.dal_user import Dal_User
from dal.dal_officer import Dal_Officer

from configs.config_error import configs_error
from configs.config_org import configs_org
from tools.utils import Utils

class PullApplyJoinActHanler(tornado.web.RequestHandler):
    def post(self):
      post_data={}
      for key in self.request.auguments:
        post_data[key]= self.get_arguments(key)[0]
      response={}
      if post_data['roletype'] != "0":
        response={"errorcode":configs_error['inprivilege']} ## 权限不足
      else:
        user=Dal_User().getUser(post_data['userid'])
        # if user == None:
        #     user=Dal_Officer().getOfficer(post_data['userid'])

        if user == None:
            response={"errorcode":configs_error['userinvaild']}
        else:
            result={}
            ## 吧传入的idlist字符串转化为列表
            idlist=Utils().decodeIDFormat(post_data['idlist'])
            for k1 in idlist:
                result[k1]={}
                applyActOb=Dal_ActApply().getActApply(k1)
                for k2,v2 in applyActOb:
                    result[k1][k2]=v2

            ## 以键值对的形式返回 例如：{“1”：{“appler”：“2013”，“reason”:"aaaa"}...}
            response={"errorcode":configs_error['success'],"applyjoinAct":result}
      response_json=json.dumps(response)
      self.write(response_json)











