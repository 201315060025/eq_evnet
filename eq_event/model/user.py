#coding:utf-8

import time, uuid

from orm.orm import Model,IntegerField, StringField

class User(Model):
   __table__ = 'user'
   __primary_key__ = 'id'

   id=IntegerField('id',True)
   sname = StringField('sname',True)
   fun_list = StringField('fun_list',True)
   create_org_list = StringField('create_org_list',True)
   create_act_list = IntegerField('create_act_list',True)
   join_act_list = IntegerField('join_act_list',True)
   join_org_list = StringField('join_org_list',True)
   befun_list = StringField('befun_list',True)
   sex = IntegerField('sex',True)
   grade = IntegerField('grade',True)
   college = IntegerField('college',True)
   apply_org_list = StringField('apply_org_list',True)
   apply_act_list = StringField('apply_act_list',True)
   apply_create_org_list = StringField('apply_create_org_list',True)
   apply_create_act_list = StringField('apply_create_act_list',True)
   # photo = IntegerField('photo',True)
   photo = StringField('photo',True)