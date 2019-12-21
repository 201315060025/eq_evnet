#coding:utf-8

from tools.singleton import Singleton
from model.user import User
from db.mysqlapp import MySQLApp
from dal.dal_base import Dal_Base

class Dal_User(Dal_Base):
    def __init__(self):
        Dal_Base.__init__(self)

    def addUser(self,newUser):
        newUser.save()
        self._m_cache[newUser.id] = newUser
        return newUser.id

    def getUser(self,pk):
        return self.get(pk,User)

    def updateUser(self,pk,**kwargs):
        return self.update(pk,User,**kwargs)

    def deleteUser(self,pk):
        self.delete(pk,User)

#根据某种属性返回满足条件的记录
    def getUserByAttr(self,attr,value):
        return self.getValueByAttr(attr,value)

    def initCache(self):
        self.initDB('user',User)