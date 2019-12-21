#coding:utf-8

import json  ##json文件
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
# from configs.config_deafult import
from tools.utils import Utils

##首先定义一个类
class insertAct():
    ##定义一个方法 前方传入的数据 假设是一个字典
    def post(self,post_data):
            ## 不存在 就要声明一个对象接收 传入的数据 插入到数据库中
            act_model=Act(id=(int)(post_data["id"]),name=post_data["name"],begintime=post_data["begintime"],
                              endtime=post_data["endtime"],type=post_data["type"],ownertype=post_data["ownertype"],
                              applylist=post_data["applylist"],area=post_data["area"],level=post_data["level"],
                              summary=post_data["summary"],memlist=post_data["memlist"],max=(int)(post_data["max"]),
                              photo=post_data["photo"])

            act_model.save()


## test coding
if __name__ == '__main__':
    post_date={"id":4,"name":"wahaha","begintime":"2013-01-11 8:00","endtime":"2013-01-11 18:00",
           "type":1,"ownertype":1,"applylist":"null","area":"zhoukoushifan","level":2,
           "summary":"1111","memlist":"fdsafd","max":200,"photo":"12.jpg"}
    actUser=insertAct().post(post_date)

