const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// 引入配置文件
const config = require('./config/config.js');
// 权限列表
$permissionArr = config.permissionArr;

app.use(express.static(path.join('public')));
app.use('/module', express.static('node_modules'));


app.use('/login', express.static('public/login.html'));
app.use('/register', express.static('public/register.html'));

// 引入数据库模块
const Api = require('./server/api.js');
app.use(Api);

const mongoose = require('mongoose');
require('./server/connect.js');
require('./server/model.js');
// 获取 messages 集合并指向 Messages 
const Messages = mongoose.model('messages');
// User 为 model name
const User = mongoose.model('users');    



http.listen(3000, function() {
    console.log('app is running of port 3000');
});

var users = {};

// 抽离公共方法
var emitOnlineUser = function(u) {
    var query = { name: { $in: Object.keys(u) } }
    User.find(query, { name: 1, avatar: 1 }, function(err,r) {
        if(err) throw err;
        io.emit('user join', r);
    });
}

// socket.io code
io.on('connection', function(socket) {
    var username;

    socket.on('user join', function(user) {
        username = user;
        users[user] = socket;
        emitOnlineUser(users);          // 用户加入发射在线用户信息
    });

    // 改变 online panel
    socket.on('change onlinePanel', function(f) {
        if(f) {
            emitOnlineUser(users);          // 用户加入发射在线用户信息
        }
    });

    socket.on('disconnect', function() {
        if(username === undefined) return;
        delete users[username];
        console.log(username + '离开了聊天室');
        emitOnlineUser(users);          // 用户退出刷新在线用户信息
    });


    // 消息已读
    socket.on('message read', function(res) {
        var msgArr = res.msgs;
        var name = res.readUser;
        var idArr = [];
        if(msgArr[0].to === 'all') return;
        for(var i = 0;i < msgArr.length;i++) {
            if(msgArr[i].to === name) {
                idArr.push(msgArr[i]._id);
            }
        }
        Messages.update({ _id: { $in: idArr } },{ $set: { read: true } }, { multi: true }, function(err,result) {
            if(err) throw err;
            console.log('已阅读：',result);
        });
    });

    // 调取离线未读消息
    socket.on('Offline noRead messages', function(name) {
        console.log(name,'调取离线未读消息');
        var query = { to: name, read: false };
        Messages.find(query, function(err,result) {
            users[name] && users[name].emit('Offline noRead messages', result);
        });
    });

    // 调取用户信息
    socket.on('take userInfo', function(name) {
        var query = { name: name };
        User.findOne(query, function(err,result) {
            if(err) throw err;
            if(result !== null) {
                // 记录时长
                var date = new Date().getTime();                        // 时间戳
                var duration = Math.ceil((date - result.date) / (1000 * 60 * 60 * 24));     // 向上取整
                var s = {};
                for(var i in result) {
                    var arr = ['name', 'avatar', 'date', 'sex', 'birthday', 'website', 'place', 'github', 'qq'];
                    if(arr.indexOf(i) !== -1) {
                        s[i] = result[i];
                    }
                }
                var c = {
                    Data: s,
                    duration: duration
                };
                socket.emit('take userInfo', c);
            }
        });
    });


    socket.on('message', function(res) {
        console.log(res);
        // 把消息保存到数据库
        res.date = Date.now();
        var msg = new Messages(res);
        msg.save();

        var to = res.to;
        var from = res.from;
        var r = [];
        r.push(res);
        if(to === 'all') {
            io.emit('message',r);     // 全体发送
        }else {
            users[to] && users[to].emit('message',r);   // 只对特别的人发送
            users[from] && users[from].emit('message',r);
        }
    });

    // 监听调取messages
    socket.on('take messages', function(res) {
        // 调取数据库消息
        if(res.take === 'all') {
            Messages.find({to: res.take}).
            skip(0*20).
            limit(20).
            sort('-_id').
            exec(function(err, result) {
                // 谁调取聊天记录
                console.log(res.from + '调取聊天记录');
                result.reverse();
                users[res.from] && users[res.from].emit('take messages', result);
            });
        }else {
            var a = res.from;
            var b = res.take;
            Messages.find({
                $or: [ 
                    { from: a, to: b},
                    { from: b, to: a},
                 ],
            }).
            skip(0*20).
            limit(20).
            sort('-_id').
            exec(function(err,result) {
                // 谁调取聊天记录
                console.log(res.from + '调取聊天记录');
                result.reverse();
                users[res.from] && users[res.from].emit('take messages', result);
            });
        }
        
    });

    // 用户状态检查
    socket.on('checkUser', function(res) {
        var query = { name: res };
        User.findOne(query, function(err, result) {
            if(err) throw err;
            if(result === null) {
                users[res] && users[res].emit('checkUser', {Code: -1, Str: '数据库已更新, 请重新注册登录~'});
            } else {
                users[res] && users[res].emit('checkUser', {Code: 0, Str: '用户状态正常~'});
            }
        });
    });

    // 用户权限检查
    socket.on('check permission', function(user) {
        if($permissionArr.indexOf(user) == -1) {
            socket.emit('check permission', 1);
        }
    });

});