import jwt from "koa-jwt";
import SchoolDao from "../dao/DaoSchool";

var SchoolModel = require("../models").school;

var schoolDao = new SchoolDao(SchoolModel);

const Create = async (ctx) => {
    let info = ctx.request.body;
    let result = schoolDao.create(info, (err, data) => {
        if (err)
            console.log(err);
    });

    if (result)
        ctx.body = { status: 200 };
}

const Update = async (ctx) => {
    let info = ctx.request.body;
    await schoolDao.update({ _id: `${info._id}` }, { $set: info }, null, err => {
        if (!!err) {
            console.log(err);
        }

        console.log("ok");
    });
}

const Delete = async (ctx) => {
    let data = ctx.request.body;
    let result = schoolDao.delete({ _id: `${data.id}` }, err => {
        if (!!err)
            console.log(`${err}`);
    });

    if (result) {
        ctx.body = { status: 200 };
    }

}

var school;
const Get = async function (ctx) {
    let code = ctx.params['code'];

    if (!code) {
        console.log("获取全部学校详情");
        let school = await schoolDao.findAllSchool((err, data) => {
            if (!!err)
                console.log(`${err}`);

            // console.log(data);
        });

        ctx.body = { schools: school };
    } else {
        console.log("获取学校详情,学校代码", code);
        let school = await schoolDao.getByQuery({ code: `${code}` }, null, null, (err, data) => {
            if (!!err)
                console.log(`${err}`);
        });

        ctx.body = { schools: school };
    }
}

const FuzzyList = async ctx => {
    let message = {};
    let info = ctx.request.body;
    if (!info) {
        message.status = 400;
        message.message = "参数错误";
    }

    let result = await SchoolModel.find({ "code": { $regex: info.code, $options: 'i' } });

    message.status = 200;
    message.school = result ? result : [];
    ctx.body = message;
}

module.exports = {
    Create,
    Update,
    Delete,
    Get,
    FuzzyList
};