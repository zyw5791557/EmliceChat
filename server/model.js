// 数据模型

var mongoose = require('mongoose');
// 用户集合

var UserSchema = new mongoose.Schema({  // 定义数据模型
    name: String,
    pwd: String,
    avatar: String,
    token: String,
    date: Number,
    sex: String,
    birthday: String,
    place: String,
    website: String,
    github: String,
    qq: String
});
mongoose.model('users', UserSchema);       // 将该 Schema 发布为 Model, 第一个参数为数据库的集合, 没有会自动创建


// 用户登录记录集合

var LoginStateSchema = new mongoose.Schema({
    user: String,
    date: Number,
    remoteAddress: String,
});
mongoose.model('userLoginState', LoginStateSchema);


// 消息记录集合

var MessagesSchema = new mongoose.Schema({
    from: String,
    avatar: String,
    to: String,
    message: String,
    type: String,
    date: Number,
    read: Boolean
});
mongoose.model('messages', MessagesSchema);