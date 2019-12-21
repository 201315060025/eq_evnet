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

class RegisterHandler(tornado.web.RequestHandler):
    def post(self):
        post_data = {}
        for key in self.request.arguments: ##从请求的参数中获取关键字 key
            post_data[key] = self.get_arguments(key)[0]  ##post_data[key]?? 返回值是什么？  列表 self.get_arguments(key)[0]
        print(post_data)
        respon = None
        if post_data['roletype'] == '0' :#学生  ## 如果发送的数据 中的某个关键字 roletype post_data["roletype"],post_data["name"]
             ur = Dal_User().getUserByAttr('id',(int)(post_data['id']))## 声明一个ur列表 使用一个方法 传入两个参数 目的是查看是否已经存在
             if len(ur) == 0:  ##说明还没有注册，下一步就是注册
                 um = User(id=(int)(post_data['id']), sname= post_data['sname'],
                           fun_list= None,create_org_list =None,create_act_list=None,
                           join_act_list =None,join_org_list =None,befun_list =None,
                           sex =post_data['sex'],grade =post_data['grade'],
                           college =post_data['college'],apply_org_list =None,
                           apply_act_list = None,apply_create_org_list = None,
                           apply_create_act_list = None)
                 Dal_User().addUser(um)

                 respon = {'errorcode':configs_error['success'], 'id':um.id}
             else:
                 respon = {'errorcode':configs_error['register_already']}
        elif post_data['roletype'] == '1':#社管
             off = Dal_Officer().getOfficerByAttr('id',(int)(post_data['id']))
             if len(off) == 0:
                 um = Officer(id=(int)(post_data['id']), name= post_data['name'],
                              title= post_data['title'] )
                 Dal_Officer().addOfficer(um)

                 respon = {'errorcode':configs_error['success'], 'id':um.id}
             else:
                 respon = {'errorcode':configs_error['register_already']}
        else:
              respon = {'errorcode':configs_error['paramerror']}

        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        ##在网页中需要加入响应头
        self.set_header("Access-Control-Allow-Origin","*")
        self.write(post_data)
