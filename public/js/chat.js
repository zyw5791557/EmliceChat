
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

// 连接命名
var c,
    $doc = $(document),
    $app = $('#app .windows'),
    $messages = $('.message-list'),
    $empty = $('.empty-chat-panel[chat-type=empty]'),
    $all = $('.chat-panel[chat-type=all]'),
    $allUser = $('.user-list-item[data-user=all]'),
    $mask = $('.mask-layout'),
    $userInfoModel = $('.user-info'),
    $body = $('.body');

$empty.show();
$all.hide();
$app.hide();

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
        $app.on('click', '.avatar-image.user-icon', function () {
            var src = $(this).attr('src');
            var username = $(this).attr('data-username');
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
            $userInfoModel.append(commonHtml);
            $userInfoModel.css({
                opacity: 1,
                transform: 'scale(1)',
            })
            .show();
        });
    },
    close: function () {
        $app.on('click', '.user-info i.icon', function () {
            $userInfoModel.css({
                opacity: 0,
                transform: 'scale(0.4)',
            })
            .hide();
            $userInfoModel.empty();
        });
    },
    openChat:function() {
        $app.on('click', '.singleChatBtn', function() {
            var username = $(this).attr('data-to');
            var avatar = $(this).attr('data-avatar');
            var commonHtml = `
            <div class="chat-panel" chat-type="${username}">
                <div class="chat-panel-header">
                    <div><img class="avatar-image" src="${avatar}"
                            style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                        <p>${username}</p>
                    </div>
                </div>
                <div class="message-list">
                </div>
                <div class="input-box">
                    <input type="text" placeholder="输入消息" maxlength="1024">
                </div>
            </div>
            `;
            $body.append(commonHtml);
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
    this.init();
}

Connect.prototype = {
    init: function () {
        this.openAllChat();
    },
    openAllChat: function () {
        $allUser.on('click', function () {
            $empty.hide();
            $all.show();
        });
    },
    player: function () {
        axios.get('https://www.emlice.top/api/music/url?id=432506345').then(res => {
            var data = res.data.data[0].url;
            var a = new Audio();
            a.src = data.replace('http', 'https');
            a.play();
            a.loop = 'loop';
        });
    },
    usernameEmit: function (username) {
        var username = this.username;
        socket.emit('user join', username);
        $('.user-panel .avatar-text').css('background', 'url(https://api.adorable.io/avatars/60/' + username + ')')
        $app.show();
        $('.input-box input').focus();
    },
    sendMsg: function (msg) {
        socket.emit('message', msg);
    },
    renderMsg: function (res) {
        var isMy = c.username == res.username ? true : false;
        var commonHtml = `
                <img class="avatar-image user-icon" src="https://api.adorable.io/avatars/40/${res.username}" alt="" data-username="${res.username}">
                <div>
                    <div>
                        <span class="message-username">${res.username}</span>
                        <span>${res.date}</span>
                    </div>
                    <div class="text">
                        ${res.message}
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
        $('.user-list-item .content div').eq(1).find('p').text(res.username + ':' + res.message);
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }
}


// 输入用户名
$('#my-prompt').modal({
    relatedTarget: this,
    closeViaDimmer: false,
    onConfirm: function (e) {
        var username = e.data.trim();
        if (username === '' || username === undefined) {
            alert('昵称不能为空, 请刷新重新输入您的昵称');
            return;
        } else {
            // 初始化连接
            c = new Connect();
            c.player();
            c.username = username;
            c.usernameEmit(username);
        }
    }
});


// messages

$app.on('keydown', '.input-box input', function (e) {
    var keys = parseInt(e.keyCode);
    var m = $(this).val().trim();
    if (keys === 13 && m !== '') {      // 消息不得为空。
        var to = $(this).parents('.chat-panel').attr('chat-type');
        var msg = {
            username: c.username,
            to: to,
            message: m,
            date: (new Date()).format("hh:mm")
        }
        c.sendMsg(msg);
        $(this).val('');                  // empty input
    }
});

// render message
socket.on('message', function (res) {
    c.renderMsg(res);
});

