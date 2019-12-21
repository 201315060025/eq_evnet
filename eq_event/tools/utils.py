#coding:utf-8

import os
import time
from tools.singleton import Singleton
from db.mysqlapp import MySQLApp
from datetime import datetime
#工具类
class Utils:
    __metaclass__ = Singleton
    ##工具中包含有 截取字符串的    编码的 解码的  是否为空的  获取文件路径的
    #prama: ,,,;,,, return dict
    def decodeMutilFormat(self,inputstring,char1,char2):## 输入的字符串
        outResult = {}
        outlist = inputstring.split(char1);
        index = 1
        for substr in outlist:
            outResult[index] = substr.split(char2)
            index = index + 1
        return outResult

    def encodeMutilFormat(self,inputDict,char1,char2):
        outResult = '' ##{‘name’:"blx","age":20,"sex":"nan"}
        i = 0
        dlen = len(inputDict)
        for k, v in inputDict.iteritems():
            vlen = len(v)  ## len("blx") 获取长度
            index = 0  ## 设置一个下标是0
            for subi in v:   ## 一次遍历这个value 中的值
                index = index + 1
                if index < vlen:
                   outResult = outResult + subi + char2
                else:
                   outResult = outResult + subi

            i = i + 1
            if i < dlen:
                outResult = outResult + char1

        return outResult

#prama: ;;;; [] return str
    def encodeIDFormat(self,inputList,char = ';'):
        outResult = ''
        index = 0
        listlen = len(inputList)
        for substr in inputList:
            index = index + 1
            if index < listlen:
                outResult = outResult +substr+ char
            else:
                outResult = outResult +substr
        return outResult
    ## decodeIDFromat() 解码 就是分割字符串 分隔符 传入一个字符串和分隔符 输出一个列表
    def decodeIDFormat(self,inputstring,char = ';'):
        outResult = []
        outlist = inputstring.split(char)
        for substr in outlist:
            outResult.append(substr)
        return outResult
    ## 判断某个元素是否在一个字符串（可以分割成列表）中  字符串列表
    def isValueInIDFormat(self,v,inputstring):
        if self.isNull(inputstring):
            return False
        outlist = self.decodeIDFormat(inputstring)
        return (str(v) in outlist)   ##返回的值是False  和 True
    ## 判断是否为空
    def isNull(self,v):
        return (v == None or v == '');

    def getFileCountInPath(self,path):
        count = 0
        for root, dirs, files in os.walk(path):
        #print files
            fileLength = len(files)
            if fileLength != 0:
               count = count + fileLength
        return count

    def get_datetime(self, format="%Y-%m-%d %H:%M:%S"):
        """
        @param format:
        @return:
        """
        now = datetime.now()
        now_str = now.strftime(format=format)
        return now, now_str

    def get_timestamp(self):
        return time.time()

    def string2timestamp(self, strValue):

        """
        @param strValue:
        @return:
        """

        try:
              d = datetime.strptime(strValue, "%Y-%m-%d %H:%M:%S.%f")
              t = d.timetuple()
              timeStamp = int(time.mktime(t))
              timeStamp = float(str(timeStamp) + str("%06d" % d.microsecond))/1000000
              print timeStamp
              return timeStamp
        except ValueError as e:
              print e
              d = datetime.strptime(strValue, "%Y-%m-%d %H:%M:%S")
              t = d.timetuple()
              timeStamp = int(time.mktime(t))
              timeStamp = float(str(timeStamp) + str("%06d" % d.microsecond))/1000000
              print timeStamp
              return timeStamp

    def timestamp_datetime(self, timestamp):
        """
        @param timestamp:
        @return:
        """
        try:
            d = datetime.fromtimestamp(timestamp)
            # str1 = d.strftime("%Y-%m-%d %H:%M:%S.%f")
            # 2015-08-28 16:43:37.283000'
            return d
        except Exception as e:
            print e
            return ''

if __name__ == "__main__":
    a = Utils
    now, now_str = Utils().get_datetime()
    print Utils().string2timestamp(now_str)
    print type(Utils().timestamp_datetime(Utils().string2timestamp(now_str)))



