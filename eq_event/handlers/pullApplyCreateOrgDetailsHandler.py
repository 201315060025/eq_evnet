#coding:utf-8

import json
import tornado.web
import datetime
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


class PullApplyCreateOrgDetailsHandler(tornado.web.RequestHandler):
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
               co = Dal_CreateOrg().getCreateOrg(k)
               result[k] = {}
               for k1, v1 in co.iteritems():
                    if k1 == 'starttime' or k1 == 'endtime':
                        ##先添加的
                        if type(v1) == str:
                            timeArre=time.strptime(v1, "%Y-%m-%d %H:%M:%S")
                            timestrap=int(time.mktime(timeArre))
                            v1 = datetime.datetime.utcfromtimestamp(timestrap)


                        result[k][k1] = time.mktime(v1.timetuple())
                        continue
                    result[k][k1] = v1

           respon = {'errorcode':configs_error['success'], 'createorglist':result}

        respon_json = json.dumps(respon)
        #respon_json = tornado.escape.json_encode(respon)
        self.write(respon_json)