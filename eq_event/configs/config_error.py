#coding:utf-8 'user':'root', 'passwd':'123456', 'db':'orgapp',   ---------'db':'wang_data1',

configs_error = {
       'success' : 0,
       'register_already' : 1,
       'paramerror' : 2,
       'userinvaild' : 3,
       'orginvaild' : 4,
       'actinvaild' : 5,
       'cannotapplymuti' : 6,#不能多次申请
       'inprivilege' : 7,#权限不足
       'cannotapprovemuti' : 8,#不能多次申批
       'useronlyonephonto':9 ,##学生只能有一张图片
       'maxphonto':10,## 活动和社团最多上传5张
}


http_reponse = {'date': dict(), 'message': 'ok', 'status': 200}