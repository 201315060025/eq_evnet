#coding:utf-8

import time, uuid

from orm.orm import Model,IntegerField, StringField

class OrgApply(Model):
   __table__ = 'orgapply'
   __primary_key__ = 'id'

   id=IntegerField('id',False)
   applyer = IntegerField('applyer',True)
   reason = StringField('reason',True)
   title = StringField('title',True)
   optype= IntegerField('optype',True)
   state = IntegerField('state',True)
   orgid = IntegerField('orgid',True)