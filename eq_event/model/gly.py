#coding: utf-8
# user table model

import time
import uuid

from orm.orm import Model, IntegerField, StringField


class Gly (Model):

   __table__ = 'gly '
   __primary_key__ = 'id'

   id = IntegerField('id', False)
   DLM = StringField('DLM', True)
   MM = StringField('MM', True)
   XM = StringField('XM', True)
   DH = StringField('DH', True)
   YX = StringField('YX', True)




