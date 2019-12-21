#coding:utf-8

from tools.singleton import Singleton
from model.createorg import CreateOrg
from db.mysqlapp import MySQLApp
from dal.dal_base import Dal_Base
class Dal_CreateOrg(Dal_Base):
    def __init__(self):
        Dal_Base.__init__(self)

    def addCreateOrg(self,newOrg):
        return self.add(newOrg)

    def getCreateOrg(self,pk):
        return self.get(pk,CreateOrg)

    def updateCreateOrg(self,pk,**kwargs):
        return self.update(pk,CreateOrg,**kwargs)

    def deleteCreateOrg(self,pk):
        # return self.delete(pk,CreateOrg)
        self.delete(pk,CreateOrg)


    def initCache(self):
        self.initDB('createorg',CreateOrg)

    ## 根据所有的活动id 获取所有的活动名称
    def getCreateorgNameById(self,allID):
        return self.getNameById(allID,CreateOrg)
