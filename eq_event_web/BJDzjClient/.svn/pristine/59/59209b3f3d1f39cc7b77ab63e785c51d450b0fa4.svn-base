var beaches=new Array();
var map1,map2;
var infowindow=new google.maps.InfoWindow({size:new google.maps.Size(40,40)});
var markersArray1=[];
var markersArray2=[];
$(function(){
	        //加载地图
		   	CreatMap();
		   	searchShockP(1);
			//初始化只显示地图
			$('#SecMap').show();
			$('#SecList').hide();
			$('#introduction').hide();
			//查询按钮
            $('#btnSearch').click(function(){

				searchShockP(1);
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

	var centerPoint=new google.maps.LatLng(config.centerPlat,config.centerPlon);
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
	map1=new google.maps.Map(document.getElementById("googleMap"),mapOptions);
	var dataMsg = {};
	SendMsgRouleGet(dataMsg,config.roule.getmapinfo,ongetShockPCallback);
}
function onCreateMapCallback(jsoncallback){
	if(jsoncallback.status==config.errorCode.success){
		$.each(jsoncallback.data, function(index,item) {
			if(index>0){
				lat =jsoncallback.data[index].latitude;
				lon =jsoncallback.data[index].longitude;
				CreatP(map1,lat,lon,jsoncallback.data[index]);
			}
		});
	}
}

function CreatMapPoint(Lat,Lon,dada)
{
	var centerPoint =new google.maps.LatLng(config.centerPlat,config.centerPlon);
	var mapOptions=
	{
		zoom:3,
		center:centerPoint,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		scaleControl:true,
		overviewMapControl:true,
		streetViewControl:false
	};		
	//指定地图
	map2=new google.maps.Map(document.getElementById("mappiont"),mapOptions);
	//向后台请求所有地震点数据，以下为模拟数据模拟数据
	CreatP(map2,Lat,Lon,dada);
	//加载说明文字
	var introduction = dada.introduction;
	var strIntroduction='<h2 class="page-header"><a>地震点介绍</a></h2><p class="lead">'+introduction+'</p>';
	var table = $("#txtIntro");
	table.text("");// 清空数据
	table.append(strIntroduction);
	//加载附件列表
//	var fjDatatable=new SmDataTable();
//	fjDatatable.Init("select * from fj where eqid="+m_earthquake.GetValue("EQID"));
//	loadFJ(fjDatatable);
	
}

/*
 * 描点
 */
function CreatP(Map,Lat,Lon,data_){
	var mapdata =data_;
	var time = mapdata.Year+"-"+mapdata.Month+"-"+mapdata.Day+"&nbsp"+mapdata.hour+":"+mapdata.minute+":"+mapdata.second;
	var depth = mapdata.depth;
	var level = mapdata.level;
	var leveltype=mapdata.leveltype;
	var introduction = mapdata.introduction;
	var c=new google.maps.LatLng(Lat,Lon);
	var mapD = Map;
	var pointM = new google.maps.Marker({position:c,map:mapD,optimized:false});
	var Promptwin='<div class="info" style="width: 245px;position: relative;overflow-y:hidden;color:#3c8dbc"><div class="del"><b>发震时刻:'+time+'</b></div><div class="del"><b>纬度:'+Lat+'</b></div><div class="del"><b>经度：'
					+Lon+'</b></div><div class="del"><b>深度：'+depth+'</b></div><div class="del"><b>震级：'+level+'</b></div><div style="line-height:16px;margin-top: 3px;"><b>参考位置：</b></div><div class="del" style="padding-left: 170px;"><a>详细信息>></a></div></div>';
	google.maps.event.addListener(pointM,"click",function(){
	
		infowindow.setContent(Promptwin);
		infowindow.open(mapD,pointM)
	})
	loadFile(fj);
}
//加载附件列表
function loadFile(dada){
	$('#downloadlist').html('');
	var Dhtml = "";
	for(var i=0;i<dada.length;i++){
		Dhtml += '<p>'+dada[i].filename+'</p>'
	}
	Dhtml +='<div class="btn btn-primary" onclick="downLoad('+dada+')"><i class="fa fa-download"></i> Download</div>'
	$('#downloadlist').html(Dhtml);
}
	
	function downLoad(fj){
//		 var label = document.getElementById('downloadLabel');	
		 for(var i =0;i<fj.length;i++)
		 {
		 	 downloadFile(fj[i].a_link);
		 }
	}
