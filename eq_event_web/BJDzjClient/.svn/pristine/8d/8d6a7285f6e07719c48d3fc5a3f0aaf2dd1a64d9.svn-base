/**
 * data : 发送给后台的消息 类型是 jsonobject
 * roule: 路由  类型是 字符串
 * callback ： 回调函数（ 参数是 服务器返回的数据） 类型 function
 */
function SendMsgRoulePost(data,roule,callback,datatype = "jsonp")
{
	var urls = config.baseUrl + roule;
	SendMsgPost(data,urls,callback,datatype);
}
function SendMsgRouleGet(data,roule,callback,datatype ="jsonp")
{
	var urls = config.baseUrl + roule;
	SendMsgGet(data,urls,callback,datatype);
}
/**
 * data : 发送给后台的消息 类型是 jsonobject
 * urls: 服务器地址 类型是  字符串
 * callback ： 回调函数（ 参数是 服务器返回的数据） 类型 function
 */

function SendMsgPost(data,urls,callback,datatype = "jsonp")
{
	SendMsg(data,"post",urls,callback,datatype)
}
function SendMsgGet(data,urls,callback,datatype = "jsonp")
{
	SendMsg(data,"get",urls,callback,datatype)
}
function SendMsg(data,modth,urls,callback,datatype = "jsonp")
{
	$.ajax({
		type:modth,
		url:urls,
		async:true,
		data:data,
		async:true,
        dataType:datatype,
        jsonp:"jsoncallback",
        crossDomain:true,
       	success:function(jsoncallback){
			callback(jsoncallback);
			
		},
		error:function(e){
			callback(e);
		}
	});
}

