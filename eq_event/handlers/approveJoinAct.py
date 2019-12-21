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

##审批活动加入
class ApproveJoinActHandler(tornado.web.RequestHandler):
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
                   applylist = Utils().decodeIDFormat(post_data['applylist'])
                   approvelist = Utils().decodeIDFormat(post_data['approvelist'])
                   index = 0
                   resultApprove = []
                   for id in applylist:
                        applyAct = Dal_ActApply().getActApply(id)
                        if applyAct == None:
                            respon = {'errorcode':configs_error['paramerror'],'successlist':resultApprove}
                            self.resultHandler(respon)
                            return
                        act = Dal_Act().getAct(applyAct.actid)
                        if act == None:
                          respon = {'errorcode':configs_error['actinvaild'],'successlist':resultApprove}
                          self.resultHandler(respon)
                          return

                        boss =  Dal_Act().getActTitleMember(act.id,configs_org['orgtitle']['boss'])
                        if boss != str(user.id):
                             respon = {'errorcode':configs_error['inprivilege'],'successlist':resultApprove}
                             self.resultHandler(respon)
                             return

                        if applyAct.state == (int)(configs_org['applystate']['none']):
                                if approvelist[index] == '0':##批准

                                   applyer = Dal_User().getUser(applyAct.applyer)
                                   #检查是申请加入还是退出
                                   if applyAct.optype == 0:#加入
                                      if  Utils().isNull(applyer.join_act_list):
                                          applyer.join_act_list = str(act.id)
                                      else:
                                          applyer.join_act_list = applyer.join_act_list + ';' + str(act.id)

                                      act.memlist = act.memlist + ';' + str(applyAct.applyer) + ':' + str(configs_org['orgtitle']['worker'])

                                   else:#退出
                                       joinidlist = Utils().decodeIDFormat(applyer.join_act_list)
                                       if (act.id in joinidlist) == True:
                                           joinidlist.remove(act.id)
                                           applyer.join_act_list = Utils().encodeIDFormat(joinidlist)

                                       memlist = Utils().decodeMutilFormat(act.memlist,';',':')
                                       for k,v in memlist.iteritems():
                                           if v[0] == applyAct.applyer:#找到该成员
                                              del memlist[k]
                                              break
                                       act.memlist =Utils().encodeMutilFormat(memlist,';',':')


                                   updateArgs = {'join_act_list' : applyer.join_act_list }
                                   Dal_User().updateUser(applyer.id,**updateArgs)

                                   updateArgs = {'memlist' : act.memlist }
                                   Dal_Act().updateAct(act.id,**updateArgs)

                                   applyAct.state = configs_org['applystate']['yes']
                                   updateArgs = {'state' : applyAct.state }
                                   Dal_ActApply().updateActApply(id,**updateArgs)

                                else:##不批准
                                   applyAct.state = configs_org['applystate']['no']
                                   updateArgs = {'state' : applyAct.state }
                                   Dal_ActApply().updateActApply(id,**updateArgs)

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