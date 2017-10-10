/**
 * Created by Emlice on 2017/10/09.
 * 
 * 连接数据库, 基本配置
 */

var mongoose = require('mongoose');                         // 需要提前使用 npm 安装 mongoose

var DB_CONN_STR = 'mongodb://localhost:27017/EmliceChat';   // mongo 是我的聊天数据库
var db = mongoose.connect(DB_CONN_STR);                     // 连接数据库