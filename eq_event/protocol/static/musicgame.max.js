/*****************************************************/
/*                                 www.layabox.com   */
/*****************************************************/
(function(window,document){
	/************************************************/

	window.Laya || (window.Laya={});
	var LAYABOX=window.LAYABOX={
		initClass:function(_classs){for(var i=0,sz=_classs.length,o;i<sz;i++) {o=_classs[i];o.__init$__ && o.__init$__();}},
		bindid:1,
		substr:String.prototype.substr,
		runOnlyPlayer:false,
		regstaticattr:function(_class,def){for(var i=0,sz=def.length;i<sz;i+=2){if(def[i]=='length') _class.length=def[i+1].call(_class);else{function tmp(){var name=def[i];var getfn=def[i+1];Object.defineProperty(_class,name,{get:function(){delete this[name];return this[name]=getfn.call(this);},set:function(v){delete this[name];this[name]=v;},enumerable: true,configurable: true});}tmp();}}},
		_sortonNameArray2_:function(array,name,options){(options===void 0)&& (options=0);var name0=name[0],name1=name[1],type=1;if (options==(16 | 2))type=-1;return array.sort(function(a,b){if (b[name0]==a[name0]){return type *(a[name1]-b[name1]);}else return type *(a[name0]-b[name0]);});},
		_sortonNameArray_:function(array,name,options){(options===void 0)&& (options=0);var name0=name[0],type=1;if (options==(16 | 2))type=-1;return array.sort(function(a,b){if (b[name0]==a[name0]){for (var i=1,sz=name.length;i < sz;i++){var tmp=name[i];if (b[tmp]!=a[tmp])return type *(a[tmp]-b[tmp]);}return 0;}else return type *(a[name0]-b[name0]);});},
		newVector:function(sz,value){var d=[];d.length=sz;for(var i=0;i<sz;i++) d[i]=value;return d;},
		sortOn:function(name,options){
			if(name instanceof Function) return this.sort(name);
			if((name instanceof Array)){
				if(name.length==0)return this;
				if(name.length==2)return LAYABOX._sortonNameArray2_(this,name,options);
				if(name.length>2)return LAYABOX._sortonNameArray_(this,name,options);name=name[0];
			}
			if (options==16)return this.sort(function(a,b){return a[name]-b[name];});
			if (options==2)return this.sort(function(a,b){return b[name]-a[name];});
			if (options==(16 | 2))return this.sort(function(a,b){return b[name]-a[name];});
			if (options==1) return this.sort();
			return this.sort(function(a,b){return a[name]-b[name];});
		},
		defSomeUnEnumPty:function(obj,names){for(var i=0;i<names.length;i++) LAYABOX.defUnEnumPty(obj,names[i]);		},
		_propertyVar_:{writable: true,enumerable: false,configurable: true},
		defUnEnumPty:function(obj,name,value){if(arguments.length<3) value=obj[name];LAYABOX._propertyVar_.value=value;Object.defineProperty(obj, name, LAYABOX._propertyVar_);return value;},
		parseInt:function(value,radix){return !value?0:(radix==null?parseInt(value):parseInt(value,radix));},
		ENABLE3D:false,
		classmap:[],
		internals:[],
		arraypresort:Array.prototype.sort,
		arraysort:function(value){if(value==16) return LAYABOX.arraypresort.call(this,function (a, b) {return a - b;});if(value==(16|2)) return LAYABOX.arraypresort.call(this,function (a, b) {return b - a;});if(value==1) return LAYABOX.arraypresort.call(this);return LAYABOX.arraypresort.call(this,value);},
		systemClass:{'object':'Object','array':'Array','string':'String','dictionary':'Dictionary'},
		extend:function(d,b){
			for (var p in b){
				if (!b.hasOwnProperty(p)) continue;
				var g = b.__lookupGetter__(p), s = b.__lookupSetter__(p); 
				if ( g || s ) {
					if ( g )
						d.__defineGetter__(p, g);
					if ( s )
						d.__defineSetter__(p, s);
				} else
					d[p] = b[p];
				}
			function __() { DEFUNENUMPTY$(this,'constructor',d); }__.prototype=b.prototype;d.prototype=new __();DEFUNENUMPTY$(d.prototype,'__implements__',LAYABOX._copy_({},b.prototype.__implements__));
		},
		typeof:function(o,value){if(!o || !value) return false;if(value==String) return (typeof o=='string');if(value==Number) return (typeof o=='number');if(value.__interface__) value=value.__interface__;else if(typeof value!='string')  return (o instanceof value);return (o.__implements__ && o.__implements__[value]) || (o.__class__==value);},
		typeAs:function(value,type){return (this.typeof(value,type))?value:null;},
		isClass:function(o){return o && (o.__isclass__ || o==Object || o==String || o==Array);},
		_copy_:function(dec,src){if(!src) return null;dec=dec||{};for(var i in src) dec[i]=src[i];return dec;},
		implements:function(dec,src){if(!src) return null;var d=dec.__implements__|| DEFUNENUMPTY$(dec,'__implements__',{});for(var i in src){d[i]=src[i];var c=i;while((c=this.internals[c]) && (c=c.extend) ){c=c.self;d[c]=true;}}},
		classHasOwnProperty:function(name,o){if(Object.hasOwnProperty.call(o.prototype,name)) return true;return o.prototype.__super__==null?null:LAYABOX.classHasOwnProperty(name,o.prototype.__super__);},
		hasOwnProperty:function(name,o){o=o ||this;return (Object.hasOwnProperty.call(o,name)) || LAYABOX.classHasOwnProperty(name,o.__class__);},
		createOnePackage:function(name,o){
			var p=window;
			var words=name.split('.');
			if(words.length>1){
				for(var i=0,sz=words.length-1;i<sz;i++){
					var c=p[words[i]];
					p=c?c:(p[words[i]]={});
				}
			}
			p[words[words.length-1]] || (p[words[words.length-1]]=o);
		},
		regClass:function(o,fullName,_super,miniName){fullName && LAYABOX.createOnePackage(fullName,o);DEFUNENUMPTY$(o,'__$INIT__',function(){});_super && LAYABOX.extend(o,_super);fullName && (LAYABOX.classmap[fullName]=o);_super && DEFUNENUMPTY$(o.prototype,'__super__',_super);DEFUNENUMPTY$(o.prototype,'hasOwnProperty',LAYABOX.hasOwnProperty);DEFUNENUMPTY$(o.prototype,'__class__',o);DEFUNENUMPTY$(o.prototype,'__className__',fullName);DEFUNENUMPTY$(o,'_SUPERC_',_super);DEFUNENUMPTY$(o,'__className__',fullName);DEFUNENUMPTY$(o,'__isclass__',true);if(fullName){var paths=fullName.split('.');miniName=miniName || paths[paths.length-1];window.Laya[miniName]=o;};},
		interface:function(name,_super){var a=this.internals[name]=this.internals[name] || {};a.self=name;if(_super)a.extend=this.internals[_super]=this.internals[_super] || {};var words=name.split('.');var o=window;for(var i=0;i<words.length-1;i++) o=o[words[i]];o[words[words.length-1]]={__interface__:name};},
		createPackage:function(classs,module){for(var s=0;s<classs.length;s++){var strs=classs[s].split('.');p=module;n=strs[0];$modulethis[n]=$modulethis[n]||{};module[n]=$modulethis[n];for(var i=0,sz=strs.length;i<sz;i++) {n=strs[i];p=p[n]?p[n]:(p[n]={});}}},
		regGetSet:function(isStatic,o,name,getfn,setfn){
			if(!isStatic){
				getfn && LAYABOX.defUnEnumPty(o,'_$get_'+name,getfn);
				setfn && LAYABOX.defUnEnumPty(o,'_$set_'+name,setfn);
			}
			else{
				getfn && (o['_$GET_'+name]=getfn);
				setfn && (o['_$SET_'+name]=setfn);
			}
			if(getfn && setfn) Object.defineProperty(o,name,{get:getfn,set:setfn,enumerable:false});
			else{
				getfn && Object.defineProperty(o,name,{get:getfn,enumerable:false});
				setfn && Object.defineProperty(o,name,{set:setfn,enumerable:false});
			}
		}
	}

    LAYABOX.self=this;
	var $modulethis=this;
	var DEFUNENUMPTY$=LAYABOX.defUnEnumPty;
	var UN$=LAYABOX.defUnEnumPty;
	var DEFSOMEUNENUMPTY$=LAYABOX.defSomeUnEnumPty;
	var STATICATTR$=LAYABOX.regstaticattr;
	var CLASS$=LAYABOX.regClass;
	var GETSET$=LAYABOX.regGetSet;
	var LAYAFNVOID=function(){};
	var LAYAFNSTR=function(){return '';}
	var LAYAFNNULL=function(){return null;}
	var LAYAFNTRUE=function(){return true;}
	var LAYAFNFALSE=function(){return false;}
	var LAYAFN0=function(){return 0;}
	var LAYAFNARRAY = function() { return []; }
	var GETEACH = function(a) { return a?a:[]; }
	var NEWVECTOR$=LAYABOX.newVector;
	
	window.console=window.console || ({log:function(){}});
	Error.prototype.throwError=function(){throw arguments;};
	(function(defs){for(var i=0;i<defs.length;i++)Object.defineProperty(Date.prototype,defs[i],{get:Date.prototype['get'+defs[i].charAt(0).toUpperCase()+defs[i].substr(1)]})})(['date','day','fullYear','hours','millseconds','minutes','month','seconds','time','timezoneOffset','dateUTC','dayUTC','fullYearUTC','hoursUTC'])
	Object.defineProperty(Date.prototype,'millisecondsUTC',{get:Date.prototype.getUTCMilliseconds,enumerable: false});
	Object.defineProperty(Date.prototype,'minutesUTC',{get:Date.prototype.getUTCMinutes,enumerable: false});
	Object.defineProperty(Date.prototype,'mouthUTC',{get:Date.prototype.getUTCMonth,enumerable: false});
	
	String.prototype.substr=function(ofs,sz){if(arguments.length==1)return LAYABOX.substr.call(this,ofs);if(sz<0) sz=this.length+sz;return LAYABOX.substr.call(this,ofs,sz);}
	Array.CASEINSENSITIVE = 1;	Array.DESCENDING = 2;	Array.NUMERIC = 16;	Array.RETURNINDEXEDARRAY = 8;	Array.UNIQUESORT = 4;
	Object.defineProperty(Array.prototype,'fixed',{enumerable: false});
	DEFUNENUMPTY$(Array.prototype,'sortOn',LAYABOX.sortOn);
	DEFUNENUMPTY$(Array.prototype,'sort',LAYABOX.arraysort);
	LAYABOX.classmap['Object']=Object;	LAYABOX.classmap['Function']=Function;	LAYABOX.classmap['Array']=Array;	LAYABOX.classmap['String']=String;
	LAYABOX.createPackage(['laya.ui','laya.asyn','laya.styles','laya.utils','laya.webgl.canvas.save','laya.net','laya.webgl.shader.d2.filters','laya.resource','laya.events','laya.renders','laya.maths','laya.webgl.text','laya.webgl.submit','laya.webgl.display','game.ui.musicRoot','laya.display.css','laya.filters.webgl','laya.system','laya.ani','laya.webgl.resource','laya.webgl.shapes','laya.webgl.utils','laya.webgl.shader.d2.value'],window);
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/ishape.as
	LAYABOX.interface('laya.webgl.shapes.IShape');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/isavedata.as
	LAYABOX.interface('laya.webgl.canvas.save.ISaveData');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/iselect.as
	LAYABOX.interface('laya.ui.ISelect');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/icomponent.as
	LAYABOX.interface('laya.ui.IComponent');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/filters/ifilteraction.as
	LAYABOX.interface('laya.filters.IFilterAction');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/renders/isubmit.as
	LAYABOX.interface('laya.renders.ISubmit');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/iitem.as
	LAYABOX.interface('laya.ui.IItem');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/ilayout.as
	LAYABOX.interface('laya.display.ILayout');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/filters/ifilter.as
	LAYABOX.interface('laya.filters.IFilter');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/resource/igltextur.as
	LAYABOX.interface('laya.resource.IGLTextur');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/irender.as
	LAYABOX.interface('laya.ui.IRender');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/ibox.as
	LAYABOX.interface('laya.ui.IBox','IComponent');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/filters/ifilteractiongl.as
	LAYABOX.interface('laya.filters.IFilterActionGL','laya.filters.IFilterAction');
	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/await.as
	var await=Laya.await=function(caller,fn,nextLine){
		Asyn._caller_=caller;
		Asyn._callback_=fn;
		Asyn._nextLine_=nextLine;
	}


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/wait.as
	var wait=Laya.wait=function(conditions){
		return Asyn.wait(conditions);
	}


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/sleep.as
	var sleep=Laya.sleep=function(value){
		Asyn.sleep(value);
	}


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/load.as
	var load=Laya.load=function(url,type){
		return Asyn.load(url,type);
	}


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya.as
	/**
	*全局引用入口
	*@author yung
	*/
	//class Laya
	var ___Laya=(function(){
		function Laya(){};
		for(var i in window.Laya)Laya[i]=window.Laya[i];window.Laya=Laya;
		/**是否捕获全局错误并弹出提示*/
		GETSET$(1,Laya,'alertGlobalError',null,function(value){
			var erralert=0;
			if (value){
				Browser.window.onerror=function (msg,url,line){
					if(erralert++<5)alert("[Error] "+msg+"\n[Url] "+url+"\n[Line] "+line);
				}
				}else {
				Browser.window.onerror=null;
			}
		});

		Laya.init=function(width,height){
			Font.__init__();
			Style.__init__();
			Laya.stage=new Stage();
			URL.rootPath=URL.basePath=URL.getPath(Browser.window.location.href);
			Laya.initAsyn();
			Laya.render=new Render(width,height);
			Laya.stage.size(width,height);
			RenderSprite.__init__();
			KeyBoardManager.__init__();
			MouseManager.instance.__init__();
		}

		Laya.initAsyn=function(){
			Asyn.loadDo=function (url,type,d){
				var l=new Loader();
				if (d){
					l.once(/*laya.events.Event.COMPLETE*/"complete",null,function(data){
						d.callback(data);
					});
					l.once(/*laya.events.Event.ERROR*/"error",null,function(err){
					});
				}
				l.load(url,type);
				return d;
			}
			Asyn.onceTimer=function (delay,d){
				Laya.timer.once(delay,d,d.callback);
			}
			Asyn.onceEvent=function (type,listener){
				Laya.stage.once(type,null,listener);
			}
			Laya.timer.frameLoop(1,null,Asyn._loop_);
		}

		Laya.stage=null;
		Laya.render=null
		STATICATTR$(Laya,
		['timer',function(){return this.timer=new Timer();},'loader',function(){return this.loader=new LoaderManager();}
		]);
		return Laya;
	})()


	//file:///f:/solutions/layaboxsolution/musicgame/src/blls/basekey.as
	/**
	*...
	*@author wangn
	*/
	//class blls.BaseKey
	var BaseKey=(function(){
		function BaseKey(){
			this.m_baseView=null;
			this.m_nLayoutCol=0;
			this.m_nLayoutRow=0;
			this.m_btn=null;
			this.m_beatData=null;
			this.m_btn=new Button;
			this.m_btn.on(/*laya.events.Event.CLICK*/"click",this,this.onClicked);
		}

		CLASS$(BaseKey,'blls.BaseKey');
		var __proto__=BaseKey.prototype;
		//处理点击事件
		__proto__.onClicked=function(e){
			this.m_baseView.OnKeyClicked(this);
		}

		GETSET$(0,__proto__,'beatData',function(){
			return this.m_beatData;
			},function(value){
			this.m_beatData=value;
		});

		GETSET$(0,__proto__,'btn',function(){
			return this.m_btn;
			},function(value){
			this.m_btn=value;
		});

		GETSET$(0,__proto__,'baseView',function(){
			return this.m_baseView;
			},function(value){
			this.m_baseView=value;
		});

		GETSET$(0,__proto__,'nLayoutRow',function(){
			return this.m_nLayoutRow;
			},function(value){
			this.m_nLayoutRow=value;
		});

		GETSET$(0,__proto__,'nLayoutCol',function(){
			return this.m_nLayoutCol;
			},function(value){
			this.m_nLayoutCol=value;
		});

		return BaseKey;
	})()


	//file:///f:/solutions/layaboxsolution/musicgame/src/blls/basepattern.as
	/**
	*...
	*@author wangn
	*/
	//class blls.BasePattern
	var BasePattern=(function(){
		function BasePattern(){
			this.uiInstance=null;
			Laya.init(640,1136);
			Laya.loader.load("comp.json",new Handler(this,this.onLoaded),null,/*laya.net.Loader.ATLAS*/"atlas");
		}

		CLASS$(BasePattern,'blls.BasePattern');
		var __proto__=BasePattern.prototype;
		__proto__.onLoaded=function(){
			this.InitView();
		}

		//初始化ui
		__proto__.InitView=function(){
			this.uiInstance=new MainView;
			Laya.stage.addChild(this.uiInstance);
			this.uiInstance.InitConfigData();
		}

		return BasePattern;
	})()


	//file:///f:/solutions/layaboxsolution/musicgame/src/dal/musicdataconfig.as
	/**
	*...
	*@author wangn
	*/
	//class dal.MusicDataConfig
	var MusicDataConfig=(function(){
		function MusicDataConfig(){
			this.m_beatDelta=0;
			this.m_beatType=0;
			this.m_listBlock=null;
		}

		CLASS$(MusicDataConfig,'dal.MusicDataConfig');
		var __proto__=MusicDataConfig.prototype;
		__proto__.LoadXML=function(){
			Laya.loader.load("bell.json",new Handler(this,this.onLoaded),null,/*laya.net.Loader.JSOn*/"json");
		}

		__proto__.onLoaded=function(){
			var index=1;
			this.m_listBlock=new Dictionary;
			var configJson=Laya.loader.getRes("bell.json");
			var beatDelta=configJson["PinaoBlocks"]["-BeatDelta"];
			var beatType=configJson["PinaoBlocks"]["-BeatType"];
			for (var name in configJson){
				if (name=="PinaoBlocks"){
					var pbs=configJson[name];
					for (var name1 in pbs){
						if (name1=="-BeatDelta"){
							this.m_beatDelta=parseFloat(pbs[name1]);
						}
						else if (name1=="-BeatType"){
							this.m_beatType=LAYABOX.parseInt(pbs[name1]);
						}
						else if (name1=="PinaoBlock"){
							var pb=pbs["PinaoBlock"];
							var cd;
							/*for each*/for(var $each_cd in pb){
								cd=pb[$each_cd];
								var chordList=this.parseChord(cd["PinaoChord"]);
								var cd;
								/*for each*/for(var $each_cd in chordList.elements){
									cd=chordList.elements[$each_cd];
									this.m_listBlock.set(index++,cd);
								}
							}
						}
					}
				}
			}
			console.log("load config finished");
		}

		__proto__.parseChord=function(root){
			var indexCD=1;
			var listChord=new Dictionary;
			if ((root instanceof Array)){
				var pk;
				/*for each*/for(var $each_pk in root){
					pk=root[$each_pk];
					var newpc=new PinaoChord;
					newpc.listKeys=new Dictionary;
					var indexKey=1;
					newpc.time=pk["-beattime"];
					if (((pk["PinaoKey"])instanceof Array)){
						var pkinner;
						/*for each*/for(var $each_pkinner in pk["PinaoKey"]){
							pkinner=pk["PinaoKey"][$each_pkinner];
							newpc.listKeys.set(indexKey++,pkinner);
						}
					}
					else{
						newpc.listKeys.set(indexKey++,pk["PinaoKey"]);
					}
					listChord.set(indexCD++,newpc);
				}
			}
			else{
				var newpc=new PinaoChord;
				newpc.listKeys=new Dictionary;
				var indexKey=1;
				newpc.time=root["-beattime"];
				if (((root["PinaoKey"])instanceof Array)){
					var pkinner;
					/*for each*/for(var $each_pkinner in root["PinaoKey"]){
						pkinner=root["PinaoKey"][$each_pkinner];
						newpc.listKeys.set(indexKey++,pkinner);
					}
				}
				else{
					newpc.listKeys.set(indexKey++,root["PinaoKey"]);
				}
				listChord.set(indexCD++,newpc);
			}
			return listChord;
		}

		GETSET$(0,__proto__,'beatDelta',function(){
			return this.m_beatDelta;
			},function(value){
			this.m_beatDelta=value;
		});

		GETSET$(0,__proto__,'listBlock',function(){
			return this.m_listBlock;
			},function(value){
			this.m_listBlock=value;
		});

		GETSET$(0,__proto__,'beatType',function(){
			return this.m_beatType;
			},function(value){
			this.m_beatType=value;
		});

		return MusicDataConfig;
	})()


	//file:///f:/solutions/layaboxsolution/musicgame/src/entity/pinaochord.as
	/**
	*...
	*@author wangn
	*/
	//class entity.PinaoChord
	var PinaoChord=(function(){
		function PinaoChord(){
			this.m_listKeys=null;
			this.m_time=NaN;
		}

		CLASS$(PinaoChord,'entity.PinaoChord');
		var __proto__=PinaoChord.prototype;
		GETSET$(0,__proto__,'listKeys',function(){
			return this.m_listKeys;
			},function(value){
			this.m_listKeys=value;
		});

		GETSET$(0,__proto__,'time',function(){
			return this.m_time;
			},function(value){
			this.m_time=value;
		});

		return PinaoChord;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/events/eventdispatcher.as
	/**
	*事件调度类
	*@author yung
	*/
	//class laya.events.EventDispatcher
	var EventDispatcher=(function(){
		function EventDispatcher(){
			this._events=null;
		}

		CLASS$(EventDispatcher,'laya.events.EventDispatcher');
		var __proto__=EventDispatcher.prototype;
		/**
		*是否有某种事件监听
		*@param type 事件名称
		*@return 是否有某种事件监听
		*/
		__proto__.hasListener=function(type){
			var listener=this._events && this._events[type];
			return !!listener;
		}

		/**
		*发送事件
		*@param type 事件类型
		*@param data 回调数据，可以是单数据或者Array
		*@return 如果没有监听者，则返回false，否则true
		*/
		__proto__.event=function(type,data){
			if (!this._events || !this._events[type])return false;
			var listeners=this._events[type];
			if (listeners.run){
				if (listeners.once)this.off(type,listeners.caller,listeners.method,true);
				listeners.runWith(data);
				}else {
				for (var i=0,n=listeners.length;i < n;i++){
					var listener=listeners[i];
					if (listener.once)this.off(type,listener.caller,listener.method,true);
					listener.runWith(data);
				}
			}
			return true;
		}

		/**
		*增加事件监听
		*@param type 事件类型，可以参考Event类定义
		*@param caller 执行域(this域)，默认为监听对象的this域
		*@param listener 回调方法，如果为空，则移除所有type类型的事件监听
		*@param args 回调参数
		*@return 返回对象本身
		*/
		__proto__.on=function(type,caller,listener,args){
			return this._createListener(type,caller,listener,args,false);
		}

		/**
		*增加事件监听
		*@param type 事件类型，可以参考Event类定义
		*@param caller 执行域(this域)，默认为监听对象的this域
		*@param listener 回调方法，如果为空，则移除所有type类型的事件监听
		*@param args 回调参数
		*@return 返回对象本身
		*/
		__proto__.addEventListener=function(type,caller,listener,args){
			return this._createListener(type,caller,listener,args,false);
		}

		/**
		*增加一次性事件监听，执行后会自动移除监听
		*@param type 事件类型，可以参考Event类定义
		*@param caller 执行域(this域)，默认为监听对象的this域
		*@param listener 回调方法，如果为空，则移除所有type类型的事件监听
		*@param args 回调参数
		*@return 返回对象本身
		*/
		__proto__.once=function(type,caller,listener,args){
			return this._createListener(type,caller,listener,args,true);
		}

		__proto__._createListener=function(type,caller,listener,args,once){
			this.off(type,caller,listener,once);
			var handler=Handler.create(caller || this,listener,args,once);
			this._events || (this._events={});
			var events=this._events;
			if (!events[type])events[type]=handler;
			else {
				if (!events[type].run)events[type].push(handler);
				else events[type]=[events[type],handler];
			}
			return this;
		}

		/**
		*移除事件监听，同removeListener方法
		*@param type 事件类型，可以参考Event类定义
		*@param caller 执行域(this域)，默认为监听对象的this域
		*@param listener 回调方法，如果为空，则移除所有type类型的事件监听
		*@param onceOnly 是否只移除once监听，默认为false
		*@return 返回对象本身
		*/
		__proto__.off=function(type,caller,listener,onceOnly){
			(onceOnly===void 0)&& (onceOnly=false);
			if (!this._events || !this._events[type])return this;
			var listeners=this._events[type],events;
			if (listener !=null){
				events=[];
				if (listeners.run){
					if (listeners.method!==listener || (onceOnly && !listeners.once)|| (caller && listeners.caller!==caller)){
						events.push(listeners);
						}else if (!onceOnly){
						listeners.recover();
					}
					}else {
					for (var i=0,n=listeners.length;i < n;i++){
						var item=listeners[i];
						if (item.method!==listener || (onceOnly && !item.once)|| (caller && item.caller!==caller)){
							events.push(item);
							}else if (!onceOnly){
							item.recover();
						}
					}
				}
			}
			if (events && events.length){
				this._events[type]=events.length===1 ? events[0] :events;
				}else {
				delete this._events[type];
			}
			return this;
		}

		/**
		*移除事件监听，同off方法
		*@param type 事件类型，可以参考Event类定义
		*@param caller 执行域(this域)，默认为监听对象的this域
		*@param listener 回调方法，如果为空，则移除所有type类型的事件监听
		*@param onceOnly 是否只移除once监听，默认为false
		*@return 返回对象本身
		*/
		__proto__.removeEventListener=function(type,caller,listener,onceOnly){
			(onceOnly===void 0)&& (onceOnly=false);
			return this.off(type,caller,listener,onceOnly);
		}

		/**
		*移除某类型所有事件监听，同removeAllListeners方法
		*@param type 事件类型，如果为空，则移除本对象所有事件监听
		*@return 返回对象本身
		*/
		__proto__.offAll=function(type){
			var events=this._events;
			if (!events)return this;
			if (type){
				this.recoverHandlers(events[type]);
				delete events[type];
				}else {
				for (var name in events){
					this.recoverHandlers(events[name]);
				}
				this._events=null;
			}
			return this;
		}

		__proto__.recoverHandlers=function(arr){
			if (arr.run){
				arr.recover();
				}else {
				for (var i=arr.length-1;i >-1;i--){
					arr[i].recover();
				}
			}
		}

		/**
		*移除某类型所有事件监听，同offAll方法
		*@param type 事件类型，如果为空，则移除本对象所有事件监听
		*@return 返回对象本身
		*/
		__proto__.removeAllListeners=function(type){
			return this.offAll(type);
		}

		/**
		*是否是鼠标事件
		*@param type 事件类型
		*@return 是否鼠标事件
		*/
		__proto__.isMouseEvent=function(type){
			return EventDispatcher.MOUSE_EVENTS[type];
		}

		EventDispatcher.MOUSE_EVENTS={"rightmousedown":true,"rightmouseup":true,"rightclick":true,"mousedown":true,"mouseup":true,"mousemove":true,"mouseover":true,"mouseout":true,"click":true,"doubleclick":true,"touchstart":true,"touchend":true,"touchmove":true};
		return EventDispatcher;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/config.as
	/**
	*...
	*@author laya
	*/
	//class Config
	var Config=(function(){
		function Config(){};
		CLASS$(Config,'Config');
		Config.FRAME_FAST="fast";
		Config.FRAME_SLOW="slow";
		Config.FRAME_AUTO="auto";
		Config.frameRate="fast";
		Config.CPUMemoryLimit=120 *1024 *1024;
		Config.GPUMemoryLimit=160 *1024 *1024;
		return Config;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/ani/aniplayerctrl.as
	/**
	*...
	*@author laya
	*/
	//class laya.ani.AniPlayerCtrl
	var AniPlayerCtrl=(function(){
		function AniPlayerCtrl(){
			this.currentFrame=-1;
			this.startTime=0;
			this.duration=-1;
			this.speed=1;
			this.isPlaying=false;
			this.repeat=true;
		}

		CLASS$(AniPlayerCtrl,'laya.ani.AniPlayerCtrl');
		var __proto__=AniPlayerCtrl.prototype;
		__proto__.play=function(now,defer){
			this.startTime=now+defer;
			this.duration=0;
			this.isPlaying=true;
		}

		__proto__.stop=function(now){
			this.duration=now-this.startTime;
			this.isPlaying=false;
		}

		return AniPlayerCtrl;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/ani/keyframesanitemplet.as
	//class laya.ani.KeyframesAniTemplet
	var KeyframesAniTemplet=(function(){
		function KeyframesAniTemplet(){
			//this._keyframeDataCount=0;
			this._aniMap={};
			//this._publicExtData=null;
			//this._useParent=false;
			this._interpolationMethod=[];
			this._bonesDataCache=[];
			//this.curBonesData=null;
			this.curFrameIndex=-1;
			this._anis=new Array;
		}

		CLASS$(KeyframesAniTemplet,'laya.ani.KeyframesAniTemplet');
		var __proto__=KeyframesAniTemplet.prototype;
		__proto__.complete=function(){
			return this._anis.length > 0;
		}

		__proto__.parse=function(data){
			var i=0,j=0,k=0,l=0,n=0;
			var read=new Byte(data);
			var head=read.readUTFString();
			var aniClassName=read.readUTFString();
			var strList=read.readUTFString().split("\n");
			var aniCount=read.getUint8();
			var keyframeDataCount=this._keyframeDataCount=read.getUint8();
			this._interpolationMethod.length=keyframeDataCount;
			for (i=0;i < keyframeDataCount;i++){
				this._interpolationMethod[i]=KeyframesAniTemplet.interpolation[read.getUint8()];
			};
			var publicExtDataPos=read.getUint32();
			if (publicExtDataPos > 0)
				this._publicExtData=data.slice(publicExtDataPos,data.byteLength);
			this._useParent=!!read.getUint8();
			this._anis.length=aniCount;
			for (i=0;i < aniCount;i++){
				var ani=this._anis[i]=
				{};
				ani.bone=new Array;
				var name=ani.name=strList[read.getUint8()];
				this._aniMap[name]=i;
				ani.bone3DMap={};
				ani.playTime=read.getFloat32();
				var boneCount=ani.bone.length=read.getUint8();
				for (j=0;j < boneCount;j++){
					var bone3D=ani.bone[j]=
					{};
					bone3D.childs=[];
					var nameIndex=read.getInt16();
					if (nameIndex >=0){
						bone3D.name=strList[nameIndex];
						ani.bone3DMap[bone3D.name]=bone3D;
					}
					bone3D.keyFrame=new Array;
					bone3D.parentIndex=read.getUint16();
					bone3D.parent=ani.bone[bone3D.parentIndex];
					if (bone3D.parent !=null)
						bone3D.parent.childs.push(bone3D);
					var privateDataLen=read.getUint16();
					if (privateDataLen > 0){
						bone3D.elseData=data.slice(read.pos,privateDataLen);
						read.pos+=privateDataLen;
					};
					var keyframeCount=read.getUint16();
					bone3D.keyFrame.length=keyframeCount;
					var startTime=0;
					for (k=0,n=keyframeCount;k < n;k++){
						var keyFrame=bone3D.keyFrame[k]=
						{};
						var duration=keyFrame.duration=read.getFloat32();
						keyFrame.startTime=startTime;
						keyFrame.data=new Float32Array(keyframeDataCount);
						keyFrame.dData=new Float32Array(keyframeDataCount);
						keyFrame.nextData=new Float32Array(keyframeDataCount);
						for (l=0;l < keyframeDataCount;l++){
							keyFrame.data[l]=read.getFloat32();
							if (keyFrame.data[l] >-0.00000001 && keyFrame.data[l] < 0.00000001)keyFrame.data[l]=0;
						}
						startTime+=keyFrame.duration;
					}
					bone3D.playTime=startTime;
					this._calculateKeyFrame(bone3D,keyframeCount,keyframeDataCount);
					this._calculateKeyFrameIndex(bone3D);
				}
			}
		}

		__proto__._calculateKeyFrame=function(bone3D,keyframeCount,keyframeDataCount){
			var keyFrames=bone3D.keyFrame;
			keyFrames[keyframeCount]=keyFrames[0];
			for (var i=0;i < keyframeCount;i++){
				var keyFrame=keyFrames[i];
				for (var j=0;j < keyframeDataCount;j++){
					keyFrame.dData[j]=(keyFrames[i+1].data[j]-keyFrame.data[j])/ keyFrame.duration;
					keyFrame.nextData[j]=keyFrames[i+1].data[j];
				}
			}
			keyFrames.length--;
		}

		__proto__._calculateKeyFrameIndex=function(bone3D){
			var frameInterval=1000 / 60;
			bone3D.frameCount=Math.floor(bone3D.playTime / frameInterval);
			bone3D.fullFrame=new Uint16Array(bone3D.frameCount+1);
			for (var i=0,n=bone3D.keyFrame.length;i < n;i++){
				var keyFrame=bone3D.keyFrame[i];
				var tm=keyFrame.startTime;
				var endTm=tm+keyFrame.duration+frameInterval;
				do{
					bone3D.fullFrame[Math.floor(tm / frameInterval+0.5)]=i;
					tm+=frameInterval;
				}while (tm <=endTm);
			}
		}

		__proto__.getAniDuration=function(aniIndex){
			return this._anis[aniIndex].playTime;
		}

		__proto__.getBones=function(aniIndex){
			return this._anis[aniIndex].bone;
		}

		__proto__.getBoneWithName=function(aniIndex,name){
			return this._anis[aniIndex].bone3DMap[name];
		}

		__proto__.getBoneCount=function(aniIndex){
			return this._anis[aniIndex].bone.length;
		}

		__proto__.getKeyframeDataCount=function(){
			return this._keyframeDataCount;
		}

		__proto__.getPublicExtData=function(){
			return this._publicExtData;
		}

		__proto__.getBonesDataWithCache=function(aniIndex,curIndex){
			var cache=this._bonesDataCache[aniIndex];
			return cache?cache[curIndex]:null;
		}

		__proto__.setBonesDataWithCache=function(aniIndex,curIndex,data){
			var cache=this._bonesDataCache[aniIndex];
			cache || (cache=this._bonesDataCache[aniIndex]=[],cache.length=30);
			cache[curIndex] || (cache[curIndex]=new Float32Array(data.length));
			cache[curIndex].set(data,0);
		}

		__proto__.getData=function(aniIndex,out,curTime){
			var oneAni=this._anis[aniIndex];
			var bones=oneAni.bone;
			var keyframeDataCount=this._keyframeDataCount;
			var frameInterval=1000 / 60;
			var interpolationMethod=this._interpolationMethod;
			if (out.length !=keyframeDataCount *bones.length)
				out=new Float32Array(keyframeDataCount *bones.length);
			var j=0;
			for (var i=0,n=bones.length,outOfs=0;i < n;i++){
				var bone=bones[i];
				var playCurTime=curTime % bone.playTime;
				var frameInex=Math.floor(playCurTime / frameInterval);
				var key=bone.keyFrame[bone.fullFrame[frameInex]];
				bone.dataOffset=outOfs;
				var dt=playCurTime-key.startTime;
				for (j=0;j < keyframeDataCount;){
					j+=interpolationMethod[j](bone,j,out,outOfs+j,key.data,dt,key.dData,key.duration,key.nextData);
				}
				outOfs+=keyframeDataCount;
			}
			return out;
		}

		KeyframesAniTemplet._LinearInterpolation_0=function(bone,index,out,outOfs,data,dt,dData,duration,nextData){
			out[outOfs]=data[index]+dt *dData[index];
			return 1;
		}

		KeyframesAniTemplet._AngleInterpolation_2=function(bone,index,out,outOfs,data,dt,dData,duration,nextData){
			return 0;
		}

		KeyframesAniTemplet._RadiansInterpolation_3=function(bone,index,out,outOfs,data,dt,dData,duration,nextData){
			return 0;
		}

		KeyframesAniTemplet.interpolation=[KeyframesAniTemplet._LinearInterpolation_0,null,KeyframesAniTemplet._AngleInterpolation_2,KeyframesAniTemplet._RadiansInterpolation_3,null];
		return KeyframesAniTemplet;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/asyn/asyn.as
	/**
	*...
	*@author laya
	*/
	//class laya.asyn.Asyn
	var Asyn=(function(){
		function Asyn(){};
		CLASS$(Asyn,'laya.asyn.Asyn');
		Asyn.wait=function(conditions){
			var d=new Deferred();
			if (conditions.indexOf("event:")==0){
				Asyn.onceEvent(conditions.substr(8),function(){
					d.callback();
				});
				return null;
			}
			d.loopIndex=Asyn._loopCount;
			return Asyn._Deferreds[conditions]=d;
		}

		Asyn.callLater=function(d){
			Asyn._callLater.push(d);
		}

		Asyn.notify=function(conditions,value){
			var o=Asyn._Deferreds[conditions];
			if (o){
				Asyn._Deferreds[conditions]=null;
				o.callback(value);
			}
		}

		Asyn.load=function(url,type){
			return Asyn.loadDo(url,type,new Deferred());
		}

		Asyn.sleep=function(delay){
			if (delay < 1){
				if (Asyn._loopsCount >=Asyn.loops[Asyn._loopsIndex].length){
					Asyn._loopsCount++;
					Asyn.loops[Asyn._loopsIndex].push(new Deferred());
					}else {
					var d=Asyn.loops[Asyn._loopsIndex][Asyn._loopsCount];
					d._reset();
					Asyn._loopsCount++;
				}
				return;
			}
			Asyn.onceTimer(delay,new Deferred());
		}

		Asyn._loop_=function(){
			Deferred._TIMECOUNT_++;
			Asyn._loopCount++;
			var sz=0;
			if ((sz=Asyn._loopsCount)> 0){
				var _loops=Asyn.loops[Asyn._loopsIndex];
				Asyn._loopsCount=0;
				Asyn._loopsIndex=(Asyn._loopsIndex+1)% 2;
				for (var i=0;i < sz;i++)
				_loops[i].callback();
			}
			if ((sz=Asyn._callLater.length)> 0){
				var accept=Asyn._callLater;
				Asyn._callLater=[];
				for (i=0,sz=accept.length;i < sz;i++){
					var d=accept[i];
					d.callback();
				}
			}
		}

		Asyn._Deferreds={};
		Asyn.loops=[[],[]];
		Asyn._loopsIndex=0;
		Asyn._loopCount=0;
		Asyn._loopsCount=0;
		Asyn._callLater=[];
		Asyn._waitFunctionId=0;
		Asyn.loadDo=null
		Asyn.onceEvent=null
		Asyn.onceTimer=null
		Asyn._caller_=null
		Asyn._callback_=null
		Asyn._nextLine_=0;
		return Asyn;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/asyn/deferred.as
	/**
	*...
	*@author laya
	*/
	//class laya.asyn.Deferred
	var Deferred=(function(){
		function Deferred(){
			this._caller=null;
			this._callback=null;
			this._nextLine=0;
			this._value=null;
			this._createTime=0;
			this._reset();
		}

		CLASS$(Deferred,'laya.asyn.Deferred');
		var __proto__=Deferred.prototype;
		__proto__.setValue=function(v){
			this._value=v;
		}

		__proto__.getValue=function(){
			return this._value;
		}

		__proto__._reset=function(){
			this._caller=Asyn._caller_;
			this._callback=Asyn._callback_;
			this._nextLine=Asyn._nextLine_;
			this._createTime=Deferred._TIMECOUNT_;
		}

		__proto__.callback=function(value){
			(arguments.length > 0)&& (this._value=value);
			if(this._createTime==Deferred._TIMECOUNT_)
				Asyn.callLater(this);
			else this._callback && this._callback.call(this._caller,this._nextLine);
		}

		__proto__.errback=function(value){
			(arguments.length>0)&& (this._value=value);
			this._callback && this._callback.call(this._caller,this._nextLine);
		}

		Deferred._TIMECOUNT_=0;
		return Deferred;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/css/style.as
	/*
	*元素样式
	*@author yung
	*/
	//class laya.display.css.Style
	var Style=(function(){
		function Style(){
			this._type=0;
			this.alpha=1;
			this.visible=true;
			//this.scrollRect=null;
			//this.blendMode=null;
			this._transform=Style._TRANSFORMEMPTY;
		}

		CLASS$(Style,'laya.display.css.Style');
		var __proto__=Style.prototype;
		__proto__.withTransform=function(){
			return this._transform===Style._TRANSFORMEMPTY;
		}

		__proto__.translate=function(x,y){
			this._transform===Style._TRANSFORMEMPTY && (this._transform=Style._createTransform());
			this._transform.translateX=x;
			this._transform.translateY=y;
		}

		__proto__.scale=function(x,y){
			this._transform===Style._TRANSFORMEMPTY && (this._transform=Style._createTransform());
			this._transform.scaleX=x;
			this._transform.scaleY=y;
		}

		__proto__.destroy=function(){
			this.scrollRect=null;
		}

		__proto__.widthed=function(sprite){
			return sprite.width > 0;
		}

		__proto__.render=function(sprite,context,x,y){}
		__proto__.getCSSStyle=function(){
			return CSSStyle.EMPTY;
		}

		__proto__._enableLayout=function(){
			return false;
		}

		GETSET$(0,__proto__,'block',function(){
			return (this._type & 0x1)!=0;
			},function(value){
			value ? (this._type |=0x1):(this._type &=(~0x1));
		});

		GETSET$(0,__proto__,'paddingTop',function(){
			return 0;
		});

		GETSET$(0,__proto__,'scaleX',function(){
			return this._transform.scaleX;
			},function(value){
			this._transform===Style._TRANSFORMEMPTY && (this._transform=Style._createTransform());
			this._transform.scaleX=value;
		});

		GETSET$(0,__proto__,'scaleY',function(){
			return this._transform.scaleY;
			},function(value){
			this._transform===Style._TRANSFORMEMPTY && (this._transform=Style._createTransform());
			this._transform.scaleY=value;
		});

		GETSET$(0,__proto__,'transform',function(){
			return this._transform;
			},function(value){
			(value==='none')&& (this._transform=Style._TRANSFORMEMPTY);
		});

		GETSET$(0,__proto__,'translateX',function(){
			return this._transform.translateX;
			},function(value){
			this._transform===Style._TRANSFORMEMPTY && (this._transform=Style._createTransform());
			this._transform.translateX=value;
		});

		GETSET$(0,__proto__,'translateY',function(){
			return this._transform.translateY;
			},function(value){
			this._transform===Style._TRANSFORMEMPTY && (this._transform=Style._createTransform());
			this._transform.translateY=value;
		});

		GETSET$(0,__proto__,'rotate',function(){
			return this._transform.rotate;
			},function(value){
			this._transform===Style._TRANSFORMEMPTY && (this._transform=Style._createTransform());
			this._transform.rotate=value;
		});

		GETSET$(0,__proto__,'absolute',function(){
			return true;
		});

		GETSET$(0,__proto__,'paddingLeft',function(){
			return 0;
		});

		Style._createTransform=function(){
			return {translateX:0,translateY:0,scaleX:1,scaleY:1,rotate:0 };
		}

		Style.__init__=function(){
			Style._TRANSFORMEMPTY=Style._createTransform();
			Style.EMPTY=new Style();
		}

		Style._TRANSFORMEMPTY=null;
		Style.EMPTY=null;
		Style._CSS_BLOCK=0x1;
		Style._DISPLAY_NONE=0x2;
		Style._ABSOLUTE=0x4;
		Style._WIDTH_SET=0x8;
		return Style;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/css/font.as
	/**
	*...
	*@author laya
	*/
	//class laya.display.css.Font
	var Font=(function(){
		function Font(src){
			this._type=0;
			this._weight=0;
			this._decoration=null;
			this._text=null;
			this.indent=0;
			this._color=Color.create(Font.defaultColor);
			this.family=Font.defaultFamily;
			this.stroke=Font._STROKE;
			this.size=Font.defaultSize;
			src && src!==Font.EMPTY && src.copyTo(this);
		}

		CLASS$(Font,'laya.display.css.Font');
		var __proto__=Font.prototype;
		__proto__.set=function(value){
			this._text=null;
			var strs=value.split(' ');
			for (var i=0,n=strs.length;i < n;i++){
				var str=strs[i];
				switch (str){
					case 'italic':
						this.italic=true;
						continue ;
					case 'bold':
						this.bold=true;
						continue ;
					}
				if (str.indexOf('px')> 0){
					this.size=LAYABOX.parseInt(str);
					this.family=strs[i+1];
					i++;
					continue ;
				}
			}
		}

		__proto__.toString=function(){
			if (this._text)
				return this._text;
			this._text=""
			this.italic && (this._text+="italic ");
			this.bold && (this._text+="bold ");
			return this._text+=this.size+"px "+this.family;
		}

		__proto__.copyTo=function(dec){
			dec._type=this._type;
			dec._text=this._text;
			dec._weight=this._weight;
			dec._color=this._color;
			dec.family=this.family;
			dec.stroke=this.stroke !=Font._STROKE ? this.stroke.slice():Font._STROKE;
			dec.indent=this.indent;
			dec.size=this.size;
		}

		GETSET$(0,__proto__,'color',function(){
			return this._color.strColor;
			},function(value){
			this._color=Color.create(value);
		});

		GETSET$(0,__proto__,'decoration',function(){
			return this._decoration ? this._decoration.value :"none";
			},function(value){
			var strs=value.split(' ');
			this._decoration || (this._decoration={});
			switch (strs[0]){
				case '_':
					this._decoration.type='underline'
					break ;
				case '-':
					this._decoration.type='line-through'
					break ;
				case 'overline':
					this._decoration.type='overline'
					break ;
				default :
					this._decoration.type=strs[0];
				}
			strs[1] && (this._decoration.color=Color.create(strs));
			this._decoration.value=value;
		});

		GETSET$(0,__proto__,'italic',function(){
			return (this._type & 0x200)!==0;
			},function(value){
			value ? (this._type |=0x200):(this._type &=~0x200);
		});

		GETSET$(0,__proto__,'bold',function(){
			return (this._type & 0x800)!==0;
			},function(value){
			value ? (this._type |=0x800):(this._type &=~0x800);
		});

		GETSET$(0,__proto__,'password',function(){
			return (this._type & 0x400)!==0;
			},function(value){
			value ? (this._type |=0x400):(this._type &=~0x400);
		});

		GETSET$(0,__proto__,'weight',function(){
			return ""+this._weight;
			},function(value){
			var weight=0;
			switch (value){
				case 'normal':
					break ;
				case 'bold':
					weight=700;
					break ;
				case 'bolder':
					weight=800;
					break ;
				case 'lighter':
					weight=100;
					break ;
				default :
					weight=LAYABOX.parseInt(value);
				}
			this._weight=weight;
			this._text=null;
		});

		Font.__init__=function(){
			Font.EMPTY=new Font(null);
		}

		Font.EMPTY=null
		Font.defaultColor="#000000";
		Font.defaultSize=12;
		Font.defaultFamily="Arial";
		Font._STROKE=[0,0];
		Font._ITALIC=0x200;
		Font._PASSWORD=0x400;
		Font._BOLD=0x800;
		return Font;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/graphics.as
	/**
	*绘图对象
	*@author yung
	*/
	//class laya.display.Graphics
	var Graphics=(function(){
		function Graphics(){
			this._one=null;
			this._cmds=null;
			this._temp=null;
			this._bounds=null;
			this._render=this._renderEmpty;
			this._render=this._renderEmpty;
		}

		CLASS$(Graphics,'laya.display.Graphics');
		var __proto__=Graphics.prototype;
		__proto__.destroy=function(){
			this.clear();
			this._temp=null;
			this._bounds=null;
		}

		__proto__.clear=function(){
			this._one=null;
			this._render=this._renderEmpty;
			this._cmds=null;
		}

		__proto__._isOnlyOne=function(){
			return !this._cmds || this._cmds.length===0;
		}

		/**
		*获取位置及宽高信息(比较耗，尽量少用)
		*/
		__proto__.getBounds=function(){
			return this._bounds=Rectangle.getWrapRec(this.getBoundPoints(),this._bounds);
		}

		__proto__.getBoundPoints=function(){
			var context=Render.context;
			var cmds=this._cmds;
			var rst;
			rst=this._temp || (this._temp=[]);
			rst.length=0;
			if (!cmds && this._one !=null){
				Graphics.getCmdRec(this._one,rst,context);
				return rst;
			}
			if (!cmds)return [];
			for (var i=0,n=cmds.length;i < n;i++){
				Graphics.getCmdRec(cmds[i],rst,context);
			}
			if (rst.length > 8)rst=GrahamScan.scanPList(rst);
			return rst;
		}

		__proto__.drawTexture=function(tex,x,y,width,height,m){
			(width===void 0)&& (width=0);
			(height===void 0)&& (height=0);
			var args=[tex,x,y,width,height,m];
			if (this._one==null){
				this._one=args;
				this._render=this._renderOneImg;
				}else {
				this._render=this._renderAll;
				(this._cmds || (this._cmds=[])).length===0 && this._cmds.push(this._one);
				this._cmds.push(args);
			}
			args.callee=m ? Render.context._drawTextureWithTransform :Render.context._drawTexture;
		}

		/*public function fillImage(img:Texture,x:Number,y:Number,width:Number,height:Number,repeat:Boolean=true):void {
		debugger;
	}*/


	__proto__.drawRenderTarget=function(tex,x,y,width,height){
		var mat=new Matrix(1,0,0,-1,0,height);
		this.drawTexture(tex,x,y,width,height,mat);
	}


	__proto__._saveToCmd=function(fun,args){
		if (this._one==null){
			this._one=args;
			this._render=this._renderOne;
			}else {
			this._render=this._renderAll;
			(this._cmds || (this._cmds=[])).length===0 && this._cmds.push(this._one);
			this._cmds.push(args);
		}

		args.callee=fun;
		return args;
	}


	__proto__.clipRect=function(x,y,width,height){
		this._saveToCmd(Render.context._clipRect,arguments);
	}


	__proto__.fillText=function(text,x,y,font,color,textAlign){
		this._saveToCmd(Render.context._fillText,[text,x,y,font,color,textAlign]);
	}


	__proto__.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
		this._saveToCmd(Render.context._strokeText,arguments);
	}


	__proto__.alpha=function(value){
		this._saveToCmd(Render.context._alpha,arguments);
	}


	__proto__.blendMode=function(value){
		this._saveToCmd(Render.context._blendMode,arguments);
	}


	__proto__.transform=function(mat,pivotX,pivotY){
		this._saveToCmd(Render.context._transform,[mat,pivotX,pivotY]);
	}


	__proto__.rotate=function(angle,pivotX,pivotY){
		this._saveToCmd(Render.context._rotate,[angle,pivotX,pivotY]);
	}


	__proto__.scale=function(scaleX,scaleY,pivotX,pivotY){
		this._saveToCmd(Render.context._scale,[scaleX,scaleY,pivotX,pivotY]);
	}


	__proto__.translate=function(x,y){
		this._saveToCmd(Render.context._translate,[x,y]);
	}


	__proto__.save=function(){
		this._saveToCmd(Render.context.save,arguments);
	}


	__proto__.restore=function(){
		this._saveToCmd(Render.context.restore,arguments);
	}


	__proto__.replaceText=function(text){
		var cmds=this._cmds;
		if (!cmds){
			return this._one && this._one.callee===Render.context._fillText && (this._one[0]=text,true);
		}

		for (var i=cmds.length-1;i >-1;i--){
			if (cmds[i].callee===Render.context._fillText){
				cmds[i][0]=text;
				return true;
			}
		}

		return false;
	}


	__proto__.replaceTextColor=function(color){
		var cmds=this._cmds;
		if (!cmds){
			return this._one && this._one.callee===Render.context._fillText && (this._one[4]=color,true);
		}

		for (var i=cmds.length-1;i >-1;i--){
			if (cmds[i].callee===Render.context._fillText){
				cmds[i][4]=color;
				return true;
			}
		}

		return false;
	}


	__proto__.loadImage=function(url,x,y,complete){
		var tex=Loader.getRes(url);
		if (!tex){
			tex=new Texture();
			tex.load(url);
			Loader.cacheRes(url,tex);
		}

		this.drawTexture(tex,x,y,0,0);
		if (complete !=null){
			if (tex.loaded)complete(tex);
			else tex.on(/*laya.events.Event.LOADED*/"loaded",null,complete);
		}

	}


	__proto__._renderEmpty=function(sprite,context,x,y){}
	__proto__._renderAll=function(sprite,context,x,y){
		var cmds=this._cmds,cmd;
		for (var i=0,n=cmds.length;i < n;i++){
			(cmd=cmds[i]).callee.call(context,x,y,cmd);
		}

	}


	__proto__._renderOne=function(sprite,context,x,y){
		this._one.callee.call(context,x,y,this._one);
	}


	__proto__._renderOneImg=function(sprite,context,x,y){
		this._one.callee.call(context,x,y,this._one);
		sprite._renderType |=/*laya.renders.RenderSprite.IMAGE*/0x01;
	}


	/**
	*绘制一条线
	*@param fromX X开始位置
	*@param fromY Y开始位置
	*@param toX X结束位置
	*@param toY Y结束位置
	*@param lineColor 颜色
	*@param lineWidth 线条宽度
	*/
	__proto__.drawLine=function(fromX,fromY,toX,toY,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var arr=[fromX+0.5,fromY+0.5,toX+0.5,toY+0.5,lineColor,lineWidth];
		this._saveToCmd(Render.context._drawLine,arr);
	}


	/**
	*绘制一系列线段
	*@param points 线段的点集合，格式[x,y,x,y,x,y...]
	*@param lineColor 线段颜色
	*@param lineWidth 线段宽度
	*/
	__proto__.drawLines=function(x,y,points,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var arr=[x+0.5,y+0.5,points,lineColor,lineWidth];
		if (Render.isWebGl)arr[3]=Color.create(lineColor).numColor;
		this._saveToCmd(Render.isWebGl ? Render.context.drawLinesWebGL :Render.context.drawLines,arr);
	}


	/**
	*绘制一系列曲线
	*@param points 线段的点集合，格式[startx,starty,ctrx,ctry,startx,starty...]
	*@param lineColor 线段颜色
	*@param lineWidth 线段宽度
	*/
	__proto__.drawCurves=function(x,y,points,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var arr=[x+0.5,y+0.5,points,lineColor,lineWidth];
		this._saveToCmd(Render.context.drawCurves,arr);
	}


	/**
	*绘制矩形
	*@param x 开始绘制的x位置
	*@param y 开始绘制的y位置
	*@param width 矩形宽度
	*@param height 矩形高度
	*@param fillColor 填充颜色
	*@param lineColor 边框颜色
	*@param lineWidth 边框宽度
	*/
	__proto__.drawRect=function(x,y,width,height,fillColor,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var arr=[x+0.5,y+0.5,width,height,fillColor,lineColor,lineWidth];
		this._saveToCmd(Render.context._drawRect,arr);
	}


	/**
	*填充矩形
	*@param x 开始绘制的x位置
	*@param y 开始绘制的y位置
	*@param width 矩形宽度
	*@param height 矩形高度
	*@param fillColor 填充颜色
	*/
	__proto__.fillRect=function(x,y,width,height,fillColor){
		var arr=[x+0.5,y+0.5,width,height,fillColor];
		this._saveToCmd(Render.context._fillRect,arr);
	}


	/**
	*绘制圆形
	*@param x 圆点x位置
	*@param y 圆点y位置
	*@param radius 半径
	*@param fillColor 填充颜色
	*@param lineColor 边框颜色
	*@param lineWidth 边框宽度
	*/
	__proto__.drawCircle=function(x,y,radius,fillColor,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var arr=[x+0.5,y+0.5,radius,fillColor,lineColor,lineWidth];
		if (Render.isWebGl){
			arr[3]=fillColor ? Color.create(fillColor).numColor :fillColor;
			arr[4]=lineColor ? Color.create(lineColor).numColor :lineColor;
		}

		this._saveToCmd(Render.isWebGl ? Render.context._drawCircleWebGL :Render.context._drawCircle,arr);
	}


	/**
	*绘制扇形
	*@param x 开始绘制的x位置
	*@param y 开始绘制的y位置
	*@param radius 扇形半径
	*@param startAngle 开始角度
	*@param endAngle 结束角度
	*@param fillColor 填充颜色
	*@param lineColor 边框颜色
	*@param lineWidth 边框宽度
	*/
	__proto__.drawPie=function(x,y,radius,startAngle,endAngle,fillColor,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var arr=[x+0.5,y+0.5,radius,startAngle,endAngle,fillColor,lineColor,lineWidth];
		if (Render.isWebGl){
			startAngle=90-startAngle;
			endAngle=90-endAngle;
			arr[5]=fillColor ? Color.create(fillColor).numColor :fillColor;
			arr[6]=lineColor ? Color.create(lineColor).numColor :lineColor;
		}

		arr[3]=Utils.toRadian(startAngle);
		arr[4]=Utils.toRadian(endAngle);
		this._saveToCmd(Render.isWebGl ? Render.context._drawPieWebGL :Render.context._drawPie,arr);
	}


	/**
	*绘制多边形
	*@param points 多边形的点集合
	*@param fillColor 填充颜色
	*@param lineColor 边框颜色
	*@param lineWidth 边框宽度
	*/
	__proto__.drawPoly=function(x,y,points,fillColor,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var arr=[x+0.5,y+0.5,points,fillColor,lineColor,lineWidth];
		this._saveToCmd(Render.context._drawPoly,arr);
	}


	/**
	*绘制路径
	*@param x 开始绘制的x位置
	*@param y 开始绘制的y位置
	*@param paths 路径集合，路径支持以下格式：[["moveTo",x,y],["lineTo",x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]
	*@param brush 刷子定义，支持以下设置{fillStyle}
	*@param pen 画笔定义，支持以下设置{strokeStyle,lineWidth,lineJoin,lineCap,miterLimit}
	*/
	__proto__.drawPath=function(x,y,paths,brush,pen){
		var arr=[x+0.5,y+0.5,paths,brush,pen];
		this._saveToCmd(Render.context._drawPath,arr);
	}


	GETSET$(0,__proto__,'cmds',function(){
		return this._cmds;
		},function(value){

		this._cmds=value;
		this._render=this._renderAll;
	});


	Graphics.getCmdRec=function(cmd,rst,context){
		if (cmd.callee===context._drawTexture){
			if (cmd[3] && cmd[4]){
				Utils.concatArr(rst,Rectangle.getBoundPointS(cmd[1],cmd[2],cmd[3],cmd[4]));
				}else {
				var tex=cmd[0];
				Utils.concatArr(rst,Rectangle.getBoundPointS(cmd[1],cmd[2],tex.width,tex.height));
			}
			}else if (cmd.callee===context._drawRect || cmd.callee===context._fillRect){
			Utils.concatArr(rst,Rectangle.getBoundPointS(cmd[0],cmd[1],cmd[2],cmd[3]));
			}else if (cmd.callee===context._drawCircle || cmd.callee===context._fillCircle){
			Utils.concatArr(rst,Rectangle.getBoundPointS(cmd[0]-cmd[2],cmd[1]-cmd[2],cmd[2]+cmd[2],cmd[2]+cmd[2]));
			}else if (cmd.callee===context._drawLine){
			rst.push(cmd[0],cmd[1]);
			rst.push(cmd[2],cmd[3]);
		}

	}


	return Graphics;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/events/event.as
	/**
	*事件类型
	*@author yung
	*/
	//class laya.events.Event
	var Event=(function(){
		function Event(){
			//this.type=null;
			//this.nativeEvent=null;
			//this.target=null;
			//this.currentTarget=null;
			//this._stoped=false;
		}

		CLASS$(Event,'laya.events.Event');
		var __proto__=Event.prototype;
		__proto__.setTo=function(type,currentTarget,target){
			this.type=type;
			this.currentTarget=currentTarget;
			this.target=target;
			return this;
		}

		__proto__.stopPropagation=function(){
			this._stoped=true;
		}

		GETSET$(0,__proto__,'touches',function(){
			var arr=null;
			if (this.nativeEvent && this.nativeEvent.touches){
				arr=this.nativeEvent.touches;
				for (var i=0,n=arr.length;i < n;i++){
					var e=arr[i];
					e.stageX=e.offsetX || (e.clientX-Laya.stage.offset.x);
					e.stageY=e.offsetY || (e.clientY-Laya.stage.offset.y);
				}
			}
			return arr;
		});

		Event.EMPTY=new Event();
		Event.MOUSE_DOWN="mousedown";
		Event.MOUSE_UP="mouseup";
		Event.CLICK="click";
		Event.RIGHT_MOUSE_DOWN="rightmousedown";
		Event.RIGHT_MOUSE_UP="rightmouseup";
		Event.RIGHT_CLICK="rightclick";
		Event.MOUSE_MOVE="mousemove";
		Event.MOUSE_OVER="mouseover";
		Event.MOUSE_OUT="mouseout";
		Event.MOUSE_WHEEL="mousewheel";
		Event.ROLL_OVER="mouseover";
		Event.ROLL_OUT="mouseout";
		Event.DOUBLE_CLICK="doubleclick";
		Event.TOUCH_START="touchstart";
		Event.TOUCH_END="touchend";
		Event.TOUCH_MOVE="touchmove";
		Event.CHANGE="change";
		Event.CHANGED="changed";
		Event.RESIZE="resize";
		Event.ADDED="added";
		Event.REMOVED="removed";
		Event.DISPLAY="display";
		Event.UNDISPLAY="undisplay";
		Event.ERROR="error";
		Event.COMPLETE="complete";
		Event.LOADED="loaded";
		Event.PROGRESS="progress";
		Event.INPUT="input";
		Event.RENDER="render";
		Event.OPEN="open";
		Event.MESSAGE="message";
		Event.CLOSE="close";
		Event.KEY_DOWN="keydown";
		Event.KEY_PRESS="keypress";
		Event.KEY_UP="keyup";
		Event.ENTER_FRAME="enterframe";
		Event.DRAG_START="dragstart";
		Event.DRAG_MOVE="dragmove";
		Event.DRAG_END="dragend";
		Event.ENTER="enter";
		Event.SELECT="select";
		Event.BLUR="blur";
		Event.FOCUS="focus";
		return Event;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/events/keyboard.as
	/**
	*键盘code对应表
	*@author
	*/
	//class laya.events.Keyboard
	var Keyboard=(function(){
		function Keyboard(){};
		CLASS$(Keyboard,'laya.events.Keyboard');
		Keyboard.NUMBER_0=48;
		Keyboard.NUMBER_1=49;
		Keyboard.NUMBER_2=50;
		Keyboard.NUMBER_3=51;
		Keyboard.NUMBER_4=52;
		Keyboard.NUMBER_5=53;
		Keyboard.NUMBER_6=54;
		Keyboard.NUMBER_7=55;
		Keyboard.NUMBER_8=56;
		Keyboard.NUMBER_9=57;
		Keyboard.A=65;
		Keyboard.B=66;
		Keyboard.C=67;
		Keyboard.D=68;
		Keyboard.E=69;
		Keyboard.F=70;
		Keyboard.G=71;
		Keyboard.H=72;
		Keyboard.I=73;
		Keyboard.J=74;
		Keyboard.K=75;
		Keyboard.L=76;
		Keyboard.M=77;
		Keyboard.N=78;
		Keyboard.O=79;
		Keyboard.P=80;
		Keyboard.Q=81;
		Keyboard.R=82;
		Keyboard.S=83;
		Keyboard.T=84;
		Keyboard.U=85;
		Keyboard.V=86;
		Keyboard.W=87;
		Keyboard.X=88;
		Keyboard.Y=89;
		Keyboard.Z=90;
		Keyboard.SEMICOLON=186;
		Keyboard.EQUAL=187;
		Keyboard.COMMA=188;
		Keyboard.MINUS=189;
		Keyboard.PERIOD=190;
		Keyboard.SLASH=191;
		Keyboard.BACKQUOTE=192;
		Keyboard.LEFTBRACKET=219;
		Keyboard.BACKSLASH=220;
		Keyboard.RIGHTBRACKET=221;
		Keyboard.QUOTE=222;
		Keyboard.ALTERNATE=18;
		Keyboard.BACKSPACE=8;
		Keyboard.CAPS_LOCK=20;
		Keyboard.COMMAND=15;
		Keyboard.CONTROL=17;
		Keyboard.DELETE=46;
		Keyboard.DOWN=40;
		Keyboard.END=35;
		Keyboard.ENTER=13;
		Keyboard.ESCAPE=27;
		Keyboard.F1=112;
		Keyboard.F2=113;
		Keyboard.F3=114;
		Keyboard.F4=115;
		Keyboard.F5=116;
		Keyboard.F6=117;
		Keyboard.F7=118;
		Keyboard.F8=119;
		Keyboard.F9=120;
		Keyboard.F10=121;
		Keyboard.F11=122;
		Keyboard.F12=123;
		Keyboard.F13=124;
		Keyboard.F14=125;
		Keyboard.F15=126;
		Keyboard.HOME=36;
		Keyboard.INSERT=45;
		Keyboard.LEFT=37;
		Keyboard.NUMPAD=21;
		Keyboard.NUMPAD_0=96;
		Keyboard.NUMPAD_1=97;
		Keyboard.NUMPAD_2=98;
		Keyboard.NUMPAD_3=99;
		Keyboard.NUMPAD_4=100;
		Keyboard.NUMPAD_5=101;
		Keyboard.NUMPAD_6=102;
		Keyboard.NUMPAD_7=103;
		Keyboard.NUMPAD_8=104;
		Keyboard.NUMPAD_9=105;
		Keyboard.NUMPAD_ADD=107;
		Keyboard.NUMPAD_DECIMAL=110;
		Keyboard.NUMPAD_DIVIDE=111;
		Keyboard.NUMPAD_ENTER=108;
		Keyboard.NUMPAD_MULTIPLY=106;
		Keyboard.NUMPAD_SUBTRACT=109;
		Keyboard.PAGE_DOWN=34;
		Keyboard.PAGE_UP=33;
		Keyboard.RIGHT=39;
		Keyboard.SHIFT=16;
		Keyboard.SPACE=32;
		Keyboard.TAB=9;
		Keyboard.UP=38;
		return Keyboard;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/events/keyboardmanager.as
	/**
	*键盘事件管理类
	*该类从浏览器中接收键盘事件，并转发该事件
	*转发事件时若Stage.focus为空则只从Stage上派发该事件，不然将从Stage.focus对象开始一直冒泡派发该事件
	*所以在Laya.stage上监听键盘事件一定能够收到，如果在其他地方监听，则必须处在Stage.focus的冒泡链上才能收到该事件
	*用户可以通过代码Laya.stage.focus=someNode的方式来设置focus对象
	*用户可统一的根据事件对象中 e.keyCode来判断按键类型，该属性兼容了不同浏览器的实现
	*其他事件属性可自行从 e 中获取
	*@author ww
	*@version 1.0
	*@created 2015-9-23 上午10:57:26
	*/
	//class laya.events.KeyBoardManager
	var KeyBoardManager=(function(){
		function KeyBoardManager(){};
		CLASS$(KeyBoardManager,'laya.events.KeyBoardManager');
		KeyBoardManager.__init__=function(){
			KeyBoardManager.addEvent("keydown");
			KeyBoardManager.addEvent("keypress");
			KeyBoardManager.addEvent("keyup");
		}

		KeyBoardManager.addEvent=function(type){
			Browser.document.addEventListener(type,function(e){
				laya.events.KeyBoardManager.dispatch(e,type);
			},true);
		}

		KeyBoardManager.dispatch=function(e,type){
			e.keyCode=e.keyCode || e.which || e.charCode;
			if (type==="keydown")KeyBoardManager.pressKeys[e.keyCode]=true;
			else if (type==="keyup")KeyBoardManager.pressKeys[e.keyCode]=null;
			var tar=(Laya.stage.focus && (Laya.stage.focus.event !=null))? Laya.stage.focus :Laya.stage;
			while (tar){
				tar.event(type,e);
				tar=tar.parent;
			}
		}

		KeyBoardManager.hasKeyDown=function(key){
			return KeyBoardManager.pressKeys[key];
		}

		KeyBoardManager.pressKeys={};
		return KeyBoardManager;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/events/mousemanager.as
	/**
	*鼠标交互管理器
	*@author yung
	*/
	//class laya.events.MouseManager
	var MouseManager=(function(){
		function MouseManager(){
			this.mouseX=0;
			this.mouseY=0;
			this._stage=null;
			this._target=null;
			this._lastOvers=[];
			this._currOvers=[];
			this._lastClickTimer=0;
			this._isDoubleClick=false;
			this._isLeftMouse=false;
			this._matrix=new Matrix();
			this._point=new Point();
			this._rect=new Rectangle();
			this._event=new Event();
		}

		CLASS$(MouseManager,'laya.events.MouseManager');
		var __proto__=MouseManager.prototype;
		__proto__.__init__=function(){
			var _$this=this;
			this._stage=Laya.stage;
			var _this=this;
			Browser.document.oncontextmenu=function (e){
				return false;
			};
			var canvas=Render.canvas.source;
			canvas.addEventListener('mousedown',function(e){
				_this._isLeftMouse=e.button===0;
				initEvent(e);
				_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseDown);
				e.returnValue=false;
			});
			canvas.addEventListener('mouseup',function(e){
				_this._isLeftMouse=e.button===0;
				var now=Browser.now();
				if (now-_this._lastClickTimer < 300)
					_this._isDoubleClick=true;
				else
				_this._isDoubleClick=false;
				_this._lastClickTimer=now;
				initEvent(e);
				_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseUp);
			},true);
			canvas.addEventListener("mouseout",function(e){
				_this.sendEvent(_this._stage,/*laya.events.Event.MOUSE_OUT*/"mouseout",false);
			})
			canvas.addEventListener("mouseover",function(e){
				_this.sendEvent(_this._stage,/*laya.events.Event.MOUSE_OVER*/"mouseover",false);
			})
			Browser.document.addEventListener('mousemove',function(e){
				initEvent(e);
				_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseMove);
				_this.checkMouseOut();
			},true);
			canvas.addEventListener('mousewheel',function(e){
				_$this.checkMouseWheel(e);
			});
			canvas.addEventListener('DOMMouseScroll',function(e){
				_$this.checkMouseWheel(e);
			});
			canvas.addEventListener('touchstart',function(e){
				e.preventDefault();
				_$this._stage.event(/*laya.events.Event.TOUCH_START*/"touchstart",e);
				_this._isLeftMouse=true;
				var touches=e.changedTouches;
				for (var i=0,n=touches.length;i < n;i++){
					var touch=touches[i];
					initEvent(touch,e);
					_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseDown);
				}
			});
			canvas.addEventListener('touchend',function(e){
				_$this._stage.event(/*laya.events.Event.TOUCH_END*/"touchend",e);
				_this._isLeftMouse=true;
				var touches=e.changedTouches;
				for (var i=0,n=touches.length;i < n;i++){
					var touch=touches[i];
					initEvent(touch,e);
					_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseUp);
				}
			},true);
			Browser.document.addEventListener('touchmove',function(e){
				_$this._stage.event(/*laya.events.Event.TOUCH_MOVE*/"touchmove",e);
				var touches=e.changedTouches;
				for (var i=0,n=touches.length;i < n;i++){
					var touch=touches[i];
					initEvent(touch,e);
					_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseMove);
				}
				_this.checkMouseOut();
			},true);
			function initEvent (e,event){
				_this._event._stoped=false;
				_this._event.nativeEvent=event || e;
				_this._target=null;
				_this.mouseX=e.offsetX || (e.clientX-_$this._stage.offset.x);
				_this.mouseY=e.offsetY || (e.clientY-_$this._stage.offset.y);
			}
		}

		__proto__.checkMouseWheel=function(e){
			this._event.delta=e.wheelDelta ? e.wheelDelta *0.025 :-e.detail;
			for (var i=0,n=this._lastOvers.length;i < n;i++){
				var ele=this._lastOvers[i];
				this.sendEvent(ele,/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",false);
			}
		}

		__proto__.checkMouseOut=function(){
			for (var i=0,n=this._lastOvers.length;i < n;i++){
				var ele=this._lastOvers[i];
				if (this._currOvers.indexOf(ele)< 0){
					ele.$_MOUSEOVER=false;
					this.sendEvent(ele,/*laya.events.Event.MOUSE_OUT*/"mouseout",false);
				}
			};
			var temp=this._lastOvers;
			this._lastOvers=this._currOvers;
			this._currOvers=temp;
			this._currOvers.length=0;
		}

		__proto__.onMouseMove=function(ele){
			this.sendEvent(ele,/*laya.events.Event.MOUSE_MOVE*/"mousemove",true);
			if (ele.parent){
				if (!ele.$_MOUSEOVER){
					ele.$_MOUSEOVER=true;
					this.sendEvent(ele,/*laya.events.Event.MOUSE_OVER*/"mouseover",true);
				}
				this._currOvers.push(ele);
			}
			!this._event._stoped && ele.parent && this.onMouseMove(ele.parent);
		}

		__proto__.onMouseUp=function(ele){
			this.sendEvent(ele,this._isLeftMouse ? /*laya.events.Event.MOUSE_UP*/"mouseup" :/*laya.events.Event.RIGHT_MOUSE_UP*/"rightmouseup",true);
			!this._event._stoped && ele.parent && this.onMouseUp(ele.parent);
		}

		__proto__.onMouseDown=function(ele){
			if (this._isLeftMouse){
				ele.$_MOUSEDOWN=true;
				this.sendEvent(ele,/*laya.events.Event.MOUSE_DOWN*/"mousedown",true);
				}else {
				ele.$_RIGHTMOUSEDOWN=true;
				this.sendEvent(ele,/*laya.events.Event.RIGHT_MOUSE_DOWN*/"rightmousedown",true);
			}
			!this._event._stoped && ele.parent && this.onMouseDown(ele.parent);
		}

		__proto__.sendEvent=function(ele,type,bubble){
			if (!this._event._stoped){
				ele.event(type,this._event.setTo(type,ele,this._target),bubble);
				if (type===/*laya.events.Event.MOUSE_UP*/"mouseup" && ele.$_MOUSEDOWN){
					ele.$_MOUSEDOWN=false;
					ele.event(/*laya.events.Event.CLICK*/"click",this._event.setTo(/*laya.events.Event.CLICK*/"click",ele,this._target),bubble);
					this._isDoubleClick && ele.event(/*laya.events.Event.DOUBLE_CLICK*/"doubleclick",this._event.setTo(/*laya.events.Event.DOUBLE_CLICK*/"doubleclick",ele,this._target),bubble);
					}else if (type===/*laya.events.Event.RIGHT_MOUSE_UP*/"rightmouseup" && ele.$_RIGHTMOUSEDOWN){
					ele.$_RIGHTMOUSEDOWN=false;
					ele.event(/*laya.events.Event.RIGHT_CLICK*/"rightclick",this._event.setTo(/*laya.events.Event.RIGHT_CLICK*/"rightclick",ele,this._target),bubble);
				}
			}
		}

		__proto__.check=function(sp,mouseX,mouseY,callBack){
			var transform=sp.transform || this._matrix;
			var pivotX=sp.pivotX;
			var pivotY=sp.pivotY;
			if (pivotX===0 && pivotY===0){
				transform.setTranslate(sp.x,sp.y);
				}else {
				if (transform===this._matrix){
					transform.setTranslate(sp.x-pivotX,sp.y-pivotY);
					}else {
					var cos=transform.cos;
					var sin=transform.sin;
					transform.setTranslate(sp.x-(pivotX *cos-pivotY *sin)*sp.scaleX,sp.y-(pivotX *sin+pivotY *cos)*sp.scaleY);
				}
			}
			transform.invertTransformPoint(this._point.setTo(mouseX,mouseY));
			transform.setTranslate(0,0);
			mouseX=this._point.x;
			mouseY=this._point.y;
			var scrollRect=sp.scrollRect;
			if (scrollRect){
				this._rect.setTo(0,0,scrollRect.width,scrollRect.height);
				var isHit=this._rect.contains(mouseX,mouseY);
				if (!isHit)return false;
			};
			var flag=false;
			for (var i=sp._childs.length-1;i >-1;i--){
				var child=sp._childs[i];
				if (child.mouseEnabled && child.visible){
					flag=this.check(child,mouseX+(scrollRect ? scrollRect.x :0),mouseY+(scrollRect ? scrollRect.y :0),callBack);
					if (flag)return true;
				}
			}
			if (sp.width > 0 && sp.height > 0){
				var graphicHit=false;
				var hitRect=this._rect;
				if (!sp.mouseThrough){
					if (sp.hitArea)hitRect=sp.hitArea;
					else hitRect.setTo(0,0,sp.width,sp.height);
					isHit=hitRect.contains(mouseX,mouseY);
					}else {
					isHit=sp.getGraphicBounds().contains(mouseX,mouseY);
				}
				if (isHit){
					this._target=sp;
					callBack.call(this,sp);
				}
			}
			return isHit;
		}

		STATICATTR$(MouseManager,
		['instance',function(){return this.instance=new MouseManager();}
		]);
		return MouseManager;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/filters/filter.as
	/**
	*...
	*@author wk
	*/
	//class laya.filters.Filter
	var Filter=(function(){
		function Filter(){
			this._action=null;
		}

		CLASS$(Filter,'laya.filters.Filter');
		var __proto__=Filter.prototype;
		LAYABOX.implements(__proto__,{"laya.filters.IFilter":true})
		GETSET$(0,__proto__,'type',function(){return-1});
		GETSET$(0,__proto__,'action',function(){return this._action});
		Filter.BLUR=0x10;
		Filter.COLOR=0x20;
		Filter.GLOW=0x08;
		Filter._filterStart=null
		Filter._filterEnd=null
		Filter._EndTarget=null
		Filter._recycleScope=null
		Filter._filter=null
		return Filter;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/filters/colorfilteraction.as
	//class laya.filters.ColorFilterAction
	var ColorFilterAction=(function(){
		function ColorFilterAction(){
			this.data
		}

		CLASS$(ColorFilterAction,'laya.filters.ColorFilterAction');
		var __proto__=ColorFilterAction.prototype;
		LAYABOX.implements(__proto__,{"laya.filters.IFilterAction":true})
		__proto__.apply=function(srcCanvas){
			var ctx=srcCanvas.ctx.ctx;
			var canvas=srcCanvas.ctx.ctx.canvas;
			if (canvas.width==0 || canvas.height==0)return canvas;
			var imgdata=ctx.getImageData(0,0,canvas.width,canvas.height);
			var data=imgdata.data;
			var nData;
			for(var i=0,n=data.length;i<n;i+=4){
				nData=this.getColor(data[i],data[i+1],data[i+2],data[i+3]);
				if(data[i+3]==0)continue ;
				data[i]=nData[0];
				data[i+1]=nData[1];
				data[i+2]=nData[2];
				data[i+3]=nData[3];
			}
			ctx.putImageData(imgdata,0,0);
			return srcCanvas;
		}

		__proto__.getColor=function(red,green,blue,alpha){
			var rst=[];
			if(this.data._elements){
				var a=this.data._elements;
				rst[0]=a[0] *red+a[1] *green+a[2] *blue+a[3] *alpha+a[4];
				rst[1]=a[5] *red+a[6] *green+a[7] *blue+a[8] *alpha+a[9];
				rst[2]=a[10] *red+a[11] *green+a[12] *blue+a[13] *alpha+a[14];
				rst[3]=a[15] *red+a[16] *green+a[17] *blue+a[18] *alpha+a[19];
			}
			return rst;
		}

		return ColorFilterAction;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/maths/arith.as
	//class laya.maths.Arith
	var Arith=(function(){
		function Arith(){};
		CLASS$(Arith,'laya.maths.Arith');
		Arith.formatR=function(r){
			if (r > Math.PI)r-=Math.PI*2;
			if (r <-Math.PI)r+=Math.PI*2;
			return r;
		}

		Arith.isPOT=function(w,h){
			return (w > 0 && (w & (w-1))===0 && h > 0 && (h & (h-1))===0);
		}

		Arith.setMatToArray=function(mat,array){
			mat.a,mat.b,0,0,
			mat.c,mat.d,0,0,
			0,0,1,0,
			mat.tx+20,mat.ty+20,0,1
			array[0]=mat.a;
			array[1]=mat.b;
			array[4]=mat.c;
			array[5]=mat.d;
			array[12]=mat.tx;
			array[13]=mat.ty;
		}

		return Arith;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/maths/grahamscan.as
	/**
	*凸包算法
	*@author ww
	*@version 1.0
	*
	*@created 2015-9-22 下午4:16:41
	*/
	//class laya.maths.GrahamScan
	var GrahamScan=(function(){
		function GrahamScan(){}
		CLASS$(GrahamScan,'laya.maths.GrahamScan');
		GrahamScan.multiply=function(p1,p2,p0){
			return((p1.x-p0.x)*(p2.y-p0.y)-(p2.x-p0.x)*(p1.y-p0.y));
		}

		GrahamScan.dis=function(p1,p2){
			return (p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y);
		}

		GrahamScan.getPoints=function(count,tempUse,rst){
			(tempUse===void 0)&& (tempUse=false);
			if(!GrahamScan._mPointList)GrahamScan._mPointList=[];
			while(GrahamScan._mPointList.length<count)GrahamScan._mPointList.push(new Point());
			if(!rst)rst=[];
			rst.length=0;
			if(tempUse){
				Utils.getFrom(rst,GrahamScan._mPointList,count);
				}else{
				Utils.getFromR(rst,GrahamScan._mPointList,count);
			}
			return rst;
		}

		GrahamScan.pListToPointList=function(pList,tempUse){
			(tempUse===void 0)&& (tempUse=false);
			var i=0,len=pList.length/2,rst=GrahamScan.getPoints(len,tempUse,GrahamScan._tempPointList);
			for(i=0;i<len;i++){
				rst[i].setTo(pList[i+i],pList[i+i+1]);
			}
			return rst;
		}

		GrahamScan.pointListToPlist=function(pointList){
			var i=0,len=pointList.length,rst=GrahamScan._temPList,tPoint;
			rst.length=0;
			for(i=0;i<len;i++){
				tPoint=pointList[i];
				rst.push(tPoint.x,tPoint.y);
			}
			return rst;
		}

		GrahamScan.scanPList=function(pList){
			return Utils.setValueArr(pList,GrahamScan.pointListToPlist(GrahamScan.scan(GrahamScan.pListToPointList(pList,true))));
		}

		GrahamScan.scan=function(PointSet){
			var i=0,j=0,k=0,top=2,tmp,n=PointSet.length,ch;
			var _tmpDic={};
			var key;
			ch=GrahamScan._temArr;
			ch.length=0;
			n=PointSet.length;
			for(i=n-1;i>=0;i--){
				tmp=PointSet[i];
				key=tmp.x+"_"+tmp.y;
				if(!_tmpDic.hasOwnProperty(key)){
					_tmpDic[key]=true;
					ch.push(tmp);
				}
			}
			n=ch.length;
			Utils.setValueArr(PointSet,ch);
			for(i=1;i<n;i++)
			if ((PointSet[i].y<PointSet[k].y)||((PointSet[i].y==PointSet[k].y)&&(PointSet[i].x<PointSet[k].x)))
				k=i;
			tmp=PointSet[0];
			PointSet[0]=PointSet[k];
			PointSet[k]=tmp;
			for (i=1;i<n-1;i++){
				k=i;
				for (j=i+1;j<n;j++)
				if((GrahamScan.multiply(PointSet[j],PointSet[k],PointSet[0])>0)
					||((GrahamScan.multiply(PointSet[j],PointSet[k],PointSet[0])==0)
				&&(GrahamScan.dis(PointSet[0],PointSet[j])<GrahamScan.dis(PointSet[0],PointSet[k]))))
				k=j;
				tmp=PointSet[i];
				PointSet[i]=PointSet[k];
				PointSet[k]=tmp;
			}
			ch=GrahamScan._temArr;
			ch.length=0;
			if(PointSet.length<3){
				return Utils.setValueArr(ch,PointSet);
			}
			ch.push(PointSet[0],PointSet[1],PointSet[2]);
			for (i=3;i<n;i++){
				while(ch.length>=2&&GrahamScan.multiply(PointSet[i],ch[ch.length-1],ch[ch.length-2])>=0)ch.pop();
				PointSet[i]&&ch.push(PointSet[i]);
			}
			return ch;
		}

		GrahamScan._mPointList=null
		GrahamScan._tempPointList=[];
		GrahamScan._temPList=[];
		GrahamScan._temArr=[];
		return GrahamScan;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/maths/mathutil.as
	/**
	*...
	*@author ...
	*/
	//class laya.maths.MathUtil
	var MathUtil=(function(){
		function MathUtil(){}
		CLASS$(MathUtil,'laya.maths.MathUtil');
		MathUtil.subtractVector3=function(l,r,o){
			o[0]=l[0]-r[0];
			o[1]=l[1]-r[1];
			o[2]=l[2]-r[2];
		}

		MathUtil.lerp=function(left,right,amount){
			return left *(1-amount)+right *amount;
		}

		MathUtil.scaleVector3=function(f,b,e){
			e[0]=f[0] *b;
			e[1]=f[1] *b;
			e[2]=f[2] *b;
		}

		MathUtil.lerpVector3=function(l,r,t,o){
			var ax=l[0],ay=l[1],az=l[2];
			o[0]=ax+t *(r[0]-ax);
			o[1]=ay+t *(r[1]-ay);
			o[2]=az+t *(r[2]-az);
		}

		MathUtil.lerpVector4=function(l,r,t,o){
			var ax=l[0],ay=l[1],az=l[2],aw=l[3];
			o[0]=ax+t *(r[0]-ax);
			o[1]=ay+t *(r[1]-ay);
			o[2]=az+t *(r[2]-az);
			o[3]=aw+t *(r[3]-aw);
		}

		return MathUtil;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/maths/matrix.as
	/**
	*矩阵
	*@author yung
	*/
	//class laya.maths.Matrix
	var Matrix=(function(){
		function Matrix(a,b,c,d,tx,ty){
			this.cos=1;
			this.sin=0;
			//this.a=NaN;
			//this.b=NaN;
			//this.c=NaN;
			//this.d=NaN;
			//this.tx=NaN;
			//this.ty=NaN;
			this.bTransform=false;
			(a===void 0)&& (a=1);
			(b===void 0)&& (b=0);
			(c===void 0)&& (c=0);
			(d===void 0)&& (d=1);
			(tx===void 0)&& (tx=0);
			(ty===void 0)&& (ty=0);
			this.a=a;
			this.b=b;
			this.c=c;
			this.d=d;
			this.tx=tx;
			this.ty=ty;
			this._checkTransform();
		}

		CLASS$(Matrix,'laya.maths.Matrix');
		var __proto__=Matrix.prototype;
		__proto__.identity=function(){
			this.a=this.d=1;
			this.b=this.tx=this.ty=this.c=0;
			this.bTransform=false;
			return this;
		}

		__proto__._checkTransform=function(){
			return this.bTransform=(this.a!==1 || this.b!==0 || this.c!==0 || this.d!==1);
		}

		__proto__.setTranslate=function(x,y){
			this.tx=x;
			this.ty=y;
		}

		__proto__.translate=function(x,y){
			this.tx+=x;
			this.ty+=y;
			return this;
		}

		__proto__.scale=function(x,y){
			this.a *=x;
			this.d *=y;
			this.c *=x;
			this.b *=y;
			this.tx *=x;
			this.ty *=y;
			this.bTransform=true;
		}

		__proto__.rotate=function(angle){
			var cos=this.cos=Math.cos(angle);
			var sin=this.sin=Math.sin(angle);
			var a1=this.a;
			var c1=this.c;
			var tx1=this.tx;
			this.a=a1 *cos-this.b *sin;
			this.b=a1 *sin+this.b *cos;
			this.c=c1 *cos-this.d *sin;
			this.d=c1 *sin+this.d *cos;
			this.tx=tx1 *cos-this.ty *sin;
			this.ty=tx1 *sin+this.ty *cos;
			this.bTransform=true;
		}

		__proto__.invertTransformPoint=function(out){
			var a1=this.a;
			var b1=this.b;
			var c1=this.c;
			var d1=this.d;
			var tx1=this.tx;
			var n=a1 *d1-b1 *c1;
			var a2=d1 / n;
			var b2=-b1 / n;
			var c2=-c1 / n;
			var d2=a1 / n;
			var tx2=(c1 *this.ty-d1 *tx1)/ n;
			var ty2=-(a1 *this.ty-b1 *tx1)/ n;
			out.setTo(a2 *out.x+c2 *out.y+tx2,b2 *out.x+d2 *out.y+ty2);
		}

		__proto__.transformPoint=function(x,y,out){
			out.setTo(this.a *x+this.c *y+this.tx,this.b *x+this.d *y+this.ty);
		}

		//}
		__proto__.transformPointArray=function(data,out){
			var len=data.length;
			for (var i=0;i < len;i+=2){
				var x=data[i],y=data[i+1];
				out[i]=this.a *x+this.c *y+this.tx;
				out[i+1]=this.b *x+this.d *y+this.ty;
			}
		}

		__proto__.transformPointArrayScale=function(data,out){
			var len=data.length;
			for (var i=0;i < len;i+=2){
				var x=data[i],y=data[i+1];
				out[i]=this.a *x+this.c *y;
				out[i+1]=this.b *x+this.d *y;
			}
		}

		__proto__.getScaleX=function(){
			return this.b==0 ? this.a :Math.sqrt(this.a*this.a+this.b*this.b);
		}

		__proto__.getScaleY=function(){
			return this.c==0 ? this.d :Math.sqrt(this.c*this.c+this.d*this.d);
		}

		__proto__.invert=function(){
			var a1=this.a;
			var b1=this.b;
			var c1=this.c;
			var d1=this.d;
			var tx1=this.tx;
			var n=a1 *d1-b1 *c1;
			this.a=d1 / n;
			this.b=-b1 / n;
			this.c=-c1 / n;
			this.d=a1 / n;
			this.tx=(c1 *this.ty-d1 *tx1)/ n;
			this.ty=-(a1 *this.ty-b1 *tx1)/ n;
			return this;
		}

		__proto__.setTo=function(a,b,c,d,tx,ty){
			this.a=a,this.b=b,this.c=c,this.d=d,this.tx=tx,this.ty=ty;
			return this;
		}

		__proto__.concat=function(mtx){
			var a=this.a;
			var c=this.c;
			var tx=this.tx;
			this.a=a *mtx.a+this.b *mtx.c;
			this.b=a *mtx.b+this.b *mtx.d;
			this.c=c *mtx.a+this.d *mtx.c;
			this.d=c *mtx.b+this.d *mtx.d;
			this.tx=tx *mtx.a+this.ty *mtx.c+mtx.tx;
			this.ty=tx *mtx.b+this.ty *mtx.d+mtx.ty;
			return this;
		}

		__proto__.clone=function(){
			var no=Matrix._cache;
			var dec=!no._length?(new Matrix()):no[--no._length];
			dec.a=this.a;
			dec.b=this.b;
			dec.c=this.c;
			dec.d=this.d;
			dec.tx=this.tx;
			dec.ty=this.ty;
			dec.bTransform=this.bTransform;
			return dec;
		}

		__proto__.copy=function(dec){
			dec.a=this.a;
			dec.b=this.b;
			dec.c=this.c;
			dec.d=this.d;
			dec.tx=this.tx;
			dec.ty=this.ty;
			dec.bTransform=this.bTransform;
			return dec;
		}

		__proto__.toString=function(){
			return this.a+","+this.b+","+this.c+","+this.d+","+this.tx+","+this.ty;
		}

		__proto__.destroy=function(){
			var cache=Matrix._cache;
			cache._length || (cache._length=0);
			cache[cache._length++]=this;
			this.a=this.d=1;
			this.b=this.c=this.tx=this.ty=0;
			this.bTransform=false;
		}

		Matrix.mul=function(m1,m2,out){
			var aa=m1.a,ab=m1.b,ac=m1.c,ad=m1.d,atx=m1.tx,aty=m1.ty;
			var ba=m2.a,bb=m2.b,bc=m2.c,bd=m2.d,btx=m2.tx,bty=m2.ty;
			if (bb!==0 || bc!==0){
				out.a=aa *ba+ab *bc;
				out.b=aa *bb+ab *bd;
				out.c=ac *ba+ad *bc;
				out.d=ac *bb+ad *bd;
				out.tx=ba *atx+bc *aty+btx;
				out.ty=bb *atx+bd *aty+bty;
			}
			else{
				out.a=aa *ba;
				out.b=ab *bd;
				out.c=ac *ba;
				out.d=ad *bd;
				out.tx=ba *atx+btx;
				out.ty=bd *aty+bty;
			}
			return out;
		}

		Matrix.preMul=function(parent,self,out){
			var pa=parent.a,pb=parent.b,pc=parent.c,pd=parent.d;
			var na=self.a,nb=self.b,nc=self.c,nd=self.d,ntx=self.tx,nty=self.ty;
			out.a=na *pa;
			out.b=out.c=0;
			out.d=nd *pd;
			out.tx=ntx *pa+parent.tx;
			out.ty=nty *pd+parent.ty;
			if (nb!==0 || nc!==0 || pb!==0 || pc!==0){
				out.a+=nb *pc;
				out.d+=nc *pb;
				out.b+=na *pb+nb *pd;
				out.c+=nc *pa+nd *pc;
				out.tx+=nty *pc;
				out.ty+=ntx *pb;
			}
			return out;
		}

		Matrix.preMulXY=function(parent,x,y,out){
			var pa=parent.a,pb=parent.b,pc=parent.c,pd=parent.d;
			out.a=pa;
			out.b=pb;
			out.c=pc;
			out.d=pd;
			out.tx=x *pa+parent.tx+y *pc;
			out.ty=y *pd+parent.ty+x *pb;
			return out;
		}

		Matrix.create=function(){
			var cache=Matrix._cache;
			return !cache._length?(new Matrix()):cache[--cache._length];
		}

		Matrix.EMPTY=new Matrix();
		Matrix.TEMP=new Matrix();
		Matrix._cache=[];
		return Matrix;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/maths/point.as
	/**
	*Point类
	*@author yung
	*/
	//class laya.maths.Point
	var Point=(function(){
		function Point(x,y){
			//this.x=NaN;
			//this.y=NaN;
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			this.x=x;
			this.y=y;
		}

		CLASS$(Point,'laya.maths.Point');
		var __proto__=Point.prototype;
		// trace("createPoint");
		__proto__.setTo=function(x,y){
			this.x=x;
			this.y=y;
			return this;
		}

		Point.TEMP=new Point();
		Point.EMPTY=new Point();
		return Point;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/maths/rectangle.as
	/**
	*矩形
	*@author yung
	*/
	//class laya.maths.Rectangle
	var Rectangle=(function(){
		function Rectangle(x,y,width,height){
			//this.x=NaN;
			//this.y=NaN;
			//this.width=NaN;
			//this.height=NaN;
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			(width===void 0)&& (width=0);
			(height===void 0)&& (height=0);
			this.x=x;
			this.y=y;
			this.width=width;
			this.height=height;
		}

		CLASS$(Rectangle,'laya.maths.Rectangle');
		var __proto__=Rectangle.prototype;
		__proto__.setTo=function(x,y,width,height){
			this.x=x;
			this.y=y;
			this.width=width;
			this.height=height;
			return this;
		}

		__proto__.copyFrom=function(sourceRect){
			this.x=sourceRect.x;
			this.y=sourceRect.y;
			this.width=sourceRect.width;
			this.height=sourceRect.height;
		}

		__proto__.contains=function(x,y){
			if (this.width <=0 || this.height <=0)return false;
			if (x >=this.x && x < this.x+this.width){
				if (y >=this.y && y < this.y+this.height){
					return true;
				}
			}
			return false;
		}

		__proto__.min=function(a,b){
			return a < b?a:b;
		}

		__proto__.max=function(a,b){
			return a > b?a:b;
		}

		/**
		*判断是否相交 ，仅对边与坐标轴平行的矩形起作用
		*@param r 要判断的矩形
		*@return
		*/
		__proto__.isIntersect=function(r){
			return !(this.max(this.x ,r.x)> this.min(this.x+this.width ,r.x+r.width)|| this.max(this.y,r.y)>this.min(this.y+this.height ,r.y+r.height));
		}

		/**
		*将两个矩形组合在一起
		*/
		__proto__.union=function(x,y,width,height){
			if (width==0||height==0)return this;
			this.addPoint(x,y);
			this.addPoint(x+width,y+height);
			return this;
		}

		/**
		*合并矩形
		*@param r 要合并的矩形
		*@return 合并后的矩形
		*/
		__proto__.unionRec=function(r){
			r&&this.union(r.x,r.y,r.width,r.height);
			return this;
		}

		__proto__.equal=function(r){
			if(!r||r.x!==this.x||r.y!==this.y||r.width!==this.width||r.height!==this.height)return false;
			return true;
		}

		/**
		*在矩形区域中加一个点
		*@param x
		*@param y
		*@return 增加点之后的矩形
		*/
		__proto__.addPoint=function(x,y){
			this.x > x && (this.width+=this.x-x,this.x=x);
			this.y > y && (this.height+=this.y-y,this.y=y);
			if(this.width<x-this.x)this.width=x-this.x;
			if(this.height<y-this.y)this.height=y-this.y;
			return this;
		}

		/**
		*在矩形区域中加一个点
		*@param point
		*@return 增加点之后的矩形
		*/
		__proto__.addPointP=function(point){
			this.addPoint(point.x,point.y);
			return this;
		}

		/**
		*返回代表当前矩形的顶点数据
		*@return 顶点数据
		*/
		__proto__.getBoundPoints=function(){
			var rst=Rectangle._temB;
			rst.length=0;
			if(this.width==0||this.height==0)return rst;
			rst.push(this.x,this.y,this.x+this.width,this.y,this.x,this.y+this.height,this.x+this.width,this.y+this.height);
			return rst;
		}

		__proto__.clone=function(out){
			out=out || new Rectangle();
			out.x=this.x;
			out.y=this.y;
			out.width=this.width;
			out.height=this.height;
			return out;
		}

		__proto__.toString=function(){
			return this.x+","+this.y+","+this.width+","+this.height;
		}

		Rectangle.getBoundPointS=function(x,y,width,height){
			var rst=Rectangle._temA;
			rst.length=0;
			if(width==0||height==0)return rst;
			rst.push(x,y,x+width,y,x,y+height,x+width,y+height);
			return rst;
		}

		Rectangle.getWrapRec=function(pointList,rst){
			if(!pointList||pointList.length<1)return rst?rst.setTo(0,0,0,0):Rectangle.EMPTY;
			rst=rst?rst:new Rectangle();
			var i,len=pointList.length,minX,maxX,minY,maxY,tPoint=Point.TEMP;
			minX=minY=99999;
			maxX=maxY=-minX;
			for(i=0;i<len;i+=2){
				tPoint.x=pointList[i];
				tPoint.y=pointList[i+1];
				minX=minX<tPoint.x?minX:tPoint.x;
				minY=minY<tPoint.y?minY:tPoint.y;
				maxX=maxX>tPoint.x?maxX:tPoint.x;
				maxY=maxY>tPoint.y?maxY:tPoint.y;
			}
			return rst.setTo(minX,minY,maxX-minX,maxY-minY);
		}

		Rectangle.EMPTY=new Rectangle();
		Rectangle.temp=new Rectangle();
		Rectangle._temB=[];
		Rectangle._temA=[];
		return Rectangle;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/net/localstorage.as
	/**
	*本地存储，用于永久存储一些数据到浏览器内
	*@author yung
	*/
	//class laya.net.LocalStorage
	var LocalStorage=(function(){
		function LocalStorage(){};
		CLASS$(LocalStorage,'laya.net.LocalStorage');
		LocalStorage.setItem=function(key,value){
			LocalStorage.items && LocalStorage.items.setItem(key,value);
		}

		LocalStorage.getItem=function(key){
			return LocalStorage.items ? LocalStorage.items.getItem(key):null;
		}

		LocalStorage.setJSON=function(key,value){
			LocalStorage.items && LocalStorage.items.setItem(key,JSON.stringify(value));
		}

		LocalStorage.getJSON=function(key){
			return JSON.parse(LocalStorage.items ? LocalStorage.items.getItem(key):null);
		}

		LocalStorage.removeItem=function(key){
			LocalStorage.items && LocalStorage.items.removeItem(key);
		}

		LocalStorage.clear=function(){
			LocalStorage.items && LocalStorage.items.clear();
		}

		LocalStorage.items=null
		LocalStorage.__init$__=function(){
			/*__JS__ */LocalStorage.items=window.localStorage;
		}

		return LocalStorage;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/net/url.as
	/**
	*...
	*@author laya
	*/
	//class laya.net.URL
	var URL=(function(){
		function URL(url){
			this._url=null;
			this._path=null;
			this._url=URL.formatURL(url);
			this._path=URL.getPath(url);
		}

		CLASS$(URL,'laya.net.URL');
		var __proto__=URL.prototype;
		GETSET$(0,__proto__,'url',function(){
			return this._url;
		});

		GETSET$(0,__proto__,'path',function(){
			return this._path;
		});

		URL.formatURL=function(url,_basePath){
			if (url.charAt(0)=='/')return URL.rootPath+url;
			if (url.indexOf("file:")>=0)return url;
			_basePath || (_basePath=URL.basePath);
			return (url.indexOf(":/")> 0)?url:_basePath+url;
		}

		URL.getPath=function(url){
			var ofs=url.lastIndexOf('/');
			return ofs > 0?url.substr(0,ofs+1):"";
		}

		URL.getName=function(url){
			var ofs=url.lastIndexOf('/');
			return ofs > 0?url.substr(ofs+1):url;
		}

		URL.basePath="";
		URL.rootPath="";
		return URL;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/renders/render.as
	/**
	*Render管理类，单例，可以通过Laya.render访问
	*@author yung
	*/
	//class laya.renders.Render
	var Render=(function(){
		/**
		*初始化引擎
		*@param width 游戏窗口宽度
		*@param height 游戏窗口高度
		*@param renderType 渲染类型(auto,canvas,webgl)默认为auto，优先用webgl渲染，如果webgl不可用，则用canvas渲染
		*/
		function Render(width,height){
			Render._mainCanvas=new HTMLCanvas('2D');
			var style=Render._mainCanvas.source.style;
			style.position='absolute';
			style.top=style.left="0px";
			style.background="#000000";
			Render._isWebGl=Render.WebGL!=null;
			Render._isWebGl && Render.WebGL.init(Render.canvas,width,height);
			Browser.document.body.appendChild(Render._mainCanvas.source);
			Render._context=new RenderContext(width,height,Render._isWebGl?null:Render._mainCanvas);
			Browser.window.requestAnimationFrame(laya.renders.Render._loop);
		}

		CLASS$(Render,'laya.renders.Render');
		/**目前使用的渲染器*/
		GETSET$(1,Render,'context',function(){
			return Render._context;
		});

		/**是否是WebGl模式*/
		GETSET$(1,Render,'isWebGl',function(){
			return Render._isWebGl;
		});

		GETSET$(1,Render,'canvas',function(){
			return Render._mainCanvas;
		});

		Render._loop=function(){
			Laya.stage.loop();
			Browser.window.requestAnimationFrame(laya.renders.Render._loop);
		}

		Render._context=null
		Render._isWebGl=false;
		Render._mainCanvas=null
		Render.WebGL=null
		Render.clear=function(value){Render._context.ctx.clear();}
		return Render;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/renders/rendercontext.as
	/**
	*渲染器
	*@author yung
	*/
	//class laya.renders.RenderContext
	var RenderContext=(function(){
		function RenderContext(width,height,canvas){
			//this.ctx=null;
			this.x=0;
			this.y=0;
			//this.canvas=null;
			if (canvas){
				this.ctx=canvas.getContext('2d');
				}else {
				canvas=new HTMLCanvas("3D");
				this.ctx=System.createWebGLContext2D(canvas);
			}
			canvas.size(width,height);
			this.canvas=canvas;
		}

		CLASS$(RenderContext,'laya.renders.RenderContext');
		var __proto__=RenderContext.prototype;
		__proto__.destory=function(){
			if (this.canvas){
				this.canvas.destory();
				this.canvas=null;
			}
			this.ctx=null;
		}

		__proto__.drawTexture=function(tex,x,y,width,height,m){
			tex.loaded && this.ctx.drawTexture(tex,x,y,width,height,m,this.x,this.y);
		}

		__proto__._drawTexture=function(x,y,args){
			args[0].loaded && this.ctx.drawTexture(args[0],args[1],args[2],args[3],args[4],args[5],x,y);
		}

		__proto__.drawTextureWithTransform=function(tex,x,y,width,height,m){
			tex.loaded && this.ctx.drawTextureWithTransform(tex,x,y,width,height,m,this.x,this.y);
		}

		__proto__._drawTextureWithTransform=function(x,y,args){
			args[0].loaded && this.ctx.drawTextureWithTransform(args[0],args[1],args[2],args[3],args[4],args[5],x,y);
		}

		__proto__.fillQuadrangle=function(tex,x,y,point4,m){
			this.ctx.fillQuadrangle(tex,x,y,point4,m);
		}

		__proto__._fillQuadrangle=function(x,y,args){
			this.ctx.fillQuadrangle(args[0],args[1],args[2],args[3],args[4]);
		}

		/*
		public function fillQuadrangleWithUV(tex:*,x:Number,y:Number,point4:Array,uv:Array,m:Matrix):void{
			//this.ctx.fillQuadrangleWithUV(tex,x,y,point4,uv,m,this.x,this.y);
			this.ctx.fillQuadrangleWithUV(tex,x,y,point4,uv,m);
		}

		*/
		__proto__.drawCanvas=function(canvas,x,y,width,height){
			this.ctx.drawCanvas(canvas,x+this.x,y+this.y,width,height);
		}

		__proto__.drawRect=function(x,y,width,height,color,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var ctx=this.ctx;
			ctx.strokeStyle=color;
			ctx.lineWidth=lineWidth;
			ctx.strokeRect(x+this.x,y+this.y,width,height);
		}

		__proto__._drawRect=function(x,y,args){
			var ctx=this.ctx;
			if (args[4] !=null){
				ctx.fillStyle=args[4];
				ctx.fillRect(x+args[0],y+args[1],args[2],args[3]);
			}
			if (args[5] !=null){
				ctx.strokeStyle=args[5];
				ctx.lineWidth=args[6];
				ctx.strokeRect(x+args[0],y+args[1],args[2],args[3]);
			}
		}

		//x:Number,y:Number,points:Array,fillColor:String,lineColor:String=null,lineWidth:Number=1
		__proto__._drawPoly=function(x,y,args){
			var ctx=this.ctx;
			ctx.beginPath();
			var points=args[2];
			x+=args[0],y+=args[1];
			ctx.moveTo(x+points[0],y+points[1]);
			var i=2,n=points.length;
			while (i < n){
				ctx.lineTo(x+points[i++],y+points[i++]);
			}
			ctx.closePath();
			this.fillAndStroke(args[3],args[4],args[5]);
		}

		//x:Number,y:Number,paths:Array,brush:Object=null,pen:Object=null
		__proto__._drawPath=function(x,y,args){
			var ctx=this.ctx;
			ctx.beginPath();
			x+=args[0],y+=args[1];
			var paths=args[2];
			for (var i=0,n=paths.length;i < n;i++){
				var path=paths[i];
				switch (path[0]){
					case "moveTo":
						ctx.moveTo(x+path[1],y+path[2]);
						break ;
					case "lineTo":
						ctx.lineTo(x+path[1],y+path[2]);
						break ;
					case "arcTo":
						ctx.arcTo(x+path[1],y+path[2],x+path[3],y+path[4],path[5]);
						break ;
					case "closePath":
						ctx.closePath();
						break ;
					}
			};
			var brush=args[3];
			if (brush !=null){
				ctx.fillStyle=brush.fillStyle;
				ctx.fill();
			};
			var pen=args[4];
			if (pen !=null){
				ctx.strokeStyle=pen.strokeStyle;
				ctx.lineWidth=pen.lineWidth || 1;
				ctx.lineJoin=pen.lineJoin;
				ctx.lineCap=pen.lineCap;
				ctx.miterLimit=pen.miterLimit;
				ctx.stroke();
			}
		}

		__proto__.fillAndStroke=function(fillColor,strokeColor,lineWidth){
			if (fillColor !=null){
				this.ctx.fillStyle=fillColor;
				this.ctx.fill();
			}
			if (strokeColor !=null){
				this.ctx.strokeStyle=strokeColor;
				this.ctx.lineWidth=lineWidth;
				this.ctx.stroke();
			}
		}

		//矢量方法
		__proto__._drawPie=function(x,y,args){
			var ctx=this.ctx;
			ctx.translate(x+args[0],y+args[1]);
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.arc(0,0,args[2],args[3],args[4]);
			ctx.closePath();
			this.fillAndStroke(args[5],args[6],args[7]);
			ctx.translate(-x-args[0],-y-args[1]);
		}

		__proto__._drawPieWebGL=function(x,y,args){
			var ctx=this.ctx;
			ctx.lineWidth=args[7];
			debugger;
			ctx.fan(x+this.x+args[0],y+this.y+args[1],args[2],args[3],args[4],args[5],args[6]);
		}

		__proto__.clipRect=function(x,y,width,height){
			this.ctx.clipRect(x+this.x,y+this.y,width,height);
		}

		__proto__._clipRect=function(x,y,args){
			this.ctx.clipRect(x+args[0],y+args[1],args[2],args[3]);
		}

		__proto__.fillRect=function(x,y,width,height,fillStyle){
			this.ctx.fillRect(x+this.x,y+this.y,width,height,fillStyle);
		}

		__proto__._fillRect=function(x,y,args){
			this.ctx.fillRect(x+args[0],y+args[1],args[2],args[3],args[4]);
		}

		__proto__.drawCircle=function(x,y,radius,color,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.strokeStyle=color;
			ctx.lineWidth=lineWidth;
			ctx.arc(x+this.x,y+this.y,radius,0,RenderContext.PI2);
			ctx.stroke();
		}

		__proto__._drawCircle=function(x,y,args){
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.arc(args[0]+x,args[1]+y,args[2],0,RenderContext.PI2);
			this.fillAndStroke(args[3],args[4],args[5]);
		}

		__proto__._drawCircleWebGL=function(x,y,args){
			this.ctx.drawPoly(x+this.x+args[0],y+this.y+args[1],args[2],40,args[4],args[5],args[3]);
		}

		__proto__.fillCircle=function(x,y,radius,color){
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.fillStyle=color;
			ctx.arc(x+this.x,y+this.y,radius,0,RenderContext.PI2);
			ctx.fill();
		}

		__proto__._fillCircle=function(x,y,args){
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.fillStyle=args[3];
			ctx.arc(args[0]+x,args[1]+y,args[2],0,RenderContext.PI2);
			ctx.fill();
		}

		__proto__.setShader=function(shader){
			this.ctx.setShader(shader);
		}

		__proto__._setShader=function(x,y,args){
			this.ctx.setShader(args[0]);
		}

		__proto__.drawLine=function(fromX,fromY,toX,toY,color,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.strokeStyle=color;
			ctx.lineWidth=lineWidth;
			ctx.moveTo(this.x+fromX,this.y+fromY);
			ctx.lineTo(this.x+toX,this.y+toY);
			ctx.stroke();
		}

		__proto__.drawLinesWebGL=function(x,y,args){
			this.ctx.drawLines(x+this.x+args[0],y+this.y+args[1],args[2],args[3],args[4]);
		}

		__proto__._drawLine=function(x,y,args){
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.strokeStyle=args[4];
			ctx.lineWidth=args[5];
			ctx.moveTo(x+args[0],y+args[1]);
			ctx.lineTo(x+args[2],y+args[3]);
			ctx.stroke();
		}

		__proto__.drawLines=function(x,y,args){
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.strokeStyle=args[3];
			ctx.lineWidth=args[4];
			var points=args[2];
			x+=args[0],y+=args[1];
			ctx.moveTo(x+points[0],y+points[1]);
			var i=2,n=points.length;
			while (i < n){
				ctx.lineTo(x+points[i++],y+points[i++]);
			}
			ctx.stroke();
		}

		//x:Number,y:Number,points:Array,lineColor:String,lineWidth:Number=1
		__proto__.drawCurves=function(x,y,args){
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.strokeStyle=args[3];
			ctx.lineWidth=args[4];
			var points=args[2];
			x+=args[0],y+=args[1];
			ctx.moveTo(x+points[0],y+points[1]);
			var i=2,n=points.length;
			while (i < n){
				ctx.quadraticCurveTo(x+points[i++],y+points[i++],x+points[i++],y+points[i++]);
			}
			ctx.stroke();
		}

		__proto__.draw=function(x,y,args){
			args[0].call(null,this,x,y);
		}

		__proto__.clear=function(){
			this.ctx.clear();
		}

		__proto__.transform=function(a,b,c,d,tx,ty){
			this.ctx.transform(a,b,c,d,tx,ty);
		}

		__proto__.transformByMatrix=function(value){
			this.ctx.transformByMatrix(value);
		}

		__proto__._transformByMatrix=function(x,y,args){
			this.ctx.transformByMatrix(args[0]);
		}

		__proto__.setTransform=function(a,b,c,d,tx,ty){
			this.ctx.setTransform(a,b,c,d,tx,ty);
		}

		__proto__._setTransform=function(x,y,args){
			this.ctx.setTransform(args[0],args[1],args[2],args[3],args[4],args[5]);
		}

		__proto__.setTransformByMatrix=function(value){
			this.ctx.setTransformByMatrix(value);
		}

		__proto__._setTransformByMatrix=function(x,y,args){
			this.ctx.setTransformByMatrix(args[0]);
		}

		__proto__.save=function(){
			this.ctx.save();
		}

		__proto__.restore=function(){
			this.ctx.restore();
		}

		__proto__.translate=function(x,y){
			this.ctx.translate(x,y);
		}

		__proto__._translate=function(x,y,args){
			this.ctx.translate(args[0],args[1]);
		}

		__proto__.rotate=function(angle){
			this.ctx.rotate(angle);
		}

		__proto__._transform=function(x,y,args){
			this.ctx.translate(args[1]+x,args[2]+y);
			var mat=args[0];
			this.ctx.transform(mat.a,mat.b,mat.c,mat.d,mat.tx,mat.ty);
			this.ctx.translate(-x-args[1],-y-args[2]);
		}

		__proto__._rotate=function(x,y,args){
			this.ctx.translate(args[1]+x,args[2]+y);
			this.ctx.rotate(args[0]);
			this.ctx.translate(-x-args[1],-y-args[2]);
		}

		__proto__._scale=function(x,y,args){
			this.ctx.translate(args[2]+x,args[3]+y);
			this.ctx.scale(args[0],args[1]);
			this.ctx.translate(-x-args[2],-y-args[3]);
		}

		__proto__.scale=function(scaleX,scaleY){
			this.ctx.scale(scaleX,scaleY);
		}

		__proto__.alpha=function(value){
			this.ctx.globalAlpha *=value;
		}

		__proto__._alpha=function(x,y,args){
			this.ctx.globalAlpha *=args[0];
		}

		__proto__.setAlpha=function(value){
			this.ctx.globalAlpha=value;
		}

		__proto__._setAlpha=function(x,y,args){
			this.ctx.globalAlpha=args[0];
		}

		__proto__.fillWords=function(words,x,y,font,color){
			this.ctx.fillWords(words,x,y,font,color);
		}

		__proto__.fillText=function(text,x,y,font,color,textAlign){
			this.ctx.fillText(text,x+this.x,y+this.y,font,color,textAlign);
		}

		__proto__._fillText=function(x,y,args){
			this.ctx.fillText(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5]);
		}

		__proto__.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
			this.ctx.strokeText(text,x+this.x,y+this.y,font,color,lineWidth,textAlign);
		}

		__proto__._strokeText=function(x,y,args){
			this.ctx.strokeText(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5],args[5]);
		}

		__proto__.blendMode=function(type){
			this.ctx.globalCompositeOperation=type;
		}

		__proto__._blendMode=function(x,y,args){
			this.ctx.globalCompositeOperation=args[0];
		}

		__proto__.flush=function(){
			this.ctx.flush && this.ctx.flush();
		}

		__proto__.addRenderObject=function(o){
			this.ctx.addRenderObject(o);
		}

		__proto__.beginClip=function(x,y,w,h){
			this.ctx.beginClip && this.ctx.beginClip(x,y,w,h);
		}

		__proto__._beginClip=function(x,y,args){
			this.ctx.beginClip && this.ctx.beginClip(x+args[0],y+args[1],args[2],args[3]);
		}

		__proto__.endClip=function(){
			this.ctx.endClip && this.ctx.endClip();
		}

		__proto__._setIBVB=function(x,y,args){
			this.ctx.setIBVB(args[0]+x,args[1]+y,args[2],args[3],args[4],args[5],args[6],args[7]);
		}

		__proto__.fillTrangles=function(x,y,args){
			this.ctx.fillTrangles(args[0],args[1],args[2],args[3],args.length > 4 ? args[4] :null);
		}

		__proto__._fillTrangles=function(x,y,args){
			this.ctx.fillTrangles(args[0],args[1]+x,args[2]+y,args[3],args[4]);
		}

		__proto__.drawPath=function(x,y,args){
			this.ctx.drawPath(x+this.x+args[0],y+this.y+args[1],args[2],args[3],args[4]);
		}

		// polygon(x:Number,y:Number,r:Number,edges:Number,color:uint,borderWidth:int=2,borderColor:uint=0)
		__proto__.drawPoly=function(x,y,args){
			this.ctx.drawPoly(x+this.x+args[0],y+this.y+args[1],args[2],args[3],args[4],args[5],args[6]);
		}

		__proto__.drawParticle=function(x,y,args){
			this.ctx.drawParticle(x+this.x,y+this.y,args[0]);
		}

		RenderContext.PI2=2 *Math.PI;
		return RenderContext;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/renders/rendersprite.as
	/**
	*...
	*@author laya
	*/
	//class laya.renders.RenderSprite
	var RenderSprite=(function(){
		function RenderSprite(type,next){
			//this._next=null;
			//this._fun=null;
			this._next=next || RenderSprite.NORENDER;
			switch (type){
				case 0:
					this._fun=this._no;
					return;
				case 0x01:
					this._fun=this._image;
					return;
				case 0x04:
					this._fun=this._alpha;
					return;
				case 0x10:
					this._fun=this._transform;
					return;
				case 0x08:
					this._fun=this._blend;
					return;
				case 0x20:
					this._fun=this._canvas;
					return;
				case 0x40:
					this._fun=this._clip;
					return;
				case 0x80:
					this._fun=this._style;
					return;
				case 0x100:
					this._fun=this._graphics;
					return;
				case 0x400:
					this._fun=this._childs;
					return;
				case 0x200:
					this._fun=this._custom;
					return;
				case 0x01 | 0x100:
					this._fun=this._image2;
					return;
				case 0x01 | 0x10 | 0x100:
					this._fun=this._image2;
					return;
				case 0x02:
					this._fun=Filter._filter;
					return;
				case 0x11111:
					this._fun=RenderSprite._initRenderFun;
					return;
				}
			this.onCreate(type);
		}

		CLASS$(RenderSprite,'laya.renders.RenderSprite');
		var __proto__=RenderSprite.prototype;
		__proto__.onCreate=function(type){}
		__proto__._style=function(sprite,context,x,y){
			sprite._style.render(sprite,context,x,y);
			var next=this._next;
			next._fun.call(next,sprite,context,x,y);
		}

		__proto__._no=function(sprite,context,x,y){}
		__proto__._custom=function(sprite,context,x,y){
			sprite.customRender(context,x,y);
			var style=sprite._style;
			this._next._fun.call(this._next,sprite,context,x-style.translateX,y-style.translateY);
		}

		__proto__._clip=function(sprite,context,x,y){
			var next=this._next;
			if (next==RenderSprite.NORENDER)return;
			var r=sprite._style.scrollRect;
			context.ctx.save();
			context.ctx.clipRect(x,y,r.width,r.height);
			next._fun.call(next,sprite,context,x-r.x,y-r.y);
			context.ctx.restore();
		}

		__proto__._blend=function(sprite,context,x,y){
			var style=sprite._style;
			context.ctx.save();
			if (sprite.mask){
				sprite.mask.render(context,x,y);
				context.ctx.globalCompositeOperation="source-atop";
				}else if (style.blendMode){
				context.ctx.globalCompositeOperation=style.blendMode;
			};
			var next=this._next;
			next._fun.call(next,sprite,context,x,y);
			context.ctx.restore();
		}

		//}
		__proto__._graphics=function(sprite,context,x,y){
			var style=sprite._style;
			sprite._graphics && sprite._graphics._render(sprite,context,x-style.translateX,y-style.translateY);
			var next=this._next;
			next._fun.call(next,sprite,context,x,y);
		}

		__proto__._image=function(sprite,context,x,y){
			if (sprite._graphics._isOnlyOne()){
				var style=sprite._style;
				context.ctx.drawTexture2(x,y,style.translateX,style.translateY,sprite.transform,style.alpha,style.blendMode,sprite._graphics._one);
				}else {
				this._graphics(sprite,context,x,y);
				sprite._renderType &=~ /*CLASS CONST:laya.renders.RenderSprite.IMAGE*/0x01;
			}
		}

		__proto__._image2=function(sprite,context,x,y){
			if (sprite._graphics._isOnlyOne()){
				var style=sprite._style;
				context.ctx.drawTexture2(x,y,style.translateX,style.translateY,sprite.transform,1,null,sprite._graphics._one);
				}else {
				this._graphics(sprite,context,x,y);
				sprite._renderType &=~ /*CLASS CONST:laya.renders.RenderSprite.IMAGE*/0x01;
			}
		}

		__proto__._alpha=function(sprite,context,x,y){
			var style=sprite._style;
			var alpha;
			if ((alpha=style.alpha)> 0.01){
				context.ctx.globalAlpha *=alpha;
				var next=this._next;
				next._fun.call(next,sprite,context,x,y);
				context.ctx.globalAlpha /=alpha;
			}
		}

		__proto__._transform=function(sprite,context,x,y){
			var transform=sprite.transform,_next=this._next;
			if (transform && _next !=RenderSprite.NORENDER){
				context.save();
				context.transform(transform.a,transform.b,transform.c,transform.d,transform.tx+x,transform.ty+y);
				_next._fun.call(_next,sprite,context,0,0);
				context.restore();
			}else
			_next._fun.call(_next,sprite,context,x,y);
		}

		__proto__._childs=function(sprite,context,x,y){
			'use strict';
			var style=sprite._style;
			var tx=style.translateX+style.paddingLeft,ty=style.translateY+style.paddingTop;
			x+=tx;
			y+=ty;
			var words=sprite._getWords();
			words && context.fillWords(words,x,y,(style).font,(style).color);
			var childs=sprite._childs,n=childs.length,ele;
			if (sprite.scrollRect==null || !sprite.optimizeFloat){
				for (var i=0;i < n;++i)(ele=childs[i])._style.visible && ele.render(context,x,y);
				}else {
				var rect=sprite.scrollRect;
				for (i=0;i < n;++i){
					ele=childs[i];
					if (ele._style.visible && !(ele.x > rect.x+rect.width || ele.x+ele.width < rect.x || ele.y > rect.y+rect.height || ele.y+ele.height < rect.y)){
						ele.render(context,x,y);
					}
				}
			}
		}

		__proto__._canvas=function(sprite,context,x,y){
			var _cacheCanvas=sprite._cacheCanvas;
			var _next=this._next;
			if (!_cacheCanvas){
				_next._fun.call(_next,sprite,tx,x,y);
				return;
			};
			var _repaint=sprite.isRepaint();
			var tx=_cacheCanvas.ctx;
			var left=0,top=0;
			var w=sprite.width,h=sprite.height;
			if (sprite.autoSize || w===0 || h===0){
				var tRec;
				if (!sprite._cacheRec)
					sprite._cacheRec=new Rectangle();
				if (!sprite.autoSize && (sprite.width > 0 || sprite.height > 0)){
					tRec=sprite._cacheRec.setTo(0,0,sprite.width,sprite.height);
					}else {
					tRec=sprite.getSelfBounds();
					tRec.x-=10;
					tRec.y-=10;
					tRec.width+=20;
					tRec.height+=20;
					sprite._cacheRec.copyFrom(tRec);
				}
				w=tRec.width;
				h=tRec.height;
				left=tRec.x;
				top=tRec.y;
			}
			if (!tx){
				tx=_cacheCanvas.ctx=new RenderContext(w,h,new HTMLCanvas(/*laya.resource.HTMLCanvas.TYPEAUTO*/"AUTO"));
				_repaint=true;
			};
			var canvas=tx.canvas;
			if (_repaint){
				canvas.clear();
				(canvas.width !=w || canvas.height !=h)&& canvas.size(w,h);
				_next._fun.call(_next,sprite,tx,-left,-top);
				sprite.applyFilters();
			}
			context.drawCanvas(canvas,x+left,y+top,canvas.width,canvas.height);
		}

		RenderSprite.__init__=function(){
			var i=0,len=0;
			var initRender;
			initRender=System.createRenderSprite(0x11111,null);
			len=RenderSprite.renders.length=0x400 *2;
			for (i=0;i < len;i++)
			RenderSprite.renders[i]=initRender;
			RenderSprite.renders[0]=System.createRenderSprite(0,null);
			function _initSame (value,o){
				var n=0;
				for (var i=0;i < value.length;i++){
					n |=value[i];
					RenderSprite.renders[n]=o;
				}
			}
			_initSame([0x01,0x100,0x10,0x04],new RenderSprite(0x01,null));
			RenderSprite.renders[0x01 | 0x100]=System.createRenderSprite(0x01 | 0x100,null);
			RenderSprite.renders[0x01 | 0x10 | 0x100]=new RenderSprite(0x01 | 0x10 | 0x100,null);
		}

		RenderSprite._initRenderFun=function(sprite,context,x,y){
			var type=sprite._renderType;
			var r=RenderSprite.renders[type]=RenderSprite._getTypeRender(type);
			r._fun(sprite,context,x,y);
		}

		RenderSprite._getTypeRender=function(type){
			var rst=null;
			var tType=0x400;
			while (tType > 1){
				if (tType & type)
					rst=System.createRenderSprite(tType,rst);
				tType=tType >> 1;
			}
			return rst;
		}

		RenderSprite.IMAGE=0x01;
		RenderSprite.FILTERS=0x02;
		RenderSprite.ALPHA=0x04;
		RenderSprite.BLEND=0x08;
		RenderSprite.TRANSFORM=0x10;
		RenderSprite.CANVAS=0x20;
		RenderSprite.CLIP=0x40;
		RenderSprite.STYLE=0x80;
		RenderSprite.GRAPHICS=0x100;
		RenderSprite.CUSTOM=0x200;
		RenderSprite.CHILDS=0x400;
		RenderSprite.INIT=0x11111;
		RenderSprite.renders=[];
		RenderSprite.NORENDER=new RenderSprite(0,null);
		return RenderSprite;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/resource/bitmapresource.as
	/**
	*...
	*@author laya
	*/
	//class laya.resource.BitmapResource
	var BitmapResource=(function(){
		function BitmapResource(){
			//this._source=null;
			this._w=0;
			this._h=0;
			//this._id=0;
			this._lock=true;
			//this._glTex=null;
			this._repeat=true;
			this._mipmap=true;
			this._magFifter=-1;
			this._minFifter=-1;
			this._id=++BitmapResource._ID;
		}

		CLASS$(BitmapResource,'laya.resource.BitmapResource');
		var __proto__=BitmapResource.prototype;
		__proto__.size=function(w,h){
			this._w=w;
			this._h=h;
		}

		__proto__.onresize=function(){
			Resource.addCPUMemSize(-this.getMemSize());
			this._w=this._source.width;
			this._h=this._source.height;
			Resource.addCPUMemSize(this.getMemSize());
		}

		__proto__.release=function(){
			if (this._source){
				Resource.addCPUMemSize(-this.getMemSize());
				this._source=null;
			}
		}

		__proto__.destory=function(){
			this._glTex && this._glTex.destroy();
			this._glTex=null;
		}

		__proto__._newGLTextur2D=function(){
			if(this._magFifter==-1 && this._minFifter==-1){
				this._repeat=false;
				this._mipmap=false;
				this._magFifter=0x2601;
				this._minFifter=0x2601;
			}
			return this._glTex=System.createGLTextur(this);
		}

		__proto__.useGLTextur2D=function(){
			return this._glTex?this._glTex:this._newGLTextur2D();
		}

		__proto__.useGLTextur=function(){
			return this._glTex || (this._glTex=System.createGLTextur(this));
		}

		__proto__.getMemSize=function(){
			return this._source===null?0:(this._w *this._h *4);
		}

		__proto__.copyTo=function(dec){
			dec._source=this._source;
			dec._w=this._w;
			dec._h=this._h;
			dec._glTex=this._glTex;
			dec._repeat=this._repeat;
			dec._mipmap=this._mipmap;
			dec._magFifter=this._magFifter;
			dec._minFifter=this._minFifter;
		}

		GETSET$(0,__proto__,'ID',function(){
			return this._id;
		});

		GETSET$(0,__proto__,'source',function(){
			return this._source;
		});

		GETSET$(0,__proto__,'width',function(){
			return this._w;
		});

		GETSET$(0,__proto__,'height',function(){
			return this._h;
		});

		BitmapResource._ID=0;
		return BitmapResource;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/resource/context.as
	/**
	*...
	*@author laya
	*/
	//class laya.resource.Context
	var Context=(function(){
		function Context(){
			//this._canvas=null;
		}

		CLASS$(Context,'laya.resource.Context');
		var __proto__=Context.prototype;
		__proto__.fillRect=function(x,y,width,height,style){
			style && (this.fillStyle=style);
			/*__JS__ */this.__fillRect(x,y,width,height);
		}

		__proto__.fillText=function(text,x,y,font,color,textAlign){
			if (arguments.length > 3 && font!=null){
				this.font=font;
				this.fillStyle=color;
				/*__JS__ */this.textAlign=textAlign;
				this.textBaseline="top";
			}
			/*__JS__ */this.__fillText(text,x,y);
		}

		__proto__.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
			if (arguments.length > 3 && font!=null){
				this.font=font;
				/*__JS__ */this.strokeStyle=color;
				/*__JS__ */this.lineWidth=lineWidth;
				/*__JS__ */this.textAlign=textAlign;
				this.textBaseline="top";
			}
			/*__JS__ */this.__strokeText(text,x,y);
		}

		__proto__.transformByMatrix=function(value){
			this.transform(value.a,value.b,value.c,value.d,value.tx,value.ty);
		}

		__proto__.setTransformByMatrix=function(value){
			this.setTransform(value.a,value.b,value.c,value.d,value.tx,value.ty);
		}

		__proto__.clipRect=function(x,y,width,height){
			this.beginPath();
			this.rect(x,y,width,height);
			this.clip();
		}

		__proto__.drawTexture=function(tex,x,y,width,height,m,tx,ty){
			var uv=tex.uv,w=tex.resource.width,h=tex.resource.height;
			if (!width || !height){
				width=tex.width,height=tex.height;
			}
			if (m){
				this.save();
				this.transform(m.a,m.b,m.c,m.d,m.tx+tx,m.ty+ty);
				this.drawImage(tex.resource.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x+tex.offsetX,y+tex.offsetY,width,height);
				this.restore();
			}
			else{
				this.drawImage(tex.resource.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,Math.round(x+tx+tex.offsetX),Math.round(y+ty+tex.offsetY),width,height);
			}
		}

		__proto__.drawTexture2=function(x,y,pivotX,pivotY,m,alpha,blendMode,args2){
			if (m){
				this.save();
				this.transform(m.a,m.b,m.c,m.d,m.tx+x,m.ty+y);
				this.drawTexture(args2[0],args2[1]-pivotX,args2[2]-pivotY,args2[3],args2[4],args2[5],0,0);
				this.restore();
			}
			else{
				this.drawTexture(args2[0],args2[1]-pivotX+x,args2[2]-pivotY+y,args2[3],args2[4],args2[5],0,0);
			}
		}

		__proto__.drawTextureWithTransform=function(tex,x,y,width,height,m,tx,ty){
			this.drawTexture(tex,x,y,width,height,m,tx,ty);
		}

		__proto__.flush=function(){
			return 0;
		}

		__proto__.fillWords=function(words,x,y,font,color){
			font && (this.font=font);
			color && (this.fillStyle=color);
			var _this=this;
			words.forEach(function(a){
				_this.__fillText(a.char,a.x+x,a.y+y);
			});
		}

		__proto__.destory=function(){
			debugger;
		}

		__proto__.clear=function(){
			this.clearRect(0,0,this._canvas.width,this._canvas.height);
		}

		// }
		__proto__.arcTo=function(x1,y1,x2,y2,r){}
		__proto__.quadraticCurveTo=function(cpx,cpy,x,y){}
		GETSET$(0,__proto__,'lineJoin',null,function(value){
		});

		GETSET$(0,__proto__,'lineCap',null,function(value){
		});

		GETSET$(0,__proto__,'miterLimit',null,function(value){
		});

		Context.initContext2D=function(canvas,ctx){
			ctx.__fillText=ctx.fillText;
			ctx.__fillRect=ctx.fillRect;
			ctx.__strokeText=ctx.strokeText;
			var funs=['fillWords','fillRect','strokeText','fillText','transformByMatrix','setTransformByMatrix','clipRect','drawTexture','drawTexture2','drawTextureWithTransform','flush','clear','destroy'];
			funs.forEach(function(i){ctx[i]=Context._default[i];});
			ctx.drawCanvas=function (canvas,x,y,width,height){
				this.drawImage(canvas.source,x,y,width,height);
			}
			ctx.destory=function (){
				this.canvas.width=this.canvas.height=0;
			}
		}

		Context._default=new Context();
		return Context;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/resource/resource.as
	/**
	*...
	*@author laya
	*/
	//class laya.resource.Resource
	var Resource=(function(){
		function Resource(type,memSize,mgr){
			this._indexMgr=-1;
			this._released=false;
			this._lastUseTime=0;
			this._memSize=0;
			this._lock=false;
			//this._mgr=null;
			this._useNumber=0;
			//this._type=0;
			this._autoReleaseTime=0;
			this._indexMgr=-1;
			type===0 || (this._type=type);
			if(mgr){
				this._mgr=mgr;
				mgr.add(this);
			}
			this.changeMemSize(memSize);
		}

		CLASS$(Resource,'laya.resource.Resource');
		var __proto__=Resource.prototype;
		__proto__.lock=function(){
			this._lock=true;
		}

		__proto__.unlock=function(){
			this._lock=false;
		}

		__proto__.isLock=function(){
			return this._lock;
		}

		__proto__.resourceDestroy=function(){
			this.resourceRelease();
		}

		__proto__.changeMemSize=function(memSize){
			this._mgr && this._mgr.addSize(-this._memSize+memSize);
			this._memSize=memSize;
		}

		__proto__.resourceRelease=function(){
			if(!this._lock && !this._released){
				this._released=true;
				this._mgr.addSize(-this._memSize);
				return true;
			}
			return true;
		}

		__proto__.ready=function(){
			return !this._released;
		}

		__proto__.resourceRestore=function(){
			if(this._released){
				this._released=false;
				this._mgr.addSize(this._memSize);
			}
		}

		__proto__.outReleaseTime=function(now){
			return (now-this._lastUseTime)>this._autoReleaseTime;
		}

		__proto__.resourceActive=function(){
			this._lastUseTime=Laya.stage.now;
			this._useNumber++;
			this._released && this.resourceRestore();
			return true;
		}

		GETSET$(0,__proto__,'autoReleaseTime',null,function(tm){
			this._autoReleaseTime=tm;
		});

		GETSET$(0,__proto__,'resourceType',function(){
			return this._type;
		});

		Resource.getCPUMemSize=function(){
			return Resource._CPUMemsize;
		}

		Resource.addCPUMemSize=function(value){
			Resource._CPUMemsize+=value;
		}

		Resource.skeletonCache={};
		Resource.meshCache={};
		Resource._CPUMemsize=0;
		Resource.IMAGE=1;
		Resource.BUFFER=2;
		Resource.SOURD=3;
		Resource.FILE=4;
		Resource.TEXTURE=5;
		Resource.SHADER=6;
		Resource.CANVAS=7;
		Resource.MAXTYPE=10;
		return Resource;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/resource/resourcemgr.as
	/**
	*...
	*@author laya
	*/
	//class laya.resource.ResourceMgr
	var ResourceMgr=(function(){
		function ResourceMgr(memSizeNameInConfig){
			this._size=0;
			//this._maxSizeName=null;
			this._nullIndex=[];
			this._memUseWithType=[];
			this._all=new Array;
			this._maxSizeName=memSizeNameInConfig;
		}

		CLASS$(ResourceMgr,'laya.resource.ResourceMgr');
		var __proto__=ResourceMgr.prototype;
		__proto__.dosageStatistical=function(){
			var _$this=this;
			for (var i=0;i < /*laya.resource.Resource.MAXTYPE*/10;i++)this._memUseWithType[i]=0;
			this._all.forEach(function(o){o && (_$this._memUseWithType[o.resourceType]+=o._memSize);});
			return this._memUseWithType;
		}

		__proto__.GC=function(maxSize){
			(maxSize===void 0)&& (maxSize=-1);
			maxSize>=0 || (maxSize=Config[this._maxSizeName]);
			var all=this._all;
			if(maxSize>0){
				all=all.slice();
				all.sort(function(a,b){if(!a || !b)return 0;return a._lastUseTime-b._lastUseTime;});
				for(var i=0,n=all.length;i<n;i++){
					var o=all[i];
					if(o && !o._released && !o.isLock()){
						o.resourceRelease();
						if(this._size<maxSize)return;
					}
				}
			}
			else{
				var lockSize=0;
				all.forEach(function(o){
					if (!o)return;
					if (o.isLock()){
						lockSize+=o._memSize;
						return;
					}
					o && !o._released && o.resourceRelease();
				});
				if(this._size!=lockSize)throw "";
			}
		}

		__proto__.addSize=function(memSize){
			var maxSize=Config[this._maxSizeName];
			memSize>0 && ((this._size+memSize+maxSize/4)>=maxSize)&& this.GC(maxSize*0.8-memSize);
			this._size+=memSize;
		}

		__proto__.add=function(resource){
			if(resource._indexMgr===-1){
				if(this._nullIndex.length>0)resource._indexMgr=this._nullIndex.pop();
				else resource._indexMgr=this._all.length;
				this._all[resource._indexMgr]=resource;
			}
			else if(this._all[resource._indexMgr]!=resource)throw "";
		}

		__proto__.remove=function(resource){
			var index=resource._indexMgr;
			if(index>=0){
				if(this._all[index]!==resource)throw ("");
				this._all[index]=null;
				this._size-=resource._memSize;
				this._nullIndex.push(index);
				resource._indexMgr=-1;
			}
		}

		__proto__.tidy=function(){
			var _$this=this;
			var tm=Laya.stage.now;
			this._all.forEach(function(o){
				o && o.outReleaseTime(tm)&& (_$this.remove(o),o.resourceDestroy());
			});
		}

		GETSET$(0,__proto__,'size',function(){
			return this._size;
		});

		ResourceMgr.CPU=new ResourceMgr("CPUMemoryLimit");
		ResourceMgr.GPU=new ResourceMgr("GPUMemoryLimit");
		ResourceMgr.autoRelease=new ResourceMgr("CPUMemoryLimit");
		return ResourceMgr;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/styles/spritestyle.as
	/**
	*元素样式
	*@author yung
	*/
	//class laya.styles.SpriteStyle
	var SpriteStyle=(function(){
		function SpriteStyle(){
			this.scaleX=1;
			this.scaleY=1;
			this.pivotX=0;
			this.pivotY=0;
			this.rotation=0;
			this.alpha=1;
			this.visible=true;
			this.scrollRect=null;
			this.blendMode=null;
		}

		CLASS$(SpriteStyle,'laya.styles.SpriteStyle');
		SpriteStyle.EMPTY=new SpriteStyle();
		return SpriteStyle;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/styles/textstyle.as
	/**
	*文本样式
	*@author yung
	*/
	//class laya.styles.TextStyle
	var TextStyle=(function(){
		function TextStyle(){
			this.italic=false;
			this.align="left";
			this.valign="top";
			this.wordWrap=false;
			this.leading=0;
			this.padding=null;
			this.bgColor=null;
			this.borderColor=null;
			this.asPassword=false;
			this.stroke=0;
			this.strokeColor="#000000";
		}

		CLASS$(TextStyle,'laya.styles.TextStyle');
		TextStyle.EMPTY=new TextStyle();
		return TextStyle;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/system/system.as
	/**
	*...
	*@author laya
	*/
	//class laya.system.System
	var System=(function(){
		function System(){};
		CLASS$(System,'laya.system.System');
		System.FILTER_ACTIONS=[];
		System.createRenderSprite=function(type,next){return new RenderSprite(type,next);}
		System.createGLTextur=null;
		System.createWebGLContext2D=null;
		System.onStageResizeWithWebGL=function(w,h){};
		System.createGraphics=function(){return new Graphics()};
		System.createFilterAction=function(type){return new ColorFilterAction()};
		System.createParticleTemplate2D=null
		return System;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/browser.as
	/**
	*浏览器代理类，封装浏览器及原生js提供的一些功能
	*@author yung
	*/
	//class laya.utils.Browser
	var Browser=(function(){
		function Browser(){};
		CLASS$(Browser,'laya.utils.Browser');
		/**浏览器可视宽度*/
		GETSET$(1,Browser,'clientWidth',function(){
			return Browser.document.body.clientWidth;
		});

		/**浏览器可视高度*/
		GETSET$(1,Browser,'clientHeight',function(){
			return Browser.document.body.clientHeight || Browser.document.documentElement.clientHeight;
		});

		/**浏览器代理信息*/
		GETSET$(1,Browser,'userAgent',function(){
			return Browser.window.navigator.userAgent;
		});

		Browser.createElement=function(type){
			return Browser.document.__createElement(type);
		}

		Browser.getElementById=function(type){
			return Browser.document.getElementById(type);
		}

		Browser.removeElement=function(ele){
			if(ele&&ele.parentNode)ele.parentNode.removeChild(ele);
		}

		Browser.now=function(){
			return Date.now();
		}

		Browser.window=null
		Browser.document=null
		Browser.__init$__=function(){
			/*__JS__ */window.Browser=Browser;
			/*__JS__ */Browser.window=window;
			/*__JS__ */Browser.document=window.document;
			/*__JS__ */Browser.document.__createElement=Browser.document.createElement;
			/*__JS__ */window.requestAnimationFrame=(function(){return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||function (c){return window.setTimeout(c,1000 / 60);};})();
			/*__JS__ */window.Laya.init=Laya.init;
			/*__JS__ */window.Laya.stage=Laya.stage;
			/*__JS__ */window.Laya.timer=Laya.timer;
			/*__JS__ */window.Laya.loader=Laya.loader;
			/*__JS__ */window.Laya.render=Laya.render;
		}

		return Browser;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/byte.as
	//class laya.utils.Byte
	var Byte=(function(){
		function Byte(d){
			this._xd_=true;
			this._allocated_=8;
			//this._d_=null;
			//this._u8d_=null;
			this._pos_=0;
			this._length=0;
			if(d){
				this._u8d_=new Uint8Array(d);
				this._d_=new DataView(this._u8d_.buffer);
				this._length=this._d_.byteLength;
				}else{
				this.___resizeBuffer(this._allocated_);
			}
		}

		CLASS$(Byte,'laya.utils.Byte');
		var __proto__=Byte.prototype;
		__proto__.___resizeBuffer=function(len){
			try{
				var newByteView=new Uint8Array(len);
				if (this._u8d_!=null){
					if (this._u8d_.length <=len)newByteView.set (this._u8d_);
					else newByteView.set (this._u8d_.subarray (0,len));
				}
				this._u8d_=newByteView;
				this._d_=new DataView(newByteView.buffer);
			}
			catch (err){
				throw "___resizeBuffer err:"+len;
			}
		}

		__proto__.getString=function(){
			return this.rUTF(this.getUint16());
		}

		//LITTLE_ENDIAN only now;
		__proto__.getFloat32Array=function(start,len){
			var v=new Float32Array(this._d_.buffer.slice(start,start+len));
			this._pos_+=len;
			return v;
		}

		__proto__.getUint8Array=function(start,len){
			var v=new Uint8Array(this._d_.buffer.slice(start,start+len));
			this._pos_+=len;
			return v;
		}

		__proto__.getInt16Array=function(start,len){
			var v=new Int16Array(this._d_.buffer.slice(start,start+len));
			this._pos_+=len;
			return v;
		}

		__proto__.getFloat32=function(){
			var v=this._d_.getFloat32 (this._pos_,this._xd_);
			this._pos_+=4;
			return v;
		}

		__proto__.writeFloat32=function(value){
			this.ensureWrite (this._pos_+4);
			this._d_.setFloat32 (this._pos_,value,this._xd_);
			this._pos_+=4;
		}

		__proto__.getInt32=function(){
			var float=this._d_.getInt32(this._pos_,this._xd_);
			this._pos_+=4;
			return float;
		}

		__proto__.getUint32=function(){
			var v=this._d_.getUint32(this._pos_,this._xd_);
			this._pos_+=4;
			return v;
		}

		__proto__.writeInt32=function(value){
			this.ensureWrite (this._pos_+4);
			this._d_.setInt32(this._pos_,value,this._xd_);
			this._pos_+=4;
		}

		__proto__.writeUint32=function(value){
			this.ensureWrite (this._pos_+4);
			this._d_.setUint32(this._pos_,value,this._xd_);
			this._pos_+=4;
		}

		__proto__.getInt16=function(){
			var us=this._d_.getInt16(this._pos_,this._xd_);
			this._pos_+=2;
			return us;
		}

		__proto__.getUint16=function(){
			var us=this._d_.getUint16(this._pos_,this._xd_);
			this._pos_+=2;
			return us;
		}

		__proto__.writeUint16=function(value){
			this.ensureWrite (this._pos_+2);
			this._d_.setUint16(this._pos_,value,this._xd_);
			this._pos_+=2;
		}

		__proto__.writeInt16=function(value){
			this.ensureWrite (this._pos_+2);
			this._d_.setInt16(this._pos_,value,this._xd_);
			this._pos_+=2;
		}

		__proto__.getUint8=function(){
			return this._d_.getUint8(this._pos_++);
		}

		__proto__.writeUint8=function(value){
			this.ensureWrite (this._pos_+1);
			this._d_.setUint8(this._pos_,value,this._xd_);
			this._pos_++;
		}

		__proto__._getUInt8=function(pos){
			return this._d_.getUint8(pos);
		}

		__proto__._getUint16=function(pos){
			return this._d_.getUint16(pos,this._xd_);
		}

		__proto__._getMatrix=function(){
			var rst=new Matrix(this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32());
			return rst;
		}

		__proto__.rUTF=function(len){
			var v="",max=this._pos_+len,c=0,c2=0,c3=0,f=String.fromCharCode;
			var u=this._u8d_,i=0;
			while (this._pos_ < max){
				c=u[this._pos_++];
				if (c < 0x80){
					if (c !=0){v+=f(c);}
						}else if (c < 0xE0){
					v+=f(((c & 0x3F)<< 6)| (u[this._pos_++] & 0x7F));
					}else if (c < 0xF0){
					c2=u[this._pos_++];
					v+=f(((c & 0x1F)<< 12)| ((c2 & 0x7F)<< 6)| (u[this._pos_++] & 0x7F));
					}else {
					c2=u[this._pos_++];c3=u[this._pos_++];
					v+=f(((c & 0x0F)<< 18)| ((c2 & 0x7F)<< 12)| ((c3 << 6)& 0x7F)| (u[this._pos_++] & 0x7F));
				}
				i++;
			}
			return v;
		}

		// River:自定义的字符串读取,项目相关的内容
		__proto__.getCustomString=function(len){
			var v="",ulen=0,c=0,c2=0,f=String.fromCharCode;
			var u=this._u8d_,i=0;
			while (len > 0){
				c=u[this._pos_];
				if (c < 0x80){
					v+=f(c);
					this._pos_++;
					len--;
					}else {
					ulen=c-0x80;
					this._pos_++;
					len-=ulen;
					while (ulen > 0){
						c=u[this._pos_++];
						c2=u[this._pos_++];
						v+=f((c2 << 8)| c);
						ulen--;
					}
				}
			}
			return v;
		}

		__proto__.clear=function(){
			this._pos_=0;
			this.length=0;
		}

		__proto__.__getBuffer=function(){
			return this._d_.buffer;
		}

		/**
		*写字符串，该方法写的字符串要使用 readUTFBytes方法读
		*@param value 要写入的字符串
		*/
		__proto__.writeUTFBytes=function(value){
			value=value+"";
			for (var i=0,sz=value.length;i < sz;i++){
				var c=value.charCodeAt(i);
				if (c <=0x7F){
					this.writeByte (c);
					}else if (c <=0x7FF){
					this.writeByte (0xC0 | (c >> 6));
					this.writeByte (0x80 | (c & 63));
					}else if (c <=0xFFFF){
					this.writeByte(0xE0 | (c >> 12));
					this.writeByte(0x80 | ((c >> 6)& 63));
					this.writeByte(0x80 | (c & 63));
					}else {
					this.writeByte(0xF0 | (c >> 18));
					this.writeByte(0x80 | ((c >> 12)& 63));
					this.writeByte(0x80 | ((c >> 6)& 63));
					this.writeByte(0x80 | (c & 63));
				}
			}
		}

		__proto__.writeUTFString=function(value){
			var tPos=0;
			tPos=this.pos;
			this.writeInt16(1);
			this.writeUTFBytes(value);
			var dPos=0;
			dPos=this.pos-tPos-2;
			this._d_.setInt16(tPos,dPos,this._xd_);
		}

		__proto__.readUTFString=function(){
			var tPos=0;
			tPos=this.pos;
			var len=0;
			len=this.getInt16();
			return this.readUTFBytes(len);
		}

		/**
		*读字符串，必须是 writeUTFBytes方法写入的字符串
		*@param len 要读的buffer长度,默认将读取缓冲区全部数据
		*@return 读取的字符串
		*/
		__proto__.readUTFBytes=function(len){
			(len===void 0)&& (len=-1);
			len=len > 0?len:this.bytesAvailable;
			return this.rUTF(len);
		}

		__proto__.writeByte=function(value){
			this.ensureWrite (this._pos_+1);
			this._d_.setInt8 (this._pos_,value);
			this._pos_+=1;
		}

		__proto__.ensureWrite=function(lengthToEnsure){
			if (this._length < lengthToEnsure)this.length=lengthToEnsure;
		}

		__proto__.writeArrayBuffer=function(arraybuffer,offset,length){
			(offset===void 0)&& (offset=0);
			(length===void 0)&& (length=0);
			if (offset < 0 || length < 0)throw "writeArrayBuffer error - Out of bounds";
			if(length==0)length=arraybuffer.byteLength-offset;
			this.ensureWrite (this._pos_+length);
			var uint8array=new Uint8Array(arraybuffer);
			this._u8d_.set(uint8array.subarray (offset,offset+length),this._pos_);
			this._pos_+=length;
		}

		GETSET$(0,__proto__,'buffer',function(){
			return this._u8d_.buffer;
		});

		GETSET$(0,__proto__,'endian',function(){
			return this._xd_ ? "littleEndian" :"bigEndian";
			},function(endianStr){
			this._xd_=(endianStr=="littleEndian");
		});

		GETSET$(0,__proto__,'bytesAvailable',function(){
			return this.length-this._pos_;
		});

		GETSET$(0,__proto__,'length',function(){
			return this._length;
			},function(value){
			if (this._allocated_ < value)
				this.___resizeBuffer (this._allocated_=Math.floor (Math.max (value,this._allocated_ *2)));
			else if (this._allocated_ > value)
			this.___resizeBuffer (this._allocated_=value);
			this._length=value;
		});

		GETSET$(0,__proto__,'pos',function(){
			return this._pos_;
			},function(value){
			this._pos_=value;
			this._d_.byteOffset=value;
		});

		Byte.getSystemEndian=function(){
			if(!Byte._sysEndian){
				var buffer=new ArrayBuffer(2);new DataView(buffer).setInt16(0,256,true);
				Byte._sysEndian=(new Int16Array(buffer))[0]===256? /*CLASS CONST:laya.utils.Byte.LITTLE_ENDIAN*/"littleEndian":/*laya.utils.Byte.BIG_ENDIAN*/"bigEndian";
			}
			return Byte._sysEndian;
		}

		Byte.BIG_ENDIAN="bigEndian";
		Byte.LITTLE_ENDIAN="littleEndian";
		Byte._sysEndian=null;
		return Byte;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/color.as
	/**
	*...
	*@author laya
	*/
	//class laya.utils.Color
	var Color=(function(){
		function Color(str){
			this._color=[];
			//this.strColor=null;
			//this.numColor=0;
			if ((typeof str=='string')){
				this.strColor=str;
				if (str===null)str="#000000";
				str.charAt(0)=='#' && (str=str.substr(1));
				var color=this.numColor=/*__JS__ */parseInt(str,16);
				var flag=(str.length==8);
				if(flag){
					this._color=[/*__JS__ */parseInt(str.substr(0,2),16)/ 255,((0x00FF0000 & color)>> 16)/ 255,((0x0000FF00 & color)>> 8)/ 255,(0x000000FF & color)/ 255];
					return;
				}
				}else {
				color=this.numColor=str;
				this.strColor=Utils.toHexColor(color);
			}
			this._color=[((0xFF0000 & color)>> 16)/ 255,((0xFF00 & color)>> 8)/ 255,(0xFF & color)/ 255,1];
		}

		CLASS$(Color,'laya.utils.Color');
		Color._initDefault=function(){
			Color._DEFAULT={};
			for (var i in Color._COLOR_MAP)Color._SAVE[i]=Color._DEFAULT[i]=new Color(Color._COLOR_MAP[i]);
			return Color._DEFAULT;
		}

		Color._initSaveMap=function(){
			Color._SAVE_SIZE=0;
			Color._SAVE={};
			for (var i in Color._DEFAULT)Color._SAVE[i]=Color._DEFAULT[i];
		}

		Color.create=function(str){
			var color=Color._SAVE[str+""];
			if (color!=null)return color;
			(Color._SAVE_SIZE < 1000)|| Color._initSaveMap();
			return Color._SAVE[str+""]=new Color(str);
		}

		Color._SAVE={};
		Color._SAVE_SIZE=0;
		Color._COLOR_MAP={"white":'#FFFFFF',"red":'#FF0000',"green":'#00FF00',"blue":'#0000FF',"black":'#000000',"yellow":'#FFFF00','gray':'#AAAAAA'};
		Color._DEFAULT=Color._initDefault();
		return Color;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/dictionary.as
	/**
	*...
	*@author laya
	*/
	//class laya.utils.Dictionary
	var Dictionary=(function(){
		function Dictionary(){
			this._elements=[];
			this._keys=[];
		}

		CLASS$(Dictionary,'laya.utils.Dictionary');
		var __proto__=Dictionary.prototype;
		__proto__.set=function(key,value){
			var index=this.indexOf(key);
			if (index >=0){
				this._elements[index]=value;
				return;
			}
			this._keys.push(key);
			this._elements.push(value);
		}

		__proto__.indexOf=function(key){
			var index=this._keys.indexOf(key);
			if (index >=0)return index;
			key=((typeof key=='string'))?Number(key):(((typeof key=='number'))?key.toString():key);
			return this._keys.indexOf(key);
		}

		__proto__.get=function(key){
			var index=this.indexOf(key);
			return index < 0?null:this._elements[index];
		}

		__proto__.remove=function(key){
			var index=this.indexOf(key);
			if (index >=0){
				this._keys.splice(index,1);
				this._elements.splice(index,1);
				return true;
			}
			return false;
		}

		__proto__.clear=function(){
			this._elements.length=0;
			this._keys.length=0;
		}

		GETSET$(0,__proto__,'elements',function(){
			return this._elements;
		});

		GETSET$(0,__proto__,'keys',function(){
			return this._keys;
		});

		return Dictionary;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/dragging.as
	/**
	*触摸滑动控件
	*@author yung
	*/
	//class laya.utils.Dragging
	var Dragging=(function(){
		function Dragging(){
			this.ratio=0.92;
			this.maxOffset=50;
			//this.area=null;
			this.elastic=0;
			this.hasInertia=false;
			//this.data=null;
			this._elasticRateX=1;
			this._elasticRateY=1;
			//this._target=null;
			//this._lastX=NaN;
			//this._lastY=NaN;
			//this._offsetX=NaN;
			//this._offsetY=NaN;
		}

		CLASS$(Dragging,'laya.utils.Dragging');
		var __proto__=Dragging.prototype;
		__proto__.start=function(target,option){
			this.clearTimer();
			if (option){
				this.area=option.area || null;
				this.elastic=option.elastic || 0;
				this.hasInertia=option.hasInertia;
				this.data=option.data;
			}
			this._elasticRateX=this._elasticRateY=1;
			this._target=target;
			target.event(/*laya.events.Event.DRAG_START*/"dragstart",this.data);
			this._lastX=Laya.stage.mouseX;
			this._lastY=Laya.stage.mouseY;
			Laya.stage.once(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp);
			Laya.stage.once(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp);
			Laya.timer.frameLoop(1,this,this.loop,null,true);
		}

		__proto__.clearTimer=function(){
			this._target && Tween.clearTween(this._target);
			Laya.timer.clear(this,this.tweenMove);
			Laya.timer.clear(this,this.loop);
		}

		__proto__.stop=function(){
			this.onStageMouseUp(null);
		}

		__proto__.loop=function(){
			this._target.x+=(Laya.stage.mouseX-this._lastX)*this._elasticRateX;
			this._target.y+=(Laya.stage.mouseY-this._lastY)*this._elasticRateY;
			this.area && this.checkArea();
			this._lastX=Laya.stage.mouseX;
			this._lastY=Laya.stage.mouseY;
			this._target.event(/*laya.events.Event.DRAG_MOVE*/"dragmove",this.data);
		}

		__proto__.checkArea=function(){
			if (!this.elastic){
				this._target.x=Math.min(Math.max(this._target.x,this.area.x),this.area.x+this.area.width);
				this._target.y=Math.min(Math.max(this._target.y,this.area.y),this.area.y+this.area.height);
				}else {
				if (this._target.x < this.area.x){
					var offsetX=this.area.x-this._target.x;
					}else if (this._target.x > this.area.x+this.area.width){
					offsetX=this._target.x-this.area.x-this.area.width;
					}else {
					offsetX=0;
				}
				this._elasticRateX=Math.max(0,1-(offsetX / this.elastic));
				if (this._target.y < this.area.y){
					var offsetY=this.area.y-this._target.y;
					}else if (this._target.y > this.area.y+this.area.height){
					offsetY=this._target.y-this.area.y-this.area.height;
					}else {
					offsetY=0;
				}
				this._elasticRateY=Math.max(0,1-(offsetY / this.elastic));
			}
		}

		__proto__.onStageMouseUp=function(e){
			Laya.stage.off(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp);
			Laya.stage.off(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp);
			Laya.timer.clear(this,this.loop);
			if (this.hasInertia && !this.elastic){
				this._offsetX=Laya.stage.mouseX-this._lastX;
				this._offsetY=Laya.stage.mouseY-this._lastY;
				if (Math.abs(this._offsetX)> this.maxOffset)this._offsetX=this._offsetX > 0 ? this.maxOffset :-this.maxOffset;
				if (Math.abs(this._offsetY)> this.maxOffset)this._offsetY=this._offsetY > 0 ? this.maxOffset :-this.maxOffset;
				Laya.timer.frameLoop(1,this,this.tweenMove);
				}else if (this.elastic){
				if (this._target.x < this.area.x){
					Tween.to(this._target,{x:this.area.x},500,Ease.sineOut,new Handler(this,this.clear));
					}else if (this._target.x > this.area.x+this.area.width){
					Tween.to(this._target,{x:this.area.x+this.area.width},500,Ease.sineOut,new Handler(this,this.clear));
				}
				if (this._target.y < this.area.y){
					Tween.to(this._target,{y:this.area.y},500,Ease.sineOut,new Handler(this,this.clear));
					}else if (this._target.y > this.area.y+this.area.height){
					Tween.to(this._target,{y:this.area.y+this.area.height},500,Ease.sineOut,new Handler(this,this.clear));
				}
				}else {
				this.clear();
			}
		}

		__proto__.tweenMove=function(){
			this._offsetX *=this.ratio;
			this._offsetY *=this.ratio;
			this._target.x+=this._offsetX;
			this._target.y+=this._offsetY;
			this.area && this.checkArea();
			this._target.event(/*laya.events.Event.DRAG_MOVE*/"dragmove",this.data);
			if (Math.abs(this._offsetX)< 0.5 && Math.abs(this._offsetY)< 0.5)this.clear();
		}

		__proto__.clear=function(){
			if (this._target){
				var target=this._target;
				this._target=null;
				this.clearTimer();
				target.event(/*laya.events.Event.DRAG_END*/"dragend",this.data);
			}
		}

		return Dragging;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/ease.as
	/**
	*Ease
	*@author yung
	*/
	//class laya.utils.Ease
	var Ease=(function(){
		function Ease(){};
		CLASS$(Ease,'laya.utils.Ease');
		Ease.strongIn=function(t,b,c,d){
			return c *(t /=d)*t *t *t *t+b;
		}

		Ease.strongOut=function(t,b,c,d){
			return c *((t=t / d-1)*t *t *t *t+1)+b;
		}

		Ease.strongInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t *t+b;
			return c *0.5 *((t-=2)*t *t *t *t+2)+b;
		}

		Ease.sineIn=function(t,b,c,d){
			return-c *Math.cos(t / d *Ease.HALF_PI)+c+b;
		}

		Ease.sineOut=function(t,b,c,d){
			return c *Math.sin(t / d *Ease.HALF_PI)+b;
		}

		Ease.sineInOut=function(t,b,c,d){
			return-c *0.5 *(Math.cos(Math.PI *t / d)-1)+b;
		}

		Ease.quintIn=function(t,b,c,d){
			return c *(t /=d)*t *t *t *t+b;
		}

		Ease.quintOut=function(t,b,c,d){
			return c *((t=t / d-1)*t *t *t *t+1)+b;
		}

		Ease.quintInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t *t+b;
			return c *0.5 *((t-=2)*t *t *t *t+2)+b;
		}

		Ease.quartIn=function(t,b,c,d){
			return c *(t /=d)*t *t *t+b;
		}

		Ease.quartOut=function(t,b,c,d){
			return-c *((t=t / d-1)*t *t *t-1)+b;
		}

		Ease.quartInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t+b;
			return-c *0.5 *((t-=2)*t *t *t-2)+b;
		}

		Ease.QuadIn=function(t,b,c,d){
			return c *(t /=d)*t+b;
		}

		Ease.QuadOut=function(t,b,c,d){
			return-c *(t /=d)*(t-2)+b;
		}

		Ease.QuadInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t+b;
			return-c *0.5 *((--t)*(t-2)-1)+b;
		}

		Ease.linearNone=function(t,b,c,d){
			return c *t / d+b;
		}

		Ease.linearIn=function(t,b,c,d){
			return c *t / d+b;
		}

		Ease.linearOut=function(t,b,c,d){
			return c *t / d+b;
		}

		Ease.linearInOut=function(t,b,c,d){
			return c *t / d+b;
		}

		Ease.expoIn=function(t,b,c,d){
			return (t==0)? b :c *Math.pow(2,10 *(t / d-1))+b-c *0.001;
		}

		Ease.expoOut=function(t,b,c,d){
			return (t==d)? b+c :c *(-Math.pow(2,-10 *t / d)+1)+b;
		}

		Ease.expoInOut=function(t,b,c,d){
			if (t==0)return b;
			if (t==d)return b+c;
			if ((t /=d *0.5)< 1)return c *0.5 *Math.pow(2,10 *(t-1))+b;
			return c *0.5 *(-Math.pow(2,-10 *--t)+2)+b;
		}

		Ease.elasticIn=function(t,b,c,d,a,p){
			(a===void 0)&& (a=0);
			(p===void 0)&& (p=0);
			var s;
			if (t==0)return b;
			if ((t /=d)==1)return b+c;
			if (!p)p=d *.3;
			if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
				a=c;
				s=p / 4;
			}else s=p / Ease.PI2 *Math.asin(c / a);
			return-(a *Math.pow(2,10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p))+b;
		}

		Ease.elasticOut=function(t,b,c,d,a,p){
			(a===void 0)&& (a=0);
			(p===void 0)&& (p=0);
			var s;
			if (t==0)return b;
			if ((t /=d)==1)return b+c;
			if (!p)p=d *.3;
			if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
				a=c;
				s=p / 4;
			}else s=p / Ease.PI2 *Math.asin(c / a);
			return (a *Math.pow(2,-10 *t)*Math.sin((t *d-s)*Ease.PI2 / p)+c+b);
		}

		Ease.elasticInOut=function(t,b,c,d,a,p){
			(a===void 0)&& (a=0);
			(p===void 0)&& (p=0);
			var s;
			if (t==0)return b;
			if ((t /=d *0.5)==2)return b+c;
			if (!p)p=d *(.3 *1.5);
			if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
				a=c;
				s=p / 4;
			}else s=p / Ease.PI2 *Math.asin(c / a);
			if (t < 1)return-.5 *(a *Math.pow(2,10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p))+b;
			return a *Math.pow(2,-10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p)*.5+c+b;
		}

		Ease.cubicIn=function(t,b,c,d){
			return c *(t /=d)*t *t+b;
		}

		Ease.cubicOut=function(t,b,c,d){
			return c *((t=t / d-1)*t *t+1)+b;
		}

		Ease.cubicInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t *t+b;
			return c *0.5 *((t-=2)*t *t+2)+b;
		}

		Ease.circIn=function(t,b,c,d){
			return-c *(Math.sqrt(1-(t /=d)*t)-1)+b;
		}

		Ease.circOut=function(t,b,c,d){
			return c *Math.sqrt(1-(t=t / d-1)*t)+b;
		}

		Ease.circInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return-c *0.5 *(Math.sqrt(1-t *t)-1)+b;
			return c *0.5 *(Math.sqrt(1-(t-=2)*t)+1)+b;
		}

		Ease.bounceOut=function(t,b,c,d){
			if ((t /=d)< (1 / 2.75))return c *(7.5625 *t *t)+b;
			else if (t < (2 / 2.75))return c *(7.5625 *(t-=(1.5 / 2.75))*t+.75)+b;
			else if (t < (2.5 / 2.75))return c *(7.5625 *(t-=(2.25 / 2.75))*t+.9375)+b;
			else return c *(7.5625 *(t-=(2.625 / 2.75))*t+.984375)+b;
		}

		Ease.bounceIn=function(t,b,c,d){
			return c-Ease.bounceOut(d-t,0,c,d)+b;
		}

		Ease.bounceInOut=function(t,b,c,d){
			if (t < d *0.5)return Ease.bounceIn(t *2,0,c,d)*.5+b;
			else return Ease.bounceOut(t *2-d,0,c,d)*.5+c *.5+b;
		}

		Ease.backIn=function(t,b,c,d,s){
			(s===void 0)&& (s=1.70158);
			return c *(t /=d)*t *((s+1)*t-s)+b;
		}

		Ease.backOut=function(t,b,c,d,s){
			(s===void 0)&& (s=1.70158);
			return c *((t=t / d-1)*t *((s+1)*t+s)+1)+b;
		}

		Ease.backInOut=function(t,b,c,d,s){
			(s===void 0)&& (s=1.70158);
			if ((t /=d *0.5)< 1)return c *0.5 *(t *t *(((s *=(1.525))+1)*t-s))+b;
			return c / 2 *((t-=2)*t *(((s *=(1.525))+1)*t+s)+2)+b;
		}

		Ease.HALF_PI=Math.PI *0.5;
		Ease.PI2=Math.PI *2;
		return Ease;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/handler.as
	/**
	*处理器
	*@author yung
	*/
	//class laya.utils.Handler
	var Handler=(function(){
		function Handler(caller,method,args,once){
			//this.caller=null;
			//this.method=null;
			//this.args=null;
			this.once=false;
			//this.recovered=false;
			(once===void 0)&& (once=false);
			this.setTo(caller,method,args,once);
		}

		CLASS$(Handler,'laya.utils.Handler');
		var __proto__=Handler.prototype;
		/**
		*设置处理器
		*@param caller 执行域(this)
		*@param method 回调方法
		*@param args 携带的参数
		*@param once 是否只执行一次，如果为true，执行后执行recover()进行回收
		*@return 返回handler本身
		*/
		__proto__.setTo=function(caller,method,args,once){
			this.caller=caller;
			this.method=method;
			this.args=args;
			this.once=once;
			this.recovered=false;
			return this;
		}

		/**
		*执行处理器
		*/
		__proto__.run=function(){
			this.method.apply(this.caller,this.args);
			this.once && this.recover();
		}

		/**
		*执行处理器，携带额外数据
		*@param data 附加的回调数据，可以是单数据或者Array
		*/
		__proto__.runWith=function(data){
			if (this.method==null)return;
			if (data==null)this.method.apply(this.caller,this.args);
			else if (!this.args && !data.pop)this.method.call(this.caller,data);
			else if (this.args)this.method.apply(this.caller,this.args ? this.args.concat(data):data);
			else this.method.apply(this.caller,data);
			this.once && this.recover();
		}

		/**
		*清理对象引用
		*/
		__proto__.clear=function(){
			this.caller=null;
			this.method=null;
			this.args=null;
			return this;
		}

		/**
		*clear()并回收到Handler对象池内
		*/
		__proto__.recover=function(){
			if (!this.recovered){
				this.recovered=true;
				Handler._pool.push(this.clear());
			}
		}

		Handler.create=function(caller,method,args,once){
			(once===void 0)&& (once=true);
			if (Handler._pool.length)return Handler._pool.pop().setTo(caller,method,args,once);
			return new Handler(caller,method,args,once);
		}

		Handler._pool=[];
		return Handler;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/htmlchar.as
	/**
	*...
	*@author laya
	*/
	//class laya.utils.HTMLChar
	var HTMLChar=(function(){
		function HTMLChar(char,w,h,style){
			//this._x=NaN;
			//this._y=NaN;
			//this._w=NaN;
			//this._h=NaN;
			//this.isWord=false;
			//this.char=null;
			//this.style=null;
			this.char=char;
			this._x=this._y=0;
			this.width=w;
			this.height=h;
			this.style=style;
			this.isWord=!HTMLChar._isWordRegExp.test(char);
		}

		CLASS$(HTMLChar,'laya.utils.HTMLChar');
		var __proto__=HTMLChar.prototype;
		LAYABOX.implements(__proto__,{"laya.display.ILayout":true})
		__proto__._isChar=function(){
			return true;
		}

		__proto__._getCSSStyle=function(){
			return this.style;
		}

		GETSET$(0,__proto__,'x',function(){
			return this._x;
			},function(value){
			this._x=value;
		});

		GETSET$(0,__proto__,'y',function(){
			return this._y;
			},function(value){
			this._y=value;
		});

		GETSET$(0,__proto__,'width',function(){
			return this._w;
			},function(value){
			this._w=value;
		});

		GETSET$(0,__proto__,'height',function(){
			return this._h;
			},function(value){
			this._h=value;
		});

		HTMLChar._isWordRegExp=new RegExp("[\\w\.]","");
		return HTMLChar;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/parsejosn.as
	/**
	*...
	*@author laya
	*/
	//class laya.utils.ParseJOSN
	var ParseJOSN=(function(){
		function ParseJOSN(){};
		CLASS$(ParseJOSN,'laya.utils.ParseJOSN');
		ParseJOSN.parse=function(json,parent,url){
			var preBasePath=URL.basePath;
			URL.basePath=URL.getPath(URL.formatURL(url));
			var objects=JSON.parse(json);
			for (var i=0,n=objects.length;i < n;i++){
				var one=objects[i];
				var className=one['className'];
				var obj=Utils.New(className);
				var param;
				console.log(className,obj);
				for (var funName in one){
					if (funName==='className')continue ;
					param=one[funName];
					if (funName==='parent'){
						if (param===-1)
							parent.addChild(obj);
						else
						objects[param].__new__.addChild(obj);
						continue ;
					}
					if (funName.indexOf('.')< 0){
						obj["_$set_"+funName]
						?obj[funName]=param
						:(((param instanceof Array))?obj[funName].apply(obj,param):obj[funName].call(obj,param));
					}
					else{
						var words=funName.split('.');
						var p=obj[words[0]];
						p[words[1]].apply(p,param);
					}
				}
				one.__new__=obj;
			}
			URL.basePath=preBasePath;
		}

		return ParseJOSN;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/soundmanager.as
	/**
	*声音管理类
	*@author ww
	*@version 1.0
	*@created 2015-9-10 下午2:35:21
	*/
	//class laya.utils.SoundManager
	var SoundManager=(function(){
		function SoundManager(){};
		CLASS$(SoundManager,'laya.utils.SoundManager');
		/**
		*设置是否禁音
		*/
		/**
		*获取是否禁音
		*/
		GETSET$(1,SoundManager,'muted',function(){
			return SoundManager._muted;
			},function(value){
			if(value){
				if(SoundManager.tMusic)SoundManager.stopSound(SoundManager.tMusic);
				}else{
			}
			SoundManager._muted=value;
		});

		SoundManager.soundCompleteFun=function(e){
			var tUrl=e.target.src;
			if(SoundManager.callBackDic[tUrl]){
				SoundManager.callBackDic[tUrl]();
				SoundManager.removeCallBack(tUrl);
			}
		}

		SoundManager.removeCallBack=function(url){
			if(SoundManager.audioDic[url]&&SoundManager.callBackDic[url]){
				SoundManager.audioDic[url].removeEventListener("ended",SoundManager.callBackDic[url]);
				delete SoundManager.callBackDic[url];
			}
		}

		SoundManager.playSound=function(url,loop,complete){
			(loop===void 0)&& (loop=false);
			if(SoundManager._muted)return null;
			var tAudio=SoundManager.audioDic[url];
			if(!tAudio){
				tAudio=Browser.createElement("audio");
				SoundManager.audioDic[url]=tAudio;
				Browser.document.body.appendChild(tAudio);
				tAudio.src=url;
			}
			tAudio.loop=loop;
			tAudio.currentTime=0;
			SoundManager.setVolume(url,(url==SoundManager.tMusic)?SoundManager.musicVolume:SoundManager.soundVolume);
			if(complete!=null){
				SoundManager.removeCallBack(url);
				SoundManager.callBackDic[tAudio.src]=complete;
				tAudio.addEventListener("ended",SoundManager.soundCompleteFun);
			}
			tAudio.play();
			return tAudio;
		}

		SoundManager.disposeSound=function(url){
			SoundManager.removeCallBack(url);
			var tAudio=SoundManager.audioDic[url];
			if(tAudio){
				Browser.removeElement(tAudio);
				tAudio.pause();
				delete SoundManager.audioDic[url];
			}
		}

		SoundManager.playMusic=function(url,loop,complete){
			(loop===void 0)&& (loop=true);
			SoundManager.tMusic=url;
			return SoundManager.playSound(url,loop,complete);
		}

		SoundManager.stopSound=function(url){
			if(SoundManager.audioDic[url])SoundManager.audioDic[url].pause();
		}

		SoundManager.setSoundVolume=function(volume,url){
			if(url){
				SoundManager.setVolume(url,volume);
				}else{
				SoundManager.soundVolume=volume;
			}
		}

		SoundManager.setVolume=function(url,volume){
			if(SoundManager.audioDic[url])SoundManager.audioDic[url].volume=volume;
		}

		SoundManager.setMusicVolume=function(volume){
			SoundManager.musicVolume=volume;
			SoundManager.setVolume(SoundManager.tMusic,volume);
		}

		SoundManager.musicVolume=1;
		SoundManager.soundVolume=1;
		SoundManager._muted=false;
		SoundManager.tMusic=null;
		SoundManager.audioDic={};
		SoundManager.callBackDic={};
		return SoundManager;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/stat.as
	/**
	*帧率统计
	*@author yung
	*/
	//class laya.utils.Stat
	var Stat=(function(){
		function Stat(){};
		CLASS$(Stat,'laya.utils.Stat');
		Stat.show=function(){
			Stat.preFrameTime=Stat._timer=Browser.now()-1000;
			Stat._view[0]={title:"FPS(3D)",value:"_fpsStr",color:"yellow",units:"int" };
			Stat._view[1]={title:"sprite",value:"spriteDraw",color:"white",units:"int" };
			Stat._view[2]={title:"memory",value:"cpuMemSize",color:"white",units:"M" };
			Stat._view[3]={title:"textures",value:"texturesMemSize",color:"white",units:"M" };
			Stat._view[4]={title:"GPUBuffer",value:"gpuBufferMemSize",color:"white",units:"M" };
			Stat._view[5]={title:"shader",value:"shaderCall",color:"white",units:"int" };
			Stat._view[6]={title:"drawCall",value:"drawCall",color:"white",units:"int" };
			Stat._view[7]={title:"trFaces",value:"trianglesFaces",color:"white",units:"int" };
			Stat._view[8]={title:"render",value:"RenderUseTime",color:"white",units:"int" };
			if (!Render.isWebGl){
				Stat._view[0].title="FPS(2D)";
				Stat._view.length=3;
			}
			for (var i=0;i < Stat._view.length;i++){
				Stat._view[i].x=4;
				Stat._view[i].y=i *12+2;
			}
			Stat._height=Stat._view.length *12+4;
			if (!Stat._canvas){
				Stat._canvas=new HTMLCanvas('2D');
				Stat._canvas.size(Stat._width,Stat._height);
				Stat._ctx=Stat._canvas.getContext('2d');
				Stat._ctx.textBaseline="top";
				var canvas=Stat._canvas.source;
				canvas.style.cssText="z-index:100000;position: absolute;left:"+Stat._left+"px;top:"+Stat._top+"px;width:"+Stat._width+"px;height:"+Stat._height+"px;";
			}
			Laya.timer.frameLoop(1,Stat,Stat.loop);
			Browser.document.body.appendChild(Stat._canvas.source);
		}

		Stat.hide=function(){
			var canvas=Stat._canvas.source;
			Browser.removeElement(canvas);
			Laya.timer.clear(Stat,Stat.loop);
		}

		Stat.clear=function(){
			Stat.trianglesFaces=0;
			Stat.drawCall=0;
			Stat.shaderCall=0;
			Stat.spriteDraw=-1;
		}

		Stat.loop=function(){
			Stat._count++;
			var timer=Browser.now();
			Stat.interval=Browser.now()-Stat.preFrameTime;
			Stat.preFrameTime=timer;
			if (timer-Stat._timer < 1000){
				Stat.clear();
				return;
			}
			Stat._count=Math.round((Stat._count *1000)/ (timer-Stat._timer));
			var uses=ResourceMgr.GPU.dosageStatistical();
			Stat.cpuMemSize=ResourceMgr.CPU.size+Resource.getCPUMemSize();
			Stat.gpuBufferMemSize=uses[ /*laya.resource.Resource.BUFFER*/2];
			Stat.texturesMemSize=uses[ /*laya.resource.Resource.TEXTURE*/5];
			Stat.FPS=Stat._count;
			Stat._fpsStr=Stat._count+"("+Stat.interval+")";
			var ctx=Stat._ctx;
			ctx.clearRect(0,0,Stat._width,Stat._height);
			ctx.fillStyle="rgba(50,50,60,0.8)";
			ctx.fillRect(0,0,Stat._width,Stat._height);
			for(var i=0;i<Stat._view.length;i++){
				var one=Stat._view[i];
				ctx.fillStyle="white";
				ctx.fillText(one.title,one.x,one.y);
				ctx.fillStyle=one.color;
				var value=Stat[one.value];
				(one.units=="M")&& (value=Math.floor(value / (1024 *1024)*100)/ 100+" M");
				ctx.fillText(value+"",one.x+60,one.y);
			}
			Stat._count=0;
			Stat._timer=timer;
			Stat.clear();
		}

		Stat.loopCount=0;
		Stat.cpuMemSize=0;
		Stat.gpuBufferMemSize=0;
		Stat.texturesMemSize=0;
		Stat.shaderCall=0;
		Stat.drawCall=0;
		Stat.trianglesFaces=0;
		Stat.spriteDraw=0;
		Stat.FPS=0;
		Stat.RenderUseTime=0;
		Stat.interval=0;
		Stat.preFrameTime=0;
		Stat._fpsStr=null
		Stat._canvas=null
		Stat._ctx=null
		Stat._timer=NaN
		Stat._count=0;
		Stat._left=5;
		Stat._top=5;
		Stat._width=120;
		Stat._height=100;
		Stat._view=[];
		return Stat;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/stringkey.as
	/**
	*...
	*@author laya
	*/
	//class laya.utils.StringKey
	var StringKey=(function(){
		function StringKey(){
			this._strs={};
			this._length=0;
		}

		CLASS$(StringKey,'laya.utils.StringKey');
		var __proto__=StringKey.prototype;
		__proto__.add=function(str){
			var index=this._strs[str];
			if (index !=null)return index;
			return this._strs[str]=this._length++;
		}

		__proto__.get=function(str){
			var index=this._strs[str];
			return index==null?-1:index;
		}

		return StringKey;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/timer.as
	/**
	*时钟管理类，单例，可以通过Laya.timer访问
	*@author yung
	*/
	//class laya.utils.Timer
	var Timer=(function(){
		var TimerHandler;
		function Timer(){
			this.scale=1;
			this.currFrame=0;
			this._cid=1;
			this._mid=1;
			this._map=[];
			this._laters=[];
			this._handlers=[];
			this._pool=[];
			this.currTimer=Browser.now();
			this._lastTimer=Browser.now();
			Laya.timer && Laya.timer.frameLoop(1,this,this._update);
		}

		CLASS$(Timer,'laya.utils.Timer');
		var __proto__=Timer.prototype;
		__proto__._update=function(){
			if (this.scale <=0){
				this._lastTimer=Browser.now();
				return;
			};
			var frame=this.currFrame=this.currFrame+this.scale;
			var now=Browser.now();
			var timer=this.currTimer=this.currTimer+(now-this._lastTimer)*this.scale;
			this._lastTimer=now;
			var laters=this._laters;
			for (var i=0,n=laters.length-1;i <=n;++i){
				var handler=laters[i];
				handler.method!==null && handler.run(false);
				this._recoverHandler(handler);
				i===n && (n=laters.length-1);
			}
			laters.length=0;
			var handlers=this._handlers;
			for (i=handlers.length-1;i >-1;--i){
				handler=handlers[i];
				if (handler.method!==null){
					var t=handler.userFrame ? frame :timer;
					if (t >=handler.exeTime){
						if (handler.repeat){
							do {
								handler.exeTime+=handler.delay;
								handler.run(false);
							}while (t >=handler.exeTime);
							}else {
							handler.run(true);
						}
					}
					}else {
					handlers.splice(i,1);
					this._recoverHandler(handler);
				}
			}
		}

		__proto__._recoverHandler=function(handler){
			handler.clear();
			this._map[handler.key]=null;
			this._pool.push(handler);
		}

		__proto__._create=function(useFrame,repeat,delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			if (!delay){
				method.apply(caller,args);
				return;
			}
			if (coverBefore){
				var handler=this._getHandler(caller,method);
				if (handler){
					handler.repeat=repeat;
					handler.userFrame=useFrame;
					handler.delay=delay;
					handler.args=args;
					handler.exeTime=delay+(useFrame ? this.currFrame :this.currTimer);
					return;
				}
			}
			if (this._pool.length)handler=this._pool.pop();
			else handler=new TimerHandler();
			handler.repeat=repeat;
			handler.userFrame=useFrame;
			handler.delay=delay;
			handler.caller=caller;
			handler.method=method;
			handler.args=args;
			handler.exeTime=delay+(useFrame ? this.currFrame :this.currTimer);
			this._indexHandler(handler);
			this._handlers.push(handler);
		}

		__proto__._indexHandler=function(handler){
			var caller=handler.caller;
			var method=handler.method;
			caller && !caller.$_TID && (caller.$_TID=this._cid++);
			!method.$_TID && (method.$_TID=(this._mid++)*100000);
			handler.key=(caller ? caller.$_TID :0)+method.$_TID+"";
			this._map[handler.key]=handler;
		}

		/**
		*定时执行一次
		*@param delay 延迟时间(单位毫秒)
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为false
		*/
		__proto__.once=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			this._create(false,false,delay,caller,method,args,coverBefore);
		}

		/**
		*定时重复执行
		*@param delay 间隔时间(单位毫秒)
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为false
		*/
		__proto__.loop=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			this._create(false,true,delay,caller,method,args,coverBefore);
		}

		/**
		*定时执行一次(基于帧率)
		*@param delay 延迟几帧(单位为帧)
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为false
		*/
		__proto__.frameOnce=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			this._create(true,false,delay,caller,method,args,coverBefore);
		}

		/**
		*定时重复执行(基于帧率)
		*@param delay 间隔几帧(单位为帧)
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为false
		*/
		__proto__.frameLoop=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			this._create(true,true,delay,caller,method,args,coverBefore);
		}

		/**定时器执行数量*/
		__proto__.stat=function(){
			return "callLater:"+this._laters.length+" handlers:"+this._handlers.length+" pool:"+this._pool.length;
		}

		/**
		*清理定时器
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*/
		__proto__.clear=function(caller,method){
			var handler=this._getHandler(caller,method);
			handler && handler.clear();
		}

		__proto__._getHandler=function(caller,method){
			var key=(caller ? caller.$_TID :0)+method.$_TID+"";
			return this._map[key];
		}

		/**
		*延迟执行
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*/
		__proto__.callLater=function(caller,method,args){
			if (this._getHandler(caller,method)==null){
				if (this._pool.length)
					var handler=this._pool.pop();
				else handler=new TimerHandler();
				handler.caller=caller;
				handler.method=method;
				handler.args=args;
				this._indexHandler(handler);
				this._laters.push(handler);
			}
		}

		/**
		*立即执行callLater
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*/
		__proto__.runCallLater=function(caller,method){
			var handler=this._getHandler(caller,method);
			if (handler && handler.method !=null){
				handler.run(true);
				this._map[handler.key]=null;
			}
		}

		Timer.__init$__=function(){
			//class TimerHandler
			TimerHandler=(function(){
				function TimerHandler(){
					this.key=null;
					this.repeat=false;
					this.delay=0;
					this.userFrame=false;
					this.exeTime=0;
					this.caller=null;
					this.method=null;
					this.args=null;
				}
				CLASS$(TimerHandler,'');
				var __proto__=TimerHandler.prototype;
				__proto__.clear=function(){
					this.caller=null;
					this.method=null;
					this.args=null;
				}
				__proto__.run=function(widthClear){
					var caller=this.caller;
					if (caller && caller.destroyed)return this.clear();
					var method=this.method;
					var args=this.args;
					widthClear && this.clear();
					args ? method.apply(caller,args):method.call(caller);
				}
				return TimerHandler;
			})()
		}

		return Timer;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/tween.as
	/**
	*缓动类
	*@author yung
	*/
	//class laya.utils.Tween
	var Tween=(function(){
		function Tween(target,props,duration,ease,complete,delay,coverBefore,isTo){
			//this._complete=null;
			//this._target=null;
			//this._ease=null;
			//this._props=null;
			//this._duration=0;
			//this._delay=0;
			//this._startTimer=0;
			//this._usedTimer=0;
			if (!target)throw new Error("Tween:target is null");
			this._target=target;
			this._duration=duration;
			this._ease=ease || Tween.easeNone;
			this._complete=complete;
			this._delay=delay;
			this._props=[];
			this._usedTimer=0;
			this._startTimer=Browser.now();
			for (var p in props){
				if ((typeof (target[p])=='number')){
					var start=isTo ? target[p] :props[p];
					var end=isTo ? props[p] :target[p];
					this._props.push([p,start,end-start]);
				}
			};
			var gid=(target.$_GID || (target.$_GID=Utils.getGID()));
			if (!Tween.tweenMap[gid]){
				Tween.tweenMap[gid]=[this];
				}else {
				if (coverBefore)Tween.clearTween(target);
				Tween.tweenMap[gid].push(this);
			}
			Laya.timer.once(this._delay,this,this._beginLoop);
		}

		CLASS$(Tween,'laya.utils.Tween');
		var __proto__=Tween.prototype;
		__proto__._beginLoop=function(){
			Laya.timer.frameLoop(1,this,this._doEase);
		}

		/**执行缓动**/
		__proto__._doEase=function(){
			var usedTimer=this._usedTimer=Browser.now()-this._startTimer-this._delay;
			if (usedTimer >=this._duration){
				this.complete();
				return;
			};
			var ratio=usedTimer > 0 ? this._ease(usedTimer,0,1,this._duration):0;
			var props=this._props;
			var target=this._target;
			for (var i=0,n=props.length;i < n;i++){
				var prop=props[i];
				target[prop[0]]=prop[1]+(ratio *prop[2]);
			}
		}

		/**
		*立即结束缓动并到终点
		*/
		__proto__.complete=function(){
			var target=this._target;
			var props=this._props;
			var fun=this._complete;
			this.clear();
			for (var i=0,n=props.length;i < n;i++){
				var prop=props[i];
				target[prop[0]]=prop[1]+prop[2];
			}
			if (fun){
				if (fun.method)fun.method.apply(fun.caller,fun.args);
				else fun.call(target);
			}
		}

		/**
		*暂停缓动，可以通过resume或restart重新开始
		*/
		__proto__.pause=function(){
			Laya.timer.clear(this,this._beginLoop);
			Laya.timer.clear(this,this._doEase);
		}

		/**
		*停止并清理当前缓动
		*/
		__proto__.clear=function(){
			if (this._target){
				this.pause();
				this._remove();
				this._complete=null;
				this._target=null;
				this._ease=null;
				this._props=null;
			}
		}

		__proto__._remove=function(){
			var tweens=Tween.tweenMap[this._target.$_GID];
			if (tweens){
				for (var i=0,n=tweens.length;i < n;i++){
					if (tweens[i]===this){
						tweens.splice(i,1);
						break ;
					}
				}
			}
		}

		/**
		*重新开始暂停的缓动
		*/
		__proto__.restart=function(){
			this.pause();
			this._usedTimer=0;
			this._startTimer=Browser.now();
			var props=this._props;
			for (var i=0,n=props.length;i < n;i++){
				var prop=props[i];
				this._target[prop[0]]=prop[1];
			}
			Laya.timer.once(this._delay,this,this._beginLoop);
		}

		/**
		*恢复暂停的缓动
		*/
		__proto__.resume=function(){
			if (this._usedTimer >=this._duration)return;
			this._startTimer=Browser.now()-this._usedTimer-this._delay;
			this._beginLoop();
		}

		Tween.to=function(target,props,duration,ease,complete,delay,coverBefore){
			(delay===void 0)&& (delay=0);
			(coverBefore===void 0)&& (coverBefore=false);
			return new Tween(target,props,duration,ease,complete,delay,coverBefore,true);
		}

		Tween.from=function(target,props,duration,ease,complete,delay,coverBefore){
			(delay===void 0)&& (delay=0);
			(coverBefore===void 0)&& (coverBefore=false);
			return new Tween(target,props,duration,ease,complete,delay,coverBefore,false);
		}

		Tween.clearTween=function(target){
			if (!target || !target.$_GID)return;
			var tweens=Tween.tweenMap[target.$_GID];
			if (tweens){
				for (var i=0,n=tweens.length;i < n;i++){
					tweens[i].clear();
				}
				tweens.length=0;
			}
		}

		Tween.easeNone=function(t,b,c,d){
			return c *t / d+b;
		}

		Tween.tweenMap={};
		return Tween;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/utils/utils.as
	/**
	*工具类
	*@author yung
	*/
	//class laya.utils.Utils
	var Utils=(function(){
		function Utils(){};
		CLASS$(Utils,'laya.utils.Utils');
		Utils.toRadian=function(angle){
			return angle *Utils._pi2;
		}

		Utils.toAngle=function(radian){
			return radian *Utils._pi;
		}

		Utils.toHexColor=function(color){
			if (color < 0 || isNaN(color))return null;
			var str=color.toString(16);
			while (str.length < 6)str="0"+str;
			return "#"+str;
		}

		Utils.getGID=function(){
			return Utils._gid++;
		}

		Utils.parseXMLFromString=function(value){
			var rst;
			/*__JS__ */rst=(new DOMParser()).parseFromString(value,'text/xml');
			return rst;
		}

		Utils.concatArr=function(src,a){
			if(!a)return src;
			if(! src)return a;
			var i=0,len=a.length;
			for(i=0;i<len;i++){
				src.push(a[i]);
			}
			return src;
		}

		Utils.clearArr=function(arr){
			if(!arr)return arr;
			arr.length=0;
			return arr;
		}

		Utils.setValueArr=function(src,v){
			src || (src=[]);
			src.length=0;
			return Utils.concatArr(src,v);
		}

		Utils.getFrom=function(rst,src,count){
			var i=0;
			for(i=0;i<count;i++){
				rst.push(src[i]);
			}
			return rst;
		}

		Utils.getFromR=function(rst,src,count){
			var i=0;
			for(i=0;i<count;i++){
				rst.push(src.pop());
			}
			return rst;
		}

		Utils.getGlobalRec=function(sprite){
			return Utils.getGlobalRecByPoints(sprite,0,0,sprite.width,sprite.height);
		}

		Utils.getGlobalRecByPoints=function(sprite,x0,y0,x1,y1){
			var newLTPoint;
			newLTPoint=new Point(x0,y0);
			newLTPoint=sprite.localToGlobal(newLTPoint);
			var newRBPoint;
			newRBPoint=new Point(x1,y1);
			newRBPoint=sprite.localToGlobal(newRBPoint);
			var rst;
			rst=Rectangle.getWrapRec([newLTPoint.x,newLTPoint.y,newRBPoint.x,newRBPoint.y]);
			return rst;
		}

		Utils.getGlobalPosAndScale=function(sprite){
			return Utils.getGlobalRecByPoints(sprite,0,0,1,1);
		}

		Utils.bind=function(fun,_scope){
			var rst;
			/*__JS__ */rst=fun.bind(_scope);;
			return rst;
		}

		Utils.copyFunction=function(src,dec,permitOverrides){
			for (var i in src){
				if (!permitOverrides && dec[i])continue ;
				dec[i]=src[i];
			}
		}

		Utils.measureText=function(txt,font){
			if (Utils._charSizeTestDiv==null){
				Utils._charSizeTestDiv=Browser.createElement('div');
				Utils._charSizeTestDiv.style.cssText="z-index:10000000;padding:0px;position: absolute;left:0px;visibility:hidden;top:0px;background:white";
				Browser.document.body.appendChild(Utils._charSizeTestDiv);
			}
			Utils._charSizeTestDiv.style.font=font;
			Utils._charSizeTestDiv.innerText=txt==" "?"i":txt;
			var out={width:Utils._charSizeTestDiv.offsetWidth,height:Utils._charSizeTestDiv.offsetHeight };
			if (txt==' ')out.width=out.height *0.25;
			return out;
		}

		Utils.regClass=function(className,fullClassName){
			Utils._systemClass[className]=fullClassName;
		}

		Utils.New=function(className){
			className=Utils._systemClass[className] || className;
			return /*__JS__ */new Laya.__classmap[className];
		}

		Utils._gid=1;
		Utils._pi=180 / Math.PI;
		Utils._pi2=Math.PI/180;
		Utils._charSizeTestDiv=null
		Utils._systemClass={
			'Sprite':'laya.display.Sprite',
			'Sprite3D':'laya.d3.display.Sprite3D',
			'Mesh':'laya.d3.display.Mesh',
			'Sky':'laya.d3.display.Sky',
			'div':'laya.html.dom.HTMLDivElement',
			'img':'laya.html.dom.HTMLImageElement',
			'span':'laya.html.dom.HTMLElement',
			'br':'laya.html.dom.HTMLBrElement',
			'style':'laya.html.dom.HTMLStyleElement',
			'font':'laya.html.dom.HTMLElement'
		};

		return Utils;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/testcore.as
	/**
	*...
	*@author laya
	*/
	//class TestCore
	var TestCore=(function(){
		function TestCore(){
			Laya.init(800,600);
			Laya.stage.graphics.drawRect(100,100,200,200,"red");
		}

		CLASS$(TestCore,'TestCore');
		return TestCore;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/layoutstyle.as
	/**
	*<code>LayoutStyle</code> 是一个布局样式类。
	*@author yung
	*/
	//class laya.ui.LayoutStyle
	var LayoutStyle=(function(){
		function LayoutStyle(){
			this.enable=false;
			this.top=NaN;
			this.bottom=NaN;
			this.left=NaN;
			this.right=NaN;
			this.centerX=NaN;
			this.centerY=NaN;
		}

		CLASS$(LayoutStyle,'laya.ui.LayoutStyle');
		STATICATTR$(LayoutStyle,
		['EMPTY',function(){return this.EMPTY=new LayoutStyle();}
		]);
		return LayoutStyle;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/styles.as
	/**
	*<code>Styles</code> 定义了组件常用的样式属性。
	*@author yung
	*/
	//class laya.ui.Styles
	var Styles=(function(){
		function Styles(){};
		CLASS$(Styles,'laya.ui.Styles');
		Styles.labelColor="#000000";
		Styles.buttonStateNum=3;
		Styles.scrollBarMinNum=15;
		Styles.scrollBarDelayTime=500;
		STATICATTR$(Styles,
		['defaultSizeGrid',function(){return this.defaultSizeGrid=[4,4,4,4,0];},'labelMargin',function(){return this.labelMargin=[0,0,0,0];},'buttonLabelColors',function(){return this.buttonLabelColors=["#32556b","#32cc6b","#ff0000","#C0C0C0"];},'comboBoxItemColors',function(){return this.comboBoxItemColors=["#5e95b6","#ffffff","#000000","#8fa4b1","#ffffff"];}
		]);
		return Styles;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/uiutils.as
	/**
	*文本工具集。
	*@author yung
	*/
	//class laya.ui.UIUtils
	var UIUtils=(function(){
		function UIUtils(){};
		CLASS$(UIUtils,'laya.ui.UIUtils');
		UIUtils.fillArray=function(arr,str,type){
			var temp=arr.concat();
			if (str){
				var a=str.split(",");
				for (var i=0,n=Math.min(temp.length,a.length);i < n;i++){
					var value=a[i];
					temp[i]=(value=="true" ? true :(value=="false" ? false :value));
					if (type !=null)temp[i]=type(value);
				}
			}
			return temp;
		}

		UIUtils.toColor=function(color){
			var str=color.toString("16");
			while (str.length < 6)str="0"+str;
			return "#"+str;
		}

		return UIUtils;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/main.as
	/**
	*...
	*@author yung
	*/
	//class Main
	var Main=(function(){
		function Main(){
			Laya.init(1000,800);
		}

		CLASS$(Main,'Main');
		return Main;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/uiconfig.as
	/**全局配置*/
	//class UIConfig
	var UIConfig=(function(){
		function UIConfig(){};
		CLASS$(UIConfig,'UIConfig');
		UIConfig.resPath="";
		UIConfig.uiPath="";
		UIConfig.touchScrollEnable=true;
		UIConfig.mouseWheelEnable=true;
		UIConfig.popupBgColor="#000000";
		UIConfig.popupBgAlpha=0.5;
		return UIConfig;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/filters/webgl/filteractiongl.as
	//class laya.filters.webgl.FilterActionGL
	var FilterActionGL=(function(){
		function FilterActionGL(){}
		CLASS$(FilterActionGL,'laya.filters.webgl.FilterActionGL');
		var __proto__=FilterActionGL.prototype;
		LAYABOX.implements(__proto__,{"laya.filters.IFilterActionGL":true})
		__proto__.setValue=LAYAFNVOID/*function(shader){}*/
		__proto__.setValueMix=LAYAFNVOID/*function(shader){}*/
		__proto__.apply3d=LAYAFNNULL/*function(scope,sprite,context,x,y){return null;}*/
		__proto__.apply=LAYAFNNULL/*function(srcCanvas){return null;}*/
		GETSET$(0,__proto__,'typeMix',function(){
			return 0;
		});

		return FilterActionGL;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/blendmode.as
	//class laya.webgl.canvas.BlendMode
	var BlendMode=(function(){
		function BlendMode(){};
		CLASS$(BlendMode,'laya.webgl.canvas.BlendMode');
		BlendMode._init_=function(gl){
			var normal=[ /*laya.webgl.WebGLContext.SRC_ALPHA*/0x0302,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_ALPHA*/0x0303];
			normal._name_="normal";
			var add=[ /*laya.webgl.WebGLContext.DST_ALPHA*/0x0304,/*laya.webgl.WebGLContext.DST_ALPHA*/0x0304];
			add._name_="add";
			var multiply=[ /*laya.webgl.WebGLContext.DST_COLOR*/0x0306,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_ALPHA*/0x0303];
			multiply._name_="multiply";
			var screen=[ /*laya.webgl.WebGLContext.SRC_ALPHA*/0x0302,/*laya.webgl.WebGLContext.ONE*/1];
			screen._name_="screen";
			var overlay=[ /*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_ALPHA*/0x0303];
			overlay._name_="overlay";
			BlendMode.modes=[normal,add,multiply,overlay];
		}

		BlendMode.NAMES=["normal","add","multiply","screen"];
		BlendMode.TOINT={"normal":0,"add":1,"multiply":2,"screen":3 ,"lighter":1};
		BlendMode.NORMAL=0;
		BlendMode.ADD=1;
		BlendMode.MULTIPLY=2;
		BlendMode.SCREEN=3;
		BlendMode.modes=[];
		return BlendMode;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/drawstyle.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.DrawStyle
	var DrawStyle=(function(){
		function DrawStyle(value){
			this._color=Color.create("black");
			this.setValue(value);
		}

		CLASS$(DrawStyle,'laya.webgl.canvas.DrawStyle');
		var __proto__=DrawStyle.prototype;
		__proto__.setValue=function(value){
			if (value){
				if ((typeof value=='string')){
					this._color=Color.create(value);
					return;
				}
				if ((value instanceof laya.utils.Color )){
					this._color=value;
					return;
				}
			}
		}

		__proto__.reset=function(){
			this._color=Color.create("black");
		}

		__proto__.equal=function(value){
			if ((typeof value=='string'))return this._color.strColor===value;
			return false;
		}

		__proto__.toColorStr=function(){
			return this._color.strColor;
		}

		STATICATTR$(DrawStyle,
		['DEFAULT',function(){return this.DEFAULT=new DrawStyle("#000000");}
		]);
		return DrawStyle;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/path.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.Path
	var Path=(function(){
		function Path(){
			this._x=0;
			this._y=0;
			//this._rect=null;
			//this.ib=null;
			//this.vb=null;
			this.dirty=false;
			//this.geomatrys=null;
			//this._curGeomatry=null;
			this.offset=0;
			this.count=0;
			this.geoStart=0;
			this.geomatrys=[];
			var gl=WebGL.mainContext;
			this.ib=new Buffer(/*laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER*/0x8893,/*laya.webgl.utils.Buffer.INDEX*/"INDEX",null,/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4);
			this.vb=new Buffer(/*laya.webgl.WebGLContext.ARRAY_BUFFER*/0x8892);
		}

		CLASS$(Path,'laya.webgl.canvas.Path');
		var __proto__=Path.prototype;
		__proto__.clear=function(){
			this._rect=null;
		}

		__proto__.rect2=function(x,y,w,h,color,borderWidth,borderColor){
			(borderWidth===void 0)&& (borderWidth=2);
			(borderColor===void 0)&& (borderColor=0);
			this.geomatrys.push(this._curGeomatry=new Rect(x,y,w,h,color,borderWidth,borderColor));
		}

		__proto__.rect=function(x,y,width,height){
			this._rect=new Rectangle(x,y,width,height);
			this.dirty=true;
		}

		__proto__.strokeRect=function(x,y,width,height){
			this._rect=new Rectangle(x,y,width,height);
		}

		__proto__.circle=function(x,y,r,color,borderWidth,borderColor,fill){
			this.geomatrys.push(this._curGeomatry=new Circle(x,y,r,color,borderWidth,borderColor,fill));
		}

		__proto__.fan=function(x,y,r,r0,r1,color,borderWidth,borderColor){
			var geo;
			this.geomatrys.push(this._curGeomatry=geo=new Fan(x,y,r,r0,r1,color,borderWidth,borderColor));
			if(!color)geo.fill=false;
		}

		__proto__.ellipse=function(x,y,rw,rh,color,borderWidth,borderColor){
			this.geomatrys.push(this._curGeomatry=new Ellipse(x,y,rw,rh,color,borderWidth,borderColor));
		}

		__proto__.polygon=function(x,y,r,edges,color,borderWidth,borderColor){
			var geo;
			this.geomatrys.push(this._curGeomatry=geo=new Polygon(x,y,r,edges,color,borderWidth,borderColor));
			if(!color)geo.fill=false;if(borderColor==undefined)geo.borderWidth=0;
		}

		__proto__.drawPath=function(x,y,points,color,borderWidth){
			this.geomatrys.push(this._curGeomatry=new Line(x,y,points,color,borderWidth));
		}

		__proto__.update=function(){
			var si=this.ib.length;
			var len=this.geomatrys.length;
			this.offset=si;
			for(var i=this.geoStart;i<len;i++){
				this.geomatrys[i].getData(this.ib,this.vb,this.vb.length/(5*4));
			}
			this.geoStart=len;
			this.count=(this.ib.length-si)/2;
		}

		__proto__.sector=function(x,y,rW,rH){}
		__proto__.roundRect=function(x,y,w,h,rW,rH){}
		__proto__.reset=function(){
			this.vb.clear();
			this.ib.clear();
		}

		return Path;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/savebase.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.save.SaveBase
	var SaveBase=(function(){
		function SaveBase(){
			//this._valueName=null;
			//this._value=null;
			//this._dataObj=null;
			//this._newSubmit=false;
		}

		CLASS$(SaveBase,'laya.webgl.canvas.save.SaveBase');
		var __proto__=SaveBase.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.canvas.save.ISaveData":true})
		__proto__.isSaveMark=LAYAFNFALSE/*function(){return false;}*/
		__proto__.restore=function(context){
			this._dataObj[this._valueName]=this._value;
			SaveBase._cache[SaveBase._cache._length++]=this;
			this._newSubmit && (context._curSubmit=Submit.RENDERBASE);
		}

		SaveBase._createArray=function(){
			var value=[];
			value._length=0;
			return value;
		}

		SaveBase._init=function(){
			var namemap=SaveBase._namemap={};
			namemap[0x1]="ALPHA";
			namemap[0x2]="fillStyle";
			namemap[0x8]="font";
			namemap[0x100]="lineWidth";
			namemap[0x200]="strokeStyle";
			namemap[0x400]=
			namemap[0x800]=
			namemap[0x1000]=[];
			namemap[0x4000]="textBaseline";
			namemap[0x8000]="textAlign";
			namemap[0x10000]="_nBlendType";
			namemap[0x80000]="shader";
			namemap[0x100000]="filters";
			return namemap;
		}

		SaveBase.save=function(context,type,dataObj,newSubmit){
			if ((context._saveMark._saveuse & type)!==type){
				context._saveMark._saveuse |=type;
				var cache=SaveBase._cache;
				var o=cache._length > 0 ?cache[--cache._length] :(new SaveBase());
				o._value=dataObj[ o._valueName=SaveBase._namemap[type]];
				o._dataObj=dataObj;
				o._newSubmit=newSubmit;
				var _save=context._save;
				_save[_save._length++]=o;
			}
		}

		SaveBase._cache=laya.webgl.canvas.save.SaveBase._createArray();
		SaveBase._namemap=SaveBase._init();
		return SaveBase;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/savecliprect.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.save.SaveClipRect
	var SaveClipRect=(function(){
		function SaveClipRect(){
			//this._clipSaveRect=null;
			this._clipRect=new Rectangle();
		}

		CLASS$(SaveClipRect,'laya.webgl.canvas.save.SaveClipRect');
		var __proto__=SaveClipRect.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.canvas.save.ISaveData":true})
		__proto__.isSaveMark=LAYAFNFALSE/*function(){return false;}*/
		__proto__.restore=function(context){
			context._clipRect=this._clipSaveRect;
			SaveClipRect._cache[SaveClipRect._cache._length++]=this;
		}

		SaveClipRect.save=function(context){
			if ((context._saveMark._saveuse & /*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT*/0x20000)==/*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT*/0x20000)return;
			context._saveMark._saveuse |=/*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT*/0x20000;
			var cache=SaveClipRect._cache;
			var o=cache._length > 0?cache[--cache._length]:(new SaveClipRect());
			o._clipSaveRect=context._clipRect;
			context._clipRect=context._clipRect.clone(o._clipRect);
			var _save=context._save;
			_save[_save._length++]=o;
		}

		SaveClipRect._cache=SaveBase._createArray();
		return SaveClipRect;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/savefont.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.save.SaveFont
	var SaveFont=(function(){
		function SaveFont(){
			this._font=new FontInContext();
		}

		CLASS$(SaveFont,'laya.webgl.canvas.save.SaveFont');
		var __proto__=SaveFont.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.canvas.save.ISaveData":true})
		__proto__.isSaveMark=LAYAFNFALSE/*function(){return false;}*/
		__proto__.restore=function(context){
			this._font.copyTo(context._font);
			SaveFont._no[SaveFont._no._length++]=this;
		}

		SaveFont.save=function(context){
			if ((context._saveMark._saveuse & /*laya.webgl.canvas.save.SaveBase.TYPE_FONT*/0x8)==/*laya.webgl.canvas.save.SaveBase.TYPE_FONT*/0x8)return;
			context._saveMark._saveuse |=/*laya.webgl.canvas.save.SaveBase.TYPE_FONT*/0x8;
			var no=SaveFont._no;
			var o=no._length > 0?no[--no._length]:(new SaveFont());
			context._font.copyTo(o._font);
			context._addSave(o);
		}

		SaveFont._no=SaveBase._createArray();
		return SaveFont;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/saveibvb.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.save.SaveIBVB
	var SaveIBVB=(function(){
		function SaveIBVB(){
			//this._ib=null;
			//this._vb=null;
		}

		CLASS$(SaveIBVB,'laya.webgl.canvas.save.SaveIBVB');
		var __proto__=SaveIBVB.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.canvas.save.ISaveData":true})
		__proto__.isSaveMark=LAYAFNFALSE/*function(){return false;}*/
		__proto__.restore=function(context){
			context.setIBVB(this._ib,this._vb);
			SaveIBVB._no[SaveIBVB._no._length++]=this;
		}

		SaveIBVB.save=function(context){
			if ((context._saveMark._saveuse & /*laya.webgl.canvas.save.SaveBase.TYPE_IBVB*/0x40000)==/*laya.webgl.canvas.save.SaveBase.TYPE_IBVB*/0x40000)return;
			context._saveMark._saveuse |=/*laya.webgl.canvas.save.SaveBase.TYPE_IBVB*/0x40000;
			var no=SaveIBVB._no;
			var o=no._length > 0?no[--no._length]:(new SaveIBVB());
			o._ib=context._ib;
			o._vb=context._vb;
			context._addSave(o);
		}

		SaveIBVB._no=SaveBase._createArray();
		return SaveIBVB;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/savemark.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.save.SaveMark
	var SaveMark=(function(){
		function SaveMark(){
			this._saveuse=0;
			//this._preSaveMark=null;
			;
		}

		CLASS$(SaveMark,'laya.webgl.canvas.save.SaveMark');
		var __proto__=SaveMark.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.canvas.save.ISaveData":true})
		__proto__.isSaveMark=function(){
			return true;
		}

		__proto__.restore=function(context){
			context._saveMark=this._preSaveMark;
			SaveMark._no[SaveMark._no._length++]=this;
		}

		SaveMark.Create=function(context){
			var no=SaveMark._no;
			var o=no._length > 0?no[--no._length]:(new SaveMark());
			o._saveuse=0;
			o._preSaveMark=context._saveMark;
			context._saveMark=o;
			return o;
		}

		SaveMark._no=SaveBase._createArray();
		return SaveMark;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/saveshader.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.save.SaveShader
	var SaveShader=(function(){
		function SaveShader(){
			//this._preShader=null;
			//this._type=null;
		}

		CLASS$(SaveShader,'laya.webgl.canvas.save.SaveShader');
		var __proto__=SaveShader.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.canvas.save.ISaveData":true})
		__proto__.isSaveMark=LAYAFNFALSE/*function(){return false;}*/
		__proto__.restore=function(context){
			Shader[this._type]=this._preShader;
			SaveShader._cache[SaveShader._cache._length++]=this;
			context._curSubmit=Submit.RENDERBASE;
		}

		__proto__.getData=function(ib,vb,start){}
		SaveShader.save=function(context,shader,type){
			type || (type=shader.typeName);
			var cache=SaveShader._cache;
			var o=cache._length > 0?cache[--cache._length]:(new SaveShader());
			o._preShader=Shader[type];
			o._type=type;
			Shader[type]=shader;
			context._addSave(o);
		}

		SaveShader._cache=SaveBase._createArray();
		return SaveShader;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/savetransform.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.save.SaveTransform
	var SaveTransform=(function(){
		function SaveTransform(){
			//this._savematrix=null;
			this._matrix=new Matrix();
		}

		CLASS$(SaveTransform,'laya.webgl.canvas.save.SaveTransform');
		var __proto__=SaveTransform.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.canvas.save.ISaveData":true})
		__proto__.isSaveMark=LAYAFNFALSE/*function(){return false;}*/
		__proto__.restore=function(context){
			context._curMat=this._savematrix;
			SaveTransform._no[SaveTransform._no._length++]=this;
		}

		SaveTransform.save=function(context){
			var _saveMark=context._saveMark;
			if ((_saveMark._saveuse & /*laya.webgl.canvas.save.SaveBase.TYPE_TRANSFORM*/0x800)===/*laya.webgl.canvas.save.SaveBase.TYPE_TRANSFORM*/0x800)return;
			_saveMark._saveuse |=/*laya.webgl.canvas.save.SaveBase.TYPE_TRANSFORM*/0x800;
			var no=SaveTransform._no;
			var o=no._length > 0?no[--no._length]:(new SaveTransform());
			o._savematrix=context._curMat;
			context._curMat=context._curMat.copy(o._matrix);
			var _save=context._save;
			_save[_save._length++]=o;
		}

		SaveTransform._no=SaveBase._createArray();
		return SaveTransform;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/save/savetranslate.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.save.SaveTranslate
	var SaveTranslate=(function(){
		function SaveTranslate(){
			//this._x=NaN;
			//this._y=NaN;
		}

		CLASS$(SaveTranslate,'laya.webgl.canvas.save.SaveTranslate');
		var __proto__=SaveTranslate.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.canvas.save.ISaveData":true})
		__proto__.isSaveMark=LAYAFNFALSE/*function(){return false;}*/
		// }
		__proto__.restore=function(context){
			var mat=context._curMat;
			context._x=this._x;
			context._y=this._y;
			SaveTranslate._no[SaveTranslate._no._length++]=this;
		}

		SaveTranslate.save=function(context){
			var no=SaveTranslate._no;
			var o=no._length > 0?no[--no._length]:(new SaveTranslate());
			o._x=context._x;
			o._y=context._y;
			var _save=context._save;
			_save[_save._length++]=o;
		}

		SaveTranslate._no=SaveBase._createArray();
		return SaveTranslate;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/shader.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.shader.Shader
	var Shader=(function(){
		function Shader(vs,ps,saveName,nameMap){
			//this._nameMap=null;
			//this._vs=null;
			//this._ps=null;
			//this._id=0;
			//this._texIndex=0;
			this.tag={};
			this._program=null;
			this._params=null;
			this._paramsMap={};
			this.offset=0;
			this._id=++Shader._count;
			this._vs=vs;
			this._ps=ps;
			this._nameMap=nameMap ? nameMap :{};
			saveName !=null && (Shader.sharders[saveName]=this);
		}

		CLASS$(Shader,'laya.webgl.shader.Shader');
		var __proto__=Shader.prototype;
		__proto__.compile=function(){
			if (!this._vs || !this._ps || this._params)
				return;
			this._params=[];
			var text=[this._vs,this._ps];
			var gl=WebGL.mainContext;
			this._program=gl.createProgram();
			var vshader=Shader._createShader(gl,text[0],/*laya.webgl.WebGLContext.VERTEX_SHADER*/0x8B31);
			var pshader=Shader._createShader(gl,text[1],/*laya.webgl.WebGLContext.FRAGMENT_SHADER*/0x8B30);
			gl.attachShader(this._program,vshader);
			gl.attachShader(this._program,pshader);
			gl.linkProgram(this._program);
			if (!gl.getProgramParameter(this._program,/*laya.webgl.WebGLContext.LINK_STATUS*/0x8B82)){
				throw gl.getProgramInfoLog(this._program);
			};
			var one,i=0,j=0,n=0,location=0;
			var attribNum=gl.getProgramParameter(this._program,/*laya.webgl.WebGLContext.ACTIVE_ATTRIBUTES*/0x8B89);
			for (i=0;i < attribNum;i++){
				var attrib=gl.getActiveAttrib(this._program,i);
				location=gl.getAttribLocation(this._program,attrib.name);
				one={vartype:"attribute",ivartype:0,attrib:attrib,location:location,name:attrib.name,type:attrib.type,isArray:false,isSame:false,preValue:null,indexOfParams:0};
				this._params.push(one);
			};
			var nUniformNum=gl.getProgramParameter(this._program,/*laya.webgl.WebGLContext.ACTIVE_UNIFORMS*/0x8B86);
			for (i=0;i < nUniformNum;i++){
				var uniform=gl.getActiveUniform(this._program,i);
				location=gl.getUniformLocation(this._program,uniform.name);
				one={vartype:"uniform",ivartype:1,attrib:attrib,location:location,name:uniform.name,type:uniform.type,isArray:false,isSame:false,preValue:null,indexOfParams:0};
				if (one.name.indexOf('[0]')> 0){
					one.name=one.name.substr(0,one.name.length-3);
					one.isArray=true;
					one.location=gl.getUniformLocation(this._program,one.name);
				}
				this._params.push(one);
			}
			for (i=0,n=this._params.length;i < n;i++){
				one=this._params[i];
				one.indexOfParams=i;
				one.index=1;
				one.value=[one.location,null];
				one.codename=one.name;
				one.name=this._nameMap[one.codename] ? this._nameMap[one.codename] :one.codename;
				this._paramsMap[one.name]=one;
				one._this=this;
				if (one.vartype==="attribute"){
					one.fun=this.attribute;
					continue ;
				}
				switch (one.type){
					case /*laya.webgl.WebGLContext.FLOAT*/0x1406:
						one.fun=one.isArray ? gl.uniform1fv :gl.uniform1f;
						one._this=gl;
						break ;
					case /*laya.webgl.WebGLContext.FLOAT_VEC2*/0x8B50:
						one.fun=this.uniform_vec2;
						break ;
					case /*laya.webgl.WebGLContext.FLOAT_VEC3*/0x8B51:
						one.fun=this.uniform_vec3;
						break ;
					case /*laya.webgl.WebGLContext.FLOAT_VEC4*/0x8B52:
						one.fun=this.uniform_vec4;
						break ;
					case /*laya.webgl.WebGLContext.SAMPLER_2D*/0x8B5E:
						one.fun=this.uniform_sampler2D;
						break ;
					case /*laya.webgl.WebGLContext.FLOAT_MAT4*/0x8B5C:
						one.value=[one.location,false,null];
						one.index=2;
						one.fun=gl.uniformMatrix4fv;
						one._this=gl;
						break ;
					case /*laya.webgl.WebGLContext.BOOL*/0x8B56:
						one.fun=gl.uniform1i;
						one._this=gl;
						break ;
					case /*laya.webgl.WebGLContext.SAMPLER_CUBE*/0x8B60:
					case /*laya.webgl.WebGLContext.FLOAT_MAT2*/0x8B5A:
					case /*laya.webgl.WebGLContext.FLOAT_MAT3*/0x8B5B:
						throw new Error("compile shader err!");
						break ;
					default :
						debugger;
						throw new Error("compile shader err!");
					}
			}
			this._vs=this._ps=null;
		}

		/**
		*根据变量名字获得
		*@param name
		*@return
		*/
		__proto__.getUniform=function(name){
			return this._paramsMap[name];
		}

		__proto__.attribute=function(loc,value){
			var gl=WebGL.mainContext;
			gl.enableVertexAttribArray(loc);
			gl.vertexAttribPointer(loc,value[0],value[1],value[2],value[3],value[4]+this.offset);
		}

		__proto__.uniform_vec2=function(loc,value){
			WebGL.mainContext.uniform2f(loc,value[0],value[1]);
		}

		__proto__.uniform_vec3=function(loc,value){
			WebGL.mainContext.uniform3f(loc,value[0],value[1],value[2]);
		}

		__proto__.uniform_vec4=function(loc,value){
			WebGL.mainContext.uniform4f(loc,value[0],value[1],value[2],value[3]);
		}

		__proto__.uniform_sampler2D=function(loc,value){
			var gl=WebGL.mainContext;
			gl.activeTexture(Shader._TEXTURES[this._texIndex]);
			gl.bindTexture(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,value);
			gl.uniform1i(loc,this._texIndex);
			this._texIndex++;
		}

		__proto__._noSetValue=function(one){
			console.log("no....:"+one.name);
		}

		/**
		*提交shader到GPU
		*@param shaderValue
		*@param _bufferUsage
		*/
		__proto__.upload=function(shaderValue,_bufferUsage,params){
			this._program || this.compile();
			this._texIndex=0;
			WebGLContext.UseProgram(this._program);
			params || (params=this._params);
			for (var i=0,n=params.length;i < n;i++){
				var one=params[i];
				var value=shaderValue[one.name];
				if (value!=null){
					one.value[one.index]=value;
					_bufferUsage && _bufferUsage[one.name] && _bufferUsage[one.name].bind();
					one.fun.apply(one._this,one.value);
					Stat.shaderCall++;
				}
			}
		}

		/**
		*按数组的定义提交
		*@param shaderValue 数组格式[name,[value,id],...]
		*/
		__proto__.uploadArray=function(shaderValue,length,_bufferUsage){
			this._program || this.compile();
			this._texIndex=0;
			var sameProgram=!WebGLContext.UseProgram(this._program);
			var params=this._params,value;
			var one,uploadArrayCount=Shader._uploadArrayCount++;
			for (var i=length-2;i >=0;i-=2){
				one=this._paramsMap[shaderValue[i]]
				if (!one || one._uploadArrayCount===uploadArrayCount)
					continue ;
				one._uploadArrayCount=uploadArrayCount;
				var v=shaderValue[i+1];
				var uid=v[1];
				if (sameProgram && one.ivartype===1 && uid > 0 && uid===one.__uploadid)
					continue ;
				value=v[0];
				if (value!=null){
					_bufferUsage && _bufferUsage[one.name] && _bufferUsage[one.name].bind();
					one.value[one.index]=value;
					one.fun.apply(one._this,one.value);
					one.__uploadid=uid;
					Stat.shaderCall++;
				}
			}
		}

		__proto__.uploadOne2=function(name,value){
			this._program || this.compile();
			WebGLContext.UseProgram(this._program);
			var one=this._paramsMap[name];
			one.value[one.index]=value;
			one.fun.apply(one._this,one.value);
		}

		/**
		*得到编译后的变量及相关预定义
		*@return
		*/
		__proto__.getParams=function(){
			return this._params;
		}

		Shader.getShader=function(name){
			return Shader.sharders[name];
		}

		Shader._createShader=function(gl,str,type){
			var shader=gl.createShader(type);
			gl.shaderSource(shader,str);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader,/*laya.webgl.WebGLContext.COMPILE_STATUS*/0x8B81)){
				throw gl.getShaderInfoLog(shader);
			}
			return shader;
		}

		Shader.addInclude=function(fileName,txt){
			if (!txt || txt.length===0)
				throw new Error("add shader include file err:"+fileName);
			if (Shader._includeFiles[fileName])
				throw new Error("add shader include file err, has add:"+fileName);
			Shader._includeFiles[fileName]=txt;
		}

		Shader.preCompile=function(nameID,mainID,vs,ps,nameMap){
			var id=0.0002 *nameID+mainID;
			Shader._preCompileShader[id]=new ShaderCompile(id,vs,ps,nameMap,Shader._includeFiles);
		}

		Shader.withCompile=function(nameID,mainID,define,shaderName){
			if (shaderName && Shader.sharders[shaderName])
				return Shader.sharders[shaderName];
			var pre=Shader._preCompileShader[0.0002 *nameID+mainID];
			if (!pre)
				throw new Error("withCompile shader err!"+nameID+" "+mainID);
			return pre.createShader(define,shaderName);
		}

		Shader.SHADERNAME2ID=0.0002;
		Shader.sharders=(Shader.sharders=[],Shader.sharders.length=0x20,Shader.sharders);
		Shader._includeFiles={};
		Shader._count=0;
		Shader._preCompileShader={};
		Shader._uploadArrayCount=1;
		Shader._TEXTURES=[ /*laya.webgl.WebGLContext.TEXTURE0*/0x84C0,/*laya.webgl.WebGLContext.TEXTURE1*/0x84C1,/*laya.webgl.WebGLContext.TEXTURE2*/0x84C2,/*laya.webgl.WebGLContext.TEXTURE3*/0x84C3,/*laya.webgl.WebGLContext.TEXTURE4*/0x84C4,/*laya.webgl.WebGLContext.TEXTURE5*/0x84C5,/*laya.webgl.WebGLContext.TEXTURE6*/0x84C6];
		STATICATTR$(Shader,
		['nameKey',function(){return this.nameKey=new StringKey();}
		]);
		return Shader;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/shader2d.as
	//class laya.webgl.shader.d2.Shader2D
	var Shader2D=(function(){
		function Shader2D(){
			this.ALPHA=1;
			//this.shader=null;
			//this.filters=null;
			this.shaderType=0;
			//this.colorAdd=null;
			//this.strokeStyle=null;
			//this.fillStyle=null;
			this.glTexture=new GLTextur();
			this.defines=new ShaderDefines2D();
		}

		CLASS$(Shader2D,'laya.webgl.shader.d2.Shader2D');
		Shader2D.__init__=function(){
			Shader.addInclude("parts/ColorFilter_ps_uniform.glsl","uniform float u_colorMatrix[20];\n"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/colorfilter_ps_uniform.glsl*/);
			Shader.addInclude("parts/ColorFilter_ps_logic.glsl","vec4 rgba=gl_FragColor;\ngl_FragColor.r =rgba.r*u_colorMatrix[0]+rgba.g*u_colorMatrix[1]+rgba.b*u_colorMatrix[2]+rgba.a*u_colorMatrix[3]+u_colorMatrix[4];\ngl_FragColor.g =rgba.r*u_colorMatrix[5]+rgba.g*u_colorMatrix[6]+rgba.b*u_colorMatrix[7]+rgba.a*u_colorMatrix[8]+u_colorMatrix[9];\ngl_FragColor.b =rgba.r*u_colorMatrix[10]+rgba.g*u_colorMatrix[11]+rgba.b*u_colorMatrix[12]+rgba.a*u_colorMatrix[13]+u_colorMatrix[14];\ngl_FragColor.a =rgba.r*u_colorMatrix[15]+rgba.g*u_colorMatrix[16]+rgba.b*u_colorMatrix[17]+rgba.a*u_colorMatrix[18]+u_colorMatrix[19];"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/colorfilter_ps_logic.glsl*/);
			Shader.addInclude("parts/GlowFilter_ps_uniform.glsl","uniform bool u_blurX;\nuniform vec4 u_color;\nuniform float u_offset;\nuniform float u_strength;\nuniform float u_texW;\nuniform float u_texH;"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/glowfilter_ps_uniform.glsl*/);
			Shader.addInclude("parts/GlowFilter_ps_logic.glsl","const int c_FilterTime = 9;\nconst float c_Gene = (1.0/(1.0 + 2.0*(0.93 + 0.8 + 0.7 + 0.6 + 0.5 + 0.4 + 0.3 + 0.2 + 0.1)));\nvec4 vec4Color = gl_FragColor*c_Gene;\nfloat aryAttenuation[c_FilterTime];\naryAttenuation[0] = 0.93;\naryAttenuation[1] = 0.8;\naryAttenuation[2] = 0.7;\naryAttenuation[3] = 0.6;\naryAttenuation[4] = 0.5;\naryAttenuation[5] = 0.4;\naryAttenuation[6] = 0.3;\naryAttenuation[7] = 0.2;\naryAttenuation[8] = 0.1;\n\nfloat u_TexSpaceU=1.0/u_texW;\nfloat u_TexSpaceV=1.0/u_texH;\nvec2 vec2FilterDir;\nif(u_blurX)\n	vec2FilterDir = vec2(u_offset*u_TexSpaceU/9.0, 0.0);\nelse\n	vec2FilterDir = vec2(0.0,u_offset*u_TexSpaceV/9.0);\nvec2 vec2Step = vec2FilterDir;\n\nfor(int i = 0;i< c_FilterTime; ++i){\n	vec4Color += texture2D(texture, v_texcoord + vec2Step)*aryAttenuation[i]*c_Gene;\n	vec4Color += texture2D(texture, v_texcoord - vec2Step)*aryAttenuation[i]*c_Gene;\n	vec2Step += vec2FilterDir;\n}\n\ngl_FragColor = vec4Color.a*u_color*u_strength;"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/glowfilter_ps_logic.glsl*/);
			Shader.addInclude("parts/BlurFilter_ps_logic.glsl","gl_FragColor=vec4(0.0);\ngl_FragColor += texture2D(texture, vBlurTexCoords[ 0])*0.004431848411938341;\ngl_FragColor += texture2D(texture, vBlurTexCoords[ 1])*0.05399096651318985;\ngl_FragColor += texture2D(texture, vBlurTexCoords[ 2])*0.2419707245191454;\ngl_FragColor += texture2D(texture, v_texcoord        )*0.3989422804014327;\ngl_FragColor += texture2D(texture, vBlurTexCoords[ 3])*0.2419707245191454;\ngl_FragColor += texture2D(texture, vBlurTexCoords[ 4])*0.05399096651318985;\ngl_FragColor += texture2D(texture, vBlurTexCoords[ 5])*0.004431848411938341;"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/blurfilter_ps_logic.glsl*/);
			Shader.addInclude("parts/BlurFilter_ps_uniform.glsl","varying vec2 vBlurTexCoords[6];"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/blurfilter_ps_uniform.glsl*/);
			Shader.addInclude("parts/BlurFilter_vs_uniform.glsl","uniform float strength;\nvarying vec2 vBlurTexCoords[6];"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/blurfilter_vs_uniform.glsl*/);
			Shader.addInclude("parts/BlurFilter_vs_logic.glsl","\nvBlurTexCoords[ 0] = v_texcoord + vec2(-0.012 * strength, 0.0);\nvBlurTexCoords[ 1] = v_texcoord + vec2(-0.008 * strength, 0.0);\nvBlurTexCoords[ 2] = v_texcoord + vec2(-0.004 * strength, 0.0);\nvBlurTexCoords[ 3] = v_texcoord + vec2( 0.004 * strength, 0.0);\nvBlurTexCoords[ 4] = v_texcoord + vec2( 0.008 * strength, 0.0);\nvBlurTexCoords[ 5] = v_texcoord + vec2( 0.012 * strength, 0.0);"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/blurfilter_vs_logic.glsl*/);
			Shader.addInclude("parts/ColorAdd_ps_uniform.glsl","uniform vec4 colorAdd;\n"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/coloradd_ps_uniform.glsl*/);
			Shader.addInclude("parts/ColorAdd_ps_logic.glsl","gl_FragColor = vec4(colorAdd.rgb,colorAdd.a*gl_FragColor.a);"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/parts/coloradd_ps_logic.glsl*/);
			var vs,ps;
			vs="attribute vec4 position;\nattribute vec2 texcoord;\nuniform vec2 size;\nuniform mat4 mmat;\nvarying vec2 v_texcoord;\n\n#include?BLUR_FILTER  \"parts/BlurFilter_vs_uniform.glsl\";\nvoid main() {\n  vec4 pos=mmat*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  v_texcoord = texcoord;\n  #include?BLUR_FILTER  \"parts/BlurFilter_vs_logic.glsl\";\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/texture.vs*/;
			ps="precision mediump float;\nvarying vec2 v_texcoord;\nuniform sampler2D texture;\nuniform float alpha;\n#include?BLUR_FILTER  \"parts/BlurFilter_ps_uniform.glsl\";\n#include?COLOR_FILTER \"parts/ColorFilter_ps_uniform.glsl\";\n#include?GLOW_FILTER \"parts/GlowFilter_ps_uniform.glsl\";\n#include?COLOR_ADD \"parts/ColorAdd_ps_uniform.glsl\";\n\nvoid main() {\n   vec4 color= texture2D(texture, v_texcoord);\n   color.a*=alpha;\n   gl_FragColor=color;\n   #include?COLOR_ADD \"parts/ColorAdd_ps_logic.glsl\";   \n   #include?BLUR_FILTER  \"parts/BlurFilter_ps_logic.glsl\";\n   #include?COLOR_FILTER \"parts/ColorFilter_ps_logic.glsl\";\n   #include?GLOW_FILTER \"parts/GlowFilter_ps_logic.glsl\";\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/texture.ps*/;
			Shader.preCompile(0,/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01,vs,ps,null);
			vs="attribute vec4 position;\nuniform vec2 size;\nuniform mat4 mmat;\nvoid main() {\n  vec4 pos=mmat*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/line.vs*/;
			ps="precision mediump float;\nuniform vec4 color;\nuniform float alpha;\n#include?COLOR_FILTER \"parts/ColorFilter_ps_uniform.glsl\";\nvoid main() {\n	vec4 a = vec4(color.r, color.g, color.b, color.a);\n	a.w = alpha;\n	gl_FragColor = a;\n	#include?COLOR_FILTER \"parts/ColorFilter_ps_logic.glsl\";\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/line.ps*/;
			Shader.preCompile(0,/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02,vs,ps,null);
			vs="attribute vec4 position;\nattribute vec3 a_color;\nuniform mat4 mmat;\nuniform mat4 u_mmat2;\nuniform vec2 size;\nvarying vec3 color;\nvoid main(){\n  vec4 pos=mmat*u_mmat2*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  color=a_color;\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/primitive.vs*/;
			ps="precision lowp float;\n//precision mediump float;\nvarying vec3 color;\nuniform float alpha;\nvoid main(){\n	//vec4 a=vec4(color.r, color.g, color.b, 1);\n	//a.a*=alpha;\n    gl_FragColor=vec4(color.r, color.g, color.b, alpha);\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/files/primitive.ps*/;
			Shader.preCompile(0,/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04,vs,ps,null);
		}

		return Shader2D;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/shaderdefines.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.shader.ShaderDefines
	var ShaderDefines=(function(){
		function ShaderDefines(name2int,int2name,int2nameMap){
			this._value=0;
			//this._name2int=null;
			//this._int2name=null;
			//this._int2nameMap=null;
			this._name2int=name2int;
			this._int2name=int2name;
			this._int2nameMap=int2nameMap;
		}

		CLASS$(ShaderDefines,'laya.webgl.shader.ShaderDefines');
		var __proto__=ShaderDefines.prototype;
		__proto__.add=function(value){
			if ((typeof value=='string'))value=this._name2int[value];
			this._value |=value;
			return this._value;
		}

		__proto__.addInt=function(value){
			this._value |=value;
			return this._value;
		}

		__proto__.remove=function(value){
			if ((typeof value=='string'))value=this._name2int[value];
			this._value &=(~value);
			return this._value;
		}

		__proto__.isDefine=function(def){
			return (this._value & def)===def;
		}

		__proto__.getValue=function(){
			return this._value;
		}

		__proto__.setValue=function(value){
			this._value=value;
		}

		__proto__.toString=function(){
			var r=this._int2nameMap[this._value];
			return r?r:ShaderDefines._toText(this._value,this._int2name,this._int2nameMap);
		}

		ShaderDefines._reg=function(name,value,_name2int,_int2name){
			_name2int[name]=value;
			_int2name[value]=name;
		}

		ShaderDefines._toText=function(value,_int2name,_int2nameMap){
			var r=_int2nameMap[value];
			if (r)return r;
			var o={};
			var d=1;
			for (var i=0;i < 32;i++){
				d=1 << i;
				if (d > value)break ;
				if (value & d){
					var name=_int2name[d];
					name && (o[name]="");
				}
			}
			_int2nameMap[value]=o;
			return o;
		}

		ShaderDefines._toInt=function(names,_name2int){
			var words=names.split('.');
			var num=0;
			for (var i=0,n=words.length;i < n;i++){
				var value=_name2int[words[i]];
				if (!value)throw new Error("Defines to int err:"+names+"/"+words[i]);
				num |=value;
			}
			return num;
		}

		return ShaderDefines;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/shadervalue.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.shader.ShaderValue
	var ShaderValue=(function(){
		function ShaderValue(){}
		CLASS$(ShaderValue,'laya.webgl.shader.ShaderValue');
		return ShaderValue;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/basepoly.as
	//此类可以减少代码
	//class laya.webgl.shapes.BasePoly
	var BasePoly=(function(){
		function BasePoly(x,y,width,height,edges,color,borderWidth,borderColor,round){
			//this.x=NaN;
			//this.y=NaN;
			//this.r=NaN;
			//this.width=NaN;
			//this.height=NaN;
			//this.edges=NaN;
			this.r0=0
			//this.color=0;
			//this.borderColor=NaN;
			//this.borderWidth=NaN;
			//this.round=0;
			this.fill=true;
			this.r1=Math.PI / 2;
			(round===void 0)&& (round=0);
			this.x=x;
			this.y=y;
			this.width=width;
			this.height=height;
			this.edges=edges;
			this.color=color;
			this.borderWidth=borderWidth;
			this.borderColor=borderColor;
		}

		CLASS$(BasePoly,'laya.webgl.shapes.BasePoly');
		var __proto__=BasePoly.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.shapes.IShape":true})
		__proto__.getData=function(ib,vb,start){
			var indices=[];
			var verts=[];
			this.circle(verts,indices,start);
			if (this.fill){
				(this.borderWidth > 0)&& this.createLoopLine(verts,indices,this.borderWidth,start+verts.length / 5);
				ib.append(new Uint16Array(indices));
				vb.append(new Float32Array(verts));
			}
			else{
				var outV=[];
				var outI=[];
				this.createLoopLine(verts,indices,this.borderWidth,start,outV,outI);
				ib.append(new Uint16Array(outI));
				vb.append(new Float32Array(outV));
			}
		}

		__proto__.circle=function(outVert,outIndex,start){
			var x=this.x,y=this.y,edges=this.edges,seg=(Math.PI *2)/ edges;
			var w=this.width,h=this.height,color=this.color;
			var r=((color >> 16)& 0x0000ff)/ 255,g=((color >> 8)& 0xff)/ 255,b=(color & 0x0000ff)/ 255;
			outVert.push(x,y,r,g,b);
			for (var i=0;i < edges;i++){
				outVert.push(x+Math.sin(seg *i)*w,y+Math.cos(seg *i)*h);
				outVert.push(r,g,b);
			}
			for (i=0;i < edges;i++){
				outIndex.push(start,start+i+1,start+i+2);
			}
			outIndex[outIndex.length-1]=start+1;
		}

		__proto__.sector=function(outVert,outIndex,start){
			var x=this.x,y=this.y,edges=this.edges,seg=(this.r1-this.r0)/ edges;
			var w=this.width,h=this.height,color=this.color;
			var r=((color >> 16)& 0x0000ff)/ 255,g=((color >> 8)& 0xff)/ 255,b=(color & 0x0000ff)/ 255;
			outVert.push(x,y,r,g,b);
			for (var i=0;i < edges+1;i++){
				outVert.push(x+Math.sin(seg *i+this.r0)*w,y+Math.cos(seg *i+this.r0)*h);
				outVert.push(r,g,b);
			}
			for (i=0;i < edges;i++){
				outIndex.push(start,start+i+1,start+i+2);
			}
		}

		//outIndex[outIndex.length-1]=start+1;
		__proto__.createFanLine=function(p,indices,lineWidth,len,outVertex,outIndex){
			var points=p.concat();
			var result=outVertex ? outVertex :p;
			var color=this.borderColor;
			var r=((color >> 16)& 0x0000ff)/ 255,g=((color >> 8)& 0xff)/ 255,b=(color & 0x0000ff)/ 255;
			var firstPoint=[points[0],points[1]];
			var lastPoint=[points[points.length-5],points[points.length-4]];
			var midPointX=lastPoint[0]+(firstPoint[0]-lastPoint[0])*0.5;
			var midPointY=lastPoint[1]+(firstPoint[1]-lastPoint[1])*0.5;
			points.unshift(midPointX,midPointY,0,0,0);
			points.push(midPointX,midPointY,0,0,0);
			var length=points.length / 5;
			var iStart=len,w=lineWidth / 2;
			var px,py,p1x,p1y,p2x,p2y,p3x,p3y;
			var perpx,perpy,perp2x,perp2y,perp3x,perp3y;
			var a1,b1,c1,a2,b2,c2;
			var denom,pdist,dist;
			p1x=points[0];
			p1y=points[1];
			p2x=points[5];
			p2y=points[6];
			perpx=-(p1y-p2y);
			perpy=p1x-p2x;
			dist=Math.sqrt(perpx *perpx+perpy *perpy);
			perpx=perpx / dist *w;
			perpy=perpy / dist *w;
			result.push(p1x-perpx,p1y-perpy,r,g,b,p1x+perpx,p1y+perpy,r,g,b);
			for (var i=1;i < length-1;i++){
				p1x=points[(i-1)*5];
				p1y=points[(i-1)*5+1];
				p2x=points[(i)*5];
				p2y=points[(i)*5+1];
				p3x=points[(i+1)*5];
				p3y=points[(i+1)*5+1];
				perpx=-(p1y-p2y);
				perpy=p1x-p2x;
				dist=Math.sqrt(perpx *perpx+perpy *perpy);
				perpx=perpx / dist *w;
				perpy=perpy / dist *w;
				perp2x=-(p2y-p3y);
				perp2y=p2x-p3x;
				dist=Math.sqrt(perp2x *perp2x+perp2y *perp2y);
				perp2x=perp2x / dist *w;
				perp2y=perp2y / dist *w;
				a1=(-perpy+p1y)-(-perpy+p2y);
				b1=(-perpx+p2x)-(-perpx+p1x);
				c1=(-perpx+p1x)*(-perpy+p2y)-(-perpx+p2x)*(-perpy+p1y);
				a2=(-perp2y+p3y)-(-perp2y+p2y);
				b2=(-perp2x+p2x)-(-perp2x+p3x);
				c2=(-perp2x+p3x)*(-perp2y+p2y)-(-perp2x+p2x)*(-perp2y+p3y);
				denom=a1 *b2-a2 *b1;
				if (Math.abs(denom)< 0.1){
					denom+=10.1;
					result.push(p2x-perpx,p2y-perpy,r,g,b,p2x+perpx,p2y+perpy,r,g,b);
					continue ;
				}
				px=(b1 *c2-b2 *c1)/ denom;
				py=(a2 *c1-a1 *c2)/ denom;
				pdist=(px-p2x)*(px-p2x)+(py-p2y)+(py-p2y);
				result.push(px,py,r,g,b,p2x-(px-p2x),p2y-(py-p2y),r,g,b);
			}
			indices=outIndex ? outIndex :indices;
			var groupLen=this.edges+3;
			for (i=1;i < groupLen;i++){
				indices.push(iStart+(i-1)*2,iStart+(i-1)*2+1,iStart+i *2+1,iStart+i *2+1,iStart+i *2,iStart+(i-1)*2);
			}
			indices.push(iStart+(i-1)*2,iStart+(i-1)*2+1,iStart+1,iStart+1,iStart,iStart+(i-1)*2);
			return result;
		}

		//用于画线
		__proto__.createLine2=function(p,indices,lineWidth,len,outVertex,indexCount){
			var points=p.concat();
			var result=outVertex;
			var color=this.borderColor;
			var r=((color >> 16)& 0x0000ff)/ 255,g=((color >> 8)& 0xff)/ 255,b=(color & 0x0000ff)/ 255;
			var length=points.length / 2;
			var iStart=len,w=lineWidth / 2;
			var px,py,p1x,p1y,p2x,p2y,p3x,p3y;
			var perpx,perpy,perp2x,perp2y,perp3x,perp3y;
			var a1,b1,c1,a2,b2,c2;
			var denom,pdist,dist;
			p1x=points[0];
			p1y=points[1];
			p2x=points[2];
			p2y=points[3];
			perpx=-(p1y-p2y);
			perpy=p1x-p2x;
			dist=Math.sqrt(perpx *perpx+perpy *perpy);
			perpx=perpx / dist *w;
			perpy=perpy / dist *w;
			result.push(p1x-perpx+this.x,p1y-perpy+this.y,r,g,b,p1x+perpx+this.x,p1y+perpy+this.y,r,g,b);
			for (var i=1;i < length-1;i++){
				p1x=points[(i-1)*2];
				p1y=points[(i-1)*2+1];
				p2x=points[(i)*2];
				p2y=points[(i)*2+1];
				p3x=points[(i+1)*2];
				p3y=points[(i+1)*2+1];
				perpx=-(p1y-p2y);
				perpy=p1x-p2x;
				dist=Math.sqrt(perpx *perpx+perpy *perpy);
				perpx=perpx / dist *w;
				perpy=perpy / dist *w;
				perp2x=-(p2y-p3y);
				perp2y=p2x-p3x;
				dist=Math.sqrt(perp2x *perp2x+perp2y *perp2y);
				perp2x=perp2x / dist *w;
				perp2y=perp2y / dist *w;
				a1=(-perpy+p1y)-(-perpy+p2y);
				b1=(-perpx+p2x)-(-perpx+p1x);
				c1=(-perpx+p1x)*(-perpy+p2y)-(-perpx+p2x)*(-perpy+p1y);
				a2=(-perp2y+p3y)-(-perp2y+p2y);
				b2=(-perp2x+p2x)-(-perp2x+p3x);
				c2=(-perp2x+p3x)*(-perp2y+p2y)-(-perp2x+p2x)*(-perp2y+p3y);
				denom=a1 *b2-a2 *b1;
				if (Math.abs(denom)< 0.1){
					denom+=10.1;
					result.push(p2x-perpx+this.x,p2y-perpy+this.y,r,g,b,p2x+perpx+this.x,p2y+perpy+this.y,r,g,b);
					continue ;
				}
				px=(b1 *c2-b2 *c1)/ denom;
				py=(a2 *c1-a1 *c2)/ denom;
				pdist=(px-p2x)*(px-p2x)+(py-p2y)+(py-p2y);
				result.push(px+this.x,py+this.y,r,g,b,p2x-(px-p2x)+this.x,p2y-(py-p2y)+this.y,r,g,b);
			}
			p1x=points[points.length-4];
			p1y=points[points.length-3];
			p2x=points[points.length-2];
			p2y=points[points.length-1];
			perpx=-(p1y-p2y);
			perpy=p1x-p2x;
			dist=Math.sqrt(perpx *perpx+perpy *perpy);
			perpx=perpx / dist *w;
			perpy=perpy / dist *w;
			result.push(p2x-perpx+this.x,p2y-perpy+this.y,r,g,b,p2x+perpx+this.x,p2y+perpy+this.y,r,g,b);
			var groupLen=indexCount;
			for (i=1;i < groupLen;i++){
				indices.push(iStart+(i-1)*2,iStart+(i-1)*2+1,iStart+i *2+1,iStart+i *2+1,iStart+i *2,iStart+(i-1)*2);
			}
			return result;
		}

		//用于比如 扇形 不带两直线
		__proto__.createLine=function(p,indices,lineWidth,len){
			var points=p.concat();
			var result=p;
			var color=this.borderColor;
			var r=((color >> 16)& 0x0000ff)/ 255,g=((color >> 8)& 0xff)/ 255,b=(color & 0x0000ff)/ 255;
			points.splice(0,5);
			var length=points.length / 5;
			var iStart=len,w=lineWidth / 2;
			var px,py,p1x,p1y,p2x,p2y,p3x,p3y;
			var perpx,perpy,perp2x,perp2y,perp3x,perp3y;
			var a1,b1,c1,a2,b2,c2;
			var denom,pdist,dist;
			p1x=points[0];
			p1y=points[1];
			p2x=points[5];
			p2y=points[6];
			perpx=-(p1y-p2y);
			perpy=p1x-p2x;
			dist=Math.sqrt(perpx *perpx+perpy *perpy);
			perpx=perpx / dist *w;
			perpy=perpy / dist *w;
			result.push(p1x-perpx,p1y-perpy,r,g,b,p1x+perpx,p1y+perpy,r,g,b);
			for (var i=1;i < length-1;i++){
				p1x=points[(i-1)*5];
				p1y=points[(i-1)*5+1];
				p2x=points[(i)*5];
				p2y=points[(i)*5+1];
				p3x=points[(i+1)*5];
				p3y=points[(i+1)*5+1];
				perpx=-(p1y-p2y);
				perpy=p1x-p2x;
				dist=Math.sqrt(perpx *perpx+perpy *perpy);
				perpx=perpx / dist *w;
				perpy=perpy / dist *w;
				perp2x=-(p2y-p3y);
				perp2y=p2x-p3x;
				dist=Math.sqrt(perp2x *perp2x+perp2y *perp2y);
				perp2x=perp2x / dist *w;
				perp2y=perp2y / dist *w;
				a1=(-perpy+p1y)-(-perpy+p2y);
				b1=(-perpx+p2x)-(-perpx+p1x);
				c1=(-perpx+p1x)*(-perpy+p2y)-(-perpx+p2x)*(-perpy+p1y);
				a2=(-perp2y+p3y)-(-perp2y+p2y);
				b2=(-perp2x+p2x)-(-perp2x+p3x);
				c2=(-perp2x+p3x)*(-perp2y+p2y)-(-perp2x+p2x)*(-perp2y+p3y);
				denom=a1 *b2-a2 *b1;
				if (Math.abs(denom)< 0.1){
					denom+=10.1;
					result.push(p2x-perpx,p2y-perpy,r,g,b,p2x+perpx,p2y+perpy,r,g,b);
					continue ;
				}
				px=(b1 *c2-b2 *c1)/ denom;
				py=(a2 *c1-a1 *c2)/ denom;
				pdist=(px-p2x)*(px-p2x)+(py-p2y)+(py-p2y);
				result.push(px,py,r,g,b,p2x-(px-p2x),p2y-(py-p2y),r,g,b);
			}
			p1x=points[points.length-10];
			p1y=points[points.length-9];
			p2x=points[points.length-5];
			p2y=points[points.length-4];
			perpx=-(p1y-p2y);
			perpy=p1x-p2x;
			dist=Math.sqrt(perpx *perpx+perpy *perpy);
			perpx=perpx / dist *w;
			perpy=perpy / dist *w;
			result.push(p2x-perpx,p2y-perpy,r,g,b,p2x+perpx,p2y+perpy,r,g,b);
			var groupLen=this.edges+1;
			for (i=1;i < groupLen;i++){
				indices.push(iStart+(i-1)*2,iStart+(i-1)*2+1,iStart+i *2+1,iStart+i *2+1,iStart+i *2,iStart+(i-1)*2);
			}
			return result;
		}

		//闭合路径
		__proto__.createLoopLine=function(p,indices,lineWidth,len,outVertex,outIndex){
			var points=p.concat();
			var result=outVertex ? outVertex :p;
			var color=this.borderColor;
			var r=((color >> 16)& 0x0000ff)/ 255,g=((color >> 8)& 0xff)/ 255,b=(color & 0x0000ff)/ 255;
			points.splice(0,5);
			var firstPoint=[points[0],points[1]];
			var lastPoint=[points[points.length-5],points[points.length-4]];
			var midPointX=lastPoint[0]+(firstPoint[0]-lastPoint[0])*0.5;
			var midPointY=lastPoint[1]+(firstPoint[1]-lastPoint[1])*0.5;
			points.unshift(midPointX,midPointY,0,0,0);
			points.push(midPointX,midPointY,0,0,0);
			var length=points.length / 5;
			var iStart=len,w=lineWidth / 2;
			var px,py,p1x,p1y,p2x,p2y,p3x,p3y;
			var perpx,perpy,perp2x,perp2y,perp3x,perp3y;
			var a1,b1,c1,a2,b2,c2;
			var denom,pdist,dist;
			p1x=points[0];
			p1y=points[1];
			p2x=points[5];
			p2y=points[6];
			perpx=-(p1y-p2y);
			perpy=p1x-p2x;
			dist=Math.sqrt(perpx *perpx+perpy *perpy);
			perpx=perpx / dist *w;
			perpy=perpy / dist *w;
			result.push(p1x-perpx,p1y-perpy,r,g,b,p1x+perpx,p1y+perpy,r,g,b);
			for (var i=1;i < length-1;i++){
				p1x=points[(i-1)*5];
				p1y=points[(i-1)*5+1];
				p2x=points[(i)*5];
				p2y=points[(i)*5+1];
				p3x=points[(i+1)*5];
				p3y=points[(i+1)*5+1];
				perpx=-(p1y-p2y);
				perpy=p1x-p2x;
				dist=Math.sqrt(perpx *perpx+perpy *perpy);
				perpx=perpx / dist *w;
				perpy=perpy / dist *w;
				perp2x=-(p2y-p3y);
				perp2y=p2x-p3x;
				dist=Math.sqrt(perp2x *perp2x+perp2y *perp2y);
				perp2x=perp2x / dist *w;
				perp2y=perp2y / dist *w;
				a1=(-perpy+p1y)-(-perpy+p2y);
				b1=(-perpx+p2x)-(-perpx+p1x);
				c1=(-perpx+p1x)*(-perpy+p2y)-(-perpx+p2x)*(-perpy+p1y);
				a2=(-perp2y+p3y)-(-perp2y+p2y);
				b2=(-perp2x+p2x)-(-perp2x+p3x);
				c2=(-perp2x+p3x)*(-perp2y+p2y)-(-perp2x+p2x)*(-perp2y+p3y);
				denom=a1 *b2-a2 *b1;
				if (Math.abs(denom)< 0.1){
					denom+=10.1;
					result.push(p2x-perpx,p2y-perpy,r,g,b,p2x+perpx,p2y+perpy,r,g,b);
					continue ;
				}
				px=(b1 *c2-b2 *c1)/ denom;
				py=(a2 *c1-a1 *c2)/ denom;
				pdist=(px-p2x)*(px-p2x)+(py-p2y)+(py-p2y);
				result.push(px,py,r,g,b,p2x-(px-p2x),p2y-(py-p2y),r,g,b);
			}
			if (outIndex){
				indices=outIndex;
			};
			var groupLen=this.edges+1;
			for (i=1;i < groupLen;i++){
				indices.push(iStart+(i-1)*2,iStart+(i-1)*2+1,iStart+i *2+1,iStart+i *2+1,iStart+i *2,iStart+(i-1)*2);
			}
			indices.push(iStart+(i-1)*2,iStart+(i-1)*2+1,iStart+1,iStart+1,iStart,iStart+(i-1)*2);
			return result;
		}

		return BasePoly;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/geometrydata.as
	//class laya.webgl.shapes.GeometryData
	var GeometryData=(function(){
		function GeometryData(lineWidth,lineColor,lineAlpha,fillColor,fillAlpha,fill,shape){
			//this.lineWidth=NaN;
			//this.lineColor=NaN;
			//this.lineAlpha=NaN;
			//this.fillColor=NaN;
			//this.fillAlpha=NaN;
			//this.shape=null;
			//this.fill=false;
			this.lineWidth=lineWidth;
			this.lineColor=lineColor;
			this.lineAlpha=lineAlpha;
			this.fillColor=fillColor;
			this.fillAlpha=fillAlpha;
			this.shape=shape;
			this.fill=fill;
		}

		CLASS$(GeometryData,'laya.webgl.shapes.GeometryData');
		var __proto__=GeometryData.prototype;
		__proto__.clone=function(){
			return new GeometryData(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.shape);
		}

		__proto__.getIndexData=function(){
			return null;
		}

		__proto__.getVertexData=function(){
			return null;
		}

		__proto__.destory=function(){
			this.shape=null;
		}

		return GeometryData;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/vertex.as
	//class laya.webgl.shapes.Vertex
	var Vertex=(function(){
		function Vertex(p){
			//this.points=null;
			if(p instanceof Float32Array)
				this.points=p;
			else if(p instanceof Array){
				var len=p.length;
				this.points=new Float32Array(p);
			}
		}

		CLASS$(Vertex,'laya.webgl.shapes.Vertex');
		var __proto__=Vertex.prototype;
		LAYABOX.implements(__proto__,{"laya.webgl.shapes.IShape":true})
		__proto__.getData=function(ib,vb,start){}
		return Vertex;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/submit/submit.as
	/**
	*...
	*@author River
	*/
	//class laya.webgl.submit.Submit
	var Submit=(function(){
		function Submit(renderType){
			//this._renderType=0;
			//this._vb=null;
			//this._ib=null;
			//this._startIdx=0;
			//this._numEle=0;
			//this.shaderValue=null;
			this.blendType=0;
			(renderType===void 0)&& (renderType=1);
			this._renderType=renderType;
		}

		CLASS$(Submit,'laya.webgl.submit.Submit');
		var __proto__=Submit.prototype;
		LAYABOX.implements(__proto__,{"laya.renders.ISubmit":true})
		__proto__.blend=function(){
			if (Submit.activeBlendType!==this.blendType){
				var blend=BlendMode.modes[this.blendType];
				var gl=WebGL.mainContext;
				gl.enable(/*laya.webgl.WebGLContext.BLEND*/0x0BE2);
				gl.blendFunc(blend[0],blend[1]);
				Submit.activeBlendType=this.blendType;
			}
		}

		__proto__.releaseRender=function(){
			var cache=Submit._cache;
			cache[cache._length++]=this;
			this.shaderValue.release();
		}

		__proto__.getRenderType=function(){
			return this._renderType;
		}

		__proto__.renderSubmit=function(){
			this._ib.upload_bind();
			this._vb.upload_bind();
			this.shaderValue.upload();
			this.blend();
			Stat.drawCall++;
			Stat.trianglesFaces+=this._numEle/3;
			WebGL.mainContext.drawElements(/*laya.webgl.WebGLContext.TRIANGLES*/0x0004,this._numEle,/*laya.webgl.WebGLContext.UNSIGNED_SHORT*/0x1403,this._startIdx);
			return 1;
		}

		Submit.__init__=function(){
			var s=Submit.RENDERBASE=new Submit(-1);
			s.shaderValue=new Value2D(0,0);
			s.shaderValue.ALPHA=-1234;
		}

		Submit.create=function(context,ib,vb,pos,sv){
			var o=Submit._cache._length?Submit._cache[--Submit._cache._length]:new Submit();
			o._ib=ib;
			o._vb=vb;
			o._startIdx=pos *CONST3D2D.BYTES_PIDX;
			o._numEle=0;
			o.blendType=context._nBlendType;
			o.shaderValue=sv;
			o.shaderValue.setValue(context._shader2D);
			o.shaderValue.setFilters(context._shader2D.filters);
			return o;
		}

		Submit.createShape=function(ctx,ib,vb,numEle,offset,sv){
			var o=(!Submit._cache._length)?(new Submit()):Submit._cache[--Submit._cache._length];
			o._ib=ib;
			o._vb=vb;
			o._numEle=numEle;
			o._startIdx=offset;
			o.shaderValue=sv;
			o.shaderValue.setValue(ctx._shader2D);
			return o;
		}

		Submit.TYPE_2D=1;
		Submit.TYPE_CANVAS=3;
		Submit.TYPE_CMDSETRT=4;
		Submit.TYPE_CUSTOM=5;
		Submit.TYPE_BLURRT=6;
		Submit.TYPE_CMDDESTORYPRERT=7;
		Submit.TYPE_DISABLESTENCIL=8;
		Submit.TYPE_OTHERIBVB=9;
		Submit.TYPE_PRIMITIVE=10;
		Submit.TYPE_RT=11;
		Submit.TYPE_BLUR_RT=12;
		Submit.TYPE_TARGET=13;
		Submit.TYPE_CHANGE_VALUE=14;
		Submit.TYPE_SHAPE=15;
		Submit.RENDERBASE=null
		Submit.activeBlendType=-1;
		Submit._cache=(Submit._cache=[],Submit._cache._length=0,Submit._cache);
		return Submit;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/submit/submitcanvas.as
	/**
	*...
	*@author wk
	*/
	//class laya.webgl.submit.SubmitCanvas
	var SubmitCanvas=(function(){
		function SubmitCanvas(){
			//this._ctx=null;
			//this._alpha=NaN;
			this._matrix=new Matrix();
			this._matrix4=CONST3D2D.defaultMatrix4.concat();
		}

		CLASS$(SubmitCanvas,'laya.webgl.submit.SubmitCanvas');
		var __proto__=SubmitCanvas.prototype;
		LAYABOX.implements(__proto__,{"laya.renders.ISubmit":true})
		__proto__.renderSubmit=function(){
			var preMatrix4=RenderState2D.worldMatrix4;
			var preMatrix=RenderState2D.worldMatrix;
			var m=this._matrix;
			var m4=this._matrix4;
			m4[0]=m.a;
			m4[1]=m.b;
			m4[4]=m.c;
			m4[5]=m.d;
			m4[12]=m.tx;
			m4[13]=m.ty;
			RenderState2D.worldMatrix=m;
			RenderState2D.worldMatrix4=m4;
			var preAlpha=RenderState2D.worldAlpha;
			RenderState2D.worldAlpha=RenderState2D.worldAlpha *this._alpha;
			RenderState2D.worldMatrix4Modify++;
			this._ctx.flush();
			RenderState2D.worldMatrix4Modify--;
			RenderState2D.worldAlpha=preAlpha;
			RenderState2D.worldMatrix4=preMatrix4;
			RenderState2D.worldMatrix=preMatrix;
			return 1;
		}

		__proto__.releaseRender=function(){
			var cache=SubmitCanvas._cache;
			cache[cache._length++]=this;
		}

		__proto__.getRenderType=function(){
			return /*laya.webgl.submit.Submit.TYPE_CANVAS*/3;
		}

		SubmitCanvas.create=function(ctx,alpha){
			var o=(!SubmitCanvas._cache._length)?(new SubmitCanvas()):SubmitCanvas._cache[--SubmitCanvas._cache._length];
			o._ctx=ctx;
			o._alpha=alpha;
			return o;
		}

		SubmitCanvas._cache=(SubmitCanvas._cache=[],SubmitCanvas._cache._length=0,SubmitCanvas._cache);
		return SubmitCanvas;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/submit/submitcmd.as
	//class laya.webgl.submit.SubmitCMD
	var SubmitCMD=(function(){
		function SubmitCMD(){
			this.fun=null;
			this.args=null;
		}

		CLASS$(SubmitCMD,'laya.webgl.submit.SubmitCMD');
		var __proto__=SubmitCMD.prototype;
		LAYABOX.implements(__proto__,{"laya.renders.ISubmit":true})
		//debugger;
		__proto__.renderSubmit=function(){
			this.fun.apply(null,this.args);
			return 1;
		}

		__proto__.getRenderType=function(){
			return 0;
		}

		__proto__.releaseRender=function(){
			var cache=SubmitCMD._cache;
			cache[cache._length++]=this;
		}

		SubmitCMD.create=function(args,fun){
			var o=SubmitCMD._cache._length?SubmitCMD._cache[--SubmitCMD._cache._length]:new SubmitCMD();
			o.fun=fun;
			o.args=args;
			return o;
		}

		SubmitCMD._cache=(SubmitCMD._cache=[],SubmitCMD._cache._length=0,SubmitCMD._cache);
		return SubmitCMD;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/submit/submitcmdscope.as
	//class laya.webgl.submit.SubmitCMDScope
	var SubmitCMDScope=(function(){
		function SubmitCMDScope(){
			this.variables={};
		}

		CLASS$(SubmitCMDScope,'laya.webgl.submit.SubmitCMDScope');
		var __proto__=SubmitCMDScope.prototype;
		__proto__.getValue=function(name){
			return this.variables[name];
		}

		__proto__.addValue=function(name,value){
			return this.variables[name]=value;
		}

		__proto__.setValue=function(name,value){
			if(this.variables.hasOwnProperty(name)){
				return this.variables[name]=value;
			}
			return null;
		}

		__proto__.clear=function(){
			for(var key in this.variables){
				delete this.variables[key];
			}
		}

		__proto__.recycle=function(){
			this.clear();
			SubmitCMDScope.POOL.push(this);
		}

		SubmitCMDScope.create=function(){
			var scope=SubmitCMDScope.POOL.pop();
			scope||(scope=new SubmitCMDScope());
			return scope;
		}

		SubmitCMDScope.POOL=[];
		return SubmitCMDScope;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/submit/submitotheribvb.as
	/**
	*...
	*@author wk
	*/
	//class laya.webgl.submit.SubmitOtherIBVB
	var SubmitOtherIBVB=(function(){
		function SubmitOtherIBVB(){
			this.offset=0;
			//this._vb=null;
			//this._ib=null;
			//this._mat=null;
			//this._shader=null;
			//this._shaderValue=null;
			//this._numEle=0;
			this.blendType=0;
			this.startIndex=0;
			;
			this._mat=new Matrix();
		}

		CLASS$(SubmitOtherIBVB,'laya.webgl.submit.SubmitOtherIBVB');
		var __proto__=SubmitOtherIBVB.prototype;
		LAYABOX.implements(__proto__,{"laya.renders.ISubmit":true})
		__proto__.releaseRender=function(){
			var cache=SubmitOtherIBVB._cache;
			cache[cache._length++]=this;
		}

		__proto__.getRenderType=function(){
			return /*laya.webgl.submit.Submit.TYPE_OTHERIBVB*/9;
		}

		__proto__.renderSubmit=function(){
			this._ib.upload_bind();
			this._vb.upload_bind();
			var worldMatrix4=RenderState2D.worldMatrix4;
			var m=this._mat,mat=CONST3D2D.defaultMatrix4;
			var m2=Matrix.TEMP;
			m2.a=mat[0];
			m2.b=mat[1];
			m2.c=mat[4];
			m2.d=mat[5];
			m2.tx=mat[8];
			m2.ty=mat[9];
			Matrix.mul(m,m2,m);
			var tmp=RenderState2D.worldMatrix4=SubmitOtherIBVB.tempMatrix4;
			tmp[0]=m.a;
			tmp[1]=m.b;
			tmp[4]=m.c;
			tmp[5]=m.d;
			tmp[12]=m.tx;
			tmp[13]=m.ty;
			RenderState2D.worldMatrix4Modify++;
			this._shader.offset=this.offset;
			this._shader.upload(this._shaderValue.refresh());
			this._shader.offset=0;
			var gl=WebGL.mainContext;
			if (Submit.activeBlendType!==this.blendType){
				var blend=BlendMode.modes[this.blendType];
				gl.enable(/*laya.webgl.WebGLContext.BLEND*/0x0BE2);
				gl.blendFunc(blend[0],blend[1]);
				Submit.activeBlendType=this.blendType;
			}
			Stat.drawCall++;
			Stat.trianglesFaces+=this._numEle/3;
			gl.drawElements(/*laya.webgl.WebGLContext.TRIANGLES*/0x0004,this._numEle,/*laya.webgl.WebGLContext.UNSIGNED_SHORT*/0x1403,this.startIndex);
			RenderState2D.worldMatrix4=worldMatrix4;
			return 1;
		}

		SubmitOtherIBVB.create=function(context,vb,ib,numElement,shader,shaderValue,startIndex,offset){
			var o=(!SubmitOtherIBVB._cache._length)?(new SubmitOtherIBVB()):SubmitOtherIBVB._cache[--SubmitOtherIBVB._cache._length];
			o._ib=ib;
			o._vb=vb;
			o._numEle=numElement;
			o._shader=shader;
			o._shaderValue=shaderValue;
			o.blendType=context._nBlendType;
			o.startIndex=startIndex;
			o.offset=offset;
			return o;
		}

		SubmitOtherIBVB._cache=(SubmitOtherIBVB._cache=[],SubmitOtherIBVB._cache._length=0,SubmitOtherIBVB._cache);
		SubmitOtherIBVB.tempMatrix4=[
		1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1,];
		return SubmitOtherIBVB;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/submit/submitstencil.as
	//class laya.webgl.submit.SubmitStencil
	var SubmitStencil=(function(){
		function SubmitStencil(){
			this.step=0;
			this.level=0;
		}

		CLASS$(SubmitStencil,'laya.webgl.submit.SubmitStencil');
		var __proto__=SubmitStencil.prototype;
		LAYABOX.implements(__proto__,{"laya.renders.ISubmit":true})
		__proto__.renderSubmit=function(){
			switch(this.step){
				case 1:
					this.do1();
					break ;
				case 2:
					this.do2();
					break ;
				case 3:
					this.do3();
					break ;
				}
			return 1;
		}

		__proto__.getRenderType=function(){
			return 0;
		}

		__proto__.releaseRender=function(){
			var cache=SubmitStencil._cache;
			cache[cache._length++]=this;
		}

		__proto__.do1=function(){
			var gl=WebGL.mainContext;
			gl.enable(/*laya.webgl.WebGLContext.STENCIL_TEST*/0x0B90);
			gl.clear(/*laya.webgl.WebGLContext.STENCIL_BUFFER_BIT*/0x00000400);
			gl.colorMask(false,false,false,false);
			gl.stencilFunc(/*laya.webgl.WebGLContext.EQUAL*/0x0202,this.level,0xFF);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.INCR*/0x1E02);
		}

		//gl.stencilOp(WebGLContext.KEEP,WebGLContext.KEEP,WebGLContext.INVERT);//测试通过给模版缓冲 写入值 一开始是0 现在是 0xFF (模版缓冲中不知道是多少位的数据)
		__proto__.do2=function(){
			var gl=WebGL.mainContext;
			gl.stencilFunc(/*laya.webgl.WebGLContext.EQUAL*/0x0202,this.level+1,0xFF);
			gl.colorMask(true,true,true,true);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00);
		}

		__proto__.do3=function(){
			var gl=WebGL.mainContext;
			gl.clear(/*laya.webgl.WebGLContext.STENCIL_BUFFER_BIT*/0x00000400);
			gl.disable(/*laya.webgl.WebGLContext.STENCIL_TEST*/0x0B90);
		}

		SubmitStencil.create=function(step){
			var o=SubmitStencil._cache._length?SubmitStencil._cache[--SubmitStencil._cache._length]:new SubmitStencil();
			o.step=step;
			return o;
		}

		SubmitStencil._cache=(SubmitStencil._cache=[],SubmitStencil._cache._length=0,SubmitStencil._cache);
		return SubmitStencil;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/submit/submittarget.as
	//class laya.webgl.submit.SubmitTarget
	var SubmitTarget=(function(){
		function SubmitTarget(){
			this._renderType=0;
			this._vb=null;
			this._ib=null;
			this._startIdx=0;
			this._numEle=0;
			this.shaderValue=null;
			this.blendType=0;
			this.proName=null;
			this.scope=null;
		}

		CLASS$(SubmitTarget,'laya.webgl.submit.SubmitTarget');
		var __proto__=SubmitTarget.prototype;
		LAYABOX.implements(__proto__,{"laya.renders.ISubmit":true})
		__proto__.renderSubmit=function(){
			this._ib.upload_bind();
			this._vb.upload_bind();
			var target=this.scope.getValue(this.proName);
			this.shaderValue.texture=target.useGLTextur().source;
			this.shaderValue.upload();
			this.blend();
			Stat.drawCall++;
			Stat.trianglesFaces+=this._numEle/3;
			WebGL.mainContext.drawElements(/*laya.webgl.WebGLContext.TRIANGLES*/0x0004,this._numEle,/*laya.webgl.WebGLContext.UNSIGNED_SHORT*/0x1403,this._startIdx);
			return 1;
		}

		__proto__.blend=function(){
			if (SubmitTarget.activeBlendType!==this.blendType){
				var blend=BlendMode.modes[this.blendType];
				var gl=WebGL.mainContext;
				gl.enable(/*laya.webgl.WebGLContext.BLEND*/0x0BE2);
				gl.blendFunc(blend[0],blend[1]);
				SubmitTarget.activeBlendType=this.blendType;
			}
		}

		__proto__.getRenderType=function(){
			return 0;
		}

		__proto__.releaseRender=function(){
			var cache=SubmitTarget._cache;
			cache[cache._length++]=this;
		}

		SubmitTarget.create=function(context,ib,vb,pos,sv,proName){
			var o=SubmitTarget._cache._length?SubmitTarget._cache[--SubmitTarget._cache._length]:new SubmitTarget();
			o._ib=ib;
			o._vb=vb;
			o.proName=proName;
			o._startIdx=pos *CONST3D2D.BYTES_PIDX;
			o._numEle=0;
			o.blendType=context._nBlendType;
			o.shaderValue=sv;
			o.shaderValue.setValue(context._shader2D);
			return o;
		}

		SubmitTarget.activeBlendType=-1;
		SubmitTarget._cache=(SubmitTarget._cache=[],SubmitTarget._cache._length=0,SubmitTarget._cache);
		return SubmitTarget;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/text/drawtext.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.text.DrawText
	var DrawText=(function(){
		var TextTexture,OneChar;
		function DrawText(){};
		CLASS$(DrawText,'laya.webgl.text.DrawText');
		DrawText.getChar=function(char,font,lineWidth,size,scaleX,scaleY){
			var id=font+"~"+char+"~"+scaleX+"~"+scaleY+"~"+lineWidth;
			var oneChar=DrawText._wordsMsg[id];
			if (oneChar){
				return oneChar.active();
			};
			var _texts=DrawText._textTextures;
			for (var i=0,n=_texts.length;i < n;i++){
				oneChar=_texts[i].createOneChar(size,char,font,lineWidth,scaleX,scaleY);
				if (oneChar){
					DrawText._wordsMsg[id]=oneChar;
					return oneChar.active();
				}
			}
			_texts.push(new TextTexture(_texts.length,size));
			return DrawText.getChar(char,font,lineWidth,size,scaleX,scaleY);
		}

		DrawText.drawText=function(ctx,txt,words,curMat,font,textAlign,lineWidth,x,y){
			if (DrawText._destroyTextTextureDo===Stat.loopCount){
				DrawText._destroyTextTexture.forEach(function(o){
					o.resource.destory();
					o.destroy();
				});
				DrawText._destroyTextTexture.length=DrawText._destroyTextTextureDo=0;
			}
			if (txt && txt.length===0)return;
			if (words && words.length===0)return;
			DrawText._fontTemp || (DrawText._fontTemp=new FontInContext());
			var i,n;
			var rot=curMat.b==0 && curMat.c==0 ? 0 :1;
			var sx=curMat.a,sy=curMat.d;
			(rot!==0)&& (sx=sy=1);
			var sx2=1,sy2=1;
			var italic=font.hasType("italic");
			if (sx !=1 || sy !=1 || italic>=0)font=font.copyTo(DrawText._fontTemp);
			italic >=0 && font.removeType("italic");
			if (sx !=1 || sy !=1){
				if (sx > sy){
					font.size=font.size *sx;
					sy2=sy / sx;
				}
				else{
					font.size=font.size *sy;
					sx2=sx / sy;
				}
				font.size=Math.floor(font.size);
			};
			var width=0;
			var chars=DrawText._charsTemp;
			var oneChar;
			var htmlWord;
			var size=Math.floor(font.size/ 16+0.5)*16;
			if (size > 64)debugger;
			if (words){
				chars.length=words.length;
				for (i=0,n=words.length;i < n;i++){
					htmlWord=words[i];
					chars[i]=oneChar=DrawText.getChar(htmlWord.char,font,lineWidth,size,sx2,sy2);
				}
			}
			else{
				chars.length=txt.length;
				for (i=0,n=txt.length;i < n;i++){
					chars[i]=oneChar=DrawText.getChar(txt.charAt(i),font,lineWidth,size,sx2,sy2);
					width+=oneChar.width;
				}
			};
			var curMat2=curMat;
			if (sx !=1 || sy !=1 || italic >=0){
				curMat2=WebGLContext2D._tmpMatrix;
				curMat.copy(curMat2);
			}
			if (sx !=1 || sy !=1){
				var tx=curMat2.tx;
				var ty=curMat2.ty;
				curMat2.scale(1 / sx,1 / sy);
				curMat2.tx=tx;
				curMat2.ty=ty;
				x *=sx;
				y *=sy;
			}
			curMat2.tx |=0;
			curMat2.ty |=0;
			switch (textAlign){
				case "center":
					x-=width / 2;
					break ;
				case "right":
					x-=width;
					break ;
				};
			var dx;
			var uv;
			var bdSz;
			if (words){
				for (i=0,n=chars.length;i < n;i++){
					oneChar=chars[i];
					if (oneChar.char !=' '){
						htmlWord=words[i];
						uv=oneChar.texture.uv;
						oneChar.texture.uv=oneChar.UV;
						dx=italic >=0?(oneChar.height *0.4):0;
						bdSz=oneChar.borderSize;
						ctx.drawText(oneChar.texture,x+htmlWord.x*sx-bdSz,y+htmlWord.y*sy-bdSz,oneChar.width+bdSz,oneChar.height+bdSz,curMat2,0,0,dx,0);
						oneChar.texture.uv=uv;
					}
				}
			}
			else{
				for (i=0,n=chars.length;i < n;i++){
					oneChar=chars[i];
					if (oneChar.char !=' '){
						uv=oneChar.texture.uv;
						oneChar.texture.uv=oneChar.UV;
						dx=italic >=0?(oneChar.height *0.4):0;
						bdSz=oneChar.borderSize;
						ctx.drawText(oneChar.texture,x-bdSz,y-bdSz,oneChar.width+bdSz,oneChar.height+bdSz,curMat2,0,0,dx,0);
						oneChar.texture.uv=uv;
					}
					x+=oneChar.width;
				}
			}
		}

		DrawText._wordsMsg={};
		DrawText._textTextures=new Array;
		DrawText._charsTemp=new Array;
		DrawText._fontTemp=null;
		DrawText._destroyTextTextureDo=0;
		STATICATTR$(DrawText,
		['_destroyTextTexture',function(){return this._destroyTextTexture=new Array;}
		]);
		DrawText.__init$__=function(){
			//class TextTexture
			TextTexture=(function(){
				function TextTexture(index,size){
					//this.texture=null;
					this.full=false;
					//this.index=0;
					//this.size=0;
					this.width=512;
					this.height=512;
					this.xoffset=0;
					this.yoffset=0;
					this.maxHeight=0;
					this.chars=new Array;
					this.index=index;
					this.size=size;
					this._reOrganization();
				}
				CLASS$(TextTexture,'');
				var __proto__=TextTexture.prototype;
				__proto__._reOrganization=function(){
					var _$this=this;
					if (this.texture){
						DrawText._destroyTextTexture.push(this.texture);
						DrawText._destroyTextTextureDo=Stat.loopCount+2;
					};
					var canvas=new HTMLCanvas(null);
					Text.canvas.size(this.width,this.height);
					Text.canvas.copyTo(canvas);
					this.texture=new Texture(canvas);
					var glTex=this.texture.resource.useGLTextur2D();
					glTex.lock();
					glTex.source;
					this.xoffset=this.yoffset=this.maxHeight=0;
					this.chars.forEach(function(o){_$this._draw(o)});
					console.log("new TextTexture:"+this.index+"  "+this.width+","+this.height);
				}
				__proto__._draw=function(oneChar){
					var canvas=Text.canvas;
					var ctx=Text.ctx;
					var xs=oneChar.xs,ys=oneChar.ys;
					var t=Utils.measureText(oneChar.char,oneChar.font);
					var borderSize=4;
					oneChar.width=t.width*xs;
					oneChar.height=t.height*ys;
					var x,y;
					if ((this.xoffset+oneChar.width+borderSize*2)>=this.width){
						this.xoffset=oneChar.width+borderSize*2;
						this.yoffset+=this.maxHeight;
						this.maxHeight=oneChar.height+borderSize*2;
						x=0;
						y=this.yoffset;
					}
					else {
						x=this.xoffset;
						y=this.yoffset;
						this.xoffset+=oneChar.width+borderSize*2;
						this.maxHeight=Math.max(this.maxHeight,oneChar.height+borderSize*2);
					}
					if ((y+this.maxHeight)>=this.height){
						if (this.height >=2048){
							this.full=true;
							return-1;
						}
						this.height=GlUtils.mathCeilPowerOfTwo(this.height+128);
						return 1;
					}
					canvas.size(oneChar.width+borderSize*2,oneChar.height+borderSize*2);
					ctx.save();
					(ctx).clearRect(0,0,oneChar.width+borderSize*4,oneChar.height+borderSize*4);
					ctx.font=oneChar.font;
					ctx.textBaseline="top";
					(xs !=1 || ys !=1)&& ctx.scale(xs,ys);
					ctx.translate(borderSize,borderSize);
					if (oneChar.lineWidth===-1){
						ctx.fillStyle="black";
						ctx.fillText(oneChar.char,0,0,null,null,null);
					}
					else{
						/*__JS__ */ctx.strokeStyle='white';
						/*__JS__ */ctx.lineWidth=oneChar.lineWidth;
						ctx.strokeText(oneChar.char,0,0,null,null,0,null);
					}
					ctx.restore();
					oneChar.borderSize=borderSize;
					oneChar.texture=this.texture;
					var x1=x / this.width,x2=(x+oneChar.width+borderSize)/ this.width;
					var y1=y / this.height,y2=(y+oneChar.height+borderSize)/ this.height;
					oneChar.UV=[x1,y1,x2,y1,x2,y2,x1,y2];
					(this.texture.resource.useGLTextur2D()).texSubImage2D(canvas,x,y);
					return 0;
				}
				__proto__.createOneChar=function(size,char,font,lineWidth,scaleX,scaleY){
					if (this.full || size !=this.size)return null;
					var oneChar=new OneChar(this.index);
					oneChar.char=char;
					oneChar.xs=scaleX;
					oneChar.ys=scaleY;
					oneChar.font=font.toString();
					oneChar.fontSize=size;
					oneChar.lineWidth=lineWidth;
					var r=this._draw(oneChar);
					if (r===-1)return null;
					this.chars.push(oneChar);
					if(r===1)this._reOrganization();
					return oneChar;
				}
				return TextTexture;
			})()
			//class OneChar
			OneChar=(function(){
				function OneChar(index){
					this.texturIndex=0;
					//this.xs=NaN;
					//this.ys=NaN;
					//this.width=0;
					//this.height=0;
					//this.char=null;
					//this.tex=null;
					//this.borderSize=0;
					//this.font=null;
					//this.fontSize=0;
					//this._active=0;
					//this.texture=null;
					//this.lineWidth=0;
					//this.UV=null;
					this.texturIndex=index;
				}
				CLASS$(OneChar,'');
				var __proto__=OneChar.prototype;
				__proto__.active=function(){
					this._active=Stat.loopCount;
					return this;
				}
				return OneChar;
			})()
		}

		return DrawText;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/text/fontincontext.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.text.FontInContext
	var FontInContext=(function(){
		function FontInContext(font){
			//this._text=null;
			//this._words=null;
			this._index=0;
			this._size=14;
			this.setFont(font || "14px Arial");
		}

		CLASS$(FontInContext,'laya.webgl.text.FontInContext');
		var __proto__=FontInContext.prototype;
		__proto__.setFont=function(value){
			this._words=value.split(' ');
			for (var i=0,n=this._words.length;i < n;i++){
				if (this._words[i].indexOf('px')> 0){
					this._index=i;
					break ;
				}
			}
			this._size=LAYABOX.parseInt(this._words[this._index]);
			this._text=null;
		}

		__proto__.hasType=function(name){
			for (var i=0,n=this._words.length;i < n;i++)
			if (this._words[i]===name)return i;
			return-1;
		}

		__proto__.removeType=function(name){
			for (var i=0,n=this._words.length;i < n;i++)
			if (this._words[i]===name){
				this._words.splice(i,1);
				if (this._index > i)this._index--;
				break ;
			}
			this._text=null;
		}

		__proto__.copyTo=function(dec){
			dec._text=this._text;
			dec._size=this._size;
			dec._index=this._index;
			dec._words=this._words.slice();
			return dec;
		}

		__proto__.toString=function(){
			return this._text?this._text:(this._text=this._words.join(' '));
		}

		GETSET$(0,__proto__,'size',function(){
			return this._size;
			},function(value){
			this._size=value;
			this._words[this._index]=value+"px";
			this._text=null;
		});

		FontInContext.EMPTY=new FontInContext();
		return FontInContext;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/utils/const3d2d.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.utils.CONST3D2D
	var CONST3D2D=(function(){
		function CONST3D2D(){};
		CLASS$(CONST3D2D,'laya.webgl.utils.CONST3D2D');
		CONST3D2D.BYTES_PE=/*__JS__ */window.Float32Array && Float32Array.BYTES_PER_ELEMENT;
		CONST3D2D.BYTES_PIDX=/*__JS__ */window.Uint16Array && Uint16Array.BYTES_PER_ELEMENT;
		CONST3D2D.defaultMatrix4=[
		1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1,];
		CONST3D2D.defaultMinusYMatrix4=[
		1,0,0,0,
		0,-1,0,0,
		0,0,1,0,
		0,0,0,1,];
		CONST3D2D.uniformMatrix3=[
		1,0 ,0,0,
		0,1,0,0,
		0,0,1,0];
		CONST3D2D._TMPARRAY=[];
		return CONST3D2D;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/utils/glutils.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.utils.GlUtils
	var GlUtils=(function(){
		function GlUtils(){};
		CLASS$(GlUtils,'laya.webgl.utils.GlUtils');
		GlUtils.make2DProjection=function(width,height,depth){
			return [
			2.0 / width,0,0,0,
			0,-2.0 / height,0,0,
			0,0,2.0 / depth,0,
			-1,1,0,1,];
		}

		GlUtils.fillIBQuadrangle=function(buffer,count){
			if (count> 65535/4){
				throw Error("IBQuadrangle count:"+count+" must<:"+Math.floor(65535/4));
				return false;
			}
			count=Math.floor(count);
			buffer._resizeBuffer((count+1)*6 */*laya.webgl.utils.Buffer.SHORT*/2,false);
			buffer.length=buffer.bufferLength;
			var bufferData=new Uint16Array(buffer.getBuffer());
			var idx=0;
			for (var i=0;i < count;i++){
				bufferData[idx++]=i *4;
				bufferData[idx++]=i *4+2;
				bufferData[idx++]=i *4+1;
				bufferData[idx++]=i *4;
				bufferData[idx++]=i *4+3;
				bufferData[idx++]=i *4+2;
			}
			buffer.setNeedUpload();
			buffer.upload();
			return true;
		}

		GlUtils.expandIBQuadrangle=function(buffer,count){
			buffer.bufferLength >=(count *6 */*laya.webgl.utils.Buffer.SHORT*/2)|| GlUtils.fillIBQuadrangle(buffer,count);
		}

		GlUtils.mathCeilPowerOfTwo=function(value){
			value--;
			value |=value >> 1;
			value |=value >> 2;
			value |=value >> 4;
			value |=value >> 8;
			value |=value >> 16;
			value++;
			return value;
		}

		GlUtils.fillQuadrangleImgVb=function(vb,x,y,point4,uv,m,_x,_y){
			'use strict';
			x |=0;y |=0;_x |=0;_y |=0;
			var vpos=(vb._length>>2)+/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16;
			vb.length=(vpos << 2);
			var vbdata=vb.getFloat32Array();
			vpos-=/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16;
			vbdata[vpos+2]=uv[0];
			vbdata[vpos+3]=uv[1];
			vbdata[vpos+6]=uv[2];
			vbdata[vpos+7]=uv[3];
			vbdata[vpos+10]=uv[4];
			vbdata[vpos+11]=uv[5];
			vbdata[vpos+14]=uv[6];
			vbdata[vpos+15]=uv[7];
			var a=m.a,b=m.b,c=m.c,d=m.d;
			if (a!==1 || b!==0 || c!==0 || d!==1){
				m.bTransform=true;
				var tx=m.tx+_x,ty=m.ty+_y;
				vbdata[vpos]=(point4[0]+x)*a+(point4[1]+y)*c+tx;
				vbdata[vpos+1]=(point4[0]+x)*b+(point4[1]+y)*d+ty;
				vbdata[vpos+4]=(point4[2]+x)*a+(point4[3]+y)*c+tx;
				vbdata[vpos+5]=(point4[2]+x)*b+(point4[3]+y)*d+ty;
				vbdata[vpos+8]=(point4[4]+x)*a+(point4[5]+y)*c+tx;
				vbdata[vpos+9]=(point4[4]+x)*b+(point4[5]+y)*d+ty;
				vbdata[vpos+12]=(point4[6]+x)*a+(point4[7]+y)*c+tx;
				vbdata[vpos+13]=(point4[6]+x)*b+(point4[7]+y)*d+ty;
			}
			else{
				m.bTransform=false;
				x+=m.tx+_x;
				y+=m.ty+_y;
				vbdata[vpos]=x+point4[0];
				vbdata[vpos+1]=y+point4[1];
				vbdata[vpos+4]=x+point4[2];
				vbdata[vpos+5]=y+point4[3];
				vbdata[vpos+8]=x+point4[4];
				vbdata[vpos+9]=y+point4[5];
				vbdata[vpos+12]=x+point4[6];
				vbdata[vpos+13]=y+point4[7];
			}
			vb._upload=true;
			return true;
		}

		GlUtils.fillTranglesVB=function(vb,x,y,points,m,_x,_y){
			'use strict';
			x |=0;y |=0;_x |=0;_y |=0;
			var vpos=(vb._length >> 2)+points.length;
			vb.length=(vpos << 2);
			var vbdata=vb.getFloat32Array();
			vpos-=points.length;
			var len=points.length;
			var a=m.a,b=m.b,c=m.c,d=m.d;
			for (var i=0;i < len;i+=4){
				vbdata[vpos+i+2]=points[i+2];
				vbdata[vpos+i+3]=points[i+3];
				if (a!==1 || b!==0 || c!==0 || d!==1){
					m.bTransform=true;
					var tx=m.tx+_x,ty=m.ty+_y;
					vbdata[vpos+i]=(points[i]+x)*a+(points[i+1]+y)*c+tx;
					vbdata[vpos+i+1]=(points[i]+x)*b+(points[i+1]+y)*d+ty;
				}
				else{
					m.bTransform=false;
					x+=m.tx+_x;
					y+=m.ty+_y;
					vbdata[vpos+i]=x+points[i];
					vbdata[vpos+i+1]=y+points[i+1];
				}
			}
			vb._upload=true;
			return true;
		}

		GlUtils.fillRectImgVb=function(vb,clip,x,y,width,height,uv,m,_x,_y,dx,dy){
			'use strict';
			var mType=1;
			var toBx,toBy,toEx,toEy;
			var cBx,cBy,cEx,cEy;
			var w0,h0,tx,ty;
			var a=m.a,b=m.b,c=m.c,d=m.d;
			var useClip=clip.width < /*laya.webgl.canvas.WebGLContext2D._MAXSIZE*/99999999;
			if (a!==1 || b!==0 || c!==0 || d!==1){
				m.bTransform=true;
				if (b===0 && c===0){
					x |=0;y |=0;_x |=0;_y |=0;
					mType=useClip?30:23;
					w0=width+x,h0=height+y;
					tx=m.tx+_x,ty=m.ty+_y;
					toBx=a *x+tx;
					toEx=a *w0+tx;
					toBy=d *y+ty;
					toEy=d *h0+ty;
				}
			}
			else{
				x |=0;y |=0;_x |=0;_y |=0;
				mType=useClip?30:23;
				m.bTransform=false;
				toBx=x+m.tx+_x;
				toEx=toBx+width;
				toBy=y+m.ty+_y;
				toEy=toBy+height;
			}
			if (useClip){
				cBx=clip.x,cBy=clip.y,cEx=clip.width+cBx,cEy=clip.height+cBy;
			}
			if (mType!==1 && (toBx >=cEx || toBy >=cEy || toEx <=cBx || toEy <=cBy))
				return false;
			var vpos=(vb._length >> 2)+/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16;
			vb.seLength((vpos << 2));
			var vbdata=vb.getFloat32Array();
			vpos-=/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16;
			vbdata[vpos+2]=uv[0];
			vbdata[vpos+3]=uv[1];
			vbdata[vpos+6]=uv[2];
			vbdata[vpos+7]=uv[3];
			vbdata[vpos+10]=uv[4];
			vbdata[vpos+11]=uv[5];
			vbdata[vpos+14]=uv[6];
			vbdata[vpos+15]=uv[7];
			switch(mType){
				case 1:
					tx=m.tx+_x,ty=m.ty+_y;
					w0=width+x,h0=height+y;
					var w1=x,h1=y;
					var aw1=a *w1,ch1=c *h1,dh1=d *h1,bw1=b *w1;
					var aw0=a *w0,ch0=c *h0,dh0=d *h0,bw0=b *w0;
					vbdata[vpos]=aw1+ch1+tx;
					vbdata[vpos+1]=dh1+bw1+ty;
					vbdata[vpos+4]=aw0+ch1+tx;
					vbdata[vpos+5]=dh1+bw0+ty;
					vbdata[vpos+8]=aw0+ch0+tx;
					vbdata[vpos+9]=dh0+bw0+ty;
					vbdata[vpos+12]=aw1+ch0+tx;
					vbdata[vpos+13]=dh0+bw1+ty;
					break ;
				case 23:
					vbdata[vpos]=toBx+dx;
					vbdata[vpos+1]=toBy;
					vbdata[vpos+4]=toEx+dx;
					vbdata[vpos+5]=toBy;
					vbdata[vpos+8]=toEx;
					vbdata[vpos+9]=toEy;
					vbdata[vpos+12]=toBx;
					vbdata[vpos+13]=toEy;
					break ;
				case 30:
					if (toBx < cBx || toBy < cBy || toEx > cEx || toEy > cEy){
						var dcx=cBx-toBx,dcty=cBy-toBy,decr=toEx-cEx,decb=toEy-cEy;
						if(dcx > 0){toBx=cBx;vbdata[vpos+14]=vbdata[vpos+2]=vbdata[vpos+2]+dcx / (width *a)*(vbdata[vpos+6]-vbdata[vpos+2])};
						if(dcty > 0){toBy=cBy;vbdata[vpos+7]=vbdata[vpos+3]=vbdata[vpos+3]+dcty / (height *d)*(vbdata[vpos+11]-vbdata[vpos+7])};
						if(decr > 0){toEx=cEx;vbdata[vpos+6]=vbdata[vpos+10]=vbdata[vpos+6]-decr / (width *a)*(vbdata[vpos+6]-vbdata[vpos+2])};
						if(decb > 0){toEy=cEy;vbdata[vpos+11]=vbdata[vpos+15]=vbdata[vpos+15]-decb / (height *d)*(vbdata[vpos+11]-vbdata[vpos+7])};
					}
					vbdata[vpos]=toBx+dx;
					vbdata[vpos+1]=toBy;
					vbdata[vpos+4]=toEx+dx;
					vbdata[vpos+5]=toBy;
					vbdata[vpos+8]=toEx;
					vbdata[vpos+9]=toEy;
					vbdata[vpos+12]=toBx;
					vbdata[vpos+13]=toEy;
				}
			vb._upload=true;
			return true;
		}

		GlUtils.fillLineVb=function(vb,clip,fx,fy,tx,ty,width,mat){
			'use strict';
			var linew=width*.5;
			if (clip.width!==/*laya.webgl.canvas.WebGLContext2D._MAXSIZE*/99999999){
				var cBx=clip.x,cBy=clip.y,cEx=clip.width+cBx,cEy=clip.height+cBy,tmp;
				if (fx===tx){
					if (fx<cBx || fx>cEx)return false;
					if(!(fy < ty)){tmp=fy;fy=ty,ty=tmp};
					(fy > cBy)|| (fy=cBy);
					(ty < cEy)|| (ty=cEy);
					if (fy >=ty)return false;
				}
				if (fy===ty){
					if (fy<cBy || fy>cEy)return false;
					if(!(fx < tx)){tmp=fx;fx=tx,tx=tmp };
					(fx > cBx)|| (fx=cBx);
					(tx < cEx)|| (tx=cEx);
					if (fx >=tx)return false;
				}
			};
			var data=GlUtils._fillLineArray;
			var perpx=-(fy-ty),perpy=fx-tx;
			var dist=Math.sqrt(perpx*perpx+perpy*perpy);
			perpx /=dist,perpy /=dist,perpx *=width,perpy *=width;
			data[0]=fx-perpx,data[1]=fy-perpy,data[4]=fx+perpx,data[5]=fy+perpy,data[8]=tx+perpx,data[9]=ty+perpy,data[12]=tx-perpx,data[13]=ty-perpy;
			mat&&mat.transformPointArray(data,data);
			var vpos=(vb._length >> 2)+/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16;
			vb.length=(vpos << 2);
			var vbdata=vb.getFloat32Array();
			vbdata.set(data,vpos-/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16);
			vb._upload=true;
			return true;
		}

		GlUtils._fillLineArray=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
		return GlUtils;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/utils/renderstate2d.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.utils.RenderState2D
	var RenderState2D=(function(){
		function RenderState2D(){};
		CLASS$(RenderState2D,'laya.webgl.utils.RenderState2D');
		RenderState2D.mat2MatArray=function(mat,matArray){
			var m=mat;
			var m4=matArray;
			m4[0]=m.a;
			m4[1]=m.b;
			m4[4]=m.c;
			m4[5]=m.d;
			m4[12]=m.tx;
			m4[13]=m.ty;
			return matArray;
		}

		RenderState2D.restoreTempArray=function(){
			RenderState2D.TEMPMAT4_ARRAY[0]=1;
			RenderState2D.TEMPMAT4_ARRAY[1]=0;
			RenderState2D.TEMPMAT4_ARRAY[4]=0;
			RenderState2D.TEMPMAT4_ARRAY[5]=1;
			RenderState2D.TEMPMAT4_ARRAY[12]=0;
			RenderState2D.TEMPMAT4_ARRAY[13]=0;
		}

		RenderState2D.worldMatrix4=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
		RenderState2D.worldMatrix4Modify=1;
		RenderState2D.worldAlpha=1.0;
		RenderState2D.width=NaN
		RenderState2D.height=NaN
		STATICATTR$(RenderState2D,
		['TEMPMAT4_ARRAY',function(){return this.TEMPMAT4_ARRAY=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];},'worldMatrix',function(){return this.worldMatrix=new Matrix();}
		]);
		return RenderState2D;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/utils/shadercompile.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.utils.ShaderCompile
	var ShaderCompile=(function(){
		var ShaderScriptBlock;
		function ShaderCompile(name,vs,ps,nameMap,includeFiles){
			//this._VS=null;
			//this._PS=null;
			//this._VSTXT=null;
			//this._PSTXT=null;
			//this._nameMap=null;
			this._VSTXT=vs;
			this._PSTXT=ps;
			function split (str){
				var words=str.split(' ');
				var out=[];
				for (var i=0;i < words.length;i++)
				words[i].length > 0 && out.push(words[i]);
				return out;
			}
			function c (script){
				var i=0,n=0,ofs=0,words,condition;
				var top=new ShaderScriptBlock(0,null,null,null);
				var parent=top;
				var lines=script.split('\n');
				for (i=0,n=lines.length;i < n;i++){
					var line=lines[i];
					if (line.indexOf("#ifdef")>=0){
						words=split(line);
						parent=new ShaderScriptBlock(1,words[1],"",parent);
						continue ;
					}
					if (line.indexOf("#else")>=0){
						condition=parent.condition;
						parent=new ShaderScriptBlock(2,null,"",parent.parent);
						parent.condition=condition;
						continue ;
					}
					if (line.indexOf("#endif")>=0){
						parent=parent.parent;
						continue ;
					}
					if (line.indexOf("#include")>=0){
						words=split(line);
						var fname=words[1];
						var chr=fname.charAt(0);
						if (chr==='"' || chr==="'"){
							fname=fname.substr(1,fname.length-2);
							ofs=fname.lastIndexOf(chr);
							if (ofs > 0)fname=fname.substr(0,ofs);
						}
						ofs=words[0].indexOf('?');
						var str=ofs>0?words[0].substr(ofs+1):words[0];
						new ShaderScriptBlock(1,str,includeFiles[fname],parent);
						continue ;
					}
					if (parent.childs.length > 0 && parent.childs[parent.childs.length-1].type===0){
						parent.childs[parent.childs.length-1].text+="\n"+line;
					}
					else new ShaderScriptBlock(0,null,line,parent);
				}
				return top;
			}
			this._VS=c(vs);
			this._PS=c(ps);
			this._nameMap=nameMap;
		}

		CLASS$(ShaderCompile,'laya.webgl.utils.ShaderCompile');
		var __proto__=ShaderCompile.prototype;
		__proto__.createShader=function(define,shaderName){
			var defMap={};
			var defineStr="";
			if (define){
				for (var i in define){
					defineStr+="#define "+i+"\n";
					defMap[i]=true;
				}
			};
			var vs=this._VS.toscript(defMap,[]);
			var ps=this._PS.toscript(defMap,[]);
			return new Shader(defineStr+vs.join('\n'),defineStr+ps.join('\n'),shaderName,this._nameMap);
		}

		ShaderCompile.IFDEF_NO=0;
		ShaderCompile.IFDEF_YES=1;
		ShaderCompile.IFDEF_ELSE=2;
		ShaderCompile.__init$__=function(){
			//class ShaderScriptBlock
			ShaderScriptBlock=(function(){
				function ShaderScriptBlock(type,condition,text,parent){
					//this.type=0;
					//this.condition=null;
					//this.text=null;
					//this.parent=null;
					this.childs=new Array;
					this.type=type;
					this.text=text;
					this.parent=parent;
					parent && parent.childs.push(this);
					if (!condition)return;
					var newcondition="";
					var preIsParam=false,isParam=false;
					for (var i=0,n=condition.length;i < n;i++){
						var c=condition.charAt(i);
						isParam="!&|() \t".indexOf(c)< 0;
						if (preIsParam !=isParam){
							isParam && (newcondition+="this.");
							preIsParam=isParam;
						}
						newcondition+=c;
					};
					var fn="(function() {return "+newcondition+";})";
					this.condition=Browser.window.eval(fn);
				}
				CLASS$(ShaderScriptBlock,'');
				var __proto__=ShaderScriptBlock.prototype;
				//生成条件判断函数
				__proto__.toscript=function(def,out){
					if (this.type===/*laya.webgl.utils.ShaderCompile.IFDEF_NO*/0){
						this.text && out.push(this.text);
					}
					if (this.childs.length < 1 && !this.text)return out;
					if (this.type!==/*laya.webgl.utils.ShaderCompile.IFDEF_NO*/0){
						var ifdef=!!this.condition.call(def);
						this.type===/*laya.webgl.utils.ShaderCompile.IFDEF_ELSE*/2 && (ifdef=!ifdef);
						if (!ifdef)return out;
						this.text && out.push(this.text);
					}
					this.childs.length>0 && this.childs.forEach(function(o){o.toscript(def,out)});
					return out;
				}
				return ShaderScriptBlock;
			})()
		}

		return ShaderCompile;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/webgl.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.WebGL
	var WebGL=(function(){
		function WebGL(){};
		CLASS$(WebGL,'laya.webgl.WebGL');
		WebGL.enable=function(){
			if (!WebGL.isWebGLSupported())return false;
			Render.WebGL=WebGL;
			System.createGLTextur=function (bitmapResource){
				return new GLTextur(bitmapResource);
			}
			System.createRenderSprite=function (type,next){
				return new RenderSprite3D(type,next);
			}
			System.createWebGLContext2D=function (c){
				return new WebGLContext2D(c);
			}
			System.onStageResizeWithWebGL=function (width,height){
				laya.webgl.WebGL.onStageResize(width,height);
			}
			System.createGraphics=function (){
				return new GraphicsGL();
			};
			var action=System.createFilterAction;
			System.createFilterAction=action?action:function (type){return new ColorFilterActionGL()}
			Render.clear=function (color){
				var gl=laya.webgl.WebGL.mainContext;
				gl.clearColor.apply(gl,color?Color.create(color)._color:WebGL._bg_null);
			}
			return true;
		}

		WebGL.isWebGLSupported=function(){
			var contextOptions={stencil:true };
			try{
				if (! Browser.window.WebGLRenderingContext){
					return false;
				};
				var canvas=Browser.createElement('canvas');
				var gl=canvas.getContext('webgl',contextOptions)|| canvas.getContext('experimental-webgl',contextOptions);
				return !!(gl && gl.getContextAttributes().stencil);
			}
			catch (e){
			}
			return false;
		}

		WebGL.onStageResize=function(width,height){
			WebGL.mainCanvas.size(width,height);
			WebGL.mainContext.viewport(0,0,width,height);
			RenderState2D.width=width;
			RenderState2D.height=height;
		}

		WebGL.init=function(canvas,width,height){
			WebGL.mainCanvas=canvas;
			Laya.stage.on(/*laya.events.Event.RESIZE*/"resize",null,function(){WebGL.onStageResize(Laya.stage.width,Laya.stage.height);});
			HTMLCanvas._createContext=function (canvas){
				return new WebGLContext2D(canvas);
			};
			var gl=WebGL.mainContext=(canvas.getContext('webgl',{stencil:true,alpha:false,antialias:true,premultipliedAlpha:false})|| canvas.getContext("experimental-webgl",{stencil:true,alpha:false,antialias:true,premultipliedAlpha:false }));
			WebGL.onStageResize(width,height);
			if (WebGL.mainContext==null)
				throw new Error("webGL getContext err!");
			ShaderDefines2D.__init__();
			Submit.__init__();
			WebGLContext2D.__init__();
			Value2D.__init__();
			Shader2D.__init__();
			Buffer.__int__(gl);
			BlendMode._init_(gl);
		}

		WebGL.mainCanvas=null
		WebGL.mainContext=null
		WebGL.antialias=true;
		WebGL._bg_null=[0,0,0,0];
		return WebGL;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/webglcontext.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.WebGLContext
	var WebGLContext=(function(){
		function WebGLContext(){};
		CLASS$(WebGLContext,'laya.webgl.WebGLContext');
		WebGLContext.UseProgram=function(program){
			if (WebGLContext._useProgram===program)return false;
			WebGL.mainContext.useProgram(program);
			WebGLContext._useProgram=program;
			return true;
		}

		WebGLContext.setDepthTest=function(gl,value){
			value!==WebGLContext._depthTest && (WebGLContext._depthTest=value,value?gl.enable(/*CLASS CONST:laya.webgl.WebGLContext.DEPTH_TEST*/0x0B71):gl.disable(/*CLASS CONST:laya.webgl.WebGLContext.DEPTH_TEST*/0x0B71));
		}

		WebGLContext.setDepthMask=function(gl,value){
			value!==WebGLContext._depthMask && (WebGLContext._depthMask=value,gl.depthMask(value));
		}

		WebGLContext.setBlend=function(gl,value){
			value!==WebGLContext._blend && (WebGLContext._blend=value,value?gl.enable(/*CLASS CONST:laya.webgl.WebGLContext.BLEND*/0x0BE2):gl.disable(/*CLASS CONST:laya.webgl.WebGLContext.BLEND*/0x0BE2));
		}

		WebGLContext.setBlendFunc=function(gl,sFactor,dFactor){
			(sFactor!==WebGLContext._sFactor||dFactor!==WebGLContext._dFactor)&& (WebGLContext._sFactor=sFactor,WebGLContext._dFactor=dFactor,gl.blendFunc(sFactor,dFactor));
		}

		WebGLContext.setCullFace=function(gl,value){
			value!==WebGLContext._cullFace && (WebGLContext._cullFace=value,value?gl.enable(/*CLASS CONST:laya.webgl.WebGLContext.CULL_FACE*/0x0B44):gl.disable(/*CLASS CONST:laya.webgl.WebGLContext.CULL_FACE*/0x0B44));
		}

		WebGLContext.setFrontFaceCCW=function(gl,value){
			value!==WebGLContext._frontFace && (WebGLContext._frontFace=value,gl.frontFace(value));
		}

		WebGLContext._useProgram=null;
		WebGLContext._depthTest=true;
		WebGLContext._depthMask=1;
		WebGLContext._blend=false;
		WebGLContext._cullFace=false;
		STATICATTR$(WebGLContext,
		['_sFactor',function(){return this._sFactor=/*CLASS CONST:laya.webgl.WebGLContext.ONE*/1;},'_dFactor',function(){return this._dFactor=/*CLASS CONST:laya.webgl.WebGLContext.ZERO*/0;},'_frontFace',function(){return this._frontFace=/*CLASS CONST:laya.webgl.WebGLContext.CCW*/0x0901;}
		]);
		WebGLContext.__init$__=function(){
			;
		}

		return WebGLContext;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/layawebglmain.as
	/**
	*...
	*@author laya
	*/
	//class LayaWebGLMain
	var LayaWebGLMain=(function(){
		function LayaWebGLMain(){
			this.img=null;
			WebGL.enable();
			Laya.init(800,800);
			Laya.stage.bgColor="gray";
			Stat.show();
			Laya.stage.graphics.fillRect(100,100,200,200,"red");
		}

		CLASS$(LayaWebGLMain,'LayaWebGLMain');
		return LayaWebGLMain;
	})()


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/node.as
	/**
	*节点，最基本元素
	*@author yung
	*/
	//class laya.display.Node extends laya.events.EventDispatcher
	var Node=(function(_super){
		function Node(){
			this.name="";
			this.destroyed=false;
			this._displayInStage=false;
			this._parent=null;
			Node._SUPERC_.call(this);
			this._childs=Node.ARRAY_EMPTY;
			this.timer=Laya.timer;
		}

		CLASS$(Node,'laya.display.Node',_super);
		var __proto__=Node.prototype;
		/**
		*<p>销毁此对象。</p>
		*@param destroyChild 是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
		*/
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			this.destroyed=true;
			this._parent && this._parent.removeChild(this);
			if (this._childs){
				if (destroyChild){
					for (var i=this._childs.length-1;i >-1;i--){
						this._childs[i].destroy(destroyChild);
					}
					}else {
					this.removeChildren();
				}
			}
			this._childs=null;
			this.offAll();
		}

		/**
		*添加子节点
		*@param node 节点对象
		*@return 返回添加的节点
		*/
		__proto__.addChild=function(node){
			node.parent && node.parent.removeChild(node);
			this._childs===Node.ARRAY_EMPTY && (this._childs=[]);
			this._childs.push(node);
			node.parent=this;
			return node;
		}

		/**
		*添加子节点到index索引位置
		*@param node 节点对象
		*@param index 索引位置
		*@return 返回添加的节点
		*/
		__proto__.addChildAt=function(node,index){
			if (node===this)return node;
			if (index >=0 && index <=this._childs.length){
				node.parent && node.parent.removeChild(node);
				this._childs===Node.ARRAY_EMPTY && (this._childs=[]);
				this._childs.splice(index,0,node);
				node.parent=this;
				return node;
				}else {
				throw new Error("appendChildAt:The index is out of bounds");
			}
		}

		/**
		*获取子节点索引位置
		*@param node 子节点
		*@return 子节点所在的索引位置
		*/
		__proto__.getChildIndex=function(node){
			return this._childs.indexOf(node);
		}

		/**
		*获取某个名字的对象
		*@param name 名字
		*@return 节点对象
		*/
		__proto__.getChildByName=function(name){
			var nodes=this._childs;
			for (var i=0,n=nodes.length;i < n;i++){
				var node=nodes[i];
				if (node.name===name)return node;
			}
			return null;
		}

		/**
		*根据index获取子节点
		*@param index 索引位置
		*@return 子节点
		*/
		__proto__.getChildAt=function(index){
			return this._childs[index];
		}

		/**
		*设置子节点索引位置
		*@param node 子节点
		*@param index 新的索引
		*@return 返回子节点本身
		*/
		__proto__.setChildIndex=function(node,index){
			var childs=this._childs;
			if (index < 0 || index >=childs.length){
				throw new Error("setChildIndex:The index is out of bounds.");
			};
			var oldIndex=this.getChildIndex(node);
			childs.splice(oldIndex,1);
			childs.splice(index,0,node);
			return node;
		}

		/**
		*删除子节点
		*@param node 子节点
		*@return 被删除的节点
		*/
		__proto__.removeChild=function(node){
			var index=this._childs.indexOf(node);
			return this.removeChildAt(index);
		}

		/**
		*从父容器删除自己，如已经被删除则不会抛出异常
		*/
		__proto__.removeSelf=function(){
			this._parent && this._parent.removeChild(this);
			return this;
		}

		/**
		*根据名字删除子对象，如找不到不会抛出异常
		*@param name 对象名字
		*/
		__proto__.removeChildByName=function(name){
			var node=this.getChildByName(name);
			node && this.removeChild(node);
			return node;
		}

		/**
		*根据index删除子节点
		*@param index 节点索引位置
		*@return 被删除的节点
		*/
		__proto__.removeChildAt=function(index){
			var node=this.getChildAt(index);
			if (node){
				this._childs.splice(index,1);
				node.parent=null;
			}
			return node;
		}

		/**
		*删除所有子对象
		*/
		__proto__.removeChildren=function(beginIndex,endIndex){
			(beginIndex===void 0)&& (beginIndex=0);
			(endIndex===void 0)&& (endIndex=0x7fffffff);
			if (this._childs.length > 0){
				var childs=this._childs;
				for (var i=beginIndex,n=childs.length;i < n && i < endIndex;i++){
					childs[i].parent=null;
				}
				if (beginIndex===0 && endIndex >=n)childs.length=0;
				else childs.splice(beginIndex,endIndex-beginIndex);
			}
			return this;
		}

		/**
		*替换子节点
		*@param newNode 新节点
		*@param oldNode 老节点
		*@return 返回新节点
		*/
		__proto__.replaceChild=function(newNode,oldNode){
			var index=this._childs.indexOf(oldNode);
			if (index >-1){
				this._childs.splice(index,1,newNode);
				return newNode;
			}
			return null;
		}

		__proto__.onAddChild=function(child){}
		/**
		*询问，常用来对对象类型进行快速判断
		*@param value
		*/
		__proto__.ask=function(type,value){
			return type==1 ? (value==1):false;
		}

		__proto__._setDisplay=function(value){
			if (this._displayInStage!==value){
				this._displayInStage=value;
				if (value)this.event(/*laya.events.Event.DISPLAY*/"display");
				else this.event(/*laya.events.Event.UNDISPLAY*/"undisplay");
			}
		}

		/**
		*设置对象是否可见(是否在渲染列表中)
		*@param node 节点
		*@param display 是否可见
		*/
		__proto__._displayChild=function(node,display){
			node._setDisplay(display);
			var childs=node._childs;
			for (var i=childs.length-1;i >-1;i--){
				var child=childs[i];
				child._setDisplay(display);
				child.numChildren && this._displayChild(child,display);
			}
		}

		/**
		*当前容器是否包含node节点
		*@param node 某一个节点
		*@return 是否包含node节点
		*/
		__proto__.contains=function(node){
			if (node===this)return true;
			while (node){
				if (node.parent===this.parent)return true;
				node=node.parent;
			}
			return false;
		}

		/**
		*定时重复执行
		*@param delay 间隔时间(单位毫秒)
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为false
		*/
		__proto__.timerLoop=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			this.timer._create(false,true,delay,caller,method,args,coverBefore);
		}

		/**
		*定时执行一次
		*@param delay 延迟时间(单位毫秒)
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为false
		*/
		__proto__.timerOnce=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			this.timer._create(false,false,delay,caller,method,args,coverBefore);
		}

		/**
		*定时重复执行(基于帧率)
		*@param delay 间隔几帧(单位为帧)
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为false
		*/
		__proto__.frameLoop=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			this.timer._create(true,true,delay,caller,method,args,coverBefore);
		}

		/**
		*定时执行一次(基于帧率)
		*@param delay 延迟几帧(单位为帧)
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为false
		*/
		__proto__.frameOnce=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=false);
			this.timer._create(true,false,delay,caller,method,args,coverBefore);
		}

		/**
		*清理定时器
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*/
		__proto__.clearTimer=function(caller,method){
			this.timer.clear(caller,method);
		}

		/**
		*子对象数量
		*/
		GETSET$(0,__proto__,'numChildren',function(){
			return this._childs.length;
		});

		/**父节点*/
		GETSET$(0,__proto__,'parent',function(){
			return this._parent;
			},function(value){
			if (this._parent!==value){
				if (value){
					this._parent=value;
					value.displayInStage && this._displayChild(this,true);
					this.event(/*laya.events.Event.ADDED*/"added");
					value.onAddChild(this);
					}else {
					this._displayChild(this,false);
					this.event(/*laya.events.Event.REMOVED*/"removed");
					this._parent=value;
				}
			}
		});

		/**是否在显示在渲染列表中*/
		GETSET$(0,__proto__,'displayInStage',function(){
			return this._displayInStage;
		});

		Node.ASK_CLASS=1;
		Node.ASK_VALUE_NODE=1;
		Node.ASK_VALUE_SPRITE=2;
		Node.ASK_VALUE_HTMLELEMENT=3;
		Node.ASK_VALUE_SPRITE3D=100;
		Node.ARRAY_EMPTY=[];
		return Node;
	})(EventDispatcher)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/css/cssstyle.as
	/**
	*...
	*@author laya
	*/
	//class laya.display.css.CSSStyle extends laya.display.css.Style
	var CSSStyle=(function(_super){
		function CSSStyle(ower){
			this._bgground=null;
			this._border=null;
			//this._ower=null;
			this._rect=null;
			this.lineHeight=0;
			CSSStyle._SUPERC_.call(this);
			this._padding=CSSStyle._PADDING;
			this._spacing=CSSStyle._SPACING;
			this._aligns=CSSStyle._ALIGNS;
			this._font=Font.EMPTY;
			this._ower=ower;
		}

		CLASS$(CSSStyle,'laya.display.css.CSSStyle',_super);
		var __proto__=CSSStyle.prototype;
		__proto__.destroy=function(){
			this._ower=null;
			this._font=null;
			this._rect=null;
		}

		__proto__.inherit=function(src){
			this._font=src._font;
			this._spacing=src._spacing===CSSStyle._SPACING?CSSStyle._SPACING:src._spacing.slice();
			this._aligns=src._aligns===CSSStyle._ALIGNS?CSSStyle._ALIGNS:src._aligns.slice();
			this.lineHeight=src.lineHeight;
		}

		__proto__._widthAuto=function(){
			return (this._type & 0x40000)!==0;
		}

		// || (_type & _WIDTH_SET)===0;
		__proto__.widthed=function(sprite){
			return (this._type & 0x8)!=0;
		}

		__proto__._calculation=function(type,value){
			if (value.indexOf('%')< 0)return false;
			var ower=this._ower;
			var parent=ower.parent;
			var rect=this._rect;
			function getValue (pw,w,nums){
				return (pw *nums[0]+w *nums[1]+nums[2]);
			}
			function onParentResize (type){
				var pw=parent.width,w=ower.width;
				rect.width && (ower.width=getValue(pw,w,rect.width));
				rect.height && (ower.height=getValue(pw,w,rect.height));
				rect.left && (ower.x=getValue(pw,w,rect.left));
				rect.top && (ower.y=getValue(pw,w,rect.top));
			}
			if (rect===null){
				parent._getCSSStyle()._type |=0x80000;
				parent.on(/*laya.events.Event.RESIZE*/"resize",this,onParentResize);
				this._rect=rect={input:{}};
			};
			var nums=value.split(' ');
			nums[0]=parseFloat(nums[0])/100;
			if (nums.length==1)
				nums[1]=nums[2]=0;
			else{
				nums[1]=parseFloat(nums[1])/ 100;
				nums[2]=parseFloat(nums[2]);
			}
			rect[type]=nums;
			rect.input[type]=value;
			onParentResize(type);
			return true;
		}

		__proto__.heighted=function(sprite){
			return (this._type & 0x2000)!=0;
		}

		__proto__.size=function(w,h){
			var ower=this._ower;
			var resize=false;
			if (w!==-1 && w !=this._ower.width){
				this._type |=0x8;
				this._ower.width=w;
				resize=true;
			}
			if (h!==-1 && h !=this._ower.height){
				this._type |=0x2000;
				this._ower.height=h;
				resize=true;
			}
			if (resize){
				ower.layoutLater();
				(this._type & 0x80000)&& ower.event(/*laya.events.Event.RESIZE*/"resize",this);
			}
		}

		__proto__._getAlign=function(){
			return this._aligns[0];
		}

		__proto__._getValign=function(){
			return this._aligns[1];
		}

		__proto__._getCssFloat=function(){
			return (this._type & 0x8000)!=0 ? 0x8000 :0;
		}

		__proto__._createFont=function(){
			return (this._type & 0x1000)?this._font:(this._type |=0x1000,this._font=new Font(this._font));
		}

		__proto__.render=function(sprite,context,x,y){
			var w=sprite.width+this.padding[1]+this.padding[3];
			var h=sprite.height+this.padding[0]+this.padding[2];
			this._bgground && this._bgground.color !=null && context.ctx.fillRect(x,y,w ,h,this._bgground.color);
			this._border && this._border.color && context.drawRect(x,y,w,h,this._border.color.strColor,this._border.size);
		}

		__proto__.getCSSStyle=function(){
			return this;
		}

		__proto__.cssText=function(text){
			this.attrs(CSSStyle.parseOneCSS(text,';'));
		}

		__proto__.attrs=function(attrs){
			if (attrs){
				for (var i=0,n=attrs.length;i < n;i++){
					var attr=attrs[i];
					this[attr[0]]=attr[1];
				}
			}
		}

		__proto__._enableLayout=function(){
			return (this._type&0x2)===0 && (this._type & 0x4)===0;
		}

		GETSET$(0,__proto__,'width',null,function(w){
			this._type |=0x8;
			if ((typeof w=='string')){
				var offset=w.indexOf('auto');
				if (offset >=0){
					this._type |=0x40000;
					w=w.substr(0,offset);
				}
				if (this._calculation("width",w))return;
				w=LAYABOX.parseInt(w);
			}
			this.size(w,-1);
		});

		GETSET$(0,__proto__,'_scale',null,function(value){
			this._ower.scale(value[0],value[1]);
		});

		GETSET$(0,__proto__,'cssFloat',function(){
			return (this._type & 0x8000)!=0 ? "right" :"left";
			},function(value){
			this.lineElement=false;
			value==="right" ? (this._type |=0x8000):(this._type &=(~0x8000));
		});

		//尺寸，字体
		GETSET$(0,__proto__,'font',function(){
			return this._font.toString();
			},function(value){
			this._createFont().set(value);
		});

		GETSET$(0,__proto__,'lineElement',function(){
			return (this._type & 0x10000)!=0;
			},function(value){
			value ? (this._type |=0x10000):(this._type &=(~0x10000));
		});

		GETSET$(0,__proto__,'height',null,function(h){
			this._type |=0x2000;
			if ((typeof h=='string')){
				if (this._calculation("height",h))return;
				h=LAYABOX.parseInt(h);
			}
			this.size(-1,h);
		});

		GETSET$(0,__proto__,'valign',function(){
			return CSSStyle._valigndef[this._aligns[1]];
			},function(value){
			this._aligns===CSSStyle._ALIGNS && (this._aligns=[0,0,0]);
			this._aligns[1]=CSSStyle._valigndef[value];
		});

		GETSET$(0,__proto__,'border',function(){
			return this._border?this._border.value:"";
			},function(value){
			if (value=='none'){
				this._border=null;
				return;
			}
			this._border || (this._border={});
			this._border.value=value;
			var values=value.split(' ');
			this._border.color=Color.create(values[values.length-1]);
			if (values.length==1){
				this._border.size=1;
				this._border.type='solid';
				return;
			};
			var i=0;
			if (values[0].indexOf('px')> 0){
				this._border.size=LAYABOX.parseInt(values[0]);
				i++;
			}
			else this._border.size=1;
			this._border.type=values[i];
			this._ower._renderType |=/*laya.renders.RenderSprite.STYLE*/0x80;
		});

		//行间距
		GETSET$(0,__proto__,'leading',function(){
			return this._spacing[1];
			},function(d){
			((typeof d=='string'))&& (d=LAYABOX.parseInt(d));
			this._spacing===CSSStyle._SPACING && (this._spacing=[0,0]);
			this._spacing[1]=d;
		});

		GETSET$(0,__proto__,'left',null,function(value){
			var ower=this._ower;
			if (((typeof value=='string'))){
				if (value==="center")
					value="50% -50% 0";
				else if (value==="right")
				value="100% -100% 0";
				if (this._calculation("left",value))return;
				value=LAYABOX.parseInt(value);
			}
			ower.x=value;
		});

		GETSET$(0,__proto__,'position',function(){
			return (this._type & 0x4)?"absolute":"";
			},function(value){
			value=="absolute"?(this._type |=0x4):(this._type&=~0x4);
		});

		GETSET$(0,__proto__,'top',null,function(value){
			var ower=this._ower;
			if (((typeof value=='string'))){
				if (value==="middle")
					value="50% -50% 0";
				else if (value==="bottom")
				value="100% -100% 0";
				if (this._calculation("top",value))return;
				value=LAYABOX.parseInt(value);
			}
			ower.y=value;
		});

		GETSET$(0,__proto__,'align',function(){
			return CSSStyle._aligndef[this._aligns[0]];
			},function(value){
			this._aligns===CSSStyle._ALIGNS && (this._aligns=[0,0,0]);
			this._aligns[0]=CSSStyle._aligndef[value];
		});

		GETSET$(0,__proto__,'paddingTop',function(){
			return this.padding[0];
		});

		GETSET$(0,__proto__,'padding',function(){
			return this._padding;
			},function(value){
			this._padding=value;
		});

		GETSET$(0,__proto__,'whiteSpace',function(){
			return (this._type & 0x20000)? "nowrap" :"";
			},function(type){
			type==="nowrap" && (this._type |=0x20000);
			type==="none" && (this._type &=~0x20000);
		});

		GETSET$(0,__proto__,'wordWrap',function(){
			return (this._type & 0x20000)===0;
			},function(value){
			value?(this._type &=~ 0x20000):(this._type |=0x20000);
		});

		GETSET$(0,__proto__,'bold',function(){
			return this._font.bold;
			},function(value){
			this._createFont().bold=value;
		});

		/**
		*<p>指定文本字段是否是密码文本字段。</p>
		*如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
		*/
		GETSET$(0,__proto__,'password',function(){
			return this._font.password;
			},function(value){
			this._createFont().password=value;
		});

		GETSET$(0,__proto__,'weight',null,function(value){
			this._createFont().weight=value;
		});

		GETSET$(0,__proto__,'letterSpacing',function(){
			return this._spacing[0];
			},function(d){
			((typeof d=='string'))&& (d=LAYABOX.parseInt(d));
			this._spacing===CSSStyle._SPACING && (this._spacing=[0,0]);
			this._spacing[0]=d;
		});

		GETSET$(0,__proto__,'fontSize',function(){
			return this._font.size;
			},function(value){
			this._createFont().size=value;
		});

		GETSET$(0,__proto__,'italic',function(){
			return this._font.italic;
			},function(value){
			this._createFont().italic=value;
		});

		GETSET$(0,__proto__,'fontFamily',function(){
			return this._font.family;
			},function(value){
			this._createFont().family=value;
		});

		GETSET$(0,__proto__,'fontWeight',function(){
			return this._font.weight;
			},function(value){
			this._createFont().weight=value;
		});

		GETSET$(0,__proto__,'textDecoration',function(){
			return this._font.decoration;
			},function(value){
			this._createFont().decoration=value;
		});

		GETSET$(0,__proto__,'color',function(){
			return this._font.color;
			},function(value){
			this._createFont().color=value;
		});

		/**
		*<p>描边颜色，以字符串表示。</p>
		*@default "#000000";
		*/
		GETSET$(0,__proto__,'strokeColor',function(){
			return this._font.stroke[1];
			},function(value){
			this._createFont().stroke[1]=value;
		});

		GETSET$(0,__proto__,'borderColor',function(){
			return (this._border && this._border.color)?this._border.color.strColor:null;
			},function(value){
			this._border || (this._border={size:1,type:'solid' });
			this._border.color=(value==null)? null :Color.create(value);
		});

		/**
		*<p>描边宽度（以像素为单位）。</p>
		*默认值0，表示不描边。
		*@default 0
		*/
		GETSET$(0,__proto__,'stroke',function(){
			return this._font.stroke[0];
			},function(value){
			debugger;
			this._createFont().stroke[0]=value;
		});

		GETSET$(0,__proto__,'backgroundColor',function(){
			return this._bgground?this._bgground.color:"";
			},function(value){
			if (value==='none')this._bgground=null;
			else (this._bgground || (this._bgground={}),this._bgground.color=value);
			this._ower._renderType |=/*laya.renders.RenderSprite.STYLE*/0x80;
		});

		GETSET$(0,__proto__,'absolute',function(){
			return (this._type & 0x4)!==0;
		});

		GETSET$(0,__proto__,'background',null,function(value){
			if (value.indexOf('url:')>=0){
				debugger;
				return;
			}
			this._bgground || (this._bgground={});
			this._bgground.color=value;
			this._type |=0x4000;
			this._ower._renderType |=/*laya.renders.RenderSprite.STYLE*/0x80;
		});

		GETSET$(0,__proto__,'paddingLeft',function(){
			return this.padding[3];
		});

		GETSET$(0,__proto__,'display',null,function(value){
			switch(value){
				case '':
					this._type &=~0x2;
					this.visible=true;
					break ;
				case 'none':
					this._type |=0x2;
					this.visible=false;
					this._ower.layoutLater();
					break ;
				}
		});

		GETSET$(0,__proto__,'transform',_super.prototype._$get_transform,function(value){
			(value==='none')?(this._transform=Style._TRANSFORMEMPTY):this.attrs(CSSStyle.parseOneCSS(value,','));
		});

		GETSET$(0,__proto__,'_translate',null,function(value){
			this.translate(value[0],value[1]);
		});

		GETSET$(0,__proto__,'_rotate',null,function(value){
			this._ower.rotation=value;
		});

		CSSStyle.parseOneCSS=function(text,clipWord){
			var out=[];
			var attrs=text.split(clipWord);
			var valueArray;
			for (var i=0,n=attrs.length;i < n;i++){
				var attr=attrs[i];
				var ofs=attr.indexOf(':');
				var name=attr.substr(0,ofs).replace(/^\s+|\s+$/g,'');
				var value=attr.substr(ofs+1).replace(/^\s+|\s+$/g,'');
				var one=[name,value];
				switch(name){
					case 'italic':
					case 'bold':
						one[1]=value=="true";
						break ;
					case 'line-height':
						one[0]='lineHeight';
						one[1]=LAYABOX.parseInt(value);
						break ;
					case 'font-size':
						one[0]='fontSize';
						one[1]=LAYABOX.parseInt(value);
						break ;
					case 'padding':
						valueArray=value.split(' ');
						valueArray.length > 1 || (valueArray[1]=valueArray[2]=valueArray[3]=valueArray[0]);
						one[1]=[LAYABOX.parseInt(valueArray[0]),LAYABOX.parseInt(valueArray[1]),LAYABOX.parseInt(valueArray[2]),LAYABOX.parseInt(valueArray[3])];
						break ;
					case 'rotate':
						one[0]="_rotate";
						one[1]=parseFloat(value);
						break ;
					case 'scale':
						valueArray=value.split(' ');
						one[0]="_scale";
						one[1]=[parseFloat(valueArray[0]),parseFloat(valueArray[1])];
						break ;
					case 'translate':
						valueArray=value.split(' ');
						one[0]="_translate";
						one[1]=[LAYABOX.parseInt(valueArray[0]),LAYABOX.parseInt(valueArray[1])];
						break ;
					default :
						(one[0]=CSSStyle._CSSTOVALUE[name])|| (one[0]=name);
					}
				out.push(one);
			}
			return out;
		}

		CSSStyle.parseCSS=function(text,uri){
			var one;
			while ((one=CSSStyle._parseCSSRegExp.exec(text))!=null){
				CSSStyle.styleSheets[one[1]]=CSSStyle.parseOneCSS(one[2],';');
			}
		}

		CSSStyle.EMPTY=new CSSStyle(null);
		CSSStyle.styleSheets={};
		CSSStyle.ALIGN_CENTER=1;
		CSSStyle.ALIGN_RIGHT=2;
		CSSStyle.VALIGN_MIDDLE=1;
		CSSStyle.VALIGN_BOTTOM=2;
		CSSStyle._PADDING=[0,0,0,0];
		CSSStyle._RECT=[-1,-1,-1,-1];
		CSSStyle._SPACING=[0,0];
		CSSStyle._ALIGNS=[0,0,0];
		CSSStyle.ADDLAYOUTED=0x200;
		CSSStyle._NEWFONT=0x1000;
		CSSStyle._HEIGHT_SET=0x2000;
		CSSStyle._BACKGROUND_SET=0x4000;
		CSSStyle._FLOAT_RIGHT=0x8000;
		CSSStyle._LINE_ELEMENT=0x10000;
		CSSStyle._NOWARP=0x20000;
		CSSStyle._WIDTHAUTO=0x40000;
		CSSStyle._LISTERRESZIE=0x80000;
		CSSStyle._aligndef={'left':0,'center':1,'right':2,0:'left',1:'center',2:'right' };
		CSSStyle._valigndef={'top':0,'middle':1,'bottom':2,0:'top',1:'middle',2:'bottom' };
		CSSStyle._CSSTOVALUE={
			'letter-spacing':'letterSpacing',
			'line-spacing':'lineSpacing',
			'white-space':'whiteSpace',
			'line-height':'lineHeight',
			'scale-x':'scaleX',
			'scale-y':'scaleY',
			'translate-x':'translateX',
			'translate-y':'translateY',
			'font-family':'fontFamily',
			'font-weight':'fontWeight',
			'text-decoration':'textDecoration',
			'background-color':'backgroundColor',
			'border-color':'borderColor',
			'float':'cssFloat'
		};

		CSSStyle._parseCSSRegExp=new RegExp("([\.\#]\\w+)\\s*{([\\s\\S]*?)}","g");
		return CSSStyle;
	})(Style)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/net/httprequest.as
	/**
	*HTTP请求
	*@author yung
	*/
	//class laya.net.HttpRequest extends laya.events.EventDispatcher
	var HttpRequest=(function(_super){
		function HttpRequest(){
			this._responseType=null;
			this._data=null;
			HttpRequest._SUPERC_.call(this);
			this._http=new Browser.window.XMLHttpRequest();
		}

		CLASS$(HttpRequest,'laya.net.HttpRequest',_super);
		var __proto__=HttpRequest.prototype;
		/**
		*发送请求
		*@param url 请求的地址
		*@param method 发送数据方式，值为"get"或"post"，默认为get方式
		*@param data 发送的数据，可选
		*@param responseType 返回消息类型，可设置为"text"，"json"，"xml","arraybuffer"
		*/
		__proto__.send=function(url,data,method,responseType){
			(method===void 0)&& (method="get");
			(responseType===void 0)&& (responseType="text");
			this._responseType=responseType;
			this._data=null;
			var _this=this;
			var http=this._http;
			http.open(method,url,true);
			http.responseType=responseType!=="arraybuffer" ? "text" :"arraybuffer";
			http.onerror=function (e){
				_this.onError(e);
			}
			http.onabort=function (e){
				_this.onAbort(e);
			}
			http.onprogress=function (e){
				_this.onProgress(e);
			}
			http.onload=function (e){
				_this.onLoad(e);
			}
			http.send(data);
		}

		__proto__.onProgress=function(e){
			if (e && e.lengthComputable)this.event(/*laya.events.Event.PROGRESS*/"progress",e.loaded / e.total);
		}

		__proto__.onAbort=function(e){
			this.error("Request was aborted by user");
		}

		__proto__.onError=function(e){
			this.error("Request failed Status:"+this._http.status+" text:"+this._http.statusText);
		}

		__proto__.onLoad=function(e){
			var http=this._http;
			var status=http.status!==undefined ? http.status :200;
			if (status===200 || status===204 || status===0){
				this.complete();
				}else {
				this.error("["+http.status+"]"+http.statusText+":"+http.responseURL);
			}
		}

		__proto__.error=function(message){
			this.clear();
			this.event(/*laya.events.Event.ERROR*/"error",message);
		}

		__proto__.complete=function(){
			this.clear();
			if (this._responseType==="json"){
				this._data=JSON.parse(this._http.responseText);
				}else if (this._responseType==="xml"){
				var dom=new Browser.window.DOMParser();
				this._data=dom.parseFromString(this._http.responseText,"text/xml");
				}else {
				this._data=this._http.response || this._http.responseText;
			}
			this.event(/*laya.events.Event.COMPLETE*/"complete",this._data);
		}

		__proto__.clear=function(){
			var http=this._http;
			http.onerror=http.onabort=http.onprogress=http.onload=null;
		}

		/**返回的数据*/
		GETSET$(0,__proto__,'data',function(){
			return this._data;
		});

		/**请求的地址*/
		GETSET$(0,__proto__,'url',function(){
			return this._http.responseURL;
		});

		return HttpRequest;
	})(EventDispatcher)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/net/loader.as
	/**
	*加载器，实现了文本，JSON，XML,二进制,图像的加载及管理
	*@author yung
	*/
	//class laya.net.Loader extends laya.events.EventDispatcher
	var Loader=(function(_super){
		function Loader(){
			this._data=null;
			this._url=null;
			this._type=null;
			this._cache=false;
			this._http=null;
			Loader._SUPERC_.call(this);
		}

		CLASS$(Loader,'laya.net.Loader',_super);
		var __proto__=Loader.prototype;
		/**
		*加载资源
		*@param url 地址
		*@param type 类型，如果为null，则根据文件后缀，自动分析类型
		*@param cache 是否缓存数据
		*/
		__proto__.load=function(url,type,cache){
			(cache===void 0)&& (cache=true);
			url=URL.formatURL(url);
			this._url=url;
			this._type=type || (type=this.getTypeFromUrl(url));
			this._cache=cache;
			if (Loader.loadedMap[url]){
				this._data=Loader.loadedMap[url];
				this.event(/*laya.events.Event.PROGRESS*/"progress",1);
				this.event(/*laya.events.Event.COMPLETE*/"complete",this._data);
				return;
			}
			if (type==="image")return this._loadImage(url);
			if (!this._http){
				this._http=new HttpRequest();
				this._http.on(/*laya.events.Event.PROGRESS*/"progress",this,this.onProgress);
				this._http.on(/*laya.events.Event.ERROR*/"error",this,this.onError);
				this._http.on(/*laya.events.Event.COMPLETE*/"complete",this,this.onLoaded);
			}
			this._http.send(url,null,"get",type!=="atlas" ? type :"json");
		}

		__proto__.getTypeFromUrl=function(url){
			var suffix=url.substr(url.lastIndexOf(".")+1,url.length);
			return Loader.typeMap[suffix];
		}

		__proto__._loadImage=function(url){
			var image=new HTMLImage();
			var _this=this;
			image.onload=function (){
				clear();
				_this.onLoaded(image);
			};
			image.onerror=function (){
				clear();
				_this.event(/*laya.events.Event.ERROR*/"error","Load image filed");
			}
			function clear (){
				image.onload=null;
				image.onerror=null;
			}
			image.src=url;
		}

		__proto__.onProgress=function(value){
			this.event(/*laya.events.Event.PROGRESS*/"progress",value);
		}

		__proto__.onError=function(message){
			this.event(/*laya.events.Event.ERROR*/"error",message);
		}

		__proto__.onLoaded=function(data){
			var type=this._type;
			if (type==="image"){
				this.complete(new Texture(data));
				}else if (type==="texture"){
				this.complete(new Texture(data));
				}else if (type==="atlas"){
				if (!data.src){
					this._data=data;
					return this._loadImage(this._url.replace(".json",".png"));
					}else {
					var frames=this._data.frames;
					var directory=(this._data.meta && this._data.meta.prefix)? URL.basePath+this._data.meta.prefix :this._url.substring(0,this._url.lastIndexOf("."))+"/"
					for (var name in frames){
						var obj=frames[name];
						Loader.loadedMap[directory+name]=Texture.create(data,obj.frame.x,obj.frame.y,obj.frame.w,obj.frame.h,obj.spriteSourceSize.x,obj.spriteSourceSize.y);
					}
					this.complete(true);
				}
				}else {
				this.complete(data);
			}
		}

		__proto__.complete=function(data){
			this._data=data;
			if (this._cache)Loader.loadedMap[this._url]=this._data;
			this.event(/*laya.events.Event.PROGRESS*/"progress",1);
			this.event(/*laya.events.Event.COMPLETE*/"complete",this._data);
		}

		/**是否缓存，只读*/
		GETSET$(0,__proto__,'cache',function(){
			return this._cache;
		});

		/**返回的数据*/
		GETSET$(0,__proto__,'data',function(){
			return this._data;
		});

		/**加载地址，只读*/
		GETSET$(0,__proto__,'url',function(){
			return this._url;
		});

		/**加载类型，只读*/
		GETSET$(0,__proto__,'type',function(){
			return this._type;
		});

		Loader.clearRes=function(url){
			delete Loader.loadedMap[URL.formatURL(url)];
		}

		Loader.getRes=function(url){
			return Loader.loadedMap[URL.formatURL(url)];
		}

		Loader.cacheRes=function(url,data){
			Loader.loadedMap[URL.formatURL(url)]=data;
		}

		Loader.basePath="";
		Loader.TEXT="text";
		Loader.JSOn="json";
		Loader.XML="xml";
		Loader.BUFFER="arraybuffer";
		Loader.IMAGE="image";
		Loader.TEXTURE="texture";
		Loader.ATLAS="atlas";
		Loader.typeMap={"png":"image","jpg":"image","txt":"text","json":"json","xml":"xml","als":"atlas"};
		Loader.loadedMap={};
		return Loader;
	})(EventDispatcher)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/net/loadermanager.as
	/**
	*批量加载器，单例，可以通过Laya.loader访问
	*多线程(默认5个线程)，5个优先级(0最快，4最慢,默认为1)
	*某个资源加载失败后，会按照最低优先级重试加载(属性retryNum决定重试几次)，如果重试后失败，则调用complete函数，并返回null
	*@author yung
	*/
	//class laya.net.LoaderManager extends laya.events.EventDispatcher
	var LoaderManager=(function(_super){
		var ResInfo;
		function LoaderManager(){
			this.retryNum=1;
			this.maxLoader=5;
			this._loaders=[];
			this._loaderCount=0;
			this._resInfos=[];
			this._resMap={};
			this._infoPool=[];
			this._maxPriority=5;
			this._failRes={};
			LoaderManager._SUPERC_.call(this);
			for (var i=0;i < this._maxPriority;i++)this._resInfos[i]=[];
		}

		CLASS$(LoaderManager,'laya.net.LoaderManager',_super);
		var __proto__=LoaderManager.prototype;
		/**
		*加载资源
		*@param url 地址
		*@param type 类型
		*@param complete 结束回调，如果加载失败，则返回null
		*@param progress 进度回调，回调参数为当前文件加载的进度信息(0-1)
		*@param priority 优先级
		*@param cache 是否缓存加载结果
		*/
		__proto__.load=function(url,complete,progress,type,priority,cache){
			(priority===void 0)&& (priority=1);
			(cache===void 0)&& (cache=true);
			var content=Loader.getRes(url);
			if (content !=null){
				complete && complete.runWith(content);
				}else {
				var info=this._resMap[url];
				if (!info){
					info=this._infoPool.length ? this._infoPool.pop():new ResInfo();
					info.url=url;
					info.type=type;
					info.cache=cache;
					complete && info.on(/*laya.events.Event.COMPLETE*/"complete",complete.caller,complete.method,complete.args);
					progress && info.on(/*laya.events.Event.PROGRESS*/"progress",progress.caller,progress.method,progress.args);
					this._resMap[url]=info;
					priority=priority < this._maxPriority ? priority :this._maxPriority-1;
					this._resInfos[priority].push(info);
					this._next();
					}else {
					complete && info.on(/*laya.events.Event.COMPLETE*/"complete",complete.caller,complete.method,complete.args);
					progress && info.on(/*laya.events.Event.PROGRESS*/"progress",progress.caller,progress.method,progress.args);
				}
			}
			return this;
		}

		__proto__._next=function(){
			if (this._loaderCount >=this.maxLoader)return;
			for (var i=0;i < this._maxPriority;i++){
				var infos=this._resInfos[i];
				if (infos.length > 0)return this._doLoad(infos.shift())
			}
			this._loaderCount || this.event(/*laya.events.Event.COMPLETE*/"complete");
		}

		__proto__._doLoad=function(resInfo){
			this._loaderCount++;
			var loader=this._loaders.length ? this._loaders.pop():new Loader();
			loader.on(/*laya.events.Event.COMPLETE*/"complete",null,onLoaded);
			loader.on(/*laya.events.Event.PROGRESS*/"progress",null,function(num){
				resInfo.event(/*laya.events.Event.PROGRESS*/"progress",num);
			});
			loader.on(/*laya.events.Event.ERROR*/"error",null,function(msg){
				onLoaded(null);
			});
			var _this=this;
			function onLoaded (data){
				loader.offAll();
				_this._loaders.push(loader);
				_this._endLoad(resInfo,data);
				_this._loaderCount--;
				_this._next();
			}
			loader.load(resInfo.url,resInfo.type,resInfo.cache);
		}

		__proto__._endLoad=function(resInfo,content){
			if (content===null){
				var errorCount=this._failRes[resInfo.url] || 0;
				if (errorCount < this.retryNum){
					this._failRes[resInfo.url]=errorCount+1;
					this._resInfos[this._maxPriority-1].push(resInfo);
					return;
					}else {
					console.log("[error]Failed to load:",resInfo.url);
					this.event(/*laya.events.Event.ERROR*/"error",resInfo.url);
				}
			}
			delete this._resMap[resInfo.url];
			resInfo.event(/*laya.events.Event.COMPLETE*/"complete",content);
			resInfo.offAll();
			this._infoPool.push(resInfo);
		}

		/**
		*清理缓存
		*@param url 地址
		*/
		__proto__.clearRes=function(url){
			Loader.clearRes(url);
		}

		/**
		*获取已加载资源(如有缓存)
		*@param url 地址
		*@return 返回资源
		*/
		__proto__.getRes=function(url){
			return Loader.getRes(url);
		}

		/**清理当前未完成的加载*/
		__proto__.clearUnLoaded=function(){
			this._resInfos.length=0;
			this._loaderCount=0;
			this._resMap={};
		}

		/**加载数组里面的资源
		*@param arr 简单：["a.png","b.png"]，复杂[{url:"a.png",type:Loader.IMAGE,size:100,priority:1},{url:"b.json",type:Loader.JSOn,size:50,priority:1}]*/
		__proto__.loadAssets=function(arr,complete,progress,cache){
			(cache===void 0)&& (cache=true);
			var itemCount=arr.length;
			var loadedSize=0;
			var totalSize=0;
			var items=[];
			for (var i=0;i < itemCount;i++){
				var item=arr[i];
				if ((typeof item=='string'))item={url:item,type:/*laya.net.Loader.IMAGE*/"image",size:1,priority:1};
				item.progress=0;
				totalSize+=item.size;
				items.push(item);
				var progressHandler=progress ? Handler.create(this,loadProgress,[item]):null;
				this.load(item.url,Handler.create(this,loadComplete,[item]),progressHandler,item.type,item.priority,cache);
			}
			function loadComplete (item,content){
				loadedSize++;
				item.progress=1;
				if (loadedSize===itemCount && complete){
					complete.run();
				}
			}
			function loadProgress (item,value){
				if (progress !=null){
					item.progress=value;
					var num=0;
					for (var j=0;j < itemCount;j++){
						var item1=items[j];
						num+=item1.size *item1.progress;
					};
					var v=num / totalSize;
					progress.runWith(v);
				}
			}
		}

		LoaderManager.cacheRes=function(url,data){
			Loader.cacheRes(url,data);
		}

		LoaderManager.__init$__=function(){
			//class ResInfo extends laya.events.EventDispatcher
			ResInfo=(function(_super){
				function ResInfo(){
					this.url=null;
					this.type=null;
					this.cache=false;
					ResInfo._SUPERC_.call(this);
				}
				CLASS$(ResInfo,'',_super);
				return ResInfo;
			})(EventDispatcher)
		}

		return LoaderManager;
	})(EventDispatcher)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/net/socket.as
	//class laya.net.Socket extends laya.events.EventDispatcher
	var Socket=(function(_super){
		function Socket(host,port,byteClass){
			this._endian=null;
			this._stamp=NaN;
			this._socket=null;
			this._connected=false;
			this._host=null;
			this._port=0;
			this._addInputPosition=0;
			this._input=null;
			this._output=null;
			this._bytes=null;
			this.timeout=0;
			this.objectEncoding=0;
			this._byteClass=null;
			(port===void 0)&& (port=0);
			Socket._SUPERC_.call(this);
			this._byteClass=byteClass;
			this._byteClass=this._byteClass?this._byteClass:Byte;
			this.endian="bigEndian";
			this.timeout=20000;
			this._addInputPosition=0;
			if(port > 0 && port < 65535)
				this.connect(host,port);
		}

		CLASS$(Socket,'laya.net.Socket',_super);
		var __proto__=Socket.prototype;
		__proto__.connect=function(host,port){
			var _$this=this;
			if(this._socket !=null)
				this.close();
			var url="ws://"+host+":"+port;
			this._host=host;
			this._port=port;
			this._socket&&this.cleanSocket();
			this._socket=/*__JS__ */new WebSocket(url);
			this._socket.binaryType="arraybuffer";
			this._output=new this._byteClass();
			this._output.endian=this.endian;
			this._input=new this._byteClass();
			this._input.endian=this.endian;
			this._socket.onopen=function (__args){
				var args=arguments;
				_$this.onOpenHandler(args);
			};
			this._socket.onmessage=function (msg){
				_$this.onMessageHandler(msg);
			};
			this._socket.onclose=function (__args){
				var args=arguments;
				_$this.onCloseHandler(args);
			};
			this._socket.onerror=function (__args){
				var args=arguments;
				_$this.onErrorHandler(args);
			};
			this._socket.binaryType="arraybuffer";
		}

		__proto__.cleanSocket=function(){
			try {
				this._socket.close();
			}catch (e){}
			this._socket.onopen=null;
			this._socket.onmessage=null;
			this._socket.onclose=null;
			this._socket.onerror=null;
			this._socket=null;
		}

		__proto__.close=function(){
			if(this._socket!=null){
				this.cleanSocket();
			}
		}

		/**
		*连接建立成功
		*@param args
		*/
		__proto__.onOpenHandler=function(__args){
			var args=arguments;
			this._connected=true;
			this.event(/*laya.events.Event.OPEN*/"open");
		}

		/**
		*有数据到达
		*@param msg 数据
		*/
		__proto__.onMessageHandler=function(msg){
			if (this._input.length>0 && this._input.bytesAvailable<1){
				this._input.clear();
				this._addInputPosition=0;
			};
			var pre=this._input.pos;
			!this._addInputPosition && (this._addInputPosition=0);
			this._input.pos=this._addInputPosition;
			var data;
			if (!msg || !(data=msg.data))return;
			if (data){
				if((typeof data=='string')){
					this._input.writeUTFBytes(data);
					}else{
					this._input.writeArrayBuffer(data);
				}
				this._addInputPosition=this._input.pos;
				this._input.pos=pre;
			}
			this.event(/*laya.events.Event.MESSAGE*/"message",data);
		}

		/**
		*连接被关闭
		*@param args
		*/
		__proto__.onCloseHandler=function(__args){
			var args=arguments;
			this.event(/*laya.events.Event.CLOSE*/"close")
		}

		/**
		*出现异常
		*@param args
		*/
		__proto__.onErrorHandler=function(__args){
			var args=arguments;
			this.event (/*laya.events.Event.ERROR*/"error")
		}

		/**
		*直接发送字符串，测试用函数.
		*@param _str
		*/
		__proto__.sendString=function(_str){
			this._socket.send(_str);
		}

		/**
		*发送缓冲区中的数据到服务器
		*/
		__proto__.flush=function(){
			if(this._output && this._output.length > 0){
				try {
					this._socket && this._socket.send(this._output.__getBuffer());
					this._output.endian=this.endian;
					this._output.clear();
				}catch (e){}
			}
		}

		GETSET$(0,__proto__,'input',function(){
			return this._input;
		});

		GETSET$(0,__proto__,'output',function(){
			return this._output;
		});

		GETSET$(0,__proto__,'connected',function(){
			return this._connected;
		});

		GETSET$(0,__proto__,'endian',function(){
			return this._endian;
			},function(value){
			this._endian=value;
			if(this._input !=null)this._input.endian=value;
			if (this._output !=null)this._output.endian=value;
		});

		Socket.LITTLE_ENDIAN="littleEndian";
		Socket.BIG_ENDIAN="bigEndian";
		return Socket;
	})(EventDispatcher)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/filters/colorfilter.as
	/**
	*颜色变化滤镜
	*@author ww
	*@version 1.0
	*
	*@created 2015-9-18 上午10:52:10
	*/
	//class laya.filters.ColorFilter extends laya.filters.Filter
	var ColorFilter=(function(_super){
		function ColorFilter(mat){
			//this._elements=null;
			ColorFilter._SUPERC_.call(this);
			if (!mat){
				this._elements=ColorFilter.DEFAULT._elements;
				return;
			}
			this._elements=new Float32Array(20);
			for (var i=0;i < 20;i++){
				this._elements[i]=mat[i];
			}
			this._action=System.createFilterAction(0x20);
			this._action.data=this;
		}

		CLASS$(ColorFilter,'laya.filters.ColorFilter',_super);
		var __proto__=ColorFilter.prototype;
		LAYABOX.implements(__proto__,{"laya.filters.IFilter":true})
		GETSET$(0,__proto__,'type',function(){
			return 0x20;
		});

		GETSET$(0,__proto__,'action',function(){
			return this._action;
		});

		STATICATTR$(ColorFilter,
		['DEFAULT',function(){return this.DEFAULT=new ColorFilter([1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]);},'GRAY',function(){return this.GRAY=new ColorFilter([0.3,0.59,0.11,0,0,0.3,0.59,0.11,0,0,0.3,0.59,0.11,0,0,0,0,0,1,0]);}
		]);
		return ColorFilter;
	})(Filter)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/resource/texture.as
	/**
	*纹理
	*@author yung
	*/
	//class laya.resource.Texture extends laya.events.EventDispatcher
	var Texture=(function(_super){
		function Texture(bitmapResource,uv){
			//this.resource=null;
			//this.uv=null;
			//this.loaded=false;
			this._w=0;
			this._h=0;
			this.offsetX=0;
			this.offsetY=0;
			this._repeat=true;
			this._mipmap=true;
			this._magFifter=-1;
			this._minFifter=-1;
			Texture._SUPERC_.call(this);
			this.set(bitmapResource,uv);
		}

		CLASS$(Texture,'laya.resource.Texture',_super);
		var __proto__=Texture.prototype;
		__proto__.set=function(bitmapResource,uv){
			this.resource=bitmapResource;
			this.uv=uv || Texture.DEF_UV;
			if (bitmapResource){
				bitmapResource._repeat=this._repeat;
				bitmapResource._mipmap=this._mipmap;
				bitmapResource._magFifter=this._magFifter;
				bitmapResource._minFifter=this._minFifter;
				this._w=bitmapResource.width;
				this._h=bitmapResource.height;
				this.loaded=this._w > 0;
			}
		}

		/**
		*获取gl纹理
		*@return *
		*/
		__proto__.getGLTexture=function(){
			return this.resource.useGLTextur().source;
		}

		/**销毁*/
		__proto__.destroy=function(){
			this.resource=null;
			this.uv=null;
		}

		/**
		*从一个图片加载
		*@param url 图片地址
		*/
		__proto__.load=function(url){
			this.loaded=false;
			var image=(this.resource || (this.resource=new HTMLImage()));
			var _this=this;
			image.onload=function (){
				image.onload=null;
				_this.loaded=true;
				_this.event(/*laya.events.Event.LOADED*/"loaded",this);
			};
			image.src=URL.formatURL(url);
		}

		GETSET$(0,__proto__,'repeat',null,function(value){
			this._repeat=value
			this.resource && (this.resource._repeat=value);
		});

		/**实际宽度*/
		GETSET$(0,__proto__,'width',function(){
			if (this._w)return this._w;
			return (this.uv && this.uv!==Texture.DEF_UV)? (this.uv[2]-this.uv[0])*this.resource.width :this.resource.width;
			},function(value){
			this._w=value;
		});

		/**实际高度*/
		GETSET$(0,__proto__,'height',function(){
			if (this._h)return this._h;
			return (this.uv && this.uv!==Texture.DEF_UV)? (this.uv[5]-this.uv[1])*this.resource.height :this.resource.height;
			},function(value){
			this._h=value;
		});

		Texture.moveUV=function(offsetX,offsetY,uv){
			for (var i=0;i < 8;i+=2){
				uv[i]+=offsetX;
				uv[i+1]+=offsetY;
			}
			return uv;
		}

		Texture.create=function(source,x,y,width,height,offsetX,offsetY){
			(offsetX===void 0)&& (offsetX=0);
			(offsetY===void 0)&& (offsetY=0);
			var uv=source.uv || Texture.DEF_UV;
			var bitmapResource=source.resource || source;
			var tex=new Texture(bitmapResource,null);
			tex.width=width;
			tex.height=height;
			tex.offsetX=offsetX;
			tex.offsetY=offsetY;
			var dwidth=1 / bitmapResource.width;
			var dheight=1 / bitmapResource.height;
			x *=dwidth;
			y *=dheight;
			width *=dwidth;
			height *=dheight;
			tex.uv=Texture.moveUV(uv[0],uv[1],[x,y,x+width,y,x+width,y+height,x,y+height]);
			return tex;
		}

		Texture.TEXTURE2D=1;
		Texture.TEXTURE3D=2;
		Texture.DEF_UV=[0,0,1.0,0,1.0,1.0,0,1.0];
		return Texture;
	})(EventDispatcher)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/autobitmap.as
	/**
	*<code>AutoBitmap</code> 类是用于表示位图图像或绘制图形的显示对象。
	*
	*<p>封装了位置，宽高及九宫格的处理，供UI组件使用。</p>
	*
	*@author lai
	*/
	//class laya.ui.AutoBitmap extends laya.display.Graphics
	var AutoBitmap=(function(_super){
		function AutoBitmap(){
			this._width=0;
			this._height=0;
			this._source=null;
			this._sizeGrid=null;
			AutoBitmap._SUPERC_.call(this);
		}

		CLASS$(AutoBitmap,'laya.ui.AutoBitmap',_super);
		var __proto__=AutoBitmap.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(){
			_super.prototype.destroy.call(this);
			this._source=null;
			this._sizeGrid=null;
		}

		/**
		*@private
		*修改纹理资源。
		*/
		__proto__.changeSource=function(){
			var source=this._source;
			if (!source)return;
			var width=this.width;
			var height=this.height;
			var sizeGrid=this._sizeGrid;
			var sw=source.width;
			var sh=source.height;
			if (!sizeGrid || (sw===width && sh===height)){
				this.clear();
				this.drawTexture(source,0,0,width,height);
				}else {
				source.$_GID || (source.$_GID=Utils.getGID());
				var key=source.$_GID+"."+width+"."+height+"."+sizeGrid.join(".");
				if (AutoBitmap.cmdCaches[key]){
					this.cmds=AutoBitmap.cmdCaches[key];
					return;
				}
				this.clear();
				var left=sizeGrid[0];
				var top=sizeGrid[1];
				var right=sizeGrid[2];
				var bottom=sizeGrid[3];
				left && top && this.drawTexture(Texture.create(source,0,0,left,top),0,0,left,top);
				right && top && this.drawTexture(Texture.create(source,sw-right,0,right,top),width-right,0,right,top);
				left && bottom && this.drawTexture(Texture.create(source,0,sh-bottom,left,bottom),0,height-bottom,left,bottom);
				right && bottom && this.drawTexture(Texture.create(source,sw-right,sh-bottom,right,bottom),width-right,height-bottom,right,bottom);
				top && this.drawTexture(Texture.create(source,left,0,sw-left-right,top),left,0,width-left-right,top);
				bottom && this.drawTexture(Texture.create(source,left,sh-bottom,sw-left-right,bottom),left,height-bottom,width-left-right,bottom);
				left && this.drawTexture(Texture.create(source,0,top,left,sh-top-bottom),0,top,left,height-top-bottom);
				right && this.drawTexture(Texture.create(source,sw-right,top,right,sh-top-bottom),width-right,top,right,height-top-bottom);
				this.drawTexture(Texture.create(source,left,top,sw-left-right,sh-top-bottom),left,top,width-left-right,height-top-bottom);
				AutoBitmap.cmdCaches[key]=this["_cmds"];
			}
		}

		/**
		*当前实例的有效缩放网格数据。
		*<p>如果设置为null,则在应用任何缩放转换时，将正常缩放整个显示对象。</p>
		*<p>数据格式：[左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)]。
		*<ul><li>例如：[4,4,4,4,1]</li></ul></p>
		*<p> <code>sizeGrid</code> 的值如下所示：
		*<ol>
		*<li>左边距</li>
		*<li>上边距</li>
		*<li>右边距</li>
		*<li>下边距</li>
		*<li>是否重复填充(值为0：不重复填充，1：重复填充)</li>
		*</ol></p>
		*<p>当定义 <code>sizeGrid</code> 属性时，该显示对象被分割到以 <code>sizeGrid</code> 数据中的"左边距,上边距,右边距,下边距" 组成的矩形为基础的具有九个区域的网格中，该矩形定义网格的中心区域。网格的其它八个区域如下所示：
		*<ul>
		*<li>矩形外的左上角</li>
		*<li>矩形上方的区域</li>
		*<li>矩形外的右上角</li>
		*<li>矩形左侧的区域</li>
		*<li>矩形右侧的区域</li>
		*<li>矩形外的左下角</li>
		*<li>矩形下方的区域</li>
		*<li>矩形外的右下角</li>
		*</ul>
		*同时也支持3宫格，比如0,4,0,4,1为水平3宫格，4,0,4,0,1为垂直3宫格，3宫格性能比9宫格高。
		*</p>
		*
		*@param value
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			return this._sizeGrid;
			},function(value){
			this._sizeGrid=value;
			Laya.timer.callLater(this,this.changeSource);
		});

		/**
		*对象的纹理资源。
		*
		*@see laya.resource.Texture
		*@return
		*/
		GETSET$(0,__proto__,'source',function(){
			return this._source;
			},function(value){
			if (value){
				this._source=value
				Laya.timer.callLater(this,this.changeSource);
				}else {
				this._source=null;
				this.clear();
			}
		});

		/**
		*表示显示对象的宽度，以像素为单位。
		*/
		GETSET$(0,__proto__,'width',function(){
			if (this._width)return this._width;
			if (this._source)return this._source.width;
			return 0;
			},function(value){
			this._width=value;
			Laya.timer.callLater(this,this.changeSource);
		});

		/**
		*表示显示对象的高度，以像素为单位。
		*/
		GETSET$(0,__proto__,'height',function(){
			if (this._height)return this._height;
			if (this._source)return this._source.height;
			return 0;
			},function(value){
			this._height=value;
			Laya.timer.callLater(this,this.changeSource);
		});

		AutoBitmap.clearCache=function(){
			AutoBitmap.cmdCaches={};
		}

		AutoBitmap.cmdCaches={};
		return AutoBitmap;
	})(Graphics)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/resource/htmlcanvas.as
	/**
	*...
	*@author laya
	*/
	//class laya.resource.HTMLCanvas extends laya.resource.BitmapResource
	var HTMLCanvas=(function(_super){
		function HTMLCanvas(type){
			//this._ctx=null;
			this._is2D=false;
			HTMLCanvas._SUPERC_.call(this);
			var _$this=this;
			this._repeat=false;
			this._mipmap=false;
			this._magFifter=0x2601;
			this._minFifter=0x2601;
			this._source=this;
			if (type==="2D" || (type==="AUTO" && !Render.isWebGl)){
				this._is2D=true;
				this._source=Browser.createElement("canvas");
				var o=this;
				o.getContext=function (contextID,other){
					if (_$this._ctx)return _$this._ctx;
					var ctx=_$this._ctx=_$this._source.getContext(contextID,other);
					if(ctx)
						ctx._canvas=o;
					contextID==="2d" && Context.initContext2D(o,ctx);
					return ctx;
				}
			}
			else this._source={};
		}

		CLASS$(HTMLCanvas,'laya.resource.HTMLCanvas',_super);
		var __proto__=HTMLCanvas.prototype;
		__proto__.clear=function(){
			this._ctx && this._ctx.clear();
		}

		__proto__.destory=function(){
			this._ctx && this._ctx.destory();
			this._ctx=null;
		}

		__proto__.release=function(){}
		__proto__.getContext=function(contextID,other){
			return this._ctx?this._ctx:(this._ctx=HTMLCanvas._createContext(this));
		}

		__proto__.copyTo=function(dec){
			_super.prototype.copyTo.call(this,dec);
			(dec)._ctx=this._ctx;
		}

		__proto__.getMemSize=function(){
			return this._is2D?_super.prototype.getMemSize.call(this):0;
		}

		__proto__.size=function(w,h){
			if (this._w !=w || this._h !=h){
				Resource.addCPUMemSize(-this.getMemSize());
				this._w=w;
				this._h=h;
				this._source && (this._source.height=h,this._source.width=w);
				Resource.addCPUMemSize(this.getMemSize());
			}
		}

		GETSET$(0,__proto__,'context',function(){
			return this._ctx;
		});

		HTMLCanvas.TYPE2D="2D";
		HTMLCanvas.TYPE3D="3D";
		HTMLCanvas.TYPEAUTO="AUTO";
		HTMLCanvas._createContext=null
		return HTMLCanvas;
	})(BitmapResource)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/resource/htmlimage.as
	/**
	*...
	*@author laya
	*/
	//class laya.resource.HTMLImage extends laya.resource.BitmapResource
	var HTMLImage=(function(_super){
		function HTMLImage(image){
			//this._onload=null;
			//this._onerror=null;
			//this._src=null;
			HTMLImage._SUPERC_.call(this);
			var _$this=this;
			this._source=image|| new Browser.window.Image();
			this._source.onresize=function (){_$this.onresize();};
		}

		CLASS$(HTMLImage,'laya.resource.HTMLImage',_super);
		var __proto__=HTMLImage.prototype;
		GETSET$(0,__proto__,'onload',null,function(value){
			var _$this=this;
			this._onload=value;
			this._source && (this._source.onload=this._onload !=null?(function(){_$this.onresize();_$this._onload();}):null);
		});

		GETSET$(0,__proto__,'src',function(){
			return this._src;
			},function(value){
			this._src=value;
			this._source && (this._source.src=value);
		});

		GETSET$(0,__proto__,'onerror',null,function(value){
			var _$this=this;
			this._onerror=value;
			this._source && (this._source.onerror=this._onerror !=null?(function(){_$this._onerror()}):null);
		});

		return HTMLImage;
	})(BitmapResource)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/uievent.as
	/**
	*<code>UIEvent</code> 类用来定义UI组件类的事件类型。
	*@author yung
	*
	*/
	//class laya.ui.UIEvent extends laya.events.Event
	var UIEvent=(function(_super){
		function UIEvent(){UIEvent._SUPERC_.call(this);;
		};

		CLASS$(UIEvent,'laya.ui.UIEvent',_super);
		UIEvent.SHOW_TIP="showtip";
		UIEvent.HIDE_TIP="hidetip";
		return UIEvent;
	})(Event)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/display/graphicsgl.as
	//class laya.webgl.display.GraphicsGL extends laya.display.Graphics
	var GraphicsGL=(function(_super){
		function GraphicsGL(){
			GraphicsGL._SUPERC_.call(this);
		}

		CLASS$(GraphicsGL,'laya.webgl.display.GraphicsGL',_super);
		var __proto__=GraphicsGL.prototype;
		__proto__.setShader=function(shader){
			this._saveToCmd(Render.context._setShader,arguments);
		}

		__proto__.setIBVB=function(x,y,ib,vb,numElement,shader){
			this._saveToCmd(Render.context._setIBVB,arguments);
		}

		__proto__.drawParticle=function(x,y,ps){
			var pt=System.createParticleTemplate2D(ps);
			pt.x=x;
			pt.y=y;
			this._saveToCmd(Render.context.drawParticle,[pt]);
		}

		return GraphicsGL;
	})(Graphics)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/canvas/webglcontext2d.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.canvas.WebGLContext2D extends laya.resource.Context
	var WebGLContext2D=(function(_super){
		var ContextParams;
		function WebGLContext2D(c){
			this._x=0;
			this._y=0;
			this._id=++WebGLContext2D._COUNT;
			//this._other=null;
			this._submits=[];
			this._curSubmit=null;
			this._ib=null;
			this._vb=null;
			//this._curMat=null;
			this._nBlendType=0;
			//this._save=null;
			this._saveMark=null;
			WebGLContext2D._SUPERC_.call(this);
			this._path=new Path();
			this._clipRect=WebGLContext2D.MAXCLIPRECT;
			this._shader2D=new Shader2D();
			this._canvas=c;
			this._curMat=Matrix.create();
			this._ib=Buffer.QuadrangleIB;
			this._vb=new Buffer(/*laya.webgl.WebGLContext.ARRAY_BUFFER*/0x8892);
			this._vb.getFloat32Array();
			this._other=ContextParams.DEFAULT;
			this._save=[SaveMark.Create(this)];
			this._save.length=10;
			this.clear();
		}

		CLASS$(WebGLContext2D,'laya.webgl.canvas.WebGLContext2D',_super);
		var __proto__=WebGLContext2D.prototype;
		__proto__._getSubmits=function(){
			return this._submits;
		}

		__proto__.destory=function(){
			this._curMat && this._curMat.destroy();
			this._vb && this._vb.destory();
			this._ib && (this._ib !=Buffer.QuadrangleIB)&& this._ib.destory();
		}

		__proto__.clear=function(){
			this._vb.clear();
			this._other=ContextParams.DEFAULT;
			this._other.lineWidth=this._shader2D.ALPHA=1.0;
			this._nBlendType=/*laya.webgl.canvas.BlendMode.NORMAL*/0;
			this._clipRect=WebGLContext2D.MAXCLIPRECT;
			this._curSubmit=Submit.RENDERBASE;
			this._shader2D.glTexture=null;
			this._shader2D.fillStyle=this._shader2D.strokeStyle=DrawStyle.DEFAULT;
			for (var i=0,n=this._submits._length;i < n;i++)
			this._submits[i].releaseRender();
			this._submits._length=0;
			this._curMat.identity();
			this._other.clear();
			this._saveMark=this._save[0];
			this._save._length=1;
		}

		__proto__._getTransformMatrix=function(){
			return this._curMat;
		}

		__proto__.translate=function(x,y){
			if (x!==0 || y!==0){
				SaveTranslate.save(this);
				if (this._curMat.bTransform){
					SaveTransform.save(this);
					this._curMat.transformPoint(x,y,Point.TEMP);
					x=Point.TEMP.x;
					y=Point.TEMP.y;
				}
				this._x+=x;
				this._y+=y;
			}
		}

		__proto__.save=function(){
			this._save[this._save._length++]=SaveMark.Create(this);
		}

		__proto__.restore=function(){
			var sz=this._save._length;
			if (sz < 1)
				return;
			for (var i=sz-1;i >=0;i--){
				var o=this._save[i];
				o.restore(this);
				if (o.isSaveMark()){
					this._save._length=i;
					return;
				}
			}
		}

		__proto__.measureText=function(text){
			return Utils.measureText(text,this._other.font.toString());
		}

		__proto__._fillText=function(txt,words,x,y,fontStr,color,textAlign){
			var preDef=this._shader2D.defines.getValue();
			var preColor=this._shader2D.colorAdd;
			var font=fontStr?(WebGLContext2D._fontTemp.setFont(fontStr),WebGLContext2D._fontTemp):this._other.font;
			color && (this._shader2D.colorAdd=Color.create(color)._color);
			this._shader2D.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40);
			DrawText.drawText(this,txt,words,this._curMat,font,textAlign || this._other.textAlign,-1,x,y);
			this._shader2D.colorAdd=preColor;
			this._shader2D.defines.setValue(preDef);
		}

		__proto__.fillWords=function(words,x,y,fontStr,color){
			words.length>0 &&this._fillText(null,words,x,y,fontStr,color,null);
		}

		__proto__.fillText=function(txt,x,y,fontStr,color,textAlign){
			txt.length>0 &&this._fillText(txt,null,x,y,fontStr,color,textAlign);
		}

		__proto__.strokeText=function(txt,x,y,fontStr,color,lineWidth,textAlign){
			if (txt.length===0)
				return;
			var preDef=this._shader2D.defines.getValue();
			var preColor=this._shader2D.colorAdd;
			var font=fontStr?(WebGLContext2D._fontTemp.setFont(fontStr),WebGLContext2D._fontTemp):this._other.font;
			color && (this._shader2D.colorAdd=Color.create(color)._color);
			this._shader2D.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40);
			DrawText.drawText(this,txt,null,this._curMat,font,textAlign || this._other.textAlign,lineWidth || 1,x,y);
			this._shader2D.colorAdd=preColor;
			this._shader2D.defines.setValue(preDef);
		}

		__proto__.fillRect=function(x,y,width,height,fillStyle){
			var vb=this._vb;
			if (GlUtils.fillRectImgVb(vb,this._clipRect,x,y,width,height,Texture.DEF_UV,this._curMat,this._x,this._y,0,0)){
				var pre=this._shader2D.fillStyle;
				fillStyle && (this._shader2D.fillStyle=new DrawStyle(fillStyle));
				var shader=this._shader2D;
				var curShader=this._curSubmit.shaderValue;
				if (shader.fillStyle!==curShader.fillStyle || shader.ALPHA!==curShader.ALPHA){
					shader.glTexture=null;
					var submit=this._curSubmit=Submit.create(this,this._ib,vb,((vb._length-16 */*laya.webgl.utils.Buffer.FLOAT32*/4)/ 32)*3,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02,0));
					submit.shaderValue.color=shader.fillStyle._color._color;
					submit.shaderValue.ALPHA=shader.ALPHA;
					this._submits[this._submits._length++]=submit;
				}
				this._curSubmit._numEle+=6;
				this._shader2D.fillStyle=pre;
			}
		}

		__proto__.setShader=function(shader){
			SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_SHADER*/0x80000,this._shader2D,true);
			this._shader2D.shader=shader;
		}

		__proto__.setFilters=function(value){
			SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_FILTERS*/0x100000,this._shader2D,true);
			this._shader2D.filters=value;
			this._curSubmit=Submit.RENDERBASE;
		}

		__proto__.drawTexture=function(tex,x,y,width,height,m,tx,ty){
			var t_tex=tex.resource.useGLTextur2D(),vb=this._vb;
			if (GlUtils.fillRectImgVb(vb,this._clipRect,x+tx+tex.offsetX,y+ty+tex.offsetY,width || tex.width,height || tex.height,tex.uv,m || this._curMat,this._x,this._y,0,0)){
				var shader=this._shader2D;
				var curShader=this._curSubmit.shaderValue;
				if (shader.glTexture!==t_tex || shader.ALPHA!==curShader.ALPHA){
					shader.glTexture=t_tex;
					var submit=this._curSubmit=Submit.create(this,this._ib,vb,((vb._length-16 */*laya.webgl.utils.Buffer.FLOAT32*/4)/ 32)*3,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01,0));
					submit.shaderValue.texture=t_tex.source;
					this._submits[this._submits._length++]=submit;
				}
				this._curSubmit._numEle+=6;
			}
		}

		/**
		*请保证图片已经在内存
		*@param ... args
		*/
		__proto__.drawImage=function(__args){
			var args=arguments;
			var img=args[0];
			var tex=(img.__texture || (img.__texture=new Texture(new HTMLImage(img))));
			tex.uv=Texture.DEF_UV;
			switch(args.length){
				case 3:
					if(!img.__width){img.__width=img.width;img.__height=img.height};
					this.drawTexture(tex,args[1],args[2],img.__width,img.__height,null,0,0);
					break ;
				case 5:
					this.drawTexture(tex,args[1],args[2],args[3],args[4],null,0,0);
					break ;
				case 9:;
					var x1=args[1]/img.__width;
					var x2=(args[1]+args[3])/img.__width;
					var y1=args[2]/img.__height;
					var y2=(args[2]+args[4])/img.__height;
					tex.uv=[x1,y1,x2,y1,x2,y2,x1,y2];
					this.drawTexture(tex,args[5],args[6],args[7],args[8],null,0,0);
					break ;
				}
		}

		__proto__.drawTarget=function(scope,x,y,width,height,m,proName,shaderValue){
			var vb=this._vb;
			if (GlUtils.fillRectImgVb(vb,this._clipRect,x,y,width,height ,Texture.DEF_UV,m || this._curMat,this._x,this._y,0,0)){
				var shader=this._shader2D;
				var curShader=this._curSubmit.shaderValue;
				var submit=this._curSubmit=SubmitTarget.create(this,this._ib,vb,((vb._length-16 */*laya.webgl.utils.Buffer.FLOAT32*/4)/ 32)*3,shaderValue,proName);
				submit.scope=scope;
				this._submits[this._submits._length++]=submit;
				this._curSubmit._numEle+=6;
			}
		}

		__proto__.drawText=function(tex,x,y,width,height,m,tx,ty,dx,dy){
			var t_tex=tex.resource.useGLTextur2D(),vb=this._vb;
			if (GlUtils.fillRectImgVb(vb,this._clipRect,x+tx,y+ty,width || tex.width,height || tex.height,tex.uv,m || this._curMat,this._x,this._y,dx,dy)){
				var shader=this._shader2D;
				var curShader=this._curSubmit.shaderValue;
				if (shader.glTexture!==t_tex || shader.ALPHA!==curShader.ALPHA || shader.fillStyle!==curShader.fillStyle){
					shader.glTexture=t_tex;
					var submit=this._curSubmit=Submit.create(this,this._ib,vb,((vb._length-16 */*laya.webgl.utils.Buffer.FLOAT32*/4)/ 32)*3,TextSV.create());
					submit.shaderValue.texture=t_tex.source;
					submit.shaderValue.colorAdd=shader.colorAdd;
					submit.shaderValue.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40);
					this._submits[this._submits._length++]=submit;
				}
				this._curSubmit._numEle+=6;
			}
		}

		__proto__.drawTextureWithTransform=function(tex,x,y,width,height,transform,tx,ty){
			var curMat=this._curMat;
			(tx!==0 || ty!==0)&& (this._x=tx *curMat.a+ty *curMat.c,this._y=ty *curMat.d+tx *curMat.b);
			if (transform && curMat.bTransform){
				Matrix.mul(transform,curMat,WebGLContext2D._tmpMatrix);
				transform=WebGLContext2D._tmpMatrix;
				transform._checkTransform();
			}
			else{
				this._x+=curMat.tx;
				this._y+=curMat.ty;
			}
			this.drawTexture(tex,x,y,width,height,transform,0,0);
			this._x=this._y=0;
		}

		__proto__.fillQuadrangle=function(tex,x,y,point4,m){
			var submit=this._curSubmit;
			var vb=this._vb;
			var shader=this._shader2D;
			var curShader=submit.shaderValue;
			if (tex.resource){
				var t_tex=tex.resource.useGLTextur2D();
				if (shader.glTexture !=t_tex || shader.ALPHA!==curShader.ALPHA){
					shader.glTexture=t_tex;
					submit=this._curSubmit=Submit.create(this,this._ib,vb,((vb._length)/ 32)*3,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01,0));
					submit.shaderValue.glTexture=t_tex;
					this._submits[this._submits._length++]=submit;
				}
				GlUtils.fillQuadrangleImgVb(vb,x,y,point4,tex.uv,m || this._curMat,this._x,this._y);
			}
			else{
				if (!submit.shaderValue.fillStyle || !submit.shaderValue.fillStyle.equal(tex)|| shader.ALPHA!==curShader.ALPHA){
					shader.glTexture=null;
					submit=this._curSubmit=Submit.create(this,this._ib,vb,((vb._length)/ 32)*3,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02,0));
					submit.shaderValue.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02);
					submit.shaderValue.fillStyle=new DrawStyle(tex);
					this._submits[this._submits._length++]=submit;
				}
				GlUtils.fillQuadrangleImgVb(vb,x,y,point4,Texture.DEF_UV,m || this._curMat,this._x,this._y);
			}
			submit._numEle+=6;
		}

		__proto__.drawTexture2=function(x,y,pivotX,pivotY,transform,alpha,blendMode,args){
			var curMat=this._curMat;
			this._x=x *curMat.a+y *curMat.c;
			this._y=y *curMat.d+x *curMat.b;
			if (transform && curMat.bTransform){
				Matrix.mul(transform,curMat,WebGLContext2D._tmpMatrix);
				transform=WebGLContext2D._tmpMatrix;
			}
			if (alpha===1 && !blendMode)
				this.drawTexture(args[0],args[1]-pivotX,args[2]-pivotY,args[3],args[4],transform,0,0);
			else{
				var preAlpha=this._shader2D.ALPHA;
				var preblendType=this._nBlendType;
				this._shader2D.ALPHA=alpha;
				blendMode && (this._nBlendType=BlendMode.TOINT(blendMode));
				this.drawTexture(args[0],args[1]-pivotX,args[2]-pivotY,args[3],args[4],transform,0,0);
				this._shader2D.ALPHA=preAlpha;
				this._nBlendType=preblendType;
			}
			this._x=this._y=0;
		}

		__proto__.drawCanvas=function(canvas,x,y,width,height){
			var c=canvas.context;
			var submit=SubmitCanvas.create(canvas.context,this._shader2D.ALPHA);
			var sx=width / canvas.width;
			var sy=height / canvas.height;
			var mat=submit._matrix;
			this._curMat.copy(mat);
			sx !=1 && sy !=1 && mat.scale(sx,sy);
			mat.translate(x,y);
			this._submits[this._submits._length++]=submit;
			this._curSubmit=Submit.RENDERBASE;
		}

		__proto__.transform=function(a,b,c,d,tx,ty){
			SaveTransform.save(this);
			Matrix.mul(Matrix.TEMP.setTo(a,b,c,d,tx,ty),this._curMat,this._curMat);
			this._curMat._checkTransform();
		}

		__proto__.setTransformByMatrix=function(value){
			value.copy(this._curMat);
		}

		__proto__.transformByMatrix=function(value){
			SaveTransform.save(this);
			Matrix.mul(value,this._curMat,this._curMat);
			this._curMat._checkTransform();
		}

		__proto__.rotate=function(angle){
			SaveTransform.save(this);
			this._curMat.rotate(angle);
		}

		__proto__.scale=function(scaleX,scaleY){
			SaveTransform.save(this);
			this._curMat.scale(scaleX,scaleY);
		}

		__proto__.clipRect=function(x,y,width,height){
			width *=this._curMat.a;
			height *=this._curMat.d;
			var p=Point.TEMP;
			this._curMat.transformPoint(x,y,p);
			SaveClipRect.save(this);
			var clip=this._clipRect;
			var x1=clip.x,y1=clip.y;
			var r=x+width,b=y+height;
			clip.width=width;
			clip.height=height;
			clip.x=p.x;
			clip.y=p.y;
		}

		__proto__.setIBVB=function(x,y,ib,vb,numElement,mat,shader,shaderValues,startIndex,offset){
			(startIndex===void 0)&& (startIndex=0);
			(offset===void 0)&& (offset=0);
			(ib===null)&& (GlUtils.expandIBQuadrangle(this._ib,(vb.length / (/*laya.webgl.utils.Buffer.FLOAT32*/4 *16)+8)),ib=this._ib);
			if (!shaderValues || !shader)
				throw Error("setIBVB must input:shader shaderValues");
			var submit=SubmitOtherIBVB.create(this,vb,ib,numElement,shader,shaderValues,startIndex,offset);
			mat.translate(x,y);
			Matrix.mul(mat,this._curMat,submit._mat);
			this._submits[this._submits._length++]=submit;
		}

		__proto__.addRenderObject=function(o){
			this._submits[this._submits._length++]=o;
		}

		__proto__.fillTrangles=function(tex,x,y,points,m){
			var submit=this._curSubmit;
			var vb=this._vb;
			var shader=this._shader2D;
			var curShader=submit.shaderValue;
			var length=points.length >> 4;
			var t_tex=tex.resource.useGLTextur2D();
			if (shader.glTexture !=t_tex || shader.ALPHA!==curShader.ALPHA){
				submit=this._curSubmit=Submit.create(this,this._ib,vb,((vb._length)/ 32)*3,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01,0));
				submit.shaderValue.texture=tex.getGLTexture();
				this._submits[this._submits._length++]=submit;
			}
			GlUtils.fillTranglesVB(vb,x,y,points,m || this._curMat,this._x,this._y);
			submit._numEle+=length *6;
		}

		__proto__.arc=function(x,y,r,sAngle,eAngle,counterclockwise){
			(counterclockwise===void 0)&& (counterclockwise=true);
		}

		// debugger;
		__proto__.fill=function(){}
		// debugger;
		__proto__.closePath=function(){}
		__proto__.beginPath=function(){
			this._other=this._other.make();
			this._other.path || (this._other.path=new Path());
			this._other.path.clear();
		}

		__proto__.rect=function(x,y,width,height){
			this._other=this._other.make();
			this._other.path || (this._other.path=new Path());
			this._other.path.rect(x,y,width,height);
		}

		__proto__.strokeRect=function(x,y,width,height,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			this.line(x,y,x+width,y,lineWidth/2,this._curMat);
			this.line(x+width,y,x+width,y+height,lineWidth/2,this._curMat);
			this.line(x,y,x,y+height,lineWidth/2,this._curMat);
			this.line(x,y+height,x+width,y+height,lineWidth/2,this._curMat);
		}

		__proto__.clip=function(){}
		// debugger;
		__proto__.stroke=function(){
			if (this._other!==ContextParams.DEFAULT){
				if (this._other.path._rect){
					var r=this._other.path._rect;
					this.strokeRect(r.x,r.y,r.width,r.height,this._other.lineWidth);
				}
				this._other.path.clear();
			}
		}

		__proto__.moveTo=function(x,y){
			this._other.path._x=x;
			this._other.path._y=y;
		}

		__proto__.lineTo=function(x,y){
			this.line(this._other.path._x,this._other.path._y,x,y,this._other.lineWidth/2,this._curMat);
		}

		__proto__.line=function(fromX,fromY,toX,toY,lineWidth,mat){
			var submit=this._curSubmit;
			var vb=this._vb;
			if (GlUtils.fillLineVb(vb,this._clipRect,fromX,fromY,toX,toY,lineWidth,mat)){
				var shader=this._shader2D;
				var curShader=submit.shaderValue;
				if (shader.strokeStyle!==curShader.strokeStyle || shader.ALPHA!==curShader.ALPHA){
					shader.glTexture=null;
					submit=this._curSubmit=Submit.create(this,this._ib,vb,((vb._length-16 */*laya.webgl.utils.Buffer.FLOAT32*/4)/ 32)*3,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02,0));
					submit.shaderValue.strokeStyle=shader.strokeStyle;
					submit.shaderValue.mainID=/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02;
					submit.shaderValue.AlPHA=shader.ALPHA;
					this._submits[this._submits._length++]=submit;
				}
				submit._numEle+=6;
			}
		}

		__proto__.submitElement=function(start,end){
			var renderList=this._submits;
			while (start < end){
				start+=renderList[start].renderSubmit();
			}
		}

		__proto__.flush=function(){
			this._ib.upload_bind();
			if (this._vb.length > 0 && this._vb.getNeedUpload()){
				GlUtils.expandIBQuadrangle(this._ib,(this._vb.length / (/*laya.webgl.utils.Buffer.FLOAT32*/4 *16)+8));
			}
			this._vb.upload_bind();
			this.submitElement(0,this._submits._length);
			this._path.reset();
			this._curSubmit=Submit.RENDERBASE;
			return this._submits._length;
		}

		__proto__.fan=function(x,y,r,sAngle,eAngle,fillColor,lineColor){
			this._path.fan(x,y,r,sAngle,eAngle,fillColor,this._other.lineWidth?this._other.lineWidth:1,lineColor);
			this._path.update();
			var submit=Submit.createShape(this,this._path.ib,this._path.vb,this._path.count,this._path.offset,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04,0));
			this._submits[this._submits._length++]=submit;
		}

		__proto__.drawPoly=function(x,y,r,edges,boderColor,lineWidth,color){
			this._path.polygon(x,y,r,edges,color,lineWidth?lineWidth:1,boderColor);
			this._path.update();
			var submit=Submit.createShape(this,this._path.ib,this._path.vb,this._path.count,this._path.offset,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04,0));
			submit.shaderValue.ALPHA=this._shader2D.ALPHA;
			submit.shaderValue.u_mmat2=RenderState2D.mat2MatArray(this._curMat,RenderState2D.TEMPMAT4_ARRAY);
			this._submits[this._submits._length++]=submit;
		}

		__proto__.drawPath=function(x,y,points,color,lineWidth){
			this._path.drawPath(x,y,points,color,lineWidth);
			this._path.update();
			var submit=Submit.createShape(this,this._path.ib,this._path.vb,this._path.count,this._path.offset,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04,0));
			this._submits[this._submits._length++]=submit;
		}

		__proto__.drawParticle=function(x,y,pt){
			pt.x=x;pt.y=y;
			this._submits[this._submits._length++]=pt;
		}

		__proto__.drawLines=function(x,y,points,color,lineWidth){
			var tmp=Point.TEMP;
			this._curMat.transformPoint(x,y,tmp);
			if (this._curMat.bTransform){
				points=points.concat();
				this._curMat.transformPointArrayScale(points,points);
			}
			this._path.drawPath(tmp.x,tmp.y,points,color,lineWidth);
			this._path.update();
			var submit=Submit.createShape(this,this._path.ib,this._path.vb,this._path.count,this._path.offset,Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04,0));
			this._submits[this._submits._length++]=submit;
		}

		GETSET$(0,__proto__,'fillStyle',function(){
			return this._shader2D.fillStyle;
			},function(value){
			this._shader2D.fillStyle.equal(value)|| (SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_FILESTYLE*/0x2,this._shader2D,false),this._shader2D.fillStyle=new DrawStyle(value));
		});

		GETSET$(0,__proto__,'globalCompositeOperation',function(){
			return BlendMode.NAMES[this._nBlendType];
			},function(value){
			var n=BlendMode.TOINT[value];
			n==null || (this._nBlendType===n)|| (SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_GLOBALCOMPOSITEOPERATION*/0x10000,this,true),this._nBlendType=n,this._shader2D.ALPHA=-1);
		});

		GETSET$(0,__proto__,'textAlign',function(){
			return this._other.textAlign;
			},function(value){
			(this._other.textAlign===value)|| (this._other=this._other.make(),SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_TEXTALIGN*/0x8000,this._other,false),this._other.textAlign=value);
		});

		GETSET$(0,__proto__,'globalAlpha',function(){
			return this._shader2D.ALPHA;
			},function(value){
			SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_ALPHA*/0x1,this._shader2D,true);
			this._shader2D.ALPHA=value;
		});

		GETSET$(0,__proto__,'textBaseline',function(){
			return this._other.textBaseline;
			},function(value){
			(this._other.textBaseline===value)|| (this._other=this._other.make(),SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_TEXTBASELINE*/0x4000,this._other,false),this._other.textBaseline=value);
		});

		GETSET$(0,__proto__,'font',null,function(str){
			if (str==this._other.font.toString())
				return;
			this._other=this._other.make();
			SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_FONT*/0x8,this._other,false);
			this._other.font===FontInContext.EMPTY ? (this._other.font=new FontInContext(str))
			:(this._other.font.setFont(str));
		});

		GETSET$(0,__proto__,'strokeStyle',function(){
			return this._shader2D.strokeStyle;
			},function(value){
			this._shader2D.strokeStyle.equal(value)|| (SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_STROKESTYLE*/0x200,this._shader2D,false),this._shader2D.strokeStyle=new DrawStyle(value));
		});

		// }
		GETSET$(0,__proto__,'lineWidth',function(){
			return this._other.lineWidth;
			},function(value){
			(this._other.lineWidth===value)|| (this._other=this._other.make(),SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_LINEWIDTH*/0x100,this._other,false),this._other.lineWidth=value);
		});

		WebGLContext2D.__init__=function(){
			ContextParams.DEFAULT=new ContextParams();
		}

		WebGLContext2D._SUBMITVBSIZE=32000;
		WebGLContext2D._MAXSIZE=99999999;
		WebGLContext2D._RECTVBSIZE=16;
		WebGLContext2D.MAXCLIPRECT=new Rectangle(0,0,99999999,99999999);
		WebGLContext2D._COUNT=0;
		WebGLContext2D._tmpMatrix=new Matrix();
		STATICATTR$(WebGLContext2D,
		['_fontTemp',function(){return this._fontTemp=new FontInContext();},'_drawStyleTemp',function(){return this._drawStyleTemp=new DrawStyle(null);}
		]);
		WebGLContext2D.__init$__=function(){
			//class ContextParams
			ContextParams=(function(){
				function ContextParams(){
					this.lineWidth=1;
					this.path=null;
					this.textAlign=null;
					this.textBaseline=null;
					this.font=FontInContext.EMPTY;
				}
				CLASS$(ContextParams,'');
				var __proto__=ContextParams.prototype;
				__proto__.clear=function(){
					this.lineWidth=1;
					this.path && this.path.clear();
					this.textAlign=this.textBaseline=null;
					this.font=FontInContext.EMPTY;
				}
				__proto__.make=function(){
					return this===ContextParams.DEFAULT ? new ContextParams():this;
				}
				ContextParams.DEFAULT=null
				return ContextParams;
			})()
		}

		return WebGLContext2D;
	})(Context)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/resource/rendertarget.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.resource.RenderTarget extends laya.resource.BitmapResource
	var RenderTarget=(function(_super){
		function RenderTarget(w,h,type){
			this._type=0;
			this._svWidth=NaN;
			this._svHeight=NaN;
			RenderTarget._SUPERC_.call(this);
			this._type=type;
			this._glTex=new RenderTargetGLTextur(this);
			(this._glTex).lock();
			this.size(w,h);
		}

		CLASS$(RenderTarget,'laya.webgl.resource.RenderTarget',_super);
		var __proto__=RenderTarget.prototype;
		__proto__.getType=function(){
			return this._type;
		}

		/**
		*获取纹理
		*@return *
		*/
		__proto__.getTexture=function(){
			var tex=new Texture(this,Texture.DEF_UV);
			return tex;
		}

		__proto__.useGLTextur2D=function(){
			return this._glTex;
		}

		__proto__.size=function(w,h){
			if (this._w==w && this._h==h)
				return;
			_super.prototype.size.call(this,w,h);
			this.release();
		}

		__proto__.release=function(){
			(this._glTex).resourceRelease();
		}

		__proto__.start=function(){
			this._glTex.source;
			var gl=WebGL.mainContext;
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,(this._glTex)._frameBuffer);
			gl.bindTexture(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,this._glTex.source);
			gl.texImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,0,/*laya.webgl.WebGLContext.RGBA*/0x1908,this._w,this._h,0,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401,null);
			gl.viewport(0,0,this._w,this._h);
			if (this._type==1){
				this._svWidth=RenderState2D.width;
				this._svHeight=RenderState2D.height;
				RenderState2D.width=this._w;
				RenderState2D.height=this._h;
			}
			RenderTarget.current=this;
			return this;
		}

		__proto__.clear=function(){
			var gl=WebGL.mainContext;
			gl.clearColor(1,0.0,0.0,1.0);
			gl.clear(/*laya.webgl.WebGLContext.COLOR_BUFFER_BIT*/0x00004000 | /*laya.webgl.WebGLContext.DEPTH_BUFFER_BIT*/0x00000100);
		}

		__proto__.clear2=function(){
			var gl=WebGL.mainContext;
			gl.clearColor(0,1,0.0,1.0);
			gl.clear(/*laya.webgl.WebGLContext.COLOR_BUFFER_BIT*/0x00004000 | /*laya.webgl.WebGLContext.DEPTH_BUFFER_BIT*/0x00000100);
		}

		__proto__.end=function(){
			var gl=WebGL.mainContext;
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,null);
			gl.viewport(0,0,Laya.stage.width,Laya.stage.height);
			if (this._type==1){
				RenderState2D.width=this._svWidth;
				RenderState2D.height=this._svHeight;
			}
			RenderTarget.current=null;
		}

		__proto__.destory=function(){
			_super.prototype.destory.call(this);
		}

		__proto__.recycle=function(){
			RenderTarget.POOL.push(this);
		}

		RenderTarget.create=function(w,h,type){
			(type===void 0)&& (type=1);
			var t=RenderTarget.POOL.pop();
			t||(t=new RenderTarget(w,h,type));
			return t;
		}

		RenderTarget.TYPE2D=1;
		RenderTarget.TYPE3D=2;
		RenderTarget.POOL=[];
		RenderTarget.current=null
		return RenderTarget;
	})(BitmapResource)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/resource/gltextur.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.resource.GLTextur extends laya.resource.Resource
	var GLTextur=(function(_super){
		function GLTextur(bitmapResource){
			//this._source=null;
			//this._bitmapResource=null;
			GLTextur._SUPERC_.call(this,/*laya.resource.Resource.TEXTURE*/5,0,ResourceMgr.GPU);
			this._bitmapResource=bitmapResource;
			this._released=true;
		}

		CLASS$(GLTextur,'laya.webgl.resource.GLTextur',_super);
		var __proto__=GLTextur.prototype;
		LAYABOX.implements(__proto__,{"laya.resource.IGLTextur":true})
		__proto__.destroy=function(){
			this.unlock();
			this.resourceRelease();
			this._bitmapResource=null;
		}

		__proto__.resourceRelease=function(){
			if (!this.isLock()){
				if (this._source){
					WebGL.mainContext.deleteTexture(this._source);
					this._source=null;
					_super.prototype.resourceRelease.call(this);
				}
				return true;
			}
			return false;
		}

		__proto__.texSubImage2D=function(target,xoffset,yoffset){
			var gl=WebGL.mainContext;
			gl.bindTexture(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,this._source);
			gl.texSubImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,0,xoffset,yoffset,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401,target.source);
		}

		__proto__.resourceRestore=function(){
			var bitmapResource=this._bitmapResource;
			var gl=WebGL.mainContext;
			if (!bitmapResource.source){
				debugger;
				throw "create GLTextur err:no data:"+bitmapResource;
			};
			var glTex=this._source=gl.createTexture();
			gl.activeTexture(/*laya.webgl.WebGLContext.TEXTURE0*/0x84C0);
			gl.bindTexture(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,glTex);
			this._memSize=bitmapResource.getMemSize();
			gl.texImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,0,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401,bitmapResource.source);
			var isPOT=Arith.isPOT(bitmapResource.width,bitmapResource.height);
			var minFifter=this._bitmapResource._minFifter;
			var magFifter=this._bitmapResource._magFifter;
			var repeat=bitmapResource._repeat ? /*laya.webgl.WebGLContext.REPEAT*/0x2901 :/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F
			if (isPOT){
				if (this._bitmapResource._mipmap)
					(minFifter!==-1)|| (minFifter=/*laya.webgl.WebGLContext.LINEAR_MIPMAP_LINEAR*/0x2703);
				else
				(minFifter!==-1)|| (minFifter=/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				(magFifter!==-1)|| (magFifter=/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801,minFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800,magFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802,repeat);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803,repeat);
				gl.generateMipmap(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1);
			}
			else{
				(minFifter!==-1)|| (minFifter=/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				(magFifter!==-1)|| (magFifter=/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801,minFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800,magFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			}
			gl.bindTexture(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,null);
			_super.prototype.resourceRestore.call(this);
			bitmapResource.release();
		}

		GETSET$(0,__proto__,'source',function(){
			this._released && this.resourceActive();
			return this._source;
		});

		return GLTextur;
	})(Resource)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/utils/rendersprite3d.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.utils.RenderSprite3D extends laya.renders.RenderSprite
	var RenderSprite3D=(function(_super){
		function RenderSprite3D(type,next){
			RenderSprite3D._SUPERC_.call(this,type,next);
		}

		CLASS$(RenderSprite3D,'laya.webgl.utils.RenderSprite3D',_super);
		var __proto__=RenderSprite3D.prototype;
		__proto__.onCreate=function(type){
			switch (type){
				case 0x08:
					this._fun=this._blend;
					return;
				case 0x10:
					this._fun=this._transform;
					return;
				}
		}

		// }
		__proto__._blend=function(sprite,context,x,y){
			var style=sprite._style;
			var submit,next
			context.ctx.save();
			if (sprite.mask){
				submit=SubmitStencil.create(1);
				context.addRenderObject(submit);
				sprite.mask.render(context,x,y);
				submit=SubmitStencil.create(2);
				context.addRenderObject(submit);
				next=this._next;
				next._fun.call(next,sprite,context,x,y);
				submit=SubmitStencil.create(3);
				context.ctx._curSubmit=Submit.RENDERBASE;
				context.addRenderObject(submit);
			}
			else{
				context.ctx.globalCompositeOperation=style.blendMode;
				next=this._next;
				next._fun.call(next,sprite,context,x,y);
			}
			context.ctx.restore();
		}

		// }
		__proto__._transform=function(sprite,context,x,y){
			'use strict';
			var transform=sprite.transform,_next=this._next;
			if (transform && _next !=RenderSprite.NORENDER){
				var ctx=context.ctx;
				var style=sprite._style;
				transform.tx=x;
				transform.ty=y;
				var m2=ctx._getTransformMatrix();
				var m1=m2.clone();
				Matrix.mul(transform,m2,m2);
				m2._checkTransform();
				_next._fun.call(_next,sprite,context,0,0);
				m1.copy(m2);
				m1.destroy();
				transform.tx=transform.ty=0;
			}else
			_next._fun.call(_next,sprite,context,x,y);
		}

		return RenderSprite3D;
	})(RenderSprite)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/utils/buffer.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.utils.Buffer extends laya.resource.Resource
	var Buffer=(function(_super){
		function Buffer(glTarget,usage,frome,bufferUsage){
			this._length=0;
			this._upload=true;
			//this._id=0;
			//this._glTarget=null;
			//this._buffer=null;
			//this._glBuffer=null;
			//this._bufferUsage=0;
			//this._floatArray32=null;
			this._uploadSize=0;
			//this._usage=null;
			this._maxsize=0;
			//this._uint16=null;
			(bufferUsage===void 0)&& (bufferUsage=0x88E8);
			Buffer._SUPERC_.call(this,/*laya.resource.Resource.BUFFER*/2,0,ResourceMgr.GPU);
			Buffer._gl=WebGL.mainContext;
			this._id=++Buffer._COUNT;
			this._usage=usage;
			glTarget==/*laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER*/0x8893 && (glTarget=/*laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER*/0x8893,this._usage="INDEX");
			glTarget==/*laya.webgl.WebGLContext.ARRAY_BUFFER*/0x8892 && (glTarget=/*laya.webgl.WebGLContext.ARRAY_BUFFER*/0x8892);
			this._glTarget=glTarget;
			this._bufferUsage=bufferUsage;
			this._buffer=new ArrayBuffer(8);
			frome && this.append(frome);
		}

		CLASS$(Buffer,'laya.webgl.utils.Buffer',_super);
		var __proto__=Buffer.prototype;
		__proto__.getFloat32Array=function(){
			return this._floatArray32 || (this._floatArray32=new Float32Array(this._buffer));
		}

		__proto__.getUint16Array=function(){
			return new Uint16Array(this._buffer);
		}

		__proto__.clear=function(){
			this._length=0;
			this._upload=true;
		}

		__proto__.destory=function(){
			this.resourceRelease();
			this._buffer=null;
		}

		__proto__.append=function(data){
			this._upload=true;
			var szu8=0,n;
			if ((data instanceof Uint8Array)){
				szu8=data.length;
				this._resizeBuffer(this._length+szu8,true);
				n=new Uint8Array(this._buffer,this._length);
			}
			else if ((data instanceof Float32Array)){
				szu8=data.length *4;
				this._resizeBuffer(this._length+szu8,true);
				n=new Float32Array(this._buffer,this._length);
			}
			else if ((data instanceof Uint16Array)){
				szu8=data.length *2;
				this._resizeBuffer(this._length+szu8,true);
				n=new Uint16Array(this._buffer,this._length);
			}
			n.set(data,0);
			this._length+=szu8;
			this._floatArray32 && (this._floatArray32=new Float32Array(this._buffer));
		}

		__proto__.setdata=function(data){
			this._buffer=data.buffer;
			this._upload=true;
			this._floatArray32 || (this._floatArray32=new Float32Array(this._buffer));
			this._length=this._buffer.byteLength;
		}

		__proto__.getBuffer=function(){
			return this._buffer;
		}

		__proto__.seLength=function(value){
			if (this._length===value)
				return;
			value <=this._buffer.byteLength || (this._resizeBuffer(value *2+256,true));
			this._length=value;
		}

		__proto__._resizeBuffer=function(nsz,copy){
			if (nsz < this._buffer.byteLength)
				return this;
			Resource.addCPUMemSize(nsz-this._buffer.byteLength);
			if (copy && this._buffer && this._buffer.byteLength > 0){
				var newbuffer=new ArrayBuffer(nsz);
				var n=new Uint8Array(newbuffer);
				n.set(new Uint8Array(this._buffer),0);
				this._buffer=newbuffer;
			}
			else
			this._buffer=new ArrayBuffer(nsz);
			this._floatArray32 && (this._floatArray32=new Float32Array(this._buffer));
			this._upload=true;
			return this;
		}

		__proto__.setNeedUpload=function(){
			this._upload=true;
		}

		__proto__.getNeedUpload=function(){
			return this._upload;
		}

		__proto__.bind=function(){
			this._glBuffer || (this._glBuffer=Buffer._gl.createBuffer(),this._released=false);
			(Buffer._bindActive[this._glTarget]===this._glBuffer)|| Buffer._gl.bindBuffer(this._glTarget,Buffer._bindActive[this._glTarget]=this._glBuffer);
		}

		__proto__.unlock=function(){
			throw "Buffer cannot unloc";
		}

		__proto__.resourceRelease=function(){
			if (this._glBuffer){
				this._glBuffer=null;
				this._upload=true;
				_super.prototype.resourceRelease.call(this);
				this._uploadSize=0;
				this._memSize=0;
			}
			this._released=false;
			return true;
		}

		__proto__.resourceRestore=function(){
			this._upload=true;
			this._memSize=0;
		}

		__proto__.upload=function(){
			if (!this._upload)
				return false;
			this._upload=false;
			this.bind();
			this._maxsize=Math.max(this._maxsize,this._length);
			if (Stat.loopCount % 30==0){
				if (this._buffer.byteLength > (this._maxsize+64)){
					Resource.addCPUMemSize(this._maxsize+64-this._buffer.byteLength);
					this._buffer=this._buffer.slice(0,this._maxsize+64);
					this._floatArray32 && (this._floatArray32=new Float32Array(this._buffer));
				}
				this._maxsize=this._length;
			}
			if (this._uploadSize < this._buffer.byteLength){
				this._uploadSize=this._buffer.byteLength;
				Buffer._gl.bufferData(this._glTarget,this._uploadSize,this._bufferUsage);
				this.changeMemSize(this._uploadSize);
			}
			Buffer._gl.bufferSubData(this._glTarget,0,this._buffer);
			return true;
		}

		__proto__.subUpload=function(offset,datastart,datalength){
			(offset===void 0)&& (offset=0);
			(datastart===void 0)&& (datastart=0);
			(datalength===void 0)&& (datalength=0);
			if (!this._upload)return false;
			this._upload=false;
			this.bind();
			this._maxsize=Math.max(this._maxsize,this._length);
			if (Stat.loopCount % 30==0){
				if (this._buffer.byteLength > (this._maxsize+64)){
					Resource.addCPUMemSize(this._maxsize+64-this._buffer.byteLength);
					this._buffer=this._buffer.slice(0,this._maxsize+64);
					this._floatArray32 && (this._floatArray32=new Float32Array(this._buffer));
				}
				this._maxsize=this._length;
			}
			if (this._uploadSize < this._buffer.byteLength){
				this._uploadSize=this._buffer.byteLength;
				Buffer._gl.bufferData(this._glTarget,this._uploadSize,this._bufferUsage);
				this.changeMemSize(this._uploadSize);
			}
			if (datastart || datalength){
				var subBuffer=this._buffer.slice(datastart,datalength);
				Buffer._gl.bufferSubData(this._glTarget,offset,subBuffer);
			}
			else{
				Buffer._gl.bufferSubData(this._glTarget,offset,this._buffer);
			}
			return true;
		}

		__proto__.upload_bind=function(){
			(this._upload && this.upload())|| this.bind();
		}

		GETSET$(0,__proto__,'uintArray16',function(){
			this._uint16=new Uint16Array(this._buffer);
			return this._uint16;
		});

		/*调试用*/
		GETSET$(0,__proto__,'bufferLength',function(){
			return this._buffer.byteLength;
		});

		GETSET$(0,__proto__,'length',function(){
			return this._length;
			},function(value){
			if (this._length===value)
				return;
			value <=this._buffer.byteLength || (this._resizeBuffer(value *2+256,true));
			this._length=value;
		});

		GETSET$(0,__proto__,'usage',function(){
			return this._usage;
		});

		Buffer.__int__=function(gl){
			Buffer._gl=gl;
			Buffer.QuadrangleIB=new Buffer(/*laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER*/0x8893,"INDEX",null,/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4);
			GlUtils.fillIBQuadrangle(Buffer.QuadrangleIB,16);
		}

		Buffer.INDEX="INDEX";
		Buffer.POSITION0="POSITION";
		Buffer.NORMAL0="NORMAL";
		Buffer.COLOR0="COLOR";
		Buffer.UV0="UV";
		Buffer.BLENDWEIGHT0="BLENDWEIGHT";
		Buffer.BLENDINDICES0="BLENDINDICES";
		Buffer.MATRIX0="MATRIX0";
		Buffer.MATRIX1="MATRIX1";
		Buffer.MATRIX2="MATRIX2";
		Buffer.TEXTURE0="TEXTURE0";
		Buffer.TEXTURE1="TEXTURE1";
		Buffer.TEXTURE2="TEXTURE2";
		Buffer.TEXTURE3="TEXTURE3";
		Buffer.TEXTURE4="TEXTURE4";
		Buffer.MATRIXARRAY0="MATRIXARRAY0";
		Buffer.CAMERAPOS="CAMERAPOS";
		Buffer.LUMINANCE="LUMINANCE";
		Buffer.MATERIALAMBIENT="MATERIALAMBIENT";
		Buffer.MATERIALDIFFUSE="MATERIALDIFFUSE";
		Buffer.MATERIALSPECULAR="MATERIALSPECULAR";
		Buffer.LIGHTDIRECTION="LIGHTDIRECTION";
		Buffer.LIGHTDIRDIFFUSE="LIGHTDIRDIFFUSE";
		Buffer.LIGHTDIRAMBIENT="LIGHTDIRAMBIENT";
		Buffer.LIGHTDIRSPECULAR="LIGHTDIRSPECULAR";
		Buffer.POINTLIGHTPOS="POINTLIGHTPOS";
		Buffer.POINTLIGHTRANGE="POINTLIGHTRANGE";
		Buffer.POINTLIGHTATTENUATION="POINTLIGHTATTENUATION";
		Buffer.POINTLIGHTDIFFUSE="POINTLIGHTDIFFUSE";
		Buffer.POINTLIGHTAMBIENT="POINTLIGHTAMBIENT";
		Buffer.POINTLIGHTSPECULAR="POINTLIGHTSPECULAR";
		Buffer.SPOTLIGHTPOS="SPOTLIGHTPOS";
		Buffer.SPOTLIGHTDIRECTION="SPOTLIGHTDIRECTION";
		Buffer.SPOTLIGHTSPOT="SPOTLIGHTSPOT";
		Buffer.SPOTLIGHTRANGE="SPOTLIGHTRANGE";
		Buffer.SPOTLIGHTATTENUATION="SPOTLIGHTATTENUATION";
		Buffer.SPOTLIGHTDIFFUSE="SPOTLIGHTDIFFUSE";
		Buffer.SPOTLIGHTAMBIENT="SPOTLIGHTAMBIENT";
		Buffer.SPOTLIGHTSPECULAR="SPOTLIGHTSPECULAR";
		Buffer.CORNER="CORNER";
		Buffer.VELOCITY="VELOCITY";
		Buffer.SIZEROTATION="SIZEROTATION";
		Buffer.RADIUSRADIAN="RADIUSRADIAN";
		Buffer.AGEADDSCALE="AGEADDSCALE";
		Buffer.TIME="TIME";
		Buffer.VIEWPORTSCALE="VIEWPORTSCALE";
		Buffer.CURRENTTIME="CURRENTTIME";
		Buffer.DURATION="DURATION";
		Buffer.GRAVITY="GRAVITY";
		Buffer.ENDVELOCITY="ENDVELOCITY";
		Buffer.FLOAT32=4;
		Buffer.SHORT=2;
		Buffer.QuadrangleIB=null
		Buffer._gl=null
		Buffer._bindActive=[];
		Buffer._COUNT=1;
		return Buffer;
	})(Resource)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/filters/webgl/colorfilteractiongl.as
	//class laya.filters.webgl.ColorFilterActionGL extends laya.filters.webgl.FilterActionGL
	var ColorFilterActionGL=(function(_super){
		function ColorFilterActionGL(){
			this.data=null;
			ColorFilterActionGL._SUPERC_.call(this);
		}

		CLASS$(ColorFilterActionGL,'laya.filters.webgl.ColorFilterActionGL',_super);
		var __proto__=ColorFilterActionGL.prototype;
		LAYABOX.implements(__proto__,{"laya.filters.IFilterActionGL":true})
		__proto__.setValue=function(shader){
			shader.u_colorMatrix=this.data._elements;
		}

		__proto__.apply3d=function(scope,sprite,context,x,y){
			var b=scope.getValue("bounds");
			var shaderValue=Value2D.createShderValue(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01,sprite.filters);
			context.ctx.drawTarget(scope,0,0,b.width,b.height,Matrix.EMPTY,"src",shaderValue);
		}

		return ColorFilterActionGL;
	})(FilterActionGL)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/filters/colorfilter.as
	/**
	*@author wk
	*/
	//class laya.webgl.shader.d2.filters.ColorFilter extends laya.webgl.shader.Shader
	var ColorFilter1=(function(_super){
		function ColorFilter(){
			var vs="attribute vec4 position;\nattribute vec2 texcoord;\nuniform  mat4 mmat;\nuniform vec2 size;\nvarying vec2 v_texcoord;\nvoid main() {\n  gl_Position =mmat*vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\n  v_texcoord = texcoord;\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/filters/colorfilter.vert*/;
			var ps="precision mediump float;\nvarying vec2 v_texcoord;\nuniform sampler2D texture;\nuniform float alpha;\nuniform float u_colorMatrix[20];\n\nvoid main(){\n 	vec4 rgba=gl_FragColor= texture2D(texture, v_texcoord)*vec4(1,1,1,alpha);\n   gl_FragColor.r =rgba.r*u_colorMatrix[0]+rgba.g*u_colorMatrix[1]+rgba.b*u_colorMatrix[2]+rgba.a*u_colorMatrix[3]+u_colorMatrix[4];\n   gl_FragColor.g =rgba.r*u_colorMatrix[5]+rgba.g*u_colorMatrix[6]+rgba.b*u_colorMatrix[7]+rgba.a*u_colorMatrix[8]+u_colorMatrix[9];\n   gl_FragColor.b =rgba.r*u_colorMatrix[10]+rgba.g*u_colorMatrix[11]+rgba.b*u_colorMatrix[12]+rgba.a*u_colorMatrix[13]+u_colorMatrix[14];\n   gl_FragColor.a =rgba.r*u_colorMatrix[15]+rgba.g*u_colorMatrix[16]+rgba.b*u_colorMatrix[17]+rgba.a*u_colorMatrix[18]+u_colorMatrix[19];	   \n}\n"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/filters/colorfilter.frag*/;
			ColorFilter._SUPERC_.call(this,vs,ps,"colorFilter");
		}

		CLASS$(ColorFilter,'laya.webgl.shader.d2.filters.ColorFilter',_super,'ColorFilter1');
		return ColorFilter;
	})(Shader)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/filters/glowfiltershader.as
	/**
	*@author wk
	*/
	//class laya.webgl.shader.d2.filters.GlowFilterShader extends laya.webgl.shader.Shader
	var GlowFilterShader=(function(_super){
		function GlowFilterShader(){
			var vs="attribute vec4 position;\nattribute vec2 texcoord;\nuniform vec2 size;\nuniform  mat4 mmat;\nuniform  mat4 pmat;\nvarying vec2  v_texcoord;\nvoid main(){\n gl_Position =mmat*vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\n  v_texcoord = texcoord;\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/filters/glowfilter.vert*/;
			var ps="precision mediump float;\nconst int c_FilterTime = 9;\nconst float c_Gene = (1.0/(1.0 + 2.0*(0.93 + 0.8 + 0.7 + 0.6 + 0.5 + 0.4 + 0.3 + 0.2 + 0.1)));\nuniform sampler2D texture;\nconst bool u_FiterMode=true;\nconst float u_GlowGene=1.5;\nconst vec4 u_GlowColor=vec4(1.0,0.0,0.0,0.5);\nconst float u_FilterOffset=2.0;\nconst float u_TexSpaceU=1.0/10.0;\nconst float u_TexSpaceV=1.0/10.0;\nvarying vec2 v_texcoord;\nvoid main()\n{\n	float aryAttenuation[c_FilterTime];\n	aryAttenuation[0] = 0.93;\n	aryAttenuation[1] = 0.8;\n	aryAttenuation[2] = 0.7;\n	aryAttenuation[3] = 0.6;\n	aryAttenuation[4] = 0.5;\n	aryAttenuation[5] = 0.4;\n	aryAttenuation[6] = 0.3;\n	aryAttenuation[7] = 0.2;\n	aryAttenuation[8] = 0.1;\n	vec4 vec4Color = texture2D(texture, v_texcoord)*c_Gene;\n	vec2 vec2FilterDir;\n	if(u_FiterMode)\n	  vec2FilterDir = vec2(u_FilterOffset*u_TexSpaceU/9.0, 0.0);\n	else\n		vec2FilterDir =  vec2(0.0, u_FilterOffset*u_TexSpaceV/9.0);\n	vec2 vec2Step = vec2FilterDir;\n	for(int i = 0;i< c_FilterTime; ++i){\n		vec4Color += texture2D(texture, v_texcoord + vec2Step)*aryAttenuation[i]*c_Gene;\n		vec4Color += texture2D(texture, v_texcoord - vec2Step)*aryAttenuation[i]*c_Gene;\n		vec2Step += vec2FilterDir;\n	}\n	if(u_FiterMode)\n		gl_FragColor = vec4Color.a*u_GlowColor*u_GlowGene;\n	else\n		gl_FragColor = vec4Color.a*u_GlowColor;\n}"/*__INCLUDESTR__f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/filters/glowfilter.frag*/;
			GlowFilterShader._SUPERC_.call(this,vs,ps,"glowFilter");
		}

		CLASS$(GlowFilterShader,'laya.webgl.shader.d2.filters.GlowFilterShader',_super);
		return GlowFilterShader;
	})(Shader)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/shaderdefines2d.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.shader.d2.ShaderDefines2D extends laya.webgl.shader.ShaderDefines
	var ShaderDefines2D=(function(_super){
		function ShaderDefines2D(){
			ShaderDefines2D._SUPERC_.call(this,ShaderDefines2D._name2int,ShaderDefines2D._int2name,ShaderDefines2D._int2nameMap);
		}

		CLASS$(ShaderDefines2D,'laya.webgl.shader.d2.ShaderDefines2D',_super);
		ShaderDefines2D.__init__=function(){
			ShaderDefines2D.reg("TEXTURE2D",0x01);
			ShaderDefines2D.reg("COLOR2D",0x02);
			ShaderDefines2D.reg("PRIMITIVE",0x04);
			ShaderDefines2D.reg("GLOW_FILTER",0x08);
			ShaderDefines2D.reg("BLUR_FILTER",0x10);
			ShaderDefines2D.reg("COLOR_FILTER",0x20);
			ShaderDefines2D.reg("COLOR_ADD",0x40);
		}

		ShaderDefines2D.reg=function(name,value){
			ShaderDefines._reg(name,value,ShaderDefines2D._name2int,ShaderDefines2D._int2name);
		}

		ShaderDefines2D.toText=function(value,_int2name,_int2nameMap){
			return ShaderDefines._toText(value,_int2name,_int2nameMap);
		}

		ShaderDefines2D.toInt=function(names){
			return ShaderDefines._toInt(names,ShaderDefines2D._name2int);
		}

		ShaderDefines2D.TEXTURE2D=0x01;
		ShaderDefines2D.COLOR2D=0x02;
		ShaderDefines2D.PRIMITIVE=0x04;
		ShaderDefines2D.FILTERGLOW=0x08;
		ShaderDefines2D.FILTERBLUR=0x10;
		ShaderDefines2D.FILTERCOLOR=0x20;
		ShaderDefines2D.COLORADD=0x40;
		ShaderDefines2D._name2int={};
		ShaderDefines2D._int2name=[];
		ShaderDefines2D._int2nameMap=[];
		return ShaderDefines2D;
	})(ShaderDefines)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/value/value2d.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.shader.d2.value.Value2D extends laya.webgl.shader.ShaderValue
	var Value2D=(function(_super){
		function Value2D(mainID,subID){
			this.size=[0,0];
			this.alpha=1.0;
			this.mmat=null;
			this.ALPHA=1.0;
			this.shader=null;
			this.mainID=0;
			this.subID=0;
			this.filters=null;
			this._inClassCache=null;
			this._cacheID=0;
			Value2D._SUPERC_.call(this);
			this.defines=new ShaderDefines2D();
			this.position=Value2D._POSITION;
			this.mainID=mainID;
			this.subID=subID;
			this._cacheID=mainID|subID;
			this._inClassCache=Value2D._cache[this._cacheID];
			if (mainID>0 && !this._inClassCache){
				this._inClassCache=Value2D._cache[this._cacheID]=[];
				this._inClassCache._length=0;
			}
			this.clear();
		}

		CLASS$(Value2D,'laya.webgl.shader.d2.value.Value2D',_super);
		var __proto__=Value2D.prototype;
		__proto__.setValue=LAYAFNVOID/*function(value){}*/
		//throw new Error("todo in subclass");
		__proto__.refresh=function(){
			var size=this.size;
			size[0]=RenderState2D.width;
			size[1]=RenderState2D.height;
			this.mmat=RenderState2D.worldMatrix4;
			this.alpha=this.ALPHA *RenderState2D.worldAlpha;
			return this;
		}

		__proto__.upload=function(){
			var sd=Shader.sharders[this.mainID|this.defines._value];
			sd || (sd=Shader.withCompile(0,this.mainID,this.defines.toString(),this.mainID|this.defines._value));
			this.refresh();
			sd.upload(this);
		}

		__proto__.setFilters=function(value){
			if(!value)return;
			this.filters=value;
			for (var i=0,n=value.length;i < n;i++){
				var type=0,f=value[i];if(!f)continue ;
				this.defines.add(f.type);
				f.action.setValue(this);
			}
		}

		__proto__.clear=function(){
			this.defines.setValue(this.subID);
		}

		__proto__.release=function(){
			this._inClassCache[this._inClassCache._length++]=this;
			this.clear();
		}

		Value2D._initone=function(type,classT){
			Value2D._typeClass[type]=classT;
			Value2D._cache[type]=[];
			Value2D._cache[type]._length=0;
		}

		Value2D.__init__=function(){
			Value2D._POSITION=[2,/*laya.webgl.WebGLContext.FLOAT*/0x1406,false,4 *CONST3D2D.BYTES_PE,0];
			Value2D._TEXCOORD=[2,/*laya.webgl.WebGLContext.FLOAT*/0x1406,false,4 *CONST3D2D.BYTES_PE,2 *CONST3D2D.BYTES_PE];
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02,Color2dSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04,PrimitiveSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01,TextureSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01 | /*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40,TextSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01 | /*laya.webgl.shader.d2.ShaderDefines2D.FILTERGLOW*/0x08,TextureSV);
		}

		Value2D.create=function(mainType,subType){
			var types=Value2D._cache[mainType|subType];
			if (types._length)
				return types[--types._length];
			else
			return new Value2D._typeClass[mainType|subType](subType);
		}

		Value2D.createShderValue=function(type,filters){
			var value=laya.webgl.shader.d2.value.Value2D.create(type,0);
			var len=filters.length;
			for(var i=0;i<len;i++){
				filters[i].action.setValue(value);
				value.defines.add(filters[i].type);
			}
			return value;
		}

		Value2D.createShderValueMix=function(type,filters){
			var value=laya.webgl.shader.d2.value.Value2D.create(type,0);
			var len=filters.length;
			for(var i=0;i<len;i++){
				filters[i].action.setValueMix(value);
				value.defines.add(filters[i].action.typeMix);
			}
			return value;
		}

		Value2D._POSITION=null
		Value2D._TEXCOORD=null
		Value2D._cache=[];
		Value2D._typeClass=[];
		return Value2D;
	})(ShaderValue)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/circle.as
	//class laya.webgl.shapes.Circle extends laya.webgl.shapes.BasePoly
	var Circle=(function(_super){
		function Circle(x,y,r,color,borderWidth,borderColor,fill){
			Circle._SUPERC_.call(this,x,y,r,r,80,color,borderWidth,borderColor);
			this.fill=fill;
		}

		CLASS$(Circle,'laya.webgl.shapes.Circle',_super);
		return Circle;
	})(BasePoly)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/ellipse.as
	//class laya.webgl.shapes.Ellipse extends laya.webgl.shapes.BasePoly
	var Ellipse=(function(_super){
		function Ellipse(x,y,width,height,color,borderWidth,borderColor){
			Ellipse._SUPERC_.call(this,x,y,width,height,40,color,borderWidth,borderColor);
		}

		CLASS$(Ellipse,'laya.webgl.shapes.Ellipse',_super);
		return Ellipse;
	})(BasePoly)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/fan.as
	//class laya.webgl.shapes.Fan extends laya.webgl.shapes.BasePoly
	var Fan=(function(_super){
		function Fan(x,y,r,r0,r1,color,borderWidth,borderColor,round){
			(round===void 0)&& (round=0);
			Fan._SUPERC_.call(this,x,y,r,r,30,color,borderWidth,borderColor,round);
			this.r0=r0;
			this.r1=r1;
		}

		CLASS$(Fan,'laya.webgl.shapes.Fan',_super);
		var __proto__=Fan.prototype;
		__proto__.getData=function(ib,vb,start){
			var indices=[];
			var verts=[];
			this.sector(verts,indices,start);
			if(this.fill){
				(this.borderWidth>0)&&(this.borderColor!=-1)&&this.createFanLine(verts,indices,this.borderWidth,start+verts.length/5,null,null);
				ib.append(new Uint16Array(indices));
				vb.append(new Float32Array(verts));
			}
			else{
				var outV=[];
				var outI=[];
				(this.borderColor!=-1)&&(this.borderWidth>0)&&this.createFanLine(verts,indices,this.borderWidth,start,outV,outI);
				ib.append(new Uint16Array(outI));
				vb.append(new Float32Array(outV));
			}
		}

		return Fan;
	})(BasePoly)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/line.as
	//class laya.webgl.shapes.Line extends laya.webgl.shapes.BasePoly
	var Line=(function(_super){
		function Line(x,y,points,color,borderWidth){
			this.points
			Line._SUPERC_.call(this,x,y,0,0,0,color,borderWidth,color,0);
			this.points=points;
		}

		CLASS$(Line,'laya.webgl.shapes.Line',_super);
		var __proto__=Line.prototype;
		__proto__.getData=function(ib,vb,start){
			var indices=[];
			var verts=[];
			(this.borderWidth > 0)&& this.createLine2(this.points,indices,this.borderWidth,start,verts,this.points.length / 2);
			ib.append(new Uint16Array(indices));
			vb.append(new Float32Array(verts));
		}

		return Line;
	})(BasePoly)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/polygon.as
	//class laya.webgl.shapes.Polygon extends laya.webgl.shapes.BasePoly
	var Polygon=(function(_super){
		function Polygon(x,y,r,edges,color,borderWidth,borderColor){
			Polygon._SUPERC_.call(this,x,y,r,r,edges,color,borderWidth,borderColor);
		}

		CLASS$(Polygon,'laya.webgl.shapes.Polygon',_super);
		return Polygon;
	})(BasePoly)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/rect.as
	//class laya.webgl.shapes.Rect extends laya.webgl.shapes.BasePoly
	var Rect=(function(_super){
		function Rect(x,y,width,height,color,borderWidth,borderColor){
			Rect._SUPERC_.call(this,x+width / 2,y+height / 2,width / 2,height / 2,4,color,borderWidth,borderColor);
		}

		CLASS$(Rect,'laya.webgl.shapes.Rect',_super);
		return Rect;
	})(BasePoly)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shapes/roundpolygon.as
	//class laya.webgl.shapes.RoundPolygon extends laya.webgl.shapes.BasePoly
	var RoundPolygon=(function(_super){
		function RoundPolygon(x,y,width,height,edges,color,borderWidth,borderColor,round){
			RoundPolygon._SUPERC_.call(this,x,y,width,height,edges,color,borderWidth,borderColor,round);
		}

		CLASS$(RoundPolygon,'laya.webgl.shapes.RoundPolygon',_super);
		return RoundPolygon;
	})(BasePoly)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/sprite.as
	/**
	*精灵
	*@author yung
	*/
	//class laya.display.Sprite extends laya.display.Node
	var Sprite=(function(_super){
		function Sprite(){
			this.mouseThrough=false;
			this._transform=null;
			this._tfChanged=false;
			this._x=0;
			this._y=0;
			this._width=0;
			this._height=0;
			this._repaint=1;
			this._filters=null;
			this._hasBlur=false;
			this._dragging=null;
			this._hitArea=null;
			this._mouseEnableState=0;
			this._uBounds=null;
			this._temBM=[];
			this._graphics=null;
			this._renderType=0;
			this._cacheCanvas=null;
			this._cacheRec=null;
			this._mask=null;
			this.zOrder=0;
			this.autoSize=false;
			this.optimizeFloat=false;
			Sprite._SUPERC_.call(this);
			this._style=Style.EMPTY;
		}

		CLASS$(Sprite,'laya.display.Sprite',_super);
		var __proto__=Sprite.prototype;
		LAYABOX.implements(__proto__,{"laya.display.ILayout":true})
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._style && this._style.destroy();
			this._transform=null;
			this._style=null;
			this._graphics=null;
			this._filters=null;
		}

		/**根据Z进行重新排序*/
		__proto__.updateOrder=function(){
			if (this._childs.length)this._childs.sortOn(["zOrder"],Array.NUMERIC);
		}

		__proto__.setBounds=function(bound){
			this._uBounds=bound;
		}

		/**
		*获取本对象在父容器坐标系的矩形显示区域
		*计算量较大，尽量少用
		*@return 矩形区域
		*/
		__proto__.getBounds=function(){
			return Rectangle.getWrapRec(this.boundPointsToParent(),Rectangle.temp);
		}

		/**
		*获取本对象在自己坐标系的矩形显示区域
		*计算量较大，尽量少用
		*@return 矩形区域
		*/
		__proto__.getSelfBounds=function(){
			return Rectangle.getWrapRec(this._getBoundPointsM(false),Rectangle.temp);
		}

		/**
		*批量操作点坐标
		*@param pList 坐标列表
		*@param x x偏移
		*@param y y偏移
		*
		*/
		__proto__.transPointList=function(pList,x,y){
			var i=0,len=pList.length;
			for (i=0;i < len;i+=2){
				pList[i]+=x;
				pList[i+1]+=y;
			}
		}

		/**
		*获取本对象在父容器坐标系的显示区域多边形顶点列表
		*当显示对象链中有旋转时，返回多边形顶点列表，无旋转时返回矩形的四个顶点
		*@param ifRotate 之前的对象链中是否有旋转
		*@return 顶点列表
		*/
		__proto__.boundPointsToParent=function(ifRotate){
			(ifRotate===void 0)&& (ifRotate=false);
			var pX=0,pY=0;
			if (this._style){
				pX=this._style.translateX;
				pY=this._style.translateY;
				ifRotate=ifRotate || (this._style.rotate!==0);
				if (this._style.scrollRect){
					pX+=this._style.scrollRect.x;
					pY+=this._style.scrollRect.y;
				}
			};
			var pList=this._getBoundPointsM(ifRotate);
			if (!pList || pList.length < 1)return pList;
			if (pList.length !=8){
				pList=ifRotate ? GrahamScan.scanPList(pList):Rectangle.getWrapRec(pList,Rectangle.temp).getBoundPoints();
			}
			if (!this.transform){
				this.transPointList(pList,this.x-pX,this.y-pY);
				return pList;
			};
			var tPoint=Point.TEMP;
			var rst=[];
			var i=0,len=pList.length;
			for (i=0;i < len;i+=2){
				tPoint.x=pList[i];
				tPoint.y=pList[i+1];
				this.toParentPoint(tPoint);
				rst.push(tPoint.x,tPoint.y);
			}
			return rst;
		}

		__proto__.getGraphicBounds=function(){
			if(!this._graphics)return Rectangle.EMPTY;
			return this._graphics.getBounds();
		}

		/**
		*获取自己坐标系的显示区域多边形顶点列表
		*@param ifRotate 当前的显示对象链是否由旋转
		*@return 顶点列表
		*/
		__proto__._getBoundPointsM=function(ifRotate){
			(ifRotate===void 0)&& (ifRotate=false);
			if (this._uBounds)return this._uBounds.getBoundPoints();
			var pList=this._graphics ? this._graphics.getBoundPoints():Utils.clearArr(this._temBM);
			var child;
			var cList;
			for (var i=0,n=this.numChildren;i < n;i++){
				child=this.getChildAt(i);
				if ((child instanceof laya.display.Sprite )&& child.visible==true){
					cList=child.boundPointsToParent(ifRotate);
					if (cList)
						pList=pList ? Utils.concatArr(pList,cList):cList;
				}
			}
			return pList;
		}

		__proto__.getStyle=function(){
			this._style===Style.EMPTY && (this._style=new Style());
			return this._style;
		}

		__proto__.setStyle=function(value){
			this._style=value;
		}

		__proto__._adjustTransform=function(){
			'use strict';
			this._tfChanged=false;
			var style=this._style;
			var sx=style.scaleX,sy=style.scaleY;
			var m=null;
			if (style.rotate || ((sx!==1 || sy!==1))){
				m=this._transform || (this._transform=new Matrix());
				m.bTransform=true;
				if (style.rotate){
					var angle=style.rotate *0.0174532922222222;
					var cos=m.cos=Math.cos(angle);
					var sin=m.sin=Math.sin(angle);
					m.a=sx *cos;
					m.b=sx *sin;
					m.c=-sy *sin;
					m.d=sy *cos;
					m.tx=m.ty=0;
					return m;
					}else {
					m.a=sx;
					m.d=sy;
					m.c=m.b=m.tx=m.ty=0;
					return m;
				}
				}else {
				this._transform=null;
				this._renderType &=~ /*laya.renders.RenderSprite.TRANSFORM*/0x10;
			}
			return m;
		}

		/**
		*设置坐标位置
		*@param x X轴坐标
		*@param y Y轴坐标
		*@return 返回对象本身
		*/
		__proto__.pos=function(x,y){
			if (this._x!==x || this._y!==y){
				this._x=x;
				this._y=y;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
			return this;
		}

		/**
		*设置轴心点
		*@param x X轴心点
		*@param y Y轴心点
		*@return 返回对象本身
		*/
		__proto__.pivot=function(x,y){
			this.pivotX=x;
			this.pivotY=y;
			return this;
		}

		/**
		*设置宽高
		*@param width 宽度
		*@param hegiht 高度
		*@return 返回对象本身
		*/
		__proto__.size=function(width,height){
			this.width=width;
			this.height=height;
			return this;
		}

		/**
		*设置缩放
		*@param scaleX X轴缩放比例
		*@param scaleY Y轴缩放比例
		*@return 返回对象本身
		*/
		__proto__.scale=function(scaleX,scaleY){
			this.scaleX=scaleX;
			this.scaleY=scaleY;
			return this;
		}

		__proto__.onAddChild=function(child){
			this._renderType |=/*laya.renders.RenderSprite.CHILDS*/0x400;
		}

		__proto__._removeRenderType=function(type){
			((this._renderType & type)==type)&& (this._renderType &=~type);
		}

		__proto__._addRenderType=function(type){
			this._renderType |=type;
		}

		__proto__.render=function(context,x,y){
			Stat.spriteDraw++;
			RenderSprite.renders[this._renderType]._fun(this,context,x+this._x,y+this._y);
			this._repaint=0;
		}

		__proto__.customRender=function(context,x,y){}
		__proto__.applyFilters=function(){
			if (Render.isWebGl)return;
			if (!this._filters || this._filters.length < 1)return;
			for (var i=0,n=this._filters.length;i < n;i++){
				this._filters[i].action.apply(this._cacheCanvas);
			}
		}

		__proto__.ask=function(type,value){
			return type==1?(value==2):false;
		}

		/**
		*本地坐标转全局坐标
		*@param point 要转换的点
		*@return 转换后的点
		*/
		__proto__.localToGlobal=function(point){
			if (!this._displayInStage || !point)return point;
			var ele=this;
			while (ele){
				if (ele==Laya.stage)break ;
				point=ele.toParentPoint(point);
				ele=ele.parent;
			}
			return point;
		}

		/**
		*全局坐标转本地坐标
		*@param point 要转换的点
		*@return 转换后的点
		*/
		__proto__.globalToLocal=function(point){
			if (!this._displayInStage || !point)return point;
			var ele=this;
			var list=[];
			while (ele){
				if (ele==Laya.stage)break ;
				list.push(ele);
				ele=ele.parent;
			};
			var i=list.length-1;
			while (i >=0){
				ele=list[i];
				point=ele.fromParentPoint(point);
				i--;
			}
			return point;
		}

		/**获得相对于本对象上的鼠标坐标信息*/
		__proto__.getMousePoint=function(){
			return this.globalToLocal(Point.TEMP.setTo(Laya.stage.mouseX,Laya.stage.mouseY));
		}

		/**
		*将本地坐标系坐标转换到父容器坐标系
		*@param point 要转换的点
		*@return 转换后的点
		*/
		__proto__.toParentPoint=function(point){
			if (!point)return point;
			point.x-=this.pivotX;
			point.y-=this.pivotY;
			if (this.transform){
				this._transform.transformPoint(point.x,point.y,point);
			}
			point.x+=this._x;
			point.y+=this._y;
			var scroll=this._style.scrollRect;
			if (scroll){
				point.x-=scroll.x;
				point.y-=scroll.y;
			}
			return point;
		}

		/**
		*将父容器坐标系坐标转换到本地坐标系
		*@param point 要转换的点
		*@return 转换后的点
		*/
		__proto__.fromParentPoint=function(point){
			if (!point)return point;
			point.x-=this._x;
			point.y-=this._y;
			var scroll=this._style.scrollRect;
			if (scroll){
				point.x+=scroll.x;
				point.y+=scroll.y;
			}
			if (this.transform){
				this._transform.invertTransformPoint(point);
			}
			point.x+=this.pivotX;
			point.y+=this.pivotY;
			return point;
		}

		/**
		*
		*增加事件监听，如果侦听鼠标事件，则会自动设置自己和父亲节点的mouseEnable=true
		*@param type 事件类型，可以参考Event类定义
		*@param caller 执行域(this域)，默认为监听对象的this域
		*@param listener 回调方法，如果为空，则移除所有type类型的事件监听
		*@param args 回调参数
		*@return 返回对象本身
		*/
		__proto__.on=function(type,caller,listener,args){
			if (this.isMouseEvent(type)){
				if (this._displayInStage)this.onDisplay();
				else laya.events.EventDispatcher.prototype.once.call(this,/*laya.events.Event.DISPLAY*/"display",this,this.onDisplay);
			}
			return laya.events.EventDispatcher.prototype.on.call(this,type,caller,listener,args);
		}

		/**
		*增加一次性事件监听，执行后会自动移除监听，如果侦听鼠标事件，则会自动设置自己和父亲节点的mouseEnable=true
		*@param type 事件类型，可以参考Event类定义
		*@param caller 执行域(this域)，默认为监听对象的this域
		*@param listener 回调方法，如果为空，则移除所有type类型的事件监听
		*@param args 回调参数
		*@return 返回对象本身
		*/
		__proto__.once=function(type,caller,listener,args){
			if (this.isMouseEvent(type)){
				if (this._displayInStage)this.onDisplay();
				else laya.events.EventDispatcher.prototype.once.call(this,/*laya.events.Event.DISPLAY*/"display",this,this.onDisplay);
			}
			return laya.events.EventDispatcher.prototype.once.call(this,type,caller,listener,args);
		}

		__proto__.onDisplay=function(){
			if (this._mouseEnableState!==1){
				var ele=this;
				while (ele && ele._mouseEnableState===0){
					ele.mouseEnabled=true;
					ele=ele.parent;
				}
			}
		}

		/**
		*加载并显示一个图片
		*@param url 图片地址
		*/
		__proto__.loadImage=function(url,x,y){
			var _$this=this;
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			function loaded (image){
				if (!_$this.width && !_$this.height)
					_$this.size(image.width,image.height);
				_$this.repaint();
			}
			this.graphics.loadImage(url,x,y,loaded);
			return this;
		}

		/**cacheAsBitmap=true时，手动重新缓存本对象*/
		__proto__.repaint=function(){
			(this._repaint===0)&& (this._repaint=1,this.parentRepaint());
		}

		__proto__.isRepaint=function(){
			return (this._repaint!==0);
		}

		/**cacheAsBitmap=true时，手动重新缓存父对象*/
		__proto__.parentRepaint=function(){
			var p=this._parent;
			p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
		}

		/**开始拖动，格式{area:拖动区域，null为不设置区域，elastic：橡皮筋效果最大值，0为无橡皮筋效果，hasInertia：是否有惯性滑动效果，和橡皮筋效果冲突，data:携带的数据}*/
		__proto__.startDrag=function(option){
			this._dragging || (this._dragging=new Dragging());
			this._dragging.start(this,option);
		}

		/**停止拖动*/
		__proto__.stopDrag=function(){
			this._dragging && this._dragging.stop();
		}

		/**@inheritDoc */
		__proto__._setDisplay=function(value){
			_super.prototype._setDisplay.call(this,value);
			if (!value && this._cacheCanvas && this._cacheCanvas.ctx){
				this._cacheCanvas.ctx.destory();
				this._cacheCanvas.ctx=null;
			}
		}

		/**
		*某个点是否在对象内
		*@param x 全局x坐标
		*@param y 全局y坐标
		*@return 是否在对象内
		*/
		__proto__.hitTestPoint=function(x,y){
			var point=this.globalToLocal(Point.TEMP.setTo(x,y));
			var rect=this._hitArea?this._hitArea:Rectangle.EMPTY.setTo(0,0,this._width,this._height);
			return rect.contains(point.x,point.y);
		}

		/**
		*排版相关
		*/
		__proto__._getWords=function(){
			return null;
		}

		__proto__._addChildsToLayout=function(out){
			var words=this._getWords();
			if (words==null && this._childs.length==0)return false;
			words && words.forEach(function(o){out.push(o);});
			this._childs.forEach(function(o){o._style._enableLayout()&& o._addToLayout(out);});
			return true;
		}

		__proto__._addToLayout=function(out){
			if (this._style.absolute)return;
			this._style.block ? out.push(this):(this._addChildsToLayout(out)&& (this.x=this.y=0));
		}

		__proto__._isChar=function(){
			return false;
		}

		__proto__._getCSSStyle=function(){
			return this._style.getCSSStyle();
		}

		__proto__.setValue=function(name,value){
			switch(name){
				case 'x':this.x=parseFloat(value);break ;
				case 'y':this.y=parseFloat(value);break ;
				case 'width':this.width=parseFloat(value);break ;
				case 'height':this.height=parseFloat(value);break ;
				default :
					this[name]=value;
				}
		}

		__proto__.layoutLater=function(){
			this.parent && (this.parent).layoutLater();
		}

		/**是否缓存为静态图像，把不经常变化的复杂内容缓存为静态图像，能极大提高渲染性能*/
		GETSET$(0,__proto__,'cacheAsBitmap',function(){
			return this._cacheCanvas !=null;
			},function(value){
			if (value){
				this._cacheCanvas || (this._cacheCanvas={cache:true})
				this._renderType |=/*laya.renders.RenderSprite.CANVAS*/0x20
				}else {
				this._cacheCanvas=null;
				this._renderType &=~ /*laya.renders.RenderSprite.CANVAS*/0x20;
			}
			this.repaint();
		});

		/**显示对象的滚动矩形范围*/
		GETSET$(0,__proto__,'scrollRect',function(){
			return this._style.scrollRect;
			},function(value){
			this.getStyle().scrollRect=value;
			this.repaint();
			if (value)this._renderType |=/*laya.renders.RenderSprite.CLIP*/0x40;
			else this._renderType &=~ /*laya.renders.RenderSprite.CLIP*/0x40;
		});

		GETSET$(0,__proto__,'viewHeight',function(){
			return this.height *this._style.scaleY;
		});

		/**相对父亲的X轴坐标*/
		GETSET$(0,__proto__,'x',function(){
			return this._x;
			},function(value){
			var p=this._parent;
			this._x!==value && (this._x=value,p && p._repaint===0 && (p._repaint=1,p.parentRepaint()));
		});

		/**相对父亲的Y轴坐标*/
		GETSET$(0,__proto__,'y',function(){
			return this._y;
			},function(value){
			var p=this._parent;
			this._y!==value && (this._y=value,p && p._repaint===0 && (p._repaint=1,p.parentRepaint()));
		});

		/**
		*表示显示对象的宽度，以像素为单位。
		*@return
		*/
		GETSET$(0,__proto__,'width',function(){
			if (!this.autoSize || this._width > 0)return this._width;
			return this.getSelfBounds().width;
			},function(value){
			this._width!==value && (this._width=value,this.repaint());
		});

		/**
		*表示显示对象的高度，以像素为单位。
		*@return
		*/
		GETSET$(0,__proto__,'height',function(){
			if (!this.autoSize || this._height > 0)return this._height;
			return this.getSelfBounds().height;
			},function(value){
			this._height!==value && (this._height=value,this.repaint());
		});

		GETSET$(0,__proto__,'viewWidth',function(){
			return this.width *this._style.scaleX;
		});

		/**X轴缩放值，默认为1*/
		GETSET$(0,__proto__,'scaleX',function(){
			return this._style.scaleX;
			},function(value){
			var style=this.getStyle();
			if (style.scaleX!==value){
				style.scaleX=value;
				this._tfChanged=true;
				this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x10;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
		});

		/**点击区域，手动设置的可点击区域*/
		GETSET$(0,__proto__,'hitArea',function(){
			return this._hitArea;
			},function(value){
			this._hitArea=value;
		});

		/**旋转角度，默认为0*/
		GETSET$(0,__proto__,'rotation',function(){
			return this._style.rotate;
			},function(value){
			var style=this.getStyle();
			if (style.rotate!==value){
				style.rotate=value;
				this._tfChanged=true;
				this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x10;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
		});

		/**Y轴缩放值，默认为1*/
		GETSET$(0,__proto__,'scaleY',function(){
			return this._style.scaleY;
			},function(value){
			var style=this.getStyle();
			if (style.scaleY!==value){
				style.scaleY=value;
				this._tfChanged=true;
				this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x10;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
		});

		GETSET$(0,__proto__,'transform',function(){
			return this._tfChanged ? this._adjustTransform():this._transform;
			},function(value){
			this._tfChanged=false;
			this._transform=value;
			if (value)this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x10;
			else this._renderType &=~ /*laya.renders.RenderSprite.TRANSFORM*/0x10;
			this.parentRepaint();
		});

		/**X轴心点的位置，默认为0，轴心点会影响对象位置，缩放，旋转*/
		GETSET$(0,__proto__,'pivotX',function(){
			return this._style.translateX;
			},function(value){
			this.getStyle().translateX=value;
			this.parentRepaint();
		});

		/**Y轴心点的位置，默认为0，轴心点会影响对象位置，缩放，旋转*/
		GETSET$(0,__proto__,'pivotY',function(){
			return this._style.translateY;
			},function(value){
			this.getStyle().translateY=value;
			this.parentRepaint();
		});

		/**透明度，值为0-1，默认为1，不透明*/
		GETSET$(0,__proto__,'alpha',function(){
			return this._style.alpha;
			},function(value){
			this.getStyle().alpha=value;
			if (value!==1)this._renderType |=/*laya.renders.RenderSprite.ALPHA*/0x04;
			else this._renderType &=~ /*laya.renders.RenderSprite.ALPHA*/0x04;
			this.parentRepaint();
		});

		/**是否可见，默认为true*/
		GETSET$(0,__proto__,'visible',function(){
			return this._style.visible;
			},function(value){
			this.getStyle().visible=value;
			this.parentRepaint();
		});

		/**指定要使用的混合模式*/
		GETSET$(0,__proto__,'blendMode',function(){
			return this._style.blendMode;
			},function(value){
			this.getStyle().blendMode=value;
			this._renderType |=/*laya.renders.RenderSprite.BLEND*/0x08;
			this.parentRepaint();
		});

		/**绘图对象*/
		GETSET$(0,__proto__,'graphics',function(){
			this._renderType |=/*laya.renders.RenderSprite.GRAPHICS*/0x100;
			return this._graphics || (this._graphics=System.createGraphics());
			},function(value){
			this._graphics=value;
			if (value)this._renderType |=/*laya.renders.RenderSprite.GRAPHICS*/0x100;
			else this._renderType &=~ /*laya.renders.RenderSprite.GRAPHICS*/0x100;
		});

		/**滤镜集合*/
		GETSET$(0,__proto__,'filters',function(){
			return this._filters;
			},function(value){
			this._filters=value;
			if (Render.isWebGl){
				if(value&&value.length){
					this._renderType |=/*laya.renders.RenderSprite.FILTERS*/0x02;
				}
				else{
					this._renderType&=~ /*laya.renders.RenderSprite.FILTERS*/0x02;
				}
				return;
			}
			this.cacheAsBitmap=true;
			this.repaint();
		});

		GETSET$(0,__proto__,'mask',function(){
			return this._mask;
			},function(value){
			this._mask=value;
			this._renderType |=/*laya.renders.RenderSprite.BLEND*/0x08;
		});

		/**stage引用*/
		GETSET$(0,__proto__,'stage',function(){
			return Laya.stage;
		});

		/**是否接受鼠标事件，默认为false，如果监听鼠标事件，则会自动设置本对象及父节点的mouseEnable=true*/
		GETSET$(0,__proto__,'mouseEnabled',function(){
			return this._mouseEnableState > 1;
			},function(value){
			this._mouseEnableState=value ? 2 :1;
		});

		GETSET$(0,__proto__,'mouseX',function(){
			return this.globalToLocal(Point.TEMP.setTo(Laya.stage.mouseX,Laya.stage.mouseY)).x;
		});

		GETSET$(0,__proto__,'mouseY',function(){
			return this.globalToLocal(Point.TEMP.setTo(Laya.stage.mouseX,Laya.stage.mouseY)).y;
		});

		Sprite.fromImage=function(url){
			return new Sprite().loadImage(url);
		}

		Sprite.DELAY=0;
		return Sprite;
	})(Node)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/resource/rendertargetgltextur.as
	/**
	*...
	*@author laya
	*/
	//class laya.webgl.resource.RenderTargetGLTextur extends laya.webgl.resource.GLTextur
	var RenderTargetGLTextur=(function(_super){
		function RenderTargetGLTextur(bitmapResource){
			//this._frameBuffer=null;
			//this._depthBuffer=null;
			RenderTargetGLTextur._SUPERC_.call(this,bitmapResource);
		}

		CLASS$(RenderTargetGLTextur,'laya.webgl.resource.RenderTargetGLTextur',_super);
		var __proto__=RenderTargetGLTextur.prototype;
		__proto__.resourceRelease=function(){
			if (!this.isLock()){
				if (this._frameBuffer){
					WebGL.mainContext.deleteTexture(this._source);
					WebGL.mainContext.deleteFramebuffer(this._frameBuffer);
					WebGL.mainContext.deleteRenderbuffer(this._depthBuffer);
					this._frameBuffer=null;
					this._source=null;
					_super.prototype.resourceRelease.call(this);
					return true;
				}
			}
			return false;
		}

		__proto__.resourceRestore=function(){
			var gl=WebGL.mainContext;
			var renderTarget=this._bitmapResource;
			var w=renderTarget.width;
			var h=renderTarget.height;
			this._frameBuffer || (this._frameBuffer=gl.createFramebuffer());
			this._source || (this._source=gl.createTexture());
			gl.bindTexture(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,this._source);
			gl.texImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,0,/*laya.webgl.WebGLContext.RGBA*/0x1908,w,h,0,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401,null);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801,/*laya.webgl.WebGLContext.LINEAR*/0x2601);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800,/*laya.webgl.WebGLContext.LINEAR*/0x2601);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,this._frameBuffer);
			gl.framebufferTexture2D(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,/*laya.webgl.WebGLContext.COLOR_ATTACHMENT0*/0x8CE0,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,this._source,0);
			if (renderTarget.getType()===/*laya.webgl.resource.RenderTarget.TYPE3D*/2){
				this._depthBuffer || (this._depthBuffer=gl.createRenderbuffer());
				gl.bindRenderbuffer(/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41,this._depthBuffer);
				gl.renderbufferStorage(/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41,/*laya.webgl.WebGLContext.DEPTH_COMPONENT16*/0x81A5,w,h);
				gl.framebufferRenderbuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,/*laya.webgl.WebGLContext.DEPTH_ATTACHMENT*/0x8D00,/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41,this._depthBuffer);
			}
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,null);
			gl.bindTexture(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,null);
			gl.bindRenderbuffer(/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41,null);
			this._memSize=renderTarget.getMemSize();
			this._released=false;
			this._mgr.addSize(this._memSize);
		}

		return RenderTargetGLTextur;
	})(GLTextur)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/value/color2dsv.as
	//class laya.webgl.shader.d2.value.Color2dSV extends laya.webgl.shader.d2.value.Value2D
	var Color2dSV=(function(_super){
		function Color2dSV(){
			this.color=[];
			Color2dSV._SUPERC_.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02,0);
		}

		CLASS$(Color2dSV,'laya.webgl.shader.d2.value.Color2dSV',_super);
		var __proto__=Color2dSV.prototype;
		__proto__.setValue=function(value){
			value.fillStyle&&(this.color=value.fillStyle._color._color);
			value.strokeStyle&&(this.color=value.strokeStyle._color._color);
		}

		return Color2dSV;
	})(Value2D)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/value/texturesv.as
	//class laya.webgl.shader.d2.value.TextureSV extends laya.webgl.shader.d2.value.Value2D
	var TextureSV=(function(_super){
		function TextureSV(subID){
			this.texture=null;
			this.u_colorMatrix=null;
			this.texcoord=Value2D._TEXCOORD;
			(subID===void 0)&& (subID=0);
			TextureSV._SUPERC_.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01,subID);
		}

		CLASS$(TextureSV,'laya.webgl.shader.d2.value.TextureSV',_super);
		var __proto__=TextureSV.prototype;
		__proto__.setValue=function(vo){
			this.ALPHA=vo.ALPHA;
			this.setFilters(vo.filters);
		}

		__proto__.clear=function(){
			this.texture=null;
			this.shader=null;
			this.defines.setValue(0);
		}

		return TextureSV;
	})(Value2D)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/value/primitivesv.as
	//class laya.webgl.shader.d2.value.PrimitiveSV extends laya.webgl.shader.d2.value.Value2D
	var PrimitiveSV=(function(_super){
		function PrimitiveSV(){
			this.a_color=null;
			this.u_mmat2=null;
			PrimitiveSV._SUPERC_.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04,0);
			this.position=[2,/*laya.webgl.WebGLContext.FLOAT*/0x1406,false,5 *CONST3D2D.BYTES_PE,0];
			this.a_color=[3,/*laya.webgl.WebGLContext.FLOAT*/0x1406,false,5 *CONST3D2D.BYTES_PE,2*4];
		}

		CLASS$(PrimitiveSV,'laya.webgl.shader.d2.value.PrimitiveSV',_super);
		return PrimitiveSV;
	})(Value2D)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/component.as
	/**
	*<code>Component</code> 是ui控件类的基类。
	*
	*
	*<p>生命周期：preinitialize > createChildren > initialize > 组件构造函数</p>
	*/
	//class laya.ui.Component extends laya.display.Sprite
	var Component=(function(_super){
		function Component(){
			this._dataSource=null;
			this._toolTip=null;
			this._tag=null;
			this._comXml=null;
			Component._SUPERC_.call(this);
			this._layout=LayoutStyle.EMPTY;
			this.preinitialize();
			this.createChildren();
			this.initialize();
		}

		CLASS$(Component,'laya.ui.Component',_super);
		var __proto__=Component.prototype;
		LAYABOX.implements(__proto__,{"laya.ui.IComponent":true})
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._dataSource=this._layout=null;
			this._tag=null;
			this._toolTip=null;
		}

		/**
		*<p>预初始化。</p>
		*@internal 子类可在此函数内设置、修改属性默认值
		*/
		__proto__.preinitialize=function(){}
		/**
		*<p>创建并添加控件子节点。</p>
		*@internal 子类可在此函数内创建并添加子节点。
		*/
		__proto__.createChildren=function(){}
		/**
		*<p>控件初始化。</p>
		*@internal 在此子对象已被创建，可以对子对象进行修改。
		*/
		__proto__.initialize=function(){}
		/**
		*<p>延迟运行指定的函数。</p>
		*<p>在控件被显示在屏幕之前调用，一般用于延迟计算数据。</p>
		*@param method 要执行的函数的名称。例如，functionName。
		*@param args 传递给 <code>method</code> 函数的可选参数列表。
		*
		*@see #runCallLater()
		*/
		__proto__.callLater=function(method,args){
			Laya.timer.callLater(this,method,args);
		}

		/**
		*<p>如果有需要延迟调用的函数（通过 <code>callLater</code> 函数设置），则立即执行延迟调用函数。</p>
		*@param method 要执行的函数名称。例如，functionName。
		*@see #callLater()
		*/
		__proto__.runCallLater=function(method){
			Laya.timer.runCallLater(this,method);
		}

		/**
		*<p>立即执行影响宽高度量的延迟调用函数。</p>
		*@internal <p>使用 <code>runCallLater</code> 函数，立即执行影响宽高度量的延迟运行函数(使用 <code>callLater</code> 设置延迟执行函数)。</p>
		*@see #callLater()
		*@see #runCallLater()
		*/
		__proto__.commitMeasure=function(){}
		/**
		*<p>重新调整对象的大小。</p>
		*/
		__proto__.changeSize=function(){
			this.event(/*laya.events.Event.RESIZE*/"resize");
		}

		/**
		*@private
		*<p>获取对象的布局样式。</p>
		*@return
		*/
		__proto__.getLayout=function(){
			this._layout===LayoutStyle.EMPTY && (this._layout=new LayoutStyle());
			return this._layout;
		}

		/**
		*对象从显示列表移除的事件侦听处理函数。
		*/
		__proto__.onRemoved=function(){
			this.parent.off(/*laya.events.Event.RESIZE*/"resize",this,this.onCompResize);
		}

		/**
		*对象被添加到显示列表的事件侦听处理函数。
		*/
		__proto__.onAdded=function(){
			this.parent.on(/*laya.events.Event.RESIZE*/"resize",this,this.onCompResize);
			this.resetLayoutX();
			this.resetLayoutY();
		}

		/**
		*父容器的 <code>Event.RESIZE</code> 事件侦听处理函数。
		*/
		__proto__.onCompResize=function(){
			this.resetLayoutX();
			this.resetLayoutY();
		}

		/**
		*<p>重置对象的 <code>X</code> 轴（水平方向）布局。</p>
		*/
		__proto__.resetLayoutX=function(){
			var parent=this.parent;
			if (parent){
				var layout=this._layout;
				if (!isNaN(layout.centerX)){
					this.x=(parent.width-this.displayWidth)*0.5+layout.centerX;
					}else if (!isNaN(layout.left)){
					this.x=layout.left;
					if (!isNaN(layout.right)){
						this.width=(parent._width-layout.left-layout.right)/ this.scaleX;
					}
					}else if (!isNaN(layout.right)){
					this.x=parent.width-this.displayWidth-layout.right;
				}
			}
		}

		/**
		*<p>重置对象的 <code>Y</code> 轴（垂直方向）布局。</p>
		*/
		__proto__.resetLayoutY=function(){
			var parent=this.parent;
			if (parent){
				var layout=this._layout;
				if (!isNaN(layout.centerY)){
					this.y=(parent.height-this.displayHeight)*0.5+layout.centerY;
					}else if (!isNaN(layout.top)){
					this.y=layout.top;
					if (!isNaN(layout.bottom)){
						this.height=(parent._height-layout.top-layout.bottom)/ this.scaleY;
					}
					}else if (!isNaN(layout.bottom)){
					this.y=parent.height-this.displayHeight-layout.bottom;
				}
			}
		}

		/**
		*对象的 <code>Event.MOUSE_OVER</code> 事件侦听处理函数。
		*/
		__proto__.onMouseOver=function(e){
			Laya.stage.event(/*laya.ui.UIEvent.SHOW_TIP*/"showtip",this._toolTip);
		}

		/**
		*对象的 <code>Event.MOUSE_OUT</code> 事件侦听处理函数。
		*/
		__proto__.onMouseOut=function(e){
			Laya.stage.event(/*laya.ui.UIEvent.HIDE_TIP*/"hidetip",this._toolTip);
		}

		/**
		*<p>表示显示对象的宽度，以像素为单位。</p>
		*<p><b>注：</b>当值为0时，宽度为自适应大小。</p>
		*/
		GETSET$(0,__proto__,'width',function(){
			if (this._width)return this._width;
			return this.measureWidth;
			},function(value){
			if (this._width !=value){
				this._width=value;
				this.callLater(this.changeSize);
				if (this._layout.enable && (!isNaN(this._layout.centerX)|| !isNaN(this._layout.right)))this.resetLayoutX();
			}
		});

		/**
		*<p>对象的显示宽度（以像素为单位）。</p>
		*@return
		*@internal #TM
		*/
		GETSET$(0,__proto__,'displayWidth',function(){
			return this.width *this.scaleX;
		});

		/**
		*<p>在父容器中，此对象的水平方向中轴线与父容器的水平方向中心线的距离（以像素为单位）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'centerX',function(){
			return this._layout.centerX;
			},function(value){
			this.getLayout().centerX=value;
			this.layOutEabled=true;
			this.resetLayoutX();
		});

		/**
		*<p>对象的显示高度（以像素为单位）。</p>
		*@return
		*@internal #TM
		*/
		GETSET$(0,__proto__,'displayHeight',function(){
			return this.height *this.scaleY;
		});

		/**
		*<p>显示对象的实际显示区域高度（以像素为单位）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'measureHeight',function(){
			var max=0;
			this.commitMeasure();
			for (var i=this.numChildren-1;i >-1;i--){
				var comp=this.getChildAt(i);
				if (comp.visible){
					max=Math.max(comp.y+comp.height *comp.scaleY,max);
				}
			}
			return max;
		});

		/**
		*<p>显示对象的实际显示区域宽度（以像素为单位）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'measureWidth',function(){
			var max=0;
			this.commitMeasure();
			for (var i=this.numChildren-1;i >-1;i--){
				var comp=this.getChildAt(i);
				if (comp.visible){
					max=Math.max(comp.x+comp.width *comp.scaleX,max);
				}
			}
			return max;
		});

		/**
		*<p>表示显示对象的高度，以像素为单位。</p>
		*<p><b>注：</b>当值为0时，高度为自适应大小。</p>
		*@return
		*/
		GETSET$(0,__proto__,'height',function(){
			if (this._height)return this._height;
			return this.measureHeight;
			},function(value){
			if (this._height !=value){
				this._height=value;
				this.callLater(this.changeSize);
				if (this._layout.enable && (!isNaN(this._layout.centerY)|| !isNaN(this._layout.bottom)))this.resetLayoutY();
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'scaleX',_super.prototype._$get_scaleX,function(value){
			if (_super.prototype._$get_scaleX.call(this)!=value){
				_super.prototype._$set_scaleX.call(this,value);
				this.callLater(this.changeSize);
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'scaleY',_super.prototype._$get_scaleY,function(value){
			if (_super.prototype._$get_scaleY.call(this)!=value){
				_super.prototype._$set_scaleY.call(this,value);
				this.callLater(this.changeSize);
			}
		});

		/**
		*<p>数据赋值，通过对UI赋值来控制UI显示逻辑。</p>
		*<p>简单赋值会更改组件的默认属性，使用大括号可以指定组件的任意属性进行赋值。</p>
		*@example 以下示例中， <code>label1、checkbox1</code> 分别为示例的name属性值。
		<listing version="3.0">
		//默认属性赋值
		dataSource={label1:"改变了label",checkbox1:true};//(更改了label1的text属性值，更改checkbox1的selected属性)。
		//任意属性赋值
		dataSource={label2:{text:"改变了label",size:14},checkbox2:{selected:true,x:10}};
		</listing>
		*@return
		*/
		GETSET$(0,__proto__,'dataSource',function(){
			return this._dataSource;
			},function(value){
			this._dataSource=value;
			for (var prop in this._dataSource){
				if (this.hasOwnProperty(prop)){
					this[prop]=this._dataSource[prop];
				}
			}
		});

		/**
		*
		*@param value
		*/
		/**
		*<p>鼠标悬停提示。</p>
		*<p>可以赋值为文本 <code>String</code> 或函数 <code>Function</code> ，用来实现自定义样式的鼠标提示和参数携带等。</p>
		*@example 以下例子展示了三种鼠标提示：
		<listing version="3.0">
		private var _testTips:TestTipsUI=new TestTipsUI();
		private function testTips():void {
			//简单鼠标提示
			btn2.toolTip="这里是鼠标提示&lt;b&gt;粗体&lt;/b&gt;&lt;br&gt;换行";
			//自定义的鼠标提示
			btn1.toolTip=showTips1;
			//带参数的自定义鼠标提示
			clip.toolTip=new Handler(this,showTips2,["clip"]);
		}

		private function showTips1():void {
			_testTips.label.text="这里是按钮["+btn1.label+"]";
			App.tip.addChild(_testTips);
		}

		private function showTips2(name:String):void {
			_testTips.label.text="这里是"+name;
			App.tip.addChild(_testTips);
		}

		</listing>
		*@return
		*/
		GETSET$(0,__proto__,'toolTip',function(){
			return this._toolTip;
			},function(value){
			if (this._toolTip !=value){
				this._toolTip=value;
				if (value !=null){
					this.on(/*laya.events.Event.MOUSE_OVER*/"mouseover",this,this.onMouseOver);
					this.on(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onMouseOut);
					}else {
					this.off(/*laya.events.Event.MOUSE_OVER*/"mouseover",this,this.onMouseOver);
					this.off(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onMouseOut);
				}
			}
		});

		/**
		*<p>从组件顶边到其内容区域顶边之间的垂直距离（以像素为单位）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'top',function(){
			return this._layout.top;
			},function(value){
			this.getLayout().top=value;
			this.layOutEabled=true;
			this.resetLayoutY();
		});

		/**
		*<p>从组件底边到其内容区域底边之间的垂直距离（以像素为单位）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'bottom',function(){
			return this._layout.bottom;
			},function(value){
			this.getLayout().bottom=value;
			this.layOutEabled=true;
			this.resetLayoutY();
		});

		/**
		*<p>从组件左边到其内容区域左边之间的水平距离（以像素为单位）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'left',function(){
			return this._layout.left;
			},function(value){
			this.getLayout().left=value;
			this.layOutEabled=true;
			this.resetLayoutX();
		});

		/**
		*<p>从组件右边到其内容区域右边之间的水平距离（以像素为单位）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'right',function(){
			return this._layout.right;
			},function(value){
			this.getLayout().right=value;
			this.layOutEabled=true;
			this.resetLayoutX();
		});

		/**
		*<p>在父容器中，此对象的垂直方向中轴线与父容器的垂直方向中心线的距离（以像素为单位）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'centerY',function(){
			return this._layout.centerY;
			},function(value){
			this.getLayout().centerY=value;
			this.layOutEabled=true;
			this.resetLayoutY();
		});

		/**
		*<p>对象的标签。</p>
		*@return
		*@internal 冗余字段，可以用来储存数据。
		*/
		GETSET$(0,__proto__,'tag',function(){
			return this._tag;
			},function(value){
			this._tag=value;
		});

		/**
		*<p>指定对象是否可使用布局。</p>
		*<p>如果值为true,则此对象可以使用布局样式，否则不使用布局样式。</p>
		*@param value
		*/
		GETSET$(0,__proto__,'layOutEabled',null,function(value){
			if (this._layout.enable !=value){
				this._layout.enable=value;
				if (!this.hasListener(/*laya.events.Event.ADDED*/"added")){
					this.on(/*laya.events.Event.ADDED*/"added",this,this.onAdded);
					this.on(/*laya.events.Event.REMOVED*/"removed",this,this.onRemoved);
				}
			}
		});

		GETSET$(0,__proto__,'comXml',function(){
			return this._comXml;
			},function(value){
			this._comXml=value;
		});

		return Component;
	})(Sprite)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/animation.as
	/**
	*动画类
	*@author yung
	*/
	//class laya.display.Animation extends laya.display.Sprite
	var Animation=(function(_super){
		function Animation(){
			this.interval=30;
			this._clips=null;
			this._index=0;
			this._count=0;
			this._isPlaying=false;
			Animation._SUPERC_.call(this);
			this.on(/*laya.events.Event.DISPLAY*/"display",this,this._onDisplay);
			this.on(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this._onDisplay);
		}

		CLASS$(Animation,'laya.display.Animation',_super);
		var __proto__=Animation.prototype;
		/**
		*@inheritDoc
		*/
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._clips=null;
		}

		__proto__._onDisplay=function(){
			if (this._isPlaying){
				if (this._displayInStage)this.play();
				else this.stop();
			}
		}

		/**
		*初始化
		*@param graphics graphics集合
		*/
		__proto__.init=function(graphics){
			this._clips=graphics;
			this._count=graphics.length;
			this._renderType |=/*laya.renders.RenderSprite.GRAPHICS*/0x100;
		}

		/**
		*播放
		*/
		__proto__.play=function(){
			if (this._clips && this._clips.length > 0 && this.interval > 0){
				this._isPlaying=true;
				this.timerLoop(this.interval,this,this._loop,null,true);
			}
		}

		__proto__._loop=function(){
			if (this._style.visible){
				this.index=this._index,this._index++;
				this._index >=this._count && (this._index=0,this.event(/*laya.events.Event.COMPLETE*/"complete"));
			}
		}

		/**
		*停止播放
		*/
		__proto__.stop=function(){
			this._isPlaying=false;
			this.clearTimer(this,this._loop);
		}

		/**
		*加载图片集合，组成动画
		*@param urls 图片地址集合
		*/
		__proto__.loadImages=function(urls){
			var arr=[];
			for (var i=0,n=urls.length;i < n;i++){
				var g=new Graphics();
				g.loadImage(urls[i],0,0);
				arr.push(g);
			}
			this.init(arr);
			return this;
		}

		/**当前播放索引*/
		GETSET$(0,__proto__,'index',function(){
			return this._index;
			},function(value){
			this._index=value;
			this._graphics=this._clips[value];
			this.repaint();
		});

		/**动画长度*/
		GETSET$(0,__proto__,'count',function(){
			return this._count;
		});

		return Animation;
	})(Sprite)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/text.as
	/**
	*<p> <code>Text</code> 类用于创建显示对象以显示</p>
	*
	*@author yung
	*/
	//class laya.display.Text extends laya.display.Sprite
	var Text=(function(_super){
		function Text(){
			this._text=null;
			this._isChanged=false;
			this._textWidth=0;
			this._textHeight=0;
			this._lines=[];
			this._startX=NaN;
			this._startY=NaN;
			this._lastVisibleLineIndex=-1;
			this._clipPoint=null;
			Text._SUPERC_.call(this);
			this._style=new CSSStyle(this);
			(this._style).wordWrap=false;
		}

		CLASS$(Text,'laya.display.Text',_super);
		var __proto__=Text.prototype;
		/**
		*@inheritDoc
		*/
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._lines=null;
		}

		/**
		*@private
		*@inheritDoc
		*
		*/
		__proto__._getBoundPointsM=function(ifRotate){
			(ifRotate===void 0)&& (ifRotate=false);
			var rec=Rectangle.temp;
			rec.setTo(0,0,this.width,this.height);
			return rec.getBoundPoints();
		}

		__proto__.getGraphicBounds=function(){
			var rec=Rectangle.temp;
			rec.setTo(0,0,this.width,this.height);
			return rec;
		}

		__proto__._getCSSStyle=function(){
			return this._style;
		}

		/**
		*渲染文字
		*@param begin 从begin行开始
		*@param visibleLineCount 渲染visibleLineCount行
		*/
		__proto__.renderText=function(begin,visibleLineCount){
			var graphics=this.graphics;
			graphics.clear();
			var ctxFont=(this.italic ? "italic " :"")+(this.bold ? "bold " :"")+this.fontSize+"px "+this.font;
			Text.ctx.font=ctxFont;
			var padding=this.padding;
			var startX=padding[0];
			var textAlgin="left";
			var lines=this._lines;
			var lineHeight=this.leading+this.fontSize;
			var startY=padding[1];
			if (this._width > 0 && this._textWidth < this._width){
				if (this.align=="right"){
					textAlgin="right";
					startX=this._width-padding[2];
					}else if (this.align=="center"){
					textAlgin="center";
					startX=this._width *0.5;
				}
			}
			if (this._height > 0){
				var tempVAlign=(this._textHeight > this._height)? "top" :this.valign;
				if (tempVAlign==="middle")startY=(this._height-visibleLineCount *lineHeight)*0.5;
				else if (tempVAlign==="bottom")startY=this._height-visibleLineCount *lineHeight-padding[3];
			};
			var style=this._style;
			if (style.backgroundColor || style.borderColor){
				graphics.drawRect(0,0,this.width,this.height,(style.backgroundColor=="")? null :style.backgroundColor,style.borderColor);
			}
			if(this._clipPoint){
				graphics.save();
				graphics.clipRect(padding[0],padding[1],this._width-padding[0]-padding[2],this._height-padding[1]-padding[3]);
			};
			var x=0,y=0;
			for (var i=begin,n=Math.min(this._lines.length,visibleLineCount+begin);i < n;i++){
				var word=lines[i];
				if (style.password){
					var len=word.length;
					word="";
					for (var j=len;j > 0;j--){
						word+="·";
					}
				}
				x=startX-(this._clipPoint ? this._clipPoint.x :0);
				y=startY+lineHeight *i-(this._clipPoint ? this._clipPoint.y :0);
				style.stroke && graphics.strokeText(word,x,y,ctxFont,style.strokeColor,style.stroke,textAlgin);
				graphics.fillText(word,x,y,ctxFont,this.color,textAlgin);
			}
			if(this._clipPoint)
				graphics.restore();
			this._startX=startX;
			this._startY=startY;
		}

		/**
		*排版文本。
		*/
		__proto__.typeset=function(){
			this._isChanged=false;
			if (!this._text){
				this._clipPoint=null;
				this._textWidth=this._textHeight=0;
				this.graphics.clear();
				return;
			}
			Text.ctx.font=this._getCSSStyle().font;
			this._lines=this.parseWordWrap(this._text);
			this._textWidth=0;
			for (var n=0,len=this._lines.length;n < len;++n){
				var word=this._lines[n];
				this._textWidth=Math.max(Text.ctx.measureText(word).width+this.padding[0]+this.padding[2],this._textWidth);
			}
			this._textHeight=this._lines.length *(this.fontSize+this.leading)-this.leading+this.padding[1]+this.padding[3];
			if ((this._textWidth > this._width || this._textHeight > this._height)&& this._width > 0 && this._height > 0)
				this._clipPoint || (this._clipPoint=new Point(0,0));
			else this._clipPoint=null;
			this.renderText(0,Math.min(this._lines.length,Math.floor((this.height-this.padding[1]-this.padding[3])/ (this.leading+this.fontSize))));
			this.repaint();
		}

		/**
		*快速更改显示文本。不进行排版计算，效率较高。
		*
		*<p>如果只更改文字内容，不更改文字样式，建议使用此接口，能提高效率。</p>
		*@param text 文本内容。
		*
		*/
		__proto__.changeText=function(text){
			if (this._text!==text){
				this._text=text;
				if (this._graphics && this._graphics.replaceText(text)){
					this.repaint();
					}else {
					this.typeset();
				}
			}
		}

		/**
		*@private
		*分析文本换行。
		*/
		__proto__.parseWordWrap=function(text){
			var lines=text.split(/\r|\n/);
			for (var i=0,n=lines.length;i < n-1;i++)
			lines[i]+="\n";
			var width=this._width;
			var ctx=laya.display.Text.ctx;
			var wordWrap=this.wordWrap;
			if (wordWrap && width <=0)width=100;
			if (width <=0 || !wordWrap)
				return lines;
			this._lines.length=0;
			var padding=this.padding;
			var result=this._lines;
			var wordWrapWidth=width-padding[0]-padding[2];
			var maybeIndex=0;
			var execResult;
			for (i=0,n=lines.length;i < n;i++){
				var word=lines[i];
				var wordWidth=0;
				var startIndex=0;
				if (ctx.measureText(word).width <=wordWrapWidth){
					result.push(word);
					continue ;
				}
				maybeIndex || (maybeIndex=Math.floor(wordWrapWidth / ctx.measureText("阳").width));
				(maybeIndex==0)&& (maybeIndex=1);
				wordWidth=ctx.measureText(word.substring(0,maybeIndex)).width;
				for (var j=maybeIndex,m=word.length;j < m;j++){
					wordWidth+=ctx.measureText(word.charAt(j)).width;
					if (wordWidth > wordWrapWidth){
						var lineString=word.substring(startIndex,j);
						execResult=/\b\w+$/.exec(lineString);
						if (execResult){
							j=execResult.index+startIndex;
							if (execResult.index==0)j+=lineString.length;
							else lineString=word.substring(startIndex,j);
						}
						result.push(lineString);
						startIndex=j;
						if (j+maybeIndex < m){
							j+=maybeIndex;
							wordWidth=ctx.measureText(word.substring(startIndex,j)).width;
							j--;
							}else {
							result.push(word.substring(startIndex,m));
							startIndex=-1;
							break ;
						}
					}
				}
				if (startIndex !=-1)result.push(word.substring(startIndex,m));
			}
			return result;
		}

		/**
		*返回字符的位置信息
		*@param charIndex 索引位置
		*@param out 输出的Point引用
		*@return 返回Point位置信息
		*/
		__proto__.getCharPoint=function(charIndex,out){
			this._isChanged && Laya.timer.runCallLater(this,this.typeset);
			var len=0,lines=this._lines,startIndex=0;
			for (var i=0,n=lines.length;i < n;i++){
				len+=lines[i].length;
				if (charIndex < len){
					var line=i;
					break ;
				}
				startIndex=len;
			};
			var ctxFont=(this.italic ? "italic " :"")+(this.bold ? "bold " :"")+this.fontSize+"px "+this.font;
			Text.ctx.font=ctxFont;
			var width=Text.ctx.measureText(this._text.substring(startIndex,charIndex)).width;
			var point=out || new Point();
			return point.setTo(this._startX+width-(this._clipPoint ? this._clipPoint.x :0),this._startY+line *(this.fontSize+this.leading)-(this._clipPoint ? this._clipPoint.y :0));
		}

		/**
		*表示文本的高度，以像素为单位。
		*@return
		*
		*/
		GETSET$(0,__proto__,'textHeight',function(){
			this._isChanged && Laya.timer.runCallLater(this,this.typeset);
			return this._textHeight;
		});

		/**
		*@inheritDoc
		*@return
		*
		*/
		GETSET$(0,__proto__,'width',function(){
			if (this._width)return this._width;
			return this.textWidth;
			},function(value){
			_super.prototype._$set_width.call(this,value);
			this.isChanged=true;
		});

		/**
		*文本的字体名称，以字符串形式表示。
		*
		*<p>默认值为："Arial"，可以通过Text.defaultFont设置默认字体。</p>
		*
		*@see Text.defaultFont
		*@return
		*
		*/
		GETSET$(0,__proto__,'font',function(){
			return this._getCSSStyle().fontFamily;
			},function(value){
			this._getCSSStyle().fontFamily=value;
			this.isChanged=true;
		});

		/**
		*@inheritDoc
		*@return
		*
		*/
		GETSET$(0,__proto__,'height',function(){
			if (this._height)return this._height;
			return this.textHeight;
			},function(value){
			_super.prototype._$set_height.call(this,value);
			this.isChanged=true;
		});

		/**
		*垂直行间距（以像素为单位）。
		*@return
		*
		*/
		GETSET$(0,__proto__,'leading',function(){
			return this._getCSSStyle().leading;
			},function(value){
			this._getCSSStyle().leading=value;
			this.isChanged=true;
		});

		/**
		*当前文本的内容字符串。
		*@return
		*
		*/
		GETSET$(0,__proto__,'text',function(){
			return this._text;
			},function(value){
			if (this._text!==value){
				this._text=value || "";
				this.isChanged=true;
				this.event(/*laya.events.Event.CHANGE*/"change");
			}
		});

		/**
		*表示文本的宽度，以像素为单位。
		*@return
		*
		*/
		GETSET$(0,__proto__,'textWidth',function(){
			this._isChanged && Laya.timer.runCallLater(this,this.typeset);
			return this._textWidth;
		});

		/**
		*指定文本的字体大小（以像素为单位）。
		*
		*<p>默认为20像素，可以通过 <code>Text.defaultSize</code> 设置默认大小。</p>
		*@return
		*
		*/
		GETSET$(0,__proto__,'fontSize',function(){
			return this._getCSSStyle().fontSize;
			},function(value){
			this._getCSSStyle().fontSize=value;
			this.isChanged=true;
		});

		/**
		*指定文本是否为粗体字。
		*
		*<p>默认值为 false，这意味着不使用粗体字。如果值为 true，则文本为粗体字。</p>
		*
		*@return
		*
		*/
		GETSET$(0,__proto__,'bold',function(){
			return this._getCSSStyle().bold;
			},function(value){
			this._getCSSStyle().bold=value;
			this.isChanged=true;
		});

		/**
		*表示文本的颜色值。可以通过 <code>Text.defaultColor</code> 设置默认颜色。
		*<p>默认值为黑色。</p>
		*@return
		*
		*/
		GETSET$(0,__proto__,'color',function(){
			return this._getCSSStyle().color;
			},function(value){
			this._getCSSStyle().color=value;
			if (!this._isChanged && this._graphics){
				this._graphics.replaceTextColor(this.color)
				}else {
				this.isChanged=true;
			}
		});

		/**
		*<p>描边颜色，以字符串表示。</p>
		*默认值为 "#000000"（黑色）;
		*@return
		*
		*/
		GETSET$(0,__proto__,'strokeColor',function(){
			return this._getCSSStyle().strokeColor;
			},function(value){
			this._getCSSStyle().strokeColor=value;
			this.isChanged=true;
		});

		/**
		*表示使用此文本格式的文本是否为斜体。
		*
		*<p>默认值为 false，这意味着不使用斜体。如果值为 true，则文本为斜体。</p>
		*@return
		*
		*/
		GETSET$(0,__proto__,'italic',function(){
			return this._getCSSStyle().italic;
			},function(value){
			this._getCSSStyle().italic=value;
			this.isChanged=true;
		});

		/**
		*表示文本的水平显示方式。
		*
		*<p><b>取值：</b>
		*<li>"left"： 居左对齐显示。</li>
		*<li>"center"： 居中对齐显示。</li>
		*<li>"right"： 居右对齐显示。</li>
		*</p>
		*@return
		*
		*/
		GETSET$(0,__proto__,'align',function(){
			return this._getCSSStyle().align;
			},function(value){
			this._getCSSStyle().align=value;
			this.isChanged=true;
		});

		/**
		*表示文本的垂直显示方式。
		*
		*<p><b>取值：</b>
		*<li>"top"： 居顶部对齐显示。</li>
		*<li>"middle"： 居中对齐显示。</li>
		*<li>"bottom"： 居底部对齐显示。</li>
		*</p>
		*@return
		*
		*/
		GETSET$(0,__proto__,'valign',function(){
			return this._getCSSStyle().valign;
			},function(value){
			this._getCSSStyle().valign=value;
			this.isChanged=true;
		});

		/**
		*表示文本是否自动换行，默认为false。
		*
		*<p>若值为true，则自动换行；否则不自动换行。</p>
		*@return
		*
		*/
		GETSET$(0,__proto__,'wordWrap',function(){
			return this._getCSSStyle().wordWrap;
			},function(value){
			this._getCSSStyle().wordWrap=value;
			this.isChanged=true;
		});

		/**
		*边距信息。
		*
		*<p>[上边距，右边距，下边距，左边距]（边距以像素为单位）。</p>
		*@return
		*
		*/
		GETSET$(0,__proto__,'padding',function(){
			return this._getCSSStyle().padding;
			},function(value){
			this._getCSSStyle().padding=value;
			this.isChanged=true;
		});

		/**
		*文本背景颜色，以字符串表示。
		*@return
		*
		*/
		GETSET$(0,__proto__,'bgColor',function(){
			return this._getCSSStyle().backgroundColor;
			},function(value){
			this._getCSSStyle().backgroundColor=value;
			this.isChanged=true;
		});

		/**
		*文本边框背景颜色，以字符串表示。
		*@return
		*
		*/
		GETSET$(0,__proto__,'borderColor',function(){
			return this._getCSSStyle().borderColor;
			},function(value){
			this._getCSSStyle().borderColor=value;
			this.isChanged=true;
		});

		/**
		*<p>描边宽度（以像素为单位）。</p>
		*默认值0，表示不描边。
		*@return
		*
		*/
		GETSET$(0,__proto__,'stroke',function(){
			return this._getCSSStyle().stroke;
			},function(value){
			this._getCSSStyle().stroke=value;
			this.isChanged=true;
		});

		/**
		*<p>指定文本字段是否是密码文本字段。</p>
		*<p>如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。</p>
		*<p>默认值为false。</p>
		*@return
		*
		*/
		GETSET$(0,__proto__,'asPassword',function(){
			return this._getCSSStyle().password;
			},function(value){
			this._getCSSStyle().password=value;
			this.isChanged=true;
		});

		/**
		*一个布尔值，表示文本的属性是否有改变。
		*@param value 是否有改变。若为true表示有改变。
		*
		*/
		GETSET$(0,__proto__,'isChanged',null,function(value){
			if (this._isChanged!==value){
				this._isChanged=value;
				value && Laya.timer.callLater(this,this.typeset);
			}
		});

		/**
		*设置横向滚动量。即使设置超出滚动范围的值，也会被自动限制在可能的最大值处。
		*/
		/**
		*获取横向滚动量
		*/
		GETSET$(0,__proto__,'scrollX',function(){
			if (!this._clipPoint)return 0;
			return this._clipPoint.x;
			},function(value){
			if (this.textWidth < this._width || !this._clipPoint)return;
			value=value < this.padding[0] ? this.padding[0] :value;
			var maxScrollX=this._textWidth-this._width;
			value=value > maxScrollX ? maxScrollX :value;
			var visibleLineCount=this._height / (this.fontSize+this.leading)| 0+1;
			this._clipPoint.x=value;
			this.renderText(this._lastVisibleLineIndex,visibleLineCount);
		});

		/**
		*设置纵向滚动量（px)。即使设置超出滚动范围的值，也会被自动限制在可能的最大值处。
		*/
		/**
		*获取纵向滚动量
		*/
		GETSET$(0,__proto__,'scrollY',function(){
			if (!this._clipPoint)return 0;
			return this._clipPoint.y;
			},function(value){
			if (this.textHeight < this._height || !this._clipPoint)return;
			value=value < this.padding[1] ? this.padding[1] :value;
			var maxScrollY=this._textHeight-this._height;
			value=value > maxScrollY ? maxScrollY :value;
			var startLine=value / (this.fontSize+this.leading)| 0;
			this._lastVisibleLineIndex=startLine;
			var visibleLineCount=this._height / (this.fontSize+this.leading)| 0+1;
			this._clipPoint.y=value;
			this.renderText(startLine,visibleLineCount);
		});

		/**
		*获取横向可滚动最大值
		*/
		GETSET$(0,__proto__,'maxScrollX',function(){
			return (this.textWidth < this._width)? 0 :this._textWidth-this._width;
		});

		/**
		*获取纵向可滚动最大值
		*/
		GETSET$(0,__proto__,'maxScrollY',function(){
			return (this.textHeight < this._height)? 0 :this._textHeight-this._height;
		});

		STATICATTR$(Text,
		['canvas',function(){return this.canvas=new HTMLCanvas('2D');},'ctx',function(){return this.ctx=Text.canvas.getContext('2d');}
		]);
		return Text;
	})(Sprite)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/stage.as
	/**
	*舞台，显示对象的根节点，单例，可以通过Laya.stage访问
	*@author yung
	*/
	//class laya.display.Stage extends laya.display.Sprite
	var Stage=(function(_super){
		function Stage(){
			this.focus=null;
			this._scaleMode="noScale";
			this._sizeMode="none";
			this._alignV="top";
			this._alignH="left";
			this._bgColor="black";
			this._mouseMoveTime=0;
			this._oldSize=null;
			Stage._SUPERC_.call(this);
			this.offset=new Point();
			this.now=Browser.now();
			this._preLoopTime=Browser.now();
			var _$this=this;
			this.mouseEnabled=true;
			this._displayInStage=true;
			this.on(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this._onmouseMove);
			Browser.window.addEventListener("resize",function(){
				_$this._onWindowResize();
			});
		}

		CLASS$(Stage,'laya.display.Stage',_super);
		var __proto__=Stage.prototype;
		__proto__._onWindowResize=function(){
			this._oldSize || (this._oldSize=new Point(this._width,this._height));
			var clientWidth=Browser.clientWidth;
			var clientHeight=Browser.clientHeight;
			var scaleX=1,scaleY=1;
			if (this.scaleMode==="showAll"){
				scaleX=scaleY=Math.min(clientWidth / this._oldSize.x,clientHeight / this._oldSize.y);
				}else if (this.scaleMode==="exactFit"){
				scaleX=clientWidth / this._oldSize.x;
				scaleY=clientHeight / this._oldSize.y;
			}
			if (scaleX===1 && scaleY===1){
				this.transform=null;
				}else {
				this.transform || (this.transform=new Matrix());
				this.transform.a=scaleX;
				this.transform.d=scaleY;
			};
			var canvas=Render.canvas;
			if (this._sizeMode==="full"){
				canvas.size(clientWidth,clientHeight);
				this._width=clientWidth / scaleX;
				this._height=clientHeight / scaleY;
				System.onStageResizeWithWebGL(this._width,this._height);
				}else {
				canvas.size(this._oldSize.x *scaleX,this._oldSize.y *scaleY);
				System.onStageResizeWithWebGL(this._width,this._height);
				this._width=this._oldSize.x;
				this._height=this._oldSize.y;
			}
			if (this.alignH==="left")this.offset.x=0
				else if (this.alignH==="right")this.offset.x=clientWidth-canvas.width;
			else this.offset.x=(clientWidth-canvas.width)*0.5;
			canvas.source.style.left=this.offset.x;
			if (this.alignV==="top")this.offset.y=0
				else if (this.alignV==="bottom")this.offset.y=clientHeight-canvas.height;
			else this.offset.y=(clientHeight-canvas.height)*0.5;
			canvas.source.style.top=this.offset.y;
			this.event(/*laya.events.Event.RESIZE*/"resize");
		}

		__proto__.repaint=function(){
			this._repaint=1;
		}

		__proto__.parentRepaint=function(){}
		__proto__.loop=function(){
			this.render(Render.context,0,0);
		}

		__proto__._onmouseMove=function(e){
			this._mouseMoveTime=Browser.now();
		}

		/**@inheritDoc */
		__proto__.render=function(context,x,y){
			Stat.loopCount++;
			var loopTime=this.now=Browser.now();
			Stat.loopCount % 10==0 && ResourceMgr.autoRelease.tidy();
			var delay=Sprite.DELAY=loopTime-this._preLoopTime;
			var type=Config.frameRate===/*Config.FRAME_AUTO*/"auto" ? (((loopTime-this._mouseMoveTime)< 2000 || (delay)> 1000 / 30)? /*Config.FRAME_FAST*/"fast" :/*Config.FRAME_SLOW*/"slow"):Config.frameRate;
			this._preLoopTime=loopTime;
			if (type!==/*Config.FRAME_SLOW*/"slow" || Stat.loopCount % 2===0){
				Laya.timer._update();
				Render.isWebGl ? Render.context.clear():Render.clear(this._bgColor);
				_super.prototype.render.call(this,context,x,y);
			}
			if (type!==/*Config.FRAME_SLOW*/"slow" || Stat.loopCount % 2==1){
				Render.isWebGl && Render.clear(this._bgColor);
				context.flush();
			}
		}

		/**缩放模式：支持"noScale"(不缩放)，"exactFit"(全屏缩放)，"showAll"(显示全部，最小比例缩放)三种，默认为"noScale"*/
		GETSET$(0,__proto__,'scaleMode',function(){
			return this._scaleMode;
			},function(value){
			this._scaleMode=value;
			Laya.timer.callLater(this,this._onWindowResize);
		});

		/**舞台的背景颜色，默认为黑色，null为透明*/
		GETSET$(0,__proto__,'bgColor',function(){
			return this._bgColor;
			},function(value){
			this._bgColor=value;
			if (value)Render.canvas.source.style.background=value;
			else Render.canvas.source.style.background="none";
		});

		GETSET$(0,__proto__,'sizeMode',function(){
			return this._sizeMode;
			},function(value){
			this._sizeMode=value;
			Laya.timer.callLater(this,this._onWindowResize);
		});

		/**水平对齐方式：支持:"left","center","right"三种方式，默认为"left"*/
		GETSET$(0,__proto__,'alignH',function(){
			return this._alignH;
			},function(value){
			this._alignH=value;
			Laya.timer.callLater(this,this._onWindowResize);
		});

		/**垂直对齐方式：支持:"top","middle","bottom"三种方式，默认为"top"*/
		GETSET$(0,__proto__,'alignV',function(){
			return this._alignV;
			},function(value){
			this._alignV=value;
			Laya.timer.callLater(this,this._onWindowResize);
		});

		/**鼠标在Stage的X坐标*/
		GETSET$(0,__proto__,'mouseX',function(){
			return MouseManager.instance.mouseX / this.clientScaleX;
		});

		/**鼠标在Stage的Y坐标*/
		GETSET$(0,__proto__,'mouseY',function(){
			return MouseManager.instance.mouseY / this.clientScaleY;
		});

		GETSET$(0,__proto__,'clientScaleX',function(){
			return this._transform ? this._transform.a :1;
		});

		GETSET$(0,__proto__,'clientScaleY',function(){
			return this._transform ? this._transform.d :1;
		});

		Stage.SCALE_NOSCALE="noScale";
		Stage.SCALE_EXACTFIT="exactFit";
		Stage.SCALE_SHOWALL="showAll";
		Stage.SIZE_NONE="none";
		Stage.SIZE_FULL="full";
		Stage.ALIGN_LEFT="left";
		Stage.ALIGN_RIGHT="right";
		Stage.ALIGN_CENTER="center";
		Stage.ALIGN_TOP="top";
		Stage.ALIGN_MIDDLE="middle";
		Stage.ALIGN_BOTTOM="bottom";
		return Stage;
	})(Sprite)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/value/glowsv.as
	//class laya.webgl.shader.d2.value.GlowSV extends laya.webgl.shader.d2.value.TextureSV
	var GlowSV=(function(_super){
		function GlowSV(){
			this.u_blurX=false;
			this.u_color=null;
			this.u_offset=null;
			this.u_strength=NaN;
			GlowSV._SUPERC_.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.FILTERGLOW*/0x08| /*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01);
		}

		CLASS$(GlowSV,'laya.webgl.shader.d2.value.GlowSV',_super);
		var __proto__=GlowSV.prototype;
		__proto__.setValue=function(vo){
			_super.prototype.setValue.call(this,vo);
		}

		__proto__.clear=function(){
			_super.prototype.clear.call(this);
		}

		return GlowSV;
	})(TextureSV)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/webgl/src/laya/webgl/shader/d2/value/textsv.as
	//class laya.webgl.shader.d2.value.TextSV extends laya.webgl.shader.d2.value.TextureSV
	var TextSV=(function(_super){
		function TextSV(){
			this.colorAdd=null;
			TextSV._SUPERC_.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40);
			this.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40);
		}

		CLASS$(TextSV,'laya.webgl.shader.d2.value.TextSV',_super);
		var __proto__=TextSV.prototype;
		__proto__.setValue=LAYAFNVOID/*function(vo){}*/
		__proto__.release=function(){
			TextSV.pool[TextSV._length++]=this;
			this.clear();
		}

		__proto__.clear=function(){
			_super.prototype.clear.call(this);
		}

		TextSV.create=function(){
			if (TextSV._length)return TextSV.pool[--TextSV._length];
			else return new TextSV();
		}

		TextSV.pool=[];
		TextSV._length=0;
		return TextSV;
	})(TextureSV)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/box.as
	/**
	*<code>Box</code> 类是一个控件容器类。
	*@author yung
	*/
	//class laya.ui.Box extends laya.ui.Component
	var Box=(function(_super){
		function Box(){Box._SUPERC_.call(this);;
		};

		CLASS$(Box,'laya.ui.Box',_super);
		var __proto__=Box.prototype;
		LAYABOX.implements(__proto__,{"laya.ui.IBox":true})
		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			for (var name in value){
				var comp=this.getChildByName(name);
				if (comp)comp.dataSource=value[name];
				else if (this.hasOwnProperty(name))this[name]=value[name];
			}
		});

		return Box;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/core/src/laya/display/input.as
	/**
	*输入框
	*@author yung
	*/
	//class laya.display.Input extends laya.display.Text
	var Input=(function(_super){
		function Input(){
			this._focus=false;
			this._multiline=false;
			Input._SUPERC_.call(this);
			this.multiline=false;
			this.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onMouseDown);
			this.on(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this.onUnDisplay);
			Laya.stage.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onStageDown);
		}

		CLASS$(Input,'laya.display.Input',_super);
		var __proto__=Input.prototype;
		__proto__.initInput=function(input){
			var style=input.style;
			style.cssText=Input.cssStyle;
			input.addEventListener('input',function(e){
				if (!input.target)return;
				input.target._text=input.value;
				input.target.event(/*laya.events.Event.INPUT*/"input");
			});
			input.addEventListener('mousedown',function(e){
				e.stopPropagation();
			});
		}

		__proto__.onStageDown=function(e){
			this.focus=false;
		}

		__proto__.onUnDisplay=function(e){
			this.focus=false;
		}

		__proto__.onMouseDown=function(e){
			this.focus=true;
			e.stopPropagation();
		}

		__proto__.render=function(context,x,y){
			laya.display.Sprite.prototype.render.call(this,context,x,y);
		}

		//_focus && _updatePos();
		__proto__._updatePos=function(){
			var style=this.nativeInput.style;
			var stage=Laya.stage;
			var rec;
			rec=Utils.getGlobalPosAndScale(this);
			style.left=(rec.x)*stage.clientScaleX+stage.offset.x;
			style.top=(rec.y)*stage.clientScaleY+stage.offset.y;
			if (!this._getVisible())this.focus=false;
			if (stage.transform || rec.width !=1 || rec.height !=1){
				var ts="scale("+stage.clientScaleX *rec.width+","+stage.clientScaleY *rec.height+")";
				if (ts !=style.transform){
					style.transformOrigin="0 0";
					style.transform=ts;
				}
			}
		}

		//input.style.oTransform="scale("+ts+")";
		__proto__._getVisible=function(){
			var target=this;
			while (target){
				if (target.visible===false)return false;
				target=target.parent;
			}
			return true;
		}

		__proto__.onKeyDown=function(e){
			if (e.keyCode===13)this.event(/*laya.events.Event.ENTER*/"enter");
		}

		/**是否是多行输入框*/
		GETSET$(0,__proto__,'multiline',function(){
			return this._multiline;
			},function(value){
			this._multiline=value;
			this.valign=value ? "top" :"middle";
			if (value){
				Input.area || this.initInput(Input.area=Browser.createElement("textarea"));
				}else {
				Input.input || this.initInput(Input.input=Browser.createElement("input"));
			}
		});

		GETSET$(0,__proto__,'nativeInput',function(){
			return this._multiline ? Input.area :Input.input;
		});

		GETSET$(0,__proto__,'focus',function(){
			return this._focus;
			},function(value){
			if (this._focus!==value){
				this._focus=value;
				var input=this.nativeInput;
				if (input.target && input.target !=this){
					input.target.focus=false;
				}
				if (value){
					input.target=this;
					var cssText=Input.cssStyle;
					cssText+=";width:"+this._width+"px";
					cssText+=";height:"+this._height+"px";
					cssText+=";color:"+this.color;
					cssText+=";font-family:"+this.font;
					cssText+=";font-size:"+this.fontSize+"px";
					cssText+=";line-height:"+(this.leading+this.fontSize)+"px";
					cssText+=";font-weight:"+(this.bold ? "bold" :"normal");
					cssText+=";font-style:"+(this.italic ? "italic" :"normal");
					cssText+=";text-align:"+this.align;
					cssText+=";word-break:"+(this.wordWrap ? "break-word" :"normal");
					var padding=this.padding;
					cssText+=";padding:"+padding[1]+"px "+padding[2]+"px "+padding[3]+"px "+padding[0]+"px";
					Browser.document.body.appendChild(input);
					input.style.cssText=cssText;
					this._updatePos();
					input.type=this.asPassword ? "password" :"input";
					input.value=this._text || "";
					input.focus();
					Laya.stage.off(/*laya.events.Event.KEY_DOWN*/"keydown",this,this.onKeyDown);
					Laya.stage.on(/*laya.events.Event.KEY_DOWN*/"keydown",this,this.onKeyDown);
					Laya.stage.focus=this;
					this.event(/*laya.events.Event.FOCUS*/"focus");
					this.text="";
					}else {
					this._text=input.value+"1";
					this.text=input.value;
					input.target=null;
					Browser.document.body.removeChild(input);
					Laya.stage.off(/*laya.events.Event.KEY_DOWN*/"keydown",this,this.onKeyDown);
					Laya.stage.focus=null;
					this.event(/*laya.events.Event.BLUR*/"blur");
				}
			}
		});

		Input.cssStyle="position:absolute;background-color:transparent;border:none;outline:none;";
		Input.input=null
		Input.area=null
		return Input;
	})(Text)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/button.as
	/**
	*<code>Button</code> 组件用来表示常用的多态按钮。 <code>Button</code> 组件可显示文本标签、图标或同时显示两者。
	*
	*<p>可以是单态，两态和三态，默认三态(up,over,down)。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Button</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Button;
		*import laya.utils.Handler;
		*
		*public class Button_Example
		*{
			*public function Button_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/button.png",new Handler(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*trace("资源加载完成！");
				*var button:Button=new Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,并传入它的皮肤。
				*button.x=100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
				*button.y=100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
				*button.clickHandler=new Handler(this,onClickButton,[button]);//设置 button 的点击事件处理器。
				*Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
				*}
			*
			*private function onClickButton(button:Button):void
			*{
				*trace("按钮button被点击了！");
				*}
			*}
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式。
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
	*Laya.loader.load("resource/ui/button.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete()
	*{
		*console.log("资源加载完成！");
		*var button=new laya.ui.Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,传入它的皮肤skin和标签label。
		*button.x=100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
		*button.y=100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
		*button.clickHandler=laya.utils.Handler.create(this,onClickButton,[button],false);//设置 button 的点击事件处理函数。
		*Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
		*}
	*function onClickButton(button)
	*{
		*console.log("按钮被点击了。",button);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.Button extends laya.ui.Component
	var Button=(function(_super){
		function Button(skin,label){
			this.disabled=false;
			this.toggle=false;
			this._bitmap=null;
			this._text=null;
			this._state=0;
			this._selected=false;
			this._skin=null;
			this._autoSize=true;
			this._sources=null;
			this._clickHandler=null;
			Button._SUPERC_.call(this);
			this._labelColors=Styles.buttonLabelColors;
			this._stateNum=Styles.buttonStateNum;
			(label===void 0)&& (label="");
			this.skin=skin;
			this.label=label;
		}

		CLASS$(Button,'laya.ui.Button',_super);
		var __proto__=Button.prototype;
		LAYABOX.implements(__proto__,{"laya.ui.ISelect":true})
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._bitmap && this._bitmap.destroy();
			this._text && this._text.destroy(destroyChild);
			this._sources && (this._sources.length=0);
			this._bitmap=null;
			this._text=null;
			this._clickHandler=null;
			this._labelColors=this._sources=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.graphics=this._bitmap=new AutoBitmap();
			this.addChild(this._text=new Text());
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			this._text.align="center";
			this._text.valign="middle";
			this.on(/*laya.events.Event.MOUSE_OVER*/"mouseover",this,this.onMouse);
			this.on(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onMouse);
			this.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onMouse);
			this.on(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onMouse);
			this.on(/*laya.events.Event.CLICK*/"click",this,this.onMouse);
		}

		/**
		*对象的 <code>Event.MOUSE_OVER、Event.MOUSE_OUT、Event.MOUSE_DOWN、Event.MOUSE_UP、Event.CLICK</code> 事件侦听处理函数。
		*
		*@param e
		*/
		__proto__.onMouse=function(e){
			if ((this.toggle===false && this._selected)|| this.disabled)return;
			if (e.type===/*laya.events.Event.CLICK*/"click"){
				this.toggle && (this.selected=!this._selected);
				this._clickHandler && this._clickHandler.run();
				return;
			}
			!this._selected && (this.state=Button.stateMap[e.type]);
		}

		/**
		*@private
		*对象的资源切片发生改变。
		*/
		__proto__.changeClips=function(){
			var img=Loader.getRes(this._skin);
			if (!img){
				console.log("lose skin",this._skin);
				return;
			}
			this._sources || (this._sources=[]);
			this._sources.length=0;
			var width=img.width;
			var height=img.height / this._stateNum;
			for (var i=0;i < this._stateNum;i++){
				this._sources.push(Texture.create(img,0,height *i,width,height));
			}
			if (this._autoSize){
				this._text.width=this._width || width;
				this._text.height=this._height || height;
				}else {
				this._text.x=width;
			}
		}

		/**
		*@private
		*改变对象的状态。
		*/
		__proto__.changeState=function(){
			this.runCallLater(this.changeClips);
			var index=this._state < this._stateNum ? this._state :this._stateNum-1;
			this._sources && (this._bitmap.source=this._sources[index]);
			this._text.color=this._labelColors[this._state];
		}

		/**
		*<p>对象的皮肤资源地址。</p>
		*支持单态，两态和三态，用 <code>stateNum</code> 属性设置
		*
		*<p>对象的皮肤地址，以字符串表示。</p>
		*
		*@see #stateNum
		*@return
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this.callLater(this.changeClips);
				this.callLater(this.changeState);
			}
		});

		/**
		*对象的状态值。
		*
		*@see #stateMap
		*/
		GETSET$(0,__proto__,'state',function(){
			return this._state;
			},function(value){
			if (this._state !=value){
				this._state=value;
				this.callLater(this.changeState);
			}
		});

		/**
		*按钮的文本内容。
		*@return
		*/
		GETSET$(0,__proto__,'label',function(){
			return this._text.text;
			},function(value){
			if (this._text.text !=value){
				this._text.text=value;
				this.callLater(this.changeState);
			}
		});

		/**
		*<p>指定对象的状态值，以数字表示。</p>
		*<p>默认值为3。此值决定皮肤资源图片的切割方式。</p>
		*<p><b>取值：</b>
		*<li>1：单态。图片不做切割，按钮的皮肤状态只有一种。</li>
		*<li>2：两态。图片将以竖直方向被等比切割为2部分，从上向下，依次为
		*弹起状态皮肤、
		*按下和经过及选中状态皮肤。</li>
		*<li>3：三态。图片将以竖直方向被等比切割为2部分，从上向下，依次为
		*弹起状态皮肤、
		*经过状态皮肤、
		*按下和选中状态皮肤</li>
		*</p>
		*@return
		*/
		GETSET$(0,__proto__,'stateNum',function(){
			return this._stateNum;
			},function(value){
			if (this._stateNum !=value){
				this._stateNum=value < 1 ? 1 :value > 3 ? 3 :value;
				this.callLater(this.changeClips);
			}
		});

		/**
		*@inheritDoc
		*@return
		*/
		GETSET$(0,__proto__,'measureHeight',function(){
			this.runCallLater(this.changeClips);
			return this._text.height;
		});

		/**
		*@inheritDoc
		*/
		GETSET$(0,__proto__,'measureWidth',function(){
			this.runCallLater(this.changeClips);
			if (this._autoSize)return this._text.width;
			this.runCallLater(this.changeState);
			return this._bitmap.width+this._text.width;
		});

		/**
		*表示按钮的选中状态。
		*
		*<p>如果值为true，表示该对象处于选中状态。否则该对象处于未选中状态。</p>
		*@return
		*/
		GETSET$(0,__proto__,'selected',function(){
			return this._selected;
			},function(value){
			if (this._selected !=value){
				this._selected=value;
				this.state=this._selected ? 2 :0;
				this.event(/*laya.events.Event.CHANGE*/"change");
			}
		});

		/**
		*表示按钮各个状态下的文本颜色。
		*
		*<p><b>格式:</b> "upColor,overColor,downColor,disableColor"。</p>
		*@return
		*/
		GETSET$(0,__proto__,'labelColors',function(){
			return this._labelColors.join(",");
			},function(value){
			this._labelColors=UIUtils.fillArray(this._labelColors,value,String);
			this.callLater(this.changeState);
		});

		/**
		*表示按钮文本标签的边距。
		*
		*<p><b>格式：</b>"左边距,上边距,右边距,下边距"。</p>
		*@return
		*/
		GETSET$(0,__proto__,'labelPadding',function(){
			return this._text.padding.join(",");
			},function(value){
			this._text.padding=UIUtils.fillArray(Styles.labelMargin,value,Number);
		});

		/**
		*表示按钮文本标签的字体大小。
		*
		*@see laya.display.Text.fontSize()
		*@return
		*/
		GETSET$(0,__proto__,'labelSize',function(){
			return this._text.fontSize;
			},function(value){
			this._text.fontSize=value
		});

		/**
		*表示按钮文本标签是否为粗体字。
		*
		*@see laya.display.Text.bold()
		*@return
		*/
		GETSET$(0,__proto__,'labelBold',function(){
			return this._text.bold;
			},function(value){
			this._text.bold=value;
		});

		/**标签对齐模式，默认为居中对齐*/
		GETSET$(0,__proto__,'labelAlign',function(){
			return this._text.align;
			},function(value){
			this._text.align=value;
		});

		/**
		*表示按钮文本标签的字体名称，以字符串形式表示。
		*
		*@see laya.display.Text.font()
		*@return
		*/
		GETSET$(0,__proto__,'labelFont',function(){
			return this._text.font;
			},function(value){
			this._text.font=value;
		});

		/**
		*对象的点击事件处理器函数（无默认参数）。
		*@return
		*/
		GETSET$(0,__proto__,'clickHandler',function(){
			return this._clickHandler;
			},function(value){
			this._clickHandler=value;
		});

		/**
		*按钮文本标签 <code>Text</code> 控件。
		*@return
		*/
		GETSET$(0,__proto__,'text',function(){
			return this._text;
		});

		/**
		*<p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			if (this._bitmap.sizeGrid)return this._bitmap.sizeGrid.join(",");
			return null;
			},function(value){
			this._bitmap.sizeGrid=UIUtils.fillArray(Styles.defaultSizeGrid,value,Number);
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			if (this._autoSize){
				this._bitmap.width=value;
				this._text.width=value;
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			if (this._autoSize){
				this._bitmap.height=value;
				this._text.height=value;
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.label=value+"";
			else _super.prototype._$set_dataSource.call(this,value);
		});

		STATICATTR$(Button,
		['stateMap',function(){return this.stateMap={"mouseup":0,"mouseover":1,"mousedown":2,"mouseout":0};}
		]);
		return Button;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/clip.as
	/**
	*<p> <code>Clip</code> 类是位图切片动画。</p>
	*<p> <code>Clip</code> 可将一张图片，按横向分割数量 <code>clipX</code> 、竖向分割数量 <code>clipY</code> ，
	*或横向分割每个切片的宽度 <code>clipWidth</code> 、竖向分割每个切片的高度 <code>clipHeight</code> ，
	*从左向右，从上到下，分割组合为一个切片动画。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Clip</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Clip;
		*
		*public class Clip_Example
		*{
			*private var clip:Clip;
			*
			*public function Clip_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*onInit();
				*}
			*
			*private function onInit():void
			*{
				*clip=new Clip("resource/ui/clip_num.png",10,1);//创建一个 Clip 类的实例对象 clip ,传入它的皮肤skin和横向分割数量、竖向分割数量。
				*clip.autoPlay=true;//设置 clip 动画自动播放。
				*clip.interval=100;//设置 clip 动画的播放时间间隔。
				*clip.x=100;//设置 clip 对象的属性 x 的值，用于控制 clip 对象的显示位置。
				*clip.y=100;//设置 clip 对象的属性 y 的值，用于控制 clip 对象的显示位置。
				*clip.on(Event.CLICK,this,onClick);//给 clip 添加点击事件函数侦听。
				*Laya.stage.addChild(clip);//将此 clip 对象添加到显示列表。
				*}
			*
			*private function onClick():void
			*{
				*trace("clip 的点击事件侦听处理函数。clip.total="+clip.total);
				*if (clip.isPlaying==true)
				*{
					*clip.stop();//停止动画。
					*}else {
					*clip.play();//播放动画。
					*}
				*}
			*}
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var clip;
	*Laya.loader.load("resource/ui/clip_num.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*
	*function loadComplete(){
		*console.log("资源加载完成！");
		*clip=new laya.ui.Clip("resource/ui/clip_num.png",10,1);//创建一个 Clip 类的实例对象 clip ,传入它的皮肤skin和横向分割数量、竖向分割数量。
		*clip.autoPlay=true;//设置 clip 动画自动播放。
		*clip.interval=100;//设置 clip 动画的播放时间间隔。
		*clip.x=100;//设置 clip 对象的属性 x 的值，用于控制 clip 对象的显示位置。
		*clip.y=100;//设置 clip 对象的属性 y 的值，用于控制 clip 对象的显示位置。
		*clip.on(Event.CLICK,this,onClick);//给 clip 添加点击事件函数侦听。
		*Laya.stage.addChild(clip);//将此 clip 对象添加到显示列表。
		*}
	*function onClick()
	*{
		*console.log("clip 的点击事件侦听处理函数。");
		*if(clip.isPlaying==true)
		*{
			*clip.stop();
			*}else {
			*clip.play();
			*}
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.Clip extends laya.ui.Component
	var Clip=(function(_super){
		function Clip(url,clipX,clipY){
			this._sources=null;
			this._bitmap=null;
			this._skin=null;
			this._clipX=1;
			this._clipY=1;
			this._clipWidth=0;
			this._clipHeight=0;
			this._autoPlay=false;
			this._interval=50;
			this._complete=null;
			this._isPlaying=false;
			this._index=0;
			Clip._SUPERC_.call(this);
			(clipX===void 0)&& (clipX=1);
			(clipY===void 0)&& (clipY=1);
			this._clipX=clipX;
			this._clipY=clipY;
			this.skin=url;
		}

		CLASS$(Clip,'laya.ui.Clip',_super);
		var __proto__=Clip.prototype;
		/**
		*
		*@inheritDoc
		*/
		__proto__.destroy=function(clearFromCache){
			(clearFromCache===void 0)&& (clearFromCache=false);
			_super.prototype.destroy.call(this,true);
			this._bitmap && this._bitmap.destroy();
			this._bitmap=null;
			this._sources=null;
		}

		/**
		*释放实例加载的皮肤资源。
		*/
		__proto__.dispose=function(){
			this.destroy(true);
			Laya.loader.clearRes(this._skin);
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.graphics=this._bitmap=new AutoBitmap();
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			this.on(/*laya.events.Event.DISPLAY*/"display",this,this._onDisplay);
			this.on(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this._onDisplay);
		}

		/**
		*@private
		*
		*@param e
		*/
		__proto__._onDisplay=function(e){
			if (this._isPlaying){
				if (this._displayInStage)this.play();
				else this.stop();
				}else if (this._autoPlay && this._displayInStage){
				this.play();
			}
		}

		/**
		*@private
		*改变切片的资源、切片的大小。
		*/
		__proto__.changeClip=function(){
			var img=Loader.getRes(this._skin);
			if (img){
				this.loadComplete(this._skin,img);
				}else {
				Laya.loader.load(this._skin,Handler.create(this,this.loadComplete,[this._skin]));
			}
		}

		/**
		*@private
		*加载切片图片资源完成函数。
		*@param url 资源地址
		*@param img 纹理
		*/
		__proto__.loadComplete=function(url,img){
			if (url===this._skin && img){
				this._clipWidth || (this._clipWidth=Math.ceil(img.width / this._clipX));
				this._clipHeight || (this._clipHeight=Math.ceil(img.height / this._clipY));
				this._sources || (this._sources=[]);
				for (var i=0;i < this._clipY;i++){
					for (var j=0;j < this._clipX;j++){
						this._sources.push(Texture.create(img,this._clipWidth *j,this._clipHeight *i,this._clipWidth,this._clipHeight));
					}
				}
				this.index=this._index;
				this.event(/*laya.events.Event.LOADED*/"loaded");
			}
		}

		/**
		*播放动画。
		*/
		__proto__.play=function(){
			this._isPlaying=true;
			this._index=0;
			Laya.timer.loop(this.interval,this,this._loop,null,true);
		}

		/**
		*@private
		*/
		__proto__._loop=function(){
			if (this._style.visible){
				this.index=this._index,this._index++;
				this._index >=this._sources.length && (this._index=0);
			}
		}

		/**
		*停止动画。
		*/
		__proto__.stop=function(){
			this._isPlaying=false;
			Laya.timer.clear(this,this._loop);
		}

		/**
		*表示是否自动播放动画，若自动播放值为true,否则值为false;
		*<p>可控制切片动画的播放、停止。</p>
		*/
		GETSET$(0,__proto__,'autoPlay',function(){
			return this._autoPlay;
			},function(value){
			if (this._autoPlay !=value){
				this._autoPlay=value;
				value ? this.play():this.stop();
			}
		});

		/**X轴（横向）切片数量。*/
		GETSET$(0,__proto__,'clipX',function(){
			return this._clipX;
			},function(value){
			this._clipX=value;
			this.callLater(this.changeClip);
		});

		/**
		*@copy laya.ui.Image#skin
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._skin;
			},function(value){
			this._skin=value;
			this.callLater(this.changeClip);
		});

		/**
		*源数据。
		*/
		GETSET$(0,__proto__,'sources',function(){
			return this._sources;
			},function(value){
			this._sources=value;
			this.index=this._index;
			this.event(/*laya.events.Event.LOADED*/"loaded");
		});

		/**Y轴(竖向)切片数量。*/
		GETSET$(0,__proto__,'clipY',function(){
			return this._clipY;
			},function(value){
			this._clipY=value;
			this.callLater(this.changeClip);
		});

		/**
		*横向分割时每个切片的宽度，与 <code>clipX</code> 同时设置时优先级高于 <code>clipX</code> 。
		*/
		GETSET$(0,__proto__,'clipWidth',function(){
			return this._clipWidth;
			},function(value){
			this._clipWidth=value;
			this.callLater(this.changeClip);
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureWidth',function(){
			this.runCallLater(this.changeClip);
			return this._bitmap.width;
		});

		/**
		*竖向分割时每个切片的高度，与 <code>clipY</code> 同时设置时优先级高于 <code>clipY</code> 。
		*/
		GETSET$(0,__proto__,'clipHeight',function(){
			return this._clipHeight;
			},function(value){
			this._clipHeight=value;
			this.callLater(this.changeClip);
		});

		/**
		*切片动画的总帧数。
		*/
		GETSET$(0,__proto__,'total',function(){
			this.runCallLater(this.changeClip);
			return this._sources ? this._sources.length :0;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._bitmap.width=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._bitmap.height=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureHeight',function(){
			this.runCallLater(this.changeClip);
			return this._bitmap.height;
		});

		/**
		*<p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			if (this._bitmap.sizeGrid)return this._bitmap.sizeGrid.join(",");
			return null;
			},function(value){
			this._bitmap.sizeGrid=UIUtils.fillArray(Styles.defaultSizeGrid,value,Number);
		});

		/**
		*当前帧索引。
		*/
		GETSET$(0,__proto__,'index',function(){
			return this._index;
			},function(value){
			this._index=value;
			this._bitmap&&this._sources && (this._bitmap.source=this._sources[value]);
			this.event(/*laya.events.Event.CHANGE*/"change");
		});

		/**
		*表示动画播放间隔时间(以毫秒为单位)。
		*/
		GETSET$(0,__proto__,'interval',function(){
			return this._interval;
			},function(value){
			if (this._interval !=value){
				this._interval=value;
				if (this._isPlaying)this.play();
			}
		});

		/**
		*表示动画的当前播放状态。
		*如果动画正在播放中，则为true，否则为flash。
		*/
		GETSET$(0,__proto__,'isPlaying',function(){
			return this._isPlaying;
			},function(value){
			this._isPlaying=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string'))this.index=LAYABOX.parseInt(value);
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*<code>AutoBitmap</code> 位图实例。
		*/
		GETSET$(0,__proto__,'bitmap',function(){
			return this._bitmap;
		});

		return Clip;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/colorpicker.as
	/**
	*<code>ColorPicker</code> 组件将显示包含多个颜色样本的列表，用户可以从中选择颜色。
	*
	*@example 以下示例代码，创建了一个 <code>ColorPicker</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.ColorPicker;
		*import laya.utils.Handler;
		*
		*public class ColorPicker_Example
		*{
			*
			*public function ColorPicker_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/color.png",new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*trace("资源加载完成！");
				*var colorPicket:ColorPicker=new ColorPicker();//创建一个 ColorPicker 类的实例对象 colorPicket 。
				*colorPicket.skin="resource/ui/color.png";//设置 colorPicket 的皮肤。
				*colorPicket.x=100;//设置 colorPicket 对象的属性 x 的值，用于控制 colorPicket 对象的显示位置。
				*colorPicket.y=100;//设置 colorPicket 对象的属性 y 的值，用于控制 colorPicket 对象的显示位置。
				*colorPicket.changeHandler=new Handler(this,onChangeColor,[colorPicket]);//设置 colorPicket 的颜色改变回调函数。
				*Laya.stage.addChild(colorPicket);//将此 colorPicket 对象添加到显示列表。
				*}
			*private function onChangeColor(colorPicket:ColorPicker):void
			*{
				*trace("当前选择的颜色： "+colorPicket.selectedColor);
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.load("resource/ui/color.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete()
	*{
		*console.log("资源加载完成！");
		*var colorPicket=new laya.ui.ColorPicker();//创建一个 ColorPicker 类的实例对象 colorPicket 。
		*colorPicket.skin="resource/ui/color.png";//设置 colorPicket 的皮肤。
		*colorPicket.x=100;//设置 colorPicket 对象的属性 x 的值，用于控制 colorPicket 对象的显示位置。
		*colorPicket.y=100;//设置 colorPicket 对象的属性 y 的值，用于控制 colorPicket 对象的显示位置。
		*colorPicket.changeHandler=laya.utils.Handler.create(this,onChangeColor,[colorPicket],false);//设置 colorPicket 的颜色改变回调函数。
		*Laya.stage.addChild(colorPicket);//将此 colorPicket 对象添加到显示列表。
		*}
	*function onChangeColor(colorPicket)
	*{
		*trace("当前选择的颜色： "+colorPicket.selectedColor);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*@author yung
	*/
	//class laya.ui.ColorPicker extends laya.ui.Component
	var ColorPicker=(function(_super){
		function ColorPicker(){
			this.changeHandler=null;
			this._gridSize=11;
			this._bgColor="#ffffff";
			this._borderColor="#000000";
			this._inputColor="#000000";
			this._inputBgColor="#efefef";
			this._colorPanel=null;
			this._colorTiles=null;
			this._colorBlock=null;
			this._colorInput=null;
			this._colorButton=null;
			this._colors=[];
			this._selectedColor="#000000";
			ColorPicker._SUPERC_.call(this);
		}

		CLASS$(ColorPicker,'laya.ui.ColorPicker',_super);
		var __proto__=ColorPicker.prototype;
		/**
		*@inheritDoc
		*/
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._colorPanel && this._colorPanel.destroy(destroyChild);
			this._colorButton && this._colorButton.destroy(destroyChild);
			this._colorPanel=null;
			this._colorTiles=null;
			this._colorBlock=null;
			this._colorInput=null;
			this._colorButton=null;
			this._colors=null;
			this.changeHandler=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._colorButton=new Button());
			this._colorPanel=new Box();
			this._colorPanel.size(230,166);
			this._colorPanel.addChild(this._colorTiles=new Sprite());
			this._colorPanel.addChild(this._colorBlock=new Sprite());
			this._colorPanel.addChild(this._colorInput=new Input());
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			this._colorButton.on(/*laya.events.Event.CLICK*/"click",this,this.onColorButtonClick);
			this._colorBlock.pos(5,5);
			this._colorInput.pos(60,5);
			this._colorInput.size(60,20);
			this._colorInput.on(/*laya.events.Event.CHANGE*/"change",this,this.onColorInputChange);
			this._colorInput.on(/*laya.events.Event.KEY_DOWN*/"keydown",this,this.onColorFieldKeyDown);
			this._colorTiles.pos(5,30);
			this._colorTiles.on(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this.onColorTilesMouseMove);
			this._colorTiles.on(/*laya.events.Event.CLICK*/"click",this,this.onColorTilesClick);
			this._colorTiles.size(20 *this._gridSize,12 *this._gridSize);
			this._colorPanel.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onPanelMouseDown);
			this.bgColor=this._bgColor;
		}

		__proto__.onPanelMouseDown=function(e){
			e.stopPropagation();
		}

		/**
		*改变颜色样本列表面板。
		*/
		__proto__.changePanel=function(){
			var g=this._colorPanel.graphics;
			g.clear();
			g.drawRect(0,0,230,166,this._bgColor,this._borderColor);
			this.drawBlock(this._selectedColor);
			this._colorInput.borderColor=this._borderColor;
			this._colorInput.bgColor=this._inputBgColor;
			this._colorInput.color=this._inputColor;
			g=this._colorTiles.graphics;
			g.clear();
			var mainColors=[0x000000,0x333333,0x666666,0x999999,0xCCCCCC,0xFFFFFF,0xFF0000,0x00FF00,0x0000FF,0xFFFF00,0x00FFFF,0xFF00FF];
			for (var i=0;i < 12;i++){
				for (var j=0;j < 20;j++){
					var color=0;
					if (j===0)color=mainColors[i];
					else if (j===1)color=0x000000;
					else color=(((i *3+j / 6)% 3 << 0)+((i / 6)<< 0)*3)*0x33 << 16 | j % 6 *0x33 << 8 | (i << 0)% 6 *0x33;
					var strColor=UIUtils.toColor(color);
					this._colors.push(strColor);
					var x=j *this._gridSize;
					var y=i *this._gridSize;
					g.drawRect(x,y,this._gridSize,this._gridSize,strColor,"#000000");
				}
			}
		}

		/**
		*颜色样本列表面板的显示按钮的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto__.onColorButtonClick=function(e){
			if (this._colorPanel.parent)this.close();
			else this.open();
		}

		/**
		*打开颜色样本列表面板。
		*/
		__proto__.open=function(){
			var p=this.localToGlobal(new Point());
			var px=p.x+this._colorPanel.width <=Laya.stage.width ? p.x :Laya.stage.width-this._colorPanel.width;
			var py=p.y+this._colorButton.height;
			py=py+this._colorPanel.height <=Laya.stage.height ? py :p.y-this._colorPanel.height;
			this._colorPanel.pos(px,py);
			Laya.stage.addChild(this._colorPanel);
			Laya.stage.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.removeColorBox);
		}

		/**
		*关闭颜色样本列表面板。
		*/
		__proto__.close=function(){
			Laya.stage.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.removeColorBox);
			this._colorPanel.removeSelf();
		}

		/**
		*舞台的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto__.removeColorBox=function(e){
			this.close();
		}

		/**
		*小格子色块的 <code>Event.KEY_DOWN</code> 事件侦听处理函数。
		*/
		__proto__.onColorFieldKeyDown=function(e){
			if (e.keyCode==13){
				if (this._colorInput.text)this.selectedColor=this._colorInput.text;
				else this.selectedColor=null;
				this.close();
				e.stopPropagation();
			}
		}

		/**
		*颜色值输入框 <code>Event.CHANGE</code> 事件侦听处理函数。
		*/
		__proto__.onColorInputChange=function(e){
			if (this._colorInput.text)this.drawBlock(this._colorInput.text);
			else this.drawBlock("#FFFFFF");
		}

		/**
		*小格子色块的 <code>Event.CLICK</code> 事件侦听处理函数。
		*/
		__proto__.onColorTilesClick=function(e){
			this.selectedColor=this.getColorByMouse();
			this.close();
		}

		/**
		*@private
		*小格子色块的 <code>Event.MOUSE_MOVE</code> 事件侦听处理函数。
		*/
		__proto__.onColorTilesMouseMove=function(e){
			this._colorInput.focus=false;
			var color=this.getColorByMouse();
			this._colorInput.text=color;
			this.drawBlock(color);
		}

		/**
		*通过鼠标位置取对应的颜色块的颜色值。
		*@return
		*/
		__proto__.getColorByMouse=function(){
			var point=this._colorTiles.getMousePoint();
			var x=Math.floor(point.x / this._gridSize);
			var y=Math.floor(point.y / this._gridSize);
			return this._colors[y *20+x];
		}

		/**
		*绘制颜色块。
		*@param color 需要绘制的颜色块的颜色值。
		*/
		__proto__.drawBlock=function(color){
			var g=this._colorBlock.graphics;
			g.clear();
			var showColor=color ? color :"#ffffff";
			g.drawRect(0,0,50,20,showColor,this._borderColor);
			color || g.drawLine(0,0,50,20,"#ff0000");
		}

		/**
		*改变颜色。
		*/
		__proto__.changeColor=function(){
			var g=this.graphics;
			g.clear();
			var showColor=this._selectedColor || "#000000";
			g.drawRect(0,0,this._colorButton.width,this._colorButton.height,showColor);
		}

		/**
		*表示颜色样本列表面板的边框颜色值。
		*@return
		*/
		GETSET$(0,__proto__,'borderColor',function(){
			return this._borderColor;
			},function(value){
			this._borderColor=value;
			this.callLater(this.changePanel);
		});

		/**
		*表示选择的颜色值。
		*@return
		*/
		GETSET$(0,__proto__,'selectedColor',function(){
			return this._selectedColor;
			},function(value){
			if (this._selectedColor !=value){
				this._selectedColor=this._colorInput.text=value;
				this.drawBlock(value);
				this.changeColor();
				this.changeHandler && this.changeHandler.runWith([this._selectedColor]);
				this.event(/*laya.events.Event.CHANGE*/"change",Event.EMPTY.setTo(/*laya.events.Event.CHANGE*/"change",this,this));
			}
		});

		/**
		*表示颜色输入框的背景颜色值。
		*@return
		*/
		GETSET$(0,__proto__,'inputBgColor',function(){
			return this._inputBgColor;
			},function(value){
			this._inputBgColor=value;
			this.callLater(this.changePanel);
		});

		/**
		*@copy laya.ui.Button#skin
		*@return
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._colorButton.skin;
			},function(value){
			this._colorButton.skin=value;
			this.changeColor();
		});

		/**
		*表示颜色样本列表面板的背景颜色值。
		*@return
		*/
		GETSET$(0,__proto__,'bgColor',function(){
			return this._bgColor;
			},function(value){
			this._bgColor=value;
			this.callLater(this.changePanel);
		});

		/**
		*表示颜色样本列表面板选择或输入的颜色值。
		*@return
		*/
		GETSET$(0,__proto__,'inputColor',function(){
			return this._inputColor;
			},function(value){
			this._inputColor=value;
			this.callLater(this.changePanel);
		});

		return ColorPicker;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/combobox.as
	/**
	*<code>ComboBox</code> 组件包含一个下拉列表，用户可以从该列表中选择单个值。
	*
	*@example 以下示例代码，创建了一个 <code>ComboBox</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.ComboBox;
		*import laya.utils.Handler;
		*
		*public class ComboBox_Example
		*{
			*public function ComboBox_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/button.png",new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*trace("资源加载完成！");
				*var comboBox:ComboBox=new ComboBox("resource/ui/button.png","item0,item1,item2,item3,item4,item5");//创建一个 ComboBox 类的实例对象 comboBox ,传入它的皮肤和标签集。
				*comboBox.x=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
				*comboBox.y=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
				*comboBox.selectHandler=new Handler(this,onSelect);//设置 comboBox 选择项改变时执行的处理器。
				*Laya.stage.addChild(comboBox);//将此 comboBox 对象添加到显示列表。
				*}
			*
			*private function onSelect(index:int):void
			*{
				*trace("当前选中的项对象索引： ",index);
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式。
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
	*Laya.loader.load("resource/ui/button.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete(){
		*console.log("资源加载完成！");
		*var comboBox=new laya.ui.ComboBox("resource/ui/button.png","item0,item1,item2,item3,item4,item5");//创建一个 ComboBox 类的实例对象 comboBox ,传入它的皮肤和标签集。
		*comboBox.x=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
		*comboBox.y=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
		*comboBox.selectHandler=new laya.utils.Handler(this,onSelect);//设置 comboBox 选择项改变时执行的处理器。
		*Laya.stage.addChild(comboBox);//将此 comboBox 对象添加到显示列表。
		*}
	*function onSelect(index)
	*{
		*console.log("当前选中的项对象索引： ",index);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*/
	//class laya.ui.ComboBox extends laya.ui.Component
	var ComboBox=(function(_super){
		function ComboBox(skin,labels){
			this._visibleNum=6;
			this._button=null;
			this._list=null;
			this._isOpen=false;
			this._scrollBar=null;
			this._itemSize=14;
			this._labels=[];
			this._selectedIndex=-1;
			this._selectHandler=null;
			this._itemHeight=NaN;
			this._listHeight=NaN;
			ComboBox._SUPERC_.call(this);
			this._itemColors=Styles.comboBoxItemColors;
			this.skin=skin;
			this.labels=labels;
		}

		CLASS$(ComboBox,'laya.ui.ComboBox',_super);
		var __proto__=ComboBox.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._button && this._button.destroy(destroyChild);
			this._list && this._list.destroy(destroyChild);
			this._scrollBar && this._scrollBar.destroy(destroyChild);
			this._button=null;
			this._list=null;
			this._scrollBar=null;
			this._itemColors=null;
			this._labels=null;
			this._selectHandler=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._button=new Button());
			this._list=new List();
			this._list.addChild(this._scrollBar=new VScrollBar());
		}

		/**
		*@private
		*/
		__proto__.onListDown=function(e){
			e.stopPropagation();
		}

		/**
		*private
		*/
		__proto__.onScrollBarDown=function(e){
			e.stopPropagation();
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			this._button.text.align="left";
			this._button.labelPadding="5";
			this._button.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onButtonMouseDown);
			this._list.on(/*laya.events.Event.CHANGE*/"change",this,this.onListChange);
			this._list.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onListDown);
			this._list.mouseHandler=Handler.create(this,this.onlistItemMouse,null,false);
			this._scrollBar.name="scrollBar";
			this._scrollBar.y=1;
			this._scrollBar.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onScrollBarDown);
		}

		__proto__.onButtonMouseDown=function(e){
			this.callLater(this.switchTo,[!this._isOpen]);
		}

		/**
		*@private
		*更改 <code>ComboBox</code> 组件中的选定内容。
		*/
		__proto__.onListChange=function(e){
			this.selectedIndex=this._list.selectedIndex;
			this.isOpen=false;
		}

		/**
		*@private (protected)
		*/
		__proto__.changeList=function(){
			var labelWidth=this.width-2;
			var labelColor=this._itemColors[2];
			this._itemHeight=this._itemSize+3;
			this._list.itemRender={type:"Box",child:[{type:"Label",props:{name:"label",x:1,width:labelWidth,height:this._itemHeight,fontSize:this._itemSize,color:labelColor}}]};
			this._list.repeatY=this._visibleNum;
			this._scrollBar.x=this.width-this._scrollBar.width-1;
			this._list.refresh();
		}

		/**
		*@private
		*下拉列表的鼠标事件响应函数。
		*@param e
		*@param index
		*/
		__proto__.onlistItemMouse=function(e,index){
			var type=e.type;
			if (type===/*laya.events.Event.MOUSE_OVER*/"mouseover" || type===/*laya.events.Event.MOUSE_OUT*/"mouseout"){
				var box=this._list.getCell(index);
				if (!box)return;
				var label=box.getChildByName("label");
				if (type==/*laya.events.Event.ROLL_OVER*/"mouseover"){
					label.bgColor=this._itemColors[0];
					label.color=this._itemColors[1];
					}else {
					label.bgColor=null;
					label.color=this._itemColors[2];
				}
			}
		}

		/**
		*@private
		*@param value
		*/
		__proto__.switchTo=function(value){
			this.isOpen=value;
		}

		/**
		*更改下拉列表的打开状态。
		*/
		__proto__.changeOpen=function(){
			this.isOpen=!this._isOpen;
		}

		/**
		*更改下拉列表。
		*/
		__proto__.changeItem=function(){
			this.runCallLater(this.changeList);
			this._listHeight=this._labels.length > 0 ? Math.min(this._visibleNum,this._labels.length)*this._itemHeight :this._itemHeight;
			this._scrollBar.height=this._listHeight-2;
			var g=this._list.graphics;
			g.clear();
			g.drawRect(0,0,this.width-1,this._listHeight,this._itemColors[4],this._itemColors[3]);
			var a=this._list.array || [];
			a.length=0;
			for (var i=0,n=this._labels.length;i < n;i++){
				a.push({label:this._labels[i]});
			}
			this._list.array=a;
		}

		/**
		*关闭下拉列表。
		*/
		__proto__.removeList=function(e){
			this.isOpen=false;
		}

		/**
		*标签集合字符串。
		*@return
		*/
		GETSET$(0,__proto__,'labels',function(){
			return this._labels.join(",");
			},function(value){
			if (this._labels.length > 0)this.selectedIndex=-1;
			if (value)this._labels=value.split(",");
			else this._labels.length=0;
			this.callLater(this.changeItem);
		});

		/**
		*@copy laya.ui.Button#skin
		*@return
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._button.skin;
			},function(value){
			if (this._button.skin !=value){
				this._button.skin=value;
				this.callLater(this.changeList);
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureHeight',function(){
			return this._button.height;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureWidth',function(){
			return this._button.width;
		});

		/**
		*表示选择的下拉列表项的的标签。
		*@return
		*/
		GETSET$(0,__proto__,'selectedLabel',function(){
			return this._selectedIndex >-1 && this._selectedIndex < this._labels.length ? this._labels[this._selectedIndex] :null;
			},function(value){
			this.selectedIndex=this._labels.indexOf(value);
		});

		/**
		*表示选择的下拉列表项的索引。
		*@return
		*/
		GETSET$(0,__proto__,'selectedIndex',function(){
			return this._selectedIndex;
			},function(value){
			if (this._selectedIndex !=value){
				this._list.selectedIndex=this._selectedIndex=value;
				this._button.label=this.selectedLabel;
				this.event(/*laya.events.Event.CHANGE*/"change",[Event.EMPTY.setTo(/*laya.events.Event.CHANGE*/"change",this,this)]);
				this._selectHandler && this._selectHandler.runWith(this._selectedIndex);
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._button.width=this._width;
			this.callLater(this.changeItem);
			this.callLater(this.changeList);
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._button.height=this._height;
		});

		/**
		*改变下拉列表的选择项时执行的处理器(默认返回参数index:int)。
		*@return
		*/
		GETSET$(0,__proto__,'selectHandler',function(){
			return this._selectHandler;
			},function(value){
			this._selectHandler=value;
		});

		/**
		*表示按钮的状态值。
		*
		*@see laya.ui.Button#stateNum
		*@return
		*/
		GETSET$(0,__proto__,'stateNum',function(){
			return this._button.stateNum;
			},function(value){
			this._button.stateNum=value
		});

		/**
		*获取或设置没有滚动条的下拉列表中可显示的最大行数。
		*@return
		*/
		GETSET$(0,__proto__,'visibleNum',function(){
			return this._visibleNum;
			},function(value){
			this._visibleNum=value;
			this.callLater(this.changeList);
		});

		/**
		*下拉列表项颜色。
		*<p><b>格式：</b>"悬停或被选中时背景颜色,悬停或被选中时标签颜色,标签颜色,边框颜色,背景颜色"</p>
		*@return
		*/
		GETSET$(0,__proto__,'itemColors',function(){
			return String(this._itemColors)
			},function(value){
			this._itemColors=UIUtils.fillArray(this._itemColors,value,String);
			this.callLater(this.changeList);
		});

		/**
		*下拉列表项标签的字体大小。
		*@return
		*/
		GETSET$(0,__proto__,'itemSize',function(){
			return this._itemSize;
			},function(value){
			this._itemSize=value;
			this.callLater(this.changeList);
		});

		/**
		*表示下拉列表的打开状态。
		*@return
		*/
		GETSET$(0,__proto__,'isOpen',function(){
			return this._isOpen;
			},function(value){
			if (this._isOpen !=value){
				this._isOpen=value;
				this._button.selected=this._isOpen;
				if (this._isOpen){
					Point.EMPTY.setTo(0,0);
					var p=this.localToGlobal(Point.EMPTY);
					var py=p.y+this._button.height;
					py=py+this._listHeight <=Laya.stage.width ? py :p.y-this._listHeight;
					this._list.pos(p.x,py);
					Laya.stage.addChild(this._list);
					Laya.stage.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.removeList);
					this._list.scrollTo((this._selectedIndex+this._visibleNum)< this._list.length ? this._selectedIndex :this._list.length-this._visibleNum);
					}else {
					this._list.removeSelf();
					Laya.stage.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.removeList);
				}
			}
		});

		/**
		*<p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*@return
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			return this._button.sizeGrid;
			},function(value){
			this._button.sizeGrid=value;
		});

		/**
		*获取对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的引用。
		*/
		GETSET$(0,__proto__,'button',function(){
			return this._button;
		});

		/**
		*滚动条皮肤。
		*@return
		*/
		GETSET$(0,__proto__,'scrollBarSkin',function(){
			return this._scrollBar.skin;
			},function(value){
			this._scrollBar.skin=value;
		});

		/**
		*获取对 <code>ComboBox</code> 组件所包含的 <code>VScrollBar</code> 滚动条组件的引用。
		*@return
		*/
		GETSET$(0,__proto__,'scrollBar',function(){
			return this._scrollBar;
		});

		/**
		*获取对 <code>ComboBox</code> 组件所包含的 <code>List</code> 列表组件的引用。
		*@return
		*/
		GETSET$(0,__proto__,'list',function(){
			return this._list;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string'))this.selectedIndex=LAYABOX.parseInt(value);
			else if ((value instanceof Array))this.labels=(value).join(",");
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的文本标签颜色。
		*<p><b>格式：</b>upColor,overColor,downColor,disableColor</p>
		*@return
		*/
		GETSET$(0,__proto__,'labelColors',function(){
			return this._button.labelColors;
			},function(value){
			this._button.labelColors=value;
		});

		/**
		*获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的文本边距。
		*<p><b>格式：</b>左边距,上边距,右边距,下边距</p>
		*@return
		*/
		GETSET$(0,__proto__,'labelPadding',function(){
			return this._button.text.padding.join(",");
			},function(value){
			this._button.text.padding=UIUtils.fillArray(Styles.labelMargin,value,Number);
		});

		/**
		*获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的标签字体大小。
		*@return
		*/
		GETSET$(0,__proto__,'labelSize',function(){
			return this._button.text.fontSize;
			},function(value){
			this._button.text.fontSize=value
		});

		/**
		*表示按钮文本标签是否为粗体字。
		*
		*@see laya.display.Text#bold
		*@return
		*/
		GETSET$(0,__proto__,'labelBold',function(){
			return this._button.text.bold;
			},function(value){
			this._button.text.bold=value
		});

		/**
		*表示按钮文本标签的字体名称，以字符串形式表示。
		*
		*@see laya.display.Text#font
		*@return
		*/
		GETSET$(0,__proto__,'labelFont',function(){
			return this._button.text.font;
			},function(value){
			this._button.text.font=value
		});

		return ComboBox;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/scrollbar.as
	/**
	*<code>ScrollBar</code> 组件是一个滚动条组件。
	*
	*<p>当数据太多以至于显示区域无法容纳时，最终用户可以使用 <code>ScrollBar</code> 组件控制所显示的数据部分。</p>
	*<p> 滚动条由四部分组成：两个箭头按钮、一个轨道和一个滑块。 </p> *
	*
	*@see laya.ui.VScrollBar
	*@see laya.ui.HScrollBar
	*@author yung
	*/
	//class laya.ui.ScrollBar extends laya.ui.Component
	var ScrollBar=(function(_super){
		function ScrollBar(skin){
			this.changeHandler=null;
			this.scaleBar=true;
			this.autoHide=true;
			this.showButtons=true;
			this.elasticDistance=0;
			this.elasticBackTime=500;
			this._scrollSize=1;
			this._skin=null;
			this._upButton=null;
			this._downButton=null;
			this._slider=null;
			this._thumbPercent=1;
			this._target=null;
			this._lastPoint=null;
			this._lastOffset=0;
			this._checkElastic=false;
			this._isElastic=false;
			this._value=NaN;
			this._hide=false;
			this._clickOnly=true;
			this._offsets=null;
			ScrollBar._SUPERC_.call(this);
			this.touchScrollEnable=UIConfig.touchScrollEnable;
			this.mouseWheelEnable=UIConfig.touchScrollEnable;
			this.skin=skin;
			this.max=1;
		}

		CLASS$(ScrollBar,'laya.ui.ScrollBar',_super);
		var __proto__=ScrollBar.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._upButton && this._upButton.destroy(destroyChild);
			this._downButton && this._downButton.destroy(destroyChild);
			this._slider && this._slider.destroy(destroyChild);
			this._upButton=this._downButton=null;
			this._slider=null;
			this.changeHandler=null;
			this._offsets=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._slider=new Slider());
			this.addChild(this._upButton=new Button());
			this.addChild(this._downButton=new Button());
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			this._slider.showLabel=false;
			this._slider.on(/*laya.events.Event.CHANGE*/"change",this,this.onSliderChange);
			this._slider.setSlider(0,0,0);
			this._upButton.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onButtonMouseDown);
			this._downButton.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onButtonMouseDown);
		}

		/**
		*@private
		*滑块位置发生改变的处理函数。
		*/
		__proto__.onSliderChange=function(e){
			this.value=this._slider.value;
		}

		/**
		*@private
		*向上和向下按钮的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto__.onButtonMouseDown=function(e){
			var isUp=e.currentTarget===this._upButton;
			this.slide(isUp);
			Laya.timer.once(Styles.scrollBarDelayTime,this,this.startLoop,[isUp]);
			Laya.stage.once(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp);
		}

		/**@private */
		__proto__.startLoop=function(isUp){
			Laya.timer.frameLoop(1,this,this.slide,[isUp]);
		}

		/**@private */
		__proto__.slide=function(isUp){
			if (isUp)this.value-=this._scrollSize;
			else this.value+=this._scrollSize;
		}

		/**
		*@private
		*舞台的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto__.onStageMouseUp=function(e){
			Laya.timer.clear(this,this.startLoop);
			Laya.timer.clear(this,this.slide);
		}

		/**
		*@private
		*更改对象的皮肤及位置。
		*/
		__proto__.changeScrollBar=function(){
			this._upButton.visible=this.showButtons;
			this._downButton.visible=this.showButtons;
			if (this.showButtons){
				this._upButton.skin=this._skin.replace(".png","$up.png");
				this._downButton.skin=this._skin.replace(".png","$down.png");
			}
			if (this._slider.isVertical)this._slider.y=this._upButton.height;
			else this._slider.x=this._upButton.width;
			this.resetPositions();
		}

		/**@inheritDoc */
		__proto__.changeSize=function(){
			_super.prototype.changeSize.call(this);
			this.resetPositions();
		}

		/**@private */
		__proto__.resetPositions=function(){
			if (this._slider.isVertical)this._slider.height=this.height-this._upButton.height-this._downButton.height;
			else this._slider.width=this.width-this._upButton.width-this._downButton.width;
			this.resetButtonPosition();
		}

		/**@private */
		__proto__.resetButtonPosition=function(){
			if (this._slider.isVertical)this._downButton.y=this._slider.y+this._slider.height;
			else this._downButton.x=this._slider.x+this._slider.width;
		}

		/**
		*设置滚动条信息。
		*@param min 滚动条最小位置值。
		*@param max 滚动条最大位置值。
		*@param value 滚动条当前位置值。
		*/
		__proto__.setScroll=function(min,max,value){
			this.runCallLater(this.changeSize);
			this._slider.setSlider(min,max,value);
			this._upButton.disabled=max <=0;
			this._downButton.disabled=max <=0;
			this._slider.bar.visible=max > 0;
			if (!this._hide)this.visible=!(this.autoHide && max <=min);
		}

		/**@private */
		__proto__.onTargetMouseWheel=function(e){
			this.value-=e.delta *this._scrollSize;
		}

		/**@private */
		__proto__.onTargetMouseDown=function(e){
			this._clickOnly=true;
			this._lastOffset=0;
			this._checkElastic=false;
			this._lastPoint || (this._lastPoint=new Point());
			this._lastPoint.setTo(Laya.stage.mouseX,Laya.stage.mouseY);
			Laya.timer.clear(this,this.tweenMove);
			Tween.clearTween(this);
			Laya.stage.once(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp2);
			Laya.stage.once(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp2);
			Laya.timer.frameLoop(1,this,this.loop,null,true);
		}

		/**@private */
		__proto__.loop=function(){
			var mouseY=Laya.stage.mouseY;
			var mouseX=Laya.stage.mouseX;
			this._lastOffset=this.isVertical ? mouseY-this._lastPoint.y :mouseX-this._lastPoint.x;
			if (this._lastOffset===0)return;
			if (this._clickOnly){
				if (Math.abs(this._lastOffset)> 1){
					this._clickOnly=false;
					this._offsets || (this._offsets=[]);
					this._offsets.length=0;
				}else return;
			}
			this._offsets.push(this._lastOffset);
			this._lastPoint.x=mouseX;
			this._lastPoint.y=mouseY;
			if (!this._checkElastic){
				if (this.elasticDistance > 0){
					if (!this._checkElastic && this._lastOffset !=0){
						this._checkElastic=true;
						if ((this._lastOffset > 0 && this._value <=this.min)|| (this._lastOffset < 0 && this._value >=this.max)){
							this._isElastic=true;
							}else {
							this._isElastic=false;
						}
					}
					}else {
					this._checkElastic=true;
				}
			}
			if (this._checkElastic){
				if (this._isElastic){
					if (this._value <=this.min){
						this.value-=this._lastOffset *Math.max(0,(1-((this.min-this._value)/ this.elasticDistance)));
						}else if (this._value >=this.max){
						this.value-=this._lastOffset *Math.max(0,(1-((this._value-this.max)/ this.elasticDistance)));
					}
					}else {
					this.value-=this._lastOffset;
				}
			}
		}

		/**@private */
		__proto__.onStageMouseUp2=function(e){
			Laya.stage.off(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp2);
			Laya.stage.off(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp2);
			Laya.timer.clear(this,this.loop);
			if (this._clickOnly)return;
			if (this._isElastic){
				if (this._value < this.min){
					Tween.to(this,{value:this.min},this.elasticBackTime,Ease.sineOut,new Handler(this,this.elasticOver));
					}else if (this._value > this.max){
					Tween.to(this,{value:this.max},this.elasticBackTime,Ease.sineOut,new Handler(this,this.elasticOver));
				}
				}else {
				if (this._offsets.length < 1){
					this._offsets[0]=this.isVertical ? Laya.stage.mouseY-this._lastPoint.y :Laya.stage.mouseX-this._lastPoint.x;
				};
				var offset=0;
				var n=Math.min(this._offsets.length,3);
				for (var i=0;i < n;i++){
					offset+=this._offsets[this._offsets.length-1-i];
				}
				this._lastOffset=offset / n;
				offset=Math.abs(this._lastOffset);
				if (offset < 2)return;
				if (offset > 60)this._lastOffset=this._lastOffset > 0 ? 60 :-60;
				Laya.timer.frameLoop(1,this,this.tweenMove);
			}
		}

		/**@private */
		__proto__.elasticOver=function(){
			this._isElastic=false;
		}

		/**@private */
		__proto__.tweenMove=function(){
			this._lastOffset *=0.95;
			this.value-=this._lastOffset;
			if (Math.abs(this._lastOffset)< 1)Laya.timer.clear(this,this.tweenMove);
		}

		/**
		*一个布尔值，指示滚动条是否为垂直滚动。如果值为true，则为垂直滚动，否则为水平滚动。
		*<p>默认值为：true。</p>
		*/
		GETSET$(0,__proto__,'isVertical',function(){
			return this._slider.isVertical;
			},function(value){
			this._slider.isVertical=value;
		});

		/**
		*@copy laya.ui.Image#skin
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this._slider.skin=this._skin;
				this.callLater(this.changeScrollBar);
			}
		});

		/**
		*获取或设置表示最高滚动位置的数字。
		*/
		GETSET$(0,__proto__,'max',function(){
			return this._slider.max;
			},function(value){
			this._slider.max=value;
		});

		/**获取或设置一个值，该值表示按下滚动条轨道时页面滚动的增量。 */
		GETSET$(0,__proto__,'scrollSize',function(){
			return this._scrollSize;
			},function(value){
			this._scrollSize=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureHeight',function(){
			if (this._slider.isVertical)return 100;
			return this._slider.height;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureWidth',function(){
			if (this._slider.isVertical)return this._slider.width;
			return 100;
		});

		/**
		*<p>当前实例的 <code>Slider</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			return this._slider.sizeGrid;
			},function(value){
			this._slider.sizeGrid=value;
		});

		/**
		*获取或设置表示最低滚动位置的数字。
		*/
		GETSET$(0,__proto__,'min',function(){
			return this._slider.min;
			},function(value){
			this._slider.min=value;
		});

		/**
		*获取或设置表示当前滚动位置的数字。
		*/
		GETSET$(0,__proto__,'value',function(){
			return this._value;
			},function(v){
			if (v!==this._value){
				if (this._isElastic)this._value=v;
				else {
					this._slider.value=v;
					this._value=this._slider.value;
				}
				this.event(/*laya.events.Event.CHANGE*/"change");
				this.changeHandler && this.changeHandler.runWith(this.value);
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.value=Number(value);
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**获取或设置一个值，该值表示滑条长度比例，值为：（0-1）。 */
		GETSET$(0,__proto__,'thumbPercent',function(){
			return this._thumbPercent;
			},function(value){
			this.runCallLater(this.changeSize);
			this._thumbPercent=value;
			if (this.scaleBar){
				if (this._slider.isVertical)this._slider.bar.height=Math.max(this._slider.height *value,Styles.scrollBarMinNum);
				else this._slider.bar.width=Math.max(this._slider.width *value,Styles.scrollBarMinNum);
			}
		});

		/**
		*设置滚动对象。 *
		*@see laya.ui.TouchScroll#target
		*/
		GETSET$(0,__proto__,'target',function(){
			return this._target;
			},function(value){
			if (this._target){
				this._target.off(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",this,this.onTargetMouseWheel);
				this._target.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onTargetMouseDown);
			}
			this._target=value;
			if (value){
				this.mouseWheelEnable && this._target.on(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",this,this.onTargetMouseWheel);
				this.touchScrollEnable && this._target.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onTargetMouseDown);
			}
		});

		/**是否隐藏滚动条，不显示滚动条，但是可以正常滚动，默认为false。*/
		GETSET$(0,__proto__,'hide',function(){
			return this._hide;
			},function(value){
			this._hide=value;
			this.visible=!value;
		});

		return ScrollBar;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/slider.as
	/**
	*使用 <code>Slider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	*
	*<p>滑块的当前值由滑块端点（对应于滑块的最小值和最大值）之间滑块的相对位置确定。</p>
	*<p>滑块允许最小值和最大值之间特定间隔内的值。滑块还可以使用数据提示显示其当前值。</p>
	*
	*@see laya.ui.HSlider
	*@see laya.ui.VSlider
	*@author yung
	*/
	//class laya.ui.Slider extends laya.ui.Component
	var Slider=(function(_super){
		function Slider(skin){
			this.changeHandler=null;
			this.isVertical=true;
			this.showLabel=true;
			this._allowClickBack=false;
			this._max=100;
			this._min=0;
			this._tick=1;
			this._value=0;
			this._skin=null;
			this._bg=null;
			this._bar=null;
			this._tx=NaN;
			this._ty=NaN;
			this._maxMove=NaN;
			Slider._SUPERC_.call(this);
			this.skin=skin;
		}

		CLASS$(Slider,'laya.ui.Slider',_super);
		var __proto__=Slider.prototype;
		/**
		*@inheritDoc
		*/
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._bg && this._bg.destroy(destroyChild);
			this._bar && this._bar.destroy(destroyChild);
			this._bg=null;
			this._bar=null;
			this.changeHandler=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._bg=new Image2());
			this.addChild(this._bar=new Button());
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			this._bar.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onBarMouseDown);
			this._bg.sizeGrid=this._bar.sizeGrid="4,4,4,4,0";
			this.allowClickBack=true;
		}

		/**
		*@private
		*滑块的的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*@param e
		*/
		__proto__.onBarMouseDown=function(e){
			this._maxMove=this.isVertical ? (this.height-this._bar.height):(this.width-this._bar.width);
			this._tx=Laya.stage.mouseX;
			this._ty=Laya.stage.mouseY;
			Laya.stage.on(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this.mouseMove);
			Laya.stage.once(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.mouseUp);
			this.showValueText();
		}

		/**
		*@private
		*显示标签。
		*/
		__proto__.showValueText=function(){
			if (this.showLabel){
				laya.ui.Slider.label || (laya.ui.Slider.label=new Label());
				var label=laya.ui.Slider.label;
				this.addChild(label);
				label.textField.changeText(this._value+"");
				if (this.isVertical){
					label.x=this._bar.x+20;
					label.y=(this._bar.height-label.height)*0.5+this._bar.y;
					}else {
					label.y=this._bar.y-20;
					label.x=(this._bar.width-label.width)*0.5+this._bar.x;
				}
			}
		}

		/**
		*@private
		*隐藏标签。
		*/
		__proto__.hideValueText=function(){
			laya.ui.Slider.label && laya.ui.Slider.label.removeSelf();
		}

		/**
		*@private
		*@param e
		*/
		__proto__.mouseUp=function(e){
			Laya.stage.off(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this.mouseMove);
			this.sendChangeEvent(/*laya.events.Event.CHANGED*/"changed");
			this.hideValueText();
		}

		/**
		*@private
		*@param e
		*/
		__proto__.mouseMove=function(e){
			var oldValue=this._value;
			if (this.isVertical){
				this._bar.y+=Laya.stage.mouseY-this._ty;
				if (this._bar.y > this._maxMove)this._bar.y=this._maxMove;
				else if (this._bar.y < 0)this._bar.y=0;
				this._value=this._bar.y / this._maxMove *(this._max-this._min)+this._min;
				}else {
				this._bar.x+=Laya.stage.mouseX-this._tx;
				if (this._bar.x > this._maxMove)this._bar.x=this._maxMove;
				else if (this._bar.x < 0)this._bar.x=0;
				this._value=this._bar.x / this._maxMove *(this._max-this._min)+this._min;
			}
			this._tx=Laya.stage.mouseX;
			this._ty=Laya.stage.mouseY;
			var pow=Math.pow(10,(this._tick+"").length-1);
			this._value=Math.round(Math.round(this._value / this._tick)*this._tick*pow)/pow;
			if (this._value !=oldValue){
				this.sendChangeEvent();
			}
			this.showValueText();
		}

		/**
		*@private
		*@param type
		*/
		__proto__.sendChangeEvent=function(type){
			(type===void 0)&& (type=/*laya.events.Event.CHANGE*/"change");
			this.event(type);
			this.changeHandler && this.changeHandler.runWith(this._value);
		}

		/**
		*@private
		*设置滑块的位置信息。
		*/
		__proto__.setBarPoint=function(){
			if (this.isVertical)this._bar.x=(this._bg.width-this._bar.width)*0.5;
			else this._bar.y=(this._bg.height-this._bar.height)*0.5;
		}

		/**@inheritDoc */
		__proto__.changeSize=function(){
			_super.prototype.changeSize.call(this);
			if (this.isVertical)this._bg.height=this.height;
			else this._bg.width=this.width;
			this.setBarPoint();
			this.changeValue();
		}

		/**
		*设置滑动条的信息。
		*@param min 滑块的最小值。
		*@param max 滑块的最小值。
		*@param value 滑块的当前值。
		*/
		__proto__.setSlider=function(min,max,value){
			this._value=-1;
			this._min=min;
			this._max=max > min ? max :min;
			this.value=value < min ? min :value > max ? max :value;
		}

		/**
		*@private
		*改变滑块的位置值。
		*/
		__proto__.changeValue=function(){
			var pow=Math.pow(10,(this._tick+"").length-1);
			this._value=Math.round(Math.round(this._value / this._tick)*this._tick*pow)/pow;
			this._value=this._value > this._max ? this._max :this._value < this._min ? this._min :this._value;
			if (this.isVertical)this._bar.y=(this._value-this._min)/ (this._max-this._min)*(this.height-this._bar.height);
			else this._bar.x=(this._value-this._min)/ (this._max-this._min)*(this.width-this._bar.width);
		}

		/**
		*@private
		*滑动条的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*@param e
		*/
		__proto__.onBgMouseDown=function(e){
			var point=this._bg.getMousePoint();
			if (this.isVertical)this.value=point.y / (this.height-this._bar.height)*(this._max-this._min)+this._min;
			else this.value=point.x / (this.width-this._bar.width)*(this._max-this._min)+this._min;
		}

		/**
		*@copy laya.ui.Image#skin
		*@return
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this._bg.skin=this._skin;
				this._bar.skin=this._skin.replace(".png","$bar.png");
				this.setBarPoint();
			}
		});

		/**
		*获取或设置表示最高位置的数字。 默认值为100。
		*@return
		*/
		GETSET$(0,__proto__,'max',function(){
			return this._max;
			},function(value){
			if (this._max !=value){
				this._max=value;
				this.callLater(this.changeValue);
			}
		});

		/**
		*表示滑块按钮的引用。
		*@return
		*/
		GETSET$(0,__proto__,'bar',function(){
			return this._bar;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureHeight',function(){
			return Math.max(this._bg.height,this._bar.height);
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureWidth',function(){
			return Math.max(this._bg.width,this._bar.width);
		});

		/**
		*<p>当前实例的背景图（ <code>Image</code> ）和滑块按钮（ <code>Button</code> ）实例的有效缩放网格数据。</p>
		*<p>数据格式："左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*@return
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			return this._bg.sizeGrid;
			},function(value){
			this._bg.sizeGrid=value;
			this._bar.sizeGrid=value;
		});

		/**
		*表示当前的刻度值。默认值为1。
		*@return
		*/
		GETSET$(0,__proto__,'tick',function(){
			return this._tick;
			},function(value){
			this._tick=value;
			this.callLater(this.changeValue);
		});

		/**
		*获取或设置表示最低位置的数字。 默认值为0。
		*@return
		*/
		GETSET$(0,__proto__,'min',function(){
			return this._min;
			},function(value){
			if (this._min !=value){
				this._min=value;
				this.callLater(this.changeValue);
			}
		});

		/**
		*获取或设置表示当前滑块位置的数字。
		*@return
		*/
		GETSET$(0,__proto__,'value',function(){
			return this._value;
			},function(num){
			if (this._value !=num){
				var oldValue=this._value;
				this._value=num;
				this.changeValue();
				if (this._value !=oldValue){
					this.sendChangeEvent();
				}
			}
		});

		/**
		*一个布尔值，指定是否允许通过点击滑动条改变 <code>Slider</code> 的 <code>value</code> 属性值。
		*@return
		*/
		GETSET$(0,__proto__,'allowClickBack',function(){
			return this._allowClickBack;
			},function(value){
			if (this._allowClickBack !=value){
				this._allowClickBack=value;
				if (value)this._bg.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onBgMouseDown);
				else this._bg.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onBgMouseDown);
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.value=Number(value);
			else _super.prototype._$set_dataSource.call(this,value);
		});

		Slider.label=null
		return Slider;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/image.as
	/**
	*<code>Image</code> 类是用于表示位图图像或绘制图形的显示对象。
	*
	*
	*@example 以下示例代码，创建了一个新的 <code>Image</code> 实例，设置了它的皮肤、位置信息，并添加到舞台上。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Image;
		*public class Image_Example
		*{
			*public function Image_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*onInit();
				*}
			*private function onInit():void
			*{
				*var bg:Image=new Image("resource/ui/bg.png");//创建一个 Image 类的实例对象 bg ,并传入它的皮肤。
				*bg.x=100;//设置 bg 对象的属性 x 的值，用于控制 bg 对象的显示位置。
				*bg.y=100;//设置 bg 对象的属性 y 的值，用于控制 bg 对象的显示位置。
				*bg.sizeGrid="10,40,10,5";//设置 bg 对象的网格信息。
				*bg.width=150;//设置 bg 对象的宽度。
				*bg.height=250;//设置 bg 对象的高度。
				*Laya.stage.addChild(bg);//将此 bg 对象添加到显示列表。
				*
				*var image:Image=new Image("resource/ui/image.png");//创建一个 Image 类的实例对象 image ,并传入它的皮肤。
				*image.x=100;//设置 image 对象的属性 x 的值，用于控制 image 对象的显示位置。
				*image.y=100;//设置 image 对象的属性 y 的值，用于控制 image 对象的显示位置。
				*Laya.stage.addChild(image);//将此 image 对象添加到显示列表。
				*}
			*}
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*onInit();
	*function onInit(){
		*var bg=new laya.ui.Image("resource/ui/bg.png");//创建一个 Image 类的实例对象 bg ,并传入它的皮肤。
		*bg.x=100;//设置 bg 对象的属性 x 的值，用于控制 bg 对象的显示位置。
		*bg.y=100;//设置 bg 对象的属性 y 的值，用于控制 bg 对象的显示位置。
		*bg.sizeGrid="10,40,10,5";//设置 bg 对象的网格信息。
		*bg.width=150;//设置 bg 对象的宽度。
		*bg.height=250;//设置 bg 对象的高度。
		*Laya.stage.addChild(bg);//将此 bg 对象添加到显示列表。
		*
		*var image=new laya.ui.Image("resource/ui/image.png");//创建一个 Image 类的实例对象 image ,并传入它的皮肤。
		*image.x=100;//设置 image 对象的属性 x 的值，用于控制 image 对象的显示位置。
		*image.y=100;//设置 image 对象的属性 y 的值，用于控制 image 对象的显示位置。
		*Laya.stage.addChild(image);//将此 image 对象添加到显示列表。
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@see laya.ui.AutoBitmap
	*/
	//class laya.ui.Image extends laya.ui.Component
	var Image2=(function(_super){
		function Image(skin){
			this._bitmap=null;
			this._skin=null;
			Image._SUPERC_.call(this);
			this.skin=skin;
		}

		CLASS$(Image,'laya.ui.Image',_super,'Image2');
		var __proto__=Image.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,true);
			this._bitmap && this._bitmap.destroy();
			this._bitmap=null;
		}

		/**
		*释放此对象的皮肤资源。
		*/
		__proto__.dispose=function(){
			this.destroy(true);
			Laya.loader.clearRes(this._skin);
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.graphics=this._bitmap=new AutoBitmap();
		}

		/**
		*@private
		*设置皮肤资源。
		*@param url
		*@param value
		*/
		__proto__.setSource=function(url,value){
			url===this._skin && (this.source=value);
		}

		/**
		*<p>对象的皮肤地址，以字符串表示。</p>
		*<p>如果资源未加载，则先加载资源，加载完成然后应用于此对象。</p>
		*<b>注意：</b>资源加载完成后，会自动缓存至资源库中。
		*
		*@return
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				if (value){
					this._addRenderType(/*laya.renders.RenderSprite.GRAPHICS*/0x100);
					var source=Loader.getRes(value);
					if (source)this.source=source;
					else Laya.loader.load(this._skin,Handler.create(this,this.setSource,[this._skin]),null,/*laya.net.Loader.IMAGE*/"image");
					}else {
					this.source=null;
					this._removeRenderType(/*laya.renders.RenderSprite.GRAPHICS*/0x100);
					this._removeRenderType(/*laya.renders.RenderSprite.IMAGE*/0x01);
				}
			}
		});

		/**
		*@copy laya.ui.AutoBitmap#source
		*@return
		*/
		GETSET$(0,__proto__,'source',function(){
			return this._bitmap.source;
			},function(value){
			if(this._bitmap)
				this._bitmap.source=value;
			this.event(/*laya.events.Event.LOADED*/"loaded");
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._bitmap.width=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureHeight',function(){
			return this._bitmap.height;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureWidth',function(){
			return this._bitmap.width;
		});

		/**
		*<p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"。</li></ul></p>
		*@see laya.ui.AutoBitmap#sizeGrid
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			if (this._bitmap.sizeGrid)return this._bitmap.sizeGrid.join(",");
			return null;
			},function(value){
			this._bitmap.sizeGrid=UIUtils.fillArray(Styles.defaultSizeGrid,value,Number);
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._bitmap.height=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='string'))this.skin=value;
			else _super.prototype._$set_dataSource.call(this,value);
		});

		return Image;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/label.as
	/**
	*<p> <code>Text</code> 类用于创建显示对象以显示。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Button</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Label;
		*
		*public class Label_Example
		*{
			*public function Label_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*onInit();
				*}
			*
			*private function onInit():void
			*{
				*var label:Label=new Label();//创建一个 Label 类的实例对象 label 。
				*label.font="Arial";//设置 label 的字体。
				*label.bold=true;//设置 label 显示为粗体。
				*label.leading=4;//设置 label 的行间距。
				*label.wordWrap=true;//设置 label 自动换行。
				*label.padding="10,10,10,10";//设置 label 的边距。
				*label.color="#ff00ff";//设置 label 的颜色。
				*label.text="Hello everyone,我是一个可爱的文本！";//设置 label 的文本内容。
				*label.x=100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
				*label.y=100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
				*label.width=300;//设置 label 的宽度。
				*label.height=200;//设置 label 的高度。
				*Laya.stage.addChild(label);//将 label 添加到显示列表。
				*
				*var passwordLabel:Label=new Label("请原谅我，我不想被人看到我心里话。");//创建一个 Label 类的实例对象 passwordLabel 。
				*passwordLabel.asPassword=true;//设置 passwordLabel 的显示反式为密码显示。
				*passwordLabel.x=100;//设置 passwordLabel 对象的属性 x 的值，用于控制 passwordLabel 对象的显示位置。
				*passwordLabel.y=350;//设置 passwordLabel 对象的属性 y 的值，用于控制 passwordLabel 对象的显示位置。
				*passwordLabel.width=300;//设置 passwordLabel 的宽度。
				*passwordLabel.color="#000000";//设置 passwordLabel 的文本颜色。
				*passwordLabel.bgColor="#ccffff";//设置 passwordLabel 的背景颜色。
				*passwordLabel.fontSize=20;//设置 passwordLabel 的文本字体大小。
				*Laya.stage.addChild(passwordLabel);//将 passwordLabel 添加到显示列表。
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*onInit();
	*function onInit(){
		*var label=new laya.ui.Label();//创建一个 Label 类的实例对象 label 。
		*label.font="Arial";//设置 label 的字体。
		*label.bold=true;//设置 label 显示为粗体。
		*label.leading=4;//设置 label 的行间距。
		*label.wordWrap=true;//设置 label 自动换行。
		*label.padding="10,10,10,10";//设置 label 的边距。
		*label.color="#ff00ff";//设置 label 的颜色。
		*label.text="Hello everyone,我是一个可爱的文本！";//设置 label 的文本内容。
		*label.x=100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
		*label.y=100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
		*label.width=300;//设置 label 的宽度。
		*label.height=200;//设置 label 的高度。
		*Laya.stage.addChild(label);//将 label 添加到显示列表。
		*
		*var passwordLabel=new laya.ui.Label("请原谅我，我不想被人看到我心里话。");//创建一个 Label 类的实例对象 passwordLabel 。
		*passwordLabel.asPassword=true;//设置 passwordLabel 的显示反式为密码显示。
		*passwordLabel.x=100;//设置 passwordLabel 对象的属性 x 的值，用于控制 passwordLabel 对象的显示位置。
		*passwordLabel.y=350;//设置 passwordLabel 对象的属性 y 的值，用于控制 passwordLabel 对象的显示位置。
		*passwordLabel.width=300;//设置 passwordLabel 的宽度。
		*passwordLabel.color="#000000";//设置 passwordLabel 的文本颜色。
		*passwordLabel.bgColor="#ccffff";//设置 passwordLabel 的背景颜色。
		*passwordLabel.fontSize=20;//设置 passwordLabel 的文本字体大小。
		*Laya.stage.addChild(passwordLabel);//将 passwordLabel 添加到显示列表。
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@see laya.display.Text
	*@author yung
	*/
	//class laya.ui.Label extends laya.ui.Component
	var Label=(function(_super){
		function Label(text){
			this._tf=null;
			Label._SUPERC_.call(this);
			(text===void 0)&& (text="");
			Font.defaultColor=Styles.labelColor;
			this.text=text;
		}

		CLASS$(Label,'laya.ui.Label',_super);
		var __proto__=Label.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._tf=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._tf=new Text());
		}

		/**
		*@copy laya.display.Text#leading
		*@return
		*/
		GETSET$(0,__proto__,'leading',function(){
			return this._tf.leading;
			},function(value){
			this._tf.leading=value;
		});

		/**
		*当前文本内容字符串。
		*
		*@see laya.display.Text.text
		*@return
		*/
		GETSET$(0,__proto__,'text',function(){
			return this._tf.text;
			},function(value){
			if (this._tf.text !=value){
				this._tf.text=value;
				this.event(/*laya.events.Event.CHANGE*/"change");
			}
		});

		/**
		*@copy laya.display.Text#color
		*@return
		*/
		GETSET$(0,__proto__,'color',function(){
			return this._tf.color;
			},function(value){
			this._tf.color=value;
		});

		/**
		*@copy laya.display.Text#strokeColor
		*@return
		*/
		GETSET$(0,__proto__,'strokeColor',function(){
			return this._tf.strokeColor;
			},function(value){
			this._tf.strokeColor=value;
		});

		/**
		*@copy laya.display.Text#wordWrap
		*/
		/**
		*@copy laya.display.Text#wordWrap
		*/
		GETSET$(0,__proto__,'wordWrap',function(){
			return this._tf.wordWrap;
			},function(value){
			this._tf.wordWrap=value;
		});

		/**
		*@copy laya.display.Text#font
		*/
		GETSET$(0,__proto__,'font',function(){
			return this._tf.font;
			},function(value){
			this._tf.font=value;
		});

		/**
		*@copy laya.display.Text#italic
		*@return
		*/
		GETSET$(0,__proto__,'italic',function(){
			return this._tf.italic;
			},function(value){
			this._tf.italic=value;
		});

		/**
		*@copy laya.display.Text#valign
		*@return
		*/
		GETSET$(0,__proto__,'valign',function(){
			return this._tf.valign;
			},function(value){
			this._tf.valign=value;
		});

		/**
		*@copy laya.display.Text#align
		*@return
		*/
		GETSET$(0,__proto__,'align',function(){
			return this._tf.align;
			},function(value){
			this._tf.align=value;
		});

		/**
		*@copy laya.display.Text#bold
		*@return
		*/
		GETSET$(0,__proto__,'bold',function(){
			return this._tf.bold;
			},function(value){
			this._tf.bold=value;
		});

		/**
		*文本控件实体 <code>Text</code> 实例。
		*@return
		*/
		GETSET$(0,__proto__,'textField',function(){
			return this._tf;
		});

		/**
		*@copy laya.display.Text#fontSize
		*@return
		*/
		GETSET$(0,__proto__,'fontSize',function(){
			return this._tf.fontSize;
			},function(value){
			this._tf.fontSize=value;
		});

		/**
		*<p>边距信息</p>
		*<p>"左边距，上边距，右边距，下边距]（边距以像素为单位）"</p>
		*@see laya.display.Text.padding
		*@return
		*/
		GETSET$(0,__proto__,'padding',function(){
			return this._tf.padding.join(",");
			},function(value){
			this._tf.padding=UIUtils.fillArray(Styles.labelMargin,value,Number);
		});

		/**
		*@copy laya.display.Text#bgColor
		*@return
		*/
		GETSET$(0,__proto__,'bgColor',function(){
			return this._tf.bgColor
			},function(value){
			this._tf.bgColor=value;
		});

		/**
		*@inheritDoc
		*@return
		*/
		GETSET$(0,__proto__,'measureWidth',function(){
			return this._tf.width;
		});

		/**
		*@copy laya.display.Text#borderColor
		*@return
		*/
		GETSET$(0,__proto__,'borderColor',function(){
			return this._tf.borderColor
			},function(value){
			this._tf.borderColor=value;
		});

		/**
		*@copy laya.display.Text#stroke
		*@return
		*/
		GETSET$(0,__proto__,'stroke',function(){
			return this._tf.stroke;
			},function(value){
			this._tf.stroke=value;
		});

		/**
		*@copy laya.display.Text#asPassword
		*@return
		*/
		GETSET$(0,__proto__,'asPassword',function(){
			return this._tf.asPassword;
			},function(value){
			this._tf.asPassword=value;
		});

		/**
		*@inheritDoc
		*@return
		*/
		GETSET$(0,__proto__,'measureHeight',function(){
			return this._tf.height;
		});

		/**
		*@inheritDoc
		*/
		/**
		*@inheritDoc
		*@return
		*/
		GETSET$(0,__proto__,'width',function(){
			if (this._width || this._tf.text)return _super.prototype._$get_width.call(this);
			return 0;
			},function(value){
			_super.prototype._$set_width.call(this,value);
			this._tf.width=value;
		});

		/**
		*@inheritDoc
		*/
		/**
		*@inheritDoc
		*/
		GETSET$(0,__proto__,'height',function(){
			if (this._height || this._tf.text)return _super.prototype._$get_height.call(this);
			return 0;
			},function(value){
			_super.prototype._$set_height.call(this,value);
			this._tf.height=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.text=value+"";
			else _super.prototype._$set_dataSource.call(this,value);
		});

		return Label;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/progressbar.as
	/**
	*<code>ProgressBar</code> 组件显示内容的加载进度。
	*@example 以下示例代码，创建了一个新的 <code>ProgressBar</code> 实例，设置了它的皮肤、位置、宽高、网格等信息，并添加到舞台上。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.ProgressBar;
		*import laya.utils.Handler;
		*public class ProgressBar_Example
		*{
			*private var progressBar:ProgressBar;
			*public function ProgressBar_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/progress.png","resource/ui/progress$bar.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*progressBar=new ProgressBar("resource/ui/progress.png");//创建一个 ProgressBar 类的实例对象 progressBar 。
				*progressBar.x=100;//设置 progressBar 对象的属性 x 的值，用于控制 progressBar 对象的显示位置。
				*progressBar.y=100;//设置 progressBar 对象的属性 y 的值，用于控制 progressBar 对象的显示位置。
				*progressBar.value=0.3;//设置 progressBar 的进度值。
				*progressBar.width=200;//设置 progressBar 的宽度。
				*progressBar.height=50;//设置 progressBar 的高度。
				*progressBar.sizeGrid="10,5,10,5";//设置 progressBar 的网格信息。
				*progressBar.changeHandler=new Handler(this,onChange);//设置 progressBar 的value值改变时执行的处理器。
				*Laya.stage.addChild(progressBar);//将 progressBar 添加到显示列表。
				*Laya.timer.once(3000,this,changeValue);//设定 3000ms（毫秒）后，执行函数changeValue。
				*}
			*
			*private function changeValue():void
			*{
				*trace("改变进度条的进度值。");
				*progressBar.value=0.6;
				*}
			*
			*private function onChange(value:Number):void
			*{
				*trace("进度发生改变： value=" ,value);
				*}
			*}
		*}
	*
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var res=["resource/ui/progress.png","resource/ui/progress$bar.png"];
	*Laya.loader.loadAssets(res,new laya.utils.Handler(this,onLoadComplete));//加载资源。
	*function onLoadComplete()
	*{
		*progressBar=new laya.ui.ProgressBar("resource/ui/progress.png");//创建一个 ProgressBar 类的实例对象 progressBar 。
		*progressBar.x=100;//设置 progressBar 对象的属性 x 的值，用于控制 progressBar 对象的显示位置。
		*progressBar.y=100;//设置 progressBar 对象的属性 y 的值，用于控制 progressBar 对象的显示位置。
		*progressBar.value=0.3;//设置 progressBar 的进度值。
		*progressBar.width=200;//设置 progressBar 的宽度。
		*progressBar.height=50;//设置 progressBar 的高度。
		*progressBar.sizeGrid="10,5,10,5";//设置 progressBar 的网格信息。
		*progressBar.changeHandler=new laya.utils.Handler(this,onChange);//设置 progressBar 的value值改变时执行的处理器。
		*Laya.stage.addChild(progressBar);//将 progressBar 添加到显示列表。
		*Laya.timer.once(3000,this,changeValue);//设定 3000ms（毫秒）后，执行函数changeValue。
		*}
	*function changeValue()
	*{
		*console.log("改变进度条的进度值。");
		*progressBar.value=0.6;
		*}
	*
	*function onChange(value)
	*{
		*console.log("进度发生改变： value=" ,value);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.ProgressBar extends laya.ui.Component
	var ProgressBar=(function(_super){
		function ProgressBar(skin){
			this.changeHandler=null;
			this._bg=null;
			this._bar=null;
			this._skin=null;
			this._value=0.5;
			ProgressBar._SUPERC_.call(this);
			this.skin=skin;
		}

		CLASS$(ProgressBar,'laya.ui.ProgressBar',_super);
		var __proto__=ProgressBar.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._bg && this._bg.destroy(destroyChild);
			this._bar && this._bar.destroy(destroyChild);
			this._bg=this._bar=null;
			this.changeHandler=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._bg=new Image2());
			this.addChild(this._bar=new Image2());
		}

		/**
		*@private
		*更改进度值的显示。
		*/
		__proto__.changeValue=function(){
			if (this.sizeGrid){
				var grid=this.sizeGrid.split(",");
				var left=Number(grid[0]);
				var right=Number(grid[2]);
				var max=this.width-left-right;
				var sw=max *this._value;
				this._bar.width=left+right+sw;
				this._bar.visible=this._bar.width > left+right;
				}else {
				this._bar.width=this.width *this._value;
			}
		}

		/**
		*@copy laya.ui.Image#skin
		*@return
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this._bg.skin=this._skin;
				this._bar.skin=this._skin.replace(".png","$bar.png");
				this.callLater(this.changeValue);
			}
		});

		/**
		*获取进度条对象。
		*@return
		*/
		GETSET$(0,__proto__,'bar',function(){
			return this._bar;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureHeight',function(){
			return this._bg.height;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'measureWidth',function(){
			return this._bg.width;
		});

		/**
		*<p>当前 <code>ProgressBar</code> 实例的进度条背景位图（ <code>Image</code> 实例）的有效缩放网格数据。</p>
		*<p>数据格式："左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*@return
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			return this._bg.sizeGrid;
			},function(value){
			this._bg.sizeGrid=this._bar.sizeGrid=value;
		});

		/**
		*获取背景条对象。
		*@return
		*/
		GETSET$(0,__proto__,'bg',function(){
			return this._bg;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._bg.height=this._height;
			this._bar.height=this._height;
		});

		/**
		*当前的进度量。
		*<p><b>取值：</b>介于0和1之间。</p>
		*@return
		*/
		GETSET$(0,__proto__,'value',function(){
			return this._value;
			},function(num){
			if (this._value !=num){
				num=num > 1 ? 1 :num < 0 ? 0 :num;
				this._value=num;
				this.callLater(this.changeValue);
				this.event(/*laya.events.Event.CHANGE*/"change");
				this.changeHandler && this.changeHandler.runWith(num);
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._bg.width=this._width;
			this.callLater(this.changeValue);
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.value=Number(value);
			else _super.prototype._$set_dataSource.call(this,value);
		});

		return ProgressBar;
	})(Component)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/view.as
	/**
	*<code>View</code> 是一个视图类。
	*
	*@internal <p><code>View</code></p>
	*@author yung
	*/
	//class laya.ui.View extends laya.ui.Box
	var View=(function(_super){
		function View(){View._SUPERC_.call(this);;
		};

		CLASS$(View,'laya.ui.View',_super);
		var __proto__=View.prototype;
		/**
		*@private
		*通过视图数据创建视图。
		*@param uiView 视图数据信息。
		*/
		__proto__.createView=function(uiView){
			View.createComp(uiView,this,this);
			this.mouseEnabled=true;
		}

		/**
		*@private
		*装载UI视图。用于加载模式。
		*@param path
		*/
		__proto__.loadUI=function(path){
			var uiView=View.uiMap[path];
			uiView && this.createView(uiView);
		}

		View.createComp=function(uiView,comp,view){
			comp=comp || View.getCompInstance(uiView);
			var child=uiView.child;
			if (child){
				for (var i=0,n=child.length;i<n;i++){
					var node=child[i];
					if (comp.hasOwnProperty("itemRender")&& node.props.name=="render"){
						(comp).itemRender=node;
						}else {
						comp.addChild(View.createComp(node,null,view));
					}
				}
			};
			var props=uiView.props;
			for (var prop in props){
				var value=props[prop];
				View.setCompValue(comp,prop,value,view);
			}
			if (comp["initItems"])(comp).initItems();
			return comp;
		}

		View.setCompValue=function(comp,prop,value,view){
			if (comp.hasOwnProperty(prop)){
				if (prop==="width" || prop==="height" || prop==="x" || prop==="y" || (typeof (comp[prop])=='number')){
					comp[prop]=Number(value);
					}else {
					comp[prop]=(value==="true" ? true :(value==="false" ? false :value))
				}
				}else if (prop==="var" && view && view.hasOwnProperty(value)){
				view[value]=comp;
			}
		}

		View.getCompInstance=function(json){
			var runtime=json.props ? json.props.runtime :"";
			var compClass=runtime ? View.viewClassMap[runtime] :View.uiClassMap[json.type];
			return compClass ? new compClass():null;
		}

		View.regComponent=function(key,compClass){
			View.uiClassMap[key]=compClass;
		}

		View.regViewRuntime=function(key,compClass){
			View.viewClassMap[key]=compClass;
		}

		View.uiMap={};
		View.viewClassMap={};
		STATICATTR$(View,
		['uiClassMap',function(){return this.uiClassMap={"ViewStack":ViewStack,"LinkButton":Button,"TextArea":TextArea,"ColorPicker":ColorPicker,"Box":Box,"Button":Button,"CheckBox":CheckBox,"Clip":Clip,"ComboBox":ComboBox,"Component":Component,"HScrollBar":HScrollBar,"HSlider":HSlider,"Image":Image2,"Label":Label,"List":List,"Panel":Panel,"ProgressBar":ProgressBar,"Radio":Radio,"RadioGroup":RadioGroup,"ScrollBar":ScrollBar,"Slider":Slider,"Tab":Tab,"TextInput":TextInput,"View":View,"VScrollBar":VScrollBar,"VSlider":VSlider,"Tree":Tree};}
		]);
		return View;
	})(Box)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/group.as
	/**
	*<code>Group</code> 是一个可以自动布局的项集合控件。
	*
	*<p> <code>Group</code> 的默认项对象为 <code>Button</code> 类实例。
	*<code>Group</code> 是 <code>Tab</code> 和 <code>RadioGroup</code> 的基类。</p>
	*/
	//class laya.ui.Group extends laya.ui.Box
	var Group=(function(_super){
		function Group(labels,skin){
			this.selectHandler=null;
			this._items=null;
			this._selectedIndex=-1;
			this._skin=null;
			this._direction="h";
			this._space=0;
			this._labels=null;
			this._labelColors=null;
			this._labelStroke=null;
			this._labelSize=0;
			this._labelBold=false;
			this._labelPadding=null;
			this._labelAlign=null;
			Group._SUPERC_.call(this);
			this.skin=skin;
			this.labels=labels;
			this.mouseEnabled=true;
		}

		CLASS$(Group,'laya.ui.Group',_super);
		var __proto__=Group.prototype;
		LAYABOX.implements(__proto__,{"laya.ui.IItem":true})
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			laya.ui.Component.prototype.destroy.call(this,destroyChild);
			this._items && (this._items.length=0);
			this._items=null;
			this.selectHandler=null;
		}

		/**
		*添加一个项对象，返回此项对象的索引id。
		*
		*@param item 需要添加的项对象。
		*@param autoLayOut 是否自动布局，如果为true，会根据 <code>direction</code> 和 <code>space</code> 属性计算item的位置。
		*@return
		*/
		__proto__.addItem=function(item,autoLayOut){
			(autoLayOut===void 0)&& (autoLayOut=true);
			var display=item;
			var index=this._items.length;
			display.name="item"+index;
			this.addChild(display);
			this.initItems();
			if (autoLayOut && index > 0){
				var preItem=this._items [index-1];
				if (this._direction=="h"){
					display.x=preItem.x+preItem.width+this._space;
					}else {
					display.y=preItem.y+preItem.height+this._space;
				}
				}else{
				if (autoLayOut){
					display.x=0;
					display.y=0;
				}
			}
			return index;
		}

		/**
		*删除一个项对象。
		*
		*@param item 需要删除的项对象。
		*@param autoLayOut 是否自动布局，如果为true，会根据 <code>direction</code> 和 <code>space</code> 属性计算item的位置。
		*/
		__proto__.delItem=function(item,autoLayOut){
			(autoLayOut===void 0)&& (autoLayOut=true);
			var index=this._items.indexOf(item);
			if (index !=-1){
				var display=item;
				this.removeChild(display);
				for (var i=index+1,n=this._items.length;i < n;i++){
					var child=this._items [i];
					child.name="item"+(i-1);
					if (autoLayOut){
						if (this._direction=="h"){
							child.x-=display.width+this._space;
							}else {
							child.y-=display.height+this._space;
						}
					}
				}
				this.initItems();
				if (this._selectedIndex >-1){
					this.selectedIndex=this._selectedIndex < this._items.length ? this._selectedIndex :(this._selectedIndex-1);
				}
			}
		}

		/**
		*初始化项对象们。
		*/
		__proto__.initItems=function(){
			this._items || (this._items=[]);
			this._items.length=0;
			for (var i=0;i < 10000;i++){
				var item=this.getChildByName("item"+i);
				if (item==null)break ;
				this._items.push(item);
				item.selected=(i===this._selectedIndex);
				item.clickHandler=Handler.create(this,this.itemClick,[i],false);
			}
		}

		/**
		*@private
		*项对象的点击事件侦听处理函数。
		*@param index
		*/
		__proto__.itemClick=function(index){
			this.selectedIndex=index;
		}

		/**
		*@private
		*通过对象的索引设置项对象的 <code>selected</code> 属性值。
		*@param index 需要设置的项对象的索引。
		*@param selected 表示项对象的选中状态。
		*/
		__proto__.setSelect=function(index,selected){
			if (this._items && index >-1 && index < this._items.length)this._items[index].selected=selected;
		}

		/**
		*@private
		*创建一个项显示对象。
		*@param skin 项对象的皮肤。
		*@param label 项对象标签。
		*@return
		*/
		__proto__.createItem=function(skin,label){
			return null;
		}

		/**
		*@private
		*更改项对象的属性值。
		*/
		__proto__.changeLabels=function(){
			if (this._items){
				var left=0
				for (var i=0,n=this._items.length;i < n;i++){
					var btn=this._items [i];
					this._skin && (btn.skin=this._skin);
					this._labelColors && (btn.labelColors=this._labelColors);
					this._labelSize && (btn.labelSize=this._labelSize);
					this._labelBold && (btn.labelBold=this._labelBold);
					this._labelPadding && (btn.labelPadding=this._labelPadding);
					this._labelAlign && (btn.labelAlign=this._labelAlign);
					if (this._direction==="h"){
						btn.y=0;
						btn.x=left;
						left+=btn.width+this._space;
						}else {
						btn.x=0;
						btn.y=left;
						left+=btn.height+this._space;
					}
				}
			}
		}

		/**@inheritDoc */
		__proto__.commitMeasure=function(){
			this.runCallLater(this.changeLabels);
		}

		/**
		*表示当前选择的项索引。默认值为-1。
		*@return
		*/
		GETSET$(0,__proto__,'selectedIndex',function(){
			return this._selectedIndex;
			},function(value){
			if (this._selectedIndex !=value){
				this.setSelect(this._selectedIndex,false);
				this._selectedIndex=value;
				this.setSelect(value,true);
				this.event(/*laya.events.Event.CHANGE*/"change");
				this.selectHandler && this.selectHandler.runWith(this._selectedIndex);
			}
		});

		/**
		*标签集合字符串。以逗号做分割，如"item0,item1,item2,item3,item4,item5"。
		*@return
		*/
		GETSET$(0,__proto__,'labels',function(){
			return this._labels;
			},function(value){
			if (this._labels !=value){
				this._labels=value;
				this.removeChildren();
				this.callLater(this.changeLabels);
				if (this._labels){
					var a=this._labels.split(",");
					for (var i=0,n=a.length;i < n;i++){
						var item=this.createItem(this._skin,a[i]);
						item.name="item"+i;
						this.addChild(item);
					}
				}
				this.initItems();
			}
		});

		/**
		*@copy laya.ui.Image#skin
		*@return
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this.callLater(this.changeLabels);
			}
		});

		/**
		*
		*@param value
		*/
		/**
		*
		*@copy laya.ui.Button#labelColors()
		*@return
		*/
		GETSET$(0,__proto__,'labelColors',function(){
			return this._labelColors;
			},function(value){
			if (this._labelColors !=value){
				this._labelColors=value;
				this.callLater(this.changeLabels);
			}
		});

		/**
		*
		*@param value
		*/
		/**
		*表示按钮文本标签的边距。
		*
		*<p><b>格式：</b>"左边距,上边距,右边距,下边距"。</p>
		*@return
		*/
		GETSET$(0,__proto__,'labelPadding',function(){
			return this._labelPadding;
			},function(value){
			if (this._labelPadding !=value){
				this._labelPadding=value;
				this.callLater(this.changeLabels);
			}
		});

		/**
		*
		*@param value
		*/
		/**
		*获取或设置当前选择的项对象。
		*@return
		*/
		GETSET$(0,__proto__,'selection',function(){
			return this._selectedIndex >-1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] :null;
			},function(value){
			this.selectedIndex=this._items.indexOf(value);
		});

		/**
		*
		*@param value
		*/
		/**
		*表示按钮文本标签是否为粗体字。
		*@return
		*/
		GETSET$(0,__proto__,'labelBold',function(){
			return this._labelBold;
			},function(value){
			if (this._labelBold !=value){
				this._labelBold=value;
				this.callLater(this.changeLabels);
			}
		});

		/**
		*
		*@param value
		*/
		/**
		*按钮标签描边。
		*
		*<p><b>格式：</b>"color,alpha,blurX,blurY,strength,quality"。</p>
		*@return
		*/
		GETSET$(0,__proto__,'labelStroke',function(){
			return this._labelStroke;
			},function(value){
			if (this._labelStroke !=value){
				this._labelStroke=value;
				this.callLater(this.changeLabels);
			}
		});

		/**
		*
		*@param value
		*/
		/**
		*表示按钮文本标签的字体大小。
		*
		*@return
		*/
		GETSET$(0,__proto__,'labelSize',function(){
			return this._labelSize;
			},function(value){
			if (this._labelSize !=value){
				this._labelSize=value;
				this.callLater(this.changeLabels);
			}
		});

		/**
		*项对象们之间的间隔（以像素为单位）。
		*@return
		*/
		GETSET$(0,__proto__,'space',function(){
			return this._space;
			},function(value){
			this._space=value;
			this.callLater(this.changeLabels);
		});

		/**
		*
		*@param value
		*/
		/**
		*布局方向。
		*
		*<p>默认值为"h"。</p>
		*<p><b>取值：</b>
		*<li>"h"：表示水平布局。</li>
		*<li>"v"：表示垂直布局。</li>
		*</p>
		*@return
		*/
		GETSET$(0,__proto__,'direction',function(){
			return this._direction;
			},function(value){
			this._direction=value;
			this.callLater(this.changeLabels);
		});

		/**
		*项对象们的存放数组。
		*@return
		*/
		GETSET$(0,__proto__,'items',function(){
			return this._items;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string'))this.selectedIndex=int(value);
			else if ((value instanceof Array))this.labels=(value).join(",");
			else _super.prototype._$set_dataSource.call(this,value);
		});

		return Group;
	})(Box)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/list.as
	/**
	*<code>List</code> 控件可显示项目列表。默认为垂直方向列表。可通过UI编辑器自定义列表。
	*
	*@example 以下示例代码，创建了一个 <code>List</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.List;
		*import laya.utils.Handler;
		*
		*public class List_Example
		*{
			*public function List_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"],new Handler(this,onLoadComplete));
				*}
			*
			*private function onLoadComplete():void
			*{
				*var arr:Array=[];//创建一个数组，用于存贮列表的数据信息。
				*for (var i:int=0;i &lt;20;i++)
				*{
					*arr.push({label:"item"+i});
					*}
				*
				*var list:List=new List();//创建一个 List 类的实例对象 list 。
				*list.itemRender=Item;//设置 list 的单元格渲染器。
				*list.repeatX=1;//设置 list 的水平方向单元格数量。
				*list.repeatY=10;//设置 list 的垂直方向单元格数量。
				*list.vScrollBarSkin="resource/ui/vscroll.png";//设置 list 的垂直方向滚动条皮肤。
				*list.array=arr;//设置 list 的列表数据源。
				*list.pos(100,100);//设置 list 的位置。
				*list.selectEnable=true;//设置 list 可选。
				*list.selectHandler=new Handler(this,onSelect);//设置 list 改变选择项执行的处理器。
				*Laya.stage.addChild(list);//将 list 添加到显示列表。
				*}
			*
			*private function onSelect(index:int):void
			*{
				*trace("当前选择的项目索引： index= ",index);
				*}
			*}
		*}
	*import laya.ui.Box;
	*import laya.ui.Label;
	*class Item extends Box
	*{
		*public function Item()
		*{
			*graphics.drawRect(0,0,100,20,null,"#ff0000");
			*var label:Label=new Label();
			*label.text="100000";
			*label.name="label";//设置 label 的name属性值。
			*label.size(100,20);
			*addChild(label);
			*}
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.List extends laya.ui.Box
	var List=(function(_super){
		function List(){
			this.selectHandler=null;
			this.renderHandler=null;
			this.mouseHandler=null;
			this.selectEnable=true;
			this.totalPage=0;
			this._content=null;
			this._scrollBar=null;
			this._itemRender=null;
			this._repeatX=0;
			this._repeatY=0;
			this._repeatX2=0;
			this._repeatY2=0;
			this._spaceX=0;
			this._spaceY=0;
			this._array=null;
			this._startIndex=0;
			this._selectedIndex=-1;
			this._page=0;
			this._isVertical=true;
			this._cellSize=20;
			this._isMoved=false;
			List._SUPERC_.call(this);
			this._cells=[];
		}

		CLASS$(List,'laya.ui.List',_super);
		var __proto__=List.prototype;
		LAYABOX.implements(__proto__,{"laya.ui.IItem":true,"laya.ui.IRender":true})
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			laya.ui.Component.prototype.destroy.call(this,destroyChild);
			this._content && this._content.destroy(destroyChild);
			this._scrollBar && this._scrollBar.destroy(destroyChild);
			this._content=null;
			this._scrollBar=null;
			this._itemRender=null;
			this._cells=null;
			this._array=null;
			this.selectHandler=this.renderHandler=this.mouseHandler=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._content=new Box());
		}

		/**
		*@private
		*更改单元格的信息。
		*
		*@internal 在此销毁、创建单元格，并设置单元格的位置等属性。相当于此列表内容发送改变时调用此函数。
		*/
		__proto__.changeCells=function(){
			if (this._itemRender){
				for (var i=this._cells.length-1;i >-1;i--){
					this._cells[i].destroy();
				}
				this._cells.length=0;
				this.scrollBar=this.getChildByName("scrollBar");
				var cell=this.createItem();
				var cellWidth=cell.width+this._spaceX;
				var cellHeight=cell.height+this._spaceY;
				if (this._repeatX < 1 && this._width > 0)this._repeatX2=Math.round(this._width / cellWidth);
				if (this._repeatY < 1 && this._height > 0)this._repeatY2=Math.round(this._height / cellHeight);
				var listWidth=this._width ? this._width :(cellWidth *this.repeatX-this._spaceX);
				var listHeight=this._height ? this._height :(cellHeight *this.repeatY-this._spaceY);
				this._cellSize=this._isVertical ? cellHeight :cellWidth;
				if (this._isVertical && this._scrollBar)this._scrollBar.height=listHeight;
				else if (!this._isVertical && this._scrollBar)this._scrollBar.width=listWidth;
				this.setContentSize(listWidth,listHeight);
				var numX=this._isVertical ? this.repeatX :this.repeatY;
				var numY=(this._isVertical ? this.repeatY :this.repeatX)+(this._scrollBar ? 1 :0);
				for (var k=0;k < numY;k++){
					for (var l=0;l < numX;l++){
						cell=this.createItem();
						cell.x=(this._isVertical ? l :k)*cellWidth;
						cell.y=(this._isVertical ? k :l)*cellHeight;
						cell.name="item"+(k *numX+l);
						this._content.addChild(cell);
						this.addCell(cell);
					}
				}
				if (this._array){
					this.array=this._array;
					this.runCallLater(this.renderItems);
				}
			}
		}

		__proto__.createItem=function(){
			return LAYABOX.isClass(this._itemRender)? new this._itemRender():View.createComp(this._itemRender);
		}

		/**
		*@private
		*添加单元格。
		*@param cell 需要添加的单元格对象。
		*/
		__proto__.addCell=function(cell){
			cell.on(/*laya.events.Event.CLICK*/"click",this,this.onCellMouse);
			cell.on(/*laya.events.Event.RIGHT_CLICK*/"rightclick",this,this.onCellMouse);
			cell.on(/*laya.events.Event.MOUSE_OVER*/"mouseover",this,this.onCellMouse);
			cell.on(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onCellMouse);
			cell.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onCellMouse);
			cell.on(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onCellMouse);
			this._cells.push(cell);
		}

		/**
		*初始化单元格信息。
		*/
		__proto__.initItems=function(){
			if (!this._itemRender){
				for (var i=0;i < 10000;i++){
					var cell=this.getChildByName("item"+i);
					if (cell){
						this.addCell(cell);
						continue ;
					}
					break ;
				}
			}
		}

		/**
		*设置可视区域大小。
		*
		*<p>以（0，0，width参数，height参数）组成的矩形区域为可视区域。</p>
		*@param width 可视区域宽度。
		*@param height 可视区域高度。
		*/
		__proto__.setContentSize=function(width,height){
			this._content.width=width;
			this._content.height=height;
			if (this._scrollBar){
				this._content.scrollRect || (this._content.scrollRect=new Rectangle());
				this._content.scrollRect.setTo(0,0,width,height);
				this.event(/*laya.events.Event.RESIZE*/"resize");
			}
		}

		/**
		*@private
		*单元格的鼠标事件侦听处理函数。
		*@param e
		*/
		__proto__.onCellMouse=function(e){
			if (e.type===/*laya.events.Event.MOUSE_DOWN*/"mousedown")this._isMoved=false;
			var cell=e.currentTarget;
			var index=this._startIndex+this._cells.indexOf(cell);
			if (index < 0)return;
			if (e.type===/*laya.events.Event.CLICK*/"click" || e.type===/*laya.events.Event.RIGHT_CLICK*/"rightclick"){
				if (this.selectEnable && !this._isMoved)this.selectedIndex=index;
				else this.changeCellState(cell,true,0);
				}else if ((e.type===/*laya.events.Event.MOUSE_OVER*/"mouseover" || e.type===/*laya.events.Event.MOUSE_OUT*/"mouseout")&& this._selectedIndex!==index){
				this.changeCellState(cell,e.type===/*laya.events.Event.MOUSE_OVER*/"mouseover",0);
			}
			this.mouseHandler && this.mouseHandler.runWith([e,index]);
		}

		/**
		*@private
		*改变单元格的可视状态。
		*
		*@param cell 单元格对象。
		*@param visable 是否显示。
		*@param index 单元格的属性 <code>index</code> 值。
		*/
		__proto__.changeCellState=function(cell,visable,index){
			var selectBox=cell.getChildByName("selectBox");
			if (selectBox){
				selectBox.visible=visable;
				selectBox.index=index;
			}
		}

		/**
		*@private
		*滚动条的 <code>Event.CHANGE</code> 事件侦听处理函数。
		*@param e
		*/
		__proto__.onScrollBarChange=function(e){
			this.runCallLater(this.changeCells);
			var scrollValue=this._scrollBar.value;
			var lineX=(this._isVertical ? this.repeatX :this.repeatY);
			var lineY=(this._isVertical ? this.repeatY :this.repeatX);
			var index=Math.floor(scrollValue / this._cellSize)*lineX;
			if (index > this._startIndex){
				var num=index-this._startIndex;
				var down=true;
				var toIndex=this._startIndex+lineX *(lineY+1);
				this._isMoved=true;
				}else if (index < this._startIndex){
				num=this._startIndex-index;
				down=false;
				toIndex=this._startIndex-1;
				this._isMoved=true;
			}
			for (var i=0;i < num;i++){
				if (down){
					var cell=this._cells.shift();
					this._cells[this._cells.length]=cell;
					var cellIndex=toIndex+i;
					}else {
					cell=this._cells.pop();
					this._cells.unshift(cell);
					cellIndex=toIndex-i;
				};
				var pos=Math.floor(cellIndex / lineX)*this._cellSize;
				this._isVertical ? cell.y=pos :cell.x=pos;
				this.renderItem(cell,cellIndex);
			}
			this._startIndex=index;
			if (this._isVertical)this._content.scrollRect.y=scrollValue;
			else this._content.scrollRect.x=scrollValue;
		}

		/**
		*@private
		*改变单元格的选择状态。
		*/
		__proto__.changeSelectStatus=function(){
			for (var i=0,n=this._cells.length;i < n;i++){
				this.changeCellState(this._cells[i],this._selectedIndex===this._startIndex+i,1);
			}
		}

		/**
		*@private
		*渲染单元格列表。
		*/
		__proto__.renderItems=function(){
			for (var i=0,n=this._cells.length;i < n;i++){
				this.renderItem(this._cells[i],this._startIndex+i);
			}
			this.changeSelectStatus();
		}

		/**
		*渲染一个单元格。
		*@param cell 需要渲染的单元格对象。
		*@param index 单元格索引。
		*/
		__proto__.renderItem=function(cell,index){
			if (index >=0 && index < this._array.length){
				cell.visible=true;
				cell.dataSource=this._array[index];
				}else {
				cell.visible=false;
				cell.dataSource=null;
			}
			this.event(/*laya.events.Event.RENDER*/"render",[cell,index]);
			this.renderHandler && this.renderHandler.runWith([cell,index]);
		}

		/**
		*刷新列表数据源。
		*/
		__proto__.refresh=function(){
			this.array=this._array;
		}

		/**
		*获取单元格数据源。
		*@param index 单元格索引。
		*@return
		*/
		__proto__.getItem=function(index){
			if (index >-1 && index < this._array.length){
				return this._array[index];
			}
			return null;
		}

		/**
		*修改单元格数据源。
		*@param index 单元格索引。
		*@param source 单元格数据源。
		*/
		__proto__.changeItem=function(index,source){
			if (index >-1 && index < this._array.length){
				this._array[index]=source;
				if (index >=this._startIndex && index < this._startIndex+this._cells.length){
					this.renderItem(this.getCell(index),index);
				}
			}
		}

		/**
		*添加单元格数据源。
		*@param souce
		*/
		__proto__.addItem=function(souce){
			this._array.push(souce);
			this.array=this._array;
		}

		/**
		*添加单元格数据源到对应的数据索引处。
		*@param souce 单元格数据源。
		*@param index 索引。
		*/
		__proto__.addItemAt=function(souce,index){
			this._array.splice(index,0,souce);
			this.array=this._array;
		}

		/**
		*通过数据源索引删除单元格数据源。
		*@param index
		*/
		__proto__.deleteItem=function(index){
			this._array.splice(index,1);
			this.array=this._array;
		}

		/**
		*通过可视单元格索引，获取单元格。
		*@param index 可视单元格索引。
		*@return 单元格对象。
		*/
		__proto__.getCell=function(index){
			this.runCallLater(this.changeCells);
			if (index >-1 && this._cells){
				return this._cells[(index-this._startIndex)% this._cells.length];
			}
			return null;
		}

		/**
		*<p>滚动列表，以设定的数据索引对应的单元格为当前可视列表的第一项。</p>
		*
		*@param index 单元格在数据列表中的索引。
		*/
		__proto__.scrollTo=function(index){
			if (this._scrollBar){
				var numX=this._isVertical ? this.repeatX :this.repeatY;
				this._scrollBar.value=(index / numX)*this._cellSize;
				}else {
				this.startIndex=index;
			}
		}

		/**
		*获取对 <code>List</code> 组件所包含的内容容器 <code>Box</code> 组件的引用。
		*@return
		*/
		GETSET$(0,__proto__,'content',function(){
			return this._content;
		});

		/**
		*水平方向滚动条皮肤。
		*@return
		*/
		GETSET$(0,__proto__,'hScrollBarSkin',function(){
			return this._scrollBar ? this._scrollBar.skin :null;
			},function(value){
			this.removeChildByName("scrollBar");
			var scrollBar=new HScrollBar();
			scrollBar.name="scrollBar";
			scrollBar.bottom=0;
			scrollBar.skin=value;
			this.scrollBar=scrollBar;
			this.addChild(scrollBar);
			this.callLater(this.changeCells);
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this.callLater(this.changeCells);
		});

		/**
		*垂直方向滚动条皮肤。
		*@return
		*/
		GETSET$(0,__proto__,'vScrollBarSkin',function(){
			return this._scrollBar ? this._scrollBar.skin :null;
			},function(value){
			this.removeChildByName("scrollBar");
			var scrollBar=new VScrollBar();
			scrollBar.name="scrollBar";
			scrollBar.right=0;
			scrollBar.skin=value;
			this.scrollBar=scrollBar;
			this.addChild(scrollBar);
			this.callLater(this.changeCells);
		});

		/**
		*单元格渲染器。
		*<p><b>取值：</b>
		*<ol>
		*<li>单元格类对象。</li>
		*<li> UI 的 JSON 描述。</li>
		*</ol></p>
		*@return
		*/
		GETSET$(0,__proto__,'itemRender',function(){
			return this._itemRender;
			},function(value){
			this._itemRender=value;
			this.callLater(this.changeCells);
		});

		/**
		*获取对 <code>List</code> 组件所包含的滚动条 <code>ScrollBar</code> 组件的引用。
		*@return
		*/
		GETSET$(0,__proto__,'scrollBar',function(){
			return this._scrollBar;
			},function(value){
			if (this._scrollBar !=value){
				this._scrollBar=value;
				if (value){
					this.addChild(this._scrollBar);
					this._scrollBar.on(/*laya.events.Event.CHANGE*/"change",this,this.onScrollBarChange);
					this._isVertical=this._scrollBar.isVertical;
				}
			}
		});

		/**
		*表示当前选择的项索引。
		*@return
		*/
		GETSET$(0,__proto__,'selectedIndex',function(){
			return this._selectedIndex;
			},function(value){
			if (this._selectedIndex !=value){
				this._selectedIndex=value;
				if (this._scrollBar){
					if (value < this._startIndex){
						this.scrollTo(value);
						}else if (value+this.repeatX > this._startIndex+this.repeatX *this.repeatY){
						this.scrollTo(this._startIndex+this.repeatX);
					}
				}
				this.changeSelectStatus();
				this.event(/*laya.events.Event.CHANGE*/"change");
				this.selectHandler && this.selectHandler.runWith(value);
			}
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this.callLater(this.changeCells);
		});

		/**
		*水平方向显示的单元格数量。
		*@return
		*/
		GETSET$(0,__proto__,'repeatX',function(){
			return this._repeatX > 0 ? this._repeatX :this._repeatX2 > 0 ? this._repeatX2 :1;
			},function(value){
			this._repeatX=value;
			this.callLater(this.changeCells);
		});

		/**
		*垂直方向显示的单元格数量。
		*@return
		*/
		GETSET$(0,__proto__,'repeatY',function(){
			return this._repeatY > 0 ? this._repeatY :this._repeatY2 > 0 ? this._repeatY2 :1;
			},function(value){
			this._repeatY=value;
			this.callLater(this.changeCells);
		});

		/**
		*水平方向显示的单元格之间的间距（以像素为单位）。
		*@return
		*/
		GETSET$(0,__proto__,'spaceX',function(){
			return this._spaceX;
			},function(value){
			this._spaceX=value;
			this.callLater(this.changeCells);
		});

		/**
		*列表数据源。
		*@return
		*/
		GETSET$(0,__proto__,'array',function(){
			return this._array;
			},function(value){
			this.runCallLater(this.changeCells);
			this._array=value || [];
			var length=this._array.length;
			this.totalPage=Math.ceil(length / (this.repeatX *this.repeatY));
			this._selectedIndex=this._selectedIndex < length ? this._selectedIndex :length-1;
			this.startIndex=this._startIndex;
			if (this._scrollBar){
				var numX=this._isVertical ? this.repeatX :this.repeatY;
				var numY=this._isVertical ? this.repeatY :this.repeatX;
				var lineCount=Math.ceil(length / numX);
				if (this.totalPage > 1){
					this._scrollBar.scrollSize=this._cellSize;
					this._scrollBar.thumbPercent=numY / lineCount;
					this._scrollBar.setScroll(0,(lineCount-numY)*this._cellSize,this._startIndex / numX *this._cellSize);
					this._scrollBar.target=this._content;
					}else {
					this._scrollBar.setScroll(0,0,0);
					this._scrollBar.target=this._content;
				}
			}
		});

		/**
		*垂直方向显示的单元格之间的间距（以像素为单位）。
		*@return
		*/
		GETSET$(0,__proto__,'spaceY',function(){
			return this._spaceY;
			},function(value){
			this._spaceY=value;
			this.callLater(this.changeCells);
		});

		/**
		*当前选中的单元格数据源。
		*@return
		*/
		GETSET$(0,__proto__,'selectedItem',function(){
			return this._selectedIndex !=-1 ? this._array[this._selectedIndex] :null;
			},function(value){
			this.selectedIndex=this._array.indexOf(value);
		});

		/**
		*获取或设置当前选择的单元格对象。
		*@return
		*/
		GETSET$(0,__proto__,'selection',function(){
			return this.getCell(this._selectedIndex);
			},function(value){
			this.selectedIndex=this._startIndex+this._cells.indexOf(value);
		});

		/**
		*当前显示的单元格列表的开始索引。
		*@return
		*/
		GETSET$(0,__proto__,'startIndex',function(){
			return this._startIndex;
			},function(value){
			this._startIndex=value > 0 ? value :0;
			this.callLater(this.renderItems);
		});

		/**
		*列表的当前页码。
		*@return
		*/
		GETSET$(0,__proto__,'page',function(){
			return this._page;
			},function(value){
			this._page=value
			if (this._array){
				this._page=value > 0 ? value :0;
				this._page=this._page < this.totalPage ? this._page :this.totalPage-1;
				this.startIndex=this._page *this.repeatX *this.repeatY;
			}
		});

		/**
		*列表的数据总个数。
		*@return
		*/
		GETSET$(0,__proto__,'length',function(){
			return this._array.length;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string'))this.selectedIndex=LAYABOX.parseInt(value);
			else if ((value instanceof Array))this.array=value
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*单元格集合。
		*@return
		*/
		GETSET$(0,__proto__,'cells',function(){
			this.runCallLater(this.changeCells);
			return this._cells;
		});

		return List;
	})(Box)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/panel.as
	/**
	*<code>Panel</code> 是一个面板容器类。
	*
	*
	*
	*@author yung
	*
	*/
	//class laya.ui.Panel extends laya.ui.Box
	var Panel=(function(_super){
		function Panel(){
			this._content=null;
			this._vScrollBar=null;
			this._hScrollBar=null;
			Panel._SUPERC_.call(this);
			this.width=this.height=100;
			this._content.optimizeFloat=true;
		}

		CLASS$(Panel,'laya.ui.Panel',_super);
		var __proto__=Panel.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			laya.ui.Component.prototype.destroy.call(this,destroyChild);
			this._content && this._content.destroy(destroyChild);
			this._vScrollBar && this._vScrollBar.destroy(destroyChild);
			this._hScrollBar && this._hScrollBar.destroy(destroyChild);
			this._vScrollBar=null;
			this._hScrollBar=null;
			this._content=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			laya.display.Node.prototype.addChild.call(this,this._content=new Box());
		}

		/**@inheritDoc */
		__proto__.addChild=function(child){
			child.on(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this.callLater(this.changeScroll);
			return this._content.addChild(child);
		}

		/**
		*@private
		*子对象的 <code>Event.RESIZE</code> 事件侦听处理函数。
		*@param e
		*/
		__proto__.onResize=function(e){
			this.callLater(this.changeScroll);
		}

		/**@inheritDoc */
		__proto__.addChildAt=function(child,index){
			child.on(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this.callLater(this.changeScroll);
			return this._content.addChildAt(child,index);
		}

		/**@inheritDoc */
		__proto__.removeChild=function(child){
			child.off(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this.callLater(this.changeScroll);
			return this._content.removeChild(child);
		}

		/**@inheritDoc */
		__proto__.removeChildAt=function(index){
			this.getChildAt(index).off(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this.callLater(this.changeScroll);
			return this._content.removeChildAt(index);
		}

		/**@inheritDoc */
		__proto__.removeChildren=function(beginIndex,endIndex){
			(beginIndex===void 0)&& (beginIndex=0);
			(endIndex===void 0)&& (endIndex=0x7fffffff);
			for (var i=this._content.numChildren-1;i >-1;i--){
				this._content.removeChildAt(i);
			}
			this.callLater(this.changeScroll);
			return this;
		}

		/**@inheritDoc */
		__proto__.getChildAt=function(index){
			return this._content.getChildAt(index);
		}

		/**@inheritDoc */
		__proto__.getChildByName=function(name){
			return this._content.getChildByName(name);
		}

		/**@inheritDoc */
		__proto__.getChildIndex=function(child){
			return this._content.getChildIndex(child);
		}

		/**@private */
		__proto__.changeScroll=function(){
			var contentW=this.contentWidth;
			var contentH=this.contentHeight;
			var vscroll=this._vScrollBar;
			var hscroll=this._hScrollBar;
			var vShow=vscroll && contentH > this._height;
			var hShow=hscroll && contentW > this._width;
			var showWidth=vShow ? this._width-vscroll.width :this._width;
			var showHeight=hShow ? this._height-hscroll.height :this._height;
			this.setContentSize(showWidth,showHeight);
			if (vscroll){
				vscroll.x=this._width-vscroll.width;
				vscroll.y=0;
				vscroll.height=this._height-(hShow ? hscroll.height :0);
				vscroll.scrollSize=Math.max(this._height *0.033,1);
				vscroll.thumbPercent=showHeight / contentH;
				vscroll.setScroll(0,contentH-showHeight,vscroll.value);
			}
			if (hscroll){
				hscroll.x=0;
				hscroll.y=this._height-hscroll.height;
				hscroll.width=this._width-(vShow ? vscroll.width :0);
				hscroll.scrollSize=Math.max(this._width *0.033,1);
				hscroll.thumbPercent=showWidth / contentW;
				hscroll.setScroll(0,contentW-showWidth,hscroll.value);
			}
		}

		/**
		*@private
		*设置内容的宽度、高度（以像素为单位）。
		*@param width 宽度。
		*@param height 高度。
		*/
		__proto__.setContentSize=function(width,height){
			var content=this._content;
			content.width=width;
			content.height=height;
			content.scrollRect || (content.scrollRect=new Rectangle());
			content.scrollRect.setTo(0,0,width,height);
		}

		/**
		*@private
		*滚动条的<code><code>Event.MOUSE_DOWN</code>事件侦听处理函数。</code>事件侦听处理函数。
		*@param scrollBar 滚动条对象。
		*@param e
		*/
		__proto__.onScrollBarChange=function(scrollBar,e){
			var rect=this._content.scrollRect;
			if (rect){
				var start=Math.round(scrollBar.value);
				scrollBar.isVertical ? rect.y=start :rect.x=start;
			}
		}

		/**
		*<p>滚动内容容器至设定的垂直、水平方向滚动条位置。</p>
		*@param x 垂直方向滚动条属性value值。滚动条位置数字。
		*@param y 水平方向滚动条属性value值。滚动条位置数字。
		*/
		__proto__.scrollTo=function(x,y){
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			if (this.vScrollBar)this.vScrollBar.value=y;
			if (this.hScrollBar)this.hScrollBar.value=x;
		}

		/**
		*刷新滚动内容。
		*/
		__proto__.refresh=function(){
			this.changeScroll();
		}

		/**@inheritDoc */
		GETSET$(0,__proto__,'numChildren',function(){
			return this._content.numChildren;
		});

		/**
		*@private
		*获取内容宽度（以像素为单位）。
		*@return
		*/
		GETSET$(0,__proto__,'contentWidth',function(){
			var max=0;
			for (var i=this._content.numChildren-1;i >-1;i--){
				var comp=this._content.getChildAt(i);
				max=Math.max(comp.x+comp.width *comp.scaleX,max);
			}
			return max;
		});

		/**
		*@private
		*获取内容高度（以像素为单位）。
		*@return
		*/
		GETSET$(0,__proto__,'contentHeight',function(){
			var max=0;
			for (var i=this._content.numChildren-1;i >-1;i--){
				var comp=this._content.getChildAt(i);
				max=Math.max(comp.y+comp.height *comp.scaleY,max);
			}
			return max;
		});

		/**
		*垂直方向滚动条对象。
		*@return
		*/
		GETSET$(0,__proto__,'vScrollBar',function(){
			return this._vScrollBar;
		});

		/**
		*@inheritDoc
		*@param value
		*/
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this.callLater(this.changeScroll);
		});

		/**
		*水平方向滚动条皮肤。
		*@return
		*/
		GETSET$(0,__proto__,'hScrollBarSkin',function(){
			return this._hScrollBar ? this._hScrollBar.skin :null;
			},function(value){
			if (this._hScrollBar==null){
				laya.display.Node.prototype.addChild.call(this,this._hScrollBar=new HScrollBar());
				this._hScrollBar.on(/*laya.events.Event.CHANGE*/"change",this,this.onScrollBarChange,[this._hScrollBar]);
				this._hScrollBar.target=this._content;
				this.callLater(this.changeScroll);
			}
			this._hScrollBar.skin=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this.callLater(this.changeScroll);
		});

		/**
		*垂直方向滚动条皮肤。
		*@return
		*/
		GETSET$(0,__proto__,'vScrollBarSkin',function(){
			return this._vScrollBar ? this._vScrollBar.skin :null;
			},function(value){
			if (this._vScrollBar==null){
				laya.display.Node.prototype.addChild.call(this,this._vScrollBar=new VScrollBar());
				this._vScrollBar.on(/*laya.events.Event.CHANGE*/"change",this,this.onScrollBarChange,[this._vScrollBar]);
				this._vScrollBar.target=this._content;
				this.callLater(this.changeScroll);
			}
			this._vScrollBar.skin=value;
		});

		/**
		*水平方向滚动条对象。
		*@return
		*/
		GETSET$(0,__proto__,'hScrollBar',function(){
			return this._hScrollBar;
		});

		/**
		*获取内容容器对象。
		*@return
		*/
		GETSET$(0,__proto__,'content',function(){
			return this._content;
		});

		return Panel;
	})(Box)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/tree.as
	/**
	*<code>Tree</code> 控件使用户可以查看排列为可扩展树的层次结构数据。
	*
	*@example 以下示例代码，创建了一个 <code>Tree</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Tree;
		*import laya.utils.Browser;
		*import laya.utils.Handler;
		*
		*public class Tree_Example
		*{
			*
			*public function Tree_Example()
			*{
				*Laya.init(640,800,"false");
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png","resource/ui/vscroll$up.png","resource/ui/clip_selectBox.png","resource/ui/clip_tree_folder.png","resource/ui/clip_tree_arrow.png"],new Handler(this,onLoadComplete));
				*}
			*
			*private function onLoadComplete():void
			*{
				*var xmlString:String;//创建一个xml字符串，用于存储树结构数据。
				*xmlString="&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
				*var domParser:*=new Browser.window.DOMParser();//创建一个DOMParser实例domParser。
				*var xml:*=domParser.parseFromString(xmlString,"text/xml");//解析xml字符。
				*
				*var tree:Tree=new Tree();//创建一个 Tree 类的实例对象 tree 。
				*tree.scrollBarSkin="resource/ui/vscroll.png";//设置 tree 的皮肤。
				*tree.itemRender=Item;//设置 tree 的项渲染器。
				*tree.xml=xml;//设置 tree 的树结构数据。
				*tree.x=100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
				*tree.y=100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
				*tree.width=200;//设置 tree 的宽度。
				*tree.height=100;//设置 tree 的高度。
				*Laya.stage.addChild(tree);//将 tree 添加到显示列表。
				*}
			*}
		*}
	*
	*import laya.ui.Box;
	*import laya.ui.Clip;
	*import laya.ui.Label;
	*class Item extends Box
	*{
		*public function Item()
		*{
			*this.name="render";
			*this.right=0;
			*this.left=0;
			*
			*var selectBox:Clip=new Clip("resource/ui/clip_selectBox.png",1,2);
			*selectBox.name="selectBox";
			*selectBox.height=24;
			*selectBox.x=13;
			*selectBox.y=0;
			*selectBox.left=12;
			*addChild(selectBox);
			*
			*var folder:Clip=new Clip("resource/ui/clip_tree_folder.png",1,3);
			*folder.name="folder";
			*folder.x=14;
			*folder.y=4;
			*addChild(folder);
			*
			*var label:Label=new Label("treeItem");
			*label.name="label";
			*label.color="#ffff00";
			*label.width=150;
			*label.height=22;
			*label.x=33;
			*label.y=1;
			*label.left=33;
			*label.right=0;
			*addChild(label);
			*
			*var arrow:Clip=new Clip("resource/ui/clip_tree_arrow.png",1,2);
			*arrow.name="arrow";
			*arrow.x=0;
			*arrow.y=5;
			*addChild(arrow);
			*}
		*}
	*
	*
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.Tree extends laya.ui.Box
	var Tree=(function(_super){
		function Tree(){
			this._list=null;
			this._source=null;
			this._renderHandler=null;
			this._spaceLeft=10;
			this._spaceBottom=0;
			this._keepStatus=true;
			Tree._SUPERC_.call(this);
			this.width=this.height=200;
		}

		CLASS$(Tree,'laya.ui.Tree',_super);
		var __proto__=Tree.prototype;
		LAYABOX.implements(__proto__,{"laya.ui.IRender":true})
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			laya.ui.Component.prototype.destroy.call(this,destroyChild);
			this._list && this._list.destroy(destroyChild);
			this._list=null;
			this._source=null;
			this._renderHandler=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._list=new List());
			this._list.renderHandler=Handler.create(this,this.renderItem,null,false);
			this._list.repeatX=1;
			this._list.on(/*laya.events.Event.CHANGE*/"change",this,this.onListChange);
		}

		/**
		*@private
		*此对象包含的<code>List</code>实例的<code>Event.CHANGE</code>事件侦听处理函数。
		*/
		__proto__.onListChange=function(e){
			this.event(/*laya.events.Event.CHANGE*/"change");
		}

		/**
		*@private
		*获取数据源集合。
		*@return
		*/
		__proto__.getArray=function(){
			var arr=[];
			var item;
			/*for each*/for(var $each_item in this._source){
				item=this._source[$each_item];
				if (this.getParentOpenStatus(item)){
					item.x=this._spaceLeft *this.getDepth(item);
					arr.push(item);
				}
			}
			return arr;
		}

		/**
		*@private
		*获取项对象的深度。
		*
		*@param item 项对象。
		*@param num
		*@return
		*/
		__proto__.getDepth=function(item,num){
			(num===void 0)&& (num=0);
			if (item.nodeParent==null)return num;
			else return this.getDepth(item.nodeParent,num+1);
		}

		/**
		*@private
		*获取项对象的上一级的打开状态。
		*@param item
		*@return
		*/
		__proto__.getParentOpenStatus=function(item){
			var parent=item.nodeParent;
			if (parent==null){
				return true;
				}else {
				if (parent.isOpen){
					if (parent.nodeParent !=null)return this.getParentOpenStatus(parent);
					else return true;
					}else {
					return false;
				}
			}
		}

		/**
		*@private
		*渲染一个项对象。
		*@param cell 一个项对象。
		*@param index 项的索引。
		*/
		__proto__.renderItem=function(cell,index){
			var item=cell.dataSource;
			if (item){
				cell.left=item.x;
				var arrow=cell.getChildByName("arrow");
				if (arrow){
					if (item.hasChild){
						arrow.visible=true;
						arrow.index=item.isOpen ? 1 :0;
						arrow.tag=index;
						arrow.off(/*laya.events.Event.CLICK*/"click",this,this.onArrowClick);
						arrow.on(/*laya.events.Event.CLICK*/"click",this,this.onArrowClick);
						}else {
						arrow.visible=false;
					}
				};
				var folder=cell.getChildByName("folder");
				if (folder){
					if (folder.clipY==2){
						folder.index=item.isDirectory ? 0 :1;
						}else {
						folder.index=item.isDirectory ? item.isOpen ? 1 :0 :2;
					}
				}
				this._renderHandler && this._renderHandler.runWith([cell,index]);
			}
		}

		/**
		*@private
		*/
		__proto__.onArrowClick=function(e){
			var arrow=e.currentTarget;
			var index=arrow.tag;
			this._list.array[index].isOpen=!this._list.array[index].isOpen;
			this._list.array=this.getArray();
		}

		/**
		*通过数据项索引，设置项对象的打开状态。
		*@param index
		*@param isOpen
		*/
		__proto__.setItemState=function(index,isOpen){
			if (!this._list.array[index])return;
			this._list.array[index].isOpen=isOpen;
			this._list.array=this.getArray();
		}

		/**
		*@private
		*
		*解析并处理XML类型的数据源。
		*@param xml
		*@param source
		*@param nodeParent
		*@param isRoot
		*/
		__proto__.parseXml=function(xml,source,nodeParent,isRoot){
			var obj;
			var list=xml.childNodes;
			var childCount=list.length;
			if (!isRoot){
				obj={};
				var list2=xml.attributes;
				var attrs;
				/*for each*/for(var $each_attrs in list2){
					attrs=list2[$each_attrs];
					var prop=attrs.nodeName;
					var value=attrs.nodeValue;
					obj[prop]=value=="true" ? true :value=="false" ? false :value;
				}
				obj.nodeParent=nodeParent;
				if (childCount > 0)obj.isDirectory=true;
				obj.hasChild=childCount > 0;
				source.push(obj);
			}
			for (var i=0;i < childCount;i++){
				var node=list[i];
				this.parseXml(node,source,obj,false);
			}
		}

		/**
		*@private
		*处理数据项的打开状态。
		*@param oldSource
		*@param newSource
		*/
		__proto__.parseOpenStatus=function(oldSource,newSource){
			for (var i=0,n=newSource.length;i < n;i++){
				var newItem=newSource[i];
				if (newItem.isDirectory){
					for (var j=0,m=oldSource.length;j < m;j++){
						var oldItem=oldSource[j];
						if (oldItem.isDirectory && this.isSameParent(oldItem,newItem)&& newItem.label==oldItem.label){
							newItem.isOpen=oldItem.isOpen;
							break ;
						}
					}
				}
			}
		}

		/**
		*@private
		*判断两个项对象在树结构中的父节点是否相同。
		*@param item1 项对象。
		*@param item2 项对象。
		*@return
		*/
		__proto__.isSameParent=function(item1,item2){
			if (item1.nodeParent==null && item2.nodeParent==null)return true;
			else if (item1.nodeParent==null || item2.nodeParent==null)return false
			else {
				if (item1.nodeParent.label==item2.nodeParent.label)return this.isSameParent(item1.nodeParent,item2.nodeParent);
				else return false;
			}
		}

		/**
		*@internal ##??
		*@param key
		*/
		__proto__.filter=function(key){
			if (Boolean(key)){
				var result=[];
				this.getFilterSource(this._source,result,key);
				this._list.array=result;
				}else {
				this._list.array=this.getArray();
			}
		}

		/**
		*@private
		*
		*@param array
		*@param result
		*@param key
		*/
		__proto__.getFilterSource=function(array,result,key){
			key=key.toLocaleLowerCase();
			var item;
			/*for each*/for(var $each_item in array){
				item=array[$each_item];
				if (!item.isDirectory && String(item.label).toLowerCase().indexOf(key)>-1){
					item.x=0;
					result.push(item);
				}
				if (item.child && item.child.length > 0){
					this.getFilterSource(item.child,result,key);
				}
			}
		}

		/**
		*数据源发生变化后，是否保持之前打开状态，默认为true。
		*
		*<p><b>取值：</b>
		*<li>true：保持之前打开状态。</li>
		*<li>false：不保持之前打开状态。</li>
		*</p>
		*@return
		*/
		GETSET$(0,__proto__,'keepStatus',function(){
			return this._keepStatus;
			},function(value){
			this._keepStatus=value;
		});

		/**
		*此对象包含的<code>List</code>实例对象。
		*@return
		*/
		GETSET$(0,__proto__,'list',function(){
			return this._list;
		});

		/**
		*滚动条皮肤。
		*@return
		*/
		GETSET$(0,__proto__,'scrollBarSkin',function(){
			return this._list.vScrollBarSkin;
			},function(value){
			this._list.vScrollBarSkin=value;
		});

		/**
		*列表数据源，只包含当前可视节点数据。
		*@return
		*/
		GETSET$(0,__proto__,'array',function(){
			return this._list.array;
			},function(value){
			if (this._keepStatus && this._list.array && value){
				this.parseOpenStatus(this._list.array,value);
			}
			this._source=value;
			this._list.array=this.getArray();
		});

		/**
		*当前选中的项对象的数据源。
		*@return
		*/
		GETSET$(0,__proto__,'selectedItem',function(){
			return this._list.selectedItem;
			},function(value){
			this._list.selectedItem=value;
		});

		/**
		*数据源，全部节点数据。
		*@return
		*/
		GETSET$(0,__proto__,'source',function(){
			return this._source;
		});

		/**
		*左侧缩进距离（以像素为单位）。
		*@return
		*/
		GETSET$(0,__proto__,'spaceLeft',function(){
			return this._spaceLeft;
			},function(value){
			this._spaceLeft=value;
		});

		/**
		*此对象包含的<code>List</code>实例的单元格渲染器。
		*
		*<p><b>取值：</b>
		*<ol>
		*<li>单元格类对象。</li>
		*<li> UI 的 JSON 描述。</li>
		*</ol></p>
		*
		*@return
		*/
		GETSET$(0,__proto__,'itemRender',function(){
			return this._list.itemRender;
			},function(value){
			this._list.itemRender=value;
		});

		/**
		*单元格鼠标事件处理器。
		*<p>默认返回参数（e:Event,index:int）。</p>
		*@return
		*/
		GETSET$(0,__proto__,'mouseHandler',function(){
			return this._list.mouseHandler;
			},function(value){
			this._list.mouseHandler=value;
		});

		/**
		*<code>Tree</code> 实例的渲染处理器。
		*@return
		*/
		GETSET$(0,__proto__,'renderHandler',function(){
			return this._renderHandler;
			},function(value){
			this._renderHandler=value;
		});

		/**
		*每一项之间的间隔距离（以像素为单位）。
		*@return
		*/
		GETSET$(0,__proto__,'spaceBottom',function(){
			return this._list.spaceY;
			},function(value){
			this._list.spaceY=value;
		});

		/**
		*表示当前选择的项索引。
		*@return
		*/
		GETSET$(0,__proto__,'selectedIndex',function(){
			return this._list.selectedIndex;
			},function(value){
			this._list.selectedIndex=value;
		});

		/**
		*@inheritDoc
		*@param value
		*/
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._list.width=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._list.height=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((value instanceof XML))this.xml=value;
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*xml结构的数据源。
		*@param value
		*/
		GETSET$(0,__proto__,'xml',null,function(value){
			var arr=[];
			this.parseXml(value.childNodes[0],arr,null,true);
			this.array=arr;
		});

		/**
		*表示选择的树节点项的<code>path</code>属性值。
		*@return
		*/
		GETSET$(0,__proto__,'selectedPath',function(){
			if (this._list.selectedItem){
				return this._list.selectedItem.path;
			}
			return null;
		});

		return Tree;
	})(Box)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/viewstack.as
	/**
	*<code>ViewStack</code> 类用于视图堆栈类，用于视图的显示等设置处理。
	*@author yung
	*/
	//class laya.ui.ViewStack extends laya.ui.Box
	var ViewStack=(function(_super){
		function ViewStack(){
			this._items=null;
			this._selectedIndex=0;
			ViewStack._SUPERC_.call(this);
			this._setIndexHandler=Handler.create(this,this.setIndex,null,false);
		}

		CLASS$(ViewStack,'laya.ui.ViewStack',_super);
		var __proto__=ViewStack.prototype;
		LAYABOX.implements(__proto__,{"laya.ui.IItem":true})
		/**
		*批量设置视图对象。
		*@param views 视图对象数组。
		*/
		__proto__.setItems=function(views){
			this.removeChildren();
			var index=0;
			for (var i=0,n=views.length;i < n;i++){
				var item=views[i];
				if (item){
					item.name="item"+index;
					this.addChild(item);
					index++;
				}
			}
			this.initItems();
		}

		/**
		*添加视图。
		*
		*@internal 添加视图对象，并设置此视图对象的<code>name</code> 属性。
		*@param view 需要添加的视图对象。
		*/
		__proto__.addItem=function(view){
			view.name="item"+this._items.length;
			this.addChild(view);
			this.initItems();
		}

		/**
		*初始化视图对象集合。
		*/
		__proto__.initItems=function(){
			this._items=[];
			for (var i=0;i < 10000;i++){
				var item=this.getChildByName("item"+i);
				if (item==null){
					break ;
				}
				this._items.push(item);
				item.visible=(i==this._selectedIndex);
			}
		}

		/**
		*@private
		*通过对象的索引设置项对象的 <code>selected</code> 属性值。
		*@param index 需要设置的对象的索引。
		*@param selected 表示对象的选中状态。
		*/
		__proto__.setSelect=function(index,selected){
			if (this._items && index >-1 && index < this._items.length){
				this._items[index].visible=selected;
			}
		}

		/**
		*@private
		*设置属性<code>selectedIndex</code>的值。
		*@param index
		*/
		__proto__.setIndex=function(index){
			this.selectedIndex=index;
		}

		/**
		*表示当前视图索引。
		*@return
		*/
		GETSET$(0,__proto__,'selectedIndex',function(){
			return this._selectedIndex;
			},function(value){
			if (this._selectedIndex !=value){
				this.setSelect(this._selectedIndex,false);
				this._selectedIndex=value;
				this.setSelect(this._selectedIndex,true);
			}
		});

		/**
		*获取或设置当前选择的项对象。
		*@return
		*/
		GETSET$(0,__proto__,'selection',function(){
			return this._selectedIndex >-1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] :null;
			},function(value){
			this.selectedIndex=this._items.indexOf(value);
		});

		/**
		*索引设置处理器。
		*<p>默认回调参数：index:int</p>
		*@return
		*/
		GETSET$(0,__proto__,'setIndexHandler',function(){
			return this._setIndexHandler;
			},function(value){
			this._setIndexHandler=value;
		});

		/**
		*视图集合数组。
		*@return
		*/
		GETSET$(0,__proto__,'items',function(){
			return this._items;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string')){
				this.selectedIndex=int(value);
				}else {
				for (var prop in this._dataSource){
					if (this.hasOwnProperty(prop)){
						this[prop]=this._dataSource[prop];
					}
				}
			}
		});

		return ViewStack;
	})(Box)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/checkbox.as
	/**
	*<code>CheckBox</code> 组件显示一个小方框，该方框内可以有选中标记。
	*<code>CheckBox</code> 组件还可以显示可选的文本标签，默认该标签位于 CheckBox 右侧。
	*<p><code>CheckBox</code> 使用 <code>dataSource</code>赋值时的的默认属性是：<code>selected</code>。</p>
	*
	*@example 以下示例代码，创建了一个 <code>CheckBox</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.CheckBox;
		*import laya.utils.Handler;
		*
		*public class CheckBox_Example
		*{
			*public function CheckBox_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/check.png",new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*trace("资源加载完成！");
				*var checkBox:CheckBox=new CheckBox("resource/ui/check.png","这个是一个CheckBox组件。");//创建一个 CheckBox 类的实例对象 checkBox ,传入它的皮肤skin和标签label。
				*checkBox.x=100;//设置 checkBox 对象的属性 x 的值，用于控制 checkBox 对象的显示位置。
				*checkBox.y=100;//设置 checkBox 对象的属性 y 的值，用于控制 checkBox 对象的显示位置。
				*checkBox.clickHandler=new Handler(this,onClick,[checkBox]);//设置 checkBox 的点击事件处理器。
				*Laya.stage.addChild(checkBox);//将此 checkBox 对象添加到显示列表。
				*}
			*
			*private function onClick(checkBox:CheckBox):void
			*{
				*trace("输出选中状态: checkBox.selected = "+checkBox.selected);
				*}
			*}
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.load("resource/ui/check.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete()
	*{
		*console.log("资源加载完成！");
		*var checkBox=new laya.ui.CheckBox("resource/ui/check.png","这个是一个CheckBox组件。");//创建一个 CheckBox 类的类的实例对象 checkBox ,传入它的皮肤skin和标签label。
		*checkBox.x=100;//设置 checkBox 对象的属性 x 的值，用于控制 checkBox 对象的显示位置。
		*checkBox.y=100;//设置 checkBox 对象的属性 y 的值，用于控制 checkBox 对象的显示位置。
		*checkBox.clickHandler=new laya.utils.Handler(this,onClick,[checkBox],false);//设置 checkBox 的点击事件处理器。
		*Laya.stage.addChild(checkBox);//将此 checkBox 对象添加到显示列表。
		*}
	*function onClick(checkBox)
	*{
		*console.log("checkBox.selected = ",checkBox.selected);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.CheckBox extends laya.ui.Button
	var CheckBox=(function(_super){
		/**
		*创建一个新的 <code>CheckBox</code> 组件实例。
		*@param skin 皮肤资源地址。
		*@param label 文本标签的内容。
		*/
		function CheckBox(skin,label){
			(label===void 0)&& (label="");
			CheckBox._SUPERC_.call(this,skin,label);
		}

		CLASS$(CheckBox,'laya.ui.CheckBox',_super);
		var __proto__=CheckBox.prototype;
		/**@inheritDoc */
		__proto__.preinitialize=function(){
			laya.ui.Component.prototype.preinitialize.call(this);
			this.toggle=true;
			this._autoSize=false;
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			_super.prototype.initialize.call(this);
			this._text.align="left";
			this._text.valign="top";
			this._text.width=0;
		}

		/**@inheritDoc */
		GETSET$(0,__proto__,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='boolean'))this.selected=value;
			else if ((typeof value=='string'))this.selected=value==="true";
			else _super.prototype._$set_dataSource.call(this,value);
		});

		return CheckBox;
	})(Button)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/hscrollbar.as
	/**
	*使用 <code>HScrollBar</code> （水平 <code>ScrollBar</code> ）控件，可以在因数据太多而不能在显示区域完全显示时控制显示的数据部分。
	*
	*
	*@example 以下示例代码，创建了一个 <code>HScrollBar</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.HScrollBar;
		*import laya.utils.Handler;
		*
		*public class HScrollBar_Example
		*{
			*private var hScrollBar:HScrollBar;
			*public function HScrollBar_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/hscroll.png","resource/ui/hscroll$bar.png","resource/ui/hscroll$down.png","resource/ui/hscroll$up.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*hScrollBar=new HScrollBar();//创建一个 HScrollBar 类的实例对象 hScrollBar 。
				*hScrollBar.skin="resource/ui/hscroll.png";//设置 hScrollBar 的皮肤。
				*hScrollBar.x=100;//设置 hScrollBar 对象的属性 x 的值，用于控制 hScrollBar 对象的显示位置。
				*hScrollBar.y=100;//设置 hScrollBar 对象的属性 y 的值，用于控制 hScrollBar 对象的显示位置。
				*hScrollBar.changeHandler=new Handler(this,onChange);//设置 hScrollBar 的滚动变化处理器。
				*Laya.stage.addChild(hScrollBar);//将此 hScrollBar 对象添加到显示列表。
				*}
			*
			*private function onChange(value:Number):void
			*{
				*trace("滚动条的位置： value="+value);
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var hScrollBar;
	*var res=["resource/ui/hscroll.png","resource/ui/hscroll$bar.png","resource/ui/hscroll$down.png","resource/ui/hscroll$up.png"];
	*Laya.loader.loadAssets(res,laya.utils.Handler.create(this,onLoadComplete));//加载资源。
	*
	*function onLoadComplete(){
		*console.log("资源加载完成！");
		*hScrollBar=new laya.ui.HScrollBar();//创建一个 HScrollBar 类的实例对象 hScrollBar 。
		*hScrollBar.skin="resource/ui/hscroll.png";//设置 hScrollBar 的皮肤。
		*hScrollBar.x=100;//设置 hScrollBar 对象的属性 x 的值，用于控制 hScrollBar 对象的显示位置。
		*hScrollBar.y=100;//设置 hScrollBar 对象的属性 y 的值，用于控制 hScrollBar 对象的显示位置。
		*hScrollBar.changeHandler=new laya.utils.Handler(this,onChange);//设置 hScrollBar 的滚动变化处理器。
		*Laya.stage.addChild(hScrollBar);//将此 hScrollBar 对象添加到显示列表。
		*}
	*
	*function onChange(value)
	*{
		*console.log("滚动条的位置： value="+value);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*
	*@author yung
	*/
	//class laya.ui.HScrollBar extends laya.ui.ScrollBar
	var HScrollBar=(function(_super){
		function HScrollBar(){HScrollBar._SUPERC_.call(this);;
		};

		CLASS$(HScrollBar,'laya.ui.HScrollBar',_super);
		var __proto__=HScrollBar.prototype;
		/**@inheritDoc */
		__proto__.initialize=function(){
			_super.prototype.initialize.call(this);
			this._slider.isVertical=false;
		}

		return HScrollBar;
	})(ScrollBar)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/hslider.as
	/**
	*使用 <code>HSlider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	*
	*<p> <code>HSlider</code> 控件采用水平方向。滑块轨道从左向右扩展，而标签位于轨道的顶部或底部。</p>
	*
	*@example 以下示例代码，创建了一个 <code>HSlider</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.HSlider;
		*import laya.utils.Handler;
		*
		*public class HSlider_Example
		*{
			*private var hSlider:HSlider;
			*
			*public function HSlider_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/hslider.png","resource/ui/hslider$bar.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*hSlider=new HSlider();//创建一个 HSlider 类的实例对象 hSlider 。
				*hSlider.skin="resource/ui/hslider.png";//设置 hSlider 的皮肤。
				*hSlider.min=0;//设置 hSlider 最低位置值。
				*hSlider.max=10;//设置 hSlider 最高位置值。
				*hSlider.value=2;//设置 hSlider 当前位置值。
				*hSlider.tick=1;//设置 hSlider 刻度值。
				*hSlider.x=100;//设置 hSlider 对象的属性 x 的值，用于控制 hSlider 对象的显示位置。
				*hSlider.y=100;//设置 hSlider 对象的属性 y 的值，用于控制 hSlider 对象的显示位置。
				*hSlider.changeHandler=new Handler(this,onChange);//设置 hSlider 位置变化处理器。
				*Laya.stage.addChild(hSlider);//把 hSlider 添加到显示列表。
				*}
			*
			*private function onChange(value:Number):void
			*{
				*trace("滑块的位置： value="+value);
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var hSlider;
	*var res=["resource/ui/hslider.png","resource/ui/hslider$bar.png"];
	*Laya.loader.loadAssets(res,new laya.utils.Handler(this,onLoadComplete));
	*function onLoadComplete(){
		*console.log("资源加载完成！");
		*hSlider=new laya.ui.HSlider();//创建一个 HSlider 类的实例对象 hSlider 。
		*hSlider.skin="resource/ui/hslider.png";//设置 hSlider 的皮肤。
		*hSlider.min=0;//设置 hSlider 最低位置值。
		*hSlider.max=10;//设置 hSlider 最高位置值。
		*hSlider.value=2;//设置 hSlider 当前位置值。
		*hSlider.tick=1;//设置 hSlider 刻度值。
		*hSlider.x=100;//设置 hSlider 对象的属性 x 的值，用于控制 hSlider 对象的显示位置。
		*hSlider.y=100;//设置 hSlider 对象的属性 y 的值，用于控制 hSlider 对象的显示位置。
		*hSlider.changeHandler=new laya.utils.Handler(this,onChange);//设置 hSlider 位置变化处理器。
		*Laya.stage.addChild(hSlider);//把 hSlider 添加到显示列表。
		*}
	*
	*function onChange(value)
	*{
		*console.log("滑块的位置： value="+value);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*
	*@see laya.ui.Slider
	*@author yung
	*/
	//class laya.ui.HSlider extends laya.ui.Slider
	var HSlider=(function(_super){
		/**
		*创建一个 <code>HSlider</code> 类实例。
		*@param skin 皮肤。
		*/
		function HSlider(skin){
			HSlider._SUPERC_.call(this,skin);
			this.isVertical=false;
		}

		CLASS$(HSlider,'laya.ui.HSlider',_super);
		return HSlider;
	})(Slider)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/radio.as
	/**
	*<code>Radio</code> 控件使用户可在一组互相排斥的选择中做出一种选择。
	*用户一次只能选择 <code>Radio</code> 组中的一个成员。选择未选中的组成员将取消选择该组中当前所选的 <code>Radio</code> 控件。
	*
	*
	*@see laya.ui.RadioGroup
	*@author yung
	*/
	//class laya.ui.Radio extends laya.ui.Button
	var Radio=(function(_super){
		function Radio(skin,label){
			this._value=null;
			(label===void 0)&& (label="");
			Radio._SUPERC_.call(this,skin,label);
		}

		CLASS$(Radio,'laya.ui.Radio',_super);
		var __proto__=Radio.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._value=null;
		}

		/**@inheritDoc */
		__proto__.preinitialize=function(){
			laya.ui.Component.prototype.preinitialize.call(this);
			this.toggle=false;
			this._autoSize=false;
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			_super.prototype.initialize.call(this);
			this._text.align="left";
			this._text.valign="top";
			this._text.width=0;
			this.on(/*laya.events.Event.CLICK*/"click",this,this.onClick);
		}

		/**
		*@private
		*对象的<code>Event.CLICK</code>事件侦听处理函数。
		*/
		__proto__.onClick=function(e){
			this.selected=true;
		}

		/**
		*获取或设置 <code>Radio</code> 关联的可选用户定义值。
		*
		*@internal ##?
		*@return
		*/
		GETSET$(0,__proto__,'value',function(){
			return this._value !=null ? this._value :this.label;
			},function(obj){
			this._value=obj;
		});

		return Radio;
	})(Button)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/vscrollbar.as
	/**
	*
	*使用 <code>VScrollBar</code> （垂直 <code>ScrollBar</code> ）控件，可以在因数据太多而不能在显示区域完全显示时控制显示的数据部分。
	*
	*@example 以下示例代码，创建了一个 <code>VScrollBar</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.vScrollBar;
		*import laya.ui.VScrollBar;
		*import laya.utils.Handler;
		*
		*public class VScrollBar_Example
		*{
			*private var vScrollBar:VScrollBar;
			*public function VScrollBar_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"],new Handler(this,onLoadComplete));
				*}
			*
			*private function onLoadComplete():void
			*{
				*vScrollBar=new VScrollBar();//创建一个 vScrollBar 类的实例对象 hScrollBar 。
				*vScrollBar.skin="resource/ui/vscroll.png";//设置 vScrollBar 的皮肤。
				*vScrollBar.x=100;//设置 vScrollBar 对象的属性 x 的值，用于控制 vScrollBar 对象的显示位置。
				*vScrollBar.y=100;//设置 vScrollBar 对象的属性 y 的值，用于控制 vScrollBar 对象的显示位置。
				*vScrollBar.changeHandler=new Handler(this,onChange);//设置 vScrollBar 的滚动变化处理器。
				*Laya.stage.addChild(vScrollBar);//将此 vScrollBar 对象添加到显示列表。
				*}
			*
			*private function onChange(value:Number):void
			*{
				*trace("滚动条的位置： value="+value);
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var vScrollBar;
	*var res=["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"];
	*Laya.loader.loadAssets(res,new laya.utils.Handler(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*vScrollBar=new laya.ui.VScrollBar();//创建一个 vScrollBar 类的实例对象 hScrollBar 。
		*vScrollBar.skin="resource/ui/vscroll.png";//设置 vScrollBar 的皮肤。
		*vScrollBar.x=100;//设置 vScrollBar 对象的属性 x 的值，用于控制 vScrollBar 对象的显示位置。
		*vScrollBar.y=100;//设置 vScrollBar 对象的属性 y 的值，用于控制 vScrollBar 对象的显示位置。
		*vScrollBar.changeHandler=new laya.utils.Handler(this,onChange);//设置 vScrollBar 的滚动变化处理器。
		*Laya.stage.addChild(vScrollBar);//将此 vScrollBar 对象添加到显示列表。
		*}
	*function onChange(value){
		*console.log("滚动条的位置： value="+value);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.VScrollBar extends laya.ui.ScrollBar
	var VScrollBar=(function(_super){
		function VScrollBar(){VScrollBar._SUPERC_.call(this);;
		};

		CLASS$(VScrollBar,'laya.ui.VScrollBar',_super);
		return VScrollBar;
	})(ScrollBar)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/vslider.as
	/**
	*使用 <code>VSlider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	*
	*<p> <code>VSlider</code> 控件采用垂直方向。滑块轨道从下往上扩展，而标签位于轨道的左右两侧。</p>
	*
	*@example 以下示例代码，创建了一个 <code>VSlider</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.HSlider;
		*import laya.ui.VSlider;
		*import laya.utils.Handler;
		*
		*public class VSlider_Example
		*{
			*private var vSlider:VSlider;
			*
			*public function VSlider_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/vslider.png","resource/ui/vslider$bar.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*vSlider=new VSlider();//创建一个 VSlider 类的实例对象 vSlider 。
				*vSlider.skin="resource/ui/vslider.png";//设置 vSlider 的皮肤。
				*vSlider.min=0;//设置 vSlider 最低位置值。
				*vSlider.max=10;//设置 vSlider 最高位置值。
				*vSlider.value=2;//设置 vSlider 当前位置值。
				*vSlider.tick=1;//设置 vSlider 刻度值。
				*vSlider.x=100;//设置 vSlider 对象的属性 x 的值，用于控制 vSlider 对象的显示位置。
				*vSlider.y=100;//设置 vSlider 对象的属性 y 的值，用于控制 vSlider 对象的显示位置。
				*vSlider.changeHandler=new Handler(this,onChange);//设置 vSlider 位置变化处理器。
				*Laya.stage.addChild(vSlider);//把 vSlider 添加到显示列表。
				*}
			*
			*private function onChange(value:Number):void
			*{
				*trace("滑块的位置： value="+value);
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var vSlider;
	*Laya.loader.loadAssets(["resource/ui/vslider.png","resource/ui/vslider$bar.png"],laya.utils.Handler.create(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*vSlider=new laya.ui.VSlider();//创建一个 VSlider 类的实例对象 vSlider 。
		*vSlider.skin="resource/ui/vslider.png";//设置 vSlider 的皮肤。
		*vSlider.min=0;//设置 vSlider 最低位置值。
		*vSlider.max=10;//设置 vSlider 最高位置值。
		*vSlider.value=2;//设置 vSlider 当前位置值。
		*vSlider.tick=1;//设置 vSlider 刻度值。
		*vSlider.x=100;//设置 vSlider 对象的属性 x 的值，用于控制 vSlider 对象的显示位置。
		*vSlider.y=100;//设置 vSlider 对象的属性 y 的值，用于控制 vSlider 对象的显示位置。
		*vSlider.changeHandler=new laya.utils.Handler(this,onChange);//设置 vSlider 位置变化处理器。
		*Laya.stage.addChild(vSlider);//把 vSlider 添加到显示列表。
		*}
	*function onChange(value){
		*console.log("滑块的位置： value="+value);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@see laya.ui.Slider
	*@author yung
	*/
	//class laya.ui.VSlider extends laya.ui.Slider
	var VSlider=(function(_super){
		function VSlider(){VSlider._SUPERC_.call(this);;
		};

		CLASS$(VSlider,'laya.ui.VSlider',_super);
		return VSlider;
	})(Slider)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/textinput.as
	/**
	*<code>TextInput</code> 类用于创建显示对象以显示和输入文本。
	*
	*@example 以下示例代码，创建了一个 <code>TextInput</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.display.Stage;
		*import laya.ui.TextInput;
		*import laya.utils.Handler;
		*
		*public class TextInput_Example
		*{
			*public function TextInput_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/input.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*var textInput:TextInput=new TextInput("这是一个TextInput实例。");//创建一个 TextInput 类的实例对象 textInput 。
				*textInput.skin="resource/ui/input.png";//设置 textInput 的皮肤。
				*textInput.sizeGrid="4,4,4,4";//设置 textInput 的网格信息。
				*textInput.color="#008fff";//设置 textInput 的文本颜色。
				*textInput.font="Arial";//设置 textInput 的文本字体。
				*textInput.bold=true;//设置 textInput 的文本显示为粗体。
				*textInput.fontSize=30;//设置 textInput 的字体大小。
				*textInput.wordWrap=true;//设置 textInput 的文本自动换行。
				*textInput.x=100;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
				*textInput.y=100;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
				*textInput.width=300;//设置 textInput 的宽度。
				*textInput.height=200;//设置 textInput 的高度。
				*Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.loadAssets(["resource/ui/input.png"],new laya.utils.Handler(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*var textInput=new laya.ui.TextInput("这是一个TextInput实例。");//创建一个 TextInput 类的实例对象 textInput 。
		*textInput.skin="resource/ui/input.png";//设置 textInput 的皮肤。
		*textInput.sizeGrid="4,4,4,4";//设置 textInput 的网格信息。
		*textInput.color="#008fff";//设置 textInput 的文本颜色。
		*textInput.font="Arial";//设置 textInput 的文本字体。
		*textInput.bold=true;//设置 textInput 的文本显示为粗体。
		*textInput.fontSize=30;//设置 textInput 的字体大小。
		*textInput.wordWrap=true;//设置 textInput 的文本自动换行。
		*textInput.x=100;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
		*textInput.y=100;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
		*textInput.width=300;//设置 textInput 的宽度。
		*textInput.height=200;//设置 textInput 的高度。
		*Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.TextInput extends laya.ui.Label
	var TextInput=(function(_super){
		function TextInput(text){
			this._bg=null;
			this._skin=null;
			TextInput._SUPERC_.call(this);
			(text===void 0)&& (text="");
			this.text=text;
			this.skin=this.skin;
			this.mouseEnabled=true;
		}

		CLASS$(TextInput,'laya.ui.TextInput',_super);
		var __proto__=TextInput.prototype;
		/**@inheritDoc */
		__proto__.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._bg && this._bg.destroy();
			this._bg=null;
		}

		/**@inheritDoc */
		__proto__.createChildren=function(){
			this.addChild(this._tf=new Input());
			this._tf.on(/*laya.events.Event.INPUT*/"input",this,this.onInput);
			this._tf.on(/*laya.events.Event.ENTER*/"enter",this,this.onEnter);
			this._tf.on(/*laya.events.Event.BLUR*/"blur",this,this.onBlur);
			this._tf.on(/*laya.events.Event.FOCUS*/"focus",this,this.onFocus);
		}

		/**
		*@private
		*/
		__proto__.onFocus=function(e){
			this.event(/*laya.events.Event.FOCUS*/"focus",this);
		}

		/**
		*@private
		*@param e
		*/
		__proto__.onBlur=function(e){
			this.event(/*laya.events.Event.BLUR*/"blur",this);
		}

		/**
		*@private
		*@param e
		*/
		__proto__.onInput=function(e){
			this.event(/*laya.events.Event.INPUT*/"input",this);
		}

		/**
		*@private
		*@param e
		*/
		__proto__.onEnter=function(e){
			this.event(/*laya.events.Event.ENTER*/"enter",this);
		}

		/**@inheritDoc */
		__proto__.initialize=function(){
			this.width=128;
			this.height=22;
		}

		/**
		*表示此对象包含的文本背景 <code>AutoBitmap</code> 组件实例。
		*@return
		*/
		GETSET$(0,__proto__,'bg',function(){
			return this._bg;
			},function(value){
			this._graphics=this._bg=value;
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._bg && (this._bg.height=value);
		});

		/**
		*@copy laya.ui.Image#skin
		*@return
		*/
		GETSET$(0,__proto__,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this._bg || (this.graphics=this._bg=new AutoBitmap());
				this._bg.source=Loader.getRes(this._skin);
				this._width && (this._bg.width=this._width);
				this._height && (this._bg.height=this._height);
			}
		});

		/**
		*<p>当前实例的背景图（ <code>AutoBitmap</code> ）实例的有效缩放网格数据。</p>
		*<p>数据格式："左边距,上边距,右边距,下边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*@return
		*/
		GETSET$(0,__proto__,'sizeGrid',function(){
			return this._bg && this._bg.sizeGrid ? this._bg.sizeGrid.join(","):null;
			},function(value){
			this._bg || (this.graphics=this._bg=new AutoBitmap());
			this._bg.sizeGrid=UIUtils.fillArray(Styles.defaultSizeGrid,value,Number);
		});

		/**@inheritDoc */
		GETSET$(0,__proto__,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._bg && (this._bg.width=value);
		});

		/**
		*<p>指示当前是否是文本域。</p>
		*值为true表示当前是文本域，否则不是文本域。
		*@return
		*/
		GETSET$(0,__proto__,'multiline',function(){
			return (this._tf).multiline;
			},function(value){
			(this._tf).multiline=value;
		});

		return TextInput;
	})(Label)


	//file:///f:/solutions/layaboxsolution/musicgame/src/game/ui/musicroot/mainui.as
	//class game.ui.musicRoot.MainUI extends laya.ui.View
	var MainUI=(function(_super){
		function MainUI(){
			this.bgImage=null;
			MainUI._SUPERC_.call(this);
		}

		CLASS$(MainUI,'game.ui.musicRoot.MainUI',_super);
		var __proto__=MainUI.prototype;
		__proto__.createChildren=function(){
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainUI.uiView);
		}

		STATICATTR$(MainUI,
		['uiView',function(){return this.uiView={"child":[{"type":"Image","props":{"skin":"comp/blank.png","y":"0","width":"640","height":"1130","var":"bgImage","x":"0"}}],"type":"View","props":{"height":"1136","width":"640"}};}
		]);
		return MainUI;
	})(View)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/dialog.as
	/**
	*<code>Dialog</code> 组件是一个弹出对话框。
	*
	*@example 以下示例代码，创建了一个 <code>Dialog</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Dialog;
		*import laya.utils.Handler;
		*
		*public class Dialog_Example
		*{
			*private var dialog:Dialog_Instance;
			*public function Dialog_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/btn_close.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*dialog=new Dialog_Instance();//创建一个 Dialog_Instance 类的实例对象 dialog。
				*dialog.dragArea="0,0,150,50";//设置 dialog 的拖拽区域。
				*dialog.show();//显示 dialog。
				*dialog.closeHandler=new Handler(this,onClose);//设置 dialog 的关闭函数处理器。
				*}
			*
			*private function onClose(name:String):void
			*{
				*if (name==Dialog.CLOSE)
				*{
					*trace("通过点击 name 为"+name+"的组件，关闭了dialog。");
					*}
				*}
			*}
		*}
	*
	*import laya.ui.Button;
	*import laya.ui.Dialog;
	*import laya.ui.Image;
	*
	*class Dialog_Instance extends Dialog
	*{
		*function Dialog_Instance():void
		*{
			*var bg:Image=new Image("resource/ui/bg.png");
			*bg.sizeGrid="10,40,10,5";
			*bg.width=150;
			*bg.height=250;
			*addChild(bg);
			*
			*var image:Image=new Image("resource/ui/image.png");
			*addChild(image);
			*
			*var button:Button=new Button("resource/ui/btn_close.png");
			*button.name=Dialog.CLOSE;//设置button的name属性值。
			*button.x=0;
			*button.y=0;
			*addChild(button);
			*}
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*
	*@author yung
	*/
	//class laya.ui.Dialog extends laya.ui.View
	var Dialog=(function(_super){
		var DialogManager;
		function Dialog(){
			this.popupCenter=true;
			this.closeHandler=null;
			this._dragArea=null;
			Dialog._SUPERC_.call(this);
		}

		CLASS$(Dialog,'laya.ui.Dialog',_super);
		var __proto__=Dialog.prototype;
		/**@inheritDoc */
		__proto__.initialize=function(){
			var dragTarget=this.getChildByName("drag");
			if (dragTarget){
				this.dragArea=dragTarget.x+","+dragTarget.y+","+dragTarget.width+","+dragTarget.height;
				dragTarget.removeSelf();
			}
			this.on(/*laya.events.Event.CLICK*/"click",this,this.onClick);
		}

		/**
		*@private (protected)
		*对象的 <code>Event.CLICK</code> 点击事件侦听处理函数。
		*/
		__proto__.onClick=function(e){
			var btn=e.target;
			if (btn){
				switch (btn.name){
					case "close":
					case "cancel":
					case "sure":
					case "no":
					case "ok":
					case "yes":
						this.close(btn.name);
						break ;
					}
			}
		}

		/**
		*显示对话框（以非模式窗口方式显示）。
		*@param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
		*/
		__proto__.show=function(closeOther){
			(closeOther===void 0)&& (closeOther=false);
			Dialog.manager.show(this,closeOther);
		}

		/**
		*显示对话框（以模式窗口方式显示）。
		*@param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
		*/
		__proto__.popup=function(closeOther){
			(closeOther===void 0)&& (closeOther=false);
			Dialog.manager.popup(this,closeOther);
		}

		/**
		*关闭对话框。
		*@param type 如果是点击默认关闭按钮触发，则传入关闭按钮的名字(name)，否则为null。
		*/
		__proto__.close=function(type){
			Dialog.manager.close(this);
			this.closeHandler && this.closeHandler.runWith(type);
		}

		/**
		*@private
		*/
		__proto__.onMouseDown=function(e){
			var point=this.getMousePoint();
			if (this._dragArea.contains(point.x,point.y))this.startDrag();
			else this.stopDrag();
		}

		/**
		*用来指定对话框的拖拽区域。默认值为"0,0,0,0"。
		*<p><b>格式：</b>构成一个矩形所需的 x,y,width,heith 值，用逗号连接为字符串。
		*例如："0,0,100,200"。
		*</p>
		*
		*@see #includeExamplesSummary 请参考示例
		*@return
		*/
		GETSET$(0,__proto__,'dragArea',function(){
			if (this._dragArea)return this._dragArea.toString();
			return null;
			},function(value){
			if (value){
				var a=UIUtils.fillArray([0,0,0,0],value,Number);
				this._dragArea=new Rectangle(a[0],a[1],a[2],a[3]);
				this.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onMouseDown);
				}else {
				this._dragArea=null;
				this.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onMouseDown);
			}
		});

		/**
		*弹出框的显示状态；如果弹框处于显示中，则为true，否则为false;
		*@return
		*/
		GETSET$(0,__proto__,'isPopup',function(){
			return this.parent !=null;
		});

		/**
		*@private
		*获取对话框管理器。
		*/
		GETSET$(1,Dialog,'manager',function(){
			return Dialog._manager || (Dialog._manager=new DialogManager());
		},laya.ui.View._$SET_manager);

		Dialog.closeAll=function(){
			Dialog.manager.closeAll();
		}

		Dialog.CLOSE="close";
		Dialog.CANCEL="cancel";
		Dialog.SURE="sure";
		Dialog.NO="no";
		Dialog.OK="ok";
		Dialog.YES="yes";
		Dialog._manager=null
		Dialog.__init$__=function(){
			/**
			*<code>DialogManager</code> 类用来管理对话框。
			*@author yung
			*/
			//class DialogManager
			DialogManager=(function(){
				function DialogManager(){
					this._box=new Sprite();
					this._mask=new Sprite();
					this._alpha=new Sprite();
					this._stage=Laya.stage;
					this._box.mouseEnabled=true;
					this._mask.mouseEnabled=true;
					this._mask.addChild(this._alpha);
					this._alpha.alpha=UIConfig.popupBgAlpha;
					Laya.stage.on(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
					this.onResize(null);
				}
				CLASS$(DialogManager,'');
				var __proto__=DialogManager.prototype;
				/**
				*@private
				*舞台的 <code>Event.RESIZE</code> 事件侦听处理函数。
				*@param e
				*/
				__proto__.onResize=function(e){
					var width=this._mask.width=this._stage.width;
					var height=this._mask.height=this._stage.height;
					this._alpha.graphics.clear();
					this._alpha.graphics.drawRect(0,0,width,height,UIConfig.popupBgColor);
					for (var i=this._box.numChildren-1;i >-1;i--){
						var item=this._box.getChildAt(i);
						if (item.popupCenter){
							item.x=(width-item.width)*0.5;
							item.y=(height-item.height)*0.5;
						}
					}
					for (i=this._mask.numChildren-1;i >-1;i--){
						item=this._mask.getChildAt(i);
						if (item.isPopup){
							if (item.popupCenter){
								item.x=(width-item.width)*0.5;
								item.y=(height-item.height)*0.5;
							}
						}
					}
				}
				/**
				*显示对话框(非模式窗口类型)。
				*@param dialog 需要显示的对象框 <code>Dialog</code> 实例。
				*@param closeOther 是否关闭其它对话框，若值为ture，则关闭其它的对话框。
				*/
				__proto__.show=function(dialog,closeOther){
					(closeOther===void 0)&& (closeOther=false);
					if (closeOther)this._box.removeChildren();
					if (dialog.popupCenter){
						dialog.x=(this._stage.width-dialog.width)*0.5;
						dialog.y=(this._stage.height-dialog.height)*0.5;
					}
					this._box.addChild(dialog);
					this._stage.addChild(this._box);
					this._mask.parent && this._stage.addChild(this._mask);
				}
				/**
				*显示对话框(模式窗口类型)。
				*@param dialog 需要显示的对象框 <code>Dialog</code> 实例。
				*@param closeOther 是否关闭其它对话框，若值为ture，则关闭其它的对话框。
				*/
				__proto__.popup=function(dialog,closeOther){
					(closeOther===void 0)&& (closeOther=false);
					if (closeOther){
						this._mask.removeChildren(1);
					}
					if (dialog.popupCenter){
						dialog.x=(this._stage.width-dialog.width)*0.5;
						dialog.y=(this._stage.height-dialog.height)*0.5;
					}
					this._mask.addChild(dialog);
					this._stage.addChild(this._mask);
				}
				/**
				*关闭对话框。
				*@param dialog 需要关闭的对象框 <code>Dialog</code> 实例。
				*/
				__proto__.close=function(dialog){
					if (dialog.parent===this._box){
						dialog.removeSelf();
						if (this._box.numChildren===0){
							this._box.removeSelf();
						}
						}else {
						dialog.removeSelf();
						if (this._mask.numChildren===1){
							this._mask.removeSelf();
							return;
							}else {
							this.showFirst();
						}
					}
				}
				/**
				*@private
				*/
				__proto__.showFirst=function(){
					for (var i=0,n=this._mask.numChildren-1;i <=n;i++){
						(this._mask.getChildAt(i)).visible=i===n;
					}
				}
				/**
				*关闭所有的对话框。
				*/
				__proto__.closeAll=function(){
					this._box.removeChildren();
					this._box.removeSelf();
					this._mask.removeChildren(1);
					this._mask.removeSelf();
				}
				return DialogManager;
			})()
		}

		return Dialog;
	})(View)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/radiogroup.as
	/**
	*<code>RadioGroup</code> 控件定义一组 <code>Radio</code> 控件，这些控件相互排斥；
	*因此，用户每次只能选择一个 <code>Radio</code> 控件。
	*
	*@example 以下示例代码，创建了一个 <code>RadioGroup</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Radio;
		*import laya.ui.RadioGroup;
		*import laya.utils.Handler;
		*
		*public class RadioGroup_Example
		*{
			*
			*public function RadioGroup_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/radio.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*var radioGroup:RadioGroup=new RadioGroup();//创建一个 RadioGroup 类的实例对象 radioGroup 。
				*radioGroup.pos(100,100);//设置 radioGroup 的位置信息。
				*radioGroup.labels="item0,item1,item2";//设置 radioGroup 的标签集。
				*radioGroup.skin="resource/ui/radio.png";//设置 radioGroup 的皮肤。
				*radioGroup.space=10;//设置 radioGroup 的项间隔距离。
				*radioGroup.selectHandler=new Handler(this,onSelect);//设置 radioGroup 的选择项发生改变时执行的处理器。
				*Laya.stage.addChild(radioGroup);//将 radioGroup 添加到显示列表。
				*}
			*
			*private function onSelect(index:int):void
			*{
				*trace("当前选择的单选按钮索引: index= ",index);
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*
	*Laya.loader.loadAssets(["resource/ui/radio.png"],new laya.utils.Handler(this,onLoadComplete));
	*
	*function onLoadComplete(){
		*var radioGroup=new RadioGroup();//创建一个 RadioGroup 类的实例对象 radioGroup 。
		*radioGroup.pos(100,100);//设置 radioGroup 的位置信息。
		*radioGroup.labels="item0,item1,item2";//设置 radioGroup 的标签集。
		*radioGroup.skin="resource/ui/radio.png";//设置 radioGroup 的皮肤。
		*radioGroup.space=10;//设置 radioGroup 的项间隔距离。
		*radioGroup.selectHandler=new laya.utils.Handler(this,onSelect);//设置 radioGroup 的选择项发生改变时执行的处理器。
		*Laya.stage.addChild(radioGroup);//将 radioGroup 添加到显示列表。
		*}
	*
	*function onSelect(index){
		*console.log("当前选择的单选按钮索引: index= ",index);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.RadioGroup extends laya.ui.Group
	var RadioGroup=(function(_super){
		function RadioGroup(){RadioGroup._SUPERC_.call(this);;
		};

		CLASS$(RadioGroup,'laya.ui.RadioGroup',_super);
		var __proto__=RadioGroup.prototype;
		/**@inheritDoc */
		__proto__.createItem=function(skin,label){
			return new Radio(skin,label);
		}

		return RadioGroup;
	})(Group)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/tab.as
	/**
	*<code>Tab</code> 组件用来定义选项卡按钮组。
	*
	*@internal <p>属性：<code>selectedIndex</code> 的默认值为-1。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Tab</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Tab;
		*import laya.utils.Handler;
		*
		*public class Tab_Example
		*{
			*
			*public function Tab_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/tab.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*var tab:Tab=new Tab();//创建一个 Tab 类的实例对象 tab 。
				*tab.skin="resource/ui/tab.png";//设置 tab 的皮肤。
				*tab.labels="item0,item1,item2";//设置 tab 的标签集。
				*tab.x=100;//设置 tab 对象的属性 x 的值，用于控制 tab 对象的显示位置。
				*tab.y=100;//设置 tab 对象的属性 y 的值，用于控制 tab 对象的显示位置。
				*tab.selectHandler=new Handler(this,onSelect);//设置 tab 的选择项发生改变时执行的处理器。
				*Laya.stage.addChild(tab);//将 tab 添到显示列表。
				*}
			*
			*private function onSelect(index:int):void
			*{
				*trace("当前选择的表情页索引: index= ",index);
				*}
			*}
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.loadAssets(["resource/ui/tab.png"],new laya.utils.Handler(this,onLoadComplete));
	*
	*function onLoadComplete(){
		*var tab=new laya.ui.Tab();//创建一个 Tab 类的实例对象 tab 。
		*tab.skin="resource/ui/tab.png";//设置 tab 的皮肤。
		*tab.labels="item0,item1,item2";//设置 tab 的标签集。
		*tab.x=100;//设置 tab 对象的属性 x 的值，用于控制 tab 对象的显示位置。
		*tab.y=100;//设置 tab 对象的属性 y 的值，用于控制 tab 对象的显示位置。
		*tab.selectHandler=new laya.utils.Handler(this,onSelect);//设置 tab 的选择项发生改变时执行的处理器。
		*Laya.stage.addChild(tab);//将 tab 添到显示列表。
		*}
	*function onSelect(index){
		*console.log("当前选择的标签页索引: index= ",index);
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.Tab extends laya.ui.Group
	var Tab=(function(_super){
		function Tab(){Tab._SUPERC_.call(this);;
		};

		CLASS$(Tab,'laya.ui.Tab',_super);
		var __proto__=Tab.prototype;
		/**
		*@private
		*@inheritDoc
		*/
		__proto__.createItem=function(skin,label){
			return new Button(skin,label);
		}

		return Tab;
	})(Group)


	//file:///f:/solutions/layaboxsolution/asset/layabox/layaair/libs/layaair/ui/src/laya/ui/textarea.as
	/**
	*<code>TextArea</code> 类用于创建显示对象以显示和输入文本。
	*
	*
	*@example 以下示例代码，创建了一个 <code>TextArea</code> 实例。
	*<p>[EXAMPLE-AS-BEGIN]</p>
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.TextArea;
		*import laya.utils.Handler;
		*
		*public class TextArea_Example
		*{
			*
			*public function TextArea_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.loadAssets(["resource/ui/input.png"],new Handler(this,onLoadComplete));//加载资源。
				*}
			*
			*private function onLoadComplete():void
			*{
				*var textArea:TextArea=new TextArea("这个一个TextArea实例。");//创建一个 TextArea 类的实例对象 textArea 。
				*textArea.skin="resource/ui/input.png";//设置 textArea 的皮肤。
				*textArea.sizeGrid="4,4,4,4";//设置 textArea 的网格信息。
				*textArea.color="#008fff";//设置 textArea 的文本颜色。
				*textArea.font="Arial";//设置 textArea 的字体。
				*textArea.bold=true;//设置 textArea 的文本显示为粗体。
				*textArea.fontSize=20;//设置 textArea 的文本字体大小。
				*textArea.wordWrap=true;//设置 textArea 的文本自动换行。
				*textArea.x=100;//设置 textArea 对象的属性 x 的值，用于控制 textArea 对象的显示位置。
				*textArea.y=100;//设置 textArea 对象的属性 y 的值，用于控制 textArea 对象的显示位置。
				*textArea.width=300;//设置 textArea 的宽度。
				*textArea.height=200;//设置 textArea 的高度。
				*Laya.stage.addChild(textArea);//将 textArea 添加到显示列表。
				*}
			*
			*}
		*
		*}
	*</listing>
	*<p>[EXAMPLE-AS-END]</p>
	*
	*<p>[EXAMPLE-JS-BEGIN]</p>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.loadAssets(["resource/ui/input.png"],new laya.utils.Handler(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*var textArea=new laya.ui.TextArea("这个一个TextArea实例。");//创建一个 TextArea 类的实例对象 textArea 。
		*textArea.skin="resource/ui/input.png";//设置 textArea 的皮肤。
		*textArea.sizeGrid="4,4,4,4";//设置 textArea 的网格信息。
		*textArea.color="#008fff";//设置 textArea 的文本颜色。
		*textArea.font="Arial";//设置 textArea 的字体。
		*textArea.bold=true;//设置 textArea 的文本显示为粗体。
		*textArea.fontSize=20;//设置 textArea 的文本字体大小。
		*textArea.wordWrap=true;//设置 textArea 的文本自动换行。
		*textArea.x=100;//设置 textArea 对象的属性 x 的值，用于控制 textArea 对象的显示位置。
		*textArea.y=100;//设置 textArea 对象的属性 y 的值，用于控制 textArea 对象的显示位置。
		*textArea.width=300;//设置 textArea 的宽度。
		*textArea.height=200;//设置 textArea 的高度。
		*Laya.stage.addChild(textArea);//将 textArea 添加到显示列表。
		*}
	*</listing>
	*<p>[EXAMPLE-JS-END]</p>
	*
	*@author yung
	*/
	//class laya.ui.TextArea extends laya.ui.TextInput
	var TextArea=(function(_super){
		/**
		*<p>创建一个新的 <code>TextArea</code> 示例。</p>
		*@param text 文本内容字符串。
		*/
		function TextArea(text){
			(text===void 0)&& (text="");
			TextArea._SUPERC_.call(this,text);
			this.multiline=true;
		}

		CLASS$(TextArea,'laya.ui.TextArea',_super);
		return TextArea;
	})(TextInput)


	//file:///f:/solutions/layaboxsolution/musicgame/src/views/mainview.as
	/**
	*...
	*@author wangn
	*/
	//class views.MainView extends game.ui.musicRoot.MainUI
	var MainView=(function(_super){
		function MainView(){
			this.m_musicData=null;
			this.m_nGridCount=4;
			this.m_nGridWidth=0;
			this.m_nGridHeight=0;
			this.m_nStartX=0;
			this.m_nStartY=0;
			this.m_nCurBlockIndex=1;
			this.m_nRePosRowIndex=0;
			this.m_bEnable=true;
			this.m_listGrid=new Dictionary;
			this.m_listGridTemp=new Dictionary;
			this.m_listLastSounds=new Dictionary;
			MainView._SUPERC_.call(this);
		}

		CLASS$(MainView,'views.MainView',_super);
		var __proto__=MainView.prototype;
		//初始化配置数据
		__proto__.InitConfigData=function(){
			this.m_musicData=new MusicDataConfig;
			this.m_musicData.LoadXML();
			Laya.timer.once(3000,this,this.onDataLoadComplete);
		}

		__proto__.onDataLoadComplete=function(){
			this.InitKeyUI();
		}

		//初始化按键UI
		__proto__.InitKeyUI=function(){
			var width=this.bgImage.width;
			var height=this.bgImage.height;
			this.m_nGridWidth=width / this.m_nGridCount;
			this.m_nGridHeight=height / this.m_nGridCount;
			this.m_nStartY=this.m_nGridHeight*(this.m_nGridCount-1);
			for (var i=0;i < (this.m_nGridCount+1);i++){
				var vListGrid=new Dictionary;
				for (var j=0;j < this.m_nGridCount;j++){
					var btn=new BaseKey;
					btn.baseView=this;
					btn.nLayoutRow=i;
					btn.nLayoutCol=j;
					btn.btn.skin="comp/button.png";
					btn.btn.width=this.m_nGridWidth;
					btn.btn.height=this.m_nGridHeight;
					btn.btn.pos(this.m_nStartX+this.m_nGridWidth *j,this.m_nStartY-this.m_nGridHeight *i);
					this.addChild(btn.btn);
					vListGrid.set(j,btn);
				}
				this.m_listGrid.set(i,vListGrid);
			}
			this.InitData2UI();
		}

		//初始化按键数据
		__proto__.InitData2UI=function(){
			for (var row=0;row < (this.m_nGridCount+1);row++){
				this.generateBlackBlock(row);
			}
		}

		__proto__.OnKeyClicked=function(bk){
			if (bk.beatData !=null && bk.nLayoutRow==this.m_nRePosRowIndex && this.m_bEnable){
				this.StopLastMusic();
				this.PlayChord(bk.beatData);
				this.PlayScrollAnimation();
			}
			else{
				console.log("game over");
			}
		}

		__proto__.StopLastMusic=function(){
			for (var key=0 in this.m_listLastSounds.keys){
				SoundManager.stopSound("snd/"+key.toString()+".mp3");
			}
			this.m_listLastSounds.clear();
		}

		__proto__.PlayChord=function(cd){
			var value;
			/*for each*/for(var $each_value in cd.listKeys.elements){
				value=cd.listKeys.elements[$each_value];
				this.m_listLastSounds.set(value,value);
				this.PlayKey(value);
			}
		}

		__proto__.PlayKey=function(key){
			SoundManager.playSound("snd/"+key.toString()+".mp3",false,Utils.bind(this.onSoundComplete,this));
		}

		__proto__.onSoundComplete=function(){}
		//txtInfo.text="播放完成";
		__proto__.PlayScrollAnimation=function(){
			this.m_bEnable=false;
			for (var row=0;row < (this.m_nGridCount+1);row++){
				for (var col=0;col < this.m_nGridCount;col++){
					var btnKey=this.m_listGrid.get(row).get(col);
					var posY=btnKey.btn.y+this.m_nGridHeight;
					Tween.to(btnKey.btn,{y:posY },500,Ease.linearNone,new Handler(this,this.onKeyScrollEnd,[{sender :btnKey}]));
				}
			}
		}

		__proto__.onKeyScrollEnd=function(data){
			var bk=data["sender"];
			if (bk.btn.y > this.m_nStartY){
				bk.btn.pos(bk.btn.x,this.m_nStartY-this.m_nGridHeight *this.m_nGridCount);
				if (bk.nLayoutCol==0){
					this.m_bEnable=true;
					this.generateBlackBlock(this.m_nRePosRowIndex++);
					if (this.m_nRePosRowIndex > this.m_nGridCount){
						this.m_nRePosRowIndex=0;
					}
				}
			}
		}

		__proto__.generateBlackBlock=function(row){
			if (this.m_nCurBlockIndex >=this.m_musicData.listBlock.keys.length){
				console.log("success");
				return;
			};
			var bk=null;
			for (var col=0;col < (this.m_nGridCount);col++){
				bk=this.m_listGrid.get(row).get(col);
				bk.beatData=null;
				bk.btn.skin="comp/button.png";
			};
			var randnum=Math.round(Math.random()*(this.m_nGridCount-1));
			bk=this.m_listGrid.get(row).get(randnum);
			bk.beatData=this.m_musicData.listBlock.get(this.m_nCurBlockIndex++);
			bk.btn.skin="comp/btn_close.png";
		}

		GETSET$(0,__proto__,'listGrid',function(){
			return this.m_listGrid;
			},function(value){
			this.m_listGrid=value;
		});

		return MainView;
	})(MainUI)


	//file:///f:/solutions/layaboxsolution/musicgame/src/game/ui/musicroot/testpageui.as
	//class game.ui.musicRoot.TestPageUI extends laya.ui.Dialog
	var TestPageUI=(function(_super){
		function TestPageUI(){
			TestPageUI._SUPERC_.call(this);
		}

		CLASS$(TestPageUI,'game.ui.musicRoot.TestPageUI',_super);
		var __proto__=TestPageUI.prototype;
		__proto__.createChildren=function(){
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TestPageUI.uiView);
		}

		STATICATTR$(TestPageUI,
		['uiView',function(){return this.uiView={"child":[{"type":"Image","props":{"skin":"comp/bg.png","compId":"1","y":"0","sizeGrid":"4,30,4,4","width":"600","height":"400","x":"0"}},{"type":"Button","props":{"skin":"comp/btn_close.png","compId":"2","y":"3","name":"close","x":"563"}},{"type":"CheckBox","props":{"skin":"comp/checkbox.png","compId":"3","y":"224","label":"label","x":"169"}},{"type":"Clip","props":{"skin":"comp/clip_num.png","y":"321","compId":"4","clipX":"10","index":"8","x":"146"}},{"type":"HSlider","props":{"skin":"comp/hslider.png","compId":"5","y":"97","width":"120","x":"45"}},{"type":"RadioGroup","props":{"skin":"comp/radiogroup.png","compId":"6","y":"224","labels":"label1,label2","x":"45"}},{"type":"TextInput","props":{"skin":"comp/textinput.png","y":"270","sizeGrid":"2,2,2,2","text":"TextInput","width":"150","margin":"1,1,1,1","compId":"7","x":"42"}},{"type":"Button","props":{"skin":"comp/button.png","compId":"8","y":"178","label":"label","x":"45"}},{"type":"ProgressBar","props":{"skin":"comp/progress.png","compId":"10","y":"135","sizeGrid":"4,4,4,4","width":"114","height":"14","x":"45"}},{"type":"Tab","props":{"skin":"comp/tab.png","y":"280","labels":"Tab1,Tab2","selectedIndex":"0","compId":"11","x":"251"}},{"type":"VSlider","props":{"skin":"comp/vslider.png","compId":"13","y":"45","x":"195"}},{"child":[{"type":"Image","props":{"skin":"comp/image.png","compId":"14"}}],"type":"Panel","props":{"hScrollBarskin":"comp/hscroll.png","compId":"15","y":"45","vScrollBarSkin":"comp/vscroll.png","width":"129","height":"200","vScrollBarskin":"comp/vscroll.png","x":"250"}},{"child":[{"child":[{"type":"Clip","props":{"skin":"comp/clip_selectBox.png","y":"3","name":"selectBox","width":"87","clipY":"2","x":"26"}},{"type":"Clip","props":{"skin":"comp/clip_num.png","clipX":"10","name":"icon"}},{"type":"Label","props":{"y":"3","name":"label","text":"listItem","width":"80","x":"27"}}],"type":"Box","props":{"name":"render"}}],"type":"List","props":{"compId":"16","y":"46","width":"130","height":"160","spaceX":"0","spaceY":"0","vScrollBarskin":"comp/vscroll.png","x":"428"}},{"child":[{"child":[{"type":"Clip","props":{"skin":"comp/clip_selectBox.png","y":"0","name":"selectBox","left":"12","height":"24","clipY":"2","right":"0","x":"13"}},{"type":"Clip","props":{"skin":"comp/clip_tree_folder.png","y":"4","name":"folder","clipY":"3","clipX":"1","x":"14"}},{"type":"Label","props":{"y":"1","text":"treeItem","width":"150","left":"33","height":"22","name":"label","color":"#0","right":"0","x":"33"}},{"type":"Clip","props":{"skin":"comp/clip_tree_arrow.png","name":"arrow","y":"5","clipY":"2","x":"0"}}],"type":"Box","props":{"name":"render","right":"0","left":"0"}}],"type":"Tree","props":{"compId":"17","y":"220","spaceBottom":"3","scrollBarskin":"comp/vscroll.png","width":"130","height":"160","x":"428"}},{"type":"ComboBox","props":{"skin":"comp/combobox.png","compId":"18","y":"45","labels":"label1,label2","width":"120","height":"23","sizeGrid":"2,2,25,2","x":"45"}},{"type":"Clip","props":{"skin":"comp/clip_num.png","y":"321","autoPlay":"true","compId":"19","clipX":"10","x":"59"}}],"type":"Dialog","props":{"compId":"20","height":"400","width":"600"}};}
		]);
		return TestPageUI;
	})(Dialog)


	//file:///f:/solutions/layaboxsolution/musicgame/src/views/testuiview.as
	/**
	*...
	*@author wangn
	*/
	//class views.TestUIView extends game.ui.musicRoot.TestPageUI
	var TestUIView=(function(_super){
		function TestUIView(){
			TestUIView._SUPERC_.call(this);
		}

		CLASS$(TestUIView,'views.TestUIView',_super);
		return TestUIView;
	})(TestPageUI)


	//file:///f:/solutions/layaboxsolution/musicgame/src/main.as
	/**
	*...
	*@author wangn
	*/
	//class Main
	var Main=(function(){
		function Main(){
			this.m_basePatten=null;
			this.m_basePatten=new BasePattern;
		}

		CLASS$(Main,'Main');
		return Main;
	})()


	LAYABOX.initClass([Timer,LoaderManager,Browser,LocalStorage,Dialog,ShaderCompile,WebGLContext2D,WebGLContext,DrawText]);
	new Main();

})(window,document,window.layaModule);
