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

from configs.config_error import configs_error
from configs.config_org import configs_org
from tools.utils import Utils


class AttendUserHandler(tornado.web.RequestHandler):
    def post(self):

        post_data = {}
        uid = 0
        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        respon = None
        user = Dal_User().getUser(post_data['userid'])
        if user == None:
           respon = {'errorcode':configs_error['userinvaild']}
        else:
           attenduser = Dal_User().getUser(post_data['attendid'])
           if attenduser == None:
              respon = {'errorcode':configs_error['userinvaild']}
           else:
               if (post_data['opertype'] == '0'):
                   respon = addAttend(user,attenduser)
               else:
                   respon = delAttend(user,attenduser)

        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)

    def addAttend(self,user,attenduser):
               if  Utils().isNull(user.fun_list):
                   user.fun_list = str(attenduser.id)
               else:
                   user.fun_list = user.fun_list + str(attenduser.id)

               if  Utils().isNull(attenduser.befun_list):
                   attenduser.befun_list = str(user.id)
               else:
                   attenduser.befun_list = attenduser.befun_list + str(user.id)

               return  {'errorcode':configs_error['success']}

    def delAttend(self,user,attenduser):
               idlist = Utils().decodeIDFormat(user.fun_list)
               if (attenduser.id in idlist) == False:
                   respon = {'errorcode':configs_error['userinvaild']}
               else:
                   idlist.remove(attenduser.id)
                   user.fun_list = Utils().encodeIDFormat(idlist)

               idlist = Utils().decodeIDFormat(attenduser.befun_list)
               if (user.id in idlist) == False:
                   respon = {'errorcode':configs_error['userinvaild']}
               else:
                   attenduser.befun_list.remove(user.id)
                   attenduser.befun_list = Utils().encodeIDFormat(idlist)
                   respon = {'errorcode':configs_error['success']}


               return respon

               return respon