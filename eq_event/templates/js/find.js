//搜索地震点js
 $(function () {
    	
		$('#addnew').click(function(){
				window.location.href="add.html";
		 });   
		 
        $("#btn").click(function() {  
        	//输入关键字查询
            var eqname = $.trim($("#eqname").val());   
            if (eqname == "") {  
                alert("请输入文字!");  
            } else {  
//              $.ajax({  
//                  type : "get",  
//                  url : config.baseUrl+"http://39.106.102.147:8000/queryearthquake",  
//                  data : {  
//                      "type" : "find",  
//                      "current_page" : current_page,  
//                      " rolename" : eq_name
//                  },  
//                  success : function(msg) {  
//                      if ("无结果" == msg) {  
//                          alert(msg);  
//                          $("#current_page").val("");  
//                          $("#rolename").val("");  
//                         
//                      }  
//                      var stus = eval("(" + msg + ")");  
//                      $("#dataTable").empty;  
//                      var str = "";  
//                      for (var i = 0; i < stus.length; i++) {  
//                          str = str + "<tr><td>" + stus[i].num_id + "</td>";
//                          str = str + "<td>" + stus[i].eq_name + "</td>"; 
//                          str = str + "<td>" + stus[i].lon + "</td>"; 
//                          str = str + "<td>" + stus[i].lan + "</td>"; 
//                          str = str + "<td>" + stus[i].happen_time + "</td>";  
//                          str = str + "<td>" + stus[i].eq_explain + "</td>";  
//                          str = str + "<td>" + "<a href='javascript:a(" + stus[i].id + ")'>" + "编辑" + "</a>" + "</td></tr>"  
//                      }  
//                      $("#dataTable").html(str);  
//                  }  
////                  error:function(){
////						alert("服务器异常");
////					}
//              }  
//              );  
            }  
        }); 

        


		 });               	 

		

   
	function del(id)
	{
		if(confirm("确定要删除吗？"))
		{
			var url = "index.html";
			window.location.href=url;		
		}
	}
   function CreatNode(Length,result){
   	          var str = "";  
               for (var i = 0; i <Length; i++) {  
		            str = str + "<tr><td>" + result[i].num_id + "</td>";
		            str = str + "<td>" + result[i].eqname + "</td>"; 
		            str = str + "<td>" + result[i].lon + "</td>"; 
		            str = str + "<td>" + result[i].lan + "</td>"; 
		            str = str + "<td>" + result[i].magnitude + "</td>"; 
		            str = str + "<td>" + result[i].type + "</td>"; 
		            str = str + "<td>" + result[i]. eq_depth + "</td>"; 
		            str = str + "<td>" + result[i].happen_time + "</td>";  
		            str = str + "<td>" + result[i].eq_explain + "</td>";  
		            str = str + "<td>" + "<a href='editjavascript:a(" + result[i].id + ")'>" + "编辑" + "</a>" + "</td></tr>" 
   				}
               $('#demoContent').html(str);

}