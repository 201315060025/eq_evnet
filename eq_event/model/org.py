#coding:utf-8

import time, uuid

from orm.orm import Model,IntegerField, StringField

class Org(Model):
   __table__ = 'org'
   __primary_key__ = 'id'

   id=IntegerField('id',False)
   name = IntegerField('name',True)
   type = IntegerField('type',True)
   owntype = IntegerField('owntype',True)
   summary = StringField('summary',True)
   memlist = StringField('memlist',True)
   applylist = StringField('applylist',True)
   starttime = StringField('starttime',True)
   level = IntegerField('level',True)
   max = IntegerField('max',True)
   photo = IntegerField('photo',True)

