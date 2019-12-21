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

import tornado.web
import tornado.ioloop
import tornado.httpserver
import io

from tools import VerifyCode
from io import BytesIO


class GetCodeHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        vecode= VerifyCode.VerifyCode()
        code_img,capacha_code = vecode.createCodeImage()
        msstream=BytesIO()
        print capacha_code
        code_img.save(msstream, format="JPEG")
        # code_img.close()
        self.set_cookie('verifycode', capacha_code)
        self.set_header('Content-Type', 'image/jpg')
        self.write(msstream.getvalue())

