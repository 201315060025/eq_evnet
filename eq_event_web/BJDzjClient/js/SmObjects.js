/*
 *  封装的对象模型
 */
function GetSmJSON(URL,PARAM,SUCCESSFUN){
	$.ajax({
		async:false,
		url: URL,
		type: "POST",
		dataType: "json",
		data: PARAM,
		contentType: "application/json; charset=utf-8",
		success: function (json) {
			SUCCESSFUN(json.d);
		},
		error: function (x, e) {
		}
	});
};
//哈希表
function SmHashtable(){
	this.Data = undefined;
	this.Init=function(url,param){
		var sf = this;
		GetSmJSON(url,param,function(txt){
			sf.Data = JSON.parse(txt);
		});
	};
	this.GetValue=function(field){
		var sf = this;
		for(var i in sf.Data){
			if(sf.Data[i].Key==field) return sf.Data[i].Value;
		}
		return "";
	};
};

//SmObjectData对象模型
function SmObjectData(tablename){
	this.ID=0;
	this.Key="";
	this.TableName=tablename;
	this.Data=undefined;
	this.Init=function(key,id){
		var sf = this;
		sf.Key = key;
		sf.ID=id;
		var url = DBCenterServiceUrl+"/Core.asmx/GetSmObjectData";
		var param = "{'tablename':'" + this.TableName + "','key':'" + this.Key + "','id':'" + this.ID + "'}";
		GetSmJSON(url,param,function(txt){
			sf.Data = JSON.parse(txt);
			sf.Data.DBAlias=sf.DBAlias;
			sf.Data.TableName=sf.TableName;
		});		
	};
	this.GetFirstSmObject=function(condition){
		var sf=this;
		var url = DBCenterServiceUrl+"/Core.asmx/GetFirstSmObject";
		var param = "{'tablename':'" + sf.TableName + "','condition':'" + condition + "'}";
		GetSmJSON(url,param,function(txt){
			sf.Data = JSON.parse(txt);
			sf.Data.DBAlias=sf.DBAlias;
			sf.Data.TableName=sf.TableName;
		});
	};
	this.GetValue=function(field){
		for(var i in this.Data.Data){
			if(this.Data.Data[i].Key==field) return this.Data.Data[i].Value;
		}
		return "";
	};
	this.SetValue=function(field,value){
		for(var i in this.Data.Data){
			if(this.Data.Data[i].Key==field){
				this.Data.Data[i].Value=value;
				return true;
			}
		}
		return false;
	};	
	this.Save=function(service,param1){//'a':'v','b':'v'
		var param = "{'json':'" + JSON.stringify(this.Data) + "'}";
		if(param1!=undefined){
			param = "{'json':'" + JSON.stringify(this.Data) + "',"+param1+"}";
		}
		var res = false;
		GetSmJSON(service,param,function(txt){
			res = JSON.parse(txt);
		});
		return res;
	};
	//通用的方法，把表和数据库别名加进去，后台统一保存，不用每个都写自己的服务
	this.Update=function(){
		var param = "{'json':'" + JSON.stringify(this.Data) + "'}";
		var res = false;
		service=DBCenterServiceUrl+"/Core.asmx/UpdateSmObject";
		GetSmJSON(service,param,function(txt){
			res = txt;
		});
		return res;
	};
	this.SaveEx=function(){
	    var param = "{'json':'" + JSON.stringify(this.Data) + "'}";
	    var res = false;
	    service=DBCenterServiceUrl+"/Core.asmx/SaveSmObject";
	    GetSmJSON(service,param,function(txt){
		    res = txt;
	    });
	    return res;
	};
};

//SmPageData对象模型
function SmPageData(dbalias,tablename){
	this.DBAlias=dbalias;
	this.TableName=tablename;
	this.Key="";
	this.Fields="*";
	this.Data=undefined;
	this.PageSize=5;
	this.PageIndex=1;
	this.Filter="";
	this.SelectedID=0;
	this.PageCount=1;
	this.RecordCount=1;
	this.ColumnCount=1;
	this.PageRecordCount=1;
	this.OrderBy = "";
	this.OrderByType = 0;
	this.InitEx=function()
	{
	    this.Init(this.Key,this.Fields,this.Filter);
	}
	//主键key,字段*,条件""
	this.Init=function(key,fields,filter,orderby,orderbytype){
		var sf = this;
		sf.Key=key;
		sf.Fields=fields;
		sf.Filter = filter;	
		if(orderby==undefined){
			sf.OrderBy = key;
		}
		else{
			sf.OrderBy = orderby;
		}
		if(orderbytype==undefined){
			sf.OrderByType=0;
		}
		else{
			sf.OrderByType=orderbytype;
		}
		var url = DBCenterServiceUrl+"/Core.asmx/GetSmPageData";
		var param1="{'filter':'"+sf.Filter+"',";
		param1+="'orderby':'"+sf.OrderBy+"',";
		param1+="'pagesize':'" + sf.PageSize + "',";
		param1+="'pageindex':'" + sf.PageIndex + "'"
		param1+="}";
		GetSmJSON(url,param1,function(txt){
			sf.Data = JSON.parse(txt);	
			if(sf.Data!=undefined){
				sf.PageCount = sf.Data.PageCount;
				sf.RecordCount = sf.Data.RecordCount;
				sf.ColumnCount = sf.Data.ColumnCount;
				sf.PageRecordCount=sf.Data.PageRecordCount;
			}
		});
	};
	this.GetKeyIndex=function(key){
	var self = this;
	if(self.Data!=undefined && self.ColumnCount>0)
	{
		for(var i=0;i<self.ColumnCount;i++){
			if(self.Data.Captions[i]==key) return i;
		}
	}
	return -1;
	};
	this.Refresh=function(){
		var sf = this;
		var url = DBCenterServiceUrl+"/Core.asmx/GetSmPageData";
		var param1="{'DBAlias':'"+sf.DBAlias+"',";
		param1+="'tablename':'"+sf.TableName+"',";
		param1+="'key':'"+sf.Key+"',";
		param1+="'selectfield':'"+sf.Fields+"',";
		param1+="'filter':'"+sf.Filter+"',";
		param1+="'orderby':'"+sf.OrderBy+"',";
		param1+="'orderbytype':'"+sf.OrderByType+"',";
		param1+="'pagesize':'" + sf.PageSize + "',";
		param1+="'pageindex':'" + sf.PageIndex + "'"
		param1+="}";
		GetSmJSON(url,param1,function(txt){
			sf.Data = JSON.parse(txt);	
			if(sf.Data!=undefined){
				sf.PageCount = sf.Data.PageCount;
				sf.RecordCount = sf.Data.RecordCount;
				sf.ColumnCount = sf.Data.ColumnCount;
				sf.PageRecordCount=sf.Data.PageRecordCount;
			}
		});
	};
	this.PageDown=function(){
		if(this.Data!=undefined){
			this.PageIndex++;
			if(this.PageIndex>this.Data.PageCount)
			{
				this.PageIndex=this.Data.PageCount;
			}
			this.Init(this.Key,this.Fields,this.Filter);
		}
	};
	this.PageUp=function(){
		if(this.Data!=undefined){
			this.PageIndex--;
			if(this.PageIndex<1)
			{
				this.PageIndex=1;
			}
			this.Init(this.Key,this.Fields,this.Filter);
		}
	};
	this.First=function(){
		if(this.Data!=undefined){
			this.PageIndex=1;
			this.Init(this.Key,this.Fields,this.Filter);
		}
	};
	this.Last=function(){
		if(this.Data!=undefined){
			this.PageIndex = this.Data.PageCount;
			this.Init(this.Key,this.Fields,this.Filter);
		}
	};
	
	this.Select=function(id){
		this.SelectedID = id;
		if(typeof this.OnSelect=="function"){
			this.OnSelect();
		}
	};
	this.GetSelectedSmObject=function(){
		 var obj = new SmObjectData(this.DBAlias,this.TableName);
		 obj.Init(this.Key,this.SelectedID);
		 return obj;
	};
	
};

//适合小数据量查询
function SmDataTable(){
	this.Data=undefined;
	this.RecordCount=0;
	this.ColumnCount=0;
	this.Init=function(sql){
		var sf = this;	
		var url = DBCenterServiceUrl+"/Core.asmx/GetSmDataTable";
	    var param1 = "{'sql':'"+sql+"'}";
		GetSmJSON(url,param1,function(txt){
			sf.Data = JSON.parse(txt);	
			if(sf.Data!=undefined){
				sf.RecordCount = sf.Data.Rows.length;
				sf.ColumnCount = sf.Data.Captions.length;
			}
		});
	};
	this.GetKeyIndex=function(key){
		var self = this;
		if(self.Data!=undefined && self.ColumnCount>0)
		{
			for(var i=0;i<self.ColumnCount;i++){
				if(self.Data.Captions[i]==key) return i;
			}
		}
		return -1;
	};
};

//SmConstClsList对象
function SmConstClsList(){
	this.Data=undefined;
	this.Init=function(types){
		var sf=this;
		var url = DBCenterServiceUrl+"/Core.asmx/GetMetaConstList";
		var param = "{'types':'"+types+"'}";
		GetSmJSON(url,param,function(txt){
			sf.Data = JSON.parse(txt);
		});
	};
	this.InitDA=function(types){
		var sf=this;
		var url = DBCenterServiceUrl+"/KZ_DA/DAWebService.asmx/GetMetaConstList";
		var param = "{'types':'"+types+"'}";
		GetSmJSON(url,param,function(txt){
			sf.Data = JSON.parse(txt);
		});
	// this.InitXZQ=function(xzqm){
		// var sf=this;
		// var url = DBCenterServiceUrl+"/Core.asmx/GetXZQConstList";
		// var param = "{'xzqm':'"+xzqm+"'}";
		// GetSmJSON(url,param,function(txt){
			// sf.Data = JSON.parse(txt);
		// });
	// };
	};
	//填充select控件,通过默认字典代码填充
	this.FillSelectHtml=function(select,type,defkey){
		var self=this;
		for(var x in self.Data.ConstClsList){
			var cc = self.Data.ConstClsList[x];
			if(cc.Type==type){
				var html="";
				for(y in cc.ConstList){
					var obj = cc.ConstList[y];
					if(obj.Key==""){
					  html+="<option value='"+obj.Key+"' mc='"+obj.Value+"' selected='true'></option>";
					}
					else if(defkey!="" && obj.Key==defkey){
						html+="<option value='"+obj.Key+"' mc='"+obj.Value+"' selected='true'>"+obj.Key+";"+obj.Value+"</option>";
					}
					else{
						html+="<option value='"+obj.Key+"' mc='"+obj.Value+"'>"+obj.Key+";"+obj.Value+"</option>";
					}
				}
				select.html(html);
				break;
			}
		}
	};
	//填充select控件,通过默认字典值填充
	this.FillSelectHtml2=function(select,type,defValue){
		var self=this;
		for(var x in self.Data.ConstClsList){
			var cc = self.Data.ConstClsList[x];
			if(cc.Type==type){
				var html="";
				for(var y in cc.ConstList){
					var obj = cc.ConstList[y];
					if(obj.Value==defValue){
						html+="<option value='"+obj.Key+"' mc='"+obj.Value+"' selected='true'>"+obj.Value+"</option>";
					}
					else{
						html+="<option value='"+obj.Key+"' mc='"+obj.Value+"'>"+obj.Value+"</option>";
					}
				}
				select.html(html);
				break;
			}
		}
	};
	//填充select控件行政区名称和代码
	// this.FillSelectHtml3=function(select,defkey){
		// var self=this;
		// var html="";
			// for(var y in self.Data.ConstList){
				// var obj = self.Data.ConstList[y];
				// if(obj.Key==defkey){
					// html+="<option value='"+obj.Key+"' mc='"+obj.Value+"' selected='true'>"+obj.Value+"</option>";
				// }
				// else{
					// html+="<option value='"+obj.Key+"' mc='"+obj.Value+"'>"+obj.Value+"</option>";
				// }
			// }
			// select.html(html);
			// break;
	// };
	this.GetValue=function(key,type)
    {
        var strresult="";
        if(this!=null)
        {
            var o=null;var ii=0;
            for(ii=0;ii<this.Data.ConstClsList.length;ii++)
            {
                if(this.Data.ConstClsList[ii].Type==type)
                {
                    o=this.Data.ConstClsList[ii];
                    break;
                }
            }
            if(o!=null)
            {
                for(ii=0;ii<o.ConstList.length;ii++)
                {
                    if(o.ConstList[ii].Key==key)
                    {
                        strresult=o.ConstList[ii].Value;
                        break;
                    }
                }
            }
        }
        return strresult;
    }
	
};

//用户登录
function SmWFStaff(){
	this.StaffID = 0;//用户ID
	this.StaffCode = "";//用户代码
	this.StaffName = "";//用户名
	this.IndexPage = YZTUrl+"/index.shtm";
	this.Pass=false;//是否登录成功
	
	//获取当前浏览器用户登录状态
	this.GetCurrentUser=function(){
		var sf = this;
		var url = WFServiceUrl+"/WFLogin.asmx/GetCurrentUser";
		var param = "{}";
		GetSmJSON(url,param,function(txt){
			var st = JSON.parse(txt);
			sf.StaffID = st.StaffID;
			sf.StaffCode = st.StaffCode;
			sf.StaffName = st.StaffName;
			sf.Pass = st.Pass;
		});
	};

	//业务页面检测，某一用户名是否登录,没有登录则返回到登录页
	this.CheckLogin=function(user){
		var sf = this;
		var url = WFServiceUrl+"/WFLogin.asmx/CheckLogin";
		var param = "{'user':'"+user+"'}";
		GetSmJSON(url,param,function(txt){
			var st = JSON.parse(txt);
			sf.StaffID = st.StaffID;
			sf.StaffCode = st.StaffCode;
			sf.StaffName = st.StaffName;
			sf.Pass = st.Pass;
		});
	};
	//登录页面，成功后进入一张图框架页
	this.Login=function(user,pwd){
		var sf = this;
		var url = WFServiceUrl+"/WFLogin.asmx/Login";
		var param = "{'user':'"+user+"','password':'" + pwd + "'}";
		GetSmJSON(url,param,function(txt){
			var st = JSON.parse(txt);
			sf.StaffID = st.StaffID;
			sf.StaffCode = st.StaffCode;
			sf.StaffName = st.StaffName;
			sf.Pass = st.Pass;
		});
	};
	//注销，返回到登录页
	this.LogOut=function(){
		var sf = this;
		var url = WFServiceUrl+"/WFLogin.asmx/LogOut";
		var param = "{'user':'"+sf.StaffCode+"'}";
		GetSmJSON(url,param,function(txt){
			sf.StaffID = 0;
			sf.StaffCode = "";
			sf.StaffName = "";
			sf.Pass = false;
		});
	};
	
	
}