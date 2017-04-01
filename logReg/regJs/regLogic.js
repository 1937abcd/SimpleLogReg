//            注册数据js部分开始
var usernameInput = $("#reg_email");                // 注册的邮箱号input
var e_mailExample = $(".e_mailExample");            // 注册时候的邮箱号模板
var e_mailExample_arr = ["@qq.com", "@163.com", "@sina.cn", "@sina.com", "@139.com"];
var passwordInput = $("#reg_email_password");       // 第一次输入密码input
var pwd_error = $(".pwd_error");                    // 密码输入时候错误提示模板
var repasswordInput = $("#reg_email_repassword");   // 第二次输入确认密码input
var repwd_error = $(".repwd_error");                // 第二次密码输入时候错误提示模板
var regPhoneInput = $("#reg_phone");                // 手机号input
var pwd;                                            //  密码
var unameStorage = pwdStorage = repwdStorage = regPhoneValStorage = null;     // 合理情况下, 储存: 邮箱号, 密码, 确认密码, 手机号
var provinceVal = cityVal = districtVal = null;     // 省 市 县的存储值
var regBtn = document.getElementById("regButton");                  // 注册提交按钮
usernameInput.val(null);      // 每次刷新使 input 重新为空
passwordInput.val(null);
repasswordInput.val(null);
regPhoneInput.val(null);
var isFirstPra = 0;   // 用来标识 是否 input 中第一次出现 @ 符号, 如果删除了第一次输入 @, 则重置为 0
var storage = window.localStorage;     // h5 本地储存应用
var replaceUnameVal;                // 二次保存用户邮箱号

/*-----------------监听 邮箱input--------------------*/
// 设置 通过jquery加入 邮箱模板的 ul 中的 li 和 span 样式
function setLiSpanCSS(str_start)
{
    $(".e_mailExample").html(str_start);
    $(".e_mailExample li").css
    ({
        'cursor':'pointer', 'height': '32px', 'width': '360px',
        'line-height': '32px', 'margin-left': '-40px','border-bottom':'solid 1px rgba(255,255,255,.15)',
        'padding': '0 15px','background': 'rgba(45,45,45,.15)','color': '#fff'
    }).click(function(e)
    {
        usernameInput.val(e.target.firstChild.textContent);
    });
    $(".e_mailExample li span").css({'height': '32px', 'line-height' : '32px'});
}
// 监听 邮箱 input 模板显示 与 隐藏
usernameInput.focus(function()    //定焦 显示
{
    e_mailExample.fadeIn();
    e_mailExample.fadeIn("slow");
    e_mailExample.fadeIn(1000);
    var str_start = "欢迎注册矿三网0.0&nbsp;&nbsp;(请用邮箱号注册)";
    if(usernameInput.val().indexOf("@") == -1)      // 当 input 值中没有 @ 的时候
    {
        for(var i = 0; i < e_mailExample_arr.length; i++)
        {
            str_start += "<li><span >" + usernameInput.val() + e_mailExample_arr[i] + "</span></li>";
        }
        setLiSpanCSS(str_start);
        isFirstPra = 0;       //删除了第一次输入 @, 则重置为 0
    }else      // 当 input 值中首次出现 @ 的时候
    {
        isFirstPra++;
        if(isFirstPra >= 1)
        {
            if(isFirstPra == 1)
            {
                //replaceUnameVal = usernameInput.val().replace(/\@/, "");
                replaceUnameVal = usernameInput.val().substring(0, usernameInput.val().indexOf("@"));
            }
            for(var i = 0; i < e_mailExample_arr.length; i++)
            {
                str_start += "<li><span>" + replaceUnameVal + e_mailExample_arr[i] + "</span></li>";
            }
        }
        setLiSpanCSS(str_start);
    }
    $(".e_mailExample li").click(function(e)
    {
        if(usernameInput.val().indexOf("@") == -1)
        {
            usernameInput.val(e.target.firstChild.textContent);
            isFirstPra = 0;
        }else
        {
            isFirstPra++;
            if(isFirstPra >= 1)
            {
                if(isFirstPra == 1)
                {
                    replaceUnameVal = usernameInput.val().substring(0, usernameInput.val().indexOf("@"));
                }
                for(var i = 0; i < e_mailExample_arr.length; i++)
                {
                    $(".e_mailExample li").eq(i).html( replaceUnameVal + e_mailExample_arr[i]);
                }
            }
        }
    });
    //监听 邮箱input 键盘弹起 (keyup) 事件, 时刻键入邮箱模板
    usernameInput.bind("propertychange input",function()
    {
        if(usernameInput.val().indexOf("@") == -1)      //没有输入 @ 的时候
        {
            for(var i = 0; i < e_mailExample_arr.length; i++)
            {
                $(".e_mailExample li").eq(i).html(usernameInput.val() + e_mailExample_arr[i]);
            }
            isFirstPra = 0;               //删除了第一次输入的 @, 则重置为 0
        }else                             //输入了 @ 的时候
        {
            isFirstPra++;
            if(isFirstPra >= 1)
            {
                if(isFirstPra == 1)
                {
                    //replaceUnameVal = usernameInput.val().replace(/\@/, "");
                    replaceUnameVal = usernameInput.val().substring(0, usernameInput.val().indexOf("@"));
                }
                for(var i = 0; i < e_mailExample_arr.length; i++)
                {
                    $(".e_mailExample li").eq(i).html( replaceUnameVal + e_mailExample_arr[i]);
                }
            }
        }
    });
});
usernameInput.blur(function()    // 失焦 隐藏
{
    e_mailExample.fadeOut();
    e_mailExample.fadeOut("slow");
    e_mailExample.fadeOut(500);
});

/*-----------------监听 密码input--------------------*/
// 设置 通过jquery加入 密码错误提示框 ul 中的 li 和 span 样式
function setPwdLiSpanCSS(str_start)
{
    $(".pwd_error").html(str_start);
    $(".pwd_error li").css
    ({
        'cursor':'pointer', 'height': '20px', 'width': '360px',
        'line-height': '20px', 'margin-left': '-40px','border-bottom':'solid 1px rgba(255,255,255,.15)',
        'padding': '0 15px','color': '#fff'
    })
    $(".pwd_error li span").css({'height': '32px', 'line-height' : '18px'});
}
// 判断输入密码格式是否正确的函数
function judgeFormat(pwd)
{
    if(pwd.length >= 6 && pwd.length <= 16)
    {
        if(isNaN(pwd))       // 不是数字时候
        {
            if(/\s/.test(pwd))
            {
                return false
            }else
            {
                return true
            }
        }else                // 是数字的时候
        {
            if(pwd.length < 9)
            {
                return false
            }else
            {
                return true
            }
        }
    }else
    {
        return false
    }
}
// 监听 密码 input 定焦事件,
passwordInput.focus(function()
{
    pwd_error.fadeIn();
    pwd_error.fadeIn("slow");
    pwd_error.fadeIn(1000);
    // 监听 密码 input 事件, 时刻改变 时刻判断键入值
    passwordInput.bind("propertychange input",function()
    {
        pwd = passwordInput.val();
        if(pwd.length >= 6 && pwd.length <= 16)
        {
            if(isNaN(pwd))       // 不是数字时候
            {
                if(/\s/.test(pwd))
                {
                    var error_text = "<li><span style='color:#761c19;'>此处有空格,不能包含空格 </span></li>";
                    setPwdLiSpanCSS(error_text);
                }else
                {
                    var error_text = "<li><span style='color:#006611;'>格式正确, 可以进行注册</span></li>";
                    setPwdLiSpanCSS(error_text);
                }
            }else                // 是数字的时候
            {
                if(pwd.length < 9)
                {
                    var error_text = "<li><span style='color:#761c19;'>不能为9位以下纯数字</span></li>";
                    setPwdLiSpanCSS(error_text);
                }else
                {
                    var error_text = "<li><span style='color:#006611;'>格式正确, 可以进行注册</span></li>";
                    setPwdLiSpanCSS(error_text);
                }
            }
        }else
        {
            var error_text = "<li><span style='color:#761c19;'>密码长度必须6-16位</span></li>";
            setPwdLiSpanCSS(error_text);
        }
    });
});
// 监听 密码 input 失焦事件,  判断键入值是否格式正确, 应否存储?
passwordInput.blur(function()
{
    if(judgeFormat(passwordInput.val()))
    {
        pwdStorage = passwordInput.val();
        pwd_error.fadeOut();
        pwd_error.fadeOut("slow");
        pwd_error.fadeOut(500);
    }else
    {
        pwdStorage = null;
        var error_text = "<li><span style='color:darkred;'>格式错误, 不能进行注册!</span></li>";
        setPwdLiSpanCSS(error_text);
    }
});

/*-----------------监听 确认密码input--------------------*/
// 设置 通过jquery加入 确认密码错误模板的 ul 中的 li 和 span 样式
function setrePwdLiSpanCSS(str_start)
{
    $(".repwd_error").html(str_start);
    $(".repwd_error li").css
    ({
        'cursor':'pointer', 'height': '20px', 'width': '360px',
        'line-height': '20px', 'margin-left': '-40px','border-bottom':'solid 1px rgba(255,255,255,.15)',
        'padding': '0 15px','color': '#fff'
    })
    $(".repwd_error li span").css({'height': '32px', 'line-height' : '18px'});
}
// 确认密码定焦 弹出提示框
repasswordInput.focus(function()
{
    repwd_error.fadeIn();
    repwd_error.fadeIn("slow");
    repwd_error.fadeIn(1000);
    // 判断 确认密码input   和   密码input 值是否相等
    // 两个地方要确认:定焦 和 键盘响应
    function judgeRePwd()
    {
        if(pwdStorage == null)
        {
            var error_text = "<li><span style='color:#761c19;'>密码格式错误,无法确认</span></li>";
            setrePwdLiSpanCSS(error_text);
        }else
        {
            if(repasswordInput.val() != pwdStorage)
            {
                var error_text = "<li><span style='color:#761c19;'>两次密码输入不一致</span></li>";
                setrePwdLiSpanCSS(error_text);
            }else
            {
                var error_text = "<li><span style='color:#006611;'>两次密码输入一致, 请及时注册</span></li>";
                setrePwdLiSpanCSS(error_text);
            }
        }
    }
    judgeRePwd();
    repasswordInput.bind("propertychange input",function()
    {
        judgeRePwd();
    });
});
// 确认密码失焦 就存储他的信息进行判断
repasswordInput.blur(function()
{
    if(repasswordInput.val() === pwdStorage)
    {
        repwdStorage = repasswordInput.val();
        repwd_error.fadeOut();
        repwd_error.fadeOut("slow");
        repwd_error.fadeOut(500);
    }else
    {
        repwdStorage = null;
    }
});
/*----------------监听 手机input-----------------*/
// 判断是否 11 位 数字
function judgePhoneVal()
{
    if(regPhoneInput.val().length <= 11 && !isNaN(regPhoneInput.val()))
    {
        regPhoneInput.css("color", "#fff");
    }else
    {
        regPhoneInput.css("color", "red");
    }
}
// 定焦判断
regPhoneInput.focus(function()
{
    judgePhoneVal();
});
// 键盘响应判断
regPhoneInput.bind("propertychange input",function()
{
    judgePhoneVal();
});
// 失焦判断
regPhoneInput.blur(function()
{
    if(regPhoneInput.val().length < 11 && !isNaN(regPhoneInput.val()))
    {
        regPhoneInput.css("color", "#fff");
    }else if(regPhoneInput.val().length == 11 && !isNaN(regPhoneInput.val()))
    {
        regPhoneValStorage = regPhoneInput.val();
        regPhoneInput.css("color", "#fff");
    }else
    {
        regPhoneValStorage = null;
        regPhoneInput.css("color", "red");
    }
});
/*-----------------点击注册按钮 提交事件-----------------*/
regBtn.onclick = function()
{
    provinceVal = $("#province6")[0].value;   // 哪个 省
    cityVal = $("#city6")[0].value;           // 哪个 市
    districtVal = $("#district6")[0].value;   // 哪个 县
    if(usernameInput.val().indexOf("@") != -1)    // 邮箱 input 值包含 @ 则存储
    {
        unameStorage = usernameInput.val();
    }else
    {
        unameStorage = null;
    }
    console.log(unameStorage);
    if(unameStorage != null && pwdStorage != null && repwdStorage != null && regPhoneValStorage != null)
    {
        alert("信息已完善,可以进行注册");
    }else{
        if(unameStorage == null)
        {
            alert("请输入正确的邮箱格式");
        }else
        {
            if(regPhoneValStorage == null)
            {
                alert("手机号输入有误, 请重新输入");
            }else
            {
                alert("密码错误, 请重新输入");
            }
        }
    }
    // 提交表单, 获取后台数据
    $.post("url",$("#regUnameForm").serialize(),function(data)
    {

    });
};/**
 * Created by Sun on 2017/3/31.
 */
