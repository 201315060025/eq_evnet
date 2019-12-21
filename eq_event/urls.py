# coding:utf-8

from handlers.index import IndexHandler
from handlers.register import RegisterHandler
from handlers.login import LoginHandler, LogOut
from handlers.getCode import GetCodeHandler
from handlers.queryaEarthquake import QuearEarthquakeHandler, QuearUserHandler
from handlers.editInfo import EditEarthquakeInfo, EditUserInfo
from handlers.saveInfo import SaveEarthquakeInfo,SaveUserInfo
from handlers.earthIndex import GetEartquakeInfo, GetMapInfo
from handlers.deletedata import DeleteUserInfo, DeleteEarthquakeInfo
from handlers.fjoperation import FjUpload, FjDelete
from handlers.eqoperation import EqDetail, EqUpload

urls = [
    (r"/index", IndexHandler),
    (r"/login", LoginHandler),
    #
    (r"/register", RegisterHandler),
    (r"/getcode/(\d*)", GetCodeHandler),
    (r"/queryearthquake", QuearEarthquakeHandler),
    (r"/queryuserinfo", QuearUserHandler),
    (r"/editearthquakeinfo", EditEarthquakeInfo),
    (r"/edituserinfo", EditUserInfo),
    (r"/saveearthquakeinfo", SaveEarthquakeInfo),
    (r"/saveuserinfo", SaveUserInfo),
    (r"/logout", LogOut),
    (r"/getmapinfo", GetMapInfo),
    (r"/getearthquakeinfo", GetEartquakeInfo),
    # 第三版增加接口
    (r"/deleteuser", DeleteUserInfo),
    (r"/deleteeq", DeleteEarthquakeInfo),
    (r"/fj/upload", FjUpload),
    (r"/fj/delete", FjDelete),
    (r"/eq/detail", EqDetail),
    (r"/eq/upload", EqUpload),
]