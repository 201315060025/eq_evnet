#coding:utf-8

from tools.singleton import Singleton
from model.officer import Officer
from db.mysqlapp import MySQLApp
from dal.dal_base import Dal_Base
class Dal_Officer(Dal_Base):
    def __init__(self):
        Dal_Base.__init__(self)

    def addOfficer(self,off):
        off.save()
        self._m_cache[off.id] = off
        return off.id

    def getOfficer(self,pk):
        return self.get(pk,Officer)

    def updateOfficer(self,pk,**kwargs):
        return self.update(pk,Officer,**kwargs)

    def deleteOfficer(self,pk):
        # return self.delete(pk,Officer)
        self.delete(pk,Officer)

#根据某种属性返回满足条件的记录
    def getOfficerByAttr(self,attr,value):
        return self.getValueByAttr(attr,value)

    def initCache(self):
        self.initDB('officer',Officer)