#coding:utf-8

from tools.singleton import Singleton
from model.user import User
from dal.dal_user import Dal_User

class Utest_User:
    __metaclass__ = Singleton

    def utestAddUser(self):
        u = User(password= '12345', nick='Michael')
        Dal_User().addUser(u)
        print('ooo')

    def utestGetUser(self,pk):
        u =  Dal_User().getUser(pk)
        print('ooo')

    def utestDeleteUser(self,pk):
        print('ooo')

    def utestUpdateUser(self,pk,**kwargs):
        u = User.get(pk)
        Dal_User().updateUser(pk,**kwargs)
        print('ooo')