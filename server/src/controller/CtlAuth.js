import jwt from 'koa-jwt';
import UserDao from '../dao/DaoUser';
var StudentModel = require("../models").student;
var UserModel = require("../models").user;
var userDao = new UserDao(UserModel);
// 登录
const SignIn = async (ctx) => {
    let u = ctx.request.body;
    const user = await userDao.findByName(u, (err, bku) => {
        if (err)
            console.log("no user find");

        console.log(bku);
        // 如果验证通过
        if (StudentModel.authenticate(bku.hash_password, u.password)) {
            console.log(`验证通过， 用户名是：${u.username}, 密码是：${u.password}`);
        }
    })
};

// 注册
const SignUp = async (ctx) => {
    ctx.body = {
        code: 200
    }
}

module.exports = {
    SignIn,
    SignUp
}