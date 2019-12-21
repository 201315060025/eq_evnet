#coding:utf-8

import time, uuid

from orm.orm import Model,IntegerField, StringField

class ActApply(Model):
   __table__ = 'actapply'
   __primary_key__ = 'id'

   id=IntegerField('id',False)
   applyer = IntegerField('applyer',True)
   reason = StringField('reason',True)
   optype= IntegerField('optype',True)
   state = IntegerField('state',True)
   actid = IntegerField('actid',True)