﻿window.config = {
	//测试服务器地址：
	//baseUrl:"http://47.105.123.173:8000",
	baseUrl:"http://localhost:8000",
	centerPlat:"35.460",
	centerPlon:"104.635",
	roule:{
		deleteeq:'/deleteeq',
		queryearthquake:'/queryearthquake',
		getearthquakeinfo:'/getearthquakeinfo',
		editearthquakeinfo:'/editearthquakeinfo',
		getmapinfo:'/getmapinfo',
		login:'/login',
		saveuserinfo:'/saveuserinfo',
		edituserinfo:'/edituserinfo',
		saveearthquakeinfo:'/saveearthquakeinfo',
		downloadearthquake:'/static/excel_down/earthquake.xlsx',
		getquerythquakeinfobyid:'/eq/detail',
	},
	errorCode:{
		success:200,
		goLogin:1000,
	}
};
// window.fj=[
// 	{
// 		"a_link":"http://10.10.136.49:8010/创客空间.docx",
// 		"filename":"创客空间.docx",
// 	},
// 	{
// 		"a_link":"http://10.10.136.49:8010/练习说明.docx",
// 		"filename":"练习说明.docx"
// 	}
// ]