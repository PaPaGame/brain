import jwt from "koa-jwt";
import UserDao from "../dao/DaoUser";

var UserModel = require("../models").user;

var userDao = new UserDao(UserModel);

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
    userDao.update({ _id: `${info._id}` }, { $set: info }, null, err => {
        if (!!err) {
            console.log(err);
        }

        console.log("ok");
    });
}

const Delete = async (ctx) => {
    let data = ctx.request.body;
    let result = userDao.delete({ _id: `${data.id}` }, err => {
        if (!!err)
            console.log(`${err}`);
    });

    if (result) {
        ctx.body = { status: 200 };
    }

}

var user;
const Get = async function (ctx) {
    let code = ctx.params['code'];
}

const Login = async function (ctx) {
    let userInfo = ctx.request.body;
    let result = await userDao.findByName(userInfo, (err, data) => {
        if (err)
            console.log(err);
    })


    if (userDao.model.authenticate(result.hash_password, userInfo.password)) {
        // 如果验证通过了的话，把token啊 什么的 都传给客户端
        ctx.body = {
            userInfo: result,
            status: 200
        }
    } else {
        ctx.body = {
            status: 400
        };
    }
}

module.exports = {
    Create,
    Update,
    Delete,
    Get,
    Login
};