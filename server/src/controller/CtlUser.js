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

module.exports = {
    Create,
    Update,
    Delete,
    Get
};