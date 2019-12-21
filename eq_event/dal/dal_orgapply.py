#coding:utf-8

from tools.singleton import Singleton
from model.orgapply import OrgApply
from db.mysqlapp import MySQLApp
from dal.dal_base import Dal_Base

class Dal_OrgApply(Dal_Base):
    def __init__(self):
        Dal_Base.__init__(self)

    def addOrgApply(self,newOA):
         return self.add(newOA)

    def getOrgApply(self,pk):
        return self.get(pk,OrgApply)

    def updateOrgApply(self,pk,**kwargs):
        return self.update(pk,OrgApply,**kwargs)

    def deleteOrgApply(self,pk):
        # return self.delete(pk,OrgApply)
        self.delete(pk,OrgApply)

    def initCache(self):
        self.initDB('orgapply',OrgApply)
