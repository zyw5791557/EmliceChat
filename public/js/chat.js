
/**
 * c    连接实例
 * app  应用实例
 */
var c,app;


// 连接命名
var c,
$doc = $(document),
$win = $('#app .windows'),
$empty = $('.empty-chat-panel[chat-type=empty]'),
$all = $('.chat-panel[chat-type=all]'),
$mask = $('.mask-layout'),
$body = $('.body');

$empty.show();
$all.hide();


// components 组件分发
function MyComponents() {

}

MyComponents.prototype = {
    chatPanel(dataObj,to) {
        /**
         * usr
         * <div>
                <i class="icon"></i>
                <div class="background-image" style="background-image: url(/images/b.jpg);"></div>
                <div class="background-mask"></div>
                <div class="content">
                    <img class="avatar-image" src="${dataObj.usr.avatar}" style="width: 80px; height: 80px; min-width: 80px; min-height: 80px;">
                    <span>${dataObj.usr.username}</span>
                    <div class="icon-list"></div>
                </div>
            </div>
            <div class="normal-status">
                <div>
                    <div>
                        <div>
                            <span>性别:</span>
                            <span>年龄:</span>
                            <span>时长:</span>
                            <span>位置:</span></div>
                        <div>
                            <span>未知</span>
                            <span>未知</span>
                            <span>未知</span>
                            <span>地球</span></div>
                    </div>
                </div>
                <div>
                    <button>发起聊天</button>
                </div>
            </div>
         */

        var usr = `
        <div class="user-info" style="opacity: 0; transform: scale(0.4); display: none;">
            
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
        <div class="expression" style="opacity: 0; transform: scale(0.4); display: none;">
            <div class="default-expression">
                <div>
                    <div style="background-position: left 0px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -30px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -60px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -90px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -120px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -150px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -180px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -210px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -240px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -270px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -300px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -330px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -360px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -390px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -420px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -450px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -480px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -510px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -540px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -570px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -600px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -630px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -660px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -690px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -720px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -750px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -780px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -810px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -840px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -870px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -900px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -930px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -960px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -990px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1020px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1050px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1080px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1110px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1140px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1170px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1200px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1230px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1260px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1290px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1320px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1350px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1380px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1410px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1440px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
                <div>
                    <div style="background-position: left -1470px; background-image: url(&quot;https://assets.suisuijiang.com/images/expressions.73fca.png&quot;);"></div>
                </div>
            </div>
            <div>
                <div class="selected">
                    <img src="https://assets.suisuijiang.com/images/default-expression.f7d7c.png"></div>
                <div class="">
                    <img src="data:image/png;base64,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"></div>
                <div class="">
                    <img src="https://assets.suisuijiang.com/images/collect-expression.05769.png"></div>
            </div>
        </div>
        <div class="code-input" style="opacity: 0; transform: scale(0.4); display: none;">
            <textarea placeholder="输入要展示的代码"></textarea>
            <div>
                <button>发送</button>
                <button>取消</button></div>
        </div>
        `;

        var float = `
        <div class="float-panel" style="right: -340px;">
            <div>
                <span>群设置</span>
                <i class="icon"></i></div>
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
        <div class="float-panel" style="right: -340px;">
            <div>
                <span>群公告</span>
                <i class="icon"></i></div>
            <div class="group-notice">
                <div>
                    <!-- react-text: 1702 -->system
                    <!-- /react-text -->
                    <!-- react-text: 1703 -->更新于
                    <!-- /react-text -->
                    <!-- react-text: 1704 -->2017年05月20日 3:49
                    <!-- /react-text --></div>
                <div class="content">欢迎各位来到fiora</div></div>
        </div>
        `;

        var notic = `
        <div>
            <div>
                <i class="icon" title="公告"></i></div>
            <div>
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
        if(to === 'all') {
            return finalAll;
        }else {
            return final;
        }
    }
}

var components = new MyComponents();




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

// user info 实例
function UserInfo() {
    this.init();
}
UserInfo.prototype = {
    init: function () {
        this.openAvatarInfo();
        this.close();
        this.openChat();
    },
    openAvatarInfo: function () {
        $win.on('click', '.avatar-image.user-icon', function () {
            var src = $(this).attr('src');
            var username = $(this).attr('data-username');
            var f = $('.chat-panel').attr('chat-type');
            if(username === c.username || f !== 'all') return;
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
            $userInfoModel = $('.user-info');
            $userInfoModel.append(commonHtml);
            $userInfoModel.show().css({
                opacity: 1,
                transform: 'scale(1)',
            });
            
        });
    },
    close: function () {
        $win.on('click', '.user-info i.icon', function () {
            $userInfoModel.css({
                opacity: 0,
                transform: 'scale(0.4)',
            })
            .hide();
            $userInfoModel.empty();
        });
    },
    openChat:function() {
        $win.on('click', '.singleChatBtn', function() {
            var username = $(this).attr('data-to');
            var avatar = $(this).attr('data-avatar');
            
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


            $('.chat-panel').hide();
            $empty.hide();
            $('.chat-panel[chat-type='+ username +']').show();
        });
    }
}
new UserInfo();

var socket = io();

// 连接实例
function Connect() {
    this.username = '';
    this.noRead = {
        all: 0,
    };
}

Connect.prototype = {
    // 用户加入
    usernameEmit(username) {
        var username = this.username;
        socket.emit('user join', username);
        $('.user-panel .avatar-text').css('background', 'url(https://api.adorable.io/avatars/60/' + username + ')')
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
        for(var i in res) {
            var isMy = c.username == res[i].from ? true : false;
            var commonHtml = `
                    <img class="avatar-image user-icon" src="https://api.adorable.io/avatars/40/${res[i].from}" alt="" data-username="${res[i].from}">
                    <div>
                        <div>
                            <span class="message-username">${res[i].from}</span>
                            <span>${(new Date(res[i].date).format('hh:mm:ss'))}</span>
                        </div>
                        <div class="text">
                            ${res[i].message}
                        </div>
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
            $('.user-list-item .content div').eq(1).find('p').text(res[i].from + '：' + res[i].message);
            $('.user-list-item .content div').eq(0).find('p').eq(1).text((new Date(res[i].date).format('hh:mm:ss')));
            if($messages.length !== 0) {
                $messages[0].scrollTop = $messages[0].scrollHeight;
            }
        }
    },
    // 调取历史记录
    takeMsg(o) {
        socket.emit('take messages', o);
    }
}





// messages

$win.on('keydown', '.input-box input', function (e) {
    var keys = parseInt(e.keyCode);
    var m = $(this).val().trim();
    if (keys === 13 && m !== '') {      // 消息不得为空。
        var to = $(this).parents('.chat-panel').attr('chat-type');
        var msg = {
            from: c.username,
            to: to,
            message: m,
            date: new Date().getTime()
        }
        c.sendMsg(msg);
        $(this).val('');                  // empty input
    }
});


// render message
socket.on('message', function (res) {
    console.log('接受消息并打印, 准备送往渲染工厂：',res);
    c.renderMsg(res);
});


// 接受历史记录
function acceptMsg(fn){
    socket.on('take messages', function(data) {
        fn(data);
    });
}



// init App action
function App() {
    this.init();
}

App.prototype = {
    init() {
        this.openAllChat();
        this.player();
        this.checkLogin();
        this.eventListeners();
    },
    checkLogin() {      // 登录状态监测
        var userName = localStorage.getItem('UserName');
        if(userName === null || userName === undefined) {
            location.href = '/login';
        }else {
            // 初始化连接
            c = new Connect();
            c.username = userName;
            c.usernameEmit(userName);
        }
    },
    logout() {          // 退出登录
        localStorage.removeItem('UserName');
        location.href = '/login';
    },
    eventListeners() {      // 应用程序事件
        $('.nav-list .nav-list-item').on('click', function(e) {
            var e = e || window.event;
            // 阻止事件冒泡
            e.stopPropagation();
            $(this).addClass('selected').siblings().removeClass('selected');
            var t = $(this).attr('title');
            if(t === '联系人') {
                layer.msg('暂未开放');
            }
            if(t === '系统设置') {
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
        $('.system-setting').find('span:contains("系统设置")').siblings('i').on('click',function() {
            $('.system-setting')
            .css({
                opacity: 0,
                transform: 'scale(0)'
            })
            $mask.hide();
        });
        $('.system-setting').on('click', function(e) {
            var e = e || window.event;
            e.stopPropagation();
        });
        $(document).on('click', function(e) {
            // 系统设置关闭
            $('.system-setting').css({
                opacity: 0,
                transform: 'scale(0)'
            });
            $mask.hide();
        });
        // switch 开关
        $('.system-setting .switchBtn').on('click', function(e) {
            var f = $(this).hasClass('off');
            if(f) {
                $(this).removeClass('off').addClass('on');
            }else {
                $(this).removeClass('on').addClass('off');
            }
        });

        // 退出
        $('#logoutBtn').on('click',this.logout);
    },
    openAllChat() {
        $body.on('click', '.user-list-item', function () {
            $('.chat-panel').remove();
            var dataUserPanel = $(this).attr('data-user');
            // 显示群聊
            $('.chat-panel').hide();
            $('.chat-panel[chat-type='+ dataUserPanel +']').show();

            var len = $('.chat-panel').length;
            if(len != 0) return;
            $empty.remove();
            var dataObj = {
                com: {
                    avatar: 'https://assets.suisuijiang.com/group_avatar_default.jpeg?imageView2/2/w/40/h/40',
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
            $body.append(components.chatPanel(dataObj,dataUserPanel));
            c.takeMsg({
                from: c.username,
                take: dataUserPanel
            });
            acceptMsg(function(data) {
                if(data.length !== 0) {
                    console.log('调取离线记录：',data);
                    c.renderMsg(data);
                }
            });
        });
    },
    player() {
        axios.get('https://www.emlice.top/api/music/url?id=436514312').then(res => {
            var data = res.data.data[0].url;
            var a = new Audio();
            a.src = data.replace('http', 'https');
            a.play();
            a.loop = 'loop';
        });
    },
}

app = new App();