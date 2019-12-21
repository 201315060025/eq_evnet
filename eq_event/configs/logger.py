# coding: utf-8
import os
import logging as LOG
from logging.handlers import RotatingFileHandler
LOGGING_PATH = os.path.join(os.getcwd(), "log",  "process.log")
try:
    # 初始化日志配置
    LOG.basicConfig(level=LOG.NOTSET,
    format='%(asctime)s %(filename)s[line:%(lineno)d][%(process)d][%(levelname)s] %(message)s',
    datefmt='%F %H:%M:%S',
    filename=LOGGING_PATH,
    filemode='w')
    # 设置paramiko模块的日志级别，要不打印的log太多了
    LOG.getLogger("paramiko").setLevel(LOG.WARNING)
    # 备份日志文件，每个日志文件最大10M，最多备份5个
    rt_handler = RotatingFileHandler(LOGGING_PATH, maxBytes=100 * 1024 * 1024, backupCount=5)
    rt_handler.setLevel(LOG.INFO)
    formatter = LOG.Formatter('%(asctime)s %(filename)s[line:%(lineno)d][%(process)d][%(levelname)s] %(message)s')
    rt_handler.setFormatter(formatter)
    LOG.getLogger('').addHandler(rt_handler)

    # 将INFO级别和更高级别的日志打印到控制台
    console = LOG.StreamHandler()
    console.setLevel(LOG.INFO)
    formatter = LOG.Formatter('%(asctime)s %(name)s [line:%(lineno)d][%(process)d][%(levelname)s] %(message)s')
    console.setFormatter(formatter)
    LOG.getLogger('').addHandler(console)
except BaseException, ex:
    LOG.error('ERROR! logger set; error: %s; ' % ex)