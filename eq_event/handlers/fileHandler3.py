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

class FileHandler1(tornado.web.RequestHandler):
    def post(self):
       post_data = {}
       for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]
       print post_data

       userRequest = Dal_User().getUser(post_data['userid'])
       post_data['optype']=str(post_data['optype'])
       if userRequest == None:
              respon = {'errorcode':configs_error['userinvaild']}
              respon_json = tornado.escape.json_encode(respon)
              self.write(respon_json)
       else:  ##用户存在
           ##获取用户上传文件
           Files=self.request.files['upfiles']
           # u'学生只能传1张照片 社团和或活动管理员可以最多上传五张照片'
           if post_data['optype'] == '0':## 添加照片
               if post_data['type'] == '0':##学生  学生自能上传一张图片
                   if len(Files) != 1:
                       respon={'errorcode':configs_error['useronlyonephonto']}
                       # respon_json=tornado.escape.json_encode(response)
                       # self.write(respon_json)
                   else:
                       for upfile in self.request.files['upfiles']:
                        currpath = os.getcwd()
                        #upload_path = os.path.abspath(os.path.join(os.path.dirname(__file__),os.path.pardir))
                        ##目的路劲是static//type//id//1.jpg
                        root_path = application.SETTINGS['static_path'] ##currpath +'\static' 根路劲
                        if os.path.exists(root_path) == False:## 就是E:\\OrgAppServerPC\\static
                            os.mkdir(root_path)  ##
                        upload_path= root_path  +'\\' + str(post_data['type'])#E:\\OrgAppServerPC\\static\\type
                        if os.path.exists(upload_path) == False: ##如果不存在就要创建一个
                            os.mkdir(upload_path)
                        upload_path=upload_path+'\\'+str(post_data['id'])#E:\\OrgAppServerPC\\static\\type\\id
                        if os.path.exists(upload_path) == False:
                            os.mkdir(upload_path)
                        ## 学生上传突前 只能上传一张 如果已经上传过了 在上传将替换原来的文件
                        ## 先把原来的删除 在添加现在的
                        filepaths=self.countFiles(upload_path)   ##返回是列表C:\\Users\\pc\\Desktop\\0\\1.jpg', 'C:\\Users\\pc\\Desktop\\0\\2.jpg',
                        if  len(filepaths)== 1:
                            os.remove(filepaths[0])  ##删除原来的文件
                        # upload_path = root_path  +'\\' + str(post_data['id'])  ##E:\\OrgAppServerPC\\static\\20131506
                        # if os.path.exists(upload_path) == False:
                        #     os.mkdir(upload_path)
                        upload_file = upload_path +'\\'+str(upfile['filename'])##E:\\OrgAppServerPC\\static\\20131506\\1.jpg
                        if os.path.exists(upload_file) == True:
                            ##文件已经存在
                            continue


                        tmpfile = open(upload_file, "wb")
                        tmpfile.write(upfile['body'])   ##把图片写入到路径里面
                        tmpfile.flush()    #把缓冲区的内容写入硬盘
                        tmpfile.close()
                        self.addUserFile(post_data['id'],str(upfile['filename']))  ##插入奥数据库


               if post_data['type'] == '1' or  post_data['type'] == '2':  ##社团和活动上传的照片
                   if len(Files)>5:
                       respon={'errorcode':configs_error['maxphonto']}
                       # respon_json=tornado.escape.json_encode(respon)
                       # self.write(respon_json)
                   for upfile in self.request.files['upfiles']:
                        currpath = os.getcwd()
                        #upload_path = os.path.abspath(os.path.join(os.path.dirname(__file__),os.path.pardir))
                        ##目的路劲是static//type//id//1.jpg
                        root_path = application.SETTINGS['static_path'] ##currpath +'\static' 根路劲
                        if os.path.exists(root_path) == False:## 就是E:\\OrgAppServerPC\\static
                            os.mkdir(root_path)  ##
                        upload_path= root_path  +'\\' + str(post_data['type'])#E:\\OrgAppServerPC\\static\\type
                        if os.path.exists(upload_path) == False: ##如果不存在就要创建一个
                            os.mkdir(upload_path)
                        upload_path=upload_path+'\\'+str(post_data['id'])#E:\\OrgAppServerPC\\static\\type\\id
                        if os.path.exists(upload_path) == False:
                            os.mkdir(upload_path)

                        ## 在这个地方路劲已经生成完毕，判断路劲中的文件的数量和用户传入的数量
                        ## 是否大于5个  如果大于不让插入到缓存中  （进而数据库中）
                        filepaths=self.countFiles(upload_path)
                        fileSum=len(filepaths)+len(Files) ##服务器中保存的个数和当前传入的个数之和
                        if fileSum <5:

                             # upload_path = root_path  +'\\' + str(post_data['id'])  ##E:\\OrgAppServerPC\\static\\20131506
                            # if os.path.exists(upload_path) == False:
                            #     os.mkdir(upload_path)
                            upload_file = upload_path +'\\'+str(upfile['filename'])##E:\\OrgAppServerPC\\static\\20131506\\1.jpg
                            if os.path.exists(upload_file) == True:
                                ##文件已经存在
                                continue
                            tmpfile = open(upload_file, "wb")
                            tmpfile.write(upfile['body'])   ##把图片写入到路径里面
                            tmpfile.flush()    #把缓冲区的内容写入硬盘
                            tmpfile.close()
                            if post_data['type'] == '1':
                                self.addOrgFile(post_data['id'],str(upfile['filename'])) ##社团
                            if post_data['type'] == '2':
                                self.addActFile(post_data['id'],str(upfile['filename'])) ##活动
                        else:
                            respon={'errorcode':configs_error['maxphonto']}
                            # respon_json = tornado.escape.json_encode(respon)
                            # self.write(respon_json)
                            break

           elif  post_data['optype'] == '1':   ##删除文件

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




















    #
    # def insertFiles(fileS,post_data):
    #      for upfile in fileS:
    #          currpath = os.getcwd()
    #          #upload_path = os.path.abspath(os.path.join(os.path.dirname(__file__),os.path.pardir))
    #          ##目的路劲是static//type//id//1.jpg
    #          root_path = application.SETTINGS['static_path'] ##currpath +'\static' 根路劲
    #          if os.path.exists(root_path) == False:## 就是E:\\OrgAppServerPC\\static
    #
    #              os.mkdir(root_path)  ##
    #              upload_path = root_path  +'\\' + str(post_data['type'])#E:\\OrgAppServerPC\\static\\type
    #              if os.path.existe(upload_path) == False: ##如果不存在就要创建一个
    #                  os.mkdir(upload_file)
    #              upload_path=upload_path+'\\'+str(post_data['id'])#E:\\OrgAppServerPC\\static\\type\\id
    #              if os.path.exists(upload_path) == False:
    #                  os.mkdir(upload_path)
    #                  # upload_path = root_path  +'\\' + str(post_data['id'])  ##E:\\OrgAppServerPC\\static\\20131506
    #                  # if os.path.exists(upload_path) == False:
    #                  #     os.mkdir(upload_path)
    #              upload_file = upload_path +'\\'+str(upfile['filename'])##E:\\OrgAppServerPC\\static\\20131506\\1.jpg
    #              if os.path.exists(upload_file) == True:
    #                  ##文件不存在
    #                  continue
    #              tmpfile = open(upload_file, "wb")
    #              tmpfile.write(upfile['body'])   ##把图片写入到路径里面
    #              tmpfile.flush()    #把缓冲区的内容写入硬盘
    #              tmpfile.close()
    #              return upfile['filename']   ## 返回单个文件的名字
    #
    #


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
        Dal_Act().updateAct(act.id,**updateArgs)

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

    def countFiles(self,paths):
        filepaths=[]
        for root, dirs, files in os.walk(paths):
            for file in files:
                filepath=os.path.join(root,file)
                filepaths.append(filepath)

        return filepaths

if __name__ == '__main__':
    print dir(FileHandler1)
    print help(FileHandler1.countphoto)
    f= FileHandler1()
    f .countphoto('C:\\Users\\pc\\Desktop\\0')










