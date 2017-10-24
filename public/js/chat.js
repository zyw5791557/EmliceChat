
/**
 * c    连接实例
 * app  应用实例
 */
var c, app;

// 客户端配置项
// 静态资源服务器 API
const BASE_URL = 'http://localhost:8989';                         // 本地测试服务器
// const BASE_URL = 'http://static.emlice.top';                            // 线上服务器
const UPLOAD_AVATAR_API = BASE_URL + '/api/avatar_upload';              // 头像上传 API
const UPLOAD_PS_API = BASE_URL + '/api/ps_upload';              // 截图上传 API
const SOURCE_CODE = 'https://github.com/zyw5791557/EmliceChat';
const WEB_SITE = 'https://www.emlice.top';

// 表情配置表
// const baidu_address = BASE_URL + '/images/expressions/baidu.png';    // 本地测试服务器
const baidu_address = BASE_URL + '/images/expressions/baidu.png';		// 线上服务器
const baidu = [
    '呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
    '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心',
    '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
    '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳',
    '钱币', '灯泡', '咖啡', '蛋糕', '音乐', 'haha', '胜利', '大拇指', '弱', 'ok',
];
const baidu_space = 30;

// 连接命名
var c,
    $doc = $(document),
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
                    <img src="data:image/png;base64,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"></div>
                <div class="">
                    <img src="https://assets.suisuijiang.com/images/collect-expression.05769.png"></div>
            </div>
        </div>
        <div class="code-input" style="opacity: 0; transform: scale(0); display: none;">
            <textarea placeholder="输入要展示的代码"></textarea>
            <div>
                <button>发送</button>
                <button>取消</button></div>
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
                    <span>
                        <!-- react-text: 1666 -->${dataObj.float.peoples}
                        <!-- /react-text -->
                        <!-- react-text: 1667 -->人
                        <!-- /react-text --></span></div>
                <div class="userList">
                    <div>
                        <div class="avatar-text" style="background-color: forestgreen; width: 40px; height: 40px; font-size: 16px; min-width: 40px; min-height: 40px;">碎</div>
                        <span>碎碎酱</span></div>
                    <div>
                        <div class="avatar-text" style="background-color: darkmagenta; width: 40px; height: 40px; font-size: 16px; min-width: 40px; min-height: 40px;">r</div>
                        <span>robot10</span></div>
                    <div>
                        <img class="avatar-image" src="https://cdn.suisuijiang.com/user_592243028cd75f2f076dfeef_1504508859571.png?imageView2/2/w/40/h/40" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                        <span>blackmiaool</span></div>
                    <div>
                        <img class="avatar-image" src="https://cdn.suisuijiang.com/user_5966cf3d49335047b16adae8_1504799624203.jpeg?imageView2/2/w/40/h/40" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                        <span>1111111111</span></div>
                    <div>
                        <div class="avatar-text" style="background-color: deepskyblue; width: 40px; height: 40px; font-size: 16px; min-width: 40px; min-height: 40px;">t</div>
                        <span>twf</span></div>
                    <div>
                        <img class="avatar-image" src="https://cdn.suisuijiang.com/user_598bbd2c2f06e960f246f07a_1505123087661.png?imageView2/2/w/40/h/40" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                        <span>shazidama</span></div>
                    <div>
                        <img class="avatar-image" src="https://cdn.suisuijiang.com/user_59b5e4563a453b067878c989_1505119796105.jpeg?imageView2/2/w/40/h/40" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                        <span>Emlice</span></div>
                    <div>
                        <div class="avatar-text" style="background-color: darkseagreen; width: 40px; height: 40px; font-size: 16px; min-width: 40px; min-height: 40px;">f</div>
                        <span>ff</span></div>
                </div>
                <input type="file" accept="image/*"></div>
            <div class="group-info-exit">
                <button>退出群组</button></div>
        </div>
        <div class="float-panel roomNoticePanel" style="right: -340px;">
            <div>
                <span>群公告</span>
                <i class="icon close"></i></div>
            <div class="group-notice">
                <div>
                    <!-- react-text: 1702 -->system
                    <!-- /react-text -->
                    <!-- react-text: 1703 -->更新于
                    <!-- /react-text -->
                    <!-- react-text: 1704 -->2017年10月20日 17:43
                    <!-- /react-text --></div>
                <div class="content">欢迎各位来到 Emlice </div></div>
        </div>
        `;

        var notic = `
        <div>
            <div style="margin: auto 8px;" class="roomNotice">
                <i class="icon" title="公告"></i></div>
            <div style="margin: auto 8px;" class="roomInfo">
                <i class="icon" title="关于"></i></div>
        </div>
        `;

        var com = `
        <div class="chat-panel-header">
            <div>
                <img class="avatar-image" src="${dataObj.com.avatar}" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                <p>${dataObj.com.username}</p>
            </div>
            ${notic}
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

var components = new MyComponents();


// 公共方法 

// Date format
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
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
function noticeProcess(param) {
    var t = param.charAt(0);
    if (t === '#') {
        return `[表情]`;
    } else if (t === '%') {
        return `[图片]`;
    } else {
        return param;
    }
}


// 向上滚动加载
// function scrollAjax() {
//     var $this = $('.message-list');
//     var dataUserPanel = $('.chat-panel').attr('chat-type');
//     if ($this.scrollTop() <= 0) {
//         c.takeMsg({
//             from: c.username,
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
    openAvatarInfo: function () {
        var _this = this;
        $win.on('click', '.avatar-image.user-icon', function (e) {
            var e = e || event;
            e.stopPropagation();
            var uif = _this.userInfoFlag;
            if (uif === false) return;
            _this.userInfoFlag = false;
            var src = $(this).attr('src');
            var username = $(this).attr('data-username');
            var f = $('.chat-panel').attr('chat-type');
            if (username === c.username || f !== 'all') return;
            var commonHtml = `
            <div><i class="icon"></i>
                <div class="background-image" style="background-image: url(/images/b.jpg);"></div>
                <div class="background-mask"></div>
                <div class="content"><img class="avatar-image" src="${src}"
                        style="width: 80px; height: 80px; min-width: 80px; min-height: 80px;"><span>${username}</span>
                    <div
                        class="icon-list"></div>
                </div>
            </div>
            <div class="normal-status">
                <div>
                    <div>
                        <div><span>性别:</span><span>年龄:</span><span>时长:</span><span>位置:</span></div>
                        <div><span>男</span><span>23</span><span>未知</span><span>地球</span></div>
                    </div>
                </div>
                <div><button class="singleChatBtn" data-to="${username}" data-avatar="${src}">发起聊天</button></div>
            </div>
            `;
            var $userInfoModel = $('.user-info');
            $userInfoModel.append(commonHtml);
            $userInfoModel.show().css({
                opacity: 1,
                transform: 'scale(1)',
            });
            $mask.show();
        });
    },
    close: function () {
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
    openChat: function () {
        var _this = this;
        $win.on('click', '.singleChatBtn', function () {
            _this.userInfoFlag = true;
            var username = $(this).attr('data-to');
            var avatar = $(this).attr('data-avatar');

            // 查询 $userList 里面是否有该用户面板 没有就新建, 有就跳过。
            var f = $userList.find('.user-list-item[data-user=' + username + ']');
            if (f.length === 0) {
                let o = {
                    to: username,
                    avatar: avatar
                }
                $userList.append(components.userListItem(o));
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
                    peoples: 2
                }
            };
            // 删除聊天窗口
            $('.chat-panel').remove();
            console.log('重新渲染窗口')
            // 重新渲染聊天窗口
            $body.append(components.chatPanel(dataObj, username));

            // 拉去记录
            c.takeMsg({
                from: c.username,
                take: username,
            });

            $('.chat-panel').hide();
            $empty.hide();
            $('.chat-panel[chat-type=' + username + ']').show();
        });
    },
    openUserSetting: function () {          // 打开用户设置
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
        $body.on('click', '.chat-panel .toolbar div', function (e) {
            var e = e || window.event;
            e.stopPropagation();
        });
        // 表情包面板阻止事件冒泡
        $body.on('click', '.chat-panel .expression', function (e) {
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
                from: window.c.username,
                avatar: window.c.userAvatar,
                to: to,
                message: `#${baidu[idx]}`,
                date: new Date().getTime()
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
            } else {
                layer.msg('暂未开放!');
            }
        });
        $body.on('click', '.chat-panel .expression .select-panel div', function () {
            var idx = $(this).index();
            $(this).addClass('selected').siblings().removeClass('selected');
            if (idx === 0) {
                return;
            } else {
                layer.msg('暂未开放!');
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
            layer.msg('该面板数据正在测试, 暂时为虚假数据!');
            $('.roomInfoPanel').css('right', '0px');
            $mask.show();
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
    }
}
window.userInfo = new UserInfo();

var socket = io();

// 连接实例
function Connect() {
    this.username = '';         // 我的连接账号即用户名
    this.userAvatar = '';       // 用户头像
    this.duration = '';         // 用户时长
    this.myUserListArr = {      // 我的临时会话集合
        all: {
            noRead: 0
        },
    };
}

Connect.prototype = {
    // 用户加入
    usernameEmit(username) {
        var username = this.username;
        socket.emit('user join', username);
        $('.user-panel .avatar-text').css('background-image', 'url(' + this.userAvatar + ')');
        $win.show();
        $('.input-box input').focus();
    },
    // 发送消息
    sendMsg(msg) {
        socket.emit('message', msg);
    },
    // 渲染消息
    renderMsg(res) {
        console.log('渲染消息：', res);
        var $messages = $('.message-list');
        // 判断当前窗口是否是会话窗花
        var p = $('.message-list').parents('.chat-panel').attr('chat-type');
        for (var i = 0; i < res.length; i++) {
            if (parseInt(i) === res.length - 1) {
                // 渲染时间和消息
                if (res[i].to === 'all') {
                    console.log('提示群聊消息咯');
                    $('.user-list-item[data-user=' + res[i].to + '] .content div').eq(1).find('p').text(res[i].from + '：' + noticeProcess(res[i].message));
                    $('.user-list-item[data-user=' + res[i].to + '] .content div').eq(0).find('p').eq(1).text((new Date(res[i].date).format('hh:mm')));
                } else {
                    console.log('提示私聊消息咯');
                    $('.user-list-item[data-user=' + res[i].to + '] .content div').eq(1).find('p').text(res[i].from + '：' + noticeProcess(res[i].message));
                    $('.user-list-item[data-user=' + res[i].to + '] .content div').eq(0).find('p').eq(1).text((new Date(res[i].date).format('hh:mm')));
                    $('.user-list-item[data-user=' + res[i].from + '] .content div').eq(1).find('p').text(res[i].from + '：' + noticeProcess(res[i].message));
                    $('.user-list-item[data-user=' + res[i].from + '] .content div').eq(0).find('p').eq(1).text((new Date(res[i].date).format('hh:mm')));
                }
            }

            var p = $('.message-list').parents('.chat-panel').attr('chat-type');
            if (p !== undefined) {
                if (p !== 'all' && res[i].to === 'all') {
                    continue;
                } else if (p == 'all' && res[i].to !== 'all') {
                    continue;
                }
            }
            var isMy = c.username == res[i].from ? true : false;

            function msgProcess(param) {
                var t = param.charAt(0);
                if (t === '#') {
                    var query = param.substr(1);
                    var baidu_idx;
                    baidu.some((item, index) => {
                        if (item === query) {
                            baidu_idx = index;
                        }
                    });
                    return `
                        <div class="text">
                            <img class="expression-default-message" src="data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==" style="background-position: left -${baidu_idx * baidu_space}px; background-image: url(${baidu_address})" onerror="this.style.display='none'">
                        </div>
                    `;
                } else if (t === '%') {
                    var imgSrc = param.substr(1);
                    return `
                        <div class="image">
                            <img src="${imgSrc}" data-action="zoom" style="max-height: 200px;">
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
            var commonHtml = `
                    <img class="avatar-image user-icon" src="${res[i].avatar}" alt="" data-username="${res[i].from}">
                    <div>
                        <div>
                            <span class="message-username">${res[i].from}</span>
                            <span>${(new Date(res[i].date).format('hh:mm:ss'))}</span>
                        </div>
                        ${msgProcess(res[i].message)}
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
            }

        }
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
            from: c.username,
            avatar: c.userAvatar,
            to: to,
            message: m,
            date: new Date().getTime()
        }
        c.sendMsg(msg);
        $(this).val('');                  // empty input
    }
});
// 获取剪贴板中的 image 数据完成截图发送功能


var imgReader = function (item) {
    var blob = item.getAsFile();
    if(blob !== null && blob.size > 1.5 * 1024 * 1024) {
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
        console.log(res);
        var d = res.data.ps;
        var to = $body.find('.chat-panel').attr('chat-type');
        var msg = {
            from: window.c.username,
            avatar: window.c.userAvatar,
            to: to,
            message: `%${d}`,
            date: new Date().getTime()
        }
        window.c.sendMsg(msg);
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
    console.log('接受消息并打印, 准备送往渲染工厂：', res);

    /**
     *  from 来自谁的消息
     */

    for (let i = 0; i < res.length; i++) {
        var f = $userList.find('.user-list-item[data-user=' + res[i].from + ']');
        if (f.length === 0 && res[i].from !== c.username && res[i].to !== 'all') {
            let o = {
                to: res[i].from,
                avatar: res[i].avatar
            }
            $userList.append(components.userListItem(o));
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
            if (res[0].to !== 'all' && res[0].from !== c.username && e !== res[0].from) {
                console.log('捕获错误', c.myUserListArr[res[0].from]);
                c.myUserListArr[res[0].from] === undefined ? c.myUserListArr[res[0].from] = { noRead: 1 } : c.myUserListArr[res[0].from].noRead++;
            }
        }
    } else {
        // 当前为空频道。
        if (res[0].to == 'all' && e !== 'all') {    // 如果是发送去群聊频道切当前不在群聊频道
            c.myUserListArr.all.noRead++;
        } else {                     // 私聊频道
            if (res[0].to !== 'all' && res[0].from !== c.username && e !== res[0].from) {
                c.myUserListArr[res[0].from] === undefined ? c.myUserListArr[res[0].from] = { noRead: 1 } : c.myUserListArr[res[0].from].noRead++;
            }
        }
    }



    console.log(c.myUserListArr);

    // 渲染未读消息气泡
    $('.user-list-item').each(function () {
        var t = $(this).attr('data-user');
        $(this).find('.unread').text(c.myUserListArr[t].noRead);

    });

    if (res[0].from !== c.username) {
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
                        body: `${res[0].from}：${noticeProcess(res[0].message)}`,
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
        console.log('调取离线记录：', data);
        c.renderMsg(data);
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
    },
    updateUserInfo(obj) {       // 更新用户信息
        // 右上角
        $('.user-panel .avatar-text').css('background-image', 'url(' + window.c.userAvatar + ')');
        // 用户设置区域
        $('.user-setting .background-image').css('background-image', 'url(' + window.c.userAvatar + ')');
        $('.user-setting .avatar-image').attr('src', window.c.userAvatar);
        $('.user-setting .avatar-image').siblings('span').text(window.c.username);
        $('.user-setting .normal-status div div div:eq(1)').find('span:eq(2)').text(window.c.duration + '天');
    },
    checkLogin() {      // 登录状态监测
        var userName = localStorage.getItem('UserName');
        var userAvatar = localStorage.getItem('UserAvatar');
        var duration = localStorage.getItem('Duration');
        if (userName === null || userName === undefined) {
            location.href = '/login';
        } else {
            // 初始化连接
            c = new Connect();
            c.username = userName;
            c.userAvatar = userAvatar;
            c.duration = duration;
            c.usernameEmit(userName);
        }
    },
    logout() {          // 退出登录
        localStorage.removeItem('UserName');
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
                            <div>
                                <select>
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                </select>
                                <input type="date" value="2016-09-11">
                                <input type="text" value="">
                                <input type="url" value="">
                                <input type="url" value="">
                                <input type="text" value="">
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>确定</button>
                    </div>
                </div>
            `;
            $('.user-setting').find('.normal-status').remove().end().append(Edit_html);
        } else {
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
                                <span>男</span>
                                <span>1</span>
                                <span>32天</span>
                                <span>火星</span>
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
            var param = new FormData();
            param.append("avatar", t);
            param.append("avatarName", c.username);
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
                var a = res.data.Avatar + '?' + Date.now();
                if (c === 0) {
                    // 更改本地存贮
                    window.c.userAvatar = a;
                    localStorage.setItem('UserAvatar', a);
                    _this.updateUserInfo();
                    // 文件上传成功
                    layer.msg(s);
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
            console.log(t);
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
            console.log(c.myUserListArr);
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
                    peoples: 0
                }
            };
            $body.append(components.chatPanel(dataObj, dataUserPanel));
            c.takeMsg({
                from: c.username,
                take: dataUserPanel,
            });
        });
    },
    player() {
        //参数1：歌词容器选择器，参数2：歌单id，参数3：歌曲重定向地址，用于欺骗浏览器音频跨域显示频谱
        playmusic('.description', '432778620');
    },
}

app = new App();


