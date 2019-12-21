$(function(){

			//加载地震列表
			loatDataList();
			//查询按钮
            $('#btnSearch').click(function(){
				loatDataList();
			});				
});
function loatDataList()
{
	       //初始化对象
		   var m_earthquake=new SmPageData("eqls","earthquake");
		   m_earthquake.PageSize=10;
		   //查询条件
		   var filter=" 1=1";
		   var eqname=$.trim($("#rolename").val());
		   if(eqname!='')
		   {
			   filter=filter+" and eqname like \\\'%"+eqname+"%\\\'";
		   }
		   //加载所有滑坡点列表
		   m_earthquake.Init(m_earthquake.Key,m_earthquake.Fields,filter);
		   if(m_earthquake.Data!=undefined)
		   {
			//创建Table
			CreatDataTable(m_earthquake);
            //加载分页符
            var element1 = $("#pageelement");
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
	var strHtml='<thead><tr><th>编号</th><th>名称</th> <th>经度</th><th>纬度</th><th>震级</th><th>震级类型</th>\
	<th>震源深度</th><th>日期</th><th>编辑</th></tr></thead>'
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
			strHtml=strHtml+'<tr><td>'+eqid+'</td><td>'+eqname+'</td><td>'+jd+'</td><td>'+wd+'</td><td>'+levle+'</td><td>'+levletype+'</td><td>'+depth+'</td>\
			<td>'+g+'</td><td><a href="edit.html?id='+eqid+'">编辑</a></td></tr>';
   }
	var table = $("#dataTable");
	table.text("");// 清空数据
	table.append(strHtml)	
}