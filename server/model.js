// 数据模型

var mongoose = require('mongoose');
// 用户集合

var UserSchema = new mongoose.Schema({  // 定义数据模型
    name: String,
    pwd: String,
    date: Number
});
mongoose.model('users', UserSchema);       // 将该 Schema 发布为 Model, 第一个参数为数据库的集合, 没有会自动创建


// 用户登录记录集合

var LoginStateSchema = new mongoose.Schema({
    user: String,
    date: Number,
    remoteAddress: String,
});
mongoose.model('userLoginState', LoginStateSchema);