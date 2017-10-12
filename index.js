var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(path.join('public')));
app.use('/module', express.static('node_modules'));


app.use('/login', express.static('public/login.html'));
app.use('/register', express.static('public/register.html'));

// 引入数据库模块
var Api = require('./server/api.js');
app.use(Api);

var mongoose = require('mongoose');
require('./server/connect.js');
require('./server/model.js');
// 获取 messages 集合并指向 Messages 
var Messages = mongoose.model('messages');



http.listen(3000, function() {
    console.log('app is running of port 3000');
});

var users = {};



// socket.io code
io.on('connection', function(socket) {

    var username;

    socket.on('user join', function(user) {
        username = user;
        users[user] = socket;
    });

    socket.on('disconnect', function() {
        if(username === undefined) return;
        delete users[username];
        console.log(username + '离开了聊天室');
    });

    socket.on('message', function(res) {
        console.log(res);
        // 把消息保存到数据库
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
            Messages.find({to: res.take}, function(err, result) {
                // 谁调取聊天记录
                console.log(res.from + '调取聊天记录');
                users[res.from].emit('take messages', result);
            });
        }else {
            var a = res.from;
            var b = res.take;
            Messages.find({
                $or: [ 
                    { from: a, to: b},
                    { from: b, to: a},
                 ]
            }, function(err, result) {
                // 谁调取聊天记录
                console.log(res.from + '调取聊天记录');
                users[res.from].emit('take messages', result);
            });
        }
        
    });

});