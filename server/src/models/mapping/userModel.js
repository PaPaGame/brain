import { SchemaTypes } from "mongoose";

var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

/**
 * @param username 用户名
 * @param hash_password hash过后的的密码
 * @param status 用户状态
 * @param role 用户组别， 管理员，学生，老师等
 * @param 根据role 去staff表或者student表中找到的id
 */
var userSchema = new Schema({
    username: String,
    hash_password: String,
    status: String,
    role: String,
    phone: String,
    mail: String,
    lastLoginTime: Date,
    lastLoginIP: String,
    school: String,
    uid: { type: SchemaTypes.ObjectId, index: true }
}, {
        timestamps: {
            type: Number,
            default: new Date().getTime()
        }
    });

userSchema.virtual("password").set(function (password) {
    this.hash_password = encryptoPassword(password);
}).get(function () { return this.hash_password });

function encryptoPassword(password) {
    return crypto.createHash("md5").update(password).digest("base64");
}

//http://mongoosejs.com/docs/guide.html 设置schema 的函数列表的时候， 不可以用箭头函数定义
userSchema.static("authenticate", function (dbPassword, userPassword) {
    return encryptoPassword(userPassword) === dbPassword;
});

mongoose.model('user', userSchema, 'user');