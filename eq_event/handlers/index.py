#coding:utf-8
import logging
import json
import tornado.log
import tornado.web
from tornado.log import access_log

class IndexHandler(tornado.web.RequestHandler):
    def post(self):
        #self.write("Hello, world hahaha")
        #entity = Entity.get('王宁的服务器')
        #self.redirect('h5/musicgame.max.html')
        #self.render('index.html')
        #self.render('musicgame.max.html')


        post_data = {}

        # if isinstance(self.get_argument, str):
        #     self.get_argument = json.load(self.get_argument)

        for key in self.request.arguments: ##从请求的参数中获取关键字 key
            post_data[key] = self.get_arguments(key)[0]
        print self.get_cookie('verifycode')
        self.set_header("Access-Control-Allow-Origin","*")
        self.write(post_data)



        #logger = logging.getLogger('root')
        #accesss_log.info('test indexhandler logger')

##        text = self.get_argument('json')
##        decodedjson = json.loads(text)
##        strKey1 = decodedjson['Name']
##        encodedjson = json.dumps(decodedjson)
##        self.write(encodedjson)
##        #entity = Entity.get('王宁的服务器')
##        #self.render('index.html', entity = entity)
##
###文件例子
##        if not 'infile' in self.request.files:
##            respon = {'issuccess':'no_file'}
##            respon_json = tornado.escape.json_encode(respon)
##            self.write(respon_json)
##        else:
##            infile = self.request.files['infile'][0]
##            tmpfile = open("tmp.jpg", "wb")
##            tmpfile.write(infile['body'])
##            tmpfile.flush()
##            tmpfile.close()
##            res = client.analyseImg("tmp.jpg")
##            respon = {'issuccess':'success', 'res':res}
##            respon_json = tornado.escape.json_encode(respon)
##            self.write(respon_json)
