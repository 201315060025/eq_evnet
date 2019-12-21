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

##审批活动创建
class ApproveCreateActHandler(tornado.web.RequestHandler):
    def post(self):

        post_data = {}
        uid = 0
        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        respon = None
        user = Dal_Officer().getOfficer(post_data['userid'])
        if user == None:
           respon = {'errorcode':configs_error['userinvaild']}
        else:
           idlist = Utils().decodeIDFormat(post_data['createactlist'])
           oplist = Utils().decodeIDFormat(post_data['opertypelist'])  ##是否批准的所有的状态id
           index = 0
           resultApprove = []
           for id in idlist:
                co = Dal_CreateAct().getCreateAct(id)
                if co == None:
                    respon = {'errorcode':configs_error['paramerror']}
                    self.resultHandler(respon)
                    return
                if co.state == configs_org['applystate']['none']:  ##如果这个活动申请的状态是1 就是待定
                    if oplist[index] == '0':##批准
                       ##添加新活动，设置申请者为活动负责人
                       newAct = Act()
                       newAct.name = co.name
                       newAct.type = co.type
                       newAct.owntype = co.ownertype
                       newAct.summary = co.summary
                       newAct.begintime = co.starttime
                       newAct.endtime = co.endtime
                       newAct.level = co.level
                       newAct.max = co.max
                       newAct.area = co.area
                       newAct.applylist = None
                       newAct.memlist = str(co.applyer) + ':' + str(configs_org['orgtitle']['boss'])
                       actid = Dal_Act().addAct(newAct)

                       ##更改申请记录状态
                       co.state = configs_org['applystate']['yes']
                       updateArgs = {'state' : co.state }
                       Dal_CreateAct().updateCreateAct(id,**updateArgs)

                       ##添加申请者属性中的创建社团id
                       applyer = Dal_User().getUser(co.applyer)
                       if  Utils().isNull(applyer.create_act_list):
                           applyer.create_act_list = str(actid);
                       else:
                           applyer.create_act_list = applyer.create_act_list + ';' + str(actid)


                       #updateArgs = { 'apply_create_act_list' : applyer.apply_create_act_list ,
                       #               'create_act_list' : applyer.create_act_list }
                       updateArgs = {
                                      'create_act_list' : applyer.create_act_list }
                       Dal_User().updateUser(co.applyer,**updateArgs)


                    else:##不批准
                       co.state = configs_org['applystate']['no']
                       updateArgs = {'state' : co.state }
                       Dal_CreateAct().updateCreateAct(id,**updateArgs)

                    resultApprove.append(id)
                    respon = {'errorcode':configs_error['success'],'successlist':resultApprove}
                else: ##还要返回修改成功的列表  前端在根据修改成功的列表在现实吗
                    respon = {'errorcode':configs_error['cannotapprovemuti'],'successlist':resultApprove}
                    break
                index = index + 1



        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)

    def resultHandler(self,respon):
        respon_json = json.dumps(respon)
        self.write(respon_json)