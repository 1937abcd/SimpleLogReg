/**
 * Created by Sun on 2017/3/31.
 */
var logUsernameInput = $(".username");
var logPwdInput = $(".password");
var logCheckInput = $(".Captcha");
var logBut = $(".submit_button");
var e_mailExample = $(".e_mailExample");
var e_mailExample_arr = ["@qq.com", "@163.com", "@sina.cn", "@sina.com", "@139.com"];
var isFirstPra = 0;   // 用来标识 是否 input 中第一次出现 @ 符号, 如果删除了第一次输入 @, 则重置为 0
var logUnameStorage = logPwdStorage = null;

logUsernameInput.val(null);      // 每次刷新使 input 重新为空
logPwdInput.val(null);
logCheckInput.val(null);
/*-----------------监听 邮箱input--------------------*/
// 设置 通过jquery加入 邮箱模板的 ul 中的 li 和 span 样式
function setLiSpanCSS(str_start)
{
    $(".e_mailExample").html(str_start);
    $(".e_mailExample li").css
    ({
        'cursor':'pointer', 'height': '32px', 'width': '360px','text-align':'left',
        'line-height': '32px', 'margin-left': '0px','border-bottom':'solid 1px rgba(255,255,255,.15)',
        'padding': '0 15px','color': '#fff'
    }).click(function(e)
    {
        logUsernameInput.val(e.target.firstChild.textContent);
    });
    $(".e_mailExample li span").css({'height': '32px', 'line-height' : '32px'});
}
// 监听 邮箱 input 模板显示 与 隐藏
logUsernameInput.focus(function()    //定焦 显示
{
    e_mailExample.fadeIn();
    e_mailExample.fadeIn("slow");
    e_mailExample.fadeIn(1000);
    var str_start = "";
    if(logUsernameInput.val().indexOf("@") == -1)      // 当 input 值中没有 @ 的时候
    {
        for(var i = 0; i < e_mailExample_arr.length; i++)
        {
            str_start += "<li><span >" + logUsernameInput.val() + e_mailExample_arr[i] + "</span></li>";
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
                replaceUnameVal = logUsernameInput.val().substring(0, logUsernameInput.val().indexOf("@"));
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
        if(logUsernameInput.val().indexOf("@") == -1)
        {
            logUsernameInput.val(e.target.firstChild.textContent);
            isFirstPra = 0;
        }else
        {
            isFirstPra++;
            if(isFirstPra >= 1)
            {
                if(isFirstPra == 1)
                {
                    replaceUnameVal = logUsernameInput.val().substring(0, logUsernameInput.val().indexOf("@"));
                }
                for(var i = 0; i < e_mailExample_arr.length; i++)
                {
                    $(".e_mailExample li").eq(i).html( replaceUnameVal + e_mailExample_arr[i]);
                }
            }
        }
    });
    //监听 邮箱input 键盘弹起 (keyup) 事件, 时刻键入邮箱模板
    logUsernameInput.bind("propertychange input",function()
    {
        if(logUsernameInput.val().indexOf("@") == -1)      //没有输入 @ 的时候
        {
            for(var i = 0; i < e_mailExample_arr.length; i++)
            {
                $(".e_mailExample li").eq(i).html(logUsernameInput.val() + e_mailExample_arr[i]);
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
                    replaceUnameVal = logUsernameInput.val().substring(0, logUsernameInput.val().indexOf("@"));
                }
                for(var i = 0; i < e_mailExample_arr.length; i++)
                {
                    $(".e_mailExample li").eq(i).html( replaceUnameVal + e_mailExample_arr[i]);
                }
            }
        }
    });
});
logUsernameInput.blur(function()    // 失焦 隐藏
{
    e_mailExample.fadeOut();
    e_mailExample.fadeOut("slow");
    e_mailExample.fadeOut(500);
});
/*-------监听 按钮点击事件-------*/
logBut.click(function()
{
    if(logUsernameInput.val().indexOf("@") != -1)    // 邮箱 input 值包含 @ 则存储
    {
        logUnameStorage = logUsernameInput.val();
    }else
    {
        logUnameStorage = null;
    }
    if(logPwdInput.val() != null)
    {
        logPwdStorage = logPwdInput.val();
    }else
    {
        logPwdStorage = null
    }
    console.log(logUnameStorage+"用户名");
    console.log(logPwdStorage+"密码")
})
