#coding:utf-8

import tornado.ioloop
import sys
import tornado.httpserver
import tornado.options
import tornado.web
import tornado.log
#import yaml
import pdb
import logging
import logging.config
#pdb.set_trace()
from db.mysqlapp import MySQLApp
from application import webapplication

from tornado.options import define, options
from tornado.log import access_log

from dal.dal_user import Dal_User
from dal.dal_act import Dal_Act
from dal.dal_actapply import Dal_ActApply
from dal.dal_createact import Dal_CreateAct
from dal.dal_createorg import Dal_CreateOrg
from dal.dal_officer import Dal_Officer
from dal.dal_org import Dal_Org
from dal.dal_orgapply import Dal_OrgApply
from dal.dal_earthquake import Dal_Earthquake
from dal.dal_fj import Dal_Fj
from dal.dal_gly import Dal_Gly
from dal.dal_hp import Dal_Hp

#from unit_test.utest_handlers import Utest_Handlers
from unit_test.utest_user import Utest_User
from tools.utils import Utils


define("port", default=8000, help="run on the given port", type=int)

def initLog():
    #logging.config.fileConfig('configs/logging.conf')
    logging.config.dictConfig(yaml.load(open('configs/python_logging.yaml', 'r')))

def logTest():
    initLog()
    #handler = logging.handlers.RotatingFileHandler(log/test.log, maxBytes = 1024*1024, backupCount = 5) # 实例化handler
    #access_log.addHandler(handler)
    #root_logger = logging.getLogger('root')
##    root_logger.debug('test root logger...')
##    logger = logging.getLogger('main')
##    logger.info('test main logger')
##    logger.info('start import module \'mod\'...')
##    logger.debug('let\'s test mod.testLogger()')

def uTest():
    result = Utils().decodeTradeFormat('1,2,3;4,5,6')
    print(result)
    result1 = Utils().encodeTradeFormat(result)
    print(result1)
    result2 = Utils().decodeIDFormat('1;2;3;4;5;6')
    print(result2)
    result3 = Utils().encodeIDFormat(result2)
    print(result3)
##    Utest_Handlers().utestRegister()#测试注册用户
##    Utest_UserMap().utestAddUserMap()
##    Utest_UserMap().utestInitCache()

def initCache():
    Dal_User().initCache()
    Dal_Act().initCache()
    Dal_ActApply().initCache()
    Dal_CreateAct().initCache()
    Dal_CreateOrg().initCache()
    Dal_Officer().initCache()
    Dal_Org().initCache()
    Dal_OrgApply().initCache()
    Dal_Earthquake().initCache()
    Dal_Hp().initCache()
    Dal_Gly().initCache()
    Dal_Fj().initCache()


def main():
    print(options.help)
    print("Quit the server with CONTROL-C")
    tornado.options.parse_command_line()
#    tornado.options.parse_config_file()
    print options.port
    http_server = tornado.httpserver.HTTPServer(webapplication)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
    print()

if __name__ == "__main__":
    #uTest()
    #logTest()
    initCache()
    main()