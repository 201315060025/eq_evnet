$(function(){
    var data_first={
    	"user_name":"",
        "current_page":1
    }


	getuser(data_first);
// searchShockP(1);
 
   function getLocalTime(nS) 
	{
       return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,20)
    }


function getuser(data)
{
	$.ajax({
		type:"get",
		url:"http://47.105.123.173:8000/queryuserinfo",
		async:true,
//		data:{"user_name":"",
//		      "current_page":1},
        data:data,
		dataType:"jsonp",
        jsonp:"jsoncallback",
        crossDomain:true,
        success : function(jsoncallback) { 
        	console.log(jsoncallback);
                       if(jsoncallback.status===200){
                    	console.log(jsoncallback);
                    	var time=getLocalTime(jsoncallback.last_time);
                    	console.log(time);
                       	var arr=jsoncallback.data;
                       	var html="";
                       	$.each(arr, function(index,item) { 
                       		if(arr[index]!=null)
                       		
                       		{
                       			console.log(jsoncallback.last_time);
                       			html+="<tr><td>"+arr[index].id+"</td>";
	                       		html+="<td>"+arr[index].DLM+"</td>";
	                       		html+="<td>"+arr[index].XM+"</td>";
	                       		html+="<td>"+time+"</td>";
	                       		html+="<td>"+"<a href='edit.html?user_id=" +arr[index].id + "'>" + "编辑" + "</a>" + "</td></tr>";
                       		}
                       		
                       	});
						$('#userContent').html(html);
					   }
                       else if(jsoncallback.status===1000)
                       {
                       	window.location.href="../login.html"
                       }
//                    $("#dataTable").html(html);
                    },
                   error:function(xhr,type,errorThrown){
						console.log(errorThrown);
					}
       })
}

         $("#btn").click(function(){  
    	
    	//输入关键字查询
        var user_name = $("#username").val();   
        
        console.log(user_name);
        if (user_name == "") {  
          alert("请输入文字!"); }
        else{
        	var data_l={
        		"user_name":user_name,
              	"current_page":1
        	};
        	getuser(data_l);

            }   


	 });  
	 
	 
	 //分页
  
//function searchShockP(Current_page){
//		
//		var username=$("#username").val;
//		var Current_page = Current_page;
////		obj_data[""]
//		 $.ajax({
//	       	type:"GET",
//	       	url:"http://39.106.102.147:8000/queryuserinfo",
//	       	data:{
//	       		"user_name":username,
//	       		"current_page":Current_page
//	       	},
//	       	async:true,
//	        dataType:"jsonp",
//	        jsonp:"jsoncallback",
//	        crossDomain:true,
//	       	success:function(jsoncallback){
//	       		if(jsoncallback.status=== 200){
//	       			console.log('123');
//	       			//function GreatePage(Sdata){
//	       			 	var Sdata =jsoncallback.data; 
//						var options={
//							"id":"page",//显示页码的元素
//							"data":Sdata,//显示数据
//							"maxshowpageitem":3,//最多显示的页码个数
//							"pagelistcount":9,//每页显示数据个数
//							"callBack":function(result){
//								var rlength =result.length;
//								CreatNode(rlength,result);
//							}
//						};
//						page.init(jsoncallback.count_page,Current_page,options);
//
//	       			CreatMapPoint(jsoncallback.data[1].latitude,jsoncallback.data[1].longitude,jsoncallback.data[1]);
////	       		GreatePage(j.data);
//	       		}else{
//	       			
//	       		}
//	       	},
//	       	error:function(xhr,status,error){
//	       		console.log(error);
//	//			alert("服务器异常，请重新尝试");
//			}
//	       });
//
//
//}
//
//function CreatNode(length,result){
//	$('#example1').children('tbody').html("");
//	$('#example1').children('tbody').attr('id','userContent');
//	var html = "";
//	var len = length;
//	for(var i = 1;i<len;i++){
//		html+="<tr><td>"+result[i].id+"</td>";
// 		html+="<td >"+result[i].DLM+"</td>";
// 	    html+="<td >"+result[i].XM+"</td>";
// 		html+="<td >"+time+"</td>";
// 		html+="<td>"+"<a href='edit.html?user_id=" +result[i].id + "'>" + "编辑" + "</a>" + "</td></tr>";
//}
//	
//	return html;
//	
//}
 



 
})










	
    


