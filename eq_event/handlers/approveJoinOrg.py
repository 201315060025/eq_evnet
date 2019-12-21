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

##审批社团加入
class ApproveJoinOrgHandler(tornado.web.RequestHandler):
    def post(self):

        post_data = {}
        uid = 0
        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        respon = None
        print post_data
        user = Dal_User().getUser(post_data['userid'])
        if user == None:
           respon = {'errorcode':configs_error['userinvaild']}
        else:
                   applylist = Utils().decodeIDFormat(post_data['applylist'])  ##把传回的申请列表的字符串转化为列表
                   approvelist = Utils().decodeIDFormat(post_data['approvelist'])## 把传回的申请列表的协议转化列表
                   index = 0
                   resultApprove = []
                   for id in applylist:
                        applyOrg = Dal_OrgApply().getOrgApply(id)  ##申请者申请的社团是否存在
                        if applyOrg == None:
                            respon = {'errorcode':configs_error['paramerror'],'successlist':resultApprove}
                            self.resultHandler(respon)
                            return

                        org = Dal_Org().getOrg(applyOrg.orgid)
                        if org == None:
                           respon = {'errorcode':configs_error['orginvaild'],'successlist':resultApprove}
                           self.resultHandler(respon)
                           return

                        boss =  Dal_Org().getOrgTitleMember(org.id,configs_org['orgtitle']['boss'])  ## 获取管理员是否存在根据键值对判断用户
                        if boss != str(user.id):
                             respon = {'errorcode':configs_error['inprivilege'],'successlist':resultApprove}
                             self.resultHandler(respon)
                             return

                        if (applyOrg.state) == (int)(configs_org['applystate']['none']):
                                if approvelist[index] == '0':##批准
                                   applyer = Dal_User().getUser(applyOrg.applyer)
                                   #检查是申请加入还是退出
                                   if applyOrg.optype == 0:#加入
                                      if  Utils().isNull(applyer.join_org_list):
                                          applyer.join_org_list = str(org.id)
                                      else:
                                          applyer.join_org_list = applyer.join_org_list + ';' + str(org.id)

                                      org.memlist = org.memlist + ';' + str(applyOrg.applyer) + ':' + str(configs_org['orgtitle']['worker'])

                                   else:#退出
                                       joinidlist = Utils().decodeIDFormat(applyer.join_org_list)
                                       if (org.id in joinidlist) == True:
                                           joinidlist.remove(org.id)
                                           applyer.join_org_list = Utils().encodeIDFormat(joinidlist)

                                       memlist = Utils().decodeMutilFormat(org.memlist,';',':')
                                       for k,v in memlist.iteritems():
                                           if v[0] == applyOrg.applyer:#找到该成员
                                              del memlist[k]
                                              break
                                       org.memlist =Utils().encodeMutilFormat(memlist,';',':')


                                   updateArgs = {'join_org_list' : applyer.join_org_list }
                                   Dal_User().updateUser(applyer.id,**updateArgs)

                                   updateArgs = {'memlist' : org.memlist }
                                   Dal_Org().updateOrg(org.id,**updateArgs)

                                   applyOrg.state = configs_org['applystate']['yes']
                                   updateArgs = {'state' : applyOrg.state }
                                   Dal_OrgApply().updateOrgApply(id,**updateArgs)

                                else:##不批准
                                   applyOrg.state = configs_org['applystate']['no']
                                   updateArgs = {'state' : applyOrg.state }
                                   Dal_OrgApply().updateOrgApply(id,**updateArgs)

                                resultApprove.append(id)
                                respon = {'errorcode':configs_error['success'],'successlist':resultApprove}
                        else:
                            respon = {'errorcode':configs_error['cannotapprovemuti'],'successlist':resultApprove}
                            break
                        index = index + 1

        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)

    def resultHandler(self,respon):
        respon_json = json.dumps(respon)
        self.write(respon_json)