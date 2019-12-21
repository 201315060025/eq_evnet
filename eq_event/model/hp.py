#coding: utf-8
# landslide table model

import time
import uuid

from orm.orm import Model, IntegerField, StringField


class Hp (Model):

   __table__ = 'hp '
   __primary_key__ = 'id'

   id = IntegerField('id', False)
   coordinate = StringField('coordinate', True)
   earthquakeid = IntegerField('earthquakeid', True)
