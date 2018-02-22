var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    hash_password: String,
    status: String,
    role: String,
    phone: String,
    mail: String,
    lastLoginTime: Date,
    lastLoginIP: String,
    school: String
}, { timestamps: true });

userSchema.virtual("password").set(function (password) {
    this.hash_password = encryptoPassword(password);
});

function encryptoPassword(password) {
    return crypto.createHash("md5").update(password).digest("base64");
}

//http://mongoosejs.com/docs/guide.html 设置schema 的函数列表的时候， 不可以用箭头函数定义
userSchema.static("authenticate", function (dbPassword, userPassword) {
    return encryptoPassword(userPassword) === dbPassword;
});

mongoose.model('user', userSchema, 'user');