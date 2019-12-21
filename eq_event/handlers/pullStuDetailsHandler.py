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


class PullStuDetailsHandler(tornado.web.RequestHandler):
    def post(self):

        post_data = {}
        uid = 0
        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        respon = None
        user = Dal_User().getUser(post_data['userid'])
        if user == None:
           user = Dal_Officer().getOfficer(post_data['userid'])

        if user == None:
               respon = {'errorcode':configs_error['userinvaild']}
        else:
           idlist = Utils().decodeIDFormat(post_data['idlist'])
           result = {}
           for k in idlist:
               act = Dal_User().getUser(k)
               result[k] = {}
               for k1, v1 in act.iteritems():
                    result[k][k1] = v1

        #处理文件
               result[k]['photo'] = []
               # file_path = os.path.abspath(os.path.join(os.path.dirname(__file__),os.path.pardir))
               # file_path = file_path +'\userPhotos' + '\\' + str(k)
               # all_the_text = ''
               # if os.path.exists(file_path) == True:
               #     for parent,dirnames,filenames in os.walk(file_path):    #三个参数：分别返回1.父目录 2.所有文件夹名字（不含路径） 3.所有文件名
               #         for filename in filenames:                       #输出文件信息
               #              savepath =os.path.join(file_path,filename)
               #              try:
               #                 tmpfile = open(savepath, "rb")
               #              except IOError:
               #                  continue
               #                 ##tmpfile = open("default.jpg", "rb")
               #              try:
               #                   all_the_text = tmpfile.read()
               #              finally:
               #                   tmpfile.close( )
               #
               #              result[k]['photo'].append(all_the_text)

           respon = {'errorcode':configs_error['success'], 'userlist':result}

        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)
