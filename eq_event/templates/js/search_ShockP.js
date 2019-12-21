//搜索地震点js
function searchShockP(){
		
		var shockName = $("#eqname").val();
		var magnitude =$("#eqlevel").val();
		var magnitude1 =$("#eqlevel1").val();
		var source_depth = $("#eqdepth").val();
		var source_depth1 =$("#eqdepth1").val();
//		 window.location.reload();
		if(!shockName&& !magnitude&& !magnitude1&& !source_depth&& !source_depth1){
			alert("请至少填写一个关键字项");
		}
		else{
//			$.ajax({
//				type:"get",
//				url:"",
//				async:true,
//			});
			/*
			 * 假设已经收到后台数据，进行创建节点
			 */
			if(shockName!==""|| magnitude!==""|| magnitude1&& !source_depth&& !source_depth1){
				var leng =sreachP1.length;
//				var len =sreachP2.length;
				if(leng>0){
//					$('.odd').hide();
//					$('#example1').children('tbody').html("");
//					console.log(l);
//					$('#example2').html("");
//					CreatNode(leng);
					var datas = sreachP1;
					var countN = document.getElementById("example1").rows.length;
						if(countN>0){
							$('#example1').children('tbody').attr('id','demoContent');
							var nowPage = 1;
							var sizePage = 1;
							var options={
							"id":"page",//显示页码的元素
							"data":datas,//显示数据
						    "maxshowpageitem":3,//最多显示的页码个数
						    "pagelistcount":2,//每页显示数据个数
						    "callBack":function(result){
						    	     var cHtml="";
						        for(var i=0;i<result.length;i++){
						            cHtml+='<tr onclick="Shockclick('+sreachP1[i].shockLon+','+sreachP1[i].shockLat+')"><td>'+sreachP1[i].shockId+'</td><td>'
										+sreachP1[i].shockName+'</td><td>'
										+sreachP1[i].shockLat+'</td><td>'
										+sreachP1[i].shockLon+'</td><td>'
										+sreachP1[i].magnitude+'级</td><td>'
										+sreachP1[i].shockType+'</td><td>'
										+sreachP1[i].source_depth+'</td><td>'
										+sreachP1[i].shockMess+'</td></tr>';//处理数据
						        }
						        $("#demoContent").html(cHtml);//将数据增加到页面中
						    }
						};
   							page.init(datas.length,1,options);
//							goPage(nowPage,sizePage);
							
						}
				}
				
			}
			
		}

}

/*
 * 创建节点
 */
function CreatNode(length){
	var Thtml = "";
	var len = length;
	for(var i = 0;i<len;i++){
		Thtml +='<tr onclick="Shockclick('+sreachP1[i].shockLon+','+sreachP1[i].shockLat+')"><td>'+sreachP1[i].shockId+'</td><td>'
				+sreachP1[i].shockName+'</td><td>'
				+sreachP1[i].shockLat+'</td><td>'
				+sreachP1[i].shockLon+'</td><td>'
				+sreachP1[i].magnitude+'级</td><td>'
				+sreachP1[i].shockType+'</td><td>'
				+sreachP1[i].source_depth+'</td><td>'
				+sreachP1[i].shockMess+'</td></tr>'
	}
	$('#example1').children('tbody').attr('id','demoContent');
	$('#demoContent').html(Thtml);
	
}

/*
 * 为每个地震的tr绑定单击事件,测试
 */
function Shockclick(Lon,Lat){
	var lon =Lon;
	var lat =Lat;
	$('#introduction').show();
	CreatMapPoint(lon,lat);
}
/*
 * 为每个地震的tr绑定单击事件,测试
 */
function ShockCbyId(id){
	
}





var  page = {
    "pageId":"",
    "data":null,
    "maxshowpageitem":5,//最多显示的页码个数
    "pagelistcount":10,//每一页显示的内容条数
      "init":function(listCount,currentPage,options){
      	this.data=options.data,
      	this.pageId=options.id,
    this.maxshowpageitem=options.maxshowpageitem,//最多显示的页码个数
    this.pagelistcount=options.pagelistcount//每一页显示的内容条数
    page.initPage(listCount,currentPage);
  },
  /**
     * 初始化数据处理
     * @param listCount 列表总量
     * @param currentPage 当前页
     */
  "initPage":function(listCount,currentPage){
        var maxshowpageitem = page.maxshowpageitem;
        if(maxshowpageitem!=null&&maxshowpageitem>0&&maxshowpageitem!=""){
            page.maxshowpageitem = maxshowpageitem;
        }
        var pagelistcount = page.pagelistcount;
        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
            page.pagelistcount = pagelistcount;
        }   
        page.pagelistcount=pagelistcount;
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }
     
        page.setPageListCount(listCount,currentPage);
   },
    /**
     * 初始化分页界面
     * @param listCount 列表总量
     */
    "initWithUl":function(listCount,currentPage){
        var pageCount = 1;
        if(listCount>=0){
            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
        }
        var appendStr = page.getPageListModel(pageCount,currentPage);
        $("#"+page.pageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "setPageListCount":function(listCount,currentPage){
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        page.initWithUl(listCount,currentPage);
        page.initPageEvent(listCount);
        page.viewPage(currentPage,listCount,page.pagelistcount,page.data)
//      fun(currentPage);
    },
    //页面显示功能
     "viewPage":function (currentPage,listCount,pagelistcount,data){
            var NUM=listCount%pagelistcount==0?listCount/pagelistcount:parseInt(listCount/pagelistcount)+1;
            if(currentPage==NUM){
                var result=data.slice((currentPage-1)* pagelistcount,data.length);
            }
            else{
                var result=data.slice((currentPage-1)*pagelistcount,(currentPage-1)*pagelistcount+pagelistcount);
            }
            options.callBack(result);
    },
    "initPageEvent":function(listCount){
        $("#"+page.pageId +">li[class='pageItem']").on("click",function(){
            page.setPageListCount(listCount,$(this).attr("page-data"),page.fun);
        });
    },
    "getPageListModel":function(pageCount,currentPage){
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="pageItem";
        var nextPageClass = "pageItem";
        if(prePage<=0){
            prePageClass="pageItemDisable";
        }
        if(nextPage>pageCount){
            nextPageClass="pageItemDisable";
        }
        var appendStr ="";
        appendStr+="<li class='"+prePageClass+"' page-data='1' page-rel='firstpage'>首页</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' page-rel='prepage'>&lt;上一页</li>";
        var miniPageNumber = 1;
        if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)<=pageCount){
            miniPageNumber = currentPage-parseInt(page.maxshowpageitem/2);
        }else if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)>pageCount){
            miniPageNumber = pageCount-page.maxshowpageitem+1;
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(page.maxshowpageitem);
        if(pageCount<showPageNum){
            showPageNum = pageCount;
        }
        for(var i=0;i<showPageNum;i++){
            var pageNumber = miniPageNumber++;
            var itemPageClass = "pageItem";
            if(pageNumber==currentPage){
                itemPageClass = "pageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' page-data='"+pageNumber+"' page-rel='itempage'>"+pageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"' page-rel='nextpage'>下一页&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' page-rel='lastpage'>尾页</li>";
       return appendStr;

    }
}
