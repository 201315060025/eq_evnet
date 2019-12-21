var beaches=new Array();
//var map1,map2;
var infowindow=new google.maps.InfoWindow({size:new google.maps.Size(50,50)});
//var markersArray1=[];
//var markersArray2=[];
$(function(){
    //加载地图
   	CreatMap();
   	CreatMapPoint();
	//加载地震列表
	loatDataList();
	//初始化只显示地图
	$('#SecMap').show();
	$('#SecList').show();
	$('#introduction').show();
	//查询按钮
    $('#btnSearch').click(function(){
		loatDataList();
	});		
	//左侧导航栏地图浏览
    $('#gotoMap').click(function(){
		 $('#SecMap').show();
		 $('#SecList').hide();
		  $('#introduction').hide();
	});	
	//左侧导航栏属性浏览
    $('#gotoList').click(function(){
		 $('#SecMap').hide();
		 $('#SecList').show();
		 $('#introduction').hide();
	});	
    //左侧导航栏图属关联			
    $('#gotoALL').click(function(){
		 $('#SecMap').hide();
		 $('#SecList').show();
		 $('#introduction').show();
		 
	});				
});

function CreatMap()
{
	var centerPoint=new google.maps.LatLng(33.460,104.635);
	var mapOptions=
	{
		zoom:4,
		center:centerPoint,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		scaleControl:true,
		overviewMapControl:true,
		streetViewControl:false
	};		
	//指定地图
	map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);
//	$.ajax({
//		type:"get",
//		url:"",
//		async:true
//	});
	//向后台请求所有地震点数据，以下为模拟数据模拟数据
	if(searchP4.length>0){
		for (var i= 0;i<searchP4.length;i++) {
			var Lon = searchP4[i].shockLon;
			var Lat = searchP4[i].shockLat;
			CreatP(Map,Lon,Lat);
		}
	}
}


function CreatMapPoint(Lon,Lat)
{
	var centerPoint =new google.maps.LatLng(33.508742,116.120850)
	var mapOptions=
	{
		zoom:4,
		center:centerPoint,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		scaleControl:true,
		overviewMapControl:true,
		streetViewControl:false
	};		
	//指定地图
	map=new google.maps.Map(document.getElementById("mappiont"),mapOptions);
	
	//向后台请求所有地震点数据，以下为模拟数据模拟数据
	CreatP(map,Lon,Lat);
	//加载说明文字
	var introduction = "123456789";
	var strIntroduction='<h2 class="page-header"><a>地震点介绍</a></h2><p class="lead">'+introduction+'</p>';
	var table = $("#txtIntro");
	table.text("");// 清空数据
	table.append(strIntroduction);
	//加载附件列表
	var fjDatatable=new SmDataTable();
	loadFJ(fjDatatable);
	
}

/*
 * 描点
 */
function CreatP(Map,Lon,Lat){
	var c=new google.maps.LatLng(Lon,Lat);
	var mapD = Map;
	var pointM = new google.maps.Marker({position:c,map:map,optimized:false});
	var Promptwin='<div class="info" style="width: 245px;position: relative;overflow-y:hidden;color:#3c8dbc"><div class="del"><b>发震时刻：</b></div><div class="del"><b>纬度：</b></div><div class="del"><b>经度：</b></div><div class="del"><b>深度：</b></div><div class="del"><b>震级：</b></div><div style="line-height:16px;margin-top: 3px;"><b>参考位置：</b></div><div class="del" style="padding-left: 170px;"><a>详细信息>></a></div></div>';
	google.maps.event.addListener(pointM,"click",function(){infowindow.setContent(Promptwin);
	infowindow.open(mapD,pointM)})
}