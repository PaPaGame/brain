import jwt from "koa-jwt";
import UserDao from "../dao/DaoUser";

var UserModel = require("../models").user;

var userDao = new UserDao(UserModel);

const Exist = async (ctx) => {
    let message = {};
    let info = ctx.request.body;
    let result = await userDao.findByUsername(info);

    ctx.body = {
        status: 200,
        exist: result !== null,
    };
}

const Create = async (ctx) => {
    let info = ctx.request.body;
    let result = userDao.create(info, (err, data) => {
        if (err)
            console.log(err);
    });

    if (result)
        ctx.body = { status: 200 };
}

const Update = async (ctx) => {
    let info = ctx.request.body;
    let result = await userDao.update({ _id: `${info._id}` }, { $set: info }, null, err => {
        if (!!err) {
            console.log(err);
        }
    });

    if (result) {
        ctx.body = {
            status: 200
        };
    }
}

const Delete = async (ctx) => {
    let data = ctx.request.body;
    let result = userDao.delete({ _id: `${data._id}` }, err => {
        if (!!err)
            console.log(`${err}`);
    });

    if (result) {
        ctx.body = { status: 200 };
    }

}

var user;
const Get = async function (ctx) {
    // let code = ctx.params['code'];
    let result = await userDao.getAll((err, data) => {

    });

    if (result) {
        ctx.body = {
            status: 200,
            users: result
        };
    }
}

const Login = async function (ctx) {
    let message = {};
    let userInfo = ctx.request.body;

    if (!userInfo) {
        message.status = 400;
        message.message = "登录信息出错";
        ctx.body = message;
        return;
    }

    let result = await userDao.findByUsername(userInfo);

    if (!result) {
        message.status = 400;
        message.message = "查无此用户";
        ctx.body = message;
        return;
    }

    if (UserModel.authenticate(result.hash_password, userInfo.password)) {
        // 如果验证通过了的话，把token啊 什么的 都传给客户端
        message.status = 200;
        message.userInfo = result;
    } else {
        message.message = "密码不正确";
        message.status = 400;
    }

    ctx.body = message;
}

const GetUserInfo = async (ctx) => {
    let user = ctx.request.body;
    console.log("获取用户信息", user);
    let result = await userDao.findByUsername(user, (err, data) => {
        if (err)
            console.log(err);
    });

    if (result) {
        ctx.body = {
            status: 200,
            userinfo: result
        };
    }
}


const Logout = async (ctx) => {
    ctx.session = null;
    await ctx.redirect('/');
}

//  修改密码
const ChangePassword = async ctx => {
    let userinfo = ctx.request.body;
    let message = {};
    if (!userinfo) {
        message.status = 400;
        message.message = "用户信息错误";
    }

    let result = await userDao.changePassword(userinfo);
    if (!result) {
        message.status = 400;
        message.menubar = "修改密码失败";
    }

    message.status = 200;
    message.menubar = "修改密码成功";
    ctx.body = message;
}

module.exports = {
    Create,
    Update,
    Delete,
    Get,
    Login,
    Exist,
    GetUserInfo,
    Logout,
    ChangePassword
};