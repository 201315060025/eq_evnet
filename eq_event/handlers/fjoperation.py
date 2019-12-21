#coding: utf-8
import application
import json
import tornado.web
import os
import sys
reload(sys)
sys.setdefaultencoding("utf-8")
from dal.dal_earthquake import Dal_Earthquake
from dal.dal_fj import Dal_Fj
from model.fj import Fj
# from handlers import root_path


class FjUpload(tornado.web.RequestHandler):
    """附件上传"""
    def post(self):
        post_data = {}
        response = {'status': 200, 'message': 'ok', 'data': {}}
        for key in self.request.arguments:

            post_data[key] = self.get_arguments(key)[0]
        result = Dal_Earthquake().getEarthquake(post_data['earthquake_id'])
        # result = 12
        # post_data['earthquake_id'] = 12
        if not result:
            response = {'status': 10004, 'message': "earthquake_id not null"}
        else:
            for upfile in self.request.files['upfiles']:
                # currpath = os.getcwd()
                # upload_path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir))
                root_path = application.SETTINGS['static_path']

                # currpath +'\static' 根路劲
                if not os.path.exists(root_path):
                    os.mkdir(root_path)
                # upload_path = root_path + '\\' + str(post_data['earthquake_id'])
                upload_path = os.path.join(root_path, str(post_data['earthquake_id']))
                # upload_path = root_path + '\\' + str(12)
                if not os.path.exists(upload_path):
                    os.mkdir(upload_path)
                # upload_file = upload_path +'\\'+upfile['filename']
                upload_file = os.path.join(upload_path, str(upfile['filename']))
                if os.path.exists(upload_file):
                    response = {'status': 10006, 'message': "file name exist.."}
                    continue

                tmpfile = open(upload_file, "wb")
                tmpfile.write(upfile['body'])
                tmpfile.flush()
                tmpfile.close()
                # self.addUserFile(post_data['id'], str(upfile['filename']))
                # 附件插入数据库
                upload_file = upload_file.split("static")
                fj = Fj(fjpath=upload_file[1].replace("\\", ":"),
                        eqid=post_data['earthquake_id'],
                        fjname=upfile['filename'])
                Dal_Fj().addFj(fj)
        # return
        # response = json.dumps(response)
        # response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
        # return {"data": response}
        return None


class FjDown(tornado.web.RequestHandler):
    """附件下载"""
    def post(self):
        post_data = {}
        response = {'status': 200, 'message': 'ok', 'data': {}}
        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        # 查询附件表中是否存在
        # Dal_Fj.query("fj", eqid=1, fjname= "陕西歧山≥Ⅸ地震信息.doc"))
        result = Dal_Earthquake().getEarthquake(post_data['earthquake_id'])
        # userRequest = 12
        if not post_data["earthquake_id"] and not post_data["attachment_name"]:
            response = {'status': 10004, 'message': "earthquake_id and attachment_name not null"}
        else:
            result = Dal_Fj.query("fj", eqid=post_data["earthquake_id"], fjname= post_data["attachment_name"])

            if not result:
                response = {'status': 10004, 'message': "earthquake_id and attachment_name not null"}
            else:
                file = ""

        # return
        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
        return None


class FjDelete(tornado.web.RequestHandler):
    """附件删除"""
    def post(self):
        post_data = {}
        response = {'status': 200, 'message': 'ok', 'data': {}}
        for key in self.request.arguments:
            post_data[key] = self.get_arguments(key)[0]

        # userRequest = 12
        if not post_data["earthquake_id"] and not post_data["attachment_name"]:
            response = {'status': 10004, 'message': "earthquake_id and attachment_name not null"}
        else:
            # 查询附件表中是否存在
            # dal_fj =
            result = Dal_Fj().query("fj", eqid=post_data["earthquake_id"], fjname=post_data["attachment_name"])
            if not result:
                response = {'status': 10004, 'message': "delete fj not exist.."}
            else:
                # 删除数据库数据，在删除本地文件
                # 假设移除成功..
                Dal_Fj().remove("fj",  eqid=post_data["earthquake_id"], fjname=post_data["attachment_name"])
                root_path = application.SETTINGS['static_path']
                file_path = os.path.join(root_path, str(post_data["earthquake_id"]), post_data["attachment_name"])
                if os.path.isfile(file_path):
                    os.remove(file_path)

                # 更新缓存
                # Dal_Fj().initCache()
        # response = json.dumps(response)
        # response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
        return None

if __name__ == '__main__':
    print "<-------------------------->"
    # root_path = application.SETTINGS["static_path"]
    # print root_path
    import os
    print os.getcwd()
    pass

    Dal_Fj().remove("fj",  eqid=2, fjname="133.jpg")


