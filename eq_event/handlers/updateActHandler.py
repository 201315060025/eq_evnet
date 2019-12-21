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


class UpdateActHandler(tornado.web.RequestHandler):
    def post(self):

        post_data = {}
        uid = 0
        for key in self.request.arguments:
            if key == 'userid':
               uid = self.get_arguments(key)[0]
               continue

            post_data[key] = self.get_arguments(key)[0]

        respon = None
        user = Dal_User().getUser(uid)
        if user == None:
           respon = {'errorcode':configs_error['userinvaild']}
        else:
            ##检查是不是活动创建人
            bossID = Dal_Act().getActTitleMember(post_data['id'],configs_org['orgtitle']['boss'])
            if bossID != user.id:
               respon = {'errorcode':configs_error['inprivilege']}
            else:
               # if  'photo' in self.request.files:
               #      currpath = os.getcwd()
               #      #upload_path = os.path.abspath(os.path.join(os.path.dirname(__file__),os.path.pardir))
               #      upload_path = currpath  + '\actPhotos'+ '\\' + post_data['id']
               #      if os.path.exists(upload_path) == False:
               #          os.mkdir(upload_path)
               #
               #      photoCount = Utils().getFileCountInPath(upload_path) + 1
               #      infile = self.request.files['photo'][0]
               #      savename = photoCount + '.jpg'
               #      savepath =os.path.join(upload_path,savename)
               #      tmpfile = open(savepath, "wb")
               #      tmpfile.write(infile['body'])
               #      tmpfile.flush()
               #      tmpfile.close()


               Dal_Act().updateAct(post_data['id'],**post_data)
               respon = {'errorcode':configs_error['success'], 'actid':post_data['id']}


        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)
