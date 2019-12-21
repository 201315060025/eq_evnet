#coding:utf-8

import time, uuid

from orm.orm import Model,IntegerField, StringField

class CreateOrg(Model):
   __table__ = 'createorg'
   __primary_key__ = 'id'

   id=IntegerField('id',False)
   applyer = IntegerField('applyer',True)
   name = StringField('name',True)
   max = IntegerField('max',True)
   starttime = StringField('starttime',True)
   level = IntegerField('level',True)
   summary = StringField('summary',True)
   type = IntegerField('type',True)
   ownertype = IntegerField('ownertype',True)
   state = IntegerField('state',True)


