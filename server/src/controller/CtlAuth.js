import jwt from 'koa-jwt';
import UserDao from '../dao/DaoUser';
import UserModel from '../models/UsersModel';
var userDao = new UserDao(UserModel);
// 登录
const SignIn = async (ctx) => {
    let data = ctx.request.body;
    const user = await userDao.findByName(user, (err, user) => {
        if (err)
            console.log("no user find");
        if (user.password === this.user.password) {
            ctx.body = {
                code: 200
            }
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