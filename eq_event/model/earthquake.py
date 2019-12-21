#coding: utf-8
# earthquake table model

import time, uuid

from orm.orm import Model, IntegerField, StringField, DateTimeField


class Earthquake (Model):
   __table__ = 'earthquake '
   __primary_key__ = 'id'

   id = IntegerField('id', False)
   eqname = StringField('eqname', True)
   longitude = StringField('longitude', True)
   latitude = StringField('latitude', True)
   level = StringField('level', True)
   leveltype = StringField('leveltype', True)
   date = DateTimeField('date', True)
   depth = StringField('depth', True)
   introduction = StringField('introduction', True)

   Year = IntegerField('Year', True)
   Month = IntegerField('Month', True)
   Day = IntegerField('Day', True)
   hour = IntegerField('hour', True)
   minute = IntegerField('minute', True)
   second = IntegerField('second', True)

