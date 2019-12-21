	var beaches=new Array();
	var map1,map2;
	var infowindow=new google.maps.InfoWindow({size:new google.maps.Size(40,40)});
	var markersArray1=[];
	var markersArray2=[];
		$(function(){
		    //加载地图
		   	CreatMap();
//		   	searchShockP(1);
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
				 searchShockP(1);
				 
			});	
		    //左侧导航栏图属关联			
		    $('#gotoALL').click(function(){
				 $('#SecMap').hide();
				 $('#SecList').show();
				 $('#introduction').show();
			});	
			//下载地震数据
			$("#downloadAtt").on("click",function(){
				window.open(config.baseUrl+config.roule.downloadearthquake);
			})
		});
		
		function CreatMap(){
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
			//前后台交互
			var dataMsg = {};
			SendMsgRouleGet(dataMsg,config.roule.getmapinfo,onCreateMapCallback);
		}
		
		function onCreateMapCallback(jsoncallback){
			if(jsoncallback.status==config.errorCode.success){
				$.each(jsoncallback.data, function(index,item) {
					if(index>0){
						CreatP(map1,jsoncallback.data[index]);
					}
				});
			}
		}
		
		/*
		 * 描点
		 */
		function CreatP(Map,dataInfo){
			var mapData =dataInfo;
			var mapLatitude = mapData.latitude;
			var mapLongitude = mapData.longitude;
			var time = mapData.Year+"-"+mapData.Month+"-"+mapData.Day+"&nbsp"+mapData.hour+":"+mapData.minute+":"+mapData.second;
			var depth = mapData.depth;
			var level = mapData.level;
			var leveltype=mapData.leveltype;
			var introduction = mapData.introduction;
			var c=new google.maps.LatLng(mapLatitude,mapLongitude);
			var mapD = Map;
			var pointM = new google.maps.Marker({position:c,map:mapD,optimized:false});
			var Promptwin='<div class="info" style="width: 245px;position: relative;overflow-y:hidden;color:#3c8dbc"><div class="del"><b>发震时刻:'+time+'</b></div><div class="del"><b>纬度:'+mapLatitude+'</b></div><div class="del"><b>经度：'
							+mapLongitude+'</b></div><div class="del"><b>深度：'+depth+'</b></div><div class="del"><b>震级：'+level+
							'</b></div><div style="line-height:16px;margin-top: 3px;"><b>参考位置：</b></div><div class="del" style="padding-left: 170px;" onclick="openTuShu('+mapData.id+')"><a>详细信息>></a></div></div>';
			google.maps.event.addListener(pointM,"click",function(){
				infowindow.setContent(Promptwin);
				infowindow.open(mapD,pointM)
			})
		}
		
		/**列表查看*/
		function searchShockP(currPage){
			var dataMsg = {
		   		"eq_name":$("#eqname").val(),
		   		"eq_level_low":$("#eqlevel").val(),
		   		"eq_level_hight":$("#eqlevel1").val(),
		   		"eq_depth_low":$("#eqdepth").val(),
		   		"eq_depth_hight":$("#eqdepth1").val(),
		   		"current_page":currPage
		  };
			SendMsgRouleGet(dataMsg,config.roule.getearthquakeinfo,ongetShockPCallback);
		}
		
		function ongetShockPCallback(jsoncallback){
			if(jsoncallback.status=== config.errorCode.success){
			 	var Sdata =jsoncallback.data; 
				var options={
					"id":"page",//显示页码的元素
					"data":Sdata,//显示数据
					"maxshowpageitem":3,//最多显示的页码个数
					"pagelistcount":10,//每页显示数据个数
					"callBack":function(result){
						var rlength =result.length;
						CreatNode(rlength,result);
					}
				};
				page.init(jsoncallback.count_page,jsoncallback.current_page,options);
				CreatMapPoint(Sdata[0]);
			}
		}
		
		/*
		 * 创建节点
		 */
		function CreatNode(length,result){
			$('#example1').children('tbody').html("");
			var Thtml = "";
			var len = length;
			for(var i = 0;i<len;i++){
				var obj = result[i];
				if(result[i]!==null){
					Thtml +='<tr onclick="openTuShu('+result[i].id+')"><td>'+result[i].id+'</td><td>'
						+result[i].eqname+'</td><td>'
						+result[i].longitude+'</td><td>'
						+result[i].latitude+'</td><td>'
						+result[i].level+'级</td><td>'
						+result[i].leveltype+'</td><td>'
						+result[i].depth+'</td><td>'
						+result[i].introduction+'</td></tr>'
				}
				
			}

			$('#demoContent').html(Thtml);
			
		}
		
		/**图属关联*/
		function openTuShu(id = null){
			 $('#SecMap').hide();
			 $('#SecList').show();
			 $('#introduction').show();
			 if(id ==null){
			 	searchShockP(1);
			 	return;
			 }
			 var dataMsg = {
		   		"earthquake_id":id
		   	};
			 SendMsgRouleGet(dataMsg,config.roule.editearthquakeinfo,ongetPointCallback);
		}
		
		function ongetPointCallback(jsoncallback){
			if(jsoncallback.status===config.errorCode.success){
				var result = jsoncallback.data;

				var Thtml = "";
				$('#example1').children('tbody').html("");
				$("#eq_introduction").text("");
				if(result!==null){
					Thtml +='<tr onclick="openTuShu('+result.id+')"><td>'+result.id+'</td><td>'
						+result.eqname+'</td><td>'
						+result.longitude+'</td><td>'
						+result.latitude+'</td><td>'
						+result.level+'级</td><td>'
						+result.leveltype+'</td><td>'
						+result.depth+'</td><td>'
						+result.introduction+'</td></tr>'
				}
				$('#demoContent').html(Thtml);
				// 添加地震介绍绑定
				if(result.introduction.length != 0){
					$("#eq_introduction").text(result.introduction);
				}
				else{
					$("#eq_introduction").text("暂无介绍");
				}
				// 添加附件绑定 开始

				var flieobj = JSON.parse(result.attachment);
				var newHtml = "";
				for (var i=0;i<flieobj.length;i++) {
					var filePath = config.baseUrl + "/static"+flieobj[i].fjpath;
					 console.info(flieobj[i].fjpath);
					// 详情界面 用户点击就是下载
					// newHtml +='<div onclick=\''+'downloadFile("'+filePath+'")\'><a>'+flieobj[i].fjname+'</a></div>'
					newHtml +='<a href='+filePath+'>' +flieobj[i].fjname+'</a></br>';
				}
				$("#downloadlist").html(newHtml);
				// 添加附件绑定结束


				CreatMapPoint(result.latitude,result.longitude,result);
			}
		}

		/**单个点 */
		function CreatMapPoint(dataInfo)
		{
			var mapData = dataInfo;
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
			CreatP(map2,mapData);
			//加载说明文字
			var introduction = dada.introduction;
			var strIntroduction='<h2 class="page-header"><a>地震点介绍</a></h2><p class="lead">'+introduction+'</p>';
			var table = $("#txtIntro");
			table.text("");// 清空数据
			table.append(strIntroduction);	
		}
		//下载地震数据
		function downloadAtt(){
			var dataMsg ={};
			SendMsgRouleGet(dataMsg,config.roule.download,ondownloadAttCallback);
		}
//		
//		function ondownloadAttCallback(jsoncallback){
//			if(jsoncallback.statua === config.errorCode.success){
//				alert("成功下载数据到本地");
//			}
//		}
