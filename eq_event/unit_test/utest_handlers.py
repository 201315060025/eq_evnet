#coding:utf-8

import tornado.httpclient

from tools.singleton import Singleton
from model.user import User
from dal.dal_user import Dal_User

class Utest_Handlers:
    __metaclass__ = Singleton
    urls = "http://localhost:8888/"
#单元测试：注册用户
    def utestRegister(self):
        http_client = tornado.httpclient.AsyncHTTPClient()
        url = urls.join('register')
        params = {'method':'POST','nick':'testuser','password':'123456','roletype':'0'}
        http_client.fetch(url, handle_register_response,{'method':'POST'})
        tornado.ioloop.IOLoop.instance().start()

    def handle_register_response(response):
        if response.error:
            print "Error:", response.error
        else:
            print response.body

