var beaches=new Array();
var map1,map2;
var infowindow=new google.maps.InfoWindow({size:new google.maps.Size(50,50)});
var markersArray1=[];
var markersArray2=[];
$(function(){
	        //加载地图
		   	loadMap();
			//加载地震列表
			loatDataList();
            //加载地震点信息			
			loadMapPoint(1);
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
function clearOverlays(){
	if(markersArray){
	for(i in markersArray)
	{
	   markersArray[i].setMap(null)
	}
	}
}
function setMarkers1(d,b)
{
	var c=new google.maps.LatLng(b[0],b[1]);
	var a=new google.maps.Marker({position:c,map:d,optimized:false,icon:b[3]});
	markersArray1.push(a);
	var e='<div class="info" style="width: 245px;position: relative;overflow-y:hidden;color:#3c8dbc"><div class="del"><b>发震时刻：</b>'+b[6]+'(UTC+8)</div><div class="del"><b>纬度：</b>'+b[0]+'</div><div class="del"><b>经度：</b>'+b[1]+'</div><div class="del"><b>深度：</b>'+b[4]+'</div><div class="del"><b>震级：</b>'+b[2]+'</div><div style="line-height:16px;margin-top: 3px;"><b>参考位置：</b>'+b[5]+'</div><div class="del" style="padding-left: 170px;"><a  onclick=loadMapPoint('+b[8]+')>详细信息>></a></div></div>';
	google.maps.event.addListener(a,"click",function(){infowindow.setContent(e);
	infowindow.open(d,a)})
}
function loadMap()
{
	       //初始化对象
		   var m_earthquake=new SmPageData("eqls","earthquake");
		   m_earthquake.PageSize=20;
		   //加载所有滑坡点列表
		   m_earthquake.Init(m_earthquake.Key,m_earthquake.Fields,m_earthquake.Filter);	   
		   if(m_earthquake.Data!=undefined)
		   {
			//创建Table
			CreatMap(m_earthquake);
            //加载分页符
            var element = $('#bp-3-element-test');
            var options = {
                bootstrapMajorVersion:3,
                currentPage: 1,
                numberOfPages: m_earthquake.PageSize,
                totalPages:m_earthquake.RecordCount,
				itemTexts: function (type, page, current) {
                switch (type) {
                case "first":
                  return "首页";
                case "prev":
                  return "上一页";
                case "next":
                  return "下一页";
                case "last":
                  return "末页";
                case "page":
                  return page;
              }
            },onPageClicked: function (event, originalEvent, type, page) {
			   if(type='next')
			   {
				   m_earthquake.PageDown();
			   }
			   else if(type='prev')
			   {
				   m_earthquake.PageUp();
			   }
			   else if(type='last')
			   {
				   m_earthquake.First();
			   }
			   else if(type='first')
			   {
				   m_earthquake.Last();
			   }
			   else if(type='page')
			   {
				   m_earthquake.Init(m_earthquake.Key,m_earthquake.Fields,m_earthquake.Filter);
			   }
			   CreatMap(m_earthquake);
			}
            }
            element.bootstrapPaginator(options);					
		   }	
}
function loadMapPoint(id)
{
	       $('#SecMap').hide();
	       $('#SecList').hide();
		   $('#introduction').show();
	       //初始化对象
		   var m_earthquake=new SmObjectData("earthquake");
		   //加载所有滑坡点列表
		   m_earthquake.GetFirstSmObject("eqid="+id);	   
		   if(m_earthquake.Data!=undefined)
		   {
			//创建Table
			CreatMapPoint(m_earthquake);					
		   }	
}
function CreatMap(m_earthquake)
{
	//定义面集合
   var polygons = [];
   var beaches=[];
   for(i=0;i<m_earthquake.PageRecordCount;i++)
   {
		   //添加点
			var e=m_earthquake.Data.Rows[i][2];
			var p=m_earthquake.Data.Rows[i][3];
			var n=4.2;
			var c=parseInt(n);
			var o=6.1;
			var f=m_earthquake.Data.Rows[i][1];;
			var year=m_earthquake.Data.Rows[i][9];
			var month=m_earthquake.Data.Rows[i][10];
			var day=m_earthquake.Data.Rows[i][11];
			var hour=m_earthquake.Data.Rows[i][12];
			var minute=m_earthquake.Data.Rows[i][13];
			var second=m_earthquake.Data.Rows[i][14];
			var g=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
			var m="CD20150720232840";
			var r=m.indexOf(".");
			var q="img/m5_red.png";
			var id=m_earthquake.Data.Rows[i][0];
	
			beache=[p,e,n,q,o,f,g,m,id];
			beaches.push(beache);	
   }
   
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
	 map=new google.maps.Map(document.getElementById("world-map"),mapOptions);				
	//将面集合加载到地图中			
	for (var ii = 0; ii < polygons.length; ii++) 
	{    
	   polygons[ii].setMap(map); 
	}
	for(var jj=0;jj<beaches.length;jj++)
	{
		setMarkers1(map,beaches[jj]);
	}
}
function CreatMapPoint(m_earthquake)
{
    //定义面集合
    var polygons = [];
    var beaches=[];
    //添加点
	var e=m_earthquake.GetValue("LONGITUDE");
	var p=m_earthquake.GetValue("LATITUDE");
	var n=4.2;
	var c=parseInt(n);
	var o=6.1;
	var f=m_earthquake.GetValue("EQNAME");
	var year=m_earthquake.GetValue("YEAR");
	var month=m_earthquake.GetValue("MONTH");
	var day=m_earthquake.GetValue("DAY");
	var hour=m_earthquake.GetValue("HOUR");
	var minute=m_earthquake.GetValue("MINUTE");
	var second=m_earthquake.GetValue("SECOND");
	var introduction=m_earthquake.GetValue("INTRODUCTION");
	var g=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	var m="CD20150720232840";
	var r=m.indexOf(".");
	var q="img/m5_red.png";

	beache=[p,e,n,q,o,f,g,m];
	beaches.push(beache);
   
	var centerPoint=new google.maps.LatLng(p,e);
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
	for(var jj=0;jj<beaches.length;jj++)
	{
		setMarkers1(map,beaches[jj]);
	};
	//加载说明文字
	var strIntroduction='<h2 class="page-header"><a>地震点介绍</a></h2><p class="lead">'+introduction+'</p>';
	var table = $("#txtIntro");
	table.text("");// 清空数据
	table.append(strIntroduction);
	//加载附件列表
	var fjDatatable=new SmDataTable();
	fjDatatable.Init("select * from fj where eqid="+m_earthquake.GetValue("EQID"));
	loadFJ(fjDatatable);
	
}
//加载附件列表
function loadFJ(fjDatatable)
{
	  if(fjDatatable.Data!=undefined)
	   {
		   var strFJ='<div class="box-header with-border"><h3 class="box-title">下载附件</h3><span class="label label-primary pull-right">\
		   <i class="fa fa-html5"></i></span></div><!-- /.box-header --><div class="box-body">';
		   for(i=0;i<fjDatatable.RecordCount;i++)
		   {
			   //加载数据
				var fjname=fjDatatable.Data.Rows[i][fjDatatable.GetKeyIndex('FJNAME')];
				var fjpath=fjDatatable.Data.Rows[i][fjDatatable.GetKeyIndex('FJPATH')];
				strFJ='<p>'+strFJ+fjname+'</p>';
		   }
		   strFJ=strFJ+'<a href="" class="btn btn-primary"><i class="fa fa-download"></i> Download</a></div>';
		    var table = $("#fj");
			table.text("");// 清空数据
			table.append(strFJ);
		   
	   }
}
function loatDataList()
{
	       //初始化对象
		   var m_earthquake=new SmPageData("eqls","earthquake");
		   m_earthquake.PageSize=10;
		   //查询条件
		   var filter=" 1=1";
		   var eqname=$.trim($("#eqname").val());
		   var eqlevel=$.trim($("#eqlevel").val());
		   var eqlevel1=$.trim($("#eqlevel1").val());
		   var eqdepth=$.trim($("#eqdepth").val());
		   var eqdepth1=$.trim($("#eqdepth1").val());
		   if(eqname!='')
		   {
			   filter=filter+" and eqname like \\\'%"+eqname+"%\\\'";
		   }
		   if(eqlevel!='')
		   {
			   filter=filter+" and level >="+eqlevel;
		   }
		   if(eqlevel1!='')
		   {
			   filter=filter+" and level <="+eqlevel1;
		   }
		   if(eqdepth!='')
		   {
			   filter=filter+" and depth >="+eqdepth;
		   }
		   if(eqdepth1!='')
		   {
			   filter=filter+" and depth <="+eqdepth1;
		   }
		   //加载所有滑坡点列表
		   m_earthquake.Init(m_earthquake.Key,m_earthquake.Fields,filter);
		   if(m_earthquake.Data!=undefined)
		   {
			//创建Table
			CreatDataTable(m_earthquake);
            //加载分页符
            var element1 = $('#bp-3-element-test1');
            var options = {
                bootstrapMajorVersion:3,
                currentPage: 1,
                numberOfPages: m_earthquake.PageSize,
                totalPages:m_earthquake.RecordCount,
				itemTexts: function (type, page, current) {
                switch (type) {
                case "first":
                  return "首页";
                case "prev":
                  return "上一页";
                case "next":
                  return "下一页";
                case "last":
                  return "末页";
                case "page":
                  return page;
              }
            },onPageClicked: function (event, originalEvent, type, page) {
			   if(type='next')
			   {
				   m_earthquake.PageDown();
			   }
			   else if(type='prev')
			   {
				   m_earthquake.PageUp();
			   }
			   else if(type='last')
			   {
				   m_earthquake.First();
			   }
			   else if(type='first')
			   {
				   m_earthquake.Last();
			   }
			   else if(type='page')
			   {
				   m_earthquake.Init(m_earthquake.Key,m_earthquake.Fields,m_earthquake.Filter);
			   }
			   CreatDataTable(m_earthquake);
			}
            }
            element1.bootstrapPaginator(options);					
		   }	
}
function CreatDataTable(m_earthquake)
{
	var strHtml='<thead><tr><th>地震点ID</th><th>地震名称</th><th>经度</th><th>纬度</th>\
						<th>震级</th><th>震级类型</th><th>震源深度</th><th>详细介绍</th></tr></thead><tbody>'
   for(i=0;i<m_earthquake.PageRecordCount;i++)
   {
		   //加载数据
			var eqid=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('EQID')];
			var eqname=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('EQNAME')];
			var jd=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('LONGITUDE')];
			var wd=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('LATITUDE')];
			var levle=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('LEVEL')];
			var levletype=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('LEVELTYPE')];
			var depth=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('DEPTH')];
			var year=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('YEAR')];
			var month=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('MONTH')];
			var day=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('DAY')];
			var hour=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('HOUR')];
			var minute=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('MINUTE')];
			var second=m_earthquake.Data.Rows[i][m_earthquake.GetKeyIndex('SECOND')];
			var g=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
			strHtml=strHtml+'<tr><td>'+eqid+'</td><td>'+eqname+'</td><td>'+jd+'</td><td>'+wd+'</td><td>'+levle+'</td>\
			<td>'+levletype+'</td><td>'+depth+'</td><td style="cursor:pointer" onclick=loadMapPoint('+eqid+')>详细介绍</td></tr>';
   }
	var table = $("#example1");
	table.text("");// 清空数据
	table.append(strHtml)	
}