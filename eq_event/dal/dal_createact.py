#coding:utf-8

from tools.singleton import Singleton
from model.createact import CreateAct
from db.mysqlapp import MySQLApp
from dal.dal_base import Dal_Base
class Dal_CreateAct(Dal_Base):
    def __init__(self):
        Dal_Base.__init__(self)

    def addCreateAct(self,newCA):
        return self.add(newCA)

    def getCreateAct(self,pk):
        return self.get(pk,CreateAct)

    def updateCreateAct(self,pk,**kwargs):
        return self.update(pk,CreateAct,**kwargs)

    def deleteCreateAct(self,pk):
        # return self.delete(pk,CreateAct)
        self.delete(pk,CreateAct)


    def initCache(self):
        self.initDB('createact',CreateAct)

    ## 根据所有的活动id 获取所有的活动名称
    def getCreateactNameById(self,allID):
        return self.getNameById(allID,CreateAct)



