(function () {
	CookieHelper = function () {};
	//写入cookie
	CookieHelper.prototype.SetCookie = function(key,val){
		$.cookie(key, val, { expires: 7 }); // 存储一个带7天期限的 cookie
	};

	//读取cookie
	CookieHelper.prototype.GetCookie= function(key){
		var val=$.cookie(key);
		return val;
	};
    CookieHelper.prototype.DeleteCookie= function(key){
        $.cookie(key, null);
    };

	CookieHelper.prototype.GetJSESSIONID= function(){
		var val=$.cookie("JSESSIONID");
		return val;
	};
})();
