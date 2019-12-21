/**
 * 作者 王建 2016-03-04.
 * 系统入口页面
 */
$(document).ready(function () {
    var cookiehelper = new CookieHelper();

     //$("#userName").val(cookiehelper.GetCookie('user'));
     //$("#passWord").val(cookiehelper.GetCookie('pwd'));

    var lineHeight = 24; // 行高
    var backLength = 3;
    var backTexts = {};
    var backXOffsets = {};
    var keyYOffsets = {};
    var keyAOffsets = {};
    var backSpeed = 10000 + parseInt(100 * Math.random());
    var keySpeed = 12000 + parseInt(100 * Math.random());
    
//删除canvas一起删除的内容
//  var canvascheckcode = document.querySelector("#canvas-login-checkcode");
//  canvascheckcode.width = 250;
//  canvascheckcode.height = 50;
//  var context = canvascheckcode.getContext('2d');
//  context.font = '36px Verdana'; // 字体大小和字体名
//  var code ="";


//  $.ajax({
//     	type:"get",
//     	url:config.baseUel+"getcode",
//     	async:true,
//     	success:function(data){
//     		if(data.status=== 200){
//     			code =data.data.code;
//     		}else{
//     			alert("验证码获取失败，请点击重新获取");
//     		}
//     	},
//     	error:function(xhr,status,error){
////						(data);
//			console.log(error);
//			alert("服务器异常，请重新点击获取");
//			code = "";
//		}
//     });


//删除canvas一起删除的内容
//  var key = String(code).toUpperCase();
//  init(code,canvascheckcode);
//  setInterval(function () {
//      render(key,Number(new Date), context,canvascheckcode);
//  }, 100);




    /**
     * 绘制旋转的文字
     * @param {CanvasRenderingContext2D} context 上下文
     * @param {String} text 文本
     * @param {Number} x 中心坐标 x
     * @param {Number} y 中心坐标 y
     * @param {Number} angle 角度，单位弧度
     */
    function rotateText(context, text, x, y, angle) {
        if (!context) {
            return;
        }
        context.save(); // 保存上次的风格设置
        context.textAlign = 'center'; // 横向居中
        context.textBaseline = 'middle'; // 纵向居中
        context.translate(x, y); // 修改坐标系原点
        context.rotate(angle); // 旋转
        context.strokeText(text, 0, 0); // 绘制文本
        context.restore(); // 恢复上次的风格设置
    }

    /**
     * 随机字符串
     * @param{String} chars 字符串
     * @param{Number} len 长度
     */
    function randomText(chars, len) {
        var result = '';
        for (var i = 0; i < len; i++) {
            result += chars.charAt(parseInt(chars.length * Math.random()));
        }
        return result;
    }

    function init(key,canvas) {
        // 随机备件
        for (var i = 0; i < canvas.height / lineHeight; i++) {
            backTexts[i] = randomText('ABCDEFGHIJKLMNOPQRST0123456789', backLength);
        }
        for (var i = 0; i < key.length; i++) {
            keyYOffsets[i] = Math.random() * lineHeight / 2;
            keyAOffsets[i] = 0.05 - Math.random() * 0.1;
        }
    }

    function render(key,now, context,canvas) {
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvascheckcode.width, canvascheckcode.height);
        context.fillStyle = '#000000';
        // 绘制 key
        var tick = now % keySpeed;
        var keyCharWidth = canvas.width / (key.length);
        for (var i = 0; i < key.length; i++) {
            var tx = keyCharWidth + (((canvas.width - keyCharWidth) / key.length) * i) % canvas.width;
            var ty = Math.cos(now / 1000) * Math.PI * keyYOffsets[i];
            rotateText(context, key[i], tx,
                canvas.height / 2 - ty, Math.cos(now / 1000) * Math.PI * 0.1 + keyAOffsets[i]);
        }
    }

//  $("#btnlogin").click(function () {
//       var username = $("#userName").val();
//       var pwd = $("#passWord").val();
//       var checkcode = $("#checkCode").val();
//       if (username == '' || pwd == '') {
//           alert("请填写用户名和密码!");
//           return;
//       }
//      if (checkcode == '') {
//          alert("请填写验证码!");
//          return;
//      }
////      if (checkcode.toLowerCase() != code.toLowerCase()) {
////          alert("校验码不正确!");
////          return;
////      }
//      var regex = /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/;
//      if(!regex.test(pwd))
//      {
//         // cookiehelper.SetCookie('pwdZT',"false");
//      }else{
//         // cookiehelper.SetCookie('pwdZT',"true");
//      }
//      var obj = {
//          username: username,
//          pwd: pwd
//      };
//     $.ajax({
//     	type:"get",
//     	url:config.baseUel+"login",
//     	async:true,
//     	success:function(data){
//     		if(data.status=== 200){
//     			alert("123");
////     			 window.location.href="index.html";
//     		}else{
//     			
//     		}
//     	},
//     	error:function(xhr,status,error){
//			alert("服务器异常，请重新尝试");
//		}
//     });
//      // var ajaxHelper = new AjaxHelper();
//      // ajaxHelper.post(
//          // serviceUrl + 'rest/login/',
//          // function (responseJson) {
//              // if(responseJson['result'] == true){
//                   window.location.href="index.html";
//              // }else{
//                  // alert(responseJson['message'])
//                  // cookiehelper.DeleteCookie('token');
//              // }
//          // },
//          // obj,
//          // true);
    });

    $("#btn_resetpwd").click(function(){
        // $("#reset-userName").val("");
        // $("#reset-checkCode").val("");
        // $("#model_resetpwd").modal("show");
    });

    $("#id_btn_reset").blur(function(){
       // $('#id_btn_reset').popover('destroy');
    });

    $("#id_btn_reset").click(function(){
        // $('#id_btn_reset').popover();
        // var username = $("#reset-userName").val();
        // var checkcode = $("#reset-checkCode").val();
        // if (username == '') {
            // $('#id_btn_reset').attr('data-content',"请填写用户名!");
            // $('#id_btn_reset').popover('toggle');
            // return;
        // }
        // if (checkcode == '') {
            // $('#id_btn_reset').attr('data-content',"请填写验证码!");
            // $('#id_btn_reset').popover('toggle');
            // return;
        // }
        // if (checkcode.toLowerCase() != code2. ()) {
            // $('#id_btn_reset').attr('data-content',"校验码不正确!");
            // $('#id_btn_reset').popover('toggle');
            // return;
        // }

        // var ajaxHelper = new AjaxHelper();
        // var obj = {
            // userid:username,
            // pwd_new: "wy2015",
            // pwd: "wy2015"
        // };
        // ajaxHelper.post(
            // serviceUrl + 'rest/password/',
            // function (responseJson) {
                // if(responseJson['result'] == true){
                    // $('#id_btn_reset').attr('data-content',"已重置为默认密码!");
                    // $('#id_btn_reset').popover('toggle');
                    // var coo = new CookieHelper();
                    // var pwd = coo.SetCookie("pwdZT","true");
                    // coo.SetCookie("pwd","wy2015");
                // }else{
                    // $('#id_btn_reset').attr('data-content',responseJson['message']);
                    // $('#id_btn_reset').popover('toggle');
                // }
            // },
            // obj,
            // true
        // );
    });
	
//});
