//搜索地震点js
 $(function () {
 	
 	var data_first={
 		"eqname":"",
        "current_page":1
 	};
    searchShockP(1);


	 //下载地震数据
	$("#downloadAtt").on("click",function(){
		window.open(config.baseUrl+config.roule.downloadearthquake);
	});

	$("#eq_file").hide();
	// 上传地震数据
	 $("#uploadAtt span").on("click",function(){
		 // 上传附件只需要按照模板上传后，后端定时脚本会从目录中读取文件，读完数据之后删除
		 // 根据附件标签设置不同的时间
		 if($("#eq_file").css("display")=="none"){
			 $("#eq_file").css("display", "block");

		 }else{
			 var formData = new FormData();
			 var name = $("#eq_file").val();
			 formData.append("file",$("#eq_file")[0].files[0]);
			 $.ajax({
			   type: "POST",
               url: config.baseUrl +'/eq/upload',
               data: formData,
               dataType:"JSON",
               contentType: false,
               processData: false,
               success: function(data){
				   // console.info("123");
                   // var obj = jQuery.parseJSON(arg);
                   console.info(data.message);
				   alert(data.message);
                   //alert("附件");
                   // TODO
               },
               error: function(data){
                   alert(data.result);
               }
			 });
			 $("#eq_file").css("display", "none");

		 }
	});




    	
	$('#addnew').click(function(){
			window.location.href="add.html";
	 });   

    $("#btn").click(function(){  
    	
    	var current_page=1;
    	//输入关键字查询
        if ($("#eqname").val()== "") {  
        	alert("为了确保您的查询有结果，请输入关键字进行查询");
        }
          
        else{
        	searchShockP(current_page);   
			}   

	 });               	 

 });		

//分页
function searchShockP(Current_page){
	var data ={
		"eq_name":$("#eqname").val(),
		"current_page":Current_page
	};
	SendMsgRouleGet(data,config.roule.queryearthquake,ongetShockPCallback);
}
//获取地震信息回调
function ongetShockPCallback(jsoncallback){
	if(jsoncallback.status === config.errorCode.success){
		var Sdata =jsoncallback.earthquake_list; 
			var options={
				"id":"page",//显示页码的元素
				"data":Sdata,//显示数据
				"maxshowpageitem":3,//最多显示的页码个数
				"pagelistcount":10,//每页显示数据个数
				"callBack":function(result){
					var rlength =result.length;
					html = CreatNode(rlength,result);
					$("#demoContent").html(html);
				}
			};
		page.init(jsoncallback.count_data,jsoncallback.current_page,options);
	}else if(jsoncallback.status === config.errorCode.goLogin){
		window.location.href="../../page/login.html";
	}
}
//创建节点
 function CreatNode(Length,result){
 	$('#example1').children('tbody').html("");
	$('#example1').children('tbody').attr('id','demoContent');
	var html = "";
	var len = Length;
	for(var i = 0;i<len;i++){
		if(result[i]!==null)
		{
			    var id_eqname =  result[i].id + "_"+ result[i].eqname;
				html+="<tr><td>"+result[i].id+"</td>";
		   		html+="<td>"+result[i].eqname+"</td>";
		   		html+="<td>"+result[i].longitude+"</td>";
		   		html+="<td>"+result[i].latitude+"</td>";
		   		html+="<td>"+result[i].level+"</td>";
		   		html+="<td>"+result[i].leveltype+"</td>";
			    html+="<td>"+result[i].depth+"</td>";
		   		html+="<td>"+result[i].Year+'-'+result[i].Month+'-'+result[i].Day+'&nbsp'+result[i].hour+':'+result[i].minute+':'+result[i].second+"</td>";
		   		html+="<td>"+result[i].introduction+"</td>";
		   		html+="<td>"+
					"<span  class='btn btn-success delnode'><a href='detail.html?id=" +result[i].id + "'>" + "详情" + "</a></span>"+
					"<span  class='btn btn-success delnode'><a href='edit.html?id=" +result[i].id + "'>" + "编辑" + "</a></span>"+
					"<span  class='btn btn-danger delnode' id='"+result[i].id+"' onclick='delData(this);'>删除</span>" +
					"<span  class='btn btn-danger delnode' id='"+id_eqname+"' onclick='showDetail(this)'>上传附件</span>" +

					"</td></tr>";
	}
     }
	   return html;
 }

//删除信息
function delData(data){
	//地震的信息的id
	var id= data.id;
	
	var data={'earthquake_id':id};
	//调用封装好的交互方法，
	//data 是要给后台穿得数据
	//config.roule.deleteeq 是路由
	//ondeldataCallback 回调
	SendMsgRouleGet(data,config.roule.deleteeq,ondeldataCallback);
	
}
//删除回调
function ondeldataCallback(jsoncallback){
	if(jsoncallback.status=== config.errorCode.success){
		alert("成功啦");
	}
}


function showDetail(data){
	/*
	* 上传附件的遮罩层
	* */
	var id_eqname = data.id;
	var eq_id = id_eqname.split("_")[0];
	var eqname = id_eqname.split("_")[1];
	var msgDiv = document.getElementById("msgDiv");
	msgDiv.style.marginTop = -75 + document.documentElement.scrollTop + "px";
	//bgDiv
	var bgDiv = document.getElementById("bgDiv");
	bgDiv.style.width = document.body.offsetwidth + "px";
	bgDiv.style.height = screen.height + "px";
	//msgShut
	var msgShut = document.getElementById("msgShut");
	msgShut.onclick = function(){
		bgDiv.style.display = msgDiv.style.display = "none";
	};
	//content
	msgDiv.style.display = bgDiv.style.display = "block";
	var msgDetail = document.getElementById("msgDetail");
	msgDetail.innerHTML = "<P>"+ eqname+"</P>" +
		"<form id='upload' action='upload' enctype='multipart/form-data' method='post'>" +
		"<input type='file' name='upfiles'/><br/>" +
		"<input type='hidden' id='earthquake_id' name='earthquake_id' value="+ eq_id+" /><br/>"+
		"<input type='button' id='btn_upload_fj' value='上传附件' onclick='uploadfj()'/></form>";
}


function uploadfj(){
	/*
	* 附件上传
	* */
	//document.getElementById("upload");
	var form = $("#upload")[0];
	var formData = new FormData(form);
	formData.append('image', $('input[type=file]')[0].files[0]);

	$.ajax({
			   type: "POST",
               url: config.baseUrl +'/fj/upload',
               data: formData,
               dataType:"JSON",
               contentType: false,
               processData: false,
               success: function(data){
				   // console.info("123");
                   // var obj = jQuery.parseJSON(arg);
                   console.info(data.message);
				   alert(data.message);
                   //alert("附件");
                   // TODO
               },
               error: function(data){
                   alert(data.result);
               }
       });
    var msgDiv = document.getElementById("msgDiv");
	var bgDiv = document.getElementById("bgDiv");

	bgDiv.style.display = msgDiv.style.display = "none";


}
