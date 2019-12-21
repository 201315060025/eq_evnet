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
from model.actapply import ActApply

from dal.dal_act import Dal_Act
from dal.dal_user import Dal_User
from dal.dal_createact import Dal_CreateAct
from dal.dal_createorg import Dal_CreateOrg
from dal.dal_officer import Dal_Officer
from dal.dal_org import Dal_Org
from dal.dal_orgapply import Dal_OrgApply
from dal.dal_actapply import Dal_ActApply

from configs.config_error import configs_error
from tools.utils import Utils
#添加或修改学生用户基本信息
class UpdateUserHandler(tornado.web.RequestHandler):
    def post(self):
        post_data = {}
        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        respon = None
        updateParam = {}
        user = Dal_User().getUser(post_data['id'])
        if user == None:
           respon = {'errorcode':configs_error['userinvaild']}
        else:

           # if  'photo' in self.request.files:
           #      currpath = os.getcwd()
           #      #upload_path = os.path.abspath(os.path.join(os.path.dirname(__file__),os.path.pardir))
           #      root_path = currpath +'\userPhotos'
           #      if os.path.exists(root_path) == False:
           #          os.mkdir(root_path)
           #      upload_path = currpath +'\userPhotos' +'\\' + str(post_data['id'])
           #      if os.path.exists(upload_path) == False:
           #          os.mkdir(upload_path)
           #
           #      infile = self.request.files['photo'][0]
           #      savename = post_data['id'] + '.jpg'
           #      savepath =os.path.join(upload_path,savename)
           #      tmpfile = open(savepath, "wb")
           #      tmpfile.write(infile['body'])
           #      tmpfile.flush()
           #      tmpfile.close()


           Dal_User().updateUser(post_data['id'],**post_data)
           respon = {'errorcode':configs_error['success']}

        respon_json = json.dumps(respon)
        self.write(respon_json)




