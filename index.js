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
        if(to === 'all') {
            io.emit('message',res);     // 全体发送
        }else {
            users[to].emit('message',res);   // 只对特别的人发送
            users[username].emit('message',res);
        }
    });

});