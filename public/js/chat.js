
/**
 * c            连接实例
 * app          应用实例
 * userInfo     用户实例
 * components   组件实例
 */

/**
 *  expression   表情
 *  printscreen  截图
 *  code         代码
 */


var components, c, app, userInfo;

// 客户端配置项
// 静态资源服务器 API
// const BASE_URL = 'http://localhost:8989';                               // 本地测试服务器
const BASE_URL = 'http://static.emlice.top';                         // 线上服务器
const UPLOAD_AVATAR_API = BASE_URL + '/api/avatar_upload';              // 头像上传 API
const UPLOAD_PS_API = BASE_URL + '/api/ps_upload';                      // 截图上传 API
const DELETE_DATA = BASE_URL + '/api/clearData';                        // 管理员权限删除数据
const USER_INFO_EDIT = '/api/userEdit';                                 // 用户信息上传
const SOURCE_CODE = 'https://github.com/zyw5791557/EmliceChat';         // 源码
const WEB_SITE = 'https://www.emlice.top';                              // 站点

// 表情配置表
const baidu_address = BASE_URL + '/images/expressions/baidu.png';       // 百度表情地址
const baidu = [
    '呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
    '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心',
    '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
    '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳',
    '钱币', '灯泡', '咖啡', '蛋糕', '音乐', 'haha', '胜利', '大拇指', '弱', 'ok',
];
const baidu_space = 30;

// 连接命名
var $doc = $(document),
    $win = $('#app .windows'),
    $mask = $('.mask-layout'),
    $body = $('.body'),
    $userList = $('.user-list'),


    $empty = $('.empty-chat-panel[chat-type=empty]'),
    $all = $('.chat-panel[chat-type=all]');
$empty.show();
$all.hide();

// components 组件分发
function MyComponents() {

}

MyComponents.prototype = {
    chatPanel(dataObj, to) {

        var usr = `
        <div class="user-info" style="opacity: 0; transform: scale(0); display: none;">
            
        </div>
        `;

        var tool = `
        <div class="toolbar">
            <div>
                <i class="icon" title="表情"></i>
            </div>
            <div>
                <i class="icon" title="图片"></i>
            </div>
            <div>
                <i class="icon" title="代码"></i>
            </div>
            <input type="file" class="image-input" accept="image/png,image/jpeg,image/gif">
        </div>
        `;

        var emo = `
        <div class="expression" style="opacity: 0; transform: scale(0); display: none;">
            <div class="default-expression">
                <div>
                    <div style="background-position: left 0px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -30px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -60px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -90px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -120px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -150px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -180px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -210px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -240px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -270px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -300px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -330px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -360px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -390px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -420px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -450px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -480px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -510px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -540px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -570px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -600px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -630px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -660px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -690px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -720px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -750px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -780px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -810px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -840px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -870px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -900px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -930px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -960px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -990px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1020px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1050px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1080px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1110px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1140px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1170px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1200px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1230px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1260px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1290px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1320px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1350px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1380px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1410px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1440px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1470px; background-image: url(&quot;${baidu_address}&quot;);"></div>
                </div>
            </div>
            <div class="select-panel">
                <div class="selected">
                    <img src="https://assets.suisuijiang.com/images/default-expression.f7d7c.png"></div>
                <div class="">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4QIGEAQjlEp5PQAABI9JREFUOMutlEtsVFUAhr9zzp3HnZnO9P2gD8ojDAVapYpgKhgjIlFUFtQYVAgLE4PRkJgYF0Zj1J07TUxMxEc0RiEqIUoUNT5SRNtYS0uhpRVr6bQw7bxneu/cufe4Jz42fss/+b/lB/8z4vqhdCiI/9FevMvzVaIq2i3M0GYCgQ5ASa+SmJlNXXzv1IVi2dGDUlJ66cQ/CJ/fCy8euRFrMumXNfV3y4amw7Kx6VYRq47iDwqhFNnEVf3lB1/Z58fnyoYS79eG5CsFy008e/w64XMPgNbElKD/4H1d8c6tPY+J1pUxEYqCCID0cfWPOU69+wkLM/PcuL2HtpYY9cXksTo7/VRF+hZCj04CIJ97ANIFpKHEQUPx2ndjyaeviXBMmGHwfOAF+H14is/e+JhSPsqqTfdS39LLur7NNG7dvM+trXvVyWeq8++sBEB1rRD8OIb/4M6a+7t61u9IpENycvgCVVUhahsaOXdmhB9PnqF7++N0dN/P7PQcN/fdSiSyiAr7BVJscLPpxchDD599quMS6viROvo3WObGLasO1/c+GO/e9RLzVzKMDgzQ3N7IxNAUt+x+lp47DhCJhGht8tHclkPJDLg2IuiXbj7bnv785OfCUFkjHPCo1IU3qJrYtnC9RgcrrOu5g3h8JY0tcOfeVpROU5x4G+latLZLpEyhKw64NuCgamNxYQZuD5jGezISlmDIzSoUqBXOBN7iu6xvn2ZTt4Vp2oSiCk2CiruMK+uxsgvgWuAsg1OCcgkVNBQB35aqA/NIc3srnqBNCFfgZJHeebDOYmemKSQy5K/6cVUfwdZ+5kbmmBsaRVRKUM5BuQDlIoIKWngdR/vwG3QGcZyK0s4ywjGw0gIrsAdf9Tq0iGAXbJIDPzE/9AqpS8Osvm012qqFcgY8G7QHThnXcVTOA4OToxQLzoJbzENYYVDh0qkPWUpInPwSVjqBU0jjVDzSOU1zbhlt5xHlNHguCHCLFqVief7IT1SM2Ys2yZQ31rSUyZsxo8qnNDo3SWIwj1TgCwhSeYnrGbiuxrUqeHYBVc6hASEEVjqn0ylrWP8S9IyBSY/5JOeaWnPD0YbADr+pqGv1YfhBa4gGA3S1RIkZAUzXQ5h+PHsZ6RQBgedpUnOZP6dm3R/ECRc1m4K3zkZLP39Y0rGQd1ckJvx20WN2Eur9Pra01NOm/ESyDr4lDZ0dmGvLyPI1hHbJLBT15IXCm/tf18eyNp6ay0DwN5tTw1zurK40VJnuTWZNs4h1HqDj0hRmooQ1nceaLiBu2InxyD0E3EFkOUkubTMxXjr99a/uCy/3k3ryI1AA30zAp09gH/1ej8SUU+NTsqsuvsswq+O4wWZoi6P6dmDs2YHRkMKXHWDxSsobHy+f/mrIfebFL8RE286/6aHWsHs9Df3b2L+2s+5Q0+queKS2JegzI0hDo50M5czlSnJ6fGbyD+fYt6O89eYAU/8a2I1NMJXEt6+X1VvWsG1Fg+qNhNUKAbK0XEleXfLGRmY48/EgF1PjlMSa/yj2dUgg6IegBGGDrWEZcP/p8Behuw4lfzYw3AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wMi0wNlQxNjowNDozNSswODowMBWHkOAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDItMDZUMTY6MDQ6MzUrMDg6MDBk2ihcAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjkuMS0xMCBRMTYgeDg2XzY0IDIwMTctMDEtMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmd2pMFkAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA2NLzgqYQAAAAWdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANjRET2kJAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE0ODYzNjgyNzVsA2CtAAAAD3RFWHRUaHVtYjo6U2l6ZQAwQkKUoj7sAAAANHRFWHRUaHVtYjo6VVJJAGZpbGU6Ly9ydW4vZm9wZF90bXBkaXIvaW1nY252ODM1OTk5MjYxWzBdmHmdfAAAAABJRU5ErkJggg=="></div>
                <div class="">
                    <img src="https://assets.suisuijiang.com/images/collect-expression.05769.png"></div>
            </div>
        </div>
        <div class="code-input" style="opacity: 0; transform: scale(0); display: none;">
            <textarea placeholder="输入要展示的代码"></textarea>
            <div>
                <button class="sendCode">发送</button>
                <button class="cancelCode">取消</button></div>
        </div>
        `;

        var float = `
        <div class="float-panel roomInfoPanel" style="right: -340px;">
            <div>
                <span>群设置</span>
                <i class="icon close"></i></div>
            <div class="group-info">
                <div class="content">
                    <span>管理员：</span>
                    <span>无</span></div>
                <div class="content">
                    <span>在线人数：</span>
                    <span class="onlineUsers">${dataObj.float.peoples}人</span>
                </div>
                <div class="userList">
                    ${onlinePanel(window.c.onlineUsers)}
                </div>
                <input type="file" accept="image/*"></div>
            <div class="group-info-exit">
                <button>退出群组</button></div>
        </div>
        <div class="float-panel roomNoticePanel" style="right: -340px;">
            <div>
                <span>群公告</span>
                <i class="icon close"></i>
            </div>
            <div class="group-notice">
                <div>
                    system
                    更新于
                    2017年10月20日 17:43
                </div>
                <div class="content">欢迎各位来到 Emlice </div>
            </div>
        </div>
        `;

        var notic = function () {
            if (to === 'all') {
                return `
                            <div>
                                <div style="margin: auto 8px;" class="roomNotice">
                                    <i class="icon" title="公告"></i></div>
                                <div style="margin: auto 8px;" class="roomInfo">
                                    <i class="icon" title="关于"></i></div>
                            </div>
                        `;
            } else {
                return '';
            }
        }

        var com = `
        <div class="chat-panel-header">
            <div>
                <img class="avatar-image" src="${dataObj.com.avatar}" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                <p>${dataObj.com.username}</p>
            </div>
            ${notic()}
        </div>
        <div class="message-list">
        </div>
        ${tool}
        <div class="input-box">
            <input type="text" placeholder="输入消息" maxlength="1024">
        </div>
        `;

        var finalAll = `
        <div class="chat-panel" chat-type="${to}">
            ${com}
            ${float}
            ${emo}
            ${usr}
        </div>
        `;
        var final = `
        <div class="chat-panel" chat-type="${to}">
            ${com}
            ${emo}
            ${usr}
        </div>
        `;
        if (to === 'all') {
            return finalAll;
        } else {
            return final;
        }
    },
    userListItem(obj) {
        var oHtml = `
        <div class="user-list-item" data-user="${obj.to}">
            <img class="avatar-image" src="${obj.avatar}" alt="">
            <div class="unread">0</div>
            <div class="content">
                <div>
                    <p>${obj.to}</p>
                    <p></p>
                </div>
                <div>
                    <p></p>
                </div>
            </div>
        </div>
        `;
        return oHtml;
    }
}




// 公共方法 

// Date format
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                      //月份
        "d+": this.getDate(),                           //日
        "h+": this.getHours(),                          //小时
        "m+": this.getMinutes(),                        //分
        "s+": this.getSeconds(),                        //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),    //季度
        "S": this.getMilliseconds()                     //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
// 消息提示加工厂
function noticeProcess(param, type) {
    if (type === 'expression') {
        var baidu_idx;
        baidu.some((item, index) => {
            if (item === param) {
                baidu_idx = index;
            }
        });
        if (baidu_idx === undefined) return param;
        return `[表情]`;
    } else if (type === 'printscreen') {
        return `[图片]`;
    } else if(type === 'code') {
        return `[代码片段]`;
    } else {
        if(typeof param === Number) param.toString();
        if(param === undefined) return;
        var FTA = param.match(/^(https?|ftp|file):\/\//g);
        var f = param.match(/.*(\.png|\.jpg|\.jpeg|\.gif)$/);
        if(FTA !== null && f !== null) return `[远程地址图片]`;
        if(FTA !== null) return `[链接]`; 
        return param;
    }
}


// online panel
function onlinePanel(obj) {
    var str = '';
    for (var i = 0; i < obj.length; i++) {
        str += `
            <div data-user="${obj[i].name}">
                <img class="avatar-image" src="${obj[i].avatar}" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                <span>${obj[i].name}</span>
            </div>
        `;
    }
    return str;
}


// 消息渲染处理中心
function msgProcess(param, type) {
    var t = param.charAt(0);
    if (type === 'expression' || t === '#') {
        if(type === 'expression') {
            var query = param;
        }else {
            var query = param.substr(1);
        }
        var baidu_idx;
        baidu.some((item, index) => {
            if (item === query) {
                baidu_idx = index;
            }
        });
        if (baidu_idx === undefined) {
            return `
                <div class="text">
                    ${param}
                </div>
            `;
        }
        return `
            <div class="text">
                <img class="expression-default-message" src="data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==" style="background-position: left -${baidu_idx * baidu_space}px; background-image: url(${baidu_address})" onerror="this.style.display='none'">
            </div>
        `;
    } else if (type === 'printscreen') {
        return `
            <div class="image">
                <img src="${param}" onerror="this.src='/images/imgError.jpg'" style="max-height: 200px;">
            </div>
        `;
    } else if (type === 'code') {
        return `
            <div class="code"><pre><code>${param}</code></pre></div>
        `;
    } else {
        var FTA = param.match(/^(https?|ftp|file):\/\//g);
        var f = param.match(/.*(\.png|\.jpg|\.jpeg|\.gif)$/);
        // 远程图片链接解析, 接口反防盗链
        if(FTA !== null && f !== null) {
            return `
                <div class="image">
                    <img src="/api/imgload?url=${param}" onerror="this.src='/images/imgError.jpg'" style="max-height: 200px;">
                </div>
            `;
        }
        // 渲染链接
        if (FTA !== null) {
            return `
                <div class="text">
                    <a class="imageURL" href="${param}" rel="noopener noreferrer" target="_blank">${param}</a>
                </div>
            `;
        } else {
            return `
                <div class="text">
                    ${param}
                </div>
            `;
        }
    }
}



// 向上滚动加载
// function scrollAjax() {
//     var $this = $('.message-list');
//     var dataUserPanel = $('.chat-panel').attr('chat-type');
//     if ($this.scrollTop() <= 0) {
//         c.takeMsg({
//             from: window.c.userAllInfo.username,
//             take: dataUserPanel,
//             addPage: 1
//         });
//     }
// }




// user info 实例
function UserInfo() {
    this.init();
    this.userInfoFlag = true;
}
UserInfo.prototype = {
    init: function () {
        this.openAvatarInfo();
        this.close();
        this.openChat();
        this.openUserSetting();
        this.toolBtn();
        this.roomInfo();
    },
    renderBubble() {
        // 渲染未读消息气泡
        $('.user-list-item').each(function () {
            var t = $(this).attr('data-user');
            $(this).find('.unread').text(c.myUserListArr[t].noRead);
        });
    },
    openAvatarInfo() {
        var _this = this;
        $win.on('click', '.avatar-image.user-icon', function (e) {
            var e = e || event;
            e.stopPropagation();
            var uif = _this.userInfoFlag;
            var name = $(this).attr('data-username');
            if (uif === false) return;
            if (name === window.c.userAllInfo.username) return;
            socket.emit('take userInfo', name);
        });
    },
    close() {
        var _this = this;
        $win.on('click', '.user-info i.icon', function () {
            _this.closeUserInfo(_this);
            $mask.hide();
        });
    },
    closeUserInfo(that) {
        var $userInfoModel = $('.user-info');
        $userInfoModel.css({
            opacity: 0,
            transform: 'scale(0)',
        });
        setTimeout(() => {
            $userInfoModel.empty();
            that.userInfoFlag = true;
        }, 300);
    },
    // 新建聊天窗口
    openChat() {
        var _this = this;
        $win.on('click', '.singleChatBtn, .userList .avatar-image', function () {
            _this.userInfoFlag = true;
            var username = $(this).attr('data-to') || $(this).parent().attr('data-user');
            if (username === window.c.userAllInfo.username) return;
            var avatar = $(this).attr('data-avatar') || $(this).attr('src');

            // 查询 $userList 里面是否有该用户面板 没有就新建, 有就跳过。
            var f = $userList.find('.user-list-item[data-user=' + username + ']');
            if (f.length === 0) {
                let o = {
                    to: username,
                    avatar: avatar
                }
                $userList.append(window.components.userListItem(o));
                // 添加临时会话成员
                c.myUserListArr[username] = {
                    noRead: 0
                };

            }

            var dataObj = {
                com: {
                    avatar: avatar,
                    username: username
                },
                usr: {
                    avatar: '',
                    username: ''
                },
                float: {
                    peoples: window.c.onlineUsers.length
                }
            };
            // 删除聊天窗口
            $('.chat-panel').remove();
            // console.log('重新渲染窗口')
            // 重新渲染聊天窗口
            $body.append(window.components.chatPanel(dataObj, username));

            // 拉去记录
            c.takeMsg({
                from: window.c.userAllInfo.username,
                take: username,
            });

            $('.chat-panel').hide();
            $empty.hide();
            $('.chat-panel[chat-type=' + username + ']').show();
        });
    },
    openUserSetting() {          // 打开用户设置
        $('.avatar-text[title=查看个人信息]').on('click', function (e) {
            var e = e || window.event;
            // 阻止事件冒泡
            e.stopPropagation();
            $('.user-setting').css({
                opacity: 1,
                transform: 'scale(1)'
            });
            $mask.show();
        });
        $('.user-setting').on('click', function (e) {
            var e = e || window.event;
            e.stopPropagation();
        });
        $('.user-setting div:eq(0) i').on('click', function () {
            $('.user-setting').css({
                opacity: 0,
                transform: 'scale(0)'
            });
            $mask.hide();
        });
        $('.user-setting .avatar-image').on('mouseenter', function () {
            var oHtml = '<div class="avatar-mask icon"></div>';
            $(this).parent().append(oHtml);
        });
        $('.user-setting .avatar-image').on('mouseleave', function () {
            $(this).siblings('.avatar-mask').remove();
        });
    },
    toolBtn() {         // 消息辅助输入    表情包/图片/代码格式化
        var _this = this;
        // 聊天工具栏阻止冒泡
        // 表情包面板阻止事件冒泡
        // 右侧浮动面板阻止事件冒泡 online
        $body.on('click', '.chat-panel .toolbar div, .chat-panel .expression, .chat-panel .code-input', function (e) {
            var e = e || window.event;
            e.stopPropagation();
        });
        // 选择表情
        $body.on('click', '.chat-panel .expression .default-expression>div', function () {
            var s = $(this).children().attr('style');
            // 发送消息
            var to = $(this).parents('.chat-panel').attr('chat-type');
            var idx = $(this).index();
            var msg = {
                from: window.c.userAllInfo.username,
                avatar: window.c.userAllInfo.userAvatar,
                to: to,
                message: `${baidu[idx]}`,
                type: 'expression',
                date: new Date().getTime(),
                read: false,
            }
            window.c.sendMsg(msg);
            _this.closeTool();
            $mask.hide();
        });



        // 表情包
        $body.on('click', '.chat-panel .toolbar div', function () {
            var idx = $(this).index();
            if (idx === 0) {
                $('.chat-panel .expression').show().css({
                    opacity: 1,
                    transform: "scale(1)",
                });
                $mask.show();
            } else if(idx === 2) {
                $('.chat-panel .code-input').show().css({
                    opacity: 1,
                    transform: "scale(1)",
                });
                $mask.show();
            }else {
                layer.msg('暂未开放');
            }
        });

        // 代码格式化
        $body.on('click', '.chat-panel .code-input .sendCode', function () {
            var val = $('textarea').val();
            // 发送消息
            if(val !== '') {
                var to = $(this).parents('.chat-panel').attr('chat-type');
                var msg = {
                    from: window.c.userAllInfo.username,
                    avatar: window.c.userAllInfo.userAvatar,
                    to: to,
                    message: `${val}`,
                    type: 'code',
                    date: new Date().getTime(),
                    read: false,
                }
                window.c.sendMsg(msg);
            }
            _this.closeTool();
            $mask.hide();
            $('textarea').val('');
        });

        // 取消编辑代码
        $body.on('click', '.chat-panel .code-input .cancelCode', function () {
            _this.closeTool();
            $mask.hide();
        });

        $body.on('click', '.chat-panel .expression .select-panel div', function () {
            var idx = $(this).index();
            $(this).addClass('selected').siblings().removeClass('selected');
            if (idx === 0) {
                return;
            } else {
                layer.msg('暂未开放');
            }
        });


    },
    closeTool() {
        $('.chat-panel .expression').css({
            opacity: 0,
            transform: "scale(0)",
        });
        $('.chat-panel .code-input').css({
            opacity: 0,
            transform: "scale(0)",
        });
    },
    roomInfo() {        // 群聊房间信息
        var _this = this;
        // 事件委托
        $body.on('click', '.roomInfo', function (e) {
            var e = e || window.event;
            e.stopPropagation();
            $('.roomInfoPanel').css('right', '0px');
            $mask.show();
        });
        $body.on('click', '.roomInfoPanel button', function () {
            layer.msg('暂未开放');
        });
        $body.on('click', '.roomInfoPanel .close', function () {
            _this.closeRoomPanel();
        });
        $body.on('click', '.roomNotice', function (e) {
            var e = e || window.event;
            e.stopPropagation();
            $('.roomNoticePanel').css('right', '0px');
            $mask.show();
        });
        $body.on('click', '.roomNoticePanel .close', function () {
            _this.closeRoomPanel();
        });
    },
    closeRoomPanel() {
        $('.roomInfoPanel').css('right', '-340px');
        $('.roomNoticePanel').css('right', '-340px');
    },
}


var socket = io();

// 连接实例
function Connect() {
    // 用户所有消息集合
    this.userAllInfo = {
        username: '',           // 我的连接账号即用户名
        userAvatar: '',         // 用户头像
        duration: '',           // 用户时长
        sex: '',                // 性别
        birthday: '',           // 出生日期
        place: '',              // 位置
        website: '',            // 站点
        github: '',             // github
        qq: '',                 // QQ

    };
    onlineUsers: [],            // 在线人数
    this.myUserListArr = {      // 我的临时会话集合
        all: {
            noRead: 0
        },
    };
    this.token = '';            // token
}

Connect.prototype = {
    // 用户加入
    usernameEmit(username) {
        var username = this.userAllInfo.username;
        socket.emit('user join', username);
        $('.user-panel .avatar-text').css('background-image', 'url(' + this.userAllInfo.userAvatar + ')');
        $win.show();
        $('.input-box input').focus();
    },
    // 发送消息
    sendMsg(msg) {
        socket.emit('message', msg);
    },
    // 渲染消息
    renderMsg(res) {
        // console.log('渲染消息：', res);
        var $messages = $('.message-list');
        // 判断当前窗口是否是会话窗花
        var p = $('.message-list').parents('.chat-panel').attr('chat-type');
        for (var i = 0; i < res.length; i++) {
            if (parseInt(i) === res.length - 1) {
                // 渲染时间和消息
                if (res[i].to === 'all') {
                    // console.log('提示群聊消息咯');
                    $('.user-list-item[data-user=' + res[i].to + '] .content div').eq(1).find('p').text(res[i].from + '：' + noticeProcess(res[i].message,res[i].type));
                    $('.user-list-item[data-user=' + res[i].to + '] .content div').eq(0).find('p').eq(1).text((new Date(res[i].date).format('hh:mm')));
                } else {
                    // console.log('提示私聊消息咯');
                    $('.user-list-item[data-user=' + res[i].to + '] .content div').eq(1).find('p').text(res[i].from + '：' + noticeProcess(res[i].message,res[i].type));
                    $('.user-list-item[data-user=' + res[i].to + '] .content div').eq(0).find('p').eq(1).text((new Date(res[i].date).format('hh:mm')));
                    $('.user-list-item[data-user=' + res[i].from + '] .content div').eq(1).find('p').text(res[i].from + '：' + noticeProcess(res[i].message,res[i].type));
                    $('.user-list-item[data-user=' + res[i].from + '] .content div').eq(0).find('p').eq(1).text((new Date(res[i].date).format('hh:mm')));
                }
            }

            if (p !== undefined) {
                if (p !== 'all' && res[i].to === 'all') {
                    continue;
                } else if (p == 'all' && res[i].to !== 'all') {
                    continue;
                }
            }

            var isMy = window.c.userAllInfo.username == res[i].from ? true : false;

            var commonHtml = `
                    <img class="avatar-image user-icon" src="${res[i].avatar}" alt="" data-username="${res[i].from}">
                    <div>
                        <div>
                            <span class="message-username">${res[i].from}</span>
                            <span>${(new Date(res[i].date).format('hh:mm:ss'))}</span>
                        </div>
                        ${msgProcess(res[i].message,res[i].type)}
                    </div>
            `;
            var myHtml = `
            <div class="message-list-item">
                <div class="native-message message-self">
                    ${commonHtml}
                </div>
            </div>
            `;
            var unMyHtml = `
            <div class="message-list-item">
                <div class="native-message">
                    ${commonHtml}
                </div>
            </div>
            `;
            if (isMy) {
                $messages.append(myHtml);
            } else {
                $messages.append(unMyHtml);
            }
            if (i === res.length - 1) {
                if ($messages.length === 0) return;
                $messages[0].scrollTop = $messages[0].scrollHeight;
                // 朕已阅
                socket.emit('message read', { readUser: window.c.userAllInfo.username, msgs: res });
            }
        }
        if ($('.postbird-img-glass-box') !== undefined) $('.postbird-img-glass-box').remove();
        // 图片放大
        Glasses.init({
            domSelector: '.native-message .image img',
            animation: true
        });

        

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });

        /**
         * 创建 imagesLoaded 实例
         * 确保 image 加载完毕改变聊天室 scrollTop
         */
        var imgLoad = imagesLoaded($messages);
        // vanilla JS
        imgLoad.on('always', function (instance) {
            if ($messages.length === 0) return;
            $messages[0].scrollTop = $messages[0].scrollHeight;
        });
    },
    // 调取历史记录
    takeMsg(o) {
        socket.emit('take messages', o);
    }
}



// messages   回车发送消息

$win.on('keydown', '.input-box input', function (e) {
    var keys = parseInt(e.keyCode);
    var m = $(this).val().trim();
    if (keys === 13 && m !== '') {      // 消息不得为空。
        var to = $(this).parents('.chat-panel').attr('chat-type');
        var msg = {
            from: window.c.userAllInfo.username,
            avatar: window.c.userAllInfo.userAvatar,
            to: to,
            message: m,
            type: 'normal',
            date: new Date().getTime(),
            read: false,
        }
        c.sendMsg(msg);
        $(this).val('');                  // empty input
    }
});
// 获取剪贴板中的 image 数据完成截图发送功能


var imgReader = function (item) {
    var blob = item.getAsFile();
    if (blob !== null && blob.size > 1.5 * 1024 * 1024) {
        layer.msg('图片太大, 请压缩后重新上传~');
        return;
    } else if (blob === null) {
        layer.msg('请截图重新上传~');
        return;
    }
    var param = new FormData();
    param.append("ps", blob);
    axios({
        url: UPLOAD_PS_API,
        method: 'POST',
        data: param,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        var Code = res.data.Code;
        var Str = res.data.Str;
        if (Code === 0) {
            var d = res.data.ps;
            var to = $body.find('.chat-panel').attr('chat-type');
            var msg = {
                from: window.c.userAllInfo.username,
                avatar: window.c.userAllInfo.userAvatar,
                to: to,
                message: `${d}`,
                type: 'printscreen',
                date: new Date().getTime(),
                read: false,
            }
            window.c.sendMsg(msg);
        } else if (Code === -1) {
            layer.msg(Str);
            return;
        }
    });
};

$win.on('paste', '.input-box input', function (e) {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    const types = (e.clipboardData || e.originalEvent.clipboardData).types;
    // 如果包含文件内容
    if (types.indexOf('Files') > -1) {
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            if (item.kind === 'file' && item.type.match(/^image/)) {
                imgReader(item);
            }
        }
        e.preventDefault();
    }
});


// render message
socket.on('message', function (res) {
    // console.log('接受消息并打印, 准备送往渲染工厂：', res);

    /**
     *  from 来自谁的消息
     */

    for (let i = 0; i < res.length; i++) {
        var f = $userList.find('.user-list-item[data-user=' + res[i].from + ']');
        if (f.length === 0 && res[i].from !== window.c.userAllInfo.username && res[i].to !== 'all') {
            let o = {
                to: res[i].from,
                avatar: res[i].avatar
            }
            $userList.append(window.components.userListItem(o));
            // 添加临时会话成员
            c.myUserListArr[res[i].from] = {
                noRead: 0
            };
        }
    }

    // 判断当前窗口是否为聊天渲染窗口, 若是调用渲染函数, 若不是, 直接跳走并 未读消息计数 ++ 
    var e = $('.chat-panel').attr('chat-type');
    if (e !== undefined) {           // 如果当前频道不为空频道
        // 当前为私聊频道或群聊频道
        if (res[0].to == 'all' && e !== 'all') {    // 如果是发送去群聊频道切当前不在群聊频道
            c.myUserListArr.all.noRead++;
        } else {                     // 私聊频道
            if (res[0].to !== 'all' && res[0].from !== window.c.userAllInfo.username && e !== res[0].from) {
                c.myUserListArr[res[0].from] === undefined ? c.myUserListArr[res[0].from] = { noRead: 1 } : c.myUserListArr[res[0].from].noRead++;
            }
        }
    } else {
        // 当前为空频道。
        if (res[0].to == 'all' && e !== 'all') {    // 如果是发送去群聊频道切当前不在群聊频道
            c.myUserListArr.all.noRead++;
        } else {                     // 私聊频道
            if (res[0].to !== 'all' && res[0].from !== window.c.userAllInfo.username && e !== res[0].from) {
                c.myUserListArr[res[0].from] === undefined ? c.myUserListArr[res[0].from] = { noRead: 1 } : c.myUserListArr[res[0].from].noRead++;
            }
        }
    }



    // 渲染消息气泡
    window.userInfo.renderBubble();

    if (res[0].from !== window.c.userAllInfo.username) {
        var d = JSON.parse(localStorage.getItem('desktopNotification'));
        var s = JSON.parse(localStorage.getItem('soundNotification'));
        if (s) {
            // 消息声音提醒
            var ado = new Audio('/audio/momo.mp3');
            ado.play();
        }
        if (d) {
            // 桌面消息提醒
            Notification.requestPermission(function (permission) {
                if (permission == "granted") {
                    var notification = new Notification((res[0].to === 'all' ? "群聊窗口" : res[0].from) + "- 发来消息", {
                        dir: "auto",
                        lang: "zh-CN",
                        // tag: "testNotice",
                        icon: '/images/sleep.gif',
                        body: `${res[0].from}：${noticeProcess(res[0].message,res[0].type)}`,
                        // renotify: true,     // 是否替换之前的通知
                    });
                    notification.onclick = function () {
                        window.focus();
                        notification.close();
                    };
                    notification.onshow = function () {
                        //3秒后自动关闭消息框    
                        setTimeout(function () {
                            notification.close();
                        }, 3000);
                    }
                }
            });
        }
    }

    c.renderMsg(res);

});


// 接受历史记录
socket.on('take messages', function (data) {
    if (data.length !== 0) {
        // console.log('调取离线记录：', data);
        c.renderMsg(data);
    }
});


// 接受用户状态
socket.on('checkUser', function (data) {
    var Code = data.Code;
    var Str = data.Str;
    if (Code === -1) {
        layer.msg(Str);
        localStorage.removeItem('UserInfo');
        setTimeout(() => {
            location.href = "/register";
        }, 2000);
    }
});

// 接受在线人数
socket.on('user join', function (res) {
    // 修改在线人数
    window.c.onlineUsers = res;
    // 因用户修改头像 => 修改私聊用户头像
    for (var i = 0; i < res.length; i++) {
        var $user = $(`.user-list .user-list-item[data-user=${res[i].name}]`);
        var $userPanel = $(`.chat-panel[chat-type=${res[i].name}]`);
        var $userMsgAvatar = $(`.native-message .avatar-image[data-username=${res[i].name}]`);
        if ($user.length !== 0) {
            $user.find('img').attr('src', res[i].avatar);
        }
        if ($userPanel.length !== 0) {
            $userPanel.find('.chat-panel-header .avatar-image').attr('src', res[i].avatar);
        }
        if($userMsgAvatar.length !== 0) {
            $userMsgAvatar.attr('src', res[i].avatar);
        }
    }
    // 更新 online Panel
    if ($('.onlineUsers').length !== 0) {
        $('.onlineUsers').text(res.length + '人');
        $('.roomInfoPanel .userList').empty().append(onlinePanel(res));
    }
});


// 改变 online panel
socket.on('change onlinePanel', function (res) {
    $('.roomInfoPanel .userList').empty().append(onlinePanel(res));
});


// 权限检查
socket.on('check permission', function(f) {
    if(f) {
        $('#clearData').remove().off();         // 删除权限节点和事件
    }
});


// 接受离线消息未读条数
socket.on('Offline noRead messages', function (res) {
    var fromArr = {};
    var fromList = {};
    if (res.length !== 0) {
        for (let i = 0; i < res.length; i++) {
                if (fromList[res[i].from] === undefined) {
                    fromList[res[i].from] = [res[i]];
                } else {
                    fromList[res[i].from].push(res[i])
                }
            }
        for(var j in fromList) {
            fromArr[j] = {
                noRead: fromList[j].length,
                lastMsg: fromList[j][fromList[j].length-1],
            };
        }
        for (var k in fromArr) {
            var f = $userList.find('.user-list-item[data-user=' + k + ']');
            if (f.length === 0 && k !== window.c.userAllInfo.username && k !== 'all') {
                let o = {
                    to: k,
                    avatar: fromArr[k].lastMsg.avatar
                }
                $userList.append(window.components.userListItem(o));
                // 添加临时会话成员
                c.myUserListArr[k] = {
                    noRead: fromArr[k].noRead
                };
                // 渲染最后一条消息
                
                $('.user-list-item[data-user=' + k + '] .content div').eq(1).find('p').text(k + '：' + noticeProcess(fromArr[k].lastMsg.message,fromArr[k].lastMsg.type));
                $('.user-list-item[data-user=' + k + '] .content div').eq(0).find('p').eq(1).text((new Date(fromArr[k].lastMsgDate).format('hh:mm')));
            }
        }

        // 渲染未读消息气泡
        window.userInfo.renderBubble();

    }
});


// 获取用户名片
socket.on('take userInfo', function (res) {
    if (res) {
        var userPanelData = res.Data;
        window.userInfo.userInfoFlag = false;
        var f = $('.chat-panel').attr('chat-type');
        // 插入链接
        var github = (userPanelData.github === '' || userPanelData.github === undefined) ? '' : `<a class="icon" title="github" href="//${userPanelData.github}" rel="noopener noreferrer" target="_blank"></a>`;
        var website = (userPanelData.website === '' || userPanelData.website === undefined) ? '' : `<a class="icon" title="website"
        href="//${userPanelData.website}" rel="noopener noreferrer" target="_blank" style="position: relative; top: 3px;"></a>`;
        var qq = (userPanelData.qq === '' || userPanelData.qq === undefined) ? '' : `<a class="icon"
        title="qq" href="tencent://message/?uin=${userPanelData.qq}" rel="noopener noreferrer" target="_blank"></a>`;

        var commonHtml = `
        <div><i class="icon"></i>
            <div class="background-image" style="background-image: url(/images/b.jpg);"></div>
            <div class="background-mask"></div>
            <div class="content"><img class="avatar-image" src="${userPanelData.avatar}"
                    style="width: 80px; height: 80px; min-width: 80px; min-height: 80px;"><span>${userPanelData.name}</span>
                <div class="icon-list">
                    ${github}
                    ${website}
                    ${qq}
                </div>
            </div>
        </div>
        <div class="normal-status">
            <div>
                <div>
                    <div>
                        <span>性别:</span>
                        <span>年龄:</span>
                        <span>时长:</span>
                        <span>位置:</span>
                    </div>
                    <div>
                        <span>${userPanelData.sex === 'male' ? '男' : '女'}</span>
                        <span>${(new Date().getFullYear() - new Date(userPanelData.birthday).getFullYear()) <= 0 ? 1 : (new Date().getFullYear() - new Date(userPanelData.birthday).getFullYear())}</span>
                        <span>${res.duration}天</span>
                        <span>${userPanelData.place === '' ? '火星' : userPanelData.place}</span>
                    </div>
                </div>
            </div>
            <div><button class="singleChatBtn" data-to="${userPanelData.name}" data-avatar="${userPanelData.avatar}">发起聊天</button></div>
        </div>
        `;
        var $userInfoModel = $('.user-info');
        $userInfoModel.append(commonHtml);
        $userInfoModel.show().css({
            opacity: 1,
            transform: 'scale(1)',
        });
        $mask.show();
    }
});




// init App action
function App() {
    this.init();
}

App.prototype = {
    init() {
        this.checkLogin();
        this.updateUserInfo();
        this.openUserListItem();
        this.player();
        this.eventListeners();
        this.checkSetting();
        this.avatarSetting();
        this.updateUserWebsite();
    },
    updateUserInfo(obj) {       // 更新用户信息
        // 右上角
        $('.user-panel .avatar-text').css('background-image', 'url(' + window.c.userAllInfo.userAvatar + ')');
        // 用户设置区域
        $('.user-setting .background-image').css('background-image', 'url(' + window.c.userAllInfo.userAvatar + ')');
        $('.user-setting .avatar-image').attr('src', window.c.userAllInfo.userAvatar);
        $('.user-setting .avatar-image').siblings('span').text(window.c.userAllInfo.username);
        $('.user-setting .normal-status div div div:eq(1)').find('span:eq(0)').text(window.c.userAllInfo.sex === 'male' ? '男' : '女');
        $('.user-setting .normal-status div div div:eq(1)').find('span:eq(1)').text((new Date().getFullYear() - new Date(window.c.userAllInfo.birthday).getFullYear() <= 0 ? '1' : new Date().getFullYear() - new Date(window.c.userAllInfo.birthday).getFullYear()));
        $('.user-setting .normal-status div div div:eq(1)').find('span:eq(2)').text(window.c.userAllInfo.duration + '天');
        $('.user-setting .normal-status div div div:eq(1)').find('span:eq(3)').text(window.c.userAllInfo.place === '' ? '火星' : window.c.userAllInfo.place);

    },
    updateUserWebsite() {       // 更新用户站点
        var github = (window.c.userAllInfo.github === '' || window.c.userAllInfo.github === undefined) ? '' : `<a class="icon" title="github" href="//${window.c.userAllInfo.github}" rel="noopener noreferrer" target="_blank"></a>`;
        var website = (window.c.userAllInfo.website === '' || window.c.userAllInfo.website === undefined) ? '' : `<a class="icon" title="website"
        href="//${window.c.userAllInfo.website}" rel="noopener noreferrer" target="_blank" style="position: relative; top: 3px;"></a>`;
        var qq = (window.c.userAllInfo.qq === '' || window.c.userAllInfo.qq === undefined) ? '' : `<a class="icon"
        title="qq" href="tencent://message/?uin=${window.c.userAllInfo.qq}" rel="noopener noreferrer" target="_blank"></a>`;
        var oHtml = `
            ${github}
            ${website}
            ${qq}
        `;
        $('.user-setting .icon-list').empty().append(oHtml);
    },
    checkLogin() {      // 登录状态监测
        var ConnectUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
        if (ConnectUserInfo === null || ConnectUserInfo === undefined) {
            location.href = '/login';
        } else {
            var userName = ConnectUserInfo.name;
            var userAvatar = ConnectUserInfo.avatar;
            var userSex = ConnectUserInfo.sex;
            var userBirthday = ConnectUserInfo.birthday;
            var userPlace = ConnectUserInfo.place;
            var userWebsite = ConnectUserInfo.website;
            var userGithub = ConnectUserInfo.github;
            var userQq = ConnectUserInfo.qq;
            var token = ConnectUserInfo.token;
            var duration = localStorage.getItem('Duration');
            // 初始化连接
            c = new Connect();
            window.c.userAllInfo.username = userName;
            window.c.userAllInfo.userAvatar = userAvatar;
            window.c.userAllInfo.sex = userSex;
            window.c.userAllInfo.birthday = userBirthday;
            window.c.userAllInfo.website = userWebsite;
            window.c.userAllInfo.place = userPlace;
            window.c.userAllInfo.github = userGithub;
            window.c.userAllInfo.qq = userQq;
            window.c.userAllInfo.duration = duration;
            window.c.token = token;
            window.c.usernameEmit(userName);           // 发送服务端注册用户 socket
            this.checkPermission(userName);            // 用户权限检查
            this.DBcheckUserState(userName);           // 检查用户状态
            this.checkNoReadMsg(userName);             // 检查离线状态下的未读消息, 初始化
        }
    },
    checkPermission(user) {
        socket.emit('check permission', user);
    },
    DBcheckUserState(user) {                // 数据库检查用户是否存在
        socket.emit('checkUser', user);     // 向服务端发送请求检查用户状态
    },
    checkNoReadMsg(user) {                      // 检查离线状态下的未读消息, 初始化
        socket.emit('Offline noRead messages', user);
    },
    logout() {          // 退出登录
        localStorage.removeItem('UserInfo');
        location.href = '/login';
    },
    editUserInfo(f) {    // 编辑用户信息
        if (f) {
            var Edit_html = `
                <div class="edit-status">
                    <div>
                        <div>
                            <div>
                                <span>性别:</span>
                                <span>出生日期:</span>
                                <span>位置:</span>
                                <span>个人网站:</span>
                                <span>github:</span>
                                <span>qq:</span>
                            </div>
                            <div id="personInfoBox">
                                <select>    
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                </select>
                                <input class="birthday" type="date" value="${window.c.userAllInfo.birthday}">
                                <input class="place" type="text" value="${window.c.userAllInfo.place}">
                                <input class="website" type="url" placeholder="不用写传输协议头" value="${window.c.userAllInfo.website}">
                                <input class="github" type="url" placeholder="不用写传输协议头" value="${window.c.userAllInfo.github}">
                                <input class="qq" type="text" value="${window.c.userAllInfo.qq}">
                            </div>
                        </div>
                    </div>
                    <div>
                        <button id="editPersonInfo">确定</button>
                    </div>
                </div>
            `;
            $('.user-setting').find('.normal-status').remove().end().append(Edit_html);
            $('.edit-status #personInfoBox select').val(window.c.userAllInfo.sex);
        } else {

            function panelHtml() {
                var Panel_html = `
                    <div class="normal-status">
                        <div>
                            <div>
                                <div>
                                    <span>性别:</span>
                                    <span>年龄:</span>
                                    <span>时长:</span>
                                    <span>位置:</span>
                                </div>
                                <div>
                                    <span>${window.c.userAllInfo.sex === 'male' ? '男' : '女'}</span>
                                    <span>${(new Date().getFullYear() - new Date(window.c.userAllInfo.birthday).getFullYear() <= 0 ? '1' : new Date().getFullYear() - new Date(window.c.userAllInfo.birthday).getFullYear())}</span>
                                    <span>${window.c.userAllInfo.duration}天</span>
                                    <span>${window.c.userAllInfo.place === '' ? '火星' : window.c.userAllInfo.place}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button>编辑</button>
                        </div>
                    </div>
                `;
                $('.user-setting').find('.edit-status').remove().end().append(Panel_html);
            }

            var $personInfoBox = $('#personInfoBox');
            var sex = $personInfoBox.find('select').val();
            var birthday = $personInfoBox.find('.birthday').val();
            var place = $personInfoBox.find('.place').val();
            var website = $personInfoBox.find('.website').val();
            var github = $personInfoBox.find('.github').val();
            var qq = $personInfoBox.find('.qq').val();
            if (sex === window.c.userAllInfo.sex && birthday === window.c.userAllInfo.birthday && place === window.c.userAllInfo.place && website === window.c.userAllInfo.website && github === window.c.userAllInfo.github && qq === window.c.userAllInfo.qq) {
                panelHtml();
                return;
            }
            var userData = {
                name: window.c.userAllInfo.username,
                sex: sex,
                birthday: birthday,
                place: place,
                website: website,
                github: github,
                qq: qq
            }
            axios({
                method: 'POST',
                url: USER_INFO_EDIT,
                data: userData
            }).then(res => {
                var Code = res.data.Code;
                var Str = res.data.Str;
                layer.msg(Str);
                if (Code === -1) {
                    setTimeout(() => {
                        location.href = '/login';
                    }, 2000);
                } else if (Code === 0) {
                    // 成功
                    // console.log(res);
                    var localData = JSON.parse(localStorage.getItem('UserInfo'));
                    for (var i in res.data.Data) {
                        window.c.userAllInfo[i] = res.data.Data[i];
                        localData[i] = res.data.Data[i];
                    }
                    localStorage.setItem('UserInfo', JSON.stringify(localData));
                    panelHtml();
                    window.app.updateUserWebsite();
                }
            });

        }
    },
    checkSetting() {        // 检查用户设置 初始化
        var d = JSON.parse(localStorage.getItem('desktopNotification'));
        var s = JSON.parse(localStorage.getItem('soundNotification'));
        if (d === null) {
            localStorage.setItem('desktopNotification', true);
        } else {
            if (d) {
                $('.system-setting .switch:eq(0) .switchBtn').removeClass('off').addClass('on');
            } else {
                $('.system-setting .switch:eq(0) .switchBtn').removeClass('on').addClass('off');
            }
        }
        if (s === null) {
            localStorage.setItem('soundNotification', true);
        } else {
            if (s) {
                $('.system-setting .switch:eq(1) .switchBtn').removeClass('off').addClass('on');
            } else {
                $('.system-setting .switch:eq(1) .switchBtn').removeClass('on').addClass('off');
            }
        }
    },
    avatarSetting() {       // 头像设置
        var _this = this;
        $('.user-setting .avatar-image').on('click', function () {       // 点击头像触发 图片上传器
            $(this).siblings('input[type=file]')[0].click();
        });
        $('.user-setting .avatar-image').siblings('input[type=file]').on('change', function (e) {
            var t = $(this)[0].files[0];
            if (t && t.size > 1.5 * 1024 * 1024) {
                layer.msg('图片太大, 请压缩后重新上传~');
                return;
            }
            var param = new FormData();
            param.append("avatar", t);
            param.append("avatarName", window.c.userAllInfo.username);
            axios({
                url: UPLOAD_AVATAR_API,
                method: 'POST',
                data: param,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                var c = res.data.Code;
                var s = res.data.Str;
                var a = res.data.Avatar;
                if (c === 0) {
                    // 更改本地存贮
                    window.c.userAllInfo.userAvatar = a;
                    var ConnectUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
                    ConnectUserInfo.avatar = a;
                    localStorage.setItem('UserInfo', JSON.stringify(ConnectUserInfo));
                    _this.updateUserInfo();
                    // 文件上传成功
                    layer.msg(s);
                    socket.emit('change onlinePanel', 1);
                } else if (c === -1) {
                    layer.msg(s);
                }
                app.closeUserSetting();
            });
        });
    },
    eventListeners() {      // 应用程序事件
        var _this = this;
        $('.nav-list .nav-list-item').on('click', function (e) {
            var e = e || window.event;
            // 阻止事件冒泡
            e.stopPropagation();
            $(this).addClass('selected').siblings().removeClass('selected');
            var t = $(this).attr('title');
            if (t === '联系人') {
                layer.msg('暂未开放');
            }
            if (t === '系统设置') {
                // 系统设置开启
                $('.system-setting')
                    .css({
                        opacity: 1,
                        transform: 'scale(1)'
                    });
                $mask.show();
            }
        });
        // 关闭系统设置
        $('.system-setting').find('span:contains("系统设置")').siblings('i').on('click', function () {
            $('.system-setting')
                .css({
                    opacity: 0,
                    transform: 'scale(0)'
                })
            $mask.hide();
        });
        $('.system-setting').on('click', function (e) {
            var e = e || window.event;
            e.stopPropagation();
        });
        $(document).on('click', function (e) {
            this.closeSystemSetting();
            this.closeUserSetting();
            window.userInfo.closeTool();
            window.userInfo.closeRoomPanel();
            window.userInfo.closeUserInfo(window.userInfo);
            $mask.hide();
        }.bind(this));
        // switch 开关
        $('.system-setting .switchBtn').on('click', function (e) {
            var t = $(this).siblings('span').text();
            var f = $(this).hasClass('off');
            if (f) {
                $(this).removeClass('off').addClass('on');
                t === '启用桌面通知' ? localStorage.setItem('desktopNotification', true) : localStorage.setItem('soundNotification', true);
            } else {
                $(this).removeClass('on').addClass('off');
                t === '启用桌面通知' ? localStorage.setItem('desktopNotification', false) : localStorage.setItem('soundNotification', false);
            }
        });

        // 退出
        $('#logoutBtn').on('click', this.logout);

        // 查看源码
        $('.system-setting div:eq(1) .button').eq(0).on('click', function () {
            window.open(SOURCE_CODE, '_blank');
        });
        // 作者
        $('.system-setting div:eq(1) .button').eq(1).on('click', function () {
            window.open(WEB_SITE, '_blank');
        });
        // 管理员权限清理数据库
        $('.system-setting div:eq(1) #clearData').on('click', function () {
            if(window.c.token === undefined) {
                layer.msg('登录超时, 请两秒后重新登录。');
                // 删除本地用户信息
                localStorage.removeItem('UserInfo');
                setTimeout(function() {
                    location.href = '/login';
                },2000);
                return;
            }
            if(window.c.token === '') return;
            // 清库询问
            layer.confirm("Are you sure you want to clear the app's data?", function(index){
                //do something
                axios({
                    method: 'POST',
                    url: DELETE_DATA,
                    data: {
                        user: window.c.userAllInfo.username,
                        token: window.c.token,
                    }
                }).then(res => {
                    var code = res.data.Code;
                    var str = res.data.Str;
                    if(code === 0) {
                        layer.msg(str, { icon: 1 });
                    } else {
                        layer.msg(str, { icon: 2 });
                    }
                });
                layer.close(index);
              });
            
        });

        // 编辑用户信息
        $('.user-setting').on('click', '.normal-status button', function () {
            _this.editUserInfo(1);
        });
        // 确认用户信息
        $('.user-setting').on('click', '.edit-status button', function () {
            _this.editUserInfo(0);
        });
    },
    // 用户设置关闭调用
    closeUserSetting() {
        // 用户设置关闭
        $('.user-setting').css({
            opacity: 0,
            transform: 'scale(0)'
        });
        $mask.hide();
    },
    // 系统设置关闭调用
    closeSystemSetting() {
        // 系统设置关闭
        $('.system-setting').css({
            opacity: 0,
            transform: 'scale(0)'
        });
        $mask.hide();
    },
    openUserListItem() {
        $body.on('click', '.user-list-item', function () {
            // 清除该用户下的未读消息
            var u = $(this).attr('data-user');
            c.myUserListArr[u].noRead = 0;
            // console.log(c.myUserListArr);
            $(this).find('.unread').text(c.myUserListArr[u].noRead);

            var dataUserPanel = $(this).attr('data-user');
            var f = $('.chat-panel').attr('chat-type');
            // 用户头像
            var avatar = $(this).find('.avatar-image').attr('src');
            if (dataUserPanel === f) return;
            $('.chat-panel').remove();
            // 如果 $empty 存在就删掉它
            $empty && $empty.remove() && $('.lyric_content').show();
            var dataObj = {
                com: {
                    avatar: dataUserPanel === 'all' ? '/images/sleep.gif' : avatar,
                    username: dataUserPanel === 'all' ? '群聊' : dataUserPanel
                },
                usr: {
                    avatar: '',
                    username: ''
                },
                float: {
                    peoples: window.c.onlineUsers.length
                }
            };
            $body.append(window.components.chatPanel(dataObj, dataUserPanel));
            c.takeMsg({
                from: window.c.userAllInfo.username,
                take: dataUserPanel,
            });
        });
    },
    player() {
        //参数1：歌词容器选择器，参数2：歌单id，参数3：歌曲重定向地址，用于欺骗浏览器音频跨域显示频谱
        playmusic('.description', '432778620');
    },
}
// 组件分发
components = new MyComponents();
// 用户行为
userInfo = new UserInfo();
// APP 行为
app = new App();
