#coding:utf-8
from tools.singleton import Singleton
from model.org import Org
from tools.utils import Utils
from db.mysqlapp import MySQLApp
from dal.dal_base import Dal_Base
class Dal_Org(Dal_Base):
    def __init__(self):
        Dal_Base.__init__(self)

    def addOrg(self,newOrg):
        return self.add(newOrg)

    def getOrg(self,pk):
        return self.get(pk,Org)

    def updateOrg(self,pk,**kwargs):
        return self.update(pk,Org,**kwargs)

    def deleteOrg(self,pk):
        # return self.delete(pk,Org)
        self.delete(pk,Org)


    def initCache(self):
        self.initDB('org',Org)

#取得某个头衔的成员id
    def getOrgTitleMember(self,pk,title):
        org = self.getOrg(pk)
        outResult = Utils().decodeMutilFormat(org.memlist,';',':')
        for k,v in outResult.iteritems():
            if int(v[1]) == title:
                return v[0]
        return -1
    ## 根据所有的活动id 获取所有的活动名称
    def getOrgNameById(self,allID):

        return self.getNameById(allID,Org)
