 #coding: utf-8
# attacjment table model

import time
import uuid

from orm.orm import Model, IntegerField, StringField


class Fj (Model):

   __table__ = 'fj'
   __primary_key__ = 'id'

   id = IntegerField('id', False)
   fjpath = IntegerField('fjpath', True)
   eqid = IntegerField('eqid', True)
   fjname = StringField('fjname', True)
