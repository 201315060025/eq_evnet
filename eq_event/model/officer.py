#coding:utf-8

import time, uuid

from orm.orm import Model,IntegerField, StringField

class Officer(Model):
   __table__ = 'officer'
   __primary_key__ = 'id'

   id=IntegerField('id',True)
   name = StringField('name',True)
   title = IntegerField('title',True)