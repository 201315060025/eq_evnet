#coding:utf-8

import time, uuid

from orm.orm import Model,IntegerField, StringField

class CreateAct(Model):
   __table__ = 'createact'
   __primary_key__ = 'id'

   id=IntegerField('id',False)
   applyer = IntegerField('applyer',True)
   name = StringField('name',True)
   area = StringField('area',True)
   level = IntegerField('level',True)
   max = IntegerField('max',True)
   summary = StringField('summary',True)
   type = IntegerField('type',True)
   ownertype = IntegerField('ownertype',True)
   starttime = StringField('starttime',True)
   endtime = StringField('endtime',True)
   state = IntegerField('state',True)

