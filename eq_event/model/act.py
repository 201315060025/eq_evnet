#coding:utf-8

import time, uuid

from orm.orm import Model,IntegerField, StringField
#这个是model 中的一个py文件，他代替的是数据库中的一张表，相当于。net中model层，虽然是三层架构，
#三层架构，不包括model，他只是更好的操作数据库
class Act(Model):
   __table__ = 'act'
   __primary_key__ = 'id'


   id=IntegerField('id',False)
   #通过  .  点方法可以查看属性  id.[name]
   name = StringField('name',True)
   begintime = StringField('begintime',True)
   endtime = StringField('endtime',True)
   type = IntegerField('type',True)
   ownertype = IntegerField('ownertype',True)
   applylist = StringField('applylist',True)
   area = StringField('area',True)
   level = IntegerField('level',True)
   summary = StringField('summary',True)
   memlist = StringField('memlist',True)
   max = IntegerField('max',True)
   photo = StringField('photo',True)


