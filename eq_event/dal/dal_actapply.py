#coding:utf-8

from tools.singleton import Singleton
from model.actapply import ActApply
from db.mysqlapp import MySQLApp
from dal.dal_base import Dal_Base
class Dal_ActApply(Dal_Base):
    def __init__(self):
        Dal_Base.__init__(self)

    def addActApply(self,newOA):
        return self.add(newOA)

    def getActApply(self,pk):
        return self.get(pk,ActApply)

    def updateActApply(self,pk,**kwargs):
        return self.update(pk,ActApply,**kwargs)

    def deleteActApply(self,pk):
        # return self.delete(pk,ActApply)
        self.delete(pk,ActApply)


    def initCache(self):
        self.initDB('actapply',ActApply)