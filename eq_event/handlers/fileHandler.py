#coding:utf-8

import application
import json
import tornado.web
import time
import os
from model.user import User
from model.createact import CreateAct
from model.createorg import CreateOrg
from model.officer import Officer
from model.org import Org
from model.orgapply import OrgApply
from model.actapply import ActApply
from model.act import Act

from dal.dal_act import Dal_Act
from dal.dal_user import Dal_User
from dal.dal_createact import Dal_CreateAct
from dal.dal_createorg import Dal_CreateOrg
from dal.dal_officer import Dal_Officer
from dal.dal_org import Dal_Org
from dal.dal_orgapply import Dal_OrgApply
from dal.dal_actapply import Dal_ActApply

from configs.config_error import configs_error
from configs.config_org import configs_org
from tools.utils import Utils

class FileHandler(tornado.web.RequestHandler):
    def post(self):
       post_data = {}
       for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]
       print post_data

       userRequest = Dal_User().getUser(post_data['userid'])
       post_data['optype']=str(post_data['optype'])
       if userRequest == None:
              respon = {'errorcode':configs_error['userinvaild']}
       else:
    ###文件例子
      ##post_data['optype']传入的类型是int 类型 所以就改成字符串类型

           if post_data['optype'] == '0':
               ##add
               # if not 'upfiles' in self.request.files:
               if not 'upfiles' in self.request.files:  #和33行同级请求的文件中
                   respon = {'errorcode':'no_file'}
                   respon_json = tornado.escape.json_encode(respon)
                   self.write(respon_json)
               else:
                   temp=self.request.files['upfiles']
                   print dir(temp)
                   print len(temp)
                   for upfile in temp:
                        currpath = os.getcwd()
                        #upload_path = os.path.abspath(os.path.join(os.path.dirname(__file__),os.path.pardir))

                        # a=upfile['filename']
                        # upfile['filename']=u'a'
                        root_path = application.SETTINGS['static_path'] ##currpath +'\static' 根路劲
                        if os.path.exists(root_path) == False:## 就是E:\\OrgAppServerPC\\static
                            os.mkdir(root_path)  ##
                        upload_path = root_path  +'\\' + str(post_data['id'])  ##E:\\OrgAppServerPC\\static\\20131506
                        if os.path.exists(upload_path) == False:
                            os.mkdir(upload_path)
                        # upfile['filename']=upfile['filename'].decode('utf-8').encode('unicode')
                        upload_file = upload_path +'\\'+str(upfile['filename'])##E:\\OrgAppServerPC\\static\\20131506\\1.jpg
                        if os.path.exists(upload_file) == True:
                            ##文件已经存在
                            continue
                        tmpfile = open(upload_file, "wb")
                        tmpfile.write(upfile['body'])   ##把图片写入到路径里面
                        tmpfile.flush()
                        tmpfile.close()

                        ##处理用户文件列表
                        if post_data['type'] == '0':##学生
                            self.addUserFile(post_data['id'],str(upfile['filename']))
                        elif post_data['type'] == '1':##社团
                            self.addOrgFile(post_data['id'],str(upfile['filename']))
                        elif post_data['type'] == '2':##活动
                            self.addActFile(post_data['id'],str(upfile['filename']))

           elif  post_data['optype'] == '1':
                 ##delete
                 post_data['dellist']="12.jpg;13.jpg"
                 dellist = Utils().decodeIDFormat(post_data['dellist'])
                 for delfile in dellist:
                    root_path = application.SETTINGS['static_path'] ##currpath +'\static'
                    file_path = root_path  +'\\' + str(post_data['id'])+'\\'+ delfile
                    if os.path.exists(file_path) == False:##文件已经不存在
                        continue
                    os.remove(file_path)
                    ##处理用户文件列表
                    if post_data['type'] == '0':##学生
                        self.removeUserFile(post_data['id'],delfile)
                    elif post_data['type'] == '1':##社团
                        self.removeOrgFile(post_data['id'],delfile)
                    elif post_data['type'] == '2':##活动
                        self.removeActFile(post_data['id'],delfile)

           respon = {'errorcode':'success'}

       respon_json = tornado.escape.json_encode(respon)
       self.write(respon_json)

    def addUserFile(self,id,filename):
        user = Dal_User().getUser(id)
        if Utils().isNull(user.photo):
            user.photo =  filename
        else:
            user.photo = user.photo + ';' + filename
        updateArgs = {'photo' : user.photo }
        Dal_User().updateUser(user.id,**updateArgs)

    def addOrgFile(self,id,filename):
        org = Dal_Org().getOrg(id)
        if Utils().isNull(org.photo):
            org.photo =  str(filename)
        else:
            org.photo = org.photo + ';' + filename
        updateArgs = {'photo' : org.photo }
        Dal_Org().updateOrg(org.id,**updateArgs)

    def addActFile(self,id,filename):
        act = Dal_Act().getAct(id)
        if Utils().isNull(act.photo):
            act.photo =  str(filename)
        else:
            act.photo = act.photo + ';' + filename
        updateArgs = {'photo' : act.photo }
        Dal_Act().updateOrg(act.id,**updateArgs)

    def removeUserFile(self,id,filename):
        user = Dal_User().getUser(id)
        if Utils().isNull(user.photo):
            return
        else:
            filelist = Utils().decodeIDFormat(user.photo)
            if (filename in filelist) == True:
               filelist.remove(filename)
               user.photo = Utils().encodeIDFormat(filelist)
               updateArgs = {'photo' : user.photo }
               Dal_User().updateUser(user.id,**updateArgs)

    def removeOrgFile(self,id,filename):
        org = Dal_Org().getOrg(id)
        if Utils().isNull(org.photo):
            return
        else:
            filelist = Utils().decodeIDFormat(org.photo)
            if (filename in filelist) == True:
               filelist.remove(filename)
               org.photo = Utils().encodeIDFormat(filelist)
               updateArgs = {'photo' : org.photo }
               Dal_Org().updateOrg(org.id,**updateArgs)

    def removeActFile(self,id,filename):
        act = Dal_Act().getAct(id)
        if Utils().isNull(act.photo):
            return
        else:
            filelist = Utils().decodeIDFormat(act.photo)
            if (filename in filelist) == True:
               filelist.remove(filename)
               act.photo = Utils().encodeIDFormat(filelist)
               updateArgs = {'photo' : act.photo }
               Dal_Act().updateAct(act.id,**updateArgs)