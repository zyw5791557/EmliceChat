var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join('public')));
app.use('/module', express.static('node_modules'));

http.listen(3000, function() {
    console.log('app is running of port 3000');
});

var users = {};

// 暂时替代 database
var database = {
    all: [],
};


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
        var to = res.to;
        var from = res.username;
        var r = [];
        r.push(res);
        if(to === 'all') {
            io.emit('message',r);     // 全体发送
            database.all.push(res);
        }else {
            users[to].emit('message',r);   // 只对特别的人发送
            users[from].emit('message',r);
        }
        console.log(database);
    });

    // 监听调取messages
    socket.on('take messages', function(res) {
        // 谁调取聊天记录
        console.log(res.from + '调取聊天记录');
        users[res.from].emit('take messages', database[res.take]);
    });

});