//window.sreachPdata_node ={
//	"data":[
//	{
//		"num_id": "0001",
//		"eqname ": "陕西歧山≥Ⅸ" ,
//		"lon": "107.8",
//		"lan": "34.5",
//		"type":"M",
//		"eq_level": "6",
//		"eq_depth":"-700" ,
//		"happen_time":"2017-12-01 9:00:00",
//		"eq_explain": "地震发生于陕西省北部……"},
//		{
//		"eqname":"陕西华县地震",
//		"magnitude":"尚无记录",
//		"type":"M",
//		"eq_depth":"尚无记录",
//		"num_id":"0002",
//		"lon":"34.57986",
//		"lan":"109.727884",
//		"happen_time":"2011-11-11 10:10:10",
//		"eq_level":"6",
//		"eq_explain":"这次地震成83万人死亡"
//		},
//		{"eqname":"宁夏海源地震",
//		 "magnitude":"8.5",
//		 "type":"M",
//		 "eq_depth":"尚无记录",
//		 "num_id":"0003",
//		 "lon":"36.571477",
//		 "lan":"105.645381",
//		 "happen_time":"11111111",
//		 "eq_level":"1",
//		 "eq_explain":"这次地震成24万人死亡"
//		},
//		{"eqname":"宁夏海源地震",
//		 "magnitude":"8.5",
//		 "type":"M",
//		 "eq_depth":"尚无记录",
//		 "num_id":"0004",
//		 "lon":"36.571477",
//		 "lan":"105.645381",
//		 "happen_time":"11111111",
//		 "eq_level":"1",
//		 "eq_explain":"这次地震成24万人死亡"
//		},
//
//
//	],
//	"current_page": '1',
//	"total_num":'100'
//}


$(function(){
		  $.ajax({  
                  type : "GET",  
                  url:"http://39.106.102.147:8000/queryearthquake",
                  data:{"eqname":""},
                  dataType:"jsonp",
                  jsonp:"jsoncallback",
                  crossDomain:true,
                  success : function(jsoncallback) { 
                    	console.log(jsoncallback);
                       if(jsoncallback.status===200){
                    	console.log(jsoncallback.earthquake_list);
                       	var arr=jsoncallback.earthquake_list;
                       	var html="";
                       	$.each(arr, function(index,item) { 
                       		if(arr[index]!=null)
                       		{
                       			html+="<tr><td>"+arr[index].id+"</td>";
	                       		html+="<td>"+arr[index].eqname+"</td>";
	                       		html+="<td>"+arr[index].longitude+"</td>";
	                       		html+="<td>"+arr[index].latitude+"</td>";
	                       		html+="<td>"+arr[index].level+"</td>";
	                       		html+="<td>"+arr[index].leveltype+"</td>";
	                       		html+="<td>"+arr[index].depth+"</td>";
	                       		html+="<td>"+arr[index].data+"</td>";
	                       		html+="<td>"+arr[index].introduction+"</td>";
	                       		html+="<td>"+"<a href='edit.html?id=" +arr[index].id + "'>" + "编辑" + "</a>" + "</td></tr>";
                       		}
                       		
                       	});
						$('#demoContent').html(html);
					   }
//                    $("#dataTable").html(html);
                    },
                   error:function(xhr,type,errorThrown){
						console.log(errorThrown);
					}
              
              });  
});

