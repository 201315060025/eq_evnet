#coding:utf-8

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
from model.act import Act

from dal.dal_act import Dal_Act
from dal.dal_user import Dal_User
from dal.dal_createact import Dal_CreateAct
from dal.dal_createorg import Dal_CreateOrg
from dal.dal_officer import Dal_Officer
from dal.dal_org import Dal_Org
from dal.dal_orgapply import Dal_OrgApply

from configs.config_error import configs_error
from tools.utils import Utils
from configs.config_error import http_reponse
from dal.dal_earthquake import Dal_Earthquake
from dal.dal_gly import Dal_Gly
from model.earthquake import Earthquake
from model.gly import Gly
from tools.utils import Utils
from db.mysqlapp import MySQLApp
USERID = 0


# class BaseHandler(tornado.web.RequestHandler):
#     def get_current_user(self):
#         return self.get_secure_cookie(USERID)


class SaveEarthquakeInfo(tornado.web.RequestHandler):
    def get(self):
        # query earthquake info
        response = {'status': 200, 'message': 'ok'}
        eqname = self.get_argument('eqname', '').encode("utf8")
        lon = str(self.get_argument('lon', 0))
        lan = str(self.get_argument('lan', 0))
        eq_level = self.get_argument('eq_level', 0)
        eq_depth = str(self.get_argument('eq_depth', 0))
        happen_time = self.get_argument('happen_time', Utils().get_datetime()[1])
        eq_explain = self.get_argument('eq_explain', '')
        earthquake_id = int(self.get_argument('earthquake_id', 0))

        if not eqname:
            response.update({"status": 1002, "message": 'eq_name and happend_time is not null'})
            response = json.dumps(response)
            response = self.get_argument('jsoncallback')+"("+response+")"
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)
            return None
        # add new earthquake
        timestamp = Utils().string2timestamp(happen_time)
        now = Utils().timestamp_datetime(timestamp)
        if not earthquake_id:

            newEarth = Earthquake(eqname=eqname,
                                  longitude=lon,
                                  latitude=lan,
                                  level=eq_level,
                                  depth=eq_depth,
                                  introduction=eq_explain,
                                  date=now.date(),
                                  Year=now.year,
                                  Month=now.month,
                                  Day=now.day,
                                  hour=now.hour,
                                  minute=now.minute,
                                  second=now.second
                                  )
            newID = Dal_Earthquake().addEarthquake(newEarth)
            response.update({"newid": newID})
            response = json.dumps(response)
            response = self.get_argument('jsoncallback')+"("+response+")"
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)
            return None

        # update eatthquake
        parames = {"eqname": eqname, "longitude": lon,
                   "latitude": lan, "level": eq_level,
                   "depth": eq_depth, "introduction": eq_explain,
                   "date": now.date(),
                   "Year": now.year,
                   "Month": now.month,
                   "Day": now.day,
                   "hour": now.hour,
                   "minute": now.minute,
                   "second": now.second}
        Dal_Earthquake().updateEarthquake(earthquake_id, **parames)
        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
        return None


class SaveUserInfo(tornado.web.RequestHandler):
    def get(self):
        # query earthquake info
        response = {'status': 200, 'message': 'ok'}

        email = self.get_argument('email', '')
        pwd = self.get_argument('pwd', '')
        user_status = self.get_argument('user_status', 0)
        true_name = self.get_argument('true_name', '')
        login_name = self.get_argument('login_name', '')

        user_id = int(self.get_argument('user_id', 0))

        if not(pwd and true_name):
            response.update({"status": 1003, "message": 'user name and pwd is not null'})
            response = json.dumps(response)
            response = self.get_arguments('jsoncallback')[0]+"("+response+")"
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)
            return None
        # add new earthquake
        if not user_id:
            newuser = Gly(XM=true_name, MM=pwd, DLM=login_name, YX=email)
            newID = Dal_Gly().addGly(newuser)
            response.update({"newid": newID})
            response = json.dumps(response)
            response = self.get_argument('jsoncallback')+"("+response+")"
            self.set_header("Access-Control-Allow-Origin", "*")
            self.write(response)
            return None

        # update eatthquake
        parames = {"XM": true_name, "MM": pwd, "DLM": login_name, "YX": email}
        Dal_Gly().updateGly(user_id, **parames)
        response = json.dumps(response)
        response = self.get_argument('jsoncallback')+"("+response+")"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)
        return None


if __name__ == "__main__":
    now, _ = Utils().get_datetime()
    print now.date()
    print type(now)
    newEarth = Earthquake(eqname="temp_1",
                          longitude="12.01",
                          latitude="123.1",
                          level=2,
                          depth=-100,
                          introduction="this is test",
                          date=now.date(),
                          Year=2012,
                          Month=12,
                          Day=1,
                          hour=12,
                          minute=12,
                          second=12)
    newID = Dal_Earthquake().addEarthquake(newEarth)
    print newID
    import httplib
    data = "eqname=blx&lon=12.10&lan=14.12&eq_level=3&eq_depth=-100&happend=2013-12-01 12:23:12&eq_explain=aa&earthquake_id=0"
    url = "http://localhost/saveearthquakeinfo?" + data

    conn = httplib.HTTPConnection("localhost")
    conn.request(method="GET", url=url)

    response = conn.getresponse()
    res= response.read()
    print res

    pass
